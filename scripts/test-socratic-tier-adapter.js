/**
 * Test: Tüm Kademeler İçin Sokratik AI Çözücü & Yanlış Defteri Adaptasyon Testi
 * Antigravity YKS Modülü - FAZ G (İş Parçacığı 22)
 */

import {
  buildTierSpecificSystemPrompt,
  generateMockSocraticResponse,
} from '../src/lib/socratic-tier-adapter.ts';

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
console.log('   🤖 Sokratik AI Çözücü & Çok Kademeli Öğretmen Personası Testi');
console.log('   Kapsam: LGS (8) | 9. Sınıf | 10. Sınıf | 11. Sınıf | YKS (12)');
console.log('================================================================\n');

// 1. KADEME 1: 8. Sınıf (LGS) Personası
console.log('📌 1. KADEME: 8. Sınıf (LGS) Sokratik Öğretmen Rolü');
const lgsPersona = buildTierSpecificSystemPrompt('lgs', '8', undefined, 'Matematik');
assert(lgsPersona.personaTitle.includes('LGS'), 'LGS persona başlığı doğru');
assert(lgsPersona.systemPrompt.includes('yeni nesil'), 'LGS yeni nesil soru vurgusu mevcut');
assert(lgsPersona.systemPrompt.includes('3 yanlışın 1 doğruyu götürdüğü'), 'LGS eleme kuralı talimatta var');
assert(!lgsPersona.systemPrompt.includes('$'), 'LaTeX dolar işareti kesinlikle yasak');

// 2. KADEME 2: 9. Sınıf (Lise 1) Maarif Modeli Personası
console.log('\n📌 2. KADEME: 9. Sınıf (Lise 1) Maarif Modeli & Yazılı Koçu');
const lise1Persona = buildTierSpecificSystemPrompt('lise1', '9', undefined, 'Türk Dili ve Edebiyatı');
assert(lise1Persona.personaTitle.includes('9. Sınıf'), '9. Sınıf persona başlığı doğru');
assert(lise1Persona.systemPrompt.includes('Maarif Modeli'), 'Türkiye Yüzyılı Maarif Modeli referansı var');
assert(lise1Persona.systemPrompt.includes('Ortak Yazılı'), 'MEB Ortak Yazılı Sınav standartları talimatta var');
assert(lise1Persona.systemPrompt.includes('70 barajı'), 'Edebiyat 70 barajı ve OBP bilinci var');

// 3. KADEME 3: 10. Sınıf (Lise 2) Alan Seçimi Personası
console.log('\n📌 3. KADEME: 10. Sınıf (Lise 2) Alan Seçimi ve Rehberlik Mentoru');
const lise2Persona = buildTierSpecificSystemPrompt('lise2', '10', undefined, 'Fizik');
assert(lise2Persona.personaTitle.includes('10. Sınıf'), '10. Sınıf persona başlığı doğru');
assert(lise2Persona.systemPrompt.includes('Alan Seçimi'), 'Alan seçimi rehberlik vurgusu var');
assert(lise2Persona.systemPrompt.includes('Sayısal, Eşit Ağırlık'), 'MF, TM, TS, DİL alanları tanımlı');

// 4. KADEME 4: 11. Sınıf (Lise 3) İleri Alan & Erken TYT Personası
console.log('\n📌 4. KADEME: 11. Sınıf (Lise 3) İleri Alan ve Erken TYT Koçu');
const lise3Persona = buildTierSpecificSystemPrompt('lise3', '11', 'SAY', 'İleri Matematik');
assert(lise3Persona.personaTitle.includes('11. Sınıf'), '11. Sınıf persona başlığı doğru');
assert(lise3Persona.systemPrompt.includes('%70 İleri Düzey Alan Müfredatı'), '%70 alan ağırlığı tanımlı');
assert(lise3Persona.systemPrompt.includes('%30 Erken TYT'), '%30 TYT pekiştirme kuralı tanımlı');

// 5. KADEME 5: 12. Sınıf & Mezun (YKS TYT/AYT/YDT) Zirve Personası
console.log('\n📌 5. KADEME: 12. Sınıf & Mezun ÖSYM YKS Kıdemli Sınav Koçu');
const yksPersona = buildTierSpecificSystemPrompt('yks', '12', 'SAY', 'AYT Matematik');
assert(yksPersona.personaTitle.includes('YKS'), 'YKS persona başlığı doğru');
assert(yksPersona.systemPrompt.includes('ÖSYM YKS soru stillerini'), 'ÖSYM soru kalıpları analizi mevcut');
assert(yksPersona.systemPrompt.includes('AYT derinliğinde'), 'AYT derinliği ve ispat vurgusu var');
assert(yksPersona.systemPrompt.includes('4 yanlışın 1 doğruyu götürdüğü'), 'ÖSYM 4 yanlış kuralı mevcut');

// 6. Güvenlik & Otomatik Kademe Çözümleme
console.log('\n📌 6. GÜVENLİK: Otomatik Fallback ve Kademe Eşleme');
const fallbackByGrade = buildTierSpecificSystemPrompt(undefined, '9', undefined, 'Biyoloji');
assert(fallbackByGrade.personaTitle.includes('9. Sınıf'), 'gradeLevel 9 verildiğinde otomatik lise1 eşlendi');

const fallbackDefault = buildTierSpecificSystemPrompt(undefined, undefined, undefined, 'Türkçe');
assert(fallbackDefault.personaTitle.includes('LGS'), 'Parametresiz çağrıda güvenli default LGS seçildi');

// 7. Sokratik İpucu ve Tam Çözüm Üretimi (Mock Motoru)
console.log('\n📌 7. PEDAGOJİ: Sokratik İpucu & Tam Çözüm Mock Yanıtları');
// LGS İpucu
const lgsHint = generateMockSocraticResponse('Matematik', 'Çarpanlar ve Katlar', 'İlk adımı nasıl yapmalıyım?', 'hint', 'lgs');
assert(lgsHint.includes('İşlem önceliği') || lgsHint.includes('ipucun'), 'LGS matematik yönlendirici ipucu üretti');
assert(!lgsHint.includes('$'), 'LGS yanıtında LaTeX dolar işareti yok');
assert(lgsHint.includes('4²'), 'Unicode üslü ifade (4²) kullanıldı');

// 9. Sınıf Yazılı İpucu
const lise1Hint = generateMockSocraticResponse('Fizik', 'Kuvvet ve Hareket', 'Açık uçlu soruda ne yazmalıyım?', 'hint', 'lise1');
assert(lise1Hint.includes('MEB 9. Sınıf Yazılı İpucu'), '9. Sınıf MEB yazılı odaklı ipucu üretti');

// YKS AYT Tam Çözüm
const yksFullSolve = generateMockSocraticResponse('AYT Matematik', 'Türev', 'Lütfen soruyu tamamen çöz', 'full_solve', 'yks');
assert(yksFullSolve.includes('ÖSYM YKS Çözüm Analizi'), 'YKS ÖSYM çözüm başlığı var');
assert(yksFullSolve.includes('Nihai Cevap:'), 'Tam çözümde Nihai Cevap net olarak belirtildi');
assert(yksFullSolve.includes('Çeldirici Analizi'), 'ÖSYM çeldirici analizi adımı mevcut');

console.log('\n================================================================');
console.log(`📊 TEST SONUCU: ${passedChecks} Kontrol Başarıyla Tamamlandı.`);
if (failedChecks === 0) {
  console.log('🎉 ÇOK KADEMELİ SOKRATİK AI ÇÖZÜCÜ MOTORU %100 ONAYLANDI!');
  console.log('================================================================\n');
  process.exit(0);
} else {
  console.error(`❌ ${failedChecks} KONTROL BAŞARISIZ OLDU!`);
  console.log('================================================================\n');
  process.exit(1);
}
