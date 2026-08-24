import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Images, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/weddingData';
import { ImageWithFallback } from './ImageWithFallback';

export const PhotoGalleryBlock: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section id="gallery-section" className="py-12 sm:py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B]">
          <Images className="w-5 h-5" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Nuestra Historia
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          Galería de Recuerdos
        </h2>

        <p className="text-sm font-sans-clean text-[#6B645D] max-w-md mx-auto">
          Algunos momentos inolvidables de nuestro camino juntos.
        </p>
      </motion.div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-white/60 hover:shadow-xl transition-all"
          >
            <ImageWithFallback
              src={image.src}
              fallbackSrc={image.fallbackSrc}
              alt={image.title}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Hover overlay with heart */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
              <Heart className="w-6 h-6 text-[#D4AF37] mb-1 fill-[#D4AF37]/40" />
              <span className="font-serif-elegant text-sm font-light leading-tight">{image.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur-sm z-50 cursor-pointer"
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm z-50 cursor-pointer transition-all"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm z-50 cursor-pointer transition-all"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
            >
              <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl max-h-[70vh]">
                <ImageWithFallback
                  src={GALLERY_IMAGES[selectedImageIndex].src}
                  fallbackSrc={GALLERY_IMAGES[selectedImageIndex].fallbackSrc}
                  alt={GALLERY_IMAGES[selectedImageIndex].title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center text-white max-w-md">
                <h3 className="font-serif-elegant text-xl sm:text-2xl text-[#EFE8DE]">
                  {GALLERY_IMAGES[selectedImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm font-sans-clean text-white/80 mt-1">
                  {GALLERY_IMAGES[selectedImageIndex].caption}
                </p>
                <span className="text-[11px] font-cinzel text-[#C5A059] mt-1 inline-block">
                  {selectedImageIndex + 1} / {GALLERY_IMAGES.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
