import { GradeTier } from '@/types/grade-tier';
import { LGS_COURSE_OPTIONS, LGS_TOPICS_BY_COURSE } from '@/lib/lgs-topics';
import { LISE1_COURSE_OPTIONS, LISE1_TOPICS_BY_COURSE } from '@/lib/lise1-topics';
import { LISE2_COURSE_OPTIONS, LISE2_TOPICS_BY_COURSE } from '@/lib/lise2-topics';
import { LISE3_COURSE_OPTIONS, LISE3_TOPICS_BY_COURSE } from '@/lib/lise3-topics';

export interface TierCourseItem {
  key: string;
  name: string;
}

export const YKS_COURSE_OPTIONS: readonly TierCourseItem[] = [
  { key: 'matematik', name: 'Matematik & Geometri (TYT/AYT)' },
  { key: 'fizik', name: 'Fizik (TYT/AYT)' },
  { key: 'kimya', name: 'Kimya (TYT/AYT)' },
  { key: 'biyoloji', name: 'Biyoloji (TYT/AYT)' },
  { key: 'turkce', name: 'Türkçe & Paragraf (TYT)' },
  { key: 'edebiyat', name: 'Türk Dili ve Edebiyatı (AYT)' },
  { key: 'tarih', name: 'Tarih (TYT/AYT)' },
  { key: 'cografya', name: 'Coğrafya (TYT/AYT)' },
  { key: 'felsefe', name: 'Felsefe Grubu & Din (TYT/AYT)' },
  { key: 'ingilizce', name: 'Yabancı Dil / İngilizce (YDT)' },
];

export const YKS_TOPICS_MAP: Record<string, readonly string[]> = {
  matematik: [
    'Temel Kavramlar & Sayılar',
    'Bölünebilme & EBOB-EKOK',
    'Üslü & Köklü İfadeler',
    'Çarpanlara Ayırma & Özdeşlikler',
    'Denklemler & Eşitsizlikler',
    'Problemler (Hız, Yüzde, Yaş, İşçi)',
    'Fonksiyonlar & Polinomlar',
    'İkinci Dereceden Denklemler & Parabol',
    'Trigonometri',
    'Logaritma & Diziler',
    'Limit ve Süreklilik',
    'Türev ve Uygulamaları',
    'İntegral ve Alan Hesabı',
    'Geometri: Üçgenler, Dörtgenler, Çember, Analitik',
  ],
  fizik: [
    'Fizik Bilimine Giriş & Madde',
    'Kuvvet, Hareket & Newton Yasaları',
    'İş, Güç, Enerji',
    'Isı, Sıcaklık & Genleşme',
    'Elektrostatik & Elektrik Akımı',
    'Optik & Dalgalar',
    'Vektörler & Bağıl Hareket',
    'İki Boyutta Hareket (Atışlar)',
    'İtme ve Çizgisel Momentum',
    'Tork, Denge & Basit Makineler',
    'Manyetizma & İndüksiyon',
    'Düzgün Çembersel & Basit Harmonik Hareket',
    'Modern Fizik',
  ],
  kimya: [
    'Kimya Bilimi & Atom Modelleri',
    'Periyodik Sistem & Kimyasal Türler',
    'Maddenin Halleri & Karışımlar',
    'Kimyanın Temel Kanunları & Mol',
    'Asitler, Bazlar ve Tuzlar',
    'Modern Atom Teorisi & Gazlar',
    'Sıvı Çözeltiler & Derişim',
    'Kimyasal Tepkimelerde Enerji & Hız',
    'Kimyasal Denge & Çözünürlük Dengesi',
    'Kimya ve Elektrik (Piller, Elektroliz)',
    'Organik Kimyaya Giriş & Hidrokarbonlar',
  ],
  biyoloji: [
    'Yaşam Bilimi Biyoloji & Hücre',
    'Canlıların Çeşitliliği ve Sınıflandırılması',
    'Hücre Bölünmeleri (Mitoz, Mayoz)',
    'Kalıtım & Biyoçeşitlilik',
    'Ekosistem Ekolojisi & Güncel Çevre Sorunları',
    'İnsan Fizyolojisi (Denetleyici Sistem, Destek, Sindirim, Dolaşım, Solunum, Boşaltım, Üreme)',
    'Genden Proteine (Nükleik Asitler, Protein Sentezi)',
    'Canlılarda Enerji Dönüşümleri (Fotosentez, Kemosentez, Solunum)',
  ],
  turkce: [
    'Sözcükte Anlam & Söz Öbekleri',
    'Cümlede Anlam & Kavramlar',
    'Paragrafta Ana Düşünce & Yardımcı Düşünceler',
    'Paragrafın Yapısı & Akışı Bozan Cümleler',
    'Anlatım Teknikleri & Düşünceyi Geliştirme Yolları',
    'Ses Bilgisi',
    'Yazım Kuralları',
    'Noktalama İşaretleri',
    'Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Edat, Bağlaç, Ünlem)',
    'Fiiller, Ek Fiil & Fiilde Çatı',
    'Cümlenin Ögeleri & Cümle Türleri',
  ],
  edebiyat: [
    'Şiir Bilgisi & Edebi Sanatlar',
    'Metinlerin Sınıflandırılması & Edebi Akımlar',
    'İslamiyet Öncesi & Geçiş Dönemi Türk Edebiyatı',
    'Halk Edebiyatı (Anonim, Âşık, Tekke)',
    'Divan Edebiyatı (Nazım Şekilleri, Şairler)',
    'Tanzimat Edebiyatı (1. ve 2. Dönem)',
    'Servet-i Fünun & Fecr-i Âti Edebiyatı',
    'Millî Edebiyat Dönemi',
    'Cumhuriyet Dönemi Türk Edebiyatı (Şiir, Roman, Hikâye, Tiyatro)',
  ],
  tarih: [
    'Tarih ve Zaman',
    'İlk ve Orta Çağlarda Türk Dünyası',
    'İslam Medeniyetinin Doğuşu ve İlk İslam Devletleri',
    'Türklerin İslamiyeti Kabulü ve İlk Türk İslam Devletleri',
    'Orta Çağ\'da Dünya & Klasik Çağda Osmanlı',
    'Değişen Dünya Dengeleri Karşısında Osmanlı',
    'Devrimler Çağında Değişen Devlet-Toplum İlişkileri',
    '20. Yüzyıl Başlarında Osmanlı Devleti & I. Dünya Savaşı',
    'Millî Mücadele (Kurtuluş Savaşı)',
    'Atatürkçülük ve Türk İnkılabı',
  ],
  cografya: [
    'Doğa ve İnsan & Coğrafi Konum',
    'Harita Bilgisi & İklim Bilgisi',
    'Yerin Şekillenmesi & İç-Dış Kuvvetler',
    'Nüfus ve Yerleşme & Göçler',
    'Bölge ve Ulaşım Hatları',
    'Doğal Afetler ve Çevre',
    'Ekosistemler ve Madde Döngüleri',
    'Türkiye\'nin İklimi, Yer Şekilleri ve Su Varlığı',
    'Türkiye Ekonomisi (Tarım, Hayvancılık, Sanayi, Madenler)',
    'Küresel ve Bölgesel Örgütler',
  ],
  felsefe: [
    'Felsefeyi Tanıma & Felsefe ile Düşünme',
    'Varlık Felsefesi (Ontoloji)',
    'Bilgi Felsefesi (Epistemoloji)',
    'Ahlak Felsefesi (Etik)',
    'Sanat Felsefesi (Estetik)',
    'Din Felsefesi & Siyaset Felsefesi',
    'Din Kültürü: İnanç, İbadet, Ahlak ve Değerler, Kur\'an ve Yorumu',
  ],
  ingilizce: [
    'Vocabulary & Phrasal Verbs',
    'Grammar: Tenses, Modals, Conditionals, Passive Voice',
    'Reading Comprehension & Cloze Tests',
    'Sentence Completion & Dialogue',
    'Translation & Restatement',
  ],
};

export function getCourseOptionsForTier(tier: GradeTier = 'lgs'): readonly TierCourseItem[] {
  switch (tier) {
    case 'lise1':
      return LISE1_COURSE_OPTIONS.map((c) => ({ key: c.key, name: c.name }));
    case 'lise2':
      return LISE2_COURSE_OPTIONS.map((c) => ({ key: c.key, name: c.name }));
    case 'lise3':
      return LISE3_COURSE_OPTIONS.map((c) => ({ key: c.key, name: c.name }));
    case 'yks':
      return YKS_COURSE_OPTIONS;
    case 'lgs':
    default:
      return LGS_COURSE_OPTIONS.map((c) => ({ key: c.key, name: c.name }));
  }
}

export function getTopicsForTierAndCourse(tier: GradeTier = 'lgs', courseKey: string): readonly string[] {
  switch (tier) {
    case 'lise1': {
      const map = LISE1_TOPICS_BY_COURSE as Record<string, readonly string[]>;
      return map[courseKey] || ['9. Sınıf Genel Kazanım'];
    }
    case 'lise2': {
      const map = LISE2_TOPICS_BY_COURSE as Record<string, readonly string[]>;
      return map[courseKey] || ['10. Sınıf Genel Kazanım'];
    }
    case 'lise3': {
      const map = LISE3_TOPICS_BY_COURSE as Record<string, readonly string[]>;
      return map[courseKey] || ['11. Sınıf Genel Kazanım'];
    }
    case 'yks': {
      return YKS_TOPICS_MAP[courseKey] || ['YKS Genel Kazanım'];
    }
    case 'lgs':
    default: {
      const map = LGS_TOPICS_BY_COURSE as Record<string, readonly string[]>;
      return map[courseKey] || ['LGS Genel Konu'];
    }
  }
}

export function getCourseNameForTier(tier: GradeTier = 'lgs', courseKey: string): string {
  const options = getCourseOptionsForTier(tier);
  const found = options.find((c) => c.key === courseKey);
  if (found) return found.name;

  // Tüm kademelerde ara
  const allCourses: TierCourseItem[] = [
    ...LGS_COURSE_OPTIONS,
    ...LISE1_COURSE_OPTIONS,
    ...LISE2_COURSE_OPTIONS,
    ...LISE3_COURSE_OPTIONS,
    ...YKS_COURSE_OPTIONS,
  ];
  const fallback = allCourses.find((c) => c.key === courseKey);
  return fallback?.name || courseKey;
}
