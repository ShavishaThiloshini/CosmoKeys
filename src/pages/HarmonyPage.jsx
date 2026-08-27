import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';

const HarmonyPage = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      <PageHeader 
        title="🎶 Harmony Studio" 
        description="Explore four-part SATB harmony and voice leading concepts."
      />
      
      <div className="w-full max-w-4xl mt-6">
        <Panel className="flex flex-col items-center p-12 text-center border-dashed border-2 border-white/10 bg-transparent">
          <p className="text-moon-gray mb-8">Harmony system will be implemented on Day 4.</p>
          
          <div className="w-full mb-8 h-16 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5">
             <span className="text-cosmic-purple font-medium tracking-wide">[ SELECT CHORD ]</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
            {['Soprano', 'Alto', 'Tenor', 'Bass'].map((voice) => (
              <div key={voice} className="h-24 bg-space-surface/50 rounded-xl flex flex-col items-center justify-center border border-white/5">
                <span className="text-nebula-violet text-sm font-bold uppercase tracking-wider">{voice}</span>
                <span className="text-moon-gray text-xs mt-1">--</span>
              </div>
            ))}
          </div>
          
          <div className="w-full h-32 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5">
             <span className="text-moon-gray tracking-widest">[ SHARED PIANO ]</span>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default HarmonyPage;
