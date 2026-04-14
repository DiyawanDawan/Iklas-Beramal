"use client";

import Link from "next/link";
import { HiOutlineCode, HiOutlineHeart } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print" style={{
      marginTop: "auto",
      padding: "48px 24px 32px",
      borderTop: "1px solid rgba(148, 163, 184, 0.08)",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Slogan */}
        <div style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#10b981",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}>
          <span style={{ width: "30px", height: "1px", background: "linear-gradient(to left, #10b981, transparent)" }}></span>
          Ikhlas Beramal
          <span style={{ width: "30px", height: "1px", background: "linear-gradient(to right, #10b981, transparent)" }}></span>
        </div>

        <p style={{
          fontSize: "14px",
          color: "#64748b",
          marginBottom: "24px",
          fontStyle: "italic"
        }}>
          Transformasi Digital Madrasah yang Lebih Cepat dan Akurat.
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          fontSize: "13px",
          color: "#94a3b8",
          flexWrap: "wrap"
        }}>
          <div>&copy; {currentYear} Ikhlas Beramal. All rights reserved.</div>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#475569" }} className="hidden sm:block"></div>
          <Link 
            href="/developer" 
            style={{ 
              color: "#e2e8f0", 
              textDecoration: "none", 
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <HiOutlineCode size={16} color="#10b981" />
            Developed by Diyawan
          </Link>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#475569" }} className="hidden sm:block"></div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Made with <HiOutlineHeart size={14} color="#ef4444" /> for Madrasah
          </div>
        </div>
      </div>
    </footer>
  );
}
