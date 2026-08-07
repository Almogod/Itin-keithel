# Itin Keithel — Architecture

> Enterprise architecture reference. Read alongside [PRD.md](./PRD.md), [DESIGN.md](./DESIGN.md), and [DATA_MODELS.md](./DATA_MODELS.md).
>
> **Path (2026-08-07):** the **target** architecture below is a Turborepo monorepo with 5 apps + 8 packages. The **current phase** ships a **single Next.js app** at the repo root, structured internally so it maps 1:1 into `apps/web` when the monorepo is extracted (see [ROADMAP.md — Phase M](./ROADMAP.md)). Every folder in `src/` corresponds to a future package (`src/components` → `packages/ui`, `src/services` → `packages/services`, `src/types` → `packages/types`, `src/config` → `packages/config`, `src/lib` → `packages/utils` + `packages/hooks`, `src/styles/tokens.css` → `packages/config/tokens.css`).

---

## 0. What we are building

Itin Keithel is not a website. It is a **platform** of independent applications backed by a **single API** and a **single database**, deployed on a single VPS today and horizontally on multiple VPS nodes tomorrow. Every application in the platform is built from the same shared design system, types, and services — so consistency is a structural guarantee, not a discipline.

The entire system will live in **one monorepo** (Turborepo) once Phase M lands so that:
- A design change lands once and every app sees it.
- A type change forces every consumer to compile against the new shape.
- Independent apps can still be **deployed independently** with different domains, uptimes, and scaling profiles.

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Monorepo | **Turborepo** + **pnpm workspaces** | Task graph + remote cache; workspace-native installs |
| Frontend | **Next.js 16** (App Router) + **React 19** | Server Components by default, Client only when needed |
| Language | **TypeScript** (strict) | No `any`. `unknown` at boundaries. |
| Styling | **Tailwind CSS v4** | Design tokens exposed as CSS variables, shared across apps |
| Motion | **Framer Motion** + **GSAP** | FM for component-level, GSAP for scroll/timeline choreography |
| Icons | **lucide-react** | Single icon library — no mixing |
| Lint | **ESLint 9** (shared config) | Type-aware rules |
| Backend (later) | **Next.js Route Handlers** in `apps/api` | Single API surface for all frontends |
| Database (later) | **MongoDB + Mongoose** | Schemas mirror `packages/types` |
| Storage | **VPS local filesystem** — see §3 | Provider-agnostic seam; no R2/S3/Firebase/Supabase |
| Email (later) | **Zoho Mail** (SMTP) | Called only from `apps/api` |
| Auth (later) | Custom (Route Handler + JWT + refresh in httpOnly cookie) | Deferred; not in this phase |
| Deployment | **Ubuntu VPS + Nginx + PM2** | Each app is a separate PM2 process behind a shared Nginx |
| Cache (later) | **Redis** | Sessions, hot reads, rate limits — all in `apps/api` |
| Search (later) | **Meilisearch** or **Typesense** | Indexer lives in `apps/api`; frontends query it via the API |

**Not in this phase:** any backend logic, MongoDB, Zoho, auth, payments, `localStorage` domain persistence. Everything simulated by `packages/services` in **mock mode**.

## 2. Platform Topology

```
                       ┌────────────────────────────┐
   itin-keithel.com ──▶│ apps/web        (Customer) │
   vendor.…            │ apps/vendor     (Vendor)   │
   admin.…             │ apps/admin      (Admin)    │
   support.…           │ apps/support    (Support)  │
                       └───────────┬────────────────┘
                                   │  HTTPS (via packages/services)
                                   ▼
                       ┌────────────────────────────┐
   api.itin-keithel.com│ apps/api        (Backend)  │  Next.js Route Handlers
                       └───────────┬────────────────┘
                                   │
                       ┌───────────┴────────────────┐
                       │  MongoDB  │  VPS FS uploads │
                       │  Redis    │  Zoho SMTP      │
                       └────────────────────────────┘
```

Rules:
1. **Frontend apps never talk to MongoDB.** They call `apps/api` via `packages/services`.
2. **`apps/api` is the single source of truth** for business logic, validation, authorisation, and persistence.
3. **Shared code lives in `packages/*`.** Nothing duplicated between apps.
4. **Domains, sessions, and rate limits are per-app**, but authentication targets a single identity system (later).

## 3. Storage Strategy (VPS Local Filesystem)

All uploaded assets live on the **VPS filesystem**, outside every app's source tree. **No external object storage** is used — Cloudflare R2, AWS S3, Firebase Storage, Supabase Storage, and equivalents are explicitly excluded. The architecture is designed so swapping to object storage later is a **single-module change** (the storage driver) with no repercussions elsewhere.

### Filesystem layout (production VPS)

```
/var/www/itin-keithel/
├── uploads/
│   ├── products/
│   ├── vendors/
│   ├── users/
│   ├── banners/
│   ├── reviews/
│   ├── guilds/
│   ├── certificates/
│   ├── appointments/
│   └── temp/          # incoming multipart writes before validation/optimisation
```

- **Never** placed inside any app's `src/` or `public/`.
- Nginx serves `/uploads/*` directly with far-future cache headers (content-hashed at write time).
- Only `apps/api` writes and deletes.

### Scale-oriented sharding

Under each bucket, files are sharded by the first characters of the file UUID:

```
uploads/products/8f/3a/8f3a1c2e-…/original.webp
                              /large.webp
                              /medium.webp
                              /thumbnail.webp
```

Two-level shard → up to 65 536 shard directories, keeping directory sizes manageable at hundreds of thousands of images.

### MongoDB persistence

Only relative paths are stored:

```json
{ "images": ["/uploads/products/8f/3a/…/large.webp"] }
```

Frontend consumes these as-is (Nginx maps them to disk). Future storage swaps do not invalidate documents.

### Storage service (module: `apps/api/src/server/storage/`)

The **rest of the platform never touches the filesystem.** Every read/write/delete goes through this module.

```
apps/api/src/server/storage/
├── index.ts       # public API — the only import surface for callers
├── upload.ts      # validate → optimise → write → return path(s)
├── delete.ts      # remove all sizes (best-effort, idempotent)
├── optimize.ts    # sharp-based WebP conversion + responsive sizes
├── paths.ts       # bucket enum + UUID sharding
└── driver/
    ├── local.ts   # writes to /var/www/itin-keithel/uploads
    └── types.ts   # StorageDriver interface — implement to add S3/R2/etc.
```

Public API (contract stays the same across drivers):

```ts
export type Bucket =
  | 'products' | 'vendors' | 'users' | 'banners'
  | 'reviews'  | 'guilds'  | 'certificates' | 'appointments';

export interface StoredImage {
  original: string;
  large: string;
  medium: string;
  thumbnail: string;
  width: number;
  height: number;
  bytes: number;
  mime: 'image/webp';
}

export async function uploadImage(input: {
  bucket: Bucket;
  file: File | Buffer;
  filename: string;
  ownerId?: string;
}): Promise<StoredImage>;

export async function deleteImage(path: string): Promise<void>;
```

`StorageDriver` interface = the seam:

```ts
export interface StorageDriver {
  write(relPath: string, bytes: Buffer, contentType: string): Promise<void>;
  delete(relPath: string): Promise<void>;
  exists(relPath: string): Promise<boolean>;
}
```

Switching to R2/S3 later = one new driver file + a config flag. Zero UI or service changes.

### Image processing rules

Enforced in `optimize.ts` (sharp in production, no-op stub in this phase):

1. Convert to **WebP** on ingest.
2. **Preserve aspect ratio** (crops require explicit opt-in per bucket).
3. Generate three responsive sizes in addition to `original`:
   - `thumbnail` — 320 px longest edge, q 75
   - `medium` — 800 px longest edge, q 82
   - `large` — 1600 px longest edge, q 85
4. **UUID v4** filenames — caller-supplied names never touch disk.
5. Reject anything outside `{ image/jpeg, image/png, image/webp, image/avif }`. MIME-sniff, don't trust the extension.
6. Size limits (config in `packages/config`): 8 MB product, 4 MB avatar/review, 12 MB banner.
7. Temp writes land in `uploads/temp/`, then atomic-rename into the shard directory.
8. Deletes are idempotent.

Capacity: at ~400 KB per asset across all sizes, 500 GB comfortably supports ≥ 1.2 M images.

## 4. Complete Folder Structure

```
itin-keithel/                             # monorepo root
├── package.json                           # workspace root + turbo scripts
├── pnpm-workspace.yaml                    # workspaces: apps/*, packages/*
├── turbo.json                             # task pipeline (build, lint, dev, typecheck)
├── tsconfig.base.json                     # extended by every package/app
├── .npmrc                                 # pnpm settings
├── docs/                                  # PRD, ARCHITECTURE, DESIGN, DATA_MODELS, ROADMAP, STATUS
│
├── apps/
│   ├── web/                               # Customer marketplace          (this phase)
│   ├── vendor/                            # Vendor dashboard              (this phase)
│   ├── admin/                             # Admin control tower           (this phase)
│   ├── support/                           # Customer support workspace    (this phase)
│   ├── api/                               # Next.js backend (Route Handlers) — STUB in this phase
│   └── delivery/                          # Delivery partner portal — PLACEHOLDER only
│
└── packages/
    ├── ui/                                # design-system components
    ├── types/                             # domain TypeScript interfaces
    ├── config/                            # shared runtime config (constants, tokens, env)
    ├── eslint-config/                     # shared ESLint preset
    ├── tsconfig/                          # shared TS presets (base, nextjs, react-library, node)
    ├── utils/                             # framework-agnostic helpers
    ├── hooks/                             # shared React hooks
    └── services/                          # shared API client / data-access seam
```

### 4.1 `apps/*` — Frontend app skeleton

Each frontend app (`web`, `vendor`, `admin`, `support`) uses **the same internal shape** so an engineer can navigate any of them identically:

```
apps/<app-name>/
├── package.json                # deps: only what THIS app needs
├── next.config.mjs
├── tsconfig.json               # extends packages/tsconfig/nextjs.json
├── postcss.config.mjs
├── tailwind.config.ts          # imports theme from packages/config
├── .env.local.example
├── public/                     # static, versioned assets ONLY — never uploads
│   └── favicon.ico
└── src/
    ├── app/                    # Next.js routes (thin — no business logic)
    │   ├── (group)/            # route groups per section
    │   ├── _actions/           # top-level Server Actions (wrappers over services)
    │   ├── api/                # Route Handlers (webhooks & internal only — external API is apps/api)
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   ├── loading.tsx
    │   └── globals.css
    ├── features/               # feature modules (see §5)
    │   └── <feature>/{components,containers,hooks,types.ts,index.ts}
    ├── components/             # app-specific components (never shared)
    ├── providers/              # ThemeProvider, ToastProvider, SessionProvider, …
    └── constants/              # app-specific route paths, feature flags
```

- **`packages/ui` provides the primitives.** `apps/<app>/src/components/` is only for components that are **specific to that app** and would not make sense in another app.
- **`packages/services` is the only source of network calls.** Each app imports it; no app duplicates fetching logic.
- **`apps/<app>/src/app/api/`** is reserved for app-local Route Handlers (e.g., a per-app health check). The public product API lives in `apps/api`.

### 4.2 `apps/api/` — Backend

```
apps/api/
├── package.json
├── next.config.mjs
├── tsconfig.json               # extends packages/tsconfig/node.json
├── .env.local.example
└── src/
    ├── app/
    │   ├── api/                # Route Handlers — the platform's public API
    │   │   ├── v1/
    │   │   │   ├── products/
    │   │   │   ├── categories/
    │   │   │   ├── guilds/
    │   │   │   ├── vendors/
    │   │   │   ├── orders/
    │   │   │   ├── users/
    │   │   │   ├── reviews/
    │   │   │   ├── coupons/
    │   │   │   ├── banners/
    │   │   │   ├── notifications/
    │   │   │   ├── appointments/
    │   │   │   ├── search/
    │   │   │   ├── uploads/     # multipart → storage service
    │   │   │   └── health/
    │   │   └── webhooks/       # payment gateway, email delivery, …
    │   └── layout.tsx          # minimal — this app renders nothing user-facing
    └── server/                 # server-only code (never imported by apps/*)
        ├── db/                 # mongoose connection + models
        ├── repositories/       # thin wrappers around models (all queries live here)
        ├── validation/         # zod schemas per endpoint (request/response)
        ├── services/           # backend business logic (composes repositories)
        ├── storage/            # VPS filesystem storage (see §3)
        ├── mailer/             # Zoho SMTP adapter
        ├── cache/              # Redis adapter
        └── search/             # Meilisearch/Typesense adapter
```

In this frontend-only phase, `apps/api` is scaffolded with folders + a `/health` handler but no live endpoints. `packages/services` runs in **mock mode** and does not call it yet.

### 4.3 `apps/delivery/` — Placeholder

```
apps/delivery/
├── package.json                # scaffolded but not wired into turbo pipeline
├── README.md                   # future scope + non-goals
└── src/app/page.tsx            # "Coming soon" screen using packages/ui
```

Only reason it exists now: to reserve the workspace path so the future team can land the app without touching monorepo config.

### 4.4 `packages/*` — Shared code

```
packages/
├── ui/                         # design-system primitives + composed patterns
│   ├── src/
│   │   ├── primitives/         # Button, Input, Modal, Drawer, Toast, Tabs, Accordion, …
│   │   ├── patterns/           # ProductCard, CategoryCard, ReviewCard, EmptyState, ErrorState, …
│   │   ├── layout/             # Container, Section, Grid, Stack, Cluster
│   │   ├── motion/             # <FadeIn>, <Reveal>, <StaggerList>, transition primitives
│   │   ├── icons/              # icon wrappers (all backed by lucide-react)
│   │   └── index.ts
│   ├── package.json            # peerDeps: react, react-dom
│   └── tsconfig.json
│
├── types/                      # single source of truth for domain models
│   ├── src/
│   │   ├── common.ts | address.ts | media.ts | pagination.ts
│   │   ├── category.ts | guild.ts | gi.ts | product.ts | artisan.ts
│   │   ├── collection.ts | cart.ts | order.ts | user.ts | delivery.ts
│   │   ├── review.ts | coupon.ts | notification.ts | appointment.ts
│   │   ├── hamper.ts | banner.ts | analytics.ts | api.ts
│   │   └── index.ts
│   └── package.json
│
├── config/                     # runtime + build config that must not diverge
│   ├── src/
│   │   ├── env.ts              # zod-validated env parsing
│   │   ├── routes.ts           # ROUTES.PRODUCT_DETAIL(slug), etc.
│   │   ├── enums.ts            # OrderStatus, UserRole, …
│   │   ├── uploads.ts          # size/MIME limits, bucket names
│   │   ├── tokens.css          # CSS variables (colors, typography, spacing, motion)
│   │   ├── tailwind.preset.ts  # shared Tailwind preset consumed by every app
│   │   └── index.ts
│   └── package.json
│
├── eslint-config/              # shared ESLint preset (base + next + react-library)
├── tsconfig/                   # base / nextjs / react-library / node presets
├── utils/                      # pure helpers: cn, currency, date, slug, formatters, guards
├── hooks/                      # useMediaQuery, useDebounce, useLockBody, useIntersection, useGsap
└── services/                   # API client + service functions (see §6)
    └── src/
        ├── http.ts             # thin fetch wrapper (adds auth, base URL, envelope handling)
        ├── mock/               # mock catalog + fixtures used when NEXT_PUBLIC_MOCK=1
        ├── products.service.ts
        ├── categories.service.ts
        ├── guilds.service.ts
        ├── vendors.service.ts
        ├── orders.service.ts
        ├── cart.service.ts
        ├── users.service.ts
        ├── reviews.service.ts
        ├── coupons.service.ts
        ├── banners.service.ts
        ├── notifications.service.ts
        ├── appointments.service.ts
        ├── search.service.ts
        ├── media.service.ts
        └── index.ts
```

## 5. Why Each App and Package Exists

Explicit rationale — future engineers should not have to guess intent.

### Apps

| App | Why it exists | Owns |
|---|---|---|
| **`apps/web`** | The public storefront. Optimised for anonymous discovery, SEO, and conversion. Highest traffic — must be independently scalable. | Marketing, product discovery, cart, checkout, orders, profile, static pages. |
| **`apps/vendor`** | Artisans and guilds run their businesses here. Very different UX from the storefront (dense data grids, forms, analytics). Must be **behind auth** (later) and can carry heavier client bundles. | Product & inventory management, order fulfilment, analytics, reviews, messages, vendor settings. |
| **`apps/admin`** | Internal operations tower. Editorial control (banners, collections), platform-level analytics, moderation. Access strictly controlled. | Site-wide dashboards, vendor management, customer management, banners, categories, guild management, reports, site settings. |
| **`apps/support`** | Customer support desk. Latency-sensitive interactions (lookups, tickets, chat). Separate from admin so ops and support have distinct permissions and audit trails. | Customer lookup, order investigation, refunds, complaints, tickets, live chat UI, knowledge base. |
| **`apps/api`** | Single backend. Every write and every read flows through here. Isolates DB, mailer, storage, and cache behind one HTTP surface. Independently deployable and scalable. | Public API (Route Handlers), business logic, MongoDB access, storage, mailer, cache, search. |
| **`apps/delivery`** (placeholder) | Reserved for the future delivery partner portal. Kept out of the active build pipeline until we're ready. | Nothing yet. |

### Packages

| Package | Why it exists |
|---|---|
| **`ui`** | The design system. Every app renders from these primitives, so visual coherence is a **structural property**, not a code-review checklist. Ship a design change once, four apps update. |
| **`types`** | Single source of truth for domain models. `apps/api` and every frontend compile against the exact same interfaces. When a model changes, TypeScript tells every affected consumer. |
| **`config`** | Runtime constants (routes, enums, upload limits), design tokens (CSS variables), and the shared Tailwind preset. Prevents "the customer app has a slightly different `ROUTES` constant" bugs. |
| **`eslint-config`** | Shared lint rules so every app's `pnpm lint` enforces the same standards. Zero drift. |
| **`tsconfig`** | Shared TS presets — a Next.js app extends `nextjs.json`, a library extends `react-library.json`, `apps/api` extends `node.json`. Prevents compiler-config drift. |
| **`utils`** | Framework-agnostic helpers: `cn`, `formatCurrency`, `formatDate`, `slugify`, `parseIntSafe`, tiny guards. Zero deps on React or Next. |
| **`hooks`** | Reusable React hooks: `useMediaQuery`, `useDebounce`, `useLockBody`, `useIntersection`, `useGsap`. Client-side building blocks. |
| **`services`** | The **seam** between UI and data. All four frontend apps import from here. Today calls the mock layer; tomorrow calls `apps/api` over HTTP. UI signatures never change. |

## 6. Service Layer (Mock → Real API)

`packages/services` is the **only** thing frontend apps import for data.

- Each service exposes async, typed functions (`getProductBySlug(slug: string): Promise<Product | null>`).
- Today: returns from `packages/services/src/mock/*` with an artificial delay (120–300 ms).
- Tomorrow: `http.ts` calls `apps/api` (`GET /api/v1/products/:slug`) and unwraps the standard envelope.
- Public function signatures **never change** across mock ↔ real.

Envelope:
```ts
export interface ApiEnvelope<T> {
  ok: boolean;
  data: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { requestId: string; serverTime: string };
}
```

Mock-mode toggle: `NEXT_PUBLIC_MOCK=1` (default this phase). Flipping it to `0` plus setting `NEXT_PUBLIC_API_BASE=https://api.itin-keithel.com` is the switch — no UI edits needed.

## 7. Layouts & Route Groups (per app)

Each app uses App Router route groups to share layouts without adding URL segments.

### `apps/web`
- `(marketing)` — landing, collections, categories, static pages
- `(shop)` — PLP, PDP, search, wishlist, cart, checkout, order-success
- `(account)` — order history, profile, settings
- `(auth)` — login, signup, forgot-password (**stubbed UI only this phase**)

### `apps/vendor`, `apps/admin`, `apps/support`
- Root layout is an **app shell** (left sidebar + top utility bar).
- All authenticated routes (later) live under a single group; login page is outside it.

## 8. Feature Module Convention

Every feature folder follows the same shape:

```
features/<feature>/
├── components/          # feature-scoped presentational components
├── containers/          # data-connected — the only place that calls services
├── hooks/               # feature-scoped hooks
├── types.ts             # feature-specific composition of packages/types
└── index.ts             # public exports
```

- Features **never import from other features directly**. Cross-feature communication goes through `packages/services` or lifted state in a route.
- `components/` are pure (props in, JSX out). Unit-testable by design.
- `containers/` own async state.

## 9. State Management

- **Server Components** own most read state.
- **Client Components** hold interactive/local state (React `useState`, `useReducer`).
- **Cross-cutting client state** (cart, wishlist, session, toasts, theme) uses **React Context providers** in `apps/<app>/src/providers/`. One provider per concern.
- No Redux, no Zustand — introduce only if a concrete need forces it.
- Persistence rule (this phase): **in-memory only** — no `localStorage` for domain data.

## 10. Server vs Client Components

Default = Server. A component becomes Client only when it needs one of:
- Browser APIs
- Event handlers / state / effects
- Framer Motion
- Third-party libs that touch the DOM

Every `'use client'` file must carry a one-line comment stating **why**. This forces intentionality.

## 11. Styling System

- Tailwind v4 with `@theme` block in `packages/config/src/tokens.css` — colors, typography, spacing, radii, shadows, motion durations/easings all as CSS variables.
- `packages/config/src/tailwind.preset.ts` is imported by every app's `tailwind.config.ts`.
- **No arbitrary color hex** in components. Only token classes.
- **No inline `style={...}`** except for dynamic values a token cannot express.
- Utility `cn()` in `packages/utils` for conditional class merging.

## 12. Motion System

- FM presets live in `packages/utils/src/motion.ts` (durations, easings, variant factories).
- Page transitions handled in each app's root layout with `AnimatePresence`.
- GSAP timelines scoped to `useGsap` in `packages/hooks` (SSR-safe, cleans up on unmount).
- Global rule: never animate when `prefers-reduced-motion` is set.

## 13. Accessibility

- Semantic HTML, landmark roles on every page.
- All primitives in `packages/ui/primitives` are keyboard-navigable and screen-reader labelled.
- Color tokens meet WCAG AA on their intended background.
- Focus rings always visible.

## 14. Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| Files (components) | PascalCase.tsx | `ProductCard.tsx` |
| Files (utilities) | kebab-case.ts | `format-currency.ts` |
| Hooks | `use<Name>` | `useDebounce` |
| Types | PascalCase | `Product`, `OrderStatus` |
| Enums (as unions) | UPPER_SNAKE values | `type OrderStatus = 'PENDING' \| 'PACKED' \| …` |
| Routes constants | UPPER_SNAKE | `ROUTES.PRODUCT_DETAIL(slug)` |
| Packages | kebab-case | `@itin/ui`, `@itin/services` |

## 15. Path Aliases & Imports

- Every package publishes an `@itin/<name>` scope (workspace-only; not published to npm).
- Inside a package, imports use `./` relative paths (no self-alias).
- Inside an app, imports use `@/…` for local files and `@itin/…` for shared packages.
- Never `../../..` across package boundaries.

## 16. Turborepo Pipeline

`turbo.json` defines the task graph:

- `build` — depends on `^build` (upstream packages build first)
- `lint`, `typecheck` — parallel across all workspaces
- `dev` — long-lived, no cache, runs multiple apps in parallel
- `test` (later) — depends on `^build`

Remote cache enabled once we have a shared cache endpoint; local cache used in the meantime.

## 17. Deployment (Target)

- **Nginx** terminates TLS and routes:
  - `itin-keithel.com` → PM2 process for `apps/web` (:3000)
  - `vendor.itin-keithel.com` → PM2 process for `apps/vendor` (:3001)
  - `admin.itin-keithel.com` → PM2 process for `apps/admin` (:3002)
  - `support.itin-keithel.com` → PM2 process for `apps/support` (:3003)
  - `api.itin-keithel.com` → PM2 process for `apps/api` (:4000)
  - `/uploads/*` → served directly from `/var/www/itin-keithel/uploads/`
- Each app has its own `pm2 ecosystem` entry; `pnpm build` produces standalone Node output.
- Build uses **Node runtime** (not Edge) — required because Nginx + PM2 expect a normal Node process, and MongoDB / filesystem access are Node-only.

## 18. Error & Loading UX

- Every route has `loading.tsx` (skeletons via `packages/ui` `Skeleton`).
- Every route has `error.tsx` (uses `packages/ui` `ErrorState`).
- Empty states use `packages/ui` `EmptyState` — never "No data" strings.

## 19. Environment Config

`packages/config/src/env.ts` centralises env access with **zod**-validated schemas. Each app calls it at boot; the process exits on schema failure. Today it exposes `NEXT_PUBLIC_MOCK` (true) and `NEXT_PUBLIC_API_BASE` (unused). Turning off mock mode flips a single variable per app.

## 20. Testing (Deferred)

Not in scope this phase. Structure allows dropping in Vitest + React Testing Library later. `packages/ui/primitives` and feature `components/` are pure and unit-testable by design.

---

_Next: [DESIGN.md](./DESIGN.md) for the visual system._
