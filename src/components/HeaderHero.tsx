import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG, GALLERY_IMAGES } from '../data/weddingData';
import { ImageWithFallback } from './ImageWithFallback';
import { Guest } from '../types';

interface HeaderHeroProps {
  guest: Guest;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({ guest }) => {
  const heroImage = GALLERY_IMAGES[0]; // f1.jpg

  const scrollToNext = () => {
    const nextSection = document.getElementById('countdown-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] flex flex-col items-center justify-between pt-12 pb-8 px-4 sm:px-6 overflow-hidden bg-[#FAF8F5]">
      {/* Top Greeting Pill for Guest */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C5A059]/30 shadow-sm backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#A8813B]" />
        <span className="text-xs font-sans-clean text-[#5A524A] font-medium tracking-wide">
          Invitación de honor para: <strong className="text-[#2C2825] font-semibold">{guest.name}</strong>
        </span>
      </motion.div>

      {/* Main Container */}
      <div className="z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Monogram */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="w-16 h-16 rounded-full border border-[#C5A059]/40 bg-white/70 backdrop-blur-sm flex items-center justify-center mb-4 shadow-sm"
        >
          <span className="font-cinzel text-2xl text-[#A8813B] font-semibold">A &amp; A</span>
        </motion.div>

        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm font-cinzel tracking-[0.35em] text-[#8B6E33] uppercase font-semibold mb-2"
        >
          {WEDDING_CONFIG.couple.subheading}
        </motion.span>

        {/* Names in elegant serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-serif-elegant text-5xl sm:text-7xl lg:text-8xl text-[#2C2825] font-normal tracking-tight mb-4"
        >
          {WEDDING_CONFIG.couple.bride}{' '}
          <span className="font-script text-4xl sm:text-6xl text-[#A8813B] inline-block mx-1 font-normal">&amp;</span>{' '}
          {WEDDING_CONFIG.couple.groom}
        </motion.h1>

        {/* Hero Photo: f1.jpg */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative my-6 w-full max-w-md sm:max-w-lg aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <ImageWithFallback
            src={heroImage.src}
            fallbackSrc={heroImage.fallbackSrc}
            alt="Andrea y Alonso"
            className="w-full h-full object-cover object-center"
          />

          {/* Delicate inner border */}
          <div className="absolute inset-3 border border-white/40 rounded-2xl pointer-events-none" />

          {/* Bottom subtle quote vignette */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white text-center">
            <p className="font-serif-elegant italic text-lg sm:text-xl text-white/95 leading-snug drop-shadow-md">
              "{WEDDING_CONFIG.couple.quote}"
            </p>
          </div>
        </motion.div>

        {/* Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#5A524A] text-sm font-sans-clean font-light"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#A8813B]" />
            <span className="font-cinzel tracking-wider text-xs sm:text-sm font-medium">{WEDDING_CONFIG.date.displayDate}</span>
          </div>
          <span className="hidden sm:inline text-[#C5A059]">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#A8813B]" />
            <span className="text-xs sm:text-sm">{WEDDING_CONFIG.date.city}</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        aria-label="Ver detalles de la invitación"
        className="z-10 mt-6 flex flex-col items-center gap-1 text-[#8B6E33] hover:text-[#2C2825] transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-sans-clean uppercase tracking-[0.25em] font-medium">Continuar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};
