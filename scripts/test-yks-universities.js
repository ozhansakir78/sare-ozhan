/**
 * Test: YÖK Atlas 2025/2026 Üniversite & Lisans/Önlisans Veri Bütünlüğü Testi
 * Antigravity YKS Modülü - FAZ F (İş Parçacığı 21)
 */

import {
  YKS_TOP_UNIVERSITIES,
  STANDARD_YKS_PROGRAMS,
  TURKEY_UNIVERSITIES_BY_CITY,
  analyzeUniversityTargetGap,
  calculateNetSufficiency,
  getProgramsByScoreType,
  getYokBarajiPrograms,
  searchUniversities,
  getDistinctUniversities,
  getDepartmentsByUniversity,
  getCitiesWithUniversities,
} from '../src/lib/yks-universities.ts';

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
console.log('   🏛️  YÖK Atlas 2025/2026 Üniversite Radar & Program Bütünlük Testi');
console.log('   Kapsam: SAY, EA, SÖZ, DİL ve TYT (Önlisans) Programları & Barajlar');
console.log('================================================================\n');

// 1. Kapsam ve Benzersizlik Kontrolleri
console.log('📌 1. KONTROL: Hedef Program Havuzu ve Puan Türü Dağılımı');
assert(YKS_TOP_UNIVERSITIES.length >= 35, `Toplam program sayısı yeterli (${YKS_TOP_UNIVERSITIES.length} program tanımlı)`);

const idSet = new Set();
let duplicateIds = 0;
for (const p of YKS_TOP_UNIVERSITIES) {
  if (idSet.has(p.id)) {
    duplicateIds++;
  }
  idSet.add(p.id);
}
assert(duplicateIds === 0, `Tüm program ID'leri benzersiz (Tekrar eden ID yok)`);

const sayPrograms = getProgramsByScoreType('SAY');
const eaPrograms = getProgramsByScoreType('EA');
const sozPrograms = getProgramsByScoreType('SÖZ');
const dilPrograms = getProgramsByScoreType('DİL');
const tytPrograms = getProgramsByScoreType('TYT');

assert(sayPrograms.length >= 10, `SAY programları mevcut (${sayPrograms.length} adet)`);
assert(eaPrograms.length >= 8, `EA programları mevcut (${eaPrograms.length} adet)`);
assert(sozPrograms.length >= 6, `SÖZ programları mevcut (${sozPrograms.length} adet)`);
assert(dilPrograms.length >= 5, `DİL programları mevcut (${dilPrograms.length} adet)`);
assert(tytPrograms.length >= 5, `TYT Önlisans programları mevcut (${tytPrograms.length} adet)`);

// 2. YÖK Atlas Başarı Sırası ve Net Tutarlılığı
console.log('\n📌 2. KONTROL: YÖK Atlas Başarı Sırası, Puan ve Net Tutarlılığı');
let invalidRanks = 0;
let invalidScores = 0;
let invalidNets = 0;

for (const p of YKS_TOP_UNIVERSITIES) {
  if (!p.minRank || p.minRank <= 0) invalidRanks++;
  if (!p.minScore || p.minScore < 200 || p.minScore > 560) invalidScores++;
  if (!p.idealTytNet || p.idealTytNet < 30 || p.idealTytNet > 120) invalidNets++;
  if (p.scoreType !== 'TYT' && (!p.idealAytNet || p.idealAytNet < 20 || p.idealAytNet > 80)) {
    invalidNets++;
  }
}
assert(invalidRanks === 0, 'Tüm programların YÖK Atlas başarı sıraları pozitif ve geçerli');
assert(invalidScores === 0, 'Tüm programların taban yerleştirme puanları ÖSYM 200-560 bandında');
assert(invalidNets === 0, 'Tüm programların ideal TYT (30-120) ve AYT/YDT (20-80) netleri tutarlı');

// 3. Resmi YÖK Sıralama Barajı Doğrulaması
console.log('\n📌 3. KONTROL: YÖK Resmi Başarı Sırası Baraj Kontrolleri');
const barajPrograms = getYokBarajiPrograms();
assert(barajPrograms.length >= 15, `YÖK barajına tabi programlar kayıtlı (${barajPrograms.length} adet)`);

for (const p of barajPrograms) {
  const dLow = p.department.toLowerCase();
  if (dLow.includes('tıp fakültesi')) {
    assert(p.minRank <= 50000, `Tıp barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 50.000)`);
  } else if (dLow.includes('diş hekimliği')) {
    assert(p.minRank <= 80000, `Diş hekimliği barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 80.000)`);
  } else if (dLow.includes('eczacılık')) {
    assert(p.minRank <= 100000, `Eczacılık barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 100.000)`);
  } else if (dLow.includes('hukuk')) {
    assert(p.minRank <= 125000, `Hukuk barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 125.000)`);
  } else if (dLow.includes('mimarlık')) {
    assert(p.minRank <= 250000, `Mimarlık barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 250.000)`);
  } else if (dLow.includes('mühendislik')) {
    assert(p.minRank <= 300000, `Mühendislik barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 300.000)`);
  } else if (dLow.includes('öğretmenliği')) {
    assert(p.minRank <= 300000, `Öğretmenlik barajı kuralı sağlandı: ${p.name} (${p.minRank} <= 300.000)`);
  }
}

// 4. Türkiye 81 İl ve Üniversite Kapsamı
console.log('\n📌 4. KONTROL: 81 İl Üniversite Veri Kapsamı');
const cities = getCitiesWithUniversities();
assert(cities.length === 81, `Türkiye'nin 81 ilinin tamamı kayıtlı (${cities.length} il)`);
assert(TURKEY_UNIVERSITIES_BY_CITY['İstanbul'].length >= 30, `İstanbul üniversite zenginliği sağlandı (${TURKEY_UNIVERSITIES_BY_CITY['İstanbul'].length} üniversite)`);
assert(TURKEY_UNIVERSITIES_BY_CITY['Ankara'].length >= 12, `Ankara üniversite zenginliği sağlandı (${TURKEY_UNIVERSITIES_BY_CITY['Ankara'].length} üniversite)`);
assert(TURKEY_UNIVERSITIES_BY_CITY['İzmir'].length >= 6, `İzmir üniversite zenginliği sağlandı (${TURKEY_UNIVERSITIES_BY_CITY['İzmir'].length} üniversite)`);

// 5. Net Yeterlilik & Hedef Analiz Motoru
console.log('\n📌 5. KONTROL: Net Yeterlilik ve Diploma Notu Analiz Motoru');
// Senaryo A: Tam hazır Boğaziçi Bilgisayar adayı
const bounAnalysis = calculateNetSufficiency('boun-ceng', 112, 78);
assert(bounAnalysis !== null && bounAnalysis.overallStatus === 'ready', 'Boğaziçi adayı yüksek net ile "ready" durumuna ulaştı');
assert(bounAnalysis.isTytSufficient === true && bounAnalysis.isAytSufficient === true, 'TYT ve AYT yeterlilikleri true');

// Senaryo B: Eşikte olan Ankara Hukuk adayı
const ankaraHukukAnalysis = calculateNetSufficiency('ankara-hukuk', 90, 66);
assert(ankaraHukukAnalysis !== null && ankaraHukukAnalysis.overallStatus === 'close', 'Ankara Hukuk eşikteki aday için "close" durumu üretildi');

// Senaryo C: Gelişime ihtiyacı olan Koç Tıp adayı
const kocTipAnalysis = calculateNetSufficiency('koc-tip', 75, 45);
assert(kocTipAnalysis !== null && kocTipAnalysis.overallStatus === 'needs_work', 'Koç Tıp adayı için "needs_work" durumu tespit edildi');

// Senaryo D: TYT Önlisans Paramedik adayı
const paramedikAnalysis = calculateNetSufficiency('hacettepe-paramedik', 75);
assert(paramedikAnalysis !== null && paramedikAnalysis.overallStatus === 'ready', 'Hacettepe Paramedik adayı için TYT net yeterliliği sağlandı');

// Senaryo E: OBP Açığı Analizi
const gap1 = analyzeUniversityTargetGap('boun-ceng', 99.0);
assert(gap1 !== null && gap1.status === 'on_track', 'Hedef üstü OBP için "on_track" statüsü');

const gap2 = analyzeUniversityTargetGap('boun-ceng', 91.0);
assert(gap2 !== null && gap2.status === 'needs_boost', '7 puan gerideki OBP için "needs_boost" statüsü');

// 6. Arama ve Standart Bölüm Uyarlaması
console.log('\n📌 6. KONTROL: Arama Motoru ve Genel Üniversite Uyarlaması');
const searchKoc = searchUniversities('Koç');
assert(searchKoc.some((u) => u.name.includes('Koç')), 'Üniversite adına göre arama başarılı');

const searchTip = searchUniversities('Tıp');
assert(searchTip.length >= 5, `Bölüm adına göre arama başarılı (${searchTip.length} Tıp fakültesi bulundu)`);

const searchDil = searchUniversities('', 'DİL');
assert(searchDil.length >= 5 && searchDil.every((u) => u.scoreType === 'DİL'), 'Puan türüne göre arama filtrelemesi kusursuz');

const genericUnis = getDepartmentsByUniversity('Kastamonu Üniversitesi');
assert(genericUnis.length >= 20, `Genel bir üniversite için standart YKS lisans & önlisans bölümleri başarıyla üretildi (${genericUnis.length} bölüm)`);
assert(genericUnis.some((u) => u.scoreType === 'TYT'), 'Standart bölümler TYT önlisans programlarını içeriyor');

console.log('\n================================================================');
console.log(`📊 TEST SONUCU: ${passedChecks} Kontrol Başarıyla Tamamlandı.`);
if (failedChecks === 0) {
  console.log('🎉 YÖK ATLAS 2025/2026 ÜNİVERSİTE RADAR MOTORU %100 ONAYLANDI!');
  console.log('================================================================\n');
  process.exit(0);
} else {
  console.error(`❌ ${failedChecks} KONTROL BAŞARISIZ OLDU!`);
  console.log('================================================================\n');
  process.exit(1);
}
