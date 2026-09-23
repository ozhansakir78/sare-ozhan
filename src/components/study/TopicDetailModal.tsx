'use client';

import React, { useState } from 'react';
import type { TopicStudyNote } from '@/types/study';
import { speechService } from '@/lib/speech-service';
import {
  X,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Bookmark,
  TrendingUp,
  Bot,
  Send,
  Volume2,
  VolumeX,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { CustomExamGeneratorModal } from '@/components/exam/CustomExamGeneratorModal';

interface TopicDetailModalProps {
  note: TopicStudyNote;
  onClose: () => void;
}

export function TopicDetailModal({ note, onClose }: TopicDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'traps' | 'example' | 'ai_coach'>('summary');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // AI Koç State'i
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sesli okuma aç/kapat
  const handleToggleSpeech = (textToRead: string) => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      speechService.speak(textToRead, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  // AI Koça Soru Gönder
  const handleAskAi = async (customPrompt?: string) => {
    const promptToSend = customPrompt || aiQuestion;
    if (!promptToSend.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseName: note.courseName,
          topicName: note.topicName,
          userMessage: promptToSend,
          studentNote: promptToSend,
          conversationHistory: [{ role: 'user', content: promptToSend }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || data.message;
        if (replyText) {
          setAiResponse(replyText);
        } else {
          setAiResponse(
            `${note.topicName} konusunda kritik nokta: Soru kökünü dikkatle inceleyip temel mantığı ve formülü uygulamaktır.`
          );
        }
      } else {
        setAiResponse(
          `${note.topicName} konusunda en önemli taktik: MEB'in çeldiricilerine dikkat etmek ve soruda verilen ilk ipucunu formülle eşleştirmektir.`
        );
      }
    } catch {
      setAiResponse(
        `${note.topicName} konusunda başarılı olmak için öncelikle temel kuralları ezberlemek yerine mantığını kavramalısın. Çıkmış sınav sorularında bu konu ağırlıklı olarak yeni nesil grafik ve hikaye kalıplarıyla sorulmaktadır.`
      );
    } finally {
      setIsAiLoading(false);
      setAiQuestion('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Üst Başlık Alanı */}
        <div className="border-b border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {note.courseName}
                </span>

                <span className="rounded-xl bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                  {note.lgsFrequency}
                </span>

                <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Zorluk: {note.difficultyLevel}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                {note.topicName}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                speechService.stop();
                onClose();
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sekmeler (4 Adet) */}
          <div className="mt-5 flex gap-1.5 sm:gap-2 border-b border-slate-200/60 dark:border-slate-800 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === 'summary'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>Hap Özet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('traps')}
              className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === 'traps'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>MEB Tuzakları ({note.mebTraps.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('example')}
              className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === 'example'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span>Örnek Soru &amp; Taktik</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai_coach')}
              className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === 'ai_coach'
                  ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Bot className="h-4 w-4 text-violet-500" />
              <span>🤖 AI Konu Koçu</span>
            </button>
          </div>
        </div>

        {/* Gövde İçeriği */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* TAB 1: Hap Bilgiler */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Kritik Kurallar &amp; Özet Notlar
                </h3>
                {note.summaryBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Formüller veya Hafıza Kartı Varsa */}
              {note.formulas && note.formulas.length > 0 && (() => {
                const verbalKeys = ['edebiyat', 'turkce', 'tarih', 'cografya', 'din', 'ingilizce', 'inkilap'];
                const isVerbal = verbalKeys.includes((note.courseKey || '').toLowerCase());

                return (
                  <div className="mt-4 space-y-2.5">
                    <h3 className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      isVerbal ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {isVerbal ? (
                        <>
                          <Bookmark className="h-3.5 w-3.5" />
                          <span>Hafıza Kartı &amp; Püf Noktası</span>
                        </>
                      ) : (
                        <>
                          <Calculator className="h-3.5 w-3.5" />
                          <span>Hızlı Formül &amp; Kural Kartı</span>
                        </>
                      )}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {note.formulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className={`rounded-2xl border p-3 text-xs leading-relaxed ${
                            isVerbal
                              ? 'border-amber-200/80 bg-amber-50/60 font-semibold text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200'
                              : 'border-indigo-100 bg-indigo-50/60 font-mono font-bold text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200'
                          }`}
                        >
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 2: MEB Tuzakları */}
          {activeTab === 'traps' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 dark:border-rose-900/40 dark:bg-rose-950/30">
                <h4 className="text-xs font-black text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  Öğrencilerin En Çok Düştüğü Çeldiriciler
                </h4>
                <p className="mt-1 text-[11px] text-rose-700/80 dark:text-rose-300/80">
                  MEB sınavlarında yapılan istatistiklere göre bu konuda en çok aşağıdaki noktalarda net kaybedilmektedir:
                </p>
              </div>

              {note.mebTraps.map((trap, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-3.5 text-xs leading-relaxed text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200"
                >
                  <p>{trap}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Örnek Soru & Taktik */}
          {activeTab === 'example' && (
            <div className="space-y-4">
              {note.exampleQuestion ? (
                <div className="space-y-4">
                  {/* Soru Metni */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                      🎯 Tipik MEB Soru Kalıbı
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white leading-relaxed">
                      {note.exampleQuestion.questionText}
                    </p>
                  </div>

                  {/* Adım Adım Çözüm */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Adım Adım Çözüm Taktiği:
                    </h4>
                    {note.exampleQuestion.solutionSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-indigo-100 bg-white p-3 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
                      >
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* Altın Taktik */}
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/30">
                    <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                      <Sparkles className="h-4 w-4 text-amber-600" />
                      <span>Altın Taktik:</span>
                    </div>
                    <p className="mt-1 text-xs text-amber-900 dark:text-amber-200">
                      {note.exampleQuestion.keyTakeaway}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4 dark:border-violet-900/40 dark:bg-violet-950/30">
                    <h4 className="text-xs font-black text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-violet-600" />
                      Yeni Nesil Soru Çözme Taktikleri
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-violet-900 dark:text-violet-200 whitespace-pre-line">
                      {note.questionStrategy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI Konu Koçu */}
          {activeTab === 'ai_coach' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/80 to-indigo-50/40 p-4 dark:border-violet-900/40 dark:from-violet-950/30 dark:to-slate-900">
                <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Sokratik AI Konu Asistanı
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {note.topicName} konusunda aklına takılan her şeyi sorabilir veya aşağıdaki hazır taktik butonlarına tıklayabilirsin:
                </p>
              </div>

              {/* 3 Hızlı Soru Butonu */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleAskAi('Bu konuyu bana günlük hayattan bir örnekle ve hikayeyle anlatır mısın?')}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition cursor-pointer"
                >
                  💡 Günlük Hayattan Örnek Ver
                </button>
                <button
                  type="button"
                  onClick={() => handleAskAi('MEB bu konudan en çok hangi soru kalıbıyla öğrenciyi düşürmeye çalışır?')}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition cursor-pointer"
                >
                  ⚠️ En Tehlikeli MEB Soru Kalıbı
                </button>
                <button
                  type="button"
                  onClick={() => handleAskAi('Bu konudan LGS\'de 1 net daha fazla çıkarmam için bana 3 kritik altın taktik ver.')}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition cursor-pointer"
                >
                  🎯 +1 Net İçin Altın Taktikler
                </button>
              </div>

              {/* AI Yanıt Kutusu */}
              {isAiLoading && (
                <div className="flex items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Yapay zekâ koçun konuyu hazırlıyor...</span>
                  </div>
                </div>
              )}

              {aiResponse && !isAiLoading && (
                <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-violet-900/60 dark:bg-slate-850">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1">
                      <Bot className="h-3.5 w-3.5" /> AI Koçun Yanıtı:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSpeech(aiResponse)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="h-3.5 w-3.5 text-rose-500" />
                          <span>Durdur</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Sesli Dinle</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                    {aiResponse}
                  </p>
                </div>
              )}

              {/* Soru Sorma Girişi */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Bu konu hakkında aklına takılan soruyu yaz..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  type="button"
                  onClick={() => handleAskAi()}
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow hover:bg-violet-700 disabled:opacity-50 transition cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Alt Aksiyon Butonları */}
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/yanlis-defteri"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" />
            <span>Bu Konudaki Yanlışlarım</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsGeneratorOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300 transition cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Özel Pekiştirme Testi Üret</span>
            </button>

            {note.relatedExamSlug ? (
              <Link
                href={`/deneme-coz/${note.relatedExamSlug}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:from-indigo-700 hover:to-violet-700 transition"
              >
                <span>Hazır Denemeyi Çöz</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <Link
                href="/deneme-coz"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 transition"
              >
                <span>Tüm Denemelere Git</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Konuya Özel Pekiştirme Testi Üretici Modalı */}
      {isGeneratorOpen && (
        <CustomExamGeneratorModal
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
          defaultCourse={note.courseKey}
          defaultTopic={note.topicName}
        />
      )}
    </div>
  );
}
