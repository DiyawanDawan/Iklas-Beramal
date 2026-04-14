"use client";

import { useState, useRef, useMemo } from "react";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import PrintLayout from "@/components/PrintLayout";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { FiDownload, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { HiOutlinePrinter, HiOutlineClipboardList } from "react-icons/hi";

export default function CetakPage() {
  const { pesertaList, isLoaded: pesertaLoaded } = usePeserta();
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef(null);

  const isLoaded = pesertaLoaded && settingsLoaded;

  const selectedPeserta = useMemo(() => {
    if (selectedIds.length === 0) return pesertaList;
    return pesertaList.filter((p) => selectedIds.includes(p.id));
  }, [pesertaList, selectedIds]);

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

  const handleDownloadPDF = async () => {
    if (selectedPeserta.length === 0) {
      toast.error("Tidak ada peserta untuk dicetak!");
      return;
    }

    setIsGenerating(true);
    setShowPreview(true);

    // Wait for render
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
            <p style={{ fontSize: "13px", marginTop: "4px" }}>
              Tambahkan peserta terlebih dahulu di halaman Data Peserta
            </p>
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
                    Halaman PDF: {Math.ceil((selectedIds.length === 0 ? pesertaList.length : selectedIds.length) / 4)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-secondary"
                  >
                    {showPreview ? <><FiEyeOff size={14} /> Sembunyikan Preview</> : <><FiEye size={14} /> Tampilkan Preview</>}
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className="btn-primary"
                  >
                    {isGenerating ? (
                      <><FiLoader size={14} className="animate-spin" /> Generating PDF...</>
                    ) : (
                      <><FiDownload size={14} /> Download PDF</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Peserta Selection */}
            <div className="glass-card" style={{ padding: "20px", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>
                  Pilih Peserta untuk Dicetak
                </h3>
                <button onClick={selectAll} className="btn-secondary btn-sm">
                  {selectedIds.length === pesertaList.length ? "Batal Pilih Semua" : "Pilih Semua"}
                </button>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "8px",
                maxHeight: "300px",
                overflowY: "auto",
              }}>
                {pesertaList.map((p) => (
                  <label
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: selectedIds.includes(p.id)
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(15, 23, 42, 0.3)",
                      border: selectedIds.includes(p.id)
                        ? "1px solid rgba(16, 185, 129, 0.3)"
                        : "1px solid transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.length === 0 || selectedIds.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      style={{ accentColor: "#10b981", cursor: "pointer" }}
                    />
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>{p.nama}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{p.noPeserta}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="fade-in" style={{
                background: "#374151",
                borderRadius: "16px",
                padding: "24px",
                overflowX: "auto",
              }}>
                <h3 style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "16px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                  <HiOutlineClipboardList size={16} /> Preview Kartu Ujian
                </h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrintLayout
                    ref={printRef}
                    pesertaList={selectedPeserta}
                    settings={settings}
                  />
                </div>
              </div>
            )}

            {/* Hidden print area for PDF generation when not in preview */}
            {!showPreview && (
              <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                <PrintLayout
                  ref={printRef}
                  pesertaList={selectedPeserta}
                  settings={settings}
                />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
