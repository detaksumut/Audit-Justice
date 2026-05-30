"use client";

import { useState } from "react";
import LitigationAssistant, { AILitigationData } from "@/components/LitigationAssistant";
import UploadDropzone from "@/components/UploadDropzone";
import { Swords } from "lucide-react";

export default function PersidanganPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [litigasiData, setLitigasiData] = useState<AILitigationData | null>(null);

  const handleUploadSuccess = async (file: File) => {
    setIsLoading(true);
    
    try {
      const localApiKey = localStorage.getItem("gemini_api_key") || "";
      let textToAnalyze = "";
      let base64Image = "";
      let mimeType = "";

      if (file.type.startsWith("image/")) {
        mimeType = file.type;
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
        textToAnalyze = `[Gambar Berkas Terlampir: ${file.name}]`;
      } else if (file.type === "text/uri-list" || file.name.endsWith(".url")) {
        const text = await file.text();
        textToAnalyze = `URL SUMBER: ${text}`;
      } else {
        const { extractTextFromFile } = await import("@/utils/fileParser");
        textToAnalyze = await extractTextFromFile(file);
      }

      const { generateContent } = await import("@/utils/aiClient");
      const { PROMPT_LITIGASI } = await import("@/utils/aiPrompts");

      const resultJsonStr = await generateContent(
        localApiKey,
        "gemini-2.5-flash",
        PROMPT_LITIGASI,
        `Tolong analisis dokumen ini dan ekstrak sesuai struktur JSON:\n\n${textToAnalyze}`,
        true,
        base64Image || undefined,
        mimeType || undefined
      );

      let parsedData: any = {};
      try {
        parsedData = JSON.parse(resultJsonStr);
      } catch (e) {
        throw new Error("AI tidak mengembalikan format JSON yang valid.");
      }

      const dataWithFileName = {
        ...parsedData,
        fileName: file.name
      };
      
      setLitigasiData(dataWithFileName);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setLitigasiData(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
            <Swords className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-[var(--color-text-main)] mb-2 tracking-tight">Asisten Litigasi AI</h1>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">
              Unggah gugatan/dakwaan/eksepsi lawan, dan AI akan otomatis menemukan celah hukumnya beserta draf bantahan (Replik/Duplik).
            </p>
          </div>
        </div>
      </div>
      
      {!litigasiData ? (
        <div className="mt-8 animate-in zoom-in-95 duration-500">
           <UploadDropzone onUploadSuccess={handleUploadSuccess} isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-8">
          <LitigationAssistant data={litigasiData} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
