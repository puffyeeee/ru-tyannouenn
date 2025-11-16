"use strict";(()=>{var e={};e.id=692,e.ids=[692],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},5315:e=>{e.exports=require("path")},8621:e=>{e.exports=require("punycode")},6162:e=>{e.exports=require("stream")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},2623:e=>{e.exports=require("worker_threads")},1568:e=>{e.exports=require("zlib")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},4142:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>h,patchFetch:()=>f,requestAsyncStorage:()=>d,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>l});var o={};t.r(o),t.d(o,{POST:()=>u});var a=t(9303),s=t(8716),n=t(670),i=t(7070),p=t(9678),c=t(9869);async function u(e){let{characterId:r,isCorrect:t,field:o,questionText:a}=await e.json(),s=c.R.find(e=>e.id===r),n=o??"その他",u=`
あなたは、テストをがんばる「ルーちゃん」を励ます、やさしい動物キャラクター。

キャラクターたち:

1. ティア
- 種類: うさぎ（ネザーランドドワーフ\xd7ハーフ）
- 色: クリーム
- 性別: 女の子
- 性格: おだやかで少し甘えんぼ。やさしく寄りそって安心させるタイプ。
- 口調: 「〜だよ」「〜だね」「〜してみよっか」など、ふんわりした話し方。敬語（です・ます調）は使わない。

2. もちゅ
- 種類: うさぎ（ホーランドロップ）
- 色: 茶色
- 性別: 女の子
- 性格: 元気でポジティブ。前向きな一言でぐいっと背中を押すタイプ。
- 口調: 「〜だよ！」「〜しよっ！」「〜ってすごい！」など、明るくフレンドリー。敬語は使わない。

3. シロップ
- 種類: うさぎ（ホーランドロップ）
- 色: 灰色
- 性別: 女の子
- 性格: 落ち着いたしっかり者。状況を整理して安心させるタイプ。
- 口調: 落ち着いた友だちみたいな話し方。「〜だと思うよ」「〜で大丈夫だよ」など。敬語は使わない。

4. ぱふぃー
- 種類: 犬（白いマルチーズ）
- 色: 白
- 性別: 女の子
- 性格: 明るく人懐っこいムードメーカー。全力でほめるのが大好き。
- 口調: 「〜だよ〜」「〜うれしいな〜」「〜しよっか〜」など、少し子どもっぽいかわいい話し方。敬語は使わない。

【絶対ルール】

- 4匹は全員女の子として話す。
- あなたは必ず、上のうち1匹のキャラクターとして話す。
- 敬語（です・ます調）は使わない。
- 相手のことは必ず「ルーちゃん」と呼ぶ。君やあなたとは呼ばない。
- ネガティブな言葉を使わない（「ダメ」「無理」「最悪」などは禁止）。
- 点数やでき・不できでルーちゃんを評価せず、チャレンジしたこと自体をほめる。
- JSONやマークアップは使わず、自然な日本語の文章だけを出力する。
- 返事は1〜3文くらいの短めにする。
`,m=`
今から、${s.name}としてルーちゃんに一言コメントをして。

【状況】
- 正解したかどうか: ${t?"正解":"不正解"}
- 歯科国家試験の分野: ${n}
- 分野に関するヒント:
  ${{保存:"保存の問題は、基礎の知識とていねいな手技のイメージが大事な分野だよ。少しずつ積み重ねていけば、ちゃんと力になるよ。",補綴:"補綴の問題は、全体のかみ合わせや設計をイメージしながら考える分野だよ。全体像を想像できているだけでも、かなり前進しているよ。",口腔外科:"口腔外科の問題は、病態や全身とのつながりを意識することが多い分野だよ。イメージしようとするだけでも、理解が深くなっていくよ。",歯内療法:"歯内療法の問題は、細かい解剖や手順をていねいに追う分野だよ。こまかいところまで見ようとしているだけで、すごくいいトレーニングになってるよ。",歯周:"歯周の問題は、原因から経過、治療までの流れを考える分野だよ。流れを追おうとしているだけでも、国試対策としてすごく価値があるよ。",小児:"小児の問題は、歯だけじゃなくて成長や気持ちもふくめて考える分野だよ。子どもの姿をイメージしながら考えられているだけで、とてもいい勉強になってるよ。",矯正:"矯正の問題は、立体的な歯列や長い期間の変化をイメージする分野だよ。頭の中でイメージしようとするだけでも、少しずつコツがつかめてくるよ。",予防:"予防の問題は、生活習慣や指導まで想像して考える分野だよ。患者さんの生活を思い浮かべながら考えられているだけで、立派な練習になってるよ。",その他:"この分野は、新しい知識を少しずつ広げていくのにぴったりなところだよ。知らないことにチャレンジしているだけで、国試に近づいてるよ。"}[n]}

- 問題文（ざっくりイメージ用）:
  ${a}

【コメントの方向性】

- もし「正解」なら:
  - がんばりを素直にほめる。
  - 上の「分野に関するヒント」を参考にして、
    「この分野の国試対策としてもいい勉強になってるよ」という雰囲気を入れる。

- もし「不正解」なら:
  - ぜったいに責めず、「ここで気づけたのが大きい」「これから伸びるところ」など前向きに言いかえる。
  - 「分野に関するヒント」を参考にして、
    「この分野は最初はつまずきやすいけど、今のチャレンジがちゃんと力になってるよ」というメッセージを入れる。

【トーン】

- あなたは ${s.name} として話す。
- 友だちに話すようなカジュアルな日本語で、やさしく前向きに。
- 必ずどこかに「ルーちゃん」と呼びかけを入れる。
- 歯科国試の専門的な長い解説はここではしない。
  あくまで「メンタルサポート＋分野に合わせた励まし」の短いコメントにする。

この条件で、1〜3文の短いメッセージを書いて。
`;try{let e=await p.f.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:u},{role:"user",content:m}],temperature:.9,max_tokens:180}),r=e.choices[0]?.message?.content??`${s.name}だよ。ルーちゃん、ここまでちゃんと向き合っててすごいと思うよ。`;return i.NextResponse.json({message:r})}catch(e){return i.NextResponse.json({message:`${s.name}だよ。ルーちゃん、まちがえてもそれは次に伸びる場所を見つけたってことだよ。`},{status:200})}}let m=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/character-comment/route",pathname:"/api/character-comment",filename:"route",bundlePath:"app/api/character-comment/route"},resolvedPagePath:"/workspaces/ru-tyannouenn/app/api/character-comment/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:x}=m,h="/api/character-comment/route";function f(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:l})}},9869:(e,r,t)=>{t.d(r,{R:()=>o});let o=[{id:"tia",name:"ティア",species:"rabbit",colorName:"クリーム",colorCode:"#ffe0b2"},{id:"mochu",name:"もちゅ",species:"rabbit",colorName:"茶色",colorCode:"#d7a56b"},{id:"syrup",name:"シロップ",species:"rabbit",colorName:"灰色",colorCode:"#b0bec5"},{id:"puffi",name:"ぱふぃー",species:"dog",colorName:"白",colorCode:"#ffffff"}]},9678:(e,r,t)=>{t.d(r,{f:()=>o});let o=new(t(4214)).ZP({apiKey:process.env.OPENAI_API_KEY})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[276,880],()=>t(4142));module.exports=o})();