```tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ExtensionCrashBypass from "@/components/ExtensionCrashBypass";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aj.beritaindonesia.news"),

  title: {
    default: "Audit Justice",
    template: "%s | Audit Justice",
  },

  description:
    "Presisi Hukum, Integritas Peradilan. Platform analisis putusan berbasis kecerdasan buatan untuk mengawal kepastian hukum dan konstitusi.",

  keywords: [
    "Audit Justice",
    "Audit Putusan",
    "Audit Pengadilan",
    "Analisis Putusan",
    "Legal AI",
    "Perkara Pidana",
    "Perkara Perdata",
    "Perkara Agama",
    "BAP Kepolisian",
    "BAP Kejaksaan",
    "Asisten Litigasi",
  ],

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Audit Justice",
  },

  openGraph: {
    title: "Audit Justice",
    description:
      "Presisi Hukum, Integritas Peradilan. Platform analisis putusan berbasis kecerdasan buatan untuk mengawal kepastian hukum dan konstitusi.",

    url: "https://aj.beritaindonesia.news",
    siteName: "Audit Justice",

    images: [
      {
        url: "/auditjustice-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Audit Justice - Presisi Hukum, Integritas Peradilan",
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Audit Justice",
    description:
      "Presisi Hukum, Integritas Peradilan. Platform analisis putusan berbasis kecerdasan buatan.",

    images: ["/auditjustice-cover.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} bg-[var(--color-bg-main)] text-[var(--color-text-main)] min-h-screen flex flex-col lg:flex-row antialiased font-sans transition-colors duration-300 w-full overflow-x-hidden`}
      >
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
```
