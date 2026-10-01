/**
 * 🎓 SınavKoçu.ai — 11. Sınıf (Lise 3) Erken TYT Başlangıç ve İlerleme Takip Motoru
 *
 * Pedagojik ve Akademik Temel:
 * - 11. sınıf, ÖSYM YKS AYT başarısının %60'ını belirlerken, 9 ve 10. sınıfın kazanımlarından
 *   oluşan TYT (120 Soru) için de en kritik 'Erken Temel Sağlamlaştırma' dönemidir.
 * - Altın Kural (70/30 Kuralı): 11. sınıfta çalışma süresinin %70'i okul ve 11. sınıf AYT konularına,
 *   %30'u ise 9 ve 10. sınıf TYT tekrar ve eksik kapatmaya ayrılmalıdır. Aşırı TYT yüklenmesi OBP'yi
 *   ve AYT altyapısını zedeler; TYT'yi tamamen ertelemek ise 12. sınıfta panik yaratır.
 */

import type { HighSchoolTrack } from '@/lib/field-selection';

export type TytSubjectKey = 'turkce' | 'sosyal' | 'matematik' | 'fen';

export interface TytScoresInput {
  turkce: number; // 0 - 40
  sosyal: number; // 0 - 20
  matematik: number; // 0 - 40
  fen: number; // 0 - 20
}

export interface EarlyTytTopicItem {
  id: string;
  grade: 9 | 10;
  subjectKey: TytSubjectKey;
  subjectName: string;
  topicName: string;
  priority: 'KRİTİK' | 'YÜKSEK' | 'ORTA';
  whyVital: string;
  aytConnection: string;
  estimatedQuestionCountTyt: string;
}

export interface EarlyTytSubjectStrategy {
  subjectKey: TytSubjectKey;
  subjectName: string;
  currentNet: number;
  maxNet: number;
  targetNetForTrack: number;
  weeklyTargetQuestions: number;
  status: 'guclu' | 'gelistirilmeli' | 'acil_oncelik';
  guidanceNote: string;
}

export interface EarlyTytWeeklyScheduleDay {
  day: string;
  aytFocus: string;
  tytFocus: string;
  targetQuestionCount: number;
}

export interface RecommendedPracticeExam {
  slug: string;
  title: string;
  tier: 'lise1' | 'lise2' | 'lise3';
  courseKey: string;
  courseName: string;
  questionCount: number;
  reason: string;
}

export interface EarlyTytDiagnosticResult {
  track: HighSchoolTrack;
  trackName: string;
  currentScores: TytScoresInput;
  currentTotalNet: number;
  target12thGradeTytNet: number;
  netGap: number;
  netStatusLevel: 'temel_kurulum' | 'orta_gelisim' | 'ileri_hizlanma' | 'derece_hedefi';
  levelTitle: string;
  timeAllocation: {
    totalWeeklyHours: number;
    aytHours: number;
    aytPercentage: number;
    tytHours: number;
    tytPercentage: number;
    targetWeeklyQuestions: number;
  };
  criticalBottlenecks: string[];
  subjectStrategies: Record<TytSubjectKey, EarlyTytSubjectStrategy>;
  priorityFoundationalTopics: EarlyTytTopicItem[];
  weeklyPlan: EarlyTytWeeklyScheduleDay[];
  recommendedExams: RecommendedPracticeExam[];
  pedagogicalSummary: string;
}

// ============================================================================
// 9 VE 10. SINIF TEMEL TYT OMURGA KONULARI (AYT BAĞLANTILARIYLA)
// ============================================================================

export const EARLY_TYT_FOUNDATION_TOPICS: EarlyTytTopicItem[] = [
  // --- MATEMATİK (9 ve 10. Sınıf) ---
  {
    id: 'tyt-mat-fonksiyonlar',
    grade: 10,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Fonksiyonlar ve Uygulamaları (9-10. Sınıf)',
    priority: 'KRİTİK',
    whyVital: 'YKS Matematiğinin omurgasıdır; fonksiyon grafiği ve bileşke oturmadan hiçbir ileri konu kavranamaz.',
    aytConnection: '11. Sınıf Parabol, Trigonometrik Fonksiyonlar; 12. Sınıf Logaritma, Limit, Türev ve İntegralin doğrudan temelidir.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 4-6 Soru (AYT)',
  },
  {
    id: 'tyt-mat-ucgenler',
    grade: 9,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Üçgenler ve Doğruda Açılar (9. Sınıf Temel Geometri)',
    priority: 'KRİTİK',
    whyVital: 'Geometri sorularının %75\'i üçgende açı, kenar, benzerlik ve alana dayanır.',
    aytConnection: '11. Sınıf Analitik Geometri ve Trigonometri ile 12. Sınıf Çember ve Katı Cisimlerin zorunlu temelidir.',
    estimatedQuestionCountTyt: '3-4 Soru (TYT) + 3-5 Soru (AYT)',
  },
  {
    id: 'tyt-mat-polinomlar-denklemler',
    grade: 10,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Polinomlar ve 2. Dereceden Bir Bilinmeyenli Denklemler',
    priority: 'KRİTİK',
    whyVital: 'Cebirsel çarpanlara ayırma, kök-katsayı ilişkisi ve derece kavramının merkezidir.',
    aytConnection: 'AYT Matematikte Karmaşık Sayılar, Parabol ve 2. Dereceden Eşitsizliklerin başlangıç noktasıdır.',
    estimatedQuestionCountTyt: '1-2 Soru (TYT) + 2-3 Soru (AYT)',
  },
  {
    id: 'tyt-mat-problemler',
    grade: 9,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Sayı, Kesir, Yaş, Hız, Yüzde-Kar ve Grafik Problemleri',
    priority: 'KRİTİK',
    whyVital: 'TYT Matematiğin en yüksek ağırlıklı bölümüdür; mantık yürütme ve denklem kurma hızını test eder.',
    aytConnection: 'Matematiksel modelleme, problem çözme refleksi ve sınav süresi yönetiminde belirleyicidir.',
    estimatedQuestionCountTyt: '11-13 Soru (TYT)',
  },
  {
    id: 'tyt-mat-pkbo',
    grade: 10,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Sayma Yöntemleri, Permütasyon, Kombinasyon, Binom ve Olasılık',
    priority: 'YÜKSEK',
    whyVital: 'Öğrencilerin en çok zorlandığı ve eleyiciliği en yüksek matematik ünitesidir.',
    aytConnection: 'Hem TYT hem de AYT Matematik testinde her yıl 2-3 soru garanti çıkmaktadır.',
    estimatedQuestionCountTyt: '2 Soru (TYT) + 2 Soru (AYT)',
  },
  {
    id: 'tyt-mat-dortgenler-cokgenler',
    grade: 10,
    subjectKey: 'matematik',
    subjectName: 'Temel Matematik',
    topicName: 'Çokgenler, Özel Dörtgenler (Yamuk, Paralelkenar, Eşkenar Dörtgen, Dikdörtgen, Kare)',
    priority: 'YÜKSEK',
    whyVital: 'Üçgen bilgilerini dörtgen özellikleriyle birleştirerek TYT Geometri netlerini yükseltir.',
    aytConnection: '11. Sınıf Analitik Geometri koordinat yerleşimlerinde ve AYT Çember/Daire sorularında kullanılır.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 2-3 Soru (AYT)',
  },

  // --- TÜRKÇE ---
  {
    id: 'tyt-tur-paragraf',
    grade: 9,
    subjectKey: 'turkce',
    subjectName: 'Türkçe',
    topicName: 'Paragrafta Anlam, Ana Düşünce, Yardımcı Düşünceler ve Yapı',
    priority: 'KRİTİK',
    whyVital: 'TYT sınavının en çok soru çıkan bölümüdür ve tüm derslerdeki soru okuma hızını belirler.',
    aytConnection: 'Sözel ve Eşit Ağırlık alanında AYT Edebiyat ve Sosyal metin analizlerinin temelidir.',
    estimatedQuestionCountTyt: '26-28 Soru (TYT)',
  },
  {
    id: 'tyt-tur-dilbilgisi',
    grade: 10,
    subjectKey: 'turkce',
    subjectName: 'Türkçe',
    topicName: 'Sözcükte Yapı, Ekler, Sözcük Türleri ve Cümlenin Ögeleri',
    priority: 'YÜKSEK',
    whyVital: 'Net arttırması en hızlı ve kurala dayalı alandır; sıfır hata ile fullemeyi sağlar.',
    aytConnection: 'AYT Edebiyat metin tahlillerinde ve şiir incelemelerinde dil yapısını anlamayı kolaylaştırır.',
    estimatedQuestionCountTyt: '6-8 Soru (TYT)',
  },
  {
    id: 'tyt-tur-yazim-noktalama',
    grade: 9,
    subjectKey: 'turkce',
    subjectName: 'Türkçe',
    topicName: 'Yazım Kuralları ve Noktalama İşaretleri',
    priority: 'YÜKSEK',
    whyVital: 'Her TYT sınavında istisnasız 4 net getiren ve dakikalar içinde çözülebilen garanti net konusudur.',
    aytConnection: 'Akademik kompozisyon, MEB ortak yazılıları ve yazılı sınav başarısı için zorunludur.',
    estimatedQuestionCountTyt: '4 Soru (TYT)',
  },

  // --- FEN BİLİMLERİ ---
  {
    id: 'tyt-fiz-kuvvet-hareket',
    grade: 9,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Fizik)',
    topicName: 'Doğrusal Hareket, Newton Hareket Yasaları ve İş-Güç-Enerji (9. Sınıf)',
    priority: 'KRİTİK',
    whyVital: 'Fiziğin en temel mekanik konularıdır; formül ezberi yerine neden-sonuç bağı kurdurur.',
    aytConnection: '11. Sınıf İleri Fizik (Bağıl Hareket, İki Boyutta Hareket, İtme-Momentum) doğrudan bu temele kurulur.',
    estimatedQuestionCountTyt: '2 Soru (TYT) + 3-4 Soru (AYT)',
  },
  {
    id: 'tyt-fiz-elektrik-dalgalar',
    grade: 10,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Fizik)',
    topicName: 'Elektrik Devreleri, Manyetizma, Dalgalar ve Optik (10. Sınıf)',
    priority: 'YÜKSEK',
    whyVital: 'TYT Fizik testinin ikinci yarısını oluşturur ve optik-dalga soruları yüksek ayırt edicidir.',
    aytConnection: '11. Sınıf Elektriksel Kuvvet/Potansiyel/Manyetizma ve 12. Sınıf Dalga Mekaniğinin temelidir.',
    estimatedQuestionCountTyt: '3 Soru (TYT) + 3-4 Soru (AYT)',
  },
  {
    id: 'tyt-kim-atom-periyodik',
    grade: 9,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Kimya)',
    topicName: 'Atom Modelleri, Periyodik Sistem ve Kimyasal Türler Arası Etkileşimler',
    priority: 'KRİTİK',
    whyVital: 'Kimyasal bağlar anlaşılmadan organik kimya ve çözelti dengeleri asla anlaşılamaz.',
    aytConnection: '11. Sınıf Modern Atom Teorisi (Kuantum Sayıları) ve Gazlar/Sıvı Çözeltiler ünitesinin temelidir.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 2 Soru (AYT)',
  },
  {
    id: 'tyt-kim-mol-karisimlar-asit',
    grade: 10,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Kimya)',
    topicName: 'Kimyanın Temel Kanunları, Mol Kavramı, Kimyasal Hesaplamalar, Karışımlar ve Asit-Bazlar',
    priority: 'KRİTİK',
    whyVital: 'Sayısal hesaplamaların ve kimyasal denklem denkleştirmenin temelidir.',
    aytConnection: '11. Sınıf Kimyasal Tepkimelerde Enerji, Hız ve Kimyasal Denge (Asit-Baz Dengesi) bu mol temeline dayanır.',
    estimatedQuestionCountTyt: '3 Soru (TYT) + 3 Soru (AYT)',
  },
  {
    id: 'tyt-biy-hucre-temel-bilesenler',
    grade: 9,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Biyoloji)',
    topicName: 'Canlıların Temel Bileşenleri (Karbonhidrat, Yağ, Protein, Enzim) ve Hücre Yapısı',
    priority: 'KRİTİK',
    whyVital: 'Hücre metabolizması, enzimler ve ATP biyolojinin alfabesidir.',
    aytConnection: '11. Sınıf İnsan Fizyolojisi (Sistemler) ve 12. Sınıf Hücresel Solunum/Fotosentez için temeldir.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 2-3 Soru (AYT)',
  },
  {
    id: 'tyt-biy-bolunmeler-kalitim',
    grade: 10,
    subjectKey: 'fen',
    subjectName: 'Fen Bilimleri (Biyoloji)',
    topicName: 'Mitoz ve Mayoz Bölünmeler, Kalıtımın Genel Esasları ve Ekosistem Ekolojisi',
    priority: 'KRİTİK',
    whyVital: 'Mendel genetiği, kan grupları ve soyağacı soruları TYT\'de her yıl kesinlikle sorulur.',
    aytConnection: '12. Sınıf Genden Proteine (Transkripsiyon/Translasyon) ve Evrim/Biyoteknoloji konularının temelidir.',
    estimatedQuestionCountTyt: '3 Soru (TYT) + 2 Soru (AYT)',
  },

  // --- SOSYAL BİLİMLER ---
  {
    id: 'tyt-sos-tarih-osmanli',
    grade: 10,
    subjectKey: 'sosyal',
    subjectName: 'Sosyal Bilimler (Tarih)',
    topicName: 'İlk ve Orta Çağ Türk Dünyası (9) ile Klasik Dönem Osmanlı Devleti (10)',
    priority: 'YÜKSEK',
    whyVital: 'Devlet teşkilatı, ordu yapısı ve fetih siyaseti TYT Tarih sorularının merkezindedir.',
    aytConnection: 'AYT Tarih-1 ve Tarih-2 testlerinde Osmanlı siyasi ve kurum tarihi en çok soru gelen kısımdır.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 4-6 Soru (AYT)',
  },
  {
    id: 'tyt-sos-cog-iklim-harita',
    grade: 9,
    subjectKey: 'sosyal',
    subjectName: 'Sosyal Bilimler (Coğrafya)',
    topicName: 'Doğa ve İnsan, Harita Bilgisi, İklim Bilgisi ve Yer Şekilleri (9-10. Sınıf)',
    priority: 'YÜKSEK',
    whyVital: 'İzohipsler, sıcaklık-basınç grafikleri ve dünya fiziki haritası harita okuma becerisini ölçer.',
    aytConnection: 'AYT Coğrafya küresel iklim, ekstrem doğa olayları ve doğal afetler sorularının zeminidir.',
    estimatedQuestionCountTyt: '2-3 Soru (TYT) + 2-3 Soru (AYT)',
  },
  {
    id: 'tyt-sos-fel-temel-kavramlar',
    grade: 10,
    subjectKey: 'sosyal',
    subjectName: 'Sosyal Bilimler (Felsefe)',
    topicName: 'Bilgi Felsefesi, Varlık Felsefesi, Ahlak Felsefesi ve Akıl Yürütme',
    priority: 'ORTA',
    whyVital: 'Kavram bilgisi (Rasyonalizm, Empirizm, Ontoloji, Epistemoloji) ile paragraf yorumlama gücünü artırır.',
    aytConnection: 'AYT Felsefe Grubu (Mantık, Psikoloji, Sosyoloji) için temel oluşturur.',
    estimatedQuestionCountTyt: '5 Soru (TYT)',
  },
  {
    id: 'tyt-sos-din-kavramlar',
    grade: 9,
    subjectKey: 'sosyal',
    subjectName: 'Sosyal Bilimler (Din Kültürü)',
    topicName: 'İslam ve İbadet, İman Esasları, Ahlaki Tutumlar ve Temel Dini Terimler',
    priority: 'ORTA',
    whyVital: 'Her TYT sınavında 5 soru garanti çıkar; terim bilgisi (ihsan, ihlas, takva vb.) fullemeyi sağlar.',
    aytConnection: 'AYT Din Kültürü ve Ahlak Bilgisi testinde doğrudan sorulan kavramlardır.',
    estimatedQuestionCountTyt: '5 Soru (TYT)',
  },
];

// ============================================================================
// HEDEF KALİBRASYON TABLOLARI (ÖĞRENCİ ALANINA GÖRE)
// ============================================================================

interface TrackTargetCriteria {
  trackName: string;
  recommendedTytTotalTarget: number;
  subjectTargets: Record<TytSubjectKey, number>;
  subjectWeights: Record<TytSubjectKey, number>;
}

export const TRACK_TYT_CALIBRATION: Record<HighSchoolTrack, TrackTargetCriteria> = {
  sayisal: {
    trackName: 'Sayısal (Matematik - Fen)',
    recommendedTytTotalTarget: 95,
    subjectTargets: {
      turkce: 34,
      sosyal: 14,
      matematik: 32,
      fen: 16,
    },
    subjectWeights: {
      matematik: 0.35,
      fen: 0.35,
      turkce: 0.20,
      sosyal: 0.10,
    },
  },
  esit_agirlik: {
    trackName: 'Eşit Ağırlık (Türkçe - Matematik)',
    recommendedTytTotalTarget: 82,
    subjectTargets: {
      turkce: 35,
      sosyal: 16,
      matematik: 25,
      fen: 8,
    },
    subjectWeights: {
      matematik: 0.35,
      turkce: 0.35,
      sosyal: 0.20,
      fen: 0.10,
    },
  },
  sozel: {
    trackName: 'Sözel (Türkçe - Sosyal)',
    recommendedTytTotalTarget: 75,
    subjectTargets: {
      turkce: 36,
      sosyal: 18,
      matematik: 15,
      fen: 6,
    },
    subjectWeights: {
      turkce: 0.40,
      sosyal: 0.35,
      matematik: 0.15,
      fen: 0.10,
    },
  },
  dil: {
    trackName: 'Yabancı Dil (İngilizce)',
    recommendedTytTotalTarget: 70,
    subjectTargets: {
      turkce: 35,
      sosyal: 16,
      matematik: 14,
      fen: 5,
    },
    subjectWeights: {
      turkce: 0.45,
      sosyal: 0.25,
      matematik: 0.20,
      fen: 0.10,
    },
  },
};

// ============================================================================
// HESAPLAMA VE ANALİZ MOTORU
// ============================================================================

export interface EarlyTytEngineOptions {
  track: HighSchoolTrack;
  scores: Partial<TytScoresInput>;
  weeklyStudyHours?: number; // Varsayılan 20 saat
  target12thGradeTytNet?: number; // İsteğe bağlı hedef, boşsa alan varsayılanı
  selectedWeakTopicIds?: string[];
}

/**
 * 11. Sınıf öğrencisinin TYT teşhisini yapar ve kişiselleştirilmiş haftalık plan oluşturur.
 */
export function analyzeEarlyTytProgress(options: EarlyTytEngineOptions): EarlyTytDiagnosticResult {
  const track = options.track || 'sayisal';
  const calibration = TRACK_TYT_CALIBRATION[track] || TRACK_TYT_CALIBRATION.sayisal;

  // Skorları sınırla (negatif net koruması ve tavan kontrolü)
  const turkce = Math.max(0, Math.min(40, Number(options.scores.turkce ?? 0)));
  const sosyal = Math.max(0, Math.min(20, Number(options.scores.sosyal ?? 0)));
  const matematik = Math.max(0, Math.min(40, Number(options.scores.matematik ?? 0)));
  const fen = Math.max(0, Math.min(20, Number(options.scores.fen ?? 0)));

  const currentScores: TytScoresInput = { turkce, sosyal, matematik, fen };
  const currentTotalNet = Number((turkce + sosyal + matematik + fen).toFixed(2));

  // Hedef net
  const defaultTarget = calibration.recommendedTytTotalTarget;
  const target12thGradeTytNet = options.target12thGradeTytNet && options.target12thGradeTytNet > 0
    ? Math.min(120, Math.max(30, options.target12thGradeTytNet))
    : defaultTarget;

  const netGap = Number((target12thGradeTytNet - currentTotalNet).toFixed(2));

  // Net Düzeyi Seviyelendirmesi
  let netStatusLevel: EarlyTytDiagnosticResult['netStatusLevel'] = 'temel_kurulum';
  let levelTitle = '1. Aşama: Temel Kavram Kurulumu';

  if (currentTotalNet >= 85) {
    netStatusLevel = 'derece_hedefi';
    levelTitle = '4. Aşama: Derece & Hız Optimizasyonu';
  } else if (currentTotalNet >= 65) {
    netStatusLevel = 'ileri_hizlanma';
    levelTitle = '3. Aşama: İleri Düzey Soru Çözümü & Branş Denemeleri';
  } else if (currentTotalNet >= 45) {
    netStatusLevel = 'orta_gelisim';
    levelTitle = '2. Aşama: Temel Pekişti, Hız ve Soru Çeşitliliği';
  }

  // 70/30 Çalışma Saati Dağılımı (11. Sınıf Altın Kuralı)
  const totalWeeklyHours = Math.max(10, Math.min(40, options.weeklyStudyHours ?? 20));
  const aytPercentage = 70;
  const tytPercentage = 30;
  const aytHours = Number(((totalWeeklyHours * aytPercentage) / 100).toFixed(1));
  const tytHours = Number(((totalWeeklyHours * tytPercentage) / 100).toFixed(1));

  // Haftalık soru hedefi (Öğrencinin haftalık çalışma saatine göre dinamik)
  // Ortalama saatte 20-25 soru çözümü baz alınır
  const targetWeeklyQuestions = Math.round(totalWeeklyHours * 22);

  // Kritik Darboğaz Tespiti (Critical Bottlenecks)
  const criticalBottlenecks: string[] = [];

  if (track === 'sayisal' && matematik < 20) {
    criticalBottlenecks.push('⚠️ Sayısal alanda TYT Matematik 20 netin altında. 11. sınıf İleri Matematik (Trigonometri/Analitik) için Fonksiyonlar ve Problemler kampı acil önceliktir.');
  }
  if (track === 'sayisal' && fen < 10) {
    criticalBottlenecks.push('⚠️ TYT Fen Bilimleri 10 netin altında. 9 ve 10. sınıf Fizik-Kimya-Biyoloji temel kavram eksikleri 11. sınıf sayısal derslerini zorlayacaktır.');
  }
  if (track === 'esit_agirlik' && matematik < 15) {
    criticalBottlenecks.push('⚠️ Eşit Ağırlıkta dereceyi Matematik netleri belirler. TYT Matematik 15 netin altında kalmamalıdır.');
  }
  if (turkce < 25) {
    criticalBottlenecks.push('⚠️ TYT Türkçe 25 netin altında. Sınav genelindeki süre baskısını kırmak için her gün aksatılmadan 20 paragraf sorusu çözülmelidir.');
  }
  if (sosyal < 10 && (track === 'sozel' || track === 'esit_agirlik')) {
    criticalBottlenecks.push('⚠️ Sosyal Bilimler testi en hızlı net kazandıran alandır. Kavram eksikleri kapatılarak 15+ nete çekilmelidir.');
  }

  if (criticalBottlenecks.length === 0) {
    criticalBottlenecks.push('🎯 Dengeli ve güçlü bir başlangıç netine sahipsin. 11. sınıf AYT konularını aksatmadan TYT branş denemeleriyle hızını koru.');
  }

  // Ders Bazlı Stratejiler
  const maxScores: Record<TytSubjectKey, number> = {
    turkce: 40,
    sosyal: 20,
    matematik: 40,
    fen: 20,
  };

  const subjectNames: Record<TytSubjectKey, string> = {
    turkce: 'TYT Türkçe (40 Soru)',
    sosyal: 'TYT Sosyal Bilimler (20 Soru)',
    matematik: 'TYT Temel Matematik (40 Soru)',
    fen: 'TYT Fen Bilimleri (20 Soru)',
  };

  const subjectKeys: TytSubjectKey[] = ['turkce', 'matematik', 'fen', 'sosyal'];
  const subjectStrategies = {} as Record<TytSubjectKey, EarlyTytSubjectStrategy>;

  for (const key of subjectKeys) {
    const cur = currentScores[key];
    const max = maxScores[key];
    const target = calibration.subjectTargets[key];
    const diff = target - cur;

    let status: EarlyTytSubjectStrategy['status'] = 'guclu';
    if (diff > (max * 0.3)) {
      status = 'acil_oncelik';
    } else if (diff > 0) {
      status = 'gelistirilmeli';
    }

    // Haftalık TYT sorularının derse göre paylaştırılması
    const weight = calibration.subjectWeights[key];
    const weeklyTytQuestions = Math.round(targetWeeklyQuestions * 0.30 * (weight / 0.35));

    let guidanceNote = '';
    if (key === 'turkce') {
      guidanceNote = cur < 28
        ? 'Her gün sabah ilk iş olarak 20 adet yeni nesil paragraf sorusu çöz; haftada 1 konu dil bilgisi tekrarı yap.'
        : 'Süre tutarak haftalık 1 adet TYT Türkçe branş denemesi çöz ve yanlış analizini yap.';
    } else if (key === 'matematik') {
      guidanceNote = cur < 20
        ? 'Temel kavramlar, basit denklemler ve problemler üzerine odaklan. Fonksiyonlar konusunu asla erteleme.'
        : 'Geometri üçgenler tekrarı yap ve haftalık problem rutini ile hız kazanmaya odaklan.';
    } else if (key === 'fen') {
      guidanceNote = track === 'sayisal'
        ? '9 ve 10. sınıf fizik (kuvvet-hareket), kimya (mol-asit) ve biyoloji (hücre-kalıtım) ünitelerini haftalık 1 ünite şeklinde bitir.'
        : 'Temel kavramlar ve sözel ağırlıklı biyoloji/kimya sorularına odaklanarak garanti 6-8 net hedeflenmelidir.';
    } else {
      guidanceNote = 'Tarih ve Coğrafyada harita/kavram özetlerini oku; Din ve Felsefede terimler sözlüğünü tara.';
    }

    subjectStrategies[key] = {
      subjectKey: key,
      subjectName: subjectNames[key],
      currentNet: cur,
      maxNet: max,
      targetNetForTrack: target,
      weeklyTargetQuestions: Math.max(25, weeklyTytQuestions),
      status,
      guidanceNote,
    };
  }

  // Öncelikli Konular (Öğrencinin alanına ve eksiklerine göre sıralanır)
  const priorityFoundationalTopics = EARLY_TYT_FOUNDATION_TOPICS.filter((t) => {
    if (track === 'sayisal') {
      // Sayısalcı için Mat ve Fen ağırlıklı, Türkçe paragraf zorunlu
      return t.subjectKey === 'matematik' || t.subjectKey === 'fen' || t.id === 'tyt-tur-paragraf';
    }
    if (track === 'esit_agirlik') {
      // EA için Mat ve Türkçe ağırlıklı, Sosyal öncelikli
      return t.subjectKey === 'matematik' || t.subjectKey === 'turkce' || t.subjectKey === 'sosyal';
    }
    if (track === 'sozel') {
      // Sözel için Türkçe, Sosyal ve Temel Mat
      return t.subjectKey === 'turkce' || t.subjectKey === 'sosyal' || t.id === 'tyt-mat-problemler';
    }
    // Dil için
    return t.subjectKey === 'turkce' || t.id === 'tyt-mat-problemler' || t.subjectKey === 'sosyal';
  }).slice(0, 6);

  // Haftalık Plan (7 Günlük Dengeli 70% AYT / 30% TYT Çizelgesi)
  const dailyTargetQ = Math.round(targetWeeklyQuestions / 6);
  const weeklyPlan: EarlyTytWeeklyScheduleDay[] = [
    {
      day: 'Pazartesi',
      aytFocus: '11. Sınıf İleri Matematik (Trigonometri / Teoremler & İndirgemeler)',
      tytFocus: 'TYT Türkçe: 20 Paragraf + TYT Matematik: Sayı Problemleri',
      targetQuestionCount: dailyTargetQ,
    },
    {
      day: 'Salı',
      aytFocus: track === 'sayisal'
        ? '11. Sınıf İleri Fizik (Vektörler & Bağıl Hareket İki Boyutta)'
        : '11. Sınıf Edebiyat (Tanzimat / Servet-i Fünun Şiiri ve Hikâye)',
      tytFocus: 'TYT Geometri: Üçgende Açı ve Benzerlik Tekrarı',
      targetQuestionCount: dailyTargetQ,
    },
    {
      day: 'Çarşamba',
      aytFocus: track === 'sayisal'
        ? '11. Sınıf İleri Kimya (Modern Atom Teorisi & Kuantum)'
        : '11. Sınıf Tarih (17. Yüzyıl Siyasi Gelişmeler & İltizam)',
      tytFocus: 'TYT Türkçe: 20 Paragraf + Yazım-Noktalama Kuralları',
      targetQuestionCount: dailyTargetQ,
    },
    {
      day: 'Perşembe',
      aytFocus: track === 'sayisal'
        ? '11. Sınıf İleri Biyoloji (Sinir Sistemi & Nöronlar)'
        : '11. Sınıf Coğrafya (Biyoçeşitlilik & Ekosistemler)',
      tytFocus: track === 'sayisal'
        ? 'TYT Fizik / Kimya: 9. Sınıf Kuvvet & Madde Tekrarı'
        : 'TYT Sosyal: Tarih İlk Çağ Uygarlıkları & Harita Bilgisi',
      targetQuestionCount: dailyTargetQ,
    },
    {
      day: 'Cuma',
      aytFocus: '11. Sınıf Okul Ortak Yazılılarına Hazırlık & Hafta İçi Tekrarı',
      tytFocus: 'TYT Matematik: Fonksiyonlar (10. Sınıf Temeli)',
      targetQuestionCount: dailyTargetQ,
    },
    {
      day: 'Cumartesi',
      aytFocus: '11. Sınıf Branş Taraması & AYT Çözümlü Soru Analizleri',
      tytFocus: 'TYT Mini Deneme veya 1 Branş Denemesi (Süre Tutarak)',
      targetQuestionCount: Math.round(dailyTargetQ * 1.2),
    },
    {
      day: 'Pazar',
      aytFocus: 'Haftalık Eksik Kapatma & Serbest Dinlenme',
      tytFocus: 'Yanlış Defteri İncelemesi (Hafta Boyunca Yapılan Hatalar)',
      targetQuestionCount: Math.round(dailyTargetQ * 0.5),
    },
  ];

  // Sistemdeki 9 ve 10. sınıf deneme havuzlarından önerilen testler
  const recommendedExams: RecommendedPracticeExam[] = [
    {
      slug: 'meb-10-matematik-1-donem-1-yazili',
      title: 'MEB 10. Sınıf Matematik Ortak Yazılı Provası (Permütasyon & Fonksiyonlar)',
      tier: 'lise2',
      courseKey: 'matematik',
      courseName: '10. Sınıf Matematik',
      questionCount: 10,
      reason: 'TYT ve AYT için zorunlu olan Sayma, Fonksiyon ve Polinom temelini eksiksiz denetler.',
    },
    {
      slug: 'meb-9-matematik-1-donem-1-yazili',
      title: 'MEB 9. Sınıf Matematik Ortak Yazılı Provası (Kümeler & Temel İşlemler)',
      tier: 'lise1',
      courseKey: 'matematik',
      courseName: '9. Sınıf Matematik',
      questionCount: 10,
      reason: 'TYT Matematik ilk 12 soru kalıbının mantık ve küme temelini sağlamlaştırır.',
    },
    {
      slug: 'meb-10-fizik-1-donem-1-yazili',
      title: 'MEB 10. Sınıf Fizik Ortak Yazılı Provası (Elektrik Devreleri & Dirençler)',
      tier: 'lise2',
      courseKey: 'fizik',
      courseName: '10. Sınıf Fizik',
      questionCount: 10,
      reason: 'TYT Fizik testinin her yıl garanti çıkan Ohm Yasası ve eşdeğer direnç sorularını kavratır.',
    },
    {
      slug: 'meb-10-kimya-1-donem-1-yazili',
      title: 'MEB 10. Sınıf Kimya Ortak Yazılı Provası (Mol & Kimyasal Kanunlar)',
      tier: 'lise2',
      courseKey: 'kimya',
      courseName: '10. Sınıf Kimya',
      questionCount: 10,
      reason: '11. sınıf kimyasal hesaplamaların ve TYT Kimya sorularının omurgasını pekiştirir.',
    },
    {
      slug: 'meb-10-biyoloji-1-donem-1-yazili',
      title: 'MEB 10. Sınıf Biyoloji Ortak Yazılı Provası (Mitoz & Mayoz Bölünmeler)',
      tier: 'lise2',
      courseKey: 'biyoloji',
      courseName: '10. Sınıf Biyoloji',
      questionCount: 10,
      reason: 'TYT Biyoloji bölünme sorularında sıfır hata garantisi sağlar.',
    },
    {
      slug: 'meb-11-matematik-1-donem-1-yazili',
      title: 'MEB 11. Sınıf İleri Matematik Ortak Yazılı Provası (Trigonometri)',
      tier: 'lise3',
      courseKey: 'matematik',
      courseName: '11. Sınıf İleri Matematik',
      questionCount: 10,
      reason: '11. sınıf okul notunu yüksek tutup OBP\'yi korurken AYT Trigonometri temelini kilitler.',
    },
  ];

  // Pedagojik Özet Metni
  const pedagogicalSummary = `11. Sınıf ${calibration.trackName} alanı öğrencisi olarak mevcut TYT netin ${currentTotalNet}/120 seviyesindedir. 12. sınıfa başlarken hedeflenen ${target12thGradeTytNet} nete ulaşmak için kapatılması gereken fark ${netGap > 0 ? `${netGap} net` : '0 net (hedefin üzerindesin)'}tir. Uygulaman gereken kritik koçluk kuralı: Haftalık ${totalWeeklyHours} saatlik çalışmanın %70'ini (${aytHours} saat) 11. sınıf okul ve AYT konularına, %30'unu (${tytHours} saat) ise 9 ve 10. sınıf Erken TYT tekrarına ayırmalısın. Bu denge hem OBP'ni 90+ seviyesinde tutacak hem de 12. sınıfa girdiğinde seni rakiplerinin en az 20 net önüne geçirecektir.`;

  return {
    track,
    trackName: calibration.trackName,
    currentScores,
    currentTotalNet,
    target12thGradeTytNet,
    netGap,
    netStatusLevel,
    levelTitle,
    timeAllocation: {
      totalWeeklyHours,
      aytHours,
      aytPercentage,
      tytHours,
      tytPercentage,
      targetWeeklyQuestions,
    },
    criticalBottlenecks,
    subjectStrategies,
    priorityFoundationalTopics,
    weeklyPlan,
    recommendedExams,
    pedagogicalSummary,
  };
}
