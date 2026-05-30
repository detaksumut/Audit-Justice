import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, ArrowLeft, RefreshCw } from "lucide-react";
import DocumentChat from './DocumentChat';

interface MarkdownReportProps {
  content: string;
  onReset: () => void;
  fileName: string;
  isMock?: boolean;
  rawText?: string;
  auditTitle?: string; // New optional prop for dynamic title
  archiveId?: string;
}

export default function MarkdownReport({ content, onReset, fileName, isMock, rawText, auditTitle, archiveId }: MarkdownReportProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {isMock && (
        <div className="bg-[var(--color-bg-card)] border-2 border-dashed border-[var(--color-primary)] p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden rounded-lg mx-2 md:mx-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-[var(--color-primary)] mb-2 md:mb-3 tracking-wide">MODE ANALISIS DASAR TERBATAS</h3>
          <p className="text-[var(--color-text-main)] mb-3 md:mb-4 text-sm md:text-base lg:text-lg max-w-3xl px-2">
            Teks di bawah ini adalah hasil pembacaan awal dari sistem dasar. Untuk membedah argumen hukum secara presisi, menemukan cacat logika, dan menyusun bantahan resmi menggunakan Mesin AI Legal penuh (Gemini), Anda perlu mengaktifkan API.
          </p>
          <div className="inline-flex items-center justify-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold border border-[var(--color-primary)]/30 uppercase tracking-widest text-xs md:text-sm text-center">
            Atur Kunci API di pojok kiri bawah
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass-panel p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t-4 border-t-[var(--color-primary)] mx-2 md:mx-0">
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
            <FileText className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="font-bold uppercase tracking-wider text-xs md:text-sm">
              {auditTitle || "Laporan Audit"}
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--color-text-main)] break-words">
            Dokumen: {fileName}
          </h2>
        </div>
        
        <button 
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-[var(--color-bg-main)] hover:bg-[var(--color-primary)] text-[var(--color-text-main)] hover:text-white border border-[var(--color-border-main)] hover:border-[var(--color-primary)] rounded font-semibold transition-all duration-300 shadow-sm shrink-0 text-sm md:text-base w-full md:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Audit Dokumen Lain
        </button>
      </div>

      {/* Markdown Content */}
      <div className="glass-panel p-4 md:p-8 lg:p-12 mx-2 md:mx-0 overflow-x-hidden">
        <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-primary)] prose-strong:text-[var(--color-text-main)] prose-blockquote:border-l-[var(--color-primary)] prose-blockquote:bg-[var(--color-primary)]/5 prose-blockquote:py-1 prose-blockquote:px-3 md:prose-blockquote:px-4 prose-blockquote:not-italic prose-th:bg-[var(--color-primary)]/10 prose-th:p-2 md:prose-th:p-3 prose-td:p-2 md:prose-td:p-3 prose-table:border prose-table:border-[var(--color-border-main)] break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Chatbot Feature */}
      {rawText && (
        <DocumentChat documentText={rawText} archiveId={archiveId} />
      )}

      {/* Footer Actions */}
      <div className="flex justify-end pt-6 px-2 md:px-0">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] hover:bg-yellow-600 text-white dark:text-[#060b14] rounded font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <FileText className="w-5 h-5" />
          Cetak Laporan (PDF)
        </button>
      </div>
    </div>
  );
}
