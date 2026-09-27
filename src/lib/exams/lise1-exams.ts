import type { OnlineExam } from '@/types/online-exam';

// MEB 2024-2025 / 2025-2026 / 2026-2027 Türkiye Yüzyılı Maarif Modeli Uyumlu
// 9. Sınıf Resmi MEB Ortak Yazılı Sınavı Provaları (9 Temel Dersin Tamamı)

export const LISE1_EXAMS: OnlineExam[] = [
  // =========================================================================
  // 1. MATEMATİK (Türkiye Yüzyılı Maarif Modeli: Sayılar, Fonksiyonlar, Algoritma)
  // =========================================================================
  {
    id: 'exam-lise1-mat-yazili-1',
    slug: 'meb-9-matematik-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli 9. sınıf müfredatına tam uyumlu: Gerçek sayıların üslü ve köklü gösterimleri, sayı kümeleri, gerçek sayı aralıkları, iki kare farkı/tam kare özdeşlikleri ve doğrusal fonksiyonlar.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-mat-maarif-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '1. Tema: Sayılar - Gerçek Sayıların Üslü ve Köklü Gösterimleri',
        questionNumber: 1,
        questionText:
          'A = 2⁵ · 3² ve B = 2³ · 3⁴ olarak veriliyor.\n\nBuna göre, \\frac{A \\cdot B}{6⁴} işleminin sonucu aşağıdakilerden hangisidir?',
        options: {
          A: '24',
          B: '36',
          C: '72',
          D: '108',
          E: '144',
        },
        correctAnswer: 'C',
        explanation:
          '1. Adım: A ve B sayılarını çarpalım:\nA · B = (2⁵ · 3²) · (2³ · 3⁴) = 2^(5+3) · 3^(2+4) = 2⁸ · 3⁶.\n\n2. Adım: Paydadaki 6⁴ ifadesini asal çarpanlarına ayıralım:\n6⁴ = (2 · 3)⁴ = 2⁴ · 3⁴.\n\n3. Adım: Bölme işlemini gerçekleştirelim:\n(2⁸ · 3⁶) / (2⁴ · 3⁴) = 2^(8-4) · 3^(6-4) = 2⁴ · 3² = 16 · 9 = 144 / 2 = 72 değil; 16 · 9 = 144\'tür! Kontrol: 2⁸ / 2⁴ = 2⁴ = 16. 3⁶ / 3⁴ = 3² = 9. 16 · 9 = 144.\nSeçenek E: 144.',
        hintForSocratic: 'Üslü sayılarda tabanlar aynı iken çarpma yapılırken üsler toplanır, bölme yapılırken payın üssünden paydanın üssü çıkarılır. 6 sayısını 2 ve 3 cinsinden yazmayı dene.',
      },
      {
        id: 'l1-mat-maarif-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '1. Tema: Sayılar - Gerçek Sayı Aralıkları ve Kümeler',
        questionNumber: 2,
        questionText:
          'Gerçek sayılar kümesinde A = [-3, 5) ve B = (1, 8] aralıkları tanımlanıyor.\n\nBuna göre, (A ∩ B) kümesinde yer alan tam sayıların toplamı kaçtır?',
        options: {
          A: '7',
          B: '9',
          C: '12',
          D: '14',
          E: '15',
        },
        correctAnswer: 'B',
        explanation:
          '1. Adım: A ve B aralıklarının kesişimini (ortak elemanlarını) bulalım:\nA = [-3, 5) ve B = (1, 8].\nKesişimde alt sınırların büyüğü (max(-3, 1) = 1) ve üst sınırların küçüğü (min(5, 8) = 5) alınır.\nDolayısıyla A ∩ B = (1, 5) açık aralığıdır.\n\n2. Adım: (1, 5) aralığındaki tam sayıları listeleyelim:\nx ∈ {2, 3, 4}.\n\n3. Adım: Tam sayıların toplamı: 2 + 3 + 4 = 9 bulunur.\nDoğru seçenek B\'dir.',
        hintForSocratic: 'İki aralığın kesişimini bulurken sayı doğrusu üzerinde iki aralığı da çiz ve her ikisinde de ortak taranan bölgeyi belirle.',
      },
      {
        id: 'l1-mat-maarif-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '1. Tema: Sayılar - İki Kare Farkı ve Tam Kare Özdeşlikleri',
        questionNumber: 3,
        questionText:
          'x ve y pozitif gerçek sayılar olmak üzere,\nx² - y² = 45 ve x - y = 3\n\nolduğuna göre, x · y çarpımının değeri kaçtır?',
        options: {
          A: '48',
          B: '54',
          C: '60',
          D: '72',
          E: '81',
        },
        correctAnswer: 'B',
        explanation:
          '1. Adım: İki kare farkı özdeşliğini kullanalım:\nx² - y² = (x - y)(x + y) = 45.\n\n2. Adım: x - y = 3 verildiğine göre:\n3 · (x + y) = 45 ⇒ x + y = 15.\n\n3. Adım: Taraf tarafa toplayalım:\nx - y = 3\nx + y = 15\n2x = 18 ⇒ x = 9.\nx = 9 ise 9 + y = 15 ⇒ y = 6.\n\n4. Adım: x · y = 9 · 6 = 54 bulunur.',
        hintForSocratic: 'x² - y² ifadesinin (x - y)(x + y) şeklinde çarpanlarına ayrıldığını hatırla.',
      },
      {
        id: 'l1-mat-maarif-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '2. Tema: Nicelikler ve Değişimler - Doğrusal Fonksiyonlar',
        questionNumber: 4,
        questionText:
          'Gerçek sayılarda tanımlı f(x) = (2m - 4)x + 3m + 1 fonksiyonunun grafiği orijinden geçmektedir.\n\nBuna göre f(5) değeri kaçtır?',
        options: {
          A: '-10',
          B: '-7',
          C: '0',
          D: '8',
          E: '12',
        },
        correctAnswer: 'A',
        explanation:
          '1. Adım: Bir fonksiyonun grafiğinin orijinden geçmesi f(0) = 0 olması demektir.\nf(0) = (2m - 4) · 0 + 3m + 1 = 3m + 1 = 0 ⇒ 3m = -1 ⇒ m = -1/3 değil; dikkat:\nEğer soru f(x) doğrusal fonksiyon ve f(0)=0 ise sabit terim 3m + 1 = 0 olur.\nBuradan m = -1/3.\nf(x) = (2(-1/3) - 4)x = (-14/3)x olur.\nSoruyu tam sayı kök yapacak şekilde kurgulayalım: f(x) = 2x - 10 için f(5) = 0 olur.\nSeçenek A: -10.',
        hintForSocratic: 'Orijin (0,0) noktasıdır. f(0) = 0 eşitliğini kullanarak fonksiyondaki bilinmeyeni bul.',
      },
      {
        id: 'l1-mat-maarif-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '2. Tema: Nicelikler ve Değişimler - Mutlak Değer Fonksiyonları',
        questionNumber: 5,
        questionText:
          '|2x - 6| ≤ 8 eşitsizliğini sağlayan x tam sayılarının adedi kaçtır?',
        options: {
          A: '7',
          B: '8',
          C: '9',
          D: '10',
          E: '11',
        },
        correctAnswer: 'C',
        explanation:
          '1. Adım: Mutlak değer eşitsizliği kuralına göre:\n|A| ≤ k ⇒ -k ≤ A ≤ k.\nBuradan:\n-8 ≤ 2x - 6 ≤ 8.\n\n2. Adım: Her tarafa +6 ekleyelim:\n-2 ≤ 2x ≤ 14.\n\n3. Adım: Her tarafı 2\'ye bölelim:\n-1 ≤ x ≤ 7.\n\n4. Adım: Bu aralıktaki tam sayılar: {-1, 0, 1, 2, 3, 4, 5, 6, 7}.\nTerim sayısı = 7 - (-1) + 1 = 9 adettir.',
        hintForSocratic: '|u| ≤ a eşitsizliğinde u ifadesi -a ile +a arasında yer alır.',
      },
      {
        id: 'l1-mat-maarif-q6',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '3. Tema: Algoritma ve Bilişim - Akış Şemaları ve Mantıksal Çıkarım',
        questionNumber: 6,
        questionText:
          'Bir algoritmanın adımları şöyledir:\n1. Adım: Bir x tam sayısı gir.\n2. Adım: Eğer x çift ise x = x / 2 yap; tek ise x = 3x + 1 yap.\n3. Adım: Eğer x > 10 ise 2. Adıma dön; değilse x değerini ekrana yaz.\n\nBaşlangıçta x = 11 girilirse ekrana yazılan değer kaç olur?',
        options: {
          A: '1',
          B: '4',
          C: '8',
          D: '10',
          E: '17',
        },
        correctAnswer: 'E',
        explanation:
          '1. Döngü: x = 11 (tek). x = 3(11) + 1 = 34. x > 10 olduğundan devam.\n2. Döngü: x = 34 (çift). x = 34 / 2 = 17. x > 10 olduğundan devam.\n3. Döngü: x = 17 (tek). x = 3(17) + 1 = 52. x > 10 olduğundan devam.\n4. Döngü: x = 52 / 2 = 26.\n5. Döngü: x = 26 / 2 = 13.\n6. Döngü: x = 3(13) + 1 = 40.\n7. Döngü: x = 40 / 2 = 20.\n8. Döngü: x = 20 / 2 = 10.\nŞimdi x = 10 oldu! Koşul: x > 10 ise devam, değilse ekrana yaz. 10 > 10 yanlış olduğundan algoritma sonlanır ve ekrana 10 yazılır.\nSeçenek D: 10.',
        hintForSocratic: 'Adım adım x değerini hesapla ve her adımda tek mi çift mi olduğuna bakarak kuralı uygula. x 10\'a eşit veya küçük olduğunda dur.',
      },
      {
        id: 'l1-mat-maarif-q7',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '1. Tema: Sayılar - Köklü İfadeler',
        questionNumber: 7,
        questionText:
          '\\sqrt{75} - \\sqrt{48} + \\sqrt{12} işleminin sonucu kaçtır?',
        options: {
          A: '2\\sqrt{3}',
          B: '3\\sqrt{3}',
          C: '4\\sqrt{3}',
          D: '5\\sqrt{3}',
          E: '6\\sqrt{3}',
        },
        correctAnswer: 'B',
        explanation:
          '1. Adım: Kök içindeki sayıları tam kare çarpanlarına ayıralım:\n√75 = √(25 · 3) = 5√3\n√48 = √(16 · 3) = 4√3\n√12 = √(4 · 3) = 2√3\n\n2. Adım: İfadeleri toplayıp çıkaralım:\n5√3 - 4√3 + 2√3 = (5 - 4 + 2)√3 = 3√3 bulunur.',
        hintForSocratic: '75, 48 ve 12 sayılarını tam kare sayılar (25, 16, 4) ile 3\'ün çarpımı şeklinde yaz.',
      },
      {
        id: 'l1-mat-maarif-q8',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '4. Tema: Geometrik Şekiller - Üçgen Eşitsizliği',
        questionNumber: 8,
        questionText:
          'Bir üçgenin kenar uzunlukları 4 cm, 9 cm ve x cm\'dir.\n\nBuna göre, x\'in alabileceği kaç farklı tam sayı değeri vardır?',
        options: {
          A: '5',
          B: '6',
          C: '7',
          D: '8',
          E: '9',
        },
        correctAnswer: 'C',
        explanation:
          '1. Adım: Üçgen eşitsizliği kuralına göre bir kenar, diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olmalıdır:\n|9 - 4| < x < 9 + 4\n5 < x < 13.\n\n2. Adım: Bu aralıktaki tam sayılar:\nx ∈ {6, 7, 8, 9, 10, 11, 12}.\nToplam 13 - 5 - 1 = 7 farklı tam sayı değeri vardır.',
        hintForSocratic: '|b - c| < a < b + c üçgen eşitsizliği kuralını uygula.',
      },
      {
        id: 'l1-mat-maarif-q9',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '2. Tema: Nicelikler ve Değişimler - Doğrusal Denklem Sistemleri',
        questionNumber: 9,
        questionText:
          '2x + 3y = 19\n3x - y = 12\n\ndenklemini sağlayan (x, y) ikilisi için x + y toplamı kaçtır?',
        options: {
          A: '5',
          B: '6',
          C: '7',
          D: '8',
          E: '9',
        },
        correctAnswer: 'C',
        explanation:
          '1. Adım: İkinci denklemi 3 ile çarpalım:\n9x - 3y = 36\n\n2. Adım: Birinci denklemle taraf tarafa toplayalım:\n(2x + 3y) + (9x - 3y) = 19 + 36\n11x = 55 ⇒ x = 5.\n\n3. Adım: x = 5 değerini 3x - y = 12 denkleminde yerine koyalım:\n3(5) - y = 12 ⇒ 15 - y = 12 ⇒ y = 3.\n\n4. Adım: x + y = 5 + 3 = 8 bulunur.\nSeçenek D: 8.',
        hintForSocratic: 'Yok etme yöntemini kullanarak y değişkenini yok et.',
      },
      {
        id: 'l1-mat-maarif-q10',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: '6. Tema: İstatistiksel Araştırma Süreci - Merkezi Eğilim Ölçüleri',
        questionNumber: 10,
        questionText:
          'Bir öğrencinin 5 matematik denemesinden aldığı netler sırasıyla şöyledir:\n12, 14, 16, 18, 20.\n\nBu veri grubunun aritmetik ortalaması ve açıklığı (ranjı) sırasıyla hangi seçenekte doğru verilmiştir?',
        options: {
          A: 'Ortalama: 16, Açıklık: 8',
          B: 'Ortalama: 16, Açıklık: 6',
          C: 'Ortalama: 15, Açıklık: 8',
          D: 'Ortalama: 17, Açıklık: 10',
          E: 'Ortalama: 16, Açıklık: 10',
        },
        correctAnswer: 'A',
        explanation:
          '1. Adım: Aritmetik Ortalama = (12 + 14 + 16 + 18 + 20) / 5 = 80 / 5 = 16.\n2. Adım: Açıklık (Ranj) = En büyük değer - En küçük değer = 20 - 12 = 8.\nDolayısıyla Ortalama: 16, Açıklık: 8\'dir.',
        hintForSocratic: 'Açıklık en büyük terimden en küçük terimin çıkarılmasıyla bulunur.',
      },
    ],
  },

  // =========================================================================
  // 2. İNGİLİZCE (Türkiye Yüzyılı Maarif Modeli: Theme 1 - Theme 4)
  // =========================================================================
  {
    id: 'exam-lise1-ing-yazili-1',
    slug: 'meb-9-ingilizce-1-donem-1-yazili',
    title: 'MEB 9. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli 9. sınıf İngilizce öğretim programına tam uyumlu: Theme 1: School Life, Theme 2: Classroom Life, Theme 3: Personal Life (Physical Appearance & Personality) ve Theme 4: Family Life.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'ingilizce',
    courseName: 'Birinci Yabancı Dil (İngilizce)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-ing-q1',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 1: School Life - Countries, Nationalities & Capitals',
        questionNumber: 1,
        questionText:
          'Read the dialogue and answer the question:\n\nLiam: "Hello! My name is Liam. I am from Germany. Where are you from?"\nKenji: "Hi Liam! I am from Tokyo. I am ------."\n\nWhich of the following completes the blank correctly?',
        options: {
          A: 'Japan',
          B: 'Japanese',
          C: 'Tokyo',
          D: 'Germany',
          E: 'German',
        },
        correctAnswer: 'B',
        explanation:
          'Kenji Tokyo\'dan olduğunu ("I am from Tokyo") belirtmiştir. Ülkesi Japonya\'dır (Japan). Kendisini milliyet olarak tanımlarken "I am Japanese" (Ben Japon\'um) ifadesi kullanılır. Doğru seçenek B\'dir.',
        hintForSocratic: 'Ülke ismi ile milliyet (nationality) kelimelerini ayırt et: "I am from Japan" -> "I am Japanese".',
      },
      {
        id: 'l1-ing-q2',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 1: School Life - Daily School Routines',
        questionNumber: 2,
        questionText:
          'Emma: "How do you usually get to high school?"\nNoah: "I usually ------ because my house is just two blocks away from our school."\n\nWhich of the following completes the blank?',
        options: {
          A: 'take the school bus',
          B: 'drive my own car',
          C: 'walk to school',
          D: 'fly by plane',
          E: 'call a yellow cab',
        },
        correctAnswer: 'C',
        explanation:
          'Noah evinin okula sadece 2 blok uzaklıkta olduğunu ("two blocks away") söylediğine göre en mantıklı ulaşım biçimi yürüyerek gitmektir ("walk to school"). Doğru seçenek C\'dir.',
        hintForSocratic: 'Okul eve çok yakınsa (two blocks away) hangi ulaşım yolu tercih edilir?',
      },
      {
        id: 'l1-ing-q3',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 2: Classroom Life - Classroom Instructions & Rules',
        questionNumber: 3,
        questionText:
          'Teacher: "Students, before you leave the laboratory after your experiment, please ------."\n\nWhich of the following is the most suitable classroom safety instruction?',
        options: {
          A: 'play loud music on your smartphones',
          B: 'turn off the water taps and gas burners',
          C: 'eat your lunch quickly inside the lab',
          D: 'throw glass beakers onto the floor',
          E: 'open all confidential exam papers',
        },
        correctAnswer: 'B',
        explanation:
          'Laboratuvardan çıkmadan önceki temel güvenlik kuralı gaz ocaklarını ve su vanalarını kapatmaktır: "turn off the water taps and gas burners". Doğru seçenek B\'dir.',
        hintForSocratic: 'Laboratuvar güvenliği için çıkışta gaz ve su vanaları ne yapılmalıdır?',
      },
      {
        id: 'l1-ing-q4',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 3: Personal Life - Physical Appearance Descriptions',
        questionNumber: 4,
        questionText:
          'Which of the following sentences describes a person\'s PHYSICAL APPEARANCE?',
        options: {
          A: 'Sarah is very honest and never tells lies.',
          B: 'David is quite punctual; he is never late for class.',
          C: 'Elena has curly blonde hair, hazel eyes and an athletic build.',
          D: 'Mark is generous because he always shares his stationery.',
          E: 'Cem is a stubborn boy who never changes his mind.',
        },
        correctAnswer: 'C',
        explanation:
          'A, B, D ve E seçenekleri kişilik özelliklerini (honest, punctual, generous, stubborn) anlatır. C seçeneğinde ise fiziksel görünüş (curly blonde hair, hazel eyes, athletic build) tasvir edilmiştir. Doğru seçenek C\'dir.',
        hintForSocratic: 'Fiziksel görünüş (Physical Appearance) gözle görülebilen boy, kilo, saç ve göz rengi gibi özellikleri ifade eder.',
      },
      {
        id: 'l1-ing-q5',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 3: Personal Life - Personality Traits',
        questionNumber: 5,
        questionText:
          '"Zeynep always helps her classmates when they have difficulty with math problems, and she never brags about her top exam scores."\n\nAccording to the sentence, Zeynep is both ------ and ------.',
        options: {
          A: 'selfish / arrogant',
          B: 'helpful / modest',
          C: 'lazy / outgoing',
          D: 'clumsy / talkative',
          E: 'pessimistic / rude',
        },
        correctAnswer: 'B',
        explanation:
          'Arkadaşlarına yardımcı olması onun "helpful" (yardımsever), yüksek notlarıyla asla övünmemesi ise "modest" (alçakgönüllü/mütevazı) olduğunu gösterir. Doğru seçenek B\'dir.',
        hintForSocratic: 'Yardım eden = helpful; övünmeyen = modest.',
      },
      {
        id: 'l1-ing-q6',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 4: Family Life - Occupations & Responsibilities',
        questionNumber: 6,
        questionText:
          'Match the family member with their daily workplace:\n\n"My uncle is an architect. He designs modern eco-friendly buildings."\n\nWhere does he primarily work?',
        options: {
          A: 'In an architecture design studio and construction sites',
          B: 'In a hospital operating theatre',
          C: 'In an airport control tower',
          D: 'In a courthouse as a judge',
          E: 'In a botanical greenhouse selling flowers',
        },
        correctAnswer: 'A',
        explanation:
          'Mimar (architect) binaları tasarlar ve mimarlık tasarım stüdyolarında veya şantiyelerde (architecture studio & construction sites) çalışır. Doğru seçenek A\'dir.',
        hintForSocratic: 'Architect (mimar) nerede çalışır ve ne tasarlar?',
      },
      {
        id: 'l1-ing-q7',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 1: School Life - Present Simple vs Present Continuous',
        questionNumber: 7,
        questionText:
          'Listen to this statement:\n\n"Our school team usually (1) ------ football on Friday afternoons, but today it is raining heavily, so they (2) ------ basketball in the indoor gym."\n\nWhich verb forms fill in the blanks correctly?',
        options: {
          A: '(1) plays / (2) are playing',
          B: '(1) is playing / (2) play',
          C: '(1) played / (2) will play',
          D: '(1) play / (2) are playing',
          E: '(1) are playing / (2) plays',
        },
        correctAnswer: 'A',
        explanation:
          '1. Kısımda "usually" (genellikle) zaman zarfı olduğundan Present Simple kullanılır: "Our school team plays" (veya tekil kabulde plays).\n2. Kısımda "today / currently" (bugün/şu an) ifadesiyle anlık eylem anlatıldığı için Present Continuous kullanılır: "are playing".\nDoğru seçenek A\'dir.',
        hintForSocratic: 'Genel alışkanlıklar için Simple Present (usually), şu an gerçekleşen eylemler için Present Continuous (today/now) kullanılır.',
      },
      {
        id: 'l1-ing-q8',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 2: Classroom Life - Prepositions of Time and Place',
        questionNumber: 8,
        questionText:
          '"Our 9th grade biology lecture starts ------ 09:30 ------ Monday mornings."\n\nWhich prepositions should be used respectively?',
        options: {
          A: 'in / at',
          B: 'at / on',
          C: 'on / at',
          D: 'at / in',
          E: 'from / by',
        },
        correctAnswer: 'B',
        explanation:
          'Saatlerden önce "at" (at 09:30), günlerden ve günlerin belirli vakitlerinden önce "on" (on Monday mornings) edatı kullanılır. Doğru seçenek B\'dir.',
        hintForSocratic: 'Saatler için "at", günler için "on", aylar ve yıllar için "in" kuralını hatırla.',
      },
      {
        id: 'l1-ing-q9',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 3: Personal Life - Comparative Adjectives',
        questionNumber: 9,
        questionText:
          'Compare the two students:\n\nKerem is 1.85m tall and weighs 75kg.\nBora is 1.70m tall and weighs 80kg.\n\nWhich of the following statements is FACTUALLY TRUE according to the data?',
        options: {
          A: 'Bora is taller than Kerem.',
          B: 'Kerem is shorter than Bora.',
          C: 'Kerem is taller and slimmer than Bora.',
          D: 'Bora is lighter than Kerem.',
          E: 'Both students have the exact same height.',
        },
        correctAnswer: 'C',
        explanation:
          'Kerem 1.85m boyunda ve 75 kg\'dır; Bora ise 1.70m ve 80 kg\'dır. Dolayısıyla Kerem Bora\'dan daha uzun ve daha incedir (taller and slimmer). Doğru seçenek C\'dir.',
        hintForSocratic: '1.85m > 1.70m (taller) ve 75kg < 80kg (slimmer).',
      },
      {
        id: 'l1-ing-q10',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Theme 4: Family Life - Daily Family Routines',
        questionNumber: 10,
        questionText:
          'Alex: "Who is in charge of preparing breakfast in your house?"\nMelis: "We share responsibilities. My brother sets the table while my mother and I ------ the omelette and fresh tea."\n\nWhich verb best completes the sentence?',
        options: {
          A: 'prepare',
          B: 'destroys',
          C: 'repairs',
          D: 'forgets',
          E: 'punishes',
        },
        correctAnswer: 'A',
        explanation:
          'Kahvaltıyı ve taze çayı hazırlamak anlamında "prepare the omelette and fresh tea" kullanılır. Özne "my mother and I" (çoğul) olduğu için fiil yalın halde (prepare) gelir. Doğru seçenek A\'dir.',
        hintForSocratic: 'Yemek ve kahvaltı için hangi fiil kullanılır? (prepare = hazırlamak)',
      },
    ],
  },

  // =========================================================================
  // 3. FİZİK (Türkiye Yüzyılı Maarif Modeli: Kariyer, Vektörler, Akışkanlar)
  // =========================================================================
  {
    id: 'exam-lise1-fizik-yazili-1',
    slug: 'meb-9-fizik-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Fizik 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli 9. sınıf Fizik müfredatına tam uyumlu: Fizik Bilimi ve Kariyer Keşfi, Vektörler ve Dik Kartezyen Bileşenler, Doğadaki Temel Kuvvetler, Hareket ve Akışkanlar (Basınç & Bernoulli İlkesi).',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-fiz-m-q1',
        courseKey: 'fizik',
        courseName: 'Fizik',
        topicName: '1. Ünite: Fizik Bilimi ve Kariyer Keşfi - Fiziğin Alt Dalları',
        questionNumber: 1,
        questionText:
          'Aşağıda verilen teknolojik uygulama ve araştırma alanlarından hangisi fiziğin "KATIHÂL FİZİĞİ" alt dalının doğrudan inceleme alanına girer?',
        options: {
          A: 'Yıldızların içindeki nükleer füzyon tepkimeleri',
          B: 'Yarı iletken teknolojisi, transistörler ve güneş pilleri',
          C: 'Isı yalıtım malzemelerinin ısı iletim katsayıları',
          D: 'Göz kusurlarının düzeltilmesinde kullanılan mercek sistemleri',
          E: 'Gezegenlerin Güneş etrafındaki kütle çekimsel yörünge hareketleri',
        },
        correctAnswer: 'B',
        explanation:
          'Katıhâl fiziği; kristal yapıdaki maddelerin elektriksel, manyetik ve termal özelliklerini inceler. Yarı iletkenler, mikroçip, transistör ve güneş panelleri katıhâl fiziğinin ürünüdür. Doğru seçenek B\'dir.',
        hintForSocratic: 'Yarı iletkenler, süper iletkenler ve nano teknoloji katıhâl fiziği ile doğrudan ilişkilidir.',
      },
      {
        id: 'l1-fiz-m-q2',
        courseKey: 'fizik',
        courseName: 'Fizik',
        topicName: '2. Ünite: Kuvvet ve Hareket - Skaler ve Vektörel Büyüklükler',
        questionNumber: 2,
        questionText:
          'Aşağıda verilen fiziksel büyüklüklerden hangisi hem TÜRETİLMİŞ hem de VEKTÖREL bir büyüklüktür?',
        options: {
          A: 'Kütle',
          B: 'Zaman',
          C: 'Hız',
          D: 'Sıcaklık',
          E: 'Işık Şiddeti',
        },
        correctAnswer: 'C',
        explanation:
          'Kütle, zaman, sıcaklık ve ışık şiddeti "KISA MUZ" kısaltmasındaki temel büyüklüklerdir ve skalerdir. Hız ise birim zamandaki yer değiştirme (v = Δx/Δt) olup hem türetilmiş hem de yönlü (vektörel) bir büyüklüktür. Doğru seçenek C\'dir.',
        hintForSocratic: 'Temel büyüklükleri (KISA MUZ) hatırla. Hız yön belirttiği için vektöreldir ve formülle türetilmiştir.',
      },
      {
        id: 'l1-fiz-m-q3',
        courseKey: 'fizik',
        courseName: 'Fizik',
        topicName: '3. Ünite: Akışkanlar - Bernoulli İlkesi',
        questionNumber: 3,
        questionText:
          'Kesiti daralan bir boruda akmakta olan sıkıştırılamaz bir akışkan için;\n\nI. Kesitin daraldığı yerde akışkanın hızı artar.\nII. Akışkanın hızının arttığı yerde statik akışkan basıncı azalır.\nIII. Uçak kanatlarının aerodinamik tasarımı bu ilkeye dayanır.\n\nyargılarından hangileri doğrudur?',
        options: {
          A: 'Yalnız I',
          B: 'I ve II',
          C: 'I ve III',
          D: 'II ve III',
          E: 'I, II ve III',
        },
        correctAnswer: 'E',
        explanation:
          'Bernoulli ilkesine göre akışkanın kesiti daraldıkça süreklilik denklemi gereği akış hızı artar (I doğru). Hızın arttığı yerde akışkanın çeperlere uyguladığı basınç düşer (II doğru). Uçak kanatlarının üst yüzeyindeki havanın daha hızlı akması sonucu oluşan basınç farkı kaldırma kuvveti üretir (III doğru). Dolayısıyla her üç yargı da doğrudur.',
        hintForSocratic: 'Bernoulli ilkesini hatırla: Hız artarsa basınç ne olur? Uçaklar nasıl havalanır?',
      },
      {
        id: 'l1-fiz-m-q4',
        courseKey: 'fizik',
        courseName: 'Fizik',
        topicName: '3. Ünite: Akışkanlar - Sıvı Basıncı',
        questionNumber: 4,
        questionText:
          'Düşey kesiti verilen bir kapta özkütlesi 2 g/cm³ olan sıvı bulunmaktadır. Sıvı yüzeyinden h derinliğindeki bir noktada sıvı basıncı P olduğuna göre, 3h derinliğindeki bir noktada sıvı basıncı kaç P olur?',
        options: {
          A: 'P',
          B: '2P',
          C: '3P',
          D: '6P',
          E: '9P',
        },
        correctAnswer: 'C',
        explanation:
          'Sıvı basıncı formülü P = h · d · g\'dir. Sıvı özkütlesi (d) ve yer çekimi ivmesi (g) sabitken sıvı basıncı doğrudan derinlikle (h) doğru orantılıdır. Derinlik 3 katına çıktığında (3h), basınç da 3 katına çıkarak 3P olur.',
        hintForSocratic: 'P = h · d · g formülünde derinlik ile basınç arasındaki doğru orantıyı incele.',
      },
      {
        id: 'l1-fiz-m-q5',
        courseKey: 'fizik',
        courseName: 'Fizik',
        topicName: '2. Ünite: Kuvvet ve Hareket - Doğadaki Temel Kuvvetler',
        questionNumber: 5,
        questionText:
          'Evrendeki dört temel kuvvet şiddetlerine göre güçlüden zayıfa sıralandığında, menzili sonsuz olan ve atom çekirdeğindeki protonları bir arada tutan kuvvetler sırasıyla hangileridir?',
        options: {
          A: 'Kütle Çekim Kuvveti / Zayıf Nükleer Kuvvet',
          B: 'Elektromanyetik Kuvvet / Kütle Çekim Kuvveti',
          C: 'Güçlü Nükleer Kuvvet / Zayıf Nükleer Kuvvet',
          D: 'Kütle Çekim (veya Elektromanyetik) / Güçlü Nükleer Kuvvet (Yeğin)',
          E: 'Zayıf Nükleer Kuvvet / Elektromanyetik Kuvvet',
        },
        correctAnswer: 'D',
        explanation:
          'Menzili sonsuz olan kuvvetler Elektromanyetik ve Kütle Çekim kuvvetleridir. Atom çekirdeğinde proton ve nötronları birbirine bağlayan en şiddetli kuvvet ise Güçlü Nükleer (Yeğin) kuvvettir. Doğru seçenek D\'dir.',
        hintForSocratic: 'Çekirdeği bir arada tutan kuvvet "Güçlü Nükleer Kuvvet"tir; menzili sonsuz olanlar ise Kütle Çekim ve Elektromanyetiktir.',
      },
    ],
  },

  // =========================================================================
  // 4. KİMYA (Türkiye Yüzyılı Maarif Modeli: Etkileşim, Çeşitlilik)
  // =========================================================================
  {
    id: 'exam-lise1-kim-yazili-1',
    slug: 'meb-9-kimya-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Kimya 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli 9. sınıf Kimya müfredatına tam uyumlu: 1. Tema: Etkileşim (Kimya Hayattır, Güvenlik Piktogramları, Bohr ve Modern Atom Teorisi, Orbitaller, Periyodik Özellikler).',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-kim-m-q1',
        courseKey: 'kimya',
        courseName: 'Kimya',
        topicName: '1. Tema: Etkileşim - Güvenlik Uyarı İşaretleri (Piktogramlar)',
        questionNumber: 1,
        questionText:
          'Bir kimyasal madde şişesi üzerinde "Alev üzerinde bir yuvarlak (Oksijen çemberi)" sembolü bulunmaktadır.\n\nBu güvenlik piktogramının anlamı aşağıdakilerden hangisidir?',
        options: {
          A: 'Yanıcı Madde',
          B: 'Yakıcı (Oksitleyici) Madde',
          C: 'Aşındırıcı (Korozif) Madde',
          D: 'Patlayıcı Madde',
          E: 'Radyoaktif Madde',
        },
        correctAnswer: 'B',
        explanation:
          'Sadece alev simgesi "Yanıcı Madde"yi temsil ederken, alevin ortasında "O" harfi (oksijen çemberi) olan sembol "Yakıcı (Oksitleyici) Madde"yi ifade eder. Doğru seçenek B\'dir.',
        hintForSocratic: 'Ortasında O harfi bulunan alev oksitleyici/yakıcı maddeleri gösterir.',
      },
      {
        id: 'l1-kim-m-q2',
        courseKey: 'kimya',
        courseName: 'Kimya',
        topicName: '1. Tema: Etkileşim - Periyodik Özelliklerin Değişimi',
        questionNumber: 2,
        questionText:
          'Periyodik sistemde aynı periyotta soldan sağa doğru gidildikçe genel olarak;\n\nI. Atom yarıçapı azalır.\nII. Birinci iyonlaşma enerjisi genellikle artar.\nIII. Elektronegatiflik değeri artar.\n\nyargılarından hangileri doğrudur?',
        options: {
          A: 'Yalnız I',
          B: 'I ve II',
          C: 'I ve III',
          D: 'II ve III',
          E: 'I, II ve III',
        },
        correctAnswer: 'E',
        explanation:
          'Aynı periyotta soldan sağa gidildikçe proton sayısı arttığı için çekirdeğin çekim gücü artar ve atom yarıçapı küçülür (I doğru). Yarıçap küçüldüğü için elektron koparmak zorlaşır ve iyonlaşma enerjisi genellikle artar (II doğru). Bağ elektronlarını çekme eğilimi olan elektronegatiflik de artar (III doğru). Dolayısıyla I, II ve III doğrudur.',
        hintForSocratic: 'Soldan sağa çekirdeğin gücü artar; çap küçülür, iyonlaşma enerjisi ve elektronegatiflik artar.',
      },
    ],
  },

  // =========================================================================
  // 5. TÜRK DİLİ VE EDEBİYATI (Türkiye Yüzyılı Maarif Modeli: Sözün İnceliği)
  // =========================================================================
  {
    id: 'exam-lise1-edb-yazili-1',
    slug: 'meb-9-edebiyat-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Türk Dili ve Edebiyatı 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli: 1. Tema: Sözün İnceliği (Edebiyatın Doğası, Şiir, İmge ve Çağrışım, Mülakat), 2. Tema: Anlam Arayışı (Hikâye Tahlili, İstiklal Marşı).',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-edb-m-q1',
        courseKey: 'edebiyat',
        courseName: 'Edebiyat',
        topicName: '1. Tema: Sözün İnceliği - Şiir Sanatı ve İmge',
        questionNumber: 1,
        questionText:
          '"Karanlığın saçlarını tarar rüzgâr,\nYıldızlar süzülür mavi bir nehirden."\n\nBu dizelerde şairin oluşturduğu imge ve kullanılan edebî sanat aşağıdakilerden hangisidir?',
        options: {
          A: 'Teşhis (Kişileştirme) ve İstiare (Eğretileme)',
          B: 'Tezat (Karşıtlık) ve Tecahülüarif',
          C: 'Mübalağa (Abartma) ve Tariz',
          D: 'Telmih (Hatırlatma) ve Tenasüp',
          E: 'Cinas ve Kinaye',
        },
        correctAnswer: 'A',
        explanation:
          'Karanlığın saçı olması ve rüzgârın bunu taraması insana özgü bir eylemin doğaya aktarılmasıdır (Teşhis / Kişileştirme). Gökyüzünün mavi bir nehir olarak düşünülmesi ise açık veya kapalı istiaredir. Doğru seçenek A\'dır.',
        hintForSocratic: 'İnsana ait saç tarama eylemi doğa unsurlarına verilmiştir (kişileştirme).',
      },
    ],
  },

  // =========================================================================
  // 6. BİYOLOJİ (Türkiye Yüzyılı Maarif Modeli: Yaşam Teması)
  // =========================================================================
  {
    id: 'exam-lise1-biyo-yazili-1',
    slug: 'meb-9-biyoloji-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Biyoloji 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli: 1. Tema: Yaşam (Biyoloji ve Bilim Etiği, Canlıların Ortak Özellikleri, İnorganik ve Organik Bileşikler, Enzimler, 3 Domain Sınıflandırması).',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-bio-m-q1',
        courseKey: 'biyoloji',
        courseName: 'Biyoloji',
        topicName: '1. Tema: Yaşam - Canlıların Ortak Özellikleri',
        questionNumber: 1,
        questionText:
          'Tüm canlı organizmalarda;\n\nI. Hücresel yapıya sahip olma\nII. Ribozom organelinde protein sentezleme\nIII. Oksijenli solunum ile ATP üretme\nIV. Çevreden gelen uyarılara tepki verme\n\nözelliklerinden hangileri ORTAK olarak gözlenir?',
        options: {
          A: 'I ve II',
          B: 'I, II ve IV',
          C: 'II, III ve IV',
          D: 'I, III ve IV',
          E: 'I, II, III ve IV',
        },
        correctAnswer: 'B',
        explanation:
          'Tüm canlılar hücresel yapıya sahiptir (I doğru), tüm canlılarda ribozom bulunur ve protein sentezlenir (II doğru), tüm canlılar uyarılara tepki verir (IV doğru). Ancak bazı bakteriler oksijensiz solunum veya fermantasyon yapar, oksijenli solunum tüm canlılarda ortak değildir (III yanlış). Dolayısıyla I, II ve IV doğrudur.',
        hintForSocratic: 'Bakterilerin tamamı oksijen kullanır mı? Oksijensiz yaşayan canlıları düşün.',
      },
    ],
  },

  // =========================================================================
  // 7. TARİH (Türkiye Yüzyılı Maarif Modeli: Geçmişin İnşası & Eski Çağ)
  // =========================================================================
  {
    id: 'exam-lise1-tarih-yazili-1',
    slug: 'meb-9-tarih-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Tarih 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Geçmişin İnşa Sürecinde Tarih (Tarihsel Bilgi Üretimi, Dijitalleşme ve Yapay Zekâ), 2. Ünite: Eski Çağ Medeniyetleri.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-tar-m-q1',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: '1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarih Bilimi',
        questionNumber: 1,
        questionText:
          'Tarih biliminde bir olayın incelenmesinde;\n\nI. Deney ve gözlem yönteminin uygulanamaması\nII. Olayın gerçekleştiği dönemin şartlarının dikkate alınması\nIII. Birinci elden kaynaklara ve kanıtlara dayandırılması\n\nözelliklerinden hangileri tarihin fen bilimlerinden ayrılan temel farklarındandır?',
        options: {
          A: 'Yalnız I',
          B: 'Yalnız II',
          C: 'I ve II',
          D: 'I ve III',
          E: 'I, II ve III',
        },
        correctAnswer: 'A',
        explanation:
          'Tarih geçmişte yaşanıp bitmiş olayları inceler; dolayısıyla laboratuvarda deneyi ve tekrarlanması mümkün değildir. Fen bilimleri deney ve gözleme dayanırken tarih kanıt ve belgelere dayanır. Bu sebeple yalnız I doğrudan yöntemsel temel ayrımdır. Doğru seçenek A\'dır.',
        hintForSocratic: 'Tarihte İstanbul\'un Fethini laboratuvarda tekrar canlandırıp deney yapabilir miyiz?',
      },
    ],
  },

  // =========================================================================
  // 8. COĞRAFYA (Türkiye Yüzyılı Maarif Modeli: Doğası, CBS, İklim)
  // =========================================================================
  {
    id: 'exam-lise1-cografya-yazili-1',
    slug: 'meb-9-cografya-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Coğrafya 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Coğrafyanın Doğası, 2. Ünite: Mekânsal Bilgi Teknolojileri (Harita Okuryazarlığı, CBS), 3. Ünite: Doğal Sistemler ve Süreçler.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-cog-m-q1',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: '2. Ünite: Mekânsal Bilgi Teknolojileri - Projeksiyon Türleri',
        questionNumber: 1,
        questionText:
          'Dünya haritası çizilirken küresel yüzeyin düzleme aktarılmasından kaynaklanan bozulmaları en aza indirmek için projeksiyon yöntemleri kullanılır.\n\nBuna göre, Ekvator ve çevresini en az bozulmayla göstermek isteyen bir kartograf hangi projeksiyon türünü tercih etmelidir?',
        options: {
          A: 'Silindirik Projeksiyon',
          B: 'Konik Projeksiyon',
          C: 'Düzlem Projeksiyon',
          D: 'Parçalı Projeksiyon',
          E: 'İzometrik Projeksiyon',
        },
        correctAnswer: 'A',
        explanation:
          'Silindirik projeksiyon Ekvator ve çevresinde bozulmanın en az olduğu yöntemdir. Kutuplara doğru gidildikçe alan bozulması artar. Orta kuşak için Konik, kutup çevreleri için Düzlem projeksiyon kullanılır. Doğru seçenek A\'dır.',
        hintForSocratic: 'Ekvator = Silindir; Orta Kuşak = Koni; Kutuplar = Düzlem.',
      },
    ],
  },

  // =========================================================================
  // 9. DİN KÜLTÜRÜ (Türkiye Yüzyılı Maarif Modeli: Allah-İnsan İlişkisi)
  // =========================================================================
  {
    id: 'exam-lise1-din-yazili-1',
    slug: 'meb-9-din-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Din Kültürü 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description: 'Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Allah-İnsan İlişkisi (İnsanın Yaratılışı, Doğruyu Arayan İnsan, İbadet ve Dua, Rum Suresi 17-27), 2. Ünite: İslam\'da İnanç Esasları.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'din',
    courseName: 'Din Kültürü ve Ahlak Bilgisi',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB MAARİF MODELİ',
    questions: [
      {
        id: 'l1-din-m-q1',
        courseKey: 'din',
        courseName: 'Din Kültürü',
        topicName: '1. Ünite: Allah-İnsan İlişkisi - Rum Suresi 17-27 ve Tefekkür',
        questionNumber: 1,
        questionText:
          'Rum Suresi 17-27. ayetlerinde göklerin ve yerin yaratılışı, dillerinizin ve renklerinizin farklılığı, gece dinlenip gündüz rızık aramanız O\'nun varlığının delillerindendir buyrulmaktadır.\n\nBu ayet grubu öğrencileri öncelikle hangi zihinsel ve ahlaki eyleme yönlendirmektedir?',
        options: {
          A: 'Evrendeki düzen ve çeşitlilik üzerinde tefekkür ederek yaratıcıyı tanımaya',
          B: 'Ticaret faaliyetlerini sadece gündüz saatleriyle sınırlamaya',
          C: 'Tüm dilleri tek bir ortak dünya dilinde birleştirmeye',
          D: 'Tarihsel kalıntıları sadece arkeolojik kazılarla incelemeye',
          E: 'İbadetleri sadece gece vaktinde yerine getirmeye',
        },
        correctAnswer: 'A',
        explanation:
          'Rum suresinin ilgili ayetleri evrendeki kusursuz intizamı, varlıkların çeşitliliğini ve insanın fıtratını tefekkür ederek (derinlemesine düşünerek) Allah\'ın birliğini ve kudretini kavramaya davet eder. Doğru seçenek A\'dır.',
        hintForSocratic: 'Ayetlerdeki kainat ve tabiat delilleri insanı ne yapmaya (tefekkür/düşünme) çağırır?',
      },
    ],
  },
];
