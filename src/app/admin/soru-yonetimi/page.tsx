'use client';

import React, { useState, useEffect } from 'react';
import type { OnlineExam, OnlineExamQuestion, ExamQuestionOptionKey } from '@/types/online-exam';
import type { LgsCourseKey } from '@/types/exam';
import { getOnlineExams } from '@/lib/online-exams-data';
import {
  getCustomStoredExams,
  saveCustomExamToStorage,
  deleteCustomExamFromStorage,
} from '@/lib/custom-exams-storage';
import { LGS_COURSE_OPTIONS, getCourseName } from '@/lib/lgs-topics';

import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Clock,
  HelpCircle,
  ArrowRight,
  Layers,
  Wand2,
  Cpu,
  RefreshCw,
  Trophy,
} from 'lucide-react';

export default function AdminSoruYonetimiPage() {
  const [exams, setExams] = useState<OnlineExam[]>([]);
  const [customExams, setCustomExams] = useState<OnlineExam[]>([]);
  const [activeTab, setActiveTab] = useState<'generator' | 'import' | 'list'>('generator');

  // --- TAB 1: AI Otomatik Jeneratör State ---
  const [genCourseKey, setGenCourseKey] = useState<LgsCourseKey | 'all'>('all');
  const [genTopicName, setGenTopicName] = useState('');
  const [genExamTitle, setGenExamTitle] = useState('');
  const [genQuestionCount, setGenQuestionCount] = useState<number>(5);
  const [genDifficulty, setGenDifficulty] = useState<'Kolay' | 'Orta' | 'LGS Düzeyi' | 'Zorlayıcı'>('LGS Düzeyi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [genSuccess, setGenSuccess] = useState<{ title: string; slug: string; questionCount: number } | null>(null);

  // --- TAB 2: Manuel / MEB Metin İçe Aktarma Form State ---
  const [title, setTitle] = useState('');
  const [courseKey, setCourseKey] = useState<LgsCourseKey>('matematik');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [difficulty, setDifficulty] = useState<'Kolay' | 'Orta' | 'LGS Düzeyi' | 'Zorlayıcı'>('LGS Düzeyi');
  const [badgeText, setBadgeText] = useState('MEB RESMİ ÖRNEK');
  const [rawText, setRawText] = useState('');

  // AI Ayrıştırma State
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<OnlineExamQuestion[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const refreshExams = () => {
    const all = getOnlineExams();
    const customs = getCustomStoredExams();
    setExams(all);
    setCustomExams(customs);
  };

  useEffect(() => {
    refreshExams();
  }, []);

  // AI Otomatik Deneme Üret
  const handleGenerateAiExam = async () => {
    setIsGenerating(true);
    setGenError(null);
    setGenSuccess(null);

    try {
      const res = await fetch('/api/ai/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseKey: genCourseKey,
          topicName: genTopicName.trim() || undefined,
          examTitle: genExamTitle.trim() || undefined,
          questionCount: genQuestionCount,
          difficulty: genDifficulty,
          examType: genCourseKey === 'all' ? 'full' : 'branch',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.exam) {
        throw new Error(data.error || 'Deneme üretilirken bir sorun meydana geldi.');
      }

      // Üretilen denemeyi anında LocalStorage'a kaydet ve yayınla
      saveCustomExamToStorage(data.exam);
      refreshExams();

      setGenSuccess({
        title: data.exam.title,
        slug: data.exam.slug,
        questionCount: data.exam.questionCount,
      });
      setGenTopicName('');
      setGenExamTitle('');
    } catch (err: unknown) {
      console.error('Deneme üretim hatası:', err);
      const msg = err instanceof Error ? err.message : 'Yapay zekâ yanıt vermedi.';
      setGenError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Hızlı Hazır Şablonlar
  const handleApplyPreset = (presetType: 'tg' | 'mat' | 'fen' | 'tr') => {
    setGenError(null);
    setGenSuccess(null);
    if (presetType === 'tg') {
      setGenCourseKey('all');
      setGenExamTitle('2027 LGS Türkiye Geneli Tam Prova Denemesi');
      setGenTopicName('Tüm LGS Dersleri ve Konuları');
      setGenQuestionCount(12);
      setGenDifficulty('LGS Düzeyi');
    } else if (presetType === 'mat') {
      setGenCourseKey('matematik');
      setGenExamTitle('LGS Matematik: Çarpanlar ve Üslü Sayılar Güçlendirme');
      setGenTopicName('Çarpanlar ve Katlar, Üslü İfadeler');
      setGenQuestionCount(5);
      setGenDifficulty('Zorlayıcı');
    } else if (presetType === 'fen') {
      setGenCourseKey('fen');
      setGenExamTitle('LGS Fen Bilimleri: Mevsimler ve DNA Yeni Nesil');
      setGenTopicName('Mevsimler ve İklim, DNA ve Genetik Kod');
      setGenQuestionCount(5);
      setGenDifficulty('LGS Düzeyi');
    } else if (presetType === 'tr') {
      setGenCourseKey('turkce');
      setGenExamTitle('LGS Türkçe: Sözel Mantık ve Muhakeme Ustalık');
      setGenTopicName('Paragrafta Anlam, Fiilimsiler, Sözel Mantık');
      setGenQuestionCount(5);
      setGenDifficulty('LGS Düzeyi');
    }
  };

  // Örnek MEB Soru Metni Doldurucu
  const handleFillSampleText = () => {
    setTitle('2027 MEB Matematik Mart Ayı Örnek Soruları');
    setCourseKey('matematik');
    setDurationMinutes(12);
    setDifficulty('LGS Düzeyi');
    setBadgeText('MEB RESMİ ÖRNEK');
    setRawText(`1. Bir okulun bahçesindeki 80 metre ve 100 metre uzunluğundaki yürüyüş yollarının kenarlarına eşit aralıklarla bayrak direkleri dikilecektir. Yolların başında ve sonunda da bayrak direği bulunacaktır.
A) 8
B) 10
C) 11
D) 15
Doğru Cevap: C
Çözüm: EBOB(80, 100) = 20 metredir. 80 / 20 = 4 aralık (5 direk). 100 / 20 = 5 aralık (6 direk). Toplam 5 + 6 = 11 direk dikilir.

2. 2^6 adet şekerin tamamı, her birinde 4 adet şeker bulunan paketlere konulacaktır. Her paket 8 TL'den satıldığına göre toplam kaç TL gelir elde edilir?
A) 2^7
B) 2^8
C) 2^9
D) 2^10
Doğru Cevap: A
Çözüm: Paket sayısı = 2^6 / 4 = 2^6 / 2^2 = 2^4 pakettir. Gelir = 2^4 × 8 = 2^4 × 2^3 = 2^7 TL.`);
  };

  // AI ile MEB Sorularını Ayrıştır
  const handleParseQuestions = async () => {
    if (!rawText.trim()) {
      setParseError('Lütfen MEB soru metnini yapıştırın.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/ai/parse-meb-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText,
          courseKey,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Ayrıştırma başarısız oldu.');
      }

      setParsedQuestions(data.questions);
      if (!title) {
        setTitle(`2027 LGS ${getCourseName(courseKey)} Özel Denemesi`);
      }
    } catch (err: unknown) {
      console.error('Ayrıştırma hatası:', err);
      const msg = err instanceof Error ? err.message : 'Yapay zekâ yanıt vermedi.';
      setParseError(msg);
    } finally {
      setIsParsing(false);
    }
  };

  // Ayrıştırılmış Denemeyi Yayınla
  const handlePublishExam = () => {
    if (!title.trim() || parsedQuestions.length === 0) {
      setParseError('Lütfen sınav başlığı belirleyin ve en az bir soru ayrıştırın.');
      return;
    }

    const newSlug = `custom-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`;

    const newExam: OnlineExam = {
      id: `custom-exam-${Date.now()}`,
      slug: newSlug,
      title: title.trim(),
      description: `${parsedQuestions.length} sorudan oluşan MEB kazanımlarına uygun ${getCourseName(
        courseKey
      )} deneme sınavı.`,
      type: 'branch',
      courseKey,
      courseName: getCourseName(courseKey),
      questionCount: parsedQuestions.length,
      durationMinutes: Number(durationMinutes) || 15,
      difficulty,
      isPro: false,
      badgeText: badgeText.trim() || 'MEB RESMİ',
      questions: parsedQuestions,
    };

    saveCustomExamToStorage(newExam);
    refreshExams();

    setSuccessMessage(`"${newExam.title}" başarıyla sisteme eklendi ve canlıya alındı!`);
    setParsedQuestions([]);
    setRawText('');
    setTitle('');
  };

  // Özel Denemeyi Sil
  const handleDeleteCustomExam = (id: string) => {
    if (confirm('Bu denemeyi sistemden kaldırmak istediğinize emin misiniz?')) {
      deleteCustomExamFromStorage(id);
      refreshExams();
    }
  };

  const totalQuestionsCount = exams.reduce((acc, e) => acc + e.questionCount, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8">
          {/* Başlık Banner */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Girişimci &amp; Yönetici Merkezi</span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                Soru &amp; Deneme Fabrikası
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Öğretmen masrafı olmadan yapay zekâ ile saniyeler içinde yeni LGS ve branş denemeleri üretin veya MEB kitapçıklarını anında aktarın.
              </p>
            </div>

            <Link
              href="/deneme-coz"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <span>Canlı Sınav Sayfası</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 3 Temel İstatistik Kartı */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Yayındaki Toplam Denemeler
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {exams.length}
                </span>
                <span className="text-xs text-slate-500">adet aktif deneme</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Toplam Soru Havuzu
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {totalQuestionsCount}
                </span>
                <span className="text-xs text-slate-500">MEB onaylı soru</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Panelden Üretilen Özel Denemeler
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
                  {customExams.length}
                </span>
                <span className="text-xs text-slate-500">canlıya alınan</span>
              </div>
            </div>
          </div>

          {/* Tab Seçimi */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'generator'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span>🤖 AI Otomatik Deneme Jeneratörü</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'import'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Wand2 className="h-4 w-4" />
              <span>📋 MEB PDF Metin Ayrıştırıcı</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'list'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Yayındaki Denemeler ({exams.length})</span>
            </button>
          </div>

          {/* TAB 1: AI Otomatik Deneme Jeneratörü */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              {/* Başarı Mesajı */}
              {genSuccess && (
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">
                        🎉 &quot;{genSuccess.title}&quot; başarıyla üretildi ve yayına alındı!
                      </p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                        {genSuccess.questionCount} adet soru, cevap anahtarı ve Sokratik ipuçları sisteme eklendi.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/deneme-coz/${genSuccess.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition shrink-0"
                  >
                    <span>Hemen Canlıda Çöz</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {/* Hata Mesajı */}
              {genError && (
                <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  <span>{genError}</span>
                </div>
              )}

              {/* Hızlı Şablonlar (Tek Tıkla Girişimci Dolumu) */}
              <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/50 p-6 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  ⚡ 1 Tıkla Hazır Şablonlar (Girişimci İçin Hızlı Üretim)
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Öğretmen aramadan, istediğiniz formatı seçin ve hemen &quot;Deneme Üret &amp; Canlıya Al&quot; butonuna basın.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('tg')}
                    className="flex flex-col rounded-2xl border border-indigo-200/80 bg-white p-3.5 text-left transition hover:border-indigo-400 hover:shadow-xs dark:border-slate-800 dark:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      <Trophy className="h-3.5 w-3.5" />
                      <span>🏆 LGS Genel Deneme</span>
                    </div>
                    <span className="mt-1 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      Tüm Dersler Karma (12 Soru)
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      Türkçe, Mat, Fen, Sözel karma LGS provası
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('mat')}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-indigo-400 hover:shadow-xs dark:border-slate-800 dark:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>📐 Matematik Ustalık</span>
                    </div>
                    <span className="mt-1 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      Çarpanlar &amp; Üslü Sayılar
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      5 soruluk analitik yeni nesil test
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('fen')}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-indigo-400 hover:shadow-xs dark:border-slate-800 dark:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>🧪 Fen Deney &amp; Grafik</span>
                    </div>
                    <span className="mt-1 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      Mevsimler &amp; DNA Kodu
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      Deney kurgulu ve hipotez soruları
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('tr')}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-indigo-400 hover:shadow-xs dark:border-slate-800 dark:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-violet-600 dark:text-violet-400">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>📖 Türkçe Sözel Mantık</span>
                    </div>
                    <span className="mt-1 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      Paragraf &amp; Muhakeme
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      Çıkarım ve mantık kurguları
                    </span>
                  </button>
                </div>
              </div>

              {/* Jeneratör Formu */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                <div>
                  <h2 className="text-base font-black text-slate-900 dark:text-white">
                    Özelleştirilmiş AI Deneme Oluşturucu
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kriterleri belirleyin, Gemini AI resmi MEB soru formatında soruları, çeldiricileri ve çözümleri sizin için anında oluştursun.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Ders Seçimi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Hedef Ders / Kapsam
                    </label>
                    <select
                      value={genCourseKey}
                      onChange={(e) => setGenCourseKey(e.target.value as LgsCourseKey | 'all')}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      <option value="all">🏆 Tüm Dersler (Genel LGS Prova)</option>
                      {LGS_COURSE_OPTIONS.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Soru Sayısı */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Soru Sayısı
                    </label>
                    <select
                      value={genQuestionCount}
                      onChange={(e) => setGenQuestionCount(Number(e.target.value))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      <option value={5}>5 Soru (Hızlı Ünite Testi)</option>
                      <option value={10}>10 Soru (Branş Denemesi)</option>
                      <option value={12}>12 Soru (Orta Prova)</option>
                      <option value={18}>18 Soru (Mega LGS Sınavı)</option>
                    </select>
                  </div>

                  {/* Zorluk Derecesi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Zorluk Düzeyi
                    </label>
                    <select
                      value={genDifficulty}
                      onChange={(e) =>
                        setGenDifficulty(
                          e.target.value as 'Kolay' | 'Orta' | 'LGS Düzeyi' | 'Zorlayıcı'
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      <option value="Kolay">Kolay (Temel Kavrama)</option>
                      <option value="Orta">Orta (Kazanım Pekiştirme)</option>
                      <option value="LGS Düzeyi">LGS Düzeyi (Gerçek Sınav Formatı)</option>
                      <option value="Zorlayıcı">Zorlayıcı (Derece ve Fen Lisesi Hedefli)</option>
                    </select>
                  </div>

                  {/* Konu / Ünite Adı */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Spesifik Konu (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={genTopicName}
                      onChange={(e) => setGenTopicName(e.target.value)}
                      placeholder="Örn: EBOB-EKOK, Cümlede Anlam..."
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Sınav Başlığı */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Özel Sınav Başlığı (Boş bırakırsanız yapay zekâ otomatik kurumsal başlık koyar)
                  </label>
                  <input
                    type="text"
                    value={genExamTitle}
                    onChange={(e) => setGenExamTitle(e.target.value)}
                    placeholder="Örn: 2027 LGS Matematik Altın Karma Deneme..."
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                {/* Üret ve Yayınla Butonu */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleGenerateAiExam}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>MEB Formatında Deneme Üretiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>🤖 Deneme Üret &amp; Canlıya Al</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEB Soru İçe Aktarma */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* Başarı Mesajı */}
              {successMessage && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Hata Mesajı */}
              {parseError && (
                <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                  <span>{parseError}</span>
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      Yeni MEB Denemesi Oluştur
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      MEB PDF&apos;inden kopyaladığınız soru metnini ve şıkları buraya yapıştırın. Yapay zekâ soruları ve cevap anahtarını otomatik eşleştirir.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleFillSampleText}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 transition cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Örnek Metin Doldur</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Sınav Başlığı */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Deneme Başlığı
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Örn: 2027 MEB Matematik Mart Ayı Örnek Soruları"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>

                  {/* Ders Seçimi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Ders
                    </label>
                    <select
                      value={courseKey}
                      onChange={(e) => setCourseKey(e.target.value as LgsCourseKey)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      {LGS_COURSE_OPTIONS.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Süre */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Süre (Dakika)
                    </label>
                    <input
                      type="number"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Ham Metin Alanı */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Ham MEB Soru Metni &amp; Cevap Anahtarı
                  </label>
                  <textarea
                    rows={8}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Soruları, seçenekleri (A, B, C, D) ve varsa cevap anahtarını buraya yapıştırın..."
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800 font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                {/* Ayrıştır Butonu */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    💡 Gemini 3.6 Flash ile sorular, şıklar ve pedagojik çözümler yapılandırılır.
                  </span>

                  <button
                    type="button"
                    onClick={handleParseQuestions}
                    disabled={isParsing}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer"
                  >
                    {isParsing ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Ayrıştırılıyor...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        <span>Yapay Zekâ ile Ayrıştır</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Ayrıştırılan Soruların Önizlemesi */}
              {parsedQuestions.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
                        Ayrıştırılan Sorular Önizleme ({parsedQuestions.length} Soru)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Soruları kontrol edin ve onaylıyorsanız &quot;Sisteme Ekle ve Canlıya Al&quot; butonuna tıklayın.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePublishExam}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Sisteme Ekle &amp; Canlıya Al</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-2">
                    {parsedQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 p-4 text-xs space-y-2 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
                          <span>Soru #{q.questionNumber} - {q.topicName}</span>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800 font-extrabold dark:bg-emerald-950/60 dark:text-emerald-300">
                            Doğru Cevap: {q.correctAnswer}
                          </span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line">
                          {q.questionText}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                          {Object.entries(q.options).map(([k, v]) => (
                            <div key={k} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                              <span className="font-bold mr-1">{k})</span>
                              <span>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 dark:bg-slate-800/40 dark:text-slate-400">
                          <strong>Çözüm:</strong> {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Yayındaki Denemeler Listesi */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {exams.map((exam) => {
                  const isCustom = customExams.some((ce) => ce.id === exam.id);

                  return (
                    <div
                      key={exam.id}
                      className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                            {exam.courseName || 'Genel LGS'}
                          </span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            {exam.badgeText || 'Ücretsiz'}
                          </span>
                          {isCustom && (
                            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                              Panelden Eklenen
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-black text-slate-900 dark:text-white sm:text-base">
                          {exam.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span>{exam.questionCount} Soru</span>
                          <span>&bull;</span>
                          <span>{exam.durationMinutes} Dakika</span>
                          <span>&bull;</span>
                          <span>{exam.difficulty}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Link
                          href={`/deneme-coz/${exam.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <span>Canlıda Çöz</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomExam(exam.id)}
                            title="Denemeyi Sil"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
  );
}
