"use client";

import React from "react";

export default function AdminQuestionsPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, marginBottom: 12 }}>問題管理（仮）</h1>
      <p style={{ fontSize: 13, color: "#7b6960", marginBottom: 16 }}>
        ここは管理者用の問題編集ページだよ。今はまだ準備中だから、森の小屋でのんびり待っててね。
      </p>

      <div style={{ marginBottom: 10 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          歯科国試の分野
        </label>
        <select
          value="その他"
          onChange={() => {}}
          style={{
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: "6px 8px",
            fontSize: 13,
          }}
        >
          <option value="その他">その他</option>
        </select>
      </div>
    </div>
  );
}
