/**
 * Harmony Data & Logic
 * 
 * Provides SATB (Soprano, Alto, Tenor, Bass) voicings for chords.
 * For each chord, we distribute the chord notes across four voices.
 * 
 * Voice ranges (target):
 *  Soprano: C4-C5 (highest)
 *  Alto:    A3-A4 (below Soprano)
 *  Tenor:   F3-F4 (below Alto)
 *  Bass:    C2-C3 (lowest)
 */

import { pianoNotes } from './notes';

/**
 * Parse a note string (e.g., "C#4") into object form
 */
function parseNote(noteStr) {
  const note = pianoNotes.find(n => n.name.toLowerCase() === noteStr.toLowerCase());
  return note || null;
}

/**
 * Get MIDI value from note name
 */
function getMidiFromNote(noteName) {
  const note = parseNote(noteName);
  return note ? note.midi : null;
}

/**
 * Generate SATB voicing for a chord.
 * 
 * Strategy:
 *  1. Take the three chord notes (root, third, fifth)
 *  2. Arrange them with typical doubling and voicing
 *  3. Place them in appropriate octaves for each voice
 *
 * Returns:
 *  { soprano: "C5", alto: "E4", tenor: "C4", bass: "C3" }
 */
export function generateHarmonyForChord(chord) {
  if (!chord || !chord.notes || chord.notes.length < 3) {
    return null;
  }

  const root = chord.notes[0];      // First note (root)
  const third = chord.notes[1];     // Second note (third)
  const fifth = chord.notes[2];     // Third note (fifth)

  // Helper to extract note name and octave
  const parseNoteString = (noteStr) => {
    // Match pattern like "C#4" or "F3"
    const match = noteStr.match(/^([A-G]#?)(\d)$/);
    if (!match) return null;
    return { name: match[1], octave: parseInt(match[2]) };
  };

  const rootParsed = parseNoteString(root);
  const thirdParsed = parseNoteString(third);
  const fifthParsed = parseNoteString(fifth);

  if (!rootParsed || !thirdParsed || !fifthParsed) {
    return null;
  }

  // Helper to find and verify a note exists
  const findNote = (noteName, octave) => {
    const fullName = `${noteName}${octave}`;
    const note = pianoNotes.find(n => n.name.toLowerCase() === fullName.toLowerCase());
    return note ? fullName : null;
  };

  // Standard SATB voicing strategy
  // Bass: Root in lower octave (gives harmonic foundation)
  // Tenor: Fifth in middle range
  // Alto: Third in upper-middle range
  // Soprano: Root or Fifth in highest range (creates resolution)

  // Bass voice: root, typically octave 3
  let bass = findNote(rootParsed.name, 3);
  if (!bass) bass = findNote(rootParsed.name, 2);
  if (!bass) bass = `${rootParsed.name}3`; // Fallback

  // Tenor voice: fifth, typically octave 3-4
  let tenor = findNote(fifthParsed.name, 3);
  if (!tenor) tenor = findNote(fifthParsed.name, 4);
  if (!tenor) tenor = `${fifthParsed.name}3`; // Fallback

  // Alto voice: third, typically octave 4
  let alto = findNote(thirdParsed.name, 4);
  if (!alto) alto = findNote(thirdParsed.name, 3);
  if (!alto) alto = `${thirdParsed.name}4`; // Fallback

  // Soprano voice: typically root an octave higher than tenor
  // Creates nice doubling of the root
  let soprano = findNote(rootParsed.name, 4);
  if (!soprano) soprano = findNote(rootParsed.name, 5);
  if (!soprano) soprano = `${rootParsed.name}4`; // Fallback

  return {
    chordId: chord.id,
    chordName: chord.name,
    soprano,
    alto,
    tenor,
    bass,
    notes: [soprano, alto, tenor, bass] // Ordered high to low for reference
  };
}

/**
 * Generate harmonies for all common chords.
 * Cache this so we don't recalculate on every render.
 */
export function buildHarmonyCache(commonChords) {
  const cache = {};
  commonChords.forEach(chord => {
    const harmony = generateHarmonyForChord(chord);
    if (harmony) {
      cache[chord.id] = harmony;
    }
  });
  return cache;
}

/**
 * Get harmony for a specific chord from cache or generate on-the-fly
 */
export function getHarmonyForChord(chord, cache = null) {
  if (cache && chord && cache[chord.id]) {
    return cache[chord.id];
  }
  return generateHarmonyForChord(chord);
}

/**
 * Convert note name to MIDI value
 * Useful for passing harmony notes to audio engine
 */
export function harmonyToMidi(harmony) {
  if (!harmony) return null;
  
  return {
    soprano: getMidiFromNote(harmony.soprano),
    alto: getMidiFromNote(harmony.alto),
    tenor: getMidiFromNote(harmony.tenor),
    bass: getMidiFromNote(harmony.bass),
    all: [
      getMidiFromNote(harmony.soprano),
      getMidiFromNote(harmony.alto),
      getMidiFromNote(harmony.tenor),
      getMidiFromNote(harmony.bass)
    ]
  };
}
