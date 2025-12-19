'use client';

import React, { useEffect } from 'react';
import { useAudio } from '@/app/providers/audio-provider';
import { tracks } from '@/lib/constants/tracks';
import { PlayerControls } from './player-controls';
import { TrackInfo } from './track-info';
import { VolumeControl } from './volume-control';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const { playlist, currentTrack, isPlaying, play } = useAudio();

  // Initialize playlist
  useEffect(() => {
    if (playlist.length === 0) {
      // Set initial tracks
      useAudio.setState({ playlist: tracks, currentTrack: tracks[0] });
    }
  }, [playlist.length]);

  // Handle user interaction for audio context
  const handleFirstInteraction = () => {
    if (!isPlaying && currentTrack) {
      play();
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
      onClick={handleFirstInteraction}
    >
      <div className="glass rounded-2xl p-4 w-80 backdrop-blur-xl">
        <div className="space-y-4">
          <TrackInfo />
          <PlayerControls />
          <VolumeControl />
        </div>
        
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
}