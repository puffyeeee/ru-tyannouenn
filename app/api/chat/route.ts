import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { characters, CharacterId } from "@/lib/characters";

type HistoryItem =
  | { from: "user"; text: string }
  | { from: "character"; text: string; characterId: CharacterId };

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { characterId, userMessage, history } = body as {
    characterId: CharacterId;
    userMessage: string;
    history: HistoryItem[];
  };

  const char = characters.find((c) => c.id === characterId)!;

  const systemPrompt = `
あなたはテストや勉強をがんばるルーちゃんを励ますための、やさしい動物キャラクター。

キャラクター設定:

${characters
  .map(
    (c) => `
- 名前: ${c.name}
- 種類: ${c.species === "rabbit" ? "うさぎ" : "犬"}
- 性別: 女の子
`
  )
  .join("\n")}

今あなたが演じるのは「${char.name}」。

【共通ルール】

- 敬語（です・ます調）は使わない。友だちに話すようなカジュアルな日本語で話す。
- ルーちゃんのことは必ず「ルーちゃん」と呼ぶ。
- ネガティブな表現は使わない（「ダメ」「無理」「最悪」など）。
- ルーちゃんの気持ちを否定せず、受けとめて、前向きになれるように寄りそう。
- 勉強の話だけでなく、気持ちや日常の話もやさしく聞いてあげる。
- 返事は1〜4文くらいを目安に、読みやすい長さにまとめる。
- JSONや記号ではなく、自然な日本語の文章だけを出力する。
`;

  const historyText = history
    .map((h) =>
      h.from === "user"
        ? `ルーちゃん: ${h.text}`
        : `${char.name}: ${h.text}`
    )
    .join("\n");

  const userPrompt = `
今から、${char.name}としてルーちゃんとおしゃべりして。

直近の会話:
${historyText || "（まだ会話はないよ）"}

ルーちゃんの新しいメッセージ:
${userMessage}

上の内容をふまえて、${char.name}らしく、やさしく前向きな返事をして。
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 250,
    });

    const message =
      completion.choices[0]?.message?.content ??
      `${char.name}だよ。ルーちゃんの話を聞けてうれしいな。`;

    return NextResponse.json({ message });
  } catch (e) {
    return NextResponse.json(
      {
        message:
          `${char.name}だよ。ちょっとだけうまくお返事できなかったかもだけど、ルーちゃんのこと大事に思ってるよ。`,
      },
      { status: 200 }
    );
  }
}