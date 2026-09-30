import type { LgsCourseKey } from '@/types/exam';

/**
 * SınavKoçu.ai - MEB TTKB 8. Sınıf LGS Resmi Kazanım ve Müfredat İskeleti (2026-2027)
 * Milli Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı kılavuzuna %100 uyumludur.
 */

export interface LgsUnitConfig {
  unitNumber: number;
  unitName: string;
  topicName: string;
  kazanimlar: readonly string[];
}

export interface LgsCourseMetadata {
  key: LgsCourseKey;
  name: string;
  shortName: string;
  session: 'sozel' | 'sayisal';
  questionCount: number;
  weight: number; // Standart puan katsayısı (Mat: 4, Fen: 4, Türkçe: 4, İnkılap: 1, Din: 1, İng: 1)
  suggestedDurationMinutes: number;
  description: string;
}

/**
 * LGS Dersleri Resmi Katsayı ve Oturum Üst Verileri
 */
export const LGS_COURSE_METADATA: Record<LgsCourseKey, LgsCourseMetadata> = {
  turkce: {
    key: 'turkce',
    name: 'Türkçe',
    shortName: 'Türkçe',
    session: 'sozel',
    questionCount: 20,
    weight: 4,
    suggestedDurationMinutes: 35,
    description: 'Okuduğunu anlama, çıkarım yapma, dil bilgisi ve sözel mantık muhakeme becerileri.',
  },
  matematik: {
    key: 'matematik',
    name: 'Matematik',
    shortName: 'Matematik',
    session: 'sayisal',
    questionCount: 20,
    weight: 4,
    suggestedDurationMinutes: 45,
    description: 'Sayısal mantık, analitik düşünme, modelleme ve yeni nesil problem çözme yetkinlikleri.',
  },
  fen: {
    key: 'fen',
    name: 'Fen Bilimleri',
    shortName: 'Fen',
    session: 'sayisal',
    questionCount: 20,
    weight: 4,
    suggestedDurationMinutes: 35,
    description: 'Deney tasarımı, tablo/grafik analizi, bilimsel süreç becerileri ve çevre bilinci.',
  },
  inkilap: {
    key: 'inkilap',
    name: 'T.C. İnkılap Tarihi ve Atatürkçülük',
    shortName: 'İnkılap',
    session: 'sozel',
    questionCount: 10,
    weight: 1,
    suggestedDurationMinutes: 15,
    description: 'Tarihsel kronoloji, harita okuma, kavram bilgisi ve Atatürk ilke/inkılapları.',
  },
  din: {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    shortName: 'Din Kültürü',
    session: 'sozel',
    questionCount: 10,
    weight: 1,
    suggestedDurationMinutes: 15,
    description: 'Ayet/hadis yorumlama, temel ahlaki değerler, evrensel yasalar ve paylaşma bilinci.',
  },
  ingilizce: {
    key: 'ingilizce',
    name: 'Yabancı Dil (İngilizce)',
    shortName: 'İngilizce',
    session: 'sozel',
    questionCount: 10,
    weight: 1,
    suggestedDurationMinutes: 15,
    description: 'Durumsal diyalog tamamlama, okuduğunu anlama ve kelime bilgisi yetkinliği.',
  },
};

/**
 * 8. Sınıf LGS Resmi MEB Ünite ve Detaylı Kazanım Haritası
 */
export const LGS_DETAILED_CURRICULUM: Record<LgsCourseKey, readonly LgsUnitConfig[]> = {
  matematik: [
    {
      unitNumber: 1,
      unitName: '1. Ünite: Çarpanlar ve Katlar & Üslü İfadeler',
      topicName: 'Çarpanlar ve Katlar (EBOB - EKOK) & Üslü İfadeler',
      kazanimlar: [
        'Pozitif tam sayıların pozitif tam sayı çarpanlarını bulma ve asal çarpanlarına ayırma',
        'İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplama ve problemleri çözme',
        'Verilen iki doğal sayının aralarında asal olup olmadığını belirleme',
        'Tam sayıların tam sayı kuvvetlerini hesaplama ve üslü ifadelerle çarpma/bölme kuralları',
        'Sayıların ondalık gösterimlerini 10’un tam sayı kuvvetlerini kullanarak çözümleme',
        'Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade etme ve karşılaştırma',
      ],
    },
    {
      unitNumber: 2,
      unitName: '2. Ünite: Kareköklü İfadeler & Veri Analizi',
      topicName: 'Kareköklü İfadeler & Veri Analizi',
      kazanimlar: [
        'Tam kare pozitif tam sayılarla bu sayıların karekökleri arasındaki ilişkiyi belirleme',
        'Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu tahmin etme',
        'Kareköklü bir ifadeyi a√b şeklinde yazma ve a√b şeklindeki ifadede katsayıyı kök içine alma',
        'Kareköklü ifadelerde çarpma, bölme, toplama ve çıkarma işlemlerini yapma',
        'Gerçek sayıları rasyonel ve irrasyonel sayılar olarak sınıflandırma',
        'En fazla üç veri grubuna ait çizgi, sütun ve daire grafiklerini yorumlama ve birbirine dönüştürme',
      ],
    },
    {
      unitNumber: 3,
      unitName: '3. Ünite: Basit Olayların Olma Olasılığı & Cebirsel İfadeler',
      topicName: 'Basit Olayların Olma Olasılığı & Cebirsel İfadeler ve Özdeşlikler',
      kazanimlar: [
        'Bir olaya ait olası durumları belirleme ve eşit şansa sahip olayları analiz etme',
        'Olasılık değerinin 0 (imkânsız) ile 1 (kesin) arasında olduğunu bilme ve hesaplama',
        'Basit bir olayın olma olasılığını istenen durum sayısı / tüm durum sayısı formülüyle bulma',
        'Basit cebirsel ifadeleri anlama ve farklı biçimlerde yazma',
        'Cebirsel ifadelerin çarpımını yapma ve geometrik modellerle gösterme',
        'Tam kare özdeşlikleri (a+b)², (a-b)² ve iki kare farkı özdeşliğini (a²-b²) modelleme ve kullanma',
        'Cebirsel ifadeleri ortak çarpan parantezine alma ve özdeşliklerden yararlanarak çarpanlarına ayırma',
      ],
    },
    {
      unitNumber: 4,
      unitName: '4. Ünite: Doğrusal Denklemler & Eşitsizlikler',
      topicName: 'Doğrusal Denklemler, Eğim ve Eşitsizlikler',
      kazanimlar: [
        'Birinci dereceden bir bilinmeyenli denklemleri çözme ve problem kurgulama',
        'Koordinat sistemini özellikleriyle tanıma ve sıralı ikilileri gösterme',
        'Aralarında doğrusal ilişki bulunan iki değişkenden birinin diğerine bağlı değişim tablosunu ve grafiğini çizme',
        'Doğrusal denklemlerin grafiğini çizme (orijinden geçen, eksenleri kesen, eksenlere paralel)',
        'Doğrunun eğimini modellerle açıklama, dikey uzunluğun yatay uzunluğa oranı olarak hesaplama',
        'Birinci dereceden bir bilinmeyenli eşitsizlikleri sayı doğrusunda gösterme ve çözme',
      ],
    },
    {
      unitNumber: 5,
      unitName: '5. Ünite: Üçgenler & Eşlik ve Benzerlik',
      topicName: 'Üçgenler (Açı-Kenar Bağıntıları, Pisagor) & Eşlik-Benzerlik',
      kazanimlar: [
        'Üçgende kenarortay, açıortay ve yüksekliği inşa etme ve özelliklerini belirleme',
        'Üçgenin iki kenar uzunluğunun toplamı veya farkı ile üçüncü kenar uzunluğu arasındaki ilişkiyi (üçgen eşitsizliği) kurma',
        'Üçgenin kenar uzunlukları ile bu kenarların karşısındaki açıların ölçülerini ilişkilendirme',
        'Yeterli sayıda elemanının ölçüleri verilen bir üçgeni pergel, cetvel ve iletkiyle çizme',
        'Pisagor bağıntısını oluşturma ve dik üçgen problemlerini çözme',
        'Eş ve benzer çokgenlerin kenar ve açı ilişkilerini belirleme, benzerlik oranını kullanma',
      ],
    },
    {
      unitNumber: 6,
      unitName: '6. Ünite: Dönüşüm Geometrisi & Geometrik Cisimler',
      topicName: 'Dönüşüm Geometrisi & Geometrik Cisimler (Prizma, Silindir, Koni)',
      kazanimlar: [
        'Nokta, doğru parçası ve diğer şekillerin öteleme ve yansıma sonucundaki görüntülerini çizme',
        'Dik prizmaları tanıma, temel elemanlarını belirleme, açınımlarını çizme',
        'Dik dairesel silindirin temel elemanlarını belirleme, açınımını çizme ve yüzey alanı bağıntısını kullanma',
        'Dik piramidi ve dik koniyi tanıma, temel elemanlarını belirleme ve açınımlarını inceleme',
      ],
    },
  ],

  fen: [
    {
      unitNumber: 1,
      unitName: '1. Ünite: Mevsimler ve İklim',
      topicName: 'Mevsimler ve İklim (Eksen Eğikliği, Hava Hareketleri)',
      kazanimlar: [
        'Mevsimlerin oluşumuna yönelik Dünya’nın dönme ekseni eğikliği ve dolanma hareketinin etkisini açıklama',
        'İklim ve hava olayları arasındaki farkları ayırt etme',
        'İklim biliminin (klimatoloji) ve meteorolojinin çalışma alanlarını inceleme',
        'Küresel iklim değişikliklerinin nedenlerini ve olası sonuçlarını değerlendirme',
      ],
    },
    {
      unitNumber: 2,
      unitName: '2. Ünite: DNA ve Genetik Kod',
      topicName: 'DNA ve Genetik Kod, Kalıtım & Biyoteknoloji',
      kazanimlar: [
        'Nükleotid, gen, DNA ve kromozom kavramlarını karmaşıktan basite doğru ilişkilendirme',
        'DNA’nın yapısını model üzerinde gösterme ve kendini eşleme mekanizmasını açıklama',
        'Kalıtım ile ilgili kavramları (genotip, fenotip, saf döl, melez döl, baskın ve çekinik gen) tanımlama',
        'Tek karakter çaprazlamaları ile ilgili problemler çözerek olasılıkları belirleme',
        'Akraba evliliklerinin genetik sonuçlarını tartışma',
        'Mutasyon ve modifikasyon arasındaki farkları örneklerle açıklama',
        'Canlıların belirli çevre koşullarına uyumunu (adaptasyon) doğal seçilim ve varyasyonla ilişkilendirme',
        'Genetik mühendisliği ve biyoteknoloji uygulamalarını olumlu/olumsuz etkileriyle değerlendirme',
      ],
    },
    {
      unitNumber: 3,
      unitName: '3. Ünite: Basınç',
      topicName: 'Basınç (Katı, Sıvı ve Gaz Basıncı)',
      kazanimlar: [
        'Katı basıncını etkileyen değişkenleri (kuvvet/ağırlık ve yüzey alanı) deneyerek keşfetme',
        'Sıvı basıncını etkileyen değişkenleri (derinlik ve sıvı yoğunluğu) analiz etme',
        'Pascal prensibini açıklama ve hidrolik sistemlerdeki günlük yaşam uygulamalarını örneklendirme',
        'Açık hava basıncının ve gazların basıncının varlığını kanıtlayan deneyleri açıklama',
      ],
    },
    {
      unitNumber: 4,
      unitName: '4. Ünite: Madde ve Endüstri',
      topicName: 'Madde ve Endüstri (Periyodik Sistem, Tepkimeler, Asit-Baz, Isı)',
      kazanimlar: [
        'Periyodik sistemde grup ve periyotların nasıl oluştuğunu ve elementlerin sınıflandırılmasını (metal, ametal, yarı metal, soygaz) açıklama',
        'Fiziksel ve kimyasal değişim arasındaki farkları atomik ve gözlemsel boyutta ayırt etme',
        'Kimyasal tepkimelerin özelliklerini, atom sayısının ve kütlenin korunumunu formüllerle açıklama',
        'Asit ve bazların genel özelliklerini, pH ölçeğini ve ayıraçları (turnusol, fenolftalein vb.) tanıma',
        'Asit yağmurlarının çevreye etkilerini ve alınabilecek önlemleri tartışma',
        'Maddenin ısı ile etkileşimi: Öz ısı kavramını açıklama ve sıcaklık değişimiyle ilişkilendirme',
        'Türkiye’de kimya endüstrisinin gelişimini ve meslek alanlarını tanıma',
      ],
    },
    {
      unitNumber: 5,
      unitName: '5. Ünite: Basit Makineler',
      topicName: 'Basit Makineler (Makaralar, Kaldıraç, Eğik Düzlem, Çıkrık)',
      kazanimlar: [
        'Basit makinelerin sağladığı avantajları (kuvvet kazancı, iş kolaylığı, enerjiden kazanç olmaması) açıklama',
        'Sabit ve hareketli makaralar ile palanga sistemlerinde kuvvet ve yol ilişkisini inceleme',
        'Kaldıraç türlerini (desteğin, yükün veya kuvvetin ortada olduğu durumlar) örneklendirme ve denge şartını hesaplama',
        'Eğik düzlemde kuvvet kazancının eğim ve boy ile ilişkisini belirleme',
        'Çıkrık, dişli çarklar, kasnaklar ve vida gibi mekanizmaların çalışma prensiplerini analiz etme',
      ],
    },
    {
      unitNumber: 6,
      unitName: '6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi',
      topicName: 'Enerji Dönüşümleri (Besin Zinciri, Fotosentez, Solunum) & Madde Döngüleri',
      kazanimlar: [
        'Besin zincirindeki üretici, tüketici ve ayrıştırıcı ilişkilerini enerji piramidi üzerinde gösterme',
        'Fotosentezin canlılar için önemini ve fotosentez hızını etkileyen faktörleri (ışık şiddeti, CO₂ miktarı, sıcaklık vb.) açıklama',
        'Oksijenli ve oksijensiz solunum arasındaki farkları ve enerji üretimini karşılaştırma',
        'Madde döngülerini (su, karbon, oksijen ve azot döngüleri) şemalarla açıklama',
        'Ekolojik ayak izini azaltmaya yönelik sürdürülebilir kalkınma uygulamalarını tartışma',
      ],
    },
    {
      unitNumber: 7,
      unitName: '7. Ünite: Elektrik Yükleri ve Elektrik Enerjisi',
      topicName: 'Elektrik Yükleri, Elektriklenme & Elektrik Enerjisinin Dönüşümü',
      kazanimlar: [
        'Elektrik yüklerini ve sürtünme, dokunma, etki ile elektriklenme çeşitlerini açıklama',
        'Elektroskopun çalışma prensibini ve cisimlerin yük durumunu belirlemedeki rolünü açıklama',
        'Yıldırım ve şimşek olaylarını elektrik yükleri açısından ilişkilendirme ve topraklamanın önemini belirtme',
        'Elektrik enerjisinin ısı, ışık ve hareket enerjisine dönüşümünü sağlayan araçları tanıma',
        'Elektrik enerjisinin güvenli kullanımı için sigorta kullanımının önemini açıklama',
      ],
    },
  ],

  turkce: [
    {
      unitNumber: 1,
      unitName: '1. Ünite: Fiilimsiler (Eylemsiler)',
      topicName: 'Fiilimsiler (İsim-fiil, Sıfat-fiil, Zarf-fiil)',
      kazanimlar: [
        'Fiilimsilerin özelliklerini ve fiilden türeyerek isim, sıfat veya zarf görevi üstlendiğini kavrama',
        'İsim-fiil (-ma/-me, -mak/-mek, -ış/-iş), sıfat-fiil (-an, -ası, -mez, -ar, -dik, -ecek, -miş) ve zarf-fiil eklerini ayırt etme',
        'Kalıcı isim haline gelmiş sözcükler ile fiilimsileri ayırt etme (ör. sarma, çakmak, dolmuş)',
        'Sıfat-fiillerin adlaşmış sıfat-fiil haline gelme durumunu belirleme',
      ],
    },
    {
      unitNumber: 2,
      unitName: '2. Ünite: Sözcükte ve Cümlede Anlam',
      topicName: 'Sözcükte Anlam, Deyimler & Cümlede Anlam İlişkileri',
      kazanimlar: [
        'Sözcüklerin gerçek, mecaz ve terim anlamlarını metin bağlamında ayırt etme',
        'Deyim, atasözü ve özdeyişlerin metne kattığı anlamı belirleme',
        'Neden-sonuç, amaç-sonuç, koşul-sonuç ve karşılaştırma cümlelerini tespit etme',
        'Örtülü anlamı, doğrudan ve dolaylı anlatımı, öznel ve nesnel yargıları ayırt etme',
      ],
    },
    {
      unitNumber: 3,
      unitName: '3. Ünite: Paragrafta Anlam & Anlatım Teknikleri',
      topicName: 'Paragrafta Anlam (Ana Fikir, Yardımcı Fikirler) & Anlatım Biçimleri',
      kazanimlar: [
        'Paragrafın ana fikrini (ana düşüncesini) ve konusunu doğru belirleme',
        'Paragraftaki yardımcı fikirleri ve çıkarılamayacak yargıları tespit etme',
        'Paragraf tamamlama, akışı bozan cümleyi bulma ve paragrafı ikiye bölme sorularını çözme',
        'Anlatım biçimlerini (açıklama, tartışma, öyküleme, betimleme) metin üzerinde ayırt etme',
        'Düşünceyi geliştirme yollarını (tanımlama, örnekleme, tanık gösterme, karşılaştırma, sayısal verilerden yararlanma) belirleme',
      ],
    },
    {
      unitNumber: 4,
      unitName: '4. Ünite: Cümlenin Ögeleri & Fiilde Çatı',
      topicName: 'Cümlenin Ögeleri & Fiilde Çatı Özellikleri',
      kazanimlar: [
        'Temel ögeleri (yüklem ve özne) ve yardımcı ögeleri (nesne, yer tamlayıcısı, zarf tamlayıcısı) doğru ayırma',
        'Cümlede vurgulanan ögeyi ve ara söz / ara cümleleri belirleme',
        'Öznesine göre fiil çatılarını (etken ve edilgen fiiller, sözde özne) ayırt etme',
        'Nesnesine göre fiil çatılarını (geçişli ve geçişsiz fiiller) ayırt etme',
      ],
    },
    {
      unitNumber: 5,
      unitName: '5. Ünite: Cümle Türleri & Yazım-Noktalama',
      topicName: 'Cümle Türleri, Yazım Kuralları & Noktalama İşaretleri',
      kazanimlar: [
        'Yüklemin türüne göre (isim ve fiil) ve yerine göre (kurallı ve devrik) cümleleri sınıflandırma',
        'Anlamına göre (olumlu, olumsuz, soru, ünlem) cümleleri ayırt etme',
        'Yapısına göre cümleleri (tek yüklemli/basit, fiilimsili/birleşik, birden çok yüklemli/sıralı, bağlacı olan/bağlı) tanıma',
        'Büyük harflerin yazımı, sayıların yazımı, de/ki/mi ek ve bağlaçlarının yazım kurallarını uygulama',
        'Nokta, virgül, noktalı virgül, iki nokta, üç nokta, tırnak ve kesme işaretini yerinde kullanma',
      ],
    },
    {
      unitNumber: 6,
      unitName: '6. Ünite: Metin Türleri, Söz Sanatları & Sözel Mantık',
      topicName: 'Metin Türleri, Söz Sanatları & Görsel/Grafik Mantık Muhakeme',
      kazanimlar: [
        'Olay yazıları (hikâye, roman, masal, fabl, anı, günlük) ile düşünce yazılarını (deneme, makale, fıkra, söyleşi, biyografi, otobiyografi) ayırt etme',
        'Söz sanatlarını (teşbih/benzetme, teşhis/kişileştirme, intak/konuşturma, tezat/karşıtlık, mübalağa/abartma) belirleme',
        'Görsel, grafik, infografik ve tablo yorumlama sorularında analitik çıkarım yapma',
        'Sözel mantık kurallarına göre sıralama, yerleştirme, eşleştirme ve şifreleme problemlerini çözme',
      ],
    },
  ],

  inkilap: [
    {
      unitNumber: 1,
      unitName: '1. Ünite: Bir Kahraman Doğuyor',
      topicName: 'Bir Kahraman Doğuyor (Mustafa Kemal\'in Yetişmesi ve Askerlik Hayatı)',
      kazanimlar: [
        '19. yüzyıl başlarında Osmanlı Devleti’nin siyasi, sosyal ve ekonomik durumunu analiz etme',
        'Mustafa Kemal’in çocukluk dönemini ve öğrenim hayatını (Selanik, Manastır, İstanbul) değerlendirme',
        'Mustafa Kemal’in fikir hayatının oluşumuna etki eden yerli ve yabancı düşünürleri tanıma',
        'Mustafa Kemal’in askeri görevlerinde (Şam, 31 Mart Vakası, Trablusgarp, Balkan Savaşları, Çanakkale) edindiği tecrübeleri ilişkilendirme',
      ],
    },
    {
      unitNumber: 2,
      unitName: '2. Ünite: Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
      topicName: 'Millî Uyanış (I. Dünya Savaşı, Mondros, Genelgeler ve TBMM)',
      kazanimlar: [
        'I. Dünya Savaşı’nın sebeplerini ve Osmanlı Devleti’nin savaştığı cepheleri (Kafkas, Çanakkale, Kanal vb.) değerlendirme',
        'Mondros Ateşkes Antlaşması’nın imzalanması ve işgaller karşısında oluşan cemiyetler ile Kuvâ-yı Millîye hareketini kavrama',
        'Mustafa Kemal’in Samsun’a çıkışı, Havza ve Amasya Genelgeleri, Erzurum ve Sivas Kongreleri ile milli iradeyi örgütleme sürecini açıklama',
        'Misakımilli kararlarını ve İstanbul’un resmen işgali sonrasında Ankara’da TBMM’nin açılışını analiz etme',
        'TBMM’ye karşı çıkan ayaklanmaları ve Sevr Barış Antlaşması’nın Türk milleti tarafından reddedilişini kavrama',
      ],
    },
    {
      unitNumber: 3,
      unitName: '3. Ünite: Millî Bir Destan: Ya İstiklal Ya Ölüm!',
      topicName: 'Millî Bir Destan: Ya İstiklal Ya Ölüm! (Kurtuluş Savaşı Cepheleri ve Lozan)',
      kazanimlar: [
        'Doğu Cephesi’nde Ermenilere karşı verilen mücadeleyi ve Gümrü Antlaşması’nı açıklama',
        'Güney Cephesi’nde Fransız ve Ermeni çetelerine karşı sergilenen Kuva-yı Milliye direnişini (Maraş, Antep, Urfa) değerlendirme',
        'Batı Cephesi’nde Düzenli Ordu’nun I. ve II. İnönü Muharebelerindeki başarılarını ve Londra Konferansı’nı kavrama',
        'Kütahya-Eskişehir Muharebeleri sürecinde toplanan Maarif Kongresi’nin eğitime verilen önemi gösterdiğini açıklama',
        'Tekâlif-i Milliye Emirleri doğrultusunda Türk milletinin topyekûn fedakârlığını analiz etme',
        'Sakarya Meydan Muharebesi’nin askeri ve diplomatik sonuçlarını değerlendirme',
        'Büyük Taarruz ve Başkomutanlık Meydan Muharebesi, Mudanya Ateşkesi ve Lozan Barış Antlaşması’nın bağımsızlığa katkısını açıklama',
      ],
    },
    {
      unitNumber: 4,
      unitName: '4. Ünite: Atatürkçülük ve Çağdaşlaşan Türkiye',
      topicName: 'Atatürkçülük ve Çağdaşlaşan Türkiye (Atatürk İlkeleri ve İnkılaplar)',
      kazanimlar: [
        'Atatürk ilkelerini (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık) ve bütünleyici ilkeleri tanımlama',
        'Siyasi alandaki inkılapları (Saltanatın kaldırılması, Ankara’nın başkent oluşu, Cumhuriyetin ilanı, Halifeliğin kaldırılması) analiz etme',
        'Hukuk alanındaki gelişmeleri ve Türk Medeni Kanunu’nun kadın haklarına getirdiği kazanımları değerlendirme',
        'Eğitim ve kültür alanındaki inkılapları (Tevhid-i Tedrisat Kanunu, Harf İnkılabı, Türk Tarih ve Dil Kurumları) açıklama',
        'Toplumsal alanda yapılan inkılapları (Kılık kıyafet, tekke ve zaviyelerin kapatılması, takvim-saat-ölçü değişikliği, Soyadı Kanunu) özetleme',
        'Ekonomi alanındaki gelişmeleri (İzmir İktisat Kongresi, Kabotaj Kanunu, Teşvik-i Sanayi, tarım ve sanayi hamleleri) değerlendirme',
      ],
    },
    {
      unitNumber: 5,
      unitName: '5. Ünite: Demokratikleşme Çabaları',
      topicName: 'Demokratikleşme Çabaları (Çok Partili Hayat Denemeleri ve Menemen)',
      kazanimlar: [
        'Atatürk döneminde çok partili hayata geçiş denemelerini (CHP, Terakkiperver Cumhuriyet Fırkası, Serbest Cumhuriyet Fırkası) açıklama',
        'Cumhuriyete ve laik düzene yönelik tepkileri (Şeyh Sait İsyanı, Menemen Olayı, Atatürk’e Suikast Girişimi) analiz etme',
      ],
    },
    {
      unitNumber: 6,
      unitName: '6. Ünite: Atatürk Dönemi Türk Dış Politikası',
      topicName: 'Atatürk Dönemi Türk Dış Politikası (Montrö, Hatay, Paktlar)',
      kazanimlar: [
        'Atatürk dönemi Türk dış politikasının temel ilkelerini (tam bağımsızlık, gerçekçilik, barışçılık) kavramak',
        'Yabancı okullar meselesi, nüfus mübadelesi ve Musul sorununun diplomatik çözüm süreçlerini değerlendirme',
        'Montrö Boğazlar Sözleşmesi ile Boğazlar üzerindeki tam egemenliğin sağlanmasını açıklama',
        'Balkan Antantı ve Sadabat Paktı’nın bölgesel barışa katkısını analiz etme',
        'Hatay’ın ana vatana katılma sürecini Atatürk’ün kararlı tutumuyla ilişkilendirme',
      ],
    },
    {
      unitNumber: 7,
      unitName: '7. Ünite: Atatürk\'ün Ölümü ve Sonrası',
      topicName: 'Atatürk\'ün Ölümü ve Sonrası (Vefatı, Nutuk ve II. Dünya Savaşı)',
      kazanimlar: [
        'Atatürk’ün vefatının yurt içi ve yurt dışındaki yankılarını değerlendirme',
        'Atatürk’ün yazılı eserlerini ve en büyük eseri olan Nutuk’un tarihi değerini kavrama',
        'II. Dünya Savaşı sürecinde Türkiye’nin tarafsız ve barışçı tutumunu özetleme',
      ],
    },
  ],

  din: [
    {
      unitNumber: 1,
      unitName: '1. Ünite: Kader İnancı',
      topicName: 'Kader İnancı (Kaza ve Kader, Evrenin Yasaları, Tevekkül)',
      kazanimlar: [
        'Kader ve kaza kavramlarını anlamlandırarak evrenin mükemmel düzeniyle ilişkilendirme',
        'Evrendeki yasaları (fiziksel, biyolojik ve toplumsal yasalar) ayetlerle temellendirme',
        'İnsanın ilmi, iradesi, sorumluluğu ile kader arasındaki ilişkiyi kavrama (külli ve cüzi irade)',
        'Kaderle ilgili kavramları (ecel ve ömür, rızık, tevekkül, başarı/başarısızlık, sağlık/hastalık) doğru anlama',
        'Hz. Musa’nın hayatını ve mücadelesini ana hatlarıyla tanıma',
        'Ayet el-Kürsi’yi okuma, anlamını kavrama ve mesajlarını yorumlama',
      ],
    },
    {
      unitNumber: 2,
      unitName: '2. Ünite: Zekât ve Sadaka',
      topicName: 'Zekât ve Sadaka İbadeti (Nisap, Sadaka-i Cariye, Paylaşma)',
      kazanimlar: [
        'İslam’ın paylaşma ve yardımlaşmaya verdiği önemi ayet ve hadislerle açıklama',
        'Zekât ibadetinin şartlarını, nisap miktarını ve kimlere verilip kimlere verilemeyeceğini belirleme',
        'Zekât, infak, fıtır sadakası (fitre) ve sadaka-i cariye kavramlarını karşılaştırma',
        'Zekât ve sadakanın bireysel arınma ve toplumsal dayanışmaya katkılarını değerlendirme',
        'Hz. Şuayb’ın hayatını ve ölçü/tartıda dürüstlük ilkesini kavrama',
        'Maûn Suresi’ni okuma, anlamını kavrama ve yetim hakları ile samimi ibadet bilincini analiz etme',
      ],
    },
    {
      unitNumber: 3,
      unitName: '3. Ünite: Din ve Hayat',
      topicName: 'Din ve Hayat (Temel Gayeler: Can, Akıl, Nesil, Mal ve Dinin Korunması)',
      kazanimlar: [
        'Dinin birey ve toplum hayatındaki yerini, ahlak ve vicdan gelişimine katkısını kavrama',
        'Dinin temel gayesini oluşturan 5 temel hakkın korunması ilkesini açıklama (canın korunması, aklın korunması, neslin korunması, malın korunması, dinin korunması)',
        'Hz. Yusuf’un sabır, iffet ve adalet timsali hayatını ana hatlarıyla tanıma',
        'Asr Suresi’ni okuma, anlamını kavrama ve zamanın kıymeti ile iman-salih amel ilişkisini analiz etme',
      ],
    },
    {
      unitNumber: 4,
      unitName: '4. Ünite: Hz. Muhammed\'in Örnekliği',
      topicName: 'Hz. Muhammed\'in Doğruluğu, Güvenilirliği & Ahlaki Örnekliği',
      kazanimlar: [
        'Hz. Muhammed’in doğruluğu ve güvenilirliğini (Muhammedü’l-Emin) örnek olaylarla kavrama',
        'Hz. Muhammed’in merhametli, affedici, sabırlı ve hakkı gözeten örnek tavırlarını analiz etme',
        'Hz. Muhammed’in istişareye (danışmaya) verdiği önemi Bedir, Hendek vb. olaylar üzerinden değerlendirme',
        'Hz. Muhammed’in cesaret, kararlılık ve insana değer verme vasıflarını örnek alma',
        'Kureyş Suresi’ni okuma, anlamını kavrama ve emniyet-şükür ilişkisini değerlendirme',
      ],
    },
    {
      unitNumber: 5,
      unitName: '5. Ünite: Kur\'an-ı Kerim ve Özellikleri',
      topicName: 'İslam Dini ve Çevre Ahlakı & Kur\'an-ı Kerim Özellikleri',
      kazanimlar: [
        'İslam’ın çevre ahlakına verdiği önemi, temizlik ve doğayı koruma ilkelerini açıklama',
        'İsraftan kaçınmanın, canlılara merhamet göstermenin ve kaynakları adil kullanmanın dini sorumluluk olduğunu kavrama',
        'Kur’an-ı Kerim’in ana konularını (inanç, ibadet, ahlak, muamelat, kıssalar) ve rehberlik vasfını tanıma',
      ],
    },
  ],

  ingilizce: [
    {
      unitNumber: 1,
      unitName: 'Unit 1: Friendship',
      topicName: 'Unit 1: Friendship',
      kazanimlar: [
        'Accepting and refusing invitations and offers politely',
        'Making excuses and giving reasons for refusing',
        'Describing personal characteristics of a true friend (honest, loyal, supportive, generous)',
        'Understanding informal letter, message, and email structures',
      ],
    },
    {
      unitNumber: 2,
      unitName: 'Unit 2: Teen Life',
      topicName: 'Unit 2: Teen Life',
      kazanimlar: [
        'Expressing regular daily routines and frequency of activities',
        'Expressing likes, dislikes, interests and preferences (keen on, fond of, crazy about)',
        'Talking about music types, book genres and sports activities',
        'Expressing opinions about teenage lifestyle in different cultures',
      ],
    },
    {
      unitNumber: 3,
      unitName: 'Unit 3: In the Kitchen',
      topicName: 'Unit 3: In The Kitchen',
      kazanimlar: [
        'Describing a cooking process step by step (first, second, then, after that, finally)',
        'Expressing cooking methods (boil, bake, fry, roast, grill, steam)',
        'Naming kitchen utensils (whisk, peel, grater, saucepan, bowl, baking tray)',
        'Asking and answering questions about traditional recipes and ingredients',
      ],
    },
    {
      unitNumber: 4,
      unitName: 'Unit 4: On the Phone',
      topicName: 'Unit 4: On The Phone',
      kazanimlar: [
        'Conducting simple phone conversations and formal phone communication',
        'Making a phone call, asking for someone, and connecting a call',
        'Taking and leaving phone messages when someone is unavailable',
        'Understanding communication history and different communication ways',
      ],
    },
    {
      unitNumber: 5,
      unitName: 'Unit 5: The Internet',
      topicName: 'Unit 5: The Internet',
      kazanimlar: [
        'Accepting and refusing requests on the internet and digital platforms',
        'Talking about internet habits, online tasks and social media tools',
        'Understanding internet terminology (download, upload, browser, attachment, connection)',
        'Listing and applying internet safety rules (netiquette and privacy)',
      ],
    },
    {
      unitNumber: 6,
      unitName: 'Unit 6: Adventures',
      topicName: 'Unit 6: Adventures',
      kazanimlar: [
        'Making comparisons between extreme sports and activities',
        'Expressing preferences using prefer and would rather',
        'Expressing reasons and opinions about dangerous sports (scuba diving, bungee jumping, skydiving)',
        'Talking about adrenaline, bravery and safety gear',
      ],
    },
    {
      unitNumber: 7,
      unitName: 'Unit 7: Tourism',
      topicName: 'Unit 7: Tourism',
      kazanimlar: [
        'Describing popular tourist destinations and historical sites',
        'Expressing experiences and preferences for different vacation types (cultural, beach, adventure)',
        'Talking about climate, accommodation, all-inclusive resorts and local cuisine',
        'Giving information about tourist attractions and travel tips',
      ],
    },
    {
      unitNumber: 8,
      unitName: 'Unit 8: Chores',
      topicName: 'Unit 8: Chores',
      kazanimlar: [
        'Expressing obligations and duties at home or school using must and have to',
        'Talking about household chores (dusting, doing laundry, setting the table, vacuuming)',
        'Discussing sharing chores among family members fairly',
        'Expressing feelings and opinions about responsibilities',
      ],
    },
    {
      unitNumber: 9,
      unitName: 'Unit 9: Science',
      topicName: 'Unit 9: Science',
      kazanimlar: [
        'Talking about scientific achievements, famous scientists and inventors',
        'Describing scientific discoveries, inventions and laboratory experiments',
        'Discussing current scientific research and futuristic developments',
        'Using past tense and passive structures to describe historical scientific milestones',
      ],
    },
    {
      unitNumber: 10,
      unitName: 'Unit 10: Natural Forces',
      topicName: 'Unit 10: Natural Forces',
      kazanimlar: [
        'Talking about natural disasters (earthquake, tsunami, flood, avalanche, hurricane, drought)',
        'Making predictions about future environmental problems and climate change',
        'Giving advice and warnings about taking precautions before/during disasters',
        'Expressing causes and consequences of natural forces',
      ],
    },
  ],
};

/**
 * Geriye dönük uyumluluk: Tüm derslerin ana konu başlıkları dizisi
 */
export const LGS_TOPICS_BY_COURSE: Record<LgsCourseKey, readonly string[]> = {
  matematik: LGS_DETAILED_CURRICULUM.matematik.map((u) => u.topicName),
  fen: LGS_DETAILED_CURRICULUM.fen.map((u) => u.topicName),
  turkce: LGS_DETAILED_CURRICULUM.turkce.map((u) => u.topicName),
  inkilap: LGS_DETAILED_CURRICULUM.inkilap.map((u) => u.topicName),
  din: LGS_DETAILED_CURRICULUM.din.map((u) => u.topicName),
  ingilizce: LGS_DETAILED_CURRICULUM.ingilizce.map((u) => u.topicName),
};

export const LGS_COURSE_OPTIONS: { key: LgsCourseKey; name: string }[] = [
  { key: 'matematik', name: 'Matematik' },
  { key: 'fen', name: 'Fen Bilimleri' },
  { key: 'turkce', name: 'Türkçe' },
  { key: 'inkilap', name: 'T.C. İnkılap Tarihi ve Atatürkçülük' },
  { key: 'din', name: 'Din Kültürü ve Ahlak Bilgisi' },
  { key: 'ingilizce', name: 'Yabancı Dil (İngilizce)' },
];

/**
 * Belirtilen dersin ana müfredat konularını döndürür
 */
export function getTopicsByCourse(courseKey: LgsCourseKey): readonly string[] {
  return LGS_TOPICS_BY_COURSE[courseKey] || [];
}

/**
 * Belirtilen dersin ünitelerini ve kazanımlarını detaylı olarak döndürür
 */
export function getUnitsByCourse(courseKey: LgsCourseKey): readonly LgsUnitConfig[] {
  return LGS_DETAILED_CURRICULUM[courseKey] || [];
}

/**
 * Ders kodundan Türkçe ders adını döndürür
 */
export function getCourseName(courseKey: LgsCourseKey): string {
  const found = LGS_COURSE_OPTIONS.find((c) => c.key === courseKey);
  return found ? found.name : courseKey;
}

/**
 * Dersin oturum, katsayı ve soru sayısı üst verilerini döndürür
 */
export function getCourseMetadata(courseKey: LgsCourseKey): LgsCourseMetadata {
  return LGS_COURSE_METADATA[courseKey] || {
    key: courseKey,
    name: courseKey,
    shortName: courseKey,
    session: 'sayisal',
    questionCount: 20,
    weight: 4,
    suggestedDurationMinutes: 40,
    description: '',
  };
}
