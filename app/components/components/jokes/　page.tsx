"use client";

import React from "react";

type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export default function JokesPage() {
  const [joke, setJoke] = React.useState<Joke | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!res.ok) {
        throw new Error("API error");
      }
      const data: Joke = await res.json();
      setJoke(data);
    } catch (e) {
      console.error(e);
      setError(
        "ジョークを持ってくるのに失敗しちゃった…。もう一回ためしてみてね。"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>ランダムジョークの木</h2>
      <p className="text-muted" style={{ marginBottom: 12 }}>
        森のどこかで、だれかがくすっと笑ってるかも。ボタンを押すと、英語のジョークがひとつ出てくるよ。
      </p>

      <section className="card-wood" style={{ marginBottom: 12 }}>
        {loading && <p>ジョークを探しに、森の中をおさんぽ中…</p>}

        {error && (
          <p className="text-error" style={{ whiteSpace: "pre-wrap" }}>
            {error}
          </p>
        )}

        {!loading && !error && joke && (
          <div>
            <p
              style={{
                fontSize: 15,
                marginBottom: 8,
                whiteSpace: "pre-wrap",
              }}
            >
              {joke.setup}
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {joke.punchline}
            </p>
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={fetchJoke}
        className="btn-wood"
        style={{ marginRight: 8 }}
        disabled={loading}
      >
        もう一個ジョークを聞く
      </button>
    </div>
  );
}
