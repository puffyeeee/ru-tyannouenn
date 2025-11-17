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

### Firebase Hosting environment steps
1. Copy your local values into production by piping `.env.local` through `firebase env:set ...` as above.
2. Verify the settings anytime with `firebase env:get --project critter-743d3` (add `> .env.production` if you want a backup).
3. When rotating keys, update Firebase first, then redeploy so SSR/API routes receive the new values.

### GitHub Actions secrets
Set the same values in your GitHub repository so the CI workflow can build with identical configuration. From the repo root you can use the CLI:

```bash
gh secret set OPENAI_API_KEY --body "sk-live-..."
gh secret set SENTRY_DSN --body "https://..."
gh secret set NEXT_PUBLIC_SENTRY_DSN --body "https://..."
gh secret set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID --body "G-XXXXXXX"
gh secret set FIREBASE_TOKEN --body "$(firebase login:ci)"
```

Alternatively, navigate to **GitHub → Settings → Secrets and variables → Actions** and paste the values manually.

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

Once those secrets exist, prefer letting the workflow deploy automatically on every `main` push. Keep the manual Firebase command (below) for hotfixes or when you explicitly need to bypass CI.

> Hosting uses Firebase's Web Frameworks integration (`frameworksBackend`). During deploy the Firebase CLI builds your Next.js SSR bundle and provisions the serving infrastructure (Cloud Functions + Hosting rewrites) automatically.

## Firebase Hosting Deployment (manual)
```bash
npm run lint
npm run build
firebase login
firebase experiments:enable webframeworks
firebase use default # or firebase use <your-project>
firebase deploy --only hosting
```
The CLI's web frameworks support will rebuild your Next.js app and push both the Hosting assets and the SSR backend. Re-run the commands above whenever you need to hotfix outside of CI.
## Feedback Loop
- Use the template in `docs/feedback.md` to capture stakeholder notes.
- Log each submission as a GitHub issue (label `feedback`) so it can be triaged in planning sessions.
