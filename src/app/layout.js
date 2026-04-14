import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ikhlas Beramal - Solusi Digital Madrasah",
  description: "Solusi Digital Madrasah yang Cepat, Akurat, dan Modern. Memudahkan tata kelola administrasi pendidikan madrasah.",
  keywords: "Ikhlas Beramal, solusi digital madrasah, administrasi madrasah, kementerian agama, diyawan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1e293b',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1e293b',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
