import { GradeTier } from '@/types/grade-tier';
import { recordStreakActivity } from './streak-storage';

export type QuestOptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface DailyQuestQuestion {
  id: string;
  tier: GradeTier;
  courseKey: string;
  courseName: string;
  topicName: string;
  questionText: string;
  contextText?: string;
  options: {
    key: QuestOptionKey;
    text: string;
  }[];
  correctOption: QuestOptionKey;
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'LGS Efsanesi' | 'MEB Yazılı' | 'ÖSYM Düzeyi';
  mebTrapNote: string;
  solutionExplanation: string;
  socraticHint: string;
  nationalSuccessRate: number; // e.g. 48%
}

export interface DailyQuestState {
  date: string;
  tier: GradeTier;
  isSolved: boolean;
  selectedOption: QuestOptionKey | null;
  isCorrect: boolean;
  scoreEarned: number;
}

export const DAILY_QUESTIONS: DailyQuestQuestion[] = [
  // ==========================================================================
  // 8. SINIF LGS SORULARI
  // ==========================================================================
  {
    id: 'quest-lgs-mat-1',
    tier: 'lgs',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Çarpanlar ve Katlar',
    difficulty: 'Zor',
    contextText: 'Bir marangoz elindeki 180 cm ve 216 cm uzunluğundaki iki farklı ahşap çıtayı hiç parça artmayacak şekilde eşit uzunlukta en büyük parçalara bölmek istiyor.',
    questionText: 'Her bir kesim işlemi 30 saniye sürdüğüne göre, marangozun tüm çıtaları parçalama işlemi toplam kaç saniye sürer?',
    options: [
      { key: 'A', text: '270 saniye' },
      { key: 'B', text: '300 saniye' },
      { key: 'C', text: '330 saniye' },
      { key: 'D', text: '360 saniye' },
    ],
    correctOption: 'A',
    mebTrapNote: 'En klasik MEB tuzağı: Parça sayısı ile kesim sayısı karıştırılır! n parça elde etmek için (n - 1) defa kesim yapılır.',
    solutionExplanation: 'EBOB(180, 216) = 36 cm (Her parçanın boyu). 180 / 36 = 5 parça için (5 - 1) = 4 kesim. 216 / 36 = 6 parça için (6 - 1) = 5 kesim. Toplam kesim: 4 + 5 = 9 kesim. Süre = 9 × 30 = 270 saniyedir.',
    socraticHint: 'Bir ipi 5 eşit parçaya bölmek için makasla kaç kere kesersin? Parça sayısı mı yoksa kesim sayısı mı önemlidir?',
    nationalSuccessRate: 48,
  },
  {
    id: 'quest-lgs-fen-1',
    tier: 'lgs',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Mevsimler ve İklim',
    difficulty: 'Orta',
    contextText: 'Dünya\'nın 21 Aralık tarihindeki konumunda, Güney Yarım Küre\'de yer alan Oğlak Dönencesi\'ne Güneş ışınları öğle vakti dik açıyla (90°) düşmektedir.',
    questionText: 'Bu tarihte Güney Yarım Küre\'deki bir şehirde bulunan özdeş bir cismin öğle vaktindeki gölge boyu ve yaşanan gündüz süresi hakkında aşağıdakilerden hangisi doğrudur?',
    options: [
      { key: 'A', text: 'Gölge boyu sıfırdır, en uzun gece yaşanır.' },
      { key: 'B', text: 'Gölge boyu sıfırdır, en uzun gündüz yaşanır.' },
      { key: 'C', text: 'Gölge boyu en uzundur, 12 saat gündüz yaşanır.' },
      { key: 'D', text: 'Gölge boyu cismin boyuna eşittir, en kısa gündüz yaşanır.' },
    ],
    correctOption: 'B',
    mebTrapNote: 'Işınların dik düştüğü yerde gölge boyu sıfır olur; 21 Aralık Güney Yarım Küre için yaz başlangıcıdır ve en uzun gündüz yaşanır.',
    solutionExplanation: '21 Aralık\'ta Güneş ışınları Oğlak Dönencesi\'ne 90° dik açıyla düşer. Bu nedenle öğle vakti gölge boyu 0 olur. Güney Yarım Küre için yaz başlangıcı olduğundan yılın en uzun gündüzü yaşanır.',
    socraticHint: 'Öğle vakti el fenerini tam tepeden (90 derece) bir kaleme tutarsan masadaki gölgesi nasıl olur? Yaz mevsiminde gündüzler mi uzundur geceler mi?',
    nationalSuccessRate: 62,
  },
  {
    id: 'quest-lgs-turk-1',
    tier: 'lgs',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    topicName: 'Fiilimsiler',
    difficulty: 'Zor',
    contextText: '"Ağaran şafağın sessizliğinde, yürüyen adamın adımları soğuk taşlarda yankılanıyordu."',
    questionText: 'Bu cümledeki fiilimsilerin türleri sırasıyla aşağıdakilerden hangisinde doğru verilmiştir?',
    options: [
      { key: 'A', text: 'Sıfat-fiil, Sıfat-fiil, İsim-fiil' },
      { key: 'B', text: 'Sıfat-fiil, Sıfat-fiil' },
      { key: 'C', text: 'Zarf-fiil, Sıfat-fiil, Çekimli Fiil' },
      { key: 'D', text: 'İsim-fiil, Zarf-fiil' },
    ],
    correctOption: 'B',
    mebTrapNote: '"Yankılanıyordu" sözcüğü yüklemdir (çekimli fiildir), fiilimsi değildir. "Ağaran" (-an) ve "yürüyen" (-en) iki adet sıfat-fiil vardır.',
    solutionExplanation: '"Ağar-an" sıfat-fiildir (şafak ismini niteler). "Yürü-yen" sıfat-fiildir (adam ismini niteler). "Yankılanıyordu" ise şimdiki zamanın hikayesiyle çekimlenmiş yüklemdir. Dolayısıyla cümlede 2 adet sıfat-fiil bulunmaktadır.',
    socraticHint: 'Cümlenin asıl işi, yüklemi hangisidir? Yüklem fiilimsi sayılır mı?',
    nationalSuccessRate: 41,
  },

  // ==========================================================================
  // 9. SINIF (LİSE 1) MEB ORTAK YAZILI SORULARI
  // ==========================================================================
  {
    id: 'quest-lise1-mat-1',
    tier: 'lise1',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: 'Kümeler ve İşlemler',
    difficulty: 'MEB Yazılı',
    contextText: 'A ve B iki küme olmak üzere s(A \\ B) = 3x - 1, s(B \\ A) = 2x + 4 ve s(A ∩ B) = x + 2 olarak verilmiştir.',
    questionText: 's(A ∪ B) = 35 olduğuna göre, s(A) kümesinin eleman sayısı kaçtır?',
    options: [
      { key: 'A', text: '17' },
      { key: 'B', text: '21' },
      { key: 'C', text: '23' },
      { key: 'D', text: '25' },
      { key: 'E', text: '27' },
    ],
    correctOption: 'B',
    mebTrapNote: 'MEB 1. Yazılı Klasiği: s(A ∪ B) = s(A \\ B) + s(B \\ A) + s(A ∩ B) toplamından x bulunur. Ancak soru s(A) = s(A \\ B) + s(A ∩ B) kümesini sorar!',
    solutionExplanation: '(3x - 1) + (2x + 4) + (x + 2) = 6x + 5 = 35 => 6x = 30 => x = 5. s(A) = s(A \\ B) + s(A ∩ B) = (3×5 - 1) + (5 + 2) = 14 + 7 = 21 elemandır.',
    socraticHint: 'Birleşim kümesi ayrık üç bölgenin toplamıdır: yalnız A, yalnız B ve kesişim. Bu üçünü toplayıp 35\'e eşitlediğinde x kaç çıkar?',
    nationalSuccessRate: 52,
  },
  {
    id: 'quest-lise1-fiz-1',
    tier: 'lise1',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: 'Madde ve Özkütle',
    difficulty: 'MEB Yazılı',
    contextText: 'Kütlesi 160 g olan boş bir taşırma kabı özkütlesi 0.8 g/cm³ olan sıvı ile tamamen doldurulduğunda toplam kütle 400 g gelmektedir.',
    questionText: 'Bu kaba sıvıda tamamen batan katı bir bilye atıldığında kaptan 40 g sıvı taştığına ve kapta 110 g kütle artışı olduğuna göre, bilyenin özkütlesi kaç g/cm³ tür?',
    options: [
      { key: 'A', text: '2.5' },
      { key: 'B', text: '3.0' },
      { key: 'C', text: '3.5' },
      { key: 'D', text: '4.0' },
      { key: 'E', text: '4.5' },
    ],
    correctOption: 'B',
    mebTrapNote: 'Taşan sıvının kütlesi ile hacmini karıştırmayın! V_bilye = m_taşan / d_sıvı formülüyle bulunur. Kaptaki kütle artışı = m_bilye - m_taşan dır.',
    solutionExplanation: 'Taşan hacim: V = 40 / 0.8 = 50 cm³. Kaptaki ağırlaşma: Δm = m_bilye - m_taşan => 110 = m_bilye - 40 => m_bilye = 150 g. Özkütle d = m / V = 150 / 50 = 3.0 g/cm³ bulunur.',
    socraticHint: 'Kaba giren kütleden çıkan kütleyi çıkarırsan ağırlaşma kalır. Çıkan sıvının hacmini özkütlesinden nasıl bulursun?',
    nationalSuccessRate: 45,
  },

  // ==========================================================================
  // 10. SINIF (LİSE 2) MEB ORTAK YAZILI SORULARI
  // ==========================================================================
  {
    id: 'quest-lise2-mat-1',
    tier: 'lise2',
    courseKey: 'matematik',
    courseName: 'Matematik (10. Sınıf)',
    topicName: 'Sayma ve Olasılık',
    difficulty: 'MEB Yazılı',
    contextText: 'A = {0, 1, 2, 3, 4, 5} kümesinin elemanları kullanılarak rakamları farklı 3 basamaklı doğal sayılar yazılacaktır.',
    questionText: 'Bu sayılardan kaç tanesi 5 ile tam bölünebilir?',
    options: [
      { key: 'A', text: '28' },
      { key: 'B', text: '32' },
      { key: 'C', text: '36' },
      { key: 'D', text: '40' },
      { key: 'E', text: '44' },
    ],
    correctOption: 'C',
    mebTrapNote: '0 birler basamağına geldiğinde başa 0 gelememe kısıtı kendiliğinden kalkar; ancak 5 birler basamağına geldiğinde başa 0 gelemeyeceği için durumlar ayrı incelenmelidir!',
    solutionExplanation: '1. Durum (Son basamak 0): Birler 1, Yüzler {1..5} 5 ihtimal, Onlar kalan 4 ihtimal => 5 × 4 × 1 = 20 sayı. 2. Durum (Son basamak 5): Birler 1, Yüzler {1,2,3,4} 4 ihtimal (0 olamaz), Onlar {0 ve kalan 3 rakam} 4 ihtimal => 4 × 4 × 1 = 16 sayı. Toplam = 20 + 16 = 36 sayı.',
    socraticHint: 'Bir sayının 5\'e bölünmesi için son rakamı ne olmalıdır? 0\'ın yüzler basamağına gelememe engelini nasıl çözersin?',
    nationalSuccessRate: 46,
  },
  {
    id: 'quest-lise2-fiz-1',
    tier: 'lise2',
    courseKey: 'fizik',
    courseName: 'Fizik (10. Sınıf)',
    topicName: 'Elektrik ve Manyetizma',
    difficulty: 'MEB Yazılı',
    contextText: 'Özdeş dirençlerle kurulan devrede, ana koldaki akım şiddeti dirençler seri bağlıyken I_1, aynı dirençler paralel bağlıyken I_2 olarak ölçülmektedir.',
    questionText: 'İç direnci önemsiz aynı üretece bağlı 3 özdeş direnç için I_2 / I_1 oranı kaçtır?',
    options: [
      { key: 'A', text: '3' },
      { key: 'B', text: '6' },
      { key: 'C', text: '9' },
      { key: 'D', text: '12' },
      { key: 'E', text: '1/9' },
    ],
    correctOption: 'C',
    mebTrapNote: 'Seri bağlamada eşdeğer direnç 3R olurken paralel bağlamada R/3 olur. Akım dirençle ters orantılıdır!',
    solutionExplanation: 'R_seri = 3R => I_1 = V / (3R). R_paralel = R/3 => I_2 = V / (R/3) = 3V/R. Oran I_2 / I_1 = (3V/R) / (V/3R) = 9 bulunur.',
    socraticHint: 'Ohm Yasası V = I × R formülünde V sabitken R azaldıkça akım nasıl değişir?',
    nationalSuccessRate: 50,
  },

  // ==========================================================================
  // 11. SINIF (LİSE 3) ALAN SORULARI
  // ==========================================================================
  {
    id: 'quest-lise3-mat-1',
    tier: 'lise3',
    courseKey: 'matematik',
    courseName: 'İleri Matematik (11. Sınıf)',
    topicName: 'Trigonometri',
    difficulty: 'MEB Yazılı',
    contextText: 'x ∈ (π, 3π/2) olmak üzere tan(x) = 3/4 olarak verilmektedir.',
    questionText: 'Buna göre sin(x) + cos(x) toplamının değeri kaçtır?',
    options: [
      { key: 'A', text: '-7/5' },
      { key: 'B', text: '-1/5' },
      { key: 'C', text: '1/5' },
      { key: 'D', text: '7/5' },
      { key: 'E', text: '-6/5' },
    ],
    correctOption: 'A',
    mebTrapNote: 'x açısı 3. bölgededir! 3. bölgede tanjant pozitif (+) iken hem sinüs hem de kosinüs negatiftir (-). İşaret kontrolü şarttır.',
    solutionExplanation: 'Dik üçgen çizildiğinde karşı=3, komşu=4, hipotenüs=5 tir. x açısı 3. bölgede (π < x < 3π/2) olduğundan: sin(x) = -3/5 ve cos(x) = -4/5 tir. Toplam = (-3/5) + (-4/5) = -7/5 olur.',
    socraticHint: 'Birim çemberde 3. bölgede x ve y koordinatlarının işaretleri nasıldır?',
    nationalSuccessRate: 44,
  },

  // ==========================================================================
  // 12. SINIF & YKS (TYT / AYT) MEYDAN OKUMALARI
  // ==========================================================================
  {
    id: 'quest-yks-mat-1',
    tier: 'yks',
    courseKey: 'tyt-matematik',
    courseName: 'TYT Temel Matematik',
    topicName: 'Problemler',
    difficulty: 'ÖSYM Düzeyi',
    contextText: 'Bir kargo firmasında paketler ağırlıklarına göre ücretlendirilmektedir. İlk 2 kg için sabit 60 TL, 2 kg\'ı aşan her gram için gram başına 0.04 TL ek ücret alınmaktadır.',
    questionText: 'Bu firmaya 4.5 kg ağırlığında bir koli teslim eden bir müşteri toplam kaç TL ödeme yapar?',
    options: [
      { key: 'A', text: '120 TL' },
      { key: 'B', text: '140 TL' },
      { key: 'C', text: '160 TL' },
      { key: 'D', text: '180 TL' },
      { key: 'E', text: '200 TL' },
    ],
    correctOption: 'C',
    mebTrapNote: 'ÖSYM birim çevirme tuzağı: 4.5 kg - 2 kg = 2.5 kg = 2500 gramdır! Gram başına 0.04 TL ile 2.5 kg doğrudan çarpılmamalıdır.',
    solutionExplanation: 'Aşan ağırlık = 4.5 - 2 = 2.5 kg = 2500 gram. Ek ücret = 2500 × 0.04 = 100 TL. Toplam ücret = Sabit 60 TL + 100 TL = 160 TL.',
    socraticHint: 'Kilonun gram karşılığı nedir? 1 kg kaç gram eder?',
    nationalSuccessRate: 58,
  },
  {
    id: 'quest-yks-ayt-1',
    tier: 'yks',
    courseKey: 'ayt-matematik',
    courseName: 'AYT Matematik',
    topicName: 'Türev ve Uygulamaları',
    difficulty: 'ÖSYM Düzeyi',
    contextText: 'f(x) = x³ - 3x² + k fonksiyonunun yerel minimum değeri 4 olarak verilmiştir.',
    questionText: 'Buna göre k gerçel sayısı kaçtır?',
    options: [
      { key: 'A', text: '4' },
      { key: 'B', text: '6' },
      { key: 'C', text: '8' },
      { key: 'D', text: '10' },
      { key: 'E', text: '12' },
    ],
    correctOption: 'C',
    mebTrapNote: 'Yerel ekstremum noktasını bulmak için birinci türevi sıfırlanır: f\'(x) = 0. Türevin köklerinden hangisinin minimum olduğunu işaret tablosuyla belirleyin!',
    solutionExplanation: 'f\'(x) = 3x² - 6x = 3x(x - 2) = 0 => x = 0 ve x = 2. İşaret tablosunda: + | - | +, dolayısıyla x = 2 noktası yerel minimumdur. f(2) = 4 => 2³ - 3(2)² + k = 4 => 8 - 12 + k = 4 => -4 + k = 4 => k = 8.',
    socraticHint: 'Türevin köklerinden hangisi yerel minimum noktasını verir? O kökü fonksiyonda yerine koyduğunda sonuç kaça eşit olmalıdır?',
    nationalSuccessRate: 39,
  },
];

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getTodayQuestQuestion(tier: GradeTier = 'lgs'): DailyQuestQuestion {
  const tierQuestions = DAILY_QUESTIONS.filter((q) => q.tier === tier);
  const questionsToUse = tierQuestions.length > 0 ? tierQuestions : DAILY_QUESTIONS;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const index = dayOfYear % questionsToUse.length;
  return questionsToUse[index];
}

function getQuestStorageKey(tier: GradeTier, date: string): string {
  return `lgs_daily_quest_${tier}_${date}_v2`;
}

export function getDailyQuestState(tier: GradeTier = 'lgs'): DailyQuestState {
  const today = getTodayDateString();
  const defaultState: DailyQuestState = {
    date: today,
    tier,
    isSolved: false,
    selectedOption: null,
    isCorrect: false,
    scoreEarned: 0,
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(getQuestStorageKey(tier, today));
    if (raw) {
      const parsed = JSON.parse(raw) as DailyQuestState;
      if (parsed.date === today && parsed.tier === tier) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading daily quest state:', e);
  }

  return defaultState;
}

export function submitDailyQuestAnswer(
  selectedOption: QuestOptionKey,
  tier: GradeTier = 'lgs'
): DailyQuestState {
  const question = getTodayQuestQuestion(tier);
  const isCorrect = selectedOption === question.correctOption;
  const scoreEarned = isCorrect ? 50 : 10;
  const today = getTodayDateString();

  const newState: DailyQuestState = {
    date: today,
    tier,
    isSolved: true,
    selectedOption,
    isCorrect,
    scoreEarned,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(getQuestStorageKey(tier, today), JSON.stringify(newState));
      recordStreakActivity(1);
      window.dispatchEvent(new CustomEvent('daily_quest_completed', { detail: newState }));
    } catch (e) {
      console.error('Error saving daily quest state:', e);
    }
  }

  return newState;
}
