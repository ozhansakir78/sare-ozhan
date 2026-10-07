require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Admin yetkisi için
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey || !geminiApiKey) {
  console.error('HATA: .env.local dosyasında gerekli API anahtarları bulunamadı.');
  console.log('Gerekenler: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateQuestions(tier, course, topic, count) {
  console.log(🚀 Soru Fabrikası Başladı:  -  -  ( Soru));
  
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = 
  Sen uzman bir MEB soru yazarısın. 
  Şu bilgilere göre  adet çoktan seçmeli soru üret:
  Kademe: 
  Ders: 
  Konu: 
  
  LÜTFEN ÇIKTIYI SADECE GEÇERLİ BİR JSON DİZİSİ (Array) OLARAK VER. Başka hiçbir açıklama yazma.
  Format şu şekilde olmalı:
  [
    {
      "question_text": "Soru metni buraya",
      "options": {
        "A": "Şık A",
        "B": "Şık B",
        "C": "Şık C",
        "D": "Şık D",
        "E": "Şık E (Sadece lise ise)"
      },
      "correct_answer": "A",
      "solution": "Adım adım çözüm metni",
      "difficulty": "orta"
    }
  ]
  ;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/\\\\\\json/g, '').replace(/\\\\\\/g, '').trim();
    
    const questions = JSON.parse(text);
    console.log(✅ Yapay zeka  soru üretti. Veritabanına kaydediliyor...);

    let savedCount = 0;
    for (const q of questions) {
      const { error } = await supabase.from('question_pool').insert({
        tier: tier,
        course: course,
        topic: topic,
        difficulty: q.difficulty || 'orta',
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        solution: q.solution
      });

      if (error) {
        console.error('❌ Veritabanı hatası:', error.message);
      } else {
        savedCount++;
      }
    }
    
    console.log(🎉 İşlem Tamamlandı! Veritabanına başarıyla eklenen soru sayısı: );
    
  } catch (err) {
    console.error('❌ Yapay zeka veya JSON çeviri hatası:', err.message);
  }
}

// Örnek Kullanım: 
// node scripts/soru-fabrikasi.js lise1 edebiyat "Şiir Bilgisi" 5
const args = process.argv.slice(2);
if (args.length < 4) {
  console.log("Kullanım: node soru-fabrikasi.js <kademe> <ders> <konu> <adet>");
  console.log("Örnek: node soru-fabrikasi.js lise1 matematik \"Mantık ve Önermeler\" 10");
  process.exit(0);
}

generateQuestions(args[0], args[1], args[2], parseInt(args[3]));
