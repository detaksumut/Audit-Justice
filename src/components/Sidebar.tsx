"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Scale, FileText, BookOpen, Sun, Moon, Shield, Briefcase, Swords, Archive, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import ApiSettings from "@/components/ApiSettings";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Audit Umum", href: "/audit", icon: Scale },
    { name: "Perkara Pidana", href: "/kategori/pidana", icon: FileText },
    { name: "Perkara Perdata", href: "/kategori/perdata", icon: BookOpen },
    { name: "Perkara Agama", href: "/kategori/agama", icon: Scale },
    { name: "BAP Kepolisian", href: "/kategori/kepolisian", icon: Shield },
    { name: "BAP Kejaksaan", href: "/kategori/kejaksaan", icon: Briefcase },
    { name: "Asisten Litigasi", href: "/persidangan", icon: Swords },
    { name: "Arsip Laporan", href: "/arsip", icon: Archive },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-bg-sidebar)] border-b border-[var(--color-border-main)] z-50 flex items-center justify-between px-4 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--color-primary)] p-1.5 rounded-md">
            <Scale size={18} className="text-white dark:text-[#060b14]" />
          </div>
          <span className="font-serif font-bold text-lg tracking-wide uppercase text-[var(--color-primary)]">Audit Justice</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-[var(--color-text-main)] rounded-lg hover:bg-[var(--color-border-main)] transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-[var(--color-bg-sidebar)] text-[var(--color-text-main)] h-[100dvh] flex flex-col fixed left-0 top-0 border-r border-[var(--color-border-main)] shadow-xl transition-transform duration-300 z-50 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-[var(--color-border-main)]">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-primary)] p-2 rounded-lg">
              <Scale size={24} className="text-white dark:text-[#060b14]" />
            </div>
            <h1 className="font-serif font-bold text-xl tracking-wide uppercase text-[var(--color-primary)]">Audit Justice</h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-border-main)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-[var(--color-primary)] text-white dark:text-[#060b14] shadow-md shadow-black/10" 
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white dark:text-[#060b14]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]"} />
              <span className={`font-medium tracking-wide ${isActive ? "" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[var(--color-border-main)] flex flex-col gap-4 shrink-0">
        <ApiSettings />
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg border border-[var(--color-border-main)] hover:border-[var(--color-primary)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          <span className="font-medium">Tema Tampilan</span>
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <div className="mt-1 text-center text-[10px] text-[var(--color-text-muted)] opacity-70">
          <p className="font-semibold mb-0.5">PT BSJ | Berita Indonesia Network</p>
          <a href="https://www.aj.beritaindonesia.news" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
            www.aj.beritaindonesia.news
          </a>
        </div>
      </div>
    </aside>
    </>
  );
}
