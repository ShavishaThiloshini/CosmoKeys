import { useState, useEffect, useRef, useCallback } from 'react';
import { pianoNotes } from '../data/notes';

/**
 * usePiano — manages piano interaction state.
 *
 * Uses refs for the audio callbacks so keyboard handlers always have the
 * latest versions without needing to be re-registered on every render.
 * This avoids the stale-closure problem where keyboard input would fail to
 * trigger audio after the audio context is lazily initialized.
 */
export const usePiano = (onPlayNote, onStopNote) => {
  const [activeNotes, setActiveNotes] = useState(new Set());

  // Store callbacks in refs so keyboard listeners are never stale
  const onPlayRef = useRef(onPlayNote);
  const onStopRef = useRef(onStopNote);
  useEffect(() => { onPlayRef.current = onPlayNote; }, [onPlayNote]);
  useEffect(() => { onStopRef.current = onStopNote; }, [onStopNote]);

  const handleNoteOn = useCallback((midi) => {
    setActiveNotes((prev) => {
      if (prev.has(midi)) return prev;
      const next = new Set(prev);
      next.add(midi);
      return next;
    });
    if (onPlayRef.current) onPlayRef.current(midi);
  }, []); // stable — reads from ref

  const handleNoteOff = useCallback((midi) => {
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midi);
      return next;
    });
    if (onStopRef.current) onStopRef.current(midi);
  }, []); // stable — reads from ref

  // Register keyboard listeners once — they use the stable handlers above
  useEffect(() => {
    const keyMap = {};
    pianoNotes.forEach(note => {
      if (note.keyboardKey) {
        keyMap[note.keyboardKey.toLowerCase()] = note.midi;
      }
    });

    const handleKeyDown = (e) => {
      if (e.repeat) return; // ignore browser auto-repeat
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const midi = keyMap[e.key.toLowerCase()];
      if (midi !== undefined) handleNoteOn(midi);
    };

    const handleKeyUp = (e) => {
      const midi = keyMap[e.key.toLowerCase()];
      if (midi !== undefined) handleNoteOff(midi);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNoteOn, handleNoteOff]); // stable references — runs only once

  return { activeNotes, handleNoteOn, handleNoteOff };
};
