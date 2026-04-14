"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { HiOutlineUpload, HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineCog } from "react-icons/hi";
import { FiX, FiPlus, FiLoader, FiDownload, FiAlertCircle } from "react-icons/fi";
import { analyzePesertaData } from "@/lib/gemini";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const THINKING_MESSAGES = [
  "Sedang membedah data Excel...",
  "Mendeteksi pola dan anomali...",
  "Menganalisis statistik madrasah...",
  "Merangkum informasi penting...",
  "Menyusun saran cerdas untuk Anda...",
  "Memastikan validitas data...",
];

export default function ImportExcel({ onImport, settings, isOpen, onClose }) {
  const [data, setData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [thinkingIndex, setThinkingIndex] = useState(0);

  // DEBUG: Pantau status pengaturan
  useEffect(() => {
    if (isOpen) {
      console.log("--- DEBUG IMPORT EXCEL ---");
      console.log("Settings Object:", settings);
      console.log("Gemini API Key:", settings?.geminiApiKey ? "TERPASANG (OK)" : "KOSONG (WARNING)");
      console.log("---------------------------");
    }
  }, [isOpen, settings]);

  // Efek teks "berpikir" AI
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
      }, 2500);
    } else {
      setThinkingIndex(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const rawData = XLSX.utils.sheet_to_json(ws);

      // Map Excel columns to our fields
      const mappedData = rawData.map((row) => ({
        nama: row["Nama"] || row["NAMA"] || "",
        noPeserta: row["No Peserta"] || row["NO PESERTA"] || "",
        nisn: row["NISN"] || row["nisn"] || row["Nisn"] || "",
        tempatLahir: row["Tempat Lahir"] || row["TEMPAT LAHIR"] || "",
        tanggalLahir: row["Tanggal Lahir"] || row["TANGGAL LAHIR"] || "",
      })).filter(p => p.nama);

      setData(mappedData);
      setAiError(null);
      setAiResult("");
      toast.success(`${mappedData.length} data terbaca dari Excel!`);
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      ["No", "Nama", "No Peserta", "NISN", "Tempat Lahir", "Tanggal Lahir"],
      [1, "AHMAD FAUZI", "26-19-02-2-0002-0001", "1234567890", "MATARAM", "2010-05-20"],
      [2, "SITI AMINAH", "26-19-02-2-0002-0002", "0987654321", "PRAYA", "2011-03-15"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    
    // Memberi lebar kolom otomatis agar rapi
    ws["!cols"] = [
      { wch: 5 },  // No
      { wch: 25 }, // Nama
      { wch: 25 }, // No Peserta
      { wch: 15 }, // NISN
      { wch: 20 }, // Tempat Lahir
      { wch: 15 }, // Tanggal Lahir
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template Peserta");
    XLSX.writeFile(wb, "Template_Data_Peserta_Madrasah.xlsx");
    toast.success("Template Excel berhasil diunduh!");
  };

  const handleAnalyzeAI = async () => {
    if (!settings.geminiApiKey) {
      toast.error("Gemini API Key belum terpasang!");
      return;
    }
    if (data.length === 0) return;

    setIsAnalyzing(true);
    setAiError(null);
    try {
      const result = await analyzePesertaData(settings.geminiApiKey, data);
      setAiResult(result);
      toast.success("Analisis AI Selesai!");
    } catch (err) {
      // Tangani error secara elegan sesuai permintaan user
      let userFriendlyError = "Gagal melakukan analisis. Silakan coba beberapa saat lagi.";
      
      if (err.message.includes("429")) {
        userFriendlyError = "Kuota harian AI Anda sedang penuh. Mohon tunggu 1 menit lalu klik 'Analisis Sekarang' lagi.";
      } else if (err.message.includes("404")) {
        userFriendlyError = "Model AI versi 2.0 sedang tidak terbaca di wilayah Anda. Sedang mencoba menggunakan model cadangan.";
      }

      setAiError(userFriendlyError);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    onImport(data);
    onClose();
    reset();
  };

  const reset = () => {
    setData([]);
    setAiResult("");
    setAiError(null);
    setFileName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-white/10 slide-up">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <HiOutlineUpload className="text-primary-500 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-dark-50 m-0">Import Data & AI Analyst</h3>
              <p className="text-[11px] text-dark-400 m-0">Unggah Excel untuk memproses data massal dengan bantuan AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {data.length === 0 ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-dark-700 rounded-2xl p-12 text-center transition-all hover:border-primary-500/50 hover:bg-primary-500/5 group relative">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept=".xlsx, .xls, .csv" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <HiOutlineUpload className="text-3xl text-dark-400 group-hover:text-primary-400" />
                  </div>
                  <h4 className="text-lg font-bold text-dark-200">Pilih File Excel Anda</h4>
                  <p className="text-sm text-dark-500 mt-2">Dukung format .xlsx, .xls, .csv</p>
                </div>
              </div>

              <div className="glass-card-light p-5 flex items-center justify-between border-primary-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <FiDownload className="text-primary-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark-100">Belum punya format?</div>
                    <div className="text-[11px] text-dark-500">Unduh template Excel yang sudah siap pakai</div>
                  </div>
                </div>
                <button onClick={downloadTemplate} className="btn-primary btn-sm flex items-center gap-2">
                  <FiDownload /> Download Template
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="flex items-center justify-between bg-primary-500/5 p-4 rounded-xl border border-primary-500/10">
                  <div className="flex items-center gap-3">
                    <HiOutlineCheckCircle className="text-primary-500 text-2xl" />
                    <div>
                      <div className="text-sm font-bold text-dark-100">{fileName}</div>
                      <div className="text-[11px] text-dark-400">{data.length} data peserta terdeteksi</div>
                    </div>
                  </div>
                  <button onClick={reset} className="btn-secondary btn-sm text-red-400">Ganti File</button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Table Preview */}
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-dark-500 tracking-widest">Preview Data</h4>
                    </div>
                    <div className="table-container max-h-[300px] border border-white/5 rounded-xl bg-dark-900/30">
                      <table className="text-[12px]">
                        <thead className="sticky top-0 bg-dark-800 z-10">
                          <tr>
                            <th>NAMA</th>
                            <th>NO PESERTA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((p, i) => (
                            <tr key={i}>
                              <td className="font-bold">{p.nama}</td>
                              <td className="font-mono text-dark-400">{p.noPeserta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                 </div>

                 {/* AI Analyst Section */}
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-dark-500 tracking-widest flex items-center gap-2">
                        <HiOutlineSparkles className="text-amber-500" /> AI Insights
                        <span className="text-[9px] font-normal lowercase bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">(20 Sample)</span>
                      </h4>
                      {(!aiResult && !aiError) && (
                        <button 
                          onClick={handleAnalyzeAI} 
                          disabled={isAnalyzing}
                          className="btn-primary btn-sm bg-linear-to-r from-amber-600 to-amber-400"
                        >
                          {isAnalyzing ? <FiLoader className="animate-spin" /> : <HiOutlineSparkles />} Analisis Sekarang
                        </button>
                      )}
                    </div>

                    <div className={`glass-card-light h-[300px] overflow-y-auto p-5 text-[13px] text-dark-400 leading-relaxed custom-scrollbar border-amber-500/10 transition-all ${isAnalyzing ? 'animate-pulse' : ''}`}>
                      {isAnalyzing ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4">
                           <div className="relative">
                              <HiOutlineSparkles className="text-4xl text-amber-500 animate-bounce" />
                              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-ping" />
                           </div>
                           <div className="text-center">
                              <p className="font-black text-amber-500 text-[11px] uppercase tracking-[0.2em] mb-2">Thinking Process</p>
                              <p className="text-sm text-dark-100 font-bold transition-all duration-500 h-5">
                                 {THINKING_MESSAGES[thinkingIndex]}
                              </p>
                           </div>
                           <div className="w-48 h-1 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
                           </div>
                        </div>
                      ) : aiError ? (
                        // TAMPILAN ERROR YANG BAGUS DAN INFORMATIF
                        <div className="h-full flex flex-col items-center justify-center text-center p-4 slide-up">
                           <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                              <FiAlertCircle size={30} className="text-red-500" />
                           </div>
                           <h5 className="text-dark-50 font-black text-sm mb-2">Waduh! Ada Kendala Kecil</h5>
                           <p className="text-dark-400 text-[12px] mb-6 max-w-[250px] mx-auto italic">
                             "{aiError}"
                           </p>
                           <button 
                             onClick={handleAnalyzeAI}
                             className="btn-secondary btn-sm flex items-center gap-2 border-primary-500/20 text-primary-400 hover:bg-primary-500/10"
                           >
                             Coba Lagi
                           </button>
                        </div>
                      ) : aiResult ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-h3:text-primary-400 fade-in">
                          <ReactMarkdown>{aiResult}</ReactMarkdown>
                        </div>
                      ) : !settings.geminiApiKey ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                           <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                              <HiOutlineExclamation size={24} className="text-red-500" />
                           </div>
                           <p className="text-sm font-bold text-dark-100 mb-2">API Key Belum Terpasang</p>
                           <p className="text-[11px] text-dark-500 mb-6">Analisis AI dinonaktifkan karena kunci API tidak ditemukan.</p>
                           <Link 
                             href="/settings" 
                             className="btn-secondary btn-sm flex items-center gap-2 hover:bg-primary-500/10 hover:text-primary-500 no-underline"
                             onClick={onClose}
                           >
                              <HiOutlineCog /> Pergi ke Pengaturan
                           </Link>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                           <HiOutlineSparkles size={48} className="mb-4" />
                           <p>Gunakan AI untuk memeriksa kualitas data dan mendapatkan statistik madrasah Anda.</p>
                        </div>
                      )}
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/3">
           <button onClick={onClose} className="btn-secondary">Batal</button>
           <div className="flex gap-3">
              <button 
                onClick={handleSave} 
                disabled={data.length === 0} 
                className="btn-primary"
              >
                <FiPlus /> Impor {data.length} Peserta
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
