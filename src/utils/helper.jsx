/**
 * Membuat ID unik dengan prefix kustom
 * @param {string} prefix - 3 huruf awalan (misal: 'COL', 'ROW', 'CEL')
 * @param {number} length - Panjang karakter acak setelah prefix (default: 5)
 * @returns {string} - ID yang dihasilkan (contoh: 'COL-A1B2C')
 */
export const generateId = (prefix = 'UID', length = 5) => {
    // Memastikan prefix selalu 3 huruf dan huruf besar
    const cleanPrefix = prefix.substring(0, 3).toUpperCase();
    
    // Membuat string acak alfanumerik
    const randomStr = Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();
  
    return `${cleanPrefix}-${randomStr}`;
  };

 /**
 * @param {string} dateString - Tanggal dalam format ISO (contoh: '2026-12-11T17:00:00.000Z')
 * @param {Object} options - Opsi tambahan untuk mengatur format tanggal (opsional)
 * 
 * @property {string} options.day - Format hari ('2-digit' | 'numeric')
 * @property {string} options.month - Format bulan ('long' | 'short' | 'numeric' | '2-digit')
 * @property {string} options.year - Format tahun ('numeric' | '2-digit')
 * @property {string} options.hour - Format jam ('2-digit' | 'numeric')
 * @property {string} options.minute - Format menit ('2-digit' | 'numeric')
 * @property {string} options.second - Format detik ('2-digit' | 'numeric')
 * @property {string} options.timeZone - Zona waktu (default: 'Asia/Jakarta')
 * 
 * @returns {string} - Tanggal yang sudah diformat (contoh: '12 Desember 2026' atau '12 Des 2026, 00.00')
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const defaultOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  };

  return new Intl.DateTimeFormat("id-ID", {
    ...defaultOptions,
    ...options
  }).format(date);
}