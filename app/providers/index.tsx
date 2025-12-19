'use client';

import React from 'react';
import { SmoothScrollProvider } from './smooth-scroll-provider';
import { AudioProvider } from './audio-provider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AudioProvider>
        {children}
      </AudioProvider>
    </SmoothScrollProvider>
  );
}