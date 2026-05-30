export async function generateContent(
  apiKey: string,
  model: string,
  systemInstruction: string,
  prompt: string,
  isJson: boolean = false,
  base64Image?: string,
  mimeType?: string
) {
  if (!apiKey || apiKey === 'TEST' || apiKey.includes('masukkan_') || apiKey.includes('your_')) {
    // MOCK MODE FOR TESTING
    console.log('Mode Uji Coba LLM (Mock) Aktif');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    if (isJson) {
      return JSON.stringify({
        "fileName": "Berkas Simulasi",
        "category": "Pidana",
        "identifikasi": {
          "jenisDokumen": "Eksepsi Simulasi",
          "pihakLawan": "Tergugat/Terdakwa",
          "fokusUtama": "Bantahan Kompetensi Absolut"
        },
        "argumenLawan": ["Pengadilan tidak berwenang mengadili", "Dakwaan kabur (Obscuur Libel)"],
        "celahLawan": [
          { "judul": "Kekeliruan Yurisdiksi", "deskripsi": "Lawan salah mengartikan batas wewenang pengadilan." }
        ],
        "dasarHukumKita": ["Pasal 156 KUHAP", "Pasal 143 KUHAP"],
        "yurisprudensi": ["Putusan MA No. 123/Pid/2020"],
        "drafBantahan": "Ini adalah draf bantahan simulasi karena API Key belum dimasukkan. Majelis Hakim yang terhormat..."
      });
    }

    return `# Laporan Audit Simulasi AI\n\nIni adalah **Laporan Simulasi** karena Kunci API (API Key) belum dimasukkan.\n\n## 1. Ringkasan Eksekutif\nDokumen yang Anda unggah tampak memiliki beberapa celah hukum yang dapat dieksploitasi.\n\n## 2. Potensi Pelanggaran\n- **Risiko Administratif**: Tinggi\n- **Konflik Kepentingan**: Ditemukan\n\n> *Silakan masukkan API Key Gemini Anda di menu Pengaturan untuk mendapatkan analisis yang sesungguhnya dari dokumen Anda.*`;
  }

  const parts: any[] = [{ text: prompt }];

  if (base64Image && mimeType) {
    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }

  const payload: any = {
    contents: [
      {
        role: "user",
        parts: parts
      }
    ]
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      role: "system",
      parts: [{ text: systemInstruction }]
    };
  }

  if (isJson) {
    payload.generationConfig = { responseMimeType: "application/json" };
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    let errorMsg = result.error?.message || "Gagal memanggil API Gemini";
    throw new Error(errorMsg);
  }

  const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error("Tidak ada balasan teks dari AI.");
  }

  return textOutput;
}
