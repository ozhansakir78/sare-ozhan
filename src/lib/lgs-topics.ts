import type { LgsCourseKey } from '@/types/exam';

export interface LgsCourseTopicConfig {
  key: LgsCourseKey;
  name: string;
  topics: readonly string[];
}

export const LGS_TOPICS_BY_COURSE: Record<LgsCourseKey, readonly string[]> = {
  turkce: [
    'Fiilimsiler (Eylemsiler)',
    'Sözcükte Anlam',
    'Cümlede Anlam',
    'Paragrafta Anlam (Ana Fikir, Yardımcı Fikir)',
    'Cümlenin Ögeleri',
    'Fiilde Çatı',
    'Cümle Türleri',
    'Yazım Kuralları',
    'Noktalama İşaretleri',
    'Metin Türleri ve Söz Sanatları',
    'Görsel Okuma ve Mantık Muhakeme',
  ],
  matematik: [
    'Çarpanlar ve Katlar (EBOB - EKOK)',
    'Üslü İfadeler',
    'Kareköklü İfadeler',
    'Veri Analizi',
    'Basit Olayların Olma Olasılığı',
    'Cebirsel İfadeler ve Özdeşlikler',
    'Doğrusal Denklemler ve Eğim',
    'Eşitsizlikler',
    'Üçgenler (Açı-Kenar Bağıntıları, Benzerlik)',
    'Eşlik ve Benzerlik',
    'Dönüşüm Geometrisi',
    'Geometrik Cisimler (Prizma, Silindir, Koni)',
  ],
  fen: [
    'Mevsimler ve İklim',
    'DNA ve Genetik Kod',
    'Kalıtım ve Biyoteknoloji',
    'Basınç (Katı, Sıvı ve Gaz Basıncı)',
    'Madde ve Endüstri (Periyodik Sistem, Asit-Baz)',
    'Basit Makineler (Kaldıraç, Makara, Eğik Düzlem)',
    'Enerji Dönüşümleri ve Çevre Bilimi (Fotosentez, Besin Zinciri)',
    'Elektrik Yükleri ve Elektrik Enerjisi',
  ],
  inkilap: [
    'Bir Kahraman Doğuyor',
    'Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
    'Millî Bir Destan: Ya İstiklal Ya Ölüm!',
    'Atatürkçülük ve Çağdaşlaşan Türkiye',
    'Demokratikleşme Çabaları',
    'Atatürk Dönemi Türk Dış Politikası',
    'Atatürk\'ün Ölümü ve Sonrası',
  ],
  din: [
    'Kader İnancı (Kaza ve Kader)',
    'Zekât ve Sadaka İbadeti',
    'Din ve Hayat (Temel Hakların Korunması)',
    'Hz. Muhammed\'in Doğruluğu ve Güvenilir Kişiliği',
    'Kur\'an-ı Kerim ve Özellikleri',
  ],
  ingilizce: [
    'Unit 1: Friendship',
    'Unit 2: Teen Life',
    'Unit 3: In The Kitchen',
    'Unit 4: On The Phone',
    'Unit 5: The Internet',
    'Unit 6: Adventures',
    'Unit 7: Tourism',
    'Unit 8: Chores',
    'Unit 9: Science',
    'Unit 10: Natural Forces',
  ],
} as const;

export const LGS_COURSE_OPTIONS: { key: LgsCourseKey; name: string }[] = [
  { key: 'matematik', name: 'Matematik' },
  { key: 'fen', name: 'Fen Bilimleri' },
  { key: 'turkce', name: 'Türkçe' },
  { key: 'inkilap', name: 'T.C. İnkılap Tarihi ve Atatürkçülük' },
  { key: 'din', name: 'Din Kültürü ve Ahlak Bilgisi' },
  { key: 'ingilizce', name: 'Yabancı Dil (İngilizce)' },
];

/**
 * Belirtilen dersin müfredat konularını döndürür
 */
export function getTopicsByCourse(courseKey: LgsCourseKey): readonly string[] {
  return LGS_TOPICS_BY_COURSE[courseKey] || [];
}

/**
 * Ders kodundan Türkçe ders adını döndürür
 */
export function getCourseName(courseKey: LgsCourseKey): string {
  const found = LGS_COURSE_OPTIONS.find((c) => c.key === courseKey);
  return found ? found.name : courseKey;
}
