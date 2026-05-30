export async function generateContent(
  apiKey: string,
  model: string,
  systemInstruction: string,
  prompt: string,
  isJson: boolean = false,
  base64Image?: string,
  mimeType?: string
) {
  if (!apiKey || apiKey.includes('masukkan_') || apiKey.includes('your_')) {
    throw new Error("Kunci API tidak valid. Silakan masukkan Kunci API Google Gemini yang benar di menu Pengaturan.");
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
