'use client';

import React, { useState } from 'react';
import type { OnlineExam, OnlineExamResult, QuestionResultDetail } from '@/types/online-exam';
import type { WrongQuestionItem } from '@/types/question';
import type { LgsCourseKey } from '@/types/exam';
import { saveQuestionToStorage, getStoredQuestions } from '@/lib/question-storage';
import { saveStudentExamToStorage } from '@/lib/exam-storage';
import { addLeaderboardEntry } from '@/lib/leaderboard-storage';
import { recordStreakActivity } from '@/lib/streak-storage';
import { SocraticAssistantModal } from '@/components/question/SocraticAssistantModal';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  Sparkles,
  BookMarked,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  TrendingUp,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { WhatsAppShareButton } from '@/components/share/WhatsAppShareButton';

interface ExamResultSummaryProps {
  exam: OnlineExam;
  result: OnlineExamResult;
  onRestartExam: () => void;
}

export function ExamResultSummary({
  exam,
  result,
  onRestartExam,
}: ExamResultSummaryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'wrong_or_empty' | 'correct'>('all');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [isSavedToWrongNotebook, setIsSavedToWrongNotebook] = useState<boolean>(false);
  const [isSavedToHistory, setIsSavedToHistory] = useState<boolean>(false);
  const [activeSocraticQuestion, setActiveSocraticQuestion] = useState<WrongQuestionItem | null>(null);

  // Liderlik Tablosu Ekleme State'i
  const [nickname, setNickname] = useState<string>('');
  const [targetSchool, setTargetSchool] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [isSavedToLeaderboard, setIsSavedToLeaderboard] = useState<boolean>(false);

  // Yanlış veya boş soruları tespit et
  const wrongOrEmptyQuestions = result.questionDetails.filter((d) => !d.isCorrect);

  // Yanlış veya boş soruları Yanlış Defteri'ne aktar
  const handleSaveToWrongNotebook = () => {
    if (isSavedToWrongNotebook) return;

    const existingQuestions = getStoredQuestions();
    let addedCount = 0;

    for (const item of wrongOrEmptyQuestions) {
      // Daha önce eklenip eklenmediğini kontrol et
      const alreadyExists = existingQuestions.some(
        (q) => q.topicName === item.question.topicName && (q.questionText === item.question.questionText || q.studentNote?.includes(item.question.id))
      );

      if (!alreadyExists) {
        saveQuestionToStorage({
          courseKey: item.question.courseKey,
          courseName: item.question.courseName,
          topicName: item.question.topicName,
          imageUrl:
            item.question.questionImageUrl ||
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
          studentNote: `Sınav: ${exam.title}\nİşaretlenen: ${item.studentAnswer || 'Boş'} | Doğru Cevap: ${item.question.correctAnswer}`,
          status: 'unresolved',
          isResolved: false,
          aiHintHistory: item.question.hintForSocratic
            ? [
                {
                  id: `hint-${Date.now()}-${item.question.id}`,
                  step: 1,
                  prompt: 'İlk Sokratik İpucu',
                  hint: item.question.hintForSocratic,
                  created_at: new Date().toISOString(),
                },
              ]
            : [],
          isOnlineExamQuestion: true,
          questionText: item.question.questionText,
          options: item.question.options,
          correctAnswer: item.question.correctAnswer,
          studentAnswer: item.studentAnswer || 'Boş',
          solutionExplanation: item.question.explanation,
          examTitle: exam.title,
        });
        addedCount++;
      }
    }

    setIsSavedToWrongNotebook(true);
  };

  // Deneme geçmişine kaydet
  const handleSaveToHistory = () => {
    if (isSavedToHistory) return;

    // Her dersin netini soru bazında dinamik topla
    const courseStats: Record<
      string,
      { correct: number; incorrect: number; empty: number; count: number; name: string }
    > = {
      turkce: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'Türkçe' },
      matematik: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'Matematik' },
      fen: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'Fen Bilimleri' },
      inkilap: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'T.C. İnkılap Tarihi' },
      din: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'Din Kültürü' },
      ingilizce: { correct: 0, incorrect: 0, empty: 0, count: 0, name: 'İngilizce' },
    };

    result.questionDetails.forEach((d) => {
      const cKey = d.question.courseKey || 'matematik';
      if (courseStats[cKey]) {
        courseStats[cKey].count++;
        if (d.isEmpty) courseStats[cKey].empty++;
        else if (d.isCorrect) courseStats[cKey].correct++;
        else courseStats[cKey].incorrect++;
      }
    });

    const coursesObj = {
      turkce: {
        courseKey: 'turkce' as const,
        courseName: courseStats.turkce.name,
        questionCount: courseStats.turkce.count,
        weight: 4,
        correct: courseStats.turkce.correct,
        incorrect: courseStats.turkce.incorrect,
        empty: courseStats.turkce.empty,
        net: Number(Math.max(0, courseStats.turkce.correct - courseStats.turkce.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.turkce.incorrect / 3).toFixed(2)),
      },
      matematik: {
        courseKey: 'matematik' as const,
        courseName: courseStats.matematik.name,
        questionCount: courseStats.matematik.count,
        weight: 4,
        correct: courseStats.matematik.correct,
        incorrect: courseStats.matematik.incorrect,
        empty: courseStats.matematik.empty,
        net: Number(Math.max(0, courseStats.matematik.correct - courseStats.matematik.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.matematik.incorrect / 3).toFixed(2)),
      },
      fen: {
        courseKey: 'fen' as const,
        courseName: courseStats.fen.name,
        questionCount: courseStats.fen.count,
        weight: 4,
        correct: courseStats.fen.correct,
        incorrect: courseStats.fen.incorrect,
        empty: courseStats.fen.empty,
        net: Number(Math.max(0, courseStats.fen.correct - courseStats.fen.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.fen.incorrect / 3).toFixed(2)),
      },
      inkilap: {
        courseKey: 'inkilap' as const,
        courseName: courseStats.inkilap.name,
        questionCount: courseStats.inkilap.count,
        weight: 1,
        correct: courseStats.inkilap.correct,
        incorrect: courseStats.inkilap.incorrect,
        empty: courseStats.inkilap.empty,
        net: Number(Math.max(0, courseStats.inkilap.correct - courseStats.inkilap.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.inkilap.incorrect / 3).toFixed(2)),
      },
      din: {
        courseKey: 'din' as const,
        courseName: courseStats.din.name,
        questionCount: courseStats.din.count,
        weight: 1,
        correct: courseStats.din.correct,
        incorrect: courseStats.din.incorrect,
        empty: courseStats.din.empty,
        net: Number(Math.max(0, courseStats.din.correct - courseStats.din.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.din.incorrect / 3).toFixed(2)),
      },
      ingilizce: {
        courseKey: 'ingilizce' as const,
        courseName: courseStats.ingilizce.name,
        questionCount: courseStats.ingilizce.count,
        weight: 1,
        correct: courseStats.ingilizce.correct,
        incorrect: courseStats.ingilizce.incorrect,
        empty: courseStats.ingilizce.empty,
        net: Number(Math.max(0, courseStats.ingilizce.correct - courseStats.ingilizce.incorrect / 3).toFixed(2)),
        lostNet: Number((courseStats.ingilizce.incorrect / 3).toFixed(2)),
      },
    };

    saveStudentExamToStorage({
      examTitle: exam.title,
      examDate: new Date().toISOString().split('T')[0],
      totalScore: Math.round(200 + (result.netScore / result.totalQuestions) * 300),
      calculatedPercentile: Math.max(0.2, Number((100 - (result.netScore / result.totalQuestions) * 98).toFixed(2))),
      totalNet: result.netScore,
      totalCorrect: result.correctCount,
      totalIncorrect: result.incorrectCount,
      totalEmpty: result.emptyCount,
      courses: coursesObj,
    });

    // Günlük seri ve soru hedefini güncelle
    recordStreakActivity(result.totalQuestions);

    setIsSavedToHistory(true);
  };

  // Liderlik Tablosuna Kaydet
  const handleSaveToLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || isSavedToLeaderboard) return;

    const calculatedScore = Number((200 + (result.netScore / result.totalQuestions) * 300).toFixed(2));

    addLeaderboardEntry({
      nickname: nickname.trim(),
      examTitle: exam.title,
      examSlug: exam.slug,
      score: calculatedScore,
      totalNet: result.netScore,
      correctCount: result.correctCount,
      wrongCount: result.incorrectCount,
      city: city.trim() || undefined,
      targetSchool: targetSchool.trim() || undefined,
    });

    setIsSavedToLeaderboard(true);
  };

  // Bir soru için Sokratik Asistan'ı aç
  const handleOpenSocratic = (detail: QuestionResultDetail) => {
    const wrongItem: WrongQuestionItem = {
      id: 'online-q-' + detail.question.id,
      courseKey: detail.question.courseKey,
      courseName: detail.question.courseName,
      topicName: detail.question.topicName,
      imageUrl:
        detail.question.questionImageUrl ||
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
      studentNote: `Soru Metni: ${detail.question.questionText}\nBenim Seçtiğim Şık: ${detail.studentAnswer || 'Boş'}\nÖn İpucu: ${detail.question.hintForSocratic || ''}`,
      status: 'unresolved',
      isResolved: false,
      createdAt: new Date().toISOString(),
      aiHintHistory: [],
    };
    setActiveSocraticQuestion(wrongItem);
  };

  const filteredQuestions = result.questionDetails.filter((d) => {
    if (activeTab === 'wrong_or_empty') return !d.isCorrect;
    if (activeTab === 'correct') return d.isCorrect;
    return true;
  });

  const minutesSpent = Math.floor(result.timeSpentSeconds / 60);
  const secondsSpent = result.timeSpentSeconds % 60;

  const courseSummaryList = React.useMemo(() => {
    if (exam.type !== 'full') return [];
    const map: Record<string, { name: string; correct: number; incorrect: number; empty: number; count: number }> = {
      turkce: { name: 'Türkçe', correct: 0, incorrect: 0, empty: 0, count: 0 },
      matematik: { name: 'Matematik', correct: 0, incorrect: 0, empty: 0, count: 0 },
      fen: { name: 'Fen Bilimleri', correct: 0, incorrect: 0, empty: 0, count: 0 },
      inkilap: { name: 'İnkılap Tarihi', correct: 0, incorrect: 0, empty: 0, count: 0 },
      din: { name: 'Din Kültürü', correct: 0, incorrect: 0, empty: 0, count: 0 },
      ingilizce: { name: 'İngilizce', correct: 0, incorrect: 0, empty: 0, count: 0 },
    };

    result.questionDetails.forEach((d) => {
      const k = d.question.courseKey || 'matematik';
      if (map[k]) {
        map[k].count++;
        if (d.isEmpty) map[k].empty++;
        else if (d.isCorrect) map[k].correct++;
        else map[k].incorrect++;
      }
    });

    return Object.entries(map)
      .filter(([_, data]) => data.count > 0)
      .map(([key, data]) => ({
        key: key as any,
        name: data.name,
        count: data.count,
        correct: data.correct,
        incorrect: data.incorrect,
        empty: data.empty,
        net: Number(Math.max(0, data.correct - data.incorrect / 3).toFixed(2)),
      }));
  }, [exam.type, result.questionDetails]);

  return (
    <div className="space-y-8">
      {/* Üst Başarı & Tebrik Kartı */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
            <Trophy className="h-8 w-8" />
          </div>

          <span className="mt-4 rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
            {exam.title} Tamamlandı
          </span>

          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Sınav Sonuç Karnesi
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            MEB standartlarına göre 3 yanlış 1 doğruyu götürerek netin hesaplandı.
          </p>

          {/* 4 Temel Metrik Kartı */}
          <div className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Doğru */}
            <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-emerald-950/40 dark:bg-slate-800">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                {result.correctCount}
              </span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Doğru
              </span>
            </div>

            {/* Yanlış */}
            <div className="flex flex-col items-center rounded-2xl border border-rose-100 bg-white p-4 shadow-xs dark:border-rose-950/40 dark:bg-slate-800">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400 sm:text-3xl">
                {result.incorrectCount}
              </span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Yanlış
              </span>
            </div>

            {/* Boş */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-700 dark:bg-slate-800">
              <span className="text-2xl font-black text-slate-600 dark:text-slate-400 sm:text-3xl">
                {result.emptyCount}
              </span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Boş
              </span>
            </div>

            {/* Toplam Net */}
            <div className="flex flex-col items-center rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 shadow-xs dark:border-indigo-800/60 dark:bg-indigo-950/40">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 sm:text-3xl">
                {result.netScore.toFixed(2)}
              </span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Toplam Net
              </span>
            </div>
          </div>

          {/* LGS Çoklu Ders Net Dağılımı */}
          {courseSummaryList.length > 0 && (
            <div className="mt-6 w-full max-w-2xl rounded-2xl border border-indigo-100 bg-white/90 p-4 dark:border-indigo-900/50 dark:bg-slate-800/80 text-left">
              <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 text-center">
                📚 Ders Bazlı Net Dağılımı (LGS Genel Karne)
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {courseSummaryList.map((cs) => (
                  <div
                    key={cs.key}
                    className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 text-left dark:border-slate-700/60 dark:bg-slate-900/50"
                  >
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {cs.name}
                    </span>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{cs.correct}D {cs.incorrect}Y {cs.empty}B</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                        {cs.net} Net
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Süre Bilgisi */}
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Kullanılan Süre: {minutesSpent} dakika {secondsSpent} saniye
            </span>
          </div>

          {/* Aksiyon Butonları (Yanlış Defterine Ekle & Denemelerime Ekle) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {wrongOrEmptyQuestions.length > 0 && (
              <button
                type="button"
                onClick={handleSaveToWrongNotebook}
                disabled={isSavedToWrongNotebook}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer ${
                  isSavedToWrongNotebook
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-indigo-500/20'
                }`}
              >
                <BookMarked className="h-4 w-4" />
                <span>
                  {isSavedToWrongNotebook
                    ? 'Yanlış Defterine Eklendi ✓'
                    : `Yanlışları (${wrongOrEmptyQuestions.length} Soru) Yanlış Defterime Ekle`}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveToHistory}
              disabled={isSavedToHistory}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer ${
                isSavedToHistory
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>
                {isSavedToHistory
                  ? 'Deneme Geçmişine Kaydedildi ✓'
                  : 'Grafiğe Kaydet'}
              </span>
            </button>

            <WhatsAppShareButton
              shareData={{
                examTitle: exam.title,
                totalNet: result.netScore,
                mode: 'student_to_parent',
                courseBreakdown: courseSummaryList.map((c) => ({ name: c.name, net: c.net })),
              }}
              buttonText="Veliye WhatsApp ile Gönder"
            />

            <button
              type="button"
              onClick={onRestartExam}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Tekrar Çöz</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🏆 Türkiye Geneli Liderlik Sıralamasına Katıl Kartı */}
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-white p-6 dark:border-amber-900/50 dark:from-amber-950/30 dark:to-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/25">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Sparkles className="h-3 w-3" /> TÜRKİYE SIRALAMASI
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Bu Skoru Liderlik Tablosuna Ekle!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Takma adını ve hedefini belirle, binlerce öğrenci arasındaki sıralamanı hemen gör.
              </p>
            </div>
          </div>

          <Link
            href="/liderlik-tablosu"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 shrink-0"
          >
            <span>Sıralama Tablosuna Git</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isSavedToLeaderboard ? (
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Tebrikler <strong>{nickname}</strong>! Skorun Türkiye Liderlik Tablosuna başarıyla eklendi.
              </span>
            </div>
            <Link
              href="/liderlik-tablosu"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              Sıralamadaki Yerimi Gör
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSaveToLeaderboard} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              required
              placeholder="Öğrenci Lakabı (Örn: LgsBükücü)"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              placeholder="Hedef Lise (Örn: Fen Lisesi)"
              value={targetSchool}
              onChange={(e) => setTargetSchool(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              placeholder="Şehir (Örn: Ankara)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 transition cursor-pointer"
            >
              Listeye Kaydet 🚀
            </button>
          </form>
        )}
      </div>

      {/* Soru Bazlı Analiz ve Detaylar */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Soru Bazlı Sınav Analizi
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {filteredQuestions.length} Soru
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tüm Çözümleri Aç / Kapat Butonu */}
            <button
              type="button"
              onClick={() => {
                const areAllExpanded =
                  filteredQuestions.length > 0 &&
                  filteredQuestions.every((d) => expandedQuestionIds.has(d.question.id));

                if (areAllExpanded) {
                  setExpandedQuestionIds(new Set());
                } else {
                  setExpandedQuestionIds(new Set(filteredQuestions.map((d) => d.question.id)));
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 transition cursor-pointer"
            >
              <span>
                {filteredQuestions.length > 0 &&
                filteredQuestions.every((d) => expandedQuestionIds.has(d.question.id))
                  ? 'Tüm Çözümleri Kapat'
                  : '📖 Tüm Çözümleri Aç'}
              </span>
            </button>

            {/* Filtre Tabları */}
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Tümü ({result.totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wrong_or_empty')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition cursor-pointer ${
                  activeTab === 'wrong_or_empty'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Yanlış &amp; Boş ({wrongOrEmptyQuestions.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('correct')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition cursor-pointer ${
                  activeTab === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Doğru ({result.correctCount})
              </button>
            </div>
          </div>
        </div>

        {/* Soruların Listesi */}
        <div className="space-y-3">
          {filteredQuestions.map((detail) => {
            const isExpanded = expandedQuestionIds.has(detail.question.id);
            const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={detail.question.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Durum İkonu */}
                    {detail.isCorrect ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : detail.isEmpty ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                        <XCircle className="h-4 w-4" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          Soru {detail.question.questionNumber}
                        </span>
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          {detail.question.topicName} ({detail.question.courseName})
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-500">
                          Senin Cevabın:{' '}
                          <strong className={detail.isCorrect ? 'text-emerald-600 font-bold' : detail.isEmpty ? 'text-slate-500 font-bold' : 'text-rose-600 font-bold'}>
                            {detail.studentAnswer || 'Boş Bıraktın'}
                          </strong>
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                        <span className="text-slate-500">
                          Doğru Cevap:{' '}
                          <strong className="text-emerald-600 font-black">
                            {detail.question.correctAnswer}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sağ Aksiyon Butonları */}
                  <div className="flex items-center gap-2">
                    {/* Sokratik AI Butonu (Yanlış veya Boş ise) */}
                    {!detail.isCorrect && (
                      <button
                        type="button"
                        onClick={() => handleOpenSocratic(detail)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:from-indigo-700 hover:to-violet-700 transition cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                        <span className="hidden sm:inline">Sokratik AI ile Çöz</span>
                        <span className="sm:hidden">AI Çöz</span>
                      </button>
                    )}

                    {/* Genişlet / Kapat Butonu */}
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedQuestionIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(detail.question.id)) next.delete(detail.question.id);
                          else next.add(detail.question.id);
                          return next;
                        });
                      }}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer transition"
                    >
                      <span>{isExpanded ? 'Kapat' : 'Çözümü Gör'}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Genişletilmiş Çözüm, Şıklar ve Soru Açıklaması */}
                {isExpanded && (
                  <div className="mt-4 space-y-3.5 border-t border-slate-100 pt-4 dark:border-slate-800 animate-in fade-in duration-150">
                    {/* Soru Metni */}
                    <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-800 dark:bg-slate-800/60 dark:text-slate-200 whitespace-pre-line leading-relaxed border border-slate-200/60 dark:border-slate-700/50">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">
                        Soru Metni:
                      </span>
                      {detail.question.questionText}
                    </div>

                    {/* Soru Şıkları (A, B, C, D) Vurgulu */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {optionKeys.map((opt) => {
                        const isCorrectOption = opt === detail.question.correctAnswer;
                        const isStudentChoice = opt === detail.studentAnswer;

                        let style = 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';
                        if (isCorrectOption) {
                          style = 'border-emerald-400 bg-emerald-50/80 text-emerald-900 font-bold dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 ring-1 ring-emerald-400/40';
                        } else if (isStudentChoice && !detail.isCorrect) {
                          style = 'border-rose-300 bg-rose-50/80 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200 line-through opacity-80';
                        }

                        return (
                          <div
                            key={opt}
                            className={`flex items-start justify-between gap-2 rounded-xl border p-2.5 text-xs transition ${style}`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-black shrink-0">{opt})</span>
                              <span className="leading-snug">{detail.question.options[opt]}</span>
                            </div>
                            {isCorrectOption && (
                              <span className="shrink-0 rounded-md bg-emerald-600 text-white px-1.5 py-0.5 text-[10px] font-black uppercase">
                                Doğru ✓
                              </span>
                            )}
                            {isStudentChoice && !detail.isCorrect && (
                              <span className="shrink-0 rounded-md bg-rose-600 text-white px-1.5 py-0.5 text-[10px] font-black uppercase">
                                Senin Cevabın ✗
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detaylı Çözüm ve Pedagojik Açıklama */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                        <span>💡 Adım Adım Soru Çözümü &amp; MEB Mantığı</span>
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-950 dark:text-emerald-100 whitespace-pre-line font-medium">
                        {detail.question.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sokratik Asistan Modalı */}
      {activeSocraticQuestion && (
        <SocraticAssistantModal
          question={activeSocraticQuestion}
          onClose={() => setActiveSocraticQuestion(null)}
        />
      )}
    </div>
  );
}
