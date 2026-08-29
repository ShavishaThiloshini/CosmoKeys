import React from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';

const AcmpInfo = ({ chord, acmpPattern, isAcmpPlaying, onToggleAcmp }) => {
  return (
    <Panel className="p-6 h-full flex flex-col items-center justify-center text-center">
      {chord && acmpPattern ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-full bg-cosmic-blue/20 flex items-center justify-center mb-4 border border-cosmic-blue/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <span className="material-symbols-outlined text-3xl text-sky-400">queue_music</span>
          </div>
          
          <h2 className="text-3xl font-bold text-star-white tracking-wide mb-1">
            {chord.name} ACMP
          </h2>
          <p className="text-moon-gray font-medium text-lg mb-6">
            Sustained Harmonic Pad
          </p>
          
          <div className="bg-space-surface/80 rounded-xl py-3 px-6 border border-white/5 mb-8 w-full max-w-xs text-center">
            <p className="text-moon-gray/60 text-xs uppercase tracking-widest mb-2">Sustained Notes</p>
            <p className="text-cosmic-blue font-semibold tracking-widest text-lg">
              {[...acmpPattern.bass, ...acmpPattern.chord].join(' • ')}
            </p>
          </div>
          
          <Button 
            variant={isAcmpPlaying ? 'primary' : 'secondary'} 
            onClick={onToggleAcmp} 
            className={`w-full max-w-xs flex items-center justify-center gap-2 py-3 ${isAcmpPlaying ? 'bg-sky-500 hover:bg-sky-600 animate-pulse border-sky-400' : 'border-moon-gray/20 hover:border-moon-gray/40'}`}
            title={isAcmpPlaying ? "Stop accompaniment" : "Play accompaniment"}
          >
            <span className="material-symbols-outlined">{isAcmpPlaying ? 'stop_circle' : 'play_circle'}</span>
            {isAcmpPlaying ? 'Stop ACMP' : 'Play ACMP'}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-moon-gray/50 py-12">
          <span className="material-symbols-outlined text-5xl mb-4 opacity-50">touch_app</span>
          <p>Select a chord to view accompaniment</p>
        </div>
      )}
    </Panel>
  );
};

export default AcmpInfo;
