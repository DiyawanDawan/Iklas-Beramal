"use client";

import KartuUjian from "./KartuUjian";
import { forwardRef } from "react";

const PrintLayout = forwardRef(function PrintLayout({ pesertaList, settings }, ref) {
  // Group peserta into pages of 4 (2x2)
  const pages = [];
  for (let i = 0; i < pesertaList.length; i += 4) {
    pages.push(pesertaList.slice(i, i + 4));
  }

  return (
    <div ref={ref} id="print-area" style={{ background: "#fff" }}>
      {pages.map((pagePeserta, pageIdx) => (
        <div
          key={pageIdx}
          style={{
            width: "794px", /* A4 width in px at 96dpi */
            minHeight: "1123px", /* A4 height in px at 96dpi */
            padding: "40px 30px",
            background: "#fff",
            pageBreakAfter: pageIdx < pages.length - 1 ? "always" : "auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignContent: "flex-start",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {pagePeserta.map((peserta) => (
            <KartuUjian
              key={peserta.id}
              peserta={peserta}
              settings={settings}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default PrintLayout;
