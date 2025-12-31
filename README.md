# 1. Discuss – A Minimal Forum (Next.js + Prisma + Auth.js)

Discuss is a minimal forum app where users can create topics, publish posts, and discuss through threaded comments.  
Authentication is handled via GitHub OAuth (Auth.js / NextAuth v5), and all data is stored in Postgres via Prisma.

---

## 2. Overview

### Main Features

- GitHub sign-in / sign-out (Auth.js / NextAuth v5 + Prisma adapter)
- Create **Topics** (slug is validated: lowercase letters + dashes)
- Create **Posts** inside topics (title + content validation)
- **Threaded comments** (reply-to-comment via `parentId`)
- Post search (title/content)
- Home page “Top Posts” (by comment count)
- Dark mode + system theme + UI built with NextUI + Tailwind
- Page transitions via Framer Motion

### Tech Stack

- **Framework:** Next.js (App Router) + React
- **UI:** Tailwind CSS + NextUI
- **Auth:** Auth.js / NextAuth v5 (GitHub provider) + Prisma adapter
- **Database:** Postgres + Prisma ORM
- **Validation:** Zod
- **Animations:** Framer Motion

---

## 3. Requirements

- **Node.js**: 20.9+ (recommended for modern Next.js versions)
- **Postgres**: local (Docker or native install) or hosted (Vercel Postgres, Neon, Supabase, etc)
- A **GitHub OAuth App** for authentication (Client ID + Client Secret)

---

## 4. Installation

> **Important:** Prisma CLI reads environment variables from `.env` by default.  
> This repo runs the app using `.env.local`, so the simplest setup is to create **both** `.env.local` **and** `.env` (same values).

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client (local):

```bash
npm run prisma:generate:local
```

3. Run migrations (local):

```bash
npm run prisma:migrate:local
```

---

## 5. Environment Variables

Create **both** `.env.local` and `.env` in the project root.

```env
# -----------------------
# Database (Prisma / Postgres)
# -----------------------
POSTGRES_PRISMA_URL="postgresql://USER:PASSWORD@localhost:5432/discuss?schema=public"
POSTGRES_URL_NON_POOLING="postgresql://USER:PASSWORD@localhost:5432/discuss?schema=public"

# -----------------------
# GitHub OAuth (Auth.js / NextAuth)
# -----------------------
GITHUB_CLIENT_ID="your_github_oauth_client_id"
GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"

# -----------------------
# Auth secret / URL (recommended for production)
# -----------------------
AUTH_SECRET="generate_a_random_secret"
AUTH_URL="http://localhost:3000"

# Backwards-compatible names (still supported by NextAuth)
# NEXTAUTH_SECRET="generate_a_random_secret"
# NEXTAUTH_URL="http://localhost:3000"
```

### Notes

- **POSTGRES_PRISMA_URL** and **POSTGRES_URL_NON_POOLING** are required because the Prisma datasource uses them.
- **GITHUB_CLIENT_ID** and **GITHUB_CLIENT_SECRET** are required (the app throws on startup if missing).
- **AUTH_SECRET / AUTH_URL** are recommended for production stability (host trust + correct redirects).

---

## 6. Key Dependencies

Backend / Full-stack:

- `next`
- `prisma`, `@prisma/client`
- `next-auth` (Auth.js / NextAuth v5), `@auth/core`, `@auth/prisma-adapter`
- `zod`

UI:

- `@nextui-org/react`
- `tailwindcss`
- `framer-motion`
- `next-themes`

---

## 7. NPM Scripts

```text
npm run dev                    # Start Next.js dev server (loads .env.local via dotenv-cli)
npm run build                  # Run prisma migrate deploy + next build (expects env vars in the environment)
npm run start                  # Start Next.js production server
npm run lint                   # Lint

npm run prisma:generate:local  # Generate Prisma client using .env.local
npm run prisma:migrate:local   # Run prisma migrate dev using .env.local
```

---

## 8. Running the App (Development)

```bash
npm run dev
```

Then open:

- App: `http://localhost:3000`

---

## 9. Routes

### Pages

- `/` – topic list, counters, top posts, create topic
- `/topics/[slug]` – topic page + posts list + post creation form
- `/topics/[slug]/posts/[postId]` – post detail + comment thread + reply UI
- `/search?term=...` – search results

### API

- `/api/auth/[...nextauth]` – Auth.js (NextAuth) route handlers

---

## 10. Database Schema (High Level)

Prisma models include:

- **User / Account / Session / VerificationToken** (Auth.js)
- **Topic** → has many posts
- **Post** → belongs to a topic + user; has many comments
- **Comment** → belongs to a post + user; supports threaded replies via `parentId`

Migrations live in `prisma/migrations`.

---

## 11. Deployment (Vercel)

Typical production setup:

1. Create a hosted Postgres database (e.g., Vercel Postgres)
2. Add env vars in the hosting dashboard:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `AUTH_SECRET`
   - `AUTH_URL` (your production domain)
3. Build command:
   - `npm run build`
4. Start command:
   - `npm run start`

---

## 12. Quick Start Summary

```bash
# 1) Create .env.local and .env
# 2) Install dependencies
npm install

# 3) Generate Prisma client + migrate
npm run prisma:generate:local
npm run prisma:migrate:local

# 4) Run
npm run dev
```
