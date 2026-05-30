"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Key, X, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

export default function ApiSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check if key exists on mount
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setHasKey(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setHasKey(true);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setIsOpen(false);
      }, 2000);
    } else {
      localStorage.removeItem("gemini_api_key");
      setHasKey(false);
      setApiKey("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg border transition-colors ${
          hasKey 
            ? "border-[var(--color-border-main)] hover:border-green-500 text-[var(--color-text-muted)] hover:text-green-500" 
            : "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-pulse"
        }`}
      >
        <span className="font-medium flex items-center gap-2">
          {hasKey ? <CheckCircle size={16} className="text-green-500" /> : <AlertCircle size={16} />}
          Pengaturan Kunci API
        </span>
        <Key size={16} />
      </button>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-main)] rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[var(--color-primary)]/10 p-3 rounded-full">
                <Key className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-text-main)]">Kunci Akses AI</h2>
            </div>
            
            <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed">
              Untuk menggunakan sistem Audit Justice, Anda wajib memasukkan **Kunci API Google Gemini** milik Anda sendiri. Kunci ini akan disimpan secara rahasia di dalam komputer Anda (Offline).
            </p>

            <div className="mb-6 bg-[var(--color-bg-sidebar)] p-4 rounded-xl border border-[var(--color-border-main)]">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline font-bold mb-2"
              >
                Dapatkan Kunci API Gratis di Sini <ExternalLink size={14} />
              </a>
              <p className="text-xs text-[var(--color-text-muted)]">
                Login dengan akun Google Anda, klik "Create API Key", dan salin kodenya ke bawah ini.
              </p>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Kunci API (API Key)
              </label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSyA..."
                className="w-full bg-[var(--color-bg-sidebar)] border border-[var(--color-border-main)] text-[var(--color-text-main)] p-3 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-mono"
              />
            </div>

            <button 
              onClick={handleSave}
              className={`w-full py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${
                isSaved 
                  ? "bg-green-500 text-white" 
                  : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white dark:text-[#060b14]"
              }`}
            >
              {isSaved ? (
                <>Tersimpan! <CheckCircle size={18} /></>
              ) : (
                "Simpan Konfigurasi"
              )}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
