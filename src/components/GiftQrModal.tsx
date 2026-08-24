import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Copy, Check, QrCode, Building, User } from 'lucide-react';
import { WEDDING_CONFIG, FALLBACK_QR } from '../data/weddingData';
import { ImageWithFallback } from './ImageWithFallback';

interface GiftQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftQrModal: React.FC<GiftQrModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { gift } = WEDDING_CONFIG;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = gift.qrImagePath;
    link.download = 'QR_Boda_Andrea_y_Alonso.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C5A059]/40 overflow-hidden text-center max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8C847B] hover:text-[#2C2825] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-3 text-[#A8813B] shadow-sm">
              <QrCode className="w-6 h-6" />
            </div>

            <span className="text-xs font-cinzel tracking-[0.25em] text-[#8B6E33] uppercase font-semibold">
              Detalle para los Novios
            </span>
            <h3 className="font-serif-elegant text-2xl sm:text-3xl text-[#2C2825] mt-1 mb-2">
              Código QR y Datos Bancarios
            </h3>
            <p className="text-xs font-sans-clean text-[#6B645D] mb-6 leading-relaxed">
              Puedes escanear directamente el código QR desde tu aplicación bancaria o descargar la imagen.
            </p>

            {/* QR Image Box */}
            <div className="relative p-4 rounded-2xl bg-white border-2 border-[#C5A059]/30 shadow-md inline-block mb-6">
              <ImageWithFallback
                src={gift.qrImagePath}
                fallbackSrc={FALLBACK_QR}
                alt="QR Pago Boda Andrea & Alonso"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto rounded-lg"
              />
              <div className="mt-2 text-[11px] font-cinzel text-[#8B6E33] tracking-wider uppercase font-semibold">
                Andrea &amp; Alonso • 2026
              </div>
            </div>

            {/* Download QR Button */}
            <div className="mb-6">
              <button
                onClick={handleDownloadQr}
                className="btn-shimmer w-full py-3 px-5 rounded-2xl text-white font-sans-clean font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Código QR (qr.jpg)</span>
              </button>
            </div>

            {/* Bank Transfer Details Box */}
            <div className="text-left bg-white/80 rounded-2xl p-4 border border-[#E5DCce] space-y-3 text-xs font-sans-clean">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#6B645D]">
                  <User className="w-4 h-4 text-[#A8813B]" />
                  <span>Titular:</span>
                </div>
                <strong className="text-[#2C2825] font-semibold">{gift.bankDetails.accountHolder}</strong>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#6B645D]">
                  <Building className="w-4 h-4 text-[#A8813B]" />
                  <span>Banco:</span>
                </div>
                <strong className="text-[#2C2825]">{gift.bankDetails.bankName}</strong>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-black/5">
                <span className="text-[#6B645D]">Alias / Referencia:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-[#2C2825] font-semibold">{gift.bankDetails.cbuAlias}</span>
                  <button
                    onClick={() => handleCopy(gift.bankDetails.cbuAlias, 'alias')}
                    className="p-1 text-[#8B6E33] hover:text-[#2C2825] cursor-pointer"
                    title="Copiar alias"
                  >
                    {copiedField === 'alias' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Gratitude text */}
            <p className="font-serif-elegant italic text-sm text-[#8B6E33] mt-4">
              ¡Muchas gracias por su cariño y generosidad!
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
