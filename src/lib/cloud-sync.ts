'use client';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStoredExams, saveExamToStorage } from '@/lib/exam-storage';
import { getStoredQuestions, saveQuestionToStorage } from '@/lib/question-storage';
import type { SavedStudentExam } from '@/types/exam';
import type { WrongQuestionItem } from '@/types/question';

export interface SyncResult {
  examsSynced: number;
  questionsSynced: number;
  success: boolean;
  message: string;
}

/**
 * Kullanıcı giriş yaptığında yerel tarayıcıdaki (localStorage) denemeleri ve yanlış soruları
 * Supabase bulut veritabanına aktarır (Local -> Cloud Migration).
 */
export async function syncLocalDataToCloud(userId: string): Promise<SyncResult> {
  if (!isSupabaseConfigured || !userId) {
    return {
      examsSynced: 0,
      questionsSynced: 0,
      success: false,
      message: 'Supabase yapılandırılmamış veya kullanıcı oturumu bulunamadı.',
    };
  }

  let examsSynced = 0;
  let questionsSynced = 0;

  const SAMPLE_TITLES = ['Özdebir Türkiye Geneli LGS-1', 'TÖDER LGS Genel Deneme Sınavı', 'Okul Sonu Değerlendirme Denemesi'];
  const SAMPLE_TOPICS = ['Çarpanlar ve Katlar (EBOB - EKOK)', 'Mevsimler ve İklim', 'Fiilimsiler (Eylemsiler)', 'Üslü İfadeler'];

  try {
    // Varsa kullanıcının veritabanındaki eski mock deneme ve soruları kalıcı temizle
    await supabase.from('student_exams').delete().eq('user_id', userId).in('exam_title', SAMPLE_TITLES);
    await supabase.from('wrong_questions').delete().eq('user_id', userId).in('topic_name', SAMPLE_TOPICS);

    // 1. Yerel denemeleri al ve buluta aktar
    const localExams = getStoredExams().filter(
      (e) => !e.id?.startsWith('sample-') && !SAMPLE_TITLES.includes(e.examTitle)
    );
    for (const exam of localExams) {
      // Bulutta aynı tarih ve isimde kayıt var mı kontrol et
      const { data: existing } = await supabase
        .from('student_exams')
        .select('id')
        .eq('user_id', userId)
        .eq('exam_title', exam.examTitle)
        .eq('exam_date', exam.examDate)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase.from('student_exams').insert({
          user_id: userId,
          exam_title: exam.examTitle,
          exam_date: exam.examDate,
          total_score: exam.totalScore,
          calculated_percentile: exam.calculatedPercentile,
          total_correct: exam.totalCorrect,
          total_incorrect: exam.totalIncorrect,
          total_empty: exam.totalEmpty,
          total_net: exam.totalNet,
          courses_json: exam.courses,
        } as any);

        if (!error) {
          examsSynced++;
        }
      }
    }

    // 2. Yerel yanlış soruları al ve buluta aktar
    const localQuestions = getStoredQuestions();
    for (const q of localQuestions) {
      if (!q.imageUrl || q.imageUrl.trim() === '') continue;
      const { data: existing } = await supabase
        .from('wrong_questions')
        .select('id')
        .eq('user_id', userId)
        .eq('image_url', q.imageUrl)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase.from('wrong_questions').insert({
          user_id: userId,
          course_key: q.courseKey,
          course_name: q.courseName,
          topic_name: q.topicName,
          image_url: q.imageUrl,
          student_note: q.studentNote || null,
          ai_hint_history: q.aiHintHistory || [],
          is_resolved: q.isResolved || false,
        } as any);

        if (!error) {
          questionsSynced++;
        }
      }
    }

    return {
      examsSynced,
      questionsSynced,
      success: true,
      message: `${examsSynced} deneme ve ${questionsSynced} yanlış soru buluta senkronize edildi.`,
    };
  } catch (error) {
    console.error('Cloud Sync Hatası:', error);
    return {
      examsSynced,
      questionsSynced,
      success: false,
      message: 'Bulut eşitleme sırasında bir hata oluştu.',
    };
  }
}

/**
 * Yeni bir cihazdan girildiğinde Supabase bulut veritabanındaki verileri yerel önbelleğe çeker.
 */
export async function pullCloudDataToLocal(userId: string): Promise<void> {
  if (!isSupabaseConfigured || !userId) return;

  try {
    const SAMPLE_TITLES = ['Özdebir Türkiye Geneli LGS-1', 'TÖDER LGS Genel Deneme Sınavı', 'Okul Sonu Değerlendirme Denemesi'];
    const SAMPLE_TOPICS = ['Çarpanlar ve Katlar (EBOB - EKOK)', 'Mevsimler ve İklim', 'Fiilimsiler (Eylemsiler)', 'Üslü İfadeler'];

    // 1. Buluttaki denemeleri çek
    const { data: cloudExams } = await supabase
      .from('student_exams')
      .select('*')
      .eq('user_id', userId)
      .not('exam_title', 'in', `(${SAMPLE_TITLES.map((t) => `"${t}"`).join(',')})`)
      .order('exam_date', { ascending: false });

    if (cloudExams && cloudExams.length > 0) {
      const localExams = getStoredExams();
      let hasNewExams = false;
      for (const ce of cloudExams) {
        if (SAMPLE_TITLES.includes(ce.exam_title)) continue;
        const exists = localExams.some(
          (le) => le.examTitle === ce.exam_title && le.examDate === ce.exam_date
        );
        if (!exists && (ce as any).courses_json) {
          saveExamToStorage(
            ce.exam_title,
            ce.exam_date,
            {
              totalNet: Number(ce.total_net || 0),
              score: Number(ce.total_score || 0),
              percentile: Number(ce.calculated_percentile || 0),
              totalCorrect: ce.total_correct || 0,
              totalIncorrect: ce.total_incorrect || 0,
              totalEmpty: ce.total_empty || 0,
              totalWeightedPoints: Math.max(0, Number(ce.total_score || 0) - 100),
              courses: (ce.courses_json as any) || {},
              highestLossCourse: null,
            },
            userId
          );
          hasNewExams = true;
        }
      }
    }

    // 2. Buluttaki yanlış soruları çek
    const { data: cloudQuestions } = await supabase
      .from('wrong_questions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (cloudQuestions && cloudQuestions.length > 0) {
      const localQuestions = getStoredQuestions();
      let hasNewQuestions = false;
      for (const cq of cloudQuestions) {
        if (SAMPLE_TOPICS.includes((cq as any).topic_name)) continue;
        const exists = localQuestions.some(
          (lq) => lq.id === cq.id || (lq.imageUrl && lq.imageUrl === cq.image_url)
        );
        if (!exists) {
          localQuestions.unshift({
            id: cq.id,
            courseKey: (cq as any).course_key || 'matematik',
            courseName: (cq as any).course_name || 'Matematik',
            topicName: (cq as any).topic_name || 'Genel Konu',
            imageUrl: cq.image_url,
            studentNote: (cq as any).student_note || '',
            status: cq.is_resolved ? 'resolved' : 'unresolved',
            isResolved: cq.is_resolved,
            aiHintHistory: Array.isArray(cq.ai_hint_history) ? (cq.ai_hint_history as any) : [],
            createdAt: cq.created_at,
          });
          hasNewQuestions = true;
        }
      }
      if (hasNewQuestions && typeof window !== 'undefined') {
        localStorage.setItem('lgs_wrong_questions_v1', JSON.stringify(localQuestions));
      }
    }
  } catch (error) {
    console.error('Cloud pull hatası:', error);
  }
}
