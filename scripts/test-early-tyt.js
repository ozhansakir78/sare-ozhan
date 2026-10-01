/**
 * 🎓 SınavKoçu.ai — 11. Sınıf Erken TYT Başlangıç ve İlerleme Takip Motoru Test Paketi
 *
 * Test Edilen Kriterler:
 * 1. 70/30 Kuralı (11. Sınıf AYT %70, 9-10 TYT %30 çalışma saati dağılımı).
 * 2. Alan bazlı (Sayısal, EA, Sözel, Dil) hedef net kalibrasyonu ve ağırlıklandırma.
 * 3. Kritik darboğaz (bottleneck) tespiti ve uyarı mekanizması.
 * 4. 9 ve 10. sınıf temel konularının AYT bağlantısı ve öncelik sıralaması.
 * 5. Haftalık 7 günlük çalışma planı ve önerilen sınav havuzu entegrasyonu.
 * 6. Matematiksel sınır korumaları (negatif net koruması, 120 tavan kontrolü, haftalık saat sınırları).
 */

const { analyzeEarlyTytProgress } = require('../src/lib/early-tyt-engine.ts');

console.log('================================================================');
console.log('   🎓 11. Sınıf Erken TYT Başlangıç & İlerleme Takip Test Paketi');
console.log('   Mevzuat & Pedagoji: 70/30 AYT-TYT Denge Modeli & ÖSYM Kalibrasyonu');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ BAŞARISIZ: ${message}`);
    process.exit(1);
  }
  passedTests++;
}

// ----------------------------------------------------------------------------
// SENARYO 1: 11. Sınıf Sayısal Öğrencisi (Tıp / İTÜ Hedefi)
// Başlangıç: Türkçe 26, Sosyal 10, Mat 18, Fen 8 (Toplam: 62 net)
// ----------------------------------------------------------------------------
console.log('📌 1. SENARYO: 11. Sınıf Sayısal Öğrencisi (Tıp / Mühendislik Hedefi)');
const sayisalRes = analyzeEarlyTytProgress({
  track: 'sayisal',
  scores: { turkce: 26, sosyal: 10, matematik: 18, fen: 8 },
  weeklyStudyHours: 25,
  target12thGradeTytNet: 95,
});

console.log(`   Mevcut TYT Neti : ${sayisalRes.currentTotalNet} / 120`);
console.log(`   12. Sınıf Hedefi: ${sayisalRes.target12thGradeTytNet} (Fark: ${sayisalRes.netGap} net)`);
console.log(`   Seviye          : ${sayisalRes.levelTitle}`);
console.log(`   70/30 Süre Dağ. : AYT %${sayisalRes.timeAllocation.aytPercentage} (${sayisalRes.timeAllocation.aytHours} saat) | TYT %${sayisalRes.timeAllocation.tytPercentage} (${sayisalRes.timeAllocation.tytHours} saat)`);
console.log(`   Haftalık Soru H.: ${sayisalRes.timeAllocation.targetWeeklyQuestions} soru`);
console.log(`   Kritik Darboğaz : ${sayisalRes.criticalBottlenecks.join(' ')}`);

assert(sayisalRes.currentTotalNet === 62, 'Toplam net 62 olmalı');
assert(sayisalRes.timeAllocation.aytPercentage === 70, 'AYT yüzdesi %70 olmalı');
assert(sayisalRes.timeAllocation.tytPercentage === 30, 'TYT yüzdesi %30 olmalı');
assert(sayisalRes.timeAllocation.aytHours === 17.5, '25 saatin %70\'i 17.5 saat olmalı');
assert(sayisalRes.timeAllocation.tytHours === 7.5, '25 saatin %30\'u 7.5 saat olmalı');
assert(sayisalRes.subjectStrategies.matematik.status === 'acil_oncelik', 'Sayısal öğrencisinde 18 mat neti acil öncelik olmalı');
assert(sayisalRes.priorityFoundationalTopics.length > 0, 'Öncelikli temel konular üretilmeli');
assert(sayisalRes.weeklyPlan.length === 7, '7 günlük haftalık plan üretilmeli');
console.log('   ✅ Senaryo 1 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 2: 11. Sınıf Eşit Ağırlık Öğrencisi (Hukuk / İktisat Hedefi)
// Başlangıç: Türkçe 32, Sosyal 14, Mat 12, Fen 4 (Toplam: 62 net)
// ----------------------------------------------------------------------------
console.log('📌 2. SENARYO: 11. Sınıf Eşit Ağırlık Öğrencisi (Hukuk / İİBF Hedefi)');
const eaRes = analyzeEarlyTytProgress({
  track: 'esit_agirlik',
  scores: { turkce: 32, sosyal: 14, matematik: 12, fen: 4 },
  weeklyStudyHours: 20,
  target12thGradeTytNet: 82,
});

console.log(`   Mevcut TYT Neti : ${eaRes.currentTotalNet} / 120`);
console.log(`   12. Sınıf Hedefi: ${eaRes.target12thGradeTytNet} (Fark: ${eaRes.netGap} net)`);
console.log(`   Kritik Darboğaz : ${eaRes.criticalBottlenecks.join(' ')}`);
console.log(`   Matematik Notu  : ${eaRes.subjectStrategies.matematik.guidanceNote}`);

assert(eaRes.currentTotalNet === 62, 'Toplam net 62 olmalı');
assert(eaRes.subjectStrategies.matematik.status === 'acil_oncelik', 'EA öğrencisinde 12 mat neti acil öncelik olmalı');
assert(eaRes.criticalBottlenecks.some(b => b.includes('Eşit Ağırlıkta dereceyi Matematik netleri belirler')), 'EA matematik darboğaz uyarısı verilmeli');
console.log('   ✅ Senaryo 2 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 3: 11. Sınıf Sözel Öğrencisi (Medya & İletişim / Tarih Hedefi)
// Başlangıç: Türkçe 34, Sosyal 16, Mat 6, Fen 2 (Toplam: 58 net)
// ----------------------------------------------------------------------------
console.log('📌 3. SENARYO: 11. Sınıf Sözel Öğrencisi (İletişim / Tarih Hedefi)');
const sozelRes = analyzeEarlyTytProgress({
  track: 'sozel',
  scores: { turkce: 34, sosyal: 16, matematik: 6, fen: 2 },
  weeklyStudyHours: 18,
});

console.log(`   Mevcut TYT Neti : ${sozelRes.currentTotalNet} / 120`);
console.log(`   Sözel Hedefi    : ${sozelRes.target12thGradeTytNet} (Fark: ${sozelRes.netGap} net)`);
console.log(`   Türkçe Strateji : ${sozelRes.subjectStrategies.turkce.guidanceNote}`);

assert(sozelRes.currentTotalNet === 58, 'Toplam net 58 olmalı');
assert(sozelRes.target12thGradeTytNet === 75, 'Sözel için varsayılan hedef 75 net olmalı');
assert(sozelRes.priorityFoundationalTopics.some(t => t.id === 'tyt-tur-paragraf'), 'Paragraf konusu öncelikli olmalı');
console.log('   ✅ Senaryo 3 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 4: 11. Sınıf Yabancı Dil Öğrencisi (Mütercim Tercümanlık Hedefi)
// Başlangıç: Türkçe 30, Sosyal 12, Mat 8, Fen 3 (Toplam: 53 net)
// ----------------------------------------------------------------------------
console.log('📌 4. SENARYO: 11. Sınıf Yabancı Dil Öğrencisi (Mütercim Tercümanlık Hedefi)');
const dilRes = analyzeEarlyTytProgress({
  track: 'dil',
  scores: { turkce: 30, sosyal: 12, matematik: 8, fen: 3 },
  weeklyStudyHours: 15,
});

console.log(`   Mevcut TYT Neti : ${dilRes.currentTotalNet} / 120`);
console.log(`   Dil Hedefi      : ${dilRes.target12thGradeTytNet} (Fark: ${dilRes.netGap} net)`);
console.log(`   Haftalık Süre   : AYT/YDT ${dilRes.timeAllocation.aytHours} sa, TYT ${dilRes.timeAllocation.tytHours} sa`);

assert(dilRes.currentTotalNet === 53, 'Toplam net 53 olmalı');
assert(dilRes.target12thGradeTytNet === 70, 'Dil için varsayılan hedef 70 net olmalı');
console.log('   ✅ Senaryo 4 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 5: İleri Düzey Derece Adayı (Yüksek Başlangıç Neti)
// Başlangıç: Türkçe 36, Sosyal 17, Mat 34, Fen 16 (Toplam: 103 net)
// ----------------------------------------------------------------------------
console.log('📌 5. SENARYO: İleri Düzey Derece Adayı (103 Net)');
const dereceRes = analyzeEarlyTytProgress({
  track: 'sayisal',
  scores: { turkce: 36, sosyal: 17, matematik: 34, fen: 16 },
  weeklyStudyHours: 30,
  target12thGradeTytNet: 110,
});

console.log(`   Mevcut TYT Neti : ${dereceRes.currentTotalNet} / 120`);
console.log(`   Aşama           : ${dereceRes.levelTitle} (${dereceRes.netStatusLevel})`);
console.log(`   Darboğaz Durumu : ${dereceRes.criticalBottlenecks[0]}`);

assert(dereceRes.netStatusLevel === 'derece_hedefi', '103 net derece_hedefi seviyesinde olmalı');
assert(dereceRes.criticalBottlenecks[0].includes('Dengeli ve güçlü bir başlangıç netine sahipsin'), 'Güçlü profil mesajı dönmeli');
console.log('   ✅ Senaryo 5 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 6: Uç Durum ve Güvenlik Sınır Kontrolleri
// Eksi netler, 40+ ve 20+ aşımı, boş obje, çalışma saati alt/üst sınırları
// ----------------------------------------------------------------------------
console.log('📌 6. SENARYO: Sınır Değerleri & Güvenlik Korumaları');
const edgeRes = analyzeEarlyTytProgress({
  track: 'sayisal',
  scores: { turkce: -10, sosyal: 50, matematik: 100, fen: -5 },
  weeklyStudyHours: 100, // 40 ile sınırlanmalı
  target12thGradeTytNet: 200, // 120 ile sınırlanmalı
});

console.log(`   Kırpılmış Netler: Tr=${edgeRes.currentScores.turkce}, Sos=${edgeRes.currentScores.sosyal}, Mat=${edgeRes.currentScores.matematik}, Fen=${edgeRes.currentScores.fen}`);
console.log(`   Toplam Net      : ${edgeRes.currentTotalNet} (Beklenen: 0 + 20 + 40 + 0 = 60)`);
console.log(`   Kırpılmış Saat  : ${edgeRes.timeAllocation.totalWeeklyHours} (Beklenen: 40)`);
console.log(`   Kırpılmış Hedef : ${edgeRes.target12thGradeTytNet} (Beklenen: 120)`);

assert(edgeRes.currentScores.turkce === 0, 'Eksi Türkçe 0 olmalı');
assert(edgeRes.currentScores.sosyal === 20, '50 Sosyal 20 ile sınırlanmalı');
assert(edgeRes.currentScores.matematik === 40, '100 Matematik 40 ile sınırlanmalı');
assert(edgeRes.currentScores.fen === 0, 'Eksi Fen 0 olmalı');
assert(edgeRes.currentTotalNet === 60, 'Toplam net 60 olmalı');
assert(edgeRes.timeAllocation.totalWeeklyHours === 40, 'Haftalık saat 40 tavanı ile sınırlanmalı');
assert(edgeRes.target12thGradeTytNet === 120, 'Hedef net 120 ile sınırlanmalı');
console.log('   ✅ Senaryo 6 Başarıyla Geçti\n');

console.log('================================================================');
console.log(`📊 TEST SONUCU: ${passedTests}/${totalTests} Kontrol Başarıyla Tamamlandı.`);
console.log('🎉 11. SINIF ERKEN TYT BAŞLANGIÇ & İLERLEME MOTORU %100 ONAYLANDI!');
console.log('================================================================\n');
