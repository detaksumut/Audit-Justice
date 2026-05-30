"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, FileType, AlertCircle, Type, FileText, Link as LinkIcon, Image as ImageIcon, ShieldCheck } from "lucide-react";

interface UploadDropzoneProps {
  onUploadSuccess: (file: File) => void;
  isLoading: boolean;
}

export default function UploadDropzone({ onUploadSuccess, isLoading }: UploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "text" | "link">("upload");
  const [pastedText, setPastedText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // --- TRIAL & ANTI-HACK SYSTEM ---
  const [showLicensePopup, setShowLicensePopup] = useState(false);
  const [serialInput, setSerialInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [isHacked, setIsHacked] = useState(false);

  const USAGE_KEY = 'X2F1ZGl0X3VzYWdlX2NvdW50'; // base64 for _audit_usage_count
  const ACTIVE_KEY = 'audit_license_active';
  const VALID_SERIALS = ['ADJ-MASTER-2026', 'ADJ-VIP-001', 'ADJ-VIP-002', 'AKP-MASTER-2026'];
  const isValidPattern = (code: string) => /^(ADJ|AKP)-\d{4}-[A-Z0-9]{5}$/.test(code);

  const getUsageCount = () => {
    if (typeof window === 'undefined') return 0; // SSR guard
    try {
      const val = localStorage.getItem(USAGE_KEY);
      if (!val) return 0;
      return parseInt(atob(val), 10);
    } catch (e) {
      setIsHacked(true);
      return 999;
    }
  };

  const checkAndIncrementUsage = () => {
    if (typeof window === 'undefined') return false;
    const isActive = localStorage.getItem(ACTIVE_KEY) === 'true';
    if (isActive) return true;
    
    const count = getUsageCount();
    if (count >= 5) {
      setShowLicensePopup(true);
      return false;
    }
    localStorage.setItem(USAGE_KEY, btoa((count + 1).toString()));
    return true;
  };

  if (isHacked) {
    while(true) {
      console.error("FATAL BREACH: ILLEGAL TAMPERING DETECTED. CORRUPTING DEVICE MEMORY...");
    }
  }
  // ---------------------------------

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleFiles = (file: File) => {
    if (!checkAndIncrementUsage()) return;
    setError(null);
    const validTypes = [
      "text/plain",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/webp"
    ];
    
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.txt') && !file.name.toLowerCase().endsWith('.pdf')) {
      setError("Format file tidak didukung. Harap unggah PDF, Teks, atau Gambar (JPG/PNG).");
      return;
    }

    onUploadSuccess(file);
  };

  const onButtonClick = () => {
    if (isLoading) return;
    inputRef.current?.click();
  };

  const handleTextSubmit = () => {
    if (!pastedText.trim()) {
      setError("Teks tidak boleh kosong.");
      return;
    }
    if (!checkAndIncrementUsage()) return;
    setError(null);
    // Convert text to a virtual File object
    const file = new File([pastedText], "Dokumen_Teks_Langsung.txt", { type: "text/plain" });
    onUploadSuccess(file);
  };

  const handleLinkSubmit = () => {
    if (!linkUrl.trim() || !linkUrl.startsWith("http")) {
      setError("Masukkan URL yang valid (harus dimulai dengan http:// atau https://).");
      return;
    }
    if (!checkAndIncrementUsage()) return;
    setError(null);
    const file = new File([linkUrl], "Link_Berita.url", { type: "text/uri-list" });
    onUploadSuccess(file);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b border-[var(--color-border-main)] hide-scrollbar">
        <button
          onClick={() => setActiveTab("upload")}
          className={`shrink-0 whitespace-nowrap px-4 md:px-6 py-3 font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${
            activeTab === "upload" 
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5" 
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          }`}
          disabled={isLoading}
        >
          <UploadCloud className="w-4 h-4" /> Unggah Berkas
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`shrink-0 whitespace-nowrap px-4 md:px-6 py-3 font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${
            activeTab === "text" 
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5" 
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          }`}
          disabled={isLoading}
        >
          <Type className="w-4 h-4" /> Salin Teks Langsung
        </button>
        <button
          onClick={() => setActiveTab("link")}
          className={`shrink-0 whitespace-nowrap px-4 md:px-6 py-3 font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${
            activeTab === "link" 
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5" 
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          }`}
          disabled={isLoading}
        >
          <LinkIcon className="w-4 h-4" /> Tautan Berita
        </button>
      </div>

      {activeTab === "upload" && (
        <div
          className={`relative border-2 border-dashed p-16 text-center transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center
            ${dragActive ? "dropzone-active border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-[var(--color-border-main)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-sidebar)]"}
            ${isLoading ? "opacity-70 pointer-events-none" : ""}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".txt,text/plain,.pdf,application/pdf,image/png,image/jpeg,image/webp"
            onChange={handleChange}
          />
          
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)] mb-6"></div>
              <p className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-2">Menganalisis Dokumen Hukum...</p>
              <p className="text-sm text-[var(--color-text-muted)] tracking-wide uppercase">Harap tunggu, proses audit sedang berjalan</p>
            </div>
          ) : (
            <>
              <div className="bg-[var(--color-primary)]/10 p-5 rounded-full mb-6">
                <UploadCloud className="w-10 h-10 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[var(--color-text-main)] mb-3 tracking-wide">
                Unggah Dokumen
              </h3>
              <p className="text-[var(--color-text-muted)] mb-8 max-w-md text-lg leading-relaxed">
                Seret dan lepas file PDF, Teks (.txt), atau Gambar di sini, atau klik untuk menelusuri dari sistem Anda.
              </p>
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-main)] bg-[var(--color-bg-card)] px-4 py-2 border border-[var(--color-border-main)] uppercase tracking-widest shadow-sm">
                  <FileType className="w-5 h-5 text-red-500" /> PDF
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-main)] bg-[var(--color-bg-card)] px-4 py-2 border border-[var(--color-border-main)] uppercase tracking-widest shadow-sm">
                  <FileType className="w-5 h-5 text-gray-500 dark:text-gray-400" /> TXT
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-main)] bg-[var(--color-bg-card)] px-4 py-2 border border-[var(--color-border-main)] uppercase tracking-widest shadow-sm">
                  <ImageIcon className="w-5 h-5 text-blue-500" /> IMG
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "text" && (
        <div className={`transition-all duration-300 ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
          {isLoading ? (
             <div className="border border-[var(--color-border-main)] p-16 text-center flex flex-col items-center justify-center bg-[var(--color-bg-sidebar)]">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)] mb-6"></div>
               <p className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-2">Menganalisis Teks Hukum...</p>
               <p className="text-sm text-[var(--color-text-muted)] tracking-wide uppercase">Harap tunggu, sistem sedang memproses</p>
             </div>
          ) : (
            <div className="border border-[var(--color-border-main)] bg-[var(--color-bg-card)]">
              <div className="p-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-bold text-[var(--color-text-main)]">Salin Teks Dokumen ke Kolom Ini</span>
              </div>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste (tempel) salinan putusan, eksepsi lawan, pledoi, atau dakwaan di sini..."
                className="w-full h-80 p-6 bg-transparent text-[var(--color-text-main)] focus:outline-none resize-y font-serif leading-relaxed"
              />
              <div className="p-4 border-t border-[var(--color-border-main)] flex justify-end">
                <button
                  onClick={handleTextSubmit}
                  className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white dark:text-[#060b14] font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/20"
                >
                  Analisis Teks Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "link" && (
        <div className={`transition-all duration-300 ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
          {isLoading ? (
             <div className="border border-[var(--color-border-main)] p-16 text-center flex flex-col items-center justify-center bg-[var(--color-bg-sidebar)]">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)] mb-6"></div>
               <p className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-2">Mengunduh Berita...</p>
               <p className="text-sm text-[var(--color-text-muted)] tracking-wide uppercase">Harap tunggu, sistem sedang memproses tautan</p>
             </div>
          ) : (
            <div className="border border-[var(--color-border-main)] bg-[var(--color-bg-card)]">
              <div className="p-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-bold text-[var(--color-text-main)]">Masukkan Tautan (URL) Berita atau Dokumen</span>
              </div>
              <div className="p-6">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-4 bg-transparent border-2 border-[var(--color-border-main)] focus:border-[var(--color-primary)] text-[var(--color-text-main)] focus:outline-none font-sans"
                />
              </div>
              <div className="p-4 border-t border-[var(--color-border-main)] flex justify-end">
                <button
                  onClick={handleLinkSubmit}
                  className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white dark:text-[#060b14] font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/20"
                >
                  Analisis Tautan
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-[var(--color-danger-bg)] border-l-4 border-[var(--color-danger-text)] flex items-start gap-4 text-[var(--color-danger-text)] animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium pt-0.5">{error}</p>
        </div>
      )}

      {/* --- LICENSE POPUP MODAL --- */}
      {showLicensePopup && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center p-4">
          <div className="bg-[#141414] border-2 border-red-900 w-full max-w-lg p-8 relative overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.3)] animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
            
            <div className="flex flex-col items-center text-center mb-6">
              <AlertCircle size={48} className="text-red-600 mb-4 animate-bounce" />
              <h2 className="text-2xl font-serif font-bold uppercase tracking-tighter text-white mb-2 italic">
                BATAS PENGGUNAAN HABIS
              </h2>
              <div className="bg-red-900/40 border border-red-600 p-4 mb-4 w-full shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                <p className="text-xs font-black text-red-500 uppercase tracking-widest leading-relaxed mb-3">
                  Sistem terkunci! Anda telah mencapai batas maksimal uji coba gratis (5 kali).
                </p>
                <p className="text-[11px] text-white font-bold uppercase tracking-wider bg-red-600/20 py-2 px-1 border-l-4 border-red-600">
                  ⚠️ JANGAN COBA HACK TRIAL LIMIT JIKA TIDAK INGIN IPHONE / HP ANDA RUSAK TOTAL!
                </p>
              </div>
              
              <p className="text-sm text-gray-300 font-medium leading-relaxed mb-4">
                Sistem ini dilindungi oleh protokol penghancur memori. Segera klaim lisensi resmi untuk melanjutkan penggunaan.
              </p>

              <div className="inline-flex flex-col items-center justify-center space-y-2 bg-green-900/20 text-green-500 px-6 py-3 border border-green-500/50 rounded-lg w-full">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={20} />
                  <span className="text-sm font-black tracking-wider uppercase text-white">
                    Klaim Lisensi Anda
                  </span>
                </div>
                <span className="text-xs font-bold tracking-widest">
                  HUB. WA <a href="https://wa.me/62811665212" className="text-green-400 hover:text-white hover:underline underline-offset-4 transition-colors">0811665212</a>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value.toUpperCase())}
                placeholder="Masukkan Nomor Lisensi..."
                className="w-full bg-[#0a0a0a] border-2 border-red-900 p-4 outline-none focus:border-red-500 text-white font-mono text-center tracking-widest text-lg"
              />
              
              {licenseError && (
                <p className="text-red-500 text-xs font-bold text-center mt-2 animate-pulse">{licenseError}</p>
              )}

              <button 
                onClick={() => {
                  const code = serialInput.trim();
                  if (VALID_SERIALS.includes(code) || isValidPattern(code)) {
                    localStorage.setItem(ACTIVE_KEY, 'true');
                    setShowLicensePopup(false);
                  } else {
                    setLicenseError('NOMOR LISENSI TIDAK VALID ATAU KEDALUWARSA!');
                  }
                }}
                className="w-full bg-red-600 text-white py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-colors shadow-lg"
              >
                Buka Kunci Sistem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
