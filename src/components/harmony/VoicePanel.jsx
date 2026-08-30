import React from 'react';
import { pianoNotes } from '../../data/notes';

/**
 * VoicePanel — displays a single voice in the harmony
 * 
 * Props:
 *  voiceName    - "Soprano", "Alto", "Tenor", or "Bass"
 *  noteName     - e.g., "G4"
 *  isHighlighted - boolean for visual emphasis
 *  onPlayVoice  - callback to play just this voice (optional)
 */
const VoicePanel = ({ voiceName, noteName, isHighlighted = false, onPlayVoice = null }) => {
  // Get additional note info
  const noteInfo = pianoNotes.find(n => n.name.toLowerCase() === noteName?.toLowerCase());
  
  const getVoiceColor = () => {
    switch (voiceName.toLowerCase()) {
      case 'soprano':
        return 'border-cyan-400/50 bg-cyan-900/20';
      case 'alto':
        return 'border-blue-400/50 bg-blue-900/20';
      case 'tenor':
        return 'border-purple-400/50 bg-purple-900/20';
      case 'bass':
        return 'border-amber-400/50 bg-amber-900/20';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  const getVoiceBadgeColor = () => {
    switch (voiceName.toLowerCase()) {
      case 'soprano':
        return 'bg-cyan-500/80 text-deep-space';
      case 'alto':
        return 'bg-blue-500/80 text-deep-space';
      case 'tenor':
        return 'bg-purple-500/80 text-deep-space';
      case 'bass':
        return 'bg-amber-500/80 text-deep-space';
      default:
        return 'bg-white/20 text-star-white';
    }
  };

  return (
    <div
      className={`
        flex flex-col gap-3 p-4 rounded-lg border-2 transition-all duration-200
        ${getVoiceColor()}
        ${isHighlighted ? 'ring-2 ring-cosmic-blue shadow-[0_0_15px_rgba(56,189,248,0.5)]' : ''}
      `}
    >
      {/* Voice label */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-widest ${getVoiceBadgeColor()} px-2 py-1 rounded`}>
          {voiceName}
        </span>
        {onPlayVoice && (
          <button
            onClick={onPlayVoice}
            className="p-1.5 rounded-md hover:bg-white/10 text-xs transition-colors"
            title={`Play ${voiceName}`}
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
          </button>
        )}
      </div>

      {/* Note display */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold text-star-white">
          {noteName || '—'}
        </div>
        
        {/* Additional info (frequency/midi if available) */}
        {noteInfo && (
          <div className="text-xs text-moon-gray space-y-1">
            <div>MIDI: {noteInfo.midi}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoicePanel;
