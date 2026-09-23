// Web SpeechSynthesis API Tabanlı Yerel ve Ücretsiz Türkçe Seslendirme Servisi

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isAudioPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // En uygun Türkçe ses profilini bul
  private getTurkishVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    // tr-TR veya tr içeren sesi ara
    const trVoice = voices.find((v) => v.lang === 'tr-TR' || v.lang.startsWith('tr'));
    return trVoice || null;
  }

  // Metni seslendir
  public speak(
    text: string,
    options?: {
      rate?: number; // Hız (0.8 - 1.2)
      pitch?: number; // Tiz/Bas (0.8 - 1.2)
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): boolean {
    if (!this.synth) return false;

    // Önceki konuşmayı durdur
    this.stop();

    // Markdown veya özel işaretleri temizle
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;

    const voice = this.getTurkishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.isAudioPlaying = true;
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.isAudioPlaying = false;
      this.currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      this.isAudioPlaying = false;
      this.currentUtterance = null;
      options?.onError?.();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  // Durdur
  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isAudioPlaying = false;
    this.currentUtterance = null;
  }

  // Duraklat
  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  // Devam ettir
  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  // Çalıyor mu kontrolü
  public isSpeaking(): boolean {
    return this.isAudioPlaying && (this.synth ? this.synth.speaking : false);
  }

  // Tarayıcı destekliyor mu?
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechService = new SpeechService();
