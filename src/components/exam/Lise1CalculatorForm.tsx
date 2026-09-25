'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Lise1CourseGradeInput,
  calculateLise1Term,
  calculateCourseAverage,
  SCHOOL_PRESETS,
} from '@/lib/lise1-calculation';
import {
  getStoredLise1Grades,
  getStoredSchoolPreset,
  saveStoredLise1Grades,
  resetStoredLise1Grades,
} from '@/lib/lise1-grade-storage';
import {
  Calculator,
  Award,
  BookOpen,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  RotateCcw,
  Save,
  Plus,
  Trash2,
  School,
  GraduationCap,
  Clock,
} from 'lucide-react';

export function Lise1CalculatorForm() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('anadolu');
  const [grades, setGrades] = useState<Lise1CourseGradeInput[]>(() => SCHOOL_PRESETS.anadolu.courses);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Yeni ders ekleme modal / inline state
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseHours, setNewCourseHours] = useState(2);

  // İlk yüklemede kaydedilmiş veriyi çek
  useEffect(() => {
    setMounted(true);
    const storedGrades = getStoredLise1Grades(user?.id);
    const storedPreset = getStoredSchoolPreset(user?.id);
    setGrades(storedGrades);
    setSelectedPreset(storedPreset);
  }, [user?.id]);

  // Puan değişikliği
  const handleScoreChange = (
    index: number,
    field: 'exam1' | 'exam2' | 'performance1' | 'performance2',
    value: string
  ) => {
    setGrades((prev) => {
      const next = [...prev];
      const trimmed = value.trim();
      const parsed = trimmed === '' ? null : Number(trimmed);
      const safeVal =
        parsed === null || isNaN(parsed) ? null : Math.min(100, Math.max(0, parsed));
      next[index] = { ...next[index], [field]: safeVal };
      return next;
    });
  };

  // Haftalık ders saati değişikliği
  const handleWeeklyHoursChange = (index: number, value: string) => {
    const parsed = parseInt(value, 10);
    const safeHours = isNaN(parsed) ? 1 : Math.min(12, Math.max(1, parsed));
    setGrades((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], weeklyHours: safeHours };
      return next;
    });
  };

  // Okul türü şablonu değiştirme
  const handlePresetChange = (presetId: string) => {
    const preset = SCHOOL_PRESETS[presetId];
    if (!preset) return;

    // Mevcut notları koruyarak şablona göre eşleştir
    const updatedCourses: Lise1CourseGradeInput[] = preset.courses.map((pCourse) => {
      const existing = grades.find((g) => g.courseKey === pCourse.courseKey);
      if (existing) {
        return {
          ...pCourse,
          exam1: existing.exam1,
          exam2: existing.exam2,
          performance1: existing.performance1,
          performance2: existing.performance2,
        };
      }
      return pCourse;
    });

    // Kullanıcının eklediği özel dersler varsa koru
    const customCourses = grades.filter((g) => g.isCustom);
    const finalList = [...updatedCourses, ...customCourses];

    setSelectedPreset(presetId);
    setGrades(finalList);
    saveStoredLise1Grades(finalList, presetId, user?.id).catch(console.warn);
  };

  // Yeni seçmeli ders ekle
  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;

    const newKey = `custom_${Date.now()}`;
    const newCourse: Lise1CourseGradeInput = {
      courseKey: newKey,
      courseName: newCourseName.trim(),
      weeklyHours: newCourseHours,
      exam1: null,
      exam2: null,
      performance1: null,
      performance2: null,
      isCustom: true,
    };

    const nextGrades = [...grades, newCourse];
    setGrades(nextGrades);
    setNewCourseName('');
    setShowAddCourse(false);
    saveStoredLise1Grades(nextGrades, selectedPreset, user?.id).catch(console.warn);
  };

  // Ders sil
  const handleDeleteCourse = (index: number) => {
    const courseToRemove = grades[index];
    if (
      courseToRemove.courseKey === 'edebiyat' &&
      !window.confirm('Türk Dili ve Edebiyatı MEB baraj dersidir. Yine de silmek istiyor musunuz?')
    ) {
      return;
    }

    setGrades((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      saveStoredLise1Grades(next, selectedPreset, user?.id).catch(console.warn);
      return next;
    });
  };

  // Notları Manuel Kaydet
  const handleManualSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await saveStoredLise1Grades(grades, selectedPreset, user?.id);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch {
      alert('Notlar kaydedilirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  // Notları Sıfırla (Temizle)
  const handleReset = () => {
    if (window.confirm('Tüm ders notlarınız temizlenecek ve 0 durumuna getirilecek. Onaylıyor musunuz?')) {
      const resetGrades = grades.map((g) => ({
        ...g,
        exam1: null,
        exam2: null,
        performance1: null,
        performance2: null,
      }));
      setGrades(resetGrades);
      resetStoredLise1Grades(user?.id);
      saveStoredLise1Grades(resetGrades, selectedPreset, user?.id).catch(console.warn);
    }
  };

  const result = useMemo(() => calculateLise1Term(grades), [grades]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 animate-pulse">
        <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6" />
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Üst Bilgilendirme ve Özet Kartı */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Sol: Başlık ve Açıklama */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>MEB 2026-2027 Yeni Sınıf Geçme &amp; Ortak Yazılı Sistemi</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
              9. Sınıf Yazılı Notu &amp; <span className="text-emerald-400">Takdir/Teşekkür</span> Hesapla
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
              Yazılı ve performans notlarını gir; haftalık ders saati ağırlıklarına göre dönem ortalamanı,
              belge durumunu ve <strong className="text-emerald-300">YKS için OBP katkını</strong> anında hesapla.
              Girdiğin notlar hesabına otomatik kaydedilir.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>MEB Kuralı: Türk Dili ve Edebiyatı geçme barajı <strong>70 puandır</strong>.</span>
            </div>
          </div>

          {/* Sağ: Canlı Sonuç Kartı */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Dönem Ağırlıklı Ortalaması
              </span>
              <span className="text-3xl font-black text-emerald-400">
                {result.hasAnyGrades ? result.termAverage.toFixed(2) : '0.00'}
              </span>
            </div>

            {/* Belge Rozeti */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Belge Durumu:</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black shadow-xs ${result.certificateBadgeColor}`}
              >
                {result.certificateLabel}
              </span>
            </div>

            {/* OBP ve YKS Katkısı */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="rounded-xl bg-slate-800/60 p-2.5">
                <div className="text-[10px] font-bold text-slate-400">Tahmini 9. Sınıf OBP</div>
                <div className="text-base font-black text-white">
                  {result.hasAnyGrades ? `${result.estimatedObp} / 500` : '— / 500'}
                </div>
              </div>
              <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/40 p-2.5">
                <div className="text-[10px] font-bold text-emerald-300">YKS&apos;ye Ek Puan</div>
                <div className="text-base font-black text-emerald-400">
                  {result.hasAnyGrades ? `+${result.yksAdditionalPoints} Puan` : '+0.0 Puan'}
                </div>
              </div>
            </div>

            {/* Hızlı Aksiyon */}
            <Link
              href="/deneme-coz"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-500 hover:to-teal-500 transition"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>MEB 9. Sınıf Ortak Yazılı Provalarını Çöz</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Ders Notları Giriş Tablosu / Grid */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
        {/* Üst Bar: Başlık, Okul Şablonları & Aksiyonlar */}
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-500" />
                <span>9. Sınıf Ders Notları &amp; Haftalık Ders Saatleri</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Okulunuzun haftalık ders saatlerine göre &quot;Haftalık Saat&quot; sütununu düzenleyebilir veya seçmeli ders ekleyebilirsiniz.
              </p>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleManualSave}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{isSaving ? 'Kaydediliyor...' : 'Notlarımı Kaydet'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddCourse(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 px-3 py-1.5 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Seçmeli Ders Ekle</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer transition"
                title="Tüm notları temizle"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Notları Temizle</span>
              </button>
            </div>
          </div>

          {/* Kaydetme Bildirimi */}
          {saveSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Notlarınız ve haftalık ders saatleriniz sisteminize başarıyla kaydedildi!</span>
            </div>
          )}

          {/* Okul Türü Şablon Seçici (Anadolu / Fen / İmam Hatip) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <School className="h-3.5 w-3.5" /> Okul Türü Şablonu:
            </span>
            {Object.values(SCHOOL_PRESETS).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetChange(p.id)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  selectedPreset === p.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {p.name}
              </button>
            ))}
            <span className="text-[11px] text-slate-400 font-medium ml-1">
              (Toplam Haftalık Saat: <strong className="text-slate-700 dark:text-slate-200 font-black">{result.totalWeeklyHours}</strong>)
            </span>
          </div>
        </div>

        {/* Yeni Ders Ekleme Kutusu (Açılırsa) */}
        {showAddCourse && (
          <form
            onSubmit={handleAddCustomCourse}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30 animate-in fade-in"
          >
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ders Adı (Örn: İkinci Yabancı Dil, Astronomi, Proje vb.)
              </label>
              <input
                type="text"
                required
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Örn: Bilişim Teknolojileri"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="w-28">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Haftalık Saat
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={newCourseHours}
                onChange={(e) => setNewCourseHours(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-center text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-end gap-2 pt-4">
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 text-xs font-bold transition cursor-pointer"
              >
                Ekle
              </button>
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}

        {/* Not Giriş Tablosu */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-bold">Ders Adı</th>
                <th className="pb-3 text-center font-bold" title="Okulunuza göre bu saatleri değiştirebilirsiniz">
                  Haftalık Saat ⚙️
                </th>
                <th className="pb-3 text-center font-bold">1. Yazılı</th>
                <th className="pb-3 text-center font-bold">2. Yazılı</th>
                <th className="pb-3 text-center font-bold">1. Performans</th>
                <th className="pb-3 text-center font-bold">2. Performans</th>
                <th className="pb-3 text-right font-bold">Ders Ortalaması</th>
                <th className="pb-3 text-center font-bold w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {grades.map((item, index) => {
                const avg = calculateCourseAverage(item);
                const hasGrade = avg !== null;
                const isEdebiyat = item.courseKey === 'edebiyat' || item.courseName.toLowerCase().includes('edebiyat');
                const threshold = isEdebiyat ? 70 : 50;
                const isPassing = hasGrade ? avg >= threshold : null;

                return (
                  <tr key={item.courseKey} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    {/* Ders Adı */}
                    <td className="py-3 pr-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {item.courseName}
                      </div>
                      {isEdebiyat && (
                        <span className="inline-block mt-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 py-0.2 text-[10px] font-black border border-rose-500/20">
                          MEB Baraj Dersi (70)
                        </span>
                      )}
                    </td>

                    {/* Haftalık Ders Saati (Düzenlenebilir) */}
                    <td className="py-3 text-center">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={item.weeklyHours}
                        onChange={(e) => handleWeeklyHoursChange(index, e.target.value)}
                        title="Haftalık ders saatini okulunuza göre değiştirebilirsiniz"
                        className="w-12 rounded-lg border border-slate-200 bg-slate-50 py-1 text-center text-xs font-black text-slate-800 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </td>

                    {/* 1. Yazılı */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.exam1 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'exam1', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 2. Yazılı */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.exam2 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'exam2', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 1. Performans */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.performance1 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'performance1', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 2. Performans */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.performance2 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'performance2', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* Ortalama */}
                    <td className="py-3 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {hasGrade ? (
                          <>
                            <span
                              className={`text-sm font-black ${
                                isPassing
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {avg}
                            </span>
                            {isPassing ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <span title={`Baraj altı: < ${threshold}`}>
                                <AlertTriangle className="h-4 w-4 text-rose-500" />
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            —
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Dersi Kaldır */}
                    <td className="py-3 pl-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(index)}
                        title="Dersi tablodan kaldır"
                        className="text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 p-1 rounded-md transition cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
