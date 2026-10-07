import { supabase } from './supabase';

interface QuestionPoolRow {
  id: string;
  question_text: string;
  options: any;
  correct_answer: string;
  solution: string;
  topic: string;
  image_url: string | null;
}

export async function fetchQuestionsFromPool(
  tier: string,
  course: string,
  topic: string,
  count: number
) {
  try {
    const { data, error } = await (supabase as any)
      .from('question_pool')
      .select('*')
      .eq('tier', tier)
      .eq('course', course)
      // .eq('topic', topic) // Eğer spesifik konu istenirse açılabilir, şimdilik dersten çekip karıştıralım veya tam eşleşme yapalım
      .eq('is_approved', true)
      .limit(count * 3); // Fazla çekip rastgele seçeceğiz

    if (error) {
      console.warn('Soru havuzu hatası:', error.message);
      return [];
    }

    if (!data || data.length === 0) return [];

    // Konuya göre filtrele (tam eşleşme veya içeriyorsa)
    let filtered = data as QuestionPoolRow[];
    if (topic && topic !== 'all') {
      filtered = filtered.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()));
    }

    // Karıştır ve sayıyı sınırla
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // AI API'nin döndürdüğü formata çevir
    return selected.map((q) => ({
      id: q.id,
      text: q.question_text,
      options: q.options,
      correctAnswer: q.correct_answer,
      solution: q.solution,
      topic: q.topic,
      imageUrl: q.image_url
    }));
  } catch (err) {
    console.error('fetchQuestionsFromPool try/catch hatası:', err);
    return [];
  }
}
