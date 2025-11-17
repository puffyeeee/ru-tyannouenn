# Observability Plan

## Analytics
- **Provider:** Firebase Analytics (gtag-based) using existing Firebase project `critter-743d3`.
- **Integration:** Load Google Analytics 4 snippet in `app/layout.tsx` with `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.
- **Events:** Automatic page_view events on route change; custom events can be sent via helper `logAnalyticsEvent`.

## Error Tracking
- **Provider:** Sentry (`@sentry/nextjs`).
- **Client Coverage:** Initialize in `sentry.client.config.ts` for browser errors and performance traces.
- **Server/Edge Coverage:** Mirror config in `sentry.server.config.ts` and `sentry.edge.config.ts` for API routes and middleware.
- **DSN:** `SENTRY_DSN` environment variable (runtime secret).

## Logging
- **Client:** Console logs reserved for debugging; production logging flows through Sentry breadcrumbs and events.
- **Server:** Use Sentry captureException/captureMessage inside API routes for structured errors.

## Deployment Automation
- **CI:** GitHub Actions workflow `firebase-deploy.yml` will run lint/build, then deploy via `firebase deploy --only hosting` using `FIREBASE_SERVICE_ACCOUNT` secrets.
- **Protection:** Workflow executes on `main` pushes and manual dispatch.

## Secrets Strategy
- `.env.local` for local dev (never committed).
- Firebase Hosting environment config (`firebase functions:secrets:set`/`firebase hosting:channel:openai`) for production `OPENAI_API_KEY`, `SENTRY_DSN`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.
- GitHub Actions uses Encrypted Secrets for `FIREBASE_SERVICE_ACCOUNT`, `SENTRY_AUTH_TOKEN` (optional for source maps).

## Feedback Loop
- Add `/docs/feedback.md` with template for stakeholders.
- Track submissions as GitHub issues labelled `feedback` for triage each iteration.
