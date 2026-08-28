class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.activeOscillators = new Map();
    this.globalVolume = 0.5;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.setVolume(this.globalVolume);
    }
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  setVolume(volume) {
    this.globalVolume = volume;
    if (this.masterGain) {
      // Use setTargetAtTime to prevent clicks when volume changes
      this.masterGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.05);
    }
  }

  playNote(midi) {
    if (!this.audioContext) return;

    // Prevent retriggering if already playing
    if (this.activeOscillators.has(midi)) {
      this.stopNote(midi);
    }

    const freq = this.midiToFreq(midi);

    const osc = this.audioContext.createOscillator();
    osc.type = 'triangle'; // triangle gives a nice clear tone, slightly warmer than sine

    const gainNode = this.audioContext.createGain();
    
    // Connect up
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    const now = this.audioContext.currentTime;

    // ADSR Envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.7, now + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.2); // Decay to Sustain

    osc.start(now);

    this.activeOscillators.set(midi, { osc, gainNode });
  }

  stopNote(midi) {
    if (!this.audioContext || !this.activeOscillators.has(midi)) return;

    const { osc, gainNode } = this.activeOscillators.get(midi);
    const now = this.audioContext.currentTime;

    // Release envelope
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.stop(now + 0.5);

    this.activeOscillators.delete(midi);
  }
}

// Export a singleton instance
export const engine = new AudioEngine();
