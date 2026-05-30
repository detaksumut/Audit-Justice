import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, documentText, userApiKey } = await req.json();

    if (!userApiKey) {
      return NextResponse.json({ error: "API Key tidak ditemukan. Silakan masukkan di pengaturan." }, { status: 400 });
    }

    const systemInstruction = `Anda adalah Asisten AI Hukum tingkat tinggi. Anda sedang berdiskusi dengan pengguna mengenai sebuah dokumen. Berikut adalah teks dari dokumen tersebut:\n\n---\n${documentText}\n---\n\nJawablah pertanyaan pengguna berdasarkan dokumen di atas dengan profesional, akurat, dan merujuk pada hukum di Indonesia yang berlaku. Jangan menjawab hal-hal yang tidak relevan dengan konteks hukum atau dokumen tersebut.`;

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user', // Gemini accepts 'user' and 'model'
      parts: [{ text: msg.content }]
    }));

    const payload: any = {
      contents,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }]
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error?.message || "Gagal memanggil API Gemini" }, { status: response.status });
    }

    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      return NextResponse.json({ error: "Tidak ada balasan teks dari AI." }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
