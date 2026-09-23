import type { OnlineExam } from '@/types/online-exam';

export const FULL_LGS_EXAMS: OnlineExam[] = [
  {
    id: 'lgs-full-tg-1',
    slug: 'lgs-2027-turkiye-geneli-1-deneme',
    title: '2027 LGS Türkiye Geneli 1. Büyük Deneme Sınavı',
    description: 'Tüm dersleri kapsayan (Türkçe, Matematik, Fen, İnkılap, Din, İngilizce) 18 soruluk Türkiye geneli derece hedefli mega prova sınavı.',
    type: 'full',
    courseName: 'Tüm Dersler (Genel LGS)',
    questionCount: 18,
    durationMinutes: 35,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '🏆 TÜRKİYE GENELİ',
    questions: [
      // 1. Türkçe - Paragraf Ana Düşünce
      {
        id: 'full-tg1-tr-1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Paragrafta Anlam',
        questionNumber: 1,
        questionText:
          'Başarılı yazarların ortak bir özelliği vardır: Onlar kelimeleri sadece yan yana dizmezler, her kelimenin taşıdığı duygu yükünü ve çağrışım gücünü bir mimar titizliğiyle tartar ve öyle yerleştirirler metne. Kelimelerin rastgele seçildiği bir anlatı, ne kadar parlak fikirler içerirse içersin, okurun zihninde derin bir yankı uyandıramaz.\n\nBu metnin ana düşüncesi aşağıdakilerden hangisidir?',
        options: {
          A: 'Büyük yazarlar çok okuyarak kelime dağarcıklarını sürekli zenginleştirirler.',
          B: 'Bir metnin etkileyici olması, düşüncelerin derinliğinden çok kelime seçimi ve kullanımındaki özene bağlıdır.',
          C: 'Okur ancak kendi hayatından izler bulduğu eserleri severek okur.',
          D: 'Yazarlık yeteneği doğuştan gelen ve sonradan kazanılamayan bir beceridir.',
        },
        correctAnswer: 'B',
        explanation:
          'Metinde yazar, kelimelerin rastgele seçilmesi durumunda parlak fikirlerin bile yankı uyandırmayacağını belirterek metnin asıl vurucu gücünün kelime seçimindeki titizlik ve özen olduğuna vurgu yapmıştır.',
        hintForSocratic: 'Metnin son cümlesindeki "Kelimelerin rastgele seçildiği bir anlatı... derin bir yankı uyandıramaz" vurgusuna odaklan.',
      },
      // 2. Türkçe - Fiilimsiler
      {
        id: 'full-tg1-tr-2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Fiilimsiler (Eylemsiler)',
        questionNumber: 2,
        questionText:
          'Aşağıdaki cümlelerin hangisinde hem isim-fiil, hem sıfat-fiil, hem de zarf-fiil bir arada kullanılmıştır?',
        options: {
          A: 'Sabah erkenden yola çıkan kafile, köye vardığında dinlenmek istedi.',
          B: 'Kitap okumayı seven insanlar, boş zamanlarını en verimli şekilde değerlendirirler.',
          C: 'Koşar adımlarla eve doğru giderken arkasına dönüp baktı.',
          D: 'Güneş batarken kızıla boyanan gökyüzü insana huzur veriyordu.',
        },
        correctAnswer: 'A',
        explanation:
          'A seçeneğinde:\n- "çıkan" -> Sıfat-fiil (-an)\n- "vardığında" -> Zarf-fiil (-dığında)\n- "dinlenmek" -> İsim-fiil (-mek)\nÜç fiilimsi türü de bir arada yer almaktadır.',
        hintForSocratic: 'Seçeneklerdeki fiil köklerine gelen ekleri tek tek incele: -mek/-ma (isim-fiil), -an/-ası/-mez (sıfat-fiil), -ken/-dığında (zarf-fiil).',
      },
      // 3. Türkçe - Deyimler ve Sözcükte Anlam
      {
        id: 'full-tg1-tr-3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Sözcükte Anlam ve Deyimler',
        questionNumber: 3,
        questionText:
          'Bir işi yaparken çok büyük fedakarlıklara katlanmak, elindeki bütün imkanları sonuna kadar zorlamak anlamında kullanılan deyim aşağıdakilerden hangisidir?',
        options: {
          A: 'Göz boyamak',
          B: 'Saçını süpürge etmek',
          C: 'Burnundan kıl aldırmamak',
          D: 'İpe un sermek',
        },
        correctAnswer: 'B',
        explanation:
          '"Saçını süpürge etmek" deyimi, bir kimse veya bir iş uğruna çok büyük fedakarlıklara katlanmak ve gece gündüz özveriyle çalışmak anlamına gelir.',
        hintForSocratic: 'Çok büyük özveri ve fedakarlık anlamı içeren seçeneği değerlendir.',
      },

      // 4. Matematik - Çarpanlar ve Katlar
      {
        id: 'full-tg1-mat-1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar (EBOB-EKOK)',
        questionNumber: 4,
        questionText:
          'Aralarında asal iki sayının EKOK\'u 156\'dır.\n\nBu sayılardan biri 12 olduğuna göre, bu iki sayının toplamı kaçtır?',
        options: {
          A: '25',
          B: '27',
          C: '29',
          D: '31',
        },
        correctAnswer: 'A',
        explanation:
          '1. Aralarında asal iki sayının EKOK\'u, bu iki sayının çarpımına eşittir: a × b = EKOK(a, b) = 156.\n2. Sayılardan biri 12 olduğuna göre diğer sayı b = 156 / 12 = 13 olur.\n3. 12 ile 13 aralarında asaldır. Toplamları: 12 + 13 = 25 bulunur.',
        hintForSocratic: 'Aralarında asal sayıların EKOK kuralını hatırla: a ve b aralarında asal ise EKOK(a,b) = a × b\'dir.',
      },
      // 5. Matematik - Üslü İfadeler
      {
        id: 'full-tg1-mat-2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Üslü İfadeler',
        questionNumber: 5,
        questionText:
          '2^x = a ve 3^x = b olduğuna göre, 72^x ifadesinin a ve b cinsinden eşiti aşağıdakilerden hangisidir?',
        options: {
          A: 'a² × b³',
          B: 'a³ × b²',
          C: 'a³ × b³',
          D: 'a² × b²',
        },
        correctAnswer: 'B',
        explanation:
          '1. 72 sayısını asal çarpanlarına ayıralım: 72 = 8 × 9 = 2³ × 3².\n2. 72^x = (2³ × 3²)^x = (2³)^x × (3²)^x = (2^x)³ × (3^x)².\n3. 2^x = a ve 3^x = b değerleri yerine yazıldığında sonuç: a³ × b² olur.',
        hintForSocratic: '72 sayısını 2 ve 3 tabanında asal çarpanlarına ayır ve üssün üssü kuralını uygula.',
      },
      // 6. Matematik - Kareköklü İfadeler
      {
        id: 'full-tg1-mat-3',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 6,
        questionText:
          '√48 + √75 - √12 işleminin sonucu aşağıdakilerden hangisidir?',
        options: {
          A: '5√3',
          B: '6√3',
          C: '7√3',
          D: '8√3',
        },
        correctAnswer: 'C',
        explanation:
          '1. Kök dışına çıkarma: √48 = √(16×3) = 4√3\n2. √75 = √(25×3) = 5√3\n3. √12 = √(4×3) = 2√3\n4. İşlem: 4√3 + 5√3 - 2√3 = (4 + 5 - 2)√3 = 7√3 bulunur.',
        hintForSocratic: 'Tüm sayıları a√3 formatına dönüştür ve katsayıları toplayıp çıkar.',
      },

      // 7. Fen Bilimleri - Mevsimler ve İklim
      {
        id: 'full-tg1-fen-1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Mevsimlerin Oluşumu',
        questionNumber: 7,
        questionText:
          '21 Haziran tarihinde Dünya\'nın Güneş karşısındaki konumu ile ilgili aşağıdaki ifadelerden hangisi DOĞRUDUR?',
        options: {
          A: 'Güneş ışınları Oğlak Dönencesi\'ne öğle vakti dik açıyla düşer.',
          B: 'Kuzey Yarım Küre\'de en uzun gece, en kısa gündüz yaşanır.',
          C: 'Güneş ışınları Yengeç Dönencesi\'ne dik açıyla düşer ve Kuzey Yarım Küre\'de yaz başlangıcıdır.',
          D: 'Dünya\'nın her yerinde gece ve gündüz süreleri eşit (ekinoks) olur.',
        },
        correctAnswer: 'C',
        explanation:
          '21 Haziran tarihinde Güneş ışınları Kuzey Yarım Küre\'de bulunan Yengeç Dönencesi\'ne 90 derecelik dik açıyla düşer. Bu tarih Kuzey Yarım Küre için yaz gündönümü (en uzun gündüz), Güney Yarım Küre için ise kış başlangıcıdır.',
        hintForSocratic: '21 Haziran\'da Kuzey Yarım Küre\'de yazın başladığını ve dik ışın alan dönenceyi hatırla.',
      },
      // 8. Fen Bilimleri - DNA ve Genetik Kod
      {
        id: 'full-tg1-fen-2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod',
        questionNumber: 8,
        questionText:
          'Bir DNA molekülünde toplam 1200 nükleotid bulunmaktadır. Bu DNA molekülündeki Adenin nükleotidi sayısı 200 olduğuna göre, Guanin nükleotidi sayısı kaçtır?',
        options: {
          A: '200',
          B: '400',
          C: '600',
          D: '800',
        },
        correctAnswer: 'B',
        explanation:
          '1. DNA çift zincirli olduğu için Adenin sayısı Timin sayısına eşittir: A = T = 200.\n2. A + T = 200 + 200 = 400 nükleotid.\n3. Geriye kalan Guanin ve Sitozin toplamı: 1200 - 400 = 800 nükleotid.\n4. Guanin sayısı Sitozin sayısına eşit olduğundan (G = S): G = 800 / 2 = 400 bulunur.',
        hintForSocratic: 'Adenin = Timin ve Guanin = Sitozin kuralını kullan.',
      },
      // 9. Fen Bilimleri - Katı Basıncı
      {
        id: 'full-tg1-fen-3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Basınç',
        questionNumber: 9,
        questionText:
          'Ağırlıkları eşit olan K, L ve M katı cisimlerinin zemine temas eden taban alanları sırasıyla S, 2S ve 3S\'tir.\n\nBuna göre, cisimlerin zemine uyguladıkları basınçlar (P_K, P_L, P_M) arasındaki doğru ilişki hangisidir?',
        options: {
          A: 'P_K > P_L > P_M',
          B: 'P_M > P_L > P_K',
          C: 'P_K = P_L = P_M',
          D: 'P_L > P_K > P_M',
        },
        correctAnswer: 'A',
        explanation:
          'Katı basıncı formülü: P = G / S (Ağırlık / Taban Alanı). Ağırlıklar eşitken taban alanı ile basınç ters orantılıdır. En küçük taban alanına sahip K cismi en büyük basıncı üretir: P_K > P_L > P_M.',
        hintForSocratic: 'Katı basıncının taban alanı ile ters orantılı olduğunu hatırla: Yüzey küçüldükçe basınç artar.',
      },

      // 10. İnkılap Tarihi - Bir Kahraman Doğuyor
      {
        id: 'full-tg1-ink-1',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        topicName: 'Bir Kahraman Doğuyor',
        questionNumber: 10,
        questionText:
          'Mustafa Kemal\'in çocukluk ve gençlik yıllarını geçirdiği Selanik şehri; farklı din ve milletten insanların bir arada yaşadığı, canlı bir ticaret limanına ve Avrupa ile demir yolu bağlantısına sahip kozmopolit bir kentti.\n\nSelanik\'in bu yapısı Mustafa Kemal\'e en çok hangi alanda katkı sağlamıştır?',
        options: {
          A: 'Askeri taktikleri ezberlemesine',
          B: 'Farklı kültürleri tanımasına ve hoşgörülü, yenilikçi bir dünya görüşü kazanmasına',
          C: 'Sadece geleneksel dini ilimlerde uzmanlaşmasına',
          D: 'Ticaret yaparak zengin bir iş adamı olmasına',
        },
        correctAnswer: 'B',
        explanation:
          'Farklı milletlerin, inançların bir arada yaşadığı ve Batı\'daki fikir akımlarının gazetelerle anında ulaştığı Selanik şehri; Mustafa Kemal\'in çok kültürlü, yeniliklere açık ve hoşgörülü bir lider vizyonu geliştirmesinde birincil etken olmuştur.',
        hintForSocratic: 'Kozmopolit ve çok kültürlü ortamların bir insanın düşünce dünyasına nasıl etki edeceğini düşün.',
      },
      // 11. İnkılap Tarihi - Amasya Genelgesi
      {
        id: 'full-tg1-ink-2',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        topicName: 'Millî Uyanış',
        questionNumber: 11,
        questionText:
          'Amasya Genelgesi\'nde yer alan "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." maddesi, Kurtuluş Savaşı\'nın hangi yönünü ortaya koymuştur?',
        options: {
          A: 'Savaşın gerekçesi ve süresini',
          B: 'Savaşın amacı ve yöntemi ile ileride milli egemenliğe geçileceğinin işaretini',
          C: 'Osmanlı hükümetine koşulsuz bağlı kalınacağını',
          D: 'Yabancı devletlerden mandater himaye isteneceğini',
        },
        correctAnswer: 'B',
        explanation:
          'Bu madde Kurtuluş Savaşı\'nın amacını ("Milletin bağımsızlığını kurtarmak") ve yöntemini ("Milletin azim ve kararı") belirtir. Ayrıca "milletin kararı" ifadesi ileride cumhuriyet yönetimine ve milli egemenliğe geçileceğinin ilk açık müjdesidir.',
        hintForSocratic: '"Milletin kararı" ifadesi yönetimin kimin elinde olacağını gösterir.',
      },
      // 12. İnkılap Tarihi - Sevr Antlaşması
      {
        id: 'full-tg1-ink-3',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        topicName: 'Millî Bir Destan: Ya İstiklal Ya Ölüm',
        questionNumber: 12,
        questionText:
          'Osmanlı Mebusan Meclisi dağıtıldığı için onayından geçmeyen ve Türk milleti tarafından hiçbir zaman tanınmayıp hukuken "ölü doğmuş bir antlaşma" sayılan belge hangisidir?',
        options: {
          A: 'Mondros Ateşkes Antlaşması',
          B: 'Sevr Antlaşması',
          C: 'Lozan Barış Antlaşması',
          D: 'Gümrü Antlaşması',
        },
        correctAnswer: 'B',
        explanation:
          'Sevr Antlaşması (10 Ağustos 1920), Osmanlı Anayasası\'na (Kanun-i Esasi) göre meclis onayı gerektirdiği halde Mebusan Meclisi kapalı olduğu için onaylanamamış ve hukuken geçersiz (ölü doğmuş) bir paçavra olarak kalmıştır.',
        hintForSocratic: 'Türk milletinin asla kabul etmediği ve Kurtuluş Savaşı ile yırtıp attığı teslimiyet antlaşmasını hatırla.',
      },

      // 13. Din Kültürü - Kader ve Kaza
      {
        id: 'full-tg1-din-1',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Kader İnancı',
        questionNumber: 13,
        questionText:
          '"Güneş ve Ay bir hesaba göre hareket eder. Göğü O yükseltti ve ölçüyü O koydu." (Rahman Suresi 5-7)\n\nBu ayetler evrendeki hangi yasa türü ile doğrudan ilişkilidir?',
        options: {
          A: 'Fiziksel Yasalar',
          B: 'Biyolojik Yasalar',
          C: 'Toplumsal Yasalar',
          D: 'Ahlaki Yasalar',
        },
        correctAnswer: 'A',
        explanation:
          'Maddenin yapısı, hareketleri, yer çekimi ve gök cisimlerinin yörüngeleri fiziksel yasalar kapsamındadır. Güneş ve Ay\'ın matematiksel bir düzenle hareket etmesi doğrudan fiziksel yasalara örnektir.',
        hintForSocratic: 'Gök cisimlerinin hareketi ve evrenin mekanik dengesi hangi fen/doğa yasasına girer?',
      },
      // 14. Din Kültürü - Tevekkül
      {
        id: 'full-tg1-din-2',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Kader İnancı (Tevekkül)',
        questionNumber: 14,
        questionText:
          'İslamiyet\'te bir hedefe ulaşmak için gerekli tüm maddi ve manevi sebepleri yerine getirip, elden gelen gayreti gösterdikten sonra sonucu Allah\'a bırakıp O\'na güvenmeye ne ad verilir?',
        options: {
          A: 'Tevekkül',
          B: 'Rızık',
          C: 'Ecel',
          D: 'Ömür',
        },
        correctAnswer: 'A',
        explanation:
          'Tevekkül, insanın üzerine düşen tedbirleri eksiksiz alması, tarlasını ekip sulaması veya sınavına tam çalışması, ardından sonucun hayırlı olması için Allah\'a güvenip teslim olmasıdır.',
        hintForSocratic: 'Önce deveyi bağlayıp sonra Allah\'a emanet etmek sözünün temsil ettiği kavramı hatırla.',
      },
      // 15. Din Kültürü - Sadaka-i Cariye
      {
        id: 'full-tg1-din-3',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Zekât ve Sadaka',
        questionNumber: 15,
        questionText:
          'Aşağıdakilerden hangisi bir "Sadaka-i Cariye" (kesintisiz devam eden sadaka) örneği DEĞİLDİR?',
        options: {
          A: 'İnsanların faydalanacağı bir okul veya hastane yaptırmak',
          B: 'Yol kenarına yolcuların su içeceği bir hayrat çeşmesi inşa etmek',
          C: 'Ramazan ayında bir fakire bir akşamlık iftar yemeği ikram etmek',
          D: 'İnsanlığa faydalı bir bilimsel eser ve hayırlı bir evlat yetiştirmek',
        },
        correctAnswer: 'C',
        explanation:
          'Sadaka-i cariye, kişi vefat ettikten sonra da insanlara fayda sağlamaya devam eden kalıcı eserlerdir (okul, çeşme, faydalı kitap). Bir akşamlık iftar yemeği ise çok sevaplı olmakla birlikte anlık bir sadakadır, kalıcı/kesintisiz (cariye) değildir.',
        hintForSocratic: 'Kalıcı ve nesiller boyu devam eden eserler ile tek seferlik ikramlar arasındaki farka dikkat et.',
      },

      // 16. İngilizce - Friendship
      {
        id: 'full-tg1-ing-1',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Friendship',
        questionNumber: 16,
        questionText:
          'Sally: "Are you doing anything on Saturday afternoon?"\nDavid: "No, not at all. Why?"\nSally: "We are going to a book fair. Would you like to come with us?"\nDavid: "--------. I love reading novels!"\n\nWhich phrase best completes the dialogue?',
        options: {
          A: 'I would love to, but I have to finish my project',
          B: 'Awesome, that sounds fantastic',
          C: 'I am sorry, I can\'t stand book fairs',
          D: 'Maybe another time, I feel too tired',
        },
        correctAnswer: 'B',
        explanation:
          'David "I love reading novels!" (Roman okumayı çok severim!) diyerek teklifi hevesle kabul ettiğini belirtmektedir. Bu sebeple olumlu kabul cümlesi olan "Awesome, that sounds fantastic" (Harika, kulağa muhteşem geliyor) gelmelidir.',
        hintForSocratic: 'David\'in son cümlesindeki "I love reading novels!" ifadesi teklifi kabul ettiğini mi yoksa reddettiğini mi gösterir?',
      },
      // 17. İngilizce - Teen Life
      {
        id: 'full-tg1-ing-2',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 2: Teen Life',
        questionNumber: 17,
        questionText:
          'Mark: "What kind of music do you prefer listening to?"\nKerem: "I prefer classical music to heavy metal because I think heavy metal is too loud and --------."\n\nWhich word best completes Kerem\'s explanation?',
        options: {
          A: 'unbearable',
          B: 'impressive',
          C: 'terrific',
          D: 'fascinating',
        },
        correctAnswer: 'A',
        explanation:
          'Kerem klasik müziği heavy metal müziğe tercih etmekte ve heavy metalin çok gürültülü ve "katlanılmaz/çekilmez (unbearable)" olduğunu söylemektedir. Diğer seçenekler (impressive: etkileyici, terrific: müthiş, fascinating: büyüleyici) olumlu anlam taşır.',
        hintForSocratic: 'Heavy metal hakkında olumsuz bir sıfat aramamız gerekiyor ("too loud and...").',
      },
      // 18. İngilizce - In the Kitchen
      {
        id: 'full-tg1-ing-3',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 3: In the Kitchen',
        questionNumber: 18,
        questionText:
          '"First, peel the potatoes. Second, chop them into small cubes. After that, heat some oil in a pan and fry them until golden brown. Finally, serve hot with some salt."\n\nWhat is the step immediately AFTER chopping the potatoes?',
        options: {
          A: 'Peeling the potatoes',
          B: 'Serving them hot with salt',
          C: 'Heating oil and frying them in a pan',
          D: 'Boiling them in hot water',
        },
        correctAnswer: 'C',
        explanation:
          'Metinde sırasıyla:\n1. Patatesleri soy (peel).\n2. Küp küp doğra (chop).\n3. Tavada yağ ısıt ve kızart (heat oil and fry).\n4. Servis et (serve).\nDoğrama adımından hemen sonra gelen adım tavada kızartmadır (heat oil and fry).',
        hintForSocratic: '"After that" (Ondan sonra) ifadesinden sonra gelen eyleme dikkat et.',
      },
    ],
  },
  {
    id: 'lgs-full-kamp-1',
    slug: 'lgs-2027-1-donem-altin-kamp-denemesi',
    title: '2027 LGS 1. Dönem Altın Kamp Denemesi',
    description: '1. Dönem müfredatını eksiksiz tarayan, tüm ana derslerden yeni nesil analitik sorular içeren altın kamp genel değerlendirme sınavı.',
    type: 'full',
    courseName: 'Tüm Dersler (Genel LGS)',
    questionCount: 12,
    durationMinutes: 25,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '🔥 1. DÖNEM KAMPI',
    questions: [
      {
        id: 'full-k1-tr-1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Cümlede Anlam',
        questionNumber: 1,
        questionText:
          '"Eleştirmen, bir eserin sadece kusurlarını teşhir eden bir dedektif değil; eserin gizli güzelliklerini gün yüzüne çıkaran bir kaşiftir."\n\nBu cümleden eleştirmenle ilgili çıkarılabilecek en kapsamlı yargı hangisidir?',
        options: {
          A: 'Eleştirmenler genellikle yazarlarla iyi anlaşamazlar.',
          B: 'Gerçek eleştiri sadece eksiklikleri bulmak değil, eserin değerini ve estetik yönlerini de ortaya koymaktır.',
          C: 'Eleştirmenlik mesleği günümüzde önemini yitirmiştir.',
          D: 'Yalnızca kusursuz eserler eleştirilmeyi hak eder.',
        },
        correctAnswer: 'B',
        explanation:
          'Cümle eleştirmenin görevinin yalnızca açık aramak (kusur teşhir etmek) olmadığını, aynı zamanda eserdeki sanatsal cevherleri (gizli güzellikleri) keşfedip okura göstermek olduğunu vurgulamaktadır.',
        hintForSocratic: '"Sadece kusurları teşhir eden değil... gizli güzellikleri çıkaran kaşif" benzetmesine odaklan.',
      },
      {
        id: 'full-k1-tr-2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Noktalama İşaretleri',
        questionNumber: 2,
        questionText:
          'Aşağıdaki cümlelerin hangisinde noktalı virgül (;) yerinde ve doğru kullanılmıştır?',
        options: {
          A: 'Pazardan elma, armut, muz; lahana, pırasa ve ıspanak aldım.',
          B: 'Dün akşam eve geldim; çok yorgundum.',
          C: 'Beni dinlemedi; yine bildiğini okudu.',
          D: 'Yarın sabah erken kalkmalıyım; çünkü sınavım var.',
        },
        correctAnswer: 'A',
        explanation:
          'Noktalı virgülün en temel işlevlerinden biri, ögeleri arasında virgül bulunan farklı tür ve takımları birbirinden ayırmaktır. A seçeneğinde meyveler (elma, armut, muz) ile sebzeler (lahana, pırasa, ıspanak) grupları arasına noktalı virgül konularak mükemmel bir kullanım sergilenmiştir.',
        hintForSocratic: 'Farklı kategorideki kelime gruplarını (meyveler ile sebzeler) ayıran işarete dikkat et.',
      },
      {
        id: 'full-k1-mat-1',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Çarpanlar ve Katlar',
        questionNumber: 3,
        questionText:
          'Bir otobüs terminalinden A şehrine 40 dakikada bir, B şehrine ise 50 dakikada bir otobüs kalkmaktadır.\n\nİki otobüs ilk kez saat 08.00\'de birlikte hareket ettiğine göre, ikinci kez saat kaçta tekrar birlikte hareket ederler?',
        options: {
          A: '10.20',
          B: '11.00',
          C: '11.20',
          D: '12.00',
        },
        correctAnswer: 'C',
        explanation:
          '1. İki otobüsün tekrar birlikte hareket etmesi için geçen süre EKOK(40, 50) olmalıdır.\n2. EKOK(40, 50) = 200 dakikadır.\n3. 200 dakika = 3 saat 20 dakikadır.\n4. Saat 08.00 + 03.20 = 11.20 bulunur.',
        hintForSocratic: '40 ve 50\'nin en küçük ortak katını (EKOK) bularak dakikayı saate çevir.',
      },
      {
        id: 'full-k1-mat-2',
        courseKey: 'matematik',
        courseName: 'Matematik',
        topicName: 'Kareköklü İfadeler',
        questionNumber: 4,
        questionText:
          '√150 sayısı hangi iki ardışık tam sayı arasındadır ve hangisine daha yakındır?',
        options: {
          A: '11 ile 12 arasında, 11\'e daha yakın',
          B: '12 ile 13 arasında, 12\'ye daha yakın',
          C: '12 ile 13 arasında, 13\'e daha yakın',
          D: '13 ile 14 arasında, 13\'e daha yakın',
        },
        correctAnswer: 'B',
        explanation:
          '1. 12² = 144 ve 13² = 169\'dur.\n2. 144 < 150 < 169 olduğu için √150 sayısı 12 ile 13 arasındadır.\n3. 150 - 144 = 6 iken, 169 - 150 = 19\'dur. 144\'e (yani 12\'ye) çok daha yakındır.',
        hintForSocratic: '150 sayısına en yakın iki tam kare sayıyı (12²=144 ve 13²=169) düşün.',
      },
      {
        id: 'full-k1-fen-1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Mevsimler ve İklim',
        questionNumber: 5,
        questionText:
          'Yüksek basınç alanından alçak basınç alanına doğru yatay yönde gerçekleşen hava hareketine ne ad verilir?',
        options: {
          A: 'Nem',
          B: 'Rüzgâr',
          C: 'Kırağı',
          D: 'Sera Etkisi',
        },
        correctAnswer: 'B',
        explanation:
          'Sıcaklık farklarından kaynaklanan basınç dengesizliğinde, soğuk ve yoğun hava (yüksek basınç) sıcak ve seyrek havanın bulunduğu bölgeye (alçak basınç) doğru yatay olarak akar. Bu yatay hava hareketine rüzgâr denir.',
        hintForSocratic: 'Havanın basınç farkından ötürü yatay yönde esmesine ne denir?',
      },
      {
        id: 'full-k1-fen-2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod',
        questionNumber: 6,
        questionText:
          'Aşağıdakilerden hangisi bir "Modifikasyon" örneğidir?',
        options: {
          A: 'Van kedisinin bir gözünün mavi diğerinin yeşil olması',
          B: 'Himalaya tavşanlarının kürk renginin sıcaklığa göre beyaz veya siyah çıkması',
          C: 'Down sendromlu bireylerde 47 kromozom bulunması',
          D: 'Kutup ayılarının soğuk iklime uyum sağlamak için beyaz ve kalın kürk geliştirmesi',
        },
        correctAnswer: 'B',
        explanation:
          'Modifikasyon çevresel etkenlerle (sıcaklık, besin, ışık) ortaya çıkan ve genlerin işleyişini değiştiren, kalıtsal olmayan değişimlerdir. Himalaya tavşanı örneği modifikasyonun klasik MEB örneğidir. (A ve C mutasyon, D ise adaptasyondur).',
        hintForSocratic: 'Kalıtsal olmayan, çevre etkisi kalktığında eski haline dönebilen değişimi hatırla.',
      },
      {
        id: 'full-k1-ink-1',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        topicName: 'Millî Uyanış',
        questionNumber: 7,
        questionText:
          'Erzurum Kongresi\'nde alınan "Manda ve himaye kabul edilemez." kararı doğrudan aşağıdakilerden hangisini sağlamaya yöneliktir?',
        options: {
          A: 'Yabancı devletlerden ekonomik kredi almayı',
          B: 'Tam bağımsızlığı koşulsuz olarak gerçekleştirmeyi',
          C: 'Saltanatın yetkilerini artırmayı',
          D: 'Komşu devletlerle sınır antlaşmaları imzalamayı',
        },
        correctAnswer: 'B',
        explanation:
          'Manda ve himaye başka bir devletin güdümüne girmek anlamına gelir. Bunun kesin bir dille reddedilmesi Türk milletinin tek parolasının "Tam Bağımsızlık" olduğunu ilan eder.',
        hintForSocratic: 'Manda ve himayenin zıddı olan ve bağımsız yaşamayı ifade eden kavramı seç.',
      },
      {
        id: 'full-k1-ink-2',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        topicName: 'Millî Bir Destan: Ya İstiklal Ya Ölüm',
        questionNumber: 8,
        questionText:
          'Sakarya Meydan Muharebesi öncesinde ordunun acil ihtiyaçlarını (giyecek, yiyecek, silah, binek hayvanı) karşılamak amacıyla Mustafa Kemal Paşa tarafından yayımlanan milli emirler bütünü hangisidir?',
        options: {
          A: 'Misakımillî Kararları',
          B: 'Tekalif-i Milliye Emirleri',
          C: 'Teşkilat-ı Esasiye Kanunu',
          D: 'Hıyanet-i Vataniye Kanunu',
        },
        correctAnswer: 'B',
        explanation:
          'Tekalif-i Milliye Emirleri (Milli Yükümlülükler), Sakarya Zaferi öncesinde Türk ordusunun lojistik eksikliklerini milletin topyekun fedakarlığıyla kapatmak için Mustafa Kemal\'in Başkomutanlık yetkisiyle çıkardığı emirlerdir.',
        hintForSocratic: 'Ordunun giyecek ve silah ihtiyacını milletten toplamak için çıkarılan "Milli Yükümlülükler" emirlerini hatırla.',
      },
      {
        id: 'full-k1-din-1',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Kader İnancı',
        questionNumber: 9,
        questionText:
          'Allah\'ın her şeyi önceden bilmesi, takdir etmesi ve planlamasına --------, zamanı geldiğinde bu planın gerçekleşmesine ise -------- denir.\n\nBoş bırakılan yerlere sırasıyla hangi kavramlar gelmelidir?',
        options: {
          A: 'Kader - Kaza',
          B: 'Kaza - Kader',
          C: 'Ömür - Ecel',
          D: 'Rızık - Tevekkül',
        },
        correctAnswer: 'A',
        explanation:
          'Kader: Allah\'ın ezelden ebede kadar olacak her şeyi önceden bilip planlaması ve takdir etmesidir. Kaza: Takdir edilen bu olayların zamanı ve yeri geldiğinde fiilen gerçekleşmesidir.',
        hintForSocratic: 'Planlama aşaması Kader, gerçekleşme aşaması Kaza\'dır.',
      },
      {
        id: 'full-k1-din-2',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Zekât ve Sadaka',
        questionNumber: 10,
        questionText:
          'Bir Müslümanın zengin sayılabilmesi ve zekât vermekle yükümlü olabilmesi için temel ihtiyaçlarının dışında sahip olması gereken asgari zenginlik ölçüsüne ne ad verilir?',
        options: {
          A: 'Fitre',
          B: 'Nisap Miktarı',
          C: 'Öşür',
          D: 'İnfak',
        },
        correctAnswer: 'B',
        explanation:
          'Nisap miktarı, İslam dininde bir kimsenin zengin sayılabilmesi ve zekât ibadetiyle mükellef olabilmesi için dinen belirlenen zenginlik sınırıdır (80,18 gram altın veya karşılığı mal/para).',
        hintForSocratic: 'Zekat vermek için gereken asgari zenginlik sınırını ifade eden fıkhi terim.',
      },
      {
        id: 'full-k1-ing-1',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Friendship',
        questionNumber: 11,
        questionText:
          'Tom: "We are organizing a surprise birthday party for Leo tomorrow. Would you like to join us?"\nAmy: "I\'d love to, but I must study for my math exam."\n\nAccording to the dialogue, what is Amy doing?',
        options: {
          A: 'She is accepting the invitation with great joy.',
          B: 'She is refusing the invitation by giving an excuse.',
          C: 'She is making an offer to Tom.',
          D: 'She is criticizing Leo\'s birthday party.',
        },
        correctAnswer: 'B',
        explanation:
          'Amy "I\'d love to, but..." (Çok isterdim ama...) diyerek teklifi reddetmekte ve "...must study for my math exam" diyerek mazeret (giving an excuse) bildirmektedir.',
        hintForSocratic: '"refusing... by giving an excuse" (mazeret bildirerek reddetme) kalıbını gözden geçir.',
      },
      {
        id: 'full-k1-ing-2',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 2: Teen Life',
        questionNumber: 12,
        questionText:
          'Which of the following activities is related to being "fond of nature and outdoor sports"?',
        options: {
          A: 'Playing computer games all day at home',
          B: 'Trekking and camping in the forest',
          C: 'Surfing the internet in a cafe',
          D: 'Watching TV series on the sofa',
        },
        correctAnswer: 'B',
        explanation:
          '"fond of nature and outdoor sports" doğayı ve açık hava sporlarını sevmek demektir. Bu tanıma en uygun aktivite ormanda doğa yürüyüşü ve kamp yapmaktır (trekking and camping in the forest).',
        hintForSocratic: '"nature" (doğa) ve "outdoor" (açık hava) kelimelerinin karşılığı olan seçeneği işaretle.',
      },
    ],
  },
];
