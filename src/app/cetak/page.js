"use client";

import { useSearchParams } from "next/navigation";
import { useState, useRef, useMemo, useEffect, useCallback, Suspense } from "react";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import PrintLayout from "@/components/PrintLayout";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { FiDownload, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { HiOutlinePrinter, HiOutlineClipboardList } from "react-icons/hi";

function CetakContent() {
  const searchParams = useSearchParams();
  const { pesertaList, isLoaded: pesertaLoaded } = usePeserta();
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef(null);

  const isLoaded = pesertaLoaded && settingsLoaded;

  // 1. Sync IDs from URL
  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      // FIX: ID di aplikasi kita adalah string, bukan integer
      const ids = idsParam.split(",");
      setSelectedIds(ids);
    }
  }, [searchParams]);

  const selectedPeserta = useMemo(() => {
    if (selectedIds.length === 0) return pesertaList;
    return pesertaList.filter((p) => selectedIds.includes(p.id));
  }, [pesertaList, selectedIds]);

  const handleDownloadPDF = useCallback(async () => {
    if (selectedPeserta.length === 0) {
      toast.error("Tidak ada peserta untuk dicetak!");
      return;
    }

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 800));

    try {
      const { generatePDF } = await import("@/lib/pdfGenerator");
      const fileName = `kartu-ujian-${(settings.namaLembaga || "madrasah").replace(/\s+/g, "-")}.pdf`;
      await generatePDF("print-area", fileName);
      toast.success("PDF berhasil diunduh!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal generate PDF: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  }, [selectedPeserta, settings]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === pesertaList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pesertaList.map((p) => p.id));
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
          <span className="text-dark-500 text-sm">Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="main-container max-w-6xl">
      <div className="fade-in">
        <h1 className="page-title flex items-center gap-3">
          <HiOutlinePrinter size={28} /> Cetak Kartu Ujian
        </h1>
        <p className="page-subtitle">
          Preview dan download kartu ujian dalam format PDF
        </p>
      </div>

      {pesertaList.length === 0 ? (
        <div className="glass-card p-12 text-center text-dark-500 mt-8">
          <div className="mb-3 flex justify-center opacity-50"><HiOutlineClipboardList size={48} /></div>
          <p className="text-base font-bold">Belum ada data peserta</p>
          <p className="text-[13px] mt-1">Tambahkan peserta terlebih dahulu di halaman Data Peserta</p>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="glass-card slide-up p-6 mt-7 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-dark-400 mb-1 font-bold">
                  Peserta terpilih: <span className="text-primary-500">
                    {selectedIds.length === 0 ? `Semua (${pesertaList.length})` : selectedIds.length}
                  </span>
                </p>
                <p className="text-[12px] text-dark-500">
                  Estimasi Halaman: {Math.ceil(selectedPeserta.length / 8)} Halaman A4
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowPreview(!showPreview)} className="btn-secondary">
                  {showPreview ? <><FiEyeOff size={14} /> Tutup Preview</> : <><FiEye size={14} /> Lihat Preview</>}
                </button>
                <button onClick={handleDownloadPDF} disabled={isGenerating} className="btn-primary">
                  {isGenerating ? <><FiLoader size={14} className="animate-spin" /> Memproses...</> : <><FiDownload size={14} /> Download PDF</>}
                </button>
              </div>
            </div>
          </div>

          {/* Selection Grid */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-dark-200">
                Pilih Peserta untuk Dicetak
              </h3>
              <button onClick={selectAll} className="btn-secondary btn-sm">
                {selectedIds.length === pesertaList.length ? "Batal Semua" : "Pilih Semua"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {pesertaList.map((p) => (
                <label 
                  key={p.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${selectedIds.includes(p.id) ? 'bg-primary-500/10 border-primary-500/30' : 'bg-dark-900/30 border-transparent hover:bg-dark-900/50'}`}
                >
                  <input 
                    type="checkbox" 
                    className="accent-primary-500 w-4 h-4 cursor-pointer"
                    checked={selectedIds.includes(p.id)} 
                    onChange={() => toggleSelect(p.id)} 
                  />
                  <div className="truncate">
                    <div className="text-[13px] font-bold text-dark-100 truncate">{p.nama}</div>
                    <div className="text-[11px] text-dark-500 font-mono">{p.noPeserta}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* AREA CETAK / PREVIEW */}
          <div className={`mt-8 ${showPreview ? 'fade-in bg-dark-700/50 p-6 rounded-2xl flex justify-center shadow-inner' : 'absolute -left-[9999px] -top-[9999px] opacity-0'}`}>
            <div className="relative">
              {showPreview && (
                <div className="flex items-center gap-2 text-dark-400 text-[12px] mb-4 font-bold">
                  <HiOutlineClipboardList className="text-primary-500" /> Preview Hasil Cetakan (A4)
                </div>
              )}
              <PrintLayout
                ref={printRef}
                pesertaList={selectedPeserta}
                settings={settings}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default function CetakPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            <span className="text-dark-500 text-sm">Menyiapkan halaman cetak...</span>
          </div>
        </div>
      }>
        <CetakContent />
      </Suspense>
    </>
  );
}
