"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileType, AlertCircle, Type, FileText, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

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
    </div>
  );
}
