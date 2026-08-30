import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';
import Button from '../components/common/Button';
import Piano from '../components/piano/Piano';
import VoicePanel from '../components/harmony/VoicePanel';
import HarmonyInfo from '../components/harmony/HarmonyInfo';
import HarmonyChordSelector from '../components/harmony/HarmonyChordSelector';
import ToneSelector from '../components/harmony/ToneSelector';
import { commonChords } from '../data/chords';
import { pianoNotes } from '../data/notes';
import { generateHarmonyForChord, harmonyToMidi } from '../data/harmony';
import { useAudio } from '../hooks/useAudio';
import { usePiano } from '../hooks/usePiano';

const HarmonyPage = () => {
  const [selectedChord, setSelectedChord] = useState(null);
  const [harmony, setHarmony] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTone, setSelectedTone] = useState('piano');
  const harmonyNotesRef = React.useRef(new Set());
  
  const { initAudio, isInitialized, playNote, stopNote, playHarmonyNote, stopHarmonyNote, stopAllHarmony, volume, setVolume } = useAudio();
  const { activeNotes, handleNoteOn, handleNoteOff } = usePiano(
    isInitialized ? playNote : null,
    isInitialized ? stopNote : null
  );

  // When chord is selected, generate harmony
  useEffect(() => {
    if (selectedChord) {
      const generatedHarmony = generateHarmonyForChord(selectedChord);
      setHarmony(generatedHarmony);
    } else {
      setHarmony(null);
    }
  }, [selectedChord]);

  // Convert harmony notes to MIDI values for piano highlighting
  const highlightedNotes = useMemo(() => {
    const midiSet = new Set();
    if (harmony) {
      [harmony.soprano, harmony.alto, harmony.tenor, harmony.bass].forEach(noteName => {
        const note = pianoNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
        if (note) {
          midiSet.add(note.midi);
        }
      });
    }
    return midiSet;
  }, [harmony]);

  const handleStartAudio = () => {
    initAudio();
  };

  const handlePlayHarmony = () => {
    if (!isInitialized) return;
    if (!harmony) return;

    // Play all four voices with selected tone
    const harmonyMidi = harmonyToMidi(harmony);
    harmonyNotesRef.current.clear();
    
    [
      harmonyMidi.soprano,
      harmonyMidi.alto,
      harmonyMidi.tenor,
      harmonyMidi.bass
    ].forEach(midi => {
      if (midi !== null) {
        playHarmonyNote(midi, selectedTone);
        harmonyNotesRef.current.add(midi);
      }
    });

    setIsPlaying(true);

    // Stop after 2 seconds (gives time for the chord to sustain)
    setTimeout(() => {
      handleStopHarmony();
    }, 2000);
  };

  const handleStopHarmony = () => {
    if (!isInitialized) return;

    // Stop all harmony notes
    stopAllHarmony();
    harmonyNotesRef.current.clear();
    setIsPlaying(false);
  };

  // Play single voice for audition
  const handlePlayVoice = (voiceName) => {
    if (!isInitialized || !harmony) return;

    const note = harmony[voiceName.toLowerCase()];
    if (!note) return;

    const noteObj = pianoNotes.find(n => n.name.toLowerCase() === note.toLowerCase());
    if (!noteObj) return;

    playHarmonyNote(noteObj.midi, selectedTone);
    setTimeout(() => {
      stopHarmonyNote(noteObj.midi, selectedTone);
    }, 800);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isPlaying) {
        handleStopHarmony();
      }
    };
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      <PageHeader 
        title={<span className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-4xl">library_music</span> Harmony Studio</span>} 
        description="Explore four-part SATB harmony and voice leading concepts."
      />

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chord Selector */}
        <div className="lg:col-span-1">
          <HarmonyChordSelector 
            chords={commonChords}
            selectedChordId={selectedChord?.id}
            onSelectChord={(chord) => {
              setSelectedChord(chord);
            }}
          />
        </div>

        {/* Right: Voices and Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Harmony Info */}
          <HarmonyInfo chord={selectedChord} harmony={harmony} />

          {/* Tone Selector */}
          <ToneSelector selectedTone={selectedTone} onSelectTone={setSelectedTone} />

          {/* Voice Panels - 4 voices */}
          <div>
            <h3 className="text-star-white text-sm font-semibold uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">headset</span>
              Four-Part Voices
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <VoicePanel 
                voiceName="Soprano" 
                noteName={harmony?.soprano} 
                isHighlighted={isPlaying}
                onPlayVoice={() => handlePlayVoice('soprano')}
              />
              <VoicePanel 
                voiceName="Alto" 
                noteName={harmony?.alto}
                isHighlighted={isPlaying}
                onPlayVoice={() => handlePlayVoice('alto')}
              />
              <VoicePanel 
                voiceName="Tenor" 
                noteName={harmony?.tenor}
                isHighlighted={isPlaying}
                onPlayVoice={() => handlePlayVoice('tenor')}
              />
              <VoicePanel 
                voiceName="Bass" 
                noteName={harmony?.bass}
                isHighlighted={isPlaying}
                onPlayVoice={() => handlePlayVoice('bass')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Piano Visualization */}
      <div className="w-full">
        <h3 className="text-star-white text-sm font-semibold uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">piano</span>
          Voice Visualization
        </h3>
        <Panel className="p-8 flex justify-center overflow-x-auto">
          <Piano
            activeNotes={activeNotes}
            highlightedNotes={highlightedNotes}
            onNoteOn={handleNoteOn}
            onNoteOff={handleNoteOff}
          />
        </Panel>
      </div>

      {/* Controls */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
        {!isInitialized && (
          <Button 
            variant="secondary"
            onClick={handleStartAudio}
            className="flex-1 sm:flex-initial"
          >
            <span className="material-symbols-outlined">info</span>
            Start Audio
          </Button>
        )}
        
        <Button 
          variant={!selectedChord ? "secondary" : "primary"}
          onClick={handlePlayHarmony}
          disabled={!selectedChord || !isInitialized}
          className="flex-1 sm:flex-initial"
        >
          <span className="material-symbols-outlined">play_arrow</span>
          Play Harmony
        </Button>

        {isPlaying && (
          <Button 
            variant="secondary"
            onClick={handleStopHarmony}
            className="flex-1 sm:flex-initial"
          >
            <span className="material-symbols-outlined">stop</span>
            Stop
          </Button>
        )}
      </div>

      {/* Volume control */}
      <Panel className="p-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          <label className="text-star-white text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">volume_up</span>
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cosmic-purple"
          />
          <div className="text-xs text-moon-gray text-center">
            {Math.round(volume * 100)}%
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default HarmonyPage;
