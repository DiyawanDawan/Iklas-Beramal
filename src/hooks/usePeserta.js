"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

const DEFAULT_SETTINGS = {
  namaUjian: "UJIAN MADRASAH",
  tahunPelajaran: "2025/2026",
  namaLembaga: "MTs. NEGERI 2 LOMBOK TENGAH",
  prefixNoPeserta: "26-19-02-2-0002",
  tempatCetak: "Jelantik",
  tanggalCetak: "2026-04-20",
  jabatanKepala: "Kepala Madrasah",
  namaKepala: "H. Diguna, S.Ag",
  nipKepala: "197112311997031008",
  logoUrl: "",
};

export function useSettings() {
  const [settings, setSettings, , isLoaded] = useLocalStorage("kartu-ujian-settings", DEFAULT_SETTINGS);

  const updateSettings = useCallback(
    (newSettings) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    [setSettings]
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  return { settings, updateSettings, resetSettings, isLoaded, DEFAULT_SETTINGS };
}

export function usePeserta() {
  const [pesertaList, setPesertaList, , isLoaded] = useLocalStorage("kartu-ujian-peserta", []);

  const addPeserta = useCallback(
    (peserta) => {
      setPesertaList((prev) => {
        const noUrut = prev.length > 0 ? Math.max(...prev.map((p) => p.noUrut)) + 1 : 1;
        const newPeserta = {
          ...peserta,
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          noUrut,
          createdAt: new Date().toISOString(),
        };
        return [...prev, newPeserta];
      });
    },
    [setPesertaList]
  );

  const updatePeserta = useCallback(
    (id, updatedData) => {
      setPesertaList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
    },
    [setPesertaList]
  );

  const deletePeserta = useCallback(
    (id) => {
      setPesertaList((prev) => {
        const filtered = prev.filter((p) => p.id !== id);
        // Re-number
        return filtered.map((p, idx) => ({ ...p, noUrut: idx + 1 }));
      });
    },
    [setPesertaList]
  );

  const deleteMultiple = useCallback(
    (ids) => {
      setPesertaList((prev) => {
        const filtered = prev.filter((p) => !ids.includes(p.id));
        return filtered.map((p, idx) => ({ ...p, noUrut: idx + 1 }));
      });
    },
    [setPesertaList]
  );

  const generateNoPeserta = useCallback(
    (prefix, noUrut) => {
      const padded = String(noUrut).padStart(4, "0");
      return `${prefix}-${padded}`;
    },
    []
  );

  return {
    pesertaList,
    setPesertaList,
    addPeserta,
    updatePeserta,
    deletePeserta,
    deleteMultiple,
    generateNoPeserta,
    isLoaded,
  };
}
