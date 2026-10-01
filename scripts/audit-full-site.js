// scripts/audit-full-site.js
const fs = require('fs');
const path = require('path');

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        walkDir(fullPath, fileList);
      }
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = walkDir(path.resolve(__dirname, '../src'));
console.log(`Toplam taranan dosya: ${allFiles.length}`);

const findings = [];

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const relFile = path.relative(path.resolve(__dirname, '..'), file);

    // 1. Fake user or participant count patterns
    if (/(\d+[,.]?\d*)\s*\+\s*(öğrenci|katılımcı|kullanıcı|veli|çözdü)/i.test(line)) {
      findings.push({ file: relFile, lineNum, type: 'YAPAY_SAYI_VE_SAYAC', line: line.trim() });
    }

    // 2. Mock / Fake / Dummy keywords in source
    if (/(mock|dummy|fake|lorem|ipsum)/i.test(line) && !relFile.includes('test') && !line.includes('//')) {
      findings.push({ file: relFile, lineNum, type: 'MOCK_KEYWORD', line: line.trim() });
    }

    // 3. Hardcoded fake names
    if (/(DereceAvcısı|FenLisesiYolcusu|KabatasHedef|LgsBükücü)/.test(line)) {
      findings.push({ file: relFile, lineNum, type: 'HARDCODED_SAHTE_KULLANICI', line: line.trim() });
    }

    // 4. Hardcoded old stats like "21 deneme"
    if (/21\s*deneme/i.test(line)) {
      findings.push({ file: relFile, lineNum, type: 'ESKI_METRIK', line: line.trim() });
    }

    // 5. Unsplash generic stock image in questions
    if (/unsplash\.com/i.test(line)) {
      findings.push({ file: relFile, lineNum, type: 'STOCK_IMAGE_PLACEHOLDER', line: line.trim() });
    }

    // 6. Hardcoded fallback percentages like 80% when empty
    if (/stats\.total\s*\|\|\s*3/i.test(line) || /stats\.total\s*>\s*0\s*\?\s*.*\s*:\s*80/i.test(line)) {
      findings.push({ file: relFile, lineNum, type: 'SAHTE_VARSAYILAN_ORAN', line: line.trim() });
    }
  });
});

console.log(`\nBulunan Bulgular (${findings.length} adet):`);
findings.forEach((f, i) => {
  console.log(`[${i + 1}] [${f.type}] ${f.file}:${f.lineNum}`);
  console.log(`    -> ${f.line}`);
});
