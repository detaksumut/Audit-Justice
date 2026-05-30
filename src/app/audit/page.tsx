"use client";

import { useState } from "react";
import UploadDropzone from "@/components/UploadDropzone";
import MarkdownReport from "@/components/MarkdownReport";
import { saveArchive } from "@/utils/archive";
import { Layers, Key, ExternalLink, X } from "lucide-react";

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [markdownData, setMarkdownData] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);
  const [isMockResult, setIsMockResult] = useState<boolean>(false);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [currentArchiveId, setCurrentArchiveId] = useState<string | null>(null);

  // Licensing and Trial State
  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
  const [accessMode, setAccessMode] = useState<'apikey' | 'license'>('apikey');
  const [accessInput, setAccessInput] = useState<string>('');
  const [accessError, setAccessError] = useState<string>('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

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

  // Wrapper to enforce access check before uploading
  const handleUpload = (file: File) => {
    checkAccessAndExecute(() => handleUploadSuccess(file));
  };

  const checkAccessAndExecute = (action: () => void) => {
    const currentLicense = localStorage.getItem('audit_justice_license_key') || "";
    
    const isLicenseValid = currentLicense === "AUDIT-JUSTICE-VIP" || (() => {
      if (!currentLicense.startsWith("AJ-")) return false;
      const payload = currentLicense.slice(3);
      if (!/^[A-Z]{8}$/.test(payload)) return false;
      const weights = [3, 7, 1, 9, 5, 8, 2, 6];
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += payload.charCodeAt(i) * weights[i];
      }
      return sum % 13 === 7;
    })();

    if (isLicenseValid) {
      action();
      return;
    }
    const trialCount = parseInt(localStorage.getItem('audit_justice_trial_count') || "0");
    if (trialCount >= 5) {
      setAccessMode('license');
      setAccessInput('');
      setAccessError('');
      setPendingAction(() => action);
      setShowAccessModal(true);
      return;
    }
    localStorage.setItem('audit_justice_trial_count', (trialCount + 1).toString());
    action();
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
        <UploadDropzone onUploadSuccess={handleUpload} isLoading={isLoading} />
      </div>

      <div className={markdownData ? "block" : "hidden"}>
        {markdownData && <MarkdownReport rawText={rawText || undefined} isMock={isMockResult} content={markdownData} fileName={currentFileName} archiveId={currentArchiveId || undefined} onReset={() => { setMarkdownData(null); setIsMockResult(false); setRawText(null); setCurrentArchiveId(null); }} />}
      </div>
    {/* Access Modal */}
    {showAccessModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-[var(--color-bg)] rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[var(--color-primary)]">
              {accessMode === 'apikey' ? 'Masukkan API Key' : 'Masukkan Lisensi'}
            </h2>
            <button onClick={() => setShowAccessModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 leading-relaxed">
              💡 Untuk performa analisa yang <strong>prima dan stabil</strong>, juga untuk kenyamanan Anda, sebaiknya gunakan <strong>API Key Private</strong> Anda sendiri. Dapatkan API Key <strong>gratis</strong> dari Google{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:underline"
              >
                di sini <ExternalLink size={14} className="ml-1" />
              </a>
            </p>
          </div>
          <p className="text-xs text-gray-500 mb-3">Tempel API Key Anda di sini:</p>
          <div className="flex items-center gap-2 mb-4">
            <Key className="text-[var(--color-primary)]" />
            <input
              type="text"
              value={accessInput}
              onChange={e => setAccessInput(e.target.value)}
              placeholder={accessMode === 'apikey' ? 'Tempel API Key Anda di sini...' : 'Kode Lisensi'}
              className="flex-1 border border-[var(--color-border-main)] rounded px-3 py-2"
            />
          </div>
          {accessError && <p className="text-red-500 mb-2">{accessError}</p>}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                if (!accessInput) {
                  setAccessError('Input tidak boleh kosong');
                  return;
                }
                if (accessMode === 'apikey') {
                  localStorage.setItem('audit_justice_api_key', accessInput.trim());
                  setShowAccessModal(false);
                  if (pendingAction) pendingAction();
                } else {
                  const code = accessInput.trim().toUpperCase();
                  const isLicenseValid = code === "AUDIT-JUSTICE-VIP" || (() => {
                    if (!code.startsWith("AJ-")) return false;
                    const payload = code.slice(3);
                    if (!/^[A-Z]{8}$/.test(payload)) return false;
                    const weights = [3, 7, 1, 9, 5, 8, 2, 6];
                    let sum = 0;
                    for (let i = 0; i < 8; i++) {
                      sum += payload.charCodeAt(i) * weights[i];
                    }
                    return sum % 13 === 7;
                  })();

                  if (isLicenseValid) {
                    localStorage.setItem('audit_justice_license_key', code);
                    
                    // Kirim log aktivitas ke Google Sheets
                    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz_PLACEHOLDER_YOUR_WEBAPP_URL/exec";
                    if (!GOOGLE_SHEET_URL.includes("PLACEHOLDER")) {
                      try {
                        fetch(GOOGLE_SHEET_URL, {
                          method: 'POST',
                          mode: 'no-cors',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            app: "Audit Justice",
                            license: code,
                            action: "Aktivasi",
                            userAgent: navigator.userAgent
                          })
                        }).catch(() => {});
                      } catch (err) {}
                    }
                    
                    setShowAccessModal(false);
                    if (pendingAction) pendingAction();
                  } else {
                    setAccessError('Lisensi tidak valid! Hubungi administrator.');
                  }
                }
              }}
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary)/80]"
            >
              Simpan
            </button>
            {accessMode === 'license' && (
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[var(--color-primary)] hover:underline"
              >
                Dapatkan Lisensi
                <ExternalLink size={16} className="ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
