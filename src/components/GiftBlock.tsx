import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, QrCode, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { GiftQrModal } from './GiftQrModal';

export const GiftBlock: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { gift } = WEDDING_CONFIG;

  return (
    <section id="gift-section" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E5DCce]/80 bg-white/75 relative overflow-hidden"
      >
        {/* Subtle decorative gold top bar */}
        <div className="absolute top-0 inset-x-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />

        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B] shadow-sm">
          <Gift className="w-6 h-6" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Mesa de Regalos
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-3">
          Regalo &amp; Presente
        </h2>

        {/* The heartfelt phrase requested by user */}
        <div className="max-w-xl mx-auto my-6 p-6 rounded-2xl bg-[#FAF8F5]/90 border border-[#C5A059]/30 shadow-inner">
          <p className="font-serif-elegant italic text-lg sm:text-xl text-[#3D3732] leading-relaxed">
            "{gift.phrase}"
          </p>
        </div>

        {/* Suggestion Button to open QR modal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-shimmer py-3.5 px-8 rounded-full text-white font-sans-clean font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Sugerencia de Regalo (Ver QR)</span>
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>
      </motion.div>

      {/* QR Modal */}
      <GiftQrModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
