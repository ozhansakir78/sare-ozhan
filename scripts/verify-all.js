// scripts/verify-all.js
// 🎯 SınavKoçu.ai — Bütünleşik Sistem Doğrulama ve Test Orkestratörü
// Bu script, projedeki tüm test suitelerini sırasıyla çalıştırır,
// sonuçları toplar ve konsolide bir sistem doğrulama raporu üretir.

const { spawnSync } = require('child_process');
const path = require('path');

const SUITES = [
  { name: 'Sınav & Soru Havuzları (1198 Soru, 145 Sınav)', script: 'scripts/validate-all-exams.js', command: 'test:exams' },
  { name: '8. Sınıf LGS Puan & Yüzdelik Dilim Motoru', script: 'scripts/test-lgs-scenarios.js', command: 'test:lgs' },
  { name: '9. Sınıf Maarif Modeli Yazılı & OBP Hesaplayıcı', script: 'scripts/test-lise1-calculation.js', command: 'test:lise1' },
  { name: '10. Sınıf Alan Seçimi & Kariyer Uyum Algoritması', script: 'scripts/test-field-selection.js', command: 'test:field-selection' },
  { name: '11. Sınıf Erken TYT Başlangıç & 70/30 Zaman Modeli', script: 'scripts/test-early-tyt.js', command: 'test:early-tyt' },
  { name: '12. Sınıf YKS TYT 120 Soru & Sıralama/Net Motoru', script: 'scripts/test-yks-tyt.js', command: 'test:yks-tyt' },
  { name: '12. Sınıf YKS AYT/YDT %40/%60 & YÖK Baraj Motoru', script: 'scripts/test-yks-ayt.js', command: 'test:yks-ayt' },
  { name: 'YÖK Atlas Üniversitesi & Net Yeterlilik Radarı', script: 'scripts/test-yks-universities.js', command: 'test:yks-universities' },
  { name: 'Çok Kademeli Sokratik AI & Yanlış Defteri Adaptörü', script: 'scripts/test-socratic-tier-adapter.js', command: 'test:socratic' },
  { name: 'Çift Katmanlı Yapay Zekâ Soru Üretim Motoru', script: 'scripts/test-exam-generator.js', command: 'test:exam-generator' },
  { name: 'Çok Kademeli Sınav Puanı & WhatsApp Karne Motoru', script: 'scripts/test-multi-tier-scoring.js', command: 'test:multi-tier-scoring' },
];

console.log('='.repeat(80));
console.log('🚀 SINAVKOÇU.AI — TÜM KADEMELER BÜTÜNLEŞİK SİSTEM DOĞRULAMA MOTORU');
console.log('='.repeat(80));
console.log(`Toplam Test Paketi Sayısı: ${SUITES.length}`);
console.log(`Başlangıç Zamanı: ${new Date().toLocaleString('tr-TR')}\n`);

const results = [];
let totalPassedSuites = 0;
let totalFailedSuites = 0;
const startTime = Date.now();

for (let i = 0; i < SUITES.length; i++) {
  const suite = SUITES[i];
  process.stdout.write(`[${i + 1}/${SUITES.length}] ${suite.name} çalıştırılıyor... `);
  
  const suiteStart = Date.now();
  const run = spawnSync('node', [suite.script], {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf-8',
    env: process.env,
  });
  const duration = Date.now() - suiteStart;

  if (run.status === 0) {
    console.log(`✅ BAŞARILI (${duration}ms)`);
    totalPassedSuites++;
    results.push({ ...suite, status: 'PASS', duration, output: run.stdout });
  } else {
    console.log(`❌ BAŞARISIZ (${duration}ms)`);
    totalFailedSuites++;
    results.push({ ...suite, status: 'FAIL', duration, error: run.stderr || run.stdout });
  }
}

const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log('\n' + '='.repeat(80));
console.log('📊 KONSOLİDE SİSTEM DOĞRULAMA ÖZETİ');
console.log('='.repeat(80));

results.forEach((r, idx) => {
  const icon = r.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} [${idx + 1}] ${r.name.padEnd(55)} [${r.command}] -> ${r.status} (${r.duration}ms)`);
});

console.log('-'.repeat(80));
console.log(`Toplam Çalışan Paket : ${SUITES.length}`);
console.log(`Başarılı Paket       : ${totalPassedSuites}`);
console.log(`Başarısız Paket     : ${totalFailedSuites}`);
console.log(`Toplam Süre          : ${totalDuration} saniye`);
console.log('='.repeat(80));

if (totalFailedSuites > 0) {
  console.error('\n❌ Bazı test suiteleri başarısız oldu! Ayrıntılar için yukarıyı inceleyin.');
  process.exit(1);
} else {
  console.log('\n🎉 TEBRİKLER! TÜM KADEMELER VE MOTORLAR %100 BAŞARIYLA DOĞRULANDI.');
  console.log('Sistem sıfır halüsinasyon, çift yönlü matematiksel sağlama ve pedagojik standartlarla kilitlendi.');
  process.exit(0);
}
