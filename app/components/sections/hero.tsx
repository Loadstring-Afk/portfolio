'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HERO_TEXT = {
  greeting: "Hello, I'm",
  name: "Alex Chen",
  title: "Creative Developer",
  description: "Crafting cinematic digital experiences through code and design.",
};

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Floating animation for arrow
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
      
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen opacity-5"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 30}%`,
              background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="hero-text text-lg md:text-xl text-zinc-400 mb-4">
            {HERO_TEXT.greeting}
          </p>
          
          <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
            <span className="text-gradient">{HERO_TEXT.name}</span>
          </h1>
          
          <h2 className="hero-text text-2xl md:text-4xl text-zinc-300 mb-8">
            {HERO_TEXT.title}
          </h2>
          
          <p className="hero-text text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            {HERO_TEXT.description}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} className="text-zinc-400" />
        </motion.div>
      </div>
    </section>
  );
}