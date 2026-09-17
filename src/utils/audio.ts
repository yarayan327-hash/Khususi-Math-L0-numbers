class AudioManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  public playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.07);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playCarHonk() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.11].forEach((offset) => {
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(440, now + offset);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(554.37, now + offset);

      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now + offset);
      osc2.start(now + offset);
      osc1.stop(now + offset + 0.08);
      osc2.stop(now + offset + 0.08);
    });
  }

  public playCountNote(step: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Musical scale C4 up to F5 for numbers 1 to 10
    const frequencies = [
      261.63, // 1: C4
      293.66, // 2: D4
      329.63, // 3: E4
      349.23, // 4: F4
      392.00, // 5: G4
      440.00, // 6: A4
      493.88, // 7: B4
      523.25, // 8: C5
      587.33, // 9: D5
      659.25, // 10: E5
      698.46  // 11: F5
    ];

    const freq = frequencies[Math.min(Math.max(step - 1, 0), frequencies.length - 1)];
    const now = this.ctx.currentTime;

    // Bell/Marimba synthesized tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, now); // soft harmonic chime

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + index * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    });
  }

  public playCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Victory fanfare chords
    const chord1 = [523.25, 659.25, 783.99]; // C
    const chord2 = [587.33, 739.99, 880.00]; // D
    const chord3 = [1046.50, 1318.51, 1567.98]; // High C

    const playChord = (chord: number[], timeOffset: number, duration: number) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + timeOffset;
      chord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      });
    };

    playChord(chord1, 0, 0.2);
    playChord(chord2, 0.22, 0.2);
    playChord(chord3, 0.44, 0.6);
  }

  public playSoftBounce() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playZeroWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  public speak(text: string, lang: 'ar' | 'en' | 'zh' = 'ar') {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // clear, friendly, slightly slower for young children
      utterance.pitch = 1.1; // warm, engaging child-friendly pitch

      if (lang === 'en') {
        utterance.lang = 'en-US';
      } else if (lang === 'zh') {
        utterance.lang = 'zh-CN';
      } else {
        utterance.lang = 'ar-SA';
      }

      // Try finding a matching native voice
      const voices = window.speechSynthesis.getVoices();
      const voicePrefix = lang === 'en' ? 'en' : lang === 'zh' ? 'zh' : 'ar';
      const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(voicePrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback: audio tone already played
    }
  }

  public speakArabic(text: string) {
    this.speak(text, 'ar');
  }
}

export const sound = new AudioManager();
