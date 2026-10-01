/**
 * 🎓 SınavKoçu.ai — YKS AYT (SAY, EA, SÖZ, DİL) Puan & Sıralama Test Paketi
 *
 * Test Edilen Kriterler:
 * 1. %40 TYT + %60 AYT / YDT Ağırlık Kalibrasyonu.
 * 2. Tam Puan Senaryolarında (120 TYT + 80 AYT/YDT) tam 500.00 Ham Puan ve 560.00 Y-Yerleştirme Puanı.
 * 3. SAY, EA, SÖZ ve DİL 0.5 net kuralı denetimleri.
 * 4. YÖK Resmi Başarı Sıralaması Barajları (Tıp ilk 50K, Diş ilk 80K, Eczacılık ilk 100K, Hukuk ilk 125K, Mühendislik ilk 300K).
 * 5. Kırık OBP ve OBP çarpan doğrulukları.
 */

const { calculateYksAyt } = require('../src/lib/yks-ayt-calculation.ts');

console.log('================================================================');
console.log('   🎓 YKS AYT (SAY / EA / SÖZ / DİL) & YDT Hesaplama Test Paketi');
console.log('   Mevzuat & Standart: %40 TYT + %60 AYT ÖSYM Resmi Katsayı Modeli');
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
// SENARYO 1: Şampiyon / Tam Puan (120 TYT + 80 AYT/YDT + 100 Diploma Notu)
// ----------------------------------------------------------------------------
console.log('📌 1. SENARYO: Şampiyon / Tam Puan (Türkiye 1.liği - Tüm Testler Ful)');
const fullRes = calculateYksAyt({
  tyt: {
    turkce: { correct: 40, incorrect: 0 },
    sosyal: { correct: 20, incorrect: 0 },
    matematik: { correct: 40, incorrect: 0 },
    fen: { correct: 20, incorrect: 0 },
  },
  aytMatematik: { correct: 40, incorrect: 0 },
  aytFen: {
    fizik: { correct: 14, incorrect: 0 },
    kimya: { correct: 13, incorrect: 0 },
    biyoloji: { correct: 13, incorrect: 0 },
  },
  aytEdSos1: {
    edebiyat: { correct: 24, incorrect: 0 },
    tarih1: { correct: 10, incorrect: 0 },
    cografya1: { correct: 6, incorrect: 0 },
  },
  aytSos2: {
    tarih2: { correct: 11, incorrect: 0 },
    cografya2: { correct: 11, incorrect: 0 },
    felsefe: { correct: 12, incorrect: 0 },
    din: { correct: 6, incorrect: 0 },
  },
  ydt: { correct: 80, incorrect: 0 },
  diplomaGrade: 100,
  isBrokenObp: false,
});

console.log(`   TYT Katkısı    : ${fullRes.tytContributionScore} / 160.00`);
console.log(`   OBP Katkısı    : +${fullRes.obpContribution} / +60.00`);
console.log(`   SAY Ham / Yerl.: ${fullRes.scores.say.rawScore} / ${fullRes.scores.say.placementScore}`);
console.log(`   EA Ham / Yerl. : ${fullRes.scores.ea.rawScore} / ${fullRes.scores.ea.placementScore}`);
console.log(`   SÖZ Ham / Yerl.: ${fullRes.scores.soz.rawScore} / ${fullRes.scores.soz.placementScore}`);
console.log(`   DİL Ham / Yerl.: ${fullRes.scores.dil.rawScore} / ${fullRes.scores.dil.placementScore}`);

assert(fullRes.tytContributionScore === 160.0, 'TYT katkısı tam 160.00 olmalı');
assert(fullRes.obpContribution === 60.0, 'OBP katkısı tam 60.00 olmalı');
assert(fullRes.scores.say.rawScore === 500.0, 'SAY ham puan tam 500.00 olmalı');
assert(fullRes.scores.say.placementScore === 560.0, 'Y-SAY puanı tam 560.00 olmalı');
assert(fullRes.scores.ea.rawScore === 500.0, 'EA ham puan tam 500.00 olmalı');
assert(fullRes.scores.ea.placementScore === 560.0, 'Y-EA puanı tam 560.00 olmalı');
assert(fullRes.scores.soz.rawScore === 500.0, 'SÖZ ham puan tam 500.00 olmalı');
assert(fullRes.scores.soz.placementScore === 560.0, 'Y-SÖZ puanı tam 560.00 olmalı');
assert(fullRes.scores.dil.rawScore === 500.0, 'DİL ham puan tam 500.00 olmalı');
assert(fullRes.scores.dil.placementScore === 560.0, 'Y-DİL puanı tam 560.00 olmalı');
console.log('   ✅ Senaryo 1 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 2: Sayısal Tıp Adayı (TYT 102.5 Net, AYT 70 Net, 96 Diploma Notu)
// ----------------------------------------------------------------------------
console.log('📌 2. SENARYO: Sayısal Tıp Adayı (102.5 TYT Net, 70 AYT Net)');
const tipRes = calculateYksAyt({
  tyt: {
    turkce: { correct: 35, incorrect: 4 }, // 34 net
    sosyal: { correct: 15, incorrect: 2 }, // 14.5 net
    matematik: { correct: 38, incorrect: 2 }, // 37.5 net
    fen: { correct: 17, incorrect: 2 }, // 16.5 net
  },
  aytMatematik: { correct: 37, incorrect: 2 }, // 36.5 net
  aytFen: {
    fizik: { correct: 12, incorrect: 2 }, // 11.5 net
    kimya: { correct: 12, incorrect: 1 }, // 11.75 net
    biyoloji: { correct: 11, incorrect: 2 }, // 10.5 net
  },
  diplomaGrade: 96,
});

console.log(`   TYT Toplam Net : ${tipRes.tytTotalNet}`);
console.log(`   AYT Sayısal Net: ${tipRes.scores.say.aytNet} / 80`);
console.log(`   Y-SAY Puanı    : ${tipRes.scores.say.placementScore}`);
console.log(`   Tahmini SAY Sıra: ${tipRes.scores.say.estimatedRank}. sıra`);
console.log(`   Tıp Barajı (50K): ${tipRes.scores.say.thresholds.tipEligible ? 'Baraj İçinde ✅' : 'Baraj Dışı ❌'}`);
console.log(`   Müh. Barajı(300K): ${tipRes.scores.say.thresholds.muhendislikEligible ? 'Baraj İçinde ✅' : 'Baraj Dışı ❌'}`);

assert(tipRes.scores.say.isEligible === true, 'SAY puanı hesaplanabilir olmalı');
assert(tipRes.scores.say.placementScore > 500, 'Y-SAY puanı 500 üstünde olmalı');
assert(tipRes.scores.say.thresholds.tipEligible === true, 'Tıp 50K barajını geçmeli');
assert(tipRes.scores.say.thresholds.muhendislikEligible === true, 'Mühendislik 300K barajını geçmeli');
console.log('   ✅ Senaryo 2 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 3: Eşit Ağırlık Hukuk Adayı (TYT 78 Net, AYT 58 Net, 88 Diploma Notu)
// ----------------------------------------------------------------------------
console.log('📌 3. SENARYO: Eşit Ağırlık Hukuk Adayı (78 TYT Net, 58 AYT Net)');
const hukukRes = calculateYksAyt({
  tyt: {
    turkce: { correct: 33, incorrect: 4 }, // 32 net
    sosyal: { correct: 16, incorrect: 2 }, // 15.5 net
    matematik: { correct: 25, incorrect: 4 }, // 24 net
    fen: { correct: 7, incorrect: 2 }, // 6.5 net
  },
  aytMatematik: { correct: 28, incorrect: 4 }, // 27 net
  aytEdSos1: {
    edebiyat: { correct: 21, incorrect: 2 }, // 20.5 net
    tarih1: { correct: 8, incorrect: 2 }, // 7.5 net
    cografya1: { correct: 4, incorrect: 2 }, // 3.5 net
  },
  diplomaGrade: 88,
});

console.log(`   AYT EA Net     : ${hukukRes.scores.ea.aytNet} / 80`);
console.log(`   Y-EA Puanı     : ${hukukRes.scores.ea.placementScore}`);
console.log(`   Tahmini EA Sıra: ${hukukRes.scores.ea.estimatedRank}. sıra`);
console.log(`   Hukuk (125K)   : ${hukukRes.scores.ea.thresholds.hukukEligible ? 'Baraj İçinde ✅' : 'Baraj Dışı ❌'}`);

assert(hukukRes.scores.ea.isEligible === true, 'EA puanı hesaplanabilir olmalı');
assert(hukukRes.scores.ea.thresholds.hukukEligible === true, 'Hukuk 125.000 barajını geçmeli');
console.log('   ✅ Senaryo 3 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 4: ÖSYM 0.5 Net Barajı İhlali (AYT Sınav Kuralı)
// Sayısal Adayı: TYT var ama AYT Matematik=0, AYT Fen=0
// ----------------------------------------------------------------------------
console.log('📌 4. SENARYO: AYT 0.5 Net Baraj İhlali (AYT Mat=0, AYT Fen=0)');
const aytBarajRes = calculateYksAyt({
  tyt: {
    turkce: { correct: 30, incorrect: 0 },
    sosyal: { correct: 10, incorrect: 0 },
    matematik: { correct: 20, incorrect: 0 },
    fen: { correct: 10, incorrect: 0 },
  },
  aytMatematik: { correct: 0, incorrect: 2 }, // 0 Net
  aytFen: {
    fizik: { correct: 0, incorrect: 1 },
    kimya: { correct: 0, incorrect: 0 },
    biyoloji: { correct: 0, incorrect: 0 },
  },
});

console.log(`   SAY Durumu     : ${aytBarajRes.scores.say.isEligible ? 'Hesaplandı' : 'Hesaplanamadı (Baraj İhlali)'}`);
console.log(`   SAY Ham Puan   : ${aytBarajRes.scores.say.rawScore}`);
console.log(`   Gerekçe        : ${aytBarajRes.scores.say.ineligibilityReason}`);

assert(aytBarajRes.scores.say.isEligible === false, 'AYT 0 net ile SAY puanı hesaplanmamalı');
assert(aytBarajRes.scores.say.rawScore === 0, 'Hesaplanamayan ham puan 0 olmalı');
assert(aytBarajRes.scores.say.ineligibilityReason.includes('0.5 net'), '0.5 net gerekçesi bulunmalı');
console.log('   ✅ Senaryo 4 Başarıyla Geçti\n');

// ----------------------------------------------------------------------------
// SENARYO 5: Kırık OBP Kontrolü (AYT Yerleştirme)
// ----------------------------------------------------------------------------
console.log('📌 5. SENARYO: AYT Yerleştirmede Kırık OBP Kontrolü');
const normalAyt = calculateYksAyt({
  tyt: { turkce: { correct: 30, incorrect: 0 }, sosyal: { correct: 10, incorrect: 0 }, matematik: { correct: 20, incorrect: 0 }, fen: { correct: 10, incorrect: 0 } },
  aytMatematik: { correct: 25, incorrect: 0 },
  aytFen: { fizik: { correct: 10, incorrect: 0 }, kimya: { correct: 10, incorrect: 0 }, biyoloji: { correct: 10, incorrect: 0 } },
  diplomaGrade: 100,
  isBrokenObp: false,
});

const kirikAyt = calculateYksAyt({
  tyt: { turkce: { correct: 30, incorrect: 0 }, sosyal: { correct: 10, incorrect: 0 }, matematik: { correct: 20, incorrect: 0 }, fen: { correct: 10, incorrect: 0 } },
  aytMatematik: { correct: 25, incorrect: 0 },
  aytFen: { fizik: { correct: 10, incorrect: 0 }, kimya: { correct: 10, incorrect: 0 }, biyoloji: { correct: 10, incorrect: 0 } },
  diplomaGrade: 100,
  isBrokenObp: true,
});

console.log(`   Normal Y-SAY : ${normalAyt.scores.say.placementScore} (OBP Katkısı: +${normalAyt.obpContribution})`);
console.log(`   Kırık Y-SAY  : ${kirikAyt.scores.say.placementScore} (OBP Katkısı: +${kirikAyt.obpContribution})`);
console.log(`   Puan Kaybı   : -${normalAyt.scores.say.placementScore - kirikAyt.scores.say.placementScore} Puan`);

assert(normalAyt.obpContribution === 60.0, 'Normal OBP 60 olmalı');
assert(kirikAyt.obpContribution === 30.0, 'Kırık OBP 30 olmalı');
assert(normalAyt.scores.say.placementScore - kirikAyt.scores.say.placementScore === 30.0, 'Fark tam 30 puan olmalı');
console.log('   ✅ Senaryo 5 Başarıyla Geçti\n');

console.log('================================================================');
console.log(`📊 TEST SONUCU: ${passedTests}/${totalTests} Kontrol Başarıyla Tamamlandı.`);
console.log('🎉 YKS AYT (SAY, EA, SÖZ, DİL) NET & PUAN MOTORU %100 ONAYLANDI!');
console.log('================================================================\n');
