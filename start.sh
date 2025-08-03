#!/bin/bash
# 甲言项目启动脚本
# 大梦归迟团队版权所有 © 2025

echo "🎋 甲言 - 甲骨文智慧传承工坊"
echo "大梦归迟团队版权所有 © 2025"
echo "================================"

# 检查 Node.js 版本
echo "📋 检查环境..."
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 启动开发服务器
echo "🚀 启动开发服务器..."
npm run dev

echo "✨ 项目启动完成！"
echo "🌐 访问地址: http://localhost:5173"
echo "📚 项目文档: README.md"