"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},5315:e=>{e.exports=require("path")},8621:e=>{e.exports=require("punycode")},6162:e=>{e.exports=require("stream")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},2623:e=>{e.exports=require("worker_threads")},1568:e=>{e.exports=require("zlib")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},9940:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>l});var o={};t.r(o),t.d(o,{POST:()=>c});var a=t(9303),s=t(8716),i=t(670),n=t(7070),p=t(9678),u=t(9869);async function c(e){let{characterId:r,userMessage:t,history:o}=await e.json(),a=u.R.find(e=>e.id===r),s=`
あなたはテストや勉強をがんばるルーちゃんを励ますための、やさしい動物キャラクター。

キャラクター設定:

${u.R.map(e=>`
- 名前: ${e.name}
- 種類: ${"rabbit"===e.species?"うさぎ":"犬"}
- 性別: 女の子
`).join("\n")}

今あなたが演じるのは「${a.name}」。

【共通ルール】

- 敬語（です・ます調）は使わない。友だちに話すようなカジュアルな日本語で話す。
- ルーちゃんのことは必ず「ルーちゃん」と呼ぶ。
- ネガティブな表現は使わない（「ダメ」「無理」「最悪」など）。
- ルーちゃんの気持ちを否定せず、受けとめて、前向きになれるように寄りそう。
- 勉強の話だけでなく、気持ちや日常の話もやさしく聞いてあげる。
- 返事は1〜4文くらいを目安に、読みやすい長さにまとめる。
- JSONや記号ではなく、自然な日本語の文章だけを出力する。
`,i=o.map(e=>"user"===e.from?`ルーちゃん: ${e.text}`:`${a.name}: ${e.text}`).join("\n"),c=`
今から、${a.name}としてルーちゃんとおしゃべりして。

直近の会話:
${i||"（まだ会話はないよ）"}

ルーちゃんの新しいメッセージ:
${t}

上の内容をふまえて、${a.name}らしく、やさしく前向きな返事をして。
`;try{let e=await p.f.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:s},{role:"user",content:c}],temperature:.9,max_tokens:250}),r=e.choices[0]?.message?.content??`${a.name}だよ。ルーちゃんの話を聞けてうれしいな。`;return n.NextResponse.json({message:r})}catch(e){return n.NextResponse.json({message:`${a.name}だよ。ちょっとだけうまくお返事できなかったかもだけど、ルーちゃんのこと大事に思ってるよ。`},{status:200})}}let m=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"/workspaces/ru-tyannouenn/app/api/chat/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:x}=m,f="/api/chat/route";function h(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:l})}},9869:(e,r,t)=>{t.d(r,{R:()=>o});let o=[{id:"tia",name:"ティア",species:"rabbit",colorName:"クリーム",colorCode:"#ffe0b2"},{id:"mochu",name:"もちゅ",species:"rabbit",colorName:"茶色",colorCode:"#d7a56b"},{id:"syrup",name:"シロップ",species:"rabbit",colorName:"灰色",colorCode:"#b0bec5"},{id:"puffi",name:"ぱふぃー",species:"dog",colorName:"白",colorCode:"#ffffff"}]},9678:(e,r,t)=>{t.d(r,{f:()=>o});let o=new(t(4214)).ZP({apiKey:process.env.OPENAI_API_KEY})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[276,880],()=>t(9940));module.exports=o})();