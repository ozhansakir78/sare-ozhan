'use client';

import React, { useState } from 'react';
import { CustomExamGeneratorModal } from '@/components/exam/CustomExamGeneratorModal';
import { useGradeTier } from '@/lib/grade-tier';
import { Sparkles, ArrowRight, Wand2, School, GraduationCap, Trophy, Compass, Layers } from 'lucide-react';

export function CustomExamBanner() {
  const { isLise1, isLise2, isLise3, isYks, isLgs, config } = useGradeTier();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    isYks ? 'ayt-matematik' : isLise3 ? 'ileri-matematik' : isLise2 ? 'matematik' : isLise1 ? 'edebiyat' : 'matematik'
  );

  const openWithCourse = (course: string) => {
    setSelectedCourse(course);
    setIsOpen(true);
  };

  const bannerBadge = isYks
    ? 'ÖSYM YKS (TYT/AYT) Yapay Zekâ Soru Üretici'
    : isLise3
    ? '11. Sınıf Alan & Erken TYT Soru Üretici'
    : isLise2
    ? '10. Sınıf MEB Yazılı Soru Üretici'
    : isLise1
    ? '9. Sınıf MEB Yazılı Soru Üretici'
    : 'Yapay Zekâ Destekli LGS Soru Üretici';

  const bannerTitle = isYks ? (
    <>
      YKS (TYT/AYT) Eksik Olduğun Konudan <br className="hidden sm:inline" />
      <span className="bg-gradient-to-r from-rose-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
        Özel Soru &amp; Deneme
      </span>{' '}
      Oluştur!
    </>
  ) : isLise3 ? (
    <>
      11. Sınıf Eksik Olduğun Konudan <br className="hidden sm:inline" />
      <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-200 bg-clip-text text-transparent">
        Özel Alan Prova Testi
      </span>{' '}
      Oluştur!
    </>
  ) : isLise2 ? (
    <>
      10. Sınıf Eksik Olduğun Konudan <br className="hidden sm:inline" />
      <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
        Özel Ortak Yazılı Provası
      </span>{' '}
      Oluştur!
    </>
  ) : isLise1 ? (
    <>
      9. Sınıf Eksik Olduğun Konudan <br className="hidden sm:inline" />
      <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
        Özel Ortak Yazılı Provası
      </span>{' '}
      Oluştur!
    </>
  ) : (
    <>
      LGS Eksik Olduğun Konudan <br className="hidden sm:inline" />
      <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
        Özel Pekiştirme Testi
      </span>{' '}
      Oluştur!
    </>
  );

  const bannerDesc = isYks
    ? 'İster TYT Paragraf veya Temel Matematik, ister AYT Matematik (Türev/İntegral), Fizik, Kimya veya Edebiyat... Dilediğin dersi, konuyu ve soru sayısını seç. ÖSYM 5 seçenekli soru standardında anında hazırlansın!'
    : isLise3
    ? 'İster İleri Matematik (Trigonometri), ister İleri Fizik, Kimya veya Edebiyat... 11. sınıf MEB açık uçlu ve çoktan seçmeli kazanımlarına uygun sorular anında hazırlansın!'
    : isLise2
    ? 'İster 10. sınıf Matematik (Polinomlar/Fonksiyonlar), ister Fizik veya Biyoloji... MEB ortak yazılı senaryolarına tam uyumlu sorular anında hazırlansın!'
    : isLise1
    ? 'İster Türk Dili ve Edebiyatı (Edebiyat 70 Barajı), ister Mantık & Kümeler veya Fizik Özkütle... 9. sınıf MEB senaryolarına tam uyumlu sorular anında hazırlansın!'
    : 'İster sadece Çarpanlar ve Katlar, ister Mevsimler ve İklim veya Fiilimsiler... MEB 2027 kazanımlarına uygun, daha önce çözmediğin yepyeni sorular anında hazırlansın!';

  const gradientClass = isYks
    ? 'border-rose-500/30 bg-gradient-to-r from-rose-950 via-slate-900 to-orange-950'
    : isLise3
    ? 'border-blue-500/30 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950'
    : isLise2
    ? 'border-purple-500/30 bg-gradient-to-r from-purple-950 via-slate-900 to-violet-950'
    : isLise1
    ? 'border-emerald-500/30 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950'
    : 'border-indigo-200/80 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 dark:border-indigo-900/50';

  return (
    <>
      <div className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 text-white shadow-xl transition ${gradientClass}`}>
        {/* Arka plan ışık efekti */}
        <div
          className={`absolute top-0 right-0 -mt-10 -mr-10 h-60 w-60 rounded-full blur-3xl pointer-events-none ${
            isYks
              ? 'bg-rose-500/20'
              : isLise3
              ? 'bg-blue-500/20'
              : isLise2
              ? 'bg-purple-500/20'
              : isLise1
              ? 'bg-emerald-500/20'
              : 'bg-violet-500/20'
          }`}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl space-y-2.5">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                isYks
                  ? 'bg-rose-500/20 border-rose-400/30 text-rose-300'
                  : isLise3
                  ? 'bg-blue-500/20 border-blue-400/30 text-blue-300'
                  : isLise2
                  ? 'bg-purple-500/20 border-purple-400/30 text-purple-300'
                  : isLise1
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-indigo-500/20 border-indigo-400/30 text-indigo-300'
              }`}
            >
              <Wand2 className="h-3.5 w-3.5 text-amber-400" />
              <span>{bannerBadge}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              {bannerTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {bannerDesc}
            </p>

            {/* Hızlı Ders Seçim Butonları */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Hızlı Başlat:</span>

              {isYks ? (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('ayt-matematik')}
                    className="rounded-xl border border-rose-500/40 bg-rose-950/60 hover:bg-rose-800/80 px-2.5 py-1 text-xs font-bold text-rose-200 transition cursor-pointer"
                  >
                    📐 AYT Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('tyt-matematik')}
                    className="rounded-xl border border-amber-500/40 bg-amber-950/60 hover:bg-amber-800/80 px-2.5 py-1 text-xs font-bold text-amber-200 transition cursor-pointer"
                  >
                    🔢 TYT Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('ayt-fizik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    ⚡ AYT Fizik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('ayt-edebiyat')}
                    className="rounded-xl border border-pink-500/40 bg-pink-950/60 hover:bg-pink-800/80 px-2.5 py-1 text-xs font-bold text-pink-200 transition cursor-pointer"
                  >
                    📚 AYT Edebiyat
                  </button>
                </>
              ) : isLise3 ? (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('ileri-matematik')}
                    className="rounded-xl border border-blue-500/40 bg-blue-950/60 hover:bg-blue-800/80 px-2.5 py-1 text-xs font-bold text-blue-200 transition cursor-pointer"
                  >
                    📐 İleri Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('ileri-fizik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    ⚡ İleri Fizik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('edebiyat')}
                    className="rounded-xl border border-rose-500/40 bg-rose-950/60 hover:bg-rose-800/80 px-2.5 py-1 text-xs font-bold text-rose-200 transition cursor-pointer"
                  >
                    📖 Edebiyat (70 Barajı)
                  </button>
                </>
              ) : isLise2 ? (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('matematik')}
                    className="rounded-xl border border-purple-500/40 bg-purple-950/60 hover:bg-purple-800/80 px-2.5 py-1 text-xs font-bold text-purple-200 transition cursor-pointer"
                  >
                    📐 10. Sınıf Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('fizik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    ⚡ Fizik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('edebiyat')}
                    className="rounded-xl border border-rose-500/40 bg-rose-950/60 hover:bg-rose-800/80 px-2.5 py-1 text-xs font-bold text-rose-200 transition cursor-pointer"
                  >
                    📖 Edebiyat
                  </button>
                </>
              ) : isLise1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('edebiyat')}
                    className="rounded-xl border border-rose-500/40 bg-rose-950/60 hover:bg-rose-800/80 px-2.5 py-1 text-xs font-bold text-rose-200 transition cursor-pointer"
                  >
                    📖 Edebiyat (70 Barajı)
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('matematik')}
                    className="rounded-xl border border-blue-500/40 bg-blue-950/60 hover:bg-blue-800/80 px-2.5 py-1 text-xs font-bold text-blue-200 transition cursor-pointer"
                  >
                    📐 Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('fizik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    ⚡ Fizik
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('matematik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    📐 LGS Matematik
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('fen')}
                    className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-800/80 px-2.5 py-1 text-xs font-bold text-emerald-200 transition cursor-pointer"
                  >
                    🔬 Fen Bilimleri
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('turkce')}
                    className="rounded-xl border border-blue-500/40 bg-blue-950/60 hover:bg-blue-800/80 px-2.5 py-1 text-xs font-bold text-blue-200 transition cursor-pointer"
                  >
                    📖 Türkçe
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sağ Kolon: Aksiyon Butonu */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-xs sm:text-sm font-black text-slate-900 shadow-xl hover:bg-slate-100 transition transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Kendi Denemeni Oluştur</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>
            <span className="text-[11px] text-slate-300 font-medium">
              Saniyeler içinde hazırlanır &bull; Anında çöz
            </span>
          </div>
        </div>
      </div>

      {/* AI Sınav Oluşturma Modalı */}
      <CustomExamGeneratorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultCourse={selectedCourse}
      />
    </>
  );
}
