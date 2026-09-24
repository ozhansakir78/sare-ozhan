'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { WrongQuestionItem, QuestionStatus } from '@/types/question';
import {
  getStoredQuestions,
  updateStoredQuestionStatus,
  deleteStoredQuestion,
  calculateQuestionStats,
} from '@/lib/question-storage';
import { QuestionUploader } from '@/components/question/QuestionUploader';
import { QuestionList } from '@/components/question/QuestionList';
import { SocraticAssistantModal } from '@/components/question/SocraticAssistantModal';
import { ErrorDiagnosisBanner } from '@/components/question/ErrorDiagnosisBanner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import {
  Plus,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';

export default function YanlisDefteriPage() {
  const [questions, setQuestions] = useState<WrongQuestionItem[]>([]);
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);
  const [activeModalQuestion, setActiveModalQuestion] = useState<WrongQuestionItem | null>(null);

  useEffect(() => {
    // İstemci tarafında yerel soruları yükle
    const stored = getStoredQuestions();
    setQuestions(stored);
  }, []);

  const stats = calculateQuestionStats(questions);

  const handleQuestionAdded = (newQuestion: WrongQuestionItem) => {
    setQuestions((prev) => [newQuestion, ...prev]);
    setIsUploaderOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: QuestionStatus) => {
    const updated = updateStoredQuestionStatus(id, newStatus);
    setQuestions(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu soruyu Yanlış Defteri\'nden silmek istediğinize emin misiniz?')) {
      const updated = deleteStoredQuestion(id);
      setQuestions(updated);
    }
  };

  const handleOpenAiAssistant = (question: WrongQuestionItem) => {
    setActiveModalQuestion(question);
  };

  const handleQuestionUpdated = (updated: WrongQuestionItem) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  return (
    <AuthGuard
      title="Yanlış Defteri'ni Kullanmak İçin Giriş Yapmalısınız"
      description="Yapamadığınız soruların fotoğrafını yüklemek, yapay zekâlı Sokratik koç ile adım adım öğrenmek ve yanlışlarınızı pekiştirmek için lütfen ücretsiz üye olun veya giriş yapın."
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8">
          {/* Başlık ve Aksiyon Butonu */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Kişisel Yanlış Defterim
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Çözemediğin her yanlış soru, LGS&apos;de doğruya dönüştürebileceğin en değerli fırsattır.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsUploaderOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-violet-700 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              <span>{isUploaderOpen ? 'Yüklemeyi Kapat' : 'Yeni Soru Yükle'}</span>
            </button>
          </div>

          {/* 4 Mini İstatistik Kutusu */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {/* Toplam */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase">Toplam Soru</span>
                  <FolderOpen className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-1.5 text-2xl font-black text-slate-900 dark:text-white">
                  {stats.total}
                </p>
              </div>

              {/* Bekleyen (Çözülemedi) */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-3.5 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20">
                <div className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span className="text-[11px] font-semibold uppercase">Çözülemedi</span>
                  <HelpCircle className="h-4 w-4 opacity-80" />
                </div>
                <p className="mt-1.5 text-2xl font-black text-amber-700 dark:text-amber-300">
                  {stats.unresolved}
                </p>
              </div>

              {/* İpucu Alındı */}
              <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/50 p-3.5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/20">
                <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300">
                  <span className="text-[11px] font-semibold uppercase">İpucu Alındı</span>
                  <Sparkles className="h-4 w-4 opacity-80" />
                </div>
                <p className="mt-1.5 text-2xl font-black text-indigo-700 dark:text-indigo-300">
                  {stats.hinted}
                </p>
              </div>

              {/* Öğrenildi / Çözüldü */}
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3.5 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300">
                  <span className="text-[11px] font-semibold uppercase">Öğrenildi ✓</span>
                  <CheckCircle2 className="h-4 w-4 opacity-80" />
                </div>
                <p className="mt-1.5 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  {stats.resolved}
                </p>
              </div>
            </div>

          {/* AI Hata Kök Neden Teşhisi ve 1-Tık Telafi Paneli */}
          <ErrorDiagnosisBanner />

          {/* Soru Yükleme Alanı (Açılır/Kapanır) */}
          {isUploaderOpen && (
            <div className="animate-in fade-in duration-200">
              <QuestionUploader
                onQuestionAdded={handleQuestionAdded}
                onCancel={() => setIsUploaderOpen(false)}
              />
            </div>
          )}

          {/* Filtreli Soru Listesi */}
          <QuestionList
            questions={questions}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onOpenAiAssistant={handleOpenAiAssistant}
            onOpenUploader={() => setIsUploaderOpen(true)}
          />

      {/* Sokratik AI Soru Çözüm Asistanı Modalı */}
      {activeModalQuestion && (
        <SocraticAssistantModal
          question={activeModalQuestion}
          onClose={() => setActiveModalQuestion(null)}
          onQuestionUpdated={handleQuestionUpdated}
        />
      )}
      </div>
    </AuthGuard>
  );
}
