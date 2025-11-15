"use client";

import React from "react";
import { CharacterMessage } from "@/components/CharacterMessage";
import { getRandomCharacter } from "@/lib/characters";
import {
  SavedPdf,
  loadSavedPdfs,
  saveSavedPdfs,
  loadCurrentPdfId,
  saveCurrentPdfId,
} from "@/lib/pdfStore";

type PdfQuestionRecord = {
  id: string;
  problemNumber: string;
  questionLabel: string;
  isCorrect: boolean | null;
  memo: string;
  pdfPage: number | null;
  pdfPosition: string;
};

const STORAGE_KEY = "ruu-pdf-practice-records";

function loadRecords(): PdfQuestionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((r: any, idx: number) => ({
      id: r.id ?? `q-${idx + 1}`,
      problemNumber: r.problemNumber ?? "",
      questionLabel: r.questionLabel ?? `${idx + 1}問目`,
      isCorrect:
        typeof r.isCorrect === "boolean" ? r.isCorrect : null,
      memo: r.memo ?? "",
      pdfPage:
        typeof r.pdfPage === "number" && r.pdfPage > 0 ? r.pdfPage : null,
      pdfPosition: r.pdfPosition ?? "",
    }));
  } catch {
    return [];
  }
}

function saveRecords(records: PdfQuestionRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getNextProblemNumberCandidate(prev: string): string | null {
  if (!prev) return null;
  const match = prev.match(/(.*?)(\d+)(\D*)$/);
  if (!match) return null;
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const num = Number(numStr);
  if (Number.isNaN(num)) return null;
  const next = num + 1;
  const nextStr = String(next).padStart(numStr.length, "0");
  return `${prefix}${nextStr}${suffix}`;
}

export default function PdfPracticePage() {
  const [savedPdfs, setSavedPdfs] = React.useState<SavedPdf[]>([]);
  const [currentPdfId, setCurrentPdfId] = React.useState<string | null>(null);
  const [currentPdfUrl, setCurrentPdfUrl] = React.useState<string | null>(null);
  const [pdfFileLoading, setPdfFileLoading] = React.useState(false);

  const [records, setRecords] = React.useState<PdfQuestionRecord[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [problemNumber, setProblemNumber] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [memo, setMemo] = React.useState("");
  const [pdfPage, setPdfPage] = React.useState<number | null>(null);
  const [pdfPosition, setPdfPosition] = React.useState("");
  const [nextProblemCandidate, setNextProblemCandidate] =
    React.useState<string | null>(null);

  const [aiMessage, setAiMessage] = React.useState<string | null>(null);
  const [aiCharacterId, setAiCharacterId] = React.useState<string | null>(
    null
  );
  const [aiLoading, setAiLoading] = React.useState(false);

  React.useEffect(() => {
    const pdfs = loadSavedPdfs();
    setSavedPdfs(pdfs);
    const storedId = loadCurrentPdfId();
    const effectiveId =
      storedId && pdfs.some((p) => p.id === storedId)
        ? storedId
        : pdfs.length > 0
        ? pdfs[0].id
        : null;
    setCurrentPdfId(effectiveId);

    const r = loadRecords();
    if (r.length === 0) {
      const first: PdfQuestionRecord = {
        id: "q-1",
        problemNumber: "",
        questionLabel: "1問目",
        isCorrect: null,
        memo: "",
        pdfPage: null,
        pdfPosition: "",
      };
      setRecords([first]);
      saveRecords([first]);
      setCurrentIndex(0);
      setProblemNumber("");
      setIsCorrect(null);
      setMemo("");
      setPdfPage(null);
      setPdfPosition("");
      setNextProblemCandidate(null);
    } else {
      setRecords(r);
      const lastIndex = r.length - 1;
      const rec = r[lastIndex];
      setCurrentIndex(lastIndex);
      setProblemNumber(rec.problemNumber ?? "");
      setIsCorrect(rec.isCorrect);
      setMemo(rec.memo ?? "");
      setPdfPage(rec.pdfPage ?? null);
      setPdfPosition(rec.pdfPosition ?? "");
      setNextProblemCandidate(
        getNextProblemNumberCandidate(rec.problemNumber ?? "")
      );
    }
  }, []);

  const currentRecord = records[currentIndex];

  const updateRecord = (partial: Partial<PdfQuestionRecord>) => {
    if (!currentRecord) return;
    const updated: PdfQuestionRecord = { ...currentRecord, ...partial };
    const newRecords = records.map((r, idx) =>
      idx === currentIndex ? updated : r
    );
    setRecords(newRecords);
    saveRecords(newRecords);
  };

  const handlePdfFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("PDFファイルを選んでね。");
      return;
    }

    setPdfFileLoading(true);

    const id = `pdf-${Date.now()}`;
    const newPdf: SavedPdf = {
      id,
      title: file.name.replace(/\.pdf$/i, ""),
      note: "",
      fileName: file.name,
    };

    const newList = [...savedPdfs, newPdf];
    setSavedPdfs(newList);
    saveSavedPdfs(newList);
    setCurrentPdfId(id);
    saveCurrentPdfId(id);

    const url = URL.createObjectURL(file);
    if (currentPdfUrl) {
      URL.revokeObjectURL(currentPdfUrl);
    }
    setCurrentPdfUrl(url);

    setPdfFileLoading(false);
  };

  const handleSelectPdf = (id: string) => {
    setCurrentPdfId(id);
    saveCurrentPdfId(id);
    // ファイル本体は再アップロード前提なので URL は変えない
  };

  const handleChangePdfTitle = (value: string) => {
    if (!currentPdfId) return;
    const newList = savedPdfs.map((p) =>
      p.id === currentPdfId ? { ...p, title: value } : p
    );
    setSavedPdfs(newList);
    saveSavedPdfs(newList);
  };

  const handleChangePdfNote = (value: string) => {
    if (!currentPdfId) return;
    const newList = savedPdfs.map((p) =>
      p.id === currentPdfId ? { ...p, note: value } : p
    );
    setSavedPdfs(newList);
    saveSavedPdfs(newList);
  };

  const handleChangeProblemNumber = (value: string) => {
    setProblemNumber(value);
    updateRecord({ problemNumber: value });
  };

  const handleToggleCorrect = (value: boolean) => {
    setIsCorrect(value);
    updateRecord({ isCorrect: value });
  };

  const handleChangeMemo = (value: string) => {
    setMemo(value);
    updateRecord({ memo: value });
  };

  const handleChangePdfPage = (value: string) => {
    const num = Number(value);
    const page = Number.isNaN(num) || num <= 0 ? null : num;
    setPdfPage(page);
    updateRecord({ pdfPage: page });
  };

  const handleChangePdfPosition = (value: string) => {
    setPdfPosition(value);
    updateRecord({ pdfPosition: value });
  };

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < records.length) {
      const next = records[nextIndex];
      setCurrentIndex(nextIndex);
      setProblemNumber(next.problemNumber ?? "");
      setIsCorrect(next.isCorrect);
      setMemo(next.memo ?? "");
      setPdfPage(next.pdfPage ?? null);
      setPdfPosition(next.pdfPosition ?? "");
      setNextProblemCandidate(
        getNextProblemNumberCandidate(next.problemNumber ?? "")
      );
      setAiMessage(null);
      setAiCharacterId(null);
    } else {
      const candidate = getNextProblemNumberCandidate(
        currentRecord?.problemNumber ?? ""
      );
      const next: PdfQuestionRecord = {
        id: `q-${nextIndex + 1}`,
        problemNumber: candidate ?? "",
        questionLabel: `${nextIndex + 1}問目`,
        isCorrect: null,
        memo: "",
        pdfPage: currentRecord?.pdfPage ?? null,
        pdfPosition: "",
      };
      const newRecords = [...records, next];
      setRecords(newRecords);
      saveRecords(newRecords);
      setCurrentIndex(nextIndex);
      setProblemNumber(next.problemNumber);
      setIsCorrect(null);
      setMemo("");
      setPdfPage(next.pdfPage);
      setPdfPosition("");
      setNextProblemCandidate(candidate);
      setAiMessage(null);
      setAiCharacterId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevQuestion = () => {
    if (currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    const prev = records[prevIndex];
    setCurrentIndex(prevIndex);
    setProblemNumber(prev.problemNumber ?? "");
    setIsCorrect(prev.isCorrect);
    setMemo(prev.memo ?? "");
    setPdfPage(prev.pdfPage ?? null);
    setPdfPosition(prev.pdfPosition ?? "");
    setNextProblemCandidate(
      getNextProblemNumberCandidate(prev.problemNumber ?? "")
    );
    setAiMessage(null);
    setAiCharacterId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAskAi = async () => {
    setAiLoading(true);
    const char = getRandomCharacter();
    setAiCharacterId(char.id);
    try {
      const base =
        isCorrect === true
          ? "ちゃんと正解できててえらいよ。"
          : isCorrect === false
          ? "今回はまちがえても大丈夫。またPDF見ながらいっしょにゆっくり考えてこ。"
          : "まだ正解かどうか決めてなくても平気だよ。";
      const memoPart = memo
        ? `\nメモも書いてあって、ルーちゃんがどう考えたか分かってうれしいな。`
        : "";
      setAiMessage(
        `${char.name}だよ。\n${base}${memoPart}\nここまで記録しようとしているだけで、すごく頑張れてるよ。`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const currentPdf = currentPdfId
    ? savedPdfs.find((p) => p.id === currentPdfId) ?? null
    : null;

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 4 }}>PDFモード</h2>
      <p className="text-muted" style={{ marginBottom: 10 }}>
        上のPDFを見ながら、今解いている問題の「正解・不正解」やメモを
        ゆっくり残していけるよ。
      </p>

      {/* PDF選択エリア */}
      <section className="card-wood" style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="section-label">使うPDF</span>
              {currentPdf ? (
                <p style={{ margin: "4px 0 0", fontSize: 14 }}>
                  {currentPdf.title}
                  <span
                    style={{
                      fontSize: 11,
                      color: "#7b6960",
                      marginLeft: 6,
                    }}
                  >
                    ({currentPdf.fileName})
                  </span>
                </p>
              ) : (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    color: "#b39a7b",
                  }}
                >
                  まだPDFが選ばれていないよ。
                </p>
              )}
            </div>

            <div>
              <label
                className="btn-wood-outline"
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                PDFを追加する
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={handlePdfFileChange}
                />
              </label>
              {pdfFileLoading && (
                <p
                  className="text-muted"
                  style={{ fontSize: 11, marginTop: 4 }}
                >
                  PDFを読み込み中…
                </p>
              )}
            </div>
          </div>

          {savedPdfs.length > 1 && (
            <div style={{ marginTop: 4 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 4,
                  color: "#7b5c3b",
                }}
              >
                ほかのPDFを選ぶ
              </span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {savedPdfs.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPdf(p.id)}
                    className={
                      "btn-wood-outline" +
                      (currentPdfId === p.id ? " selected" : "")
                    }
                    style={{
                      padding: "4px 10px",
                      fontSize: 11,
                      borderWidth: currentPdfId === p.id ? 2 : 1,
                    }}
                  >
                    {p.title || p.fileName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentPdf && (
            <div style={{ marginTop: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 3,
                }}
              >
                PDFのタイトル（自分用）
              </label>
              <input
                className="input-wood"
                value={currentPdf.title}
                onChange={(e) => handleChangePdfTitle(e.target.value)}
              />
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  display: "block",
                  marginTop: 6,
                  marginBottom: 3,
                }}
              >
                PDFメモ
              </label>
              <textarea
                className="textarea-wood"
                rows={2}
                value={currentPdf.note}
                onChange={(e) => handleChangePdfNote(e.target.value)}
                placeholder="このPDFが何の年度・どの回か、ざっくりメモしておくと便利だよ。"
              />
            </div>
          )}
        </div>
      </section>

      {/* PDFビュー（木枠） */}
      <section className="card-wood" style={{ marginBottom: 14 }}>
        <div
          style={{
            marginBottom: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <span className="section-label">森の勉強用PDF</span>
          <span style={{ color: "#7b6960" }}>
            窓の外のPDFを見ながら、下の木の机で記録していこうね。
          </span>
        </div>

        <div className="wood-frame">
          <div className="wood-frame-decoration">きょうの教材</div>
          <div className="wood-frame-inner">
            {currentPdfUrl ? (
              <iframe
                src={currentPdfUrl}
                style={{
                  width: "100%",
                  height: 420,
                  border: "none",
                  backgroundColor: "#f3eee4",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 420,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#9a8570",
                  padding: 16,
                  textAlign: "center",
                }}
              >
                まだPDFファイルが読み込まれていないみたい。
                <br />
                上の「PDFを追加する」から、ルーちゃんが使いたいPDFを選んでね。
              </div>
            )}
          </div>
          <div className="wood-frame-branch">🌿 風がすこしふいてるよ</div>
        </div>
      </section>

      {/* 記録フォーム */}
      {currentRecord && (
        <section className="card-wood" style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <div>
              <span className="section-label">いまの問題</span>
              <h3
                style={{
                  fontSize: 16,
                  margin: "4px 0 0",
                }}
              >
                {currentRecord.questionLabel}
              </h3>
            </div>
            <div style={{ fontSize: 12, color: "#7b6960" }}>
              合計 {records.length} 問目まで記録中
            </div>
          </div>

          {/* 問題番号 */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                display: "block",
                marginBottom: 4,
              }}
            >
              PDF上の問題番号
            </span>

            {nextProblemCandidate && (
              <button
                type="button"
                className="btn-wood-outline"
                style={{
                  padding: "4px 8px",
                  fontSize: 11,
                  marginBottom: 4,
                }}
                onClick={() =>
                  handleChangeProblemNumber(nextProblemCandidate)
                }
              >
                候補: {nextProblemCandidate} を入れる
              </button>
            )}

            <input
              className="input-wood"
              value={problemNumber}
              onChange={(e) => handleChangeProblemNumber(e.target.value)}
              placeholder="例）12, A-32, 午前23 など、あとで自分が分かる書き方でOK"
            />
          </div>

          {/* PDFページ & 位置 */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            <div style={{ minWidth: 100, flex: 1 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                PDFのページ
              </span>
              <input
                className="input-wood"
                type="number"
                min={1}
                value={pdfPage ?? ""}
                onChange={(e) => handleChangePdfPage(e.target.value)}
                placeholder="例）5"
              />
              <p className="text-muted" style={{ marginTop: 4 }}>
                この問題が載っているPDFのページ番号だよ（1ページ目なら1）。
              </p>
            </div>

            <div style={{ minWidth: 140, flex: 1 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                ページ内の位置
              </span>
              <input
                className="input-wood"
                value={pdfPosition}
                onChange={(e) => handleChangePdfPosition(e.target.value)}
                placeholder='例）上 / 真ん中 / 下 / 左上 など'
              />
              <p className="text-muted" style={{ marginTop: 4 }}>
                同じページに2〜3問あるときに、「上」「下」などで区別しておくと分かりやすいよ。
              </p>
            </div>
          </div>

          {/* 正解・不正解 */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                display: "block",
                marginBottom: 4,
              }}
            >
              結果
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => handleToggleCorrect(true)}
                className={
                  "btn-choice" +
                  (isCorrect === true ? " selected" : "")
                }
                style={{ flex: 1, textAlign: "center" }}
              >
                正解だった
              </button>
              <button
                type="button"
                onClick={() => handleToggleCorrect(false)}
                className={
                  "btn-choice" +
                  (isCorrect === false ? " selected" : "")
                }
                style={{ flex: 1, textAlign: "center" }}
              >
                不正解だった
              </button>
            </div>
          </div>

          {/* メモ */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                display: "block",
                marginBottom: 4,
              }}
            >
              自分メモ
            </span>
            <textarea
              className="textarea-wood"
              rows={3}
              value={memo}
              onChange={(e) => handleChangeMemo(e.target.value)}
              placeholder={
                "どうして正解/不正解だったか、自分の言葉でざっくり書いておくと、あとで国試前に役に立つよ。"
              }
            />
          </div>

          {/* 森の仲間コメント */}
          <div style={{ marginBottom: 6 }}>
            <button
              type="button"
              onClick={handleAskAi}
              className="btn-wood-outline"
            >
              この問題について森の仲間にひとこともらう
            </button>
          </div>

          {aiLoading && (
            <p className="text-muted" style={{ fontSize: 12 }}>
              森の仲間たちが考え中…
            </p>
          )}

          {aiMessage && aiCharacterId && (
            <div style={{ marginTop: 6 }}>
              <CharacterMessage
                characterId={aiCharacterId as any}
                text={aiMessage}
              />
            </div>
          )}

          {/* 前後移動 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={handlePrevQuestion}
              className="btn-wood-outline"
              disabled={currentIndex === 0}
              style={{
                opacity: currentIndex === 0 ? 0.4 : 1,
                flex: 1,
                justifyContent: "center",
              }}
            >
              まえの問題へ
            </button>
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn-wood"
              style={{ flex: 1, justifyContent: "center" }}
            >
              つぎの問題を記録する
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
