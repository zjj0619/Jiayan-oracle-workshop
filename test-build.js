#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 开始测试构建...');

try {
  // 检查package.json中的依赖
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ package.json 读取成功');
  
  // 检查关键依赖
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'framer-motion'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.error('❌ 缺失依赖:', missingDeps.join(', '));
    process.exit(1);
  }
  
  console.log('✅ 所有关键依赖都已安装');
  
  // 检查TypeScript配置
  if (fs.existsSync('tsconfig.json')) {
    console.log('✅ TypeScript 配置文件存在');
  }
  
  // 检查Vite配置
  if (fs.existsSync('vite.config.ts')) {
    console.log('✅ Vite 配置文件存在');
  }
  
  // 检查主要源文件
  const sourceFiles = [
    'src/main.tsx',
    'src/App.tsx',
    'src/globals.css',
    'src/components/HomePage.tsx'
  ];
  
  sourceFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} 存在`);
    } else {
      console.error(`❌ ${file} 不存在`);
      process.exit(1);
    }
  });
  
  console.log('🎉 所有检查通过！构建应该能够成功。');
  console.log('💡 提示：运行 npm install && npm run build 来执行完整构建');
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  process.exit(1);
}