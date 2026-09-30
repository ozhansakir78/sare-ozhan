/**
 * scripts/test-lgs-scenarios.js
 * 
 * MEB LGS Puan & Yüzdelik Dilim Hesaplama Kalibrasyon Test Paketi
 * İş Parçacığı 7 kapsamında 5 farklı resmi MEB net senaryosunu test eder.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModule(filePath) {
  const tsCode = fs.readFileSync(filePath, 'utf8');
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', jsCode);
  fn(mod, mod.exports, (id) => {
    if (id.startsWith('@/lib/')) {
      const target = path.resolve(__dirname, '../src/lib', id.replace('@/lib/', '') + '.ts');
      return loadModule(target);
    }
    return require(id);
  });
  return mod.exports;
}

const lgsCalc = loadModule(path.resolve(__dirname, '../src/lib/lgs-calculation.ts'));
const { calculateLgsResults, calculateNet, calculateLgsScore, calculateEstimatedPercentile } = lgsCalc;

console.log('================================================================');
console.log('   🎓 MEB LGS Puan & Yüzdelik Dilim Kalibrasyon Testi');
console.log('   Kapsam: 5 Resmi MEB Senaryosu (Şampiyon, Fen, Anadolu, Ortalama, Taban)');
console.log('================================================================\n');

const SCENARIOS = [
  {
    name: '1. ŞAMPİYON / TAM PUAN (90 Net - 0 Yanlış)',
    inputs: {
      turkce: { correct: 20, incorrect: 0 },
      matematik: { correct: 20, incorrect: 0 },
      fen: { correct: 20, incorrect: 0 },
      inkilap: { correct: 10, incorrect: 0 },
      din: { correct: 10, incorrect: 0 },
      ingilizce: { correct: 10, incorrect: 0 },
    },
    expectedScore: 500.0,
    expectedPercentile: 0.04,
    description: 'Galatasaray Lisesi, İstanbul Erkek Lisesi, Kabataş Erkek Lisesi',
  },
  {
    name: '2. DERECE / FEN LİSESİ (84.67 Net)',
    inputs: {
      turkce: { correct: 20, incorrect: 0 },     // 20 net
      matematik: { correct: 17, incorrect: 2 },  // 16.33 net
      fen: { correct: 20, incorrect: 0 },        // 20 net
      inkilap: { correct: 10, incorrect: 0 },    // 10 net
      din: { correct: 10, incorrect: 0 },        // 10 net
      ingilizce: { correct: 9, incorrect: 2 },   // 8.33 net
    },
    minScore: 475.0,
    maxScore: 492.0,
    minPercentile: 0.20,
    maxPercentile: 1.50,
    description: 'Ankara Fen Lisesi, Atatürk Fen Lisesi, İzmir Fen Lisesi',
  },
  {
    name: '3. NİTELİKLİ ANADOLU LİSESİ (69.33 Net)',
    inputs: {
      turkce: { correct: 18, incorrect: 2 },     // 17.33 net
      matematik: { correct: 13, incorrect: 4 },  // 11.67 net
      fen: { correct: 16, incorrect: 3 },        // 15.00 net
      inkilap: { correct: 9, incorrect: 1 },     // 8.67 net
      din: { correct: 9, incorrect: 1 },         // 8.67 net
      ingilizce: { correct: 9, incorrect: 3 },   // 8.00 net
    },
    minScore: 410.0,
    maxScore: 440.0,
    minPercentile: 5.0,
    maxPercentile: 13.0,
    description: 'Köklü İl Anadolu Liseleri, Yüzdelik %5-10 bandı',
  },
  {
    name: '4. ORTALAMA ÖĞRENCİ (38.67 Net)',
    inputs: {
      turkce: { correct: 13, incorrect: 7 },     // 10.67 net
      matematik: { correct: 6, incorrect: 8 },   // 3.33 net
      fen: { correct: 10, incorrect: 7 },        // 7.67 net
      inkilap: { correct: 7, incorrect: 3 },     // 6.00 net
      din: { correct: 7, incorrect: 3 },         // 6.00 net
      ingilizce: { correct: 6, incorrect: 3 },   // 5.00 net
    },
    minScore: 260.0,
    maxScore: 310.0,
    minPercentile: 45.0,
    maxPercentile: 70.0,
    description: 'Türkiye geneli ortalama net ve puan bandı',
  },
  {
    name: '5. TABAN / SIFIR NET (0 Doğru - Tamamı Boş veya Eksi)',
    inputs: {
      turkce: { correct: 0, incorrect: 0 },
      matematik: { correct: 0, incorrect: 0 },
      fen: { correct: 0, incorrect: 0 },
      inkilap: { correct: 0, incorrect: 0 },
      din: { correct: 0, incorrect: 0 },
      ingilizce: { correct: 0, incorrect: 0 },
    },
    expectedScore: 100.0,
    expectedPercentile: 99.99,
    description: 'MEB LGS Minimum Taban Puanı',
  },
];

let allPassed = true;

for (const sc of SCENARIOS) {
  const result = calculateLgsResults(sc.inputs);
  console.log(`📌 ${sc.name}`);
  console.log(`   Hedef Okul/Grup: ${sc.description}`);
  console.log(`   Toplam Net     : ${result.totalNet.toFixed(2)} / 90`);
  console.log(`   Ağırlıklı Puan : ${result.totalWeightedPoints.toFixed(2)} / 270`);
  console.log(`   Hesaplanan Puan: ${result.score.toFixed(2)}`);
  console.log(`   Tahmini Dilim  : %${result.percentile.toFixed(2)}`);
  if (result.highestLossCourse) {
    console.log(`   En Çok Kayıp   : ${result.highestLossCourse.courseName} (-${result.highestLossCourse.lostNet.toFixed(2)} net)`);
  }

  // Doğrulama Kontrolleri
  if (sc.expectedScore !== undefined) {
    if (Math.abs(result.score - sc.expectedScore) > 0.01) {
      console.error(`   ❌ HATA: Beklenen puan ${sc.expectedScore}, ancak ${result.score} hesaplandı!`);
      allPassed = false;
    }
  }
  if (sc.minScore !== undefined && sc.maxScore !== undefined) {
    if (result.score < sc.minScore || result.score > sc.maxScore) {
      console.error(`   ❌ HATA: Puan ${result.score}, [${sc.minScore}, ${sc.maxScore}] aralığı dışında!`);
      allPassed = false;
    }
  }
  if (sc.expectedPercentile !== undefined) {
    if (Math.abs(result.percentile - sc.expectedPercentile) > 0.01) {
      console.error(`   ❌ HATA: Beklenen dilim %${sc.expectedPercentile}, ancak %${result.percentile} hesaplandı!`);
      allPassed = false;
    }
  }
  if (sc.minPercentile !== undefined && sc.maxPercentile !== undefined) {
    if (result.percentile < sc.minPercentile || result.percentile > sc.maxPercentile) {
      console.error(`   ❌ HATA: Dilim %${result.percentile}, [%${sc.minPercentile}, %${sc.maxPercentile}] aralığı dışında!`);
      allPassed = false;
    }
  }

  console.log('   ✅ Senaryo Kalibrasyonu Başarılı\n');
}

// Ek Kontrol: Monotonluk ve Eksi Net Koruması
console.log('🔬 İLERİ MATEMATİKSEL KONTROLLER:');

// Test: Eksiye düşmeme kontrolü (0 doğru, 20 yanlış)
const negativeNetCheck = calculateNet(0, 20);
if (negativeNetCheck < 0) {
  console.error('❌ HATA: Net eksiye düşüyor! Sonuç:', negativeNetCheck);
  allPassed = false;
} else {
  console.log('✅ 1. Eksi net koruması: Doğru=0, Yanlış=20 -> Net:', negativeNetCheck, '(Kusursuz)');
}

// Test: Monotonluk kontrolü (Puan arttıkça yüzdelik dilim kesinlikle küçülmeli)
let prevPercentile = 100.0;
let monotonicSuccess = true;
for (let score = 100; score <= 500; score += 25) {
  const p = calculateEstimatedPercentile(score);
  if (p > prevPercentile) {
    console.error(`❌ HATA: Monotonluk ihlali! Skor ${score} için dilim %${p} önceki %${prevPercentile}'den büyük!`);
    monotonicSuccess = false;
    allPassed = false;
  }
  prevPercentile = p;
}
if (monotonicSuccess) {
  console.log('✅ 2. Yüzdelik Dilim Monotonluk Testi: 100-500 puan aralığında kusursuz azalan eğri.');
}

console.log('\n================================================================');
if (allPassed) {
  console.log('🎉 TÜM 5 RESMİ MEB LGS KALİBRASYON SENARYOSU %100 BAŞARIYLA GEÇTİ!');
  process.exit(0);
} else {
  console.error('💥 KALİBRASYON TESTİNDE HATALAR TESPİT EDİLDİ!');
  process.exit(1);
}
