'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { TimelineItem } from '@/types';
import { Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: '1',
    year: '2023 - Present',
    title: 'Lead Frontend Engineer',
    company: 'Nexus Digital',
    description: 'Leading a team building cutting-edge web applications with React and Next.js.',
    skills: ['React', 'TypeScript', 'GraphQL', 'WebGL'],
  },
  {
    id: '2',
    year: '2021 - 2023',
    title: 'Senior UI Developer',
    company: 'Creative Studio',
    description: 'Created award-winning interactive experiences for global brands.',
    skills: ['Vue.js', 'GSAP', 'Three.js', 'Figma'],
  },
  {
    id: '3',
    year: '2019 - 2021',
    title: 'Frontend Developer',
    company: 'Tech Startup',
    description: 'Built scalable frontend architecture and design systems from scratch.',
    skills: ['React', 'Sass', 'Jest', 'Webpack'],
  },
  {
    id: '4',
    year: '2018 - 2019',
    title: 'Web Designer',
    company: 'Design Agency',
    description: 'Designed and implemented responsive websites with focus on UX.',
    skills: ['HTML/CSS', 'JavaScript', 'Sketch', 'WordPress'],
  },
];

const ICON_MAP = {
  work: Briefcase,
  education: GraduationCap,
  award: Award,
  project: Rocket,
};

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline items
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1.5,
        });

        // Animate skills
        gsap.from(item.querySelectorAll('.skill-tag'), {
          scrollTrigger: {
            trigger: item,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });
      });

      // Animate timeline line
      gsap.from('.timeline-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: 'top center',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-7xl font-bold mb-16 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Journey
        </motion.h2>

        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent timeline-line" />

        <div className="relative">
          {TIMELINE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              ref={el => { itemsRef.current[index] = el; }}
              className={`relative mb-24 ${
                index % 2 === 0 ? 'pr-[calc(50%+2rem)]' : 'pl-[calc(50%+2rem)]'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-black shadow-lg"
                style={{ 
                  left: index % 2 === 0 ? 'calc(50% - 0.5rem)' : 'calc(50% - 0.5rem)',
                }}
              />

              {/* Content */}
              <motion.div 
                className="glass rounded-2xl p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <Briefcase className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <span className="text-amber-500 font-medium">{item.year}</span>
                    <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                    <p className="text-zinc-400 font-medium">{item.company}</p>
                  </div>
                </div>

                <p className="text-zinc-300 mb-6">{item.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map(skill => (
                    <span
                      key={skill}
                      className="skill-tag px-3 py-1 rounded-full bg-white/5 text-sm text-zinc-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}