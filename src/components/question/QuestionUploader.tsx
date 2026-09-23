'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import type { LgsCourseKey } from '@/types/exam';
import type { WrongQuestionItem } from '@/types/question';
import {
  LGS_COURSE_OPTIONS,
  getTopicsByCourse,
  getCourseName,
} from '@/lib/lgs-topics';
import { saveQuestionToStorage } from '@/lib/question-storage';
import { useAuth } from '@/components/auth/AuthProvider';
import { compressImage, uploadQuestionImage } from '@/lib/storage';
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Plus,
  FileText,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';

interface QuestionUploaderProps {
  onQuestionAdded?: (newQuestion: WrongQuestionItem) => void;
  onCancel?: () => void;
}

export function QuestionUploader({ onQuestionAdded, onCancel }: QuestionUploaderProps) {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<LgsCourseKey>('matematik');
  const [selectedTopic, setSelectedTopic] = useState<string>(
    getTopicsByCourse('matematik')[0] || ''
  );
  const [studentNote, setStudentNote] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isAnalyzingTopic, setIsAnalyzingTopic] = useState<boolean>(false);
  const [detectedByAi, setDetectedByAi] = useState<boolean>(false);
  const [showManualSelect, setShowManualSelect] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ders değiştiğinde konuyu o dersin ilk konusuna güncelle
  const handleCourseChange = (courseKey: LgsCourseKey) => {
    setSelectedCourse(courseKey);
    const topics = getTopicsByCourse(courseKey);
    setSelectedTopic(topics[0] || '');
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Görsel boyutu en fazla 8MB olabilir.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setIsCompressing(true);
    setDetectedByAi(false);

    try {
      const compressed = await compressImage(file);
      setImagePreview(compressed);

      // Yapay Zekâ ile ders ve konuyu otomatik tespit et
      setIsAnalyzingTopic(true);
      fetch('/api/ai/classify-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionImage: compressed }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isAiDetected && data.courseKey && data.topicName) {
            setSelectedCourse(data.courseKey);
            setSelectedTopic(data.topicName);
            setDetectedByAi(true);
          }
        })
        .catch((err) => {
          console.warn('Otomatik konu tespit uyarısı:', err);
        })
        .finally(() => {
          setIsAnalyzingTopic(false);
        });
    } catch {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setDetectedByAi(false);
    setShowManualSelect(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setErrorMessage('Lütfen çözemediğiniz sorunun fotoğrafını yükleyin.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      let finalImageUrl = imagePreview;

      if (selectedFile) {
        const { url } = await uploadQuestionImage(selectedFile, user?.id);
        finalImageUrl = url;
      }

      const courseName = getCourseName(selectedCourse);
      const newQuestion = saveQuestionToStorage({
        courseKey: selectedCourse,
        courseName,
        topicName: selectedTopic,
        imageUrl: finalImageUrl,
        studentNote: studentNote.trim() ? studentNote.trim() : undefined,
        status: 'unresolved',
        isResolved: false,
        aiHintHistory: [],
      }, user?.id);

      // Formu sıfırla
      setImagePreview(null);
      setSelectedFile(null);
      setStudentNote('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (onQuestionAdded) {
        onQuestionAdded(newQuestion);
      }
    } catch (err) {
      console.error('Soru kaydetme hatası:', err);
      setErrorMessage('Soru kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTopics = getTopicsByCourse(selectedCourse);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Yanlış Defteri&apos;ne Soru Ekle
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Denemede veya soru bankasında takıldığın soruyu yükle, yapay zekâ sana özel ipucu üretsin.
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sol Alan: Görsel Yükleme & Önizleme */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Soru Fotoğrafı *
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {isCompressing ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50/40 p-8 text-center dark:border-indigo-900/40 dark:bg-indigo-950/20">
              <Sparkles className="h-6 w-6 animate-pulse text-indigo-600" />
              <p className="mt-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                Görsel optimize ediliyor...
              </p>
            </div>
          ) : !imagePreview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-400 dark:bg-indigo-950/30'
                  : 'border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <UploadCloud className="h-6 w-6" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Görseli sürükleyin veya seçin
              </h4>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG veya WEBP (Maksimum 8MB)
              </p>
              <button
                type="button"
                className="mt-4 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-indigo-300"
              >
                Dosya Seç
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5 dark:border-slate-800">
              <div className="flex max-h-72 items-center justify-center p-2">
                <img
                  src={imagePreview}
                  alt="Soru Önizlemesi"
                  className="max-h-64 w-auto rounded-xl object-contain shadow-sm"
                />
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> Görsel hazırlandı
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Değiştir
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sağ Alan: Ders, Konu ve Öğrenci Notu */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            {/* Yapay Zekâ Analiz Durumu */}
            {isAnalyzingTopic && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/80 p-3.5 dark:border-indigo-900/50 dark:bg-indigo-950/40">
                <Sparkles className="h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Yapay Zekâ Soruyu Okuyor...
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-300">
                    Görseldeki soru metni taranıyor; ders ve alt ünite otomatik belirleniyor.
                  </div>
                </div>
              </div>
            )}

            {/* Yapay Zekâ Tespit Rozeti */}
            {detectedByAi && !isAnalyzingTopic && (
              <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Ders &amp; Konu Otomatik Belirlendi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowManualSelect(!showManualSelect)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
                  >
                    {showManualSelect ? 'Gizle' : 'Manuel Değiştir'}
                  </button>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-white">
                    {getCourseName(selectedCourse)}
                  </span>
                  <span className="text-xs text-slate-400">&rsaquo;</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {selectedTopic}
                  </span>
                </div>
              </div>
            )}

            {/* Manuel Seçim Alanları (AI tespit ettiğinde varsayılan olarak gizlenir) */}
            {(!detectedByAi || showManualSelect) && (
              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/40">
                {/* Ders Seçimi */}
                <div>
                  <label
                    htmlFor="course-select"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Ders *
                  </label>
                  <select
                    id="course-select"
                    value={selectedCourse}
                    onChange={(e) => handleCourseChange(e.target.value as LgsCourseKey)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
                  >
                    {LGS_COURSE_OPTIONS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Konu Seçimi */}
                <div>
                  <label
                    htmlFor="topic-select"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Konu *
                  </label>
                  <select
                    id="topic-select"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
                  >
                    {currentTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Öğrenci Notu */}
            <div className="mt-4">
              <label
                htmlFor="student-note"
                className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                <span>Öğrenci Notu / Takıldığın Nokta</span>
                <span className="text-[10px] font-normal lowercase text-slate-400">
                  (isteğe bağlı)
                </span>
              </label>
              <textarea
                id="student-note"
                rows={3}
                value={studentNote}
                placeholder="Örn: B şıkkı ile C arasında kaldım, formülde nereyi kaçırdığımı anlayamadım..."
                onChange={(e) => setStudentNote(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Vazgeç
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-violet-700 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {isSubmitting ? 'Kaydediliyor...' : 'Yanlış Defteri\'ne Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
