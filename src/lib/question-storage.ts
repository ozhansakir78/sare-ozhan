import type { WrongQuestionItem, QuestionStatus, QuestionStats, ErrorReason } from '@/types/question';
import { recordStreakActivity } from './streak-storage';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'lgs_wrong_questions_v1';

// Başlangıçta boş kalmaması için örnek eğitici sorular
const SAMPLE_QUESTIONS: WrongQuestionItem[] = [
  {
    id: 'sample-math-1',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Çarpanlar ve Katlar (EBOB - EKOK)',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60',
    studentNote: 'Kenar uzunlukları 24 cm ve 36 cm olan kartonların en az sayıda eş kareye bölünmesi sorusunda EBOB ile EKOK arasında kararsız kaldım.',
    status: 'unresolved',
    errorReason: 'carelessness',
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    aiHintHistory: [],
  },
  {
    id: 'sample-fen-1',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Mevsimler ve İklim',
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop&q=60',
    studentNote: '21 Haziran tarihinde Güney Yarım Küre\'de gölge boyunun değişimi grafiğinde B ve C şıkları arasında kaldım.',
    status: 'hinted',
    errorReason: 'knowledge_gap',
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    aiHintHistory: [
      {
        id: 'h1',
        step: 1,
        prompt: '21 Haziran\'da Güney Yarım Küre\'de hangi mevsim başlar?',
        hint: 'Güneş ışınlarının Yengeç Dönencesi\'ne dik geldiği bu tarihte, Güney Yarım Küre ışınları en eğik açıyla alır.',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      },
    ],
  },
  {
    id: 'sample-turkce-1',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    topicName: 'Fiilimsiler (Eylemsiler)',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60',
    studentNote: 'Sıfat-fiil eki olan -miş ile duyulan geçmiş zaman kip eki arasındaki farkı çözdüm.',
    status: 'resolved',
    errorReason: 'carelessness',
    isResolved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    aiHintHistory: [],
  },
  {
    id: 'sample-math-2',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Üslü İfadeler',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60',
    studentNote: 'Negatif üs alırken sayıyı ters çevirmeyi unuttum, işaret hatası yaptım.',
    status: 'unresolved',
    errorReason: 'calculation_error',
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    aiHintHistory: [],
  },
];

export function getStoredQuestions(): WrongQuestionItem[] {
  if (typeof window === 'undefined') return SAMPLE_QUESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_QUESTIONS));
      return SAMPLE_QUESTIONS;
    }
    return JSON.parse(raw) as WrongQuestionItem[];
  } catch {
    return SAMPLE_QUESTIONS;
  }
}

export function saveQuestionToStorage(
  question: Omit<WrongQuestionItem, 'id' | 'createdAt'>,
  userId?: string
): WrongQuestionItem {
  const current = getStoredQuestions();
  const newItem: WrongQuestionItem = {
    ...question,
    id: 'wq_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      recordStreakActivity(1);
    } catch (e) {
      console.error('LocalStorage kaydetme hatası:', e);
    }
  }

  // Supabase bağlıysa bulut veritabanına da eşitle
  if (isSupabaseConfigured && userId) {
    supabase
      .from('wrong_questions')
      .insert({
        user_id: userId,
        course_key: newItem.courseKey,
        course_name: newItem.courseName,
        topic_name: newItem.topicName,
        image_url: newItem.imageUrl,
        student_note: newItem.studentNote || null,
        ai_hint_history: newItem.aiHintHistory || [],
        is_resolved: newItem.isResolved,
      })
      .then(({ error }) => {
        if (error) {
          console.warn('Supabase wrong_questions senkronizasyon uyarısı:', error);
        }
      });
  }

  return newItem;
}

export function updateStoredQuestionStatus(
  id: string,
  newStatus: QuestionStatus
): WrongQuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: newStatus,
        isResolved: newStatus === 'resolved',
      };
    }
    return item;
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (newStatus === 'resolved') {
        recordStreakActivity(1);
      }
    } catch (e) {
      console.error('LocalStorage güncelleme hatası:', e);
    }
  }
  return updated;
}

export function deleteStoredQuestion(id: string): WrongQuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.filter((item) => item.id !== id);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage silme hatası:', e);
    }
  }
  return updated;
}

export function calculateQuestionStats(questions: readonly WrongQuestionItem[]): QuestionStats {
  const total = questions.length;
  let unresolved = 0;
  let hinted = 0;
  let resolved = 0;

  for (const q of questions) {
    if (q.status === 'resolved' || q.isResolved) {
      resolved++;
    } else if (q.status === 'hinted') {
      hinted++;
    } else {
      unresolved++;
    }
  }

  return { total, unresolved, hinted, resolved };
}

export function updateQuestionErrorReason(
  id: string,
  errorReason: ErrorReason
): WrongQuestionItem[] {
  const current = getStoredQuestions();
  const updated = current.map((item) => {
    if (item.id === id) {
      return { ...item, errorReason };
    }
    return item;
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('questions_updated'));
    } catch (e) {
      console.error('LocalStorage hata nedeni güncelleme hatası:', e);
    }
  }
  return updated;
}

export interface ErrorDiagnosisResult {
  totalWithReason: number;
  totalQuestions: number;
  carelessnessCount: number;
  carelessnessPercent: number;
  knowledgeGapCount: number;
  knowledgeGapPercent: number;
  calculationErrorCount: number;
  calculationErrorPercent: number;
  timePressureCount: number;
  timePressurePercent: number;
  dominantReason: ErrorReason | null;
  aiDiagnosis: string;
}

export function getErrorDiagnosis(questions: readonly WrongQuestionItem[]): ErrorDiagnosisResult {
  const totalQuestions = questions.length;
  let carelessnessCount = 0;
  let knowledgeGapCount = 0;
  let calculationErrorCount = 0;
  let timePressureCount = 0;

  for (const q of questions) {
    if (q.errorReason === 'carelessness') carelessnessCount++;
    else if (q.errorReason === 'knowledge_gap') knowledgeGapCount++;
    else if (q.errorReason === 'calculation_error') calculationErrorCount++;
    else if (q.errorReason === 'time_pressure') timePressureCount++;
  }

  const totalWithReason = carelessnessCount + knowledgeGapCount + calculationErrorCount + timePressureCount;
  const denominator = totalWithReason > 0 ? totalWithReason : 1;

  const carelessnessPercent = Math.round((carelessnessCount / denominator) * 100);
  const knowledgeGapPercent = Math.round((knowledgeGapCount / denominator) * 100);
  const calculationErrorPercent = Math.round((calculationErrorCount / denominator) * 100);
  const timePressurePercent = Math.round((timePressureCount / denominator) * 100);

  let dominantReason: ErrorReason | null = null;
  const maxCount = Math.max(carelessnessCount, knowledgeGapCount, calculationErrorCount, timePressureCount);

  if (maxCount > 0) {
    if (maxCount === carelessnessCount) dominantReason = 'carelessness';
    else if (maxCount === calculationErrorCount) dominantReason = 'calculation_error';
    else if (maxCount === knowledgeGapCount) dominantReason = 'knowledge_gap';
    else if (maxCount === timePressureCount) dominantReason = 'time_pressure';
  }

  let aiDiagnosis = '';
  if (totalWithReason === 0) {
    aiDiagnosis = 'Yanlış yaptığın sorulara "Neden Yanlış Yaptın?" etiketini ekle; yapay zeka hatanın kök nedenini analiz etsin.';
  } else if (dominantReason === 'carelessness') {
    aiDiagnosis = `Harika haber: Konuları aslında biliyorsun! Hatalarının %${carelessnessPercent}'i "Dikkatsizlik" kaynaklı. Soru köklerindeki "değildir / ulaşılamaz" kelimelerinin altını çizerek netlerini hemen +3-4 artırabilirsin.`;
  } else if (dominantReason === 'calculation_error') {
    aiDiagnosis = `Mantığı doğru kuruyorsun ama son basamakta kayıyorsun! Yanlışlarının %${calculationErrorPercent}'i "İşlem Hatası". Soruları çözerken karalama alanını daha düzenli kullanarak bu netleri anında kurtarabilirsin.`;
  } else if (dominantReason === 'knowledge_gap') {
    aiDiagnosis = `Yanlışlarının %${knowledgeGapPercent}'i "Bilgi Eksiği" kaynaklı. Konu kartlarına ve Sokratik AI ipuçlarına odaklanarak temel kavramları oturtmalısın.`;
  } else if (dominantReason === 'time_pressure') {
    aiDiagnosis = `Yanlışlarının %${timePressurePercent}'i süre kısıtından kaynaklanıyor. Turlama tekniği uygulayarak zor sorularla inatlaşmayı bırakmalısın.`;
  }

  return {
    totalWithReason,
    totalQuestions,
    carelessnessCount,
    carelessnessPercent,
    knowledgeGapCount,
    knowledgeGapPercent,
    calculationErrorCount,
    calculationErrorPercent,
    timePressureCount,
    timePressurePercent,
    dominantReason,
    aiDiagnosis,
  };
}
