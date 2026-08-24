// Romantic Web Audio Synthesizer fallback & MP3 Player Service
import { getAssetPath } from '../utils/assetHelper';

type StateListener = (isPlaying: boolean) => void;

class WeddingAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isSynthPlaying = false;
  private synthInterval: number | null = null;
  private stateListeners: Set<StateListener> = new Set();
  private userMuted = false;
  private volume = 0.6;
  private attemptedMp3 = false;
  private hasMp3Loaded = false;

  constructor() {
    // Setup audio element if in browser
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    try {
      this.audioElement = new Audio(getAssetPath('/music/musica.mp3'));
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;

      this.audioElement.addEventListener('play', () => this.notifyListeners(true));
      this.audioElement.addEventListener('pause', () => this.notifyListeners(false));
      this.audioElement.addEventListener('canplaythrough', () => {
        this.hasMp3Loaded = true;
      });
      this.audioElement.addEventListener('error', () => {
        this.hasMp3Loaded = false;
      });
    } catch {
      // Audio element not supported
    }
  }

  public subscribe(listener: StateListener) {
    this.stateListeners.add(listener);
    listener(this.isPlaying());
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  private notifyListeners(playing: boolean) {
    this.stateListeners.forEach((l) => l(playing));
  }

  public isPlaying(): boolean {
    if (this.audioElement && !this.audioElement.paused && this.hasMp3Loaded) {
      return true;
    }
    return this.isSynthPlaying;
  }

  public async startAudio(): Promise<boolean> {
    if (this.userMuted) return false;

    // Try HTML5 Audio with /music/musica.mp3 first
    if (this.audioElement) {
      try {
        await this.audioElement.play();
        this.hasMp3Loaded = true;
        this.notifyListeners(true);
        return true;
      } catch (err) {
        console.log('Local MP3 not found or blocked, switching to romantic synthesizer melody:', err);
      }
    }

    // Fallback to elegant synthesized acoustic piano/chords
    this.startRomanticMelody();
    return true;
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopRomanticMelody();
    this.notifyListeners(false);
  }

  public toggle(): boolean {
    if (this.isPlaying()) {
      this.pause();
      this.userMuted = true;
      return false;
    } else {
      this.userMuted = false;
      this.startAudio();
      return true;
    }
  }

  // Soft romantic Canon / Wedding Chord Progression Synthesizer
  private startRomanticMelody() {
    if (this.isSynthPlaying) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx || this.audioCtx.state === 'closed') {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isSynthPlaying = true;
      this.notifyListeners(true);

      // Canon in D / Pachelbel romantic notes (frequencies in Hz)
      const notes = [
        // D major chord
        [293.66, 369.99, 440.00, 587.33],
        // A major chord
        [220.00, 277.18, 329.63, 440.00],
        // B minor chord
        [246.94, 293.66, 369.99, 493.88],
        // F# minor chord
        [185.00, 220.00, 277.18, 369.99],
        // G major chord
        [196.00, 246.94, 293.66, 392.00],
        // D major chord
        [220.00, 293.66, 369.99, 440.00],
        // G major chord
        [196.00, 246.94, 293.66, 392.00],
        // A major chord
        [220.00, 277.18, 329.63, 440.00],
      ];

      let chordIndex = 0;
      let arpeggioStep = 0;

      const playNextNote = () => {
        if (!this.isSynthPlaying || !this.audioCtx) return;

        const currentChord = notes[chordIndex];
        const freq = currentChord[arpeggioStep % currentChord.length];

        this.playPluckNote(freq, 1.8, 0.12 * this.volume);

        arpeggioStep++;
        if (arpeggioStep % 4 === 0) {
          chordIndex = (chordIndex + 1) % notes.length;
        }
      };

      // Play immediately then every 450ms
      playNextNote();
      this.synthInterval = window.setInterval(playNextNote, 480);

    } catch (e) {
      console.warn('Synth error:', e);
      this.isSynthPlaying = false;
      this.notifyListeners(false);
    }
  }

  private playPluckNote(freq: number, duration: number, gainLevel: number) {
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Warm triangle/sine mix
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle lowpass filter for warm piano/harp feel
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);

      // Acoustic envelope: quick attack, smooth exponential decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // ignore note error
    }
  }

  private stopRomanticMelody() {
    this.isSynthPlaying = false;
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      try {
        this.audioCtx.suspend();
      } catch {
        // ignore
      }
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
