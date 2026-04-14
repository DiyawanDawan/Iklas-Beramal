"use client";

import KartuUjian from "./KartuUjian";
import { forwardRef } from "react";

const PrintLayout = forwardRef(function PrintLayout({ pesertaList, settings }, ref) {
  // Group peserta into pages of 8 (2x4)
  const pages = [];
  for (let i = 0; i < pesertaList.length; i += 8) {
    pages.push(pesertaList.slice(i, i + 8));
  }

  return (
    <div ref={ref} id="print-area" className="bg-white">
      {pages.map((pagePeserta, pageIdx) => (
        <div
          key={pageIdx}
          className={`print-page ${pageIdx < pages.length - 1 ? "break-after-page" : ""}`}
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
