# ru-tyannouenn

## Tech Stack
- Next.js 14 (App Router)
- React 18 with TypeScript
- Firebase Hosting (see `firebase.json`)

## Prerequisites
- Node.js 18+. Verify with `node -v`.
- npm 9+.
- Firebase CLI (`npm install -g firebase-tools`).
- Accounts for Firebase, OpenAI, and Sentry (optional but recommended).

## Initial Setup
```bash
npm install
cp .env.example .env.local # then add OPENAI_API_KEY and other secrets
```

## Environment Variables
Populate `.env.local` for development and mirror the same values in CI/Firebase for production builds.

| Name | Description |
| --- | --- |
| `OPENAI_API_KEY` | Required for OpenAI chat completions. Keep server-side only. |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | GA4 ID for Firebase Analytics. Public by design. |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | DSNs used by Sentry on the server and client. |
| `SENTRY_TRACES_SAMPLE_RATE` | Optional override for tracing sample rate. |
| `SENTRY_REPLAYS_SESSION_SAMPLE_RATE` / `SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE` | Optional overrides for Sentry Session Replay. |

For production, store the secrets as Firebase Hosting environment config so SSR/API routes can read them without baking credentials into the repo:

```bash
firebase env:set OPENAI_API_KEY "sk-..." --project critter-743d3
firebase env:set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID "G-XXXX" --project critter-743d3
firebase env:set SENTRY_DSN "https://..." NEXT_PUBLIC_SENTRY_DSN "https://..." --project critter-743d3
```

### GitHub Secrets (for CI)
Use the GitHub CLI (or repository settings) to provide the workflow secrets before enabling automatic deploys:

```bash
# Authenticating Firebase CLI
firebase login:ci

# Repository secrets
gh secret set FIREBASE_TOKEN --body "<token from firebase login:ci>"
gh secret set OPENAI_API_KEY --body "$OPENAI_API_KEY"
gh secret set SENTRY_DSN --body "$SENTRY_DSN"
gh secret set NEXT_PUBLIC_SENTRY_DSN --body "$NEXT_PUBLIC_SENTRY_DSN"
gh secret set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID --body "$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
```

## Local Development
```bash
npm run dev
```
App is served at http://localhost:3000. API routes under `app/api/**` proxy through the same dev server.

## Quality Checks
```bash
npm run lint
npm run build
```
`npm run build` lints, type-checks, and produces the production-ready `.next/` output.

## Observability
- `components/FirebaseAnalytics.tsx` injects GA4 scripts once `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` is configured.
- `@sentry/nextjs` (see `sentry.*.config.ts` and `instrumentation.ts`) captures browser, API route, and edge/server errors.
- Tune sampling via the `SENTRY_*` env vars above; leave them unset to fall back to the defaults committed in code.

## Continuous Deployment (GitHub Actions)
`.github/workflows/firebase-deploy.yml` runs on pushes to `main` (and manual dispatch). It performs `npm ci`, `npm run lint`, `npm run build`, then `firebase deploy --only hosting`.

Required GitHub secrets:

```bash
FIREBASE_TOKEN                    # output of `firebase login:ci`
OPENAI_API_KEY                    # forwarded to the build step
SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Recommended flow:**
- Rely on the GitHub Action for every merge to `main` so hosting always reflects the latest reviewed code.
- Use the manual deploy steps below only for hotfixes (e.g., before the workflow secrets are configured or when debugging).

## Firebase Hosting Deployment (manual)
```bash
npm run build
firebase login
firebase use default # or firebase use <your-project>
firebase deploy --only hosting
```
The Firebase config in `firebase.json` expects the Next.js build output. `firebase deploy --only hosting` uploads the optimized build immediately. Re-run `npm run build` whenever the source changes before redeploying.

## Feedback Loop
- Use the template in `docs/feedback.md` to capture stakeholder notes.
- Log each submission as a GitHub issue (label `feedback`) so it can be triaged in planning sessions.
