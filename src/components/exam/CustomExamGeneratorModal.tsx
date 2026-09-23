'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LGS_TOPICS_BY_COURSE } from '@/lib/lgs-topics';
import { LISE1_TOPICS_BY_COURSE, LISE1_COURSE_OPTIONS, Lise1CourseKey } from '@/lib/lise1-topics';
import type { LgsCourseKey } from '@/types/exam';
import type { OnlineExam } from '@/types/online-exam';
import { useGradeTier } from '@/lib/grade-tier';
import {
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Layers,
  Zap,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  ArrowRight,
  Flame,
  Award,
  School,
  GraduationCap,
} from 'lucide-react';

interface CustomExamGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultTopic?: string;
}

const LGS_COURSES = [
  { key: 'matematik', name: 'Matematik', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
  { key: 'fen', name: 'Fen Bilimleri', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 10 },
  { key: 'turkce', name: 'Türkçe', iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60', defaultQuestionCount: 10 },
  { key: 'inkilap', name: 'İnkılap Tarihi', iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60', defaultQuestionCount: 5 },
  { key: 'din', name: 'Din Kültürü', iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60', defaultQuestionCount: 5 },
  { key: 'ingilizce', name: 'İngilizce', iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60', defaultQuestionCount: 5 },
  { key: 'all', name: 'Genel LGS Karma (Tüm Dersler)', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const LISE1_COURSES = [
  { key: 'matematik', name: 'Matematik (9. Sınıf)', iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60', defaultQuestionCount: 10 },
  { key: 'edebiyat', name: 'Türk Dili ve Edebiyatı', iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60', defaultQuestionCount: 10 },
  { key: 'fizik', name: 'Fizik', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
  { key: 'kimya', name: 'Kimya', iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60', defaultQuestionCount: 10 },
  { key: 'biyoloji', name: 'Biyoloji', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 10 },
  { key: 'tarih', name: 'Tarih', iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60', defaultQuestionCount: 5 },
  { key: 'cografya', name: 'Coğrafya', iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60', defaultQuestionCount: 5 },
  { key: 'all', name: '9. Sınıf Genel Ortak Yazılı Karma', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const QUESTION_COUNTS = [
  { count: 5, label: '5 Soru (Hızlı Pekiştirme)', desc: '~10 dakika' },
  { count: 10, label: '10 Soru (Konu Tarama Testi)', desc: '~20 dakika' },
  { count: 15, label: '15 Soru (Kapsamlı Test)', desc: '~30 dakika' },
  { count: 20, label: '20 Soru (Tam Deneme)', desc: '~40 dakika' },
];

export function CustomExamGeneratorModal({
  isOpen,
  onClose,
  defaultCourse = 'matematik',
  defaultTopic = 'all',
}: CustomExamGeneratorModalProps) {
  const router = useRouter();
  const { isLise1 } = useGradeTier();

  const coursesList = isLise1 ? LISE1_COURSES : LGS_COURSES;
  const [selectedCourse, setSelectedCourse] = useState<string>(defaultCourse);
  const [selectedTopic, setSelectedTopic] = useState<string>(defaultTopic || 'all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>(isLise1 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Kademeye göre dersleri güncelle
  useEffect(() => {
    setSelectedCourse(defaultCourse);
    setSelectedTopic(defaultTopic || 'all');
    setDifficulty(isLise1 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi');
  }, [isLise1, defaultCourse, defaultTopic]);

  if (!isOpen) return null;

  const currentCourseTopics: readonly string[] =
    selectedCourse !== 'all'
      ? isLise1
        ? (LISE1_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
        : (LGS_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
      : [];

  const LOADING_MESSAGES = isLise1
    ? [
        'MEB 9. Sınıf ortak yazılı senaryoları taranıyor...',
        'Yeni nesil ve klasik kazanım soruları kurgulanıyor...',
        'Çeldirici şıklar ve pedagojik çözümler hazırlanıyor...',
        'Sokratik ipuçları oluşturuluyor...',
        '9. Sınıf prova sınavın yükleniyor, birkaç saniye...',
      ]
    : [
        'MEB 2027 LGS kazanım havuzu taranıyor...',
        'Yeni nesil beceri temelli sorular kurgulanıyor...',
        'Çeldirici şıklar ve sayısal tutarlılık doğrulanıyor...',
        'Detaylı çözümler ve Sokratik ipuçları hazırlanıyor...',
        'Özel denemeniz sisteme yükleniyor, birkaç saniye...',
      ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % LOADING_MESSAGES.length;
      setLoadingMessageIndex(step);
    }, 2200);

    try {
      const courseObj = coursesList.find((c) => c.key === selectedCourse);
      const courseName = courseObj?.name || 'Matematik';
      const topicLabel = selectedTopic === 'all' ? 'Genel Karma' : selectedTopic;

      const autoTitle =
        selectedCourse === 'all'
          ? isLise1
            ? `9. Sınıf MEB Ortak Yazılı Provası (${difficulty})`
            : `2027 LGS Özel Karma Deneme (${difficulty})`
          : `${courseName}: ${topicLabel} Pekiştirme Testi`;

      const response = await fetch('/api/ai/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: isLise1 ? 'lise1' : 'lgs',
          examTitle: autoTitle,
          courseKey: selectedCourse,
          topicName: selectedTopic === 'all' ? undefined : selectedTopic,
          questionCount: questionCount,
          difficulty: difficulty,
          examType: isLise1 ? 'yazili' : selectedCourse === 'all' ? 'full' : 'branch',
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Test oluşturulurken bir hata oluştu.');
      }

      const generatedExam = (await response.json()) as OnlineExam;

      const uniqueSuffix = Date.now().toString(36);
      if (!generatedExam.id) generatedExam.id = `custom-ai-${uniqueSuffix}`;
      if (!generatedExam.slug) {
        generatedExam.slug = `ozel-test-${selectedCourse}-${uniqueSuffix}`;
      }
      generatedExam.tier = isLise1 ? 'lise1' : 'lgs';

      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('lgs_custom_exams_v1');
          const list: OnlineExam[] = raw ? JSON.parse(raw) : [];
          list.unshift(generatedExam);
          localStorage.setItem('lgs_custom_exams_v1', JSON.stringify(list));
        } catch (storageErr) {
          console.error('LocalStorage write error:', storageErr);
        }
      }

      setLoading(false);
      onClose();
      router.push(`/deneme-coz/${generatedExam.slug}`);
    } catch (err: unknown) {
      clearInterval(interval);
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.';
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-indigo-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Kapat Butonu */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer disabled:opacity-40"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Başlığı */}
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md ${
            isLise1
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-600 shadow-emerald-500/25'
              : 'bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-indigo-500/25'
          }`}>
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isLise1 ? '9. Sınıf Pekiştirme Testi & Ortak Yazılı Provası Oluştur' : 'LGS Kişiselleştirilmiş Pekiştirme Testi Oluştur'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isLise1 ? '9. Sınıf MEB müfredatından eksik olduğun ders ve konuyu seç, anında yapay zekâ testi çöz.' : 'Eksik olduğun ders ve konuyu seç, yapay zekâ saniyeler içinde sana özel yeni nesil test hazırlasın.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="mt-6 space-y-6">
          {/* 1. Ders Seçimi */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
              <span>1. DERS SEÇİMİ</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {coursesList.map((c) => {
                const isSelected = selectedCourse === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setSelectedCourse(c.key);
                      setSelectedTopic('all');
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center transition cursor-pointer ${
                      isSelected
                        ? isLise1
                          ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30 font-bold'
                          : 'border-indigo-600 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/30 font-bold'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs text-slate-800 dark:text-slate-200">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Konu Seçimi */}
          {selectedCourse !== 'all' && currentCourseTopics.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-500" />
                <span>2. MEB KAZANIM KONUSU SEÇİMİ</span>
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs font-bold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="all">Tüm Konulardan Karma Sorular</option>
                {currentCourseTopics.map((topic, i) => (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 3. Soru Sayısı */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-indigo-500" />
              <span>3. SORU SAYISI</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUESTION_COUNTS.map((qc) => {
                const isSelected = questionCount === qc.count;
                return (
                  <button
                    key={qc.count}
                    type="button"
                    onClick={() => setQuestionCount(qc.count)}
                    className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer ${
                      isSelected
                        ? isLise1
                          ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30'
                          : 'border-indigo-600 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/30'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-sm font-black text-slate-900 dark:text-white">{qc.count} Soru</div>
                    <div className="text-[10px] text-slate-500">{qc.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Zorluk Seviyesi */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>4. ZORLUK SEVİYESİ</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(isLise1
                ? [
                    { level: 'Kolay', label: 'Temel Seviye' },
                    { level: 'MEB Yazılı Düzeyi', label: 'Yazılı Standardı' },
                    { level: 'YKS (TYT) Düzeyi', label: 'TYT Seviyesi' },
                    { level: 'Zorlayıcı', label: 'İleri Düzey' },
                  ]
                : [
                    { level: 'Kolay', label: 'Temel Seviye' },
                    { level: 'Orta', label: 'Kazanım Düzeyi' },
                    { level: 'LGS Düzeyi', label: 'LGS Yeni Nesil' },
                    { level: 'Zorlayıcı', label: 'Derece Düzeyi' },
                  ]
              ).map((d) => {
                const isSelected = difficulty === d.level;
                return (
                  <button
                    key={d.level}
                    type="button"
                    onClick={() => setDifficulty(d.level)}
                    className={`p-2.5 rounded-2xl border-2 text-center transition cursor-pointer ${
                      isSelected
                        ? isLise1
                          ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/30 font-bold'
                          : 'border-indigo-600 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/30 font-bold'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Oluştur Butonu */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl p-4 text-sm font-black text-white shadow-xl transition cursor-pointer disabled:opacity-60 ${
                isLise1
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{LOADING_MESSAGES[loadingMessageIndex]}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>{questionCount} Soruluk Testi Şimdi Oluştur &amp; Başla</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
