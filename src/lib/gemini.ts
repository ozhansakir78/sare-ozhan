/**
 * Google Gemini API Entegrasyonu & Çok Modlu (Multimodal) Yapay Zekâ Motoru
 * SınavKoçu.ai LGS Asistanı, Sokratik Çözümleyici ve Konu Sınıflandırıcısı
 */

export const GEMINI_PRIMARY_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
export const GEMINI_FALLBACK_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

export function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
}

export interface GeminiContentPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string; // base64
  };
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: GeminiContentPart[];
}

export interface GeminiCallOptions {
  contents: GeminiMessage[];
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

/**
 * Gemini API çağrısı yapar. Birincil model başarısız olursa otomatik yedek modele geçer.
 */
export async function callGeminiApi(options: GeminiCallOptions): Promise<{
  text?: string;
  raw?: any;
  error?: string;
}> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return { error: 'Gemini API anahtarı bulunamadı.' };
  }

  const modelsToTry = [GEMINI_PRIMARY_MODEL, ...GEMINI_FALLBACK_MODELS.filter((m) => m !== GEMINI_PRIMARY_MODEL)];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const payload: Record<string, any> = {
        contents: options.contents,
        generationConfig: {
          temperature: options.temperature ?? 0.4,
          maxOutputTokens: options.maxOutputTokens ?? 1500,
        },
      };

      if (options.systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: options.systemInstruction }],
        };
      }

      if (options.responseMimeType) {
        payload.generationConfig.responseMimeType = options.responseMimeType;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text || '';
        if (text) {
          return { text, raw: data };
        }
      } else {
        const errText = await response.text();
        console.warn(`Gemini (${model}) API uyarısı [${response.status}]:`, errText);
      }
    } catch (fetchErr) {
      console.warn(`Gemini (${model}) bağlantı hatası:`, fetchErr);
    }
  }

  return { error: 'Gemini API servisinden yanıt alınamadı.' };
}
