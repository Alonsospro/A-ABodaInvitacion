import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { GALLERY_IMAGES } from '../data/weddingData';

interface PhotoSeparatorProps {
  imageIndex: number; // 1 for f2.jpg, 2 for f3.jpg, up to 7 for f8.jpg
  quote?: string;
  author?: string;
}

export const PhotoSeparator: React.FC<PhotoSeparatorProps> = ({
  imageIndex,
  quote,
  author = 'Andrea & Alonso',
}) => {
  // Clamp to valid index
  const safeIndex = Math.min(Math.max(1, imageIndex), GALLERY_IMAGES.length - 1);
  const image = GALLERY_IMAGES[safeIndex];

  return (
    <div className="relative w-full my-12 sm:my-16 overflow-hidden">
      {/* Decorative top gold line */}
      <div className="w-24 h-[1px] bg-[#C5A059]/40 mx-auto mb-6" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl border-2 border-white group"
        >
          <ImageWithFallback
            src={image.src}
            fallbackSrc={image.fallbackSrc}
            alt={image.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Gentle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Inner gold frame */}
          <div className="absolute inset-4 border border-white/30 rounded-2xl pointer-events-none" />

          {/* Optional quote overlay */}
          <div className="absolute inset-x-6 bottom-6 text-center text-white z-10">
            {quote ? (
              <p className="font-serif-elegant italic text-lg sm:text-2xl text-white/95 drop-shadow-md max-w-xl mx-auto leading-snug">
                "{quote}"
              </p>
            ) : (
              <p className="font-serif-elegant italic text-base sm:text-xl text-white/90 drop-shadow-md">
                {image.caption}
              </p>
            )}
            <span className="inline-block mt-2 font-cinzel text-[11px] uppercase tracking-[0.3em] text-[#EFE8DE] opacity-80">
              {author}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gold line */}
      <div className="w-24 h-[1px] bg-[#C5A059]/40 mx-auto mt-6" />
    </div>
  );
};
