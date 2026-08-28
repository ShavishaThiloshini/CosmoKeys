import { useState, useEffect, useCallback } from 'react';
import { pianoNotes } from '../data/notes';

export const usePiano = (onPlayNote, onStopNote) => {
  const [activeNotes, setActiveNotes] = useState(new Set());

  const handleNoteOn = useCallback((midi) => {
    setActiveNotes((prev) => {
      if (prev.has(midi)) return prev;
      const next = new Set(prev);
      next.add(midi);
      return next;
    });
    if (onPlayNote) onPlayNote(midi);
  }, [onPlayNote]);

  const handleNoteOff = useCallback((midi) => {
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midi);
      return next;
    });
    if (onStopNote) onStopNote(midi);
  }, [onStopNote]);

  useEffect(() => {
    // Keyboard map: keyboardKey -> midi
    const keyMap = {};
    pianoNotes.forEach(note => {
      if (note.keyboardKey) {
        keyMap[note.keyboardKey.toLowerCase()] = note.midi;
      }
    });

    const handleKeyDown = (e) => {
      if (e.repeat) return; // Ignore auto-repeat when key is held down
      
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      const midi = keyMap[key];
      if (midi !== undefined) {
        handleNoteOn(midi);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const midi = keyMap[key];
      if (midi !== undefined) {
        handleNoteOff(midi);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNoteOn, handleNoteOff]);

  return {
    activeNotes,
    handleNoteOn,
    handleNoteOff,
  };
};
