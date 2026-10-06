'use client';

import React, { useState, useEffect } from 'react';
import { useGradeTier } from '@/lib/grade-tier';
import { Sparkles, Lightbulb, Target, BookOpen, Clock, Award } from 'lucide-react';

const LGS_TIPS = [
  {
    title: 'Yeni Nesil Soru Taktiği',
    tip: 'Matematik sorularında önce soru kökünü ve şemayı incele. Uzun metin aslında sorunun mantığını hikayeleştirir; temel formülü yakala!',
    icon: Lightbulb,
  },
  {
    title: '3 Yanlış 1 Doğruyu Götürür',
    tip: 'İki şık arasında kalıp tamamen emin değilsen boş bırakmak bazen netini korumanın en akıllıca yoludur. Risk yönetimi yap!',
    icon: Target,
  },
  {
    title: 'Süre Yönetimi & Turlama Tekniği',
    tip: 'Bir soruya 2 dakikadan fazla takıldıysan hemen yanına işaret koyup sonraki soruya geç. Sınav sonunda kalan vaktinde dön!',
    icon: Sparkles,
  },
  {
    title: 'Paragrafta Hızlı Anlama',
    tip: 'Türkçe paragraf sorularında önce şıkları göz ucuyla tara, sonra metni oku. Beynin arayacağı anahtar kelimeleri baştan bilsin.',
    icon: Lightbulb,
  },
  {
    title: 'Fen Deney & Grafik Soruları',
    tip: 'Fen Bilimleri deney sorularında bağımsız değişken (değiştirilen şey) ve bağımlı değişkeni (sonuç) belirlemek sorunun %80’ini çözer!',
    icon: Target,
  },
];

const LISE_TIPS = [
  {
    title: 'MEB Açık Uçlu Yazılı Rubriği',
    tip: 'Yazılı sınavlarda cevabı sadece sayı olarak yazma! İşlem adımlarını, formülü ve mantıksal açıklamayı adım adım göster. MEB puanlama anahtarı her adıma kısmi puan verir.',
    icon: Award,
  },
  {
    title: 'Yüksek OBP & Diploma Notu',
    tip: '9, 10 ve 11. sınıf yıl sonu başarı puanları üniversite yerleştirmesinde doğrudan OBP (Ortaöğretim Başarı Puanı) olarak karşına çıkacaktır. Her sınav kritik önem taşır!',
    icon: Target,
  },
  {
    title: 'Formül Mantığı ve Türetme',
    tip: 'Fizik ve Matematik formüllerini ezberlemek yerine nereden geldiğini kavra. Temel birim analizleri soruların çözüm yolunu doğrudan fısıldar.',
    icon: Lightbulb,
  },
  {
    title: 'Düzenli Haftalık Tekrar',
    tip: 'Hafta sonu 45 dakikalık bir tekrar, hafta içi öğrenilen bilginin hafızada kalıcılığını %80 oranında artırır.',
    icon: Clock,
  },
  {
    title: 'Edebiyat Barajı ve Okuma',
    tip: 'Türk Dili ve Edebiyatı dersi MEB geçme barajı 70\'tir. Metin tahlillerini ve terim anlamlarını günü gününe not tutarak çalış.',
    icon: BookOpen,
  },
];

const YKS_TIPS = [
  {
    title: 'TYT 165 Dakika & Turlama Modeli',
    tip: '120 soruluk TYT bir hız ve strateji sınavıdır. İlk turda bildiğin kolay soruları süpür, takıldıklarını ikinci tura bırakarak en az 25 dakika kontrol rezervi ayır.',
    icon: Clock,
  },
  {
    title: '4 Yanlış 1 Doğruyu Götürür',
    tip: 'ÖSYM kuralı gereği rastgele tahmin yapmak ham puanını eritir. İki güçlü seçenek arasında kalmadıkça boş bırakmayı bir taktik olarak kullan.',
    icon: Target,
  },
  {
    title: 'Günlük Paragraf & Problem Rutini',
    tip: 'Her sabah ilk iş 20 paragraf ve 10 problem çözmek, TYT Türkçe ve Matematik netlerinde tavan yapmanın kanıtlanmış tek yoludur.',
    icon: Sparkles,
  },
  {
    title: 'AYT Derinliği & Kavram Haritası',
    tip: 'AYT bilgi ve derinlik testidir. Formül kartları çıkar, konu eksiği bırakma ve haftalık branş denemeleriyle kazanım açıklarını tespit et.',
    icon: Lightbulb,
  },
  {
    title: 'YÖK Atlas Sıralama Disiplini',
    tip: 'Sadece puana değil, Türkiye başarı sırasına odaklan. Standart sapması yüksek zor testlerdeki doğrular seni binlerce kişinin önüne geçirir.',
    icon: Award,
  },
];

export function FocusMotivationalQuotes() {
  const { isYks, isLise } = useGradeTier();
  const [index, setIndex] = useState(0);

  const tipsList = isYks ? YKS_TIPS : isLise ? LISE_TIPS : LGS_TIPS;
  const badgeLabel = isYks
    ? '💡 Günün YKS & TYT Odaklanma İpucu'
    : isLise
    ? '💡 Günün Lise Yazılı & OBP İpucu'
    : '💡 Günün LGS Odaklanma İpucu';

  useEffect(() => {
    setIndex(0);
  }, [isYks, isLise]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tipsList.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [tipsList.length]);

  const current = tipsList[index] || tipsList[0];
  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 p-5 dark:border-indigo-900/40 dark:from-indigo-950/30 dark:to-slate-900">
      <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-xs font-black uppercase tracking-wider">
          {badgeLabel}
        </span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-white">
        {current.title}
      </h4>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {current.tip}
      </p>

      <div className="mt-3 flex gap-1 justify-end">
        {tipsList.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`İpucu ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-5 bg-indigo-600' : 'w-1.5 bg-indigo-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
