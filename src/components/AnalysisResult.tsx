"use client";

import { 
  AlertTriangle, 
  Gavel, 
  FileSearch, 
  CheckCircle2, 
  Scale, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  Award 
} from "lucide-react";

export interface AIAnalysisData {
  fileName: string;
  category: string;
  // A. RINGKASAN PUTUSAN
  ringkasan: {
    jenisPerkara: string;
    nomorPerkara: string;
    tingkatPengadilan: string;
    paraPihak: string;
    objekSengketa: string;
    pokokPerkara: string;
  };
  // B. DASAR HUKUM YANG DIGUNAKAN
  dasarHukum: string[];
  // C. TEMUAN AUDIT
  temuanAudit: {
    hierarki: string;
    logika: string;
    pembuktian: string;
    prosedur: string;
  };
  // D. POTENSI KELEMAHAN PUTUSAN
  kelemahan: string[];
  // E. POTENSI KEKUATAN PUTUSAN
  kekuatan: string[];
  // F. ANALISA KONSTITUSIONAL
  analisaKonstitusional: {
    kepastianHukum: string;
    keadilan: string;
    kemanfaatan: string;
  };
  // G. KESIMPULAN AKHIR
  kesimpulan: string;
  // H. SKOR INTEGRITAS PUTUSAN (0-100)
  skorIntegritas: number;
}

interface AnalysisResultProps {
  data: AIAnalysisData | null;
  onReset: () => void;
}

export default function AnalysisResult({ data, onReset }: AnalysisResultProps) {
  if (!data) return null;

  // Determine score color classes
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[var(--color-success-text)] border-[var(--color-success-text)] bg-[var(--color-success-bg)]";
    if (score >= 60) return "text-[var(--color-warning-text)] border-[var(--color-warning-text)] bg-[var(--color-warning-bg)]";
    return "text-[var(--color-danger-text)] border-[var(--color-danger-text)] bg-[var(--color-danger-bg)]";
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="bg-[var(--color-primary)] p-8 text-white dark:text-[#060b14] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-serif font-bold flex items-center gap-3 tracking-tight">
            <Scale className="w-8 h-8" />
            Laporan Audit Putusan
          </h2>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium uppercase tracking-widest opacity-90">
            <span>Dokumen: <span className="font-bold">{data.fileName}</span></span>
            <span className="opacity-50">|</span>
            <span>Kategori: <span className="font-bold">{data.category}</span></span>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white dark:text-[#060b14] dark:border-[#060b14]/20 border border-white/20 transition-colors text-sm font-bold uppercase tracking-widest whitespace-nowrap"
        >
          Unggah Dokumen Baru
        </button>
      </div>

      <div className="p-4 md:p-8 lg:p-12 space-y-12">
        
        {/* A. RINGKASAN PUTUSAN */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">A</span>
            Ringkasan Putusan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--color-border-main)] text-sm">
            <div className="p-4 border-b md:border-r border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Jenis Perkara</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.jenisPerkara}</span></div>
            <div className="p-4 border-b border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Nomor Perkara</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.nomorPerkara}</span></div>
            <div className="p-4 border-b md:border-r border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Tingkat Pengadilan</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.tingkatPengadilan}</span></div>
            <div className="p-4 border-b border-[var(--color-border-main)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Para Pihak</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.paraPihak}</span></div>
            <div className="md:col-span-2 p-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Objek Sengketa</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.objekSengketa}</span></div>
            <div className="md:col-span-2 p-4 bg-[var(--color-bg-sidebar)]"><span className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs block mb-1">Pokok Dakwaan / Gugatan</span><span className="font-bold text-[var(--color-text-main)] text-base">{data.ringkasan.pokokPerkara}</span></div>
          </div>
        </section>

        {/* B. DASAR HUKUM */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">B</span>
            Dasar Hukum yang Digunakan
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.dasarHukum.map((hukum, idx) => (
              <span key={idx} className="px-4 py-2 bg-[var(--color-bg-sidebar)] text-[var(--color-text-main)] border border-[var(--color-border-main)] text-sm font-bold uppercase tracking-wide">
                {hukum}
              </span>
            ))}
          </div>
        </section>

        {/* C. TEMUAN AUDIT */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">C</span>
            Temuan Audit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] hover:border-[var(--color-primary)] transition-colors">
              <h4 className="font-serif font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-[var(--color-primary)]" /> Hierarki Hukum</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.temuanAudit.hierarki}</p>
            </div>
            <div className="p-6 border border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] hover:border-[var(--color-primary)] transition-colors">
              <h4 className="font-serif font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-[var(--color-warning-text)]" /> Logika Pertimbangan</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.temuanAudit.logika}</p>
            </div>
            <div className="p-6 border border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] hover:border-[var(--color-primary)] transition-colors">
              <h4 className="font-serif font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2 mb-3"><FileSearch className="w-5 h-5 text-[var(--color-success-text)]" /> Pembuktian</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.temuanAudit.pembuktian}</p>
            </div>
            <div className="p-6 border border-[var(--color-border-main)] bg-[var(--color-bg-sidebar)] hover:border-[var(--color-primary)] transition-colors">
              <h4 className="font-serif font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2 mb-3"><Gavel className="w-5 h-5 text-[#8b5cf6]" /> Prosedur</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.temuanAudit.prosedur}</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          {/* D. KELEMAHAN */}
          <section>
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-danger-text)] text-white w-8 h-8 flex items-center justify-center font-sans text-sm">D</span>
              Potensi Kelemahan
            </h3>
            <ul className="space-y-4">
              {data.kelemahan.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 bg-[var(--color-danger-bg)] p-5 border-l-4 border-[var(--color-danger-text)]">
                  <ShieldAlert className="w-6 h-6 text-[var(--color-danger-text)] shrink-0 mt-0.5" />
                  <span className="text-[var(--color-danger-text)] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* E. KEKUATAN */}
          <section>
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-success-text)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">E</span>
              Potensi Kekuatan
            </h3>
            <ul className="space-y-4">
              {data.kekuatan.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 bg-[var(--color-success-bg)] p-5 border-l-4 border-[var(--color-success-text)]">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-success-text)] shrink-0 mt-0.5" />
                  <span className="text-[var(--color-success-text)] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* F. ANALISA KONSTITUSIONAL */}
        <section>
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
            <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">F</span>
            Analisa Konstitusional
          </h3>
          <div className="bg-[var(--color-bg-sidebar)] p-8 border border-[var(--color-border-main)] grid md:grid-cols-3 gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-primary)]"></div>
            <div>
              <h5 className="font-serif font-bold text-[var(--color-text-main)] text-lg mb-3">Kepastian Hukum</h5>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.analisaKonstitusional.kepastianHukum}</p>
            </div>
            <div>
              <h5 className="font-serif font-bold text-[var(--color-text-main)] text-lg mb-3">Keadilan</h5>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.analisaKonstitusional.keadilan}</p>
            </div>
            <div>
              <h5 className="font-serif font-bold text-[var(--color-text-main)] text-lg mb-3">Kemanfaatan</h5>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{data.analisaKonstitusional.kemanfaatan}</p>
            </div>
          </div>
        </section>

        {/* G. KESIMPULAN AKHIR & H. SKOR */}
        <div className="grid md:grid-cols-3 gap-10">
          <section className="md:col-span-2">
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">G</span>
              Opini Hukum & Kesimpulan Akhir
            </h3>
            <div className="bg-[var(--color-bg-sidebar)] p-8 border border-[var(--color-border-main)] h-full">
              <p className="text-[var(--color-text-main)] leading-relaxed whitespace-pre-wrap text-lg font-serif">
                {data.kesimpulan}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3 border-b border-[var(--color-border-main)] pb-3">
              <span className="bg-[var(--color-primary)] text-white dark:text-[#060b14] w-8 h-8 flex items-center justify-center font-sans text-sm">H</span>
              Skor Integritas
            </h3>
            <div className={`p-10 border-4 flex flex-col items-center justify-center h-full transition-colors ${getScoreColor(data.skorIntegritas)}`}>
              <Award className="w-16 h-16 mb-4" />
              <div className="text-7xl font-serif font-black mb-2">{data.skorIntegritas}</div>
              <p className="font-bold text-sm uppercase tracking-widest opacity-90">Dari 100 Poin</p>
            </div>
          </section>
        </div>

        {/* I. DISCLAIMER */}
        <section className="mt-12 bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <h4 className="flex items-center gap-2 font-bold text-yellow-600 dark:text-yellow-500 mb-2">
            <AlertTriangle className="w-5 h-5" />
            DISCLAIMER (SANGGAHAN HUKUM)
          </h4>
          <p className="text-sm text-[var(--color-text-main)] opacity-80 leading-relaxed text-justify font-serif">
            Laporan analisis ini diproduksi secara otomatis oleh sistem Kecerdasan Buatan (Artificial Intelligence) berdasarkan algoritma pencocokan pola dan parameter hukum positif. Hasil audit ini semata-mata bersifat <strong>referensial, edukatif, dan sebagai opini akademis sekunder (second opinion)</strong>. Laporan ini <strong>BUKAN</strong> merupakan putusan/justifikasi hukum yang mengikat, bukan alat bukti yang sah di pengadilan, dan bukan pengganti dari nasihat hukum profesional (Advokat/Konsultan Hukum). Penggunaan hasil analisis ini sepenuhnya menjadi risiko dan tanggung jawab pengguna.
          </p>
        </section>

      </div>
    </div>
  );
}
