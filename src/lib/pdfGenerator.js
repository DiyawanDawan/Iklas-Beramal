"use client";

export async function generatePDF(elementId, filename = "kartu-ujian.pdf") {
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Print element not found");
  }

  // Get all page divs
  const pages = element.children;
  const pdf = new jsPDF("p", "mm", "a4");
  const a4Width = 210;
  const a4Height = 297;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: page.scrollHeight,
      windowWidth: 794,
      windowHeight: page.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      allowTaint: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, Math.min(imgHeight, a4Height));
  }

  pdf.save(filename);
  return true;
}
