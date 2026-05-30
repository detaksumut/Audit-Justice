import { DEFAULT_ARCHIVES } from './defaultArchives';

export interface ArchiveItem {
  id: string;
  fileName: string;
  category: string;
  content: string;
  timestamp: number;
}

const ARCHIVE_KEY = 'audit_justice_archives';

export function saveArchive(fileName: string, category: string, content: string): ArchiveItem {
  const archives = getArchives();
  
  const newItem: ArchiveItem = {
    id: `archive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fileName,
    category,
    content,
    timestamp: Date.now(),
  };

  // Prepend to array
  const updatedArchives = [newItem, ...archives];
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(updatedArchives));
  
  return newItem;
}

export function getArchives(): ArchiveItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ARCHIVE_KEY);
  if (!stored) {
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(DEFAULT_ARCHIVES));
    return DEFAULT_ARCHIVES;
  }
  try {
    const parsed = JSON.parse(stored) as ArchiveItem[];
    if (!parsed || parsed.length === 0) {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(DEFAULT_ARCHIVES));
      return DEFAULT_ARCHIVES;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(DEFAULT_ARCHIVES));
    return DEFAULT_ARCHIVES;
  }
}

export function deleteArchive(id: string): void {
  const archives = getArchives();
  const updated = archives.filter(item => item.id !== id);
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(updated));
}

export function clearArchives(): void {
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify([]));
}

export function appendArchiveContent(id: string, additionalContent: string): void {
  const archives = getArchives();
  const index = archives.findIndex(item => item.id === id);
  if (index !== -1) {
    archives[index].content += '\n\n' + additionalContent;
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archives));
  }
}
