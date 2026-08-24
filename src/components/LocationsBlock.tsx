import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import { LOCATIONS } from '../data/weddingData';

// Minimalist Church Line Icon in matte gold
const ChurchMinimalistIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Cross */}
    <line x1="24" y1="4" x2="24" y2="12" />
    <line x1="20" y1="7" x2="28" y2="7" />
    {/* Steeple / Belfry */}
    <path d="M24 12L16 20h16L24 12z" />
    {/* Main Tower / Facade */}
    <rect x="16" y="20" width="16" height="22" rx="1" />
    {/* Arch Door */}
    <path d="M21 42V32a3 3 0 0 1 6 0v10" />
    {/* Rose window circle */}
    <circle cx="24" cy="26" r="2.5" />
    {/* Left & Right Wings */}
    <path d="M16 26H8v16h8" />
    <path d="M32 26h8v16h-8" />
    <path d="M8 26l8-4" />
    <path d="M40 26l-8-4" />
  </svg>
);

// Minimalist Toasting Glasses Line Icon in matte gold
const ToastingGlassesMinimalistIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Left Champagne Flute */}
    <path d="M12 8l5 14c.8 2 2.7 3.5 4.8 3.5h.7" />
    <path d="M20 8L16 22" />
    <path d="M12 8h8" />
    <path d="M17.5 25.5V38" />
    <path d="M12 38h11" />
    {/* Right Champagne Flute */}
    <path d="M36 8l-5 14c-.8 2-2.7 3.5-4.8 3.5h-.7" />
    <path d="M28 8l4 14" />
    <path d="M28 8h8" />
    <path d="M30.5 25.5V38" />
    <path d="M25 38h11" />
    {/* Minimalist sparkle clink */}
    <line x1="24" y1="12" x2="24" y2="16" />
    <line x1="22" y1="14" x2="26" y2="14" />
  </svg>
);

export const LocationsBlock: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<'ceremonia' | 'recepcion'>('ceremonia');
  const churchLoc = LOCATIONS[0];
  const receptionLoc = LOCATIONS[1];

  return (
    <section id="locations-section" className="py-12 sm:py-16 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B]">
          <MapPin className="w-5 h-5" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          ¿Cómo Llegar?
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          Ubicaciones del Evento
        </h2>

        <p className="text-sm font-sans-clean text-[#6B645D] max-w-md mx-auto">
          Te compartimos los puntos de encuentro para la ceremonia religiosa y la fiesta.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Church Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 shadow-lg border border-[#E5DCce]/80 bg-white/75 flex flex-col justify-between hover:shadow-xl transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8B6E33] font-cinzel text-xs font-semibold tracking-wider">
                Ceremonia Religiosa
              </span>
              <div className="text-[#A8813B] p-2 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 shadow-sm">
                <ChurchMinimalistIcon className="w-7 h-7" />
              </div>
            </div>

            <h3 className="font-serif-elegant text-2xl text-[#2C2825] font-semibold mb-1">
              {churchLoc.name}
            </h3>

            <div className="flex items-center gap-2 text-xs font-cinzel font-medium text-[#8B6E33] mb-4">
              <Clock className="w-4 h-4" />
              <span>Hora: {churchLoc.time}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5]/90 border border-[#C5A059]/20 text-xs font-sans-clean text-[#5A524A] mb-4">
              <p className="font-medium text-[#2C2825] mb-1">Dirección:</p>
              <p className="leading-relaxed">{churchLoc.address}</p>
            </div>

            {churchLoc.note && (
              <p className="text-[11px] font-sans-clean text-[#8C847B] italic mb-6">
                * {churchLoc.note}
              </p>
            )}
          </div>

          <a
            href={churchLoc.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer w-full py-3.5 px-5 rounded-2xl text-white font-sans-clean font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Ver ubicación en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>

        {/* Reception Hall Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 shadow-lg border border-[#E5DCce]/80 bg-white/75 flex flex-col justify-between hover:shadow-xl transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8B6E33] font-cinzel text-xs font-semibold tracking-wider">
                Recepción y Fiesta
              </span>
              <div className="text-[#A8813B] p-2 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 shadow-sm">
                <ToastingGlassesMinimalistIcon className="w-7 h-7" />
              </div>
            </div>

            <h3 className="font-serif-elegant text-2xl text-[#2C2825] font-semibold mb-1">
              {receptionLoc.name}
            </h3>

            <div className="flex items-center gap-2 text-xs font-cinzel font-medium text-[#8B6E33] mb-4">
              <Clock className="w-4 h-4" />
              <span>Hora: {receptionLoc.time}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5]/90 border border-[#C5A059]/20 text-xs font-sans-clean text-[#5A524A] mb-4">
              <p className="font-medium text-[#2C2825] mb-1">Dirección:</p>
              <p className="leading-relaxed">{receptionLoc.address}</p>
            </div>

            {receptionLoc.note && (
              <p className="text-[11px] font-sans-clean text-[#8C847B] italic mb-6">
                * {receptionLoc.note}
              </p>
            )}
          </div>

          <a
            href={receptionLoc.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer w-full py-3.5 px-5 rounded-2xl text-white font-sans-clean font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Ver ubicación en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-md border border-[#E5DCce]/80 bg-white/60">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveLocationId('ceremonia')}
            className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
              activeLocationId === 'ceremonia'
                ? 'bg-[#A8813B] text-white shadow-sm font-semibold'
                : 'bg-white/80 text-[#6B645D] hover:text-[#2C2825] border border-[#C5A059]/20'
            }`}
          >
            Mapa: Iglesia María Auxiliadora
          </button>
          <button
            onClick={() => setActiveLocationId('recepcion')}
            className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
              activeLocationId === 'recepcion'
                ? 'bg-[#A8813B] text-white shadow-sm font-semibold'
                : 'bg-white/80 text-[#6B645D] hover:text-[#2C2825] border border-[#C5A059]/20'
            }`}
          >
            Mapa: Salón Superfiesta
          </button>
        </div>

        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner border border-[#E5DCce] relative bg-[#EFE8DE]">
          <iframe
            title={activeLocationId === 'ceremonia' ? churchLoc.name : receptionLoc.name}
            src={
              activeLocationId === 'ceremonia'
                ? 'https://maps.google.com/maps?q=Parroquia+Maria+Auxiliadora+Av+Argentina+Santa+Cruz+Bolivia&t=&z=16&ie=UTF8&iwloc=&output=embed'
                : 'https://maps.google.com/maps?q=Salon+Superfiesta+Villafraterna+Av+Roca+y+Coronado+Santa+Cruz+Bolivia&t=&z=16&ie=UTF8&iwloc=&output=embed'
            }
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
