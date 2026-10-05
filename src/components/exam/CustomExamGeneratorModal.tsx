'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LGS_TOPICS_BY_COURSE } from '@/lib/lgs-topics';
import { LISE1_TOPICS_BY_COURSE } from '@/lib/lise1-topics';
import { LISE2_TOPICS_BY_COURSE } from '@/lib/lise2-topics';
import { LISE3_TOPICS_BY_COURSE } from '@/lib/lise3-topics';
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
  Trophy,
} from 'lucide-react';

interface CustomExamGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultTopic?: string;
}

const LGS_COURSES = [
  { key: 'matematik', name: 'Matematik (LGS)', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
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
  { key: 'ingilizce', name: 'İngilizce (9. Sınıf)', iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60', defaultQuestionCount: 10 },
  { key: 'din', name: 'Din Kültürü ve Ahlak Bilgisi', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 5 },
  { key: 'all', name: '9. Sınıf Genel Ortak Yazılı Karma', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const LISE2_COURSES = [
  { key: 'matematik', name: 'Matematik (10. Sınıf)', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 10 },
  { key: 'fizik', name: 'Fizik (10. Sınıf)', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
  { key: 'kimya', name: 'Kimya (10. Sınıf)', iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60', defaultQuestionCount: 10 },
  { key: 'biyoloji', name: 'Biyoloji (10. Sınıf)', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 10 },
  { key: 'edebiyat', name: 'Türk Dili ve Edebiyatı', iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60', defaultQuestionCount: 10 },
  { key: 'tarih', name: 'Tarih (10. Sınıf)', iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60', defaultQuestionCount: 5 },
  { key: 'cografya', name: 'Coğrafya (10. Sınıf)', iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60', defaultQuestionCount: 5 },
  { key: 'felsefe', name: 'Felsefe (10. Sınıf)', iconColor: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60', defaultQuestionCount: 5 },
  { key: 'all', name: '10. Sınıf Genel MEB Ortak Yazılı Karma', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const LISE3_COURSES = [
  { key: 'matematik', name: 'İleri Matematik (11. Sınıf)', iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60', defaultQuestionCount: 10 },
  { key: 'fizik', name: 'İleri Fizik (11. Sınıf)', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
  { key: 'kimya', name: 'İleri Kimya (11. Sınıf)', iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60', defaultQuestionCount: 10 },
  { key: 'biyoloji', name: 'İleri Biyoloji (11. Sınıf)', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 10 },
  { key: 'edebiyat', name: 'Türk Dili ve Edebiyatı', iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60', defaultQuestionCount: 10 },
  { key: 'tarih', name: 'Tarih (11. Sınıf)', iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60', defaultQuestionCount: 5 },
  { key: 'cografya', name: 'Seçmeli Coğrafya', iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60', defaultQuestionCount: 5 },
  { key: 'felsefe', name: 'Felsefe Grubu', iconColor: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60', defaultQuestionCount: 5 },
  { key: 'ingilizce', name: 'İngilizce (11. Sınıf)', iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60', defaultQuestionCount: 10 },
  { key: 'din', name: 'Din Kültürü ve Ahlak Bilgisi', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 5 },
  { key: 'all', name: '11. Sınıf Alan Karma Denemesi', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const YKS_COURSES = [
  { key: 'ayt-matematik', name: 'AYT Matematik', iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60', defaultQuestionCount: 10 },
  { key: 'tyt-matematik', name: 'TYT Temel Matematik', iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60', defaultQuestionCount: 10 },
  { key: 'ayt-fizik', name: 'AYT Fizik', iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60', defaultQuestionCount: 10 },
  { key: 'ayt-kimya', name: 'AYT Kimya', iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60', defaultQuestionCount: 10 },
  { key: 'ayt-biyoloji', name: 'AYT Biyoloji', iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60', defaultQuestionCount: 10 },
  { key: 'ayt-edebiyat', name: 'AYT Türk Dili ve Edebiyatı', iconColor: 'text-pink-500 bg-pink-50 dark:bg-pink-950/60', defaultQuestionCount: 10 },
  { key: 'tyt-turkce', name: 'TYT Türkçe & Paragraf', iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60', defaultQuestionCount: 10 },
  { key: 'tyt-fen', name: 'TYT Fen Bilimleri Karma', iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60', defaultQuestionCount: 10 },
  { key: 'tyt-sosyal', name: 'TYT Sosyal Bilimler Karma', iconColor: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60', defaultQuestionCount: 10 },
  { key: 'ydt-ingilizce', name: 'YDT İngilizce', iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60', defaultQuestionCount: 10 },
  { key: 'all', name: 'YKS Karma Prova Denemesi', iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60', defaultQuestionCount: 15 },
];

const YKS_TOPICS_BY_COURSE: Record<string, readonly string[]> = {
  'ayt-matematik': ['Trigonometri', 'Logaritma', 'Diziler', 'Limit ve Süreklilik', 'Türev ve Uygulamaları', 'İntegral', 'Polinomlar', 'Parabol', '2. Dereceden Denklemler'],
  'tyt-matematik': ['Temel Kavramlar', 'Bölünebilme Kuralları', 'EBOB-EKOK', 'Rasyonel Sayılar', 'Basit Eşitsizlikler', 'Mutlak Değer', 'Üslü & Köklü İfadeler', 'Çarpanlara Ayırma', 'Problemler', 'Fonksiyonlar'],
  'ayt-fizik': ['Vektörler ve Bağıl Hareket', 'Newton Yasaları', 'İki Boyutta Atışlar', 'İş-Güç-Enerji', 'İtme ve Çizgisel Momentum', 'Tork ve Denge', 'Elektriksel Kuvvet ve Potansiyel', 'Manyetizma ve İndüksiyon', 'Basit Harmonik Hareket', 'Dalga Mekaniği'],
  'ayt-kimya': ['Modern Atom Teorisi', 'Gazlar', 'Sıvı Çözeltiler ve Derişim', 'Kimyasal Tepkimelerde Enerji', 'Tepkime Hızları', 'Kimyasal Denge', 'Asit-Baz Dengesi', 'Kimya ve Elektrik (Piller)', 'Organik Kimya'],
  'ayt-biyoloji': ['Sinir Sistemi', 'Endokrin Sistem', 'Duyu Organları', 'Destek ve Hareket', 'Sindirim Sistemi', 'Dolaşım ve Bağışıklık', 'Solunum Sistemi', 'Boşaltım Sistemi', 'Genden Proteine', 'Hücresel Solunum ve Fotosentez'],
  'ayt-edebiyat': ['Şiir Bilgisi & Edebi Sanatlar', 'İslamiyet Öncesi ve Geçiş Dönemi', 'Divan Edebiyatı', 'Tanzimat Edebiyatı', 'Servet-i Fünun', 'Milli Edebiyat', 'Cumhuriyet Dönemi Edebiyatı'],
  'tyt-turkce': ['Sözcükte Anlam', 'Cümlede Anlam', 'Paragrafta Anlam ve Yapı', 'Anlatım Teknikleri', 'Ses Bilgisi', 'Yazım Kuralları & Noktalama', 'Sözcük Türleri', 'Cümlenin Ögeleri'],
  'tyt-fen': ['Fizik: Hareket, Isı-Sıcaklık, Optik', 'Kimya: Maddenin Halleri, Kimyasal Türler', 'Biyoloji: Hücre, Canlıların Sınıflandırılması, Kalıtım'],
  'tyt-sosyal': ['Tarih: İlk Türk Devletleri, Osmanlı, Kurtuluş Savaşı', 'Coğrafya: Doğa ve İnsan, Harita Bilgisi, İklim, Nüfus', 'Felsefe & Din: Bilgi Felsefesi, Ahlak Felsefesi, İnanç'],
  'ydt-ingilizce': ['Vocabulary & Phrasal Verbs', 'Grammar & Modals', 'Reading Comprehension', 'Cloze Test & Sentence Completion', 'Translation & Dialogue'],
};

const QUESTION_COUNTS = [
  { count: 5, label: '5 Soru (Hızlı Pekiştirme)', desc: '~10 dakika' },
  { count: 10, label: '10 Soru (Konu Tarama Testi)', desc: '~20 dakika' },
  { count: 15, label: '15 Soru (Kapsamlı Test)', desc: '~30 dakika' },
  { count: 20, label: '20 Soru (Tam Deneme)', desc: '~40 dakika' },
];

export function CustomExamGeneratorModal({
  isOpen,
  onClose,
  defaultCourse,
  defaultTopic = 'all',
}: CustomExamGeneratorModalProps) {
  const router = useRouter();
  const { isLise1, isLise2, isLise3, isYks, isLgs, config } = useGradeTier();

  const activeTier = isYks ? 'yks' : isLise3 ? 'lise3' : isLise2 ? 'lise2' : isLise1 ? 'lise1' : 'lgs';

  const coursesList = isYks
    ? YKS_COURSES
    : isLise3
    ? LISE3_COURSES
    : isLise2
    ? LISE2_COURSES
    : isLise1
    ? LISE1_COURSES
    : LGS_COURSES;

  const initialCourse = defaultCourse || (isYks ? 'ayt-matematik' : isLise3 ? 'matematik' : isLise2 ? 'matematik' : isLise1 ? 'edebiyat' : 'matematik');

  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourse);
  const [selectedTopic, setSelectedTopic] = useState<string>(defaultTopic || 'all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>(
    isYks ? 'ÖSYM YKS Düzeyi' : isLise1 || isLise2 || isLise3 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Kademeye göre dersleri güncelle
  useEffect(() => {
    setSelectedCourse(initialCourse);
    setSelectedTopic(defaultTopic || 'all');
    setDifficulty(isYks ? 'ÖSYM YKS Düzeyi' : isLise1 || isLise2 || isLise3 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi');
  }, [activeTier, initialCourse, defaultTopic]);

  if (!isOpen) return null;

  const currentCourseTopics: readonly string[] =
    selectedCourse !== 'all'
      ? isYks
        ? YKS_TOPICS_BY_COURSE[selectedCourse] || []
        : isLise3
        ? (LISE3_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
        : isLise2
        ? (LISE2_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
        : isLise1
        ? (LISE1_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
        : (LGS_TOPICS_BY_COURSE as Record<string, readonly string[]>)[selectedCourse] || []
      : [];

  const LOADING_MESSAGES = isYks
    ? [
        'ÖSYM YKS sınav standartları taranıyor...',
        'Seçtiğin konudan 5 seçenekli soru kalıpları analiz ediliyor...',
        'Önce soru çözülüyor, şıklar ve pedagojik çözümler çift yönlü doğrulanıyor...',
        'Formüller Unicode üst simgelere dönüştürülüyor...',
        'YKS denemen hazırlandı, açılıyor...',
      ]
    : isLise1 || isLise2 || isLise3
    ? [
        'MEB Ortak Yazılı senaryoları taranıyor...',
        'Seçtiğin konudan yazılı düzeyi sorular üretiliyor...',
        'Adım adım çözüm anahtarları ve pedagojik puanlama hazırlanıyor...',
        'Sınav formatı derleniyor...',
        'Yazılı provan hazırlandı, açılıyor...',
      ]
    : [
        'MEB 2027 LGS kazanım haritası taranıyor...',
        'Yapay zekâ yeni nesil, görsel-mantık sorusunu kurguluyor...',
        'Önce soruyu çözüyor, ardından şıkları ve doğru cevabı kesinleştiriyor...',
        'Çözüm adımları ve Sokratik ipucu kontrol ediliyor...',
        'Deneme oluşturuldu, başlatılıyor...',
      ];

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    setLoadingMessageIndex(0);

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2200);

    try {
      const courseObj = coursesList.find((c) => c.key === selectedCourse);
      const courseName = courseObj ? courseObj.name : selectedCourse;
      const topicLabel = selectedTopic === 'all' ? 'Tüm Konular' : selectedTopic;

      const autoTitle =
        selectedCourse === 'all'
          ? isYks
            ? `YKS Özel Karma Deneme (${difficulty})`
            : isLise1 || isLise2 || isLise3
            ? `${config.label} MEB Ortak Yazılı Provası (${difficulty})`
            : `2027 LGS Özel Karma Deneme (${difficulty})`
          : `${courseName}: ${topicLabel} Pekiştirme Testi`;

      const response = await fetch('/api/ai/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: activeTier,
          examTitle: autoTitle,
          courseKey: selectedCourse,
          topicName: selectedTopic === 'all' ? undefined : selectedTopic,
          questionCount: questionCount,
          difficulty: difficulty,
          examType: isLise1 || isLise2 || isLise3 ? 'yazili' : selectedCourse === 'all' ? 'full' : 'branch',
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
      generatedExam.tier = activeTier;

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
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{config.label} &bull; Yapay Zekâ Destekli Soru Üretici</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Eksik Olduğun Konudan Özel Test Üret
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Dersini, takıldığın kazanımı ve soru sayısını belirle; sistem çift katmanlı sağlama korumasıyla yepyeni sorular hazırlasın.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          /* Yüklenme Ekranı */
          <div className="my-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin dark:border-indigo-950 dark:border-t-indigo-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1 max-w-sm">
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Sorular Matematiksel Olarak Çözülüyor...
              </h4>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold min-h-[32px] transition-all">
                {LOADING_MESSAGES[loadingMessageIndex]}
              </p>
            </div>
            <span className="text-[11px] text-slate-400">
              Çift katmanlı doğrulama ve formül sağlama devrede &bull; Lütfen bekleyin
            </span>
          </div>
        ) : (
          /* Form Alanı */
          <div className="mt-6 space-y-6">
            {/* 1. Ders Seçimi */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                1. Dersi Seçin
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {coursesList.map((course) => {
                  const isSelected = selectedCourse === course.key;
                  return (
                    <button
                      key={course.key}
                      type="button"
                      onClick={() => {
                        setSelectedCourse(course.key);
                        setSelectedTopic('all');
                      }}
                      className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300'
                      }`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs ${course.iconColor}`}>
                        <BookOpen className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{course.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Konu Seçimi */}
            {selectedCourse !== 'all' && currentCourseTopics.length > 0 && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  2. Odaklanmak İstediğin Konuyu Seçin
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-1 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectedTopic('all')}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedTopic === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    ✨ Tüm Konulardan Karışık
                  </button>
                  {currentCourseTopics.map((topic) => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Soru Sayısı ve Zorluk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Soru Sayısı */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  3. Soru Sayısı
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {QUESTION_COUNTS.map((opt) => {
                    const isSelected = questionCount === opt.count;
                    return (
                      <button
                        key={opt.count}
                        type="button"
                        onClick={() => setQuestionCount(opt.count)}
                        className={`rounded-2xl border p-2.5 text-center transition cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300'
                        }`}
                      >
                        <span className="block text-sm font-black">{opt.count} Soru</span>
                        <span className="block text-[10px] text-slate-400">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zorluk Düzeyi */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  4. Hedef Zorluk
                </label>
                <div className="space-y-2">
                  {[
                    isYks ? 'ÖSYM YKS Düzeyi' : isLise1 || isLise2 || isLise3 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi',
                    'Yeni Nesil / Beceri Temelli',
                    'Temel Kavrama / Kolay',
                  ].map((level) => {
                    const isSelected = difficulty === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`w-full flex items-center justify-between rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300'
                        }`}
                      >
                        <span>{level}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Alt Aksiyon Butonları */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 text-center sm:text-left">
                ⚡ {questionCount} soru &bull; {isLgs ? '4 seçenekli (A-D)' : '5 seçenekli (A-E)'} &bull; Sokratik ipuçlu
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Testi Oluştur &amp; Başla</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
