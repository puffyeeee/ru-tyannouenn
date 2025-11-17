import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
let initialized = false;

export function register() {
  if (!dsn || initialized) {
    return;
  }

  initialized = true;

  Sentry.init({
    dsn,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.2),
    replaysSessionSampleRate: Number(
      process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? 0.1
    ),
    replaysOnErrorSampleRate: Number(
      process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? 1.0
    ),
    enabled: true,
  });
}
