"use client";

import { 
  AlertTriangle, 
  Gavel, 
  FileSearch, 
  CheckCircle2, 
  Swords, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  FileText
} from "lucide-react";

export interface AILitigationData {
  fileName: string;
  category: string;
  // A. IDENTIFIKASI DOKUMEN LAWAN
  identifikasi: {
    jenisDokumen: string; // e.g. Eksepsi Tergugat, Replik Penggugat
    pihakLawan: string;
    fokusUtama: string;
  };
  // B. PEMETAAN ARGUMEN LAWAN
  argumenLawan: string[];
  // C. CELAH FATAL LAWAN (VULNERABILITY)
  celahLawan: Array<{ judul: string; deskripsi: string; }>;
  // D. AMUNISI DASAR HUKUM KITA
  dasarHukumKita: string[];
  // E. YURISPRUDENSI PENDUKUNG
  yurisprudensi: string[];
  // F. DRAF BANTAHAN (SIAP SALIN/BACA)
  drafBantahan: string;
}

interface LitigationAssistantProps {
  data: AILitigationData | null;
  onReset: () => void;
}

export default function LitigationAssistant({ data, onReset }: LitigationAssistantProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="bg-[var(--color-primary)] p-8 text-white dark:text-[#060b14] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-serif font-bold flex items-center gap-3 tracking-tight">
            <Swords className="w-8 h-8" />
            Draf Asisten Persidangan
          </h2>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium uppercase tracking-widest opacity-90">
            <span>Berkas Lawan: <span className="font-bold">{data.fileName}</span></span>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white dark:text-[#060b14] dark:border-[#060b14]/20 border border-white/20 transition-colors text-sm font-bold uppercase tracking-widest whitespace-nowrap"
        >
          Unggah Berkas Baru
        </button>
      </div>

      <div className="p-4 md:p-8 lg:p-12 space-y-12">
        
        {/* A. IDENTIFIKASI */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--color-border-main)] text-sm">
            <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Jenis Dokumen</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.identifikasi.jenisDokumen}</span></div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Pihak Lawan</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.identifikasi.pihakLawan}</span></div>
            <div className="p-4 border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Fokus Serangan Lawan</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.identifikasi.fokusUtama}</span></div>
          </div>
        </section>

        {/* B. PEMETAAN ARGUMEN LAWAN */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-danger-text)] text-white w-8 h-8 flex items-center justify-center font-sans text-sm">1</span>
            Ringkasan Argumen Lawan
          </h3>
          <ul className="space-y-4">
            {data.argumenLawan.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 bg-[var(--color-danger-bg)] p-5 border-l-4 border-[var(--color-danger-text)]">
                <ShieldAlert className="w-6 h-6 text-[var(--color-danger-text)] shrink-0 mt-0.5" />
                <span className="text-[var(--color-danger-text)] font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* C. CELAH FATAL LAWAN */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">2</span>
            Celah & Kelemahan Argumen Lawan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.celahLawan.map((celah, idx) => (
              <div key={idx} className="p-6 border border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] hover:border-[var(--color-primary)] transition-colors">
                <h4 className="font-serif font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-[var(--color-warning-text)]" /> {celah.judul}</h4>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{celah.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          {/* D. AMUNISI DASAR HUKUM */}
          <section>
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-success-text)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">3</span>
              Dasar Hukum Bantahan Kita
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.dasarHukumKita.map((hukum, idx) => (
                <span key={idx} className="px-4 py-2 bg-[var(--color-bg-sidebar)] text-[var(--color-text-main)] border border-[var(--color-border-main)] text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                  {hukum}
                </span>
              ))}
            </div>
          </section>

          {/* E. YURISPRUDENSI */}
          <section>
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-success-text)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">4</span>
              Yurisprudensi Terkait
            </h3>
            <ul className="space-y-3">
              {data.yurisprudensi.map((yuris, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-[var(--color-bg-sidebar)] p-4 border border-[var(--color-border-main)]">
                  <Gavel className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span className="text-[var(--color-text-main)] font-medium leading-relaxed text-sm">{yuris}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* F. DRAF BANTAHAN */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">5</span>
            Draf Naskah Hukum (Jawaban / Replik / Duplik)
          </h3>
          <div className="bg-[var(--color-bg-sidebar)] p-8 border border-[var(--color-border-main)] relative">
            <div className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] cursor-pointer transition-colors" title="Salin Teks">
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-[var(--color-text-main)] leading-loose whitespace-pre-wrap text-lg font-serif">
              {data.drafBantahan}
            </p>
          </div>
        </section>

        {/* G. DISCLAIMER */}
        <section className="mt-12 bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <h4 className="flex items-center gap-2 font-bold text-yellow-600 dark:text-yellow-500 mb-2">
            <AlertTriangle className="w-5 h-5" />
            DISCLAIMER (SANGGAHAN HUKUM)
          </h4>
          <p className="text-sm text-[var(--color-text-main)] opacity-80 leading-relaxed text-justify font-serif">
            Draf ini diproduksi secara otomatis oleh sistem Kecerdasan Buatan (Artificial Intelligence) untuk keperluan asistensi litigasi dan *brainstorming* hukum. Hasil ini bersifat <strong>referensial semata</strong> dan BUKAN pengganti kecakapan hukum advokat/pengacara yang menangani perkara secara langsung. Pengguna wajib memverifikasi silang (cross-check) kesahihan dasar hukum dan yurisprudensi sebelum memasukkannya ke dalam dokumen resmi pengadilan (Replik/Duplik/Pledoi).
          </p>
        </section>

      </div>
    </div>
  );
}
