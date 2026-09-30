import type { OnlineExam } from '@/types/online-exam';

// MEB 2024-2025 / 2025-2026 / 2026-2027 Türkiye Yüzyılı Maarif Modeli Uyumlu
// 9. Sınıf Resmi MEB Ortak Yazılı Sınavı Provaları (9 Temel Dersin Tamamı - Her Ders 10 Soru)

export const LISE1_EXAMS: OnlineExam[] = [
  {
    "id": "exam-lise1-mat-yazili-1",
    "slug": "meb-9-matematik-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli 9. sınıf müfredatına tam uyumlu: Gerçek sayıların üslü ve köklü gösterimleri, sayı kümeleri, gerçek sayı aralıkları, iki kare farkı/tam kare özdeşlikleri ve doğrusal fonksiyonlar.",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "matematik",
    "courseName": "Matematik (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-mat-maarif-q1",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "1. Tema: Sayılar - Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "questionNumber": 1,
        "questionText": "A = 2⁵ · 3² ve B = 2³ · 3⁴ olarak veriliyor.\n\nBuna göre, (A · B) / 6⁴ işleminin sonucu aşağıdakilerden hangisidir?",
        "options": {
          "A": "24",
          "B": "36",
          "C": "72",
          "D": "108",
          "E": "144"
        },
        "correctAnswer": "E",
        "explanation": "1. Adım: A ve B sayılarını çarpalım:\nA · B = (2⁵ · 3²) · (2³ · 3⁴) = 2⁸ · 3⁶.\n\n2. Adım: Paydadaki 6⁴ ifadesini asal çarpanlarına ayıralım:\n6⁴ = (2 · 3)⁴ = 2⁴ · 3⁴.\n\n3. Adım: Bölme işlemini gerçekleştirelim:\n(2⁸ · 3⁶) / (2⁴ · 3⁴) = 2⁴ · 3² = 16 · 9 = 144.\n\nDoğru cevap E seçeneğidir.",
        "hintForSocratic": "Üslü sayılarda tabanlar aynı iken çarpma yapılırken üsler toplanır, bölme yapılırken payın üssünden paydanın üssü çıkarılır. 6 sayısını 2 ve 3 cinsinden yazmayı dene."
      },
      {
        "id": "l1-mat-maarif-q2",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "1. Tema: Sayılar - Gerçek Sayı Aralıkları ve Kümeler",
        "questionNumber": 2,
        "questionText": "Gerçek sayılar kümesinde A = [-3, 5) ve B = (1, 8] aralıkları tanımlanıyor.\n\nBuna göre, (A ∩ B) kümesinde yer alan tam sayıların toplamı kaçtır?",
        "options": {
          "A": "7",
          "B": "9",
          "C": "12",
          "D": "14",
          "E": "15"
        },
        "correctAnswer": "B",
        "explanation": "1. Adım: A ve B aralıklarının kesişimini (ortak elemanlarını) bulalım:\nA = [-3, 5) ve B = (1, 8].\nKesişimde alt sınırların büyüğü (max(-3, 1) = 1) ve üst sınırların küçüğü (min(5, 8) = 5) alınır.\nDolayısıyla A ∩ B = (1, 5) açık aralığıdır.\n\n2. Adım: (1, 5) aralığındaki tam sayıları listeleyelim:\nx ∈ {2, 3, 4}.\n\n3. Adım: Tam sayıların toplamı: 2 + 3 + 4 = 9 bulunur.\nDoğru seçenek B'dir.",
        "hintForSocratic": "İki aralığın kesişimini bulurken sayı doğrusu üzerinde iki aralığı da çiz ve her ikisinde de ortak taranan bölgeyi belirle."
      },
      {
        "id": "l1-mat-maarif-q3",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "1. Tema: Sayılar - İki Kare Farkı ve Tam Kare Özdeşlikleri",
        "questionNumber": 3,
        "questionText": "x ve y pozitif gerçek sayılar olmak üzere,\nx² - y² = 45 ve x - y = 3\n\nolduğuna göre, x · y çarpımının değeri kaçtır?",
        "options": {
          "A": "48",
          "B": "54",
          "C": "60",
          "D": "72",
          "E": "81"
        },
        "correctAnswer": "B",
        "explanation": "1. Adım: İki kare farkı özdeşliğini kullanalım:\nx² - y² = (x - y)(x + y) = 45.\n\n2. Adım: x - y = 3 verildiğine göre:\n3 · (x + y) = 45 ⇒ x + y = 15.\n\n3. Adım: Taraf tarafa toplayalım:\nx - y = 3\nx + y = 15\n2x = 18 ⇒ x = 9.\nx = 9 ise 9 + y = 15 ⇒ y = 6.\n\n4. Adım: x · y = 9 · 6 = 54 bulunur.",
        "hintForSocratic": "x² - y² ifadesinin (x - y)(x + y) şeklinde çarpanlarına ayrıldığını hatırla."
      },
      {
        "id": "l1-mat-maarif-q4",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "2. Tema: Nicelikler ve Değişimler - Doğrusal Fonksiyonlar",
        "questionNumber": 4,
        "questionText": "Gerçek sayılarda tanımlı f(x) = (3m - 6)x + 2m + 4 fonksiyonunun grafiği orijinden geçmektedir.\n\nBuna göre f(2) değeri kaçtır?",
        "options": {
          "A": "-24",
          "B": "-18",
          "C": "-12",
          "D": "6",
          "E": "12"
        },
        "correctAnswer": "A",
        "explanation": "1. Adım: Orijinden geçme koşulu f(0) = 0 olmasıdır.\nf(0) = (3m - 6) · 0 + 2m + 4 = 2m + 4 = 0\n2m = -4 ⇒ m = -2.\n\n2. Adım: m = -2 değerini fonksiyonda yerine koyalım:\nf(x) = (3(-2) - 6)x + 2(-2) + 4\nf(x) = (-6 - 6)x + (-4 + 4)\nf(x) = -12x.\n\n3. Adım: f(2) = -12 · 2 = -24.\n\nDoğru cevap A seçeneğidir.",
        "hintForSocratic": "Orijin (0, 0) noktasıdır. Bir fonksiyonun orijinden geçmesi f(0) = 0 demektir. Bu eşitlikten m'yi bul."
      },
      {
        "id": "l1-mat-maarif-q5",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "2. Tema: Nicelikler ve Değişimler - Mutlak Değer Fonksiyonları",
        "questionNumber": 5,
        "questionText": "|2x - 6| ≤ 8 eşitsizliğini sağlayan x tam sayılarının adedi kaçtır?",
        "options": {
          "A": "7",
          "B": "8",
          "C": "9",
          "D": "10",
          "E": "11"
        },
        "correctAnswer": "C",
        "explanation": "1. Adım: Mutlak değer eşitsizliği kuralına göre:\n|A| ≤ k ⇒ -k ≤ A ≤ k.\nBuradan:\n-8 ≤ 2x - 6 ≤ 8.\n\n2. Adım: Her tarafa +6 ekleyelim:\n-2 ≤ 2x ≤ 14.\n\n3. Adım: Her tarafı 2'ye bölelim:\n-1 ≤ x ≤ 7.\n\n4. Adım: Bu aralıktaki tam sayılar: {-1, 0, 1, 2, 3, 4, 5, 6, 7}.\nTerim sayısı = 7 - (-1) + 1 = 9 adettir.",
        "hintForSocratic": "|u| ≤ a eşitsizliğinde u ifadesi -a ile +a arasında yer alır."
      },
      {
        "id": "l1-mat-maarif-q6",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "3. Tema: Algoritma ve Bilişim - Akış Şemaları ve Mantıksal Çıkarım",
        "questionNumber": 6,
        "questionText": "Bir algoritmanın adımları şöyledir:\n1. Adım: Bir x tam sayısı gir.\n2. Adım: Eğer x çift ise x = x / 2 yap; tek ise x = 3x + 1 yap.\n3. Adım: Eğer x > 10 ise 2. Adıma dön; değilse x değerini ekrana yaz.\n\nBaşlangıçta x = 11 girilirse ekrana yazılan değer kaç olur?",
        "options": {
          "A": "1",
          "B": "4",
          "C": "8",
          "D": "10",
          "E": "17"
        },
        "correctAnswer": "D",
        "explanation": "1. Döngü: x = 11 (tek). x = 3(11) + 1 = 34. x > 10 olduğundan devam.\n2. Döngü: x = 34 (çift). x = 34 / 2 = 17. x > 10 olduğundan devam.\n3. Döngü: x = 17 (tek). x = 3(17) + 1 = 52. x > 10 olduğundan devam.\n4. Döngü: x = 52 / 2 = 26.\n5. Döngü: x = 26 / 2 = 13.\n6. Döngü: x = 3(13) + 1 = 40.\n7. Döngü: x = 40 / 2 = 20.\n8. Döngü: x = 20 / 2 = 10.\nŞimdi x = 10 oldu! Koşul: x > 10 ise devam, değilse ekrana yaz. 10 > 10 yanlış olduğundan algoritma sonlanır ve ekrana 10 yazılır.\nDoğru cevap D seçeneğidir.",
        "hintForSocratic": "Adım adım x değerini hesapla ve her adımda tek mi çift mi olduğuna bakarak kuralı uygula. x 10'a eşit veya küçük olduğunda dur."
      },
      {
        "id": "l1-mat-maarif-q7",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "1. Tema: Sayılar - Köklü İfadeler",
        "questionNumber": 7,
        "questionText": "√75 - √48 + √12 işleminin sonucu kaçtır?",
        "options": {
          "A": "2√3",
          "B": "3√3",
          "C": "4√3",
          "D": "5√3",
          "E": "6√3"
        },
        "correctAnswer": "B",
        "explanation": "1. Adım: Kök içindeki sayıları tam kare çarpanlarına ayıralım:\n√75 = √(25 · 3) = 5√3\n√48 = √(16 · 3) = 4√3\n√12 = √(4 · 3) = 2√3\n\n2. Adım: İfadeleri toplayıp çıkaralım:\n5√3 - 4√3 + 2√3 = (5 - 4 + 2)√3 = 3√3 bulunur.\nDoğru cevap B seçeneğidir.",
        "hintForSocratic": "75, 48 ve 12 sayılarını tam kare sayılar (25, 16, 4) ile 3'ün çarpımı şeklinde yaz."
      },
      {
        "id": "l1-mat-maarif-q8",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "4. Tema: Geometrik Şekiller - Üçgen Eşitsizliği",
        "questionNumber": 8,
        "questionText": "Bir üçgenin kenar uzunlukları 4 cm, 9 cm ve x cm'dir.\n\nBuna göre, x'in alabileceği kaç farklı tam sayı değeri vardır?",
        "options": {
          "A": "5",
          "B": "6",
          "C": "7",
          "D": "8",
          "E": "9"
        },
        "correctAnswer": "C",
        "explanation": "1. Adım: Üçgen eşitsizliği kuralına göre bir kenar, diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olmalıdır:\n|9 - 4| < x < 9 + 4\n5 < x < 13.\n\n2. Adım: Bu aralıktaki tam sayılar:\nx ∈ {6, 7, 8, 9, 10, 11, 12}.\nToplam 13 - 5 - 1 = 7 farklı tam sayı değeri vardır.",
        "hintForSocratic": "|b - c| < a < b + c üçgen eşitsizliği kuralını uygula."
      },
      {
        "id": "l1-mat-maarif-q9",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "2. Tema: Nicelikler ve Değişimler - Doğrusal Denklem Sistemleri",
        "questionNumber": 9,
        "questionText": "2x + 3y = 19\n3x - y = 12\n\ndenklemini sağlayan (x, y) ikilisi için x + y toplamı kaçtır?",
        "options": {
          "A": "5",
          "B": "6",
          "C": "7",
          "D": "8",
          "E": "9"
        },
        "correctAnswer": "D",
        "explanation": "1. Adım: İkinci denklemi 3 ile çarpalım:\n9x - 3y = 36\n\n2. Adım: Birinci denklemle taraf tarafa toplayalım:\n(2x + 3y) + (9x - 3y) = 19 + 36\n11x = 55 ⇒ x = 5.\n\n3. Adım: x = 5 değerini 3x - y = 12 denkleminde yerine koyalım:\n3(5) - y = 12 ⇒ 15 - y = 12 ⇒ y = 3.\n\n4. Adım: x + y = 5 + 3 = 8 bulunur.\nDoğru cevap D seçeneğidir.",
        "hintForSocratic": "Yok etme yöntemini kullanarak y değişkenini yok et."
      },
      {
        "id": "l1-mat-maarif-q10",
        "courseKey": "matematik",
        "courseName": "Matematik",
        "topicName": "6. Tema: İstatistiksel Araştırma Süreci - Merkezi Eğilim Ölçüleri",
        "questionNumber": 10,
        "questionText": "Bir öğrencinin 5 matematik denemesinden aldığı netler sırasıyla şöyledir:\n12, 14, 16, 18, 20.\n\nBu veri grubunun aritmetik ortalaması ve açıklığı (ranjı) sırasıyla hangi seçenekte doğru verilmiştir?",
        "options": {
          "A": "Ortalama: 16, Açıklık: 8",
          "B": "Ortalama: 16, Açıklık: 6",
          "C": "Ortalama: 15, Açıklık: 8",
          "D": "Ortalama: 17, Açıklık: 10",
          "E": "Ortalama: 16, Açıklık: 10"
        },
        "correctAnswer": "A",
        "explanation": "1. Adım: Aritmetik Ortalama = (12 + 14 + 16 + 18 + 20) / 5 = 80 / 5 = 16.\n2. Adım: Açıklık (Ranj) = En büyük değer - En küçük değer = 20 - 12 = 8.\nDolayısıyla Ortalama: 16, Açıklık: 8'dir.",
        "hintForSocratic": "Açıklık en büyük terimden en küçük terimin çıkarılmasıyla bulunur."
      }
    ]
  },
  {
    "id": "exam-lise1-ing-yazili-1",
    "slug": "meb-9-ingilizce-1-donem-1-yazili",
    "title": "MEB 9. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli 9. sınıf İngilizce öğretim programına tam uyumlu: Theme 1: School Life, Theme 2: Classroom Life, Theme 3: Personal Life (Physical Appearance & Personality) ve Theme 4: Family Life.",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "ingilizce",
    "courseName": "Birinci Yabancı Dil (İngilizce)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-ing-q1",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 1: School Life - Countries, Nationalities & Capitals",
        "questionNumber": 1,
        "questionText": "Read the dialogue and answer the question:\n\nLiam: \"Hello! My name is Liam. I am from Germany. Where are you from?\"\nKenji: \"Hi Liam! I am from Tokyo. I am ------.\"\n\nWhich of the following completes the blank correctly?",
        "options": {
          "A": "Japan",
          "B": "Japanese",
          "C": "Tokyo",
          "D": "Germany",
          "E": "German"
        },
        "correctAnswer": "B",
        "explanation": "Kenji Tokyo'dan olduğunu (\"I am from Tokyo\") belirtmiştir. Ülkesi Japonya'dır (Japan). Kendisini milliyet olarak tanımlarken \"I am Japanese\" (Ben Japon'um) ifadesi kullanılır. Doğru seçenek B'dir.",
        "hintForSocratic": "Ülke ismi ile milliyet (nationality) kelimelerini ayırt et: \"I am from Japan\" -> \"I am Japanese\"."
      },
      {
        "id": "l1-ing-q2",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 1: School Life - Daily School Routines",
        "questionNumber": 2,
        "questionText": "Emma: \"How do you usually get to high school?\"\nNoah: \"I usually ------ because my house is just two blocks away from our school.\"\n\nWhich of the following completes the blank?",
        "options": {
          "A": "take the school bus",
          "B": "drive my own car",
          "C": "walk to school",
          "D": "fly by plane",
          "E": "call a yellow cab"
        },
        "correctAnswer": "C",
        "explanation": "Noah evinin okula sadece 2 blok uzaklıkta olduğunu (\"two blocks away\") söylediğine göre en mantıklı ulaşım biçimi yürüyerek gitmektir (\"walk to school\"). Doğru seçenek C'dir.",
        "hintForSocratic": "Okul eve çok yakınsa (two blocks away) hangi ulaşım yolu tercih edilir?"
      },
      {
        "id": "l1-ing-q3",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 2: Classroom Life - Classroom Instructions & Rules",
        "questionNumber": 3,
        "questionText": "Teacher: \"Students, before you leave the laboratory after your experiment, please ------.\"\n\nWhich of the following is the most suitable classroom safety instruction?",
        "options": {
          "A": "play loud music on your smartphones",
          "B": "turn off the water taps and gas burners",
          "C": "eat your lunch quickly inside the lab",
          "D": "throw glass beakers onto the floor",
          "E": "open all confidential exam papers"
        },
        "correctAnswer": "B",
        "explanation": "Laboratuvardan çıkmadan önceki temel güvenlik kuralı gaz ocaklarını ve su vanalarını kapatmaktır: \"turn off the water taps and gas burners\". Doğru seçenek B'dir.",
        "hintForSocratic": "Laboratuvar güvenliği için çıkışta gaz ve su vanaları ne yapılmalıdır?"
      },
      {
        "id": "l1-ing-q4",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 3: Personal Life - Physical Appearance Descriptions",
        "questionNumber": 4,
        "questionText": "Which of the following sentences describes a person's PHYSICAL APPEARANCE?",
        "options": {
          "A": "Sarah is very honest and never tells lies.",
          "B": "David is quite punctual; he is never late for class.",
          "C": "Elena has curly blonde hair, hazel eyes and an athletic build.",
          "D": "Mark is generous because he always shares his stationery.",
          "E": "Cem is a stubborn boy who never changes his mind."
        },
        "correctAnswer": "C",
        "explanation": "A, B, D ve E seçenekleri kişilik özelliklerini (honest, punctual, generous, stubborn) anlatır. C seçeneğinde ise fiziksel görünüş (curly blonde hair, hazel eyes, athletic build) tasvir edilmiştir. Doğru seçenek C'dir.",
        "hintForSocratic": "Fiziksel görünüş (Physical Appearance) gözle görülebilen boy, kilo, saç ve göz rengi gibi özellikleri ifade eder."
      },
      {
        "id": "l1-ing-q5",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 3: Personal Life - Personality Traits",
        "questionNumber": 5,
        "questionText": "\"Zeynep always helps her classmates when they have difficulty with math problems, and she never brags about her top exam scores.\"\n\nAccording to the sentence, Zeynep is both ------ and ------.",
        "options": {
          "A": "selfish / arrogant",
          "B": "helpful / modest",
          "C": "lazy / outgoing",
          "D": "clumsy / talkative",
          "E": "pessimistic / rude"
        },
        "correctAnswer": "B",
        "explanation": "Arkadaşlarına yardımcı olması onun \"helpful\" (yardımsever), yüksek notlarıyla asla övünmemesi ise \"modest\" (alçakgönüllü/mütevazı) olduğunu gösterir. Doğru seçenek B'dir.",
        "hintForSocratic": "Yardım eden = helpful; övünmeyen = modest."
      },
      {
        "id": "l1-ing-q6",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 4: Family Life - Occupations & Responsibilities",
        "questionNumber": 6,
        "questionText": "Match the family member with their daily workplace:\n\n\"My uncle is an architect. He designs modern eco-friendly buildings.\"\n\nWhere does he primarily work?",
        "options": {
          "A": "In an architecture design studio and construction sites",
          "B": "In a hospital operating theatre",
          "C": "In an airport control tower",
          "D": "In a courthouse as a judge",
          "E": "In a botanical greenhouse selling flowers"
        },
        "correctAnswer": "A",
        "explanation": "Mimar (architect) binaları tasarlar ve mimarlık tasarım stüdyolarında veya şantiyelerde (architecture studio & construction sites) çalışır. Doğru seçenek A'dir.",
        "hintForSocratic": "Architect (mimar) nerede çalışır ve ne tasarlar?"
      },
      {
        "id": "l1-ing-q7",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 1: School Life - Present Simple vs Present Continuous",
        "questionNumber": 7,
        "questionText": "Listen to this statement:\n\n\"Our school team usually (1) ------ football on Friday afternoons, but today it is raining heavily, so they (2) ------ basketball in the indoor gym.\"\n\nWhich verb forms fill in the blanks correctly?",
        "options": {
          "A": "(1) plays / (2) are playing",
          "B": "(1) is playing / (2) play",
          "C": "(1) played / (2) will play",
          "D": "(1) play / (2) are playing",
          "E": "(1) are playing / (2) plays"
        },
        "correctAnswer": "A",
        "explanation": "1. Kısımda \"usually\" (genellikle) zaman zarfı olduğundan Present Simple kullanılır: \"Our school team plays\" (veya tekil kabulde plays).\n2. Kısımda \"today / currently\" (bugün/şu an) ifadesiyle anlık eylem anlatıldığı için Present Continuous kullanılır: \"are playing\".\nDoğru seçenek A'dir.",
        "hintForSocratic": "Genel alışkanlıklar için Simple Present (usually), şu an gerçekleşen eylemler için Present Continuous (today/now) kullanılır."
      },
      {
        "id": "l1-ing-q8",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 2: Classroom Life - Prepositions of Time and Place",
        "questionNumber": 8,
        "questionText": "\"Our 9th grade biology lecture starts ------ 09:30 ------ Monday mornings.\"\n\nWhich prepositions should be used respectively?",
        "options": {
          "A": "in / at",
          "B": "at / on",
          "C": "on / at",
          "D": "at / in",
          "E": "from / by"
        },
        "correctAnswer": "B",
        "explanation": "Saatlerden önce \"at\" (at 09:30), günlerden ve günlerin belirli vakitlerinden önce \"on\" (on Monday mornings) edatı kullanılır. Doğru seçenek B'dir.",
        "hintForSocratic": "Saatler için \"at\", günler için \"on\", aylar ve yıllar için \"in\" kuralını hatırla."
      },
      {
        "id": "l1-ing-q9",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 3: Personal Life - Comparative Adjectives",
        "questionNumber": 9,
        "questionText": "Compare the two students:\n\nKerem is 1.85m tall and weighs 75kg.\nBora is 1.70m tall and weighs 80kg.\n\nWhich of the following statements is FACTUALLY TRUE according to the data?",
        "options": {
          "A": "Bora is taller than Kerem.",
          "B": "Kerem is shorter than Bora.",
          "C": "Kerem is taller and slimmer than Bora.",
          "D": "Bora is lighter than Kerem.",
          "E": "Both students have the exact same height."
        },
        "correctAnswer": "C",
        "explanation": "Kerem 1.85m boyunda ve 75 kg'dır; Bora ise 1.70m ve 80 kg'dır. Dolayısıyla Kerem Bora'dan daha uzun ve daha incedir (taller and slimmer). Doğru seçenek C'dir.",
        "hintForSocratic": "1.85m > 1.70m (taller) ve 75kg < 80kg (slimmer)."
      },
      {
        "id": "l1-ing-q10",
        "courseKey": "ingilizce",
        "courseName": "İngilizce",
        "topicName": "Theme 4: Family Life - Daily Family Routines",
        "questionNumber": 10,
        "questionText": "Alex: \"Who is in charge of preparing breakfast in your house?\"\nMelis: \"We share responsibilities. My brother sets the table while my mother and I ------ the omelette and fresh tea.\"\n\nWhich verb best completes the sentence?",
        "options": {
          "A": "prepare",
          "B": "destroys",
          "C": "repairs",
          "D": "forgets",
          "E": "punishes"
        },
        "correctAnswer": "A",
        "explanation": "Kahvaltıyı ve taze çayı hazırlamak anlamında \"prepare the omelette and fresh tea\" kullanılır. Özne \"my mother and I\" (çoğul) olduğu için fiil yalın halde (prepare) gelir. Doğru seçenek A'dir.",
        "hintForSocratic": "Yemek ve kahvaltı için hangi fiil kullanılır? (prepare = hazırlamak)"
      }
    ]
  },
  {
    "id": "exam-lise1-fizik-yazili-1",
    "slug": "meb-9-fizik-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Fizik 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli 9. sınıf Fizik müfredatına tam uyumlu: Fizik Bilimi ve Kariyer Keşfi, Vektörler ve Dik Kartezyen Bileşenler, Doğadaki Temel Kuvvetler, Hareket ve Akışkanlar (Basınç & Bernoulli İlkesi).",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "fizik",
    "courseName": "Fizik (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-fiz-m-q1",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "1. Ünite: Fizik Bilimi ve Kariyer Keşfi - Fiziğin Alt Dalları",
        "questionNumber": 1,
        "questionText": "Aşağıda verilen teknolojik uygulama ve araştırma alanlarından hangisi fiziğin \"KATIHÂL FİZİĞİ\" alt dalının doğrudan inceleme alanına girer?",
        "options": {
          "A": "Yıldızların içindeki nükleer füzyon tepkimeleri",
          "B": "Yarı iletken teknolojisi, transistörler ve güneş pilleri",
          "C": "Isı yalıtım malzemelerinin ısı iletim katsayıları",
          "D": "Göz kusurlarının düzeltilmesinde kullanılan mercek sistemleri",
          "E": "Gezegenlerin Güneş etrafındaki kütle çekimsel yörünge hareketleri"
        },
        "correctAnswer": "B",
        "explanation": "Katıhâl fiziği; kristal yapıdaki maddelerin elektriksel, manyetik ve termal özelliklerini inceler. Yarı iletkenler, mikroçip, transistör ve güneş panelleri katıhâl fiziğinin ürünüdür. Doğru seçenek B'dir.",
        "hintForSocratic": "Yarı iletkenler, süper iletkenler ve nano teknoloji katıhâl fiziği ile doğrudan ilişkilidir."
      },
      {
        "id": "l1-fiz-m-q2",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "2. Ünite: Kuvvet ve Hareket - Skaler ve Vektörel Büyüklükler",
        "questionNumber": 2,
        "questionText": "Aşağıda verilen fiziksel büyüklüklerden hangisi hem TÜRETİLMİŞ hem de VEKTÖREL bir büyüklüktür?",
        "options": {
          "A": "Kütle",
          "B": "Zaman",
          "C": "Hız",
          "D": "Sıcaklık",
          "E": "Işık Şiddeti"
        },
        "correctAnswer": "C",
        "explanation": "Kütle, zaman, sıcaklık ve ışık şiddeti \"KISA MUZ\" kısaltmasındaki temel büyüklüklerdir ve skalerdir. Hız ise birim zamandaki yer değiştirme (v = Δx/Δt) olup hem türetilmiş hem de yönlü (vektörel) bir büyüklüktür. Doğru seçenek C'dir.",
        "hintForSocratic": "Temel büyüklükleri (KISA MUZ) hatırla. Hız yön belirttiği için vektöreldir ve formülle türetilmiştir."
      },
      {
        "id": "l1-fiz-m-q3",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "3. Ünite: Akışkanlar - Bernoulli İlkesi",
        "questionNumber": 3,
        "questionText": "Kesiti daralan bir boruda akmakta olan sıkıştırılamaz bir akışkan için;\n\nI. Kesitin daraldığı yerde akışkanın hızı artar.\nII. Akışkanın hızının arttığı yerde statik akışkan basıncı azalır.\nIII. Uçak kanatlarının aerodinamik tasarımı bu ilkeye dayanır.\n\nyargılarından hangileri doğrudur?",
        "options": {
          "A": "Yalnız I",
          "B": "I ve II",
          "C": "I ve III",
          "D": "II ve III",
          "E": "I, II ve III"
        },
        "correctAnswer": "E",
        "explanation": "Bernoulli ilkesine göre akışkanın kesiti daraldıkça süreklilik denklemi gereği akış hızı artar (I doğru). Hızın arttığı yerde akışkanın çeperlere uyguladığı basınç düşer (II doğru). Uçak kanatlarının üst yüzeyindeki havanın daha hızlı akması sonucu oluşan basınç farkı kaldırma kuvveti üretir (III doğru). Dolayısıyla her üç yargı da doğrudur.",
        "hintForSocratic": "Bernoulli ilkesini hatırla: Hız artarsa basınç ne olur? Uçaklar nasıl havalanır?"
      },
      {
        "id": "l1-fiz-m-q4",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "3. Ünite: Akışkanlar - Sıvı Basıncı",
        "questionNumber": 4,
        "questionText": "Düşey kesiti verilen bir kapta özkütlesi 2 g/cm³ olan sıvı bulunmaktadır. Sıvı yüzeyinden h derinliğindeki bir noktada sıvı basıncı P olduğuna göre, 3h derinliğindeki bir noktada sıvı basıncı kaç P olur?",
        "options": {
          "A": "P",
          "B": "2P",
          "C": "3P",
          "D": "6P",
          "E": "9P"
        },
        "correctAnswer": "C",
        "explanation": "Sıvı basıncı formülü P = h · d · g'dir. Sıvı özkütlesi (d) ve yer çekimi ivmesi (g) sabitken sıvı basıncı doğrudan derinlikle (h) doğru orantılıdır. Derinlik 3 katına çıktığında (3h), basınç da 3 katına çıkarak 3P olur.",
        "hintForSocratic": "P = h · d · g formülünde derinlik ile basınç arasındaki doğru orantıyı incele."
      },
      {
        "id": "l1-fiz-m-q5",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "2. Ünite: Kuvvet ve Hareket - Doğadaki Temel Kuvvetler",
        "questionNumber": 5,
        "questionText": "Evrendeki dört temel kuvvet şiddetlerine göre güçlüden zayıfa sıralandığında, menzili sonsuz olan ve atom çekirdeğindeki protonları bir arada tutan kuvvetler sırasıyla hangileridir?",
        "options": {
          "A": "Kütle Çekim Kuvveti / Zayıf Nükleer Kuvvet",
          "B": "Elektromanyetik Kuvvet / Kütle Çekim Kuvveti",
          "C": "Güçlü Nükleer Kuvvet / Zayıf Nükleer Kuvvet",
          "D": "Kütle Çekim (veya Elektromanyetik) / Güçlü Nükleer Kuvvet (Yeğin)",
          "E": "Zayıf Nükleer Kuvvet / Elektromanyetik Kuvvet"
        },
        "correctAnswer": "D",
        "explanation": "Menzili sonsuz olan kuvvetler Elektromanyetik ve Kütle Çekim kuvvetleridir. Atom çekirdeğinde proton ve nötronları birbirine bağlayan en şiddetli kuvvet ise Güçlü Nükleer (Yeğin) kuvvettir. Doğru seçenek D'dir.",
        "hintForSocratic": "Çekirdeği bir arada tutan kuvvet \"Güçlü Nükleer Kuvvet\"tir; menzili sonsuz olanlar ise Kütle Çekim ve Elektromanyetiktir."
      },
      {
        "id": "l1-fiz-m-q6",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "1. Ünite: Fizik Bilimine Giriş - Fiziğin Alt Dalları",
        "questionNumber": 6,
        "questionText": "Işığın doğasını, yansımasını, kırılmasını, optik aletleri (mercekler, teleskoplar, mikroskoplar) ve fiber optik kabloları inceleyen fiziğin alt dalı aşağıdakilerden hangisidir?",
        "options": {
          "A": "Mekanik",
          "B": "Termodinamik",
          "C": "Optik",
          "D": "Elektromanyetizma",
          "E": "Katıhâl Fiziği"
        },
        "correctAnswer": "C",
        "explanation": "Işık olaylarını, görme mekanizmasını ve mercek/ayna sistemlerini inceleyen alt dal \"Optik\"tir. Doğru cevap C'dir.",
        "hintForSocratic": "Işık ve aynaları inceleyen dal optiktir."
      },
      {
        "id": "l1-fiz-m-q7",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "1. Ünite: Fizik Bilimine Giriş - Temel ve Türetilmiş Büyüklükler",
        "questionNumber": 7,
        "questionText": "Fizikte temel büyüklükler \"KISA MUZ\" kısaltması ile hatırlanır. Aşağıdakilerden hangisi bir temel büyüklük DEĞİLDİR (türetilmiş bir büyüklüktür)?",
        "options": {
          "A": "Kütle",
          "B": "Işık Şiddeti",
          "C": "Sıcaklık",
          "D": "Kuvvet",
          "E": "Madde Miktarı"
        },
        "correctAnswer": "D",
        "explanation": "KISA MUZ: Kütle, Işık şiddeti, Sıcaklık, Akım şiddeti, Madde miktarı, Uzunluk, Zaman temel büyüklüklerdir. Kuvvet (F = m · a) ise kütle, uzunluk ve zamandan türetilmiştir. Doğru seçenek D'dir.",
        "hintForSocratic": "KISA MUZ içinde K harfi Kütle'dir, Kuvvet değil."
      },
      {
        "id": "l1-fiz-m-q8",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "1. Ünite: Fizik Bilimine Giriş - Skaler ve Vektörel Büyüklükler",
        "questionNumber": 8,
        "questionText": "Yalnızca sayı ve birimle ifade edilemeyip, tam olarak tanımlanabilmesi için mutlaka YÖN ve DOĞRULTU belirtilmesi gereken büyüklüklere \"Vektörel Büyüklük\" denir.\n\nAşağıdakilerden hangisi vektörel bir büyüklüktür?",
        "options": {
          "A": "Zaman",
          "B": "Sürat",
          "C": "Sıcaklık",
          "D": "Hız",
          "E": "Kütle"
        },
        "correctAnswer": "D",
        "explanation": "Hız (velocity) birim zamandaki yer değiştirmedir ve mutlaka yönü vardır (vektöreldir). Sürat (speed) ise sadece alınan yol/zaman olup skalerdir. Zaman, sıcaklık ve kütle de skalerdir. Doğru seçenek D'dir.",
        "hintForSocratic": "\"Kuzeye doğru 90 km/h\" dendiğinde hız mı sürat mi ifade edilmiş olur?"
      },
      {
        "id": "l1-fiz-m-q9",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "2. Ünite: Madde ve Özellikleri - Özkütle ve Dayanıklılık",
        "questionNumber": 9,
        "questionText": "Kütlesi 120 gram olan homojen bir katı cisim, içinde 100 cm³ su bulunan dereceli silindire atıldığında su seviyesi 140 cm³ çizgisine yükselmektedir.\n\nBuna göre bu katı cismin özkütlesi (yoğunluğu) kaç g/cm³'tür?",
        "options": {
          "A": "1.2",
          "B": "2.0",
          "C": "3.0",
          "D": "4.0",
          "E": "6.0"
        },
        "correctAnswer": "C",
        "explanation": "1. Adım: Taşırılan suyun hacmi cismin hacmine eşittir: V = 140 - 100 = 40 cm³.\n2. Adım: Özkütle formülü d = m / V -> d = 120 g / 40 cm³ = 3 g/cm³. Doğru cevap C'dir.",
        "hintForSocratic": "Hacim artışı cismin hacmidir. Özkütle = Kütle / Hacim formülünü uygula."
      },
      {
        "id": "l1-fiz-m-q10",
        "courseKey": "fizik",
        "courseName": "Fizik",
        "topicName": "2. Ünite: Madde ve Özellikleri - Adezyon, Kohezyon ve Yüzey Gerilimi",
        "questionNumber": 10,
        "questionText": "Temiz bir cam levha üzerine damlatılan su damlasının cam yüzeye yayılarak camı ıslatması, ancak cıva damlasının cam üzerinde küresel top şeklinde kalarak camı ıslatmaması durumunda;\n\nI. Su ile cam arasındaki adezyon kuvveti, suyun kendi molekülleri arasındaki kohezyondan büyüktür.\nII. Cıvanın kohezyon kuvveti, cıva ile cam arasındaki adezyondan büyüktür.\nIII. Her iki sıvıda da yüzey gerilimi tamamen sıfırdır.\n\nyargılarından hangileri doğrudur?",
        "options": {
          "A": "Yalnız I",
          "B": "Yalnız II",
          "C": "I ve II",
          "D": "II ve III",
          "E": "I, II ve III"
        },
        "correctAnswer": "C",
        "explanation": "Bir sıvının yüzeyi ıslatabilmesi için Adezyon > Kohezyon olmalıdır (Su örneği). Cıvada ise kohezyon çok güçlü olduğundan moleküller birbirini çeker ve küre oluşturur (Kohezyon > Adezyon). Dolayısıyla I ve II doğrudur. Doğru seçenek C'dir.",
        "hintForSocratic": "Adezyon farklı maddeler arası çekim, kohezyon aynı cins moleküller arası tutunmadır."
      }
    ]
  },
  {
    "id": "exam-lise1-kim-yazili-1",
    "slug": "meb-9-kimya-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Kimya 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli 9. sınıf Kimya müfredatına tam uyumlu: 1. Tema: Etkileşim (Kimya Hayattır, Güvenlik Piktogramları, Bohr ve Modern Atom Teorisi, Orbitaller, Periyodik Özellikler).",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "kimya",
    "courseName": "Kimya (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-kim-m-q1",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Güvenlik Uyarı İşaretleri (Piktogramlar)",
        "questionNumber": 1,
        "questionText": "Bir kimyasal madde şişesi üzerinde \"Alev üzerinde bir yuvarlak (Oksijen çemberi)\" sembolü bulunmaktadır.\n\nBu güvenlik piktogramının anlamı aşağıdakilerden hangisidir?",
        "options": {
          "A": "Yanıcı Madde",
          "B": "Yakıcı (Oksitleyici) Madde",
          "C": "Aşındırıcı (Korozif) Madde",
          "D": "Patlayıcı Madde",
          "E": "Radyoaktif Madde"
        },
        "correctAnswer": "B",
        "explanation": "Sadece alev simgesi \"Yanıcı Madde\"yi temsil ederken, alevin ortasında \"O\" harfi (oksijen çemberi) olan sembol \"Yakıcı (Oksitleyici) Madde\"yi ifade eder. Doğru seçenek B'dir.",
        "hintForSocratic": "Ortasında O harfi bulunan alev oksitleyici/yakıcı maddeleri gösterir."
      },
      {
        "id": "l1-kim-m-q2",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Periyodik Özelliklerin Değişimi",
        "questionNumber": 2,
        "questionText": "Periyodik sistemde aynı periyotta soldan sağa doğru gidildikçe genel olarak;\n\nI. Atom yarıçapı azalır.\nII. Birinci iyonlaşma enerjisi genellikle artar.\nIII. Elektronegatiflik değeri artar.\n\nyargılarından hangileri doğrudur?",
        "options": {
          "A": "Yalnız I",
          "B": "I ve II",
          "C": "I ve III",
          "D": "II ve III",
          "E": "I, II ve III"
        },
        "correctAnswer": "E",
        "explanation": "Aynı periyotta soldan sağa gidildikçe proton sayısı arttığı için çekirdeğin çekim gücü artar ve atom yarıçapı küçülür (I doğru). Yarıçap küçüldüğü için elektron koparmak zorlaşır ve iyonlaşma enerjisi genellikle artar (II doğru). Bağ elektronlarını çekme eğilimi olan elektronegatiflik de artar (III doğru). Dolayısıyla I, II ve III doğrudur.",
        "hintForSocratic": "Soldan sağa çekirdeğin gücü artar; çap küçülür, iyonlaşma enerjisi ve elektronegatiflik artar."
      },
      {
        "id": "l1-kim-m-q3",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Simyadan Kimyaya Geçiş",
        "questionNumber": 3,
        "questionText": "Aşağıdakilerden hangisi Simya (Alşimi) ile Kimya bilimi arasındaki en temel farktır?",
        "options": {
          "A": "Simyacıların ateş ve suyu kullanması",
          "B": "Kimyanın deneylere, ölçmeye ve terazinin hassas kullanımına dayalı teorik bir bilim olması",
          "C": "Simyacıların hiçbir kimyasal madde üretmemiş olması",
          "D": "Kimyanın yalnızca madenlerle ilgilenmesi",
          "E": "Simyanın modern laboratuvarlarda doğmuş olması"
        },
        "correctAnswer": "B",
        "explanation": "Simya teorik temellere dayanmayan, deneme-yanılma yoluyla çalışan bir uğraştır. Kimya ise sistematik bilgi birikimine, nicel ölçümlere (terazi) ve bilimsel deneylere dayanır. Doğru cevap B'dir.",
        "hintForSocratic": "Simya bilim değildir çünkü teorik temelleri ve hassas ölçüm yöntemleri yoktur."
      },
      {
        "id": "l1-kim-m-q4",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Kimya Disiplinleri",
        "questionNumber": 4,
        "questionText": "Bir su numunesindeki kurşun, cıva ve arsenik gibi ağır metallerin türünü ve miktarını hassas aletlerle analiz eden kimya alt disiplini aşağıdakilerden hangisidir?",
        "options": {
          "A": "Organik Kimya",
          "B": "Biyokimya",
          "C": "Analitik Kimya",
          "D": "Fizikokimya",
          "E": "Polimer Kimyası"
        },
        "correctAnswer": "C",
        "explanation": "Maddelerin kimyasal bileşenlerinin niteliğini (ne olduğunu) ve niceliğini (ne kadar olduğunu) inceleyen kimya disiplini \"Analitik Kimya\"dır. Doğru cevap C'dir.",
        "hintForSocratic": "Maddeyi analiz eden, nitel ve nicel ölçüm yapan disiplin hangisidir?"
      },
      {
        "id": "l1-kim-m-q5",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Element ve Bileşiklerin Özellikleri",
        "questionNumber": 5,
        "questionText": "Saf maddeler olan Element ve Bileşikler için aşağıdakilerden hangisi ORTAK bir özelliktir?",
        "options": {
          "A": "Fiziksel veya kimyasal yollarla daha basit maddelere ayrılamazlar.",
          "B": "Sembollerle gösterilirler.",
          "C": "Homojendirler ve belirli ayırt edici özellikleri (erime, kaynama noktası) sabittir.",
          "D": "En az iki farklı cins atom içerirler.",
          "E": "Bileşenleri arasında rastgele bir karışım oranı vardır."
        },
        "correctAnswer": "C",
        "explanation": "Hem elementler hem de bileşikler saf maddedir; homojendirler, belirli erime/kaynama noktaları ve yoğunlukları sabittir. Elementler sembolle, bileşikler formülle gösterilir. Doğru seçenek C'dir.",
        "hintForSocratic": "Saf maddelerin ortak özelliği nedir? Belirli şartlarda erime ve kaynama noktaları nasıldır?"
      },
      {
        "id": "l1-kim-m-q6",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Atom Modellerinin Tarihsel Gelişimi",
        "questionNumber": 6,
        "questionText": "Pozitif yüklü bir çekirdeğin varlığını ve atomun büyük kısmının boşluktan oluştuğunu altın levha saçılma deneyi ile kanıtlayan bilim insanı kimdir?",
        "options": {
          "A": "John Dalton",
          "B": "J.J. Thomson (Üzümlü Kek Modeli)",
          "C": "Ernest Rutherford (Gezegen Modeli)",
          "D": "Niels Bohr (Yörüngeli Model)",
          "E": "Dimitri Mendeleyev"
        },
        "correctAnswer": "C",
        "explanation": "Rutherford, alfa ışınlarını ince altın levhaya göndererek ışınların çoğunun boşluktan geçtiğini, çok azının çekirdeğe çarparak geri yansıdığını gözlemlemiş ve çekirdekli atom modelini ortaya koymuştur. Doğru seçenek C'dir.",
        "hintForSocratic": "Altın levhaya alfa parçacığı gönderip atom çekirdeğini keşfeden fizikçi kimdir?"
      },
      {
        "id": "l1-kim-m-q7",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Atom Altı Tanecikler ve İzotop Atomlar",
        "questionNumber": 7,
        "questionText": "Proton sayıları (atom numaraları) aynı, nötron sayıları (kütle numaraları) farklı olan atomlara ne ad verilir?",
        "options": {
          "A": "İzotop Atomlar",
          "B": "İzobar Atomlar",
          "C": "İzoton Atomlar",
          "D": "İzoelektronik Tanecikler",
          "E": "Allotrop Maddeler"
        },
        "correctAnswer": "A",
        "explanation": "Proton sayıları aynı (aynı element), nötronları farklı olan atomlara İzotop denir (Son harfi p = proton). Doğru seçenek A'dır.",
        "hintForSocratic": "Son harfi \"p\" olan izotop kavramı aynı proton sayısını ifade eder."
      },
      {
        "id": "l1-kim-m-q8",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Periyodik Sistemde Yer Bulma",
        "questionNumber": 8,
        "questionText": "Nötr bir X atomunun temel hâl elektron dağılımı 2 - 8 - 7 şeklindedir.\n\nBuna göre X elementi periyodik sistemde hangi periyot ve grupta yer alır?",
        "options": {
          "A": "2. Periyot 7A Grubu",
          "B": "3. Periyot 7A Grubu (17. Grup)",
          "C": "3. Periyot 8A Grubu",
          "D": "7. Periyot 3A Grubu",
          "E": "4. Periyot 1A Grubu"
        },
        "correctAnswer": "B",
        "explanation": "Katman sayısı periyot numarasını verir (3 katman = 3. periyot). Son katmandaki değerlik elektron sayısı grubu verir (7 elektron = 7A grubu). Doğru seçenek B'dir.",
        "hintForSocratic": "Katman sayısı periyodu, son katmandaki elektron sayısı A grubu numarasını belirler."
      },
      {
        "id": "l1-kim-m-q9",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Kimyasal Bağlar (Güçlü Etkileşimler)",
        "questionNumber": 9,
        "questionText": "Bir metal atomu ile bir ametal atomu arasında elektron alışverişi sonucu oluşan elektrostatik çekim kuvvetine ne ad verilir?",
        "options": {
          "A": "Apolar Kovalent Bağ",
          "B": "Polar Kovalent Bağ",
          "C": "İyonik Bağ",
          "D": "Hidrojen Bağı",
          "E": "Metalik Bağ"
        },
        "correctAnswer": "C",
        "explanation": "Metaller elektron verir (katyon), ametaller elektron alır (anyon). Zıt yüklü iyonlar arasındaki çekimle \"İyonik Bağ\" oluşur. Kovalent bağda ise elektron ortaklaşması vardır. Doğru cevap C'dir.",
        "hintForSocratic": "Elektron alışverişi ile anyon ve katyon oluşarak kurulan bağ iyoniktir."
      },
      {
        "id": "l1-kim-m-q10",
        "courseKey": "kimya",
        "courseName": "Kimya",
        "topicName": "1. Tema: Etkileşim - Zayıf Etkileşimler (Fiziksel Bağlar)",
        "questionNumber": 10,
        "questionText": "Su (H₂O) moleküllerinin kaynama noktasının beklenenden çok daha yüksek olmasını sağlayan ve hidrojen atomunun F, O, N atomlarına bağlı olduğu durumlarda moleküller arasında görülen en güçlü zayıf etkileşim türü aşağıdakilerden hangisidir?",
        "options": {
          "A": "Dipol - Dipol Etkileşimi",
          "B": "London Dağılım Kuvvetleri",
          "C": "Hidrojen Bağı",
          "D": "İyon - Dipol Etkileşimi",
          "E": "Kovalent Bağ"
        },
        "correctAnswer": "C",
        "explanation": "Hidrojenin elektronegatiftiği çok yüksek olan Flor, Oksijen veya Azot (FON) atomlarına bağlı olduğu moleküller arasında kurulan özel çekime \"Hidrojen Bağı\" denir. Suyun yüksek kaynama noktasının ana sebebidir. Doğru seçenek C'dir.",
        "hintForSocratic": "F, O, N atomlarına bağlı hidrojen atomlarının moleküller arasında yaptığı bağ hidrojen bağıdır."
      }
    ]
  },
  {
    "id": "exam-lise1-edb-yazili-1",
    "slug": "meb-9-edebiyat-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Türk Dili ve Edebiyatı 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli: 1. Tema: Sözün İnceliği (Edebiyatın Doğası, Şiir, İmge ve Çağrışım, Mülakat), 2. Tema: Anlam Arayışı (Hikâye Tahlili, İstiklal Marşı).",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "edebiyat",
    "courseName": "Türk Dili ve Edebiyatı",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-edb-m-q1",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Şiir Sanatı ve İmge",
        "questionNumber": 1,
        "questionText": "\"Karanlığın saçlarını tarar rüzgâr,\nYıldızlar süzülür mavi bir nehirden.\"\n\nBu dizelerde şairin oluşturduğu imge ve kullanılan edebî sanat aşağıdakilerden hangisidir?",
        "options": {
          "A": "Teşhis (Kişileştirme) ve İstiare (Eğretileme)",
          "B": "Tezat (Karşıtlık) ve Tecahülüarif",
          "C": "Mübalağa (Abartma) ve Tariz",
          "D": "Telmih (Hatırlatma) ve Tenasüp",
          "E": "Cinas ve Kinaye"
        },
        "correctAnswer": "A",
        "explanation": "Karanlığın saçı olması ve rüzgârın bunu taraması insana özgü bir eylemin doğaya aktarılmasıdır (Teşhis / Kişileştirme). Gökyüzünün mavi bir nehir olarak düşünülmesi ise açık veya kapalı istiaredir. Doğru seçenek A'dır.",
        "hintForSocratic": "İnsana ait saç tarama eylemi doğa unsurlarına verilmiştir (kişileştirme)."
      },
      {
        "id": "l1-edb-m-q2",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Edebiyatın Bilimlerle İlişkisi",
        "questionNumber": 2,
        "questionText": "Bir roman yazarının eserinde Kurtuluş Savaşı yıllarını anlatırken dönemin cephe şartlarını, askerî yazışmalarını ve siyasi kararlarını inceleyip eserine yansıtması, edebiyatın en çok hangi bilim dalıyla olan ilişkisini gösterir?",
        "options": {
          "A": "Tarih",
          "B": "Coğrafya",
          "C": "Sosyoloji",
          "D": "Psikoloji",
          "E": "Felsefe"
        },
        "correctAnswer": "A",
        "explanation": "Yazar geçmişte yaşanmış gerçek bir dönemi, belgeleri ve savaş şartlarını konu edindiğinde edebiyat doğrudan Tarih biliminden yararlanır. Doğru cevap A'dır.",
        "hintForSocratic": "Kurtuluş Savaşı dönemi ve arşiv belgeleri hangi bilim dalının alanıdır?"
      },
      {
        "id": "l1-edb-m-q3",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - İletişim Ögeleri",
        "questionNumber": 3,
        "questionText": "Öğretmenin sınıfta öğrencilere \"Yarınki deneme sınavına optik form kurşun kalemlerinizi getirmeyi unutmayın.\" demesi üzerine öğrencilerin başlarını sallayarak \"Anlaşıldı hocam.\" demesi durumunda, iletişim sürecinin \"Dönüt (Geri Bildirim)\" ögesi aşağıdakilerden hangisidir?",
        "options": {
          "A": "Öğretmen (Gönderici)",
          "B": "Öğrenciler (Alıcı)",
          "C": "\"Anlaşıldı hocam.\" cevabı",
          "D": "Sınıf ortamı (Bağlam)",
          "E": "Türkçe dili (Kod)"
        },
        "correctAnswer": "C",
        "explanation": "İletişimde alıcının göndericiye verdiği cevaba, tepkiye veya mesaja \"Dönüt (Geri Bildirim)\" denir. Öğrencilerin \"Anlaşıldı hocam\" demesi dönüttür. Doğru seçenek C'dir.",
        "hintForSocratic": "Alıcının mesaja verdiği cevaba iletişim biliminde ne ad verilir?"
      },
      {
        "id": "l1-edb-m-q4",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Dillerin Sınıflandırılması",
        "questionNumber": 4,
        "questionText": "Dünya dilleri yapı ve köken bakımından sınıflandırılır. Türkçe yapı bakımından hangi dil grubuna mensuptur?",
        "options": {
          "A": "Tek Heceli Diller (Çince, Tibetçe)",
          "B": "Bükümlü / Çekimli Diller (Arapça, Almanca)",
          "C": "Eklemeli / Bitişken Diller (Sondan Eklemeli)",
          "D": "Ön Ekli Diller",
          "E": "İzole Diller"
        },
        "correctAnswer": "C",
        "explanation": "Türkçe, kökleri değişmeyen, sözcük türetimi ve çekimi köke gelen eklerle (sondan eklemeli) yapılan Bitişken / Eklemeli bir dildir. Doğru seçenek C'dir.",
        "hintForSocratic": "Türkçede sözcükler türetilirken kök değişir mi yoksa sonuna ekler mi gelir (göz-lük-çü)?"
      },
      {
        "id": "l1-edb-m-q5",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "2. Tema: Anlam Arayışı - Hikâye Türleri (Olay vs Durum)",
        "questionNumber": 5,
        "questionText": "Serim, düğüm ve çözüm planına sıkı sıkıya bağlı olan, merak ögesinin ve beklenmedik bir sonun ön planda olduğu, Guy de Maupassant öncülüğündeki hikâye türü aşağıdakilerden hangisidir?",
        "options": {
          "A": "Durum (Kesit) Hikâyesi",
          "B": "Olay (Klasik) Hikâyesi",
          "C": "Modernist Hikâye",
          "D": "Postmodern Hikâye",
          "E": "Bilinç Akışı Hikâyesi"
        },
        "correctAnswer": "B",
        "explanation": "Giriş, gelişme ve çarpıcı bir sonuçla biten, heyecan ve merakın zirvede olduğu türe \"Olay Hikâyesi\" (Maupassant tarzı) denir. Türk edebiyatındaki en önemli temsilcisi Ömer Seyfettin'dir. Doğru seçenek B'dir.",
        "hintForSocratic": "Ömer Seyfettin'in hikâyelerinde olay örgüsü ve merak mı yoksa günlük bir durum kesiti mi hâkimdir?"
      },
      {
        "id": "l1-edb-m-q6",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "2. Tema: Anlam Arayışı - Anlatıcı ve Bakış Açıları",
        "questionNumber": 6,
        "questionText": "Kahramanların iç dünyalarını, zihinlerinden geçen gizli düşünceleri, geçmişlerini ve gelecekte başlarına gelecek olayları her şeyiyle bilen anlatıcının bakış açısı aşağıdakilerden hangisidir?",
        "options": {
          "A": "Hâkim (İlahi / Tanrısal) Bakış Açısı",
          "B": "Kahraman Anlatıcı Bakış Açısı",
          "C": "Gözlemci (Kamera) Bakış Açısı",
          "D": "Çoğulcu Bakış Açısı",
          "E": "İkinci Tekil Kişi Anlatıcı"
        },
        "correctAnswer": "A",
        "explanation": "Kahramanların aklından geçenleri ve geleceği dahi gören, her şeye hâkim olan üçüncü şahıs anlatıcıya \"Hâkim (İlahi / Tanrısal) Bakış Açısı\" denir. Doğru seçenek A'dır.",
        "hintForSocratic": "Karakterin kalbini, zihnini ve geleceğini eksiksiz bilen bakış açısı hangisidir?"
      },
      {
        "id": "l1-edb-m-q7",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Şiirde Ahenk Unsurları",
        "questionNumber": 7,
        "questionText": "\"Yollarda kalan gözlerimin nûrunu yordum,\nKimdir bana güldürmeyen ikbâlimi sordum.\"\n\nBu beytin dize sonlarındaki \"-dum\" ekleri ve \"yor- / sor-\" sözcüklerindeki kafiye türü sırasıyla aşağıdakilerden hangisidir?",
        "options": {
          "A": "Redif / Yarım Uyak",
          "B": "Redif / Tam Uyak",
          "C": "Tam Uyak / Zengin Uyak",
          "D": "Cinaslı Uyak / Redif",
          "E": "Zengin Uyak / Redif"
        },
        "correctAnswer": "B",
        "explanation": "1. Adım: Dize sonlarındaki \"yordum\" ve \"sordum\" kelimelerinde \"-dum\" (görülen geçmiş zaman + 1. tekil kişi) aynı görevdeki ekler olduğu için REDİF'tir.\n2. Adım: Kalan \"yor-\" ve \"sor-\" köklerinde iki ses benzerliği (\"o\" ve \"r\") olduğu için TAM UYAK'tır. Doğru seçenek B'dir.",
        "hintForSocratic": "Görevleri aynı olan ekler rediftir. Köklerde iki ses benziyorsa tam uyak olur."
      },
      {
        "id": "l1-edb-m-q8",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Şiir Türleri",
        "questionNumber": 8,
        "questionText": "Milletlerin hayatında derin izler bırakan savaş, göç, afet gibi olayları ve kahramanlıkları coşkulu, destansı bir dille anlatan şiir türüne ne ad verilir?",
        "options": {
          "A": "Lirik Şiir",
          "B": "Epik Şiir",
          "C": "Pastoral Şiir",
          "D": "Didaktik Şiir",
          "E": "Satirik Şiir"
        },
        "correctAnswer": "B",
        "explanation": "Kahramanlık, yiğitlik, savaş ve yurt sevgisi gibi temaları işleyen coşkulu destansı şiirlere \"Epik Şiir\" denir. Aşk ve duygu lirik; doğa pastoral; öğüt didaktiktir. Doğru seçenek B'dir.",
        "hintForSocratic": "Destansı ve kahramanlık anlatan şiirlere epik denir."
      },
      {
        "id": "l1-edb-m-q9",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "Dil Bilgisi: İsimler ve Sıfatlar",
        "questionNumber": 9,
        "questionText": "Aşağıdaki cümlelerin hangisinde bir isim (ad) hem niteleme hem de belirtme sıfatı almıştır?",
        "options": {
          "A": "Masada eski bir kitap duruyordu.",
          "B": "Soğuk havalar şehri tamamen esir aldı.",
          "C": "Üç öğrenci kapının önünde bekliyor.",
          "D": "Küçük çocuk annesine doğru koştu.",
          "E": "Kırmızı güller vazoda solmuştu."
        },
        "correctAnswer": "A",
        "explanation": "\"Kitap\" ismi; nasıl kitap? -> \"eski\" (niteleme sıfatı), kaç/hangi kitap? -> \"bir\" (belgisiz/belirtme sıfatı). Böylece \"kitap\" hem niteleme hem belirtme sıfatı almıştır. Doğru cevap A'dır.",
        "hintForSocratic": "\"Eski bir kitap\" tamlamasında \"eski\" niteleme, \"bir\" ise belirtme sıfatıdır."
      },
      {
        "id": "l1-edb-m-q10",
        "courseKey": "edebiyat",
        "courseName": "Edebiyat",
        "topicName": "1. Tema: Sözün İnceliği - Masal ve Fabl Özellikleri",
        "questionNumber": 10,
        "questionText": "Kahramanları genellikle hayvanlar veya bitkiler olan, insanlara ahlaki bir ders vermeyi amaçlayan, teşhis ve intak sanatlarına dayalı manzum veya nesir anlatılara ne ad verilir?",
        "options": {
          "A": "Masal",
          "B": "Fabl",
          "C": "Destan",
          "D": "Efsane",
          "E": "Halk Hikâyesi"
        },
        "correctAnswer": "B",
        "explanation": "Hayvanların konuşturulması (intak) ve kişileştirilmesi (teşhis) yoluyla ders veren alegorik tür \"Fabl\"dır. Ezop ve La Fontaine bu türün kurucularıdır. Doğru seçenek B'dir.",
        "hintForSocratic": "Ağustos böceği ile karınca hikâyesi hangi edebi türe örnektir?"
      }
    ]
  },
  {
    "id": "exam-lise1-biyo-yazili-1",
    "slug": "meb-9-biyoloji-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Biyoloji 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli: 1. Tema: Yaşam (Biyoloji ve Bilim Etiği, Canlıların Ortak Özellikleri, İnorganik ve Organik Bileşikler, Enzimler, 3 Domain Sınıflandırması).",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "biyoloji",
    "courseName": "Biyoloji (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-bio-m-q1",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Canlıların Ortak Özellikleri",
        "questionNumber": 1,
        "questionText": "Tüm canlı organizmalarda;\n\nI. Hücresel yapıya sahip olma\nII. Ribozom organelinde protein sentezleme\nIII. Oksijenli solunum ile ATP üretme\nIV. Çevreden gelen uyarılara tepki verme\n\nözelliklerinden hangileri ORTAK olarak gözlenir?",
        "options": {
          "A": "I ve II",
          "B": "I, II ve IV",
          "C": "II, III ve IV",
          "D": "I, III ve IV",
          "E": "I, II, III ve IV"
        },
        "correctAnswer": "B",
        "explanation": "Tüm canlılar hücresel yapıya sahiptir (I doğru), tüm canlılarda ribozom bulunur ve protein sentezlenir (II doğru), tüm canlılar uyarılara tepki verir (IV doğru). Ancak bazı bakteriler oksijensiz solunum veya fermantasyon yapar, oksijenli solunum tüm canlılarda ortak değildir (III yanlış). Dolayısıyla I, II ve IV doğrudur.",
        "hintForSocratic": "Bakterilerin tamamı oksijen kullanır mı? Oksijensiz yaşayan canlıları düşün."
      },
      {
        "id": "l1-bio-m-q2",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - İnorganik Bileşikler ve Suyun Önemi",
        "questionNumber": 2,
        "questionText": "Su moleküllerinin hidrojen bağları sayesinde birbirini çekmesi özelliğine \"kohezyon\", farklı bir yüzeye tutunması özelliğine ise \"adhezyon\" denir.\n\nBuna göre, devasa boyuttaki ağaçların köklerinden yapraklarına kadar metrelerce yükseğe suyun kesintisiz taşınabilmesi öncelikle suyun hangi özelliğinin sonucudur?",
        "options": {
          "A": "Suyun buharlaşma ısısının düşük olması",
          "B": "Kohezyon kuvveti sayesinde oluşan kesintisiz su sütunu",
          "C": "Suyun donduğunda hacminin küçülmesi",
          "D": "Suyun enzimlerin yapısına doğrudan koenzim olarak katılması",
          "E": "Suyun sindirim reaksiyonlarında açığa çıkması"
        },
        "correctAnswer": "B",
        "explanation": "Su moleküllerinin kohezyon kuvveti ile birbirine bağlanması sayesinde ksilem (odun boruları) içinde kopmayan bir su sütunu oluşur ve terleme-çekim kuvvetiyle onlarca metre yukarı taşınır. Doğru cevap B'dir.",
        "hintForSocratic": "Su moleküllerinin birbirini zincir gibi çekmesine kohezyon denir."
      },
      {
        "id": "l1-bio-m-q3",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Karbonhidratlar",
        "questionNumber": 3,
        "questionText": "Polisakkaritlerle ilgili olarak aşağıda verilen eşleştirmelerden hangisi DOĞRUDUR?",
        "options": {
          "A": "Nişasta -> Hayvansal depo polisakkariti",
          "B": "Glikojen -> Bitkisel yapı polisakkariti",
          "C": "Selüloz -> Bitkilerde hücre çeperinin ana maddesi olan yapısal polisakkarit",
          "D": "Kitin -> Bakterilerde glikozun depo formu",
          "E": "Maltoz -> İnsan kasında depolanan polisakkarit"
        },
        "correctAnswer": "C",
        "explanation": "Bitkilerde hücre duvarını (çeperini) oluşturan lifli yapı polisakkariti Selüloz'dur. Hayvansal depo glikojendir; nişasta bitkisel depodur; kitin böceklerin dış iskeleti ve mantarların çeperidir. Doğru seçenek C'dir.",
        "hintForSocratic": "Bitkilerin hücre duvarını oluşturan sert yapı polisakkariti hangisidir?"
      },
      {
        "id": "l1-bio-m-q4",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Lipitler ve Hücre Zarı",
        "questionNumber": 4,
        "questionText": "Hücre zarının çift katlı temel iskeletini oluşturan, bir baş kısmı (hidrofilik / suyu seven) ve iki yağ asidi kuyruğundan (hidrofobik / suyu sevmeyen) meydana gelen lipit çeşidi aşağıdakilerden hangisidir?",
        "options": {
          "A": "Nötral Yağ (Trigliserit)",
          "B": "Fosfolipit",
          "C": "Kolesterol (Steroit)",
          "D": "Doymuş Yağ Asidi",
          "E": "Mumlar"
        },
        "correctAnswer": "B",
        "explanation": "Hücre zarının akıcı mozaik zar modelindeki çift katlı yapısını Fosfolipit molekülleri oluşturur. Fosfat başı dışa, yağ asidi kuyrukları içe bakar. Doğru seçenek B'dir.",
        "hintForSocratic": "Hücre zarının çift tabakalı ana yapıtaşı olan lipit \"Fosfolipit\"tir."
      },
      {
        "id": "l1-bio-m-q5",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Proteinler ve Denatürasyon",
        "questionNumber": 5,
        "questionText": "Yüksek sıcaklık, aşırı asit veya baz ortamında proteinlerin üç boyutlu özgül yapısının bozularak biyolojik işlevini kaybetmesi olayına ne ad verilir?",
        "options": {
          "A": "Denatürasyon",
          "B": "Renatürasyon",
          "C": "Dehidrasyon",
          "D": "Hidroliz",
          "E": "Fosforilasyon"
        },
        "correctAnswer": "A",
        "explanation": "Yumurtanın pişerken katılaşması örneğinde olduğu gibi, yüksek ısı ve pH değişimiyle proteinin katlanmış 3 boyutlu yapısının bozulmasına \"Denatürasyon\" denir. Peptit bağları kopmaz fakat fonksiyon kaybolur. Doğru seçenek A'dır.",
        "hintForSocratic": "Proteinin doğal yapısının bozulmasına \"denatüre olmak\" denir."
      },
      {
        "id": "l1-bio-m-q6",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Enzimlerin Çalışma Mekanizması",
        "questionNumber": 6,
        "questionText": "Enzimlerle ilgili olarak aşağıda verilen yargılardan hangisi YANLIŞTIR?",
        "options": {
          "A": "Biyolojik kimyasal tepkimelerin aktivasyon enerjisini düşürürler.",
          "B": "Tepkimeye girer ve tepkime sonunda hiçbir değişikliğe uğramadan çıkarlar.",
          "C": "Her enzim sadece kendine özgü bir substratla (anahtar-kilit uyumu) çalışır.",
          "D": "Substrat yüzey alanı arttıkça enzimin çalışma hızı artar.",
          "E": "Sıcaklık 70 °C üzerine çıktığında enzimlerin etkinliği maksimum hıza ulaşır."
        },
        "correctAnswer": "E",
        "explanation": "Enzimler protein yapılı olduğu için yüksek sıcaklıkta (genellikle 55-60 °C üzerinde) denatüre olurlar ve aktiviteleri tamamen durur. Enzimler için optimum sıcaklık genellikle 36-37 °C civarıdır. Doğru seçenek E'dir.",
        "hintForSocratic": "Enzimler proteindir. Yumurtayı kaynar suya atarsak protein canlı kalır mı?"
      },
      {
        "id": "l1-bio-m-q7",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Vitaminler",
        "questionNumber": 7,
        "questionText": "Vitaminler suda çözünenler ve yağda çözünenler olarak ikiye ayrılır. Aşağıdaki vitaminlerden hangisinin fazlası karaciğerde depolanmayıp idrarla dışarı atıldığı için günlük düzenli alınması zorunludur?",
        "options": {
          "A": "A Vitamini",
          "B": "D Vitamini",
          "C": "E Vitamini",
          "D": "K Vitamini",
          "E": "C Vitamini"
        },
        "correctAnswer": "E",
        "explanation": "A, D, E ve K vitaminleri yağda çözünür ve karaciğerde depolanır. B ve C vitaminleri ise suda çözünür, fazlası vücutta depolanamaz ve idrarla atılır; bu nedenle her gün taze alınmalıdır. Doğru seçenek E'dir.",
        "hintForSocratic": "ADEK vitaminleri yağda çözünür ve depolanır. Suda çözünen B ve C depolanamaz."
      },
      {
        "id": "l1-bio-m-q8",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - Nükleik Asitler (DNA ve RNA)",
        "questionNumber": 8,
        "questionText": "DNA ve RNA molekülleri karşılaştırıldığında aşağıdakilerden hangisi DNA'ya ÖZGÜ bir özelliktir?",
        "options": {
          "A": "Fosfat grubu içerme",
          "B": "Adenin, Guanin ve Sitozin bazlarına sahip olma",
          "C": "Deoksiriboz şekeri ve Timin bazı içerme, kendini eşleyebilme",
          "D": "Ribozom organelinin yapısına katılma",
          "E": "Tek iplikten oluşma"
        },
        "correctAnswer": "C",
        "explanation": "DNA deoksiriboz şekeri ve Timin bazı içerir, çift ipliklidir ve replikasyonla kendini eşler. RNA ise riboz şekeri ve Urasil içerir, kendini eşleyemez. Doğru seçenek C'dir.",
        "hintForSocratic": "DNA'daki özel baz Timin iken RNA'daki Urasil'dir."
      },
      {
        "id": "l1-bio-m-q9",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - ATP ve Enerji Dönüşümleri",
        "questionNumber": 9,
        "questionText": "Canlı hücrelerde biyokimyasal reaksiyonların gerçekleşmesi için gereken ATP molekülünün yapısında aşağıdakilerden hangisi BULUNMAZ?",
        "options": {
          "A": "Adenin Azotlu Organik Bazı",
          "B": "Riboz Şekeri (5 Karbonlu Pentoz)",
          "C": "Üç adet Fosfat Grubu ve Yüksek Enerjili Fosfat Bağları",
          "D": "Deoksiriboz Şekeri",
          "E": "Ester ve Glikozit Bağları"
        },
        "correctAnswer": "D",
        "explanation": "ATP molekülü Adenin bazı, Riboz şekeri (deoksiriboz değil!) ve 3 fosfat grubundan oluşur. Deoksiriboz sadece DNA'da bulunur. Doğru seçenek D'dir.",
        "hintForSocratic": "ATP'nin şekeri RNA ile aynıdır (Riboz). DNA'nın şekeri olan Deoksiriboz ATP'de bulunmaz."
      },
      {
        "id": "l1-bio-m-q10",
        "courseKey": "biyoloji",
        "courseName": "Biyoloji",
        "topicName": "1. Tema: Yaşam - 3 Domain Sınıflandırması",
        "questionNumber": 10,
        "questionText": "Türkiye Yüzyılı Maarif Modeli kapsamında canlıların evrensel sınıflandırılmasında kabul edilen 3 Domain (Üst Âlem) sistemi aşağıdakilerden hangisinde eksiksiz verilmiştir?",
        "options": {
          "A": "Bitkiler, Hayvanlar, Mantarlar",
          "B": "Bakteriler (Bacteria), Arkeler (Archaea), Ökaryotlar (Eukarya)",
          "C": "Omurgalılar, Omurgasızlar, Tek Hücreliler",
          "D": "Prokaryotlar, Virüsler, Mantarlar",
          "E": "Kara Canlıları, Deniz Canlıları, Uçan Canlılar"
        },
        "correctAnswer": "B",
        "explanation": "Modern biyolojide Carl Woese tarafından geliştirilen 3 domain sistemi: Bacteria (Bakteriler), Archaea (Arkeler) ve Eukarya (Ökaryotlar - Protista, Bitki, Mantar, Hayvan) şeklindedir. Doğru seçenek B'dir.",
        "hintForSocratic": "En üst düzey sınıflandırmada Bacteria, Archaea ve Eukarya üçlüsü yer alır."
      }
    ]
  },
  {
    "id": "exam-lise1-tarih-yazili-1",
    "slug": "meb-9-tarih-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Tarih 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Geçmişin İnşa Sürecinde Tarih (Tarihsel Bilgi Üretimi, Dijitalleşme ve Yapay Zekâ), 2. Ünite: Eski Çağ Medeniyetleri.",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "tarih",
    "courseName": "Tarih (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-tar-m-q1",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarih Bilimi",
        "questionNumber": 1,
        "questionText": "Tarih biliminde bir olayın incelenmesinde;\n\nI. Deney ve gözlem yönteminin uygulanamaması\nII. Olayın gerçekleştiği dönemin şartlarının dikkate alınması\nIII. Birinci elden kaynaklara ve kanıtlara dayandırılması\n\nözelliklerinden hangileri tarihin fen bilimlerinden ayrılan temel farklarındandır?",
        "options": {
          "A": "Yalnız I",
          "B": "Yalnız II",
          "C": "I ve II",
          "D": "I ve III",
          "E": "I, II ve III"
        },
        "correctAnswer": "A",
        "explanation": "Tarih geçmişte yaşanıp bitmiş olayları inceler; dolayısıyla laboratuvarda deneyi ve tekrarlanması mümkün değildir. Fen bilimleri deney ve gözleme dayanırken tarih kanıt ve belgelere dayanır. Bu sebeple yalnız I doğrudan yöntemsel temel ayrımdır. Doğru seçenek A'dır.",
        "hintForSocratic": "Tarihte İstanbul'un Fethini laboratuvarda tekrar canlandırıp deney yapabilir miyiz?"
      },
      {
        "id": "l1-tar-m-q2",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarihsel Bilginin Üretim Süreci",
        "questionNumber": 2,
        "questionText": "Tarih araştırmalarında bilginin güvenilirliğini sağlamak amacıyla kaynakların yazarı, basım yeri, dönemin dili ve içerik tutarlılığı açısından sınanması aşamasına ne ad verilir?",
        "options": {
          "A": "Tarama (Kaynak Arama)",
          "B": "Tasnif (Sınıflandırma)",
          "C": "Tahlil (Çözümleme)",
          "D": "Tenkit (Eleştiri)",
          "E": "Terkip (Sentez)"
        },
        "correctAnswer": "D",
        "explanation": "Tarih yönteminde (5T kuralı) kaynakların doğruluğunu ve güvenilirliğini iç ve dış tenkit yoluyla sınama aşaması \"Tenkit\" (Eleştiri) basamağıdır. Doğru seçenek D'dir.",
        "hintForSocratic": "Kaynakların sahte mi gerçek mi olduğunu eleştirel gözle inceleme basamağı hangisidir?"
      },
      {
        "id": "l1-tar-m-q3",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "1. Ünite: Geçmişin İnşa Sürecinde Tarih - Takvim Sistemleri",
        "questionNumber": 3,
        "questionText": "Türklerin tarih boyunca kullandığı takvimlerden hangisi \"Ay yılı (Kamerî)\" esasına dayanır ve başlangıç olarak Hz. Muhammed'in hicretini esas alır?",
        "options": {
          "A": "12 Hayvanlı Türk Takvimi",
          "B": "Hicri Takvim",
          "C": "Celali Takvim",
          "D": "Rumi Takvim",
          "E": "Miladi Takvim"
        },
        "correctAnswer": "B",
        "explanation": "Hicri takvim Ay'ın Dünya etrafındaki dönüşünü (354 gün) esas alan tek takvimimizdir. Diğerleri Güneş yılı (365 gün) esaslıdır. Doğru seçenek B'dir.",
        "hintForSocratic": "Ramazan ayının her yıl 10-11 gün öne gelmesi Ay yılı esaslı Hicri takvimden kaynaklanır."
      },
      {
        "id": "l1-tar-m-q4",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "2. Ünite: Eski Çağ Medeniyetleri - Mezopotamya Medeniyetleri",
        "questionNumber": 4,
        "questionText": "Mezopotamya'da Sümerler tarafından inşa edilen \"Ziggurat\" adı verilen çok katlı tapınakların en üst katının rasathane (gözlemevi) olarak kullanılması, hangi bilim dalının gelişmesini doğrudan hızlandırmıştır?",
        "options": {
          "A": "Astronomi (Gök Bilimi)",
          "B": "Tıp ve Eczacılık",
          "C": "Biyoloji",
          "D": "Sosyoloji",
          "E": "Filoloji"
        },
        "correctAnswer": "A",
        "explanation": "Sümerli rahipler zigguratların en üst katından gezegen ve yıldız hareketlerini izleyerek Ay yılı esaslı ilk takvimi oluşturmuş, bu da Astronomi biliminin doğuşunu sağlamıştır. Doğru seçenek A'dır.",
        "hintForSocratic": "Gökyüzünü, ayı ve yıldızları gözlemlemek hangi bilimin alanıdır?"
      },
      {
        "id": "l1-tar-m-q5",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "2. Ünite: Eski Çağ Medeniyetleri - Mısır Medeniyeti",
        "questionNumber": 5,
        "questionText": "Eski Mısır'da Nil Nehri'nin her yıl belirli dönemlerde taşması ve tarla sınırlarının bozulması, Mısırlılarda hangi bilim dallarının ileri düzeyde gelişmesini zorunlu kılmıştır?",
        "options": {
          "A": "Geometri ve Matematik",
          "B": "Arkeoloji ve Nümizmatik",
          "C": "Sosyoloji ve Psikoloji",
          "D": "Kimya ve Metalurji",
          "E": "Edebiyat ve Tiyatro"
        },
        "correctAnswer": "A",
        "explanation": "Nil taştıktan sonra tarlaların sınırlarını yeniden hesaplamak Geometri ve Matematiğin, taşma zamanını önceden bilmek ise Güneş takviminin gelişmesini sağlamıştır. Doğru seçenek A'dır.",
        "hintForSocratic": "Tarla sınırlarını cetvelle ölçmek ve alan hesaplamak hangi bilimdir?"
      },
      {
        "id": "l1-tar-m-q6",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "2. Ünite: Eski Çağ Medeniyetleri - Anadolu Medeniyetleri (Hititler)",
        "questionNumber": 6,
        "questionText": "Hitit krallarının tanrılara hesap vermek amacıyla zaferleri kadar yenilgilerini de tarafsız şekilde yazdırdıkları \"Anal\" (Yıllıklar), tarih yazıcılığında hangi önemli anlayışın başlangıcı kabul edilir?",
        "options": {
          "A": "Efsanevi Tarih Yazıcılığı",
          "B": "Objektif (Tarafsız) Tarih Yazıcılığı",
          "C": "Öğretici (Pragmatik) Tarih Yazıcılığı",
          "D": "Sosyal Tarih Anlayışı",
          "E": "Kronolojik Olmayan Hikâyeci Tarih"
        },
        "correctAnswer": "B",
        "explanation": "Hitit kralları tanrılara yalan söylemekten korktukları için kayıplarını ve hezimetlerini de dürüstçe yazdırmışlardır. Bu durum tarihte ilk objektif (tarafsız) tarih yazıcılığı örneğidir. Doğru seçenek B'dir.",
        "hintForSocratic": "Kazanılan zaferlerin yanında kaybedilen savaşların da dürüstçe yazılması neyi gösterir?"
      },
      {
        "id": "l1-tar-m-q7",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "2. Ünite: Eski Çağ Medeniyetleri - Hukukun Doğuşu",
        "questionNumber": 7,
        "questionText": "Tarihte bilinen ilk yazılı kanunları yapan Sümer Kralı Urugakina ile sert kısas hükümlerine dayanan Babil Kralı Hammurabi kanunları karşılaştırıldığında;\n\nUrugakina Kanunları'nın en belirgin hümanist özelliği aşağıdakilerden hangisidir?",
        "options": {
          "A": "Ölüm cezalarının yerine genellikle para (fidye) ve tazminat cezalarının getirilmesi",
          "B": "Sadece rahipleri koruma altına alması",
          "C": "Tüm komşu ülkeleri kapsayan bir imparatorluk hukuku olması",
          "D": "Kölelik sistemini tamamen yasaklaması",
          "E": "Yazılı değil sözlü hukuka dayanması"
        },
        "correctAnswer": "A",
        "explanation": "Urugakina kanunları Hammurabi'nin sert \"göze göz, dişe diş\" kısas kurallarına nazaran daha ılımlı, fidyeye ve tazminata dayanan insani hükümler içerir. Doğru seçenek A'dır.",
        "hintForSocratic": "İlk kanun koyucu Urugakina sert kısas yerine ekonomik tazminat/fidye yolunu seçmiştir."
      },
      {
        "id": "l1-tar-m-q8",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "2. Ünite: Eski Çağ Medeniyetleri - Bozkır Kültürü ve Türkler",
        "questionNumber": 8,
        "questionText": "İlk ve Orta Çağlarda Orta Asya bozkırlarında yaşayan Türk topluluklarında konargöçer yaşam tarzının bir sonucu olarak aşağıdakilerden hangisi GÖZLENMEZ?",
        "options": {
          "A": "Taşınabilir hafif eşyaların ve çadır (yurt) kültürünün gelişmesi",
          "B": "Toplumsal sınıflaşmanın ve köleciliğin oluşmaması (toprak özel mülkiyeti yoktur)",
          "C": "Devasa kalıcı saraylar, tapınaklar ve anıtsal taş mimarinin yaygınlaşması",
          "D": "Hapis cezalarının kısa süreli olması",
          "E": "Askerî yeteneklerin ve binicilik sporlarının günlük hayatın parçası olması"
        },
        "correctAnswer": "C",
        "explanation": "Konargöçer bozkır kültüründe sürekli yer değiştirildiği için Uygurların yerleşik hayata geçmesine kadar anıtsal taş saray ve tapınak mimarisi gelişmemiştir. Doğru seçenek C'dir.",
        "hintForSocratic": "Sürekli hareket hâlindeki atlı göçebe topluluklar ağır taş saraylar inşa edebilir mi?"
      },
      {
        "id": "l1-tar-m-q9",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "1. Ünite: Geçmişin İnşa Sürecinde Tarih - Dijitalleşme ve Yapay Zekâ",
        "questionNumber": 9,
        "questionText": "Günümüz tarih araştırmalarında yapay zekâ ve büyük veri (Big Data) teknolojilerinin kullanılması tarihçilere en çok hangi alanda kolaylık sağlamaktadır?",
        "options": {
          "A": "Gelecekte yaşanacak siyasi olayları yüzde yüz kesinlikle önceden tahmin etmede",
          "B": "Milyonlarca sayfalık arşiv belgesi ve el yazmasını OCR ile hızla tarayıp anlamlandırmada",
          "C": "Tarihî olayları laboratuvarda kimyasal olarak yeniden canlandırmada",
          "D": "Tarihsel belgelerin tarafsızlık ihtiyacını tamamen ortadan kaldırmada",
          "E": "Tarih bilimini fen bilimlerinin bir alt dalına dönüştürmede"
        },
        "correctAnswer": "B",
        "explanation": "Türkiye Yüzyılı Maarif Modeli kazanımına göre; yapay zekâ ve dijital arşivler milyonlarca sayfalık Osmanlı arşivi ve antik metinleri saniyeler içinde tarayarak transkribe etmekte ve tarihçilere hız kazandırmaktadır. Doğru seçenek B'dir.",
        "hintForSocratic": "Yapay zekâ ve dijital arşiv taramaları el yazması metinleri okumada nasıl yardımcı olur?"
      },
      {
        "id": "l1-tar-m-q10",
        "courseKey": "tarih",
        "courseName": "Tarih",
        "topicName": "3. Ünite: Orta Çağ Medeniyetleri - Ticaret Yolları",
        "questionNumber": 10,
        "questionText": "Çin'in Şian kentinden başlayıp Orta Asya üzerinden Anadolu ve Akdeniz limanlarına uzanan, ipek, porselen ve kâğıdın taşındığı ünlü antik ticaret yolu aşağıdakilerden hangisidir?",
        "options": {
          "A": "Baharat Yolu",
          "B": "Kral Yolu",
          "C": "İpek Yolu",
          "D": "Kürk Yolu",
          "E": "Amber Yolu"
        },
        "correctAnswer": "C",
        "explanation": "Çin'den başlayarak Orta Asya, İran ve Anadolu üzerinden Avrupa'ya ulaşan ana kervan yolu İpek Yolu'dur. Hindistan'dan denizle gelen ise Baharat Yolu'dur. Doğru seçenek C'dir.",
        "hintForSocratic": "Çin'den kara yoluyla Anadolu'ya ulaşan ve adı değerli kumaştan gelen yol hangisidir?"
      }
    ]
  },
  {
    "id": "exam-lise1-cografya-yazili-1",
    "slug": "meb-9-cografya-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Coğrafya 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Coğrafyanın Doğası, 2. Ünite: Mekânsal Bilgi Teknolojileri (Harita Okuryazarlığı, CBS), 3. Ünite: Doğal Sistemler ve Süreçler.",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "cografya",
    "courseName": "Coğrafya (9. Sınıf)",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-cog-m-q1",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Projeksiyon Türleri",
        "questionNumber": 1,
        "questionText": "Dünya haritası çizilirken küresel yüzeyin düzleme aktarılmasından kaynaklanan bozulmaları en aza indirmek için projeksiyon yöntemleri kullanılır.\n\nBuna göre, Ekvator ve çevresini en az bozulmayla göstermek isteyen bir kartograf hangi projeksiyon türünü tercih etmelidir?",
        "options": {
          "A": "Silindirik Projeksiyon",
          "B": "Konik Projeksiyon",
          "C": "Düzlem Projeksiyon",
          "D": "Parçalı Projeksiyon",
          "E": "İzometrik Projeksiyon"
        },
        "correctAnswer": "A",
        "explanation": "Silindirik projeksiyon Ekvator ve çevresinde bozulmanın en az olduğu yöntemdir. Kutuplara doğru gidildikçe alan bozulması artar. Orta kuşak için Konik, kutup çevreleri için Düzlem projeksiyon kullanılır. Doğru seçenek A'dır.",
        "hintForSocratic": "Ekvator = Silindir; Orta Kuşak = Koni; Kutuplar = Düzlem."
      },
      {
        "id": "l1-cog-m-q2",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Harita ve Konum Okuryazarlığı",
        "questionNumber": 2,
        "questionText": "Bir bölgenin fiziki haritası 1 / 200.000 ölçeği ile çizilirken, aynı bölge 1 / 2.000.000 ölçeği ile yeniden çizilmiştir.\n\nBu ölçek değişimi sonucunda haritada aşağıdaki durumlardan hangisi gerçekleşir?",
        "options": {
          "A": "Ayrıntıyı gösterme gücü artar.",
          "B": "Haritanın düzlemde kapladığı alan büyür.",
          "C": "Ölçeğin paydası küçülmüştür.",
          "D": "Hata ve bozulma oranı artar, ayrıntı azalır.",
          "E": "İki nokta arasındaki gerçek uzaklık değişir."
        },
        "correctAnswer": "D",
        "explanation": "1 / 2.000.000 ölçeği, 1 / 200.000 ölçeğine göre daha küçük ölçeklidir (küçültme oranı 10 kat artmıştır). Ölçek küçüldükçe haritadaki bozulma artar, ayrıntıyı gösterme gücü azalır ve harita kağıtta daha az yer kaplar. Doğru cevap D'dir.",
        "hintForSocratic": "Ölçek paydası büyüdükçe harita daha çok küçültülmüş (küçük ölçek) olur. Çok küçültülen haritada ayrıntı artar mı azalır mı?"
      },
      {
        "id": "l1-cog-m-q3",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Projeksiyon Türleri",
        "questionNumber": 3,
        "questionText": "Türkiye (36° - 42° Kuzey paralelleri) orta kuşakta yer alan bir ülkedir.\n\nTürkiye'nin fiziki ve beşerî haritaları çizilirken açı ve alan bozulmalarını en aza indirmek için en uygun projeksiyon türü aşağıdakilerden hangisidir?",
        "options": {
          "A": "Silindirik Projeksiyon",
          "B": "Konik Projeksiyon",
          "C": "Düzlem Projeksiyon",
          "D": "Eşit Alanlı Silindirik Projeksiyon",
          "E": "Mollweide Projeksiyonu"
        },
        "correctAnswer": "B",
        "explanation": "Orta kuşak ülkelerinin haritalanmasında yüzey temasının orta enlemlerde en yüksek olduğu Konik Projeksiyon kullanılır. Ekvator için Silindirik, kutuplar için Düzlem projeksiyon tercih edilir. Doğru seçenek B'dir.",
        "hintForSocratic": "Orta kuşak ülkeleri için teğet geçen koni yüzeyi en az bozulmayı sağlar."
      },
      {
        "id": "l1-cog-m-q4",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Coğrafi Bilgi Sistemleri (CBS)",
        "questionNumber": 4,
        "questionText": "Coğrafi Bilgi Sistemleri (CBS), yeryüzüne ait mekânsal ve öznitelik verilerinin toplanması, depolanması, analiz edilmesi ve haritalandırılması sürecini yöneten bilgisayar tabanlı bir sistemdir.\n\nAşağıdakilerden hangisi CBS'nin sağladığı temel avantajlardan biri DEĞİLDİR?",
        "options": {
          "A": "Farklı tematik katmanları (yol, su, nüfus) üst üste çakıştırarak mekânsal analiz yapabilme",
          "B": "Afet ve acil durum yönetiminde hızlı ve dinamik karar desteği sağlama",
          "C": "Harita çizimlerindeki tüm projeksiyon kaynaklı alan bozulmalarını tamamen sıfıra indirme",
          "D": "Veri güncellemesini ve sorgulamalarını kısa sürede gerçekleştirebilme",
          "E": "Şehir planlama ve altyapı projelerinde maliyet ve zaman tasarrufu sağlama"
        },
        "correctAnswer": "C",
        "explanation": "Küre şeklindeki Dünya düzleme aktarılırken matematiksel olarak bozulmaların tamamen sıfırlanması imkânsızdır; CBS bu bozulmaları sıfırlamaz, veriyi dijital ortamda katmanlı yönetir. Doğru seçenek C'dir.",
        "hintForSocratic": "Dünya küre olduğu için düzleme aktarırken geometrik bozulmaları tamamen sıfırlamak mümkün müdür?"
      },
      {
        "id": "l1-cog-m-q5",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "1. Ünite: Coğrafyanın Doğası - Coğrafyanın Temel İlkeleri",
        "questionNumber": 5,
        "questionText": "\"Türkiye'de fındık tarımı en çok Doğu ve Batı Karadeniz kıyı kuşağında yapılırken, turunçgil üretimi Akdeniz ve Ege kıyılarında yoğunlaşmıştır.\"\n\nBu cümlede coğrafyanın hangi temel ilkesi ön plana çıkmaktadır?",
        "options": {
          "A": "Nedensellik (Sebep-Sonuç) İlkesi",
          "B": "Dağılış İlkesi",
          "C": "Karşılıklı İlgi (Bağlantı) İlkesi",
          "D": "Tarihsellik İlkesi",
          "E": "Dinamizm İlkesi"
        },
        "correctAnswer": "B",
        "explanation": "Bir coğrafi olayın veya ürünün yeryüzünde nerede bulunduğunu, nerelere yayıldığını gösteren ilke \"Dağılış İlkesi\"dir. Dağılış ilkesi coğrafyayı diğer bilimlerden ayıran en özgün ilkedir. Doğru cevap B'dir.",
        "hintForSocratic": "\"Nerede üretilir, nerelerde yoğunlaşmıştır?\" sorusuna yanıt veren ilke hangisidir?"
      },
      {
        "id": "l1-cog-m-q6",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "3. Ünite: Doğal Sistemler ve Süreçler - Hava Durumu ve İklim",
        "questionNumber": 6,
        "questionText": "Aşağıda verilen ifadelerden hangisi \"İklim\" kavramına örnek oluşturur?",
        "options": {
          "A": "Ankara'da bugün öğleden sonra aniden bastıran sağanak yağış su baskınlarına yol açtı.",
          "B": "Erzurum'da yarın sabah saatlerinde yoğun sis ve buzlanma beklenmektedir.",
          "C": "Doğu Karadeniz kıyıları her mevsim yağışlı, yıllık sıcaklık farkı az olan ılıman bir karaktere sahiptir.",
          "D": "İstanbul'da lodos fırtınası nedeniyle vapur seferleri iptal edildi.",
          "E": "İzmir'de hafta sonu hava sıcaklığı mevsim normallerinin 5 derece üzerine çıkacak."
        },
        "correctAnswer": "C",
        "explanation": "İklim, geniş alanlarda uzun yıllar (en az 30-35 yıl) boyunca değişmeyen ortalama atmosfer şartlarıdır. C seçeneğindeki \"her mevsim yağışlı ve ılıman\" uzun vadeli iklimi belirtir; diğerleri kısa süreli hava durumudur. Doğru seçenek C'dir.",
        "hintForSocratic": "Hava durumu anlık ve günlüktür; iklim ise onlarca yılın genel ve değişmeyen karakteridir."
      },
      {
        "id": "l1-cog-m-q7",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Coğrafi Koordinatlar ve Yerel Saat",
        "questionNumber": 7,
        "questionText": "30° Doğu meridyeninde yer alan İzmit'te yerel saat 14.20 iken, 45° Doğu meridyenindeki Iğdır'da yerel saat kaçtır?",
        "options": {
          "A": "13.20",
          "B": "14.20",
          "C": "15.00",
          "D": "15.20",
          "E": "16.00"
        },
        "correctAnswer": "D",
        "explanation": "1. Adım: Meridyen farkını bulalım: 45° - 30° = 15 meridyen.\n2. Adım: Zaman farkı: 15 · 4 dakika = 60 dakika (1 saat).\n3. Adım: Iğdır daha doğuda olduğu için saati ileridir: 14.20 + 01.00 = 15.20. Doğru cevap D'dir.",
        "hintForSocratic": "Her meridyen arası 4 dakikadır. Doğuya gidildikçe yerel saat daha ileri olur."
      },
      {
        "id": "l1-cog-m-q8",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "3. Ünite: Doğal Sistemler ve Süreçler - Sıcaklık ve Enlem İlişkisi",
        "questionNumber": 8,
        "questionText": "Ekvator'dan kutuplara doğru gidildikçe sıcaklıkların genel olarak azalmasının temel nedeni aşağıdakilerden hangisidir?",
        "options": {
          "A": "Dünya'nın kendi ekseni etrafında batıdan doğuya dönmesi",
          "B": "Güneş ışınlarının yere düşme açısının küresel şekilden dolayı daralması",
          "C": "Okyanus akıntılarının yön değiştirmesi",
          "D": "Yükseltinin kutuplara doğru sürekli artması",
          "E": "Karasallık şiddetinin kutup çevrelerinde azalması"
        },
        "correctAnswer": "B",
        "explanation": "Dünya'nın geoit/küresel şekli sebebiyle Ekvator'a dik ve dike yakın gelen Güneş ışınları, kutuplara doğru gidildikçe daha dar ve eğik açıyla düşer. Bu durum sıcaklığın enleme bağlı olarak azalmasının temel nedenidir. Doğru seçenek B'dir.",
        "hintForSocratic": "Dünya düz olsaydı Güneş ışınları her yere aynı açıyla düşerdi. Küresel şekil ışınların geliş açısını nasıl etkiler?"
      },
      {
        "id": "l1-cog-m-q9",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "2. Ünite: Mekânsal Bilgi Teknolojileri - Haritalarda Yükselti Gösterim Yöntemleri",
        "questionNumber": 9,
        "questionText": "İzohips (Eş yükselti eğrisi) haritasında eğrilerin birbirine çok yaklaştığı (sıklaştığı) bir yamaç için aşağıdakilerden hangisi KESİNLİKLE söylenebilir?",
        "options": {
          "A": "O bölgede akarsuyun akış hızı ve aşındırma gücü fazladır (eğim fazladır).",
          "B": "Yükselti aniden deniz seviyesinin altına inmiştir.",
          "C": "Bölgede geniş tarım ovaları ve düzlükler yer alır.",
          "D": "Kalıcı karların başladığı zirve noktasıdır.",
          "E": "Yol yapım maliyeti en düşük seviyededir."
        },
        "correctAnswer": "A",
        "explanation": "İzohips çizgilerinin sıklaştığı yerlerde arazinin eğimi çok fazladır (dik yamaç). Eğim fazla olduğu için akarsu hızlı akar, aşındırma gücü artar ve yol yapım maliyeti yükselir. Doğru seçenek A'dır.",
        "hintForSocratic": "İzohipslerin sık geçmesi arazinin dik/eğimli olduğunu gösterir. Dik yamaçta su hızlı mı akar yavaş mı?"
      },
      {
        "id": "l1-cog-m-q10",
        "courseKey": "cografya",
        "courseName": "Coğrafya",
        "topicName": "3. Ünite: Doğal Sistemler ve Süreçler - Küresel İklim Değişikliği",
        "questionNumber": 10,
        "questionText": "Sanayi Devrimi'nden bu yana atmosferdeki sera gazlarının (CO₂, CH₄) artması sonucunda ortaya çıkan küresel iklim değişikliği ile mücadelede aşağıdakilerden hangisi sürdürülebilir bir önlem DEĞİLDİR?",
        "options": {
          "A": "Enerji üretiminde kömür ve linyit santrallerinin payını artırmak",
          "B": "Güneş, rüzgâr ve jeotermal gibi yenilenebilir enerji kaynaklarına geçiş yapmak",
          "C": "Ormansızlaşmayı önleyerek yeşil kuşak ve ağaçlandırma projelerini yaygınlaştırmak",
          "D": "Sanayide ve ulaşımda enerji verimliliğini artıran yeşil teknolojileri desteklemek",
          "E": "Bireysel karbon ayak izini azaltmaya yönelik toplu taşıma kullanımını teşvik etmek"
        },
        "correctAnswer": "A",
        "explanation": "Kömür ve linyit gibi fosil yakıtlar atmosfere en çok karbon salan yakıtlardır. Bunların payını artırmak küresel ısınmayı daha da hızlandırır; tam tersine azaltılmalıdır. Doğru seçenek A'dır.",
        "hintForSocratic": "Fosil yakıtlar (kömür, petrol) sera gazı salınımını artırır mı azaltır mı?"
      }
    ]
  },
  {
    "id": "exam-lise1-din-yazili-1",
    "slug": "meb-9-din-1-donem-1-yazili",
    "title": "MEB 9. Sınıf Din Kültürü 1. Dönem 1. Ortak Yazılı Sınavı Provası",
    "description": "Türkiye Yüzyılı Maarif Modeli: 1. Ünite: Allah-İnsan İlişkisi (İnsanın Yaratılışı, Doğruyu Arayan İnsan, İbadet ve Dua, Rum Suresi 17-27), 2. Ünite: İslam'da İnanç Esasları.",
    "tier": "lise1",
    "type": "yazili",
    "courseKey": "din",
    "courseName": "Din Kültürü ve Ahlak Bilgisi",
    "questionCount": 10,
    "durationMinutes": 40,
    "difficulty": "MEB Yazılı Düzeyi",
    "isPro": false,
    "badgeText": "MEB MAARİF MODELİ",
    "questions": [
      {
        "id": "l1-din-m-q1",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "1. Ünite: Allah-İnsan İlişkisi - Rum Suresi 17-27 ve Tefekkür",
        "questionNumber": 1,
        "questionText": "Rum Suresi 17-27. ayetlerinde göklerin ve yerin yaratılışı, dillerinizin ve renklerinizin farklılığı, gece dinlenip gündüz rızık aramanız O'nun varlığının delillerindendir buyrulmaktadır.\n\nBu ayet grubu öğrencileri öncelikle hangi zihinsel ve ahlaki eyleme yönlendirmektedir?",
        "options": {
          "A": "Evrendeki düzen ve çeşitlilik üzerinde tefekkür ederek yaratıcıyı tanımaya",
          "B": "Ticaret faaliyetlerini sadece gündüz saatleriyle sınırlamaya",
          "C": "Tüm dilleri tek bir ortak dünya dilinde birleştirmeye",
          "D": "Tarihsel kalıntıları sadece arkeolojik kazılarla incelemeye",
          "E": "İbadetleri sadece gece vaktinde yerine getirmeye"
        },
        "correctAnswer": "A",
        "explanation": "Rum suresinin ilgili ayetleri evrendeki kusursuz intizamı, varlıkların çeşitliliğini ve insanın fıtratını tefekkür ederek (derinlemesine düşünerek) Allah'ın birliğini ve kudretini kavramaya davet eder. Doğru seçenek A'dır.",
        "hintForSocratic": "Ayetlerdeki kainat ve tabiat delilleri insanı ne yapmaya (tefekkür/düşünme) çağırır?"
      },
      {
        "id": "l1-din-m-q2",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "1. Ünite: Allah-İnsan İlişkisi - İnsanın Fıtratı ve İnanma İhtiyacı",
        "questionNumber": 2,
        "questionText": "İnsanın doğuştan getirdiği, yaratıcısını tanıma, O'na inanma ve sığınma eğilimine İslam terminolojisinde ne ad verilir?",
        "options": {
          "A": "Fıtrat",
          "B": "İhsan",
          "C": "Tevazu",
          "D": "Hidayet",
          "E": "Takva"
        },
        "correctAnswer": "A",
        "explanation": "Fıtrat, insanın yaratılıştan sahip olduğu temiz öz ve Allah'ı tanıma, inanma kabiliyetidir. Doğru seçenek A'dır.",
        "hintForSocratic": "İnsanın yaratılıştan getirdiği temiz doğaya ne denir?"
      },
      {
        "id": "l1-din-m-q3",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "1. Ünite: Allah-İnsan İlişkisi - Vahiy ve Akıl Dengesi",
        "questionNumber": 3,
        "questionText": "İslam dinine göre bir kimsenin dinî emir ve yasaklardan sorumlu (mükellef) olabilmesi için gereken iki temel şart aşağıdakilerden hangisidir?",
        "options": {
          "A": "Zenginlik ve Soyluluk",
          "B": "Akıl sağlığı ve Ergenlik (Büluğ) çağına ulaşmış olmak",
          "C": "Medeni kanunda reşit olmak ve meslek sahibi olmak",
          "D": "Hac ibadetini yapmış olmak ve Arapça bilmek",
          "E": "Sadece erkek olmak ve ticaretle uğraşmak"
        },
        "correctAnswer": "B",
        "explanation": "İslam hukukunda sorumluluk (mükellefiyet) akıl ve iradeye dayanır. Akıl sağlığı yerinde olan ve büluğ (ergenlik) çağına giren herkes dinî hükümlerden sorumludur. Doğru seçenek B'dir.",
        "hintForSocratic": "Aklı olmayanın dini sorumluluğu var mıdır? Sorumluluk ne zaman başlar?"
      },
      {
        "id": "l1-din-m-q4",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "2. Ünite: İslam'da İnanç Esasları - İmanın Mahiyeti",
        "questionNumber": 4,
        "questionText": "İslam inancında gerçek ve kâmil bir imanın oluşabilmesi için;\n\nI. Kalp ile tasdik etmek (Gönülden doğrulamak)\nII. Dil ile ikrar etmek (Sözlü ifade etmek)\nIII. Amelleriyle bunu desteklemek\n\nunsurlarından hangisi imanın ASIL ve VAZGEÇİLMEZ şartıdır?",
        "options": {
          "A": "Yalnız I (Kalp ile tasdik)",
          "B": "Yalnız II (Dil ile ikrar)",
          "C": "Yalnız III (Amel)",
          "D": "I ve II",
          "E": "II ve III"
        },
        "correctAnswer": "A",
        "explanation": "İmanın özü ve vazgeçilmez rüknü \"Kalp ile tasdik\"tir. Kalpten inanmadıkça sadece dille söyleyen kişi münafık sayılır. Dille ikrar ise dünyevi ilişkilerde bilinmesi için gereklidir. Doğru seçenek A'dır.",
        "hintForSocratic": "İman öncelikle nerede başlar ve nerede onaylanır?"
      },
      {
        "id": "l1-din-m-q5",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "2. Ünite: İslam'da İnanç Esasları - Tevhid İnancı",
        "questionNumber": 5,
        "questionText": "İslam'ın en temel inanç esası olan \"Tevhid\", Allah'ın varlığı, birliği, eşi ve benzeri olmadığı inancıdır.\n\nAşağıdaki surelerden hangisi Tevhid inancını en öz ve berrak şekilde özetleyen suredir?",
        "options": {
          "A": "Fatiha Suresi",
          "B": "İhlas Suresi",
          "C": "Fil Suresi",
          "D": "Kevser Suresi",
          "E": "Nas Suresi"
        },
        "correctAnswer": "B",
        "explanation": "\"De ki: O Allah birdir. Allah sameddir. Doğurmamış ve doğmamıştır. Hiçbir şey O'na denk değildir.\" mealindeki İhlas Suresi tevhid inancının en öz ve berrak ifadesidir. Doğru seçenek B'dir.",
        "hintForSocratic": "\"Kul hüvellahü ehad\" ile başlayan sure hangisidir?"
      },
      {
        "id": "l1-din-m-q6",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "3. Ünite: İslam'da İbadetler - İbadet Türleri",
        "questionNumber": 6,
        "questionText": "İslam'da ibadetler yapılış şekillerine göre sınıflandırılır. Aşağıdakilerden hangisi hem beden hem de mal ile yapılan bir ibadettir?",
        "options": {
          "A": "Namaz kılmak",
          "B": "Oruç tutmak",
          "C": "Hacca gitmek",
          "D": "Zekât vermek",
          "E": "Sadaka-i fıtır vermek"
        },
        "correctAnswer": "C",
        "explanation": "Namaz ve oruç sadece bedenî; zekât ve sadaka sadece malî; hac ise hem sağlık/fiziksel çaba (beden) hem de maddi harcama (mal) gerektiren müşterek bir ibadettir. Doğru seçenek C'dir.",
        "hintForSocratic": "Hac ibadeti için hem para harcamak hem de yolculuk ve tavaf gibi fiziksel güç sarf etmek gerekir mi?"
      },
      {
        "id": "l1-din-m-q7",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "3. Ünite: İslam'da İbadetler - İbadet ve Ahlak İlişkisi",
        "questionNumber": 7,
        "questionText": "\"...Şüphesiz namaz, insanı hayasızlıktan ve kötülükten alıkoyar...\" (Ankebût Suresi, 45. Ayet)\n\nBu ayet-i kerime ibadetlerin hangi boyutunu ve fonksiyonunu vurgulamaktadır?",
        "options": {
          "A": "Sadece ahirette cezadan kurtulma aracı olduğunu",
          "B": "Bireyin ahlaki gelişimini sağlayan ve onu kötülükten koruyan terbiye edici yönünü",
          "C": "Toplumsal statü ve itibar kazanma vesilesi olduğunu",
          "D": "Yalnızca belirli yaş gruplarına hitap ettiğini",
          "E": "Ekonomik refahı doğrudan artırıcı niteliğini"
        },
        "correctAnswer": "B",
        "explanation": "İbadetler sadece şekilsel eylemler değil, insanın ahlakını güzelleştiren, onu haksızlıktan ve kötülükten men eden bir kalkandır. Doğru seçenek B'dir.",
        "hintForSocratic": "Namazın insanı kötülükten alıkoyması ahlaki bir terbiye midir?"
      },
      {
        "id": "l1-din-m-q8",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "1. Ünite: Allah-İnsan İlişkisi - Tevekkül Anlayışı",
        "questionNumber": 8,
        "questionText": "Bir çiftçinin tarlasını sürüp, tohumunu ektikten, sulama ve bakımını eksiksiz yaptıktan sonra bol ürün vermesi için Allah'a güvenip dua etmesi hangi kavramla açıklanır?",
        "options": {
          "A": "Tevekkül",
          "B": "Kadercilik (Fatalizm)",
          "C": "Taassup",
          "D": "Riya",
          "E": "Gıybet"
        },
        "correctAnswer": "A",
        "explanation": "Tevekkül, hedefe ulaşmak için gereken tüm maddi ve manevi sebeplere başvurup tedbir aldıktan sonra sonucu Allah'a bırakıp O'na güvenmektir. Tedbir almadan beklemek tevekkül değil tembelliktir. Doğru seçenek A'dır.",
        "hintForSocratic": "Önce tedbir, sonra takdir mantığına ne ad verilir?"
      },
      {
        "id": "l1-din-m-q9",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "4. Ünite: Ahlaki Değerler ve Gençlik - Temel Erdemler",
        "questionNumber": 9,
        "questionText": "İslam ahlak felsefesinde nefsin öfke gücünün dengelenmesiyle ortaya çıkan, hak yolda cesaret ve yiğitlik gösterme erdemine ne ad verilir?",
        "options": {
          "A": "Hikmet",
          "B": "İffet",
          "C": "Şecaat",
          "D": "Adalet",
          "E": "Cömertlik"
        },
        "correctAnswer": "C",
        "explanation": "Klasik İslam ahlakında 4 ana erdem vardır: Hikmet (akıl erdemi), İffet (şehvetin dengesi), Şecaat (öfkenin/korkunun dengesi olan yiğitlik ve cesaret), Adalet (tüm erdemlerin dengesi). Doğru seçenek C'dir.",
        "hintForSocratic": "Korkaklık ile saldırganlığın ortasındaki meşru cesaret erdemi \"Şecaat\"tir."
      },
      {
        "id": "l1-din-m-q10",
        "courseKey": "din",
        "courseName": "Din Kültürü",
        "topicName": "4. Ünite: Ahlaki Değerler ve Gençlik - Asr-ı Saadette Genç Sahabiler",
        "questionNumber": 10,
        "questionText": "Hz. Peygamber (s.a.v.) tarafından henüz çok genç yaştayken Medine'ye ilk öğretmen olarak gönderilen ve nezaketi, güzel ahlakı ve tebliği ile Medine halkının İslam'ı tanımasına vesile olan genç sahabi kimdir?",
        "options": {
          "A": "Mus'ab bin Umeyr",
          "B": "Zeyd bin Sabit",
          "C": "Muaz bin Cebel",
          "D": "Cafer bin Ebi Talib",
          "E": "Usame bin Zeyd"
        },
        "correctAnswer": "A",
        "explanation": "Mus'ab bin Umeyr (r.a.), Mekke'nin zengin ve soylu bir genci iken Müslüman olmuş, Hz. Peygamber tarafından Birinci Akabe Biatı sonrası Medine'ye öğretmen ve elçi olarak gönderilmiştir. Doğru seçenek A'dır.",
        "hintForSocratic": "Medine'ye İslam'ı anlatan ilk genç muallim kimdir?"
      }
    ]
  }
];
