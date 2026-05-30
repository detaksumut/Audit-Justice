"use client";

import { useState, useEffect } from "react";
import { getArchives, deleteArchive, clearArchives } from "@/utils/archive";
import MarkdownReport from "@/components/MarkdownReport";
import { Trash2, AlertTriangle, FileText, ChevronRight } from "lucide-react";

export default function ArsipPage() {
  const [archives, setArchives] = useState<any[]>([]);
  const [selectedArchive, setSelectedArchive] = useState<any | null>(null);

  useEffect(() => {
    setArchives(getArchives());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus arsip ini?")) {
      deleteArchive(id);
      setArchives(getArchives());
      if (selectedArchive?.id === id) {
        setSelectedArchive(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm("PERINGATAN: Semua arsip akan dihapus permanen. Lanjutkan?")) {
      clearArchives();
      setArchives([]);
      setSelectedArchive(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[var(--color-text-main)] mb-2 tracking-tight">Arsip Laporan</h1>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">
            Akses kembali hasil audit hukum yang telah Anda lakukan sebelumnya.
          </p>
        </div>
        
        {archives.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border border-[var(--color-danger-text)] font-bold text-sm tracking-wider uppercase hover:bg-red-900/20 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" /> Hapus Semua
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Panel */}
        <div className="lg:col-span-1 border border-[var(--color-border-main)] bg-[var(--color-bg-card)] max-h-[800px] overflow-y-auto">
          <div className="p-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] sticky top-0 z-10">
            <h2 className="font-serif font-bold text-[var(--color-text-main)] text-xl">Daftar Arsip</h2>
          </div>
          
          {archives.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-text-muted)] flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 mb-4 opacity-20" />
              <p>Belum ada laporan yang diarsipkan.</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border-main)]">
              {archives.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedArchive(item)}
                  className={`p-4 cursor-pointer hover:bg-[var(--color-primary)]/5 transition-colors relative group ${selectedArchive?.id === item.id ? 'bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)]' : 'border-l-4 border-transparent'}`}
                >
                  <div className="pr-8">
                    <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">
                      {new Date(item.timestamp).toLocaleString('id-ID')}
                    </p>
                    <h3 className="font-bold text-[var(--color-text-main)] mb-1 uppercase tracking-wider text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] inline-block"></span>
                      {item.type}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                      {item.content.substring(0, 80).replace(/#/g, '')}...
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-danger-text)] hover:bg-[var(--color-danger-bg)] rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Hapus arsip ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Panel */}
        <div className="lg:col-span-2 border border-[var(--color-border-main)] bg-[var(--color-bg-card)]">
          {selectedArchive ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] flex justify-between items-center">
                <div>
                  <h2 className="font-serif font-bold text-[var(--color-text-main)] text-xl">Laporan Lengkap</h2>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono">ID: {selectedArchive.id} | {new Date(selectedArchive.timestamp).toLocaleString('id-ID')}</p>
                </div>
                <div className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest border border-[var(--color-primary)]/30">
                  {selectedArchive.type}
                </div>
              </div>
              <div className="p-0 overflow-y-auto max-h-[720px] bg-white dark:bg-[#060b14]">
                <MarkdownReport content={selectedArchive.content} fileName={selectedArchive.fileName} onReset={() => {}} />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-[var(--color-text-muted)] p-8 text-center">
              <FileText className="w-16 h-16 mb-4 opacity-10" />
              <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-2">Pilih Arsip</h3>
              <p>Pilih salah satu arsip dari daftar di sebelah kiri untuk membaca laporan lengkapnya.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
