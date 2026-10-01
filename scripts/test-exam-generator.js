/**
 * Test: Yapay Zekâ Soru Üretim Motorunun Tüm Kademelerde Çift Katmanlı Sağlama Koruması Testi
 * Antigravity YKS Modülü - FAZ G (İş Parçacığı 23)
 */

import {
  validateAndHealQuestion,
  sanitizeFormulasAndLatex,
  buildExamGenerationPrompt,
  resolveTierCourseName,
  getFallbackQuestions,
} from '../src/lib/exam-generator-engine.ts';

let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  if (condition) {
    passedChecks++;
    console.log(`  ✅ ${message}`);
  } else {
    failedChecks++;
    console.error(`  ❌ HATA: ${message}`);
  }
}

console.log('================================================================');
console.log('   🛡️  AI Soru Üretim Motoru Çift Katmanlı Sağlama Koruması Testi');
console.log('   Kapsam: LGS, 9, 10, 11, YKS (10 Farklı Ders & Sağlama Koruması)');
console.log('================================================================\n');

// 1. KATMAN 1: Çözüm ile Şık Uyumu ve Otomatik İyileştirme (Consistency Healing)
console.log('📌 1. KONTROL: Katman 1 - Çözüm vs Şık Uyuşmazlığı Otomatik İyileştirme');
const conflictedQuestion = {
  questionNumber: 1,
  questionText: 'Bir hareketlinin konumu x(t) = 3t² + 2t fonksiyonu ile veriliyor.',
  options: {
    A: '8',
    B: '12',
    C: '14',
    D: '18',
    E: '20',
  },
  correctAnswer: 'A', // Yapay zekâ yanlışlıkla A demiş olsun
  explanation: '1. Adım: t = 2 için x(2) = 3 · (4) + 4 = 12 + 4 = 16 değil, 3·4 + 2·2 = 14 bulunur.\nDoğru seçenek C\'dir.',
};

const healedQ1 = validateAndHealQuestion(
  conflictedQuestion,
  'yks',
  'fizik',
  'AYT Fizik',
  'Bağıl Hareket',
  0
);

assert(healedQ1.correctAnswer === 'C', 'Yapay zekanın "A" hatası açıklamada geçen "C" ile otomatik düzeltildi');
assert(healedQ1.explanation.includes("Doğru seçenek C'dir."), 'Çözümün son cümlesi doğru şıkkı teyit ediyor');

// Eksik bitişli soru
const missingEndingQuestion = {
  questionNumber: 2,
  questionText: 'P(x) polinomunun x - 1 ile bölümünden kalan kaçtır?',
  options: { A: '1', B: '2', C: '3', D: '4' },
  correctAnswer: 'B',
  explanation: 'P(1) değerini hesapladığımızda sonuç 2 çıkmaktadır.',
};

const healedQ2 = validateAndHealQuestion(
  missingEndingQuestion,
  'lgs',
  'matematik',
  'Matematik',
  'Polinomlar',
  1
);
assert(healedQ2.explanation.includes("Doğru seçenek B'dir."), 'Eksik bitiş cümlesi correctAnswer ile otomatik eklendi');

// 2. KATMAN 2: Formül, Üs ve LaTeX Temizleme Koruması
console.log('\n📌 2. KONTROL: Katman 2 - Formül, Üs ve LaTeX Temizleme');
const dirtyMath = 'Hesaplama: $x^2 + 2x + 1$ ve $\\frac{a}{b} = \\sqrt{16}$ ve $2^3 \\cdot 4 \\times 5$';
const cleanMath = sanitizeFormulasAndLatex(dirtyMath);

assert(!cleanMath.includes('$'), 'LaTeX dolar işaretleri ($) tamamen temizlendi');
assert(!cleanMath.includes('\\frac'), '\\frac kesir kodu temizlendi');
assert(!cleanMath.includes('\\sqrt'), '\\sqrt karekök kodu Unicode köke çevrildi');
assert(cleanMath.includes('²'), 'Bilgisayar üs işareti (^2) Unicode kareye (²) dönüştürüldü');
assert(cleanMath.includes('³'), 'Bilgisayar üs işareti (^3) Unicode küpe (³) dönüştürüldü');
assert(cleanMath.includes('·'), '\\cdot çarpma simgesine dönüştürüldü');
assert(cleanMath.includes('×'), '\\times çarpma simgesine dönüştürüldü');

// 3. KADEME SEÇENEK SAYISI (LGS=4, Lise ve YKS=5)
console.log('\n📌 3. KONTROL: Kademelere Göre Şık Sayısı Standartları');
const lgsQ = validateAndHealQuestion({
  questionText: 'LGS Sorusu',
  options: { A: '1', B: '2', C: '3', D: '4', E: '5' },
  correctAnswer: 'A',
}, 'lgs', 'matematik', 'Matematik', 'Üslü İfadeler', 0);
assert(Object.keys(lgsQ.options).length === 4, 'LGS için tam 4 şık (A, B, C, D) sağlandı (E şıkkı yok)');

const yksQ = validateAndHealQuestion({
  questionText: 'YKS Sorusu',
  options: { A: '1', B: '2', C: '3', D: '4', E: '5' },
  correctAnswer: 'E',
}, 'yks', 'matematik', 'AYT Matematik', 'İntegral', 0);
assert(Object.keys(yksQ.options).length === 5, 'YKS için tam 5 şık (A, B, C, D, E) sağlandı');

const lise1Q = validateAndHealQuestion({
  questionText: '9. Sınıf Sorusu',
  options: { A: '1', B: '2', C: '3', D: '4', E: '5' },
  correctAnswer: 'D',
}, 'lise1', 'fizik', 'Fizik', 'Kuvvet', 0);
assert(Object.keys(lise1Q.options).length === 5, '9. Sınıf için tam 5 şık (A, B, C, D, E) sağlandı');

// 4. 10 FARKLI DERSTE PROMPT VE KAZANIM ANALİZİ
console.log('\n📌 4. KONTROL: 10 Farklı Derste Canlı Prompt ve Standart Doğrulaması');
const testSubjects = [
  { tier: 'lgs', courseKey: 'matematik', name: 'Matematik', topic: 'Çarpanlar ve Katlar' },
  { tier: 'lgs', courseKey: 'fen', name: 'Fen Bilimleri', topic: 'Mevsimler ve İklim' },
  { tier: 'lgs', courseKey: 'turkce', name: 'Türkçe', topic: 'Fiilimsiler' },
  { tier: 'lise1', courseKey: 'edebiyat', name: 'Türk Dili ve Edebiyatı', topic: 'Şiir Bilgisi & Edebi Sanatlar' },
  { tier: 'lise1', courseKey: 'matematik', name: 'Matematik', topic: 'Kümeler & Mantık' },
  { tier: 'lise2', courseKey: 'fizik', name: 'Fizik', topic: 'Elektrik ve Manyetizma' },
  { tier: 'lise2', courseKey: 'kimya', name: 'Kimya', topic: 'Mol Kavramı' },
  { tier: 'lise3', courseKey: 'matematik', name: 'İleri Matematik', topic: 'Trigonometri' },
  { tier: 'lise3', courseKey: 'biyoloji', name: 'İleri Biyoloji', topic: 'Dolaşım Sistemi' },
  { tier: 'yks', courseKey: 'fizik', name: 'AYT İleri Fizik', topic: 'Modern Fizik & Fotoelektrik' },
];

for (let i = 0; i < testSubjects.length; i++) {
  const s = testSubjects[i];
  const { systemPrompt, jsonSchemaInstruction } = buildExamGenerationPrompt(
    s.tier,
    s.courseKey,
    s.name,
    s.topic,
    5,
    'ÖSYM / MEB Düzeyi'
  );

  assert(systemPrompt.length > 50, `[${i + 1}/10] ${s.tier.toUpperCase()} ${s.name} systemPrompt üretildi`);
  assert(jsonSchemaInstruction.includes('ÖNEMLİ MATEMATİK VE PEDAGOJİ KURALLARI'), `[${i + 1}/10] Pedagojik kurallar json şemada mevcut`);
  assert(!jsonSchemaInstruction.includes('$ işareti hariç'), `[${i + 1}/10] Güvenli dil yapısı korundu`);
}

// 5. YEDEK HAVUZ MOTORU GÜVENLİĞİ (Fallback Engine)
console.log('\n📌 5. KONTROL: Yapay Zekâ Fallback Havuz Motoru Güvenliği');
const lgsFallback = getFallbackQuestions('lgs', 'matematik', 4);
assert(lgsFallback.length === 4, `LGS fallback havuzu 4 soru üretti (${lgsFallback.length})`);
assert(lgsFallback.every((q) => q.questionText && q.correctAnswer), 'LGS fallback soruları eksiksiz');

const lise1Fallback = getFallbackQuestions('lise1', 'fizik', 3);
assert(lise1Fallback.length === 3, `Lise 1 fallback havuzu 3 soru üretti (${lise1Fallback.length})`);
assert(lise1Fallback.every((q) => q.tier === 'lise1'), 'Lise 1 fallback soruları lise1 etiketli');

const lise2Fallback = getFallbackQuestions('lise2', 'matematik', 3);
assert(lise2Fallback.length === 3, `Lise 2 fallback havuzu 3 soru üretti (${lise2Fallback.length})`);

const lise3Fallback = getFallbackQuestions('lise3', 'fizik', 3);
assert(lise3Fallback.length === 3, `Lise 3 fallback havuzu 3 soru üretti (${lise3Fallback.length})`);

const yksFallback = getFallbackQuestions('yks', 'matematik', 3);
assert(yksFallback.length === 3, `YKS fallback havuzu 3 soru üretti (${yksFallback.length})`);
assert(yksFallback.every((q) => q.tier === 'yks'), 'YKS fallback soruları yks etiketli');

console.log('\n================================================================');
console.log(`📊 TEST SONUCU: ${passedChecks} Kontrol Başarıyla Tamamlandı.`);
if (failedChecks === 0) {
  console.log('🎉 AI SORU ÜRETİM MOTORU ÇİFT KATMANLI SAĞLAMA KORUMASI %100 ONAYLANDI!');
  console.log('================================================================\n');
  process.exit(0);
} else {
  console.error(`❌ ${failedChecks} KONTROL BAŞARISIZ OLDU!`);
  console.log('================================================================\n');
  process.exit(1);
}
