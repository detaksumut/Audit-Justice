"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Lock, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface DocumentChatProps {
  documentText: string;
  archiveId?: string;
}

export default function DocumentChat({ documentText, archiveId }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cek API Key di localStorage saat komponen dimuat
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Otomatis scroll ke pesan terbawah
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Hitung jumlah pesan user untuk melimitasi fitur gratis
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const isFreeLimitReached = !apiKey && userMessageCount >= 3;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || isFreeLimitReached) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    if (archiveId) {
      const { appendArchiveContent } = await import("@/utils/archive");
      appendArchiveContent(archiveId, `**Anda:** ${userMessage.content}`);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          documentText,
          userApiKey: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memproses jawaban");
      }

      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      if (archiveId) {
        const { appendArchiveContent } = await import("@/utils/archive");
        appendArchiveContent(archiveId, `**AI:** ${data.reply}`);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: `❌ Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-[var(--color-border-main)] rounded-lg bg-[var(--color-bg-card)] overflow-hidden shadow-sm mt-8 mx-2 md:mx-0">
      {/* Header */}
      <div className="bg-[var(--color-primary)]/10 border-b border-[var(--color-primary)]/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-primary)] p-2 rounded-full">
            <Bot size={20} className="text-white dark:text-[#060b14]" />
          </div>
          <div>
            <h3 className="font-bold font-serif text-[var(--color-primary)]">Asisten AI Hukum</h3>
            <p className="text-xs text-[var(--color-text-muted)]">Tanyakan apa saja seputar dokumen ini</p>
          </div>
        </div>
        {!apiKey ? (
          <span className="flex items-center gap-1 text-xs font-semibold bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">
            <Lock size={12} /> Mode Gratis (Terbatas)
          </span>
        ) : (
          <span className="text-xs font-semibold bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded">
            Mode Premium
          </span>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-bg-main)]/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-text-muted)] p-4">
            <Bot size={48} className="mb-4 opacity-20" />
            <p>Halo! Saya sudah membaca dokumen Anda.</p>
            <p className="text-sm mt-2">Ketik pertanyaan di bawah untuk mulai berdiskusi.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-[var(--color-text-main)] text-[var(--color-bg-main)]" : "bg-[var(--color-primary)] text-white dark:text-[#060b14]"}`}>
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm md:text-base ${
                msg.role === "user" 
                  ? "bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-tr-sm" 
                  : "bg-[var(--color-bg-card)] border border-[var(--color-border-main)] text-[var(--color-text-main)] rounded-tl-sm shadow-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%] flex-row">
              <div className="shrink-0 h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-main)] rounded-tl-sm flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[var(--color-bg-card)] border-t border-[var(--color-border-main)]">
        {isFreeLimitReached ? (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 flex items-start gap-3 text-orange-700 dark:text-orange-400">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold text-sm">Batas Gratis Tercapai</p>
              <p className="text-xs mt-1">Anda telah mencapai batas maksimal 3 pertanyaan untuk mode gratis. Silakan masukkan Kunci API Anda di menu "Pengaturan Kunci API" (pojok kiri bawah) untuk melanjutkan percakapan tanpa batas.</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isLoading ? "Mengetik jawaban..." : "Tanya sesuatu tentang dokumen ini..."}
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3 bg-[var(--color-bg-main)] border border-[var(--color-border-main)] rounded-full focus:outline-none focus:border-[var(--color-primary)] text-sm md:text-base disabled:opacity-50 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-1.5 bg-[var(--color-primary)] text-white dark:text-[#060b14] rounded-full hover:bg-yellow-600 disabled:opacity-50 disabled:hover:bg-[var(--color-primary)] transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
