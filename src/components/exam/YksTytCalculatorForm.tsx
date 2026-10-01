'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  calculateYksTyt,
  TytSubjectInput,
  YksTytCalculationResult,
  TYT_SUBJECT_CONFIG,
} from '@/lib/yks-tyt-calculation';
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Landmark,
  Sparkles,
  RotateCcw,
  Clock,
  Target,
  Trophy,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SubjectState {
  correct: number;
  incorrect: number;
}

export function YksTytCalculatorForm() {
  const [turkce, setTurkce] = useState<SubjectState>({ correct: 30, incorrect: 6 });
  const [sosyal, setSosyal] = useState<SubjectState>({ correct: 14, incorrect: 3 });
  const [matematik, setMatematik] = useState<SubjectState>({ correct: 24, incorrect: 4 });
  const [fen, setFen] = useState<SubjectState>({ correct: 12, incorrect: 3 });

  const [diplomaGrade, setDiplomaGrade] = useState<number>(85);
  const [isBrokenObp, setIsBrokenObp] = useState<boolean>(false);

  // Dinamik Hesaplama
  const result: YksTytCalculationResult = calculateYksTyt({
    turkce,
    sosyal,
    matematik,
    fen,
    diplomaGrade,
    isBrokenObp,
  });

  const handleSubjectChange = (
    subject: 'turkce' | 'sosyal' | 'matematik' | 'fen',
    field: 'correct' | 'incorrect',
    valueStr: string
  ) => {
    const maxQ = TYT_SUBJECT_CONFIG[subject].questionCount;
    let val = parseInt(valueStr, 10);
    if (isNaN(val) || val < 0) val = 0;

    const setter = subject === 'turkce'
      ? setTurkce
      : subject === 'sosyal'
      ? setSosyal
      : subject === 'matematik'
      ? setMatematik
      : setFen;

    const current = subject === 'turkce'
      ? turkce
      : subject === 'sosyal'
      ? sosyal
      : subject === 'matematik'
      ? matematik
      : fen;

    let newCorrect = field === 'correct' ? val : current.correct;
    let newIncorrect = field === 'incorrect' ? val : current.incorrect;

    if (field === 'correct') {
      newCorrect = Math.min(maxQ, newCorrect);
      if (newCorrect + newIncorrect > maxQ) {
        newIncorrect = maxQ - newCorrect;
      }
    } else {
      newIncorrect = Math.min(maxQ, newIncorrect);
      if (newCorrect + newIncorrect > maxQ) {
        newCorrect = maxQ - newIncorrect;
      }
    }

    setter({ correct: newCorrect, incorrect: newIncorrect });
  };

  const loadPreset = (preset: 'tip' | 'hukuk' | 'sozel') => {
    if (preset === 'tip') {
      setTurkce({ correct: 36, incorrect: 3 });
      setSosyal({ correct: 16, incorrect: 3 });
      setMatematik({ correct: 37, incorrect: 2 });
      setFen({ correct: 18, incorrect: 1 });
      setDiplomaGrade(96);
      setIsBrokenObp(false);
    } else if (preset === 'hukuk') {
      setTurkce({ correct: 33, incorrect: 5 });
      setSosyal({ correct: 15, incorrect: 3 });
      setMatematik({ correct: 24, incorrect: 4 });
      setFen({ correct: 6, incorrect: 3 });
      setDiplomaGrade(88);
      setIsBrokenObp(false);
    } else if (preset === 'sozel') {
      setTurkce({ correct: 35, incorrect: 4 });
      setSosyal({ correct: 17, incorrect: 2 });
      setMatematik({ correct: 10, incorrect: 4 });
      setFen({ correct: 3, incorrect: 2 });
      setDiplomaGrade(84);
      setIsBrokenObp(false);
    }
  };

  const resetAll = () => {
    setTurkce({ correct: 0, incorrect: 0 });
    setSosyal({ correct: 0, incorrect: 0 });
    setMatematik({ correct: 0, incorrect: 0 });
    setFen({ correct: 0, incorrect: 0 });
    setDiplomaGrade(80);
    setIsBrokenObp(false);
  };

  return (
    <div className="space-y-8">
      {/* Üst Başlık & Hızlı Senaryo Butonları */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-rose-500" />
            <span>YKS TYT (120 Soru) Net &amp; Yerleştirme Puanı Hesaplayıcı</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Resmi ÖSYM katsayıları, 0.5 net baraj şartı, OBP diplomasi ve 165 dakika sınav süre modeli.
          </p>
        </div>

        {/* Hazır Senaryolar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => loadPreset('tip')}
            className="rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
          >
            🔬 Sayısal / Tıp (100+ Net)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('hukuk')}
            className="rounded-xl border border-purple-200 bg-purple-50/70 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition cursor-pointer dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300"
          >
            ⚖️ EA / Hukuk (75 Net)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('sozel')}
            className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition cursor-pointer dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
          >
            📜 Sözel (60 Net)
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 transition cursor-pointer dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
            title="Sıfırla"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Test Giriş Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TÜRKÇE (40 Soru) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Türkçe Testi
                </h3>
                <span className="text-[11px] text-slate-400">40 Soru | Katsayı: ~3.30</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400">
                {result.subjects.turkce.effectiveNet}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Doğru
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={turkce.correct}
                onChange={(e) => handleSubjectChange('turkce', 'correct', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">
                Yanlış
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={turkce.incorrect}
                onChange={(e) => handleSubjectChange('turkce', 'incorrect', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Boş
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                {result.subjects.turkce.empty}
              </div>
            </div>
          </div>
        </div>

        {/* TEMEL MATEMATİK (40 Soru) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Temel Matematik Testi
                </h3>
                <span className="text-[11px] text-slate-400">40 Soru (Geometri Dahil) | Katsayı: ~3.30</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                {result.subjects.matematik.effectiveNet}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Doğru
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={matematik.correct}
                onChange={(e) => handleSubjectChange('matematik', 'correct', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">
                Yanlış
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={matematik.incorrect}
                onChange={(e) => handleSubjectChange('matematik', 'incorrect', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Boş
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                {result.subjects.matematik.empty}
              </div>
            </div>
          </div>
        </div>

        {/* FEN BİLİMLERİ (20 Soru) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Fen Bilimleri Testi
                </h3>
                <span className="text-[11px] text-slate-400">Fizik (7), Kimya (7), Biyo (6) | Katsayı: ~3.40</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {result.subjects.fen.effectiveNet}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Doğru
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={fen.correct}
                onChange={(e) => handleSubjectChange('fen', 'correct', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">
                Yanlış
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={fen.incorrect}
                onChange={(e) => handleSubjectChange('fen', 'incorrect', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Boş
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                {result.subjects.fen.empty}
              </div>
            </div>
          </div>
        </div>

        {/* SOSYAL BİLİMLER (20 Soru) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sosyal Bilimler Testi
                </h3>
                <span className="text-[11px] text-slate-400">Tarih (5), Coğ (5), Fel (5), Din (5) | Katsayı: ~3.40</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                {result.subjects.sosyal.effectiveNet}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Doğru
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={sosyal.correct}
                onChange={(e) => handleSubjectChange('sosyal', 'correct', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">
                Yanlış
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={sosyal.incorrect}
                onChange={(e) => handleSubjectChange('sosyal', 'incorrect', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Boş
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                {result.subjects.sosyal.empty}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OBP (Ortaöğretim Başarı Puanı) Kartı */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                OBP &amp; Lise Diploma Notu Katkısı
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ÖSYM, diploma notunu 5 ile çarparak OBP&apos;yi bulur ve 0.12 (kırık ise 0.06) katsayı ile yerleştirme puanına ekler.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">Diploma Notu (50-100)</div>
              <input
                type="number"
                min="50"
                max="100"
                step="0.5"
                value={diplomaGrade}
                onChange={(e) => setDiplomaGrade(Number(e.target.value))}
                className="w-24 rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-black text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold uppercase text-slate-400">OBP Katkısı</div>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                +{result.obpContribution} Puan
              </div>
            </div>
          </div>
        </div>

        {/* Kırık OBP Switch */}
        <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
          <input
            type="checkbox"
            checked={isBrokenObp}
            onChange={(e) => setIsBrokenObp(e.target.checked)}
            className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-4 w-4"
          />
          <span className="font-medium">
            Önceki yıl bir üniversite programına yerleştim (Kırık OBP - Katkı yarıya düşer: x0.06)
          </span>
        </label>
      </section>

      {/* ================================================================== */}
      {/* SONUÇ VE SKOR PANOSU */}
      {/* ================================================================== */}
      <section className="rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-transparent p-6 sm:p-8 dark:border-rose-500/10 dark:bg-slate-900/60 space-y-6">
        {/* 0.5 Net Kuralı Uyarısı */}
        {!result.isEligibleForScore && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">ÖSYM 0.5 Net Baraj Şartı İhlali!</div>
              <div className="mt-1">{result.eligibilityMessage}</div>
            </div>
          </div>
        )}

        {/* Ana Puan Kartları */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Toplam Net</span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {result.totalNet}{' '}
              <span className="text-xs font-normal text-slate-400">/ 120</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              D: {result.totalCorrect} | Y: {result.totalIncorrect} | B: {result.totalEmpty}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ham TYT Puanı</span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {result.rawScore}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Taban: 100 | En Çok: 500.00
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Yerleştirme (Y-TYT)</span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {result.placementScore}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              OBP Katkısı: +{result.obpContribution} Puan
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tahmini Sıralama</span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ~{result.estimatedRank.toLocaleString('tr-TR')}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Dilim: %{result.estimatedPercentile} (3.15M Aday)
            </div>
          </div>
        </div>

        {/* 165 Dakika Süre & Pacing Modeli */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                165 Dakika İdeal Sınav Süre &amp; Turlama Dağılımı
              </span>
            </div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
              Soru Başına: ~82.5 Saniye
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-[11px] font-medium text-slate-400">Türkçe (40S)</div>
              <div className="mt-1 font-black text-slate-900 dark:text-white">
                {result.recommendedPacing.turkceMinutes} Dk
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-[11px] font-medium text-slate-400">Matematik (40S)</div>
              <div className="mt-1 font-black text-slate-900 dark:text-white">
                {result.recommendedPacing.matematikMinutes} Dk
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-[11px] font-medium text-slate-400">Fen Bilimleri (20S)</div>
              <div className="mt-1 font-black text-slate-900 dark:text-white">
                {result.recommendedPacing.fenMinutes} Dk
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-[11px] font-medium text-slate-400">Sosyal Bilimler (20S)</div>
              <div className="mt-1 font-black text-slate-900 dark:text-white">
                {result.recommendedPacing.sosyalMinutes} Dk
              </div>
            </div>

            <div className="rounded-xl bg-rose-50 p-2.5 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium">Turlama &amp; Kontrol</div>
              <div className="mt-1 font-black">
                {result.recommendedPacing.reviewMinutes} Dk
              </div>
            </div>
          </div>
        </div>

        {/* Tercih Hakları & Koçluk Analizleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tercih Barajları &amp; Başvuru Hakları
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span>2 Yıllık Ön Lisans Üniversite Programları</span>
                <span className={`font-bold ${result.eligibleForAssociateDegree ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {result.eligibleForAssociateDegree ? 'Tercih Edebilir ✅' : 'Baraj Altı ❌'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span>Polis Meslek Yüksekokulu (PMYO - 250+ Ham)</span>
                <span className={`font-bold ${result.eligibleForPmyo ? 'Başvurabilir ✅' : 'Puan Yetersiz ❌'}`}>
                  {result.eligibleForPmyo ? 'Başvurabilir ✅' : 'Puan Yetersiz ❌'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span>Özel Yetenek / Beden Eğitimi (BESYO)</span>
                <span className={`font-bold ${result.eligibleForBesyo ? 'Başvurabilir ✅' : 'Puan Yetersiz ❌'}`}>
                  {result.eligibleForBesyo ? 'Başvurabilir ✅' : 'Puan Yetersiz ❌'}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Koçluk Değerlendirmesi &amp; Güçlü Yönler
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                En Yüksek Başarı Oranı: <span className="text-rose-600 dark:text-rose-400 font-bold">{result.strongestSubject}</span>
              </div>
              {result.coachingNotes.map((note, idx) => (
                <div key={idx} className="leading-relaxed">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deneme Çöz Butonu */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Netlerini geliştirmek için platformumuzdaki doğrulanmış TYT &amp; MEB sınavlarını çözebilirsin.
          </div>
          <Link
            href="/deneme-coz"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:from-rose-700 hover:to-pink-700 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>Online TYT Provasını Çöz</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
