"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center p-4">
      <div className="glass-panel p-8 max-w-md w-full text-center border-t-4 border-red-500">
        <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[var(--color-text-main)] mb-2">Terjadi Kesalahan</h2>
        <p className="text-[var(--color-text-muted)] mb-8">
          Sistem mendeteksi adanya gangguan dari browser atau ekstensi Anda. 
        </p>
        <button
          onClick={() => {
            // Attempt to recover by trying to re-render the segment
            reset();
            window.location.reload();
          }}
          className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white dark:text-[#060b14] py-3 rounded-lg font-bold transition-colors"
        >
          <RefreshCw size={18} />
          Muat Ulang Halaman
        </button>
      </div>
    </div>
  );
}
