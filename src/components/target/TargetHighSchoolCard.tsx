'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LgsHighSchool } from '@/types/school';
import {
  getAllHighSchools,
  getSelectedTargetSchool,
  setSelectedTargetSchool,
  analyzeTargetGap,
} from '@/lib/lgs-high-schools';
import { getStoredExams } from '@/lib/exam-storage';
import {
  School,
  Target,
  Sparkles,
  Search,
  CheckCircle2,
  MapPin,
  ChevronRight,
  X,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export function TargetHighSchoolCard() {
  const [selectedSchool, setSelectedSchool] = useState<LgsHighSchool>(() => getSelectedTargetSchool());
  const [currentScore, setCurrentScore] = useState<number>(445.5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Tümü');
  const [selectedType, setSelectedType] = useState<string>('Tümü');

  const allSchools = getAllHighSchools();

  // Şehir listesi
  const cities = ['Tümü', ...Array.from(new Set(allSchools.map((s) => s.city)))];

  // Öğrencinin son deneme skorunu al
  useEffect(() => {
    const exams = getStoredExams();
    if (exams && exams.length > 0) {
      const latest = exams[0];
      setCurrentScore(latest.totalScore);
    }
  }, []);

  // Hedef değiştiğinde güncelle
  const handleSelectSchool = (school: LgsHighSchool) => {
    setSelectedSchool(school);
    setSelectedTargetSchool(school.id);
    setIsModalOpen(false);
  };

  const analysis = analyzeTargetGap(selectedSchool, currentScore);

  // Filtrelenmiş okul listesi
  const filteredSchools = allSchools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (school.description && school.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = selectedCity === 'Tümü' || school.city === selectedCity;
    const matchesType =
      selectedType === 'Tümü' ||
      (selectedType === 'fen' && school.type === 'fen') ||
      (selectedType === 'anadolu' && school.type === 'anadolu');
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <>
      <section
        aria-label="Hedef Lise ve Puan Takip Radarı"
        className="relative overflow-hidden rounded-3xl border border-indigo-100/90 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/40 p-5 shadow-xs dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 sm:p-6"
      >
        {/* Dekoratif Işık Efekti */}
        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Sol: Okul Bilgisi ve Hedef Başlığı */}
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-black text-white shadow-xs">
                <Target className="h-3.5 w-3.5" />
                LGS HEDEF RADARI
              </span>
              {selectedSchool.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                  <Award className="h-3 w-3 text-amber-600" />
                  {selectedSchool.badge}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {selectedSchool.name}
                </h3>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedSchool.city} &bull; {selectedSchool.type === 'fen' ? 'Fen Lisesi' : 'Anadolu Lisesi'} &bull; Kontenjan: {selectedSchool.quota}</span>
              </p>
            </div>

            {/* AI Koç Akıllı Tavsiyesi */}
            <div className="rounded-2xl bg-indigo-50/80 border border-indigo-100/80 p-3 text-xs text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-200">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {analysis.smartAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Sağ: Canlı Puan İbresi & İlerleme Kartı */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 shrink-0">
            {/* İlerleme Yüzdesi Çemberi / Göstergesi */}
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Hedefe Yakınlık
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  %{analysis.progressPercent}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  tamamlandı
                </span>
              </div>
              <div className="w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-700"
                  style={{ width: `${analysis.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Puan Karşılaştırması */}
            <div className="grid grid-cols-2 gap-3 text-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Taban Puan
                </span>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedSchool.minScore.toFixed(1)}
                </p>
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                  Dilim: %{selectedSchool.minPercentile}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  {analysis.isAchieved ? 'Hedef Aşıldı' : 'Kalan Puan'}
                </span>
                <p className={`text-base font-black mt-0.5 ${analysis.isAchieved ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {analysis.isAchieved ? `+${Math.abs(analysis.scoreDifference)} P` : `-${analysis.scoreDifference} P`}
                </p>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  (Son Denemen: {currentScore.toFixed(1)})
                </span>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3.5 py-2 text-xs font-bold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition cursor-pointer"
              >
                <School className="h-3.5 w-3.5" />
                <span>Hedefi Değiştir</span>
              </button>

              <Link
                href="/#hesaplama"
                className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 hover:underline"
              >
                <span>Netleri Simüle Et</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hedef Lise Seçim Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            {/* Modal Başlık & Kapat */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <School className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Hedef LGS Liseni Seç
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Türkiye'nin en seçkin fen ve anadolu liseleri arasından hayalindeki okulu belirle.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Arama ve Filtreler */}
            <div className="py-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Lise adı veya şehir ara (örn: Kabataş, Ankara Fen, BAL)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                <span className="font-bold text-slate-400 text-[11px] shrink-0">Şehir:</span>
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-lg px-2.5 py-1 font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedCity === city
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Okul Listesi (Scroll edilebilir) */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredSchools.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm font-bold">Aradığınız kriterlere uygun lise bulunamadı.</p>
                </div>
              ) : (
                filteredSchools.map((school) => {
                  const isSelected = selectedSchool.id === school.id;
                  return (
                    <div
                      key={school.id}
                      onClick={() => handleSelectSchool(school)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white">
                            {school.name}
                          </h4>
                          {school.badge && (
                            <span className="hidden sm:inline-block rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              {school.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {school.city} &bull; {school.type === 'fen' ? 'Fen Lisesi' : 'Anadolu Lisesi'} &bull; Kontenjan: {school.quota}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {school.minScore.toFixed(1)} Puan
                          </span>
                          <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                            %{school.minPercentile} Dilim
                          </p>
                        </div>
                        {isSelected ? (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 dark:border-slate-700">
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
