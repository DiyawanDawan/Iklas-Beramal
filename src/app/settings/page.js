"use client";

import { useForm } from "react-hook-form";
import { useSettings } from "@/hooks/usePeserta";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { FiSave, FiRefreshCw } from "react-icons/fi";
import { HiOutlineClipboardList, HiOutlineOfficeBuilding, HiOutlineUser } from "react-icons/hi";

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
    resetSettings();
    reset();
    toast.success("Pengaturan dikembalikan ke default");
  };

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ color: "#64748b", fontSize: "16px" }}>Memuat pengaturan...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div className="fade-in">
          <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <HiOutlineClipboardList size={28} /> Pengaturan Lembaga
          </h1>
          <p className="page-subtitle">
            Atur informasi lembaga, kepala sekolah, dan format kartu ujian
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "32px" }}>
          {/* Informasi Ujian */}
          <div className="glass-card slide-up" style={{ padding: "28px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <HiOutlineClipboardList size={20} /> Informasi Ujian
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
          <div className="glass-card slide-up" style={{ padding: "28px", marginBottom: "20px", animationDelay: "0.1s" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <HiOutlineOfficeBuilding size={20} /> Informasi Lembaga
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label className="input-label">Nama Lembaga / Madrasah</label>
                <input {...register("namaLembaga")} className="input-field" placeholder="MTs. NEGERI 2 LOMBOK TENGAH" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
          <div className="glass-card slide-up" style={{ padding: "28px", marginBottom: "20px", animationDelay: "0.2s" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <HiOutlineUser size={20} /> Kepala Madrasah
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
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
