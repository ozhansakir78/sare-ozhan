import type { OnlineExam } from '@/types/online-exam';

export const TURKISH_EXAMS: OnlineExam[] = [
  // 1. Türkçe Paragraf & Mantık Denemesi
  {
    id: 'exam-turkce-1',
    slug: 'lgs-2027-turkce-paragraf-denemesi',
    title: '2027 LGS Türkçe Anlam & Mantık Muhakeme Denemesi',
    description: 'Paragrafta ana fikir, çıkarım yapma, fiilimsiler ve sözel mantık sorularından oluşan 5 soruluk LGS Türkçe denemesi.',
    type: 'branch',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'Orta',
    isPro: false,
    badgeText: 'ÜCRETSİZ DENEME',
    questions: [
      {
        id: 'tur-q-1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Paragrafta Anlam (Ana Fikir - Yardımcı Fikir)',
        questionNumber: 1,
        questionText:
          '"Gerçek bir yazar, okurların beklentilerine göre rüzgâr gülü gibi dönen değil; kendi özgün patikasında yürürken arkasından iz bırakan kimsedir. Popüler akımlara kapılmak bir eseri geçici olarak parlatabilir ama zamanın paslandırıcı etkisinden sadece samimi ve özgün yapıtlar kurtulabilir."\n\nBu metnin ana düşüncesi aşağıdakilerden hangisidir?',
        options: {
          A: 'Popüler konuları işleyen yazarlar daha geniş kitlelere ulaşır.',
          B: 'Kalıcılığı yakalamak isteyen yazar, başkalarının beğenisine değil özgünlüğüne dayanmalıdır.',
          C: 'Zaman içinde her sanat eseri değerini kaybetmeye mahkûmdur.',
          D: 'Yazarlar toplumun beklentilerini göz ardı ederse yalnızlaşır.',
        },
        correctAnswer: 'B',
        explanation:
          'Yazar, popüler akımlara kapılmak yerine kendi özgün patikasında yürüyen ve samimi olan eserlerin zamanın etkisine direneceğini vurgulamaktadır. Dolayısıyla ana düşünce B seçeneğidir.',
        hintForSocratic: 'Yazarın metnin son cümlesinde "sadece samimi ve özgün yapıtlar kurtulabilir" ifadesiyle neyi kastettiğine odaklan.',
      },
      {
        id: 'tur-q-2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Fiilimsiler (Eylemsiler)',
        questionNumber: 2,
        questionText:
          '"Güneşin batışını izlerken derin düşüncelere dalan ihtiyar balıkçı, sahile yanaşan tekneden inen yolculara el salladı."\n\nBu cümlede altı çizili fiilimsilerin türce eşleştirmesi hangisinde sırasıyla doğru verilmiştir?\n(izlerken - dalan - yanaşan - inen)',
        options: {
          A: 'Zarf-fiil, Sıfat-fiil, Sıfat-fiil, Sıfat-fiil',
          B: 'Zarf-fiil, İsim-fiil, Sıfat-fiil, Zarf-fiil',
          C: 'İsim-fiil, Sıfat-fiil, Zarf-fiil, Sıfat-fiil',
          D: 'Zarf-fiil, Sıfat-fiil, İsim-fiil, Zarf-fiil',
        },
        correctAnswer: 'A',
        explanation:
          '1. "izler-ken" -> -ken zarf-fiil ekidir.\n2. "dal-an" -> -an sıfat-fiil ekidir (Anası mezar dikecekmiş).\n3. "yanaş-an" -> -an sıfat-fiil ekidir.\n4. "in-en" -> -en sıfat-fiil ekidir.\nDolayısıyla: Zarf-fiil, Sıfat-fiil, Sıfat-fiil, Sıfat-fiil (A seçeneği).',
        hintForSocratic: '-ken ekinin cümleye zaman anlamı katarak hangi fiilimsi türü olduğunu ve -an/-en ekinin ismin önüne gelerek ne görev üstlendiğini hatırla.',
      },
      {
        id: 'tur-q-3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Cümlenin Ögeleri',
        questionNumber: 3,
        questionText:
          '"Köyün yaşlı çınarı, asırlardır fırtınalara meydan okuyan gövdesiyle tüm köyü selamlıyordu."\n\nBu cümlenin ögelerinin doğru sıralanışı aşağıdakilerden hangisidir?',
        options: {
          A: 'Özne - Zarf Tamlayıcısı - Belirtili Nesne - Yüklem',
          B: 'Özne - Belirtili Nesne - Zarf Tamlayıcısı - Yüklem',
          C: 'Belirtili Nesne - Özne - Zarf Tamlayıcısı - Yüklem',
          D: 'Zarf Tamlayıcısı - Özne - Yüklem',
        },
        correctAnswer: 'A',
        explanation:
          '1. Yüklem: "selamlıyordu"\n2. Selamlayan kim/ne? -> "Köyün yaşlı çınarı" (Özne)\n3. Nasıl selamlıyordu? -> "asırlardır fırtınalara meydan okuyan gövdesiyle" (Zarf Tamlayıcısı)\n4. Neyi selamlıyordu? -> "tüm köyü" (Belirtili Nesne)\nSıralama: Özne - Zarf Tamlayıcısı - Belirtili Nesne - Yüklem.',
        hintForSocratic: 'Önce yüklemi bul, sonra "Kim/Ne selamlıyordu?" ve "Neyi selamlıyordu?" sorularını sırasıyla yönelt.',
      },
      {
        id: 'tur-q-4',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Metin Türleri ve Söz Sanatları',
        questionNumber: 4,
        questionText:
          '"Güneş, dağların arkasına saklanırken rüzgâr usulca fısıldadı yapraklara."\n\nBu cümlede kullanılan söz sanatı aşağıdakilerden hangisidir?',
        options: {
          A: 'Abartma (Mübalağa)',
          B: 'Kişileştirme (Teşhis)',
          C: 'Benzetme (Teşbih)',
          D: 'Karşıtlık (Tezat)',
        },
        correctAnswer: 'B',
        explanation:
          'Güneşin dağların arkasına saklanması ve rüzgârın yapraklara fısıldaması, insana ait özelliklerin doğadaki varlıklara aktarılmasıdır (Kişileştirme / Teşhis).',
        hintForSocratic: 'Konuşmak ve fısıldamak insanlara ait bir eylemken doğadaki bir güce verildiğinde hangi sanat ortaya çıkar?',
      },
      {
        id: 'tur-q-5',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Mantık Muhakeme (Sözel Mantık)',
        questionNumber: 5,
        questionText:
          'Ali, Burak, Ceren ve Derya bir kütüphaneden A, B, C, D kitaplarını ödünç almışlardır:\n• Herkes sadece bir kitap almıştır.\n• Ceren C kitabını almamıştır.\n• Ali A kitabını almıştır.\n• Derya B kitabını almıştır.\n\nBuna göre Ceren hangi kitabı almıştır?',
        options: {
          A: 'A kitabı',
          B: 'B kitabı',
          C: 'C kitabı',
          D: 'D kitabı',
        },
        correctAnswer: 'D',
        explanation:
          '1. Ali A kitabını aldı.\n2. Derya B kitabını aldı.\n3. Geriye C ve D kitapları ile Burak ve Ceren kaldı.\n4. Ceren C kitabını almadığına göre kesinlikle D kitabını almıştır. (Burak da C\'yi almıştır).',
        hintForSocratic: 'Önce kimin hangi kitabı aldığını yazıp eldeki seçenekleri eleyerek ilerle.',
      },
    ],
  },

  // 2. Türkçe 1. Ünite: Fiilimsiler (Eylemsiler) Tam İsabet Denemesi
  {
    id: 'lgs-turkce-unite-1',
    slug: 'lgs-turkce-unite-1-fiilimsiler',
    title: 'LGS Türkçe 1. Ünite: Fiilimsiler (Eylemsiler) Tam İsabet Denemesi',
    description: 'İsim-fiil, sıfat-fiil, zarf-fiil ve kalıplaşmış isim ayrımlarını içeren 5 soruluk tam isabet ünite testi.',
    type: 'branch',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '1. ÜNİTE TESTİ',
    questions: [
      {
        id: 'tur-u1-q1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Kalıplaşmış İsimler',
        questionNumber: 1,
        questionText:
          'Fiilimsi eki aldığı halde eylem anlamını tamamen yitirip kalıcı bir nesne veya kavrama isim olan sözcüklere kalıplaşmış isim denir.\n\nAşağıdaki altı çizili sözcüklerden hangisi bu açıklamaya örnek OLABİLİR?',
        options: {
          A: 'Bahçedeki kuru yaprakları yakmaya başladı.',
          B: 'Annem akşam yemeği için lezzetli bir sarma yaptı.',
          C: 'Güneşin doğuşunu izlemek için tepeye çıktık.',
          D: 'Ders çalışırken müzik dinlemeyi severim.',
        },
        correctAnswer: 'B',
        explanation:
          'B seçeneğindeki "sarma" sözcüğü fiilimsi özelliğini yitirmiş ve geleneksel bir yemeğin kalıcı adı olmuştur. Diğer şıklardaki "yakmaya", "doğuşunu", "dinlemeyi" eylem anlamını koruyan isim-fiillerdir.',
        hintForSocratic: 'Bir yemek, araç veya nesne adı haline gelmiş sözcüğü ara (örneğin dondurma, sarma, çakmak).',
      },
      {
        id: 'tur-u1-q2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Sıfat-Fiil (Adlaşmış Sıfat-Fiil)',
        questionNumber: 2,
        questionText:
          'Sıfat-fiiller niteledikleri isim düştüğünde onun yerine geçerek "adlaşmış sıfat-fiil" olurlar.\n\nAşağıdaki cümlelerin hangisinde adlaşmış sıfat-fiil kullanılmıştır?',
        options: {
          A: 'Gelen gideni aratır, derler.',
          B: 'Koşan çocuklar bahçede neşeyle oynuyordu.',
          C: 'Kırılan vazonun parçalarını dikkatle topladı.',
          D: 'Ağlayan bebek annesinin kucağında sakinleşti.',
        },
        correctAnswer: 'A',
        explanation:
          '"Gelen (insan) gideni (insanı) aratır" cümlesinde isimler (insan) düşmüş ve sıfat-fiiller (gelen, gideni) isim gibi kullanılarak adlaşmış sıfat-fiil olmuştur.',
        hintForSocratic: 'Önündeki isim düşmüş olan sıfat-fiili ara: Gelen insan -> Gelen.',
      },
      {
        id: 'tur-u1-q3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Zarf-Fiil (Durum ve Zaman Anlamı)',
        questionNumber: 3,
        questionText:
          'Aşağıdaki cümlelerin hangisinde zarf-fiil cümleye "durum" anlamı katmıştır?',
        options: {
          A: 'Hava kararınca herkes evine çekildi.',
          B: 'Soruları dikkatle okuyarak çözmelisin.',
          C: 'Zil çalar çalmaz sınıftan dışarı fırladılar.',
          D: 'Köye varalı henüz üç gün olmuştu.',
        },
        correctAnswer: 'B',
        explanation:
          'Yükleme "Nasıl?" sorusu sorulduğunda durum, "Ne zaman?" sorusu sorulduğunda zaman anlamı verir.\nB\'de "Nasıl çözmelisin?" -> "okuyarak" (-arak eki, durum anlamı).\nA, C ve D seçeneklerindeki zarf-fiiller ise "Ne zaman?" sorusuna yanıt verir (zaman anlamı).',
        hintForSocratic: 'Yükleme "Nasıl?" sorusunu sorarak durum anlamı katan zarf-fiili bul.',
      },
      {
        id: 'tur-u1-q4',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Fiilimsiler',
        questionNumber: 4,
        questionText:
          'Aşağıdaki cümlelerin hangisinde fiilimsi KULLANILMAMIŞTIR?',
        options: {
          A: 'Yarın sabah erken saatte yola çıkacağız.',
          B: 'Ders çalışan öğrenciler başarıya ulaşır.',
          C: 'Olayı duyunca hemen yanıma koştu.',
          D: 'Kitap okumak insanın ufkunu genişletir.',
        },
        correctAnswer: 'A',
        explanation:
          'A seçeneğinde sadece çekimli fiil ("çıkacağız" - gelecek zaman kipi) vardır, hiçbir fiilimsi eki bulunmamaktadır. B\'de "çalışan" (sıfat-fiil), C\'de "duyunca" (zarf-fiil), D\'de "okumak" (isim-fiil) vardır.',
        hintForSocratic: 'Çekimli fiil ile fiilimsiyi karıştırma. Kip ve kişi eki almış fiiller fiilimsi değildir.',
      },
      {
        id: 'tur-u1-q5',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Fiilimsiler (Cümle Bağlama)',
        questionNumber: 5,
        questionText:
          '"İşlerini bitirdi. Arkadaşlarıyla buluşmak üzere kafeye gitti."\n\nBu iki bağımsız cümle aşağıdaki zarf-fiil eklerinden hangisiyle tek bir cümle haline getirilebilir?',
        options: {
          A: '-ince',
          B: '-ip',
          C: '-ken',
          D: '-dıkça',
        },
        correctAnswer: 'B',
        explanation:
          '"İşlerini bitir-ip arkadaşlarıyla buluşmak üzere kafeye gitti." şeklinde -ip zarf-fiil eki ardışık gerçekleşen eylemleri birbirine mükemmel bir akıcılıkla bağlar.',
        hintForSocratic: 'Birbiri ardına yapılan işleri bağlayan en yaygın zarf-fiil ekini (-ip / -ıp) hatırla.',
      },
    ],
  },

  // 3. Türkçe: Yazım Kuralları ve Noktalama İşaretleri Denemesi
  {
    id: 'lgs-turkce-unite-4',
    slug: 'lgs-turkce-unite-4-yazim-ve-noktalama',
    title: 'LGS Türkçe: Yazım Kuralları ve Noktalama İşaretleri Denemesi',
    description: 'Büyük harflerin kullanımı, de/ki yazımı, kesme işareti ve iki nokta/noktalı virgül kullanımını ölçen 5 soruluk LGS denemesi.',
    type: 'branch',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'YAZIM & NOKTALAMA',
    questions: [
      {
        id: 'tur-u4-q1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Yazım Kuralları (Büyük Harfler)',
        questionNumber: 1,
        questionText:
          'Aşağıdaki cümlelerin hangisinde bir yazım yanlışı yapılmıştır?',
        options: {
          A: 'Bu yaz Van Gölü kıyısında kamp yapmayı planlıyoruz.',
          B: 'Dün akşam Ahmet Bey ve eşi bize ziyarete geldiler.',
          C: 'Türkiye\'nin güneyinde Akdeniz iklimi görülür.',
          D: 'Kurtuluş Savaşı dönemini anlatan bir Tarih kitabı okudum.',
        },
        correctAnswer: 'D',
        explanation:
          'D seçeneğinde "Tarih kitabı" derken tarih sözcüğü özel isim veya dersin resmi adı olarak kullanılmadığı için küçük harfle ("tarih kitabı") yazılmalıdır.',
        hintForSocratic: 'Tarih, coğrafya, fizik gibi sözcükler özel isim olmadığı durumlarda küçük harfle yazılır.',
      },
      {
        id: 'tur-u4-q2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Yazım Kuralları (de ve ki\'nin Yazımı)',
        questionNumber: 2,
        questionText:
          'Aşağıdaki cümlelerin hangisinde "ki"nin yazımı YANLIŞTIR?',
        options: {
          A: 'Evdeki hesap çarşıya uymadı.',
          B: 'Öyle yorgunum ki adım atacak halim yok.',
          C: 'Akşam ki maç nefesleri kesti.',
          D: 'Mademki gelmeyecektin, neden haber vermedin?',
        },
        correctAnswer: 'C',
        explanation:
          'C seçeneğinde sıfat yapan -ki kullanılmıştır: "Hangi maç? -> Akşamki maç". Sıfat yapan -ki her zaman bitişik yazılır ("Akşamki"). Ayrı yazılması yanlıştır.',
        hintForSocratic: 'Sıfat yapan -ki ve ilgi zamiri olan -ki bitişik; bağlaç olan ki ise ayrı yazılır.',
      },
      {
        id: 'tur-u4-q3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Noktalama İşaretleri (İki Nokta)',
        questionNumber: 3,
        questionText:
          'Aşağıdaki cümlelerin hangisinde iki nokta (:) doğru kullanılmıştır?',
        options: {
          A: 'En sevdiğim mevsimler şunlardır: ilkbahar ve sonbahar.',
          B: 'Ali: bugün okula gelmedi.',
          C: 'Yarın sabah erkenden: yola çıkacağız.',
          D: 'Kitabın kapağında: çok güzel bir resim vardı.',
        },
        correctAnswer: 'A',
        explanation:
          'Kendisiyle ilgili örnek verilecek veya açıklama yapılacak cümlenin sonuna iki nokta konur. A seçeneğinde en sevilen mevsimler açıklanmadan önce iki nokta tam kuralına uygun konmuştur.',
        hintForSocratic: 'Açıklama veya örnek sıralamadan önce iki nokta kullanılır.',
      },
      {
        id: 'tur-u4-q4',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Yazım Kuralları (Sayıların Yazımı)',
        questionNumber: 4,
        questionText:
          'Aşağıdaki cümlelerin hangisinde sayıların yazımı ile ilgili bir yanlışlık yapılmıştır?',
        options: {
          A: 'Yarışmada 2\'nci olduğunu duyunca çok sevindi.',
          B: 'Her öğrenciye 5\'er adet soru kitapçığı dağıtıldı.',
          C: 'Bu bina yirmi beş katlı dev bir gökdelendir.',
          D: 'Saat 14.30\'da toplantı salonunda buluşacağız.',
        },
        correctAnswer: 'B',
        explanation:
          'Üleştirme sayıları (paylaştırma) rakamla değil YALNIZCA YAZIYLA yazılır. "5\'er" yazımı yanlıştır, doğrusu "beşer" olmalıdır.',
        hintForSocratic: 'Üleştirme (paylaştırma) sayıları (ikişer, beşer) rakamla yazılabilir mi?',
      },
      {
        id: 'tur-u4-q5',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Noktalama İşaretleri (Kesme İşareti)',
        questionNumber: 5,
        questionText:
          'Özel isimlere getirilen yapım ekleri ve çokluk eki kesme işaretiyle ayrılmaz.\n\nBuna göre aşağıdaki kullanımlardan hangisi DOĞRUDUR?',
        options: {
          A: 'Türk\'ler asırlardır bu topraklarda yaşamaktadır.',
          B: 'İzmir\'li bir arkadaşımla karşılaştım.',
          C: 'Ahmetler bu akşam bize çaya gelecek.',
          D: 'Türkçe\'nin zenginliğini korumalıyız.',
        },
        correctAnswer: 'C',
        explanation:
          'Özel isimlere gelen "-ler/-lar" çokluk ve aile eki kesmeyle ayrılmaz: "Ahmetler" doğru kullanımdır. (A\'da "Türkler", B\'de "İzmirli", D\'de "Türkçenin" şeklinde kesmesiz yazılmalıydı).',
        hintForSocratic: 'Özel isme gelen yapım eki ve çokluk ekinin kesmeyle ayrılmayacağını hatırla.',
      },
    ],
  },

  // 4. Türkçe 2. Ünite: Cümlede Anlam Analiz Denemesi
  {
    id: 'lgs-turkce-unite-2',
    slug: 'lgs-turkce-unite-2-cumlede-anlam',
    title: 'LGS Türkçe: Cümlede Anlam ve İlişkiler Analiz Denemesi',
    description: 'Neden-sonuç, amaç-sonuç, koşul, öznel-nesnel ve örtülü anlam ilişkilerini ölçen 5 soruluk LGS Türkçe denemesi.',
    type: 'branch',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'CÜMLEDE ANLAM',
    questions: [
      {
        id: 'tur-u2-q1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Cümlede Anlam (Amaç-Sonuç)',
        questionNumber: 1,
        questionText:
          'Aşağıdaki cümlelerin hangisinde "amaç-sonuç" ilişkisi vardır?',
        options: {
          A: 'Kar yağdığı için köy yolları ulaşıma kapandı.',
          B: 'Sınavı kazanmak amacıyla gece gündüz çalışıyor.',
          C: 'Beni dinlersen bu konuda yanılmazsın.',
          D: 'Çok yorulduğundan erkenden uyuyakaldı.',
        },
        correctAnswer: 'B',
        explanation:
          'Amaç-sonuç cümlelerinde eylemin hangi hedef doğrultusunda yapıldığı belirtilir ("-mek amacıyla/için"). B seçeneğinde hedef "sınavı kazanmak"tır. (A ve D neden-sonuç, C ise koşul-sonuçtur).',
        hintForSocratic: 'Cümleye "...amacıyla" ifadesini koyduğunda anlamlı oluyorsa amaç-sonuçtur.',
      },
      {
        id: 'tur-u2-q2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Öznel ve Nesnel Anlatım',
        questionNumber: 2,
        questionText:
          'Aşağıdaki cümlelerden hangisi kanıtlanabilirlik açısından diğerlerinden FARKLI bir nitelik taşır?',
        options: {
          A: 'Türkiye\'nin başkenti Ankara\'dır.',
          B: 'Yazarın son romanı 350 sayfadan oluşmaktadır.',
          C: 'Filmdeki başrol oyuncusunun performansı tek kelimeyle büyüleyiciydi.',
          D: 'Su deniz seviyesinde 100 santigrat derecede kaynar.',
        },
        correctAnswer: 'C',
        explanation:
          'A, B ve D şıkları kişiden kişiye değişmeyen, bilimsel ve somut olarak kanıtlanabilen "nesnel" yargılardır. C şıkkı ise kişisel beğeni ve duygu içeren "öznel" bir yargıdır.',
        hintForSocratic: 'Kişisel duygu ve beğeni içeren cümleyi (öznel) tespit et.',
      },
      {
        id: 'tur-u2-q3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Örtülü Anlam',
        questionNumber: 3,
        questionText:
          '"Ahmet de bu yılki satranç turnuvasına katılacakmış."\n\nBu cümleden aşağıdaki yargılardan hangisi KESİN OLARAK çıkarılır?',
        options: {
          A: 'Ahmet geçen yıl turnuvada birinci olmuştur.',
          B: 'Turnuvaya Ahmet\'in dışında da katılan kişiler vardır.',
          C: 'Turnuvayı Ahmet organize etmektedir.',
          D: 'Ahmet turnuvaya katılmaktan son anda vazgeçmiştir.',
        },
        correctAnswer: 'B',
        explanation:
          '"Ahmet de..." ifadesindeki "-de" bağlacı örtülü anlam katar; Ahmet\'in yanı sıra başkalarının da turnuvaya katılacağını kesin olarak ifade eder.',
        hintForSocratic: '"-de" bağlacının cümleye kattığı "başkaları da var" anlamına dikkat et.',
      },
      {
        id: 'tur-u2-q4',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Cümle Oluşturma',
        questionNumber: 4,
        questionText:
          '1. başarıya ulaşmanın\n2. en güvenilir yolu\n3. pes etmeden\n4. denemeye devam etmektir\n\nYukarıdaki sözcük gruplarıyla kurallı ve anlamlı bir cümle oluşturulduğunda sıralama nasıl olur?',
        options: {
          A: '1 - 2 - 3 - 4',
          B: '3 - 1 - 2 - 4',
          C: '2 - 1 - 4 - 3',
          D: '1 - 3 - 2 - 4',
        },
        correctAnswer: 'A',
        explanation:
          '"Başarıya ulaşmanın en güvenilir yolu, pes etmeden denemeye devam etmektir." şeklindeki 1 - 2 - 3 - 4 dizilişi kusursuz ve anlamlı bir cümle meydana getirir.',
        hintForSocratic: 'Önce yüklemi ("devam etmektir") sona yerleştir, ardından özneyi başa al.',
      },
      {
        id: 'tur-u2-q5',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Doğrudan ve Dolaylı Anlatım',
        questionNumber: 5,
        questionText:
          'Aşağıdaki cümlelerin hangisinde "dolaylı anlatım" yapılmıştır?',
        options: {
          A: 'Öğretmenimiz: "Yarın sınav var." dedi.',
          B: 'Doktor, ilaçlarımı düzenli kullanmam gerektiğini söyledi.',
          C: 'Atatürk, "Ne mutlu Türküm diyene!" demiştir.',
          D: 'Annem, "Hemen eve gel!" diye seslendi.',
        },
        correctAnswer: 'B',
        explanation:
          'Başkasına ait bir sözün değiştirilmeden, tırnak içinde veya virgülle aynen aktarılmasına doğrudan anlatım (A, C, D); kişinin kendi ifadesine uyarlanarak aktarılmasına ise dolaylı anlatım (B seçeneği: "...gerektiğini söyledi") denir.',
        hintForSocratic: 'Tırnak içine alınmadan, cümlenin sahibinin ağzından aktarılmış olanı bul.',
      },
    ],
  },
];
