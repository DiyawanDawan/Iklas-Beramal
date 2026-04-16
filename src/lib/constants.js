export const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export function formatTanggalIndonesia(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  
  // Jika tanggal tidak valid, kembalikan string aslinya (mencegah NaN Undefined NaN)
  if (isNaN(date.getTime())) return dateStr;
  
  const day = date.getDate();
  const month = MONTHS_ID[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatTTL(tempat, tanggalLahir) {
  if (!tempat && !tanggalLahir) return "-";
  const tgl = tanggalLahir ? formatTanggalIndonesia(tanggalLahir) : "";
  return `${tempat || ""}${tempat && tgl ? ", " : ""}${tgl}`;
}

export function formatTanggalPendek(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
