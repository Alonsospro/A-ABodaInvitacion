import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileSpreadsheet, Copy, Check, ExternalLink, Save, RefreshCw } from 'lucide-react';
import {
  getStoredAppsScriptUrl,
  setStoredAppsScriptUrl,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
} from '../services/googleSheetsService';

interface AppsScriptSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppsScriptSetupModal: React.FC<AppsScriptSetupModalProps> = ({ isOpen, onClose }) => {
  const [scriptUrl, setScriptUrl] = useState<string>(getStoredAppsScriptUrl());
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setStoredAppsScriptUrl(scriptUrl);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C5A059]/40 overflow-hidden text-left max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8C847B] hover:text-[#2C2825] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-elegant text-2xl text-[#2C2825] font-semibold">
                  Conexión con Google Sheets
                </h3>
                <p className="text-xs font-sans-clean text-[#6B645D]">
                  Sincronización en tiempo real para validación de códigos y confirmación de pases (Columna C).
                </p>
              </div>
            </div>

            {/* Step by Step Guide */}
            <div className="space-y-4 my-6 text-xs font-sans-clean text-[#5A524A]">
              {/* Columns visual structure */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-[#C5A059]/40 space-y-2">
                <p className="font-semibold text-[#8B6E33] flex items-center gap-1.5">
                  <span>📊 Estructura requerida en Google Sheets:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div className="bg-white p-2.5 rounded-xl border border-[#C5A059]/30 shadow-xs">
                    <span className="font-bold text-[#A8813B] block">Columna A (Principal)</span>
                    <span className="text-[#2C2825] font-semibold">Código de Acceso</span>
                    <span className="text-[10px] text-[#8C847B] block mt-0.5">ej: BODA2026, INVITADO1</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#C5A059]/30 shadow-xs">
                    <span className="font-bold text-[#A8813B] block">Columna B</span>
                    <span className="text-[#2C2825] font-semibold">Nombre / Familia</span>
                    <span className="text-[10px] text-[#8C847B] block mt-0.5">ej: Familia Morales Méndez</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#C5A059]/30 shadow-xs">
                    <span className="font-bold text-[#A8813B] block">Columna C</span>
                    <span className="text-[#2C2825] font-semibold">Pases Habilitados</span>
                    <span className="text-[10px] text-[#8C847B] block mt-0.5">ej: 4 (número de pases)</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6B645D] pt-1">
                  * Las columnas D a G se llenan automáticamente al momento en que el invitado confirma su asistencia (Estado de Asistencia, Pases confirmados, Mensaje para los novios y Fecha).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DCce] space-y-2">
                <p className="font-semibold text-[#2C2825]">
                  Paso 1: Copiar el código para Google Apps Script
                </p>
                <p className="text-[#6B645D]">
                  En tu hoja de Google Sheets ve a <strong>Extensiones &gt; Apps Script</strong>, pega el código a continuación y haz clic en <strong>Implementar &gt; Nueva implementación &gt; Aplicación Web</strong> (Acceso: <em>Cualquier usuario / Anyone</em>).
                </p>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFE8DE] text-[#2C2825] border border-[#C5A059]/30 text-xs font-medium cursor-pointer transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '¡Código Copiado!' : 'Copiar Código de Apps Script (Code.gs)'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DCce] space-y-3">
                <p className="font-semibold text-[#2C2825]">
                  Paso 2: Pegar la URL de la Aplicación Web
                </p>
                <div>
                  <input
                    type="url"
                    value={scriptUrl}
                    onChange={(e) => setScriptUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#C5A059]/30 text-xs font-mono text-[#2C2825] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                  />
                  <span className="text-[11px] text-[#8C847B] mt-1 block">
                    * Al guardar la URL, la consulta del código se realizará directamente en la <strong>Columna A</strong> de tu hoja de Google Sheets en tiempo real.
                  </span>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn-shimmer px-5 py-2.5 rounded-xl text-white font-sans-clean font-medium text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{savedSuccess ? '¡Guardado!' : 'Guardar Configuración'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
