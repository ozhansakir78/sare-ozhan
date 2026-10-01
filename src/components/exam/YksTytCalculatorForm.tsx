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
  calculateYksAyt,
  YksScoreType,
  YksAytCalculationResult,
} from '@/lib/yks-ayt-calculation';
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
  Globe2,
  Compass,
  Layers,
  Scale,
  Stethoscope,
} from 'lucide-react';

interface SubjectState {
  correct: number;
  incorrect: number;
}

export function YksTytCalculatorForm() {
  // Sınav Modu: TYT mi yoksa AYT / YDT mi?
  const [activeExamTab, setActiveExamTab] = useState<'tyt' | 'ayt'>('tyt');
  const [selectedAytTrack, setSelectedAytTrack] = useState<YksScoreType>('SAY');

  // TYT Testleri
  const [turkce, setTurkce] = useState<SubjectState>({ correct: 30, incorrect: 6 });
  const [sosyal, setSosyal] = useState<SubjectState>({ correct: 14, incorrect: 3 });
  const [matematik, setMatematik] = useState<SubjectState>({ correct: 24, incorrect: 4 });
  const [fen, setFen] = useState<SubjectState>({ correct: 12, incorrect: 3 });

  // AYT Testleri
  const [aytMat, setAytMat] = useState<SubjectState>({ correct: 28, incorrect: 4 });
  const [aytFiz, setAytFiz] = useState<SubjectState>({ correct: 10, incorrect: 2 });
  const [aytKim, setAytKim] = useState<SubjectState>({ correct: 9, incorrect: 2 });
  const [aytBiy, setAytBiy] = useState<SubjectState>({ correct: 9, incorrect: 2 });

  const [aytEde, setAytEde] = useState<SubjectState>({ correct: 18, incorrect: 3 });
  const [aytTar1, setAytTar1] = useState<SubjectState>({ correct: 7, incorrect: 2 });
  const [aytCog1, setAytCog1] = useState<SubjectState>({ correct: 4, incorrect: 1 });

  const [aytTar2, setAytTar2] = useState<SubjectState>({ correct: 8, incorrect: 2 });
  const [aytCog2, setAytCog2] = useState<SubjectState>({ correct: 8, incorrect: 2 });
  const [aytFel, setAytFel] = useState<SubjectState>({ correct: 9, incorrect: 2 });
  const [aytDin, setAytDin] = useState<SubjectState>({ correct: 5, incorrect: 1 });

  const [ydt, setYdt] = useState<SubjectState>({ correct: 68, incorrect: 6 });

  // OBP ve Mezuniyet
  const [diplomaGrade, setDiplomaGrade] = useState<number>(85);
  const [isBrokenObp, setIsBrokenObp] = useState<boolean>(false);

  // Dinamik Hesaplamalar
  const tytResult: YksTytCalculationResult = calculateYksTyt({
    turkce,
    sosyal,
    matematik,
    fen,
    diplomaGrade,
    isBrokenObp,
  });

  const aytResult: YksAytCalculationResult = calculateYksAyt({
    tyt: { turkce, sosyal, matematik, fen },
    aytMatematik: aytMat,
    aytFen: { fizik: aytFiz, kimya: aytKim, biyoloji: aytBiy },
    aytEdSos1: { edebiyat: aytEde, tarih1: aytTar1, cografya1: aytCog1 },
    aytSos2: { tarih2: aytTar2, cografya2: aytCog2, felsefe: aytFel, din: aytDin },
    ydt,
    diplomaGrade,
    isBrokenObp,
  });

  const handleTytChange = (
    subject: 'turkce' | 'sosyal' | 'matematik' | 'fen',
    field: 'correct' | 'incorrect',
    valueStr: string
  ) => {
    const maxQ = TYT_SUBJECT_CONFIG[subject].questionCount;
    let val = parseInt(valueStr, 10);
    if (isNaN(val) || val < 0) val = 0;

    const setter = subject === 'turkce' ? setTurkce : subject === 'sosyal' ? setSosyal : subject === 'matematik' ? setMatematik : setFen;
    const current = subject === 'turkce' ? turkce : subject === 'sosyal' ? sosyal : subject === 'matematik' ? matematik : fen;

    let newCorrect = field === 'correct' ? val : current.correct;
    let newIncorrect = field === 'incorrect' ? val : current.incorrect;

    if (field === 'correct') {
      newCorrect = Math.min(maxQ, newCorrect);
      if (newCorrect + newIncorrect > maxQ) newIncorrect = maxQ - newCorrect;
    } else {
      newIncorrect = Math.min(maxQ, newIncorrect);
      if (newCorrect + newIncorrect > maxQ) newCorrect = maxQ - newIncorrect;
    }
    setter({ correct: newCorrect, incorrect: newIncorrect });
  };

  const handleGenericChange = (
    setter: React.Dispatch<React.SetStateAction<SubjectState>>,
    current: SubjectState,
    maxQ: number,
    field: 'correct' | 'incorrect',
    valueStr: string
  ) => {
    let val = parseInt(valueStr, 10);
    if (isNaN(val) || val < 0) val = 0;

    let newCorrect = field === 'correct' ? val : current.correct;
    let newIncorrect = field === 'incorrect' ? val : current.incorrect;

    if (field === 'correct') {
      newCorrect = Math.min(maxQ, newCorrect);
      if (newCorrect + newIncorrect > maxQ) newIncorrect = maxQ - newCorrect;
    } else {
      newIncorrect = Math.min(maxQ, newIncorrect);
      if (newCorrect + newIncorrect > maxQ) newCorrect = maxQ - newIncorrect;
    }
    setter({ correct: newCorrect, incorrect: newIncorrect });
  };

  const loadPreset = (preset: 'tip' | 'hukuk' | 'sozel' | 'dil') => {
    if (preset === 'tip') {
      setSelectedAytTrack('SAY');
      setTurkce({ correct: 36, incorrect: 3 });
      setSosyal({ correct: 16, incorrect: 3 });
      setMatematik({ correct: 37, incorrect: 2 });
      setFen({ correct: 18, incorrect: 1 });
      setAytMat({ correct: 36, incorrect: 2 });
      setAytFiz({ correct: 12, incorrect: 2 });
      setAytKim({ correct: 12, incorrect: 1 });
      setAytBiy({ correct: 11, incorrect: 2 });
      setDiplomaGrade(96);
      setIsBrokenObp(false);
    } else if (preset === 'hukuk') {
      setSelectedAytTrack('EA');
      setTurkce({ correct: 34, incorrect: 4 });
      setSosyal({ correct: 16, incorrect: 2 });
      setMatematik({ correct: 26, incorrect: 3 });
      setFen({ correct: 7, incorrect: 2 });
      setAytMat({ correct: 28, incorrect: 3 });
      setAytEde({ correct: 21, incorrect: 2 });
      setAytTar1({ correct: 8, incorrect: 1 });
      setAytCog1({ correct: 5, incorrect: 1 });
      setDiplomaGrade(90);
      setIsBrokenObp(false);
    } else if (preset === 'sozel') {
      setSelectedAytTrack('SOZ');
      setTurkce({ correct: 35, incorrect: 3 });
      setSosyal({ correct: 17, incorrect: 2 });
      setMatematik({ correct: 12, incorrect: 4 });
      setFen({ correct: 4, incorrect: 2 });
      setAytEde({ correct: 22, incorrect: 2 });
      setAytTar1({ correct: 8, incorrect: 2 });
      setAytCog1({ correct: 5, incorrect: 1 });
      setAytTar2({ correct: 9, incorrect: 2 });
      setAytCog2({ correct: 9, incorrect: 2 });
      setAytFel({ correct: 10, incorrect: 2 });
      setAytDin({ correct: 5, incorrect: 1 });
      setDiplomaGrade(86);
      setIsBrokenObp(false);
    } else if (preset === 'dil') {
      setSelectedAytTrack('DIL');
      setTurkce({ correct: 35, incorrect: 4 });
      setSosyal({ correct: 15, incorrect: 3 });
      setMatematik({ correct: 15, incorrect: 4 });
      setFen({ correct: 5, incorrect: 2 });
      setYdt({ correct: 74, incorrect: 4 });
      setDiplomaGrade(94);
      setIsBrokenObp(false);
    }
  };

  const resetAll = () => {
    setTurkce({ correct: 0, incorrect: 0 });
    setSosyal({ correct: 0, incorrect: 0 });
    setMatematik({ correct: 0, incorrect: 0 });
    setFen({ correct: 0, incorrect: 0 });
    setAytMat({ correct: 0, incorrect: 0 });
    setAytFiz({ correct: 0, incorrect: 0 });
    setAytKim({ correct: 0, incorrect: 0 });
    setAytBiy({ correct: 0, incorrect: 0 });
    setAytEde({ correct: 0, incorrect: 0 });
    setAytTar1({ correct: 0, incorrect: 0 });
    setAytCog1({ correct: 0, incorrect: 0 });
    setAytTar2({ correct: 0, incorrect: 0 });
    setAytCog2({ correct: 0, incorrect: 0 });
    setAytFel({ correct: 0, incorrect: 0 });
    setAytDin({ correct: 0, incorrect: 0 });
    setYdt({ correct: 0, incorrect: 0 });
    setDiplomaGrade(80);
    setIsBrokenObp(false);
  };

  // Aktif AYT puan türü sonucu
  const activeAytScore = selectedAytTrack === 'SAY'
    ? aytResult.scores.say
    : selectedAytTrack === 'EA'
    ? aytResult.scores.ea
    : selectedAytTrack === 'SOZ'
    ? aytResult.scores.soz
    : aytResult.scores.dil;

  return (
    <div className="space-y-8">
      {/* Sınav Modu Sekmesi: TYT & AYT/YDT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveExamTab('tyt')}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeExamTab === 'tyt'
                ? 'bg-rose-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>TYT (Temel Yeterlilik - 120 Soru)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveExamTab('ayt')}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeExamTab === 'ayt'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Trophy className="h-4 w-4 text-purple-200" />
            <span>AYT &amp; YDT (Alan Yeterlilik - %40 TYT + %60 AYT)</span>
          </button>
        </div>

        {/* Hazır Senaryolar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => loadPreset('tip')}
            className="rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
          >
            🔬 Sayısal / Tıp
          </button>
          <button
            type="button"
            onClick={() => loadPreset('hukuk')}
            className="rounded-xl border border-purple-200 bg-purple-50/70 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition cursor-pointer dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300"
          >
            ⚖️ EA / Hukuk
          </button>
          <button
            type="button"
            onClick={() => loadPreset('sozel')}
            className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition cursor-pointer dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
          >
            📜 Sözel
          </button>
          <button
            type="button"
            onClick={() => loadPreset('dil')}
            className="rounded-xl border border-sky-200 bg-sky-50/70 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 transition cursor-pointer dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300"
          >
            🌍 Dil / YDT
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

      {/* ================================================================== */}
      {/* 1. SEKME: TYT TEST GİRİŞLERİ */}
      {/* ================================================================== */}
      {activeExamTab === 'tyt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TÜRKÇE (40 Soru) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Türkçe Testi</h3>
                    <span className="text-[11px] text-slate-400">40 Soru | Katsayı: ~3.30</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-rose-600 dark:text-rose-400">{tytResult.subjects.turkce.effectiveNet}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={turkce.correct}
                    onChange={(e) => handleTytChange('turkce', 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={turkce.incorrect}
                    onChange={(e) => handleTytChange('turkce', 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {tytResult.subjects.turkce.empty}
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
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Temel Matematik Testi</h3>
                    <span className="text-[11px] text-slate-400">40 Soru (Geometri Dahil) | Katsayı: ~3.30</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400">{tytResult.subjects.matematik.effectiveNet}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={matematik.correct}
                    onChange={(e) => handleTytChange('matematik', 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={matematik.incorrect}
                    onChange={(e) => handleTytChange('matematik', 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {tytResult.subjects.matematik.empty}
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
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fen Bilimleri Testi</h3>
                    <span className="text-[11px] text-slate-400">Fizik (7), Kimya (7), Biyo (6) | Katsayı: ~3.40</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{tytResult.subjects.fen.effectiveNet}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={fen.correct}
                    onChange={(e) => handleTytChange('fen', 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={fen.incorrect}
                    onChange={(e) => handleTytChange('fen', 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {tytResult.subjects.fen.empty}
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
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sosyal Bilimler Testi</h3>
                    <span className="text-[11px] text-slate-400">Tarih (5), Coğ (5), Fel (5), Din (5) | Katsayı: ~3.40</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">{tytResult.subjects.sosyal.effectiveNet}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={sosyal.correct}
                    onChange={(e) => handleTytChange('sosyal', 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={sosyal.incorrect}
                    onChange={(e) => handleTytChange('sosyal', 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {tytResult.subjects.sosyal.empty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. SEKME: AYT & YDT TEST GİRİŞLERİ */}
      {/* ================================================================== */}
      {activeExamTab === 'ayt' && (
        <div className="space-y-6">
          {/* Puan Türü Seçici */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Hedef Alanını Seç:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedAytTrack('SAY')}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedAytTrack === 'SAY'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                🔬 Sayısal (Mat + Fen)
              </button>
              <button
                type="button"
                onClick={() => setSelectedAytTrack('EA')}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedAytTrack === 'EA'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                ⚖️ Eşit Ağırlık (Mat + Ed-Sos1)
              </button>
              <button
                type="button"
                onClick={() => setSelectedAytTrack('SOZ')}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedAytTrack === 'SOZ'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                📜 Sözel (Ed-Sos1 + Sos2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedAytTrack('DIL')}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedAytTrack === 'DIL'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                🌍 Yabancı Dil (YDT 80S)
              </button>
            </div>
          </div>

          {/* AYT Matematik (SAY ve EA İçin) */}
          {(selectedAytTrack === 'SAY' || selectedAytTrack === 'EA') && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AYT Matematik &amp; Geometri Testi</h3>
                    <span className="text-[11px] text-slate-400">40 Soru (AYT Katsayısı: 3.00)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                    {aytResult.testNets.aytMatematik}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={aytMat.correct}
                    onChange={(e) => handleGenericChange(setAytMat, aytMat, 40, 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={aytMat.incorrect}
                    onChange={(e) => handleGenericChange(setAytMat, aytMat, 40, 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {40 - (aytMat.correct + aytMat.incorrect)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AYT Fen Bilimleri (SAY İçin: Fizik, Kimya, Biyoloji) */}
          {selectedAytTrack === 'SAY' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AYT Fen Bilimleri Testi</h3>
                    <span className="text-[11px] text-slate-400">Toplam 40 Soru (Fizik 14, Kimya 13, Biyo 13)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Toplam Fen Net</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {aytResult.testNets.aytFenTotal}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Fizik */}
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Fizik (14S)</span>
                    <span className="text-emerald-600">{aytResult.testNets.aytFizik} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="14"
                      placeholder="D"
                      value={aytFiz.correct}
                      onChange={(e) => handleGenericChange(setAytFiz, aytFiz, 14, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="14"
                      placeholder="Y"
                      value={aytFiz.incorrect}
                      onChange={(e) => handleGenericChange(setAytFiz, aytFiz, 14, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Kimya */}
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Kimya (13S)</span>
                    <span className="text-emerald-600">{aytResult.testNets.aytKimya} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="13"
                      placeholder="D"
                      value={aytKim.correct}
                      onChange={(e) => handleGenericChange(setAytKim, aytKim, 13, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="13"
                      placeholder="Y"
                      value={aytKim.incorrect}
                      onChange={(e) => handleGenericChange(setAytKim, aytKim, 13, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Biyoloji */}
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Biyoloji (13S)</span>
                    <span className="text-emerald-600">{aytResult.testNets.aytBiyoloji} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="13"
                      placeholder="D"
                      value={aytBiy.correct}
                      onChange={(e) => handleGenericChange(setAytBiy, aytBiy, 13, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="13"
                      placeholder="Y"
                      value={aytBiy.incorrect}
                      onChange={(e) => handleGenericChange(setAytBiy, aytBiy, 13, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AYT Edebiyat - Sosyal-1 (EA ve SOZ İçin) */}
          {(selectedAytTrack === 'EA' || selectedAytTrack === 'SOZ') && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AYT Türk Dili ve Edebiyatı - Sosyal-1</h3>
                    <span className="text-[11px] text-slate-400">Toplam 40 Soru (Edebiyat 24, Tarih-1 10, Coğrafya-1 6)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Toplam Net</div>
                  <div className="text-xl font-black text-rose-600 dark:text-rose-400">
                    {aytResult.testNets.aytEdSos1Total}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Edebiyat (24S)</span>
                    <span className="text-rose-600">{aytResult.testNets.aytEdebiyat} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={aytEde.correct}
                      onChange={(e) => handleGenericChange(setAytEde, aytEde, 24, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={aytEde.incorrect}
                      onChange={(e) => handleGenericChange(setAytEde, aytEde, 24, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Tarih-1 (10S)</span>
                    <span className="text-rose-600">{aytResult.testNets.aytTarih1} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={aytTar1.correct}
                      onChange={(e) => handleGenericChange(setAytTar1, aytTar1, 10, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={aytTar1.incorrect}
                      onChange={(e) => handleGenericChange(setAytTar1, aytTar1, 10, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex justify-between">
                    <span>Coğrafya-1 (6S)</span>
                    <span className="text-rose-600">{aytResult.testNets.aytCografya1} Net</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={aytCog1.correct}
                      onChange={(e) => handleGenericChange(setAytCog1, aytCog1, 6, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={aytCog1.incorrect}
                      onChange={(e) => handleGenericChange(setAytCog1, aytCog1, 6, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AYT Sosyal-2 (Sadece SÖZ İçin) */}
          {selectedAytTrack === 'SOZ' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AYT Sosyal Bilimler-2 Testi</h3>
                    <span className="text-[11px] text-slate-400">Toplam 40 Soru (Tarih-2, Coğrafya-2, Felsefe Grubu, Din)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Toplam Net</div>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {aytResult.testNets.aytSos2Total}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-100 p-2.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex justify-between">
                    <span>Tarih-2 (11S)</span>
                    <span className="text-amber-600">{aytResult.testNets.aytTarih2}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={aytTar2.correct}
                      onChange={(e) => handleGenericChange(setAytTar2, aytTar2, 11, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={aytTar2.incorrect}
                      onChange={(e) => handleGenericChange(setAytTar2, aytTar2, 11, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-2.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex justify-between">
                    <span>Coğrafya-2 (11S)</span>
                    <span className="text-amber-600">{aytResult.testNets.aytCografya2}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={aytCog2.correct}
                      onChange={(e) => handleGenericChange(setAytCog2, aytCog2, 11, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={aytCog2.incorrect}
                      onChange={(e) => handleGenericChange(setAytCog2, aytCog2, 11, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-2.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex justify-between">
                    <span>Felsefe (12S)</span>
                    <span className="text-amber-600">{aytResult.testNets.aytFelsefe}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={aytFel.correct}
                      onChange={(e) => handleGenericChange(setAytFel, aytFel, 12, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={aytFel.incorrect}
                      onChange={(e) => handleGenericChange(setAytFel, aytFel, 12, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-2.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex justify-between">
                    <span>Din Kültürü (6S)</span>
                    <span className="text-amber-600">{aytResult.testNets.aytDin}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={aytDin.correct}
                      onChange={(e) => handleGenericChange(setAytDin, aytDin, 6, 'correct', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={aytDin.incorrect}
                      onChange={(e) => handleGenericChange(setAytDin, aytDin, 6, 'incorrect', e.target.value)}
                      className="rounded-lg border border-slate-300 p-1 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* YDT Yabancı Dil (DİL İçin) */}
          {selectedAytTrack === 'DIL' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-2xl bg-sky-50 p-2.5 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">YDT Yabancı Dil Testi</h3>
                    <span className="text-[11px] text-slate-400">80 Soru | Katsayı: ~3.00</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Net</div>
                  <div className="text-xl font-black text-sky-600 dark:text-sky-400">{aytResult.testNets.ydtTotal}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-emerald-600 block mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    value={ydt.correct}
                    onChange={(e) => handleGenericChange(setYdt, ydt, 80, 'correct', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-rose-600 block mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    value={ydt.incorrect}
                    onChange={(e) => handleGenericChange(setYdt, ydt, 80, 'incorrect', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Boş</label>
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-center text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    {80 - (ydt.correct + ydt.incorrect)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
                Diploma notu 5 ile çarpılarak OBP (250-500) bulunur; 0.12 (kırık ise 0.06) katsayı ile yerleştirme puanına eklenir.
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
                +{aytResult.obpContribution} Puan
              </div>
            </div>
          </div>
        </div>

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
      {/* SONUÇ VE SKOR PANOSU (DİNAMİK MOD) */}
      {/* ================================================================== */}
      {activeExamTab === 'tyt' ? (
        /* TYT Sonuç Panosu */
        <section className="rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-transparent p-6 sm:p-8 dark:border-rose-500/10 dark:bg-slate-900/60 space-y-6">
          {!tytResult.isEligibleForScore && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">ÖSYM 0.5 Net Baraj Şartı İhlali!</div>
                <div className="mt-1">{tytResult.eligibilityMessage}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Toplam TYT Net</span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {tytResult.totalNet} <span className="text-xs font-normal text-slate-400">/ 120</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ham TYT Puanı</span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                {tytResult.rawScore}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Yerleştirme (Y-TYT)</span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {tytResult.placementScore}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tahmini Sıralama</span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                ~{tytResult.estimatedRank.toLocaleString('tr-TR')}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* AYT / YDT Sonuç Panosu */
        <section className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent p-6 sm:p-8 dark:border-purple-500/10 dark:bg-slate-900/60 space-y-6">
          {!activeAytScore.isEligible && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">ÖSYM 0.5 Net Kuralı Uyarısı!</div>
                <div className="mt-1">{activeAytScore.ineligibilityReason}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {selectedAytTrack} AYT/YDT Neti
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {activeAytScore.aytNet} <span className="text-xs font-normal text-slate-400">/ 80</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">TYT Net: {aytResult.tytTotalNet} / 120</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ham {selectedAytTrack} Puanı
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                {activeAytScore.rawScore}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">%40 TYT + %60 AYT</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Yerleştirme (Y-{selectedAytTrack})
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {activeAytScore.placementScore}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">OBP: +{aytResult.obpContribution} Puan</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tahmini {selectedAytTrack} Sıra
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                ~{activeAytScore.estimatedRank.toLocaleString('tr-TR')}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">Dilim: %{activeAytScore.estimatedPercentile}</div>
            </div>
          </div>

          {/* YÖK Resmi Başarı Sıralaması Barajları */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-600" />
              <span>YÖK Resmi Başarı Sıralaması Baraj Durumu</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs">
              {selectedAytTrack === 'SAY' && (
                <>
                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.tipEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Tıp Fakültesi</div>
                    <div className="font-black text-xs mt-1">İlk 50.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.tipEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.disEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Diş Hekimliği</div>
                    <div className="font-black text-xs mt-1">İlk 80.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.disEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.eczacilikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Eczacılık</div>
                    <div className="font-black text-xs mt-1">İlk 100.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.eczacilikEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.mimarlikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Mimarlık</div>
                    <div className="font-black text-xs mt-1">İlk 250.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.mimarlikEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.muhendislikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Mühendislik</div>
                    <div className="font-black text-xs mt-1">İlk 300.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.muhendislikEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border ${activeAytScore.thresholds.ogretmenlikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Öğretmenlik</div>
                    <div className="font-black text-xs mt-1">İlk 300.000</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.ogretmenlikEligible ? 'Baraj İçinde ✅' : 'Dışında ❌'}</div>
                  </div>
                </>
              )}

              {selectedAytTrack === 'EA' && (
                <>
                  <div className={`rounded-xl p-3 border col-span-3 ${activeAytScore.thresholds.hukukEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Hukuk Fakültesi</div>
                    <div className="font-black text-sm mt-1">İlk 125.000 Şartı</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.hukukEligible ? 'Baraj Sağlandı ✅' : 'Baraj Dışı ❌'}</div>
                  </div>

                  <div className={`rounded-xl p-3 border col-span-3 ${activeAytScore.thresholds.ogretmenlikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                    <div className="text-[10px] font-bold">Rehberlik &amp; Psikolojik Danışmanlık / Öğretmenlik</div>
                    <div className="font-black text-sm mt-1">İlk 300.000 Şartı</div>
                    <div className="mt-1 font-bold">{activeAytScore.thresholds.ogretmenlikEligible ? 'Baraj Sağlandı ✅' : 'Baraj Dışı ❌'}</div>
                  </div>
                </>
              )}

              {(selectedAytTrack === 'SOZ' || selectedAytTrack === 'DIL') && (
                <div className={`rounded-xl p-3 border col-span-6 ${activeAytScore.thresholds.ogretmenlikEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800/40'}`}>
                  <div className="text-[10px] font-bold">{selectedAytTrack === 'DIL' ? 'İngilizce Öğretmenliği' : 'Türkçe / Tarih / Sosyal Öğretmenliği'}</div>
                  <div className="font-black text-sm mt-1">İlk 300.000 Şartı</div>
                  <div className="mt-1 font-bold">{activeAytScore.thresholds.ogretmenlikEligible ? 'Baraj Sağlandı ✅' : 'Baraj Dışı ❌'}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
