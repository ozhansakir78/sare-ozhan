// MEB Güncel 11. Sınıf (Lise 3) Müfredat, Kazanım ve Alan Haritası
// Talim ve Terbiye Kurulu Başkanlığı (TTKB), MEB Ortak Yazılı Sınav Senaryoları ve ÖSYM YKS (AYT) Ağırlıklarına Tam Uyumlu

import type { HighSchoolTrack } from '@/lib/field-selection';

export type Lise3CourseKey =
  | 'matematik'
  | 'fizik'
  | 'kimya'
  | 'biyoloji'
  | 'edebiyat'
  | 'tarih'
  | 'cografya'
  | 'felsefe'
  | 'ingilizce'
  | 'din';

export interface Lise3CourseOption {
  key: Lise3CourseKey;
  name: string;
  weeklyHours: number; // MEB Haftalık Ders Saati
  isPassingRequirement?: boolean; // MEB Baraj Dersi: Türk Dili ve Edebiyatı için 70
  tracks: (HighSchoolTrack | 'ortak')[]; // İlgili alanlar (Sayısal, EA, Sözel, Dil, Ortak)
  modelName: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export const LISE3_COURSE_OPTIONS: readonly Lise3CourseOption[] = [
  {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı (11. Sınıf)',
    weeklyHours: 5,
    isPassingRequirement: true, // MEB Ortaöğretim Baraj Dersi: 70
    tracks: ['ortak', 'sayisal', 'esit_agirlik', 'sozel', 'dil'],
    modelName: 'MEB 11. Sınıf Ortak & Alan Müfredatı',
    colorTheme: {
      bg: 'bg-rose-50/60 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-900/50',
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    },
  },
  {
    key: 'matematik',
    name: 'İleri Matematik (11. Sınıf)',
    weeklyHours: 6,
    tracks: ['sayisal', 'esit_agirlik'],
    modelName: 'MEB 11. Sınıf İleri Matematik (AYT Temeli)',
    colorTheme: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-900/50',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    },
  },
  {
    key: 'fizik',
    name: 'İleri Fizik (11. Sınıf)',
    weeklyHours: 4,
    tracks: ['sayisal'],
    modelName: 'MEB 11. Sınıf İleri Fizik (AYT Fen)',
    colorTheme: {
      bg: 'bg-indigo-50/60 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-900/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    },
  },
  {
    key: 'kimya',
    name: 'İleri Kimya (11. Sınıf)',
    weeklyHours: 4,
    tracks: ['sayisal'],
    modelName: 'MEB 11. Sınıf İleri Kimya (AYT Fen)',
    colorTheme: {
      bg: 'bg-violet-50/60 dark:bg-violet-950/20',
      border: 'border-violet-200 dark:border-violet-900/50',
      text: 'text-violet-600 dark:text-violet-400',
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
    },
  },
  {
    key: 'biyoloji',
    name: 'İleri Biyoloji (11. Sınıf)',
    weeklyHours: 4,
    tracks: ['sayisal'],
    modelName: 'MEB 11. Sınıf İleri Biyoloji (AYT Fen - Sistemler)',
    colorTheme: {
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
  },
  {
    key: 'tarih',
    name: 'Tarih (11. Sınıf)',
    weeklyHours: 2,
    tracks: ['ortak', 'esit_agirlik', 'sozel', 'sayisal', 'dil'],
    modelName: 'MEB 11. Sınıf Tarih',
    colorTheme: {
      bg: 'bg-amber-50/60 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/50',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    },
  },
  {
    key: 'cografya',
    name: 'Coğrafya (11. Sınıf)',
    weeklyHours: 4,
    tracks: ['esit_agirlik', 'sozel'],
    modelName: 'MEB 11. Sınıf Seçmeli Coğrafya (AYT Sosyal)',
    colorTheme: {
      bg: 'bg-teal-50/60 dark:bg-teal-950/20',
      border: 'border-teal-200 dark:border-teal-900/50',
      text: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    },
  },
  {
    key: 'felsefe',
    name: 'Felsefe & Felsefe Grubu (11. Sınıf)',
    weeklyHours: 2,
    tracks: ['ortak', 'esit_agirlik', 'sozel', 'sayisal', 'dil'],
    modelName: 'MEB 11. Sınıf Felsefe (İlk Çağ & Orta Çağ Felsefesi)',
    colorTheme: {
      bg: 'bg-orange-50/60 dark:bg-orange-950/20',
      border: 'border-orange-200 dark:border-orange-900/50',
      text: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
    },
  },
  {
    key: 'ingilizce',
    name: 'İngilizce (11. Sınıf)',
    weeklyHours: 2,
    tracks: ['ortak', 'dil', 'sayisal', 'esit_agirlik', 'sozel'],
    modelName: 'MEB 11. Sınıf İngilizce (CEFR B1+/B2)',
    colorTheme: {
      bg: 'bg-sky-50/60 dark:bg-sky-950/20',
      border: 'border-sky-200 dark:border-sky-900/50',
      text: 'text-sky-600 dark:text-sky-400',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    },
  },
  {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi (11. Sınıf)',
    weeklyHours: 2,
    tracks: ['ortak', 'sayisal', 'esit_agirlik', 'sozel', 'dil'],
    modelName: 'MEB 11. Sınıf Din Kültürü',
    colorTheme: {
      bg: 'bg-cyan-50/60 dark:bg-cyan-950/20',
      border: 'border-cyan-200 dark:border-cyan-900/50',
      text: 'text-cyan-600 dark:text-cyan-400',
      badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
    },
  },
] as const;

export const LISE3_TOPICS_BY_COURSE: Record<Lise3CourseKey, readonly string[]> = {
  // 1. İLERİ MATEMATİK (11. Sınıf - 7 Ana Ünite)
  matematik: [
    '1. Ünite: Trigonometri - Yönlü Açılar, Birim Çember ve Esas Ölçü',
    '1. Ünite: Trigonometri - Trigonometrik Fonksiyonlar (sin, cos, tan, cot) ve Bölgelere Göre İşaretleri',
    '1. Ünite: Trigonometri - Trigonometrik Özdeşlikler ve İndirgeme Bağıntıları',
    '1. Ünite: Trigonometri - Kosinüs ve Sinüs Teoremleri ve Üçgende Alan',
    '1. Ünite: Trigonometri - Trigonometrik Fonksiyonların Grafikleri ve Periyot Hesabı',
    '1. Ünite: Trigonometri - Ters Trigonometrik Fonksiyonlar (Arcsin, Arccos, Arctan)',
    '2. Ünite: Analitik Geometri - Doğrunun Analitiği: İki Nokta Arasındaki Uzaklık ve Orta Nokta',
    '2. Ünite: Analitik Geometri - Doğrunun Eğimi, Eğim Açısı ve İki Noktası Bilinen Doğrunun Denklemi',
    '2. Ünite: Analitik Geometri - İki Doğrunun Birbirine Göre Durumları (Paralellik, Diklik, Kesişme)',
    '2. Ünite: Analitik Geometri - Bir Noktanın Bir Doğruya Uzaklığı ve Paralel İki Doğru Arasındaki Uzaklık',
    '3. Ünite: Fonksiyonlarda Uygulamalar - Fonksiyonun Eksenleri Kestiği Noktalar, Artanlık ve Azalanlık',
    '3. Ünite: Fonksiyonlarda Uygulamalar - Fonksiyonun Maksimum-Minimum Değerleri ve Ortalama Değişim Hızı',
    '3. Ünite: Fonksiyonlarda Uygulamalar - İkinci Dereceden Fonksiyonlar (Parabol): Tepe Noktası ve Simetri Ekseni',
    '3. Ünite: Fonksiyonlarda Uygulamalar - Parabolün Grafiği ve Doğru ile Parabolün Durumları',
    '3. Ünite: Fonksiyonlarda Uygulamalar - Fonksiyon Dönüşümleri: Öteleme, Simetri ve Ölçekleme',
    '4. Ünite: Denklem ve Eşitsizlik Sistemleri - İkinci Dereceden İki Bilinmeyenli Denklem Sistemleri',
    '4. Ünite: Denklem ve Eşitsizlik Sistemleri - İkinci Dereceden Bir Bilinmeyenli Eşitsizlikler ve İşaret Tablosu',
    '4. Ünite: Denklem ve Eşitsizlik Sistemleri - İkinci Dereceden Eşitsizlik Sistemleri',
    '5. Ünite: Çember ve Daire - Çemberin Temel Elemanları: Kiriş, Teğet ve Kesen Özellikleri',
    '5. Ünite: Çember ve Daire - Çemberde Açılar: Merkez Açı, Çevre Açı, Teğet-Kiriş Açı, İç ve Dış Açı',
    '5. Ünite: Çember ve Daire - Çemberde Teğet Özellikleri ve Teğetler Dörtgeni',
    '5. Ünite: Çember ve Daire - Dairenin Çevresi, Alanı ve Daire Diliminin Alanı',
    '6. Ünite: Uzay Geometri - Dik Dairesel Silindir: Alan ve Hacim Hesapları',
    '6. Ünite: Uzay Geometri - Dik Dairesel Koni ve Küre: Alan ve Hacim Hesapları',
    '7. Ünite: Olasılık - Koşullu Olasılık, Bağımlı ve Bağımsız Olaylar',
    '7. Ünite: Olasılık - Bileşik Olaylar ve Deneysel/Teorik Olasılık',
  ],

  // 2. İLERİ FİZİK (11. Sınıf - 2 Ana Ünite / Mekanik + Elektrik-Manyetizma)
  fizik: [
    '1. Ünite: Kuvvet ve Hareket - Vektörlerin Özellikleri ve İki/Üç Boyutlu Kartezyen Koordinatlarda Bileşenleri',
    '1. Ünite: Kuvvet ve Hareket - Bir ve İki Boyutta Bağıl Hareket ve Nehir Problemleri',
    '1. Ünite: Kuvvet ve Hareket - Newton\'ın Hareket Yasaları: Sürtünmeli ve Eğik Düzlem, Üst Üste Cisimler',
    '1. Ünite: Kuvvet ve Hareket - Bir Boyutta Sabit İvmeli Hareket: Serbest Düşme ve Düşey Atış',
    '1. Ünite: Kuvvet ve Hareket - İki Boyutta Hareket: Yatay Atış ve Eğik Atış',
    '1. Ünite: Kuvvet ve Hareket - İş, Güç ve Mekanik Enerjinin Korunumu',
    '1. Ünite: Kuvvet ve Hareket - Sürtünmeli Sistemlerde Mekanik Enerji Kaybı ve Isı',
    '1. Ünite: Kuvvet ve Hareket - İtme ve Çizgisel Momentum Değişimi İlişkisi (I = ΔP)',
    '1. Ünite: Kuvvet ve Hareket - Çizgisel Momentumun Korunumu: Esnek ve Esnek Olmayan Çarpışmalar, Patlamalar',
    '1. Ünite: Kuvvet ve Hareket - Tork Kavramı ve Denge Şartları (ΣF = 0, Στ = 0)',
    '1. Ünite: Kuvvet ve Hareket - Ağırlık ve Kütle Merkezi Hesaplamaları',
    '1. Ünite: Kuvvet ve Hareket - Basit Makineler: Kaldıraç, Makaralar, Eğik Düzlem, Çıkrık, Vida, Dişli ve Kasnaklar',
    '2. Ünite: Elektrik ve Manyetizma - Coulomb Yasası ve Noktasal Yüklerin Elektrik Alanı',
    '2. Ünite: Elektrik ve Manyetizma - Elektriksel Potansiyel Enerji, Potansiyel Farkı ve Yapılan İş',
    '2. Ünite: Elektrik ve Manyetizma - Düzgün Elektrik Alan, Yüklü Paralel Levhalar ve Parçacık Hareketi',
    '2. Ünite: Elektrik ve Manyetizma - Kondansatörler (Sığaçlar), Sığa Hesabı ve Sığaçların Bağlanması',
    '2. Ünite: Elektrik ve Manyetizma - Akım Taşıyan Düz Telin, Halkanın ve Bobinin Manyetik Alanı',
    '2. Ünite: Elektrik ve Manyetizma - Manyetik Alanda Akım Taşıyan Tele ve Yüklü Parçacıklara Etki Eden Manyetik Kuvvet',
    '2. Ünite: Elektrik ve Manyetizma - Manyetik Akı ve Faraday İndüksiyon Yasası',
    '2. Ünite: Elektrik ve Manyetizma - Lenz Yasası ve Öz-İndüksiyon Akımı',
    '2. Ünite: Elektrik ve Manyetizma - Alternatif Akım (AC), Etkin Değer, İndüktans, Kapasitans ve Rezonans',
    '2. Ünite: Elektrik ve Manyetizma - Transformatörlerin Çalışma Prensibi, Verim ve Enerji İletimi',
  ],

  // 3. İLERİ KİMYA (11. Sınıf - 6 Ana Ünite)
  kimya: [
    '1. Ünite: Modern Atom Teorisi - Kuantum Sayıları (n, l, ml, ms) ve Orbital Kavramı',
    '1. Ünite: Modern Atom Teorisi - Aufbau İlkesi, Pauli İlkesi ve Hund Kuralı ile Elektron Dizilimleri',
    '1. Ünite: Modern Atom Teorisi - Küresel Simetri, Uyarılmış Hal ve İyonların Elektron Dizilimi',
    '1. Ünite: Modern Atom Teorisi - Periyodik Özelliklerin Değişimi: Atom Yarıçapı, İyonlaşma Enerjisi, Elektron İlgisi, Elektronegatiflik',
    '1. Ünite: Modern Atom Teorisi - Elementlerin Yükseltgenme Basamaklarının Belirlenmesi',
    '2. Ünite: Gazlar - Gaz Yasaları (Boyle, Charles, Gay-Lussac, Avogadro) ve İdeal Gaz Denklemi (P·V = n·R·T)',
    '2. Ünite: Gazlar - Gaz Yoğunluğu ve Gazlarda Difüzyon/Efüzyon (Graham Yasası)',
    '2. Ünite: Gazlar - Gaz Karışımları ve Kısmi Basınç (Dalton Yasası)',
    '2. Ünite: Gazlar - Gerçek Gazlar, Joule-Thomson Olayı ve Kritik Sıcaklık',
    '2. Ünite: Gazlar - Sıvıların Denge Buhar Basıncı ve Su Üstünde Gaz Toplama',
    '3. Ünite: Sıvı Çözeltiler ve Çözünürlük - Çözücü-Çözünen Etkileşimleri ve Çözünme Süreci',
    '3. Ünite: Sıvı Çözeltiler ve Çözünürlük - Derişim Birimleri: Molarite, Molalite, Kütlece Yüzde, ppm ve Mol Kesri',
    '3. Ünite: Sıvı Çözeltiler ve Çözünürlük - Koligatif Özellikler: Buhar Basıncı Alçalması (Raoult), Kaynama Noktası Yükselmesi, Donma Noktası Alçalması',
    '3. Ünite: Sıvı Çözeltiler ve Çözünürlük - Çözünürlük ve Çözünürlüğe Etki Eden Faktörler: Sıcaklık, Basınç, Ortak İyon',
    '4. Ünite: Kimyasal Tepkimelerde Enerji - Tepkime Isısı, Entalpi (ΔH), Ekzotermik ve Endotermik Tepkimeler',
    '4. Ünite: Kimyasal Tepkimelerde Enerji - Standart Oluşum Entalpileri ve Bağ Enerjileri ile ΔH Hesabı',
    '4. Ünite: Kimyasal Tepkimelerde Enerji - Hess Yasası (Tepkime Isılarının Toplanabilirliği)',
    '5. Ünite: Kimyasal Tepkimelerde Hız - Tepkime Hızı Tanımı, Takibi ve Çarpışma Teorisi',
    '5. Ünite: Kimyasal Tepkimelerde Hız - Aktifleşme Enerjisi ve Potansiyel Enerji-Tepkime Koordinatı Grafikleri',
    '5. Ünite: Kimyasal Tepkimelerde Hız - Basamaklı Tepkimelerde Hız Bağıntısı ve Hıza Etki Eden Faktörler',
    '6. Ünite: Kimyasal Denge - Kimyasal Denge Kavramı, Denge Sabitleri (Kc ve Kp Bağıntısı)',
    '6. Ünite: Kimyasal Denge - Dengeye Etki Eden Faktörler (Le Chatelier İlkesi: Sıcaklık, Derişim, Basınç/Hacim)',
    '6. Ünite: Kimyasal Denge - Sulu Çözelti Dengeleri: Suyun Otoiyonizasyonu, pH/pOH, Zayıf Asit-Baz Dengeleri (Ka, Kb)',
    '6. Ünite: Kimyasal Denge - Tampon Çözeltiler, Hidroliz ve Asit-Baz Titrasyonu',
    '6. Ünite: Kimyasal Denge - Çözünürlük Dengesi (Kçç), Çökelme Şartları ve Ortak İyon Etkisi',
  ],

  // 4. İLERİ BİYOLOJİ (11. Sınıf - İnsan Fizyolojisi & Ekoloji)
  biyoloji: [
    '1. Ünite: İnsan Fizyolojisi - Sinir Sistemi: Nöronun Yapısı, İmpuls İletimi ve Sinapslar',
    '1. Ünite: İnsan Fizyolojisi - Merkezi ve Çevresel Sinir Sistemi, Sinir Sistemi Rahatsızlıkları',
    '1. Ünite: İnsan Fizyolojisi - Endokrin Sistem: Hipofiz, Tiroit, Böbrek Üstü, Pankreas Bezleri ve Hormonları',
    '1. Ünite: İnsan Fizyolojisi - Hormonların Çalışma Mekanizması ve Geri Bildirim (Feedback)',
    '1. Ünite: İnsan Fizyolojisi - Duyu Organları: Göz, Kulak, Burun, Dil, Deri Yapısı ve İmpuls Oluşumu',
    '1. Ünite: İnsan Fizyolojisi - Destek ve Hareket Sistemi: Kemik, Kıkırdak, Eklem ve İskelet Yapısı',
    '1. Ünite: İnsan Fizyolojisi - Kas Sistemi: Kas Çeşitleri, Kayan İplikler Modeli (Huxley) ve Kas Kasılması',
    '1. Ünite: İnsan Fizyolojisi - Sindirim Sistemi: Sindirim Kanalı Organları ve Sindirime Yardımcı Organlar',
    '1. Ünite: İnsan Fizyolojisi - Besinlerin Kimyasal Sindirimi, Emilimi ve Karaciğerin Görevleri',
    '1. Ünite: İnsan Fizyolojisi - Dolaşım Sistemi: Kalbin Yapısı, Çalışması ve Damarlar (Starling Hipotezi)',
    '1. Ünite: İnsan Fizyolojisi - Kan Dokusu, Kan Hücreleri, Kan Grupları ve Lenf Dolaşımı',
    '1. Ünite: İnsan Fizyolojisi - Bağışıklık Sistemi: Doğal Bağışıklık, Özgül Bağışıklık (B ve T Lenfositler), Aşı ve Serum',
    '1. Ünite: İnsan Fizyolojisi - Solunum Sistemi: Solunum Organları, Gaz Değişimi ve Soluk Alıp Verme Mekanizması',
    '1. Ünite: İnsan Fizyolojisi - Solunum Gazlarının (O₂ ve CO₂) Kanda Taşınması ve Hemoglobin',
    '1. Ünite: İnsan Fizyolojisi - Boşaltım (Üriner) Sistemi: Böbreğin Yapısı, Nefron ve İdrar Oluşumu (Süzülme, Geri Emilim, Salgılama)',
    '1. Ünite: İnsan Fizyolojisi - Üreme Sistemi: Erkek ve Dişi Üreme Organları, Menstrüal Döngü ve Gametogenez',
    '1. Ünite: İnsan Fizyolojisi - Döllenme ve İnsanda Embriyonik Gelişim Evreleri',
    '2. Ünite: Komünite Ekolojisi - Komünite Yapısı, Rekabet, Av-Avcı İlişkisi, Simbiyotik İlişkiler ve Süksesyon',
    '2. Ünite: Popülasyon Ekolojisi - Popülasyon Dinamikleri: Yoğunluk, Taşıma Kapasitesi, Yaş Piramitleri ve Büyüme Eğrileri (J ve S Tipi)',
  ],

  // 5. TÜRK DİLİ VE EDEBİYATI (11. Sınıf - 8 Ana Ünite)
  edebiyat: [
    '1. Ünite: Giriş - Edebiyat ve Toplum İlişkisi, Edebiyatın Sanat Akımlarıyla İlişkisi (Klasisizm, Romantizm, Realizm, Natüralizm, Sembolizm, Parnasizm)',
    '2. Ünite: Hikâye - Cumhuriyet Dönemi Türk Hikâyesi (1923-1940 ve 1940-1960 Dönemi): Bireyin İç Dünyası, Toplumcu Gerçekçilik, Millî-Dini Çizgi',
    '2. Ünite: Hikâye - Dil Bilgisi: Cümlenin Ögeleri (Özne, Yüklem, Nesne, Yer Tamlayıcısı, Zarf Tümleci) ve Cümle Çözümlemeleri',
    '3. Ünite: Şiir - Tanzimat I ve II. Dönem Şiir Anlayışı, Nazım Biçimleri ve Temsilcileri',
    '3. Ünite: Şiir - Servetifünun ve Fecriati Şiirinin Özellikleri, Temsilcileri ve Edebi Tahlil',
    '3. Ünite: Şiir - Millî Edebiyat Dönemi Şiiri ve Sade Türkçecilik Hareketi',
    '3. Ünite: Şiir - Cumhuriyet Döneminin İlk Yıllarında Şiir ve Saf (Öz) Şiir Anlayışı',
    '3. Ünite: Şiir - Dil Bilgisi: Anlatım Bozuklukları (Anlamsal ve Yapısal Bozukluklar)',
    '4. Ünite: Makale - Bilimsel ve Edebi Makale Türü, Münazara Teknikleri, Tez ve Antitez',
    '5. Ünite: Sohbet ve Fıkra - Tür Özellikleri, Cumhuriyet Döneminde Sohbet ve Fıkra Yazarları',
    '6. Ünite: Roman - Cumhuriyet Dönemi Türk Romanı (1923-1950 Arası): Millî Edebiyat Zevk ve Anlayışını Sürdüren Romanlar',
    '6. Ünite: Roman - Cumhuriyet Dönemi Türk Romanı (1950-1980 Arası): Toplumcu Gerçekçi ve Bireyin İç Dünyasını Esas Alan Romanlar',
    '7. Ünite: Tiyatro - Cumhuriyet Dönemi Türk Tiyatrosu: Tür Özellikleri, Temalar ve Sahne Teknikleri',
    '8. Ünite: Eleştiri - Eleştiri Türü, Özellikleri ve Cumhuriyet Döneminde Eleştiri Yazarları',
    'Dil Bilgisi: Noktalama İşaretleri ve İmla Kuralları Kapsamlı Uygulaması',
  ],

  // 6. TARİH (11. Sınıf - 6 Ana Ünite)
  tarih: [
    '1. Ünite: Değişen Dünya Dengeleri - 1595-1700 Arası Osmanlı Siyaseti: Avusturya ve İran Savaşları (Zitvatorok, Kasr-ı Şirin)',
    '1. Ünite: Değişen Dünya Dengeleri - Karlofça (1699) ve İstanbul (1700) Antlaşmaları ile Osmanlı\'nın İlk Büyük Toprak Kaybı',
    '1. Ünite: Değişen Dünya Dengeleri - Denizlerde Egemenlik Mücadelesi: Girit Kuşatması ve Osmanlı Donanması',
    '2. Ünite: Değişim Çağında Avrupa ve Osmanlı - Rönesans, Reform, Aydınlanma Çağı ve Modern Bilimin Doğuşu',
    '2. Ünite: Değişim Çağında Avrupa ve Osmanlı - Askerî ve Mali Dönüşüm: Tımar Sisteminin Bozulması, İltizam ve Malikâne Sistemi',
    '2. Ünite: Değişim Çağında Avrupa ve Osmanlı - Osmanlı\'da Islahat Hareketleri (Lale Devri, Nizam-ı Cedit ve III. Selim Islahatları)',
    '3. Ünite: Uluslararası İlişkilerde Denge Stratejisi - Şark Meselesi ve Osmanlı Devleti\'nin Denge Politikası',
    '3. Ünite: Uluslararası İlişkilerde Denge Stratejisi - Boğazlar Sorunu (Hünkâr İskelesi, Londra Boğazlar Sözleşmesi)',
    '3. Ünite: Uluslararası İlişkilerde Denge Stratejisi - Kırım Savaşı (1853-1856), Paris Barış Antlaşması ve İlk Dış Borç',
    '3. Ünite: Uluslararası İlişkilerde Denge Stratejisi - 1877-1878 Osmanlı-Rus Harbi (93 Harbi), Ayastefanos ve Berlin Antlaşması',
    '4. Ünite: Devrimler Çağında Devlet-Toplum - Fransız İhtilali, Milliyetçilik Akımı ve Osmanlı\'da Ayrılıkçı İsyanlar (Sırp ve Yunan İsyanları)',
    '4. Ünite: Devrimler Çağında Devlet-Toplum - Sened-i İttifak, Tanzimat Fermanı (1839) ve Islahat Fermanı (1856) Karşılaştırması',
    '4. Ünite: Devrimler Çağında Devlet-Toplum - I. Meşrutiyet, Kanun-i Esasi ve II. Meşrutiyet\'in İlanı',
    '5. Ünite: Sermaye ve Emek - Sanayi İnkılabı ve Osmanlı Ekonomisine Etkileri, Baltalimanı Ticaret Sözleşmesi',
    '5. Ünite: Sermaye ve Emek - Osmanlı Devleti\'nde İflas ve Düyûn-ı Umûmiye İdaresi\'nin Kurulması',
    '6. Ünite: 19 ve 20. Yüzyılda Değişen Gündelik Hayat - Balkan Göçleri, Şehirleşme, Basın ve Modern Eğitim Kurumları',
  ],

  // 7. COĞRAFYA (11. Sınıf - 4 Ana Ünite)
  cografya: [
    '1. Ünite: Doğal Sistemler - Biyoçeşitlilik, Karasal Biyomlar ve Su Biyomları',
    '1. Ünite: Doğal Sistemler - Ekosistemin Unsurları, Madde Döngüleri (Karbon, Azot, Oksijen, Fosfor) ve Enerji Akışı',
    '1. Ünite: Doğal Sistemler - Su Ekosistemleri ve Canlı Yaşamı',
    '2. Ünite: Beşerî Sistemler - Türkiye\'de Nüfus Politikaları ve Demografik Dönüşüm Süreci',
    '2. Ünite: Beşerî Sistemler - Türkiye\'de Şehirlerin Fonksiyonları, Kır Yerleşme Tipleri ve Gecekondu Dönüşümü',
    '2. Ünite: Beşerî Sistemler - Şehirlerin Küresel, Bölgesel ve Yerel Etki Alanları (New York, Londra, Tokyo, Paris vb.)',
    '3. Ünite: Ekonomik Faaliyetler - Türkiye\'de Tarım: İntansif ve Ekstansif Yöntemler, Yetiştirilen Temel Tarım Ürünleri',
    '3. Ünite: Ekonomik Faaliyetler - Türkiye\'de Hayvancılık: Küçükbaş, Büyükbaş, Kümes, Arıcılık ve Balıkçılık',
    '3. Ünite: Ekonomik Faaliyetler - Türkiye\'nin Madenleri (Demir, Bakır, Krom, Boksit, Bor, Mermer vb.)',
    '3. Ünite: Ekonomik Faaliyetler - Türkiye\'nin Enerji Kaynakları: Yenilenemez (Kömür, Petrol, Doğal Gaz) ve Yenilenebilir (Hidroelektrik, Rüzgâr, Güneş, Jeotermal)',
    '3. Ünite: Ekonomik Faaliyetler - Türkiye\'de Sanayi: Kuruluşunu Etkileyen Faktörler ve Başlıca Sanayi Kolları',
    '4. Ünite: Çevre ve Toplum - Doğal Kaynakların Sürdürülebilir Kullanımı, Çevre Kirliliği ve Ekolojik Ayak İzi',
    '4. Ünite: Çevre ve Toplum - Küresel İklim Değişikliği, Kuraklık, Çölleşme ve Uluslararası Çevre Sözleşmeleri',
  ],

  // 8. FELSEFE GRUBU (11. Sınıf - 5 Ana Bölüm)
  felsefe: [
    '1. Ünite: MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi - İlk Neden (Arkhe) Problemi ve Doğa Filozofları (Thales, Anaksimandros, Anaksimenes, Herakleitos, Parmenides)',
    '1. Ünite: MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi - İnsan Felsefesi: Sofistler (Protagoras, Gorgias) ve Sokrates\'in Ahlak Anlayışı',
    '1. Ünite: MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi - Platon ve Aristoteles\'in Varlık, Bilgi ve Değer Anlayışı (İdealar Kuramı ve Dört Neden)',
    '2. Ünite: MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi - Hristiyan Felsefesinin Temel Özellikleri: Patristik ve Skolastik Dönem, İnanç-Akıl İlişkisi',
    '2. Ünite: MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi - İslam Felsefesi: Çeviri Faaliyetleri, El-Kindi, Farabi, İbn Sina, Gazali ve İbn Rüşd',
    '2. Ünite: MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi - Tümeller Problemi: Kavram Realizmi, Konseptüalizm ve Nominalizm',
    '3. Ünite: 15. Yüzyıl - 17. Yüzyıl Felsefesi - Rönesans Felsefesi, Hümanizm, Bilimsel Yöntem ve Kartezyen Felsefe (Descartes)',
    '4. Ünite: Psikolojiye Giriş - Psikolojinin Tanımı, Yaklaşımlar, Araştırma Yöntemleri ve Öğrenme Süreçleri',
    '5. Ünite: Sosyolojiye Giriş - Toplumsal Yapı, Toplumsal Kurumlar (Aile, Eğitim, Din), Kültür ve Toplumsal Değişme',
  ],

  // 9. İNGİLİZCE (11. Sınıf - CEFR B1+/B2 Düzeyi Temalar)
  ingilizce: [
    'Theme 1: Future Jobs & Work World - Future Continuous & Future Perfect Tenses',
    'Theme 2: Hobbies & Passions - Expressing Likes, Preferences & Stating Reasons with Gerunds/Infinitives',
    'Theme 3: Hard Times & Past Narratives - Past Habits (used to / would) & Past Perfect Tense',
    'Theme 4: What A Life! - Biographical Accounts, Legendary Achievements & Defining Relative Clauses',
    'Theme 5: Back to the Past - Conditionals Type 2 & Type 3, Regrets & Wishes (If only / I wish)',
    'Theme 6: Open Your Heart - Passive Voice in Present, Past and Modal Structures',
    'Theme 7: Facts About Turkey - Causative Verbs (have / get something done) & Cultural Heritage',
    'Theme 8: Sports & Fair Play - Modals of Deduction & Probability (must be, can\'t be, might have been)',
    'Theme 9: My Friends & Neighborhood - Non-defining Relative Clauses & Reduced Clauses',
    'Theme 10: Values & Norms - Advanced Phrasal Verbs, Indirect Speech & Academic Discourse',
  ],

  // 10. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ (11. Sınıf - 5 Ana Ünite)
  din: [
    '1. Ünite: Dünya ve Ahiret - Hayatın Anlamı, Ölüm ve Ahirete İman Esasları',
    '1. Ünite: Dünya ve Ahiret - Ahiret Hayatının Aşamaları: Berzah, Kıyamet, Ba\'s, Haşir, Mizan ve Cennet/Cehennem',
    '2. Ünite: Kur\'an\'a Göre Hz. Muhammed - Hz. Muhammed\'in Şahsiyeti, Peygamberlik Görevi (Tebliğ, Tebyin, Teşri, Temsil)',
    '2. Ünite: Kur\'an\'a Göre Hz. Muhammed - Hz. Muhammed\'e Bağlılık ve Sevgi: Ehl-i Beyt Sevgisi',
    '3. Ünite: Kur\'an\'da Bazı Kavramlar - Hidayet, İhsan ve İhlas Kavramlarının Anlam Dünyası',
    '3. Ünite: Kur\'an\'da Bazı Kavramlar - Takva, Sırat-ı Müstakim ve Cihat Kavramlarının Doğru Anlaşılması',
    '4. Ünite: İnançla İlgili Meseleler - Gençliğin İnanç Sorunları: Deizm, Agnostisizm, Nihilizm, Ateizm ve Pozitivizmin Eleştirisi',
    '4. Ünite: İnançla İlgili Meseleler - Kötülük Problemi ve İslam\'ın Teodise (Kader ve Hayır-Şer) Yaklaşımı',
    '5. Ünite: Yahudilik ve Hristiyanlık - Yahudiliğin ve Hristiyanlığın Doğuşu, Kutsal Kitapları, Temel İnanç Esasları ve Ritüelleri',
  ],
} as const;

export interface Lise3Unit {
  id: string;
  unitNumber: number;
  title: string;
  semester: 1 | 2;
  outcomes: string[];
  mebExamFocus: string; // MEB Ortak Yazılı Sınavı Konu Odakları
  aytSignificance: string; // YKS AYT Soru Çıkma Potansiyeli
}

export interface Lise3CourseDetailedMetadata {
  key: Lise3CourseKey;
  name: string;
  weeklyHours: number;
  passingThreshold: number; // Edebiyat 70, diğerleri 50
  isBarajDersi: boolean;
  tracks: (HighSchoolTrack | 'ortak')[];
  annualExamCount: number;
  mebScenarioSummary: {
    term1Exam1: string;
    term1Exam2: string; // MEB Ülke Geneli Ortak
    term2Exam1: string;
    term2Exam2: string; // MEB İl / Ülke Geneli Ortak
  };
  units: Lise3Unit[];
}

export const LISE3_DETAILED_CURRICULUM: Record<Lise3CourseKey, Lise3CourseDetailedMetadata> = {
  matematik: {
    key: 'matematik',
    name: 'İleri Matematik (11. Sınıf)',
    weeklyHours: 6,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['sayisal', 'esit_agirlik'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Yönlü açılar, birim çember, trigonometrik fonksiyonlar, indirgeme formülleri, kosinüs ve sinüs teoremleri.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Ters trigonometrik fonksiyonlar, analitik geometri (noktanın ve doğrunun analitiği, eğim, paralel ve dik doğrular).',
      term2Exam1: 'Fonksiyonların grafikleri, artan-azalanlık, tepe noktası ile parabol çizimi ve doğru-parabol durumları.',
      term2Exam2: 'İkinci dereceden eşitsizlik sistemleri, işaret tablosu, çemberde açılar ve çemberde teğet bağıntıları.',
    },
    units: [
      {
        id: 'l3-mat-u1',
        unitNumber: 1,
        title: 'Trigonometri',
        semester: 1,
        outcomes: [
          'Yönlü açıyı açıklar, açı ölçü birimlerini (derece, radyan) birbirine dönüştürür.',
          'Trigonometrik fonksiyonları birim çember yardımıyla tanımlar ve işaretlerini belirler.',
          'Kosinüs ve sinüs teoremleriyle ilgili problemler çözer.',
          'Trigonometrik fonksiyonların periyotlarını bulur ve grafiklerini çizer.',
          'Arcsin, arccos ve arctan ters fonksiyonlarını açıklar ve değerlerini hesaplar.',
        ],
        mebExamFocus: 'Birim çember üzerindeki trigonometrik özdeşlikler, indirgeme formülleri ve Kosinüs Teoremi.',
        aytSignificance: 'AYT Matematikte her yıl garanti 3-4 soru Trigonometri konusundan gelmektedir.',
      },
      {
        id: 'l3-mat-u2',
        unitNumber: 2,
        title: 'Analitik Geometri',
        semester: 1,
        outcomes: [
          'İki nokta arasındaki uzaklığı ve bir doğru parçasını belirli oranda bölen noktanın koordinatlarını bulur.',
          'Doğrunun eğimini hesaplar ve farklı durumlara göre doğru denklemlerini oluşturur.',
          'Kesişen, paralel ve çakışık doğruların denklemlerini inceler.',
          'Bir noktanın bir doğruya olan dik uzaklığını hesaplar.',
        ],
        mebExamFocus: 'Eğim formülü, iki noktası bilinen doğru denklemi ve noktanın doğruya uzaklığı.',
        aytSignificance: 'AYT Geometride 2-3 soru analitik geometri temelinden sorulmaktadır.',
      },
      {
        id: 'l3-mat-u3',
        unitNumber: 3,
        title: 'Fonksiyonlarda Uygulamalar (Parabol)',
        semester: 2,
        outcomes: [
          'Fonksiyonların grafiklerinden artanlık, azalanlık ve ortalama değişim hızını belirler.',
          'İkinci dereceden bir değişkenli fonksiyonun (parabolün) tepe noktasını ve simetri eksenini bulur.',
          'Parabol ile doğrunun kesişim durumlarını diskriminant (Δ) yardımıyla analiz eder.',
        ],
        mebExamFocus: 'Parabol tepe noktası T(r, k), simetri ekseni x = -b/2a ve parabol grafiği.',
        aytSignificance: 'AYT Matematikte doğrudan parabol ve türev/fonksiyon bileşkesi olarak 2 soru gelir.',
      },
      {
        id: 'l3-mat-u4',
        unitNumber: 4,
        title: 'Denklem ve Eşitsizlik Sistemleri',
        semester: 2,
        outcomes: [
          'İkinci dereceden iki bilinmeyenli denklem sistemlerinin çözüm kümelerini bulur.',
          'İkinci dereceden bir bilinmeyenli eşitsizliklerin işaret tablosunu yapar.',
          'İki eşitsizlikten oluşan eşitsizlik sistemlerini çözer ve koordinat düzleminde tarar.',
        ],
        mebExamFocus: 'Pay ve paydalı rasyonel eşitsizliklerde işaret tablosu ve kök çift katlılık kuralları.',
        aytSignificance: 'AYT Matematikte 1-2 soru kesinlikle eşitsizlik sistemlerinden gelmektedir.',
      },
      {
        id: 'l3-mat-u5',
        unitNumber: 5,
        title: 'Çember ve Daire',
        semester: 2,
        outcomes: [
          'Çemberde kiriş, teğet ve kesen özelliklerini kullanarak uzunluk bağıntılarını hesaplar.',
          'Çemberde merkez, çevre, teğet-kiriş, iç ve dış açı özelliklerini açıklar.',
          'Dairenin çevresini ve alanını hesaplar, daire dilimi alan problemlerini çözer.',
        ],
        mebExamFocus: 'Çemberde çevre açı ve teğet-kiriş açı ilişkisi, daire diliminin alanı formülleri.',
        aytSignificance: 'AYT Geometride 2-3 soru çemberde açı, uzunluk ve dairede alandan çıkmaktadır.',
      },
    ],
  },

  fizik: {
    key: 'fizik',
    name: 'İleri Fizik (11. Sınıf)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['sayisal'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Vektörlerin kartezyen bileşenleri, bağıl hareket, nehir problemleri, Newton hareket yasaları ve eğik düzlem.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Bir ve iki boyutta sabit ivmeli hareket (serbest düşme, yatay ve eğik atış), iş-güç ve mekanik enerji korunumu.',
      term2Exam1: 'İtme ve çizgisel momentum korunumu, çarpışmalar, tork, denge şartları ve basit makineler.',
      term2Exam2: 'Elektriksel kuvvet (Coulomb), elektrik alan, elektriksel potansiyel, paralel levhalar, sığaçlar, manyetik alan ve manyetik indüksiyon.',
    },
    units: [
      {
        id: 'l3-fiz-u1',
        unitNumber: 1,
        title: 'Kuvvet ve Hareket (Mekanik)',
        semester: 1,
        outcomes: [
          'Vektörlerin bileşkesini analitik ve bileşenlerine ayırma yöntemleriyle hesaplar.',
          'Bir ve iki boyutta bağıl hız problemlerini nehir akıntısı modelinde çözer.',
          'Net kuvvet etkisindeki cisimlerin ivmesini serbest cisim diyagramı çizerek hesaplar.',
          'Düşey ve eğik atış hareketinde uçuş süresi, maksimum yükseklik ve menzil bağıntılarını uygular.',
          'Çizgisel momentumun korunumunu esnek ve esnek olmayan çarpışmalarda modelleştirir.',
          'Tork kavramını tanımlar ve katı cisimlerin dönme dengesi şartlarını çözer.',
        ],
        mebExamFocus: 'Eğik düzlemde sürtünmeli hareket, momentum korunumu ve iki boyutta atış bağıntıları.',
        aytSignificance: 'AYT Fizik sınavının en az 6-7 sorusu (sınavın yarısı) 11. sınıf Mekanik ünitesinden gelmektedir.',
      },
      {
        id: 'l3-fiz-u2',
        unitNumber: 2,
        title: 'Elektrik ve Manyetizma',
        semester: 2,
        outcomes: [
          'Noktasal yükler arasındaki elektriksel kuvvet ve elektrik alanı formülize eder.',
          'Yüklü paralel levhalar arasındaki düzgün elektrik alanında yüklü taneciklerin hareketini inceler.',
          'Sığaçların çalışma mantığını ve alternatif akım devrelerindeki indüktif/kapasitif reaktansı açıklar.',
          'Akım geçen telin, halkanın ve bobinin oluşturduğu manyetik alan ve manyetik kuvveti sağ el kuralıyla bulur.',
          'Faraday indüksiyon kanunu ve Lenz yasasını kullanarak indüksiyon emk\'sini hesaplar.',
          'Transformatörlerin gerilim dönüştürme bağıntısını (V1/V2 = N1/N2) verimle ilişkilendirir.',
        ],
        mebExamFocus: 'Sağ el kuralı ile manyetik alan ve kuvvet, indüksiyon akımı ve transformatör bağıntıları.',
        aytSignificance: 'AYT Fizik sınavında 4-5 soru 11. sınıf Elektrik ve Manyetizma konularından gelmektedir.',
      },
    ],
  },

  kimya: {
    key: 'kimya',
    name: 'İleri Kimya (11. Sınıf)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['sayisal'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Kuantum sayıları, orbitaller, elektron dizilimleri (Aufbau, Pauli, Hund), periyodik özelliklerin değişimi ve yükseltgenme basamakları.',
      term1Exam2: 'MEB Ülke Geneli Ortak: İdeal gaz denklemi, gaz yasaları, gazlarda difüzyon (Graham) ve kısmi basınçlar (Dalton).',
      term2Exam1: 'Sıvı çözeltilerde molarite/molalite derişimleri, koligatif özellikler ve çözünürlük faktörleri, tepkime entalpisi (Hess Yasası).',
      term2Exam2: 'Tepkime hızı, çarpışma teorisi, kimyasal denge (Kc, Kp), Le Chatelier ilkesi, asit-baz dengeleri (pH/pOH) ve çözünürlük dengesi (Kçç).',
    },
    units: [
      {
        id: 'l3-kim-u1',
        unitNumber: 1,
        title: 'Modern Atom Teorisi',
        semester: 1,
        outcomes: [
          'Kuantum sayılarını (n, l, ml, ms) orbital türleriyle eşleştirir.',
          'Nötr atomların ve iyonların elektron dizilimlerini Aufbau, Pauli ve Hund kurallarına göre yazar.',
          'Periyodik cetvelde atom yarıçapı, iyonlaşma enerjisi ve elektronegatiflik değişim eğilimlerini açıklar.',
          'Bileşiklerdeki atomların yükseltgenme basamaklarını hesaplar.',
        ],
        mebExamFocus: 'Kuantum sayıları, elektron dizilimindeki küresel simetri ve iyonlaşma enerjisi sıçramaları.',
        aytSignificance: 'AYT Kimyada her yıl ilk 1-2 soru Modern Atom Teorisinden gelmektedir.',
      },
      {
        id: 'l3-kim-u2',
        unitNumber: 2,
        title: 'Gazlar',
        semester: 1,
        outcomes: [
          'Gazların özelliklerini P, V, T ve n değişkenleri ile açıklar ve İdeal Gaz Denklemini (P·V = n·R·T) uygular.',
          'Gazlarda difüzyon ve efüzyon hızlarını Graham Difüzyon Yasası ile karşılaştırır.',
          'Gaz karışımlarında Dalton Kısmi Basınçlar Yasasını ve su üstünde gaz toplama problemlerini çözer.',
        ],
        mebExamFocus: 'İdeal gaz denklemi, Graham difüzyon yasası ve su üzerinde toplanan gaz basıncı hesabı.',
        aytSignificance: 'AYT Kimyada banko 1 soru gaz yasaları veya kısmi basınç problemlerinden çıkar.',
      },
      {
        id: 'l3-kim-u3',
        unitNumber: 3,
        title: 'Sıvı Çözeltiler ve Çözünürlük',
        semester: 1,
        outcomes: [
          'Molarite, molalite, kütlece yüzde ve ppm derişim birimlerini hesaplar ve birbirine dönüştürür.',
          'Kaynama noktası yükselmesi (ebülyoskopi) ve donma noktası alçalması (kriyoskopi) problemlerini çözer.',
          'Sıcaklık ve ortak iyonun çözünürlüğe etkisini grafiklerle yorumlar.',
        ],
        mebExamFocus: 'Molarite hesabı, çözeltilerin karıştırılması ve donma noktası alçalması.',
        aytSignificance: 'AYT Kimyada 1-2 soru çözeltiler ve koligatif özelliklerden sorulmaktadır.',
      },
      {
        id: 'l3-kim-u4',
        unitNumber: 4,
        title: 'Kimyasal Tepkimelerde Enerji ve Hız',
        semester: 2,
        outcomes: [
          'Standart oluşum entalpileri ve bağ enerjilerinden yararlanarak tepkime entalpisini (ΔH) hesaplar.',
          'Hess Yasasını uygulayarak basamaklı tepkimelerin entalpisini bulur.',
          'Çarpışma teorisine göre tepkime hızını ve potansiyel enerji eğrilerini analiz eder.',
        ],
        mebExamFocus: 'Hess Yasası ile ΔH hesabı ve potansiyel enerji diyagramında aktifleşme enerjisi.',
        aytSignificance: 'AYT Kimyada 2 soru termokimya ve tepkime hızından gelmektedir.',
      },
      {
        id: 'l3-kim-u5',
        unitNumber: 5,
        title: 'Kimyasal Denge ve Sulu Çözelti Dengeleri',
        semester: 2,
        outcomes: [
          'Denge bağıntısını (Kc ve Kp) yazar ve Le Chatelier ilkesine göre dengeye etki eden faktörleri açıklar.',
          'Suyun otoiyonizasyonu üzerinden asit ve baz çözeltilerinde pH ve pOH değerlerini hesaplar.',
          'Zayıf asit ve bazların iyonlaşma dengesini (Ka, Kb) ve tampon çözeltilerin yapısını kavrar.',
          'Çözünürlük çarpımı (Kçç) bağıntısını kurarak çökelme ve ortak iyon etkisini analiz eder.',
        ],
        mebExamFocus: 'Le Chatelier prensibi, pH/pOH hesabı ve Kçç çözünürlük problemleri.',
        aytSignificance: 'AYT Kimyada 3 soru kimyasal denge, asit-baz titrasyonu ve Kçç konularından çıkmaktadır.',
      },
    ],
  },

  biyoloji: {
    key: 'biyoloji',
    name: 'İleri Biyoloji (11. Sınıf)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['sayisal'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Nöron yapısı, impuls iletimi, merkezi ve çevresel sinir sistemi, endokrin bezler ve hormonlar (feedback mekanizması), duyu organları.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Destek ve hareket sistemi (kemik, kıkırdak, kas kasılmasının kayan iplikler modeli) ve sindirim sistemi (enzimler ve emilim).',
      term2Exam1: 'Dolaşım sistemi (kalp döngüsü, Starling kılcal damar hipotezi, kan doku), bağışıklık sistemi (B ve T lenfositler) ve solunum sistemi (gazların taşınması).',
      term2Exam2: 'Üriner sistem (nefron ve idrar oluşumu), üreme sistemi ve embriyonik gelişim evreleri, komünite ve popülasyon ekolojisi.',
    },
    units: [
      {
        id: 'l3-biyo-u1',
        unitNumber: 1,
        title: 'İnsan Fizyolojisi (Denetleyici ve Destek Sistemler)',
        semester: 1,
        outcomes: [
          'İmpuls oluşumu ve iletim mekanizmasını sodyum-potasyum pompası ve polarizasyon ile açıklar.',
          'İç salgı bezlerini, ürettikleri hormonları ve geri bildirim (feedback) mekanizmalarını şemalaştırır.',
          'Duyu organlarının yapısını ve reseptörlerin çalışma prensiplerini kavrar.',
          'Kas dokusunun kasılma mekanizmasını Huxley Kayan İplikler Modeli üzerinde açıklar.',
        ],
        mebExamFocus: 'İmpuls iletim hızı etkenleri, endokrin geri bildirim ve kas kasılması biyokimyası.',
        aytSignificance: 'AYT Biyolojide her yıl 3-4 soru Denetleyici sistemler, hormonlar ve kas dokusundan gelir.',
      },
      {
        id: 'l3-biyo-u2',
        unitNumber: 2,
        title: 'İnsan Fizyolojisi (Taşıma ve Savunma Sistemleri)',
        semester: 1,
        outcomes: [
          'Sindirim organlarında besin monomerlerinin enzimlerle kimyasal sindirimini ve villuslardan emilimini açıklar.',
          'Kalbin yapısını, kapakçıklarını, kan damarlarını ve Starling Hipotezi ile madde alışverişini analiz eder.',
          'Özgül bağışıklıkta B ve T lenfositlerinin humoral ve hücresel bağışıklık rollerini karşılaştırır.',
          'Oksijen ve karbondioksitin kanda taşınma reaksiyonlarını (bikarbonat yolu) basamaklandırır.',
        ],
        mebExamFocus: 'Starling hipotezi, kılcal damarlarda kan basıncı-ozmotik basınç dengesi ve solunum gazlarının taşınması.',
        aytSignificance: 'AYT Biyolojide dolaşım, solunum ve bağışıklık konularından garanti 3 soru sorulmaktadır.',
      },
      {
        id: 'l3-biyo-u3',
        unitNumber: 3,
        title: 'İnsan Fizyolojisi (Boşaltım ve Üreme Sistemleri)',
        semester: 2,
        outcomes: [
          'Nefronun kısımlarını gösterir; süzülme, geri emilim ve salgılama basamaklarını hormonlarla ilişkilendirir.',
          'Dişi üreme sisteminde menstrüal döngüyü FSH, LH, östrojen ve progesteron hormonları ile takip eder.',
          'Spermatogenez ve oogenez süreçlerini ve embriyonik gelişim evrelerini açıklar.',
        ],
        mebExamFocus: 'Nefronda geri emilen maddeler, ADH/aldosteron hormonal dengesi ve menstrüal döngü grafiği.',
        aytSignificance: 'AYT Biyolojide nefron fizyolojisi ve üreme sisteminden 2 soru mutlaka sorulur.',
      },
      {
        id: 'l3-biyo-u4',
        unitNumber: 4,
        title: 'Komünite ve Popülasyon Ekolojisi',
        semester: 2,
        outcomes: [
          'Komünitede rekabet, av-avcı ilişkisi, mutualizm ve süksesyon süreçlerini örneklerle inceler.',
          'Popülasyon yoğunluğunu, taşıma kapasitesini ve J tipi / S tipi büyüme eğrilerini grafiklerle açıklar.',
        ],
        mebExamFocus: 'Simbiyotik ilişkiler tablosu ve popülasyon büyüme eğrisi evreleri (logaritmik artış, negatif artış).',
        aytSignificance: 'AYT Biyolojide ekoloji konusundan 1-2 soru çıkmaktadır.',
      },
    ],
  },

  edebiyat: {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı (11. Sınıf)',
    weeklyHours: 5,
    passingThreshold: 70, // MEB Baraj Dersi
    isBarajDersi: true,
    tracks: ['ortak', 'sayisal', 'esit_agirlik', 'sozel', 'dil'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Edebiyat ve toplum ilişkisi, edebi akımlar (Klasisizm, Romantizm, Realizm, Natüralizm, Parnasizm, Sembolizm), Cumhuriyet Dönemi Hikâyesi (1923-1940 ve 1940-1960), cümlenin ögeleri.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Tanzimat I ve II. Dönem şiiri, Servetifünun ve Fecriati şiiri, Millî Edebiyat Dönemi şiiri, Saf Şiir, anlatım bozuklukları.',
      term2Exam1: 'Makale, münazara, sohbet, fıkra (köşe yazısı) türleri ve Cumhuriyet Dönemi Türk Romanı (1923-1950 dönemi).',
      term2Exam2: 'Cumhuriyet Dönemi Romanı (1950-1980 dönemi), Cumhuriyet Dönemi tiyatrosu, eleştiri türü ve genel dil bilgisi.',
    },
    units: [
      {
        id: 'l3-edeb-u1',
        unitNumber: 1,
        title: 'Giriş ve Edebi Akımlar',
        semester: 1,
        outcomes: [
          'Edebiyat ile toplum ve siyaset ilişkisini metinler üzerinden açıklar.',
          'Batı edebiyatı akımlarının (Klasisizm, Romantizm, Realizm, Natüralizm, Sembolizm) felsefi temellerini kavrar.',
        ],
        mebExamFocus: 'Romantizm ile Realizm arasındaki zıtlıklar ve akımların Türk edebiyatındaki temsilcileri.',
        aytSignificance: 'AYT Edebiyatta edebi akımlardan her yıl banko 1 soru sorulmaktadır.',
      },
      {
        id: 'l3-edeb-u2',
        unitNumber: 2,
        title: 'Hikâye ve Dil Bilgisi (Cümlenin Ögeleri)',
        semester: 1,
        outcomes: [
          'Cumhuriyet Dönemi hikâyeciliğinde bireyin iç dünyasını esas alan ve toplumcu gerçekçi eserleri tahlil eder.',
          'Cümlenin temel (özne, yüklem) ve yardımcı (nesne, dolaylı tümleç, zarf tümleci) ögelerini metinlerde bulur.',
        ],
        mebExamFocus: 'Sait Faik, Sabahattin Ali hikâyeleri ve karmaşık cümlelerde öge dizilişi.',
        aytSignificance: 'AYT Edebiyatta Cumhuriyet hikâyecileri ve TYT Türkçede cümlenin ögeleri sorusu garantidir.',
      },
      {
        id: 'l3-edeb-u3',
        unitNumber: 3,
        title: 'Şiir (Tanzimat\'tan Cumhuriyet\'e Şiir)',
        semester: 1,
        outcomes: [
          'Tanzimat, Servetifünun ve Millî Edebiyat dönemi şiirlerinin tema, ölçü, dil ve zihniyet farklarını kavrar.',
          'Ahmet Haşim, Tevfik Fikret, Yahya Kemal ve Mehmet Akif Ersoy\'un şiir anlayışlarını inceler.',
          'Cümle düzeyinde anlamsal ve yapısal anlatım bozukluklarını tespit eder.',
        ],
        mebExamFocus: 'Servetifünun sanatçıları, aruz ölçüsü kullanımı ve Saf (Öz) Şiir temsilcileri.',
        aytSignificance: 'AYT Edebiyatın en yoğun soru gelen bölümüdür (Tanzimat/Servetifünun/Millî Edebiyat şiirinden 4-5 soru).',
      },
      {
        id: 'l3-edeb-u4',
        unitNumber: 4,
        title: 'Makale, Sohbet ve Fıkra',
        semester: 2,
        outcomes: [
          'Bilimsel makale ile gazete fıkrası arasındaki dil ve üslup farklarını açıklar.',
          'Münazarada savunulan tezin argümanlarını mantıksal tutarlılıkla geliştirir.',
        ],
        mebExamFocus: 'Fıkra ve sohbet türlerinin Cumhuriyet Dönemindeki önemli yazarları (Şevket Rado, Falih Rıfkı Atay).',
        aytSignificance: 'AYT Edebiyatta öğretici metinler grubundan 1 soru gelmektedir.',
      },
      {
        id: 'l3-edeb-u5',
        unitNumber: 5,
        title: 'Cumhuriyet Dönemi Romanı ve Tiyatrosu',
        semester: 2,
        outcomes: [
          '1923-1950 ve 1950-1980 Cumhuriyet romanının ana eğilimlerini, yazarlarını ve eserlerini tahlil eder.',
          'Cumhuriyet tiyatrosunun toplumsal meseleleri ele alış biçimini inceler.',
        ],
        mebExamFocus: 'Yakup Kadri, Reşat Nuri, Kemal Tahir, Orhan Kemal ve Yaşar Kemal romanları.',
        aytSignificance: 'AYT Edebiyatta Cumhuriyet Dönemi Romanı ve yazarlarından 3-4 soru çıkmaktadır.',
      },
    ],
  },

  tarih: {
    key: 'tarih',
    name: 'Tarih (11. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['ortak', 'esit_agirlik', 'sozel', 'sayisal', 'dil'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: '1595-1700 Osmanlı siyaseti, Avusturya ve İran savaşları (Zitvatorok, Kasr-ı Şirin), Karlofça ve İstanbul antlaşmaları.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Değişim çağında Avrupa (Rönesans, Reform, Aydınlanma), Osmanlı ordusunda ve maliyesinde dönüşüm (iltizam, malikâne), Lale Devri ve Nizam-ı Cedit.',
      term2Exam1: 'Şark Meselesi, Boğazlar sorunu, Kırım Savaşı (1853-1856) ve 93 Harbi (1877-1878) ile Berlin Antlaşması.',
      term2Exam2: 'Fransız İhtilali ve milliyetçilik, Sened-i İttifak, Tanzimat ve Islahat fermanları, I. ve II. Meşrutiyet, Sanayi Devrimi ve Düyûn-ı Umûmiye.',
    },
    units: [
      {
        id: 'l3-tar-u1',
        unitNumber: 1,
        title: 'Değişen Dünya Dengeleri Karşısında Osmanlı Siyaseti (1595-1774)',
        semester: 1,
        outcomes: [
          '17. yüzyılda Osmanlı Devleti\'nin Avusturya ve Safevilerle yürüttüğü mücadelelerin diplomatik sonuçlarını kavrar.',
          '1699 Karlofça Antlaşması ile başlayan gerileme dönemini ve kaybedilen toprakların etkisini analiz eder.',
        ],
        mebExamFocus: 'Zitvatorok Antlaşması\'nın mütekabiliyet ilkesi ve Karlofça Antlaşması\'nın önemi.',
        aytSignificance: 'AYT Tarih-1 ve Tarih-2 testlerinde 1-2 soru bu diplomatik antlaşmalardan gelir.',
      },
      {
        id: 'l3-tar-u2',
        unitNumber: 2,
        title: 'Değişim Çağında Avrupa ve Osmanlı',
        semester: 1,
        outcomes: [
          'Avrupa\'daki düşünce hareketlerinin (Rönesans, Reform, Akıl Çağı) kilise otoritesini yıkışını açıklar.',
          'Tımar sisteminin çözülmesiyle iltizam sistemine geçişi ve ayanların güçlenmesini inceler.',
        ],
        mebExamFocus: 'İltizam ve malikâne sistemleri, Lale Devri ıslahatları ve ilk matbaanın açılışı.',
        aytSignificance: 'AYT Tarihte Osmanlı kurumlarının bozulması ve ıslahatlar banko soru konusudur.',
      },
      {
        id: 'l3-tar-u3',
        unitNumber: 3,
        title: 'Uluslararası İlişkilerde Denge Stratejisi (1774-1914)',
        semester: 2,
        outcomes: [
          'Osmanlı Devleti\'nin büyük güçler (İngiltere, Rusya, Fransa) arasındaki rekabetten yararlanarak izlediği denge politikasını kavrar.',
          'Kırım Savaşı sonrasında imzalanan 1856 Paris Antlaşması\'nın maddelerini tahlil eder.',
          '93 Harbi ve 1878 Berlin Antlaşması ile Balkanlar\'daki toprak kayıplarını değerlendirir.',
        ],
        mebExamFocus: 'Hünkâr İskelesi Antlaşması, Londra Boğazlar Sözleşmesi ve Berlin Antlaşması hükümleri.',
        aytSignificance: 'AYT Tarih-1 testinde 2 soru doğrudan 19. yüzyıl Osmanlı dış politikasından gelir.',
      },
      {
        id: 'l3-tar-u4',
        unitNumber: 4,
        title: 'Devrimler Çağında Değişen Devlet-Toplum İlişkileri',
        semester: 2,
        outcomes: [
          'Fransız İhtilali\'nin yaydığı milliyetçilik akımının Osmanlı tebaası üzerindeki etkilerini açıklar.',
          'Sened-i İttifak, Tanzimat Fermanı ve Islahat Fermanı\'nı anayasal gelişmeler bağlamında karşılaştırır.',
          'Kanun-i Esasi\'nin ilanıyla Meşrutiyet yönetimine geçişi değerlendirir.',
        ],
        mebExamFocus: 'Tanzimat ve Islahat Fermanları arasındaki farklar ve Kanun-i Esasi hükümleri.',
        aytSignificance: 'AYT Tarihte Osmanlı demokratikleşme hareketleri mutlaka test edilir.',
      },
    ],
  },

  cografya: {
    key: 'cografya',
    name: 'Coğrafya (11. Sınıf)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['esit_agirlik', 'sozel'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Biyoçeşitlilik, karasal ve su biyomları, madde döngüleri (karbon, azot, oksijen) ve ekosistemde enerji akışı.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Türkiye\'de nüfus politikaları, şehirlerin fonksiyonları ve küresel/bölgesel etki alanları.',
      term2Exam1: 'Türkiye\'de tarım (intansif/ekstansif), hayvancılık türleri, madenler ve enerji kaynakları.',
      term2Exam2: 'Türkiye\'de sanayi kollarının dağılışı, doğal kaynakların kullanımı, çevre kirliliği ve küresel iklim değişikliği.',
    },
    units: [
      {
        id: 'l3-cog-u1',
        unitNumber: 1,
        title: 'Doğal Sistemler (Biyoçeşitlilik ve Madde Döngüleri)',
        semester: 1,
        outcomes: [
          'Biyoçeşitliliğin yeryüzüne dağılışında fiziki, paleocoğrafik ve biyolojik faktörlerin etkisini açıklar.',
          'Ekosistemdeki karbon ve azot döngüsünün canlı yaşamı için hayati önemini kavrar.',
        ],
        mebExamFocus: 'Azot döngüsünde nitrifikasyon/denitrifikasyon ve biyomların bitki-hayvan türleri.',
        aytSignificance: 'AYT Coğrafya-1 ve Coğrafya-2 testlerinin ilk 1-2 sorusu ekosistem ve biyomlardan gelir.',
      },
      {
        id: 'l3-cog-u2',
        unitNumber: 2,
        title: 'Beşerî Sistemler (Nüfus Politikaları ve Şehirler)',
        semester: 1,
        outcomes: [
          'Ülkelerin nüfus politikalarını (arttırıcı, azaltıcı, nitelik iyileştirici) Türkiye örneğinde açıklar.',
          'Şehirlerin fonksiyonel özelliklerini ve küresel etki alanlarını değerlendirir.',
        ],
        mebExamFocus: 'Cumhuriyet dönemi Türkiye nüfus politikaları ve fonksiyonel şehir tipleri.',
        aytSignificance: 'AYT Coğrafyada 1 soru Türkiye nüfusu veya küresel şehirlerden sorulur.',
      },
      {
        id: 'l3-cog-u3',
        unitNumber: 3,
        title: 'Türkiye\'nin Ekonomik Faaliyetleri',
        semester: 2,
        outcomes: [
          'Türkiye\'de tarımı etkileyen faktörleri (sulama, gübreleme, tohum ıslahı) ve tarım ürünlerinin dağılışını inceler.',
          'Türkiye\'nin madenlerini ve enerji kaynaklarını (bor, boksit, rüzgâr, jeotermal) harita üzerinde analiz eder.',
          'Sanayinin gelişmesinde hammadde, enerji, ulaşım ve pazar şartlarının rolünü kavrar.',
        ],
        mebExamFocus: 'Türkiye maden haritası, jeotermal ve hidroelektrik enerji santralleri ve sanayi tesisleri.',
        aytSignificance: 'AYT Coğrafya testinde 2-3 soru doğrudan Türkiye ekonomisi ve madenlerinden çıkar.',
      },
    ],
  },

  felsefe: {
    key: 'felsefe',
    name: 'Felsefe & Felsefe Grubu (11. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['ortak', 'esit_agirlik', 'sozel', 'sayisal', 'dil'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'MÖ 6. Yüzyıl - MS 2. Yüzyıl felsefesi, arkhe problemi, doğa filozofları, Sofistler ve Sokrates.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Platon\'un İdealar Kuramı, Aristoteles\'in Dört Neden öğretisi ve MS 2-15. yüzyıl Hristiyan felsefesi (inanç-akıl ilişkisi).',
      term2Exam1: 'İslam felsefesi (Farabi, İbn Sina, Gazali, İbn Rüşd), çeviri faaliyetleri ve tümeller problemi.',
      term2Exam2: 'Rönesans felsefesi, Kartezyen şüphe (Descartes), psikolojide öğrenme kuralları ve sosyolojide toplumsal kurumlar.',
    },
    units: [
      {
        id: 'l3-fel-u1',
        unitNumber: 1,
        title: 'MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi (İlk Çağ Doğa ve İnsan Felsefesi)',
        semester: 1,
        outcomes: [
          'Doğa filozoflarının varlığın ilk ana maddesi (arkhe) hakkındaki görüşlerini karşılaştırır.',
          'Sofistlerin görelilik (relativizm) anlayışı ile Sokrates\'in ahlak felsefesini açıklar.',
          'Platon\'un İdealar Dünyası ile Aristoteles\'in madde-form kuramını analiz eder.',
        ],
        mebExamFocus: 'Platon\'un mağara alegorisi, Aristoteles\'in altın orta kuralı ve Sofistlerin septisizmi.',
        aytSignificance: 'AYT Felsefe Grubu testinde 2 soru İlk Çağ Antik Yunan felsefesinden gelir.',
      },
      {
        id: 'l3-fel-u2',
        unitNumber: 2,
        title: 'MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi (Orta Çağ ve İslam Felsefesi)',
        semester: 1,
        outcomes: [
          'Hristiyan skolastik felsefesinde inanç-akıl dengesini ve Patristik dönemi açıklar.',
          'İslam felsefesinde akıl ve nakil ilişkisini Farabi ve İbn Sina düşünceleri üzerinden inceler.',
          'Gazali ile İbn Rüşd arasındaki nedensellik ve tehafüt tartışmasını değerlendirir.',
        ],
        mebExamFocus: 'Farabi\'nin Erdemli Şehir (El-Medinetü\'l Fazıla) anlayışı ve İbn Rüşd\'ün akılcılığı.',
        aytSignificance: 'AYT Felsefe Grubu testinde 1 soru İslam felsefesi ekollerinden çıkmaktadır.',
      },
    ],
  },

  ingilizce: {
    key: 'ingilizce',
    name: 'İngilizce (11. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['ortak', 'dil', 'sayisal', 'esit_agirlik', 'sozel'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Future Continuous and Future Perfect tenses, expressing preferences with gerund/infinitive, past habits (used to / would).',
      term1Exam2: 'MEB Ülke Geneli Ortak: Defining relative clauses, Conditionals Type 2 and Type 3, wishes and regrets (If only / I wish).',
      term2Exam1: 'Passive voice across multiple tenses, causative verbs (have/get something done), modals of past deduction (must have done, can\'t have done).',
      term2Exam2: 'Non-defining and reduced relative clauses, advanced phrasal verbs, indirect speech and academic reading comprehension.',
    },
    units: [
      {
        id: 'l3-ing-u1',
        unitNumber: 1,
        title: 'Theme 1 & 2: Future Outlook and Life Choices',
        semester: 1,
        outcomes: [
          'Future Continuous (will be doing) ve Future Perfect (will have done) zamanlarını doğru bağlamda kullanır.',
          'Gelecek meslekleri ve kariyer hedefleri üzerine akademik düzeyde paragraf oluşturur.',
        ],
        mebExamFocus: 'Time expressions for Future Perfect ("by next year", "by the time") and verb conjugations.',
        aytSignificance: 'YKS Dil (YDT) sınavında zaman uyumları (Tense Agreement) sorularının temelidir.',
      },
      {
        id: 'l3-ing-u2',
        unitNumber: 2,
        title: 'Theme 3 & 4 & 5: Past Narratives, Relatives & Conditionals',
        semester: 1,
        outcomes: [
          'Conditionals Type 2 (hayali şimdiki zaman) ve Type 3 (geçmişteki pişmanlıklar) cümlelerini kurar.',
          'Defining Relative Clauses ile isimleri niteleyen birleşik cümleler oluşturur.',
        ],
        mebExamFocus: 'Third Conditional (If + Past Perfect, would have V3) ve "I wish / If only" kalıpları.',
        aytSignificance: 'YDT (Yabancı Dil Testi) sınavında 4-5 soru doğrudan Conditionals ve Relative Clauses yapılarından çıkar.',
      },
    ],
  },

  din: {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi (11. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    tracks: ['ortak', 'sayisal', 'esit_agirlik', 'sozel', 'dil'],
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Hayatın anlamı ve ahirete iman, berzah, kıyamet, ba\'s, haşir, mizan ve cennet/cehennem aşamaları.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Hz. Muhammed\'in şahsiyeti ve peygamberlik görevleri (tebliğ, tebyin, teşri, temsil), Ehl-i Beyt sevgisi.',
      term2Exam1: 'Kur\'an\'da bazı temel kavramlar: Hidayet, ihsan, ihlas, takva, sırat-ı müstakim ve cihat kavramlarının doğru anlaşılması.',
      term2Exam2: 'İnançla ilgili modern felsefi akımların analizi (deizm, agnostisizm, nihilizm, ateizm), kötülük problemi ve İslam\'ın teodise cevabı, Yahudilik ve Hristiyanlık.',
    },
    units: [
      {
        id: 'l3-din-u1',
        unitNumber: 1,
        title: 'Dünya ve Ahiret Hayatı',
        semester: 1,
        outcomes: [
          'Ahiret hayatının aşamalarını (berzah, kıyamet, ba\'s, mahşer, mizan) ayetlerle temellendirir.',
          'Ahiret inancının insanın dünya hayatındaki sorumluluk bilincine ve ahlaki davranışlarına etkisini kavrar.',
        ],
        mebExamFocus: 'Ahiret evreleri sıralaması ve ba\'s (yeniden diriliş) ile mizan (tartı) kavramları.',
        aytSignificance: 'AYT Din Kültürü ve Ahlak Bilgisi testinde 1 soru ahiret inancından gelir.',
      },
      {
        id: 'l3-din-u2',
        unitNumber: 2,
        title: 'İnançla İlgili Meseleler ve Modern Akımlar',
        semester: 2,
        outcomes: [
          'Deizm, agnostisizm, pozitivizm, nihilizm ve ateizm akımlarının temel iddialarını ve çelişkilerini açıklar.',
          'Kötülük problemine karşı İslam inancının hayır-şer, imtihan ve irade dengesi cevabını temellendirir.',
        ],
        mebExamFocus: 'Deizm (Tanrı yaratır ama karışmaz iddiası) ve agnostisizm (bilinemezcilik) tanımları.',
        aytSignificance: 'TYT ve AYT Din Kültüründe felsefi inanç akımları sorusu düzenli olarak çıkmaktadır.',
      },
    ],
  },
};

/**
 * Belirli bir derse ait detaylı 11. sınıf müfredat verisini getirir.
 */
export function getLise3CourseMetadata(key: Lise3CourseKey): Lise3CourseDetailedMetadata {
  return LISE3_DETAILED_CURRICULUM[key];
}

/**
 * Öğrencinin seçtiği akademik alana (Sayısal, EA, Sözel, Dil) göre
 * 11. sınıfta sorumlu olduğu ders listesini filtreler.
 */
export function getLise3CoursesByTrack(track: HighSchoolTrack): Lise3CourseOption[] {
  return LISE3_COURSE_OPTIONS.filter(
    (c) => c.tracks.includes('ortak') || c.tracks.includes(track)
  );
}

/**
 * 11. Sınıf dönemi ve sınav numarasına göre MEB sınav odak konularını getirir.
 */
export function getLise3ExamTopicsForSemester(
  courseKey: Lise3CourseKey,
  semester: 1 | 2,
  examNumber: 1 | 2
): string {
  const meta = LISE3_DETAILED_CURRICULUM[courseKey];
  if (!meta) return '';
  if (semester === 1) {
    return examNumber === 1 ? meta.mebScenarioSummary.term1Exam1 : meta.mebScenarioSummary.term1Exam2;
  }
  return examNumber === 1 ? meta.mebScenarioSummary.term2Exam1 : meta.mebScenarioSummary.term2Exam2;
}
