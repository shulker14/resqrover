# ResQ Rover — deployable Netlify site

## Deploy
1. Push this folder to GitHub or drag it into Netlify using a Git-connected deploy.
2. In Netlify, enable **Identity** for the site.
3. Under Identity settings, keep email/password sign-up open if you want public account creation.
4. Add `OPENAI_API_KEY` in **Project configuration → Environment variables** with Functions scope. Optional: set `OPENAI_MODEL` (default: `gpt-6-luna`).
5. Deploy. Netlify will run `npm run build` and publish `dist/`.

## Local development
```bash
npm install
npm run dev
```
For full Netlify Identity/Functions behavior locally, use Netlify CLI (`netlify dev`).

## What works without configuration
- Guest session
- Location selection
- Dashboard session state
- Webcam camera preview
- Browser-side person detection with COCO-SSD
- Recent activity/session summary
- Project / How Rover works / Experience pages

## What needs Netlify configuration
- Email/password account login, signup, recovery: enable Netlify Identity
- Live Rover conversation: set `OPENAI_API_KEY`

The patrol map remains intentionally marked as not connected because no real rover telemetry endpoint was supplied.
