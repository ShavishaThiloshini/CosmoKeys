/**
 * Accompaniment patterns for ACMP mode.
 *
 * Each pattern defines the sustained pad notes for a chord.
 * NOTE: bass and chord arrays must contain UNIQUE notes (no overlaps)
 * to avoid double-triggering the same PolySynth voice, which causes
 * unwanted volume stacking and audio artifacts.
 *
 * Structure:
 *  bass  — low foundation notes (octave 2–3)
 *  chord — upper voicing notes (octave 3–4), distinct from bass notes
 */
export const accompanimentPatterns = {
  // ── Major Chords ──────────────────────────────────────────────────────────
  "c-major":  { bass: ["C3"],       chord: ["E3", "G3", "C4"] },
  "d-major":  { bass: ["D3"],       chord: ["F#3", "A3", "D4"] },
  "e-major":  { bass: ["E3"],       chord: ["G#3", "B3", "E4"] },
  "f-major":  { bass: ["F3"],       chord: ["A3", "C4", "F4"] },
  "g-major":  { bass: ["G3"],       chord: ["B3", "D4", "G4"] },
  "a-major":  { bass: ["A3"],       chord: ["C#4", "E4", "A4"] },
  "b-major":  { bass: ["B3"],       chord: ["D#4", "F#4", "B4"] },
  "cs-major": { bass: ["C#3"],      chord: ["F3", "G#3", "C#4"] },
  "ds-major": { bass: ["D#3"],      chord: ["G3", "A#3", "D#4"] },
  "fs-major": { bass: ["F#3"],      chord: ["A#3", "C#4", "F#4"] },
  "gs-major": { bass: ["G#3"],      chord: ["C4", "D#4", "G#4"] },
  "as-major": { bass: ["A#3"],      chord: ["D4", "F4", "A#4"] },

  // ── Minor Chords ──────────────────────────────────────────────────────────
  "c-minor":  { bass: ["C3"],       chord: ["D#3", "G3", "C4"] },
  "d-minor":  { bass: ["D3"],       chord: ["F3", "A3", "D4"] },
  "e-minor":  { bass: ["E3"],       chord: ["G3", "B3", "E4"] },
  "f-minor":  { bass: ["F3"],       chord: ["G#3", "C4", "F4"] },
  "g-minor":  { bass: ["G3"],       chord: ["A#3", "D4", "G4"] },
  "a-minor":  { bass: ["A3"],       chord: ["C4", "E4", "A4"] },
  "b-minor":  { bass: ["B3"],       chord: ["D4", "F#4", "B4"] },
  "cs-minor": { bass: ["C#3"],      chord: ["E3", "G#3", "C#4"] },
  "ds-minor": { bass: ["D#3"],      chord: ["F#3", "A#3", "D#4"] },
  "fs-minor": { bass: ["F#3"],      chord: ["A3", "C#4", "F#4"] },
  "gs-minor": { bass: ["G#3"],      chord: ["B3", "D#4", "G#4"] },
  "as-minor": { bass: ["A#3"],      chord: ["C#4", "F4", "A#4"] },
};
