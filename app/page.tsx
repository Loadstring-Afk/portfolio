'use client';

import { HeroSection } from './components/sections/hero';
import { AboutSection } from './components/sections/about';
import { TimelineSection } from './components/sections/timeline';
import { ContactSection } from './components/sections/contact';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="section-padding border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-400">
            © {new Date().getFullYear()} Alex Chen. All rights reserved.
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Crafted with passion in San Francisco
          </p>
        </div>
      </footer>
    </main>
  );
}