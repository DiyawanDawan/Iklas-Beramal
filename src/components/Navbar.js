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
    <nav className="no-print sticky top-0 z-50 bg-dark-900/85 backdrop-blur-xl border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
            <IoSchoolOutline className="text-white text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-dark-50 tracking-tight leading-tight">Ikhlas Beramal</span>
            <span className="text-[10px] text-dark-400 font-bold tracking-widest uppercase">Solusi Digital Madrasah</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-md items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isDropdown) {
              const isChildActive = item.items.some(sub => pathname === sub.href);
              return (
                <div key={item.label} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer border-none ${isChildActive || dropOpen ? "text-primary-500 bg-primary-500/10" : "text-dark-400 hover:text-dark-100"}`}
                  >
                    <Icon className="text-base" />
                    {item.label}
                    <HiChevronDown className={`text-sm transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {dropOpen && (
                    <div className="mobile-menu-anim absolute top-[calc(100%+8px)] left-0 w-52 bg-dark-800 border border-white/10 rounded-xl p-2 shadow-2xl shadow-black">
                      {item.items.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setDropOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-bold no-underline transition-all ${pathname === sub.href ? "text-primary-500 bg-primary-500/10" : "text-dark-200 hover:bg-white/5 hover:text-white"}`}
                        >
                          <sub.icon className="text-base" />
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
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold no-underline transition-all ${isActive ? "text-primary-500 bg-primary-500/10" : "text-dark-400 hover:text-dark-100"}`}
              >
                <Icon className="text-base" />
                {item.label}
              </Link>
            );
          })}
          
          <div className="w-[1px] h-5 bg-white/10 mx-2"></div>
          
          <Link
            href="/settings"
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${pathname === "/settings" ? "text-primary-500 bg-primary-500/10" : "text-dark-400 hover:text-dark-100"}`}
            title="Pengaturan"
          >
            <HiOutlineCog className="text-xl" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-md bg-white/5 border border-white/10 rounded-xl text-dark-400 cursor-pointer w-10 h-10 items-center justify-center"
        >
          {mobileOpen ? <HiOutlineX size={22} className="text-primary-500" /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="show-md mobile-menu-anim flex-col px-4 pb-6 pt-2 bg-dark-900/95 backdrop-blur-2xl border-b border-white/10 absolute top-16 left-0 right-0 z-49 max-h-[calc(100vh-64px)] overflow-y-auto shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isDropdown) {
              return (
                <div key={item.label}>
                  <div className="px-4 pt-3.5 pb-2 text-[10px] uppercase font-black text-dark-500 tracking-widest">
                    {item.label}
                  </div>
                  {item.items.map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold no-underline transition-all mb-1 ${pathname === sub.href ? "text-primary-500 bg-primary-500/10" : "text-dark-200"}`}
                    >
                      <sub.icon className="text-lg" />
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
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold no-underline transition-all mb-1 ${pathname === item.href ? "text-primary-500 bg-primary-500/10" : "text-dark-200"}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pathname === item.href ? "bg-primary-500/20 text-primary-500" : "bg-white/5 text-dark-500"}`}>
                  <Icon className="text-lg" />
                </div>
                {item.label}
              </Link>
            );
          })}
          
          <Link
            href="/settings"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold no-underline transition-all mt-2 border-t border-white/5 ${pathname === "/settings" ? "text-primary-500 bg-primary-500/10" : "text-dark-200"}`}
          >
            <HiOutlineCog size={18} />
            Pengaturan Lembaga
          </Link>
        </div>
      )}
    </nav>
  );
}
