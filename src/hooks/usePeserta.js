"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback, useEffect } from "react";

const DEFAULT_SETTINGS = {
  namaUjian: "UJIAN MADRASAH",
  tahunPelajaran: "2025/2026",
  namaLembaga: "MTS UCUP",
  nsm: "1234567890",
  prefixNoPeserta: "26-19-02-2-0002",
  tempatCetak: "Lombok Tengah",
  tanggalCetak: "2026-04-20",
  jabatanKepala: "Kepala Madrasah",
  namaKepala: "UCUP",
  nipKepala: "-",
  logoUrl: "",
  geminiApiKey: "AIzaSyApER02PfMmiwDIKytQc9G6qea0hviXf98",
};

export function useSettings() {
  const [settings, setSettings, , isLoaded] = useLocalStorage("kartu-ujian-settings", DEFAULT_SETTINGS);

  // MIGRASI OTOMATIS: Beresin masalah API Key kosong di LocalStorage
  useEffect(() => {
    if (isLoaded && settings) {
      const isApiKeyEmpty = !settings.geminiApiKey || settings.geminiApiKey === "";
      const hasDefaultKey = !!DEFAULT_SETTINGS.geminiApiKey;

      if (isApiKeyEmpty && hasDefaultKey) {
        setSettings((prev) => ({ 
          ...prev, 
          geminiApiKey: DEFAULT_SETTINGS.geminiApiKey 
        }));
      }
    }
  }, [isLoaded, settings, setSettings]);

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
