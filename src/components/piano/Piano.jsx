import React, { useMemo } from 'react';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';
import { pianoNotes } from '../../data/notes';

/**
 * Piano — the shared, reusable piano component.
 *
 * Props:
 *  activeNotes   - Set<number> of MIDI values currently pressed
 *  highlightedNotes - Set<number> or array of MIDI values to highlight (for Chords/Harmony modes)
 *  onNoteOn      - (midi) => void — called when a key press starts
 *  onNoteOff     - (midi) => void — called when a key press ends
 *  className     - optional extra class names for the wrapper
 *
 * Layout strategy:
 *  White keys are rendered as a flex row.
 *  Black keys are absolutely positioned relative to the piano wrapper.
 *  The correct left offset for each black key is derived from which white key
 *  it follows (standard piano pattern: C#, D#, F#, G#, A# per octave).
 */
const Piano = ({
  activeNotes = new Set(),
  highlightedNotes = new Set(),
  onNoteOn,
  onNoteOff,
  className = '',
}) => {
  const whiteNotes = useMemo(() => pianoNotes.filter(n => n.type === 'white'), []);
  const blackNotes = useMemo(() => pianoNotes.filter(n => n.type === 'black'), []);

  /**
   * Build a lookup: for each black key note, find how many white keys
   * precede it in the full note list so we can calculate its left offset.
   * Each black key sits between its preceding and following white keys.
   * Offset = (whiteKeyIndex + 0.57) * whiteKeyWidth  (standard piano geometry).
   */
  const blackKeyOffsets = useMemo(() => {
    const offsets = {};
    blackNotes.forEach(black => {
      // Count how many white keys appear before this black key in the full list
      let whiteCount = 0;
      for (const n of pianoNotes) {
        if (n.id === black.id) break;
        if (n.type === 'white') whiteCount++;
      }
      offsets[black.id] = whiteCount;
    });
    return offsets;
  }, [blackNotes]);

  const isActive = (midi) => activeNotes.has(midi) || highlightedNotes.has(midi);

  return (
    <div
      className={`piano-wrapper relative select-none ${className}`}
      style={{
        // CSS custom properties for consistent sizing — easy to override for responsiveness
        '--white-key-width': '44px',
        '--white-key-height': '160px',
        '--black-key-width': '28px',
        '--black-key-height': '100px',
      }}
    >
      {/* White keys row */}
      <div
        className="flex"
        style={{ height: 'var(--white-key-height)' }}
      >
        {whiteNotes.map(note => (
          <div
            key={note.id}
            style={{ width: 'var(--white-key-width)' }}
            className="flex-shrink-0 px-[1px]"
          >
            <WhiteKey
              note={note}
              isActive={isActive(note.midi)}
              onNoteOn={onNoteOn}
              onNoteOff={onNoteOff}
            />
          </div>
        ))}
      </div>

      {/* Black keys layer — absolutely positioned on top */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ height: 'var(--black-key-height)' }}
      >
        {blackNotes.map(black => {
          const whitesBefore = blackKeyOffsets[black.id];
          // Left = (number of white keys before it) * whiteKeyWidth + offset to center between keys
          // Using 0.6 factor matches standard piano geometry
          const leftPx = `calc(${whitesBefore} * var(--white-key-width) + var(--white-key-width) * 0.6 + 1px)`;

          return (
            <div
              key={black.id}
              className="absolute top-0 pointer-events-auto z-10"
              style={{ left: leftPx }}
            >
              <BlackKey
                note={black}
                isActive={isActive(black.midi)}
                onNoteOn={onNoteOn}
                onNoteOff={onNoteOff}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom glow strip — decorative accent */}
      <div className="h-1 mt-0.5 rounded-full bg-gradient-to-r from-transparent via-cosmic-purple/40 to-transparent" />
    </div>
  );
};

export default Piano;
