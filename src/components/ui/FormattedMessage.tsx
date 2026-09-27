'use client';

import React from 'react';

interface FormattedMessageProps {
  content: string;
  className?: string;
}

import { formatMathText } from '@/lib/math-formatter';

/**
 * LaTeX matematik sembollerini ve gereksiz dolar işaretlerini temizleyip
 * anlaşılır Türkçe matematik ve Unicode formatına dönüştürür.
 */
export function cleanMathAndLatex(raw: string): string {
  return formatMathText(raw);
}

/**
 * Satır içindeki **kalın** ve diğer markdown unsurlarını React öğelerine dönüştürür.
 */
function renderInlineFormatted(text: string): React.ReactNode[] {
  // **kalın** bloklarını yakala
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2);
      // "1. Adım:" gibi adım başlıklarını özel rozet yap
      if (/^\d+\.\s*Adım:?/i.test(boldText) || /^Adım\s*\d+:?/i.test(boldText)) {
        return (
          <span
            key={index}
            className="inline-flex items-center rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 text-xs font-black text-indigo-700 dark:text-indigo-300 mr-1.5 shadow-2xs"
          >
            {boldText}
          </span>
        );
      }
      return (
        <strong key={index} className="font-black text-slate-900 dark:text-white">
          {boldText}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      return (
        <em key={index} className="italic text-slate-700 dark:text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Mesaj içeriğini temizler, paragraflara böler ve zengin biçimlendirmeyle ekrana basar.
 */
export function FormattedMessage({ content, className = '' }: FormattedMessageProps) {
  const cleaned = cleanMathAndLatex(content);
  const paragraphs = cleaned.split(/\n\s*\n/);

  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((p, pIndex) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        // Liste maddesi mi? (- veya * ile başlayan satırlar)
        const lines = trimmed.split('\n');
        const isList = lines.length > 1 && lines.every((l) => /^[\*\-]\s+|^\d+\.\s+/.test(l.trim()));

        if (isList) {
          return (
            <ul key={pIndex} className="space-y-1.5 pl-2">
              {lines.map((line, lIndex) => {
                const itemContent = line.replace(/^[\*\-]\s+|^\d+\.\s+/, '').trim();
                return (
                  <li key={lIndex} className="flex items-start gap-2 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{renderInlineFormatted(itemContent)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={pIndex} className="leading-relaxed">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
