"use client";

import { useForm } from "react-hook-form";
import { useSettings } from "@/hooks/usePeserta";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { FiSave, FiRefreshCw, FiExternalLink } from "react-icons/fi";
import { HiOutlineClipboardList, HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineSparkles } from "react-icons/hi";

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings, isLoaded } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    values: settings,
  });

  const onSubmit = (data) => {
    updateSettings(data);
    toast.success("Pengaturan berhasil disimpan!");
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan pengaturan ke default?")) {
      resetSettings();
      reset();
      toast.success("Pengaturan dikembalikan ke default");
    }
  };

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            <span className="text-dark-500 text-sm">Memuat pengaturan...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-container max-w-3xl">
        <div className="fade-in">
          <h1 className="page-title flex items-center gap-3">
            <HiOutlineClipboardList size={28} /> Pengaturan Lembaga
          </h1>
          <p className="page-subtitle">
            Atur informasi lembaga, kepala sekolah, dan format kartu ujian
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* Informasi Ujian */}
          <div className="glass-card slide-up p-7 mb-5">
            <h2 className="text-base font-bold text-primary-500 mb-5 flex items-center gap-2">
              <HiOutlineClipboardList size={20} /> Informasi Ujian
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Nama Ujian</label>
                <input {...register("namaUjian")} className="input-field" placeholder="UJIAN MADRASAH" />
              </div>
              <div>
                <label className="input-label">Tahun Pelajaran</label>
                <input {...register("tahunPelajaran")} className="input-field" placeholder="2025/2026" />
              </div>
            </div>
          </div>

          {/* Informasi Lembaga */}
          <div className="glass-card slide-up p-7 mb-5 animation-delay-100">
            <h2 className="text-base font-bold text-primary-500 mb-5 flex items-center gap-2">
              <HiOutlineOfficeBuilding size={20} /> Informasi Lembaga
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="input-label">Nama Lembaga / Madrasah</label>
                <input {...register("namaLembaga")} className="input-field" placeholder="MTs. NEGERI 2 LOMBOK TENGAH" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Tempat Cetak</label>
                  <input {...register("tempatCetak")} className="input-field" placeholder="Jelantik" />
                </div>
                <div>
                  <label className="input-label">Tanggal Cetak</label>
                  <input type="date" {...register("tanggalCetak")} className="input-field" />
                </div>
              </div>
            </div>
          </div>

          {/* Kepala Madrasah */}
          <div className="glass-card slide-up p-7 mb-5 animation-delay-200">
            <h2 className="text-base font-bold text-primary-500 mb-5 flex items-center gap-2">
              <HiOutlineUser size={20} /> Kepala Madrasah
            </h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Jabatan</label>
                  <input {...register("jabatanKepala")} className="input-field" placeholder="Kepala Madrasah" />
                </div>
                <div>
                  <label className="input-label">Nama Kepala</label>
                  <input {...register("namaKepala")} className="input-field" placeholder="H. Diguna, S.Ag" />
                </div>
              </div>
              <div>
                <label className="input-label">NIP</label>
                <input {...register("nipKepala")} className="input-field" placeholder="197112311997031008" />
              </div>
            </div>
          </div>

          {/* Integrasi Gemini AI */}
          <div className="glass-card slide-up p-7 mb-5 border-l-4 border-l-primary-500 bg-linear-to-r from-primary-500/5 to-transparent animation-delay-300">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-primary-500 flex items-center gap-2">
                <HiOutlineSparkles size={20} /> Integrasi Gemini AI
              </h2>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-dark-400 hover:text-primary-500 flex items-center gap-1 transition-colors no-underline"
              >
                Dapatkan API Key Gratis <FiExternalLink />
              </a>
            </div>
            <div>
              <label className="input-label">Gemini API Key</label>
              <div className="relative">
                <input 
                  type="password"
                  {...register("geminiApiKey")} 
                  className="input-field pr-12 font-mono" 
                  placeholder="Masukkan API Key dari Google AI Studio" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <div className={`w-2 h-2 rounded-full ${settings.geminiApiKey ? "bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-dark-600"}`} />
                </div>
              </div>
              <p className="text-[11px] text-dark-500 mt-3 leading-relaxed">
                API Key diperlukan untuk fitur <strong>Analisis Cerdas Data Excel</strong>. Data Anda dikirim ke Google Gemini hanya untuk proses analisis privat.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-6">
            <button type="button" onClick={handleReset} className="btn-secondary">
              <FiRefreshCw size={14} /> Reset Default
            </button>
            <button type="submit" className="btn-primary">
              <FiSave size={14} /> Simpan Pengaturan
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
