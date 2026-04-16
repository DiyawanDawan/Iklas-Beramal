"use client";

import { formatTTL } from "@/lib/constants";
import Image from "next/image";

export default function KartuUjian({ peserta, settings }) {
  const {
    namaUjian,
    tahunPelajaran,
    namaLembaga,
    nsm,
    tempatCetak,
    tanggalCetak,
    jabatanKepala,
    namaKepala,
    nipKepala
  } = settings;

  const tglCetakLocale = tanggalCetak
    ? new Date(tanggalCetak).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    : "";

  return (
    <div className="kartu-container">
      {/* Header Resmi */}
      <div className="kartu-header">
        <Image
          src="/image.png"
          alt="Logo"
          width={45}
          height={45}
          className="header-logo"
        />
        <div className="header-text">
          <h3 className="text-[12px] font-black m-0 leading-tight uppercase">KARTU PESERTA {namaUjian}</h3>
          <p className="text-[11px] m-0 mt-0.5 font-bold uppercase">TAHUN PELAJARAN {tahunPelajaran}</p>
          <h4 className="text-[13px] font-black m-0 mt-0.5 uppercase">{namaLembaga}</h4>
        </div>
      </div>

      <div className="kartu-body">
        <h2 className="kartu-title" style={{ fontSize: '14px', marginBottom: '8px' }}>KARTU PESERTA {namaUjian}</h2>

        <table className="kartu-table">
          <tbody>
            <tr>
              <td className="w-24">No. Peserta</td>
              <td className="w-2">:</td>
              <td className="pl-2 font-mono tracking-tight">{peserta.noPeserta}</td>
            </tr>
            <tr>
              <td>Nama Peserta</td>
              <td>:</td>
              <td className="pl-2 uppercase">{peserta.nama}</td>
            </tr>
            <tr>
              <td>TTL</td>
              <td>:</td>
              <td className="pl-2 uppercase">
                {formatTTL(peserta.tempatLahir, peserta.tanggalLahir)}
              </td>
            </tr>
            <tr>
              <td>NISN</td>
              <td>:</td>
              <td className="pl-2 font-mono">{peserta.nisn || "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* Spacer to push footer down and prevent overlap - Important for html2canvas */}
        <div style={{ flex: 1, minHeight: '10px' }}></div>

        {/* Footer Area with Photo and TTD - Modified for PDF Stability */}
        <div className="kartu-footer" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: '8px' }}>
          {/* Photo Box */}
          <div className="photo-box" style={{ width: '60px', height: '80px', border: '1px solid #000', flexShrink: 0 }}>
            PAS FOTO<br />3 x 4
          </div>

          {/* TTD Box */}
          <div className="ttd-box" style={{ textAlign: 'left', width: '180px', flexShrink: 0 }}>
            <p className="m-0 mb-4" style={{ fontSize: '12px' }}>
              {tempatCetak}, {tglCetakLocale}
              <br />
              {jabatanKepala},
            </p>
            <p className="m-0 font-bold underline" style={{ fontSize: '12px' }}>
              {namaKepala}
            </p>
            <p className="m-0 text-[11px]">
              NIP. {nipKepala || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
