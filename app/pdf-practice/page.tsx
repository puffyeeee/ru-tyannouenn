"use client";

import React from "react";

const PdfPracticePage: React.FC = () => {
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
      {/* タイトル部分 */}
      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 22,
            marginBottom: 4,
            borderBottom: "1px solid #e0d2c6",
            paddingBottom: 4,
          }}
        >
          PDF 練習モード（仮）
        </h1>
        <p style={{ fontSize: 12, color: "#7b6960" }}>
          PDF を見ながらでも読みやすいように、シンプルなレイアウトにしてあるページだよ。
        </p>
      </header>

      {/* 説明文 */}
      <section style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, marginBottom: 8 }}>
          ここでは、将来 PDF として出力することを想定した問題レイアウトを試す予定だよ。
        </p>
        <p style={{ fontSize: 13 }}>
          今はまだ準備中だから、簡単なテキストだけ置いておくね。
          あとで本番用の問題や図をここに並べて、PDF にして印刷したり、
          iPad で見ながら解けるようにしていく感じをイメージしてるよ。
        </p>
      </section>

      {/* 仮の問題ブロック */}
      <section
        style={{
          border: "1px solid #e0d2c6",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          background: "#fffdf7",
        }}
      >
        <p style={{ fontSize: 12, marginBottom: 4 }}>【例題 1】（サンプル）</p>
        <p style={{ fontSize: 13, marginBottom: 8 }}>
          森の小屋で、ルーちゃんが PDF を見ながらお勉強するとき、
          一番大事にしたいことはどれかな？
        </p>
        <ol style={{ fontSize: 13, paddingLeft: 20 }}>
          <li>文字が小さすぎず、読みやすいこと</li>
          <li>行間が詰まりすぎていないこと</li>
          <li>色が薄すぎず、コントラストがあること</li>
          <li>ページをめくるときに、内容が途中でブチっと切れないこと</li>
        </ol>
      </section>

      <section style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, color: "#7b6960" }}>
          ※いまはまだ「PDF 練習モード」のテスト段階だよ。
          ルーちゃんが本当に使いやすい形になるように、少しずつ一緒に育てていこ。
        </p>
      </section>
    </div>
  );
};

export default PdfPracticePage;
