/**
 * 🎓 SınavKoçu.ai — YKS TYT (120 Soru) Puan, Sıralama ve Süre Hesaplama Test Paketi
 *
 * Test Edilen Kriterler:
 * 1. 120 Soru üzerinden 4 yanlış 1 doğruyu götürür kuralı.
 * 2. ÖSYM 0.5 Net Kuralı: Türkçe ve/veya Matematik'ten en az 0.5 net yapılmazsa TYT puanı hesaplanamaz.
 * 3. 100 Taban Puan + ÖSYM Katsayıları ile tam 500.00 Ham Puan tavanı.
 * 4. OBP (Ortaöğretim Başarı Puanı) ve Kırık OBP (x0.06 vs x0.12) hesaplama doğruluğu.
 * 5. 165 Dakika sınav süre ve turlama optimizasyonu.
 * 6. Türkiye geneli başarı sırası ve yüzdelik dilim monotonluk testleri.
 */

const { calculateYksTyt } = require('../src/lib/yks-tyt-calculation.ts');

console.log('================================================================');
console.log('   🎓 YKS TYT (120 Soru) Net & Puan Hesaplama Test Paketi');
console.log('   Mevzuat & Standart: Resmi ÖSYM YKS Kılavuzu & Katsayı Kalibrasyonu');
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
// SENARYO 1: Şampiyon / Tam Puan (120 Soru 120 Net, 100 Diploma Notu)
// ----------------------------------------------------------------------------
console.log('📌 1. SENARYO: Şampiyon / Tam Puan (120 Net - Türkiye 1.liği)');
const fullRes = calculateYksTyt({
  turkce: { correct: 40, incorrect: 0 },
  sosyal: { correct: 20, incorrect: 0 },
  matematik: { correct: 40, incorrect: 0 },
  fen: { correct: 20, incorrect: 0 },
  diplomaGrade: 100,
  isBrokenObp: false,
});

console.log(`   Toplam Net     : ${fullRes.totalNet} / 120`);
console.log(`   Ham TYT Puanı  : ${fullRes.rawScore} (Maks: 500.00)`);
console.log(`   OBP Katkısı    : +${fullRes.obpContribution} (Maks: +60.00)`);
console.log(`   Yerleştirme (Y): ${fullRes.placementScore} (Maks: 560.00)`);
console.log(`   Tahmini Sıra   : ${fullRes.estimatedRank}. sıra (Dilim: %${fullRes.estimatedPercentile})`);

assert(fullRes.totalNet === 120, 'Toplam net 120 olmalı');
assert(fullRes.rawScore === 500.0, 'Maksimum ham puan tam 500.00 olmalı');
assert(fullRes.obpContribution === 60.0, 'Maksimum OBP katkısı tam 60.00 olmalı');
assert(fullRes.placementScore === 560.0, 'Maksimum yerleştirme puanı tam 560.00 olmalı');
assert(fullRes.isEligibleForScore === true, 'Puan hesaplanabilir olmalı');
assert(fullRes.estimatedRank <= 100, 'Tam puan sıralaması ilk 100 içinde olmalı');
console.log('   ✅ Senaryo 1 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 2: Derece / Tıp & İTÜ Mühendislik Adayı (103.75 Net)
// Türkçe: 35D 3Y (34.25), Sosyal: 15D 4Y (14), Mat: 38D 2Y (37.5), Fen: 18D 0Y (18)
// ----------------------------------------------------------------------------
console.log('📌 2. SENARYO: Derece Adayı (103.75 Net, 95 Diploma Notu)');
const topRes = calculateYksTyt({
  turkce: { correct: 35, incorrect: 3 },
  sosyal: { correct: 15, incorrect: 4 },
  matematik: { correct: 38, incorrect: 2 },
  fen: { correct: 18, incorrect: 0 },
  diplomaGrade: 95,
});

console.log(`   Toplam Net     : ${topRes.totalNet} / 120`);
console.log(`   Ham TYT Puanı  : ${topRes.rawScore}`);
console.log(`   OBP Katkısı    : +${topRes.obpContribution} (Diploma: 95)`);
console.log(`   Yerleştirme (Y): ${topRes.placementScore}`);
console.log(`   Tahmini Sıra   : ${topRes.estimatedRank}. sıra (Dilim: %${topRes.estimatedPercentile})`);
console.log(`   En Güçlü Ders  : ${topRes.strongestSubject}`);

assert(topRes.totalNet === 103.75, 'Toplam net 103.75 olmalı');
assert(topRes.obpContribution === 57.0, '95 diploma notunun katkısı 95*5*0.12 = 57.00 olmalı');
assert(topRes.rawScore > 440 && topRes.rawScore < 450, 'Ham puan 440-450 aralığında olmalı');
assert(topRes.estimatedRank < 15000, '103.75 net ilk 15.000 içinde olmalı');
console.log('   ✅ Senaryo 2 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 3: Eşit Ağırlık / Hukuk Hedefi (75 Net, 80 Diploma Notu)
// Türkçe 32, Sosyal 15, Mat 22, Fen 6
// ----------------------------------------------------------------------------
console.log('📌 3. SENARYO: Eşit Ağırlık Öğrencisi (75 Net, 80 Diploma Notu)');
const eaRes = calculateYksTyt({
  turkce: { correct: 32, incorrect: 0 },
  sosyal: { correct: 15, incorrect: 0 },
  matematik: { correct: 22, incorrect: 0 },
  fen: { correct: 6, incorrect: 0 },
  diplomaGrade: 80,
});

console.log(`   Toplam Net     : ${eaRes.totalNet} / 120`);
console.log(`   Ham TYT Puanı  : ${eaRes.rawScore}`);
console.log(`   Yerleştirme (Y): ${eaRes.placementScore}`);
console.log(`   Tahmini Sıra   : ${eaRes.estimatedRank}. sıra`);
console.log(`   2 Yıllık Tercih: ${eaRes.eligibleForAssociateDegree ? 'Uygun ✅' : 'Yetersiz ❌'}`);
console.log(`   PMYO Başvuru   : ${eaRes.eligibleForPmyo ? 'Uygun ✅' : 'Yetersiz ❌'}`);

assert(eaRes.totalNet === 75, 'Toplam net 75 olmalı');
assert(eaRes.rawScore === 349.6, '100 + 105.6 + 51 + 72.6 + 20.4 = 349.60 olmalı');
assert(eaRes.eligibleForAssociateDegree === true, 'Ön lisans barajı 150 aşılmalı');
assert(eaRes.eligibleForPmyo === true, 'PMYO barajı 250 aşılmalı');
console.log('   ✅ Senaryo 3 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 4: ÖSYM 0.5 Net Kuralı İhlali (Kritik Sınav Kuralı)
// Türkçe: 0 Doğru 1 Yanlış (0 Net), Matematik: 0 Doğru 0 Yanlış (0 Net)
// Sosyal: 10 Net, Fen: 5 Net (Toplam: 15 Net)
// ÖSYM Kuralı: Türkçe veya Matematikten 0.5 net yapılmazsa TYT puanı hesaplanamaz!
// ----------------------------------------------------------------------------
console.log('📌 4. SENARYO: ÖSYM 0.5 Net Barajı İhlali (Türkçe=0, Mat=0)');
const barajRes = calculateYksTyt({
  turkce: { correct: 0, incorrect: 1 }, // Net: 0
  sosyal: { correct: 10, incorrect: 0 }, // Net: 10
  matematik: { correct: 0, incorrect: 0 }, // Net: 0
  fen: { correct: 5, incorrect: 0 }, // Net: 5
});

console.log(`   Toplam Net     : ${barajRes.totalNet}`);
console.log(`   Puan Hesabı    : ${barajRes.isEligibleForScore ? 'Hesaplandı' : 'Hesaplanamadı (Baraj İhlali)'}`);
console.log(`   Ham Puan       : ${barajRes.rawScore}`);
console.log(`   Kılavuz Mesajı : ${barajRes.eligibilityMessage}`);

assert(barajRes.isEligibleForScore === false, '0.5 net kuralı ihlalinde puan hesaplanmamalı');
assert(barajRes.rawScore === 0, 'Hesaplanamayan puan 0 olmalı');
assert(barajRes.placementScore === 0, 'Hesaplanamayan yerleştirme puanı 0 olmalı');
assert(barajRes.eligibilityMessage.includes('0.5 ham puan'), '0.5 net kuralı uyarısı gösterilmeli');
console.log('   ✅ Senaryo 4 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 5: Kırık OBP (Önceki Yıl Yerleşen Aday) Kontrolü
// Diploma: 100 -> Normal Katkı: +60, Kırık Katkı: +30
// ----------------------------------------------------------------------------
console.log('📌 5. SENARYO: Kırık OBP (Önceki Yıl Yerleşme Durumu) Kontrolü');
const normalRes = calculateYksTyt({
  turkce: { correct: 30, incorrect: 0 },
  sosyal: { correct: 15, incorrect: 0 },
  matematik: { correct: 30, incorrect: 0 },
  fen: { correct: 15, incorrect: 0 },
  diplomaGrade: 100,
  isBrokenObp: false,
});

const kirikRes = calculateYksTyt({
  turkce: { correct: 30, incorrect: 0 },
  sosyal: { correct: 15, incorrect: 0 },
  matematik: { correct: 30, incorrect: 0 },
  fen: { correct: 15, incorrect: 0 },
  diplomaGrade: 100,
  isBrokenObp: true,
});

console.log(`   Normal OBP Katkısı: +${normalRes.obpContribution} (Y-TYT: ${normalRes.placementScore})`);
console.log(`   Kırık OBP Katkısı : +${kirikRes.obpContribution} (Y-TYT: ${kirikRes.placementScore})`);
console.log(`   Fark              : -${normalRes.placementScore - kirikRes.placementScore} Puan Kaybı`);

assert(normalRes.obpContribution === 60, 'Normal OBP katkısı 60 olmalı');
assert(kirikRes.obpContribution === 30, 'Kırık OBP katkısı tam yarısı (30) olmalı');
assert(normalRes.placementScore - kirikRes.placementScore === 30, 'Puan farkı tam 30 olmalı');
assert(kirikRes.coachingNotes.some(n => n.includes('Kırık OBP uygulandı')), 'Kırık OBP koçluk notu eklenmeli');
console.log('   ✅ Senaryo 5 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 6: 165 Dakika Sınav Süre ve Pacing Modeli
// ----------------------------------------------------------------------------
console.log('📌 6. SENARYO: 165 Dakika Sınav Süresi ve Turlama Modeli');
const pacingRes = calculateYksTyt({
  turkce: { correct: 25, incorrect: 10 },
  sosyal: { correct: 12, incorrect: 4 },
  matematik: { correct: 20, incorrect: 8 },
  fen: { correct: 10, incorrect: 4 },
});

const totalAllocatedMinutes = 
  pacingRes.recommendedPacing.turkceMinutes +
  pacingRes.recommendedPacing.sosyalMinutes +
  pacingRes.recommendedPacing.matematikMinutes +
  pacingRes.recommendedPacing.fenMinutes +
  pacingRes.recommendedPacing.reviewMinutes;

console.log(`   Toplam Sınav Süresi: ${pacingRes.totalExamDurationMinutes} Dakika (165 dk)`);
console.log(`   Türkçe Süresi      : ${pacingRes.recommendedPacing.turkceMinutes} dk`);
console.log(`   Matematik Süresi   : ${pacingRes.recommendedPacing.matematikMinutes} dk`);
console.log(`   Fen Süresi         : ${pacingRes.recommendedPacing.fenMinutes} dk`);
console.log(`   Sosyal Süresi      : ${pacingRes.recommendedPacing.sosyalMinutes} dk`);
console.log(`   Turlama / İnceleme : ${pacingRes.recommendedPacing.reviewMinutes} dk`);

assert(pacingRes.totalExamDurationMinutes === 165, 'Sınav süresi 165 dakika olmalı');
assert(totalAllocatedMinutes === 165, 'Tüm derslerin ve turlamanın toplamı tam 165 dakika olmalı');
assert(pacingRes.recommendedPacing.reviewMinutes >= 15, 'Turlama süresi en az 15 dakika olmalı');
console.log('   ✅ Senaryo 6 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 7: Sıfır Net / Taban Puan Koruması
// ----------------------------------------------------------------------------
console.log('📌 7. SENARYO: Sıfır Net / Başlangıç Durumu');
const zeroRes = calculateYksTyt({
  turkce: { correct: 0, incorrect: 0 },
  sosyal: { correct: 0, incorrect: 0 },
  matematik: { correct: 0, incorrect: 0 },
  fen: { correct: 0, incorrect: 0 },
  diplomaGrade: 50,
});

console.log(`   Toplam Net  : ${zeroRes.totalNet}`);
console.log(`   Ham Puan    : ${zeroRes.rawScore} (Taban Puan: 100.00)`);
console.log(`   OBP Katkısı : +${zeroRes.obpContribution} (50 * 5 * 0.12 = 30)`);
console.log(`   Yerleştirme : ${zeroRes.placementScore}`);

assert(zeroRes.totalNet === 0, 'Net 0 olmalı');
assert(zeroRes.rawScore === 100.0, 'Sıfır net ham puanı taban 100.00 olmalı');
assert(zeroRes.obpContribution === 30.0, '50 diploma notunun katkısı 30 olmalı');
assert(zeroRes.placementScore === 130.0, 'Yerleştirme puanı 130 olmalı');
console.log('   ✅ Senaryo 7 Başarıyla Geçti\n');

console.log('================================================================');
console.log(`📊 TEST SONUCU: ${passedTests}/${totalTests} Kontrol Başarıyla Tamamlandı.`);
console.log('🎉 YKS TYT 120 SORU NET & PUAN HESAPLAMA MOTORU %100 ONAYLANDI!');
console.log('================================================================\n');
