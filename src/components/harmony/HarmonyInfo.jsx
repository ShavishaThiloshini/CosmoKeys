import React from 'react';
import Panel from '../common/Panel';

/**
 * HarmonyInfo — displays information about the current harmony
 * Shows the selected chord and the generated SATB voicing
 * 
 * Props:
 *  chord      - selected chord object
 *  harmony    - harmony object { soprano, alto, tenor, bass }
 */
const HarmonyInfo = ({ chord, harmony }) => {
  if (!chord || !harmony) {
    return (
      <Panel className="p-6 text-center">
        <p className="text-moon-gray text-sm">Select a chord to generate harmony</p>
      </Panel>
    );
  }

  return (
    <Panel className="p-6">
      <div className="space-y-4">
        {/* Chord Info */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-cosmic-purple/20 flex items-center justify-center border border-cosmic-purple/50">
              <span className="text-lg font-bold text-cosmic-purple">{chord.symbol}</span>
            </div>
            <div>
              <h3 className="text-star-white font-semibold text-sm">{chord.name}</h3>
              <p className="text-moon-gray text-xs">
                {chord.type === 'major' ? 'Major' : 'Minor'} • 
                Root: {chord.notes[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Harmony Notes */}
        <div>
          <h4 className="text-star-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">music_note</span>
            Four-Part Voicing
          </h4>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { voice: 'Soprano', note: harmony.soprano, color: 'text-cyan-400' },
              { voice: 'Alto', note: harmony.alto, color: 'text-blue-400' },
              { voice: 'Tenor', note: harmony.tenor, color: 'text-purple-400' },
              { voice: 'Bass', note: harmony.bass, color: 'text-amber-400' }
            ].map((v, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-moon-gray font-bold uppercase mb-1">
                  {v.voice}
                </div>
                <div className={`text-xl font-bold ${v.color}`}>
                  {v.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chord tones used */}
        <div className="pt-4 border-t border-white/10 text-xs text-moon-gray">
          <p>Chord tones: {chord.notes.join(' • ')}</p>
        </div>
      </div>
    </Panel>
  );
};

export default HarmonyInfo;
