// PDFビュー部分だけ抜粋（他のロジックは既存どおり）

      {/* PDFビュー */}
      <section
        className="card-wood"
        style={{
          marginBottom: 14,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <span className="section-label">森の勉強用PDF</span>
          <span style={{ color: "#7b6960" }}>
            窓の外のPDFを見ながら、下の木の机で記録していこうね。
          </span>
        </div>

        <div className="wood-frame">
          <div className="wood-frame-decoration">
            きょうの教材
          </div>
          <div className="wood-frame-inner">
            {currentPdfUrl ? (
              <iframe
                src={currentPdfUrl}
                style={{
                  width: "100%",
                  height: 420,
                  border: "none",
                  backgroundColor: "#f3eee4",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 420,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#9a8570",
                  padding: 16,
                  textAlign: "center",
                }}
              >
                まだPDFファイルが読み込まれていないみたい。
                <br />
                上の「PDFを追加する」から、ルーちゃんが使いたいPDFを選んでね。
              </div>
            )}
          </div>
          <div className="wood-frame-branch">
            🌿 風がすこしふいてるよ
          </div>
        </div>
      </section>