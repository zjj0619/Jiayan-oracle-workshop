const cloud = require('@cloudbase/node-sdk')

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
      case '/api/v1/community/posts':
        if (httpMethod === 'GET') {
          return await getPosts(requestBody)
        } else if (httpMethod === 'POST') {
          return await createPost(requestBody)
        }
        break
        
      case '/api/v1/community/posts/like':
        if (httpMethod === 'POST') {
          return await toggleLike(requestBody)
        }
        break
        
      case '/api/v1/community/posts/reply':
        if (httpMethod === 'POST') {
          return await createReply(requestBody)
        }
        break
        
      case '/api/v1/community/posts/share':
        if (httpMethod === 'POST') {
          return await sharePost(requestBody)
        }
        break
        
      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: '接口不存在' })
        }
    }
  } catch (error) {
    console.error('社区功能处理错误:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '服务器内部错误',
        message: error.message 
      })
    }
  }
}

// 获取帖子列表
async function getPosts(params) {
  try {
    const { page = 1, limit = 20, category = 'all' } = params
    
    let query = db.collection('posts')
    
    if (category !== 'all') {
      query = query.where({
        category: category
      })
    }
    
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * limit)
      .limit(limit)
      .get()
    
    // 获取每个帖子的点赞数和回复数
    const postsWithStats = await Promise.all(
      result.data.map(async (post) => {
        const [likesResult, repliesResult] = await Promise.all([
          db.collection('likes').where({ postId: post._id }).count(),
          db.collection('replies').where({ postId: post._id }).count()
        ])
        
        return {
          ...post,
          likesCount: likesResult.total,
          repliesCount: repliesResult.total
        }
      })
    )
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        posts: postsWithStats,
        total: result.data.length,
        page,
        limit
      })
    }
  } catch (error) {
    throw new Error(`获取帖子列表失败: ${error.message}`)
  }
}

// 创建新帖子
async function createPost(params) {
  try {
    const { title, content, category, author, tags = [] } = params
    
    if (!title || !content || !author) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '标题、内容和作者不能为空' })
      }
    }
    
    const newPost = {
      title,
      content,
      category: category || '学术讨论',
      author,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published'
    }
    
    const result = await db.collection('posts').add(newPost)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: '帖子创建成功',
        postId: result.id,
        post: { ...newPost, _id: result.id }
      })
    }
  } catch (error) {
    throw new Error(`创建帖子失败: ${error.message}`)
  }
}

// 切换点赞状态
async function toggleLike(params) {
  try {
    const { postId, userId } = params
    
    if (!postId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '帖子ID和用户ID不能为空' })
      }
    }
    
    // 检查是否已经点赞
    const existingLike = await db.collection('likes')
      .where({
        postId,
        userId
      })
      .get()
    
    if (existingLike.data.length > 0) {
      // 取消点赞
      await db.collection('likes').doc(existingLike.data[0]._id).remove()
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: '取消点赞成功',
          liked: false
        })
      }
    } else {
      // 添加点赞
      const newLike = {
        postId,
        userId,
        createdAt: new Date()
      }
      
      await db.collection('likes').add(newLike)
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: '点赞成功',
          liked: true
        })
      }
    }
  } catch (error) {
    throw new Error(`点赞操作失败: ${error.message}`)
  }
}

// 创建回复
async function createReply(params) {
  try {
    const { postId, content, author, parentReplyId = null } = params
    
    if (!postId || !content || !author) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '帖子ID、回复内容和作者不能为空' })
      }
    }
    
    const newReply = {
      postId,
      content,
      author,
      parentReplyId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('replies').add(newReply)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: '回复创建成功',
        replyId: result.id,
        reply: { ...newReply, _id: result.id }
      })
    }
  } catch (error) {
    throw new Error(`创建回复失败: ${error.message}`)
  }
}

// 分享帖子
async function sharePost(params) {
  try {
    const { postId, userId, platform = 'internal' } = params
    
    if (!postId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '帖子ID和用户ID不能为空' })
      }
    }
    
    // 获取帖子信息
    const post = await db.collection('posts').doc(postId).get()
    
    if (!post.data.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: '帖子不存在' })
      }
    }
    
    // 记录分享行为
    const shareRecord = {
      postId,
      userId,
      platform,
      createdAt: new Date()
    }
    
    // 这里可以添加分享到不同平台的逻辑
    // 目前只是记录分享行为
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '分享成功',
        shareUrl: `https://jiayan.example.com/community/post/${postId}`,
        post: post.data[0]
      })
    }
  } catch (error) {
    throw new Error(`分享帖子失败: ${error.message}`)
  }
}