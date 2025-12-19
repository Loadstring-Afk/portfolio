'use client';

import React from 'react';
import { useAudio } from '@/app/providers/audio-provider';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const BUTTON_SIZE = 44;

export function PlayerControls() {
  const { isPlaying, play, pause, nextTrack, prevTrack } = useAudio();

  return (
    <div className="flex items-center justify-center space-x-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevTrack}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Previous track"
      >
        <SkipBack size={20} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={isPlaying ? pause : play}
        className="glass rounded-full p-3 relative overflow-hidden"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
        {isPlaying ? (
          <Pause size={BUTTON_SIZE / 2} />
        ) : (
          <Play size={BUTTON_SIZE / 2} className="ml-0.5" />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextTrack}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Next track"
      >
        <SkipForward size={20} />
      </motion.button>
    </div>
  );
}