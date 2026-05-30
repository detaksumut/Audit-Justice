"use client";

import { useState } from "react";
import { Key, ShieldCheck, Copy, ShieldAlert } from "lucide-react";

export default function KeygenPage() {
  const [hwid, setHwid] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateKey = async () => {
    if (!hwid.trim()) {
      alert("Masukkan HWID terlebih dahulu!");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/keygen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hwid: hwid.trim() })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setLicenseKey(data.licenseKey);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(licenseKey);
    alert("Kunci lisensi berhasil disalin!");
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
      <div className="mb-12 border-b border-[var(--color-border-main)] pb-6 flex items-start gap-4">
        <div className="bg-red-500/10 p-4 rounded-xl">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-red-500 mb-2 tracking-tight">Master Key Generator</h1>
          <p className="text-[var(--color-text-muted)] text-lg">Area Sangat Rahasia. Halaman ini digunakan untuk mencetak kunci lisensi bagi pengguna lain berdasarkan Hardware ID (HWID) mereka.</p>
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="mb-8">
          <label className="block text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Masukkan HWID Perangkat Pengguna
          </label>
          <input
            type="text"
            value={hwid}
            onChange={(e) => setHwid(e.target.value)}
            placeholder="Contoh: c4b8f3e2a1..."
            className="w-full bg-[var(--color-bg-sidebar)] border border-[var(--color-border-main)] text-[var(--color-text-main)] p-4 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-mono"
          />
        </div>

        <button
          onClick={generateKey}
          disabled={isLoading}
          className="w-full py-4 bg-[var(--color-primary)] text-white dark:text-[#060b14] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
          ) : (
            <>
              <Key className="w-5 h-5" /> Cetak Lisensi Enkripsi
            </>
          )}
        </button>

        {licenseKey && (
          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl relative">
            <h3 className="flex items-center gap-2 text-green-500 font-bold mb-4 uppercase tracking-wider text-sm">
              <ShieldCheck className="w-5 h-5" /> Kunci Lisensi Sah
            </h3>
            <p className="font-mono text-sm break-all text-[var(--color-text-main)] bg-[var(--color-bg-sidebar)] p-4 rounded border border-[var(--color-border-main)] selection:bg-[var(--color-primary)] selection:text-white">
              {licenseKey}
            </p>
            <button 
              onClick={copyToClipboard}
              className="absolute top-6 right-6 text-[var(--color-text-muted)] hover:text-white transition-colors"
              title="Salin ke Clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              * Berikan Kunci Lisensi ini kepada pemilik laptop tersebut. Kunci ini hanya akan bekerja di komputer dengan HWID yang cocok.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
