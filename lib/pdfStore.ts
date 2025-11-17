export type SavedPdf = {
  id: string;
  title: string;
  note: string;
  fileName: string;
};

const STORAGE_KEY = "ruu-saved-pdfs";
const CURRENT_PDF_KEY = "ruu-current-pdf-id";

function normalizeSavedPdf(entry: unknown, index: number): SavedPdf {
  if (typeof entry !== "object" || entry === null) {
    return {
      id: `saved-${index}`,
      title: "",
      note: "",
      fileName: "",
    };
  }

  const record = entry as Record<string, unknown>;
  const coerceString = (value: unknown) =>
    typeof value === "string" ? value : "";

  const id = coerceString(record.id) || `saved-${index}`;

  return {
    id,
    title: coerceString(record.title),
    note: coerceString(record.note),
    fileName: coerceString(record.fileName),
  };
}

export function loadSavedPdfs(): SavedPdf[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((entry, idx) => normalizeSavedPdf(entry, idx));
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