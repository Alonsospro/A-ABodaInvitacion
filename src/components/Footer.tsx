import React from 'react';
import { Heart, RefreshCcw } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

interface FooterProps {
  onChangeCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangeCode }) => {
  return (
    <footer className="w-full pt-16 pb-12 px-4 text-center bg-[#FAF8F5] border-t border-[#E5DCce]/60 relative">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border border-[#C5A059]/40 bg-white flex items-center justify-center mb-3 shadow-sm">
          <span className="font-cinzel text-xl text-[#A8813B] font-semibold">A &amp; A</span>
        </div>

        <h3 className="font-serif-elegant text-3xl text-[#2C2825] font-normal mb-1">
          {WEDDING_CONFIG.couple.bride} &amp; {WEDDING_CONFIG.couple.groom}
        </h3>

        <p className="text-xs font-cinzel tracking-[0.25em] text-[#8B6E33] uppercase font-semibold mb-3">
          {WEDDING_CONFIG.date.displayDate}
        </p>

        <p className="font-serif-elegant italic text-base text-[#6B645D] max-w-sm mx-auto mb-6">
          "Gracias por formar parte de este día que quedará por siempre en nuestros corazones."
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans-clean text-[#8C847B]">
          <button
            onClick={onChangeCode}
            className="inline-flex items-center gap-1.5 hover:text-[#2C2825] transition-colors cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Ingresar otro código</span>
          </button>
        </div>

        <div className="mt-8 flex items-center gap-1 text-[11px] font-sans-clean text-[#AAA298]">
          <span>Hecho con amor</span>
          <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
          <span>para Andrea &amp; Alonso</span>
        </div>
      </div>
    </footer>
  );
};
