'use client';

import React from 'react';
import { formatMathText } from '@/lib/math-formatter';

interface MathTextProps {
  text?: string | null;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

/**
 * Metin içindeki matematiksel üst/alt simgeleri, LaTeX sembollerini ve
 * isteğe bağlı **kalın** / *italik* markdown biçimlendirmelerini temiz görsel React öğelerine dönüştürür.
 * 
 * Örnek dönüşümler:
 * - "2^3 · 2^4" -> "2³ · 2⁴"
 * - "2^12" -> "2¹²"
 * - "4^7" -> "4⁷"
 * - "x^2 - 4" -> "x² - 4"
 */
export function MathText({ text, className = '', as = 'span' }: MathTextProps) {
  if (!text) return null;

  // 1. Matematik ve üs formatlamasını uygula
  const formattedText = formatMathText(text);

  // 2. Satır sonlarını ayrıştır
  const lines = formattedText.split('\n');

  const content = lines.map((line, lineIndex) => {
    // Markdown **kalın** ve *italik* bloklarını ayrıştır
    const parts = line.split(/(\*[^*]+\*)/g);

    const renderedParts = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={partIndex} className="font-bold text-inherit">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
        return (
          <em key={partIndex} className="italic text-inherit">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <React.Fragment key={partIndex}>{part}</React.Fragment>;
    });

    return (
      <React.Fragment key={lineIndex}>
        {lineIndex > 0 && <br />}
        {renderedParts}
      </React.Fragment>
    );
  });

  const Component = as;
  return <Component className={className}>{content}</Component>;
}
