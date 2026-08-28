import React from 'react';

/**
 * BlackKey — renders a single black piano key.
 * It is absolutely positioned over the white keys by the Piano container.
 * Props:
 *  note        - full note object from notes.js
 *  isActive    - boolean, whether this key is currently pressed
 *  onNoteOn    - handler called when a press starts
 *  onNoteOff   - handler called when a press ends
 */
const BlackKey = ({ note, isActive, onNoteOn, onNoteOff }) => {
  const handleContextMenu = (e) => e.preventDefault();

  return (
    <button
      id={`key-${note.id}`}
      aria-label={`Piano key ${note.name}`}
      aria-pressed={isActive}
      onMouseDown={(e) => { e.preventDefault(); onNoteOn(note.midi); }}
      onMouseUp={() => onNoteOff(note.midi)}
      onMouseLeave={() => onNoteOff(note.midi)}
      onTouchStart={(e) => { e.preventDefault(); onNoteOn(note.midi); }}
      onTouchEnd={(e) => { e.preventDefault(); onNoteOff(note.midi); }}
      onContextMenu={handleContextMenu}
      className={[
        // Black keys sit on top of white keys (z-index handled by Piano)
        'absolute top-0',
        // Sizing — width/height managed by CSS vars set in Piano
        'w-[var(--black-key-width)] h-[var(--black-key-height)]',
        'rounded-b-md',
        'select-none cursor-pointer',
        'transition-all duration-75',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue',
        isActive
          ? [
              'bg-gradient-to-b from-nebula-violet to-cosmic-purple',
              'shadow-[0_0_14px_rgba(168,85,247,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)]',
              'scale-[0.97] translate-y-0.5',
            ].join(' ')
          : [
              'bg-gradient-to-b from-[#1a0a2e] to-[#0d0518]',
              'border border-white/10',
              'hover:bg-gradient-to-b hover:from-[#2a1045] hover:to-[#1a0a2e]',
              'hover:shadow-[0_0_8px_rgba(124,58,237,0.5)]',
              'shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.5)]',
            ].join(' '),
      ].join(' ')}
    />
  );
};

export default BlackKey;
