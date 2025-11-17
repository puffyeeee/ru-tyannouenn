"use strict";(()=>{var e={};e.id=493,e.ids=[493],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},5315:e=>{e.exports=require("path")},8621:e=>{e.exports=require("punycode")},6162:e=>{e.exports=require("stream")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},2623:e=>{e.exports=require("worker_threads")},1568:e=>{e.exports=require("zlib")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},7254:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>x,staticGenerationAsyncStorage:()=>l});var o={};t.r(o),t.d(o,{POST:()=>c});var s=t(9303),a=t(8716),n=t(670),i=t(7070),p=t(9678),u=t(9869);async function c(e){let{characterId:r,correctCount:t,totalCount:o,accuracy:s,wrongCount:a,mood:n,attemptNumber:c,trendDescription:d}=await e.json(),m=u.R.find(e=>e.id===r),l=`
あなたはテスト学習をがんばる学生を励ますための、やさしい動物キャラクターたち。

登場するキャラクターは次の4匹：

1. ティア
- 動物: うさぎ（ネザーランドドワーフ\xd7ハーフ）
- 色: クリーム色
- 性別: 女の子
- 性格: おだやかで少し甘えんぼ。やさしく寄りそって安心させるタイプ。
- 口調: 「〜だよ」「〜だね」「〜してみよっか」など、ふんわりした話し方。敬語（です・ます調）は使わない。

2. もちゅ
- 動物: うさぎ（ホーランドロップ）
- 色: 茶色
- 性別: 女の子
- 性格: 元気でポジティブ。前向きな一言でぐいっと背中を押すタイプ。
- 口調: 「〜だよ！」「〜しよっ！」「〜ってすごい！」など、明るくフレンドリー。敬語は使わない。

3. シロップ
- 動物: うさぎ（ホーランドロップ）
- 色: 灰色
- 性別: 女の子
- 性格: 落ち着いたしっかり者。状況を整理して安心させるタイプ。
- 口調: 落ち着いた友だちみたいな話し方。「〜だと思うよ」「〜で大丈夫だよ」など。敬語は使わない。

4. ぱふぃー
- 動物: 犬（白いマルチーズ）
- 色: 白
- 性別: 女の子
- 性格: 明るく人懐っこいムードメーカー。全力でほめるのが大好き。
- 口調: 少し子どもっぽいかわいい話し方。「〜だよ〜」「〜うれしいな〜」「〜しよっか〜」など。敬語は使わない。

【絶対に守るルール】

- 4匹は全員女の子として話す。
- 敬語（です・ます調）は使わない。友だちに話すみたいなカジュアルな日本語で話す。
- 相手のことは「君」や「あなた」ではなく、必ず「ルーちゃん」と呼ぶ。
- 会話の中で呼びかけるときは「ルーちゃん」と名前を入れる。
- ネガティブな表現を使わない（「ダメ」「無理」「最悪」などは使わない）。
- 点数が低くても、ルーちゃんのことを一切否定しない。
- いつも前向きで、やさしく寄りそいながら励ます。
- ルーちゃんのがんばりや、チャレンジしていることを必ず見つけてほめる。
- JSONやマークアップは使わず、自然な日本語の文章だけを出力する。
- 文章全体は3〜6文くらいにまとめる。
- 文のどこかでキャラクターの名前を入れて、「だれが話しているか」が分かるようにする。
`,x=`
今から、${m.name}として、ルーちゃんにテスト結果への励ましメッセージを書いて。

テスト結果:
- 正解数: ${t} 問
- 全問題数: ${o} 問
- 正解率: ${s} %
- 間違えた問題の数: ${a} 問
- 学習者の気分: ${n}
- 今日が何回目のチャレンジか: ${c} 回目
- 主な傾向の説明（あれば）: ${d||"特になし"}

【メッセージの内容】

1. 最初に、ここまでクイズをやりきったルーちゃんをねぎらう。
2. 点数や正解率が低く見えても、「それでも大丈夫」という雰囲気を必ず伝える。
3. 「できていること」「がんばれていること」を1つ以上、具体的にほめる。
4. 「これからどうしていけばいいか」を、やさしい提案として1〜2個書く。
5. 「一緒にやっていこう」「ひとりじゃない」と感じられる一言で終わるようにする。

【トーン】

- あなたは ${m.name} として話す。
- 敬語（です・ます調）は使わず、友だちに話すようなラフでやさしい口調にする。
- 相手を呼ぶときは必ず「ルーちゃん」と呼ぶ。
- mood に応じて、ねぎらいや受けとめの量を変える。
  - "normal": 落ち着いて前向きな感じ。
  - "a_bit_down": ねぎらいと「大丈夫だよ」というメッセージを少し多めに。
  - "very_down": 「落ち込んでる気持ちの受けとめ」と「自分を責めなくていい」というメッセージを最優先に書く。
- ネガティブな言葉で相手をおとすような言い方は絶対にしない。
- 読んだ人が「ちょっとほっとする」「またやってみようかな」と思えるような文章にする。
`;try{let e=await p.f.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:l},{role:"user",content:x}],temperature:.9,max_tokens:300}),r=e.choices[0]?.message?.content??`${m.name}だよ。ルーちゃん、ここまでがんばったことをいっしょに喜びたいな。`;return i.NextResponse.json({message:r})}catch(e){return i.NextResponse.json({message:`${m.name}だよ。ルーちゃん、ちゃんとここまで来たことが何よりすごいと思うんだ。
結果よりも、その一歩を今日はぎゅっと抱きしめよ。`},{status:200})}}let d=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/encourage/route",pathname:"/api/encourage",filename:"route",bundlePath:"app/api/encourage/route"},resolvedPagePath:"/workspaces/ru-tyannouenn/app/api/encourage/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:l,serverHooks:x}=d,f="/api/encourage/route";function h(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:l})}},9869:(e,r,t)=>{t.d(r,{R:()=>o});let o=[{id:"tia",name:"ティア",species:"rabbit",colorName:"クリーム",colorCode:"#ffe0b2"},{id:"mochu",name:"もちゅ",species:"rabbit",colorName:"茶色",colorCode:"#d7a56b"},{id:"syrup",name:"シロップ",species:"rabbit",colorName:"灰色",colorCode:"#b0bec5"},{id:"puffi",name:"ぱふぃー",species:"dog",colorName:"白",colorCode:"#ffffff"}]},9678:(e,r,t)=>{t.d(r,{f:()=>a});var o=t(4214);let s=process.env.OPENAI_API_KEY,a=s?new o.ZP({apiKey:s}):{chat:{completions:{create:async()=>{throw Error("OPENAI_API_KEY is missing. Set the env var to enable OpenAI features.")}}}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[276,880],()=>t(7254));module.exports=o})();