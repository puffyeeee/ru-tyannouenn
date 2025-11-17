'use client';

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main className="global-error">
          <p>ごめんね、ちょっと休憩が必要みたい。</p>
          <button type="button" onClick={() => reset()}>
            もう一度やってみる
          </button>
        </main>
      </body>
    </html>
  );
}
