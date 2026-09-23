import type { OnlineExam, OnlineExamQuestion } from '@/types/online-exam';
import { getCurrentSchoolWeek } from '@/lib/meb-curriculum-calendar';

/**
 * Mevcut haftanın MEB takvimine göre 15 Soruluk Sayısal Meydan Okuma Sınavını üretir
 * (8 Matematik + 7 Fen Bilimleri)
 */
export function generateWeeklyStemChallenge(now = new Date()): OnlineExam {
  const week = getCurrentSchoolWeek(now);
  const mathTopic = week.topics.matematik;
  const scienceTopic = week.topics.fen;

  const questions: OnlineExamQuestion[] = [
    // --- 8 MATEMATİK SORUSU ---
    {
      id: `stem-m1-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 1,
      questionText: `Bir kütüphanedeki iki farklı rafın uzunlukları 180 cm ve 216 cm'dir. Bu raflara kalınlıkları santimetre cinsinden tam sayı olan özdeş kitaplar, aralarında hiç boşluk kalmayacak ve raflardan taşmayacak şekilde dizilecektir.\n\nBuna göre her iki rafa da tam olarak yerleştirilebilecek bir kitabın kalınlığı en fazla kaç santimetre olabilir?`,
      options: {
        A: '18',
        B: '24',
        C: '36',
        D: '72',
      },
      correctAnswer: 'C',
      explanation: `Her iki rafa da taşmadan sığması için kitap kalınlığı 180 ve 216'nın ortak böleni olmalıdır. En fazla istendiği için EBOB(180, 216) hesaplanır: 180 = 2² × 3² × 5, 216 = 2³ × 3³. Ortak bölenlerin en büyüğü 2² × 3² = 4 × 9 = 36 cm'dir.`,
    },
    {
      id: `stem-m2-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 2,
      questionText: `Alanı 288 cm² olan dikdörtgen şeklindeki bir kartonun kenar uzunlukları santimetre cinsinden aralarında asal iki tam sayıdır.\n\nBuna göre bu kartonun çevre uzunluğu kaç santimetredir?`,
      options: {
        A: '68',
        B: '74',
        C: '82',
        D: '96',
      },
      correctAnswer: 'C',
      explanation: `288 sayısının çarpanlarını buluruz: 288 = 2⁵ × 3² = 32 × 9. 32 ve 9 sayıları aralarında asaldır (ortak bölenleri sadece 1'dir) ve çarpımları 288'dir. Kenar uzunlukları 32 cm ve 9 cm olduğunda çevre = 2 × (32 + 9) = 2 × 41 = 82 cm bulunur.`,
    },
    {
      id: `stem-m3-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 3,
      questionText: `25⁴ × 16² işleminin sonucu kaç basamaklı bir sayıdır?`,
      options: {
        A: '7',
        B: '8',
        C: '9',
        D: '10',
      },
      correctAnswer: 'C',
      explanation: `25⁴ = (5²)⁴ = 5⁸. 16² = (2⁴)² = 2⁸. 5⁸ × 2⁸ = (5 × 2)⁸ = 10⁸. 10⁸ sayısı 1'in yanına 8 adet sıfır yazılmasıyla oluşur, dolayısıyla 1 + 8 = 9 basamaklıdır.`,
    },
    {
      id: `stem-m4-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 4,
      questionText: `Işık hızı saniyede yaklaşık 300.000 kilometredir. Güneş ile Dünya arasındaki mesafe yaklaşık 150.000.000 kilometredir.\n\nBuna göre Güneş'ten çıkan bir ışık ışınının Dünya'ya ulaşma süresinin saniye cinsinden bilimsel gösterimi aşağıdakilerden hangisidir?`,
      options: {
        A: '5 × 10¹',
        B: '5 × 10²',
        C: '0,5 × 10³',
        D: '50 × 10¹',
      },
      correctAnswer: 'B',
      explanation: `Zaman = Yol / Hız = 150.000.000 / 300.000 = 1500 / 3 = 500 saniye. 500 sayısının bilimsel gösterimi 1 ≤ |a| < 10 şartını sağlamak için 5 × 10² şeklindedir.`,
    },
    {
      id: `stem-m5-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 5,
      questionText: `√180 sayısı hangi ardışık iki tam sayı arasındadır ve hangisine daha yakındır?`,
      options: {
        A: '12 ile 13 arasında, 12\'ye daha yakın',
        B: '13 ile 14 arasında, 13\'e daha yakın',
        C: '13 ile 14 arasında, 14\'e daha yakın',
        D: '14 ile 15 arasında, 14\'e daha yakın',
      },
      correctAnswer: 'B',
      explanation: `13² = 169 ve 14² = 196'dır. √169 < √180 < √196 olduğundan sayı 13 ile 14 arasındadır. 180 - 169 = 11 fark varken, 196 - 180 = 16 fark vardır. 11 < 16 olduğundan 13'e daha yakındır.`,
    },
    {
      id: `stem-m6-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 6,
      questionText: `Bir torbada eşit büyüklükte 6 mavi, 8 kırmızı ve bir miktar sarı bilye vardır. Bu torbadan rastgele çekilen bir bilyenin sarı olma olasılığı 1/3 olduğuna göre torbadaki sarı bilye sayısı kaçtır?`,
      options: {
        A: '5',
        B: '7',
        C: '8',
        D: '14',
      },
      correctAnswer: 'B',
      explanation: `Sarı bilye sayısı s olsun. Toplam bilye = 6 + 8 + s = 14 + s. Olasılık = s / (14 + s) = 1/3. İçler dışlar çarpımı yapılırsa: 3s = 14 + s ⇒ 2s = 14 ⇒ s = 7 bulunur.`,
    },
    {
      id: `stem-m7-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 7,
      questionText: `(3x - 4)² cebirsel ifadesinin özdeşi aşağıdakilerden hangisidir?`,
      options: {
        A: '9x² - 16',
        B: '9x² + 16',
        C: '9x² - 12x + 16',
        D: '9x² - 24x + 16',
      },
      correctAnswer: 'D',
      explanation: `İki terimin farkının karesi özdeşliği: (a - b)² = a² - 2ab + b². Burada a = 3x ve b = 4'tür. (3x)² - 2 × (3x) × 4 + 4² = 9x² - 24x + 16 elde edilir.`,
    },
    {
      id: `stem-m8-${week.weekNumber}`,
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: mathTopic,
      questionNumber: 8,
      questionText: `Koordinat sisteminde A(2, -3) noktasından ve orijinden geçen doğrunun eğimi kaçtır?`,
      options: {
        A: '-3/2',
        B: '-2/3',
        C: '2/3',
        D: '3/2',
      },
      correctAnswer: 'A',
      explanation: `Orijinden geçen doğruların denklemi y = mx şeklindedir ve eğim m = y / x'tir. A(2, -3) için eğim = -3 / 2 bulunur.`,
    },

    // --- 7 FEN BİLİMLERİ SORUSU ---
    {
      id: `stem-s1-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 9,
      questionText: `Dünya'nın Güneş etrafındaki dolanma hareketi ve eksen eğikliği sonucunda mevsimler oluşur.\n\nBuna göre 21 Haziran tarihinde Kuzey Yarım Küre'de gerçekleşen durum ile ilgili aşağıdakilerden hangisi yanlıştır?`,
      options: {
        A: 'En uzun gündüz yaşanır.',
        B: 'Öğle vakti Yengeç Dönencesi\'ne güneş ışınları dik açıyla düşer.',
        C: 'Bu tarihten sonra gündüzler uzamaya devam eder.',
        D: 'Güney Yarım Küre\'de kış mevsimi başlangıcıdır.',
      },
      correctAnswer: 'C',
      explanation: `21 Haziran'da Kuzey Yarım Küre'de en uzun gündüz yaşanır. En uzun gündüze ulaşıldığı için bu tarihten sonra gündüzler kısalmaya, geceler uzamaya başlar. Dolayısıyla C şıkkı yanlıştır.`,
    },
    {
      id: `stem-s2-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 10,
      questionText: `Bir DNA molekülünün tek zincirinde 300 Adenin, 450 Timin, 200 Guanin ve 550 Sitozin nükleotidi bulunmaktadır.\n\nBuna göre bu DNA molekülünün tamamında bulunan toplam deoksiriboz şekeri sayısı kaçtır?`,
      options: {
        A: '1.500',
        B: '2.000',
        C: '3.000',
        D: '4.500',
      },
      correctAnswer: 'C',
      explanation: `Verilen zincirde toplam nükleotid = 300 + 450 + 200 + 550 = 1.500 adettir. DNA çift zincirli olduğundan karşı zincirde de 1.500 nükleotid vardır. Toplam nükleotid = 1.500 × 2 = 3.000'dir. Her nükleotidde 1 adet şeker bulunduğundan toplam şeker sayısı 3.000'dir.`,
    },
    {
      id: `stem-s3-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 11,
      questionText: `Heterozigot sarı tohumlu iki bezelye bitkisinin çaprazlanması sonucu elde edilecek yavru döllerin yeşil tohumlu olma olasılığı yüzde kaçtır? (Sarı tohum geni 'S', yeşil tohum geni 's'ye baskındır.)`,
      options: {
        A: '%0',
        B: '%25',
        C: '%50',
        D: '%75',
      },
      correctAnswer: 'B',
      explanation: `Heterozigot sarı tohum genotipi Ss'dir. Ss × Ss çaprazlaması: SS (sarı, %25), Ss (sarı, %25), Ss (sarı, %25), ss (yeşil, %25). Yeşil tohum çekinik olduğundan sadece ss genotipinde ortaya çıkar, olasılığı 1/4 yani %25'tir.`,
    },
    {
      id: `stem-s4-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 12,
      questionText: `Ağırlıkları eşit olan K, L ve M katı cisimlerinin zemine temas eden taban alanları sırasıyla S, 2S ve 3S'tir.\n\nBuna göre bu cisimlerin zemine uyguladıkları katı basınçları (P_K, P_L, P_M) arasındaki ilişki nasıldır?`,
      options: {
        A: 'P_K > P_L > P_M',
        B: 'P_M > P_L > P_K',
        C: 'P_K = P_L = P_M',
        D: 'P_L > P_K > P_M',
      },
      correctAnswer: 'A',
      explanation: `Katı basıncı formülü P = G / S (Kuvvet / Yüzey Alanı)'dır. Ağırlıklar (G) eşit olduğunda, temas yüzey alanı en küçük olan cismin zemine uyguladığı basınç en büyük olur. S < 2S < 3S olduğundan basınç sıralaması P_K > P_L > P_M olur.`,
    },
    {
      id: `stem-s5-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 13,
      questionText: `Periyodik sistemde aynı periyotta soldan sağa doğru gidildikçe genel olarak aşağıdakilerden hangisi gerçekleşmez?`,
      options: {
        A: 'Atom numarası artar.',
        B: 'Grup numarası artar.',
        C: 'Katman (periyot) sayısı artar.',
        D: 'Ametalik özellik artar.',
      },
      correctAnswer: 'C',
      explanation: `Aynı periyot boyunca soldan sağa gidildiğinde elementlerin katman sayısı değişmez, sabit kalır (çünkü aynı periyottadırlar). Katman sayısı sadece periyodik tabloda yukarıdan aşağıya inildikçe artar.`,
    },
    {
      id: `stem-s6-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 14,
      questionText: `Bir çözeltinin pH değeri 3 olarak ölçülmüştür. Bu çözelti ile ilgili;\nI. Asidik özellik gösterir.\nII. Turnusol kağıdını maviye boyar.\nIII. Mermer ve metalleri aşındırır.\n\nyargılarından hangileri doğrudur?`,
      options: {
        A: 'Yalnız I',
        B: 'I ve II',
        C: 'I ve III',
        D: 'I, II ve III',
      },
      correctAnswer: 'C',
      explanation: `pH değeri 0-7 arası olan maddeler asittir (I doğru). Asitler mavi turnusol kağıdını kırmızıya çevirir (II yanlış). Asitler metaller ve mermer yüzeylerle tepkimeye girerek aşınmaya neden olur (III doğru). Dolayısıyla I ve III doğrudur.`,
    },
    {
      id: `stem-s7-${week.weekNumber}`,
      courseKey: 'fen',
      courseName: 'Fen Bilimleri',
      topicName: scienceTopic,
      questionNumber: 15,
      questionText: `Sabit bir makarada 60 N ağırlığındaki bir yük dengededir (Sürtünmeler ve makara ağırlığı ihmal edilmiştir).\n\nBuna göre uygulanan kuvvet (F) ve kuvvet kazancı ile ilgili aşağıdakilerden hangisi doğrudur?`,
      options: {
        A: 'F = 30 N, 2 kat kuvvet kazancı vardır.',
        B: 'F = 60 N, kuvvet kazancı yoktur, iş kolaylığı sağlar.',
        C: 'F = 120 N, yoldan kazanç vardır.',
        D: 'F = 60 N, işten %50 kazanç sağlar.',
      },
      correctAnswer: 'B',
      explanation: `Sabit makaralarda kuvvet kazancı yoktur (Kuvvet = Yük = 60 N). Sabit makaralar sadece kuvvetin yönünü değiştirerek iş kolaylığı sağlar. Hiçbir basit makinede işten ya da enerjiden kazanç sağlanamaz.`,
    },
  ];

  return {
    id: `challenge-stem-week-${week.weekNumber}`,
    title: `Haftalık Sayısal Meydan Okuma (${week.monthName} ${week.weekNumber}. Hafta)`,
    slug: 'lgs-haftalik-sayisal-meydan-okuma',
    type: 'branch',
    difficulty: 'LGS Düzeyi',
    questionCount: 15,
    durationMinutes: 30,
    isPro: false,
    badgeText: '📅 MEB MEYDAN OKUMA',
    description: `MEB ${week.monthName} ayı ${week.weekNumber}. hafta çalışma takvimine göre otonom hazırlanmış 8 Matematik ve 7 Fen Bilimleri yeni nesil sorusu.`,
    questions,
  };
}

/**
 * Mevcut haftanın MEB takvimine göre 15 Soruluk Sözel Kampı Sınavını üretir
 * (6 Türkçe + 3 İnkılap + 3 Din + 3 İngilizce)
 */
export function generateWeeklyVerbalChallenge(now = new Date()): OnlineExam {
  const week = getCurrentSchoolWeek(now);
  const trTopic = week.topics.turkce;

  const questions: OnlineExamQuestion[] = [
    // --- 6 TÜRKÇE SORUSU ---
    {
      id: `verbal-t1-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 1,
      questionText: `"Yazmak, içimdeki düğümleri tek tek çözüp onları birer köprüye dönüştürmektir."\n\nBu cümledeki altı çizili "düğümleri çözmek" sözünün cümleye kattığı anlam aşağıdakilerden hangisidir?`,
      options: {
        A: 'Zor ve karmaşık duyguları, düşünceleri aydınlığa kavuşturmak',
        B: 'Geçmişte yaşanan kırgınlıkları tamamen unutmak',
        C: 'Olayları başkalarının bakış açısıyla değerlendirmek',
        D: 'Yazı yazma yeteneğini başkalarına kanıtlamak',
      },
      correctAnswer: 'A',
      explanation: `"Düğüm", karmaşık, anlaşılması güç durumları ifade eder. Düğümleri çözmek ise zihindeki karmaşık ve içinden çıkılmaz duygu ve düşünceleri netleştirip aydınlığa kavuşturmak anlamına gelir.`,
    },
    {
      id: `verbal-t2-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 2,
      questionText: `Aşağıdaki cümlelerin hangisinde fiilimsi (eylemsi) kullanılmamıştır?`,
      options: {
        A: 'Güneşin batışını izlemek için tepeye doğru yürüdük.',
        B: 'Kitap okuyan insanların dünyaya bakışı daha derindir.',
        C: 'Yaz tatilinde köye gidip dedemin bahçesini suladım.',
        D: 'Dün akşamki fırtına sabaha karşı nihayet dindi.',
      },
      correctAnswer: 'D',
      explanation: `A şıkkında 'izlemek' (isim-fiil), B şıkkında 'okuyan' (sıfat-fiil), C şıkkında 'gidip' (zarf-fiil) kullanılmıştır. D şıkkındaki 'Dün akşamki fırtına sabaha karşı nihayet dindi' cümlesinde ise hiçbir fiilimsi eki bulunmamaktadır.`,
    },
    {
      id: `verbal-t3-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 3,
      questionText: `"Bozkırın ortasında yükselen bu ulu çınar, asırlardır gelip geçen yolculara kollarını açarak onları selamlıyordu."\n\nBu cümlede kullanılan söz sanatı aşağıdakilerden hangisidir?`,
      options: {
        A: 'Teşbih (Benzetme)',
        B: 'Teşhis (Kişileştirme)',
        C: 'Tezat (Karşıtlık)',
        D: 'İntak (Konuşturma)',
      },
      correctAnswer: 'B',
      explanation: `İnsana ait olan "kollarını açıp yolcuları selamlamak" özelliği insan dışındaki bir varlığa (ulu çınar ağacına) aktarılarak kişileştirme (teşhis) sanatı yapılmıştır.`,
    },
    {
      id: `verbal-t4-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 4,
      questionText: `Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?`,
      options: {
        A: 'TDK\'nin yeni sözlüğü geçen hafta yayımlandı.',
        B: 'Bu konuyu Ayşe Hanım ile etraflıca konuştuk.',
        C: '23 Nisan 1920\'de TBMM törenle açıldı.',
        D: 'Sende bizimle sinemaya gelecek misin?',
      },
      correctAnswer: 'D',
      explanation: `D şıkkındaki "Sende" sözcüğündeki "-de", bulunma eki değil, "dahi/bile" anlamındaki bağlaç olan "de"dir. Bağlaç olan "de" ayrı yazılmalıdır: "Sen de bizimle sinemaya gelecek misin?" şeklinde olmalıdır.`,
    },
    {
      id: `verbal-t5-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 5,
      questionText: `Bir paragrafın ana düşüncesi, yazarın okuyucuya iletmek istediği asıl iletidir.\n\n"Başarılı insanların ortak özelliği çok zeki olmaları değil, karşılaştıkları engeller karşısında denemekten vazgeçmemeleridir. Zekâ bir tohumsa, sebat o tohumu sulayan yağmurdur."\n\nBu parçanın ana düşüncesi aşağıdakilerden hangisidir?`,
      options: {
        A: 'Zekâ olmadan hiçbir başarı kalıcı olamaz.',
        B: 'Başarıya ulaşmada kararlılık ve azim zekâdan daha belirleyicidir.',
        C: 'Engeller insanı hedeflerinden uzaklaştırır.',
        D: 'Çok çalışmak her zaman başarı getirmez.',
      },
      correctAnswer: 'B',
      explanation: `Paragrafta başarının asıl anahtarının "denemekten vazgeçmemek" (kararlılık/azim/sebat) olduğu vurgulanmaktadır. Dolayısıyla ana düşünce B şıkkıdır.`,
    },
    {
      id: `verbal-t6-${week.weekNumber}`,
      courseKey: 'turkce',
      courseName: 'Türkçe',
      topicName: trTopic,
      questionNumber: 6,
      questionText: `"Okul bahçesindeki fidanları sabah erkenden suladık." cümlesinin ögeleri aşağıdakilerin hangisinde sırasıyla doğru verilmiştir?`,
      options: {
        A: 'Özne - Belirtili Nesne - Zarf Tamlayıcısı - Yüklem',
        B: 'Belirtili Nesne - Zarf Tamlayıcısı - Yüklem',
        C: 'Yer Tamlayıcısı - Zarf Tamlayıcısı - Yüklem',
        D: 'Belirtisiz Nesne - Zarf Tamlayıcısı - Yüklem',
      },
      correctAnswer: 'B',
      explanation: `Yüklem: suladık. Kim suladı? Biz (gizli özne). Neyi suladık? Okul bahçesindeki fidanları (Belirtili Nesne). Ne zaman suladık? Sabah erkenden (Zarf Tamlayıcısı). Cümledeki öge dizilişi: Belirtili Nesne - Zarf Tamlayıcısı - Yüklem şeklindedir.`,
    },

    // --- 3 İNKILAP TARİHİ SORUSU ---
    {
      id: `verbal-i1-${week.weekNumber}`,
      courseKey: 'inkilap',
      courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
      topicName: week.topics.inkilap,
      questionNumber: 7,
      questionText: `Mustafa Kemal'in Manastır Askerî İdadisinde okurken Namık Kemal, Mehmet Emin Yurdakul gibi şairlerin eserlerini okuması, onda aşağıdaki fikir akımlarından hangisinin güçlenmesinde en etkili olmuştur?`,
      options: {
        A: 'Batıcılık',
        B: 'Türkçülük ve Milliyetçilik',
        C: 'Osmanlıcılık',
        D: 'İslamcılık',
      },
      correctAnswer: 'B',
      explanation: `Namık Kemal "Vatan Şairi", Mehmet Emin Yurdakul ise "Millî Şair" olarak bilinir. Onların eserleri Mustafa Kemal'in milliyetçilik ve vatanseverlik duygularının gelişiminde temel oluşturmuştur.`,
    },
    {
      id: `verbal-i2-${week.weekNumber}`,
      courseKey: 'inkilap',
      courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
      topicName: week.topics.inkilap,
      questionNumber: 8,
      questionText: `Amasya Genelgesi'nde yer alan "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." maddesi ile ilgili aşağıdakilerden hangisi söylenemez?`,
      options: {
        A: 'Millî Mücadele\'nin yöntemi belirtilmiştir.',
        B: 'Millet iradesine ve egemenliğine vurgu yapılmıştır.',
        C: 'Manda ve himaye fikri kesin olarak kabul edilmiştir.',
        D: 'İlk kez millî egemenliğe dayalı bir yönetim anlayışından bahsedilmiştir.',
      },
      correctAnswer: 'C',
      explanation: `Bu madde bağımsızlığın ancak milletin kendi gücüyle kazanılabileceğini belirtir. Manda ve himaye fikri tam tersine bağımsızlığa aykırıdır ve Erzurum ile Sivas Kongrelerinde kesin olarak reddedilmiştir.`,
    },
    {
      id: `verbal-i3-${week.weekNumber}`,
      courseKey: 'inkilap',
      courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
      topicName: week.topics.inkilap,
      questionNumber: 9,
      questionText: `Misakımillî kararlarında "Kuvay-ı Millîye'yi amil, irade-i millîyeyi hâkim kılmak esastır." ilkesi benimsenmiştir.\n\nBuna göre ulaşılabilecek temel hedef aşağıdakilerden hangisidir?`,
      options: {
        A: 'Tam bağımsızlık ve ulusal egemenlik',
        B: 'Padişahın yetkilerini artırmak',
        C: 'İtilaf Devletleri ile barış imzalamak',
        D: 'Azınlıklara geniş ayrıcalıklar tanımak',
      },
      correctAnswer: 'A',
      explanation: `Kuvay-ı Millîye'yi etkin kılmak ulusal bağımsızlığı, irade-i millîyeyi (millet iradesini) hâkim kılmak ise ulusal egemenliği simgeler.`,
    },

    // --- 3 DİN KÜLTÜRÜ SORUSU ---
    {
      id: `verbal-d1-${week.weekNumber}`,
      courseKey: 'din',
      courseName: 'Din Kültürü ve Ahlak Bilgisi',
      topicName: week.topics.din,
      questionNumber: 10,
      questionText: `"Güneş ve ay bir hesaba göre hareket etmektedir. Göğü O yükseltti ve ölçüyü O koydu." (Rahmân suresi, 5-7. ayetler)\n\nBu ayetler evrenin yasalarından hangisine doğrudan örnek oluşturur?`,
      options: {
        A: 'Biyolojik yasalar',
        B: 'Toplumsal yasalar',
        C: 'Fiziksel yasalar',
        D: 'Ahlaki yasalar',
      },
      correctAnswer: 'C',
      explanation: `Güneş ve ayın hareketi, yer çekimi ve gök cisimlerinin dengesi maddenin yapısı ve hareketiyle ilgili olan fiziksel yasaların konusudur.`,
    },
    {
      id: `verbal-d2-${week.weekNumber}`,
      courseKey: 'din',
      courseName: 'Din Kültürü ve Ahlak Bilgisi',
      topicName: week.topics.din,
      questionNumber: 11,
      questionText: `İslam'da zekât ibadetiyle ilgili aşağıdaki bilgilerden hangisi yanlıştır?`,
      options: {
        A: 'Hali vakti yerinde olan nisap miktarı mala sahip Müslümanlara farzdır.',
        B: 'Toplumda zengin ile yoksul arasındaki sevgi bağını güçlendirir.',
        C: 'Anne, baba, büyükanne ve büyükbabalara zekât verilebilir.',
        D: 'Kişinin malını temizler ve bereketlendirir.',
      },
      correctAnswer: 'C',
      explanation: `Kişi bakmakla yükümlü olduğu usûl (anne, baba, dede, nine) ve fürûuna (çocukları ve torunları) zekât veremez. Bu nedenle C şıkkı yanlıştır.`,
    },
    {
      id: `verbal-d3-${week.weekNumber}`,
      courseKey: 'din',
      courseName: 'Din Kültürü ve Ahlak Bilgisi',
      topicName: week.topics.din,
      questionNumber: 12,
      questionText: `Kişinin vefatından sonra da amel defterinin kapanmamasını ve sevap yazılmasını sağlayan sürekli hayırlara (okul, çeşme, faydalı ilim vb.) ne ad verilir?`,
      options: {
        A: 'Sadaka-i Cariye',
        B: 'Fitre (Fıtır Sadakası)',
        C: 'Öşür',
        D: 'Fidye',
      },
      correctAnswer: 'A',
      explanation: `Kişi öldükten sonra da sevabı devam eden kalıcı hayır eserlerine ve faydalı ilme "Sadaka-i Cariye" (akan/kesintisiz sadaka) adı verilir.`,
    },

    // --- 3 İNGİLİZCE SORUSU ---
    {
      id: `verbal-e1-${week.weekNumber}`,
      courseKey: 'ingilizce',
      courseName: 'İngilizce',
      topicName: week.topics.ingilizce,
      questionNumber: 13,
      questionText: `Sarah: "Would you like to come over to my house for a movie night on Friday?"\nMark: "I'd love to, but I have to study for the math exam."\n\nAccording to the dialogue, Mark ________________________ .`,
      options: {
        A: 'accepts the invitation with great pleasure',
        B: 'makes an excuse and refuses the offer',
        C: 'invites Sarah to his own house',
        D: 'doesn\'t like watching movies at all',
      },
      correctAnswer: 'B',
      explanation: `Mark "I'd love to, but..." diyerek bir bahane sunmuş (matematik sınavına çalışmak zorunda olduğunu belirterek) daveti nazikçe reddetmiştir ("refuses the offer and makes an excuse").`,
    },
    {
      id: `verbal-e2-${week.weekNumber}`,
      courseKey: 'ingilizce',
      courseName: 'İngilizce',
      topicName: week.topics.ingilizce,
      questionNumber: 14,
      questionText: `A true friend always backs you up, keeps your secrets, and tells the truth.\n\nWhich of the following proverbs best matches the sentence above?`,
      options: {
        A: 'A friend in need is a friend indeed.',
        B: 'Actions speak louder than words.',
        C: 'Better late than never.',
        D: 'Out of sight, out of mind.',
      },
      correctAnswer: 'A',
      explanation: `"A friend in need is a friend indeed" (Dost kara günde belli olur / Gerçek dost zor zamanda yanında olandır) atasözü, arkanda duran (backs you up) ve sırrını saklayan gerçek dostu en iyi anlatan ifadedir.`,
    },
    {
      id: `verbal-e3-${week.weekNumber}`,
      courseKey: 'ingilizce',
      courseName: 'İngilizce',
      topicName: week.topics.ingilizce,
      questionNumber: 15,
      questionText: `Chef: "First, chop the onions and garlic. Second, heat the olive oil in a pan. Then, fry the onions until they turn golden. Finally, add the tomatoes."\n\nWhat should you do immediately before frying the onions?`,
      options: {
        A: 'Chop the tomatoes',
        B: 'Heat the olive oil in a pan',
        C: 'Add the garlic to the plate',
        D: 'Serve the meal hot',
      },
      correctAnswer: 'B',
      explanation: `Soğanları kızartmadan (fry the onions) hemen önceki adım "Second, heat the olive oil in a pan" (tavada zeytinyağını ısıtmak) adımıdır.`,
    },
  ];

  return {
    id: `challenge-verbal-week-${week.weekNumber}`,
    title: `Haftalık Sözel Kampı (${week.monthName} ${week.weekNumber}. Hafta)`,
    slug: 'lgs-haftalik-sozel-kampi',
    type: 'branch',
    difficulty: 'LGS Düzeyi',
    questionCount: 15,
    durationMinutes: 25,
    isPro: false,
    badgeText: '📅 MEB MEYDAN OKUMA',
    description: `MEB ${week.monthName} ayı ${week.weekNumber}. hafta müfredatına göre hazırlanmış 6 Türkçe, 3 İnkılap, 3 Din Kültürü ve 3 İngilizce yeni nesil sorusu.`,
    questions,
  };
}

/**
 * Otonom üretilen tüm meydan okumaları döner.
 */
export function getAutonomousChallengeExams(now = new Date()): OnlineExam[] {
  return [
    generateWeeklyStemChallenge(now),
    generateWeeklyVerbalChallenge(now),
  ];
}
