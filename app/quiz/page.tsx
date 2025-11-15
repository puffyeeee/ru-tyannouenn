// 中身ロジックは前回のものと同じで、スタイル部分だけ変更

// ...imports はそのまま

// return の JSX 部分だけ抜粋（中のロジックは省略）

return (
  <div>
    <h2 style={{ fontSize: 22, marginBottom: 4 }}>クイズ</h2>
    <p style={{ fontSize: 13, color: "#7b6960", marginBottom: 14 }}>
      ルーちゃんのペースで、森の小屋でのんびり解いていこ。
    </p>

    <p style={{ fontSize: 12, marginBottom: 8 }}>
      問題 {currentIdx + 1} / {questions.length}
    </p>

    <div className="card-wood" style={{ marginBottom: 16 }}>
      <p style={{ marginBottom: 8, lineHeight: 1.6 }}>
        {currentQuestion.text}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {currentQuestion.choices.map((choice, idx) => {
          const selected =
            answers.find((a) => a.questionId === currentQuestion.id)
              ?.selectedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={
                "btn-choice" + (selected ? " selected" : "")
              }
            >
              {String.fromCharCode(65 + idx)}. {choice}
            </button>
          );
        })}
      </div>
    </div>

    <button onClick={handleNext} className="btn-wood">
      {currentIdx === questions.length - 1 ? "これでおわる" : "つぎの問題へ"}
    </button>

    {/* 以下、feedback / 解説 / コメント部分は、以前のコンポーネント＋className差し替えでOK */}
  </div>
);