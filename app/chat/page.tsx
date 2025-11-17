"use client";

import React from "react";
import { characters, CharacterId } from "@/lib/characters";
import { CharacterMessage } from "@/components/CharacterMessage";

type ChatMessage =
  | { from: "user"; text: string }
  | { from: "character"; text: string; characterId: CharacterId };

export default function ChatPage() {
  const [characterId, setCharacterId] = React.useState<CharacterId>("tia");
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      from: "character",
      characterId: "tia",
      text: "ティアだよ。ルーちゃん、なんとなく話したくなったら、なんでも聞いてみてね。",
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId,
          userMessage: text,
          history: messages.slice(-6),
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "character", characterId, text: data.message },
      ]);
    } catch (error) {
      console.error("Failed to fetch chat reply", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "character",
          characterId,
          text: "ちょっとお返事がうまく送れなかったみたい…。でも、ルーちゃんの話を聞けたのはうれしいよ。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectedChar = characters.find((c) => c.id === characterId)!;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>おしゃべりルーム</h2>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
        {selectedChar.name}とお話しできるよ。ルーちゃんの気持ちや、勉強のこととか、なんでも話してみてね。
      </p>

      <div style={{ marginBottom: 8 }}>
        <label
          style={{
            fontSize: 13,
            display: "block",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          だれと話す？
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCharacterId(c.id as CharacterId);
                setMessages([
                  {
                    from: "character",
                    characterId: c.id as CharacterId,
                    text:
                      `${c.name}だよ。ルーちゃん、ここに来てくれてうれしいな。\n` +
                      "話したいことや聞きたいこと、なんでも投げてみてね。",
                  },
                ]);
              }}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border:
                  characterId === c.id ? "2px solid #ff9ecb" : "1px solid #ddd",
                backgroundColor:
                  characterId === c.id ? "#fff0f6" : "#ffffff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {c.species === "rabbit" ? "🐰" : "🐶"} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 0",
          borderRadius: 12,
          backgroundColor: "#fff",
          border: "1px solid #eee",
          marginBottom: 10,
        }}
      >
        <div style={{ padding: "0 8px" }}>
          {messages.map((m, idx) =>
            m.from === "character" ? (
              <CharacterMessage
                key={idx}
                characterId={m.characterId}
                text={m.text}
              />
            ) : (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "8px 0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e1f5fe",
                    padding: "8px 10px",
                    borderRadius: 16,
                    maxWidth: "75%",
                    fontSize: 14,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder="ルーちゃんの気持ちや、話したいことを書いてみてね"
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: 8,
            fontSize: 14,
            resize: "none",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "none",
            background:
              "linear-gradient(135deg, #ffb6c1 0%, #ffd1ff 50%, #ffe4b5 100%)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            minWidth: 68,
          }}
        >
          {loading ? "…" : "送信"}
        </button>
      </div>
    </div>
  );
}