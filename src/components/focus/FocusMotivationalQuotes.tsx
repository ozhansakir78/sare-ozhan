'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, Target } from 'lucide-react';

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

export function FocusMotivationalQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LGS_TIPS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const current = LGS_TIPS[index];
  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 p-5 dark:border-indigo-900/40 dark:from-indigo-950/30 dark:to-slate-900">
      <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-xs font-black uppercase tracking-wider">
          💡 Günün LGS Odaklanma İpucu
        </span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-white">
        {current.title}
      </h4>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {current.tip}
      </p>

      <div className="mt-3 flex gap-1 justify-end">
        {LGS_TIPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-5 bg-indigo-600' : 'w-1.5 bg-indigo-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
