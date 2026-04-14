"use client";

import { useSearchParams } from "next/navigation";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import PrintLayout from "@/components/PrintLayout";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { FiDownload, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { HiOutlinePrinter, HiOutlineClipboardList } from "react-icons/hi";

export default function CetakPage() {
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
      const ids = idsParam.split(",").map(id => parseInt(id));
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
    // Kita tetap paksa render area cetak sebentar
    await new Promise((r) => setTimeout(r, 500));

    try {
      const { generatePDF } = await import("@/lib/pdfGenerator");
      await generatePDF("print-area", `kartu-ujian-${settings.namaLembaga.replace(/\s+/g, "-")}.pdf`);
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
      <>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ color: "#64748b" }}>Memuat data...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div className="fade-in">
          <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <HiOutlinePrinter size={28} /> Cetak Kartu Ujian
          </h1>
          <p className="page-subtitle">
            Preview dan download kartu ujian dalam format PDF
          </p>
        </div>

        {pesertaList.length === 0 ? (
          <div className="glass-card" style={{
            padding: "48px",
            textAlign: "center",
            color: "#64748b",
            marginTop: "32px",
          }}>
            <div style={{ marginBottom: "12px" }}><HiOutlineClipboardList size={48} color="#475569" /></div>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>Belum ada data peserta</p>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="glass-card slide-up" style={{ padding: "24px", marginTop: "28px", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "4px" }}>
                    Peserta terpilih: <strong style={{ color: "#10b981" }}>
                      {selectedIds.length === 0 ? `Semua (${pesertaList.length})` : selectedIds.length}
                    </strong>
                  </p>
                  <p style={{ fontSize: "12px", color: "#64748b" }}>
                    Halaman PDF: {Math.ceil(selectedPeserta.length / 4)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => setShowPreview(!showPreview)} className="btn-secondary">
                    {showPreview ? <><FiEyeOff size={14} /> Sembunyikan Preview</> : <><FiEye size={14} /> Tampilkan Preview</>}
                  </button>
                  <button onClick={handleDownloadPDF} disabled={isGenerating} className="btn-primary">
                    {isGenerating ? <><FiLoader size={14} className="animate-spin" /> Generating...</> : <><FiDownload size={14} /> Download PDF</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Selection */}
            <div className="glass-card" style={{ padding: "20px", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>Pilih Peserta</h3>
                <button onClick={selectAll} className="btn-secondary btn-sm">
                  {selectedIds.length === pesertaList.length ? "Batal Semua" : "Pilih Semua"}
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "8px", maxHeight: "200px", overflowY: "auto" }}>
                {pesertaList.map((p) => (
                  <label key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", background: "rgba(15, 23, 42, 0.3)", border: selectedIds.includes(p.id) ? "1px solid #10b981" : "1px solid transparent" }}>
                    <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} />
                    <span style={{ fontSize: "13px" }}>{p.nama}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* AREA CETAK TUNGGAL (Harus selalu ada untuk jspdf) */}
            <div style={{ 
              marginTop: "32px", 
              display: showPreview ? "flex" : "block",
              justifyContent: "center",
              background: showPreview ? "#374151" : "transparent",
              padding: showPreview ? "24px" : "0",
              borderRadius: "16px",
              // Jika tidak show preview, kita sembunyikan tapi tetap di DOM
              ...(showPreview ? {} : { position: "absolute", left: "-9999px", top: "-9999px", opacity: 0 })
            }}>
              <PrintLayout
                ref={printRef}
                pesertaList={selectedPeserta}
                settings={settings}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
