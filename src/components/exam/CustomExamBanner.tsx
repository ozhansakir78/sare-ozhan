'use client';

import React, { useState } from 'react';
import { CustomExamGeneratorModal } from '@/components/exam/CustomExamGeneratorModal';
import { useGradeTier } from '@/lib/grade-tier';
import { Sparkles, ArrowRight, Wand2, School, GraduationCap } from 'lucide-react';

export function CustomExamBanner() {
  const { isLise1 } = useGradeTier();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(isLise1 ? 'edebiyat' : 'matematik');

  const openWithCourse = (course: string) => {
    setSelectedCourse(course);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 text-white shadow-xl transition ${
          isLise1
            ? 'border-emerald-500/30 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950'
            : 'border-indigo-200/80 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 dark:border-indigo-900/50'
        }`}
      >
        {/* Arka plan ışık efekti */}
        <div
          className={`absolute top-0 right-0 -mt-10 -mr-10 h-60 w-60 rounded-full blur-3xl pointer-events-none ${
            isLise1 ? 'bg-emerald-500/20' : 'bg-violet-500/20'
          }`}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl space-y-2.5">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                isLise1
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-indigo-500/20 border-indigo-400/30 text-indigo-300'
              }`}
            >
              <Wand2 className="h-3.5 w-3.5 text-amber-400" />
              <span>{isLise1 ? '9. Sınıf MEB Yazılı Soru Üretici' : 'Yapay Zekâ Destekli Soru Üretici'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              {isLise1 ? (
                <>
                  9. Sınıf Eksik Olduğun Konudan <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                    Özel Ortak Yazılı Provası
                  </span>{' '}
                  Oluştur!
                </>
              ) : (
                <>
                  Eksik Olduğun Konudan <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                    Özel Pekiştirme Testi
                  </span>{' '}
                  Oluştur!
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isLise1 ? (
                <>
                  İster <em>&quot;Türk Dili ve Edebiyatı (Maupassant/Çehov, İsimler)&quot;</em>, ister <em>&quot;Mantık &amp; Kümeler&quot;</em>, <em>&quot;Fizik Özkütle&quot;</em>... Dilediğin dersi, konuyu ve soru sayısını seç. 9. sınıf MEB senaryolarına tam uyumlu yepyeni sorular anında hazırlansın!
                </>
              ) : (
                <>
                  İster sadece <em>&quot;Çarpanlar ve Katlar&quot;</em>, ister <em>&quot;Mevsimler ve İklim&quot;</em>... Dilediğin dersi, konuyu ve soru sayısını seç. MEB 2027 kazanımlarına uygun, daha önce çözmediğin yepyeni sorular anında hazırlansın!
                </>
              )}
            </p>

            {/* Hızlı Ders Seçim Butonları */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Hızlı Başlat:</span>
              {isLise1 ? (
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
                  <button
                    type="button"
                    onClick={() => openWithCourse('kimya')}
                    className="rounded-xl border border-violet-500/40 bg-violet-950/60 hover:bg-violet-800/80 px-2.5 py-1 text-xs font-bold text-violet-200 transition cursor-pointer"
                  >
                    🧪 Kimya
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('biyoloji')}
                    className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-800/80 px-2.5 py-1 text-xs font-bold text-emerald-200 transition cursor-pointer"
                  >
                    🧬 Biyoloji
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openWithCourse('matematik')}
                    className="rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-800/80 px-2.5 py-1 text-xs font-bold text-indigo-200 transition cursor-pointer"
                  >
                    📐 Matematik
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
                    📚 Türkçe
                  </button>
                  <button
                    type="button"
                    onClick={() => openWithCourse('all')}
                    className="rounded-xl border border-amber-500/40 bg-amber-950/60 hover:bg-amber-800/80 px-2.5 py-1 text-xs font-bold text-amber-200 transition cursor-pointer"
                  >
                    ⚡ Genel Karma
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-black transition cursor-pointer shadow-xl ${
                isLise1
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isLise1 ? 'Ders & Konu Seçerek Prova Sınavı Üret' : 'Ders ve Konu Seçerek Test Üret'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CustomExamGeneratorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultCourse={selectedCourse}
      />
    </>
  );
}
