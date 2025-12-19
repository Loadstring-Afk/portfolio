'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Code2, Palette, Sparkles } from 'lucide-react';

const ABOUT_TEXT = {
  intro: "I specialize in creating immersive digital experiences that blend technical precision with artistic vision.",
  philosophy: "My approach combines minimal aesthetics with complex interactions, always prioritizing user experience and performance.",
  focus: "Currently focused on pushing the boundaries of web animation and real-time graphics.",
};

const SKILLS = [
  { icon: Code2, label: 'Modern Frameworks', description: 'React, Next.js, Vue' },
  { icon: Palette, label: 'Design Systems', description: 'Figma, Tailwind, Framer Motion' },
  { icon: Sparkles, label: 'Animation', description: 'GSAP, Three.js, WebGL' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Pin section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: pinRef.current,
        pinSpacing: false,
        scrub: 1,
      });

      // Sequential reveal
      gsap.utils.toArray('.about-item').forEach((item: any, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
        });
      });

      // Skill cards animation
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh]">
      <div ref={pinRef} className="sticky top-0 h-screen flex items-center">
        <div className="section-padding w-full">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-12 text-gradient"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left column - Text */}
              <div className="space-y-8">
                <motion.p 
                  className="about-item text-xl text-zinc-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {ABOUT_TEXT.intro}
                </motion.p>

                <motion.p 
                  className="about-item text-lg text-zinc-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {ABOUT_TEXT.philosophy}
                </motion.p>

                <motion.p 
                  className="about-item text-lg text-zinc-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {ABOUT_TEXT.focus}
                </motion.p>
              </div>

              {/* Right column - Skills */}
              <div className="skills-grid">
                {SKILLS.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    className="skill-card glass rounded-2xl p-6 mb-4 hover:bg-white/5 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <skill.icon className="text-amber-500" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold">{skill.label}</h3>
                    </div>
                    <p className="text-zinc-400">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '5+', label: 'Years Experience' },
                { value: '100%', label: 'Satisfaction' },
                { value: '24/7', label: 'Passion' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}