import React from 'react';
import { motion } from 'motion/react';
import { Wine, Sparkles, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

export const AdultsOnlyBlock: React.FC = () => {
  const { adultsOnly } = WEDDING_CONFIG;

  return (
    <section id="adults-only-section" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E5DCce]/80 bg-white/70 text-center relative overflow-hidden"
      >
        {/* Subtle top gold accent line */}
        <div className="absolute top-0 inset-x-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />

        {/* Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3.5 text-[#A8813B] shadow-sm">
          <Wine className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Tag / Category */}
        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold block mb-1">
          {adultsOnly.tag}
        </span>

        {/* Section Title */}
        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-3">
          {adultsOnly.title}
        </h2>

        {/* Fine gold divider */}
        <div className="w-14 h-[1px] bg-[#C5A059]/40 mx-auto mb-5" />

        {/* Message Box */}
        <div className="max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#FAF8F5]/90 border border-[#C5A059]/25 shadow-sm mb-4">
          <p className="text-sm sm:text-[15px] font-sans-clean text-[#5A534D] leading-relaxed font-light">
            {adultsOnly.message}
          </p>
        </div>

        {/* Subtle Heart Note */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-serif-elegant italic text-[#8B6E33]">
          <Heart className="w-3.5 h-3.5 fill-[#C5A059]/25 text-[#A8813B]" />
          <span>{adultsOnly.note}</span>
          <Heart className="w-3.5 h-3.5 fill-[#C5A059]/25 text-[#A8813B]" />
        </div>
      </motion.div>
    </section>
  );
};
