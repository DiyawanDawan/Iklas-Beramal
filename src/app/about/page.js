"use client";

import Navbar from "@/components/Navbar";
import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineSparkles } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 24px" }}>
        <div className="fade-in">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 className="page-title" style={{ fontSize: "36px", marginBottom: "16px" }}>
              Tentang Ikhlas Beramal
            </h1>
            <p className="page-subtitle" style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
              Membawa transformasi digital ke jantung pendidikan madrasah dengan prinsip ketulusan dan inovasi.
            </p>
          </div>

          <div style={{ display: "grid", gap: "32px" }}>
            <section className="glass-card slide-up" style={{ padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)" }}>
                  <HiOutlineSparkles size={28} color="#10b981" />
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#f1f5f9" }}>Visi & Misi</h2>
              </div>
              <p style={{ color: "#94a3b8", lineHeight: "1.8", fontSize: "15px" }}>
                <strong>Ikhlas Beramal</strong> bukan sekadar slogan, melainkan fondasi dari sistem ini. 
                Kami percaya bahwa administrasi pendidikan tidak seharusnya menjadi beban. Dengan teknologi digital, 
                kami berupaya menyederhanakan proses yang rumit agar tenaga pendidik dapat lebih fokus pada 
                tugas utama mereka: membimbing generasi masa depan.
              </p>
            </section>

            <div className="grid-responsive grid-res-2">
              <section className="glass-card slide-up" style={{ padding: "28px", animationDelay: "0.1s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <HiOutlineLightBulb size={22} color="#f59e0b" />
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>Inovasi Berkelanjutan</h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
                  Fitur <strong>Kartu Ujian</strong> adalah gerbang awal. Kami berkomitmen untuk terus mengembangkan fitur-fitur administrasi lainnya yang akan mengintegrasikan seluruh kebutuhan data madrasah dalam satu platform modern.
                </p>
              </section>

              <section className="glass-card slide-up" style={{ padding: "28px", animationDelay: "0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <HiOutlineShieldCheck size={22} color="#60a5fa" />
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>Keamanan Data</h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
                  Privasi adalah prioritas. Semua data yang Anda kelola tersimpan secara lokal dan aman di browser Anda (LocalStorage), memberikan Anda kontrol penuh tanpa perlu khawatir tentang kebocoran data di server pihak ketiga.
                </p>
              </section>
            </div>

            <section className="glass-card-light slide-up" style={{ padding: "32px", textAlign: "center", animationDelay: "0.3s" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <IoSchoolOutline size={48} color="#10b981" />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "12px" }}>
                Mari Maju Bersama
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "500px", margin: "0 auto" }}>
                Gunakan teknologi ini untuk meningkatkan efisiensi di madrasah Anda. Kami hadir untuk melayani dan tumbuh bersama komunitas pendidikan Indonesia.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
