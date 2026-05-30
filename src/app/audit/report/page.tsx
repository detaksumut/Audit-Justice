"use client";

import React from 'react';

export default function AuditReportPage() {
  return (
    <div className="animate-fade-in container" style={{ maxWidth: '900px', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--brand-navy)' }}>
            Laporan Audit Independen
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Dihasilkan oleh AI Pakar Hukum Audit Justice
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Nomor Perkara</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>145/Pid.B/2026/PN.Jkt</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--brand-gold)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Ringkasan Eksekutif & Skor
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Skor Objektivitas Putusan</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--warning)', lineHeight: 1 }}>65%</div>
            <div style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--danger)' }}>Terindikasi Bias</div>
          </div>
          <div>
            <p style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Berdasarkan analisis silang terhadap dokumen putusan, sistem menemukan inkonsistensi yang signifikan antara pertimbangan fakta dengan penerapan hukum positif. Selain itu, terdapat cacat logika dalam menyimpulkan unsur *mens rea* (niat jahat) terdakwa.
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
              <li><strong>Cacat Prosedural:</strong> 1 Temuan Kritis (Pelanggaran Pasal 184 KUHAP)</li>
              <li><strong>Logika Hukum:</strong> Premis tidak koheren dengan konklusi</li>
              <li><strong>Asas Filosofis:</strong> Kurang memenuhi asas *kemanfaatan*</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Lapis 1 */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
              width: '28px', height: '28px', backgroundColor: 'var(--brand-navy)', color: 'white', 
              borderRadius: '50%', fontSize: '0.875rem' 
            }}>1</span>
            Analisis Hukum Positif (KUHAP & KUHP)
          </h3>
          <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderLeft: '4px solid var(--danger)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#991b1b' }}>Temuan Kritis: Alat Bukti Tidak Sah</h4>
            <p style={{ fontSize: '0.95rem', color: '#7f1d1d' }}>
              Hakim menggunakan keterangan saksi yang *de auditu* (mendengar dari orang lain) sebagai alat bukti utama. Hal ini secara tegas melanggar ketentuan Pasal 185 ayat (1) KUHAP. Keterangan tersebut seharusnya dikesampingkan dan tidak dapat dinilai sebagai alat bukti yang sah.
            </p>
          </div>
        </div>

        {/* Lapis 2 */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
              width: '28px', height: '28px', backgroundColor: 'var(--brand-navy)', color: 'white', 
              borderRadius: '50%', fontSize: '0.875rem' 
            }}>2</span>
            Analisis Logika Hukum (Ratio Decidendi)
          </h3>
          <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderLeft: '4px solid var(--warning)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#92400e' }}>Cacat Silogisme (Fallacy)</h4>
            <p style={{ fontSize: '0.95rem', color: '#78350f' }}>
              Pertimbangan hukum (Ratio Decidendi) di halaman 45 meloncat pada kesimpulan bahwa karena terdakwa berada di lokasi kejadian, maka terdakwa berpartisipasi dalam tindak pidana. Premis mayor dan minor tidak terhubung dengan logis (<em>Non-sequitur</em>). Hakim gagal membuktikan kausalitas langsung.
            </p>
          </div>
        </div>

        {/* Lapis 3 */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
              width: '28px', height: '28px', backgroundColor: 'var(--brand-navy)', color: 'white', 
              borderRadius: '50%', fontSize: '0.875rem' 
            }}>3</span>
            Analisis Filosofi Hukum & Norma
          </h3>
          <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderLeft: '4px solid var(--success)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#166534' }}>Asas Kepastian vs Keadilan</h4>
            <p style={{ fontSize: '0.95rem', color: '#14532d' }}>
              Meskipun secara formal putusan cenderung bias, secara substantif vonis denda yang dijatuhkan (sebagai alternatif kurungan) telah selaras dengan norma kemanfaatan (Restorative Justice) dan meminimalisir mudharat, mengingat terdakwa adalah tulang punggung keluarga tunggal (pendekatan maqashid syariah/kemanusiaan).
            </p>
          </div>
        </div>

        {/* Putusan Ideal */}
        <div className="card" style={{ backgroundColor: 'var(--brand-navy)', color: 'white', marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--brand-gold)' }}>
            Rekomendasi Putusan Ideal (Obyektif)
          </h3>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#e2e8f0' }}>
            Berdasarkan eliminasi alat bukti yang cacat hukum (Lapis 1) dan perbaikan logika kausalitas (Lapis 2), Terdakwa seharusnya dituntut dengan pasal subsider (Kelalaian) alih-alih pasal primer (Kesengajaan), atau berhak mendapatkan <strong>Vonis Bebas (Vrijspraak)</strong> dari dakwaan primer karena ketidakcukupan alat bukti yang sah sesuai asas <em>In Dubio Pro Reo</em>.
          </p>
        </div>

      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a href="/audit" className="btn btn-gold" style={{ marginRight: '1rem' }}>Audit Kasus Lain</a>
        <a href="/" className="btn" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>Kembali ke Dashboard</a>
      </div>
    </div>
  );
}
