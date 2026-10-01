/**
 * SınavKoçu.ai - 10. Sınıf Alan Seçimi (Sayısal, EA, Sözel, Dil) Rehberlik Motoru Test Paketi
 * Çalıştırma: npm run test:field-selection  (veya node scripts/test-field-selection.js)
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModule(filePath) {
  const tsCode = fs.readFileSync(filePath, 'utf8');
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
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

const { calculateFieldSelection } = loadModule(path.resolve(__dirname, '../src/lib/field-selection.ts'));

let totalTests = 0;
let passedTests = 0;

function runScenario(name, grades, interests, assertionFn) {
  totalTests++;
  console.log(`\n📌 ${totalTests}. SENARYO: ${name}`);
  const result = calculateFieldSelection(grades, interests);
  console.log(`   Önerilen Birincil Alan : ${result.primaryTrack.trackName} (%${result.primaryTrack.compatibilityScore})`);
  console.log(`   Alternatif İkincil Alan : ${result.secondaryTrack.trackName} (%${result.secondaryTrack.compatibilityScore})`);
  console.log(`   Tüm Sıralama           : ${result.allTracks.map((t) => `${t.shortName} (%${t.compatibilityScore})`).join(' > ')}`);
  console.log(`   Güçlü Yönler           : ${result.academicStrengths.join(', ')}`);
  console.log(`   Rehberlik Özeti        : ${result.guidanceSummary}`);

  try {
    assertionFn(result);
    console.log('   ✅ Başarılı');
    passedTests++;
  } catch (err) {
    console.error(`   ❌ HATA: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('================================================================');
console.log('   🎓 10. Sınıf Alan Seçimi (Sayısal / EA / Sözel / Dil) Test Paketi');
console.log('   Kapsam: MEB Alanlaşma Mevzuatı & ÖSYM YKS Uyum Kalibrasyonu');
console.log('================================================================');

// 1. SENARYO: Sayısal (Tıp / Mühendislik) Hedefli Başarılı Öğrenci
runScenario(
  'Geleceğin Mühendisi / Hekimi (Yüksek Fen ve Matematik)',
  { matematik: 95, fizik: 90, kimya: 92, biyoloji: 88, edebiyat: 65, tarih: 70, cografya: 68, felsefe: 65, din: 80, ingilizce: 75 },
  { math: 5, science: 5, literature: 2, social: 3, language: 3 },
  (res) => {
    if (res.primaryTrack.track !== 'sayisal') {
      throw new Error(`Birincil alan 'sayisal' olmalıydı, ancak '${res.primaryTrack.track}' çıktı.`);
    }
    if (res.primaryTrack.compatibilityScore < 85) {
      throw new Error(`Sayısal uyum skoru en az %85 olmalıydı (Çıkan: %${res.primaryTrack.compatibilityScore}).`);
    }
    if (!res.primaryTrack.prospectiveMajors.includes('Tıp Fakültesi')) {
      throw new Error('Sayısal bölümleri arasında Tıp Fakültesi bulunmalı.');
    }
  }
);

// 2. SENARYO: Eşit Ağırlık (Hukuk / İşletme / Psikoloji) Hedefli Öğrenci
runScenario(
  'Geleceğin Hukukçusu / Yöneticisi (Yüksek Matematik ve Edebiyat)',
  { matematik: 88, fizik: 55, kimya: 50, biyoloji: 52, edebiyat: 92, tarih: 88, cografya: 85, felsefe: 82, din: 85, ingilizce: 70 },
  { math: 4, science: 2, literature: 5, social: 5, language: 3 },
  (res) => {
    if (res.primaryTrack.track !== 'esit_agirlik') {
      throw new Error(`Birincil alan 'esit_agirlik' olmalıydı, ancak '${res.primaryTrack.track}' çıktı.`);
    }
    if (res.primaryTrack.compatibilityScore < 80) {
      throw new Error(`Eşit Ağırlık uyum skoru en az %80 olmalıydı (Çıkan: %${res.primaryTrack.compatibilityScore}).`);
    }
    if (!res.primaryTrack.prospectiveMajors.includes('Hukuk Fakültesi')) {
      throw new Error('EA bölümleri arasında Hukuk Fakültesi bulunmalı.');
    }
  }
);

// 3. SENARYO: Sözel (İletişim / Tarih / Öğretmenlik) Hedefli Öğrenci
runScenario(
  'Geleceğin Yazarı / Gazetecisi (Yüksek Edebiyat, Tarih, Coğrafya; Düşük Fen/Matematik)',
  { matematik: 48, fizik: 42, kimya: 45, biyoloji: 50, edebiyat: 95, tarih: 94, cografya: 92, felsefe: 90, din: 90, ingilizce: 60 },
  { math: 1, science: 1, literature: 5, social: 5, language: 3 },
  (res) => {
    if (res.primaryTrack.track !== 'sozel') {
      throw new Error(`Birincil alan 'sozel' olmalıydı, ancak '${res.primaryTrack.track}' çıktı.`);
    }
    if (res.primaryTrack.compatibilityScore < 85) {
      throw new Error(`Sözel uyum skoru en az %85 olmalıydı (Çıkan: %${res.primaryTrack.compatibilityScore}).`);
    }
  }
);

// 4. SENARYO: Yabancı Dil (Mütercim Tercümanlık / İngilizce Öğretmenliği)
runScenario(
  'Geleceğin Diplomatı / Çevirmeni (98 İngilizce ve Güçlü Edebiyat)',
  { matematik: 60, fizik: 50, kimya: 52, biyoloji: 55, edebiyat: 85, tarih: 78, cografya: 70, felsefe: 72, din: 80, ingilizce: 98 },
  { math: 2, science: 2, literature: 4, social: 3, language: 5 },
  (res) => {
    if (res.primaryTrack.track !== 'dil') {
      throw new Error(`Birincil alan 'dil' olmalıydı, ancak '${res.primaryTrack.track}' çıktı.`);
    }
    if (res.primaryTrack.compatibilityScore < 85) {
      throw new Error(`Dil uyum skoru en az %85 olmalıydı (Çıkan: %${res.primaryTrack.compatibilityScore}).`);
    }
    if (!res.primaryTrack.prospectiveMajors.includes('Mütercim ve Tercümanlık')) {
      throw new Error('Dil bölümleri arasında Mütercim ve Tercümanlık bulunmalı.');
    }
  }
);

// 5. SENARYO: Kararsız / Birbirine Çok Yakın Notlar (MF ile TM Arasında)
runScenario(
  'Dengeli / Kararsız Öğrenci (Hem Fen hem Edebiyat Yüksek)',
  { matematik: 85, fizik: 80, kimya: 80, biyoloji: 80, edebiyat: 85, tarih: 80, cografya: 78, felsefe: 75, din: 80, ingilizce: 75 },
  undefined, // İlgi anketi girilmemiş, saf akademik
  (res) => {
    const diff = Math.abs(res.primaryTrack.compatibilityScore - res.secondaryTrack.compatibilityScore);
    if (diff > 5) {
      throw new Error(`Dengeli profilde birincil ile ikincil alan farkı en fazla 5 puan olmalıydı (Fark: ${diff}).`);
    }
    if (!res.guidanceSummary.includes('fark son derece yakındır')) {
      throw new Error('Yakın skorlarda esnek geçiş uyarısı içermeli.');
    }
  }
);

// 6. SENARYO: Boş Not Girişi ve Uç Değer Güvenliği
runScenario(
  'Boş Not Girişi & Güvenlik Koruması',
  {},
  undefined,
  (res) => {
    if (res.allTracks.length !== 4) {
      throw new Error('4 alan da değerlendirilmiş olmalıdır.');
    }
    if (res.primaryTrack.compatibilityScore !== 60) {
      throw new Error(`Varsayılan nötr puan 60 olmalıydı (Çıkan: ${res.primaryTrack.compatibilityScore}).`);
    }
    if (res.mebSelectionRules.length < 3) {
      throw new Error('MEB seçim kuralları eksiksiz aktarılmalı.');
    }
  }
);

console.log('\n================================================================');
console.log(`📊 TEST SONUCU: ${passedTests}/${totalTests} Senaryo Başarıyla Tamamlandı.`);
if (passedTests === totalTests) {
  console.log('🎉 10. SINIF ALAN SEÇİMİ REHBERLİK MOTORU %100 KALİBRE EDİLDİ!');
}
console.log('================================================================\n');
