"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { usePeserta, useSettings } from "@/hooks/usePeserta";
import { formatTTL } from "@/lib/constants";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiSearch } from "react-icons/fi";
import { HiOutlineUsers, HiOutlineClipboardList } from "react-icons/hi";

export default function PesertaPage() {
  const { pesertaList, addPeserta, updatePeserta, deletePeserta, deleteMultiple, generateNoPeserta, isLoaded } = usePeserta();
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      noPeserta: "",
      nama: "",
      nisn: "",
      tempatLahir: "",
      tanggalLahir: "",
    },
  });

  const filteredPeserta = useMemo(() => {
    if (!searchQuery) return pesertaList;
    const q = searchQuery.toLowerCase();
    return pesertaList.filter(
      (p) =>
        p.nama.toLowerCase().includes(q) ||
        p.nisn?.includes(q) ||
        p.noPeserta?.includes(q)
    );
  }, [pesertaList, searchQuery]);

  const onSubmit = (data) => {
    // Cek duplikat No. Peserta
    const dupNoPeserta = pesertaList.find(
      (p) => p.noPeserta === data.noPeserta && p.id !== editingId
    );
    if (dupNoPeserta) {
      toast.error(
        `⚠️ No. Peserta "${data.noPeserta}" sudah digunakan oleh ${dupNoPeserta.nama}!`,
        { duration: 5000 }
      );
      return;
    }

    // Cek duplikat NISN (jika diisi)
    if (data.nisn && data.nisn.trim() !== "") {
      const dupNisn = pesertaList.find(
        (p) => p.nisn === data.nisn.trim() && p.id !== editingId
      );
      if (dupNisn) {
        toast.error(
          `⚠️ NISN "${data.nisn}" sudah digunakan oleh ${dupNisn.nama}!`,
          { duration: 5000 }
        );
        return;
      }
    }

    if (editingId) {
      updatePeserta(editingId, {
        noPeserta: data.noPeserta,
        nama: data.nama.toUpperCase(),
        nisn: data.nisn.trim(),
        tempatLahir: data.tempatLahir.toUpperCase(),
        tanggalLahir: data.tanggalLahir,
      });
      setEditingId(null);
      toast.success("Data peserta berhasil diperbarui!");
    } else {
      addPeserta({
        noPeserta: data.noPeserta,
        nama: data.nama.toUpperCase(),
        nisn: data.nisn.trim(),
        tempatLahir: data.tempatLahir.toUpperCase(),
        tanggalLahir: data.tanggalLahir,
      });
      toast.success("Peserta berhasil ditambahkan!");
    }
    reset();
  };

  const handleEdit = (peserta) => {
    setEditingId(peserta.id);
    setValue("noPeserta", peserta.noPeserta || "");
    setValue("nama", peserta.nama);
    setValue("nisn", peserta.nisn || "");
    setValue("tempatLahir", peserta.tempatLahir || "");
    setValue("tanggalLahir", peserta.tanggalLahir || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus peserta ini?")) {
      deletePeserta(id);
      toast.success("Peserta berhasil dihapus");
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Hapus ${selectedIds.length} peserta terpilih?`)) {
      deleteMultiple(selectedIds);
      setSelectedIds([]);
      toast.success(`${selectedIds.length} peserta berhasil dihapus`);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPeserta.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPeserta.map((p) => p.id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ color: "#64748b" }}>Memuat data...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div className="fade-in">
          <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <HiOutlineUsers size={28} /> Data Peserta
          </h1>
          <p className="page-subtitle">Kelola data peserta ujian madrasah</p>
        </div>

        {/* Form Input */}
        <div className="glass-card slide-up" style={{ padding: "28px", marginTop: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            {editingId ? <><FiEdit2 size={16} /> Edit Peserta</> : <><FiPlus size={16} /> Tambah Peserta Baru</>}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-responsive grid-res-2 grid-res-3">
              <div>
                <label className="input-label">No. Peserta *</label>
                <input
                  {...register("noPeserta", { required: true })}
                  className="input-field"
                  placeholder="Contoh: 26-19-02-2-0002-0001"
                />
              </div>
              <div>
                <label className="input-label">Nama Peserta *</label>
                <input
                  {...register("nama", { required: true })}
                  className="input-field"
                  placeholder="Masukkan nama peserta"
                  style={{ textTransform: "uppercase" }}
                />
              </div>
              <div>
                <label className="input-label">NISN</label>
                <input
                  {...register("nisn")}
                  className="input-field"
                  placeholder="Masukkan NISN"
                />
              </div>
              <div>
                <label className="input-label">Tempat Lahir</label>
                <input
                  {...register("tempatLahir")}
                  className="input-field"
                  placeholder="Tempat lahir"
                  style={{ textTransform: "uppercase" }}
                />
              </div>
              <div>
                <label className="input-label">Tanggal Lahir</label>
                <input
                  type="date"
                  {...register("tanggalLahir")}
                  className="input-field"
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "flex-end" }}>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary btn-sm">
                  <FiX size={14} /> Batal
                </button>
              )}
              <button type="submit" className="btn-primary">
                {editingId ? <><FiSave size={14} /> Simpan Perubahan</> : <><FiPlus size={14} /> Tambah Peserta</>}
              </button>
            </div>
          </form>
        </div>

          <div 
            className="grid-responsive grid-res-2" 
            style={{ 
              marginBottom: "16px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "space-between" }}>
              <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 600 }}>
                Total: {pesertaList.length} peserta
              </span>
              {selectedIds.length > 0 && (
                <button onClick={handleDeleteSelected} className="btn-danger btn-sm">
                  <FiTrash2 size={12} /> Hapus ({selectedIds.length})
                </button>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <FiSearch size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b", zIndex: 1 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari peserta..."
                className="input-field"
                style={{ width: "100%", paddingLeft: "40px" }}
              />
            </div>
          </div>

        {/* Table */}
        {filteredPeserta.length > 0 ? (
          <div className="glass-card table-container fade-in">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredPeserta.length && filteredPeserta.length > 0}
                      onChange={toggleSelectAll}
                      style={{ accentColor: "#10b981", cursor: "pointer" }}
                    />
                  </th>
                  <th>No</th>
                  <th>No. Peserta</th>
                  <th>Nama</th>
                  <th>NISN</th>
                  <th>TTL</th>
                  <th style={{ width: "120px" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPeserta.map((peserta) => (
                  <tr key={peserta.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(peserta.id)}
                        onChange={() => toggleSelect(peserta.id)}
                        style={{ accentColor: "#10b981", cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ fontWeight: 600, color: "#64748b" }}>{peserta.noUrut}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "12px", color: "#94a3b8" }}>
                      {peserta.noPeserta}
                    </td>
                    <td style={{ fontWeight: 600 }}>{peserta.nama}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "13px" }}>{peserta.nisn || "-"}</td>
                    <td style={{ fontSize: "13px", color: "#94a3b8" }}>
                      {formatTTL(peserta.tempatLahir, peserta.tanggalLahir)}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleEdit(peserta)}
                          style={{
                            background: "rgba(59, 130, 246, 0.15)",
                            color: "#60a5fa",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                            transition: "all 0.2s",
                          }}
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(peserta.id)}
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#f87171",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                            transition: "all 0.2s",
                          }}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="glass-card" style={{
            padding: "48px",
            textAlign: "center",
            color: "#64748b",
          }}>
            <div style={{ marginBottom: "12px" }}><HiOutlineClipboardList size={48} color="#475569" /></div>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>Belum ada data peserta</p>
            <p style={{ fontSize: "13px", marginTop: "4px" }}>Tambahkan peserta menggunakan form di atas</p>
          </div>
        )}
      </main>
    </>
  );
}
