import type { OnlineExam } from '@/types/online-exam';

export const MATH_EXAMS: OnlineExam[] = [
  // 1. Matematik Seviye Denemesi
  {
    id: 'exam-mat-1',
    slug: 'lgs-2027-matematik-seviye-denemesi',
    title: '2027 LGS Matematik Seviye Belirleme Denemesi',
    description: 'Yeni nesil beceri temelli sorular, problem çözme ve analitik düşünme becerilerini ölçen 5 soruluk hızlı matematik branş denemesi.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'ÜCRETSİZ DENEME',
    questions: [
      {
        id: 'mat-q-1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (EBOB - EKOK)',
        questionNumber: 1,
        questionText:
          'Bir marangoz uzunlukları 120 cm ve 180 cm olan iki tahta kalası, hiç parça artmayacak şekilde eşit uzunlukta en büyük parçalara ayırmak istiyor.\n\nHer bir kesim işlemi 30 saniye sürdüğüne göre, bu kesim işleminin tamamı en az kaç saniye sürer?',
        options: {
          A: '60 saniye',
          B: '90 saniye',
          C: '120 saniye',
          D: '150 saniye',
        },
        correctAnswer: 'B',
        explanation:
          '1. EBOB(120, 180) = 60 cm (Her bir eş parçanın uzunluğu).\n2. 120 cm tahtadan 120 / 60 = 2 parça elde edilir. 2 parça için 1 kesim yapılır.\n3. 180 cm tahtadan 180 / 60 = 3 parça elde edilir. 3 parça için 2 kesim yapılır.\n4. Toplam kesim sayısı: 1 + 2 = 3 kesim.\n5. Her kesim 30 saniye sürdüğünden: 3 × 30 = 90 saniye sürer.',
        hintForSocratic: 'Parça sayısı ile kesim sayısı arasındaki ilişkiyi hatırla. Bir çubuğu 3 parçaya bölmek için kaç defa kesmen gerekir?',
      },
      {
        id: 'mat-q-2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler',
        questionNumber: 2,
        questionText:
          'Bir laboratuvarda bulunan bakteri popülasyonu her 20 dakikada bir 2 katına çıkmaktadır.\n\nBaşlangıçta kapta 2^4 adet bakteri olduğuna göre, 2 saatin sonunda kapta toplam kaç adet bakteri bulunur?',
        options: {
          A: '2^8',
          B: '2^10',
          C: '2^12',
          D: '2^14',
        },
        correctAnswer: 'B',
        explanation:
          '1. 2 saat = 120 dakikadır.\n2. Bakteriler her 20 dakikada 2 katına çıktığı için 120 / 20 = 6 kez çoğalma gerçekleşir.\n3. 6 kez 2 ile çarpmak, 2^6 ile çarpmak demektir.\n4. Son miktar = 2^4 × 2^6 = 2^(4 + 6) = 2^10 olur.',
        hintForSocratic: '2 saat içinde kaç tane 20 dakika olduğunu hesapla ve üslü ifadelerde çarpma kuralını (tabanlar aynıysa üsler toplanır) hatırla.',
      },
      {
        id: 'mat-q-3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 3,
        questionText:
          'Alanı 108 cm² olan kare şeklindeki bir kartonun çevresi kaç santimetredir?',
        options: {
          A: '12√3',
          B: '18√3',
          C: '24√3',
          D: '36√3',
        },
        correctAnswer: 'C',
        explanation:
          '1. Karenin alanı a² = 108 cm² ise bir kenarı a = √108 cm\'dir.\n2. √108 = √(36 × 3) = 6√3 cm\'dir.\n3. Karenin çevresi = 4 × a = 4 × 6√3 = 24√3 cm olarak bulunur.',
        hintForSocratic: 'Karenin bir kenarını bulmak için alanın karekökünü al. 108 sayısını tam kare bir çarpanına ayırabilir misin?',
      },
      {
        id: 'mat-q-4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Basit Olayların Olma Olasılığı',
        questionNumber: 4,
        questionText:
          'Bir torbada aynı büyüklükte 5 kırmızı, 4 mavi ve belirli sayıda sarı bilye bulunmaktadır.\n\nTorbada rastgele çekilen bir bilyenin sarı olma olasılığı 1/4 olduğuna göre, torbada kaç adet sarı bilye vardır?',
        options: {
          A: '2',
          B: '3',
          C: '4',
          D: '5',
        },
        correctAnswer: 'B',
        explanation:
          '1. Sarı bilye sayısı s olsun. Kırmızı + Mavi = 5 + 4 = 9 bilye.\n2. Toplam bilye sayısı = 9 + s olur.\n3. Olasılık formülü: s / (9 + s) = 1/4.\n4. İçler dışlar çarpımı: 4s = 9 + s => 3s = 9 => s = 3 bulunur.',
        hintForSocratic: 'Olasılık formülü: İstenen durum / Tüm olası durumlar. Sarı bilye sayısına "x" diyerek denklem kurabilirsin.',
      },
      {
        id: 'mat-q-5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Cebirsel İfadeler ve Özdeşlikler',
        questionNumber: 5,
        questionText:
          '(2x - 3)² ifadesinin özdeşi aşağıdakilerden hangisidir?',
        options: {
          A: '4x² - 9',
          B: '4x² - 6x + 9',
          C: '4x² - 12x + 9',
          D: '4x² + 12x - 9',
        },
        correctAnswer: 'C',
        explanation:
          '1. İki terimin farkının karesi özdeşliği: (a - b)² = a² - 2ab + b².\n2. Burada a = 2x ve b = 3\'tür.\n3. a² = (2x)² = 4x²\n4. -2ab = -2 × (2x) × 3 = -12x\n5. b² = 3² = 9\n6. Sonuç: 4x² - 12x + 9 olur.',
        hintForSocratic: 'Tam kare açılımında ortadaki terimi bulurken birinci ile ikincinin çarpımının iki katını almayı unutma.',
      },
    ],
  },

  // 2. MEB Resmi Matematik Örnek Soru Denemesi
  {
    id: 'exam-meb-mat-1',
    slug: 'lgs-2027-meb-resmi-matematik-denemesi',
    title: '2027 LGS MEB Resmi Matematik Örnek Soru Denemesi',
    description: 'Milli Eğitim Bakanlığı ÖDSGM tarafından yayımlanan resmi örnek sorulardan ve MEB resmi cevap anahtarlarından derlenmiş yeni nesil matematik branş denemesi.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 15,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'MEB RESMİ ÖRNEK',
    questions: [
      {
        id: 'meb-mat-q-1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (EBOB - EKOK)',
        questionNumber: 1,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nBir kenar uzunluğu 30 metre ve 45 metre olan dikdörtgen şeklindeki bir arsanın etrafına, köşelerine de gelmek şartıyla eşit aralıklarla aydınlatma direkleri dikilecektir.\n\nBuna göre bu arsanın etrafına dikilecek direk sayısı EN AZ kaçtır?',
        options: {
          A: '10',
          B: '12',
          C: '15',
          D: '18',
        },
        correctAnswer: 'A',
        explanation:
          'Resmi MEB Çözümü:\n1. Direk sayısının en az olması için iki direk arasındaki mesafenin EN BÜYÜK olması gerekir. EBOB(30, 45) = 15 metredir.\n2. Dikdörtgenin çevresi = 2 × (30 + 45) = 150 metredir.\n3. Kapalı şekillerde köşe şartıyla direk sayısı = Çevre / EBOB = 150 / 15 = 10 adettir.',
        hintForSocratic: 'Direk sayısının en az olması için aralık mesafesini en büyük seçmelisin (EBOB). Çevreyi bulup EBOB\'a bölmeyi dene.',
      },
      {
        id: 'meb-mat-q-2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler',
        questionNumber: 2,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nBir fabrikanın ürettiği 5^8 adet cıvata, her birinde 25 adet cıvata bulunan kutulara doldurulacaktır.\n\nDaha sonra bu kutuların her biri 125 TL\'den satıldığına göre, tüm cıvataların satışından elde edilen toplam gelir kaç TL olur?',
        options: {
          A: '5^7 TL',
          B: '5^8 TL',
          C: '5^9 TL',
          D: '5^10 TL',
        },
        correctAnswer: 'C',
        explanation:
          'Resmi MEB Çözümü:\n1. Kutu sayısı = Toplam Cıvata / Bir Kutudaki Cıvata = 5^8 / 25 = 5^8 / 5^2 = 5^(8 - 2) = 5^6 kutu.\n2. Her kutu 125 TL (5^3 TL) olduğuna göre;\nToplam Gelir = 5^6 × 5^3 = 5^(6 + 3) = 5^9 TL elde edilir.',
        hintForSocratic: '25 sayısını 5 tabanında (5^2) ve 125 sayısını 5 tabanında (5^3) yazarak üslü sayılarda bölme ve çarpma kuralını uygula.',
      },
      {
        id: 'meb-mat-q-3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 3,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nSayı doğrusunda √75 sayısına en yakın tam sayı A, √120 sayısına en yakın tam sayı B olduğuna göre, A + B toplamı kaçtır?',
        options: {
          A: '18',
          B: '19',
          C: '20',
          D: '21',
        },
        correctAnswer: 'C',
        explanation:
          'Resmi MEB Çözümü:\n1. 8 = √64 < √75 < √81 = 9. 75 sayısı 81\'e (fark 6) 64\'ten (fark 11) daha yakındır. Dolayısıyla A = 9.\n2. 10 = √100 < √120 < √121 = 11. 120 sayısı 121\'e (fark 1) çok yakındır. Dolayısıyla B = 11.\n3. A + B = 9 + 11 = 20 bulunur.',
        hintForSocratic: 'Tam kare sayıları hatırla: 64, 81, 100, 121. √75 ve √120 sayılarının hangi tam karelere daha yakın olduğunu incele.',
      },
      {
        id: 'meb-mat-q-4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Doğrusal Denklemler ve Eğim',
        questionNumber: 4,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nDikey uzunluğun yatay uzunluğa oranı eğimi verir.\n\nYüksekliği 1,2 metre ve taban yatay uzunluğu 3 metre olan bir engelli rampasının eğimi yüzde kaçtır?',
        options: {
          A: '%25',
          B: '%30',
          C: '%40',
          D: '%50',
        },
        correctAnswer: 'C',
        explanation:
          'Resmi MEB Çözümü:\n1. Eğim = Dikey Uzunluk / Yatay Uzunluk = 1,2 / 3.\n2. 1,2 / 3 = 12 / 30 = 4 / 10 = 40 / 100 = %40 bulunur.',
        hintForSocratic: 'Eğim formülü: Dikey / Yatay. 1,2 sayısını 3\'e bölüp paydayı 100 yapacak şekilde genişlet.',
      },
      {
        id: 'meb-mat-q-5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Veri Analizi (Daire Grafiği)',
        questionNumber: 5,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nBir çiftlikteki 720 adet hayvanın türlerine göre dağılımı daire grafiğinde gösterilmiştir.\n\nKoyunların merkez açısı 150° olduğuna göre, bu çiftlikte kaç adet koyun vardır?',
        options: {
          A: '240',
          B: '300',
          C: '320',
          D: '360',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\n1. Daire grafiğinin tamamı 360°\'dir.\n2. 360° tamamı 720 hayvana karşılık geliyorsa; 1° = 720 / 360 = 2 hayvan demektir.\n3. Koyunlar 150° olduğuna göre: 150 × 2 = 300 adet koyun vardır.',
        hintForSocratic: 'Dairenin tamamının 360 derece olduğunu hatırla. 360 dereceye 720 hayvan düşüyorsa 1 dereceye kaç hayvan düşer?',
      },
    ],
  },

  // 3. Matematik 1. Ünite: Çarpanlar ve Katlar Uzmanlık Denemesi
  {
    id: 'lgs-mat-unite-1',
    slug: 'lgs-mat-unite-1-carpanlar-katlar',
    title: 'LGS Matematik 1. Ünite: Çarpanlar ve Katlar Uzmanlık Denemesi',
    description: 'EBOB-EKOK problemleri, aralarında asal sayılar ve çarpan ağacı mantığını ölçen 5 soruluk yeni nesil ünite denemesi.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '1. ÜNİTE TESTİ',
    questions: [
      {
        id: 'mat-u1-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar',
        questionNumber: 1,
        questionText:
          '72 sayısının pozitif tam sayı çarpanlarından kaç tanesi tek sayıdır?',
        options: {
          A: '2',
          B: '3',
          C: '4',
          D: '6',
        },
        correctAnswer: 'B',
        explanation:
          '72\'nin asal çarpanlarına ayrılmış hali: 72 = 2³ × 3².\nTek çarpanlar sadece 3 tabanından gelir. 3²\'nin çarpanları: 3^0=1, 3^1=3, 3^2=9\'dur (Toplam 3 tane tek çarpan: 1, 3, 9).',
        hintForSocratic: '72\'nin çarpanlarını sırayla yazabilir veya 2 çarpanını hariç tutarak hesaplayabilirsin.',
      },
      {
        id: 'mat-u1-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (EBOB)',
        questionNumber: 2,
        questionText:
          'Boyutları 240 cm ve 300 cm olan bir odanın tabanı, hiç boşluk kalmayacak şekilde eş kare fayanslarla kaplanacaktır.\n\nKullanılacak fayansın bir kenar uzunluğu en fazla kaç cm olabilir?',
        options: {
          A: '30',
          B: '40',
          C: '50',
          D: '60',
        },
        correctAnswer: 'D',
        explanation:
          'Eş kare fayansın kenar uzunluğunun en fazla olması istendiğinden EBOB(240, 300) hesaplanır.\n240 = 60 × 4 ve 300 = 60 × 5 olduğundan EBOB(240, 300) = 60 cm\'dir.',
        hintForSocratic: 'En büyük parça uzunluğunu bulmak için EBOB kullanmalısın.',
      },
      {
        id: 'mat-u1-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (EKOK)',
        questionNumber: 3,
        questionText:
          'İki çalar saatten biri 36 dakikada bir, diğeri 45 dakikada bir çalmaktadır.\n\nSaatler ilk kez birlikte çaldıktan kaç saat sonra ikinci kez birlikte çalarlar?',
        options: {
          A: '2 saat',
          B: '3 saat',
          C: '4 saat',
          D: '5 saat',
        },
        correctAnswer: 'B',
        explanation:
          '1. Birlikte çalma periyodu EKOK(36, 45) ile bulunur.\n2. 36 = 2² × 3², 45 = 3² × 5 => EKOK = 2² × 3² × 5 = 4 × 9 × 5 = 180 dakika.\n3. 180 dakika = 180 / 60 = 3 saat bulunur.',
        hintForSocratic: '36 ve 45 sayılarının en küçük ortak katını bulup dakikayı saate çevir.',
      },
      {
        id: 'mat-u1-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Aralarında Asal Sayılar',
        questionNumber: 4,
        questionText:
          'Aşağıdaki sayı çiftlerinden hangisi aralarında asaldır?',
        options: {
          A: '15 ile 21',
          B: '26 ile 39',
          C: '14 ile 25',
          D: '27 ile 45',
        },
        correctAnswer: 'C',
        explanation:
          '14 = 2 × 7 ve 25 = 5² sayıları 1 dışında ortak hiçbir pozitif tam sayı bölene sahip değildir, bu nedenle aralarında asaldır. (A\'da 3, B\'de 13, D\'de 9 ortak bölendir).',
        hintForSocratic: 'Aralarında asal olmaları için ortak bölenlerinin sadece 1 olması gerekir.',
      },
      {
        id: 'mat-u1-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (Yeni Nesil Kurgu)',
        questionNumber: 5,
        questionText:
          'Bir maraton koşucusu antrenman pistinde 1. turu 15 dakikada, antrenörü ise bisikletle bir turu 6 dakikada tamamlamaktadır.\n\nAynı anda aynı noktadan aynı yöne başladıklarında, antrenör koşucuyu ilk kez kaç dakika sonra tam bir tur farkla geçer?',
        options: {
          A: '10',
          B: '15',
          C: '20',
          D: '30',
        },
        correctAnswer: 'A',
        explanation:
          '1. Antrenör dakikada 1/6 tur, koşucu dakikada 1/15 tur koşar.\n2. Fark hızı = 1/6 - 1/15 = (5 - 2) / 30 = 3/30 = 1/10 tur/dakika.\n3. 1 tam tur fark atması için geçen süre: 1 / (1/10) = 10 dakika sürer.',
        hintForSocratic: 'Her ikisinin 1 dakikada pistin kaçta kaçını tamamladığını karşılaştır.',
      },
    ],
  },

  // 4. Matematik 2. Ünite: Üslü İfadeler Beceri Temelli Deneme
  {
    id: 'lgs-mat-unite-2',
    slug: 'lgs-mat-unite-2-uslu-ifadeler',
    title: 'LGS Matematik 2. Ünite: Üslü İfadeler Beceri Temelli Deneme',
    description: 'Üslü sayılarda çarpma-bölme, çok büyük/küçük sayılar ve bilimsel gösterim odaklı 5 soruluk beceri temelli deneme.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '2. ÜNİTE TESTİ',
    questions: [
      {
        id: 'mat-u2-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler',
        questionNumber: 1,
        questionText:
          '(-2)⁴ - (-3)² + (-1)⁵ işleminin sonucu kaçtır?',
        options: {
          A: '6',
          B: '8',
          C: '24',
          D: '-6',
        },
        correctAnswer: 'A',
        explanation:
          '1. (-2)⁴ = 16 (Çift kuvvet pozitif yapar)\n2. (-3)² = 9\n3. (-1)⁵ = -1 (Tek kuvvet negatif kalır)\n4. İşlem: 16 - 9 + (-1) = 7 - 1 = 6 bulunur.',
        hintForSocratic: 'Negatif sayıların çift kuvvetlerinin pozitif, tek kuvvetlerinin negatif olduğunu hatırla.',
      },
      {
        id: 'mat-u2-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler (Bölme)',
        questionNumber: 2,
        questionText:
          '(16³ × 8⁴) / 4⁶ işleminin sonucu 2\'nin kaçıncı kuvvetine eşittir?',
        options: {
          A: '2¹²',
          B: '2¹⁶',
          C: '2²⁰',
          D: '2²⁴',
        },
        correctAnswer: 'A',
        explanation:
          'Tüm sayıları 2 tabanında yazalım:\n16³ = (2⁴)³ = 2¹²\n8⁴ = (2³)⁴ = 2¹²\nPay = 2¹² × 2¹² = 2²⁴\nPayda = 4⁶ = (2²)⁶ = 2¹²\nSonuç: 2²⁴ / 2¹² = 2^(24 - 12) = 2¹² olur.',
        hintForSocratic: '16, 8 ve 4 sayılarını 2 tabanında yazarak üssün üssü kuralını uygula.',
      },
      {
        id: 'mat-u2-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Bilimsel Gösterim',
        questionNumber: 3,
        questionText:
          'Işığın boşluktaki hızı saniyede yaklaşık 300.000.000 metredir.\n\nBuna göre ışığın 1 saatte aldığı yolun metre cinsinden bilimsel gösterimi aşağıdakilerden hangisidir?',
        options: {
          A: '1,08 × 10¹²',
          B: '1,08 × 10¹¹',
          C: '3 × 10¹²',
          D: '10,8 × 10¹¹',
        },
        correctAnswer: 'A',
        explanation:
          '1. 1 saat = 3600 saniyedir.\n2. Alınan Yol = 300.000.000 × 3600 = 3 × 10⁸ × 3,6 × 10³ = 10,8 × 10¹¹ metre.\n3. Bilimsel gösterimde katsayı 1 <= a < 10 olmalıdır: 1,08 × 10¹² metre olur.',
        hintForSocratic: '1 saatin 3600 saniye olduğunu kullan ve katsayının 1 ile 10 arasında olmasını sağla.',
      },
      {
        id: 'mat-u2-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler',
        questionNumber: 4,
        questionText:
          '4^(x+1) = 64 olduğuna göre, 3^(2x-1) ifadesinin değeri kaçtır?',
        options: {
          A: '3',
          B: '9',
          C: '27',
          D: '81',
        },
        correctAnswer: 'C',
        explanation:
          '1. 64 = 4³ olduğu için 4^(x+1) = 4³ => x + 1 = 3 => x = 2.\n2. İstenen ifade: 3^(2(2) - 1) = 3^(4 - 1) = 3³ = 27 bulunur.',
        hintForSocratic: '4\'ün kaçıncı kuvvetinin 64 olduğunu bularak x değerini hesapla.',
      },
      {
        id: 'mat-u2-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler (Basamak Sayısı)',
        questionNumber: 5,
        questionText:
          '8⁴ × 25⁶ sayısı kaç basamaklı bir sayıdır?',
        options: {
          A: '12',
          B: '13',
          C: '14',
          D: '15',
        },
        correctAnswer: 'B',
        explanation:
          '1. 8⁴ = (2³)⁴ = 2¹²\n2. 25⁶ = (5²)⁶ = 5¹²\n3. 2¹² × 5¹² = (2 × 5)¹² = 10¹²\n4. 10¹² sayısı 1\'in yanına 12 tane sıfır konmasıyla oluşur, yani 1 + 12 = 13 basamaklıdır.',
        hintForSocratic: 'Basamak sayısı için 2 ve 5 çarpanlarını birleştirerek 10 tabanı oluştur.',
      },
    ],
  },

  // 5. Matematik 3. Ünite: Kareköklü İfadeler Yeni Nesil Deneme
  {
    id: 'lgs-mat-unite-3',
    slug: 'lgs-mat-unite-3-karekoklu-ifadeler',
    title: 'LGS Matematik 3. Ünite: Kareköklü İfadeler Yeni Nesil Deneme',
    description: 'Kök içine alma/çıkarma, kareköklü sayılarda 4 işlem ve gerçek sayı sınıfları üzerine 5 soruluk ustalık denemesi.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '3. ÜNİTE TESTİ',
    questions: [
      {
        id: 'mat-u3-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 1,
        questionText:
          '√0,81 + √0,49 - √0,04 işleminin sonucu kaçtır?',
        options: {
          A: '1,2',
          B: '1,4',
          C: '1,6',
          D: '1,8',
        },
        correctAnswer: 'B',
        explanation:
          '1. √0,81 = 0,9\n2. √0,49 = 0,7\n3. √0,04 = 0,2\n4. İşlem: 0,9 + 0,7 - 0,2 = 1,6 - 0,2 = 1,4 bulunur.',
        hintForSocratic: 'Ondalık kesirleri rasyonel sayıya çevirerek kök dışına çıkar: 81/100 -> 9/10 = 0,9.',
      },
      {
        id: 'mat-u3-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler (Çarpma-Bölme)',
        questionNumber: 2,
        questionText:
          '(√32 × √18) / √24 işleminin en sade hali aşağıdakilerden hangisidir?',
        options: {
          A: '2√3',
          B: '4√6',
          C: '4√3',
          D: '2√6',
        },
        correctAnswer: 'D',
        explanation:
          '1. Pay: √32 × √18 = √(32 × 18) = √576 = 24.\n2. Payda: √24.\n3. Sonuç: 24 / √24 = √24 = √(4 × 6) = 2√6 bulunur.',
        hintForSocratic: 'Kök içlerini çarparak tek kök içine alabilirsin: √(32 × 18 / 24) = √(576 / 24) = √24 = 2√6.',
      },
      {
        id: 'mat-u3-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 3,
        questionText:
          'Bir kenar uzunluğu 4√5 cm olan karenin alanı ile kısa kenarı 2√5 cm olan bir dikdörtgenin alanı eşittir.\n\nBuna göre bu dikdörtgenin çevresi kaç cm\'dir?',
        options: {
          A: '16√5',
          B: '18√5',
          C: '20√5',
          D: '24√5',
        },
        correctAnswer: 'C',
        explanation:
          '1. Karenin alanı = (4√5)² = 16 × 5 = 80 cm².\n2. Dikdörtgenin alanı = Kısa kenar × Uzun kenar => 80 = 2√5 × b => b = 80 / 2√5 = 40 / √5 = 8√5 cm.\n3. Dikdörtgenin çevresi = 2 × (2√5 + 8√5) = 2 × 10√5 = 20√5 cm bulunur.',
        hintForSocratic: 'Karenin alanını bulup dikdörtgenin alanına eşitleyerek uzun kenarı hesapla.',
      },
      {
        id: 'mat-u3-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'İrrasyonel Sayılar',
        questionNumber: 4,
        questionText:
          'Aşağıdaki sayılardan hangisi bir İRRASYONEL sayıdır?',
        options: {
          A: '√144',
          B: '3,14',
          C: '√80',
          D: '2,333... (Devirli ondalık)',
        },
        correctAnswer: 'C',
        explanation:
          '√144 = 12 (rasyonel), 3,14 = 314/100 (rasyonel), devirli sayılar a/b şeklinde yazılabilir (rasyonel). Ancak √80 = 4√5 kök dışına tam çıkamadığı için virgülden sonrası düzensiz sonsuza gider ve irrasyoneldir.',
        hintForSocratic: 'Kök dışına tam çıkamayan köklü sayıların irrasyonel olduğunu hatırla.',
      },
      {
        id: 'mat-u3-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler (Sıralama)',
        questionNumber: 5,
        questionText:
          'a = 3√5, b = 4√3 ve c = 5√2 sayılarının küçükten büyüğe doğru sıralanışı hangisidir?',
        options: {
          A: 'a < b < c',
          B: 'a < c < b',
          C: 'b < a < c',
          D: 'c < b < a',
        },
        correctAnswer: 'A',
        explanation:
          'Katsayıları kök içine alalım:\na = 3√5 = √(3² × 5) = √45\nb = 4√3 = √(4² × 3) = √48\nc = 5√2 = √(5² × 2) = √50\n45 < 48 < 50 olduğundan a < b < c sıralaması doğrudur.',
        hintForSocratic: 'Katsayıların karesini alarak kök içine sok ve kök içindeki sayıları karşılaştır.',
      },
    ],
  },

  // 6. Matematik: Olasılık Denemesi
  {
    id: 'lgs-mat-unite-4',
    slug: 'lgs-mat-unite-4-olasilik',
    title: 'LGS Matematik: Basit Olayların Olma Olasılığı Denemesi',
    description: 'Örnek uzay, kesin/imkânsız olaylar ve yeni nesil olasılık kurgularını içeren 5 soruluk deneme.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'OLASILIK TESTİ',
    questions: [
      {
        id: 'mat-u4-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Basit Olayların Olma Olasılığı',
        questionNumber: 1,
        questionText:
          'Rakamlar kümesinden (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) rastgele seçilen bir sayının asal sayı olma olasılığı kaçtır?',
        options: {
          A: '1/5',
          B: '3/10',
          C: '2/5',
          D: '1/2',
        },
        correctAnswer: 'C',
        explanation:
          '1. Toplam rakam sayısı = 10 (Örnek uzay eleman sayısı).\n2. Asal rakamlar: {2, 3, 5, 7} -> 4 tanedir.\n3. Olasılık = 4 / 10 = 2/5 bulunur.',
        hintForSocratic: '0 ve 1\'in asal olmadığını hatırla. Kaç tane asal rakam var?',
      },
      {
        id: 'mat-u4-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Basit Olayların Olma Olasılığı',
        questionNumber: 2,
        questionText:
          'Bir sınıfta 12 kız ve 18 erkek öğrenci vardır. Sınıftan rastgele seçilen bir başkanın kız öğrenci olma olasılığı kaçtır?',
        options: {
          A: '2/5',
          B: '3/5',
          C: '1/3',
          D: '2/3',
        },
        correctAnswer: 'A',
        explanation:
          '1. Toplam öğrenci sayısı: 12 + 18 = 30.\n2. Kız öğrenci sayısı: 12.\n3. Olasılık: 12 / 30 = 2/5\'tir.',
        hintForSocratic: 'İstenen durum (kız öğrenci) / Toplam durum (tüm sınıf).',
      },
      {
        id: 'mat-u4-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Olasılık İlkeleri',
        questionNumber: 3,
        questionText:
          'Bir olayın olma olasılığı P(A) ise, aşağıdakilerden hangisi P(A) değeri OLAMAZ?',
        options: {
          A: '0',
          B: '3/4',
          C: '1',
          D: '5/4',
        },
        correctAnswer: 'D',
        explanation:
          'Herhangi bir olayın gerçekleşme olasılığı daima 0 ile 1 arasındadır: 0 <= P(A) <= 1. 5/4 = 1,25 birden büyük olduğu için hiçbir olayın olasılığı olamaz.',
        hintForSocratic: 'Olasılık değerinin 0 ile 1 aralığında olması gerektiğini hatırla.',
      },
      {
        id: 'mat-u4-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Olasılık (Torba Problemi)',
        questionNumber: 4,
        questionText:
          'Bir torbada özdeş 6 sarı, 8 mavi ve x adet kırmızı top vardır. Torbadan rastgele çekilen bir topun sarı olma olasılığı 1/4 olduğuna göre x kaçtır?',
        options: {
          A: '8',
          B: '10',
          C: '12',
          D: '14',
        },
        correctAnswer: 'B',
        explanation:
          '1. Sarı top sayısı = 6.\n2. Toplam top sayısı = 6 + 8 + x = 14 + x.\n3. Olasılık: 6 / (14 + x) = 1/4 => 14 + x = 24 => x = 10 bulunur.',
        hintForSocratic: '6 / (Toplam Top) = 1/4 denklemini çöz.',
      },
      {
        id: 'mat-u4-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Olasılık (Kart Problemi)',
        questionNumber: 5,
        questionText:
          '1\'den 20\'ye kadar (20 dahil) numaralandırılmış kartlar bir kutuya atılıyor. Çekilen kartın 3\'ün katı olma olasılığı kaçtır?',
        options: {
          A: '3/10',
          B: '1/4',
          C: '7/20',
          D: '2/5',
        },
        correctAnswer: 'A',
        explanation:
          '1. 1\'den 20\'ye kadar 3\'ün katları: 3, 6, 9, 12, 15, 18 (toplam 6 adet).\n2. Toplam kart: 20.\n3. Olasılık: 6 / 20 = 3/10 bulunur.',
        hintForSocratic: '20\'ye kadar olan 3\'ün katlarını say ve 20\'ye böl.',
      },
    ],
  },

  // 7. Matematik: Cebirsel İfadeler ve Özdeşlikler Denemesi
  {
    id: 'lgs-mat-unite-5',
    slug: 'lgs-mat-unite-5-cebirsel-ifadeler',
    title: 'LGS Matematik: Cebirsel İfadeler ve Özdeşlikler Güçlendirme Denemesi',
    description: 'İki kare farkı, tam kare açılımları ve ortak çarpan parantezine alma odaklı 5 soruluk güçlendirme denemesi.',
    type: 'branch',
    courseKey: 'matematik',
    courseName: 'Matematik',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'CEBİR TESTİ',
    questions: [
      {
        id: 'mat-u5-q1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'İki Kare Farkı Özdeşliği',
        questionNumber: 1,
        questionText:
          '105² - 95² işleminin sonucu kaçtır?',
        options: {
          A: '1000',
          B: '2000',
          C: '2500',
          D: '4000',
        },
        correctAnswer: 'B',
        explanation:
          'İki kare farkı: a² - b² = (a - b)(a + b).\n105² - 95² = (105 - 95) × (105 + 95) = 10 × 200 = 2000 bulunur.',
        hintForSocratic: 'Karelerini almak yerine (a - b)(a + b) iki kare farkı kuralını uygula.',
      },
      {
        id: 'mat-u5-q2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlara Ayırma',
        questionNumber: 2,
        questionText:
          '3x² - 12 cebirsel ifadesinin çarpanlarına ayrılmış hali aşağıdakilerden hangisidir?',
        options: {
          A: '3(x - 2)(x + 2)',
          B: '(3x - 6)(x + 2)',
          C: '3(x - 4)²',
          D: '(x - 2)(3x + 6)',
        },
        correctAnswer: 'A',
        explanation:
          '1. Önce 3 ortak parantezine alalım: 3(x² - 4).\n2. x² - 4 iki kare farkıdır: (x - 2)(x + 2).\n3. Tam çarpanlarına ayrılmış hali: 3(x - 2)(x + 2) olur.',
        hintForSocratic: 'Önce ortak çarpan olan 3 parantezine al, ardından iki kare farkını aç.',
      },
      {
        id: 'mat-u5-q3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Tam Kare Özdeşlikler',
        questionNumber: 3,
        questionText:
          'x + y = 10 ve x × y = 21 olduğuna göre, x² + y² ifadesinin değeri kaçtır?',
        options: {
          A: '42',
          B: '58',
          C: '64',
          D: '79',
        },
        correctAnswer: 'B',
        explanation:
          '1. (x + y)² = x² + 2xy + y².\n2. 10² = (x² + y²) + 2(21).\n3. 100 = (x² + y²) + 42 => x² + y² = 100 - 42 = 58 bulunur.',
        hintForSocratic: '(x + y) ifadesinin karesini alarak açılımı yap.',
      },
      {
        id: 'mat-u5-q4',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Cebirsel İfadelerin Modellenmesi',
        questionNumber: 4,
        questionText:
          'Bir kenarı x cm olan kare şeklindeki bir kartonun dört köşesinden bir kenarı 2 cm olan kare parçalar kesilip atılıyor.\n\nKalan kartonun alanını veren cebirsel ifade hangisidir?',
        options: {
          A: 'x² - 4',
          B: 'x² - 8',
          C: 'x² - 16',
          D: '(x - 4)²',
        },
        correctAnswer: 'C',
        explanation:
          '1. Büyük karenin alanı = x².\n2. Kesilen 4 küçük karenin her birinin alanı = 2² = 4 cm².\n3. Dört tanesinin toplam alanı = 4 × 4 = 16 cm².\n4. Kalan alan = x² - 16 cm² (veya (x-4)(x+4)) olur.',
        hintForSocratic: 'Dört köşeden kesilen karelerin alanlarını toplayıp büyük karenin alanından çıkar.',
      },
      {
        id: 'mat-u5-q5',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Cebirsel İfadelerde Katsayılar',
        questionNumber: 5,
        questionText:
          '4x² - 7x + 5 cebirsel ifadesinin katsayılar toplamı ile sabit teriminin çarpımı kaçtır?',
        options: {
          A: '10',
          B: '15',
          C: '20',
          D: '25',
        },
        correctAnswer: 'A',
        explanation:
          '1. Katsayılar: 4, -7, 5. Toplamı = 4 - 7 + 5 = 2.\n2. Sabit terim = 5.\n3. Çarpımları: 2 × 5 = 10 bulunur.',
        hintForSocratic: 'Değişken içermeyen terim sabit terimdir. x yerine 1 yazarak da katsayılar toplamını bulabilirsin.',
      },
    ],
  },
];
