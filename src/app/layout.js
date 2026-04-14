import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Ikhlas Beramal - Solusi Digital Madrasah",
  description: "Solusi Digital Madrasah yang Cepat, Akurat, dan Modern. Memudahkan tata kelola administrasi pendidikan madrasah.",
  keywords: "Ikhlas Beramal, solusi digital madrasah, administrasi madrasah, kementerian agama, diyawan",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ikhlas Beramal",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-center"
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
