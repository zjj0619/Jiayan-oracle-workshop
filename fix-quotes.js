import fs from 'fs';

// 修复中文引号的函数
function fixChineseQuotes(content) {
  // 替换中文引号为英文引号
  return content
    .replace(/"/g, '"')  // 左双引号
    .replace(/"/g, '"')  // 右双引号
    .replace(/'/g, "'")  // 左单引号
    .replace(/'/g, "'"); // 右单引号
}

// 需要修复的文件列表
const filesToFix = [
  'src/components/OriginPage.tsx',
  'src/globals.css'
];

console.log('🔧 开始修复中文引号问题...');

filesToFix.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixChineseQuotes(content);
      
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`✅ 已修复: ${filePath}`);
      } else {
        console.log(`⏭️  无需修复: ${filePath}`);
      }
    } else {
      console.log(`❌ 文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
  }
});

console.log('🎉 修复完成！');