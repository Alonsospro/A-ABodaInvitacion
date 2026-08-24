import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownBlock: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState<boolean>(false);

  useEffect(() => {
    const targetDate = new Date(WEDDING_CONFIG.date.weddingDateISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Boda de Andrea & Alonso');
    const details = encodeURIComponent(
      'Celebración de la boda de Andrea & Alonso.\n' +
      'Fecha: Sábado, 3 de Octubre de 2026\n' +
      'Ceremonia: 17:15 hrs - Parroquia María Auxiliadora\n' +
      'Recepción: 19:30 hrs - Salón Superfiesta, Villafraterna'
    );
    const location = encodeURIComponent('Parroquia María Auxiliadora, Av. Argentina esq. Av. Don Bosco, Santa Cruz de la Sierra, Bolivia');
    // Formato UTC (Bolivia UTC-4: 17:15 hora local = 21:15 UTC del 3 de Octubre de 2026)
    const startDate = '20261003T211500Z';
    const endDate = '20261004T073000Z';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const timerUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E5DCce]/80 bg-white/70"
      >
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 text-[#A8813B]">
          <Clock className="w-5 h-5" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Cuenta Regresiva
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          {isPast ? '¡Hoy es el gran día!' : 'Esperando el gran momento'}
        </h2>

        <p className="text-sm font-sans-clean text-[#6B645D] max-w-md mx-auto mb-8">
          Cada segundo nos acerca más al día en que uniremos nuestras vidas para siempre.
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto mb-8">
          {timerUnits.map((unit) => (
            <div
              key={unit.label}
              className="bg-[#FAF8F5]/90 border border-[#C5A059]/25 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-[1.02]"
            >
              <span className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2825] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-sans-clean uppercase tracking-widest text-[#8B6E33] mt-1 font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCalendar}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2825] hover:bg-[#4A443F] text-white text-xs font-sans-clean font-medium tracking-wider uppercase shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-95"
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Agendar en Google Calendar</span>
        </button>
      </motion.div>
    </section>
  );
};
