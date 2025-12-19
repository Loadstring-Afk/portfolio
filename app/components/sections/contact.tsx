'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/alexchen' },
  { icon: Github, label: 'GitHub', url: 'https://github.com/alexchen' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/alexchen' },
];

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    formRef.current?.reset();
    
    // Success animation
    // In a real app, you'd show a success message
  };

  return (
    <section className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Let's Connect
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <Mail className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-zinc-400">hello@alexchen.dev</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <MapPin className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-zinc-400">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Find me online</h3>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Available for work */}
            <motion.div
              className="p-6 rounded-2xl glass border border-amber-500/20"
              animate={{ borderColor: ['rgba(245,158,11,0.2)', 'rgba(245,158,11,0.4)', 'rgba(245,158,11,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-lg">
                <span className="text-amber-500 font-semibold">Available</span> for freelance work
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send size={20} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}