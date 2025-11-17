import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.2),
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  enabled: Boolean(dsn),
});
