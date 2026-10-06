const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadExamsFromTsFile(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return [];
  const tsContent = fs.readFileSync(fullPath, 'utf8');
  const jsContent = ts.transpileModule(tsContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;

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

  const exams = [];
  for (const key of Object.keys(customModule.exports)) {
    const val = customModule.exports[key];
    if (Array.isArray(val) && val.length > 0 && val[0] && Array.isArray(val[0].questions)) {
      exams.push(...val);
    }
  }
  return exams;
}

const examFiles = [
  'src/lib/exams/full-lgs-exams.ts',
  'src/lib/exams/math-exams.ts',
  'src/lib/exams/turkish-exams.ts',
  'src/lib/exams/science-exams.ts',
  'src/lib/exams/verbal-exams.ts',
  'src/lib/exams/lgs-unit-tests.ts',
  'src/lib/exams/lise1-exams.ts',
  'src/lib/exams/lise1-unit-tests.ts',
  'src/lib/exams/lise2-exams.ts',
  'src/lib/exams/lise3-exams.ts',
  'src/lib/exams/yks-exams.ts',
];

let allExams = [];
for (const file of examFiles) {
  const loaded = loadExamsFromTsFile(file);
  console.log(`Loaded ${loaded.length} exams from ${path.basename(file)}`);
  allExams.push(...loaded);
}

console.log(`\nTotal Exams Loaded: ${allExams.length}`);

// Topic and content analysis
let totalQuestions = 0;
let suspiciousTopicMismatches = [];
let topicDistribution = {};

for (const exam of allExams) {
  const tier = exam.tier || 'lgs';
  const examTitle = exam.title;
  const examCourse = exam.courseKey || '';

  for (let idx = 0; idx < (exam.questions || []).length; idx++) {
    totalQuestions++;
    const q = exam.questions[idx];
    const qCourse = q.courseKey || examCourse;
    const topic = q.topicName || 'TANIMSIZ';

    const groupKey = `${tier}:${qCourse}`;
    if (!topicDistribution[groupKey]) {
      topicDistribution[groupKey] = new Set();
    }
    topicDistribution[groupKey].add(topic);

    const qTextLower = (q.questionText || '').toLowerCase();

    // Check for suspicious mismatches:
    // 1. Math equations in Verbal / History / Geography / Religion
    if (['tarih', 'cografya', 'din', 'felsefe', 'edebiyat', 'turkce', 'inkilap', 'ingilizce'].includes(qCourse)) {
      if (qTextLower.includes('f(x)') || qTextLower.includes('denkleminin kökleri') || qTextLower.includes('ebob') || qTextLower.includes('ekok') || qTextLower.includes('sin²') || qTextLower.includes('cos(')) {
        suspiciousTopicMismatches.push({
          examTitle,
          qNum: idx + 1,
          course: qCourse,
          topic,
          reason: 'Sayısal/Matematiksel formül sözel ders içine girmiş!',
          snippet: q.questionText.slice(0, 80),
        });
      }
    }

    // 2. Foreign language mismatch (e.g. English questions in History or Turkish in English)
    if (qCourse === 'ingilizce' && !/[a-zA-Z]{4,}\s+[a-zA-Z]{4,}/.test(q.questionText)) {
      suspiciousTopicMismatches.push({
        examTitle,
        qNum: idx + 1,
        course: qCourse,
        topic,
        reason: 'İngilizce dersinde İngilizce metin tespit edilemedi!',
        snippet: q.questionText.slice(0, 80),
      });
    }

    // 3. Question without topic
    if (!q.topicName || q.topicName.trim() === '' || q.topicName === 'TANIMSIZ') {
      suspiciousTopicMismatches.push({
        examTitle,
        qNum: idx + 1,
        course: qCourse,
        topic,
        reason: 'Konu adı boş bırakılmış!',
        snippet: q.questionText.slice(0, 80),
      });
    }
  }
}

console.log(`Total Questions Analyzed: ${totalQuestions}`);
console.log(`Suspicious Topic Mismatches Found: ${suspiciousTopicMismatches.length}`);

if (suspiciousTopicMismatches.length > 0) {
  console.log('\n--- ŞÜPHELİ UYUMSUZLUKLAR ---');
  console.log(JSON.stringify(suspiciousTopicMismatches.slice(0, 10), null, 2));
}

console.log('\n--- DERS VE KADEME BAZINDA FARKLI KONU SAYILARI ---');
for (const [key, topics] of Object.entries(topicDistribution)) {
  console.log(`- ${key}: ${topics.size} farklı konu (${Array.from(topics).slice(0, 3).join(', ')}...)`);
}
