"use client";

import Link from "next/link";
import React from "react";
import { CharacterMessage } from "@/components/CharacterMessage";
import { getRandomCharacter } from "@/lib/characters";

export default function HomePage() {
  const [introCharId] = React.useState(getRandomCharacter().id);

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 4,
            padding: "10px 14px",
            borderRadius: 16,
            background:
              "linear-gradient(135deg, #f4d7a6 0%, #e2c091 40%, #d1aa7e 100%)",
            boxShadow: "0 4px 0 #b78a5f",
          }}
        >
          <span
            className="section-label"
            style={{ color: "#5a3a22", textTransform: "none" }}
          >
            森の勉強小屋
          </span>
          <h1
            style={{
              fontSize: 26,
              margin: 0,
              color: "#3b2b1a",
            }}
          >
            ルーちゃん応援PDFモード
          </h1>
        </div>
        <p
          style={{
            marginTop: 8,
            marginBottom: 12,
            fontSize: 13,
            color: "#7b6960",
          }}
        >
          ティア、もちゅ、シロップ、ぱふぃーといっしょに、
          PDFを見ながらルーちゃんのペースで勉強できるよ。
        </p>
      </header>

      <CharacterMessage
        characterId={introCharId}
        text={
          "ルーちゃん、今日もここに来てくれてありがとう。\nムリしないで、できるところだけいっしょにやってこっ。"
        }
      />

      <section
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Link
          href="/pdf-practice"
          className="btn-wood"
          style={{ textAlign: "center" }}
        >
          PDFを見ながら自己採点モード
        </Link>

        <Link
          href="/pdf-summary"
          className="btn-wood-outline"
          style={{ textAlign: "center", fontSize: 12 }}
        >
          PDFモードの記録一覧を見る（※まだ未実装なら後で追加）
        </Link>

        <Link
          href="/jokes"
          className="btn-wood-outline"
          style={{ textAlign: "center" }}
        >
          ランダムジョークの木へ
        </Link>
      </section>
    </div>
  );
}
