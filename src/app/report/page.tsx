"use client";

import AnalysisResult, { AIAnalysisData } from "@/components/AnalysisResult";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReportPage() {
  // Mock data for the report view
  const mockData: AIAnalysisData = {
    fileName: "Putusan_Pidana_No_45_Pid_B_2026.pdf",
    category: "pidana",
    ringkasan: {
      jenisPerkara: "Tindak Pidana Penipuan",
      nomorPerkara: "45/Pid.B/2026/PN.Jkt",
      tingkatPengadilan: "Pengadilan Negeri (Tingkat Pertama)",
      paraPihak: "Penuntut Umum vs Budi Santoso",
      objekSengketa: "Dugaan penipuan investasi bodong",
      pokokPerkara: "Dakwaan Pasal 378 KUHP"
    },
    dasarHukum: ["Pasal 378 KUHP", "Pasal 183 KUHAP", "UU No. 48 Tahun 2009"],
    temuanAudit: {
      hierarki: "Putusan tidak bertentangan dengan hierarki perundang-undangan.",
      logika: "Hakim menyatakan unsur terpenuhi berdasarkan asumsi.",
      pembuktian: "Hanya terdapat satu alat bukti saksi korban. Melanggar syarat minimum pembuktian.",
      prosedur: "Hakim mengabaikan permohonan saksi ahli."
    },
    kelemahan: [
      "Pelanggaran Pasal 183 KUHAP (asas unus testis nullus testis).",
      "Pertimbangan hakim melompat dari pemaparan kronologi langsung menuju kesimpulan."
    ],
    kekuatan: [
      "Identifikasi identitas terdakwa sesuai prosedur.",
    ],
    analisaKonstitusional: {
      kepastianHukum: "Rendah. Kegagalan memenuhi standar pembuktian.",
      keadilan: "Rendah. Hak terdakwa diabaikan.",
      kemanfaatan: "Sedang. Mencederai proses penegakan hukum."
    },
    kesimpulan: "Berdasarkan telaah kritis terhadap Putusan Pengadilan Negeri Nomor 45/Pid.B/2026/PN.Jkt, dapat disimpulkan bahwa majelis hakim telah melakukan kekeliruan yang cukup fatal dalam mengkonstruksikan pembuktian unsur pasal (error in judicando). \n\nSesuai dengan ketentuan Pasal 183 KUHAP, asas 'Unus Testis Nullus Testis' mensyaratkan bahwa hakim tidak boleh menjatuhkan pidana kecuali dengan sekurang-kurangnya dua alat bukti yang sah. Dalam perkara a quo, hakim secara eksplisit mendasarkan keyakinannya hanya pada kesaksian tunggal korban yang tidak didukung oleh petunjuk, surat, maupun kesaksian lainnya. \n\nHal ini bukan sekadar cacat administratif, melainkan pelanggaran serius terhadap hak asasi terdakwa untuk mendapatkan peradilan yang adil (due process of law). Opini hukum saya sebagai auditor independen adalah: Putusan ini cacat hukum secara formil dan materiil. Keputusan pemidanaan yang dijatuhkan sangat rentan untuk dibatalkan di tingkat Banding maupun Kasasi karena bertentangan secara langsung dengan hukum positif yang imperatif.",
    skorIntegritas: 45
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-medium mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>
        <h1 className="text-4xl font-serif font-bold text-[var(--color-text-main)] mb-2 tracking-tight">Arsip Laporan Audit</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Melihat kembali hasil audit keputusan pengadilan yang telah diproses sebelumnya.</p>
      </div>

      <AnalysisResult data={mockData} onReset={() => {}} />
    </div>
  );
}
