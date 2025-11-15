"use client";

import React from "react";
import { Character, CharacterId, characters } from "@/lib/characters";

type Props = {
  characterId: CharacterId;
  text: string;
};

export const CharacterMessage: React.FC<Props> = ({ characterId, text }) => {
  const character: Character =
    characters.find((c) => c.id === characterId) ?? characters[0];

  const emoji = character.species === "rabbit" ? "🐰" : "🐶";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        margin: "12px 0",
      }}
    >
      {/* 顔アイコン（木のフレーム付き） */}
      <div
        style={{
          padding: 4,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #d7b18b 0%, #c09363 40%, #a97a4c 100%)",
          boxShadow: "0 2px 0 #7a4a24",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: character.colorCode,
            border: "2px solid rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
          }}
        >
          <div style={{ textAlign: "center", lineHeight: 1.2 }}>
            <div style={{ fontSize: 20 }}>{emoji}</div>
            <div>{character.name}</div>
          </div>
        </div>
      </div>

      {/* 吹き出し */}
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          padding: "10px 14px",
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #f3ffe8 0%, #fffdf7 40%, #ffeaf2 100%)",
          border: "1px solid rgba(188, 209, 170, 0.9)",
          boxShadow: "0 3px 0 rgba(150, 171, 132, 0.9)",
        }}
      >
        {/* 吹き出しのしっぽ */}
        <div
          style={{
            position: "absolute",
            left: -9,
            top: 20,
            width: 0,
            height: 0,
            borderTop: "9px solid transparent",
            borderBottom: "9px solid transparent",
            borderRight: "9px solid #e9f9dd",
            filter: "drop-shadow(0 1px 0 rgba(150,171,132,0.7))",
          }}
        />
        <div
          style={{
            fontSize: 13,
            whiteSpace: "pre-wrap",
            color: "#4b3a2a",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};