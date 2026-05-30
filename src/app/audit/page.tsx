"use client";

import { useState } from "react";
import UploadDropzone from "@/components/UploadDropzone";
import MarkdownReport from "@/components/MarkdownReport";
import { saveArchive } from "@/utils/archive";
import { Layers } from "lucide-react";

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [markdownData, setMarkdownData] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);
  const [isMockResult, setIsMockResult] = useState<boolean>(false);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [currentArchiveId, setCurrentArchiveId] = useState<string | null>(null);

  const handleUploadSuccess = async (file: File) => {
    setIsLoading(true);
    setCurrentFileName(file.name);
    
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
      
      setRawText(textToAnalyze);

      const { generateContent } = await import("@/utils/aiClient");
      const { PROMPT_UMUM } = await import("@/utils/aiPrompts");

      const resultText = await generateContent(
        localApiKey,
        "gemini-2.5-flash",
        PROMPT_UMUM,
        `Tolong analisis dokumen ini:\n\n${textToAnalyze}`,
        false,
        base64Image || undefined,
        mimeType || undefined
      );

      setMarkdownData(resultText);
      setIsMockResult(false);
      const newArchive = saveArchive(file.name, "Audit Cerdas", resultText);
      setCurrentArchiveId(newArchive.id);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-[var(--color-border-main)] pb-6 flex items-center gap-4">
        <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
          <Layers className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)] mb-2 tracking-tight">Audit Pintar (AI)</h1>
          <p className="text-[var(--color-text-muted)] text-lg">Unggah Dokumen (PDF), Gambar Berkas, atau masukkan Tautan Berita untuk dianalisis oleh AI.</p>
        </div>
      </div>

      <div className={!markdownData ? "block mt-12" : "hidden"}>
        <UploadDropzone onUploadSuccess={handleUploadSuccess} isLoading={isLoading} />
      </div>

      <div className={markdownData ? "block" : "hidden"}>
        {markdownData && <MarkdownReport rawText={rawText || undefined} isMock={isMockResult} content={markdownData} fileName={currentFileName} archiveId={currentArchiveId || undefined} onReset={() => { setMarkdownData(null); setIsMockResult(false); setRawText(null); setCurrentArchiveId(null); }} />}
      </div>
    </div>
  );
}
