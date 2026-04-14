"use client";

import Link from "next/link";
import { HiOutlineCode, HiOutlineHeart } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print mt-auto py-12 px-6 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto">
        {/* Slogan */}
        <div className="text-xl font-black text-primary-500 tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-linear-to-l from-primary-500 to-transparent"></span>
          Ikhlas Beramal
          <span className="w-8 h-[1px] bg-linear-to-r from-primary-500 to-transparent"></span>
        </div>

        <p className="text-sm text-dark-500 mb-6 italic">
          Transformasi Digital Madrasah yang Lebih Cepat dan Akurat.
        </p>

        <div className="flex items-center justify-center gap-4 text-[13px] text-dark-400 flex-wrap">
          <div>&copy; {currentYear} Ikhlas Beramal. All rights reserved.</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-dark-700"></div>
          <Link 
            href="/developer" 
            className="text-dark-200 no-underline font-bold flex items-center gap-1.5 hover:text-primary-500 transition-colors"
          >
            <HiOutlineCode className="text-primary-500" />
            Developed by Diyawan
          </Link>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-dark-700"></div>
          <div className="flex items-center gap-1">
            Made with <HiOutlineHeart className="text-red-500" /> for Madrasah
          </div>
        </div>
      </div>
    </footer>
  );
}
