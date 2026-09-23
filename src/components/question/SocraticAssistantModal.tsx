'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { WrongQuestionItem, QuestionStatus } from '@/types/question';
import type { ChatMessage, SolveApiRequest, SolveApiResponse } from '@/types/ai';
import { updateStoredQuestionStatus } from '@/lib/question-storage';
import { getQuotaStatus, consumeQuota } from '@/lib/quota';
import { ProUpgradeModal } from '@/components/subscription/ProUpgradeModal';
import {
  Sparkles,
  X,
  Send,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Bot,
  User,
  Lightbulb,
  HelpCircle,
  Maximize2,
  Check,
  AlertTriangle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { speechService } from '@/lib/speech-service';

interface SocraticAssistantModalProps {
  question: WrongQuestionItem;
  onClose: () => void;
  onQuestionUpdated?: (updated: WrongQuestionItem) => void;
}

export function SocraticAssistantModal({
  question,
  onClose,
  onQuestionUpdated,
}: SocraticAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [status, setStatus] = useState<QuestionStatus>(question.status);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handleToggleSpeak = (msgId: string, content: string) => {
    if (playingMsgId === msgId) {
      speechService.stop();
      setPlayingMsgId(null);
    } else {
      speechService.speak(content, {
        onStart: () => setPlayingMsgId(msgId),
        onEnd: () => setPlayingMsgId(null),
        onError: () => setPlayingMsgId(null),
      });
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Modal açıldığında ilk Sokratik soruyu başlat
  useEffect(() => {
    const initialGreeting: ChatMessage = {
      id: 'm-init',
      role: 'assistant',
      content: `Merhaba! ${question.courseName} dersindeki "${question.topicName}" sorusunu birlikte inceleyelim. 🎯\n\nBu soruda harika bir ipucu gizli. Soru kökünde senden ilk olarak tam olarak neyi bulmanı istiyor? Soruda verilen ilk veriyi fark ettin mi?`,
      createdAt: new Date().toISOString(),
    };
    setMessages([initialGreeting]);

    // Durumu otomatik olarak 'hinted' (İpucu Alındı) yap
    if (question.status === 'unresolved') {
      const updatedList = updateStoredQuestionStatus(question.id, 'hinted');
      const found = updatedList.find((q) => q.id === question.id);
      if (found) {
        setStatus('hinted');
        if (onQuestionUpdated) onQuestionUpdated(found);
      }
    }
  }, [question]);

  // Yeni mesaj geldiğinde alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    // Günlük soru kotasını kontrol et
    const quotaStatus = getQuotaStatus();
    if (!quotaStatus.isPro && quotaStatus.remainingToday <= 0) {
      setIsProModalOpen(true);
      return;
    }

    const userMessage: ChatMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: messageContent,
      createdAt: new Date().toISOString(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const enrichedStudentNote = question.questionText
        ? `[Online Sınav Sorusu Metni]: ${question.questionText}\n[Şıklar]: ${JSON.stringify(question.options || {})}\n[Doğru Cevap]: ${question.correctAnswer}\n[Pedagojik Çözüm Bilgisi]: ${question.solutionExplanation || ''}\n${question.studentNote || ''}`
        : question.studentNote;

      const payload: SolveApiRequest = {
        questionImage: question.imageUrl,
        courseName: question.courseName,
        topicName: question.topicName,
        studentNote: enrichedStudentNote,
        conversationHistory: newHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await fetch('/api/ai/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('API yanıt vermedi.');
      }

      const data = (await res.json()) as SolveApiResponse;

      const assistantMessage: ChatMessage = {
        id: 'a-' + Date.now(),
        role: 'assistant',
        content: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      consumeQuota();

      // Eğer çözüm tamamlandıysa otomatik kutla ve durumu 'resolved' yap
      if (data.suggestedAction === 'resolve' || messageContent.toLowerCase().includes('anladım')) {
        handleMarkAsResolved();
      }
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content:
          'Bağlantı sırasında küçük bir aksaklık oldu. Fakat merak etme! Sorudaki ilk adıma odaklanarak verilen sayıların bölenlerini veya grafiğin yönünü bir kez daha inceleyebilirsin.',
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsResolved = () => {
    const updatedList = updateStoredQuestionStatus(question.id, 'resolved');
    const found = updatedList.find((q) => q.id === question.id);
    setStatus('resolved');
    setIsCelebrationOpen(true);
    if (found && onQuestionUpdated) {
      onQuestionUpdated(found);
    }
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
    if (direction === 'out') setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    if (direction === 'reset') setZoomLevel(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Üst Başlık Çubuğu */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  Sokratik Soru Koçu
                </h3>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AI Aktif
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {question.courseName} &bull; {question.topicName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status !== 'resolved' ? (
              <button
                type="button"
                onClick={handleMarkAsResolved}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Öğrendim Olarak İşaretle
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                <Check className="h-3.5 w-3.5" /> Çözüldü
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Ana İki Kolonlu Gövde */}
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
          {/* Sol Kolon: Soru Görseli ve Yakınlaştırma (5 Kolon) */}
          <div className="relative flex flex-col border-b border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-950/50 lg:col-span-5 lg:border-b-0 lg:border-r">
            {/* Görsel Araç Çubuğu */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white/90 p-1 shadow-sm backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90">
              <button
                type="button"
                onClick={() => handleZoom('in')}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                title="Büyüt"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom('out')}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                title="Küçült"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom('reset')}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                title="Sıfırla"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Görsel Alanı */}
            <div className="flex flex-1 items-center justify-center overflow-auto p-4">
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={question.imageUrl}
                  alt={question.topicName}
                  className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-md"
                />
              </div>
            </div>

            {/* Varsa Öğrenci Notu */}
            {question.studentNote && (
              <div className="border-t border-slate-200 bg-white/80 p-3 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Takıldığın Nokta:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                  &ldquo;{question.studentNote}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Sağ Kolon: Sokratik Sohbet Paneli (7 Kolon) */}
          <div className="flex flex-col overflow-hidden lg:col-span-7">
            {/* Mesaj Akışı */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
            >
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      isAssistant ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isAssistant && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        isAssistant
                          ? 'border border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200'
                          : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                      }`}
                    >
                      {msg.content}

                      {isAssistant && (
                        <div className="mt-3 flex items-center justify-end border-t border-slate-200/50 pt-2 dark:border-slate-700/50">
                          <button
                            type="button"
                            onClick={() => handleToggleSpeak(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 transition cursor-pointer"
                          >
                            {playingMsgId === msg.id ? (
                              <>
                                <VolumeX className="h-3.5 w-3.5" />
                                <span>Durdur</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-3.5 w-3.5" />
                                <span>Sesli Dinle</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-800">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Yükleniyor Göstergesi */}
              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800">
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-2 font-medium">Sokratik Koç düşünüyor...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Hızlı Eylem Çipleri (Quick Action Chips) */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage('İlk adımı anlayamadım, ipucu verir misin?')}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 whitespace-nowrap cursor-pointer"
                >
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                  İlk adımı anlayamadım
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage('Şıkları ikiye indirdim ama aralarında kararsız kaldım.')}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 whitespace-nowrap cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
                  Şıkları eledim ama kararsızım
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage('Sorunun mantığını tam olarak anladım, teşekkür ederim!')}
                  className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 shadow-xs hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 whitespace-nowrap cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Çözümü anladım!
                </button>
              </div>
            </div>

            {/* Metin Giriş Alanı */}
            <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Düşünceni veya takıldığın adımı yaz (Örn: Sence ilk sayının çarpanlarını mı bulmalıyım?)..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm transition hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tebrik Kutlama Modal/Banner (Çözüldüğünde açılır) */}
      {isCelebrationOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-sm rounded-3xl border border-emerald-300 bg-white p-6 text-center shadow-2xl dark:border-emerald-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="mt-4 text-lg font-black text-slate-900 dark:text-white">
              Tebrikler, Bir Eksiği Kapattın! 🎉
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              Bu sorunun mantığını kavradın ve soru Yanlış Defteri&apos;nde{' '}
              <strong>&ldquo;Öğrenildi&rdquo;</strong> olarak işaretlendi.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsCelebrationOpen(false);
                onClose();
              }}
              className="mt-6 w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 cursor-pointer"
            >
              Yanlış Defteri&apos;ne Dön
            </button>
          </div>
        </div>
      )}

      {/* Pro Abonelik Satış Modalı (Kota Dolduğunda) */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        reason="quota_exhausted"
      />
    </div>
  );
}
