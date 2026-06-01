import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Audit Pengadilan AI",
  description: "Sistem Audit Keputusan Pengadilan Berbasis AI",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "A-Justice",
  },
};

import type { Viewport } from 'next';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import ExtensionCrashBypass from "@/components/ExtensionCrashBypass";
import ClientOnly from "@/components/ClientOnly";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head suppressHydrationWarning>
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} bg-[var(--color-bg-main)] text-[var(--color-text-main)] min-h-screen flex flex-col lg:flex-row antialiased font-sans transition-colors duration-300 w-full overflow-x-hidden`}>
        <ExtensionCrashBypass />
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

maksud aku tulis lengkap ulang ini 
