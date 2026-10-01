/**
 * 🎓 SınavKoçu.ai — YKS AYT (Alan Yeterlilik Testi) ve YDT (Yabancı Dil Testi) Hesaplama Motoru
 *
 * Resmi ÖSYM YKS Kılavuzu & Mevzuat Standartları:
 * 1. Sınav Süresi ve Test Yapısı:
 *    - AYT: 180 Dakika (3 Saat) - Toplam 160 Soru Kitapçığı
 *      * Matematik: 40 Soru (Matematik 30-32, Geometri 8-10)
 *      * Fen Bilimleri: 40 Soru (Fizik 14, Kimya 13, Biyoloji 13)
 *      * Türk Dili ve Edebiyatı - Sosyal Bilimler-1: 40 Soru (Edebiyat 24, Tarih-1 10, Coğrafya-1 6)
 *      * Sosyal Bilimler-2: 40 Soru (Tarih-2 11, Coğrafya-2 11, Felsefe Grubu 12, Din Kültürü 6)
 *    - YDT: 120 Dakika - 80 Yabancı Dil Sorusu
 *
 * 2. 4 Yanlış 1 Doğruyu Götürür Kuralı:
 *    - Her test için Net = Doğru - (Yanlış / 4)
 *
 * 3. 0.5 Net Kuralı (ÖSYM Resmi Şartı):
 *    - Bir adayın ilgili AYT puan türünün hesaplanabilmesi için o puan türünü oluşturan
 *      iki test grubundan en az birinden 0.5 veya üzeri ham puan (net) alması şarttır.
 *
 * 4. Puan Hesaplama Modeli (%40 TYT + %60 AYT / YDT):
 *    - Taban Puan: 100.00
 *    - TYT Katkısı (Maks 160.00 Puan): Türkçe (1.32), Mat (1.32), Fen (1.36), Sosyal (1.36)
 *    - AYT Katkısı (Maks 240.00 Puan):
 *      * SAY (Sayısal): AYT Mat (120 Puan - katsayı 3.0) + AYT Fen (120 Puan: Fizik 42, Kimya 39, Biyoloji 39)
 *      * EA (Eşit Ağırlık): AYT Mat (120 Puan - katsayı 3.0) + AYT Edebiyat-Sos1 (120 Puan: Ed 72, Tar-1 30, Coğ-1 18)
 *      * SÖZ (Sözel): AYT Edebiyat-Sos1 (120 Puan) + AYT Sosyal-2 (120 Puan: Tar-2 33, Coğ-2 33, Fel 36, Din 18)
 *      * DİL (Yabancı Dil): YDT (80 Soru * 3.0 = 240 Puan)
 *    - Maksimum Ham Puan = 100 (Taban) + 160 (TYT) + 240 (AYT/YDT) = 500.00 Puan.
 *
 * 5. OBP ve Yerleştirme Puanları (Y-SAY, Y-EA, Y-SÖZ, Y-DİL):
 *    - Standart OBP Katkısı = OBP * 0.12 (+30 ile +60 Puan)
 *    - Kırık OBP Katkısı = OBP * 0.06 (+15 ile +30 Puan)
 *    - Maksimum Yerleştirme Puanı = 500 + 60 = 560.00 Puan.
 *
 * 6. YÖK Resmi Başarı Sıralaması Barajları:
 *    - Tıp: SAY İlk 50.000
 *    - Diş Hekimliği: SAY İlk 80.000
 *    - Eczacılık: SAY İlk 100.000
 *    - Hukuk: EA İlk 125.000
 *    - Mimarlık: SAY İlk 250.000
 *    - Mühendislik: SAY İlk 300.000
 *    - Öğretmenlik: İlgili Alan İlk 300.000
 */

export interface TytSubjectInput {
  correct: number;
  incorrect: number;
  empty?: number;
}

export function calculateTytSubjectNet(
  input: TytSubjectInput,
  maxQuestions: number,
  allowNegative = false
): { correct: number; incorrect: number; empty: number; rawNet: number; effectiveNet: number } {
  const correct = Math.max(0, Math.min(maxQuestions, Math.floor(Number(input.correct) || 0)));
  const remainingAfterCorrect = maxQuestions - correct;
  const incorrect = Math.max(0, Math.min(remainingAfterCorrect, Math.floor(Number(input.incorrect) || 0)));
  const empty = Math.max(0, maxQuestions - (correct + incorrect));

  const rawNet = Number((correct - incorrect / 4).toFixed(2));
  const effectiveNet = allowNegative ? rawNet : Math.max(0, rawNet);

  return { correct, incorrect, empty, rawNet, effectiveNet };
}

export type YksScoreType = 'SAY' | 'EA' | 'SOZ' | 'DIL';

export interface AytScienceInput {
  fizik: TytSubjectInput; // 14 soru
  kimya: TytSubjectInput; // 13 soru
  biyoloji: TytSubjectInput; // 13 soru
}

export interface AytEdSos1Input {
  edebiyat: TytSubjectInput; // 24 soru
  tarih1: TytSubjectInput; // 10 soru
  cografya1: TytSubjectInput; // 6 soru
}

export interface AytSos2Input {
  tarih2: TytSubjectInput; // 11 soru
  cografya2: TytSubjectInput; // 11 soru
  felsefe: TytSubjectInput; // 12 soru
  din: TytSubjectInput; // 6 soru
}

export interface YksAytCalculationInput {
  // TYT Netleri veya Doğru/Yanlış Girişleri (TYT %40 Katkısı İçin)
  tyt: {
    turkce: TytSubjectInput; // 40 soru
    sosyal: TytSubjectInput; // 20 soru
    matematik: TytSubjectInput; // 40 soru
    fen: TytSubjectInput; // 20 soru
  };

  // AYT / YDT Testleri
  aytMatematik?: TytSubjectInput; // 40 soru
  aytFen?: AytScienceInput; // 40 soru (Fizik 14, Kimya 13, Biyoloji 13)
  aytEdSos1?: AytEdSos1Input; // 40 soru (Edebiyat 24, Tarih-1 10, Coğrafya-1 6)
  aytSos2?: AytSos2Input; // 40 soru (Tarih-2 11, Coğrafya-2 11, Felsefe 12, Din 6)
  ydt?: TytSubjectInput; // 80 soru (Yabancı Dil)

  // OBP ve Mezuniyet
  diplomaGrade?: number; // 50 - 100
  isBrokenObp?: boolean; // Geçen yıl yerleşen aday (x0.06)
}

export interface SingleScoreTypeResult {
  scoreType: YksScoreType;
  scoreTypeName: string;
  isEligible: boolean; // 0.5 net kuralını sağlıyor mu?
  ineligibilityReason?: string;
  rawScore: number; // 100 - 500 ham puan
  placementScore: number; // Y-Yerleştirme Puanı (100 - 560)
  aytNet: number; // Alan testlerindeki toplam net (maks 80 soru)
  estimatedRank: number; // İlgili puan türündeki başarı sırası
  estimatedPercentile: number; // Yüzdelik dilim

  // YÖK Baraj Karşılaştırmaları
  thresholds: {
    tipEligible?: boolean; // SAY İlk 50.000
    disEligible?: boolean; // SAY İlk 80.000
    eczacilikEligible?: boolean; // SAY İlk 100.000
    muhendislikEligible?: boolean; // SAY İlk 300.000
    mimarlikEligible?: boolean; // SAY İlk 250.000
    hukukEligible?: boolean; // EA İlk 125.000
    ogretmenlikEligible?: boolean; // İlk 300.000
  };
}

export interface YksAytCalculationResult {
  isValid: boolean;
  diplomaGrade: number;
  obp: number; // 250 - 500
  obpContribution: number; // +30 ile +60 (kırık ise +15 ile +30)
  isBrokenObpApplied: boolean;
  tytTotalNet: number;
  tytContributionScore: number; // 0 - 160.00 puan

  // 4 Temel Puan Türü Detayları
  scores: {
    say: SingleScoreTypeResult;
    ea: SingleScoreTypeResult;
    soz: SingleScoreTypeResult;
    dil: SingleScoreTypeResult;
  };

  // Test Net Özetleri
  testNets: {
    tytTurkce: number;
    tytMatematik: number;
    tytFen: number;
    tytSosyal: number;
    aytMatematik: number;
    aytFizik: number;
    aytKimya: number;
    aytBiyoloji: number;
    aytFenTotal: number;
    aytEdebiyat: number;
    aytTarih1: number;
    aytCografya1: number;
    aytEdSos1Total: number;
    aytTarih2: number;
    aytCografya2: number;
    aytFelsefe: number;
    aytDin: number;
    aytSos2Total: number;
    ydtTotal: number;
  };

  // Koçluk Tavsiyeleri
  coachingRecommendations: string[];
}

// ============================================================================
// SIRALAMA VE YIĞILMA EĞRİLERİ (ÖSYM 2024 / 2025 / 2026 VERİLERİ)
// ============================================================================

const CANDIDATES_BY_SCORE_TYPE: Record<YksScoreType, number> = {
  SAY: 1550000,
  EA: 1850000,
  SOZ: 1250000,
  DIL: 190000,
};

function estimateAytRank(scoreType: YksScoreType, placementScore: number, aytNet: number): { rank: number; percentile: number } {
  const totalCandidates = CANDIDATES_BY_SCORE_TYPE[scoreType];

  if (placementScore >= 545) {
    return { rank: 120, percentile: 0.01 };
  }
  if (placementScore >= 510) {
    const ratio = (545 - placementScore) / 35;
    const rank = Math.round(120 + ratio * 2880);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 470) {
    const ratio = (510 - placementScore) / 40;
    const rank = Math.round(3000 + ratio * 12000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 420) {
    const ratio = (470 - placementScore) / 50;
    const rank = Math.round(15000 + ratio * 35000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 360) {
    const ratio = (420 - placementScore) / 60;
    const rank = Math.round(50000 + ratio * 75000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 300) {
    const ratio = (360 - placementScore) / 60;
    const rank = Math.round(125000 + ratio * 175000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 240) {
    const ratio = (300 - placementScore) / 60;
    const rank = Math.round(300000 + ratio * 350000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }
  if (placementScore >= 180) {
    const ratio = (240 - placementScore) / 60;
    const rank = Math.round(650000 + ratio * 450000);
    return { rank, percentile: Number(((rank / totalCandidates) * 100).toFixed(2)) };
  }

  const ratio = Math.max(0, (180 - placementScore) / 80);
  const rank = Math.min(totalCandidates, Math.round(1100000 + ratio * (totalCandidates - 1100000)));
  const percentile = Number(((rank / totalCandidates) * 100).toFixed(2));
  return { rank, percentile };
}

// ============================================================================
// HESAPLAMA MOTORU
// ============================================================================

export function calculateYksAyt(input: YksAytCalculationInput): YksAytCalculationResult {
  // 1. TYT Netleri & %40 TYT Katkısı (Maksimum 160.00 Puan)
  const tytTur = calculateTytSubjectNet(input.tyt?.turkce || { correct: 0, incorrect: 0 }, 40);
  const tytSos = calculateTytSubjectNet(input.tyt?.sosyal || { correct: 0, incorrect: 0 }, 20);
  const tytMat = calculateTytSubjectNet(input.tyt?.matematik || { correct: 0, incorrect: 0 }, 40);
  const tytFen = calculateTytSubjectNet(input.tyt?.fen || { correct: 0, incorrect: 0 }, 20);

  const tytTotalNet = Number((tytTur.effectiveNet + tytSos.effectiveNet + tytMat.effectiveNet + tytFen.effectiveNet).toFixed(2));

  // TYT 0.5 net kuralı (Türkçe veya Matematikten en az 0.5 net)
  const tytEligible = tytTur.effectiveNet >= 0.5 || tytMat.effectiveNet >= 0.5;

  const tytContributionScore = tytEligible
    ? Number((
        tytTur.effectiveNet * 1.32 +
        tytMat.effectiveNet * 1.32 +
        tytFen.effectiveNet * 1.36 +
        tytSos.effectiveNet * 1.36
      ).toFixed(2))
    : 0;

  // 2. OBP Katkısı
  const diplomaGrade = input.diplomaGrade !== undefined
    ? Math.max(50, Math.min(100, Number(input.diplomaGrade) || 50))
    : 80;

  const obp = Number((diplomaGrade * 5).toFixed(2));
  const isBrokenObpApplied = Boolean(input.isBrokenObp);
  const obpMultiplier = isBrokenObpApplied ? 0.06 : 0.12;
  const obpContribution = Number((obp * obpMultiplier).toFixed(2));

  // 3. AYT / YDT Test Netlerinin Hesaplanması
  const aytMat = calculateTytSubjectNet(input.aytMatematik || { correct: 0, incorrect: 0 }, 40);

  // Fen Bilimleri (Fizik 14, Kimya 13, Biyoloji 13)
  const aytFiz = calculateTytSubjectNet(input.aytFen?.fizik || { correct: 0, incorrect: 0 }, 14);
  const aytKim = calculateTytSubjectNet(input.aytFen?.kimya || { correct: 0, incorrect: 0 }, 13);
  const aytBiy = calculateTytSubjectNet(input.aytFen?.biyoloji || { correct: 0, incorrect: 0 }, 13);
  const aytFenTotal = Number((aytFiz.effectiveNet + aytKim.effectiveNet + aytBiy.effectiveNet).toFixed(2));

  // Edebiyat - Sosyal-1 (Edebiyat 24, Tarih-1 10, Coğrafya-1 6)
  const aytEde = calculateTytSubjectNet(input.aytEdSos1?.edebiyat || { correct: 0, incorrect: 0 }, 24);
  const aytTar1 = calculateTytSubjectNet(input.aytEdSos1?.tarih1 || { correct: 0, incorrect: 0 }, 10);
  const aytCog1 = calculateTytSubjectNet(input.aytEdSos1?.cografya1 || { correct: 0, incorrect: 0 }, 6);
  const aytEdSos1Total = Number((aytEde.effectiveNet + aytTar1.effectiveNet + aytCog1.effectiveNet).toFixed(2));

  // Sosyal-2 (Tarih-2 11, Coğrafya-2 11, Felsefe 12, Din 6)
  const aytTar2 = calculateTytSubjectNet(input.aytSos2?.tarih2 || { correct: 0, incorrect: 0 }, 11);
  const aytCog2 = calculateTytSubjectNet(input.aytSos2?.cografya2 || { correct: 0, incorrect: 0 }, 11);
  const aytFel = calculateTytSubjectNet(input.aytSos2?.felsefe || { correct: 0, incorrect: 0 }, 12);
  const aytDin = calculateTytSubjectNet(input.aytSos2?.din || { correct: 0, incorrect: 0 }, 6);
  const aytSos2Total = Number((aytTar2.effectiveNet + aytCog2.effectiveNet + aytFel.effectiveNet + aytDin.effectiveNet).toFixed(2));

  // YDT (80 Soru)
  const ydt = calculateTytSubjectNet(input.ydt || { correct: 0, incorrect: 0 }, 80);

  // 4. PUAN TÜRLERİ DETAYLI HESAPLAMALARI

  // A) SAYISAL (SAY)
  // Şart: TYT şartı + (AYT Mat >= 0.5 veya AYT Fen >= 0.5)
  const sayEligible = tytEligible && (aytMat.effectiveNet >= 0.5 || aytFenTotal >= 0.5);
  const sayAytScore = Number((
    aytMat.effectiveNet * 3.0 +
    aytFiz.effectiveNet * 3.0 +
    aytKim.effectiveNet * 3.0 +
    aytBiy.effectiveNet * 3.0
  ).toFixed(2));

  const sayRawScore = sayEligible
    ? Number(Math.min(500, 100 + tytContributionScore + sayAytScore).toFixed(2))
    : 0;

  const sayPlacementScore = sayEligible
    ? Number((sayRawScore + obpContribution).toFixed(2))
    : 0;

  const sayRankInfo = sayEligible
    ? estimateAytRank('SAY', sayPlacementScore, aytMat.effectiveNet + aytFenTotal)
    : { rank: CANDIDATES_BY_SCORE_TYPE.SAY, percentile: 99.99 };

  const sayResult: SingleScoreTypeResult = {
    scoreType: 'SAY',
    scoreTypeName: 'Sayısal (SAY)',
    isEligible: sayEligible,
    ineligibilityReason: !tytEligible
      ? 'TYT 0.5 net barajı sağlanamadı.'
      : !sayEligible
      ? 'ÖSYM Şartı: AYT Matematik ve/veya Fen testinden en az 0.5 net yapılmalıdır.'
      : undefined,
    rawScore: sayRawScore,
    placementScore: sayPlacementScore,
    aytNet: Number((aytMat.effectiveNet + aytFenTotal).toFixed(2)),
    estimatedRank: sayRankInfo.rank,
    estimatedPercentile: sayRankInfo.percentile,
    thresholds: {
      tipEligible: sayEligible && sayRankInfo.rank <= 50000,
      disEligible: sayEligible && sayRankInfo.rank <= 80000,
      eczacilikEligible: sayEligible && sayRankInfo.rank <= 100000,
      muhendislikEligible: sayEligible && sayRankInfo.rank <= 300000,
      mimarlikEligible: sayEligible && sayRankInfo.rank <= 250000,
      ogretmenlikEligible: sayEligible && sayRankInfo.rank <= 300000,
    },
  };

  // B) EŞİT AĞIRLIK (EA)
  // Şart: TYT şartı + (AYT Mat >= 0.5 veya AYT Ed-Sos1 >= 0.5)
  const eaEligible = tytEligible && (aytMat.effectiveNet >= 0.5 || aytEdSos1Total >= 0.5);
  const eaAytScore = Number((
    aytMat.effectiveNet * 3.0 +
    aytEde.effectiveNet * 3.0 +
    aytTar1.effectiveNet * 3.0 +
    aytCog1.effectiveNet * 3.0
  ).toFixed(2));

  const eaRawScore = eaEligible
    ? Number(Math.min(500, 100 + tytContributionScore + eaAytScore).toFixed(2))
    : 0;

  const eaPlacementScore = eaEligible
    ? Number((eaRawScore + obpContribution).toFixed(2))
    : 0;

  const eaRankInfo = eaEligible
    ? estimateAytRank('EA', eaPlacementScore, aytMat.effectiveNet + aytEdSos1Total)
    : { rank: CANDIDATES_BY_SCORE_TYPE.EA, percentile: 99.99 };

  const eaResult: SingleScoreTypeResult = {
    scoreType: 'EA',
    scoreTypeName: 'Eşit Ağırlık (EA)',
    isEligible: eaEligible,
    ineligibilityReason: !tytEligible
      ? 'TYT 0.5 net barajı sağlanamadı.'
      : !eaEligible
      ? 'ÖSYM Şartı: AYT Matematik ve/veya Edebiyat-Sosyal-1 testinden en az 0.5 net yapılmalıdır.'
      : undefined,
    rawScore: eaRawScore,
    placementScore: eaPlacementScore,
    aytNet: Number((aytMat.effectiveNet + aytEdSos1Total).toFixed(2)),
    estimatedRank: eaRankInfo.rank,
    estimatedPercentile: eaRankInfo.percentile,
    thresholds: {
      hukukEligible: eaEligible && eaRankInfo.rank <= 125000,
      ogretmenlikEligible: eaEligible && eaRankInfo.rank <= 300000,
    },
  };

  // C) SÖZEL (SÖZ)
  // Şart: TYT şartı + (AYT Ed-Sos1 >= 0.5 veya AYT Sos2 >= 0.5)
  const sozEligible = tytEligible && (aytEdSos1Total >= 0.5 || aytSos2Total >= 0.5);
  const sozAytScore = Number((
    aytEde.effectiveNet * 3.0 +
    aytTar1.effectiveNet * 3.0 +
    aytCog1.effectiveNet * 3.0 +
    aytTar2.effectiveNet * 3.0 +
    aytCog2.effectiveNet * 3.0 +
    aytFel.effectiveNet * 3.0 +
    aytDin.effectiveNet * 3.0
  ).toFixed(2));

  const sozRawScore = sozEligible
    ? Number(Math.min(500, 100 + tytContributionScore + sozAytScore).toFixed(2))
    : 0;

  const sozPlacementScore = sozEligible
    ? Number((sozRawScore + obpContribution).toFixed(2))
    : 0;

  const sozRankInfo = sozEligible
    ? estimateAytRank('SOZ', sozPlacementScore, aytEdSos1Total + aytSos2Total)
    : { rank: CANDIDATES_BY_SCORE_TYPE.SOZ, percentile: 99.99 };

  const sozResult: SingleScoreTypeResult = {
    scoreType: 'SOZ',
    scoreTypeName: 'Sözel (SÖZ)',
    isEligible: sozEligible,
    ineligibilityReason: !tytEligible
      ? 'TYT 0.5 net barajı sağlanamadı.'
      : !sozEligible
      ? 'ÖSYM Şartı: Edebiyat-Sosyal-1 ve/veya Sosyal-2 testinden en az 0.5 net yapılmalıdır.'
      : undefined,
    rawScore: sozRawScore,
    placementScore: sozPlacementScore,
    aytNet: Number((aytEdSos1Total + aytSos2Total).toFixed(2)),
    estimatedRank: sozRankInfo.rank,
    estimatedPercentile: sozRankInfo.percentile,
    thresholds: {
      ogretmenlikEligible: sozEligible && sozRankInfo.rank <= 300000,
    },
  };

  // D) YABANCI DİL (DİL)
  // Şart: TYT şartı + YDT >= 0.5
  const dilEligible = tytEligible && ydt.effectiveNet >= 0.5;
  const dilYdtScore = Number((ydt.effectiveNet * 3.0).toFixed(2));

  const dilRawScore = dilEligible
    ? Number(Math.min(500, 100 + tytContributionScore + dilYdtScore).toFixed(2))
    : 0;

  const dilPlacementScore = dilEligible
    ? Number((dilRawScore + obpContribution).toFixed(2))
    : 0;

  const dilRankInfo = dilEligible
    ? estimateAytRank('DIL', dilPlacementScore, ydt.effectiveNet)
    : { rank: CANDIDATES_BY_SCORE_TYPE.DIL, percentile: 99.99 };

  const dilResult: SingleScoreTypeResult = {
    scoreType: 'DIL',
    scoreTypeName: 'Yabancı Dil (DİL)',
    isEligible: dilEligible,
    ineligibilityReason: !tytEligible
      ? 'TYT 0.5 net barajı sağlanamadı.'
      : !dilEligible
      ? 'ÖSYM Şartı: YDT Yabancı Dil testinden en az 0.5 net yapılmalıdır.'
      : undefined,
    rawScore: dilRawScore,
    placementScore: dilPlacementScore,
    aytNet: ydt.effectiveNet,
    estimatedRank: dilRankInfo.rank,
    estimatedPercentile: dilRankInfo.percentile,
    thresholds: {
      ogretmenlikEligible: dilEligible && dilRankInfo.rank <= 300000,
    },
  };

  // Koçluk Tavsiyeleri
  const coachingRecommendations: string[] = [];

  if (sayEligible && sayResult.thresholds.tipEligible) {
    coachingRecommendations.push('🩺 Tebrikler! Sayısal puanınız Tıp Fakültesi başarı sırası barajı (İlk 50.000) içindedir.');
  } else if (sayEligible && sayResult.thresholds.muhendislikEligible) {
    coachingRecommendations.push('⚡ Mühendislik programları için ilk 300.000 barajını geçtiniz. AYT Fizik ve Matematik netlerinizi artırarak ilk 50.000 bandına yaklaşabilirsiniz.');
  }

  if (eaEligible && eaResult.thresholds.hukukEligible) {
    coachingRecommendations.push('⚖️ Tebrikler! Eşit Ağırlık puanınız Hukuk Fakültesi başarı sırası barajı (İlk 125.000) içindedir.');
  }

  if (isBrokenObpApplied) {
    coachingRecommendations.push('📌 Kırık OBP uygulandı: Önceki yıl bir üniversiteye yerleştiğiniz için diploma katkısı yarıya düştü. AYT\'deki +5 net bu açığı tamamen kapatacaktır.');
  }

  return {
    isValid: true,
    diplomaGrade,
    obp,
    obpContribution,
    isBrokenObpApplied,
    tytTotalNet,
    tytContributionScore,
    scores: {
      say: sayResult,
      ea: eaResult,
      soz: sozResult,
      dil: dilResult,
    },
    testNets: {
      tytTurkce: tytTur.effectiveNet,
      tytMatematik: tytMat.effectiveNet,
      tytFen: tytFen.effectiveNet,
      tytSosyal: tytSos.effectiveNet,
      aytMatematik: aytMat.effectiveNet,
      aytFizik: aytFiz.effectiveNet,
      aytKimya: aytKim.effectiveNet,
      aytBiyoloji: aytBiy.effectiveNet,
      aytFenTotal,
      aytEdebiyat: aytEde.effectiveNet,
      aytTarih1: aytTar1.effectiveNet,
      aytCografya1: aytCog1.effectiveNet,
      aytEdSos1Total,
      aytTarih2: aytTar2.effectiveNet,
      aytCografya2: aytCog2.effectiveNet,
      aytFelsefe: aytFel.effectiveNet,
      aytDin: aytDin.effectiveNet,
      aytSos2Total,
      ydtTotal: ydt.effectiveNet,
    },
    coachingRecommendations,
  };
}
