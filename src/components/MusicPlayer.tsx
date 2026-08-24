import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../services/audioService';
import { WEDDING_CONFIG } from '../data/weddingData';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    weddingAudio.toggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-5 right-5 z-40"
    >
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C2825] border border-[#C5A059]/40 shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-105"
      >
        {/* Animated Sound Equalizer Bars or Icon */}
        <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center text-[#A8813B] shrink-0">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
              <motion.span
                animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-[2px] bg-[#A8813B] rounded-full"
              />
              <motion.span
                animate={{ height: ['12px', '4px', '14px', '8px', '12px'] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                className="w-[2px] bg-[#A8813B] rounded-full"
              />
              <motion.span
                animate={{ height: ['6px', '12px', '4px', '14px', '6px'] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="w-[2px] bg-[#A8813B] rounded-full"
              />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#8C847B]" />
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] font-cinzel text-[#8B6E33] uppercase font-semibold tracking-wider">
            {isPlaying ? 'Música de Boda' : 'Música Pausada'}
          </span>
          <span className="text-[11px] font-sans-clean text-[#6B645D] max-w-[120px] truncate">
            {WEDDING_CONFIG.music.artist}
          </span>
        </div>

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
          </span>
        )}
      </button>
    </motion.div>
  );
};
