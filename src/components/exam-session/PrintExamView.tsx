'use client';

import React from 'react';
import type { OnlineExam } from '@/types/online-exam';
import { getWeeklySundayInfo } from '@/lib/weekly-live-exam';
import { Printer, ArrowLeft, Download, Info, Lock } from 'lucide-react';
import Link from 'next/link';

interface PrintExamViewProps {
  exam: OnlineExam;
}

export function PrintExamView({ exam }: PrintExamViewProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const optionKeys = ['A', 'B', 'C', 'D'] as const;

  // Pazar Canlı Sınavı PDF İndirme Güvenlik Kilidi
  if (exam.slug === 'lgs-canli-pazar-denemesi') {
    const sundayInfo = getWeeklySundayInfo();
    if (!sundayInfo.isLiveNow) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-center text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
            <Lock className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="mt-4 text-xl font-black">
            Canlı Sınav Kitapçığı Henüz Açılmadı
          </h2>
          <p className="mt-2 max-w-md text-xs text-slate-400 leading-relaxed">
            Soruların önceden sızmaması ve tüm Türkiye&apos;de eşit şartlarda yarışılması için bu denemenin PDF kitapçığı <strong>{sundayInfo.dateStr} Pazar saat 10:00&apos;da</strong> indirmeye açılacaktır.
          </p>
          <Link
            href="/deneme-coz"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Açık Olan 20 Denemeyi Gör</span>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white print:text-black">
      {/* Yazdırma Kontrol Barı (Sadece Ekranda Görünür, Yazdırmada Gizlenir) */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/deneme-coz/${exam.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Geri Dön</span>
            </Link>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 truncate max-w-md block">
                {exam.title}
              </span>
              <span className="text-[11px] text-slate-500">
                {exam.questionCount} Soru &bull; {exam.durationMinutes} Dakika &bull; MEB Kitapçık Formatı
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
              <Info className="h-3.5 w-3.5 text-amber-600" />
              <span>PDF için &quot;Hedef: PDF Olarak Kaydet&quot; seçeneğini kullanın</span>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-black text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Yazdır / PDF İndir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kitapçık İçeriği (A4 Sayfalar Halinde Mizanpaj) */}
      <div className="mx-auto max-w-4xl bg-white p-6 sm:p-12 shadow-md print:max-w-none print:p-0 print:shadow-none my-6 print:my-0">
        {/* =======================================================
            SAYFA 1: MEB RESMİ SINAV KİTAPÇIK KAPAĞI
            ======================================================= */}
        <div className="border-4 border-black p-8 text-center flex flex-col justify-between min-h-[900px] print:min-h-screen break-after-page mb-12 print:mb-0">
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="text-left font-bold text-xs">
                T.C.<br />
                MİLLÎ EĞİTİM BAKANLIĞI
              </div>
              <div className="text-center font-black text-sm">
                ÖLÇME, DEĞERLENDİRME VE SINAV HİZMETLERİ GENEL MÜDÜRLÜĞÜ
              </div>
              <div className="flex h-12 w-12 items-center justify-center border-2 border-black font-black text-2xl">
                A
              </div>
            </div>

            <div className="my-10 space-y-3">
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                2027 LGS PROVA SINAVI
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 pt-2">
                {exam.title}
              </h1>
              <p className="text-sm font-semibold text-slate-600">
                Soru Sayısı: <strong>{exam.questionCount}</strong> &bull; Sınav Süresi: <strong>{exam.durationMinutes} Dakika</strong>
              </p>
            </div>

            {/* Öğrenci Bilgi Alanı */}
            <div className="mx-auto max-w-md border-2 border-black p-4 text-left space-y-3 my-8">
              <div className="flex items-center border-b border-slate-300 pb-2">
                <span className="w-32 text-xs font-bold">ADI :</span>
                <span className="flex-1 border-b border-dotted border-black"></span>
              </div>
              <div className="flex items-center border-b border-slate-300 pb-2">
                <span className="w-32 text-xs font-bold">SOYADI :</span>
                <span className="flex-1 border-b border-dotted border-black"></span>
              </div>
              <div className="flex items-center border-b border-slate-300 pb-2">
                <span className="w-32 text-xs font-bold">T.C. KİMLİK NO :</span>
                <span className="flex-1 border-b border-dotted border-black"></span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-xs font-bold">SALON / SIRA NO :</span>
                <span className="flex-1 border-b border-dotted border-black"></span>
              </div>
            </div>
          </div>

          {/* Sınav Yönergesi */}
          <div className="border-t-2 border-black pt-4 text-left text-xs space-y-1.5 text-slate-700">
            <h3 className="font-black text-sm uppercase text-black mb-2">ÖĞRENCİLERİN DİKKATİNE:</h3>
            <p>1. Bu soru kitapçığında toplam {exam.questionCount} soru bulunmaktadır. Sınav süresi {exam.durationMinutes} dakikadır.</p>
            <p>2. Cevaplarınızı kitapçığın en arkasında yer alan optik cevap kağıdına kurşun kalemle kodlayınız.</p>
            <p>3. 3 yanlış cevap 1 doğru cevabı götürmektedir. Emin olmadığınız sorularda boş bırakmanız tavsiye edilir.</p>
            <p>4. Kitapçık sayfalarında boş bırakılan yerleri karalama ve işlem yapmak için kullanabilirsiniz.</p>
          </div>
        </div>

        {/* =======================================================
            SAYFA 2+: SORULAR LİSTESİ (2 Sütunlu / MEB Mizanpajı)
            ======================================================= */}
        <div className="space-y-8 pt-6">
          <div className="border-b-2 border-slate-900 pb-2 mb-6 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
              SORULAR &bull; {exam.title}
            </h2>
            <span className="text-xs font-bold text-slate-500">KİTAPÇIK TÜRÜ: A</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6 items-start">
            {exam.questions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-300 p-4 break-inside-avoid shadow-2xs print:border-black print:p-3 print:shadow-none"
              >
                {/* Soru Başlığı */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5 print:border-slate-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-xs font-black text-white print:bg-black">
                    {q.questionNumber}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 print:text-black">
                    {q.courseName} &bull; {q.topicName}
                  </span>
                </div>

                {/* Soru Görseli Varsa */}
                {q.questionImageUrl && (
                  <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 print:border-slate-400">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.questionImageUrl}
                      alt={`Soru ${q.questionNumber}`}
                      className="max-h-48 w-full object-contain"
                    />
                  </div>
                )}

                {/* Soru Metni */}
                <p className="text-xs leading-relaxed text-slate-900 font-medium mb-4 whitespace-pre-line print:text-[11px]">
                  {q.questionText}
                </p>

                {/* Şıklar */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 print:border-slate-300">
                  {optionKeys.map((opt) => (
                    <div
                      key={opt}
                      className="flex items-start gap-2 text-xs print:text-[11px] leading-snug"
                    >
                      <span className="font-black text-slate-900 print:text-black shrink-0">
                        {opt})
                      </span>
                      <span className="text-slate-700 print:text-black">
                        {q.options[opt]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================
            SAYFA SONU: YAZDIRILABİLİR OPTİK CEVAP KAĞIDI
            ======================================================= */}
        <div className="break-before-page pt-10 border-t-4 border-black mt-12 print:mt-0">
          <div className="border-4 border-black p-6">
            <div className="text-center border-b-2 border-black pb-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                MİLLÎ EĞİTİM BAKANLIĞI STANDART
              </span>
              <h2 className="text-lg font-black uppercase text-black">
                LGS OPTİK CEVAP KAĞIDI (ÖĞRENCİ FORMU)
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {exam.title} &bull; Kitapçık: [ A ]
              </span>
            </div>

            {/* Optik Kabarcıklar Izgarası */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: Math.ceil(exam.questions.length / 10) }).map((_, colIdx) => {
                const start = colIdx * 10;
                const end = Math.min(start + 10, exam.questions.length);
                const slice = exam.questions.slice(start, end);

                return (
                  <div key={colIdx} className="border border-black p-3 space-y-2 rounded-md">
                    <div className="flex items-center justify-between text-[11px] font-black border-b border-black pb-1 mb-1">
                      <span>NO</span>
                      <div className="flex gap-2.5 mr-1">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                      </div>
                    </div>

                    {slice.map((q) => (
                      <div key={q.id} className="flex items-center justify-between text-xs font-bold">
                        <span className="w-5 text-slate-700">{q.questionNumber}</span>
                        <div className="flex gap-2">
                          {['A', 'B', 'C', 'D'].map((b) => (
                            <span
                              key={b}
                              className="flex h-5 w-5 items-center justify-center rounded-full border border-black text-[10px] font-mono hover:bg-black hover:text-white transition cursor-pointer"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* İmza & Onay Alanı */}
            <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between text-xs">
              <div>
                <span className="font-bold block">ÖĞRENCİ İMZASI:</span>
                <span className="inline-block w-40 border-b border-black mt-4"></span>
              </div>
              <div className="text-right">
                <span className="font-bold block">GÖZETMEN / VELİ İMZASI:</span>
                <span className="inline-block w-40 border-b border-black mt-4"></span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            SAYFA SONU: RESMİ CEVAP ANAHTARI VE DETAYLI ÇÖZÜMLER
            ======================================================= */}
        <div className="break-before-page pt-10 border-t-4 border-black mt-12 print:mt-0">
          <div className="text-center border-b-2 border-black pb-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
              T.C. MİLLÎ EĞİTİM BAKANLIĞI STANDARTLARINDA
            </span>
            <h2 className="text-lg font-black uppercase text-black">
              LGS RESMİ CEVAP ANAHTARI VE DETAYLI ÇÖZÜMLER
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {exam.title} &bull; Kitapçık Türü: [ A ]
            </span>
          </div>

          {/* Hızlı Cevap Tablosu */}
          <div className="mb-8 overflow-hidden rounded-lg border-2 border-black">
            <div className="bg-slate-100 p-2.5 text-center text-xs font-black uppercase tracking-wider text-black border-b-2 border-black">
              HIZLI CEVAP ANAHTARI
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 divide-x divide-y divide-black text-center text-xs font-bold">
              {exam.questions.map((q) => (
                <div key={q.id} className="p-2.5 bg-white">
                  <div className="text-[10px] text-slate-500 font-bold mb-0.5">{q.questionNumber}</div>
                  <div className="text-base font-black text-black">{q.correctAnswer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Her Sorunun Ayrıntılı Çözüm ve Pedagojik Açıklaması */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-slate-300 pb-1.5 flex items-center justify-between">
              <span>ADIM ADIM SORU ÇÖZÜMLERİ VE KAZANIM ANALİZİ</span>
              <span className="text-[10px] text-slate-500 font-normal">Toplam {exam.questions.length} Soru</span>
            </h3>
            <div className="space-y-3">
              {exam.questions.map((q) => (
                <div
                  key={q.id}
                  className="border border-slate-300 rounded-lg p-3 text-xs text-slate-800 break-inside-avoid bg-slate-50/50 print:bg-white"
                >
                  <div className="flex items-center justify-between font-black text-slate-900 mb-1.5 border-b border-slate-200 pb-1">
                    <span className="text-slate-900 font-bold">
                      Soru {q.questionNumber} &bull; <span className="text-slate-600 font-normal">{q.topicName} ({q.courseName})</span>
                    </span>
                    <span className="rounded bg-black text-white px-2 py-0.5 text-[11px] font-mono font-black">
                      Doğru Cevap: {q.correctAnswer}
                    </span>
                  </div>
                  <div className="leading-relaxed whitespace-pre-line text-slate-700 font-medium print:text-[10px]">
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
