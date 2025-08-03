@echo off
REM 甲言项目启动脚本 (Windows版本)
REM 大梦归迟团队版权所有 © 2025

echo 🎋 甲言 - 甲骨文智慧传承工坊
echo 大梦归迟团队版权所有 © 2025
echo ================================

REM 检查 Node.js 版本
echo 📋 检查环境...
node -v
if %errorlevel% neq 0 (
    echo ❌ 请先安装 Node.js
    pause
    exit /b 1
)

REM 安装依赖
echo 📦 安装项目依赖...
npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

REM 启动开发服务器
echo 🚀 启动开发服务器...
echo ✨ 项目启动完成！
echo 🌐 访问地址: http://localhost:5173
echo 📚 项目文档: README.md
npm run dev

pause