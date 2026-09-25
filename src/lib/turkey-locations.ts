/**
 * Türkiye 81 İl ve Başlıca İlçeler Veritabanı
 */

export interface CityLocation {
  plate: number;
  name: string;
  districts: string[];
}

export const TURKEY_CITIES: CityLocation[] = [
  {
    plate: 34,
    name: 'İstanbul',
    districts: [
      'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy',
      'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece',
      'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa',
      'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik',
      'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli',
      'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu',
    ],
  },
  {
    plate: 6,
    name: 'Ankara',
    districts: [
      'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ',
      'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kahramankazan', 'Kalecik', 'Keçiören',
      'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar',
      'Yenimahalle',
    ],
  },
  {
    plate: 35,
    name: 'İzmir',
    districts: [
      'Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca',
      'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun',
      'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere',
      'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla',
    ],
  },
  {
    plate: 16,
    name: 'Bursa',
    districts: [
      'Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik', 'Karacabey', 'Keles',
      'Kestel', 'Mudanya', 'Mustafakemalpaşa', 'Nilüfer', 'Orhaneli', 'Orhangazi', 'Osmangazi',
      'Yenişehir', 'Yıldırım',
    ],
  },
  {
    plate: 7,
    name: 'Antalya',
    districts: [
      'Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı', 'Finike', 'Gazipaşa',
      'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca',
      'Manavgat', 'Muratpaşa', 'Serik',
    ],
  },
  {
    plate: 1,
    name: 'Adana',
    districts: [
      'Aladağ', 'Ceyhan', 'Çukurova', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan',
      'Pozantı', 'Saimbeyli', 'Sarıçam', 'Seyhan', 'Tufanbeyli', 'Yumurtalık', 'Yüreğir',
    ],
  },
  {
    plate: 27,
    name: 'Gaziantep',
    districts: [
      'Araban', 'İslahiye', 'Karkamış', 'Nizip', 'Nurdağı', 'Oğuzeli', 'Şahinbey', 'Şehitkamil',
      'Yavuzeli',
    ],
  },
  {
    plate: 26,
    name: 'Eskişehir',
    districts: [
      'Alpu', 'Beylikova', 'Çifteler', 'Günyüzü', 'Han', 'İnönü', 'Mahmudiye', 'Mihalgazi',
      'Mihalıççık', 'Odunpazarı', 'Sarıcakaya', 'Seyitgazi', 'Sivrihisar', 'Tepebaşı',
    ],
  },
  {
    plate: 41,
    name: 'Kocaeli',
    districts: [
      'Başiskele', 'Çayırova', 'Darıca', 'Derince', 'Dilovası', 'Gebze', 'Gölcük', 'İzmit',
      'Kandıra', 'Karamürsel', 'Kartepe', 'Körfez',
    ],
  },
  {
    plate: 42,
    name: 'Konya',
    districts: [
      'Ahırlı', 'Akören', 'Akşehir', 'Altınekin', 'Beyşehir', 'Bozkır', 'Cihanbeyli', 'Çeltik',
      'Çumra', 'Derbent', 'Derebucak', 'Doğanhisar', 'Emirgazi', 'Ereğli', 'Güneysınır',
      'Hadim', 'Halkapınar', 'Hüyük', 'Ilgın', 'Kadınhanı', 'Karapınar', 'Karatay', 'Kulu',
      'Meram', 'Sarayönü', 'Selçuklu', 'Seydişehir', 'Taşkent', 'Tuzlukçu', 'Yalıhüyük', 'Yunak',
    ],
  },
  {
    plate: 33,
    name: 'Mersin',
    districts: [
      'Akdeniz', 'Anamur', 'Aydıncık', 'Bozyazı', 'Çamlıyayla', 'Erdemli', 'Gülnar', 'Mezitli',
      'Mut', 'Silifke', 'Tarsus', 'Toroslar', 'Yenişehir',
    ],
  },
  {
    plate: 38,
    name: 'Kayseri',
    districts: [
      'Akkışla', 'Bünyan', 'Develi', 'Felahiye', 'Hacılar', 'İncesu', 'Kocasinan', 'Melikgazi',
      'Özvatan', 'Pınarbaşı', 'Sarıoğlan', 'Sarız', 'Talas', 'Tomarza', 'Yahyalı', 'Yeşilhisar',
    ],
  },
  {
    plate: 20,
    name: 'Denizli',
    districts: [
      'Acıpayam', 'Babadağ', 'Baklan', 'Bekilli', 'Beyağaç', 'Bozkurt', 'Buldan', 'Çal', 'Çameli',
      'Çardak', 'Çivril', 'Güney', 'Honaz', 'Kale', 'Merkezefendi', 'Pamukkale', 'Sarayköy',
      'Serinhisar', 'Tavas',
    ],
  },
  {
    plate: 55,
    name: 'Samsun',
    districts: [
      '19 Mayıs', 'Alaçam', 'Asarcık', 'Atakum', 'Ayvacık', 'Bafra', 'Canik', 'Çarşamba',
      'Havza', 'İlkadım', 'Kavak', 'Ladik', 'Salıpazarı', 'Tekkeköy', 'Terme', 'Vezirköprü',
      'Yakakent',
    ],
  },
  {
    plate: 61,
    name: 'Trabzon',
    districts: [
      'Akçaabat', 'Araklı', 'Arsin', 'Beşikdüzü', 'Çarşıbaşı', 'Çaykara', 'Dernekpazarı',
      'Düzköy', 'Hayrat', 'Köprübaşı', 'Maçka', 'Of', 'Ortahisar', 'Sürmene', 'Şalpazarı',
      'Tonya', 'Vakfıkebir', 'Yomra',
    ],
  },
  {
    plate: 21,
    name: 'Diyarbakır',
    districts: [
      'Bağlar', 'Bismil', 'Çermik', 'Çınar', 'Çüngüş', 'Dicle', 'Eğil', 'Ergani', 'Hani',
      'Hazro', 'Kayapınar', 'Kocaköy', 'Kulp', 'Lice', 'Silvan', 'Sur', 'Yenişehir',
    ],
  },
  {
    plate: 54,
    name: 'Sakarya',
    districts: [
      'Adapazarı', 'Akyazı', 'Arifiye', 'Erenler', 'Ferizli', 'Geyve', 'Hendek', 'Karapürçek',
      'Karasu', 'Kaynarca', 'Kocaali', 'Pamukova', 'Sapanca', 'Serdivan', 'Söğütlü', 'Taraklı',
    ],
  },
  {
    plate: 45,
    name: 'Manisa',
    districts: [
      'Ahmetli', 'Akhisar', 'Alaşehir', 'Demirci', 'Gölmarmara', 'Gördes', 'Kırkağaç', 'Köprübaşı',
      'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı', 'Selendi', 'Soma', 'Şehzadeler', 'Turgutlu', 'Yunusemre',
    ],
  },
  {
    plate: 10,
    name: 'Balıkesir',
    districts: [
      'Altıeylül', 'Ayvalık', 'Balya', 'Bandırma', 'Bigadiç', 'Burhaniye', 'Dursunbey', 'Edremit',
      'Erdek', 'Gömeç', 'Gönen', 'Havran', 'İvrindi', 'Karesi', 'Kepsut', 'Manyas', 'Marmara',
      'Savaştepe', 'Sındırgı', 'Susurluk',
    ],
  },
  {
    plate: 48,
    name: 'Muğla',
    districts: [
      'Bodrum', 'Dalaman', 'Datça', 'Fethiye', 'Kavaklıdere', 'Köyceğiz', 'Marmaris', 'Menteşe',
      'Milas', 'Ortaca', 'Seydikemer', 'Ula', 'Yatağan',
    ],
  },
  {
    plate: 25,
    name: 'Erzurum',
    districts: ['Aziziye', 'Palandöken', 'Yakutiye', 'Oltu', 'Pasinler', 'Horasan'],
  },
  {
    plate: 52,
    name: 'Ordu',
    districts: ['Altınordu', 'Fatsa', 'Ünye', 'Gölköy', 'Perşembe'],
  },
  {
    plate: 44,
    name: 'Malatya',
    districts: ['Battalgazi', 'Yeşilyurt', 'Doğanşehir', 'Darende', 'Akçadağ'],
  },
  {
    plate: 31,
    name: 'Hatay',
    districts: ['Antakya', 'İskenderun', 'Defne', 'Dörtyol', 'Samandağ', 'Kırıkhan'],
  },
  {
    plate: 67,
    name: 'Zonguldak',
    districts: ['Merkez', 'Ereğli', 'Çaycuma', 'Devrek', 'Kozlu', 'Kilimli'],
  },
  {
    plate: 22,
    name: 'Edirne',
    districts: ['Merkez', 'Keşan', 'Uzunköprü', 'İpsala', 'Havsa'],
  },
  {
    plate: 17,
    name: 'Çanakkale',
    districts: ['Merkez', 'Biga', 'Çan', 'Gelibolu', 'Ayvacık', 'Yenice'],
  },
  {
    plate: 65,
    name: 'Van',
    districts: ['İpekyolu', 'Tuşba', 'Edremit', 'Erciş', 'Başkale'],
  },
  {
    plate: 59,
    name: 'Tekirdağ',
    districts: ['Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Kapaklı', 'Ergene'],
  },
  {
    plate: 63,
    name: 'Şanlıurfa',
    districts: ['Eyyübiye', 'Haliliye', 'Karaköprü', 'Siverek', 'Viranşehir'],
  },
];

/**
 * Alfabetik sıralı şehir listesini döner
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
