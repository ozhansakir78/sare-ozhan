// Web SpeechSynthesis API Tabanlı Gelişmiş, Doğal Türkçe Seslendirme Servisi

export interface SpeechOptions {
  rate?: number; // Konuşma hızı (0.8 - 1.2, varsayılan 0.94)
  pitch?: number; // Ses perdesi (0.8 - 1.2, varsayılan 1.04)
  preferredGender?: 'female' | 'male';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: any) => void;
}

/**
 * Metni robotik telaffuzdan kurtarıp doğal Türkçe konuşma akışına çevirir.
 * Matematiksel sembolleri (², ³, ·, =, +) sesli Türkçe kelimelere dönüştürür.
 */
export function prepareTextForTurkishSpeech(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Emojileri temizle
  text = text.replace(
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
    ''
  );

  // 2. Dolar ve LaTeX etiketlerini temizle
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  text = text.replace(/\$([^$]+?)\$/g, '$1');
  text = text.replace(/\\cdot/g, ' çarpı ');
  text = text.replace(/\\times/g, ' çarpı ');
  text = text.replace(/\\div/g, ' bölü ');
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 bölü $2');

  // 3. Matematik sembollerini Türkçe konuşma diline çevir
  text = text.replace(/²/g, ' kare ');
  text = text.replace(/³/g, ' küp ');
  text = text.replace(/\^2/g, ' kare ');
  text = text.replace(/\^3/g, ' küp ');
  text = text.replace(/\s*·\s*/g, ' çarpı ');
  text = text.replace(/\s*=\s*/g, ' eşittir ');
  text = text.replace(/\s*\+\s*/g, ' artı ');
  text = text.replace(/\s*-\s*/g, ' eksi ');

  // 4. Markdown işaretlerini ve parantez karmaşasını temizle
  text = text.replace(/[*_#`~]/g, '');

  // 5. Adım başlıklarını doğal telaffuza hazırla
  text = text.replace(/(\d+)\.\s*Adım:/gi, '$1. Adım: ');

  // 6. Fazla boşlukları temizle
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isAudioPlaying: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private selectedVoiceName: string | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
    }
  }

  private initVoices() {
    if (!this.synth) return;
    this.cachedVoices = this.synth.getVoices();
    if (typeof window !== 'undefined' && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        if (this.synth) {
          this.cachedVoices = this.synth.getVoices();
        }
      };
    }
  }

  /**
   * Tarayıcıdaki tüm Türkçe sesleri çeker
   */
  public getTurkishVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = this.synth.getVoices();
    }
    return this.cachedVoices.filter(
      (v) =>
        v.lang === 'tr-TR' ||
        v.lang.startsWith('tr') ||
        v.name.toLowerCase().includes('turkish') ||
        v.name.toLowerCase().includes('türkçe')
    );
  }

  /**
   * En kaliteli, doğal ve sıcak kadın öğretmen sesini önceliklendirerek seçer.
   * Microsoft Tolga gibi eski robotik masaüstü erkek sesleri son sıraya atılır.
   */
  public getBestTurkishVoice(preferredGender: 'female' | 'male' = 'female'): SpeechSynthesisVoice | null {
    const trVoices = this.getTurkishVoices();
    if (trVoices.length === 0) return null;

    // Kullanıcı elle bir ses seçtiyse onu döndür
    if (this.selectedVoiceName) {
      const matched = trVoices.find((v) => v.name === this.selectedVoiceName);
      if (matched) return matched;
    }

    // Sesleri kaliteye göre puanla
    const scored = trVoices.map((voice) => {
      const name = voice.name.toLowerCase();
      let score = 10;

      // 1. Doğal / Neural / Online sesler en yüksek önceliğe sahiptir
      if (name.includes('natural')) score += 100;
      if (name.includes('online')) score += 80;
      if (name.includes('neural')) score += 80;
      if (name.includes('google')) score += 70; // Google Türkçe sesi mobilde ve Chrome'da çok başarılıdır

      // 2. Tercih edilen cinsiyet puanlaması (Varsayılan: Kadın / Doğal Öğretmen Tonu)
      const isFemale =
        name.includes('emel') ||
        name.includes('yasemin') ||
        name.includes('yelda') ||
        name.includes('filiz') ||
        name.includes('seda') ||
        name.includes('ayşe') ||
        name.includes('fatma') ||
        name.includes('female');

      const isMale =
        name.includes('tolga') ||
        name.includes('ahmet') ||
        name.includes('cem') ||
        name.includes('male');

      if (preferredGender === 'female') {
        if (isFemale) score += 60;
        if (isMale) score -= 30;
      } else {
        if (isMale) score += 60;
        if (isFemale) score -= 30;
      }

      // 3. Robotik Windows Tolga sesini en alta at
      if (name.includes('tolga')) {
        score -= 70;
      }

      // Emel Online (Natural) ve Yelda zirve sestir
      if (name.includes('emel')) score += 50;
      if (name.includes('yelda')) score += 40;

      return { voice, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.voice || trVoices[0];
  }

  public setVoiceByName(voiceName: string) {
    this.selectedVoiceName = voiceName;
  }

  /**
   * Metni doğal ve sıcak bir tonla seslendirir
   */
  public speak(text: string, options?: SpeechOptions): boolean {
    if (!this.synth) return false;

    // Önceki konuşmayı kes
    this.stop();

    // Robotik karakterleri ve formülleri doğal Türkçe kelimelere çevir
    const speechReadyText = prepareTextForTurkishSpeech(text);
    if (!speechReadyText) return false;

    const utterance = new SpeechSynthesisUtterance(speechReadyText);
    utterance.lang = 'tr-TR';

    // Daha sıcak ve sakin öğretmen anlatımı için hafif yavaş ve berrak perde
    utterance.rate = options?.rate || 0.94;
    utterance.pitch = options?.pitch || 1.04;

    const bestVoice = this.getBestTurkishVoice(options?.preferredGender || 'female');
    if (bestVoice) {
      utterance.voice = bestVoice;
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

    utterance.onerror = (e) => {
      this.isAudioPlaying = false;
      this.currentUtterance = null;
      options?.onError?.(e);
    };

    this.currentUtterance = utterance;

    this.synth.speak(utterance);
    return true;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isAudioPlaying = false;
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isAudioPlaying && (this.synth ? this.synth.speaking : false);
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechService = new SpeechService();
