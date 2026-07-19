<div align="center">

# Echoed

**Turn one newsletter into every post it should have been.**

Paste a newsletter, pick a tone, get platform-native posts for X, LinkedIn, and Instagram — powered by Gemini.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-@google/genai-8E75B2?logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)

</div>

---

## Features

- Paste a newsletter, pick a tone (Casual / Professional / Witty), get three platform-native posts in one request
- Real AI generation via Google Gemini — no mock data, no placeholders
- Server-side validation (length, tone) with clear error messages
- Basic per-IP rate limiting on the API route
- Character-limit tracking per platform, with an over-limit warning in the UI
- Copy-to-clipboard on every result card, with a confirm state
- Graceful failure states — network errors, invalid AI output, upstream rate limits, and misconfiguration all surface a readable message instead of breaking the UI
- WebGL hero background (`PrismaticBurst`, via `ogl`) and a GSAP typing effect (`TextType`) on the headline

## Tech stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Motion / WebGL | `ogl` (hero shader background), GSAP (typing effect) |
| AI | Google Gemini API via `@google/genai`, model `gemini-3-flash-preview` |
| Backend | Standalone Express server (`server/index.ts`) |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## Architecture

Frontend and backend deploy **separately**:

- **Frontend** — static Vite build, deployed on Vercel
- **Backend** — a small Express API, deployed on Render, that talks to Gemini
- The frontend calls the backend over HTTPS (CORS-enabled), using the `VITE_API_URL` env var

Locally, you don't need two servers — `npm run dev` runs a Vite middleware that mimics the backend, so the whole app works with one command.

## Project structure

```
echoed/
├── server/
│   ├── index.ts               Standalone Express server (POST /api/generate)
│   └── _lib/
│       ├── handleGenerate.ts    Framework-agnostic handler (shared by server + local dev)
│       ├── gemini.ts             Prompt building + Gemini API call
│       ├── validate.ts           Request validation
│       └── rateLimit.ts          Basic in-memory per-IP rate limiter
├── src/
│   ├── components/             Reusable UI pieces (ToneSelector, ResultCard, PrismaticBurst, ...)
│   ├── sections/                Page sections (Hero, Generator, Results, Features, Footer, Nav)
│   ├── lib/
│   │   ├── shared.ts             Types + constants shared by frontend AND server (tones, platforms, limits)
│   │   ├── api.ts                Client-side fetch wrapper — calls VITE_API_URL
│   │   └── sampleData.ts         "Use a sample" newsletter text
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── vercel.json                 Vercel config (frontend only)
├── render.yaml                 Render Blueprint (backend only)
└── README.md
```

## Getting started (local dev)

```bash
npm install
cp .env.example .env
```

Add your key to `.env`:

| Variable | Where it's used | Required | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Backend | Yes | Get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GEMINI_MODEL` | Backend | No | Defaults to `gemini-3-flash-preview` |
| `ALLOWED_ORIGIN` | Backend | No | Comma-separated allowed frontend origins. Defaults to `*` |
| `VITE_API_URL` | Frontend | No | Leave unset locally — only needed once deployed |

Never commit `.env` — it's already in `.gitignore`.

```bash
npm run dev
```

Open `http://localhost:5173`. This single command runs the frontend **and** a local stand-in for the backend, so Generate works immediately.

## Build

```bash
npm run build
```

Type-checks the whole project (frontend **and** `server/`) via `tsc -b`, then builds the static frontend into `dist/`.

## Deployment

### 1. Backend → Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, point it at the repo — `render.yaml` configures everything automatically.
   (No blueprint? New → Web Service, Build Command `npm install`, Start Command `npm run start:server`.)
3. Add environment variables in Render: `GEMINI_API_KEY` (required), `GEMINI_MODEL` (optional), `ALLOWED_ORIGIN` (optional — set it once you know your Vercel URL, e.g. `https://echoed.vercel.app`).
4. Deploy. Note the resulting URL, e.g. `https://echoed-api.onrender.com`.

### 2. Frontend → Vercel

1. Import the same repo in Vercel.
2. Add environment variable `VITE_API_URL` = `https://echoed-api.onrender.com/api/generate` (your Render URL + `/api/generate`).
3. Deploy — `vercel.json` handles the rest.

### 3. Lock down CORS (optional but recommended)

Once you have your Vercel URL, set `ALLOWED_ORIGIN` on Render to that exact URL and redeploy the backend, so only your frontend can call it.

## API reference

### `POST /api/generate`

**Request body**

```json
{
  "newsletter": "string, 50–3000 characters",
  "tone": "casual" | "professional" | "witty"
}
```

**Success — `200`**

```json
{
  "success": true,
  "posts": {
    "x": "...",
    "linkedin": "...",
    "instagram": "..."
  }
}
```

**Error**

```json
{
  "success": false,
  "error": "Human-readable message"
}
```

| Status | Cause |
|---|---|
| `400` | Missing/invalid `newsletter` or `tone`, newsletter outside the 50–3000 character range |
| `404` | Unknown route |
| `429` | Per-IP rate limit exceeded (10 requests / 60s), or Gemini itself rate-limited the request — check the `Retry-After` header |
| `500` | Server misconfigured (missing `GEMINI_API_KEY`) |
| `502` | Gemini call failed, or returned a response that couldn't be parsed as the expected JSON shape |

The rate limiter is in-memory and best-effort — it resets on every backend restart. It's meant to blunt accidental request storms, not to be a hard security boundary.
