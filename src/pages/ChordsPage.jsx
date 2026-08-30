import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';
import Button from '../components/common/Button';
import ChordSelector from '../components/chords/ChordSelector';
import ChordInfo from '../components/chords/ChordInfo';
import AcmpInfo from '../components/chords/AcmpInfo';
import { commonChords } from '../data/chords';
import { accompanimentPatterns } from '../data/accompaniment';
import { pianoNotes } from '../data/notes';
import { useAudio } from '../hooks/useAudio';

const ChordsPage = () => {
  const [selectedChord, setSelectedChord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [setupMode, setSetupMode] = useState('chords'); // 'chords' | 'acmp'
  const [isAcmpPlaying, setIsAcmpPlaying] = useState(false);
  const acmpNotesRef = React.useRef(new Set());
  
  const { initAudio, isInitialized, playNote, stopNote, playAcmp, stopAllAcmp, volume, setVolume } = useAudio();

  // Convert note names (e.g. "C4") to MIDI values for highlighting
  const highlightedNotes = useMemo(() => {
    const midiSet = new Set();
    
    if (setupMode === 'acmp' && isAcmpPlaying && selectedChord) {
      const pattern = accompanimentPatterns[selectedChord.id];
      if (pattern) {
        // Highlight all notes in the ACMP pattern
        [...pattern.bass, ...pattern.chord].forEach(noteName => {
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
  }, [selectedChord, setupMode, isAcmpPlaying]);

  const handleStartAudio = () => {
    initAudio();
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
    
    // Stop playing after a brief duration (e.g. 1.5 seconds)
    setTimeout(() => {
      highlightedNotes.forEach(midi => {
        stopNote(midi);
      });
      setIsPlaying(false);
    }, 1500);
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

  // Clean up on unmount for one-shot plays
  useEffect(() => {
    return () => {
      if (isPlaying) {
        highlightedNotes.forEach(midi => stopNote(midi));
      }
    };
  }, [highlightedNotes, isPlaying, stopNote]);

  // Handle continuous ACMP playback
  // Using stopAllAcmp() on stop/cleanup is the authoritative fix for the
  // "sound still playing after Stop" bug. PolySynth.releaseAll() clears every
  // active voice in one call, preventing orphaned voices that per-note
  // triggerRelease can leave behind when tracking goes out of sync.
  useEffect(() => {
    if (isAcmpPlaying && selectedChord && isInitialized && setupMode === 'acmp') {
      const pattern = accompanimentPatterns[selectedChord.id];
      if (!pattern) return;
      
      // First stop any currently playing ACMP notes (chord change while active)
      stopAllAcmp();
      acmpNotesRef.current.clear();
      
      const notesToPlay = [...pattern.bass, ...pattern.chord];
      
      notesToPlay.forEach(noteName => {
        const note = pianoNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
        if (note) {
          playAcmp(note.midi);
          acmpNotesRef.current.add(note.midi);
        }
      });
      
    } else {
      // Stop is requested — call releaseAll for guaranteed full audio stop
      stopAllAcmp();
      acmpNotesRef.current.clear();
    }
    
    return () => {
      // Cleanup: always stop all ACMP audio when effect re-runs or unmounts
      stopAllAcmp();
      acmpNotesRef.current.clear();
    };
  }, [isAcmpPlaying, selectedChord, isInitialized, setupMode, playAcmp, stopAllAcmp]);

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
            onClick={() => { setSetupMode('chords'); setIsAcmpPlaying(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              setupMode === 'chords' 
                ? 'bg-cosmic-purple text-white shadow-lg' 
                : 'text-moon-gray hover:text-white hover:bg-white/5'
            }`}
          >
            Chords
          </button>
          <button
            onClick={() => { setSetupMode('acmp'); setIsAcmpPlaying(false); }}
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
    </div>
  );
};

export default ChordsPage;
