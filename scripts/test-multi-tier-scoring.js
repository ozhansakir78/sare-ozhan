const assert = require('assert');
const {
  resolveExamTier,
  calculateNetScoreByTier,
  computeTierExamScore,
} = require('../src/lib/exam-tier-utils.ts');
const { generateWhatsAppReportMessage } = require('../src/lib/whatsapp-share.ts');

console.log('🧪 Çok Kademeli Sınav & Yazılı Notlandırma Testi Başlatılıyor...');

// Test 1: 9. Sınıf Türk Dili ve Edebiyatı (Kullanıcının karşılaştığı durum)
const lise1Exam = {
  id: 'custom-ai-test-1',
  slug: 'ozel-test-edebiyat-1',
  title: 'Türk Dili ve Edebiyatı: Genel Karma Pekiştirme Testi',
  courseKey: 'edebiyat',
};

const tier1 = resolveExamTier(lise1Exam);
assert.strictEqual(tier1, 'lise1', '9. sınıf edebiyat sınavı lise1 olarak tespit edilmeli');

// 5 sorudan 1 doğru, 4 yanlış
const lise1Score = computeTierExamScore({
  tier: tier1,
  totalQuestions: 5,
  correctCount: 1,
  incorrectCount: 4,
  emptyCount: 0,
  courseKey: 'edebiyat',
});

// MEB Yazılı kuralları: Yanlış doğruyu götürmez! 1 doğru = 1 net, 100 üzerinden 20 not
assert.strictEqual(lise1Score.netScore, 1, 'Lise yazılısında yanlış doğruyu götürmemeli, net = 1 olmalı');
assert.strictEqual(lise1Score.calculatedScore, 20, '5 soruda 1 doğru 100 üzerinden 20 puan yapmalı');
assert.strictEqual(lise1Score.scoreLabel, 'MEB Yazılı Sınav Notu');
assert.strictEqual(lise1Score.scoreUnit, '/ 100');

// WhatsApp Mesajı Kontrolü
const waMsgLise1 = generateWhatsAppReportMessage({
  tier: tier1,
  examTitle: lise1Exam.title,
  score: lise1Score.calculatedScore,
  scoreLabel: lise1Score.scoreLabel,
  scoreUnit: lise1Score.scoreUnit,
  totalNet: lise1Score.netScore,
  totalQuestions: 5,
  correctCount: 1,
  targetSchool: 'ODTÜ Bilgisayar Mühendisliği',
  targetSchoolLabel: 'Hedef Üniversite / Bölüm',
  mode: 'student_to_parent',
});

assert(!waMsgLise1.includes('Tahmini LGS Puanı'), '9. sınıf mesajında kesinlikle LGS Puanı yazmamalı!');
assert(!waMsgLise1.includes('LGS Gelişim Karnesi'), '9. sınıf mesajında kesinlikle LGS Karnesi yazmamalı!');
assert(waMsgLise1.includes('*MEB Yazılı Sınav Notu:* 20 / 100'), 'WhatsApp mesajında 20 / 100 yazılı notu yer almalı');
assert(waMsgLise1.includes('*Doğru Sayısı:* 1 / 5 Soru'), 'WhatsApp mesajında 1 / 5 soru yer almalı');
console.log('✅ Test 1 (9. Sınıf Edebiyat Sınavı & WhatsApp Paylaşımı) Başarılı!');

// Test 2: YKS TYT Sınavı
const yksExam = {
  id: 'yks-tyt-1',
  slug: 'yks-tyt-prova',
  title: '2026-2027 YKS TYT Prova Denemesi',
  tier: 'yks',
};

const tierYks = resolveExamTier(yksExam);
assert.strictEqual(tierYks, 'yks');

// 120 soruda 80 doğru, 20 yanlış (4 yanlış 1 doğruyu götürür -> 80 - 5 = 75 net)
const yksNet = calculateNetScoreByTier('yks', 80, 20);
assert.strictEqual(yksNet, 75, 'YKS 4 yanlış 1 doğruyu götürmeli (75 net)');

const yksScore = computeTierExamScore({
  tier: 'yks',
  totalQuestions: 120,
  correctCount: 80,
  incorrectCount: 20,
  emptyCount: 20,
});
assert.strictEqual(yksScore.scoreLabel, 'Tahmini YKS (TYT) Puanı');

const waMsgYks = generateWhatsAppReportMessage({
  tier: 'yks',
  examTitle: yksExam.title,
  score: yksScore.calculatedScore,
  scoreLabel: yksScore.scoreLabel,
  scoreUnit: yksScore.scoreUnit,
  totalNet: yksScore.netScore,
  totalQuestions: 120,
  correctCount: 80,
  targetSchool: 'Boğaziçi İşletme',
  mode: 'student_to_parent',
});
assert(!waMsgYks.includes('LGS'), 'YKS mesajında LGS geçmemeli');
assert(waMsgYks.includes('Tahmini YKS (TYT) Puanı'), 'YKS mesajında TYT puanı yazmalı');
console.log('✅ Test 2 (YKS TYT 4 Yanlış 1 Doğru & WhatsApp Paylaşımı) Başarılı!');

// Test 3: 8. Sınıf LGS Sınavı
const lgsScore = computeTierExamScore({
  tier: 'lgs',
  totalQuestions: 90,
  correctCount: 63,
  incorrectCount: 9,
  emptyCount: 18,
});
// 3 yanlış 1 doğru -> 63 - 3 = 60 net
assert.strictEqual(lgsScore.netScore, 60, 'LGS 3 yanlış 1 doğruyu götürmeli (60 net)');
assert.strictEqual(lgsScore.scoreLabel, 'Tahmini LGS Puanı');
assert(lgsScore.calculatedScore >= 200 && lgsScore.calculatedScore <= 500, 'LGS puanı 200-500 aralığında olmalı');
console.log('✅ Test 3 (8. Sınıf LGS 3 Yanlış 1 Doğru Puanı) Başarılı!');

console.log('🎉 TÜM KADEMELİ TESTLER BAŞARIYLA TAMAMLANDI!');
