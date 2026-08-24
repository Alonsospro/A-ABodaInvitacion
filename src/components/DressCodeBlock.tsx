import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldAlert, Check } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

export const DressCodeBlock: React.FC = () => {
  const { dressCode } = WEDDING_CONFIG;

  return (
    <section id="dresscode-section" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E5DCce]/80 bg-white/70 text-center"
      >
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B]">
          <Sparkles className="w-5 h-5" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Código de Vestimenta
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          {dressCode.title}
        </h2>

        <p className="text-sm font-sans-clean text-[#6B645D] max-w-md mx-auto mb-8">
          {dressCode.description}
        </p>

        {/* Reserved Colors Notice */}
        <div className="max-w-xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-[#FBF7EE] border border-[#C5A059]/40 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#8B6E33] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-xs font-semibold text-[#8B6E33] uppercase tracking-wider mb-0.5">
              Colores Reservados para los Novios
            </h3>
            <p className="text-xs font-sans-clean text-[#6B645D] leading-relaxed">
              {dressCode.reservedNote}
            </p>
          </div>
        </div>

        {/* Color Palette Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto pt-2">
          {/* Reserved */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 border border-[#C5A059]/20">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-rose-800 font-semibold block mb-3">
              ✕ No Permitidos
            </span>
            <div className="flex items-center justify-center gap-3">
              {dressCode.reservedColors.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-11 h-11 rounded-full border-2 border-dashed border-rose-400 shadow-sm flex items-center justify-center relative"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-rose-500 font-bold text-sm">✕</span>
                  </div>
                  <span className="text-[11px] font-sans-clean text-[#6B645D]">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 border border-[#C5A059]/20">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-emerald-800 font-semibold block mb-3">
              ✓ Paleta Sugerida
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {dressCode.suggestedColors.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full border border-black/10 shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    <Check className="w-3.5 h-3.5 text-white/80 drop-shadow" />
                  </div>
                  <span className="text-[10px] font-sans-clean text-[#6B645D] max-w-[60px] text-center leading-tight">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
