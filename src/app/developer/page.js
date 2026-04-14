"use client";

import Navbar from "@/components/Navbar";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineCode, HiOutlineMail, HiOutlineHeart } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/diyaw.an/",
    icon: FaInstagram,
    color: "#E1306C",
    handle: "@diyaw.an"
  },
  {
    name: "GitHub",
    url: "https://github.com/DiyawanDawan",
    icon: FaGithub,
    color: "#ffffff",
    handle: "DiyawanDawan"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/diyawan-diyawan-a22394215/",
    icon: FaLinkedin,
    color: "#0077B5",
    handle: "Diyawan Diyawan"
  }
];

export default function DeveloperPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
        <div className="fade-in" style={{ textAlign: "center" }}>
          <div style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
          }}>
            <HiOutlineCode color="#fff" size={56} />
          </div>

          <h1 style={{
            fontSize: "32px",
            fontWeight: 900,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            marginBottom: "8px"
          }}>
            Diyawan
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#10b981",
            fontWeight: 600,
            marginBottom: "32px",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}>
            Fullstack Developer
          </p>

          <div style={{
            maxWidth: "500px",
            margin: "0 auto 48px",
            lineHeight: "1.6",
            color: "#94a3b8"
          }}>
            Pengembang sistem <strong>"Ikhlas Beramal"</strong>. 
            Berdedikasi untuk menciptakan solusi teknologi yang memudahkan pengelolaan administrasi pendidikan 
            dengan desain premium dan performa tinggi.
          </div>

          {/* Social Links */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "48px"
          }}>
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-light"
                  style={{
                    padding: "20px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid rgba(148, 163, 184, 0.1)"
                  }}
                >
                  <Icon size={28} color={social.color} />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9" }}>{social.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{social.handle}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {/* Contact Card */}
            <div className="glass-card" style={{ padding: "28px", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)" }}>
                  <HiOutlineMail size={22} color="#10b981" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9" }}>Request Fitur</h3>
              </div>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "16px" }}>
                Punya ide fitur baru atau menemukan bug? Silakan hubungi saya melalui email di bawah ini.
              </p>
              <a 
                href="mailto:diyawandawan@gmail.com" 
                style={{ 
                  color: "#10b981", 
                  textDecoration: "none", 
                  fontWeight: 600, 
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px" 
                }}
              >
                diyawandawan@gmail.com
              </a>
            </div>

            {/* Donation Card */}
            <div className="glass-card" style={{ padding: "28px", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)" }}>
                  <HiOutlineHeart size={22} color="#60a5fa" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9" }}>Dukung Project</h3>
              </div>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "16px" }}>
                Dukung pengembangan sistem ini lebih lanjut melalui donasi sukarela.
              </p>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.03)", 
                padding: "12px 16px", 
                borderRadius: "10px",
                border: "1px dashed rgba(148, 163, 184, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <IoWalletOutline size={20} color="#60a5fa" />
                  <div>
                    <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>DANA Info</div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>0877 4286 0880</div>
                  </div>
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#60a5fa", background: "rgba(59, 130, 246, 0.1)", padding: "2px 8px", borderRadius: "4px" }}>DANA</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        a.glass-card-light:hover {
          transform: translateY(-5px);
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(16, 185, 129, 0.3) !important;
        }
      `}</style>
    </>
  );
}
