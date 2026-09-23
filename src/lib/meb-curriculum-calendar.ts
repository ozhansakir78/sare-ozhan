import type { LgsCourseKey } from '@/types/exam';

export interface WeeklyCourseTopic {
  courseKey: LgsCourseKey;
  courseName: string;
  topicName: string;
  subTopics?: string[];
}

export interface WeekSchedule {
  weekNumber: number;
  monthName: string;
  themeTitle: string;
  topics: Record<LgsCourseKey, string>;
}

/**
 * MEB 8. Sınıf LGS Yıllık Çalışma Takvimi (Örnekleme ve Dönemsel Kapsam)
 */
export const MEB_ANNUAL_CURRICULUM: WeekSchedule[] = [
  {
    weekNumber: 1,
    monthName: 'Eylül',
    themeTitle: 'Okula Başlangıç ve Temel Kavramlar',
    topics: {
      turkce: 'Sözcükte Anlam (Gerçek, Mecaz, Terim Anlam)',
      matematik: 'Çarpanlar ve Katlar (Pozitif Tam Sayı Çarpanları)',
      fen: 'Mevsimlerin Oluşumu',
      inkilap: 'Bir Kahraman Doğuyor: Uyanan Avrupa ve Sarsılan Osmanlı',
      din: 'Kader ve Kaza İnancı',
      ingilizce: 'Friendship (Accepting & Refusing Offers)',
    },
  },
  {
    weekNumber: 2,
    monthName: 'Eylül',
    themeTitle: 'EBOB-EKOK & İklim Temelleri',
    topics: {
      turkce: 'Cümlede Anlam (Öznel-Nesnel, Neden-Sonuç)',
      matematik: 'Çarpanlar ve Katlar (EBOB ve EKOK Problemleri)',
      fen: 'İklim ve Hava Hareketleri',
      inkilap: 'Mustafa Kemal\'in Askerlik Hayatı',
      din: 'İnsanın İradesi ve Kader',
      ingilizce: 'Friendship (Personal Traits)',
    },
  },
  {
    weekNumber: 3,
    monthName: 'Ekim',
    themeTitle: 'Aralarında Asal Sayılar & DNA Modeli',
    topics: {
      turkce: 'Fiilimsiler (İsim-Fiil, Sıfat-Fiil)',
      matematik: 'Aralarında Asal Sayılar ve Yeni Nesil Mantık Problemleri',
      fen: 'DNA ve Genetik Kod Yapısı',
      inkilap: 'I. Dünya Savaşı ve Osmanlı Devleti',
      din: 'Kaderle İlgili Kavramlar (Ömür, Ecel, Rızık)',
      ingilizce: 'Teen Life (Daily Routines)',
    },
  },
  {
    weekNumber: 4,
    monthName: 'Ekim',
    themeTitle: 'Üslü İfadeler Giriş & Kalıtım Esasları',
    topics: {
      turkce: 'Fiilimsiler (Zarf-Fiil) ve Metin İncelemesi',
      matematik: 'Tam Sayıların Tam Sayı Kuvvetleri (Negatif Üs)',
      fen: 'Kalıtım ve Çaprazlamalar (Mendel Genetiği)',
      inkilap: 'Mondros Ateşkes Antlaşması ve İşgaller',
      din: 'Hz. Musa\'nın Hayatı ve Ayet el-Kürsi',
      ingilizce: 'Teen Life (Music & Free Time Activities)',
    },
  },
  {
    weekNumber: 5,
    monthName: 'Ekim',
    themeTitle: 'Üslü İfadelerle İşlemler & Mutasyon-Modifikasyon',
    topics: {
      turkce: 'Paragrafta Anlam (Ana Düşünce ve Yardımcı Düşünceler)',
      matematik: 'Üslü İfadelerle Çarpma ve Bölme İşlemleri',
      fen: 'Mutasyon, Modifikasyon ve Adaptasyon',
      inkilap: 'Kuvâ-yı Millîye ve Cemiyetler',
      din: 'Zekât ve Sadaka İbadeti',
      ingilizce: 'In the Kitchen (Cooking Methods & Recipes)',
    },
  },
  {
    weekNumber: 6,
    monthName: 'Kasım',
    themeTitle: 'Bilimsel Gösterim & Biyoteknoloji',
    topics: {
      turkce: 'Cümlenin Ögeleri (Temel ve Yardımcı Ögeler)',
      matematik: 'Çok Büyük ve Çok Küçük Sayılar & Bilimsel Gösterim',
      fen: 'Biyoteknoloji ve Genetik Mühendisliği Uygulamaları',
      inkilap: 'Millî Mücadele\'nin Hazırlık Dönemi (Genelgeler ve Kongreler)',
      din: 'Zekât Kimlere Verilir? Sadaka-i Cariye',
      ingilizce: 'In the Kitchen (Process & Ingredients)',
    },
  },
  {
    weekNumber: 7,
    monthName: 'Kasım',
    themeTitle: 'Kareköklü İfadeler & Katı Basıncı',
    topics: {
      turkce: 'Metin Türleri ve Söz Sanatları',
      matematik: 'Tam Kare Sayılar ve Karekök Kavramı',
      fen: 'Basınç: Katı Basıncı ve Günlük Hayat Uygulamaları',
      inkilap: 'Misakımillî ve TBMM\'nin Açılışı',
      din: 'Bir Peygamber Tanıyorum: Hz. Şuayb',
      ingilizce: 'On the Phone (Phone Conversations)',
    },
  },
  {
    weekNumber: 8,
    monthName: 'Kasım',
    themeTitle: 'Kareköklü Sayılarda İşlemler & Sıvı Basıncı',
    topics: {
      turkce: 'Noktalama İşaretleri ve Yazım Kuralları',
      matematik: 'Kareköklü İfadelerde Çarpma, Bölme ve Yaklaşık Değer',
      fen: 'Sıvı ve Gaz Basıncı (Pascal Prensibi)',
      inkilap: 'Büyük Millet Meclisine Karşı Çıkan Ayaklanmalar ve Sevr',
      din: 'İslam\'ın Paylaşma ve Yardımlaşmaya Verdiği Önem',
      ingilizce: 'On the Phone (Making Inquiries)',
    },
  },
  {
    weekNumber: 9,
    monthName: 'Aralık',
    themeTitle: 'Veri Analizi & Periyodik Sistem',
    topics: {
      turkce: 'Görsel Okuma, Tablo ve Grafik Yorumlama',
      matematik: 'Veri Analizi (Çizgi, Sütun ve Daire Grafiği Dönüşümleri)',
      fen: 'Madde ve Endüstri: Periyodik Sistem ve Elementlerin Sınıflandırılması',
      inkilap: 'Doğu ve Güney Cepheleri',
      din: 'Din ve Hayat: Din, Birey ve Toplum İlişkisi',
      ingilizce: 'The Internet (Social Media & Online Habits)',
    },
  },
  {
    weekNumber: 10,
    monthName: 'Aralık',
    themeTitle: 'Olasılık & Fiziksel ve Kimyasal Değişimler',
    topics: {
      turkce: 'Cümle Türleri (Yapı, Anlam ve Yüklemin Yerine Göre)',
      matematik: 'Basit Olayların Olma Olasılığı',
      fen: 'Fiziksel ve Kimyasal Değişimler & Kimyasal Tepkimeler',
      inkilap: 'Batı Cephesi (I. ve II. İnönü Savaşları)',
      din: 'Dinin Temel Gayesi (Canın, Aklın, Dinin, Malın ve Neslin Korunması)',
      ingilizce: 'The Internet (Internet Safety & Rules)',
    },
  },
  {
    weekNumber: 11,
    monthName: 'Aralık',
    themeTitle: 'Cebirsel İfadeler & Asitler-Bazlar',
    topics: {
      turkce: 'Fiilde Çatı (Öznesine ve Nesnesine Göre)',
      matematik: 'Cebirsel İfadeler ve Özdeşlikler (Kare Farkı, Tam Kare)',
      fen: 'Asitler, Bazlar ve pH Kavramı (Asit Yağmurları)',
      inkilap: 'Kütahya-Eskişehir Savaşları ve Maarif Kongresi',
      din: 'Bir Peygamber Tanıyorum: Hz. Yusuf',
      ingilizce: 'Adventures (Extreme Sports & Preferences)',
    },
  },
  {
    weekNumber: 12,
    monthName: 'Ocak',
    themeTitle: 'Çarpanlara Ayırma & Maddenin Isı ile Etkileşimi',
    topics: {
      turkce: 'Anlatım Bozuklukları ve Mantık Muhakeme',
      matematik: 'Cebirsel İfadeleri Çarpanlara Ayırma',
      fen: 'Maddenin Isı ile Etkileşimi (Özısı, Isınma-Soğuma Grafikleri)',
      inkilap: 'Sakarya Meydan Muharebesi ve Büyük Taarruz',
      din: 'Asr Suresi ve Anlamı',
      ingilizce: 'Tourism (Historic Sites & Vacations)',
    },
  },
  {
    weekNumber: 13,
    monthName: 'Şubat',
    themeTitle: 'Doğrusal Denklemler & Basit Makineler',
    topics: {
      turkce: 'Paragrafta Yapı (Akışı Bozan Cümle, Paragraf Bölme)',
      matematik: 'Birinci Dereceden Bir Bilinmeyenli Denklemler ve Koordinat Sistemi',
      fen: 'Basit Makineler: Kaldıraçlar, Makaralar ve Palangalar',
      inkilap: 'Mudanya Ateşkesi ve Lozan Barış Antlaşması',
      din: 'Hz. Muhammed\'in Merhametli ve Adaletli Davranışı',
      ingilizce: 'Chores (Responsibilities at Home)',
    },
  },
  {
    weekNumber: 14,
    monthName: 'Mart',
    themeTitle: 'Eğim & Eğik Düzlem, Çıkrık, Dişli Çarklar',
    topics: {
      turkce: 'Metinler Arası Karşılaştırma ve İleri Düzey Mantık',
      matematik: 'Doğrunun Eğimi ve Doğrusal İlişkiler',
      fen: 'Eğik Düzlem, Çıkrık, Vida ve Dişli Çarklar',
      inkilap: 'Siyasi ve Hukuk Alanında Yapılan İnkılaplar',
      din: 'Hz. Muhammed\'in İstişareye Verdiği Önem',
      ingilizce: 'Science (Scientific Achievements & Inventors)',
    },
  },
  {
    weekNumber: 15,
    monthName: 'Nisan',
    themeTitle: 'Eşitsizlikler & Fotosentez-Solunum',
    topics: {
      turkce: 'Sözel Mantık ve Çıkarım Yapma',
      matematik: 'Birinci Dereceden Bir Bilinmeyenli Eşitsizlikler',
      fen: 'Besin Zinciri, Fotosentez ve Hücresel Solunum',
      inkilap: 'Eğitim, Kültür ve Toplumsal Alanda İnkılaplar',
      din: 'Kureyş Suresi ve Anlamı',
      ingilizce: 'Natural Forces (Natural Disasters & Precautions)',
    },
  },
  {
    weekNumber: 16,
    monthName: 'Mayıs',
    themeTitle: 'Üçgenler & Elektrik Yükleri',
    topics: {
      turkce: 'Tüm LGS Türkçe Müfredatı Genel Deneme Taraması',
      matematik: 'Üçgende Kenarortay, Açıortay, Yükseklik ve Pisagor Bağıntısı',
      fen: 'Madde Döngüleri, Küresel İklim Değişikliği ve Elektrik Yükleri',
      inkilap: 'Atatürk İlkeleri ve Türkiye Cumhuriyeti\'nin Dış Politikası',
      din: 'Tüm Din Kültürü Kazanımları Genel Tekrarı',
      ingilizce: 'LGS Vocabulary & Reading Comprehension Review',
    },
  },
];

/**
 * Mevcut tarihe göre MEB eğitim haftasını hesaplar.
 */
export function getCurrentSchoolWeek(now = new Date()): WeekSchedule {
  const month = now.getMonth(); // 0 = Jan, 8 = Sep...
  
  // Basit hafta indexleme:
  // Eylül: hafta 1-2
  // Ekim: hafta 3-5
  // Kasım: hafta 6-8
  // Aralık: hafta 9-11
  // Ocak: hafta 12
  // Şubat: hafta 13
  // Mart: hafta 14
  // Nisan: hafta 15
  // Mayıs-Haziran: hafta 16
  let targetWeek = 3; // Varsayılan: Ekim / Konu pekiştirme

  switch (month) {
    case 8: // Eylül
      targetWeek = now.getDate() < 20 ? 1 : 2;
      break;
    case 9: // Ekim
      if (now.getDate() < 10) targetWeek = 3;
      else if (now.getDate() < 22) targetWeek = 4;
      else targetWeek = 5;
      break;
    case 10: // Kasım
      if (now.getDate() < 12) targetWeek = 6;
      else if (now.getDate() < 24) targetWeek = 7;
      else targetWeek = 8;
      break;
    case 11: // Aralık
      if (now.getDate() < 15) targetWeek = 9;
      else if (now.getDate() < 25) targetWeek = 10;
      else targetWeek = 11;
      break;
    case 0: // Ocak
      targetWeek = 12;
      break;
    case 1: // Şubat
      targetWeek = 13;
      break;
    case 2: // Mart
      targetWeek = 14;
      break;
    case 3: // Nisan
      targetWeek = 15;
      break;
    default: // Mayıs, Haziran ve yaz ayları (Final hazırlık)
      targetWeek = 16;
      break;
  }

  const found = MEB_ANNUAL_CURRICULUM.find((w) => w.weekNumber === targetWeek);
  return found || MEB_ANNUAL_CURRICULUM[3];
}

export type ChallengeType = 'tuesday-stem' | 'thursday-verbal' | 'sunday-live' | 'daily';

export interface ActiveChallengeInfo {
  type: ChallengeType;
  title: string;
  badge: string;
  courseHighlight: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  slug: string;
  targetTopics: string[];
}

/**
 * Bugünün gününe ve MEB takvimine göre aktif haftalık etkinliği hesaplar.
 */
export function getActiveChallengeForToday(now = new Date()): ActiveChallengeInfo {
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 4 = Thursday...
  const week = getCurrentSchoolWeek(now);

  if (day === 0) {
    // Pazar Günü: Canlı Büyük LGS Denemesi
    return {
      type: 'sunday-live',
      title: 'Pazar Canlı LGS Türkiye Geneli Denemesi',
      badge: '🔥 BUGÜN CANLI YAYINDA',
      courseHighlight: 'Tüm 6 Ders (Tam Sınav)',
      description: 'MEB standart sapma katsayılarına uygun 90 soruluk eşzamanlı canlı LGS simülasyonu.',
      questionCount: 90,
      durationMinutes: 150,
      slug: 'lgs-canli-pazar-denemesi',
      targetTopics: [week.topics.matematik, week.topics.fen, week.topics.turkce],
    };
  }

  if (day === 2 || day === 3) {
    // Salı veya Çarşamba: Sayısal Meydan Okuma
    return {
      type: 'tuesday-stem',
      title: `Haftalık Sayısal Meydan Okuma (${week.monthName} ${week.weekNumber}. Hafta)`,
      badge: '⚡ SALI SAYISAL MEYDAN OKUMA',
      courseHighlight: `Matematik (${week.topics.matematik.split('(')[0].trim()}) + Fen Bilimleri`,
      description: `Bu haftanın güncel MEB konuları: "${week.topics.matematik}" ve "${week.topics.fen}". Hemen çöz, ligde puanını katla!`,
      questionCount: 15,
      durationMinutes: 30,
      slug: 'lgs-haftalik-sayisal-meydan-okuma',
      targetTopics: [week.topics.matematik, week.topics.fen],
    };
  }

  // Perşembe, Cuma, Cumartesi veya Pazartesi: Sözel Kampı
  return {
    type: 'thursday-verbal',
    title: `Haftalık Sözel Kampı (${week.monthName} ${week.weekNumber}. Hafta)`,
    badge: '📚 PERŞEMBE SÖZEL KAMPI',
    courseHighlight: `Türkçe (${week.topics.turkce.split('(')[0].trim()}) + İnkılap + Din + İngilizce`,
    description: `Bu haftanın sözel kazanımları: "${week.topics.turkce}". Yeni nesil paragraf ve mantık sorularıyla pratik yap!`,
    questionCount: 15,
    durationMinutes: 25,
    slug: 'lgs-haftalik-sozel-kampi',
    targetTopics: [week.topics.turkce, week.topics.inkilap, week.topics.din],
  };
}
