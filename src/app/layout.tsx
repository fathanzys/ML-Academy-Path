import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Curriculum | Panduan Belajar AI Gratis",
  description: "Kurikulum bimbingan belajar AI gratis yang interaktif dan bersumber pada literatur akademik terpercaya.",
  keywords: ["AI", "Artificial Intelligence", "Machine Learning", "Kurikulum", "Belajar AI", "Indonesia", "Deep Learning", "LLM"],
  openGraph: {
    title: "AI Curriculum | Panduan Belajar AI Gratis",
    description: "Kuasai Logika di Balik Kecerdasan Buatan melalui visualisasi interaktif dan penjelasan ramah pemula.",
    type: "website",
    locale: "id_ID",
    siteName: "AI Curriculum Indonesia",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Curriculum | Panduan Belajar AI Gratis",
    description: "Kuasai Logika di Balik Kecerdasan Buatan melalui visualisasi interaktif.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={cn(inter.className, "min-h-screen flex flex-col items-center w-full")}>
        {/* Background ambient lighting */}
        <div className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden bg-[#030712]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        </div>
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
