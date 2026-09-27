/**
 * Matematiksel İfadeleri Düzenleme ve Doğal Türkçe Gösterim Servisi
 * Bilgisayar programlama formatındaki üslü ifadeleri (örn: 2^3, 2^12, x^2),
 * LaTeX sembollerini ve matematik işaretlerini temizleyip okunaklı Unicode formatına dönüştürür.
 */

// Unicode Üst Simge Eşlemeleri
const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
  'a': 'ᵃ',
  'b': 'ᵇ',
  'c': 'ᶜ',
  'd': 'ᵈ',
  'e': 'ᵉ',
  'f': 'ᶠ',
  'g': 'ᵍ',
  'h': 'ʰ',
  'i': 'ⁱ',
  'j': 'ʲ',
  'k': 'ᵏ',
  'l': 'ˡ',
  'm': 'ᵐ',
  'n': 'ⁿ',
  'o': 'ᵒ',
  'p': 'ᵖ',
  'r': 'ʳ',
  's': 'ˢ',
  't': 'ᵗ',
  'u': 'ᵘ',
  'v': 'ᵛ',
  'w': 'ʷ',
  'x': 'ˣ',
  'y': 'ʸ',
  'z': 'ᶻ',
  'A': 'ᴬ',
  'B': 'ᴮ',
  'D': 'ᴰ',
  'E': 'ᴱ',
  'G': 'ᴳ',
  'H': 'ᴴ',
  'I': 'ᴵ',
  'J': 'ᶪ',
  'K': 'ᴷ',
  'L': 'ᴸ',
  'M': 'ᴹ',
  'N': 'ᴺ',
  'O': 'ᴼ',
  'P': 'ᴾ',
  'R': 'ᴿ',
  'T': 'ᵀ',
  'U': 'ᵁ',
  'W': 'ᵂ',
};

// Unicode Alt Simge Eşlemeleri (x_1, x_2, H_2O vb.)
const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
  'a': 'ₐ',
  'e': 'ₑ',
  'h': 'ₕ',
  'i': 'ᵢ',
  'j': 'ⱼ',
  'k': 'ₖ',
  'l': 'ₗ',
  'm': 'ₘ',
  'n': 'ₙ',
  'o': 'ₒ',
  'p': 'ₚ',
  'r': 'ᵣ',
  's': 'ₛ',
  't': 'ₜ',
  'u': 'ᵤ',
  'v': 'ᵥ',
  'x': 'ₓ',
};

// Ters Üst Simge Eşlemesi (Sesli okuma için Unicode -> Rakam)
const REVERSE_SUPERSCRIPT_MAP: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
  'ⁿ': 'n',
  'ˣ': 'x',
  'ʸ': 'y',
  'ᵃ': 'a',
  'ᵇ': 'b',
};

/**
 * Verilen üs stringini Unicode üst simgelere dönüştürür.
 * Örn: "12" -> "¹²", "3" -> "³", "-4" -> "⁻⁴", "n+1" -> "ⁿ⁺¹"
 */
export function toSuperscript(str: string): string {
  return str
    .split('')
    .map((char) => SUPERSCRIPT_MAP[char] || char)
    .join('');
}

/**
 * Verilen alt indis stringini Unicode alt simgelere dönüştürür.
 * Örn: "1" -> "₁", "2" -> "₂"
 */
export function toSubscript(str: string): string {
  return str
    .split('')
    .map((char) => SUBSCRIPT_MAP[char] || char)
    .join('');
}

/**
 * Matematiksel ve LaTeX metinleri ekran arayüzü için temiz ve şık Unicode formatına dönüştürür.
 * 2^3 -> 2³
 * 2^12 -> 2¹²
 * 2^{12} -> 2¹²
 * 2^(x+1) -> 2ˣ⁺¹
 * 4^7 -> 4⁷
 * x_1 -> x₁
 * \sqrt{16} -> √16
 * \cdot -> ·
 */
export function formatMathText(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. LaTeX Dolar İşaretlerini ($ ve $$) temizle
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  text = text.replace(/\$([^$]+?)\$/g, '$1');

  // 2. Yaygın LaTeX Sembollerini Dönüştür
  text = text.replace(/\\cdot/g, ' · ');
  text = text.replace(/\\times/g, ' × ');
  text = text.replace(/\\div/g, ' ÷ ');
  text = text.replace(/\\le(?!a)/g, ' ≤ ');
  text = text.replace(/\\ge(?!a)/g, ' ≥ ');
  text = text.replace(/\\ne(?!w)/g, ' ≠ ');
  text = text.replace(/\\pm/g, ' ± ');
  text = text.replace(/\\approx/g, ' ≈ ');
  text = text.replace(/\\degree|\\circ/g, '°');
  text = text.replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, '$1√($2)');
  text = text.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // 3. Süslü Parantezli Üsler: 2^{12} -> 2¹² veya 2^{n+1} -> 2ⁿ⁺¹
  text = text.replace(/\^\{([^}]+)\}/g, (_, exp) => toSuperscript(exp));

  // 4. Normal Parantezli Üsler: 2^(12) -> 2¹²
  text = text.replace(/\^\(([^)]+)\)/g, (_, exp) => toSuperscript(exp));

  // 5. Standart Üsler: 2^12 -> 2¹², 2^3 -> 2³, x^2 -> x², 10^-5 -> 10⁻⁵, a^n -> aⁿ
  text = text.replace(/\^([0-9a-zA-Z\+\-]+)/g, (_, exp) => toSuperscript(exp));

  // 6. Süslü Parantezli Alt İndisler: x_{12} -> x₁₂
  text = text.replace(/_\{([^}]+)\}/g, (_, sub) => toSubscript(sub));

  // 7. Standart Alt İndisler: x_1 -> x₁, x_n -> xₙ, H_2O -> H₂O
  text = text.replace(/_([0-9a-zA-Z\+\-]+)/g, (_, sub) => toSubscript(sub));

  // 8. Sayı veya değişkenler arasındaki yıldız çarpma işaretini orta noktaya çevir: 2 * 3 -> 2 · 3
  text = text.replace(/([0-9a-zA-Z\)])\s*\*\s*([0-9a-zA-Z\(])/g, '$1 · $2');

  // 9. Çift boşlukları tek boşluğa indir
  text = text.replace(/[ \t]{2,}/g, ' ');

  return text;
}

/**
 * Ses sentezleyicisi (Web Speech API) için metni doğal Türkçe okunuşa hazırlar.
 * Robotik "şapka", "nokta", "iki üç" okunuşlarını önler; "2 üzeri 3", "çarpı", "karekök" yapar.
 */
export function formatMathForSpeech(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Önce LaTeX ve Markdown sembollerinden arındır
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  text = text.replace(/\$([^$]+?)\$/g, '$1');
  text = text.replace(/\\cdot|\\times/g, ' çarpı ');
  text = text.replace(/\\div/g, ' bölü ');
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 bölü $2');
  text = text.replace(/\\sqrt\{([^}]+)\}/g, ' karekök $1 ');

  // 2. Programlama formatındaki üslü sayıları Türkçeleştir: 2^3 -> 2 üzeri 3, 2^12 -> 2 üzeri 12
  text = text.replace(/([0-9a-zA-Z\(\)]+)\^\{([^}]+)\}/g, '$1 üzeri $2');
  text = text.replace(/([0-9a-zA-Z\(\)]+)\^\(([^)]+)\)/g, '$1 üzeri $2');
  text = text.replace(/([0-9a-zA-Z\(\)]+)\^([0-9a-zA-Z\+\-]+)/g, '$1 üzeri $2');

  // 3. Unicode üst simgeleri Türkçeleştir: 2³ -> 2 üzeri 3, 2¹² -> 2 üzeri 12, 4⁷ -> 4 üzeri 7
  text = text.replace(
    /([0-9a-zA-Z\(\)]+)([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿˣʸᵃᵇ]+)/g,
    (_, base, sup) => {
      const decodedExp = sup
        .split('')
        .map((c: string) => REVERSE_SUPERSCRIPT_MAP[c] || c)
        .join('');

      // x² veya x³ gibi durumlar için alternatif doğal seslendirme
      if (decodedExp === '2' && isNaN(Number(base))) {
        return `${base} kare`;
      }
      if (decodedExp === '3' && isNaN(Number(base))) {
        return `${base} küp`;
      }
      return `${base} üzeri ${decodedExp}`;
    }
  );

  // 4. Sembolleri sesli Türkçe kelimelere çevir
  text = text.replace(/\s*·\s*/g, ' çarpı ');
  text = text.replace(/\s*×\s*/g, ' çarpı ');
  text = text.replace(/\s*÷\s*/g, ' bölü ');
  text = text.replace(/\s*=\s*/g, ' eşittir ');
  text = text.replace(/\s*≤\s*/g, ' küçük eşittir ');
  text = text.replace(/\s*≥\s*/g, ' büyük eşittir ');
  text = text.replace(/\s*≠\s*/g, ' eşit değildir ');
  text = text.replace(/\s*±\s*/g, ' artı eksi ');
  text = text.replace(/\s*≈\s*/g, ' yaklaşık olarak ');
  text = text.replace(/√\s*([0-9a-zA-Z]+)/g, ' karekök $1 ');
  text = text.replace(/√\(([^)]+)\)/g, ' karekök $1 ');

  return text;
}
