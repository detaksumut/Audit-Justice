import { ShieldAlert, CheckCircle, FileText, Activity } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { name: "Total Putusan Diaudit", value: "142", icon: FileText },
    { name: "Putusan Bermasalah", value: "28", icon: ShieldAlert },
    { name: "Sesuai Prosedur", value: "114", icon: CheckCircle },
    { name: "Akurasi AI", value: "94%", icon: Activity },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-[var(--color-border-main)] pb-6">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)] mb-3 tracking-tight">Audit Justice: Presisi Hukum, Integritas Peradilan</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Platform analisis putusan berbasis kecerdasan buatan untuk mengawal kepastian hukum dan konstitusi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-0 rounded-none relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)] z-10"></div>
          <img 
            src="/dunia_peradilan.png" 
            alt="Dunia Peradilan" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h2 className="text-3xl font-serif font-bold text-[var(--color-primary)] mb-2 drop-shadow-lg">Simbol Keadilan</h2>
            <p className="text-[var(--color-text-main)] font-medium text-sm tracking-wide opacity-90 drop-shadow">Menegakkan kebenaran dengan presisi dan integritas tanpa kompromi.</p>
          </div>
        </div>

        <div className="bg-[var(--color-primary)] p-8 rounded-none shadow-xl text-white dark:text-[#060b14] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -bottom-10 -right-10 opacity-10 dark:opacity-20">
            <ShieldAlert className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Mengapa Audit Justice?</h2>
            <div className="w-12 h-1 bg-white dark:bg-[#060b14] mb-6"></div>
            <p className="mb-8 leading-relaxed font-medium text-lg opacity-90">
              Sistem ini dirancang untuk mendeteksi anomali, pelanggaran kode etik, dan kekeliruan penerapan hukum dalam putusan pengadilan secara otomatis dan objektif menggunakan teknologi LLM terkini.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                <span className="font-medium text-lg">Analisis instan dalam hitungan detik</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                <span className="font-medium text-lg">Identifikasi presisi hierarki perundang-undangan</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                <span className="font-medium text-lg">Format output setara dengan firma hukum global</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-none border-t-4 border-t-[var(--color-primary)] flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded bg-[var(--color-primary)]/10">
                <Icon className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{stat.name}</p>
                <h3 className="text-3xl font-serif font-bold text-[var(--color-text-main)]">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* DISCLAIMER */}
      <section className="mt-8 bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h4 className="flex items-center gap-2 font-bold text-yellow-600 dark:text-yellow-500 mb-2">
          <ShieldAlert className="w-5 h-5" />
          DISCLAIMER (SANGGAHAN HUKUM)
        </h4>
        <p className="text-sm text-[var(--color-text-main)] opacity-80 leading-relaxed text-justify font-serif">
          Laporan analisis ini diproduksi secara otomatis oleh sistem Kecerdasan Buatan (Artificial Intelligence) berdasarkan algoritma pencocokan pola dan parameter hukum positif. Hasil audit ini semata-mata bersifat <strong>referensial, edukatif, dan sebagai opini akademis sekunder (second opinion)</strong>. Laporan ini <strong>BUKAN</strong> merupakan putusan/justifikasi hukum yang mengikat, bukan alat bukti yang sah di pengadilan, dan bukan pengganti dari nasihat hukum profesional (Advokat/Konsultan Hukum). Penggunaan hasil analisis ini sepenuhnya menjadi risiko dan tanggung jawab pengguna.
        </p>
      </section>

    </div>
  );
}
