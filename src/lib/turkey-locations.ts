/**
 * Türkiye 81 İl ve Başlıca İlçeler Eksiksiz Veritabanı
 */

export interface CityLocation {
  plate: number;
  name: string;
  districts: string[];
}

export const TURKEY_CITIES: CityLocation[] = [
  { plate: 1, name: 'Adana', districts: ['Seyhan', 'Yüreğir', 'Çukurova', 'Sarıçam', 'Ceyhan', 'Kozan', 'İmamoğlu', 'Karataş', 'Pozantı', 'Karaisalı'] },
  { plate: 2, name: 'Adıyaman', districts: ['Merkez', 'Kahta', 'Besni', 'Gölbaşı', 'Gerger', 'Sincik', 'Çelikhan', 'Samsat', 'Tut'] },
  { plate: 3, name: 'Afyonkarahisar', districts: ['Merkez', 'Sandıklı', 'Dinar', 'Bolvadin', 'Sinanpaşa', 'Emirdağ', 'Şuhut', 'Çay', 'İhsaniye'] },
  { plate: 4, name: 'Ağrı', districts: ['Merkez', 'Patnos', 'Doğubayazıt', 'Diyadin', 'Eleşkirt', 'Tutak', 'Taşlıçay', 'Hamur'] },
  { plate: 5, name: 'Amasya', districts: ['Merkez', 'Merzifon', 'Suluova', 'Taşova', 'Gümüşhacıköy', 'Göynücek', 'Hamamözü'] },
  {
    plate: 6,
    name: 'Ankara',
    districts: [
      'Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan', 'Altındağ',
      'Pursaklar', 'Gölbaşı', 'Polatlı', 'Çubuk', 'Kahramankazan', 'Beypazarı', 'Elmadağ',
      'Şereflikoçhisar', 'Akyurt', 'Nallıhan', 'Haymana', 'Kızılcahamam', 'Bala', 'Kalecik',
      'Ayaş', 'Güdül', 'Çamlıdere', 'Evren',
    ],
  },
  {
    plate: 7,
    name: 'Antalya',
    districts: [
      'Muratpaşa', 'Kepez', 'Konyaaltı', 'Alanya', 'Manavgat', 'Serik', 'Aksu', 'Kumluca',
      'Kaş', 'Korkuteli', 'Gazipaşa', 'Finike', 'Kemer', 'Elmalı', 'Döşemealtı', 'Demre',
      'Akseki', 'Gündoğmuş', 'İbradı',
    ],
  },
  { plate: 8, name: 'Artvin', districts: ['Merkez', 'Hopa', 'Borçka', 'Arhavi', 'Yusufeli', 'Şavşat', 'Ardanuç', 'Murgul', 'Kemalpaşa'] },
  { plate: 9, name: 'Aydın', districts: ['Efeler', 'Nazilli', 'Söke', 'Kuşadası', 'Didim', 'İncirliova', 'Çine', 'Germencik', 'Bozdoğan', 'Köşk'] },
  { plate: 10, name: 'Balıkesir', districts: ['Karesi', 'Altıeylül', 'Bandırma', 'Edremit', 'Gönen', 'Ayvalık', 'Burhaniye', 'Bigadiç', 'Susurluk', 'Dursunbey', 'Erdek'] },
  { plate: 11, name: 'Bilecik', districts: ['Merkez', 'Bozüyük', 'Osmaneli', 'Söğüt', 'Gölpazarı', 'Pazaryeri', 'Yenipazar', 'İnhisar'] },
  { plate: 12, name: 'Bingöl', districts: ['Merkez', 'Genç', 'Solhan', 'Karlıova', 'Adaklı', 'Kiğı', 'Yedisu', 'Yayladere'] },
  { plate: 13, name: 'Bitlis', districts: ['Tatvan', 'Merkez', 'Güroymak', 'Ahlat', 'Hizan', 'Mutki', 'Adilcevaz'] },
  { plate: 14, name: 'Bolu', districts: ['Merkez', 'Gerede', 'Mudurnu', 'Göynük', 'Mengen', 'Yeniçağa', 'Dörtdivan', 'Seben', 'Kıbrıscık'] },
  { plate: 15, name: 'Burdur', districts: ['Merkez', 'Bucak', 'Gölhisar', 'Yeşilova', 'Çavdır', 'Tefenni', 'Ağlasun', 'Karamanlı', 'Altınyayla'] },
  {
    plate: 16,
    name: 'Bursa',
    districts: [
      'Osmangazi', 'Yıldırım', 'Nilüfer', 'İnegöl', 'Gemlik', 'Mustafakemalpaşa', 'Mudanya',
      'Gürsu', 'Karacabey', 'Orhangazi', 'Kestel', 'Yenişehir', 'İznik', 'Orhaneli', 'Keles',
      'Büyükorhan', 'Harmancık',
    ],
  },
  { plate: 17, name: 'Çanakkale', districts: ['Merkez', 'Biga', 'Çan', 'Gelibolu', 'Yenice', 'Ayvacık', 'Ezine', 'Bayramiç', 'Lapseki', 'Eceabat', 'Gökçeada', 'Bozcaada'] },
  { plate: 18, name: 'Çankırı', districts: ['Merkez', 'Çerkeş', 'Ilgaz', 'Orta', 'Şabanözü', 'Kurşunlu', 'Yapraklı', 'Kızılırmak', 'Eldivan', 'Atkaracalar'] },
  { plate: 19, name: 'Çorum', districts: ['Merkez', 'Sungurlu', 'Osmancık', 'İskilip', 'Alaca', 'Bayat', 'Mecitözü', 'Kargı', 'Ortaköy', 'Uğurludağ'] },
  { plate: 20, name: 'Denizli', districts: ['Pamukkale', 'Merkezefendi', 'Çivril', 'Acıpayam', 'Tavas', 'Honaz', 'Sarayköy', 'Buldan', 'Kale', 'Çal', 'Çameli'] },
  { plate: 21, name: 'Diyarbakır', districts: ['Bağlar', 'Kayapınar', 'Yenişehir', 'Sur', 'Ergani', 'Bismil', 'Silvan', 'Çınar', 'Çermik', 'Dicle', 'Kulp', 'Hani'] },
  { plate: 22, name: 'Edirne', districts: ['Merkez', 'Keşan', 'Uzunköprü', 'İpsala', 'Havsa', 'Meriç', 'Enez', 'Süloğlu', 'Lalapaşa'] },
  { plate: 23, name: 'Elazığ', districts: ['Merkez', 'Kovancılar', 'Karakoçan', 'Palu', 'Arıcak', 'Baskil', 'Maden', 'Sivrice', 'Alacakaya', 'Keban', 'Ağın'] },
  { plate: 24, name: 'Erzincan', districts: ['Merkez', 'Tercan', 'Üzümlü', 'Çayırlı', 'İliç', 'Kemah', 'Kemaliye', 'Refahiye', 'Otlukbeli'] },
  { plate: 25, name: 'Erzurum', districts: ['Yakutiye', 'Palandöken', 'Aziziye', 'Horasan', 'Oltu', 'Pasinler', 'Karayazı', 'Hınıs', 'Tekman', 'Karaçoban', 'Aşkale', 'Şenkaya'] },
  { plate: 26, name: 'Eskişehir', districts: ['Odunpazarı', 'Tepebaşı', 'Sivrihisar', 'Çifteler', 'Seyitgazi', 'Alpu', 'Mihalıççık', 'Mahmudiye', 'Beylikova', 'İnönü', 'Günyüzü'] },
  { plate: 27, name: 'Gaziantep', districts: ['Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye', 'Nurdağı', 'Araban', 'Oğuzeli', 'Yavuzeli', 'Karkamış'] },
  { plate: 28, name: 'Giresun', districts: ['Merkez', 'Bulancak', 'Espiye', 'Görele', 'Tirebolu', 'Dereli', 'Şebinkarahisar', 'Keşap', 'Yağlıdere', 'Alucra', 'Piraziz'] },
  { plate: 29, name: 'Gümüşhane', districts: ['Merkez', 'Kelkit', 'Şiran', 'Kürtün', 'Torul', 'Köse'] },
  { plate: 30, name: 'Hakkari', districts: ['Yüksekova', 'Merkez', 'Şemdinli', 'Çukurca', 'Derecik'] },
  { plate: 31, name: 'Hatay', districts: ['Antakya', 'İskenderun', 'Defne', 'Dörtyol', 'Samandağ', 'Kırıkhan', 'Reyhanlı', 'Arsuz', 'Altınözü', 'Hassa', 'Payas', 'Erzin', 'Belen'] },
  { plate: 32, name: 'Isparta', districts: ['Merkez', 'Yalvaç', 'Eğirdir', 'Şarkikaraağaç', 'Gelendost', 'Keçiborlu', 'Senirkent', 'Sütçüler', 'Gönen', 'Uluborlu', 'Atabey'] },
  { plate: 33, name: 'Mersin', districts: ['Tarsus', 'Toroslar', 'Akdeniz', 'Yenişehir', 'Mezitli', 'Erdemli', 'Silifke', 'Anamur', 'Mut', 'Bozyazı', 'Gülnar', 'Aydıncık', 'Çamlıyayla'] },
  {
    plate: 34,
    name: 'İstanbul',
    districts: [
      'Esenyurt', 'Küçükçekmece', 'Bağcılar', 'Pendik', 'Ümraniye', 'Bahçelievler', 'Sultangazi',
      'Üsküdar', 'Maltepe', 'Gaziosmanpaşa', 'Kartal', 'Kadıköy', 'Esenler', 'Kağıthane',
      'Fatih', 'Avcılar', 'Başakşehir', 'Ataşehir', 'Sancaktepe', 'Eyüpsultan', 'Sarıyer',
      'Beylikdüzü', 'Sultanbeyli', 'Güngören', 'Zeytinburnu', 'Şişli', 'Bayrampaşa', 'Arnavutköy',
      'Tuzla', 'Çekmeköy', 'Büyükçekmece', 'Beykoz', 'Beyoğlu', 'Bakırköy', 'Silivri',
      'Beşiktaş', 'Çatalca', 'Şile', 'Adalar',
    ],
  },
  {
    plate: 35,
    name: 'İzmir',
    districts: [
      'Buca', 'Karabağlar', 'Bornova', 'Konak', 'Karşıyaka', 'Bayraklı', 'Çiğli', 'Torbalı',
      'Menemen', 'Gaziemir', 'Ödemiş', 'Kemalpaşa', 'Bergama', 'Aliağa', 'Menderes', 'Tire',
      'Balçova', 'Narlıdere', 'Urla', 'Seferihisar', 'Çeşme', 'Dikili', 'Kiraz', 'Bayındır',
      'Selçuk', 'Güzelbahçe', 'Foça', 'Kınık', 'Karaburun', 'Beydağ',
    ],
  },
  { plate: 36, name: 'Kars', districts: ['Merkez', 'Kağızman', 'Sarıkamış', 'Selim', 'Digor', 'Arpaçay', 'Akyaka', 'Susuz'] },
  { plate: 37, name: 'Kastamonu', districts: ['Merkez', 'Tosya', 'Taşköprü', 'Cide', 'İnebolu', 'Araç', 'Devrekani', 'Bozkurt', 'Daday', 'Azdavay', 'Küre'] },
  { plate: 38, name: 'Kayseri', districts: ['Melikgazi', 'Kocasinan', 'Talas', 'Develi', 'Yahyalı', 'Bünyan', 'Pınarbaşı', 'Tomarza', 'Yeşilhisar', 'Sarıoğlan', 'Hacılar', 'İncesu'] },
  { plate: 39, name: 'Kırklareli', districts: ['Lüleburgaz', 'Merkez', 'Babaeski', 'Vize', 'Pınarhisar', 'Demirköy', 'Pehlivanköy', 'Kofçaz'] },
  { plate: 40, name: 'Kırşehir', districts: ['Merkez', 'Kaman', 'Mucur', 'Çiçekdağı', 'Akpınar', 'Boztepe', 'Akçakent'] },
  { plate: 41, name: 'Kocaeli', districts: ['Gebze', 'İzmit', 'Darıca', 'Körfez', 'Gölcük', 'Derince', 'Çayırova', 'Kartepe', 'Başiskele', 'Karamürsel', 'Kandıra', 'Dilovası'] },
  { plate: 42, name: 'Konya', districts: ['Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir', 'Beyşehir', 'Cihanbeyli', 'Kulu', 'Seydişehir', 'Çumra', 'Ilgın', 'Karapınar', 'Kadınhanı'] },
  { plate: 43, name: 'Kütahya', districts: ['Merkez', 'Tavşanlı', 'Simav', 'Gediz', 'Emet', 'Altıntaş', 'Domaniç', 'Hisarcık', 'Aslanapa', 'Çavdarhisar', 'Şaphane', 'Pazarlar'] },
  { plate: 44, name: 'Malatya', districts: ['Battalgazi', 'Yeşilyurt', 'Doğanşehir', 'Akçadağ', 'Darende', 'Hekimhan', 'Pütürge', 'Yazıhan', 'Arapgir', 'Kuluncak', 'Arguvan', 'Kale', 'Doğanyol'] },
  { plate: 45, name: 'Manisa', districts: ['Yunusemre', 'Şehzadeler', 'Akhisar', 'Turgutlu', 'Salihli', 'Soma', 'Alaşehir', 'Saruhanlı', 'Kula', 'Demirci', 'Kırkağaç', 'Sarıgöl', 'Gördes', 'Selendi'] },
  { plate: 46, name: 'Kahramanmaraş', districts: ['Onikişubat', 'Dulkadiroğlu', 'Elbistan', 'Afşin', 'Türkoğlu', 'Pazarcık', 'Göksun', 'Andırın', 'Çağlayancerit', 'Ekinözü', 'Nurhak'] },
  { plate: 47, name: 'Mardin', districts: ['Kızıltepe', 'Artuklu', 'Midyat', 'Nusaybin', 'Derik', 'Mazıdağı', 'Dargeçit', 'Savur', 'Yeşilli', 'Ömerli'] },
  { plate: 48, name: 'Muğla', districts: ['Bodrum', 'Fethiye', 'Milas', 'Menteşe', 'Marmaris', 'Seydikemer', 'Ortaca', 'Yatağan', 'Dalaman', 'Köyceğiz', 'Ula', 'Datça', 'Kavaklıdere'] },
  { plate: 49, name: 'Muş', districts: ['Merkez', 'Bulanık', 'Malazgirt', 'Varto', 'Hasköy', 'Korkut'] },
  { plate: 50, name: 'Nevşehir', districts: ['Merkez', 'Ürgüp', 'Avanos', 'Gülşehir', 'Derinkuyu', 'Acıgöl', 'Kozaklı', 'Hacıbektaş'] },
  { plate: 51, name: 'Niğde', districts: ['Merkez', 'Bor', 'Çiftlik', 'Ulukışla', 'Altunhisar', 'Çamardı'] },
  { plate: 52, name: 'Ordu', districts: ['Altınordu', 'Ünye', 'Fatsa', 'Kumru', 'Korgan', 'Gölköy', 'Perşembe', 'Aybastı', 'Ulubey', 'Mesudiye', 'Akkuş', 'Gürgentepe'] },
  { plate: 53, name: 'Rize', districts: ['Merkez', 'Çayeli', 'Ardeşen', 'Pazar', 'Fındıklı', 'Güneysu', 'Kalkandere', 'İyidere', 'Derepazarı', 'Çamlıhemşin', 'İkizdere', 'Hemşin'] },
  { plate: 54, name: 'Sakarya', districts: ['Adapazarı', 'Serdivan', 'Akyazı', 'Erenler', 'Hendek', 'Karasu', 'Geyve', 'Arifiye', 'Sapanca', 'Pamukova', 'Ferizli', 'Kaynarca', 'Kocaali', 'Söğütlü'] },
  { plate: 55, name: 'Samsun', districts: ['İlkadım', 'Atakum', 'Bafra', 'Çarşamba', 'Canik', 'Vezirköprü', 'Terme', 'Tekkeköy', 'Havza', 'Alaçam', '19 Mayıs', 'Kavak', 'Ayvacık', 'Salıpazarı', 'Asarcık', 'Ladik', 'Yakakent'] },
  { plate: 56, name: 'Siirt', districts: ['Merkez', 'Kurtalan', 'Pervari', 'Baykan', 'Şirvan', 'Eruh', 'Tillo'] },
  { plate: 57, name: 'Sinop', districts: ['Merkez', 'Boyabat', 'Gerze', 'Ayancık', 'Durağan', 'Türkeli', 'Erfelek', 'Dikmen', 'Saraydüzü'] },
  { plate: 58, name: 'Sivas', districts: ['Merkez', 'Şarkışla', 'Yıldızeli', 'Suşehri', 'Gemerek', 'Zara', 'Kangal', 'Gürün', 'Divriği', 'Koyulhisar', 'Altınyayla', 'Hafik', 'Ulaş', 'İmranlı', 'Akıncılar', 'Gölova', 'Doğanşar'] },
  { plate: 59, name: 'Tekirdağ', districts: ['Çorlu', 'Süleymanpaşa', 'Çerkezköy', 'Kapaklı', 'Ergene', 'Malkara', 'Saray', 'Hayrabolu', 'Şarköy', 'Muratlı', 'Marmaraereğlisi'] },
  { plate: 60, name: 'Tokat', districts: ['Merkez', 'Erbaa', 'Turhal', 'Niksar', 'Zile', 'Reşadiye', 'Almus', 'Pazar', 'Yeşilyurt', 'Artova', 'Sulusaray', 'Başçiftlik'] },
  { plate: 61, name: 'Trabzon', districts: ['Ortahisar', 'Akçaabat', 'Araklı', 'Of', 'Yomra', 'Arsin', 'Vakfıkebir', 'Sürmene', 'Maçka', 'Beşikdüzü', 'Çarşıbaşı', 'Tonya', 'Düzköy', 'Çaykara', 'Şalpazarı', 'Hayrat', 'Köprübaşı', 'Dernekpazarı'] },
  { plate: 62, name: 'Tunceli', districts: ['Merkez', 'Pertek', 'Mazgirt', 'Çemişgezek', 'Hozat', 'Ovacık', 'Pülümür', 'Nazımiye'] },
  { plate: 63, name: 'Şanlıurfa', districts: ['Haliliye', 'Eyyübiye', 'Karaköprü', 'Siverek', 'Viranşehir', 'Suruç', 'Birecik', 'Akçakale', 'Ceylanpınar', 'Harran', 'Bozova', 'Hilvan', 'Halfeti'] },
  { plate: 64, name: 'Uşak', districts: ['Merkez', 'Banaz', 'Eşme', 'Sivaslı', 'Ulubey', 'Karahallı'] },
  { plate: 65, name: 'Van', districts: ['İpekyolu', 'Tuşba', 'Edremit', 'Erciş', 'Özalp', 'Çaldıran', 'Muradiye', 'Başkale', 'Gürpınar', 'Gevaş', 'Saray', 'Çatak', 'Bahçesaray'] },
  { plate: 66, name: 'Yozgat', districts: ['Merkez', 'Sorgun', 'Akdağmadeni', 'Yerköy', 'Boğazlıyan', 'Sarıkaya', 'Çekerek', 'Şefaatli', 'Saraykent', 'Çayıralan', 'Kadışehri', 'Aydıncık', 'Yenifakılı', 'Çandır'] },
  { plate: 67, name: 'Zonguldak', districts: ['Ereğli', 'Merkez', 'Çaycuma', 'Devrek', 'Kozlu', 'Alaplı', 'Kilimli', 'Gökçebey'] },
  { plate: 68, name: 'Aksaray', districts: ['Merkez', 'Ortaköy', 'Eskil', 'Gülağaç', 'Güzelyurt', 'Ağaçören', 'Sultanhanı', 'Sarıyahşi'] },
  { plate: 69, name: 'Bayburt', districts: ['Merkez', 'Demirözü', 'Aydıntepe'] },
  { plate: 70, name: 'Karaman', districts: ['Merkez', 'Ermenek', 'Sarıveliler', 'Ayrancı', 'Kazımkarabekir', 'Başyayla'] },
  { plate: 71, name: 'Kırıkkale', districts: ['Merkez', 'Yahşihan', 'Keskin', 'Delice', 'Bahşılı', 'Sulakyurt', 'Balışeyh', 'Karakeçili', 'Çelebi'] },
  { plate: 72, name: 'Batman', districts: ['Merkez', 'Kozluk', 'Sason', 'Beşiri', 'Gercüş', 'Hasankeyf'] },
  { plate: 73, name: 'Şırnak', districts: ['Cizre', 'Silopi', 'Merkez', 'İdil', 'Uludere', 'Beytüşşebap', 'Güçlükonak'] },
  { plate: 74, name: 'Bartın', districts: ['Merkez', 'Ulus', 'Amasra', 'Kurucaşile'] },
  { plate: 75, name: 'Ardahan', districts: ['Merkez', 'Göle', 'Çıldır', 'Hanak', 'Posof', 'Damal'] },
  { plate: 76, name: 'Iğdır', districts: ['Merkez', 'Tuzluca', 'Aralık', 'Karakoyunlu'] },
  { plate: 77, name: 'Yalova', districts: ['Merkez', 'Çiftlikköy', 'Çınarcık', 'Altınova', 'Armutlu', 'Termal'] },
  { plate: 78, name: 'Karabük', districts: ['Merkez', 'Safranbolu', 'Yenice', 'Eskipazar', 'Eflani', 'Ovacık'] },
  { plate: 79, name: 'Kilis', districts: ['Merkez', 'Musabeyli', 'Elbeyli', 'Polateli'] },
  { plate: 80, name: 'Osmaniye', districts: ['Merkez', 'Kadirli', 'Düziçi', 'Bahçe', 'Toprakkale', 'Sumbas', 'Hasanbeyli'] },
  { plate: 81, name: 'Düzce', districts: ['Merkez', 'Akçakoca', 'Kaynaşlı', 'Gölyaka', 'Çilimli', 'Yığılca', 'Gümüşova', 'Cumayeri'] },
];

/**
 * Alfabetik sıralı tüm 81 il listesini döner
 */
export function getAllCities(): string[] {
  return TURKEY_CITIES.map((c) => c.name).sort((a, b) => a.localeCompare(b, 'tr'));
}

/**
 * Verilen şehre ait ilçeleri döner
 */
export function getDistrictsForCity(cityName: string): string[] {
  if (!cityName) return [];
  const found = TURKEY_CITIES.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase().trim()
  );
  return found ? [...found.districts].sort((a, b) => a.localeCompare(b, 'tr')) : ['Merkez'];
}
