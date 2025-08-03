# 甲言 - 甲骨文工作坊

🏛️ 一个专注于甲骨文研究、学习和文化传承的现代化Web应用平台

## 🌟 项目简介

甲言甲骨文工作坊是一个集甲骨文识别、学习、研究和社区交流于一体的综合性平台。通过现代化的Web技术，我们致力于让古老的甲骨文文化焕发新的生机。

## ✨ 核心功能

### 🔍 甲骨文识别与分析
- **智能识别**：上传甲骨文图片，AI自动识别文字内容
- **详细解析**：提供字符含义、历史背景、文化内涵
- **3D展示**：立体化展示甲骨文物，增强视觉体验

### 📚 学习与研究
- **互动学习**：通过游戏化方式学习甲骨文知识
- **学术资源**：丰富的研究资料和学术论文
- **专家解读**：权威专家对甲骨文的深度解析

### 🎨 文化创作
- **艺术生成**：基于甲骨文元素创作现代艺术作品
- **文化传承**：将古代文字与现代设计相结合
- **创意工坊**：用户可以创作属于自己的甲骨文作品

### 👥 社区交流
- **学术讨论**：研究者之间的学术交流平台
- **知识分享**：用户分享学习心得和研究成果
- **专家问答**：与甲骨文专家直接交流

## 🛠️ 技术栈

### 前端技术
- **React 18** - 现代化的用户界面框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **Radix UI** - 高质量的无障碍UI组件

### 后端服务
- **腾讯云开发** - 云原生后端服务
- **云函数** - 无服务器计算
- **云数据库** - NoSQL文档数据库
- **云存储** - 文件存储服务

### AI能力
- **ModelScope** - 阿里达摩院机器学习平台
- **图像识别** - 甲骨文字符识别
- **自然语言处理** - 智能问答系统

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
jiayan-oracle-workshop/
├── public/                 # 静态资源
│   └── images/            # 甲骨文图片资源
├── src/                   # 源代码
│   ├── components/        # React组件
│   │   ├── ui/           # 基础UI组件
│   │   ├── HomePage.tsx  # 首页组件
│   │   ├── AIQAPage.tsx  # AI问答页面
│   │   └── ...           # 其他功能组件
│   ├── hooks/            # 自定义React Hooks
│   ├── lib/              # 工具函数
│   └── main.tsx          # 应用入口
├── cloudfunctions/        # 云函数
│   ├── ai-gateway-handler/    # AI网关处理
│   ├── community-handler/     # 社区功能处理
│   └── auth-handler/          # 用户认证处理
└── .github/workflows/     # GitHub Actions配置
```

## 🌐 在线访问

- **GitHub Pages**: https://zjj0619.github.io/jiayan-oracle-workshop/
- **开发环境**: http://localhost:5173

## 🔧 配置说明

### 环境变量
项目使用腾讯云开发服务，相关配置在 `deploy.config.js` 中：

```javascript
const deployConfig = {
  envId: 'jiaguwen1-3gsjw2829a8d0ba1',  // 云开发环境ID
  // ... 其他配置
}
```

### 云函数部署
```bash
# 部署所有云函数
npm run deploy:functions

# 部署静态资源
npm run deploy:hosting
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 组件使用函数式组件和 Hooks
- 样式使用 Tailwind CSS

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 团队

**大梦归迟团队** - 致力于中华传统文化的数字化传承

## 📞 联系我们

- **GitHub Issues**: [提交问题](https://github.com/zjj0619/jiayan-oracle-workshop/issues)
- **邮箱**: contact@jiayan-oracle.com
- **官网**: https://jiayan-oracle.com

## 🙏 致谢

感谢所有为甲骨文研究和文化传承做出贡献的学者、专家和开发者们。

---

**让古老的文字在数字时代重新焕发光彩** ✨

© 2025 大梦归迟团队 版权所有