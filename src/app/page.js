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
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(16, 185, 129, 0.2)",
              borderTopColor: "#10b981",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <span style={{ color: "#64748b", fontSize: "14px" }}>Memuat data...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Hero */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #059669, #10b981)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(16, 185, 129, 0.3)",
            }}>
              <IoSchoolOutline color="#fff" size={36} />
            </div>
          </div>
          <h1 style={{
            fontSize: "42px",
            fontWeight: 900,
            background: "linear-gradient(135deg, #10b981, #34d399, #6ee7b7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
            marginBottom: "12px",
          }}>
            Ikhlas Beramal
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}>
            Solusi Digital Madrasah yang Cepat, Akurat, dan Modern.
            Mulai langkah transformasi digital Anda hari ini.
          </p>
        </div>

        {/* Stats */}
        <div 
          className="grid-responsive grid-res-2 grid-res-3"
          style={{ marginBottom: "40px" }}
        >
          <div className="stat-card slide-up">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <HiOutlineUsers size={24} color="#10b981" />
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                color: totalPeserta > 0 ? "#10b981" : "#f59e0b",
                background: totalPeserta > 0 ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
              }}>
                {totalPeserta > 0 ? "Terisi" : "Kosong"}
              </span>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              {totalPeserta}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>Total Peserta</div>
          </div>

          <div className="stat-card slide-up" style={{ animationDelay: "0.1s" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "rgba(96, 165, 250, 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <HiOutlineDocumentText size={24} color="#60a5fa" />
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#60a5fa",
                background: "rgba(96,165,250,0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
              }}>
                A4
              </span>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              {totalHalaman}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>Halaman PDF</div>
          </div>

          <div className="stat-card slide-up" style={{ animationDelay: "0.2s" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <HiOutlineCog size={24} color="#f59e0b" />
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                color: settingsComplete ? "#10b981" : "#f59e0b",
                background: settingsComplete ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
              }}>
                {settingsComplete ? "Lengkap" : "Belum Lengkap"}
              </span>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginTop: "8px" }}>
              {settings.namaLembaga || "Belum diatur"}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>Pengaturan Lembaga</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#e2e8f0",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <FiZap size={18} color="#f59e0b" /> Aksi Cepat
        </h2>
        <div 
          className="grid-responsive grid-res-2 grid-res-3"
          style={{ marginBottom: "40px" }}
        >
          <Link href="/settings" style={{ textDecoration: "none" }}>
            <div className="glass-card-light" style={{
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderLeft: "4px solid #f59e0b",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <FiSettings size={22} color="#f59e0b" />
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9" }}>Pengaturan Lembaga</h3>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                Atur nama lembaga, kepala madrasah, NIP, dan format kartu ujian.
              </p>
            </div>
          </Link>

          <Link href="/peserta" style={{ textDecoration: "none" }}>
            <div className="glass-card-light" style={{
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderLeft: "4px solid #10b981",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <FiUserPlus size={22} color="#10b981" />
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9" }}>Tambah Peserta</h3>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                Input data peserta ujian: nama, NISN, tempat tanggal lahir.
              </p>
            </div>
          </Link>

          <Link href="/cetak" style={{ textDecoration: "none" }}>
            <div className="glass-card-light" style={{
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderLeft: "4px solid #60a5fa",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <FiPrinter size={22} color="#60a5fa" />
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9" }}>Cetak Kartu PDF</h3>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                Preview dan download kartu ujian dalam format PDF A4.
              </p>
            </div>
          </Link>
        </div>

        {/* Info */}
        <div className="glass-card-light" style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <HiOutlineLightBulb size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>
              <strong style={{ color: "#e2e8f0" }}>Langkah penggunaan:</strong> Pertama atur{" "}
              <strong>Pengaturan Lembaga</strong> → Tambah <strong>Data Peserta</strong> → Lalu{" "}
              <strong>Cetak Kartu PDF</strong>. Semua data tersimpan di browser (LocalStorage).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
