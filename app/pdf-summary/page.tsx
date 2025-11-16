"use client";

import React from "react";

const PdfSummaryPage: React.FC = () => {
  return (
    <div
      style={{
        padding: 24,
        maxWidth: 800,
        margin: "0 auto",
        background: "#fff",
        color: "#32241a",
        lineHeight: 1.6,
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 22,
            marginBottom: 4,
            borderBottom: "1px solid #e0d2c6",
            paddingBottom: 4,
          }}
        >
          PDF 記録一覧（仮）
        </h1>
        <p style={{ fontSize: 12, color: "#7b6960" }}>
          PDF 練習でつけたメモなどを、あとで振り返れるようにする予定のページだよ。
        </p>
      </header>

      <section style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, marginBottom: 8 }}>
          本番では、日付ごとの学習ログや自己採点のメモをここに一覧で出して、
          ルーちゃんがどれくらい進んだかを穏やかに眺められるようにするつもり。
        </p>
        <p style={{ fontSize: 13 }}>
          今は準備中だから、プレースホルダーの文章だけ置いておくね。
          「この日ワンポイント」「ここが難しかった」みたいな小さなメモを並べるイメージで作っていくよ。
        </p>
      </section>

      <section
        style={{
          border: "1px solid #e0d2c6",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          background: "#fffdf7",
        }}
      >
        <p style={{ fontSize: 12, marginBottom: 4 }}>【サンプルログ】</p>
        <ul style={{ fontSize: 13, paddingLeft: 20 }}>
          <li>11/15 午後：保存分野を 20 問だけ PDF で確認。正答率 60%。</li>
          <li>11/16 朝：補綴の図問題を PDF で整理してメモ。要復習。</li>
          <li>11/16 夜：疲れてたから 5 問だけ見返して早寝。休息も大事。</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, color: "#7b6960" }}>
          ※本機能はのちほど正式に実装予定。
          それまではこのページで「次にやりたいこと」をメモする感じで使ってね。
        </p>
      </section>
    </div>
  );
};

export default PdfSummaryPage;
