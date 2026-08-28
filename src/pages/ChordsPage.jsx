import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';

const ChordsPage = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      <PageHeader 
        title={<span className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-4xl">music_note</span> Chord Explorer</span>} 
        description="Explore common piano chords, see their notes, and hear them play."
      />
      
      <div className="w-full max-w-4xl mt-6">
        <Panel className="flex flex-col items-center p-12 text-center border-dashed border-2 border-white/10 bg-transparent">
          <p className="text-moon-gray mb-8">Chord system will be implemented on Day 3.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="h-32 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5">
              <span className="text-cosmic-blue font-medium tracking-wide">[ CHORD SELECTOR ]</span>
            </div>
            <div className="h-32 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5">
              <span className="text-cosmic-blue font-medium tracking-wide">[ CHORD INFO ]</span>
            </div>
          </div>
          
          <div className="w-full h-32 mt-8 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5">
             <span className="text-moon-gray tracking-widest">[ SHARED PIANO ]</span>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default ChordsPage;
