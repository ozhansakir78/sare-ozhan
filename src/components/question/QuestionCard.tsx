'use client';

import React, { useState } from 'react';
import type { WrongQuestionItem, QuestionStatus, ErrorReason } from '@/types/question';
import { getStudyNoteByTopicName } from '@/lib/lgs-study-notes';
import { updateQuestionErrorReason } from '@/lib/question-storage';
import { TopicDetailModal } from '@/components/study/TopicDetailModal';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Trash2,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Lightbulb,
} from 'lucide-react';

interface QuestionCardProps {
  question: WrongQuestionItem;
  onStatusChange: (id: string, newStatus: QuestionStatus) => void;
  onDelete: (id: string) => void;
  onOpenAiAssistant?: (question: WrongQuestionItem) => void;
}

const ERROR_REASON_OPTIONS: { key: ErrorReason; label: string; icon: string; activeClass: string }[] = [
  { key: 'carelessness', label: 'Dikkatsizlik', icon: '👀', activeClass: 'border-amber-400 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200' },
  { key: 'calculation_error', label: 'İşlem Hatası', icon: '✍️', activeClass: 'border-blue-400 bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200' },
  { key: 'knowledge_gap', label: 'Bilgi Eksiği', icon: '🧠', activeClass: 'border-purple-400 bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200' },
  { key: 'time_pressure', label: 'Süre Yetmedi', icon: '⏱️', activeClass: 'border-rose-400 bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200' },
];

export function QuestionCard({
  question,
  onStatusChange,
  onDelete,
  onOpenAiAssistant,
}: QuestionCardProps) {
  const { id, courseKey, courseName, topicName, imageUrl, studentNote, status, createdAt, aiHintHistory } =
    question;

  const [isStudyNoteOpen, setIsStudyNoteOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState<ErrorReason | undefined>(question.errorReason);

  const handleSetReason = (reason: ErrorReason) => {
    setCurrentReason(reason);
    updateQuestionErrorReason(id, reason);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Bilinmiyor';
    }
  };

  const getStatusBadge = (st: QuestionStatus) => {
    switch (st) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-3 w-3" /> Öğrenildi / Çözüldü
          </span>
        );
      case 'hinted':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="h-3 w-3" /> İpucu Alındı
          </span>
        );
      case 'unresolved':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <HelpCircle className="h-3 w-3" /> Çözülemedi
          </span>
        );
    }
  };

  const isResolved = status === 'resolved';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      {/* Görsel veya Online Soru Önizleme Alanı */}
      {question.isOnlineExamQuestion && question.questionText ? (
        <div className="relative min-h-[140px] max-h-52 w-full overflow-y-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 text-white">
          <div className="flex items-center justify-between gap-2 border-b border-indigo-500/20 pb-2 mb-2">
            <span className="rounded-lg bg-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-200 border border-indigo-400/30">
              {courseName}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-lg bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                Online Sınav
              </span>
              <button
                type="button"
                onClick={() => onDelete(id)}
                title="Soruyu Sil"
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-slate-300 hover:bg-rose-500/30 hover:text-rose-200 transition cursor-pointer"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          <p className="text-xs leading-relaxed font-medium text-slate-200 line-clamp-3">
            {question.questionText}
          </p>

          {/* Şıklar ve Cevap Özeti */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 text-[10px]">
            {question.studentAnswer && (
              <span className="rounded-md bg-rose-500/20 px-2 py-0.5 font-bold text-rose-300 border border-rose-500/30">
                Seçimin: {question.studentAnswer}
              </span>
            )}
            {question.correctAnswer && (
              <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 border border-emerald-500/30">
                Doğru: {question.correctAnswer}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800/80">
          <img
            src={imageUrl}
            alt={`${courseName} - ${topicName}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Görsel Üzerindeki Rozetler */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              {courseName}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onDelete(id)}
              title="Soruyu Sil"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-sm backdrop-blur-sm transition hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-rose-950 dark:hover:text-rose-400 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Kart Gövdesi */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <Clock className="h-3 w-3" />
              <span>{formatDate(createdAt)}</span>
            </div>
            {getStatusBadge(status)}
          </div>

          <h4 className="mt-2.5 text-sm font-bold text-slate-900 line-clamp-1 dark:text-white" title={topicName}>
            {topicName}
          </h4>

          {/* Öğrenci Notu */}
          {studentNote ? (
            <div className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                <MessageSquare className="h-3 w-3" /> Notun:
              </div>
              <p className="mt-1 line-clamp-2 italic">&ldquo;{studentNote}&rdquo;</p>
            </div>
          ) : (
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Özel not eklenmedi.
            </p>
          )}

          {/* İpucu Geçmişi Vurgusu */}
          {aiHintHistory && aiHintHistory.length > 0 && (
            <div className="mt-2 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
              ⚡ {aiHintHistory.length} Sokratik ipucu alındı
            </div>
          )}

          {/* Kök Neden Seçici (Neden Yanlış Yaptın?) */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
              Neden Yanlış Yaptın?
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {ERROR_REASON_OPTIONS.map((reason) => {
                const isSelected = currentReason === reason.key;
                return (
                  <button
                    key={reason.key}
                    type="button"
                    onClick={() => handleSetReason(reason.key)}
                    className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-bold border transition text-left cursor-pointer ${
                      isSelected
                        ? reason.activeClass
                        : 'border-slate-200/80 bg-slate-50/70 text-slate-600 hover:bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300'
                    }`}
                  >
                    <span>{reason.icon}</span>
                    <span className="truncate">{reason.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kart Aksiyon Butonları */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          {/* AI Çözüm Butonu */}
          <button
            type="button"
            onClick={() => {
              if (onOpenAiAssistant) {
                onOpenAiAssistant(question);
              } else {
                alert(`"${topicName}" sorusu için Sokratik AI Soru Çözüm Asistanı 4. Aşamada tam entegre edilecek.`);
              }
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-indigo-700 hover:to-violet-700 focus:outline-none cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Sokratik İpucu Al (AI)</span>
          </button>

          {/* Konu Hap Notu Butonu */}
          <button
            type="button"
            onClick={() => setIsStudyNoteOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 transition cursor-pointer"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>Konu Hap Notu &amp; MEB Tuzakları</span>
          </button>

          {/* Durum Değiştirme Butonu */}
          <button
            type="button"
            onClick={() => onStatusChange(id, isResolved ? 'unresolved' : 'resolved')}
            className={`w-full flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
              isResolved
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isResolved ? 'Çözüldü Olarak İşaretlendi ✓' : 'Öğrendim / Çözüldü Olarak İşaretle'}</span>
          </button>
        </div>
      </div>

      {/* Konu Hap Notu Modalı */}
      {isStudyNoteOpen && (
        <TopicDetailModal
          note={getStudyNoteByTopicName(topicName, courseKey)}
          onClose={() => setIsStudyNoteOpen(false)}
        />
      )}
    </div>
  );
}
