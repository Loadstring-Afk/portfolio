'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import { AudioState, Track } from '@/types';

interface AudioContextType extends AudioState {
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  selectTrack: (trackId: string) => void;
}

type AudioAction =
  | { type: 'SET_CURRENT_TRACK'; payload: Track }
  | { type: 'SET_IS_PLAYING'; payload: boolean }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_IS_MUTED'; payload: boolean }
  | { type: 'SET_PLAYLIST'; payload: Track[] }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' };

const initialState: AudioState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  playlist: [],
  progress: 0,
};

const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: Math.max(0, Math.min(1, action.payload)) };
    case 'SET_IS_MUTED':
      return { ...state, isMuted: action.payload };
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'NEXT_TRACK': {
      if (!state.currentTrack || state.playlist.length === 0) return state;
      const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
      const nextIndex = (currentIndex + 1) % state.playlist.length;
      return { ...state, currentTrack: state.playlist[nextIndex], progress: 0 };
    }
    case 'PREV_TRACK': {
      if (!state.currentTrack || state.playlist.length === 0) return state;
      const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : state.playlist.length - 1;
      return { ...state, currentTrack: state.playlist[prevIndex], progress: 0 };
    }
    default:
      return state;
  }
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const [sound, setSound] = React.useState<Howl | null>(null);

  // Initialize sound
  useEffect(() => {
    if (state.currentTrack) {
      if (sound) {
        sound.unload();
      }

      const newSound = new Howl({
        src: [state.currentTrack.src],
        volume: state.isMuted ? 0 : state.volume,
        autoplay: state.isPlaying,
        loop: false,
        onend: () => {
          dispatch({ type: 'NEXT_TRACK' });
        },
        onload: () => {
          if (state.isPlaying) {
            newSound.play();
          }
        },
        onplay: () => {
          dispatch({ type: 'SET_IS_PLAYING', payload: true });
        },
        onpause: () => {
          dispatch({ type: 'SET_IS_PLAYING', payload: false });
        },
      });

      setSound(newSound);

      return () => {
        if (sound) {
          sound.unload();
        }
      };
    }
  }, [state.currentTrack]);

  // Update volume
  useEffect(() => {
    if (sound) {
      sound.volume(state.isMuted ? 0 : state.volume);
    }
  }, [sound, state.volume, state.isMuted]);

  // Progress tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (sound && state.isPlaying) {
      interval = setInterval(() => {
        const currentTime = sound.seek() as number;
        const duration = sound.duration() as number;
        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
        dispatch({ type: 'SET_PROGRESS', payload: progress });
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [sound, state.isPlaying]);

  const play = useCallback(() => {
    if (sound) {
      sound.play();
      dispatch({ type: 'SET_IS_PLAYING', payload: true });
    }
  }, [sound]);

  const pause = useCallback(() => {
    if (sound) {
      sound.pause();
      dispatch({ type: 'SET_IS_PLAYING', payload: false });
    }
  }, [sound]);

  const nextTrack = useCallback(() => {
    dispatch({ type: 'NEXT_TRACK' });
  }, []);

  const prevTrack = useCallback(() => {
    dispatch({ type: 'PREV_TRACK' });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: 'SET_IS_MUTED', payload: !state.isMuted });
  }, [state.isMuted]);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  }, []);

  const selectTrack = useCallback((trackId: string) => {
    const track = state.playlist.find(t => t.id === trackId);
    if (track) {
      dispatch({ type: 'SET_CURRENT_TRACK', payload: track });
    }
  }, [state.playlist]);

  const value: AudioContextType = {
    ...state,
    play,
    pause,
    nextTrack,
    prevTrack,
    toggleMute,
    setVolume,
    selectTrack,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};