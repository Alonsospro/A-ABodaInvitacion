import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Users,
  Send,
  Loader2,
  HeartHandshake,
  MessageSquareHeart,
  Edit3,
  CalendarCheck2,
} from 'lucide-react';
import { Guest, RsvpSubmission } from '../types';
import { submitRsvpToGoogleSheets } from '../services/googleSheetsService';

interface RsvpBlockProps {
  guest: Guest;
  onUpdateGuest: (updatedGuest: Guest) => void;
}

export const RsvpBlock: React.FC<RsvpBlockProps> = ({ guest, onUpdateGuest }) => {
  const [attending, setAttending] = useState<boolean>(guest.attending ?? true);
  const [confirmedPasses, setConfirmedPasses] = useState<number>(
    guest.confirmedPasses || guest.passes || 1
  );
  const [message, setMessage] = useState<string>(guest.message || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(!guest.confirmed);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#D4AF37', '#FAF8F5', '#8B6E33', '#EFE8DE'],
      });
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const submission: RsvpSubmission = {
      code: guest.code,
      guestName: guest.name,
      attending,
      confirmedPasses: attending ? confirmedPasses : 0,
      message,
    };

    try {
      const response = await submitRsvpToGoogleSheets(submission);
      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage(response.message || '¡Tu confirmación ha sido registrada exitosamente!');
        setIsEditing(false);
        onUpdateGuest({
          ...guest,
          confirmed: true,
          attending,
          confirmedPasses: attending ? confirmedPasses : 0,
          message,
        });

        if (attending) {
          triggerConfetti();
        }
      } else {
        setSubmitStatus('error');
        setStatusMessage('No se pudo enviar la confirmación. Por favor intenta de nuevo.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Ocurrió un error inesperado al conectar con Google Sheets.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="py-12 sm:py-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-6 sm:p-12 shadow-xl border border-[#C5A059]/35 bg-white/85 text-center relative overflow-hidden"
      >
        {/* Top Gold Accent */}
        <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-3 text-[#A8813B] shadow-sm">
          <CalendarCheck2 className="w-6 h-6" />
        </div>

        <span className="text-xs font-cinzel tracking-[0.3em] text-[#8B6E33] uppercase font-semibold">
          Confirmación de Asistencia
        </span>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2C2825] mt-1 mb-2">
          ¿Nos Acompañas?
        </h2>

        <p className="text-xs font-sans-clean text-[#6B645D] max-w-md mx-auto mb-6">
          Por favor ayúdanos confirmando tu asistencia para coordinar todos los preparativos.
        </p>

        {/* Guest and Passes summary banner */}
        <div className="max-w-lg mx-auto mb-8 p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <span className="text-[11px] font-sans-clean uppercase tracking-wider text-[#8B6E33] font-semibold block">
              Invitado(a)
            </span>
            <strong className="font-serif-elegant text-lg text-[#2C2825] block">
              {guest.name}
            </strong>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#C5A059]/40 shadow-sm shrink-0">
            <Users className="w-4 h-4 text-[#A8813B]" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-sans-clean text-[#8C847B] block font-medium">
                Pases Habilitados
              </span>
              <span className="font-cinzel text-sm font-bold text-[#2C2825]">
                {guest.passes} {guest.passes === 1 ? 'Pase' : 'Pases'}
              </span>
            </div>
          </div>
        </div>

        {/* Confirmed view state */}
        {!isEditing && guest.confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center max-w-md mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif-elegant text-2xl text-emerald-900 mb-1">
              {guest.attending ? '¡Asistencia Confirmada!' : 'Respuesta Registrada'}
            </h3>
            <p className="text-xs font-sans-clean text-emerald-800 mb-4">
              {guest.attending
                ? `Confirmaste tu asistencia para ${guest.confirmedPasses || guest.passes} persona(s). ¡Estamos muy felices de contar contigo!`
                : 'Registraste que no podrás asistir. Lamentamos que no puedas acompañarnos, ¡gracias por informarnos!'}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#6B645D] hover:text-[#2C2825] border border-black/10 text-xs font-sans-clean shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modificar mi respuesta</span>
            </button>
          </motion.div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto text-left">
            {/* Attendance Toggle Options */}
            <div>
              <label className="block text-xs font-cinzel text-[#8B6E33] uppercase font-semibold mb-2 text-center">
                ¿Asistirás al evento?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`p-3.5 rounded-2xl border text-xs font-sans-clean font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    attending
                      ? 'bg-[#2C2825] text-white border-[#2C2825] shadow-md'
                      : 'bg-white/80 text-[#6B645D] border-[#E5DCce] hover:bg-white'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>¡Sí, asistiré!</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`p-3.5 rounded-2xl border text-xs font-sans-clean font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !attending
                      ? 'bg-[#6B645D] text-white border-[#6B645D] shadow-md'
                      : 'bg-white/80 text-[#6B645D] border-[#E5DCce] hover:bg-white'
                  }`}
                >
                  <span>No podré asistir</span>
                </button>
              </div>
            </div>

            {/* If Attending: Pass Count Selector */}
            {attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-1"
              >
                <div>
                  <label className="block text-xs font-cinzel text-[#8B6E33] uppercase font-semibold mb-1.5">
                    Cantidad de personas que asistirán (Máx. {guest.passes})
                  </label>
                  <select
                    value={confirmedPasses}
                    onChange={(e) => setConfirmedPasses(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-[#C5A059]/30 text-sm font-sans-clean text-[#2C2825] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 shadow-sm cursor-pointer"
                  >
                    {Array.from({ length: guest.passes || 1 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Heartfelt Message */}
            <div>
              <label className="block text-xs font-cinzel text-[#8B6E33] uppercase font-semibold mb-1.5 flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Mensaje o felicitación para Andrea &amp; Alonso (Opcional)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí un mensaje especial para los novios..."
                className="w-full px-4 py-3 bg-white rounded-2xl border border-[#C5A059]/30 text-xs font-sans-clean text-[#2C2825] placeholder:text-[#AAA298] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 shadow-sm resize-none"
              />
            </div>

            {/* Status Message */}
            {submitStatus === 'error' && (
              <p className="text-xs font-sans-clean text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 text-center">
                {statusMessage}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full py-4 px-6 rounded-2xl text-white font-sans-clean font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registrando en Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirmar Mi Respuesta</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
};
