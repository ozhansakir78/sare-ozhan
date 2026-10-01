/**
 * scripts/test-lise1-calculation.js
 * 
 * MEB Ortaöğretim Kurumları Yönetmeliği (9. Sınıf) Not, Belge ve Sınıf Geçme Test Paketi
 * İş Parçacığı 11 kapsamında resmi MEB senaryolarını test eder.
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

const lise1Calc = loadModule(path.resolve(__dirname, '../src/lib/lise1-calculation.ts'));
const { calculateLise1Term, SCHOOL_PRESETS } = lise1Calc;

console.log('================================================================');
console.log('   🎓 MEB 9. Sınıf Yazılı Not & Belge Hesaplama Test Paketi');
console.log('   Mevzuat: MEB Ortaöğretim Kurumları Yönetmeliği (Edebiyat 70 Barajı & OBP)');
console.log('================================================================\n');

let allPassed = true;

// 1. Senaryo: Takdir Belgesi (Tüm dersler yüksek, Edebiyat >= 70, Ortalama >= 85)
{
  console.log('📌 1. SENARYO: Takdir Belgesi Hak Eden Başarılı Öğrenci');
  const courses = SCHOOL_PRESETS.anadolu.courses.map(c => ({
    ...c,
    exam1: 90,
    exam2: 95,
    performance1: 95,
    performance2: 100,
  }));
  const res = calculateLise1Term(courses);
  console.log(`   Ortalama    : ${res.termAverage.toFixed(2)}`);
  console.log(`   Belge Durumu: ${res.certificateLabel} (${res.certificateStatus})`);
  console.log(`   Tahmini OBP : ${res.estimatedObp} / 500 (YKS Katkısı: +${res.yksAdditionalPoints})`);

  if (res.certificateStatus !== 'takdir' || res.termAverage < 85) {
    console.error('   ❌ HATA: Takdir durumu beklenirken farklı sonuç alındı!');
    allPassed = false;
  } else {
    console.log('   ✅ Başarılı\n');
  }
}

// 2. Senaryo: Teşekkür Belgesi (Ortalama 70-84.99, Edebiyat >= 70, zayıf yok)
{
  console.log('📌 2. SENARYO: Teşekkür Belgesi Hak Eden Öğrenci');
  const courses = SCHOOL_PRESETS.anadolu.courses.map(c => ({
    ...c,
    exam1: 75,
    exam2: 78,
    performance1: 80,
    performance2: 80,
  }));
  const res = calculateLise1Term(courses);
  console.log(`   Ortalama    : ${res.termAverage.toFixed(2)}`);
  console.log(`   Belge Durumu: ${res.certificateLabel} (${res.certificateStatus})`);

  if (res.certificateStatus !== 'tesekkur') {
    console.error('   ❌ HATA: Teşekkür durumu beklenirken farklı sonuç alındı!');
    allPassed = false;
  } else {
    console.log('   ✅ Başarılı\n');
  }
}

// 3. Senaryo: Edebiyat Barajı (Ortalama 88 olmasına rağmen Edebiyat 68 < 70 -> Belge Alamaz!)
{
  console.log('📌 3. SENARYO: Edebiyat 70 Barajına Takılan Öğrenci (Ortalama 85+ olsa bile Belge Yok)');
  const courses = SCHOOL_PRESETS.anadolu.courses.map(c => {
    if (c.courseKey === 'edebiyat') {
      return { ...c, exam1: 65, exam2: 68, performance1: 70, performance2: 68 }; // Ort ~67.75 < 70
    }
    return { ...c, exam1: 95, exam2: 95, performance1: 95, performance2: 95 }; // Diğer dersler 95
  });
  const res = calculateLise1Term(courses);
  console.log(`   Genel Ortalama: ${res.termAverage.toFixed(2)} (85 üstü)`);
  console.log(`   Edebiyat Geçti : ${res.isEdebiyatPassed}`);
  console.log(`   Belge Durumu  : ${res.certificateLabel} (${res.certificateStatus})`);

  if (res.certificateStatus === 'takdir' || res.certificateStatus === 'tesekkur') {
    console.error('   ❌ HATA: Edebiyat barajı aşılmamasına rağmen Takdir/Teşekkür verildi!');
    allPassed = false;
  } else if (!res.isEdebiyatPassed && res.certificateStatus === 'sorumlu') {
    console.log('   ✅ MEB Edebiyat 70 barajı kuralı kusursuz uygulandı.\n');
  } else {
    console.error('   ❌ Beklenmeyen durum!');
    allPassed = false;
  }
}

// 4. Senaryo: Sorumlu Geçiş (Fizik 45 < 50, diğer dersler başarılı, Ortalama >= 50)
{
  console.log('📌 4. SENARYO: 1 Dersten Kalan (Sorumlu Geçiş)');
  const courses = SCHOOL_PRESETS.anadolu.courses.map(c => {
    if (c.courseKey === 'fizik') {
      return { ...c, exam1: 40, exam2: 45, performance1: 50, performance2: 45 }; // Ort ~45 < 50
    }
    return { ...c, exam1: 70, exam2: 75, performance1: 80, performance2: 75 };
  });
  const res = calculateLise1Term(courses);
  console.log(`   Ortalama           : ${res.termAverage.toFixed(2)}`);
  console.log(`   Başarısız Ders Sayısı: ${res.failedCourseCount}`);
  console.log(`   Durum              : ${res.certificateLabel} (${res.certificateStatus})`);

  if (res.certificateStatus !== 'sorumlu' || res.failedCourseCount !== 1) {
    console.error('   ❌ HATA: 1 zayıf ders ile sorumlu geçiş bekleniyordu!');
    allPassed = false;
  } else {
    console.log('   ✅ Başarılı\n');
  }
}

// 5. Senaryo: Sınıf Tekrarı (4 Dersten Başarısız Olma - MEB Madde 58 Kuralı: > 3 Zayıf = Sınıf Tekrarı)
{
  console.log('📌 5. SENARYO: 4 Dersten Kalan Öğrenci (Sınıf Tekrarı)');
  const failingCourses = ['fizik', 'kimya', 'biyoloji', 'tarih'];
  const courses = SCHOOL_PRESETS.anadolu.courses.map(c => {
    if (failingCourses.includes(c.courseKey)) {
      return { ...c, exam1: 30, exam2: 35, performance1: 40, performance2: 35 }; // < 50
    }
    return { ...c, exam1: 70, exam2: 75, performance1: 80, performance2: 75 };
  });
  const res = calculateLise1Term(courses);
  console.log(`   Başarısız Ders Sayısı: ${res.failedCourseCount}`);
  console.log(`   Durum              : ${res.certificateLabel} (${res.certificateStatus})`);

  if (res.certificateStatus !== 'kaldi') {
    console.error('   ❌ HATA: 4 dersten kalan öğrenci sınıf tekrarı yapmalıdır!');
    allPassed = false;
  } else {
    console.log('   ✅ MEB 3\'ten fazla zayıfta sınıf tekrarı kuralı başarıyla doğrulandı.\n');
  }
}

// 6. Senaryo: Not Girilmedi (Tüm notlar null)
{
  console.log('📌 6. SENARYO: Başlangıç / Boş Not Girişi');
  const res = calculateLise1Term(SCHOOL_PRESETS.anadolu.courses);
  if (res.certificateStatus !== 'not_girilmedi' || res.hasAnyGrades) {
    console.error('   ❌ HATA: Boş giriş durumu not_girilmedi olmalıdır!');
    allPassed = false;
  } else {
    console.log('   ✅ Başarılı\n');
  }
}

console.log('================================================================');
if (allPassed) {
  console.log('🎉 TÜM 6 RESMİ MEB 9. SINIF NOT VE GEÇME SENARYOSU %100 BAŞARIYLA GEÇTİ!');
  process.exit(0);
} else {
  console.error('💥 MEB NOT HESAPLAMA TESTLERİNDE HATA TESPİT EDİLDİ!');
  process.exit(1);
}
