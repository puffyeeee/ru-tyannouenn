"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CharacterMessage } from "@/components/CharacterMessage";
import { getRandomCharacter } from "@/lib/characters";

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const total = Number(params.get("total") ?? 0);
  const correct = Number(params.get("correct") ?? 0);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const [aiMessage, setAiMessage] = React.useState<string | null>(null);
  const [aiCharacterId, setAiCharacterId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const run = async () => {
      setLoading(true);
      const char = getRandomCharacter();
      setAiCharacterId(char.id);

      try {
        const res = await fetch("/api/encourage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            characterId: char.id,
            correctCount: correct,
            totalCount: total,
            accuracy,
            wrongCount: total - correct,
            mood:
              accuracy >= 70
                ? "normal"
                : accuracy >= 40
                ? "a_bit_down"
                : "very_down",
            attemptNumber: 1,
            trendDescription: "",
          }),
        });

        if (!res.ok) {
          throw new Error("failed");
        }
        const data = await res.json();
        setAiMessage(data.message);
      } catch (e) {
        setAiMessage(
          `${char.name}だよ。ルーちゃん、ここまでやりきっただけで本当にすごいと思うんだ。\n点数よりも、チャレンジしたことをいっしょに喜びたいな。`
        );
      } finally {
        setLoading(false);
      }
    };

    if (total > 0) run();
  }, [accuracy, correct, total]);

  const friendlyText =
    accuracy >= 80
      ? "かなり理解できてきてるね。この調子で、ルーちゃんのペースでいこ。"
      : accuracy >= 50
      ? "土台ができてきた感じだよ。今日はまちがえたところをちょっとだけ見なおせたら、それで十分。"
      : "ここからがスタートって感じだね。少しずつ慣れていけば大丈夫。あせらなくていいよ。";

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>けっか</h2>
      <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
        ここまでがんばったルーちゃんを、まずはぎゅっとほめてあげよ。
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ margin: 0, marginBottom: 6 }}>
          正解数：{correct} / {total} 問
        </p>
        <p style={{ margin: 0, marginBottom: 6 }}>正解率：{accuracy}%</p>
        <p style={{ margin: 0, fontSize: 14, color: "#555" }}>{friendlyText}</p>
      </div>

      {loading && (
        <p style={{ fontSize: 13, color: "#888" }}>
          うさちゃんたちがメッセージを考え中…
        </p>
      )}

      {aiMessage && aiCharacterId && (
        <div style={{ marginTop: 12 }}>
          <CharacterMessage
            characterId={aiCharacterId as any}
            text={aiMessage}
          />
        </div>
      )}

      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ホームにもどる
        </button>
      </div>
    </div>
  );
}