import { LgsCourseKey } from '@/types/exam';
import { recordStreakActivity } from './streak-storage';

export interface DailyQuestQuestion {
  id: string;
  courseKey: LgsCourseKey;
  courseName: string;
  topicName: string;
  questionText: string;
  contextText?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'LGS Efsanesi';
  mebTrapNote: string;
  solutionExplanation: string;
  socraticHint: string;
  nationalSuccessRate: number; // e.g. 68%
}

export interface DailyQuestState {
  date: string;
  isSolved: boolean;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  scoreEarned: number;
}

export const DAILY_QUESTIONS: DailyQuestQuestion[] = [
  {
    id: 'quest-mat-1',
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
    id: 'quest-fen-1',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Mevsimler ve İklim',
    difficulty: 'Orta',
    contextText: 'Dünya\'nın 21 Aralık tarihindeki konumunda, Güney Yarım Küre\'de yer alan Oğlak Dönencesi\'ne Güneş ışınları öğle vakti dik açıyla (90°) düşmektedir.',
    questionText: 'Bu tarihte Güney Yarım Küre\'deki bir şehirde bulunan özdeş bir cismin öğle vaktindeki gölge boyu ve yaşanan gündüz süresi hakkında aşağıdakilerden hangisi doğrudur?',
    options: [
      { key: 'A', text: 'Gölge boyu en uzundur ve en kısa gündüz yaşanır.' },
      { key: 'B', text: 'Gölge boyu sıfırdır (yoktur) ve yılın en uzun gündüzü yaşanır.' },
      { key: 'C', text: 'Gece ve gündüz süresi birbirine eşittir (12 saat).' },
      { key: 'D', text: 'Güneş ışınları eğik açıyla geldiğinden gölge boyu uzundur.' },
    ],
    correctOption: 'B',
    mebTrapNote: '21 Aralık tarihini Türkiye\'deki kış mevsimiyle bağdaştırıp Güney Yarım Küre\'yi de kış zannetmek en yaygın kavram yanılgısıdır.',
    solutionExplanation: '21 Aralık tarihinde Güney Yarım Küre\'de yaz mevsimi başlar. Oğlak Dönencesi\'ne ışınlar dik (90°) geldiği için gölge oluşmaz (sıfırdır) ve en uzun gündüz yaşanır.',
    socraticHint: 'Güneş ışınları tam tepeden (90° dik) geldiğinde ayaklarının altında gölge görebilir misin?',
    nationalSuccessRate: 74,
  },
  {
    id: 'quest-turkce-1',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    topicName: 'Fiilimsiler (Eylemsiler)',
    difficulty: 'Orta',
    contextText: '"Dün akşam okuduğum kitapta geçen tanıdık yüzler, geçmiş günlerin unutulmaz hatıralarını yeniden canlandırdı."',
    questionText: 'Yukarıdaki cümlede yer alan fiilimsilerin türce dağılımı aşağıdakilerin hangisinde doğru verilmiştir?',
    options: [
      { key: 'A', text: '1 İsim-fiil, 2 Sıfat-fiil' },
      { key: 'B', text: '3 Sıfat-fiil, 1 Zarf-fiil' },
      { key: 'C', text: '4 Sıfat-fiil' },
      { key: 'D', text: '2 Sıfat-fiil, 2 İsim-fiil' },
    ],
    correctOption: 'C',
    mebTrapNote: 'Cümledeki "okuduğum (-dık)", "geçen (-en)", "tanıdık (-dık)", "unutulmaz (-maz)" sözcüklerinin hepsi birer ismi niteleyen sıfat-fiildir.',
    solutionExplanation: '1) okuduğ-um kitap (sıfat-fiil), 2) geç-en yüzler (sıfat-fiil), 3) tanı-dık yüzler (sıfat-fiil), 4) unutul-maz hatıralar (sıfat-fiil). Cümlede toplam 4 adet sıfat-fiil bulunmaktadır.',
    socraticHint: '"-an, -ası, -mez, -ar, -dik, -ecek, -miş" eklerini alan sözcükler isimlerin önüne gelerek onları niteliyor mu?',
    nationalSuccessRate: 62,
  },
  {
    id: 'quest-inkilap-1',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Milli Mücadele',
    difficulty: 'Orta',
    contextText: 'Amasya Genelgesi\'nde yer alan: "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." maddesi ilan edilmiştir.',
    questionText: 'Bu madde ile Milli Mücadele\'nin hangi iki temel unsuru ilk kez birlikte açıkça ortaya konulmuştur?',
    options: [
      { key: 'A', text: 'Gerekçesi ve Yöntemi' },
      { key: 'B', text: 'Amacı ve Yöntemi' },
      { key: 'C', text: 'Süresi ve Komutanı' },
      { key: 'D', text: 'Maddi kaynağı ve Dış destekçileri' },
    ],
    correctOption: 'B',
    mebTrapNote: '"Milletin bağımsızlığı" AMAÇ, "milletin azim ve kararı" ise YÖNTEMDİR. "Vatanın bütünlüğü tehlikededir" maddesi ise GEREKÇEDİR.',
    solutionExplanation: '"Milletin bağımsızlığı" kurtarılacak hedefi (AMACI), bunu yapacak olan "milletin azim ve kararı" ise izlenecek yolu (YÖNTEMİ) belirtir.',
    socraticHint: 'Ulaşılmak istenen nihai sonuç nedir (amaç)? Buna hangi yolla ve kimin gücüyle ulaşılacaktır (yöntem)?',
    nationalSuccessRate: 78,
  },
  {
    id: 'quest-mat-2',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Kareköklü İfadeler',
    difficulty: 'Zor',
    contextText: 'Alanı 108 cm² olan kare şeklindeki bir kağıt, kenarlarına paralel olacak şekilde tam ortasından iki eş dikdörtgene kesiliyor.',
    questionText: 'Oluşan dikdörtgenlerden birinin çevre uzunluğu kaç santimetredir?',
    options: [
      { key: 'A', text: '12√3 cm' },
      { key: 'B', text: '18√3 cm' },
      { key: 'C', text: '24√3 cm' },
      { key: 'D', text: '36 cm' },
    ],
    correctOption: 'B',
    mebTrapNote: 'Karenin bir kenarını √108 = 6√3 bulduktan sonra, ortadan kesildiğinde kısa kenarın 3√3 olduğunu gözden kaçırmamak gerekir.',
    solutionExplanation: 'Karenin bir kenarı a = √108 = 6√3 cm. Ortadan kesilince oluşan dikdörtgenin uzun kenarı 6√3 cm, kısa kenarı 3√3 cm olur. Çevre = 2 × (6√3 + 3√3) = 2 × 9√3 = 18√3 cm\'dir.',
    socraticHint: 'Alanı 108 olan bir karenin bir kenarını bulmak için hangi işlemi yaparsın? Bu kenarı tam ortadan bölersen yeni kenarlar ne olur?',
    nationalSuccessRate: 54,
  },
];

const QUEST_STORAGE_KEY = 'lgs_daily_quest_status_v1';

export function getTodayQuestQuestion(): DailyQuestQuestion {
  // Yılın gününe göre deterministik soru seç (Türkiye geneli tüm öğrenciler aynı gün aynı soruyu görür)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const index = dayOfYear % DAILY_QUESTIONS.length;
  return DAILY_QUESTIONS[index];
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDailyQuestState(): DailyQuestState {
  const today = getTodayDateString();
  const defaultState: DailyQuestState = {
    date: today,
    isSolved: false,
    selectedOption: null,
    isCorrect: false,
    scoreEarned: 0,
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(QUEST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyQuestState;
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading daily quest state:', e);
  }

  return defaultState;
}

export function submitDailyQuestAnswer(selectedOption: 'A' | 'B' | 'C' | 'D'): DailyQuestState {
  const question = getTodayQuestQuestion();
  const isCorrect = selectedOption === question.correctOption;
  const scoreEarned = isCorrect ? 50 : 10;
  const today = getTodayDateString();

  const newState: DailyQuestState = {
    date: today,
    isSolved: true,
    selectedOption,
    isCorrect,
    scoreEarned,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(newState));
      recordStreakActivity(1);
      window.dispatchEvent(new CustomEvent('daily_quest_completed', { detail: newState }));
    } catch (e) {
      console.error('Error saving daily quest state:', e);
    }
  }

  return newState;
}
