import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { validateGuestCode } from '../services/googleSheetsService';
import { Guest } from '../types';
import { FALLBACK_BACKGROUND, WEDDING_CONFIG } from '../data/weddingData';
import { ImageWithFallback } from './ImageWithFallback';

interface AccessCodeModalProps {
  onUnlock: (guest: Guest) => void;
}

export const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ onUnlock }) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validatedGuest, setValidatedGuest] = useState<Guest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setErrorMessage('Ingresa tu código');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await validateGuestCode(code);
      if (result.success && result.guest) {
        setValidatedGuest(result.guest);
        // Short celebratory delay before transitioning to invitation
        setTimeout(() => {
          onUnlock(result.guest!);
        }, 1100);
      } else {
        setErrorMessage(result.message || 'Código no válido');
      }
    } catch {
      setErrorMessage('Error al consultar. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      id="access-code-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Image Layer: Clear & luminous, allowing the background to truly shine */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ImageWithFallback
          src="/img/fondo.jpg"
          fallbackSrc={FALLBACK_BACKGROUND}
          alt="Andrea & Alonso Boda"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
        />
        
        {/* Very subtle ambient gradient only at the very top & bottom to ensure crystal clarity of the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30" />
      </div>

      {/* Top Monogram & Names Header */}
      <header className="relative z-10 w-full pt-8 sm:pt-12 px-6 text-center">
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="inline-flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full border border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-sm">
            <span className="font-cinzel text-lg text-white tracking-widest font-semibold drop-shadow-sm">A &amp; A</span>
          </div>
          <h1 className="font-serif-elegant text-2xl sm:text-3xl text-white font-light tracking-wider drop-shadow-md">
            {WEDDING_CONFIG.couple.bride} &amp; {WEDDING_CONFIG.couple.groom}
          </h1>
          <span className="text-[11px] font-sans-clean uppercase tracking-[0.3em] text-white/80 font-light mt-0.5 drop-shadow-sm">
            {WEDDING_CONFIG.date.displayDate}
          </span>
        </motion.div>
      </header>

      {/* Center Spacer to keep full visibility on the photo */}
      <div className="flex-1" />

      {/* Bottom Ultra-Minimalist Floating Input Box (No descriptive text) */}
      <section className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto px-4 pb-8 sm:pb-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {!validatedGuest ? (
              <motion.div
                key="minimal-input-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {/* Ultra-Minimalist Sleek Glass Pill */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 p-1.5 bg-white/35 hover:bg-white/45 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl transition-all duration-300 focus-within:bg-white/60 focus-within:border-white focus-within:ring-2 focus-within:ring-white/40"
                >
                  <input
                    id="guest-code-input"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="CÓDIGO"
                    autoCapitalize="characters"
                    autoComplete="off"
                    spellCheck="false"
                    className="flex-1 bg-transparent px-5 py-2.5 sm:py-3 text-center font-cinzel text-base sm:text-lg tracking-[0.3em] text-[#2C2825] placeholder:text-[#4A4540]/60 placeholder:tracking-[0.2em] placeholder:font-cinzel focus:outline-none uppercase font-semibold"
                  />

                  <button
                    id="submit-access-code-btn"
                    type="submit"
                    disabled={isLoading}
                    aria-label="Ingresar código"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2C2825] hover:bg-[#1A1816] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-75"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white" />
                    )}
                  </button>
                </form>

                {/* Minimalist Error Message Toast */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2.5 mx-auto flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-sans-clean text-center shadow-lg max-w-xs"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                    <span className="text-white/95 text-[11px]">{errorMessage}</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="minimal-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 sm:p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl text-center"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif-elegant text-xl text-[#2C2825] font-semibold">
                  {validatedGuest.name}
                </h3>
                <p className="text-xs font-sans-clean text-[#6B645D] mt-0.5">
                  {validatedGuest.passes} pase{validatedGuest.passes > 1 ? 's' : ''} asignado{validatedGuest.passes > 1 ? 's' : ''}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs font-sans-clean text-[#A8813B] animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Abriendo invitación...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
};

