import React from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';

const ChordInfo = ({ chord, onPlayChord, isPlaying }) => {
  return (
    <Panel className="p-6 h-full flex flex-col items-center justify-center text-center">
      {chord ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-full bg-cosmic-purple/20 flex items-center justify-center mb-4 border border-cosmic-purple/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="material-symbols-outlined text-3xl text-nebula-violet">music_note</span>
          </div>
          
          <h2 className="text-3xl font-bold text-star-white tracking-wide mb-1">
            {chord.name}
          </h2>
          <p className="text-moon-gray font-medium text-lg mb-6">
            {chord.symbol} <span className="mx-2 opacity-50">•</span> <span className="capitalize">{chord.type}</span>
          </p>
          
          <div className="bg-space-surface/80 rounded-xl py-3 px-6 border border-white/5 mb-8 w-full max-w-xs">
            <p className="text-moon-gray/60 text-xs uppercase tracking-widest mb-2">Notes</p>
            <p className="text-cosmic-blue font-semibold tracking-widest text-lg">
              {chord.notes.join(' • ')}
            </p>
          </div>
          
          <Button 
            variant="primary" 
            onClick={onPlayChord} 
            className={`w-full max-w-xs flex items-center justify-center gap-2 py-3 ${isPlaying ? 'animate-pulse' : ''}`}
          >
            <span className="material-symbols-outlined">play_circle</span>
            Play Chord
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-moon-gray/50 py-12">
          <span className="material-symbols-outlined text-5xl mb-4 opacity-50">touch_app</span>
          <p>Select a chord to view its details</p>
        </div>
      )}
    </Panel>
  );
};

export default ChordInfo;
