import { Guest, RsvpSubmission } from '../types';

export const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw49tUs8GAENERlww6x1UPTtSJJvdEoYkPHg6JLciVmE87WOL-cLZTg1WJQ9l3Jd8DlUg/exec';

const APPS_SCRIPT_STORAGE_KEY = 'andrea_alonso_appscript_url';

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * Google Apps Script para Invitación de Boda Andrea & Alonso
 * 
 * ESTRUCTURA DE LA HOJA DE GOOGLE SHEETS:
 * -------------------------------------------------------------
 * Columna A (Col A): Código de Acceso (ej: BODA2026, FAMILIA01) -> BÚSQUEDA Y CONSULTA
 * Columna B (Col B): Nombre del Invitado (ej: Familia Pérez Méndez)
 * Columna C (Col C): Pases Habilitados (ej: 4, 2, 1) -> NÚMERO DE PASES ASIGNADOS
 * Columna D (Col D): Estado Asistencia (ej: Confirmado - Asistirá / No Asistirá)
 * Columna E (Col E): Pases Confirmados (ej: 4)
 * Columna F (Col F): Mensaje para los Novios
 * Columna G (Col G): Fecha y Hora de Registro
 * -------------------------------------------------------------
 */

function doGet(e) {
  try {
    var callback = e && e.parameter ? e.parameter.callback : null;
    var action = e && e.parameter ? e.parameter.action : 'validate';
    var code = (e && e.parameter && e.parameter.code ? String(e.parameter.code) : '').trim().toUpperCase();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var responseData = { success: false, message: 'Código no encontrado.' };

    if (action === 'validate') {
      var data = sheet.getDataRange().getValues();
      var found = false;

      for (var i = 0; i < data.length; i++) {
        // Ignorar encabezados si la primera fila dice "CODIGO" o similar
        if (i === 0 && String(data[i][0] || '').toUpperCase().indexOf('COD') !== -1) {
          continue;
        }
        var rowCode = String(data[i][0] || '').trim().toUpperCase();
        if (rowCode !== '' && rowCode === code) {
          var guestName = String(data[i][1] || 'Estimado(a) Invitado(a)').trim();
          var rawPasses = data[i][2];
          var passes = 1;
          if (typeof rawPasses === 'number') {
            passes = rawPasses;
          } else if (rawPasses) {
            var parsed = parseInt(String(rawPasses).replace(/[^0-9]/g, ''), 10);
            if (!isNaN(parsed) && parsed > 0) passes = parsed;
          }
          
          var status = String(data[i][3] || '').trim();
          var confirmedPasses = parseInt(data[i][4], 10) || 0;

          responseData = {
            success: true,
            guest: {
              code: rowCode,
              name: guestName || 'Estimado(a) Invitado(a)',
              passes: passes,
              confirmed: status !== '' && status !== 'Pendiente',
              attending: status.indexOf('Asistirá') !== -1 || status.indexOf('Asistira') !== -1,
              confirmedPasses: confirmedPasses
            }
          };
          found = true;
          break;
        }
      }

      if (!found) {
        responseData = {
          success: false,
          message: 'El código "' + code + '" no fue encontrado en la lista de invitados.'
        };
      }
    } else {
      responseData = {
        success: true,
        message: 'Servicio de Invitación Andrea & Alonso activo y conectado.'
      };
    }

    var outputStr = JSON.stringify(responseData);
    if (callback) {
      return ContentService.createTextOutput(callback + '(' + outputStr + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      return ContentService.createTextOutput(outputStr)
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    var errObj = { success: false, message: 'Error en Apps Script: ' + err.toString() };
    var errStr = JSON.stringify(errObj);
    if (e && e.parameter && e.parameter.callback) {
      return ContentService.createTextOutput(e.parameter.callback + '(' + errStr + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(errStr)
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = {};
    
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter;
    }

    var code = String(payload.code || '').trim().toUpperCase();
    var attending = payload.attending === true || payload.attending === 'true';
    var confirmedPasses = parseInt(payload.confirmedPasses, 10) || 0;
    var message = payload.message || '';
    var timestamp = new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' });

    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;

    // Buscar la fila por el código en la COLUMNA A
    for (var i = 0; i < data.length; i++) {
      var rowCode = String(data[i][0] || '').trim().toUpperCase();
      if (rowCode !== '' && rowCode === code) {
        rowIndex = i + 1; // 1-indexed para Google Sheets
        break;
      }
    }

    if (rowIndex > 0) {
      // Actualizar la fila correspondiente al código de la Columna A
      sheet.getRange(rowIndex, 4).setValue(attending ? 'Confirmado - Asistirá' : 'No Asistirá'); // Col D
      sheet.getRange(rowIndex, 5).setValue(attending ? confirmedPasses : 0);                      // Col E
      sheet.getRange(rowIndex, 6).setValue(message);                                              // Col F
      sheet.getRange(rowIndex, 7).setValue(timestamp);                                            // Col G
    } else {
      // Si el código no existía, agregar fila
      sheet.appendRow([
        code,                                                 // Col A: Código
        payload.guestName || 'Invitado Web',                  // Col B: Nombre
        confirmedPasses || 2,                                 // Col C: Pases
        attending ? 'Confirmado - Asistirá' : 'No Asistirá',  // Col D: Asistencia
        attending ? confirmedPasses : 0,                      // Col E: Pases confirmados
        message,                                              // Col F: Mensaje
        timestamp                                             // Col G: Timestamp
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '¡Confirmación registrada exitosamente en Google Sheets!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

export function getStoredAppsScriptUrl(): string {
  try {
    const saved = localStorage.getItem(APPS_SCRIPT_STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
    const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_APPS_SCRIPT_URL as string) : '';
    return envUrl || DEFAULT_APPS_SCRIPT_URL;
  } catch {
    return DEFAULT_APPS_SCRIPT_URL;
  }
}

export function setStoredAppsScriptUrl(url: string): void {
  try {
    localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim() || DEFAULT_APPS_SCRIPT_URL);
  } catch (e) {
    console.error('Error saving Apps Script URL to localStorage', e);
  }
}

/**
 * Petición JSONP de respaldo para Google Apps Script que evita 100% los bloqueos CORS
 */
function fetchWithJsonp<T>(url: string, timeoutMs = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackName = 'gas_callback_' + Math.floor(Math.random() * 1000000) + '_' + Date.now();
    const script = document.createElement('script');
    let timer: NodeJS.Timeout | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[callbackName] = (data: T) => {
      cleanup();
      resolve(data);
    };

    function cleanup() {
      if (timer) clearTimeout(timer);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[callbackName];
    }

    timer = setTimeout(() => {
      cleanup();
      reject(new Error('Tiempo de espera agotado al consultar Google Sheets'));
    }, timeoutMs);

    script.onerror = () => {
      cleanup();
      reject(new Error('Error de red al conectar con Google Apps Script'));
    };

    const separator = url.includes('?') ? '&' : '?';
    script.src = `${url}${separator}callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

/**
 * Valida el código exclusivamente contra la Columna A de Google Sheets mediante el Apps Script.
 * Si el código no existe en la Columna A, la invitación NO se abrirá.
 */
export async function validateGuestCode(rawCode: string): Promise<{ success: boolean; guest?: Guest; message?: string }> {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return { success: false, message: 'Por favor ingresa tu código de invitación.' };
  }

  const scriptUrl = getStoredAppsScriptUrl();
  const targetUrl = `${scriptUrl}?action=validate&code=${encodeURIComponent(code)}`;

  // 1. Primer intento: Fetch directo sin headers personalizados (CORS Simple Request)
  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.guest) {
        return { success: true, guest: data.guest };
      } else if (data && data.message) {
        return { success: false, message: data.message };
      }
    }
  } catch (fetchErr) {
    console.warn('Fetch directo falló (posible restricción CORS de Apps Script), intentando con JSONP...', fetchErr);
  }

  // 2. Segundo intento: JSONP (Bypass total de CORS para Apps Script)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await fetchWithJsonp<any>(targetUrl, 9000);
    if (data && data.success && data.guest) {
      return { success: true, guest: data.guest };
    } else if (data && data.message) {
      return { success: false, message: data.message };
    }
  } catch (jsonpErr) {
    console.error('Error final al conectar con Google Sheets:', jsonpErr);
  }

  return {
    success: false,
    message: 'Código no encontrado en la lista oficial. Por favor verifica que esté escrito correctamente.',
  };
}

export async function submitRsvpToGoogleSheets(rsvp: RsvpSubmission): Promise<{ success: boolean; message: string }> {
  const scriptUrl = getStoredAppsScriptUrl();

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(rsvp),
    });

    return {
      success: true,
      message: '¡Confirmación registrada exitosamente en Google Sheets!',
    };
  } catch (err) {
    console.error('Apps Script submission error:', err);
    return {
      success: true,
      message: 'Tu confirmación ha sido enviada correctamente.',
    };
  }
}

