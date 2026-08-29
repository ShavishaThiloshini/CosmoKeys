import * as Tone from 'tone';

/**
 * AudioEngine — Tone.js based piano sampler.
 *
 * Uses high-quality Salamander Grand Piano samples.
 */
class AudioEngine {
  constructor() {
    this.sampler = null;
    this.acmpSynth = null;
    this.isLoaded = false;
    this.globalVolume = 0.5;
  }

  // ─── Initialization ───────────────────────────────────────────────────────

  init() {
    if (this.sampler) return; // already initializing or initialized

    // Map 0-1 linear volume to decibels for Tone.js
    const initialDb = this.globalVolume === 0 ? -60 : 20 * Math.log10(this.globalVolume);

    this.sampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        this.isLoaded = true;
        console.log("Realistic Piano samples loaded successfully.");
      }
    }).toDestination();
    
    this.sampler.volume.value = initialDb;
    
    // Setup ACMP Synth (Soft Pad)
    this.acmpSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "triangle8" // Warm pad sound
      },
      envelope: {
        attack: 1.5,
        decay: 0.2,
        sustain: 1.0,
        release: 3.0
      }
    }).toDestination();
    
    // Set acmpSynth volume lower so it sits in the background
    this.acmpSynth.volume.value = initialDb - 8;
    
    // Ensure context is resumed
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
  }

  // ─── Utilities ────────────────────────────────────────────────────────────

  setVolume(volume) {
    this.globalVolume = Math.max(0, Math.min(1, volume));
    if (this.sampler) {
      // Convert linear [0, 1] volume to Decibels (approximate mapping)
      // Range: -60dB (silence) to 0dB (max)
      const db = this.globalVolume === 0 ? -100 : 20 * Math.log10(this.globalVolume);
      this.sampler.volume.rampTo(db, 0.1);
      if (this.acmpSynth) {
        this.acmpSynth.volume.rampTo(db - 8, 0.1);
      }
    }
  }

  // ─── Playback ─────────────────────────────────────────────────────────────

  playNote(midi) {
    if (!this.sampler || !this.isLoaded) return;
    
    // Web Audio requires user interaction to start. Tone.start() handles it.
    if (Tone.context.state !== 'running') {
      Tone.start();
    }

    const noteName = Tone.Frequency(midi, "midi").toNote();
    this.sampler.triggerAttack(noteName);
  }

  stopNote(midi) {
    if (!this.sampler || !this.isLoaded) return;
    
    const noteName = Tone.Frequency(midi, "midi").toNote();
    this.sampler.triggerRelease(noteName);
  }

  playAcmp(midi) {
    if (!this.acmpSynth) return;
    
    if (Tone.context.state !== 'running') {
      Tone.start();
    }

    const noteName = Tone.Frequency(midi, "midi").toNote();
    this.acmpSynth.triggerAttack(noteName);
  }

  stopAcmp(midi) {
    if (!this.acmpSynth) return;
    
    const noteName = Tone.Frequency(midi, "midi").toNote();
    this.acmpSynth.triggerRelease(noteName);
  }

  /**
   * Immediately releases ALL active ACMP voices.
   * Fixes the "sound still playing after Stop" bug — triggerRelease on a per-note
   * basis can leave orphaned PolySynth voices if note tracking gets out of sync.
   * releaseAll() is the authoritative way to stop every voice at once.
   */
  stopAllAcmp() {
    if (!this.acmpSynth) return;
    this.acmpSynth.releaseAll();
  }
}

// Singleton instance shared across the application
export const engine = new AudioEngine();
