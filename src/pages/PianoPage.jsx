import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Panel from '../components/common/Panel';
import Button from '../components/common/Button';
import Piano from '../components/piano/Piano';
import { useAudio } from '../hooks/useAudio';
import { usePiano } from '../hooks/usePiano';
import { pianoNotes } from '../data/notes';

const PianoPage = () => {
  const { initAudio, isInitialized, playNote, stopNote, volume, setVolume } = useAudio();

  const { activeNotes, handleNoteOn, handleNoteOff } = usePiano(
    // Only play audio if the context has been initialized
    isInitialized ? playNote : null,
    isInitialized ? stopNote : null
  );

  // Last played note display
  const [lastPlayed, setLastPlayed] = useState(null);

  const handleNoteOnWithDisplay = (midi) => {
    handleNoteOn(midi);
    const note = pianoNotes.find(n => n.midi === midi);
    if (note) setLastPlayed(note.name);
  };

  const handleStartAudio = () => {
    initAudio();
  };


  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-6">
      <PageHeader
        title="🎹 Virtual Piano"
        description="Play notes using your keyboard, mouse, or touch. Explore the cosmic soundscape."
      />

      {/* Audio init banner */}
      {!isInitialized && (
        <div className="w-full max-w-5xl">
          <Panel className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-cosmic-purple/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔇</span>
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

      {/* Main piano panel */}
      <div className="w-full max-w-5xl">
        <Panel className="flex flex-col items-center gap-6 p-6 lg:p-8">

          {/* Currently playing note indicator */}
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full transition-all duration-150 ${
                activeNotes.size > 0
                  ? 'bg-cosmic-blue shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse'
                  : 'bg-white/10'
              }`} />
              <span className="text-moon-gray text-sm">
                {activeNotes.size > 0
                  ? <span className="text-star-white font-semibold">{lastPlayed}</span>
                  : <span className="text-moon-gray/60">Play a key…</span>
                }
              </span>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-3">
              <span className="text-moon-gray text-sm select-none">
                {volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}
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

          {/* Piano — horizontally scrollable on small screens */}
          <div className="w-full overflow-x-auto pb-2 -mx-2 px-2">
            <div
              className="flex justify-center"
              style={{ minWidth: 'max-content' }}
            >
              <Piano
                activeNotes={activeNotes}
                onNoteOn={handleNoteOnWithDisplay}
                onNoteOff={handleNoteOff}
              />
            </div>
          </div>

          {/* Octave labels */}
          <div className="flex gap-2 text-xs text-moon-gray/50 select-none">
            <span>◀ Octave 3 (Z–M keys)</span>
            <span>│</span>
            <span>Octave 4 (Q–I keys) ▶</span>
          </div>
        </Panel>
      </div>

      {/* Keyboard shortcuts guide */}
      <div className="w-full max-w-5xl">
        <Panel className="p-5">
          <h3 className="text-star-white font-semibold mb-4 text-sm tracking-wide uppercase flex items-center gap-2">
            <span className="text-cosmic-purple">⌨</span> Keyboard Map
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Octave 3 */}
            <div>
              <p className="text-moon-gray/60 text-xs mb-2 uppercase tracking-widest">Octave 3</p>
              <div className="flex flex-wrap gap-1.5">
                {pianoNotes.filter(n => n.octave === 3).map(n => (
                  <KeyBadge key={n.id} note={n} isActive={activeNotes.has(n.midi)} />
                ))}
              </div>
            </div>
            {/* Octave 4 */}
            <div>
              <p className="text-moon-gray/60 text-xs mb-2 uppercase tracking-widest">Octave 4 + C5</p>
              <div className="flex flex-wrap gap-1.5">
                {pianoNotes.filter(n => n.octave === 4 || n.id === 'c5').map(n => (
                  <KeyBadge key={n.id} note={n} isActive={activeNotes.has(n.midi)} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-moon-gray/40 text-xs mt-4">
            Tip: Hold multiple keys simultaneously to layer notes.
          </p>
        </Panel>
      </div>
    </div>
  );
};

/** Small helper component: displays a note + its keyboard shortcut */
const KeyBadge = ({ note, isActive }) => (
  <div
    className={[
      'flex flex-col items-center rounded-lg px-2 py-1.5 min-w-[40px] transition-all duration-100',
      note.type === 'black'
        ? isActive
          ? 'bg-nebula-violet/40 border border-nebula-violet/60 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
          : 'bg-space-surface border border-white/10'
        : isActive
          ? 'bg-cosmic-blue/30 border border-cosmic-blue/60 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
          : 'bg-white/5 border border-white/10',
    ].join(' ')}
  >
    <span className={`text-[10px] font-bold ${note.type === 'black' ? 'text-nebula-violet' : 'text-moon-gray'}`}>
      {note.name}
    </span>
    <kbd className="text-[9px] mt-0.5 text-moon-gray/50 font-mono uppercase">
      {note.keyboardKey}
    </kbd>
  </div>
);

export default PianoPage;
