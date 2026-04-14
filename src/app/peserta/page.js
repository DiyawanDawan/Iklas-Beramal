"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import { formatTTL } from "@/lib/constants";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PrintLayout from "@/components/PrintLayout";
import ImportExcel from "@/components/ImportExcel";
import { 
  FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiSearch, 
  FiPrinter, FiLoader, FiUploadCloud, FiHome, FiUserCheck, 
  FiHash, FiChevronLeft, FiChevronRight, FiAlertCircle 
} from "react-icons/fi";
import { 
  HiOutlineUsers, 
  HiOutlineClipboardList, 
  HiOutlineOfficeBuilding, 
  HiOutlineShieldCheck 
} from "react-icons/hi";

// --- Komponen Modal Konfirmasi Kustom ---
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card max-w-sm w-full p-6 shadow-2xl border-white/10 animate-in zoom-in-95 duration-200">
        <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-primary-500/10 text-primary-500'}`}>
          <FiAlertCircle size={24} />
        </div>
        <h3 className="text-xl font-black text-dark-50 mb-2">{title}</h3>
        <p className="text-sm text-dark-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 py-3 text-xs uppercase font-black">Batal</button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            className={`flex-1 py-3 text-xs uppercase font-black rounded-xl text-white transition-all active:scale-95 ${type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20' : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-900/20'}`}
          >
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PesertaPage() {
  const router = useRouter();
  const { pesertaList, setPesertaList, addPeserta, updatePeserta, deletePeserta, deleteMultiple, isLoaded } = usePeserta();
  const { settings, updateSettings } = useSettings();
  
  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Bisa diubah jika perlu

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printIds, setPrintIds] = useState([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // State Modal Konfirmasi
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      noPeserta: "", nama: "", nisn: "", tempatLahir: "", tanggalLahir: "",
    },
  });

  // Reset ke halaman 1 saat mencari
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleInstitutionalChange = (field, value) => {
    updateSettings({ [field]: value });
  };

  const filteredPeserta = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return pesertaList.filter(
      (p) =>
        String(p.nama || "").toLowerCase().includes(q) ||
        String(p.nisn || "").includes(q) ||
        String(p.noPeserta || "").includes(q)
    );
  }, [pesertaList, searchQuery]);

  // Logika Pagination Terapan
  const totalPages = Math.ceil(filteredPeserta.length / itemsPerPage);
  const paginatedPeserta = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPeserta.slice(start, start + itemsPerPage);
  }, [filteredPeserta, currentPage, itemsPerPage]);

  const onSubmit = (data) => {
    // Validasi Duplikasi (Kecuali Data yang sedang diedit)
    const isDuplicate = pesertaList.some((p) => {
      if (editingId && p.id === editingId) return false;
      
      const sameNoPeserta = p.noPeserta === data.noPeserta;
      const sameNisn = data.nisn && p.nisn && p.nisn === data.nisn;
      
      return sameNoPeserta || sameNisn;
    });

    if (isDuplicate) {
      toast.error("Gagal! No. Peserta atau NISN sudah terdaftar.");
      return;
    }

    if (editingId) {
      updatePeserta(editingId, { ...data, nama: data.nama.toUpperCase(), tempatLahir: data.tempatLahir.toUpperCase() });
      setEditingId(null);
      toast.success("Data diperbarui!");
    } else {
      addPeserta({ ...data, nama: data.nama.toUpperCase(), tempatLahir: data.tempatLahir.toUpperCase() });
      toast.success("Peserta ditambahkan!");
    }
    reset();
  };

  const handleBulkImport = useCallback((newPesertaList) => {
    let skippedCount = 0;
    
    setPesertaList((prev) => {
      // Filter data baru yang benar-benar unik
      const uniqueNewData = newPesertaList.filter(newData => {
        const isDuplicate = prev.some(existing => 
          existing.noPeserta === newData.noPeserta || 
          (newData.nisn && existing.nisn === newData.nisn)
        );
        if (isDuplicate) skippedCount++;
        return !isDuplicate;
      });

      let currentNoUrut = prev.length > 0 ? Math.max(...prev.map(p => p.noUrut)) : 0;
      const bulkData = uniqueNewData.map(p => ({
        ...p,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        noUrut: ++currentNoUrut,
        createdAt: new Date().toISOString()
      }));

      if (uniqueNewData.length === 0 && newPesertaList.length > 0) {
        toast.error("Semua data di Excel sudah terdaftar!");
        return prev;
      }

      if (skippedCount > 0) {
        toast.success(`${uniqueNewData.length} data diimpor, ${skippedCount} data ganda dilewati.`);
      } else {
        toast.success(`${uniqueNewData.length} data berhasil diimpor!`);
      }

      return [...prev, ...bulkData];
    });
  }, [setPesertaList]);

  const handleEdit = (peserta) => {
    setEditingId(peserta.id);
    setValue("noPeserta", peserta.noPeserta || "");
    setValue("nama", peserta.nama);
    setValue("nisn", peserta.nisn || "");
    setValue("tempatLahir", peserta.tempatLahir || "");
    setValue("tanggalLahir", peserta.tanggalLahir || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // Fungsi DELETE dengan CUSTOM MODAL
  const confirmDelete = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Hapus Peserta?",
      message: "Data ini akan dihapus permanen dari sistem.",
      onConfirm: () => {
        deletePeserta(id);
        toast.success("Berhasil dihapus");
      }
    });
  };

  const confirmDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setModalConfig({
      isOpen: true,
      title: "Hapus Terpilih?",
      message: `Hapus ${selectedIds.length} data yang dipilih secara massal?`,
      onConfirm: () => {
        deleteMultiple(selectedIds);
        setSelectedIds([]);
        toast.success("Data terpilih dihapus");
      }
    });
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedPeserta.length && paginatedPeserta.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedPeserta.map((p) => p.id));
    }
  };

  const isSettingsComplete = () => {
    const required = ["namaLembaga", "nsm", "namaKepala", "nipKepala", "tempatCetak", "tanggalCetak"];
    return required.every(field => settings[field] && settings[field].trim() !== "");
  };

  const handleDirectPrint = async (idsToPrint) => {
    if (!isSettingsComplete()) {
      toast.error("Wajib isi Identitas Madrasah sebelum mencetak!", { duration: 4000 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (idsToPrint.length === 0) return;
    setIsPrinting(true);
    setPrintIds(idsToPrint);
    const toastId = toast.loading("Memproses PDF...");
    try {
      const { generatePDF } = await import("@/lib/pdfGenerator");
      await generatePDF("direct-print-area", `kartu-${settings.namaLembaga}.pdf`);
      toast.success("Siap Cetak!", { id: toastId });
    } catch (err) {
      toast.error("Error Cetak", { id: toastId });
    } finally {
      setIsPrinting(false);
      setPrintIds([]);
    }
  };

  const handlePrintAll = () => handleDirectPrint(selectedIds);

  const selectedPesertaToPrint = useMemo(() => {
    return pesertaList.filter(p => printIds.includes(p.id));
  }, [pesertaList, printIds]);

  if (!isLoaded) return <Navbar />;

  return (
    <>
      <Navbar />
      <ConfirmModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      <main className="main-container max-w-6xl pb-20">
        <div className="fade-in">
          <h1 className="page-title flex items-center gap-3">
            <HiOutlineUsers size={28} /> Dashboard Peserta
          </h1>
          <p className="page-subtitle">Input data, atur lembaga, dan cetak kartu ujian</p>
        </div>

        {/* --- SECTION PENGATURAN LEMBAGA --- */}
        <div className={`glass-card slide-up p-6 mt-6 mb-6 border-white/5 transition-all ${!isSettingsComplete() ? 'border-red-500/30 bg-red-500/[0.02]' : 'border-primary-500/10 bg-linear-to-br from-primary-500/[0.03] to-transparent'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-colors ${!isSettingsComplete() ? 'bg-red-500/10 text-red-500' : 'bg-primary-500/10 text-primary-500'}`}>
                 <HiOutlineOfficeBuilding size={22} />
              </div>
              <div>
                <h2 className="text-sm font-black text-dark-50 m-0 uppercase tracking-widest">Identitas Madrasah</h2>
                {!isSettingsComplete() && <p className="text-[10px] text-red-400 font-bold m-0 mt-0.5 animate-pulse uppercase">Wajib dilengkapi agar bisa cetak kartu</p>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">Nama Lembaga</label>
              <input type="text" value={settings.namaLembaga} onChange={(e) => handleInstitutionalChange("namaLembaga", e.target.value.toUpperCase())} className="input-field text-xs font-bold" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">NSM</label>
              <input type="text" value={settings.nsm} onChange={(e) => handleInstitutionalChange("nsm", e.target.value)} className="input-field text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">Nama Kepala</label>
              <input type="text" value={settings.namaKepala} onChange={(e) => handleInstitutionalChange("namaKepala", e.target.value)} className="input-field text-xs font-bold" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">NIP Kepala</label>
              <input type="text" value={settings.nipKepala} onChange={(e) => handleInstitutionalChange("nipKepala", e.target.value)} className="input-field text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">Kota Cetak</label>
              <input type="text" value={settings.tempatCetak} onChange={(e) => handleInstitutionalChange("tempatCetak", e.target.value)} className="input-field text-xs font-bold" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-dark-500 uppercase tracking-wider pl-1">Tgl Cetak</label>
              <input type="date" value={settings.tanggalCetak} onChange={(e) => handleInstitutionalChange("tanggalCetak", e.target.value)} className="input-field text-xs" />
            </div>
          </div>
        </div>

        {/* --- SECURITY INFORMATION BANNER --- */}
        <div className="glass-card p-5 mb-8 border-emerald-500/10 bg-emerald-500/[0.02] flex items-start gap-4 slide-up">
           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <HiOutlineShieldCheck size={22} />
           </div>
           <div>
              <h3 className="text-sm font-bold text-emerald-400 m-0 uppercase tracking-widest">Kedaulatan & Keamanan Data</h3>
              <p className="text-[12px] text-dark-400 m-0 mt-1 leading-relaxed">
                Demi privasi penuh, seluruh data peserta dan pengaturan lembaga Anda <strong>hanya disimpan di memori browser perangkat ini (Local Storage)</strong>. Kami tidak mengirimkan atau menyimpan data Anda di server mana pun. Data tetap milik Anda sepenuhnya.
              </p>
           </div>
        </div>

        {/* --- SECTION DAFTAR PESERTA --- */}
        <div className="glass-card slide-up p-6 border-white/5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-black text-primary-500 flex items-center gap-2 m-0 uppercase tracking-widest">
              {editingId ? <><FiEdit2 /> Edit Peserta</> : <><FiPlus /> Tambah Baru</>}
            </h2>
            <button onClick={() => setIsImportModalOpen(true)} className="btn-secondary btn-sm text-[10px] uppercase font-black tracking-widest border-primary-500/20 text-primary-400">
              <FiUploadCloud /> Import & AI
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input {...register("noPeserta", { required: true })} className="input-field text-xs" placeholder="No. Peserta" />
              <input {...register("nama", { required: true })} className="input-field text-xs uppercase" placeholder="Nama Lengkap" />
              <input {...register("nisn")} className="input-field text-xs" placeholder="NISN" />
              <input {...register("tempatLahir")} className="input-field text-xs uppercase" placeholder="Tempat Lahir" />
              <input type="date" {...register("tanggalLahir")} className="input-field text-xs" />
              <div className="flex gap-2">
                {editingId && <button type="button" onClick={cancelEdit} className="btn-secondary flex-1 text-xs font-black uppercase"><FiX /></button>}
                <button type="submit" className="btn-primary flex-1 text-xs font-black uppercase tracking-widest">
                  {editingId ? <FiSave /> : <FiPlus />} {editingId ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* --- TOOLBAR & PAGINATION INFO --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-dark-500 uppercase">Total: {filteredPeserta.length}</span>
            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <button onClick={confirmDeleteSelected} className="btn-danger p-1.5 rounded-lg"><FiTrash2 size={14}/></button>
                <button onClick={handlePrintAll} className="btn-primary px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FiPrinter /> Cetak ({selectedIds.length})</button>
              </div>
            )}
          </div>
          <div className="relative w-full md:w-1/2">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari Nama/NISN..." className="input-field pl-10 text-xs w-full" />
          </div>
        </div>

        {/* --- TABLE DATA --- */}
        {paginatedPeserta.length > 0 ? (
          <>
            <div className="glass-card table-container fade-in !p-0 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 uppercase text-[10px] font-black tracking-widest">
                    <th className="w-10 px-4 py-3"><input type="checkbox" checked={selectedIds.length === paginatedPeserta.length && paginatedPeserta.length > 0} onChange={toggleSelectAll} /></th>
                    <th className="text-left px-4">No</th>
                    <th className="text-left px-4">No. Peserta</th>
                    <th className="text-left px-4">Nama</th>
                    <th className="text-left px-4">NISN</th>
                    <th className="text-center px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {paginatedPeserta.map((peserta) => (
                    <tr key={peserta.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.includes(peserta.id)} onChange={() => toggleSelect(peserta.id)} /></td>
                      <td className="px-4 font-bold text-dark-500">{peserta.noUrut}</td>
                      <td className="px-4 font-mono text-[11px] opacity-70">{peserta.noPeserta}</td>
                      <td className="px-4 font-black text-dark-100 uppercase">{peserta.nama}</td>
                      <td className="px-4 font-mono opacity-80">{peserta.nisn || "-"}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(peserta)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"><FiEdit2 size={14} /></button>
                          <button onClick={() => confirmDelete(peserta.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><FiTrash2 size={14} /></button>
                          <button onClick={() => handleDirectPrint([peserta.id])} className="p-2 rounded-lg bg-primary-500/10 text-primary-400 hover:bg-primary-500/20"><FiPrinter size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <span className="text-[10px] font-black text-dark-500 uppercase tracking-widest">Halaman {currentPage} dari {totalPages}</span>
                <div className="flex gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-2 rounded-lg bg-white/5 text-dark-300 disabled:opacity-30 hover:bg-white/10 transition-all"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <div className="flex gap-1 overflow-x-auto max-w-[200px] no-scrollbar">
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`min-w-[40px] h-10 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30' : 'bg-white/5 text-dark-400 hover:bg-white/10'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-lg bg-white/5 text-dark-300 disabled:opacity-30 hover:bg-white/10 transition-all"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card p-20 text-center text-dark-500">
            <HiOutlineClipboardList size={64} className="mx-auto opacity-20 mb-4" />
            <p className="font-black uppercase tracking-widest text-[#666]">Kosong</p>
          </div>
        )}

        <ImportExcel isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleBulkImport} settings={settings} />
        
        {isPrinting && (
           <div id="direct-print-area" className="absolute -left-[9999px] -top-[9999px] opacity-0">
              <PrintLayout pesertaList={selectedPesertaToPrint} settings={settings} />
           </div>
        )}
      </main>
    </>
  );
}
