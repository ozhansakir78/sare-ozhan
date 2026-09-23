// Web Audio API Tabanlı Müzikal, Tamamen Doğal ve Huzurlu Enstrüman Motoru
// Cızırtılı gürültüler, uğultulu frekanslar tamamen kaldırılmıştır.
// Sadece yumuşak piyano, akustik gitar, müzik kutusu ve meditasyon çanları içerir.

export type SoundType = 'lofi' | 'guitar' | 'music-box' | 'library' | 'none';

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentType: SoundType = 'none';
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private intervalIds: number[] = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Seans bitiş çan sesi (528 Hz Tibet Çanı)
  public playCompletionChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(264, this.ctx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 3);
    } catch {
      // AudioContext engellenirse yoksay
    }
  }

  // Ses Başlat
  public playSound(type: SoundType, volume: number = 0.5) {
    if (type === 'none') {
      this.stop();
      return;
    }

    this.initContext();
    if (!this.ctx) return;

    if (this.currentType === type && this.isRunning) {
      this.setVolume(volume);
      return;
    }

    this.stop();
    this.currentType = type;
    this.isRunning = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume * 0.28, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (type === 'lofi') {
      this.startLofiChillPiano();
    } else if (type === 'guitar') {
      this.startAcousticGuitarArpeggio();
    } else if (type === 'music-box') {
      this.startMusicBoxMelody();
    } else if (type === 'library') {
      this.startPeacefulChimes();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        Math.max(0, Math.min(1, volume * 0.28)),
        this.ctx.currentTime,
        0.1
      );
    }
  }

  public stop() {
    this.intervalIds.forEach((id) => window.clearInterval(id));
    this.intervalIds = [];

    this.isRunning = false;
    this.currentType = 'none';
  }

  // 1. 🎹 Lofi Piyano (Sıcak Rhodes & caz piyano akorları)
  private startLofiChillPiano() {
    if (!this.ctx || !this.masterGain) return;

    const chordProgressions: number[][] = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // Gsus4
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.ctx || !this.masterGain || !this.isRunning) return;

      const chord = chordProgressions[chordIndex];
      chordIndex = (chordIndex + 1) % chordProgressions.length;

      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);

        const delay = idx * 0.14;
        const startTime = this.ctx.currentTime + delay;
        const duration = 3.2;

        noteGain.gain.setValueAtTime(0.001, startTime);
        noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    };

    playChord();
    const interval = window.setInterval(playChord, 3800);
    this.intervalIds.push(interval);
  }

  // 2. 🎸 Akustik Gitar & Melodik Arpej (Sıcak, organik, parmakla çalınan gitar hissi)
  private startAcousticGuitarArpeggio() {
    if (!this.ctx || !this.masterGain) return;

    // Gitar arpej notaları (Em9 -> Cmaj7 -> G -> D)
    const patterns: number[][] = [
      [164.81, 246.94, 329.63, 392.00, 493.88], // E3, B3, E4, G4, B4
      [130.81, 196.00, 261.63, 329.63, 392.00], // C3, G3, C4, E4, G4
      [196.00, 246.94, 293.66, 392.00, 493.88], // G3, B3, D4, G4, B4
      [146.83, 220.00, 293.66, 369.99, 440.00], // D3, A3, D4, F#4, A4
    ];

    let patternIdx = 0;
    let noteIdx = 0;

    const playGuitarPluck = () => {
      if (!this.ctx || !this.masterGain || !this.isRunning) return;

      const currentPattern = patterns[patternIdx];
      const freq = currentPattern[noteIdx];

      noteIdx++;
      if (noteIdx >= currentPattern.length) {
        noteIdx = 0;
        patternIdx = (patternIdx + 1) % patterns.length;
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Akustik tel tınısı için triangle + harmonics
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 1.2);

      // Telli çalgı vuruş zarfı (Hızlı atak, doğal rezonanslı sönümleme)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.16, this.ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.7);
    };

    playGuitarPluck();
    // Her 550ms'de bir sakin bir arpej notası tınlasın
    const interval = window.setInterval(playGuitarPluck, 550);
    this.intervalIds.push(interval);
  }

  // 3. 🎵 Müzik Kutusu (Music Box / Masalsı, berrak, kristal çan melodisi)
  private startMusicBoxMelody() {
    if (!this.ctx || !this.masterGain) return;

    // Huzurlu, masalsı Ghibli / Satie tarzı dingin melodi notaları
    const melody: number[] = [
      523.25, 659.25, 783.99, 987.77, 1046.50, 783.99, 659.25, 523.25, // C5, E5, G5, B5, C6...
      587.33, 698.46, 880.00, 1046.50, 880.00, 698.46, 587.33, 523.25, // D5, F5, A5, C6...
    ];

    let melodyIdx = 0;

    const playMusicBoxTine = () => {
      if (!this.ctx || !this.masterGain || !this.isRunning) return;

      const freq = melody[melodyIdx];
      melodyIdx = (melodyIdx + 1) % melody.length;

      // Temel kristal tını
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Kristal gibi parlayan hızlı atak ve çınlama
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.9);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.0);
    };

    playMusicBoxTine();
    const interval = window.setInterval(playMusicBoxTine, 750);
    this.intervalIds.push(interval);
  }

  // 4. 🔔 Huzur Çanı (Solfeggio zihin dinlendirme tınısı)
  private startPeacefulChimes() {
    if (!this.ctx || !this.masterGain) return;

    const chimeFreqs = [528, 639, 741, 852];

    const playChime = () => {
      if (!this.ctx || !this.masterGain || !this.isRunning) return;

      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.6);
    };

    playChime();
    const interval = window.setInterval(playChime, 6000);
    this.intervalIds.push(interval);
  }

  public getCurrentType(): SoundType {
    return this.currentType;
  }
}

export const ambientSound = new AmbientSoundEngine();
