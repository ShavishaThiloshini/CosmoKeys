import React from 'react';
import Panel from '../common/Panel';

/**
 * HarmonyChordSelector — allow user to select a chord for harmony generation
 * 
 * Props:
 *  chords           - array of chord objects
 *  selectedChordId  - current selection
 *  onSelectChord    - callback(chord)
 */
const HarmonyChordSelector = ({ chords, selectedChordId, onSelectChord }) => {
  const majorChords = chords.filter(c => c.type === 'major');
  const minorChords = chords.filter(c => c.type === 'minor');

  const renderChordGroup = (title, groupChords) => (
    <div className="mb-4">
      <h3 className="text-moon-gray text-xs uppercase tracking-widest mb-3 font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {groupChords.map(chord => {
          const isSelected = chord.id === selectedChordId;
          return (
            <button
              key={chord.id}
              onClick={() => onSelectChord(chord)}
              className={`
                px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
                ${isSelected 
                  ? 'bg-cosmic-blue text-deep-space shadow-[0_0_12px_rgba(56,189,248,0.6)] font-bold' 
                  : 'bg-white/5 text-star-white hover:bg-white/10 hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] border border-white/5'
                }
              `}
            >
              {chord.symbol}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Panel className="p-6">
      <h2 className="text-star-white font-semibold mb-6 text-sm tracking-wide uppercase flex items-center gap-2">
        <span className="text-cosmic-blue material-symbols-outlined text-lg">queue_music</span> 
        Select Chord
      </h2>
      <div className="space-y-1">
        {renderChordGroup('Major Chords', majorChords)}
        <div className="w-full h-px bg-white/10 my-4" />
        {renderChordGroup('Minor Chords', minorChords)}
      </div>
    </Panel>
  );
};

export default HarmonyChordSelector;
