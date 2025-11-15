"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { DentalField } from "@/lib/quiz";

type PdfQuestionRecord = {
  id: string;
  problemNumber: string;
  questionLabel: string;
  isCorrect: boolean | null;
  memo: string;
  field: DentalField | "未選択";
  originalIndex: number; // 0-based: records配列の位置
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
      isCorrect: typeof r.isCorrect === "boolean" ? r.isCorrect : null,
      memo: r.memo ?? "",
      field: r.field ?? "未選択",
      originalIndex: idx,
    }));
  } catch {
    return [];
  }
}