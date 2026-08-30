import React from 'react';
import Panel from '../common/Panel';

/**
 * ToneSelector — allows user to select the instrument/tone for harmony playback
 * 
 * Props:
 *  selectedTone  - 'piano' | 'strings' | 'choir'
 *  onSelectTone  - callback(tone)
 */
const ToneSelector = ({ selectedTone = 'piano', onSelectTone }) => {
  const tones = [
    { id: 'piano', label: 'Piano', icon: 'piano' },
    { id: 'strings', label: 'Strings', icon: 'music_note' },
    { id: 'choir', label: 'Choir', icon: 'group' }
  ];

  return (
    <Panel className="p-6">
      <h3 className="text-star-white text-sm font-semibold uppercase tracking-wide mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-lg">audio_track</span>
        Tone
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {tones.map(tone => (
          <button
            key={tone.id}
            onClick={() => onSelectTone(tone.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
              transition-all duration-200
              ${selectedTone === tone.id
                ? 'bg-cosmic-blue text-deep-space shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                : 'bg-white/5 text-star-white hover:bg-white/10 hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] border border-white/5'
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              {tone.icon}
            </span>
            {tone.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-moon-gray">
        {selectedTone === 'piano' && 'Classic grand piano sound for harmony playback.'}
        {selectedTone === 'strings' && 'Smooth, sustained string instruments.'}
        {selectedTone === 'choir' && 'Warm, blended choir and pad sound.'}
      </div>
    </Panel>
  );
};

export default ToneSelector;
