import React from 'react';

/**
 * WhiteKey — renders a single white piano key.
 * Props:
 *  note        - full note object from notes.js
 *  isActive    - boolean, whether this key is currently pressed
 *  onNoteOn    - handler called when a press starts
 *  onNoteOff   - handler called when a press ends
 */
const WhiteKey = ({ note, isActive, onNoteOn, onNoteOff }) => {
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
        // Fill the parent container fully
        'w-full h-full',
        'relative flex flex-col justify-end items-center pb-2',
        'rounded-b-lg border border-white/20',
        'select-none cursor-pointer',
        'transition-all duration-75',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-violet',
        isActive
          ? [
              'bg-gradient-to-b from-cosmic-blue/40 to-nebula-violet/30',
              'border-cosmic-blue/60',
              'shadow-[0_0_12px_rgba(56,189,248,0.6),inset_0_2px_4px_rgba(0,0,0,0.3)]',
              'scale-[0.98] translate-y-0.5',
            ].join(' ')
          : [
              'bg-gradient-to-b from-[#e8e0f5] to-[#c8bfe0]',
              'hover:from-[#ddd5f7] hover:to-[#b8afd8]',
              'hover:shadow-[0_0_8px_rgba(168,85,247,0.3)]',
              'shadow-[inset_0_-2px_3px_rgba(0,0,0,0.15)]',
            ].join(' '),
      ].join(' ')}
    >
      {/* Note label — only shown on C notes */}
      <span
        className={[
          'text-[10px] font-semibold tracking-wide leading-none',
          'pointer-events-none select-none',
          isActive ? 'text-cosmic-blue' : 'text-deep-space/50',
        ].join(' ')}
      >
        {note.note === 'C' ? note.name : ''}
      </span>
    </button>
  );
};

export default WhiteKey;
