import "./globals.css";
import React, { Suspense } from "react";
import { SecretGate } from "@/components/SecretGate";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";

export const metadata = {
  title: "ルーちゃんの森の勉強小屋",
  description:
    "小さな動物たちとルーちゃんが、歯科国試の勉強をのんびり進める場所。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
        <SecretGate>
          <main className="main-wrapper">{children}</main>
        </SecretGate>
      </body>
    </html>
  );
}