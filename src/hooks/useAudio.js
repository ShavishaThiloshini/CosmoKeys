import { useCallback, useState } from 'react';
import { engine } from '../components/audio/AudioEngine';

export const useAudio = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  const initAudio = useCallback(() => {
    engine.init();
    setIsInitialized(true);
  }, []);

  const playNote = useCallback((midi) => {
    if (isInitialized) {
      engine.playNote(midi);
    }
  }, [isInitialized]);

  const stopNote = useCallback((midi) => {
    if (isInitialized) {
      engine.stopNote(midi);
    }
  }, [isInitialized]);

  const setVolume = useCallback((newVolume) => {
    setVolumeState(newVolume);
    if (isInitialized) {
      engine.setVolume(newVolume);
    }
  }, [isInitialized]);

  const playAcmp = useCallback((midi) => {
    if (isInitialized) {
      engine.playAcmp(midi);
    }
  }, [isInitialized]);

  const stopAcmp = useCallback((midi) => {
    if (isInitialized) {
      engine.stopAcmp(midi);
    }
  }, [isInitialized]);

  const stopAllAcmp = useCallback(() => {
    if (isInitialized) {
      engine.stopAllAcmp();
    }
  }, [isInitialized]);

  const playHarmonyNote = useCallback((midi, tone = 'piano') => {
    if (isInitialized) {
      engine.playHarmonyNote(midi, tone);
    }
  }, [isInitialized]);

  const stopHarmonyNote = useCallback((midi, tone = 'piano') => {
    if (isInitialized) {
      engine.stopHarmonyNote(midi, tone);
    }
  }, [isInitialized]);

  const stopAllHarmony = useCallback(() => {
    if (isInitialized) {
      engine.stopAllHarmony();
    }
  }, [isInitialized]);

  const playHarmonyString = useCallback((midi) => {
    if (isInitialized) {
      engine.playHarmonyString(midi);
    }
  }, [isInitialized]);

  const stopHarmonyString = useCallback((midi) => {
    if (isInitialized) {
      engine.stopHarmonyString(midi);
    }
  }, [isInitialized]);

  const stopAllHarmonyStrings = useCallback(() => {
    if (isInitialized) {
      engine.stopAllHarmonyStrings();
    }
  }, [isInitialized]);

  return {
    initAudio,
    isInitialized,
    playNote,
    stopNote,
    playAcmp,
    stopAcmp,
    stopAllAcmp,
    playHarmonyNote,
    stopHarmonyNote,
    stopAllHarmony,
    playHarmonyString,
    stopHarmonyString,
    stopAllHarmonyStrings,
    volume,
    setVolume
  };
};
