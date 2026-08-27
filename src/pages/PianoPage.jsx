import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';
import Button from '../components/common/Button';

const PianoPage = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      <PageHeader 
        title="🎹 Virtual Piano" 
        description="Play notes using your keyboard or mouse in the cosmic expanse."
      />
      
      <div className="w-full max-w-4xl mt-6">
        <Panel className="flex flex-col items-center p-12 text-center border-dashed border-2 border-white/10 bg-transparent">
          <div className="mb-6 opacity-60">
            <p className="text-moon-gray">Piano engine will be implemented on Day 2.</p>
          </div>
          
          {/* Placeholder for the Piano component */}
          <div className="w-full h-48 bg-space-surface/50 rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
             {/* Very simple visual placeholder for keys */}
             <div className="flex w-full h-full p-2 gap-1 justify-center opacity-30">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-12 h-full bg-star-white rounded-b-md relative">
                     {i % 3 !== 0 && (
                        <div className="absolute top-0 -left-3 w-6 h-2/3 bg-deep-space rounded-b-sm z-10 border border-white/10"></div>
                     )}
                  </div>
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center bg-deep-space/60 backdrop-blur-sm">
               <span className="font-bold tracking-widest text-cosmic-purple text-xl drop-shadow-[0_0_10px_rgba(124,58,237,0.8)]">
                  [ PIANO INTERFACE ]
               </span>
             </div>
          </div>

          <div className="mt-8">
            <Button variant="secondary">
              Configure Audio Engine
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default PianoPage;
