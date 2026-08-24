import React from 'react';
import { motion } from 'motion/react';
import {
  CalendarClock,
  Sparkles,
  Heart,
  Utensils,
  Music,
  PartyPopper,
  Wine,
  Flower2,
  Moon,
  Clock,
} from 'lucide-react';
import { ITINERARY } from '../data/weddingData';

// Custom minimalist line icon for church
const ChurchLineIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Church Roof and Cross */}
    <path d="M12 2v4M10 4h4" />
    <path d="M12 6L4 12v9h16v-9L12 6z" />
    {/* Belfry Tower */}
    <path d="M9 12v9M15 12v9" />
    {/* Church Arch Door */}
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    {/* Window */}
    <circle cx="12" cy="11" r="1.5" />
  </svg>
);

// Custom minimalist line icon for toasting glasses
const ToastingGlassesLineIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Left Glass */}
    <path d="M5 4l3 7c.5 1.2 1.8 2 3.1 2h.4" />
    <path d="M10 4L7 11" />
    <path d="M5 4h5" />
    <path d="M8.5 13v6M6 19h5" />
    {/* Right Glass */}
    <path d="M19 4l-3 7c-.5 1.2-1.8 2-3.1 2h-.4" />
    <path d="M14 4l3 7" />
    <path d="M14 4h5" />
    <path d="M15.5 13v6M13 19h5" />
    {/* Sparkle */}
    <path d="M12 2v2M12 7v1" />
  </svg>
);

export const ItineraryBlock: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'church':
        return <ChurchLineIcon className="w-5 h-5" />;
      case 'party':
        return <PartyPopper className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'glasses':
        return <ToastingGlassesLineIcon className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'utensils':
        return <Utensils className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'flower':
        return <Flower2 className="w-5 h-5" />;
      case 'moon':
        return <Moon className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <section id="itinerary-section" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-6 sm:p-12 shadow-lg border border-[#E5DCce]/80 bg-white/70 text-center"
      >
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B]">
          <CalendarClock className="w-5 h-5" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Cronograma del Día
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          Itinerario del Evento
        </h2>

        <p className="text-sm font-sans-clean text-[#6B645D] max-w-md mx-auto mb-10">
          Acompáñanos a vivir cada uno de estos instantes inolvidables.
        </p>

        {/* Timeline Items */}
        <div className="relative max-w-2xl mx-auto text-left">
          {/* Vertical gold center line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10 transform sm:-translate-x-1/2" />

          <div className="space-y-6 sm:space-y-8">
            {ITINERARY.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex items-center gap-4 sm:gap-8 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Left or Right Content Card */}
                  <div
                    className={`pl-14 sm:pl-0 sm:w-1/2 ${
                      isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'
                    }`}
                  >
                    <div className="inline-block p-4 rounded-2xl bg-[#FAF8F5]/90 border border-[#C5A059]/25 shadow-sm hover:shadow-md transition-shadow">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#8B6E33] font-cinzel text-xs font-semibold tracking-wider mb-1">
                        {item.time}
                      </span>
                      <h3 className="font-serif-elegant text-lg sm:text-xl text-[#2C2825] font-semibold">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs font-sans-clean text-[#6B645D] mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#C5A059] shadow-md flex items-center justify-center text-[#A8813B] z-10">
                    {getIcon(item.iconName)}
                  </div>

                  {/* Empty Spacer on opposite side for desktop layout */}
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
