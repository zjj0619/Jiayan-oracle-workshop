// 甲言项目云函数部署配置
// 大梦归迟团队版权所有 © 2025

const deployConfig = {
  // 云开发环境ID
  envId: 'jiaguwen1-3gsjw2829a8d0ba1',
  
  // 云函数配置
  functions: [
    {
      name: 'ai-gateway-handler',
      runtime: 'Nodejs18.15',
      handler: 'index.main',
      timeout: 60,
      memorySize: 256,
      envVariables: {
        MODELSCOPE_API_KEY: 'ms-bb4bb335-0137-4107-9af6-af4ffc707d8a'
      },
      description: 'AI问答网关处理函数，支持文本问答和图像识别'
    },
    {
      name: 'community-handler',
      runtime: 'Nodejs18.15',
      handler: 'index.main',
      timeout: 30,
      memorySize: 256,
      description: '社区功能处理函数，支持帖子管理、评论、点赞等功能'
    },
    {
      name: 'auth-handler',
      runtime: 'Nodejs18.15',
      handler: 'index.main',
      timeout: 30,
      memorySize: 256,
      description: '用户认证处理函数，支持注册、登录、JWT验证等功能'
    }
  ],
  
  // 数据库集合配置
  collections: [
    {
      name: 'users',
      description: '用户信息集合'
    },
    {
      name: 'posts',
      description: '社区帖子集合'
    },
    {
      name: 'replies',
      description: '帖子回复集合'
    },
    {
      name: 'likes',
      description: '点赞记录集合'
    },
    {
      name: 'user_achievements',
      description: '用户成就集合'
    },
    {
      name: 'characters',
      description: '甲骨文字符集合'
    },
    {
      name: 'artifacts',
      description: '甲骨文物集合'
    },
    {
      name: 'papers',
      description: '学术论文集合'
    },
    {
      name: 'challenges',
      description: '学习挑战集合'
    }
  ],
  
  // 静态托管配置
  hosting: {
    localPath: './dist',
    cloudPath: '/',
    ignore: [
      '.git/**',
      'node_modules/**',
      '*.log',
      '.env*'
    ]
  }
}

module.exports = deployConfig