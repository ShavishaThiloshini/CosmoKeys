/**
 * AudioEngine — Web Audio API–based piano synthesizer.
 *
 * Sound design approach:
 *  - Three layered oscillators per note (fundamental + 2nd harmonic + detuned copy)
 *    to produce a richer, more organ/piano–like timbre instead of a plain triangle.
 *  - A per-note BiquadFilter that sweeps from bright → warm over ~80 ms, mimicking
 *    the natural brightness of a hammer strike followed by a mellow sustain.
 *  - Pitch-aware envelopes: high notes decay faster (like a real piano string).
 *  - Slight detuning between the three oscillators gives natural chorus/warmth.
 */
class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.activeNodes = new Map(); // midi → { oscs, gainNode, filter }
    this.globalVolume = 0.5;
  }

  // ─── Initialization ───────────────────────────────────────────────────────

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(this.globalVolume, this.audioContext.currentTime);
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // ─── Utilities ────────────────────────────────────────────────────────────

  /** Standard MIDI → Hz conversion. */
  midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /**
   * Normalised pitch position 0–1 across the piano range (C3=48 to C5=72).
   * Used to scale envelope timing and filter frequency per octave.
   */
  pitchNorm(midi) {
    return Math.min(1, Math.max(0, (midi - 48) / 24));
  }

  setVolume(volume) {
    this.globalVolume = volume;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.02);
    }
  }

  // ─── Playback ─────────────────────────────────────────────────────────────

  playNote(midi) {
    if (!this.audioContext) return;
    if (this.activeNodes.has(midi)) this.stopNote(midi);

    const freq   = this.midiToFreq(midi);
    const pnorm  = this.pitchNorm(midi);   // 0 = low C3, 1 = high C5
    const ctx    = this.audioContext;
    const now    = ctx.currentTime;

    // ── Envelope timing (high notes decay faster, like a real piano string) ──
    const attackTime  = 0.008;                            // short, sharp attack
    const decayTime   = 0.06 + (1 - pnorm) * 0.12;      // 60–180 ms decay
    const sustainGain = 0.18 + (1 - pnorm) * 0.12;      // louder sustain for bass

    // ── Per-note lowpass filter (bright strike → warm sustain) ───────────────
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    // Start bright (3–6 kHz), sweep down to ~1–2 kHz over decayTime
    const startCutoff = 3000 + pnorm * 3000;   // 3 kHz (bass) → 6 kHz (treble)
    const endCutoff   = 800  + pnorm * 1200;   // 800 Hz (bass) → 2 kHz (treble)
    filter.frequency.setValueAtTime(startCutoff, now);
    filter.frequency.exponentialRampToValueAtTime(endCutoff, now + decayTime);
    filter.Q.setValueAtTime(0.8, now);

    // ── Per-note gain node (ADSR) ─────────────────────────────────────────────
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.9, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(sustainGain, now + attackTime + decayTime);

    // ── Three oscillators for richness ────────────────────────────────────────
    // 1. Fundamental — sawtooth for harmonic richness
    // 2. Octave up (2nd harmonic) at lower gain — adds brightness
    // 3. Slightly detuned copy of fundamental — natural chorus/warmth
    const oscDefs = [
      { type: 'sawtooth',  freqMult: 1,    gain: 0.45, detune: 0    },
      { type: 'triangle',  freqMult: 2,    gain: 0.15, detune: 0    },  // 2nd harmonic
      { type: 'sawtooth',  freqMult: 1,    gain: 0.30, detune: 6    },  // detuned copy (+6 cents)
    ];

    const oscs = oscDefs.map(def => {
      const osc       = ctx.createOscillator();
      const oscGain   = ctx.createGain();

      osc.type        = def.type;
      osc.frequency.setValueAtTime(freq * def.freqMult, now);
      osc.detune.setValueAtTime(def.detune, now);
      oscGain.gain.setValueAtTime(def.gain, now);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start(now);
      return { osc, oscGain };
    });

    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    this.activeNodes.set(midi, { oscs, gainNode, filter });
  }

  stopNote(midi) {
    if (!this.audioContext || !this.activeNodes.has(midi)) return;

    const { oscs, gainNode } = this.activeNodes.get(midi);
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Cancel any in-progress ADSR automation, then release.
    // We use setTargetAtTime instead of exponentialRampToValueAtTime to avoid
    // the "cannot ramp from 0" error when stopNote is called very quickly after
    // playNote (before the attack ramp has raised gain above 0).
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(
      Math.max(gainNode.gain.value, 0.001), // floor at 0.001 to avoid zero
      now
    );
    gainNode.gain.setTargetAtTime(0.0001, now, 0.1); // smooth ~300 ms release

    oscs.forEach(({ osc }) => {
      try { osc.stop(now + 0.35); } catch (_) { /* already stopped */ }
    });

    this.activeNodes.delete(midi);
  }
}

// Singleton instance shared across the application
export const engine = new AudioEngine();
