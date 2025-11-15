export type SavedPdf = {
  id: string;
  title: string;
  note: string;
  fileName: string;
};

const STORAGE_KEY = "ruu-saved-pdfs";
const CURRENT_PDF_KEY = "ruu-current-pdf-id";

// loadSavedPdfs / saveSavedPdfs / loadCurrentPdfId / saveCurrentPdfId
// を使って localStorage に保持