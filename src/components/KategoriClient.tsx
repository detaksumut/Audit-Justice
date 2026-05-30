"use client";

import { useState } from "react";
import UploadDropzone from "@/components/UploadDropzone";
import MarkdownReport from "@/components/MarkdownReport";
import { saveArchive } from "@/utils/archive";
import { Layers, FileText, BookOpen, Scale, Shield, Briefcase } from "lucide-react";
import { 
  PROMPT_AGAMA, PROMPT_PIDANA, PROMPT_PERDATA, 
  PROMPT_KEPOLISIAN, PROMPT_KEJAKSAAN, PROMPT_UMUM 
} from "@/utils/aiPrompts";

const categoryMeta: Record<string, { title: string, desc: string, icon: any }> = {
  pidana: { title: "Keputusan Pengadilan Perkara Pidana", desc: "Audit dokumen putusan pidana, surat dakwaan, atau pledoi untuk menemukan cacat materiil/formil.", icon: FileText },
  perdata: { title: "Keputusan Pengadilan Perkara Perdata", desc: "Audit dokumen gugatan, replik, duplik, atau putusan perdata terkait wanprestasi/PMH.", icon: BookOpen },
  agama: { title: "Keputusan Pengadilan Agama", desc: "Audit dokumen peradilan agama (perceraian, waris, ekonomi syariah).", icon: Scale },
  kepolisian: { title: "BAP Kepolisian", desc: "Audit Berita Acara Pemeriksaan (BAP) Kepolisian untuk menemukan anomali penyidikan atau cacat prosedur.", icon: Shield },
  kejaksaan: { title: "BAP Kejaksaan", desc: "Audit Berkas Perkara Kejaksaan, kelengkapan formil/materiil, dan keabsahan alat bukti.", icon: Briefcase },
};

export default function KategoriClient({ slug }: { slug: string }) {
  const meta = categoryMeta[slug] || { title: `Audit ${slug}`, desc: "Audit dokumen hukum khusus.", icon: Layers };
  const Icon = meta.icon;

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

      let systemInstruction = PROMPT_UMUM;
      if (slug === 'agama') systemInstruction = PROMPT_AGAMA;
      else if (slug === 'pidana') systemInstruction = PROMPT_PIDANA;
      else if (slug === 'perdata') systemInstruction = PROMPT_PERDATA;
      else if (slug === 'kepolisian') systemInstruction = PROMPT_KEPOLISIAN;
      else if (slug === 'kejaksaan') systemInstruction = PROMPT_KEJAKSAAN;

      const resultText = await generateContent(
        localApiKey,
        "gemini-2.5-flash",
        systemInstruction,
        `Tolong analisis dokumen ini:\n\n${textToAnalyze}`,
        false,
        base64Image || undefined,
        mimeType || undefined
      );

      setMarkdownData(resultText);
      setIsMockResult(false);
      const newArchive = saveArchive(file.name, meta.title, resultText);
      setCurrentArchiveId(newArchive.id);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-[var(--color-border-main)] pb-6 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
          <Icon className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)] mb-2 tracking-tight">{meta.title}</h1>
          <p className="text-[var(--color-text-muted)] text-lg">{meta.desc}</p>
        </div>
      </div>

      <div className={!markdownData ? "block mt-12 animate-in zoom-in-95 duration-500" : "hidden"}>
        <UploadDropzone onUploadSuccess={handleUploadSuccess} isLoading={isLoading} />
      </div>

      <div className={markdownData ? "block animate-in fade-in slide-in-from-bottom-8 duration-700" : "hidden"}>
        {markdownData && (
          <MarkdownReport 
            rawText={rawText || undefined} 
            isMock={isMockResult} 
            content={markdownData} 
            fileName={currentFileName} 
            auditTitle={meta.title}
            archiveId={currentArchiveId || undefined}
            onReset={() => { setMarkdownData(null); setIsMockResult(false); setRawText(null); setCurrentArchiveId(null); }} 
          />
        )}
      </div>
    </div>
  );
}
