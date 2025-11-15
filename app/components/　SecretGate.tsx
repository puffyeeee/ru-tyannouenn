"use client";

import React from "react";

const STORAGE_KEY = "ruu-secret-ok";

export const SecretGate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unlocked, setUnlocked] = React.useState<boolean | null>(null);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const secret = process.env.NEXT_PUBLIC_APP_SECRET_CODE ?? "";

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.localStorage.getItem(STORAGE_KEY);
    if (flag === "yes") {
      setUnlocked(true);
    } else {
      setUnlocked(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) {
      setError("合言葉が設定されていないみたい…（開発用のエラー）");
      return;
    }
    if (input === secret) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "yes");
      }
      setUnlocked(true);
      setError(null);
    } else {
      setError("合言葉がちがうみたい。ルーちゃんだけのひみつの言葉を入れてね。");
    }
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUnlocked(false);
    setInput("");
    setError(null);
  };

  if (unlocked === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#666",
        }}
      >
        読み込み中だよ…
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff7fb",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 360,
            padding: "20px 18px",
            borderRadius: 16,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ fontSize: 20, marginBottom: 8 }}>ひみつの入り口</h1>
          <p
            style={{
              fontSize: 13,
              color: "#666",
              marginBottom: 12,
              whiteSpace: "pre-wrap",
            }}
          >
            ここはルーちゃん専用のお部屋だよ。
            {"\n"}
            いっしょに決めた「合言葉」を入れてね。
          </p>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              合言葉
            </label>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="三子ちゃんとチモシー"
              className="input-wood"
              style={{ marginBottom: 8 }}
            />
            {error && (
              <p
                style={{
                  fontSize: 12,
                  color: "#c0392b",
                  marginBottom: 8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {error}
              </p>
            )}
            <button type="submit" className="btn-wood" style={{ width: "100%" }}>
              入る
            </button>
          </form>

          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 8,
              width: "100%",
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px dashed #ddd",
              background: "#fff",
              fontSize: 11,
              color: "#999",
              cursor: "pointer",
            }}
          >
            合言葉を入れなおす
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
