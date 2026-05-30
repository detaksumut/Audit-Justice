"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-[#060b14] text-white min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#0a101d] p-8 max-w-md w-full text-center border-t-4 border-red-500 rounded-lg shadow-2xl">
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Terjadi Kesalahan Fatal</h2>
          <p className="text-gray-400 mb-8">
            Aplikasi mendeteksi konflik tingkat tinggi (kemungkinan besar dari Ekstensi Browser Anda).
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 w-full bg-[#d4af37] hover:bg-[#b5952f] text-[#060b14] py-3 rounded-lg font-bold transition-colors"
          >
            <RefreshCw size={18} />
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
