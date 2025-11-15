export type SavedPdf = {
  id: string;
  title: string;
  note: string;
  fileName: string;
};

const STORAGE_KEY = "ruu-saved-pdfs";
const CURRENT_PDF_KEY = "ruu-current-pdf-id";

export function loadSavedPdfs(): SavedPdf[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: any) => ({
      id: p.id ?? "",
      title: p.title ?? "",
      note: p.note ?? "",
      fileName: p.fileName ?? "",
    }));
  } catch {
    return [];
  }
}

export function saveSavedPdfs(pdfs: SavedPdf[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pdfs));
}

export function loadCurrentPdfId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_PDF_KEY);
}

export function saveCurrentPdfId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id === null) {
    window.localStorage.removeItem(CURRENT_PDF_KEY);
  } else {
    window.localStorage.setItem(CURRENT_PDF_KEY, id);
  }
}
