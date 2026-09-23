'use client';

import React, { useState, useMemo } from 'react';
import type { LgsCourseKey } from '@/types/exam';
import type { TopicStudyNote } from '@/types/study';
import { LGS_TOPICS_BY_COURSE, LGS_COURSE_OPTIONS, getCourseName } from '@/lib/lgs-topics';
import { getStudyNoteByTopicName, FEATURED_STUDY_NOTES } from '@/lib/lgs-study-notes';
import { TopicDetailModal } from '@/components/study/TopicDetailModal';
import { CustomExamGeneratorModal } from '@/components/exam/CustomExamGeneratorModal';
import {
  Search,
  BookOpen,
  Sparkles,
  Calculator,
  Atom,
  Compass,
  Heart,
  Globe,
  Lightbulb,
  ChevronRight,
  Flame,
} from 'lucide-react';

export function TopicStudyGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<LgsCourseKey | 'all'>('all');
  const [activeNote, setActiveNote] = useState<TopicStudyNote | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [generatorCourse, setGeneratorCourse] = useState<string | undefined>(undefined);
  const [generatorTopic, setGeneratorTopic] = useState<string | undefined>(undefined);

  // Tüm konuları düz bir liste olarak hazırla
  const allTopics = useMemo(() => {
    const list: { courseKey: LgsCourseKey; topicName: string; isFeatured: boolean }[] = [];

    for (const course of LGS_COURSE_OPTIONS) {
      const topics = LGS_TOPICS_BY_COURSE[course.key] || [];
      for (const t of topics) {
        const isFeatured = FEATURED_STUDY_NOTES.some(
          (fn) => fn.topicName.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(fn.topicName.toLowerCase())
        );
        list.push({ courseKey: course.key, topicName: t, isFeatured });
      }
    }
    return list;
  }, []);

  // Filtreleme mantığı
  const filteredTopics = useMemo(() => {
    return allTopics.filter((item) => {
      const matchesCourse = selectedCourse === 'all' || item.courseKey === selectedCourse;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCourseName(item.courseKey).toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCourse && matchesSearch;
    });
  }, [allTopics, selectedCourse, searchQuery]);

  const handleOpenNote = (topicName: string, courseKey: LgsCourseKey) => {
    const note = getStudyNoteByTopicName(topicName, courseKey);
    setActiveNote(note);
  };

  const getCourseIcon = (courseKey: LgsCourseKey) => {
    switch (courseKey) {
      case 'matematik':
        return <Calculator className="h-4 w-4" />;
      case 'turkce':
        return <BookOpen className="h-4 w-4" />;
      case 'fen':
        return <Atom className="h-4 w-4" />;
      case 'inkilap':
        return <Compass className="h-4 w-4" />;
      case 'din':
        return <Heart className="h-4 w-4" />;
      case 'ingilizce':
        return <Globe className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Arama Çubuğu ve Ders Filtresi */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Arama Inputu */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Konu veya kavram ara (örn: EBOB, fiilimsiler, basınç...)"
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Ders Tab Butonları & Özel Test Üret Butonu */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCourse('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
              selectedCourse === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            Tüm Dersler ({allTopics.length})
          </button>

          {LGS_COURSE_OPTIONS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCourse(c.key)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCourse === c.key
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {getCourseIcon(c.key)}
              <span>{c.name.split(' ')[0]}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setGeneratorCourse(selectedCourse === 'all' ? undefined : selectedCourse);
              setGeneratorTopic(undefined);
              setIsGeneratorOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer shrink-0 ml-auto sm:ml-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>✨ Özel Test Üret</span>
          </button>
        </div>
      </div>

      {/* Konu Kartları Gridi */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((item) => (
          <div
            key={`${item.courseKey}-${item.topicName}`}
            onClick={() => handleOpenNote(item.topicName, item.courseKey)}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700/60 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {getCourseIcon(item.courseKey)}
                  {getCourseName(item.courseKey)}
                </span>

                {item.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />
                    Kilit Konu
                  </span>
                )}
              </div>

              <h3 className="mt-2.5 text-sm font-black text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {item.topicName}
              </h3>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-indigo-600 dark:border-slate-800 dark:text-indigo-400">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Hap Anlatım &amp; AI Koç
              </span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="py-12 text-center rounded-3xl border border-dashed border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
          <h4 className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            Aramanızla eşleşen konu bulunamadı
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Arama terimini değiştirerek veya filtreleri temizleyerek tekrar deneyin.
          </p>
        </div>
      )}

      {/* İnteraktif Hap Not Modalı */}
      {activeNote && (
        <TopicDetailModal
          note={activeNote}
          onClose={() => setActiveNote(null)}
        />
      )}

      {/* Özel Pekiştirme Testi Üretici Modalı */}
      {isGeneratorOpen && (
        <CustomExamGeneratorModal
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
          defaultCourse={generatorCourse}
          defaultTopic={generatorTopic}
        />
      )}
    </div>
  );
}
