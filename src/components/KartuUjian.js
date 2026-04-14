"use client";

import { formatTanggalPendek, formatTanggalIndonesia } from "@/lib/constants";

export default function KartuUjian({ peserta, settings }) {
  const {
    namaUjian,
    tahunPelajaran,
    namaLembaga,
    tempatCetak,
    tanggalCetak,
    jabatanKepala,
    namaKepala,
    nipKepala,
  } = settings;

  const ttl = `${peserta.tempatLahir || ""}${peserta.tempatLahir && peserta.tanggalLahir ? ", " : ""}${peserta.tanggalLahir ? formatTanggalPendek(peserta.tanggalLahir) : ""}`;

  return (
    <div
      className="kartu-ujian-item"
      style={{
        width: "340px",
        minHeight: "250px",
        border: "1.5px solid #222",
        borderRadius: "2px",
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "10px",
        padding: "8px 12px",
        display: "flex",
        flexDirection: "column",
        pageBreakInside: "avoid",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{
        textAlign: "center",
        paddingBottom: "6px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          {/* Logo */}
          <img
            src="/image.png"
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.3px", lineHeight: "1.35" }}>
              KARTU PESERTA {namaUjian}
            </div>
            <div style={{ fontSize: "10.5px", fontWeight: 700, lineHeight: "1.35" }}>
              TAHUN PELAJARAN {tahunPelajaran}
            </div>
            <div style={{ fontSize: "10.5px", fontWeight: 700, lineHeight: "1.35" }}>
              {namaLembaga}
            </div>
          </div>
        </div>
      </div>

      {/* Double border line: thick + thin */}
      <div style={{
        borderTop: "2.5px solid #222",
        marginBottom: "2px",
      }} />
      <div style={{
        borderTop: "1px solid #222",
        marginBottom: "7px",
      }} />

      {/* Body - Data Peserta (full width) */}
      <div style={{ marginBottom: "6px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "2px 0", width: "75px", verticalAlign: "top", fontWeight: 600, fontSize: "10px" }}>No. Peserta</td>
              <td style={{ padding: "2px 0", width: "8px", verticalAlign: "top" }}>:</td>
              <td style={{ padding: "2px 0", fontWeight: 600, fontSize: "10px" }}>
                {peserta.noPeserta}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "2px 0", verticalAlign: "top", fontWeight: 600, fontSize: "10px" }}>Nama</td>
              <td style={{ padding: "2px 0", verticalAlign: "top" }}>:</td>
              <td style={{ padding: "2px 0", fontWeight: 700, fontSize: "10px" }}>{peserta.nama}</td>
            </tr>
            <tr>
              <td style={{ padding: "2px 0", verticalAlign: "top", fontWeight: 600, fontSize: "10px" }}>TTL</td>
              <td style={{ padding: "2px 0", verticalAlign: "top" }}>:</td>
              <td style={{ padding: "2px 0", fontSize: "10px" }}>{ttl || "-"}</td>
            </tr>
            <tr>
              <td style={{ padding: "2px 0", verticalAlign: "top", fontWeight: 600, fontSize: "10px" }}>NISN</td>
              <td style={{ padding: "2px 0", verticalAlign: "top" }}>:</td>
              <td style={{ padding: "2px 0", fontSize: "10px" }}>{peserta.nisn || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer: Photo Box (left) + TTD (right) — sejajar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flex: 1,
        marginTop: "auto",
      }}>
        {/* Photo Box (left, sejajar TTD) */}
        <div style={{
          width: "65px",
          height: "85px",
          border: "1.5px solid #555",
          borderRadius: "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "#fafafa",
          alignSelf: "flex-end",
        }}>
          <div style={{
            textAlign: "center",
            color: "#bbb",
            fontSize: "7px",
            lineHeight: "1.3",
            padding: "4px",
          }}>
            <div style={{ fontSize: "10px", marginBottom: "4px", fontWeight: 600 }}>FOTO</div>
            <div>3 x 4</div>
          </div>
        </div>

        {/* TTD Kepala Madrasah (right) */}
        <div style={{
          textAlign: "center",
          paddingTop: "2px",
        }}>
          <div style={{ fontSize: "9.5px" }}>
            {tempatCetak}, {formatTanggalIndonesia(tanggalCetak)}
          </div>
          <div style={{ fontSize: "9.5px", marginBottom: "26px" }}>
            {jabatanKepala}
          </div>
          <div style={{ fontSize: "10px", fontWeight: 700, textDecoration: "underline" }}>
            {namaKepala}
          </div>
          <div style={{ fontSize: "9px" }}>
            NIP. {nipKepala}
          </div>
        </div>
      </div>
    </div>
  );
}
