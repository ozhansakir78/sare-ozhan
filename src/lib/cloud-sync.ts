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
    // 1. Yerel denemeleri al ve buluta aktar
    const localExams = getStoredExams().filter(
      (e) => !e.id?.startsWith('sample-')
    );
    if (localExams.length > 0) {
      const { data: cloudExams } = await supabase
        .from('student_exams')
        .select('id, exam_title, exam_date')
        .eq('user_id', userId);

      const existingExams = cloudExams || [];
      for (const exam of localExams) {
        const exists = existingExams.some(
          (ce) => ce.exam_title === exam.examTitle && ce.exam_date === exam.examDate
        );

        if (!exists) {
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
          } else {
            console.error('Deneme bulut yükleme hatası:', error);
          }
        }
      }
    }

    // 2. Yerel yanlış soruları al ve buluta aktar
    const localQuestions = getStoredQuestions().filter(
      (q) => !q.id?.startsWith('sample-')
    );
    if (localQuestions.length > 0) {
      // Buluttaki mevcut soruları tek bir hafif sorguyla çek
      const { data: cloudQuestions } = await supabase
        .from('wrong_questions')
        .select('id, course_key, topic_name, student_note, created_at')
        .eq('user_id', userId);

      const existingCloudItems = cloudQuestions || [];

      for (const q of localQuestions) {
        // Zaten bulutta var mı kontrol et
        const alreadyInCloud = existingCloudItems.some(
          (cq) =>
            cq.id === q.id ||
            (cq.topic_name === q.topicName &&
              cq.course_key === q.courseKey &&
              cq.student_note === (q.studentNote || null) &&
              Boolean(q.studentNote)) ||
            (cq.topic_name === q.topicName &&
              cq.course_key === q.courseKey &&
              Math.abs(new Date(cq.created_at).getTime() - new Date(q.createdAt).getTime()) < 15000)
        );

        if (!alreadyInCloud) {
          let finalUrl = q.imageUrl || '';

          // Eğer görsel base64 ise ve Storage mevcutsa Supabase Storage'a yüklemeyi dene
          if (finalUrl.startsWith('data:')) {
            try {
              const res = await fetch(finalUrl);
              const blob = await res.blob();
              const filePath = `${userId}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.webp`;
              const { data: upData, error: upErr } = await supabase.storage
                .from('question-images')
                .upload(filePath, blob, { contentType: 'image/webp', upsert: true });

              if (!upErr && upData) {
                const { data: pubData } = supabase.storage.from('question-images').getPublicUrl(filePath);
                if (pubData?.publicUrl) {
                  finalUrl = pubData.publicUrl;
                  q.imageUrl = finalUrl;
                }
              }
            } catch (err) {
              console.warn('Storage upload fallback (base64 saklanıyor):', err);
            }
          }

          const { data: inserted, error: insertError } = await supabase
            .from('wrong_questions')
            .insert({
              user_id: userId,
              course_key: q.courseKey || 'genel',
              course_name: q.courseName || 'Genel',
              topic_name: q.topicName || 'Genel Konu',
              image_url: finalUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
              student_note: q.studentNote || null,
              ai_hint_history: q.aiHintHistory || [],
              is_resolved: q.isResolved || false,
            } as any)
            .select('id')
            .maybeSingle();

          if (insertError) {
            console.error('Supabase wrong_questions yükleme hatası:', insertError);
          } else {
            if (inserted?.id) {
              q.id = inserted.id;
            }
            questionsSynced++;
          }
        }
      }

      // Güncellenmiş görsel URL'leri ve ID'leri yerel depolamaya geri yaz
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('lgs_wrong_questions_v1', JSON.stringify(localQuestions));
        } catch {}
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
    // 1. Buluttaki denemeleri çek
    const { data: cloudExams } = await supabase
      .from('student_exams')
      .select('*')
      .eq('user_id', userId)
      .order('exam_date', { ascending: false });

    if (cloudExams && cloudExams.length > 0) {
      const localExams = getStoredExams();
      let hasNewExams = false;
      for (const ce of cloudExams) {
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
      if (hasNewExams && typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cloud_synced'));
      }
    }

    // 2. Buluttaki yanlış soruları çek (Gerçek öğrenci soruları ASLA filtreyle atılamaz)
    const { data: cloudQuestions } = await supabase
      .from('wrong_questions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (cloudQuestions && cloudQuestions.length > 0) {
      const localQuestions = getStoredQuestions();
      let hasNewQuestions = false;
      for (const cq of cloudQuestions) {
        const exists = localQuestions.some(
          (lq) =>
            lq.id === cq.id ||
            (lq.topicName === (cq as any).topic_name &&
              lq.courseKey === (cq as any).course_key &&
              lq.studentNote === ((cq as any).student_note || undefined) &&
              Boolean(lq.studentNote)) ||
            (lq.topicName === (cq as any).topic_name &&
              lq.courseKey === (cq as any).course_key &&
              Math.abs(new Date(lq.createdAt).getTime() - new Date(cq.created_at).getTime()) < 15000)
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
        window.dispatchEvent(new Event('cloud_synced'));
      }
    }
  } catch (error) {
    console.error('Cloud pull hatası:', error);
  }
}
