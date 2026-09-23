'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LISE1_TOPICS_BY_COURSE,
  LISE1_COURSE_OPTIONS,
  Lise1CourseKey,
} from '@/lib/lise1-topics';
import { getLise1StudyNoteByTopicName } from '@/lib/study-notes/lise1-notes';
import { TopicDetailModal } from '@/components/study/TopicDetailModal';
import { CustomExamGeneratorModal } from '@/components/exam/CustomExamGeneratorModal';
import type { TopicStudyNote } from '@/types/study';
import {
  BookOpen,
  School,
  Calculator,
  FlaskConical,
  Atom,
  Dna,
  Landmark,
  Globe2,
  Languages,
  BookHeart,
  ArrowRight,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  Search,
} from 'lucide-react';

function getLise1Icon(key: Lise1CourseKey) {
  const iconClass = 'h-5 w-5';
  switch (key) {
    case 'edebiyat':
      return <BookOpen className={iconClass} />;
    case 'matematik':
      return <Calculator className={iconClass} />;
    case 'fizik':
      return <Atom className={iconClass} />;
    case 'kimya':
      return <FlaskConical className={iconClass} />;
    case 'biyoloji':
      return <Dna className={iconClass} />;
    case 'tarih':
      return <Landmark className={iconClass} />;
    case 'cografya':
      return <Globe2 className={iconClass} />;
    case 'ingilizce':
      return <Languages className={iconClass} />;
    case 'din':
      return <BookHeart className={iconClass} />;
    default:
      return <School className={iconClass} />;
  }
}

export default function Lise1KonulariPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<TopicStudyNote | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [generatorDefaultCourse, setGeneratorDefaultCourse] = useState<string | undefined>(undefined);
  const [generatorDefaultTopic, setGeneratorDefaultTopic] = useState<string | undefined>(undefined);

  const handleTopicClick = (topicName: string, courseKey: Lise1CourseKey) => {
    const note = getLise1StudyNoteByTopicName(topicName, courseKey);
    setSelectedNote(note);
  };

  const filteredCourses = LISE1_COURSE_OPTIONS.filter((c) => {
    if (selectedCourse !== 'all' && c.key !== selectedCourse) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <School className="h-4 w-4" />
          <span>MEB 2026-2027 Lise 1 (9. Sınıf) Müfredatı &amp; Konu Notları</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          9. Sınıf Konuları &amp;{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent">
            MEB Ortak Yazılı Rehberi
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Lise 1 müfredatında yer alan 9 temel dersin tüm ünite ve kazanımları.
          İstediğin konunun üzerine tıkla; <strong>MEB yazılı hap notlarını</strong>, <strong>sınav tuzaklarını</strong> ve <strong>örnek açık uçlu soru çözümlerini</strong> anında incele.
        </p>

        {/* Hızlı Aksiyon Butonları */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/deneme-coz"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
          >
            <FileCheck2 className="h-4 w-4" />
            <span>MEB Ortak Yazılı Provalarını Çöz</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => {
              setGeneratorDefaultCourse(undefined);
              setGeneratorDefaultTopic(undefined);
              setIsGeneratorOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>✨ Özel Pekiştirme Testi Üret</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Calculator className="h-4 w-4 text-emerald-500" />
            <span>Yazılı Notu &amp; Takdir/Teşekkür Hesapla</span>
          </Link>
        </div>
      </section>

      {/* MEB Yeni Yönetmelik Bilgi Kartları */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            MEB Baraj Dersi
          </div>
          <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <span>Edebiyat (70)</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Yeni yönetmeliğe göre Türk Dili ve Edebiyatı geçme barajı 70&apos;tir.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Belge Kriterleri
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            85+ Takdir / 70+ Teşekkür
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Zayıf dersi (50 altı) veya edebiyatı 70 altı olan öğrenci belge alamaz.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            YKS &amp; OBP Vizyonu
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            %25 OBP Katkısı
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            9. sınıf yıl sonu notu üniversite yerleştirme puanını doğrudan etkiler.
          </p>
        </div>
      </section>

      {/* Arama & Ders Filtre Çubuğu */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Arama */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Konu veya ünite adı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Ders Filtre Hapları */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCourse('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCourse === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Tüm Dersler (9)
            </button>
            {LISE1_COURSE_OPTIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCourse(c.key)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCourse === c.key
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {c.name.replace(' (9. Sınıf)', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Bilgilendirme Notu */}
        <div className="flex items-center gap-2 rounded-2xl bg-indigo-50/70 border border-indigo-100 p-3 text-xs text-indigo-800 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-300">
          <Sparkles className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <span>
            💡 <strong>İpucu:</strong> Herhangi bir konunun üzerine tıklayarak <strong>MEB Ortak Yazılı Hap Notu</strong>, <strong>Sınav Tuzakları</strong> ve <strong>Adım Adım Örnek Soru Çözümü</strong> kartını açabilir, Sokratik AI koça soru sorabilirsiniz.
          </span>
        </div>
      </section>

      {/* Ders ve Konu Kartları */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const rawTopics = LISE1_TOPICS_BY_COURSE[course.key] || [];
            const topics = searchQuery.trim()
              ? rawTopics.filter((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
              : rawTopics;

            if (searchQuery.trim() && topics.length === 0) return null;

            const icon = getLise1Icon(course.key);

            return (
              <div
                key={course.key}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
              >
                {/* Üst Ders Başlığı */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${course.colorTheme.bg} ${course.colorTheme.text} border ${course.colorTheme.border}`}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white">
                        {course.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Haftalık {course.weeklyHours} Saat
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded-xl px-2 py-0.5 text-[10px] font-black ${course.colorTheme.badge}`}
                  >
                    {topics.length} Konu
                  </span>
                </div>

                {/* Baraj Uyarısı (Edebiyat için) */}
                {course.isPassingRequirement && (
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 p-2 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>MEB Baraj Dersi: Geçme notu en az 70 puandır.</span>
                  </div>
                )}

                {/* Tıklanabilir İnteraktif Konu Listesi */}
                <div className="mt-3 flex-1 space-y-1.5 overflow-y-auto max-h-72 pr-1 text-xs">
                  {topics.map((topic, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleTopicClick(topic, course.key)}
                      className="group flex w-full items-start justify-between gap-2 rounded-xl p-2 text-left text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-900 dark:text-slate-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-200 transition cursor-pointer border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/60"
                      title="MEB Yazılı Notu ve Örnek Sorusunu İncele"
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 group-hover:bg-emerald-200 group-hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-emerald-900 dark:group-hover:text-emerald-200 transition">
                          {i + 1}
                        </span>
                        <span className="leading-snug text-xs font-medium truncate sm:whitespace-normal">
                          {topic}
                        </span>
                      </div>

                      <span className="shrink-0 hidden group-hover:inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
                        Hap Not ➔
                      </span>
                    </button>
                  ))}
                </div>

                {/* Alt Aksiyon */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                  <Link
                    href={`/deneme-coz?filter=${course.key}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2 px-2 text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 transition text-center"
                  >
                    <FileCheck2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Yazılı Provası</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setGeneratorDefaultCourse(course.key);
                      setGeneratorDefaultTopic(undefined);
                      setIsGeneratorOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-purple-50 py-2 px-2 text-[11px] font-bold text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 transition cursor-pointer text-center"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-600" />
                    <span className="truncate">Özel Test Üret</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Konu Notu & MEB Yazılı Soru Modalı */}
      {selectedNote && (
        <TopicDetailModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {/* Özel Pekiştirme Testi Üretici Modalı */}
      {isGeneratorOpen && (
        <CustomExamGeneratorModal
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
          defaultCourse={generatorDefaultCourse}
          defaultTopic={generatorDefaultTopic}
        />
      )}
    </div>
  );
}
