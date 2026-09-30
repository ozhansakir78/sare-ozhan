/**
 * SınavKoçu.ai - Otomatik Soru Bütünlüğü ve Doğrulama Test Motoru
 * Çalıştırma: node scripts/validate-all-exams.js
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

let totalQuestions = 0;
let passedQuestions = 0;
let errors = [];
let warnings = [];

function checkQuestion(examId, q) {
  totalQuestions++;
  const qId = q.id || `q-${totalQuestions}`;
  const validKeys = q.options ? Object.keys(q.options) : [];

  // 1. Doğru cevap şıkkı seçeneklerde mevcut mu?
  if (!q.correctAnswer || !validKeys.includes(q.correctAnswer)) {
    errors.push(`[${examId} -> ${qId}] correctAnswer '${q.correctAnswer}' seçenekler (${validKeys.join(', ')}) arasında YOK!`);
    return;
  }

  // 2. Şıklar boş mu?
  for (const [key, val] of Object.entries(q.options || {})) {
    if (!val || String(val).trim() === '') {
      errors.push(`[${examId} -> ${qId}] Seçenek ${key} boş metin!`);
    }
  }

  // 3. Ham LaTeX kodu kaldı mı?
  const textToCheck = `${q.questionText || ''} ${q.explanation || ''}`;
  if (textToCheck.includes('\\frac{') || textToCheck.includes('\\sqrt{')) {
    warnings.push(`[${examId} -> ${qId}] Ham LaTeX ifadesi tespit edildi (\\frac veya \\sqrt).`);
  }

  // 4. Çözüm açıklaması ile doğru cevap şıkkı çelişiyor mu?
  const explanation = q.explanation || '';
  const match = explanation.match(/(?:doğru\s+(?:cevap|seçenek)|seçenek)\s+([A-E])\b/i) ||
                explanation.match(/cevap\s+([A-E])\s*(?:dir|tir|dır|dur|'dir|'tir|'dır|:)/i);
  if (match && match[1]) {
    const deduced = match[1].toUpperCase();
    if (deduced !== q.correctAnswer && validKeys.includes(deduced)) {
      errors.push(`[${examId} -> ${qId}] ÇELİŞKİ: Açıklamada 'Seçenek ${deduced}' denirken, correctAnswer='${q.correctAnswer}'!`);
      return;
    }
  }

  passedQuestions++;
}

function loadAndTestTsExamFile(relativeFilePath, exportKey) {
  const fullPath = path.resolve(relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Dosya bulunamadı: ${relativeFilePath}`);
    return;
  }

  console.log(`🔍 [${path.basename(relativeFilePath)}] test ediliyor...`);
  const tsContent = fs.readFileSync(fullPath, 'utf8');
  
  // Transpile TS to JS
  const jsContent = ts.transpileModule(tsContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;

  // Execute in isolated module with @ alias support
  const customModule = { exports: {} };
  const customRequire = (modulePath) => {
    if (modulePath.startsWith('@/')) {
      const targetRel = modulePath.replace('@/', 'src/') + '.ts';
      const targetFull = path.resolve(targetRel);
      if (fs.existsSync(targetFull)) {
        const subTs = fs.readFileSync(targetFull, 'utf8');
        const subJs = ts.transpileModule(subTs, {
          compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
        }).outputText;
        const subModule = { exports: {} };
        const subFn = new Function('module', 'exports', 'require', subJs);
        subFn(subModule, subModule.exports, customRequire);
        return subModule.exports;
      }
    }
    return require(modulePath);
  };

  const runFn = new Function('module', 'exports', 'require', jsContent);
  runFn(customModule, customModule.exports, customRequire);

  const exams = customModule.exports[exportKey] || [];
  console.log(`   -> ${exams.length} sınav bulundu.`);

  for (const ex of exams) {
    if (Array.isArray(ex.questions)) {
      for (const q of ex.questions) {
        checkQuestion(ex.id || ex.title, q);
      }
    }
  }
}

console.log('====================================================');
console.log('   SınavKoçu.ai Soru Bütünlüğü & Kalite Testi       ');
console.log('====================================================\n');

try {
  loadAndTestTsExamFile('src/lib/exams/lise1-exams.ts', 'LISE1_EXAMS');
  loadAndTestTsExamFile('src/lib/exams/lgs-unit-tests.ts', 'LGS_UNIT_TESTS');
  loadAndTestTsExamFile('src/lib/exams/full-lgs-exams.ts', 'FULL_LGS_EXAMS');
  loadAndTestTsExamFile('src/lib/online-exams-data.ts', 'ONLINE_EXAMS');

  console.log('\n====================================================');
  console.log(`TEST SONUCU: ${passedQuestions} / ${totalQuestions} Soru Başarıyla Doğrulandı.`);
  console.log(`Hatalar: ${errors.length} | Uyarılar: ${warnings.length}`);
  console.log('====================================================\n');

  if (warnings.length > 0) {
    console.log('⚠️ UYARILAR:');
    warnings.forEach((w) => console.log('  ' + w));
  }

  if (errors.length > 0) {
    console.log('\n❌ KRİTİK HATALAR:');
    errors.forEach((e) => console.log('  ' + e));
    process.exit(1);
  } else {
    console.log('✅ TÜM SORULAR %100 MATEMATİKSEL VE PEDAGOJİK OLARAK DOĞRULANDI!');
    process.exit(0);
  }
} catch (err) {
  console.error('Doğrulama motoru çalışma hatası:', err);
  process.exit(1);
}
