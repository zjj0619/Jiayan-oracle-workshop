const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('开始部署到 GitHub Pages...');
  
  // 确保 dist 目录存在
  if (!fs.existsSync('dist')) {
    console.error('错误: dist 目录不存在，请先运行 npm run build');
    process.exit(1);
  }
  
  // 切换到 dist 目录
  process.chdir('dist');
  
  // 初始化 git 仓库
  execSync('git init', { stdio: 'inherit' });
  
  // 添加所有文件
  execSync('git add .', { stdio: 'inherit' });
  
  // 提交
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  
  // 添加远程仓库
  execSync('git remote add origin https://github.com/zjj0619/jiayan-oracle-workshop.git', { stdio: 'inherit' });
  
  // 推送到 gh-pages 分支
  execSync('git push -f origin main:gh-pages', { stdio: 'inherit' });
  
  console.log('部署成功！');
  console.log('网站将在几分钟后在以下地址可用:');
  console.log('https://zjj0619.github.io/jiayan-oracle-workshop/');
  
} catch (error) {
  console.error('部署失败:', error.message);
  process.exit(1);
}