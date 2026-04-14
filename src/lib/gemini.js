import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Menganalisis data peserta dengan optimasi penggunaan token menggunakan SDK Resmi
 * @param {string} apiKey - Google AI Studio API Key
 * @param {Array} data - List data peserta dari Excel
 */
export async function analyzePesertaData(apiKey, data) {
  if (!apiKey) {
    throw new Error("API Key Gemini belum diatur di menu Settings.");
  }

  try {
    // Inisialisasi dengan SDK Resmi
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Menggunakan model Flash 1.5 yang paling stabil dan hemat
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // OPTIMASI: Hanya ambil 15-20 data pertama untuk menghemat token
    const sampleSize = 20;
    const sampleData = data.slice(0, sampleSize).map(p => ({
      n: p.nama,
      p: p.noPeserta,
      ns: p.nisn,
      tl: p.tempatLahir,
      tgl: p.tanggalLahir
    }));

    const promptText = `
      Analisis sampel data peserta ujian berikut (${sampleData.length} data):
      ${JSON.stringify(sampleData)} 
      
      Tugas:
      1. Berikan ringkasan singkat komposisi data (total peserta dalam sampel ini).
      2. Validasi apakah ada format NISN yang terlihat tidak standar atau kosong.
      3. Berikan saran singkat jika ada data yang kurang lengkap.
      
      Gunakan Bahasa Indonesia yang ramah, singkat, dan Markdown yang rapi.
      Jika kuota gratis penuh, infokan user untuk menunggu sesaat.
    `;

    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    
    // Error handling yang lebih informatif
    const errorMessage = error.message || "";
    
    if (errorMessage.includes("429") || errorMessage.includes("exhausted")) {
      throw new Error("Gagal: Kuota gratis AI Anda sedang mencapai batas limit. Mohon tunggu 1 menit lalu coba lagi.");
    }

    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("invalid api key")) {
      throw new Error("Gagal: API Key tidak valid. Periksa kembali di menu Pengaturan.");
    }

    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
      throw new Error("Gagal: Model AI tidak ditemukan. Sistem akan otomatis mencoba model cadangan di versi berikutnya.");
    }

    throw new Error("Gagal melakukan analisis AI: " + errorMessage);
  }
}
