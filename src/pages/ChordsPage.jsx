import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';
import Button from '../components/common/Button';
import Piano from '../components/piano/Piano';
import ChordSelector from '../components/chords/ChordSelector';
import ChordInfo from '../components/chords/ChordInfo';
import AcmpInfo from '../components/chords/AcmpInfo';
import { commonChords } from '../data/chords';
import { accompanimentPatterns } from '../data/accompaniment';
import { pianoNotes } from '../data/notes';
import { useAudio } from '../hooks/useAudio';
import { usePiano } from '../hooks/usePiano';

const ChordsPage = () => {
  const [selectedChord, setSelectedChord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSustaining, setIsSustaining] = useState(false);
  const sustainedNotesRef = React.useRef(new Set());
  
  const [setupMode, setSetupMode] = useState('chords'); // 'chords' | 'acmp'
  const [isAcmpPlaying, setIsAcmpPlaying] = useState(false);
  const [acmpStep, setAcmpStep] = useState(0);
  const acmpNotesRef = React.useRef(new Set());
  
  const { initAudio, isInitialized, playNote, stopNote, volume, setVolume } = useAudio();
  
  const { activeNotes, handleNoteOn, handleNoteOff } = usePiano(
    isInitialized ? playNote : null,
    isInitialized ? stopNote : null
  );

  // Convert note names (e.g. "C4") to MIDI values for highlighting
  const highlightedNotes = useMemo(() => {
    const midiSet = new Set();
    
    if (setupMode === 'acmp' && isAcmpPlaying && selectedChord) {
      const pattern = accompanimentPatterns[selectedChord.id];
      if (pattern) {
        let notesToHighlight = [];
        if (acmpStep === 0) {
          notesToHighlight = [pattern.bass[0]];
        } else if (acmpStep === 1 || acmpStep === 3) {
          notesToHighlight = [...pattern.chord];
        } else if (acmpStep === 2) {
          notesToHighlight = [pattern.bass[1] || pattern.bass[0]];
        }
        
        notesToHighlight.forEach(noteName => {
          const note = pianoNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
          if (note) {
            midiSet.add(note.midi);
          }
        });
      }
    } else if (selectedChord) {
      selectedChord.notes.forEach(noteName => {
        const note = pianoNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
        if (note) {
          midiSet.add(note.midi);
        }
      });
    }
    return midiSet;
  }, [selectedChord, setupMode, isAcmpPlaying, acmpStep]);

  const handleStartAudio = () => {
    initAudio();
  };

  const toggleSustain = () => {
    if (!isInitialized) initAudio();
    setIsSustaining(prev => !prev);
  };

  const toggleAcmp = () => {
    if (!isInitialized) initAudio();
    setIsAcmpPlaying(prev => !prev);
  };

  const handlePlayChord = () => {
    if (!isInitialized) return;
    
    // Play all notes in the chord
    highlightedNotes.forEach(midi => {
      playNote(midi);
    });
    
    setIsPlaying(true);
    
    // If sustaining, don't stop the notes here (let the useEffect handle it)
    if (!isSustaining) {
      setTimeout(() => {
        highlightedNotes.forEach(midi => {
          stopNote(midi);
        });
        setIsPlaying(false);
      }, 1500);
    }
  };

  // Stop playing previous chord if selection changes while playing
  useEffect(() => {
    if (isPlaying) {
      // It's safer to let them ring out or let the timeout handle it, 
      // but to be clean we might want to stop currently playing notes.
      // However, we don't keep track of the *previously* highlighted notes easily here without a ref.
      // We will just let the timeout handle stopping them for simplicity.
    }
  }, [selectedChord]);

  // Handle continuous sustain playback
  useEffect(() => {
    if (isSustaining && isInitialized) {
      // First, stop any previously sustained notes
      sustainedNotesRef.current.forEach(midi => stopNote(midi));
      sustainedNotesRef.current.clear();

      if (selectedChord) {
        // Play and record new sustained notes
        highlightedNotes.forEach(midi => {
          playNote(midi);
          sustainedNotesRef.current.add(midi);
        });
        setIsPlaying(true);
      }
    } else {
      // If we turn off sustain, stop currently sustained notes
      sustainedNotesRef.current.forEach(midi => stopNote(midi));
      sustainedNotesRef.current.clear();
      // Only set isPlaying to false if we are not in the middle of a one-shot play
      // Actually, it's safer to just let the timeout handle normal play, but we can reset here.
    }
    
    return () => {
      // On unmount or when dependencies change, clean up sustained notes
      sustainedNotesRef.current.forEach(midi => stopNote(midi));
      sustainedNotesRef.current.clear();
    };
  }, [isSustaining, selectedChord, isInitialized, highlightedNotes, playNote, stopNote]);

  // Clean up on unmount for one-shot plays
  useEffect(() => {
    return () => {
      if (isPlaying && !isSustaining) {
        highlightedNotes.forEach(midi => stopNote(midi));
      }
    };
  }, [highlightedNotes, isPlaying, isSustaining, stopNote]);

  // Handle continuous ACMP playback
  useEffect(() => {
    let intervalId;
    
    if (isAcmpPlaying && selectedChord && isInitialized && setupMode === 'acmp') {
      const pattern = accompanimentPatterns[selectedChord.id];
      if (!pattern) return;
      
      const playStep = (step) => {
        // Stop previous acmp notes
        acmpNotesRef.current.forEach(midi => stopNote(midi));
        acmpNotesRef.current.clear();
        
        let notesToPlay = [];
        if (step === 0) {
          notesToPlay = [pattern.bass[0]];
        } else if (step === 1 || step === 3) {
          notesToPlay = [...pattern.chord];
        } else if (step === 2) {
          notesToPlay = [pattern.bass[1] || pattern.bass[0]];
        }
        
        notesToPlay.forEach(noteName => {
          const note = pianoNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
          if (note) {
            playNote(note.midi);
            acmpNotesRef.current.add(note.midi);
          }
        });
      };
      
      let currentStep = 0;
      setAcmpStep(currentStep);
      playStep(currentStep);
      
      intervalId = setInterval(() => {
        currentStep = (currentStep + 1) % 4;
        setAcmpStep(currentStep);
        playStep(currentStep);
      }, 500); // 500ms per step
      
    } else {
      acmpNotesRef.current.forEach(midi => stopNote(midi));
      acmpNotesRef.current.clear();
      setAcmpStep(0);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
      acmpNotesRef.current.forEach(midi => stopNote(midi));
      acmpNotesRef.current.clear();
    };
  }, [isAcmpPlaying, selectedChord, isInitialized, setupMode]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-6">
      <PageHeader 
        title={<span className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-4xl">music_note</span> Chord Explorer</span>} 
        description="Explore common piano chords, see their notes, and hear them play."
      />
      
      {/* Audio init banner */}
      {!isInitialized && (
        <div className="w-full max-w-5xl">
          <Panel className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-cosmic-purple/30">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-moon-gray">volume_off</span>
              <div>
                <p className="text-star-white font-medium text-sm">Audio not started</p>
                <p className="text-moon-gray text-xs">Click the button to enable sound playback.</p>
              </div>
            </div>
            <Button variant="primary" onClick={handleStartAudio} id="start-audio-btn">
              ▶ Start Audio Engine
            </Button>
          </Panel>
        </div>
      )}

      {/* Setup Switcher */}
      <div className="w-full max-w-5xl flex justify-center mb-2">
        <div className="bg-space-surface/60 p-1 rounded-xl border border-white/5 flex gap-1">
          <button
            onClick={() => { setSetupMode('chords'); setIsAcmpPlaying(false); setIsSustaining(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              setupMode === 'chords' 
                ? 'bg-cosmic-purple text-white shadow-lg' 
                : 'text-moon-gray hover:text-white hover:bg-white/5'
            }`}
          >
            Chords
          </button>
          <button
            onClick={() => { setSetupMode('acmp'); setIsAcmpPlaying(false); setIsSustaining(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              setupMode === 'acmp' 
                ? 'bg-cosmic-blue text-white shadow-lg' 
                : 'text-moon-gray hover:text-white hover:bg-white/5'
            }`}
          >
            ACMP
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Chord Selector */}
          <div className="h-full">
            <ChordSelector 
              chords={commonChords} 
              selectedChordId={selectedChord?.id} 
              onSelectChord={setSelectedChord} 
            />
          </div>
          
          {/* Info Component */}
          <div className="h-full">
            {setupMode === 'chords' ? (
              <ChordInfo 
                chord={selectedChord} 
                onPlayChord={handlePlayChord}
                isPlaying={isPlaying}
                isSustaining={isSustaining}
                onToggleSustain={toggleSustain}
              />
            ) : (
              <AcmpInfo 
                chord={selectedChord}
                acmpPattern={selectedChord ? accompanimentPatterns[selectedChord.id] : null}
                isAcmpPlaying={isAcmpPlaying}
                onToggleAcmp={toggleAcmp}
              />
            )}
          </div>
        </div>
      </div>
          
      {/* Piano View */}
      <div className="w-full max-w-5xl mt-2">
        <Panel className="flex flex-col items-center gap-6 p-6 lg:p-8">
          
          {/* Controls header */}
          <div className="flex items-center justify-end w-full">
            {/* Volume control */}
            <div className="flex items-center gap-3">
              <span className="text-moon-gray text-xl select-none flex items-center">
                {volume === 0 ? <span className="material-symbols-outlined">volume_off</span> : volume < 0.4 ? <span className="material-symbols-outlined">volume_down</span> : <span className="material-symbols-outlined">volume_up</span>}
              </span>
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Master volume"
                className="w-28 h-1.5 accent-cosmic-purple cursor-pointer rounded-full appearance-none
                           bg-white/10 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:bg-nebula-violet [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(168,85,247,0.7)]"
              />
              <span className="text-moon-gray/60 text-xs w-8 tabular-nums">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex justify-center" style={{ minWidth: 'max-content' }}>
              <Piano 
                activeNotes={activeNotes} 
                highlightedNotes={highlightedNotes} 
                onNoteOn={handleNoteOn} 
                onNoteOff={handleNoteOff} 
              />
            </div>
          </div>
          
          {/* Octave labels */}
          <div className="flex gap-2 text-xs text-moon-gray/50 select-none">
            <span>◀ Octave 3</span>
            <span>│</span>
            <span>Octave 4 ▶</span>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default ChordsPage;
