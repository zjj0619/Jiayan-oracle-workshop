const cloud = require('@cloudbase/node-sdk')
const crypto = require('crypto')

// 初始化云开发
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV
})

const db = app.database()

exports.main = async (event, context) => {
  const { path, httpMethod, body } = event
  
  try {
    // 解析请求体
    const requestBody = typeof body === 'string' ? JSON.parse(body) : body

    // 路由处理
    switch (path) {
      case '/api/v1/auth/register':
        if (httpMethod === 'POST') {
          return await registerUser(requestBody)
        }
        break
        
      case '/api/v1/auth/login':
        if (httpMethod === 'POST') {
          return await loginUser(requestBody)
        }
        break
        
      case '/api/v1/auth/profile':
        if (httpMethod === 'GET') {
          return await getUserProfile(requestBody)
        } else if (httpMethod === 'PUT') {
          return await updateUserProfile(requestBody)
        }
        break
        
      case '/api/v1/auth/logout':
        if (httpMethod === 'POST') {
          return await logoutUser(requestBody)
        }
        break
        
      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: '接口不存在' })
        }
    }
  } catch (error) {
    console.error('用户认证处理错误:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '服务器内部错误',
        message: error.message 
      })
    }
  }
}

// 用户注册
async function registerUser(params) {
  try {
    const { username, email, phone, password } = params
    
    if (!username || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '用户名、邮箱和密码不能为空' })
      }
    }
    
    // 检查用户是否已存在
    const existingUser = await db.collection('users')
      .where({
        $or: [
          { email: email },
          { username: username }
        ]
      })
      .get()
    
    if (existingUser.data.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: '用户名或邮箱已存在' })
      }
    }
    
    // 密码加密
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    
    // 创建新用户
    const newUser = {
      username,
      email,
      phone: phone || '',
      password: hashedPassword,
      avatar: '',
      bio: '',
      level: 1,
      experience: 0,
      achievements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: null,
      status: 'active'
    }
    
    const result = await db.collection('users').add(newUser)
    
    // 生成访问令牌
    const token = generateToken(result.id)
    
    // 返回用户信息（不包含密码）
    const userInfo = { ...newUser }
    delete userInfo.password
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: '注册成功',
        token,
        user: { ...userInfo, _id: result.id }
      })
    }
  } catch (error) {
    throw new Error(`用户注册失败: ${error.message}`)
  }
}

// 用户登录
async function loginUser(params) {
  try {
    const { email, password } = params
    
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '邮箱和密码不能为空' })
      }
    }
    
    // 查找用户
    const userResult = await db.collection('users')
      .where({ email: email })
      .get()
    
    if (userResult.data.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: '邮箱或密码错误' })
      }
    }
    
    const user = userResult.data[0]
    
    // 验证密码
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    
    if (user.password !== hashedPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: '邮箱或密码错误' })
      }
    }
    
    // 更新最后登录时间
    await db.collection('users').doc(user._id).update({
      lastLoginAt: new Date(),
      updatedAt: new Date()
    })
    
    // 生成访问令牌
    const token = generateToken(user._id)
    
    // 返回用户信息（不包含密码）
    const userInfo = { ...user }
    delete userInfo.password
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '登录成功',
        token,
        user: userInfo
      })
    }
  } catch (error) {
    throw new Error(`用户登录失败: ${error.message}`)
  }
}

// 获取用户资料
async function getUserProfile(params) {
  try {
    const { userId } = params
    
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '用户ID不能为空' })
      }
    }
    
    const userResult = await db.collection('users').doc(userId).get()
    
    if (!userResult.data.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: '用户不存在' })
      }
    }
    
    const user = userResult.data[0]
    delete user.password // 不返回密码
    
    // 获取用户成就
    const achievementsResult = await db.collection('user_achievements')
      .where({ userId: userId })
      .get()
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: {
          ...user,
          achievements: achievementsResult.data
        }
      })
    }
  } catch (error) {
    throw new Error(`获取用户资料失败: ${error.message}`)
  }
}

// 更新用户资料
async function updateUserProfile(params) {
  try {
    const { userId, username, bio, avatar } = params
    
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '用户ID不能为空' })
      }
    }
    
    const updateData = {
      updatedAt: new Date()
    }
    
    if (username) updateData.username = username
    if (bio !== undefined) updateData.bio = bio
    if (avatar !== undefined) updateData.avatar = avatar
    
    // 如果更新用户名，检查是否重复
    if (username) {
      const existingUser = await db.collection('users')
        .where({
          username: username,
          _id: db.command.neq(userId)
        })
        .get()
      
      if (existingUser.data.length > 0) {
        return {
          statusCode: 409,
          body: JSON.stringify({ error: '用户名已存在' })
        }
      }
    }
    
    await db.collection('users').doc(userId).update(updateData)
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '资料更新成功'
      })
    }
  } catch (error) {
    throw new Error(`更新用户资料失败: ${error.message}`)
  }
}

// 用户登出
async function logoutUser(params) {
  try {
    // 这里可以实现令牌黑名单等逻辑
    // 目前简单返回成功
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '登出成功'
      })
    }
  } catch (error) {
    throw new Error(`用户登出失败: ${error.message}`)
  }
}

// 生成访问令牌
function generateToken(userId) {
  const payload = {
    userId,
    timestamp: Date.now()
  }
  
  // 简单的令牌生成，实际项目中应使用JWT
  const token = crypto.createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex')
  
  return token
}