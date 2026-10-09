const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// .env.local dosyasını manuel yükle
try {
  const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#\s]+)\s*=\s*(.*)$/);
    if (match) {
      let key = match[1].trim();
      let value = match[2].trim().replace(/^['"](.*)['"]$/, '$1'); 
      process.env[key] = value;
    }
  });
} catch (e) {
  console.log("Uyarı: .env.local dosyası okunamadı. Sistem ortam değişkenleri kullanılacak.");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey || !geminiApiKey) {
  console.error('HATA: .env.local dosyasında gerekli API anahtarları bulunamadı.');
  console.log('Gerekenler: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateQuestions(tier, course, topic, count) {
  console.log(`🚀 Soru Fabrikası Başladı: ${tier} - ${course} - ${topic} (${count} Soru)`);
  
  const prompt = `
  Sen uzman bir MEB soru yazarısın. 
  Şu bilgilere göre ${count} adet çoktan seçmeli soru üret:
  Kademe: ${tier}
  Ders: ${course}
  Konu: ${topic}
  
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
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7
        }
      })
    });

    if (!response.ok) {
        throw new Error(`Gemini API Hatası: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    let text = result.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const questions = JSON.parse(text);
    console.log(`✅ Yapay zeka ${questions.length} soru üretti. Veritabanına kaydediliyor...`);

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
    
    console.log(`🎉 İşlem Tamamlandı! Veritabanına başarıyla eklenen soru sayısı: ${savedCount}`);
    
  } catch (err) {
    console.error('❌ Yapay zeka veya JSON çeviri hatası:', err.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log('Kullanım: node soru-fabrikasi.js <kademe> <ders> <konu> <adet>');
  console.log('Örnek: node soru-fabrikasi.js lise1 matematik "Mantık ve Önermeler" 10');
  process.exit(0);
}

generateQuestions(args[0], args[1], args[2], parseInt(args[3]));
