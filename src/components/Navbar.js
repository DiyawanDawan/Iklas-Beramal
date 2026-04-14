"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  HiOutlineChartBar, 
  HiOutlineUsers, 
  HiOutlinePrinter, 
  HiOutlineCog, 
  HiOutlineMenu, 
  HiOutlineX,
  HiOutlineCode 
} from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: HiOutlineChartBar },
  { href: "/peserta", label: "Data Peserta", icon: HiOutlineUsers },
  { href: "/cetak", label: "Cetak Kartu", icon: HiOutlinePrinter },
  { href: "/settings", label: "Pengaturan", icon: HiOutlineCog },
  { href: "/developer", label: "Developer", icon: HiOutlineCode },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="no-print" style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(15, 23, 42, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
          }}>
            <IoSchoolOutline color="#fff" size={20} />
          </div>
          <div>
            <div style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}>Ikhlas Beramal</div>
            <div style={{
              fontSize: "10px",
              color: "#64748b",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>Sistem Kartu Ujian</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-md" style={{
          alignItems: "center",
          gap: "4px",
        }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  color: isActive ? "#10b981" : "#94a3b8",
                  background: isActive ? "rgba(16, 185, 129, 0.1)" : "transparent",
                }}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-md"
          style={{
            background: "rgba(148, 163, 184, 0.1)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            borderRadius: "10px",
            color: mobileOpen ? "#10b981" : "#94a3b8",
            cursor: "pointer",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {mobileOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div 
          className="show-md mobile-menu-anim" 
          style={{
            flexDirection: "column",
            padding: "8px 16px 24px",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 49,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: isActive ? "#10b981" : "#cbd5e1",
                  background: isActive ? "rgba(16, 185, 129, 0.1)" : "transparent",
                  marginBottom: "4px",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(16, 185, 129, 0.2)" : "rgba(148, 163, 184, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "#10b981" : "#94a3b8",
                }}>
                  <Icon size={18} />
                </div>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
