"use client";

import Navbar from "@/components/Navbar";
import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineCode } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="main-container max-w-4xl">
        <div className="fade-in">
          <div className="content-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Mission Statement
            </div>
            <h1 className="page-title text-4xl lg:text-5xl mb-4 font-black">
              Tentang Ikhlas Beramal
            </h1>
            <p className="page-subtitle text-lg max-w-xl mx-auto text-dark-400">
              Membangun fondasi digital untuk masa depan pendidikan madrasah melalui ketulusan dan inovasi teknologi.
            </p>
          </div>

          <div className="grid gap-10">
            {/* Visi Section */}
            <section className="glass-card slide-up p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="p-4 rounded-2xl bg-primary-500/10 text-primary-500 shrink-0">
                  <HiOutlineSparkles size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-dark-50 mb-4">Visi & Nilai Dasar</h2>
                  <p className="text-dark-400 leading-relaxed text-[15px]">
                    <strong className="text-primary-500 italic">"Ikhlas Beramal"</strong> bagi kami bukan sekadar slogan di gerbang madrasah. Ia adalah prinsip teknik yang kami tanamkan di setiap baris kode. Kami percaya bahwa administrasi pendidikan berkualitas harus dapat diakses oleh semua tanpa hambatan biaya atau kerumitan sistem.
                  </p>
                </div>
              </div>
            </section>

            {/* Grid Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="glass-card slide-up p-8 animation-delay-100 border-amber-500/10 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <HiOutlineLightBulb size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-dark-50">Modernisasi Berkelanjutan</h3>
                </div>
                <p className="text-dark-500 text-[13px] leading-relaxed">
                  Dimulai dari manajemen kartu ujian, kami berambisi menyentuh setiap aspek administrasi madrasah untuk menciptakan ekosistem digital yang terintegrasi dan responsif.
                </p>
              </section>

              <section className="glass-card slide-up p-8 animation-delay-200 border-blue-500/10 hover:border-blue-500/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <HiOutlineShieldCheck size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-dark-50">Kedaulatan Data</h3>
                </div>
                <p className="text-dark-500 text-[13px] leading-relaxed">
                  Kami mengutamakan keamanan dengan memproses data secara lokal. Anda memegang kendali penuh atas informasi madrasah tanpa ketergantungan pada server pihak ketiga.
                </p>
              </section>
            </div>

            {/* GitHub / Contribution Section */}
            <section className="glass-card slide-up p-10 bg-linear-to-br from-white/[0.03] to-white/[0.01] border-white/5 relative overflow-hidden animation-delay-300">
               <div className="absolute inset-0 bg-primary-500/2 pointer-events-none" />
               <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
                    <FaGithub size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-dark-50 mb-3">Kolaborasi Open Source</h2>
                  <p className="text-dark-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                    Sistem ini dibangun secara transparan untuk memajukan pendidikan madrasah di Indonesia. Kami mengundang desainer, pengembang, dan pendidik untuk mendiskusikan inovasi dan berkontribusi langsung pada pengembangan kode sumber kami.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                     <a 
                       href="https://github.com/DiyawanDawan/Iklas-Beramal" 
                       target="_blank" 
                       className="btn-primary no-underline flex items-center gap-2 px-6 py-3 font-bold group"
                     >
                        Ikut Berkontribusi <HiOutlineCode className="group-hover:translate-x-1 transition-transform" />
                     </a>
                     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-dark-500">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        v1.2.0-stable
                     </div>
                  </div>
               </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
