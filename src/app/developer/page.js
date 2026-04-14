"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { 
  HiOutlineMail, 
  HiOutlineHeart, 
  HiOutlineArrowRight,
  HiOutlineCode,
  HiOutlineChevronDown,
  HiOutlineDuplicate,
  HiOutlineCheck
} from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/diyaw.an/",
    icon: FaInstagram,
    className: "text-[#E1306C]",
    handle: "@diyaw.an"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/diyawan-diyawan-a22394215/",
    icon: FaLinkedin,
    className: "text-[#0077B5]",
    handle: "Diyawan"
  },
  {
    name: "GitHub Profile",
    url: "https://github.com/DiyawanDawan",
    icon: FaGithub,
    className: "text-white",
    handle: "DiyawanDawan"
  }
];

export default function DeveloperPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const openWhatsApp = () => {
    window.open("https://wa.me/6287742860880?text=Halo%20Diyawan,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek...", "_blank");
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("087742860880");
    setIsCopied(true);
    toast.success("Nomor berhasil disalin!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/xyzkpvnp", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        toast.success("Pesan berhasil dikirim!");
        e.target.reset();
      } else {
        toast.error("Form belum aktif. Gunakan WhatsApp/Email.");
      }
    } catch (err) {
      toast.error("Kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-container max-w-3xl">
        <div className="fade-in content-center px-4 mb-20">
          
          {/* HEADER PROFILE SECTION */}
          <div className="mb-14">
            <div className="profile-photo-wrapper mb-6 relative inline-block">
               <img 
                 src="/developer.jpeg" 
                 alt="Diyawan"
                 className="profile-photo shadow-2xl"
               />
               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full border-4 border-dark-950 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
               </div>
            </div>
            
            <h1 className="text-4xl font-black text-dark-50 tracking-tighter mb-1 italic">Diyawan</h1>
            <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Senior Fullstack Engineer</div>
            
            {/* SOCIAL LINKS */}
            <div className="flex justify-center gap-3 mb-8">
               {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={social.name}
                      href={social.url} 
                      target="_blank" 
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all group"
                    >
                       <Icon className={`${social.className} text-xl group-hover:scale-110 transition-transform`} />
                    </a>
                  )
               })}
            </div>

            <p className="max-w-md mx-auto text-dark-400 text-sm leading-relaxed mb-4">
              Membangun infrastruktur digital madrasah dengan presisi dan integritas tinggi.
            </p>
          </div>

          {/* PROJECT CONSULTATION CARD */}
          <div className="w-full mb-12 slide-up">
            <div className="glass-card p-1 bg-linear-to-br from-white/[0.05] to-transparent border-white/5 overflow-hidden">
               <div className="p-8 md:p-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                    Professional Services
                  </div>
                  <h2 className="text-2xl font-black text-dark-50 mb-3 tracking-tighter">Butuh Konsultasi Proyek?</h2>
                  <p className="text-dark-400 text-[13px] max-w-sm mb-10 leading-relaxed">
                    Siap membantu Anda merancang dan mengembangkan sistem digital kustom.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                     <button 
                       onClick={openWhatsApp}
                       className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#25D366] text-dark-950 font-black text-xs uppercase tracking-widest hover:bg-[#128C7E] hover:text-white transition-all shadow-lg shadow-green-500/10 group active:scale-95"
                     >
                        <FaWhatsapp size={20} /> WhatsApp
                     </button>
                     <button 
                       onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                       className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-dark-950 font-black text-xs uppercase tracking-widest hover:bg-dark-50 transition-all group active:scale-95"
                     >
                        <HiOutlineMail size={20} /> Hubungi Saya
                     </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left slide-up animation-delay-100 mb-12">
            {/* GitHub Card */}
            <div className="glass-card p-6 border-white/5 flex flex-col justify-between h-full bg-white/[0.01]">
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-lg font-bold">
                      <FaGithub size={24} />
                  </div>
                  <div className="text-left">
                      <div className="text-sm font-bold text-dark-50 tracking-tight">Ikhlas Beramal Repo</div>
                      <div className="text-[10px] text-dark-500 font-mono italic whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">github.com/DiyawanDawan/...</div>
                  </div>
              </div>
              <a 
                href="https://github.com/DiyawanDawan/Iklas-Beramal" 
                target="_blank"
                className="btn-primary no-underline text-[10px] font-black uppercase tracking-widest px-6 py-3 flex items-center justify-center gap-2 group w-full"
              >
                Kontribusi <HiOutlineCode className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Donation Card - WITH CLICK TO COPY */}
            <div className="glass-card p-6 border-blue-500/10 flex flex-col h-full bg-blue-500/[0.01]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0 uppercase">
                    <HiOutlineHeart size={20} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase text-dark-50 tracking-widest">Support Work</h4>
               </div>
               <p className="text-[12px] text-dark-400 leading-relaxed mb-6">
                 Terima kasih atas apresiasi Anda untuk project ini.
               </p>
               <button 
                 onClick={handleCopyNumber}
                 className="mt-auto bg-white/3 p-4 rounded-xl border border-dashed border-dark-700/50 flex items-center justify-between group hover:bg-white/5 hover:border-blue-500/30 transition-all text-left w-full"
               >
                  <div className="flex items-center gap-3">
                    <IoWalletOutline size={22} className="text-blue-500" />
                    <div>
                      <div className="text-[9px] text-dark-500 uppercase font-black tracking-tighter opacity-70">Transfer DANA</div>
                      <div className="text-[13px] font-black text-white tracking-widest">0877 4286 0880</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {isCopied ? <HiOutlineCheck className="text-primary-500 text-lg" /> : <HiOutlineDuplicate className="text-dark-500 group-hover:text-primary-500 transition-colors text-lg" />}
                    <span className={`text-[8px] font-black uppercase mt-1 ${isCopied ? 'text-primary-500' : 'text-dark-500'}`}>
                      {isCopied ? "Copied" : "Copy"}
                    </span>
                  </div>
               </button>
            </div>
          </div>

          {/* DYNAMIC CONTACT FORM SECTION */}
          <div id="contact-form" className="w-full slide-up animation-delay-200">
             <section className="glass-card p-8 md:p-10 border-white/5 relative bg-linear-to-b from-white/[0.03] to-transparent">
                <div className="flex flex-col md:flex-row gap-10">
                   <div className="md:w-1/3 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-[9px] font-black uppercase tracking-widest mb-4">
                         Direct Contact
                      </div>
                      <h3 className="text-2xl font-black text-dark-50 mb-4 tracking-tighter">Kirim Pesan</h3>
                      <p className="text-[12px] text-dark-400 leading-relaxed">
                         Pesan Anda akan terintegrasi langsung ke kotak masuk saya.
                      </p>
                   </div>

                   <div className="md:w-2/3">
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" type="text" placeholder="Nama Lengkap" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-dark-50 focus:outline-none focus:border-primary-500/50 placeholder:text-dark-600 font-bold transition-all" />
                            <input name="email" type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-dark-50 focus:outline-none focus:border-primary-500/50 placeholder:text-dark-600 font-bold transition-all" />
                         </div>
                         
                         <div className="relative group">
                            <select 
                              name="type" 
                              required 
                              defaultValue=""
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-dark-50 appearance-none focus:outline-none focus:border-primary-500/50 font-bold transition-all cursor-pointer"
                            >
                               <option value="" disabled className="bg-dark-950 text-dark-500">Pilih Jenis Pesan...</option>
                               <option value="Request Fitur" className="bg-dark-950">Request Fitur</option>
                               <option value="Konfirmasi Donasi" className="bg-dark-950">Konfirmasi Donasi</option>
                               <option value="Konsultasi Proyek" className="bg-dark-950">Konsultasi Proyek</option>
                            </select>
                            <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none group-hover:text-primary-500 transition-colors" />
                         </div>

                         <textarea name="message" placeholder="Tuliskan pesan Anda..." rows={4} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-dark-50 focus:outline-none focus:border-primary-500/50 placeholder:text-dark-600 font-bold transition-all resize-none"></textarea>
                         
                         <button 
                           type="submit" 
                           disabled={isSubmitting}
                           className="btn-primary w-full py-4 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary-500/10 disabled:opacity-50"
                         >
                            {isSubmitting ? "Mengirim..." : <>Kirim Sekarang <HiOutlineArrowRight /></>}
                         </button>
                      </form>
                   </div>
                </div>
             </section>
          </div>
        </div>
      </main>
    </>
  );
}
