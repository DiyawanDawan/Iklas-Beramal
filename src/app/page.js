"use client";

import Link from "next/link";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import Navbar from "@/components/Navbar";
import { HiOutlineUsers, HiOutlineDocumentText, HiOutlineCog, HiOutlineLightBulb } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { FiPrinter, FiSettings, FiUserPlus, FiZap } from "react-icons/fi";

export default function HomePage() {
  const { pesertaList, isLoaded: pesertaLoaded } = usePeserta();
  const { settings, isLoaded: settingsLoaded } = useSettings();

  const isLoaded = pesertaLoaded && settingsLoaded;

  const totalPeserta = pesertaList.length;
  const totalHalaman = Math.ceil(totalPeserta / 4);
  const settingsComplete = !!(settings.namaLembaga && settings.namaKepala && settings.nipKepala);

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            <span className="text-dark-500 text-sm">Memuat data...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-container">
        {/* Hero Section */}
        <div className="fade-in content-center mb-12">
          <div className="mb-4 flex justify-center">
            <div className="w-18 h-18 rounded-3xl bg-linear-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-2xl shadow-primary-500/30">
              <IoSchoolOutline className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="hero-title">Ikhlas Beramal</h1>
          <p className="max-w-md text-dark-500 text-base leading-relaxed">
            Solusi Digital Madrasah yang Cepat, Akurat, dan Modern.
            Mulai langkah transformasi digital Anda hari ini.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid-responsive grid-res-2 grid-res-3 mb-10">
          <div className="glass-card slide-up p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <HiOutlineUsers className="text-primary-500 text-2xl" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${totalPeserta > 0 ? "text-primary-500 bg-primary-500/10" : "text-amber-500 bg-amber-500/10"}`}>
                {totalPeserta > 0 ? "Terisi" : "Kosong"}
              </span>
            </div>
            <div className="text-3xl font-black text-dark-100 tracking-tight">{totalPeserta}</div>
            <div className="text-[13px] text-dark-500 mt-1 font-medium">Total Peserta</div>
          </div>

          <div className="glass-card slide-up p-6 animation-delay-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HiOutlineDocumentText className="text-blue-500 text-2xl" />
              </div>
              <span className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full">A4</span>
            </div>
            <div className="text-3xl font-black text-dark-100 tracking-tight">{totalHalaman}</div>
            <div className="text-[13px] text-dark-500 mt-1 font-medium">Halaman PDF</div>
          </div>

          <div className="glass-card slide-up p-6 animation-delay-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <HiOutlineCog className="text-amber-500 text-2xl" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${settingsComplete ? "text-primary-500 bg-primary-500/10" : "text-amber-500 bg-amber-500/10"}`}>
                {settingsComplete ? "Lengkap" : "Belum Lengkap"}
              </span>
            </div>
            <div className="text-lg font-bold text-dark-100 mt-2 truncate">
              {settings.namaLembaga || "Belum diatur"}
            </div>
            <div className="text-[13px] text-dark-500 mt-1 font-medium">Pengaturan Lembaga</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-bold text-dark-200 mb-4 flex items-center gap-2">
          <FiZap className="text-amber-500" /> Aksi Cepat
        </h2>
        
        <div className="grid-responsive grid-res-2 grid-res-3 mb-10">
          <Link href="/settings" className="no-underline group">
            <div className="glass-card-light p-6 border-l-4 border-l-amber-500 h-full">
              <div className="flex items-center gap-3 mb-2 group-hover:translate-x-1 transition-transform">
                <FiSettings className="text-xl text-amber-500" />
                <h3 className="text-[15px] font-bold text-dark-100">Pengaturan Lembaga</h3>
              </div>
              <p className="text-[13px] text-dark-500 leading-relaxed">
                Atur nama lembaga, kepala madrasah, NIP, dan format kartu ujian.
              </p>
            </div>
          </Link>

          <Link href="/peserta" className="no-underline group">
            <div className="glass-card-light p-6 border-l-4 border-l-primary-500 h-full">
              <div className="flex items-center gap-3 mb-2 group-hover:translate-x-1 transition-transform">
                <FiUserPlus className="text-xl text-primary-500" />
                <h3 className="text-[15px] font-bold text-dark-100">Tambah Peserta</h3>
              </div>
              <p className="text-[13px] text-dark-500 leading-relaxed">
                Input data peserta ujian: nama, NISN, tempat tanggal lahir.
              </p>
            </div>
          </Link>

          <Link href="/cetak" className="no-underline group">
            <div className="glass-card-light p-6 border-l-4 border-l-blue-500 h-full">
              <div className="flex items-center gap-3 mb-2 group-hover:translate-x-1 transition-transform">
                <FiPrinter className="text-xl text-blue-500" />
                <h3 className="text-[15px] font-bold text-dark-100">Cetak Kartu PDF</h3>
              </div>
              <p className="text-[13px] text-dark-500 leading-relaxed">
                Preview dan download kartu ujian dalam format PDF A4.
              </p>
            </div>
          </Link>
        </div>

        {/* Support/Info Info */}
        <div className="glass-card-light px-6 py-5 flex items-center gap-4">
          <HiOutlineLightBulb className="text-2xl text-amber-500 shrink-0" />
          <div className="text-[13px] text-dark-400 leading-relaxed">
            <span className="font-bold text-dark-200">Langkah penggunaan:</span> Pertama atur <span className="text-amber-500 font-bold">Pengaturan Lembaga</span> → Tambah <span className="text-primary-500 font-bold">Data Peserta</span> → Lalu <span className="text-blue-500 font-bold">Cetak Kartu PDF</span>. Semua data tersimpan aman secara lokal.
          </div>
        </div>
      </main>
    </>
  );
}
