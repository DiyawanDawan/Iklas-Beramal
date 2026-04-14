"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  HiOutlineHome, 
  HiOutlineInformationCircle, 
  HiOutlineCode, 
  HiOutlineClipboardList,
  HiOutlineMenu, 
  HiOutlineX,
  HiOutlineCog,
  HiOutlinePrinter,
  HiOutlineUsers,
  HiChevronDown
} from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: HiOutlineHome },
    { href: "/about", label: "About", icon: HiOutlineInformationCircle },
    { 
      label: "Kartu Ujian", 
      icon: HiOutlineClipboardList,
      isDropdown: true,
      items: [
        { href: "/peserta", label: "Data Peserta", icon: HiOutlineUsers },
        { href: "/cetak", label: "Cetak & Preview", icon: HiOutlinePrinter },
      ]
    },
    { href: "/developer", label: "Fitur Developer", icon: HiOutlineCode },
  ];

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
            }}>Solusi Digital Madrasah</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-md" style={{ alignItems: "center", gap: "4px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isDropdown) {
              const isChildActive = item.items.some(sub => pathname === sub.href);
              return (
                <div key={item.label} ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isChildActive || dropOpen ? "#10b981" : "#94a3b8",
                      background: isChildActive || dropOpen ? "rgba(16, 185, 129, 0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                    <HiChevronDown size={14} style={{ transform: dropOpen ? "rotate(180deg)" : "none", transition: "0.2s" }} />
                  </button>
                  
                  {dropOpen && (
                    <div className="mobile-menu-anim" style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "0",
                      width: "200px",
                      background: "#1e293b",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    }}>
                      {item.items.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setDropOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            textDecoration: "none",
                            color: pathname === sub.href ? "#10b981" : "#cbd5e1",
                            background: pathname === sub.href ? "rgba(16, 185, 129, 0.1)" : "transparent",
                            transition: "all 0.2s",
                          }}
                        >
                          <sub.icon size={16} />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
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
          
          <div style={{ width: "1px", height: "20px", background: "rgba(148, 163, 184, 0.1)", margin: "0 8px" }}></div>
          
          <Link
            href="/settings"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              color: pathname === "/settings" ? "#10b981" : "#94a3b8",
              background: pathname === "/settings" ? "rgba(16, 185, 129, 0.1)" : "transparent",
              transition: "all 0.2s ease",
            }}
            title="Pengaturan"
          >
            <HiOutlineCog size={20} />
          </Link>
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
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isDropdown) {
              return (
                <div key={item.label}>
                  <div style={{ 
                    padding: "14px 16px 8px", 
                    fontSize: "12px", 
                    fontWeight: 700, 
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    {item.label}
                  </div>
                  {item.items.map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px 12px 24px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: 600,
                        textDecoration: "none",
                        color: pathname === sub.href ? "#10b981" : "#cbd5e1",
                        background: pathname === sub.href ? "rgba(16, 185, 129, 0.1)" : "transparent",
                        marginBottom: "4px",
                      }}
                    >
                      <sub.icon size={18} />
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            }

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
                  color: pathname === item.href ? "#10b981" : "#cbd5e1",
                  background: pathname === item.href ? "rgba(16, 185, 129, 0.1)" : "transparent",
                  marginBottom: "4px",
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: pathname === item.href ? "rgba(16, 185, 129, 0.2)" : "rgba(148, 163, 184, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: pathname === item.href ? "#10b981" : "#94a3b8",
                }}>
                  <Icon size={18} />
                </div>
                {item.label}
              </Link>
            );
          })}
          
          <Link
            href="/settings"
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
              color: pathname === "/settings" ? "#10b981" : "#cbd5e1",
              background: pathname === "/settings" ? "rgba(16, 185, 129, 0.1)" : "transparent",
              marginTop: "8px",
              borderTop: "1px solid rgba(148, 163, 184, 0.05)"
            }}
          >
            <HiOutlineCog size={18} />
            Pengaturan Lembaga
          </Link>
        </div>
      )}
    </nav>
  );
}
