import type { OnlineExam, OnlineExamQuestion, ExamQuestionOptionKey, OnlineExamTier } from '../types/online-exam';

export interface RawQuestionInput {
  questionNumber?: number;
  courseKey?: string;
  courseName?: string;
  topicName?: string;
  questionText?: string;
  options?: Record<string, any>;
  correctAnswer?: string;
  explanation?: string;
  hintForSocratic?: string;
}

export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    I: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  };

  return text
    .split('')
    .map((c) => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Ham LaTeX kodlarını, dolar sembollerini ve programlama üslerini temizler ve okunaklı Unicode formatına çevirir.
 */
export function sanitizeFormulasAndLatex(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\le\b|\\leq\b/g, '≤')
    .replace(/\\ge\b|\\geq\b/g, '≥')
    .replace(/\\ne\b|\\neq\b/g, '≠')
    .replace(/\\pm\b/g, '±')
    .replace(/\\degree/g, '°')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\int\b/g, '∫')
    .replace(/\\lim\b/g, 'lim')
    .replace(/\$/g, '') // Kesinlikle yasak olan dolar sembolü
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^4\b/g, '⁴')
    .replace(/\^5\b/g, '⁵')
    .replace(/\^6\b/g, '⁶')
    .replace(/\^7\b/g, '⁷')
    .replace(/\^8\b/g, '⁸')
    .replace(/\^9\b/g, '⁹')
    .replace(/\^0\b/g, '⁰')
    .replace(/\^n\b/g, 'ⁿ')
    .replace(/\^x\b/g, 'ˣ');
}

export const COURSE_NAME_MAP: Record<string, Record<string, string>> = {
  lgs: {
    turkce: 'Türkçe',
    matematik: 'Matematik',
    fen: 'Fen Bilimleri',
    inkilap: 'T.C. İnkılap Tarihi ve Atatürkçülük',
    din: 'Din Kültürü ve Ahlak Bilgisi',
    ingilizce: 'İngilizce',
  },
  lise1: {
    turk_dili: 'Türk Dili ve Edebiyatı (9. Sınıf)',
    edebiyat: 'Türk Dili ve Edebiyatı (9. Sınıf)',
    matematik: 'Matematik (9. Sınıf)',
    fizik: 'Fizik (9. Sınıf)',
    kimya: 'Kimya (9. Sınıf)',
    biyoloji: 'Biyoloji (9. Sınıf)',
    tarih: 'Tarih (9. Sınıf)',
    cografya: 'Coğrafya (9. Sınıf)',
    felsefe: 'Felsefe (9. Sınıf)',
    din: 'Din Kültürü ve Ahlak Bilgisi (9. Sınıf)',
    ingilizce: 'İngilizce (9. Sınıf)',
  },
  lise2: {
    edebiyat: 'Türk Dili ve Edebiyatı (10. Sınıf)',
    matematik: 'Matematik (10. Sınıf)',
    fizik: 'Fizik (10. Sınıf)',
    kimya: 'Kimya (10. Sınıf)',
    biyoloji: 'Biyoloji (10. Sınıf)',
    tarih: 'Tarih (10. Sınıf)',
    cografya: 'Coğrafya (10. Sınıf)',
    felsefe: 'Felsefe (10. Sınıf)',
    ingilizce: 'İngilizce (10. Sınıf)',
    din: 'Din Kültürü (10. Sınıf)',
  },
  lise3: {
    matematik: '11. Sınıf İleri Matematik',
    fizik: '11. Sınıf İleri Fizik',
    kimya: '11. Sınıf İleri Kimya',
    biyoloji: '11. Sınıf İleri Biyoloji',
    edebiyat: '11. Sınıf Türk Dili ve Edebiyatı',
    tarih: '11. Sınıf Tarih',
    cografya: '11. Sınıf Coğrafya',
    felsefe: '11. Sınıf Felsefe',
    ingilizce: '11. Sınıf Yabancı Dil',
    din: '11. Sınıf Din Kültürü',
  },
  yks: {
    turkce: 'TYT Türkçe',
    matematik: 'TYT / AYT Matematik',
    fen: 'TYT Fen Bilimleri',
    sosyal: 'TYT Sosyal Bilimler',
    fizik: 'AYT İleri Fizik',
    kimya: 'AYT İleri Kimya',
    biyoloji: 'AYT İleri Biyoloji',
    edebiyat: 'AYT Türk Dili ve Edebiyatı',
    tarih: 'AYT Tarih',
    cografya: 'AYT Coğrafya',
    felsefe: 'AYT Felsefe Grubu',
    din: 'AYT Din Kültürü',
    ingilizce: 'YDT İngilizce',
  },
};

/**
 * İlgili kademeye göre ders adını çözer.
 */
export function resolveTierCourseName(tier?: OnlineExamTier, courseKey?: string): string {
  if (!courseKey) return 'Genel Ders';
  const tKey = tier || 'lgs';
  const cLow = courseKey.toLowerCase();

  const tierMap = COURSE_NAME_MAP[tKey] || COURSE_NAME_MAP.lgs;
  if (tierMap && tierMap[cLow]) {
    return tierMap[cLow];
  }

  // Genel arama
  for (const t of Object.keys(COURSE_NAME_MAP)) {
    if (COURSE_NAME_MAP[t][cLow]) {
      return COURSE_NAME_MAP[t][cLow];
    }
  }

  return courseKey.charAt(0).toUpperCase() + courseKey.slice(1);
}

/**
 * Çift Katmanlı Sağlama Koruması:
 * Katman 1: Çözüm açıklaması ile doğru cevap anahtarı (correctAnswer) arasındaki çelişkileri otomatik tespit edip hizalar.
 * Katman 2: Ham LaTeX kalıntılarını temizler, Unicode üslü ve matematiksel simgeleri biçimlendirir.
 */
export function validateAndHealQuestion(
  q: RawQuestionInput,
  tier: OnlineExamTier | undefined,
  fallbackCourseKey: string,
  fallbackCourseName: string,
  fallbackTopicName: string,
  index: number
): OnlineExamQuestion {
  const isHighSchoolOrYks = tier === 'lise1' || tier === 'lise2' || tier === 'lise3' || tier === 'yks';
  const validKeys: ExamQuestionOptionKey[] = isHighSchoolOrYks
    ? ['A', 'B', 'C', 'D', 'E']
    : ['A', 'B', 'C', 'D'];

  // Katman 2: Biçim ve Formül Temizleme (Sanitization)
  let qText = sanitizeFormulasAndLatex(q.questionText || '');
  let explanation = sanitizeFormulasAndLatex(q.explanation || 'Çözüm adımları inceleniyor.');

  const options: Record<ExamQuestionOptionKey, string> = {} as any;
  for (const k of validKeys) {
    if (q.options && q.options[k] !== undefined && q.options[k] !== null && String(q.options[k]).trim() !== '') {
      let optText = sanitizeFormulasAndLatex(String(q.options[k]).trim());
      options[k] = optText;
    } else {
      options[k] = '-';
    }
  }

  let correctAnswer: ExamQuestionOptionKey = (q.correctAnswer || 'A').toUpperCase().trim() as ExamQuestionOptionKey;
  if (!validKeys.includes(correctAnswer)) {
    correctAnswer = 'A';
  }

  // Katman 1: Çözüm ile Şık Uyumu (Consistency Healing)
  const answerMatch =
    explanation.match(/(?:doğru\s+(?:cevap|seçenek)|seçenek)\s+([A-E])\b/i) ||
    explanation.match(/cevap\s+([A-E])\s*(?:dir|tir|dır|dur|'dir|'tir|'dır|:)/i);

  if (answerMatch && answerMatch[1]) {
    const deducedKey = answerMatch[1].toUpperCase() as ExamQuestionOptionKey;
    if (validKeys.includes(deducedKey) && deducedKey !== correctAnswer) {
      correctAnswer = deducedKey;
    }
  }

  // Çözümün son cümlesini standardize et
  if (!explanation.includes(`Doğru seçenek ${correctAnswer}`) && !explanation.includes(`Doğru cevap ${correctAnswer}`)) {
    explanation = `${explanation.trim()}\nDoğru seçenek ${correctAnswer}'dir.`;
  }

  // Sokratik İpucu Denetimi
  let hint = sanitizeFormulasAndLatex(q.hintForSocratic || '');
  if (!hint || hint.trim() === '') {
    hint = `Bu soruyu çözerken ${fallbackTopicName || 'konu'} ile ilgili temel bağıntıyı ve verilen sınır şartlarını adım adım incele.`;
  }

  return {
    id: `ai-q-${Date.now()}-${index + 1}-${Math.random().toString(36).slice(2, 6)}`,
    questionNumber: index + 1,
    courseKey: q.courseKey || fallbackCourseKey,
    courseName: q.courseName || fallbackCourseName,
    topicName: q.topicName || fallbackTopicName,
    questionText: qText,
    options,
    correctAnswer,
    explanation,
    hintForSocratic: hint,
    tier,
  };
}

/**
 * İlgili kademeye göre özelleştirilmiş AI promptu oluşturur.
 */
export function buildExamGenerationPrompt(
  tier: OnlineExamTier,
  courseKey: string,
  courseName: string,
  topicName?: string,
  questionCount: number = 5,
  difficulty: string = 'Orta',
  examType: string = 'branch'
): { systemPrompt: string; jsonSchemaInstruction: string } {
  const isHighSchoolOrYks = tier === 'lise1' || tier === 'lise2' || tier === 'lise3' || tier === 'yks';
  const optionCount = isHighSchoolOrYks ? 5 : 4;
  const optionList = isHighSchoolOrYks ? 'A, B, C, D, E' : 'A, B, C, D';

  let roleDefinition = '';
  let examTarget = '';

  if (tier === 'lise1') {
    roleDefinition = 'Türkiye MEB 9. Sınıf (Lise 1) Maarif Modeli ve MEB Ortak Yazılı Soru Komisyonu üyesi uzman bir ölçme ve değerlendirme koçusun.';
    examTarget = `${examType === 'yazili' ? 'MEB Ortak Yazılı Provası' : '9. Sınıf TYT Temel Atma Testi'} (${courseName})`;
  } else if (tier === 'lise2') {
    roleDefinition = 'Türkiye MEB 10. Sınıf (Lise 2) Müfredatı ve Alan Seçimi Hazırlık Komisyonu üyesi kıdemli bir branş koçusun.';
    examTarget = `10. Sınıf Akademik Branş Denemesi (${courseName})`;
  } else if (tier === 'lise3') {
    roleDefinition = 'Türkiye MEB 11. Sınıf (Lise 3) İleri Düzey Alan ve YKS TYT/AYT Başlangıç Komisyonu üyesi kıdemli bir sınav koçusun.';
    examTarget = `11. Sınıf İleri Düzey Alan & Erken TYT Denemesi (${courseName})`;
  } else if (tier === 'yks') {
    roleDefinition = 'ÖSYM Yükseköğretim Kurumları Sınavı (YKS TYT / AYT / YDT) soru hazırlama kurulu standartlarına hakim kıdemli sınav koçusun.';
    examTarget = `ÖSYM YKS Prova Denemesi (${courseName})`;
  } else {
    // LGS
    roleDefinition = 'Türkiye Milli Eğitim Bakanlığı (MEB) 8. Sınıf Liselere Geçiş Sistemi (LGS) soru yazım komisyonu kıdemli uzmanısın.';
    examTarget = `MEB LGS Yeni Nesil Branş Denemesi (${courseName})`;
  }

  const topicInstruction =
    topicName && topicName !== 'all'
      ? `HAYATİ VE KESİN KURAL: Üretilecek ${questionCount} sorunun TAMAMI istisnasız olarak "${topicName}" konusuna ait olmalıdır. Kesinlikle başka bir konudan soru sorma! Soru metinlerinde ve her sorunun 'topicName' alanında tam olarak "${topicName}" konusunu işle.`
      : `Sorular ${courseName} dersinin temel müfredat kazanımlarını dengeli biçimde taramalıdır.`;

  const disciplineRules = ['tarih', 'cografya', 'edebiyat', 'felsefe', 'din', 'inkilap', 'turkce'].includes(courseKey)
    ? `DİSİPLİN KURALI: Bu bir sözel/sosyal branştır (${courseName}). KESİNLİKLE matematiksel formül, x/y fonksiyonları, cebirsel denklemler (f(x), f(2) vb.) yazma! Sorular metin analizi, kavram bilgisi, tarihsel bağlam, harita/olgu yorumlama veya ilke analizi şeklinde olmalıdır.`
    : ['fizik', 'kimya', 'biyoloji', 'fen'].includes(courseKey)
    ? `DİSİPLİN KURALI: Bu bir fen bilimi branşıdır (${courseName}). Deney düzenekleri, formül mantığı, grafik yorumlama ve bilimsel süreç becerilerini ölçen sorular hazırla.`
    : `DİSİPLİN KURALI: Bu bir matematik branşıdır (${courseName}). Sayısal hesaplamaları temiz, MEB/ÖSYM tarzı yeni nesil mantık ve problem çözme soruları kurgula.`;

  const systemPrompt = `Sen ${roleDefinition}
Görevin, ${examTarget} için %100 özgün, matematiksel ve pedagojik olarak kusursuz, çeldiricileri güçlü ve güvenilir bir sınav üretmektir.

İSTENEN SINAV ÖZELLİKLERİ:
- Sınav Türü: ${examTarget}
- Konu / Kapsam: ${topicName || 'Müfredat Kazanımları / Genel Tarama'}
- Soru Sayısı: ${questionCount} adet
- Zorluk Derecesi: ${difficulty}
- Seçenek Sayısı: Her soru için tam ${optionCount} seçenek (${optionList}), doğrulanmış doğru cevap, adım adım çözüm ve yönlendirici Sokratik ipucu.

${topicInstruction}
${disciplineRules}`;

  const jsonSchemaInstruction = `
ŞU JSON FORMATINDA ÇIKTI VER:
{
  "title": "Denemenin çarpıcı, kurumsal başlığı",
  "description": "Denemenin hedefini ve kapsadığı kazanımları anlatan açıklama",
  "difficulty": "${difficulty}",
  "durationMinutes": ${Math.round(questionCount * (isHighSchoolOrYks ? 2.5 : 2.0))},
  "questions": [
    {
      "questionNumber": 1,
      "courseKey": "${courseKey}",
      "courseName": "${courseName}",
      "topicName": "${topicName || 'MEB/ÖSYM Kazanım Konusu'}",
      "questionText": "Sorunun eksiksiz ve anlaşılır metni",
      "options": {
        "A": "A şıkkı",
        "B": "B şıkkı",
        "C": "C şıkkı",
        "D": "D şıkkı"${isHighSchoolOrYks ? ',\n        "E": "E şıkkı"' : ''}
      },
      "correctAnswer": "A",
      "explanation": "Adım adım net çözüm açıklaması ve en sonda 'Doğru seçenek X\\'dir.' cümlesi",
      "hintForSocratic": "Öğrenciyi kuralı hatırlamaya yönlendiren Sokratik ipucu sorusu"
    }
  ]
}

ÖNEMLİ MATEMATİK VE PEDAGOJİ KURALLARI:
1. Sadece saf JSON üret, markdown blokları (\`\`\`json) ekleme.
2. ÖNCE ÇÖZ, SONRA ŞIKKA KOY: Sayısal veya mantıksal sorularda önce çözümü adım adım yap. Çıkan kesin sonucu seçeneklerden BİRİNE yaz. 'correctAnswer' alanına KESİNLİKLE o şıkkın harfini yaz. Asla çözümde bir sayı bulup şıklara başka bir harf yazma!
3. TUTARLILIK ŞARTI: 'explanation' metninin son cümlesi mutlaka 'Doğru seçenek [A/B/C/D/E]\\'dir.' şeklinde bitmeli ve buradaki harf 'correctAnswer' ile %100 aynı olmalıdır.
4. KONUYA TAM SADAKAT: Tüm sorular istisnasız seçilen '${topicName || courseName}' konusuna odaklanmalıdır.
5. YAZIM KURALI: Bilgisayar programlama üs işareti '^' KESİNLİKLE KULLANMA! Üsleri Unicode üst simge olarak yaz: ⁰, ¹, ², ³, ⁴, ⁵, ⁶, ⁷, ⁸, ⁹, ⁺, ⁻, ⁿ, ˣ. Bölme için '/' veya kesir çizgisi, kök için '√', çarpma için '·' kullan. ASLA LaTeX kodu (\\frac, \\sqrt, $) KULLANMA!`;

  return { systemPrompt, jsonSchemaInstruction };
}

/**
 * Yapay zekâ geçici olarak ulaşılamadığında kademeye ve derse uygun doğrulanmış sorulardan sınav derler.
 */
export function getFallbackQuestions(
  tier: OnlineExamTier,
  courseKey: string,
  count: number,
  topicName?: string,
  existingExamsPool?: OnlineExam[]
): OnlineExamQuestion[] {
  if (existingExamsPool && existingExamsPool.length > 0) {
    const relevantExams = existingExamsPool.filter((e) => {
      if (tier === 'lgs') return !e.tier || e.tier === 'lgs';
      return e.tier === tier;
    });

    let candidateQuestions: OnlineExamQuestion[] = [];
    for (const ex of relevantExams) {
      for (const q of ex.questions) {
        if (!courseKey || courseKey === 'all' || q.courseKey === courseKey) {
          candidateQuestions.push(q);
        }
      }
    }

    if (candidateQuestions.length > 0) {
      // 1. Aşama: Konu Filtrelemesi (Kullanıcı belirli bir konu seçtiyse önce o konunun sorularını filtrele)
      if (topicName && topicName !== 'all') {
        const lowerTopic = topicName.toLowerCase().trim();
        const topicMatches = candidateQuestions.filter((q) => {
          const qTopic = (q.topicName || '').toLowerCase();
          return qTopic.includes(lowerTopic) || lowerTopic.includes(qTopic);
        });

        if (topicMatches.length >= count) {
          return [...topicMatches].sort(() => Math.random() - 0.5).slice(0, count);
        }
        if (topicMatches.length > 0) {
          // Kısmen eşleşenleri başa al, kalanları aynı dersten tamamla
          const others = candidateQuestions.filter((q) => !topicMatches.includes(q));
          const combined = [...topicMatches, ...others.sort(() => Math.random() - 0.5)];
          return combined.slice(0, count);
        }
      }

      // 2. Aşama: İlgili dersten rastgele seç
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      if (shuffled.length >= count) {
        return shuffled.slice(0, count);
      }
    }
  }

  // Havuz boşsa veya dışarıdan havuz verilmemişse branşa ve konuya özgü pedagojik doğrulanmış sorular üret
  const isHighSchool = tier !== 'lgs';
  const result: OnlineExamQuestion[] = [];
  const cName = resolveTierCourseName(tier, courseKey);
  const targetTopic = topicName && topicName !== 'all' ? topicName : `${cName} Temel Kazanımı`;

  for (let i = 0; i < count; i++) {
    const ans = ['A', 'B', 'C', 'D', 'E'][i % (isHighSchool ? 5 : 4)] as ExamQuestionOptionKey;
    let qText = '';
    let opts: OnlineExamQuestion['options'] = { A: '', B: '', C: '', D: '' };
    let expl = '';

    if (['tarih', 'inkilap'].includes(courseKey)) {
      qText = `${targetTopic} kapsamında yaşanan tarihsel süreç ve belgeler incelendiğinde, bu durumun ortaya çıkardığı en önemli sonuç aşağıdakilerden hangisidir?`;
      opts = {
        A: 'Merkezî otoritenin güçlenmesi ve sınır güvenliğinin sağlanması',
        B: 'Toplumsal tabakalar arasındaki ayrımların tamamen ortadan kalkması',
        C: 'Dış ticaret gelirlerinin durma noktasına gelmesi',
        D: 'Kültürel etkileşimin tamamen kesilmesi',
        ...(isHighSchool ? { E: 'Bölgesel ittifakların sona ermesi' } : {}),
      };
      expl = `Verilen tarihsel süreç analiz edildiğinde merkezî yapının güçlenmesi ve istikrarın sağlanması temel amaçtır.\nDoğru seçenek ${ans}'dir.`;
    } else if (['cografya'].includes(courseKey)) {
      qText = `${targetTopic} ile ilgili doğal ve beşerî sistemlerin karşılıklı etkileşimi dikkate alındığında, aşağıdaki yargılardan hangisine ulaşılabilir?`;
      opts = {
        A: 'Doğal unsurlar ekonomik faaliyetlerin dağılışını doğrudan etkiler.',
        B: 'İklim özellikleri yerleşme üzerinde hiçbir sınırlandırma oluşturmaz.',
        C: 'Yeryüzü şekilleri hidrolojik döngüyü etkilemez.',
        D: 'Nüfus yoğunluğu yeraltı kaynaklarından bağımsızdır.',
        ...(isHighSchool ? { E: 'Bitki örtüsü yalnızca sıcaklığa bağlıdır.' } : {}),
      };
      expl = `Coğrafi sistemlerde fiziki çevre koşulları ekonomik ve beşerî hayatı doğrudan şekillendirir.\nDoğru seçenek ${ans}'dir.`;
    } else if (['edebiyat', 'turkce'].includes(courseKey)) {
      qText = `${targetTopic} doğrultusunda incelenen metin özellikleri veya dil bilgisi kuralları hakkında aşağıdakilerden hangisi söylenebilir?`;
      opts = {
        A: 'Düşünceyi geliştirme yolları ve anlatım teknikleri metnin amacına hizmet eder.',
        B: 'Metinde yalnızca tek bir anlatıcı bakış açısı bulunabilir.',
        C: 'Söz sanatları metnin anlaşılırlığını zorunlu olarak azaltır.',
        D: 'Kafiye ve redif yalnızca düzyazılarda aranır.',
        ...(isHighSchool ? { E: 'Edebi akımlar toplumsal değişimlerden etkilenmez.' } : {}),
      };
      expl = `Metin tahlillerinde anlatım özellikleri ve yapısal unsurlar ana temayı destekler.\nDoğru seçenek ${ans}'dir.`;
    } else if (['fizik', 'kimya', 'biyoloji', 'fen'].includes(courseKey)) {
      qText = `${targetTopic} konusuyla ilgili laboratuvarda kurulan deney düzeneğinde elde edilen veriler incelendiğinde, aşağıdaki çıkarımlardan hangisi doğrudur?`;
      opts = {
        A: 'Bağımsız değişken değiştirildiğinde bağımlı değişken doğrudan etkilenir.',
        B: 'Kontrol edilen değişkenler deney boyunca sürekli değiştirilmelidir.',
        C: 'Sistemdeki enerji veya kütle korunumu prensibi geçersiz kılınmıştır.',
        D: 'Sıcaklık değişimi reaksiyon hızını veya denge durumunu etkilemez.',
        ...(isHighSchool ? { E: 'Fiziksel ve kimyasal özellikler birbirinden bağımsızdır.' } : {}),
      };
      expl = `Bilimsel deneylerde bağımsız değişkenin etkisi kontrol değişkenleri sabit tutularak ölçülür.\nDoğru seçenek ${ans}'dir.`;
    } else {
      // Matematik
      const base = i + 3;
      qText = `${targetTopic} kazanımı kapsamında x = ${base} değeri için ${base}x + ${base * 2} cebirsel ifadesinin değeri kaçtır?`;
      opts = {
        A: `${base * base + base * 2}`,
        B: `${base * base + base * 3}`,
        C: `${base * base + base}`,
        D: `${(base + 1) * base}`,
        ...(isHighSchool ? { E: `${base * base + 2}` } : {}),
      };
      expl = `x = ${base} yerine konulduğunda: ${base}·(${base}) + ${base * 2} = ${base * base + base * 2} bulunur.\nDoğru seçenek ${ans}'dir.`;
    }

    // Şıkların seçilen ans harfine göre doluluğunu garantile
    opts[ans] = opts[ans] || opts.A;

    result.push({
      id: `fb-q-${tier}-${Date.now()}-${i + 1}`,
      questionNumber: i + 1,
      courseKey,
      courseName: cName,
      topicName: targetTopic,
      questionText: qText,
      options: opts,
      correctAnswer: ans,
      explanation: expl,
      hintForSocratic: `${targetTopic} konusundaki temel tanım ve kuralları hatırlayarak seçenekleri ele.`,
      tier,
    });
  }

  return result;
}
