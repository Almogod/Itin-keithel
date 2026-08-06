# Itin Keithel

A premium **artisan marketplace platform** for handcrafted products from **North East India** — Muga silk, Majuli weaves, Sualkuchi textiles, Agartala cane, Mokokchung wood carvings, Naga jewellery, and more. Presented with the polish of a luxury retail experience (Apple × Aesop × Hermès × Tata CliQ Luxury) while remaining unmistakably rooted in NE Indian craft and culture.

Itin Keithel is **not one website**. It is a **platform** of independent applications connected to a **single backend** and a **single database**.

> **Status:** monorepo rebuild in progress. Docs-driven, phased delivery. See [`docs/STATUS.md`](./docs/STATUS.md).

---

## Platform topology

```
                       ┌────────────────────────────┐
   itin-keithel.com ──▶│ apps/web        (Customer) │
   vendor.…            │ apps/vendor     (Vendor)   │
   admin.…             │ apps/admin      (Admin)    │
   support.…           │ apps/support    (Support)  │
                       └───────────┬────────────────┘
                                   │  HTTPS (via packages/services)
                                   ▼
   api.itin-keithel.com ─── apps/api  (Next.js Route Handlers, later)
                                   │
                       MongoDB · VPS FS uploads · Zoho SMTP · Redis · Meilisearch
```

`apps/delivery` is scaffolded as a **placeholder** for a future delivery partner portal.

## Current phase

**Phase 0 — Docs & Alignment ✅** → **Phase 1 — Monorepo Bootstrap** (up next).

## Documentation

All planning lives under [`docs/`](./docs). Read in order:

| Doc | What it covers |
|---|---|
| [PRD.md](./docs/PRD.md) | Vision, apps & roles, page inventory per app, signature features, non-goals |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Turborepo layout, per-app + per-package rationale, service seam, storage, deployment |
| [DESIGN.md](./docs/DESIGN.md) | Design tokens (palette, typography, motion), component spec (lives in `packages/ui`) |
| [DATA_MODELS.md](./docs/DATA_MODELS.md) | TypeScript interfaces (all in `packages/types`) — Product, Guild, Order, Ticket, etc. |
| [ROADMAP.md](./docs/ROADMAP.md) | 10-phase delivery plan with exit criteria per phase |
| [STATUS.md](./docs/STATUS.md) | Live progress tracker + decisions log |

## Tech stack

**This phase (frontend + shared packages):**

- **Monorepo:** Turborepo + pnpm workspaces
- **Framework:** Next.js 16 (App Router) · React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (design tokens via CSS variables, shared preset)
- **Motion:** Framer Motion + GSAP
- **Icons:** lucide-react
- **Tooling:** ESLint 9 · shared configs · pnpm

**Target full stack (planned — the frontend is architected against this):**

- **Backend:** Next.js Route Handlers in `apps/api` (same monorepo, deployed independently)
- **Database:** MongoDB + Mongoose
- **Image storage:** **VPS local filesystem** at `/var/www/itin-keithel/uploads/` — served by Nginx; provider-agnostic storage service so a future swap needs one module changed. **No R2/S3/Firebase/Supabase.**
- **Email:** Zoho Mail (SMTP)
- **Deployment:** Ubuntu VPS + Nginx (reverse proxy) + PM2 (per-app processes)
- **Caching (later):** Redis
- **Search (later):** Meilisearch or Typesense
- **Authentication (later):** custom (Route Handler + JWT + refresh in httpOnly cookie). Not implemented in this frontend phase.

Details: [ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Getting started

_Applies once Phase 1 lands. Current repo still hosts the single-file legacy prototype until Phase 1 replaces it._

```bash
pnpm install         # installs every workspace
pnpm dev             # runs all active apps in parallel (turbo)
```

Per-app dev:

```bash
pnpm --filter @itin/web dev
pnpm --filter @itin/vendor dev
pnpm --filter @itin/admin dev
pnpm --filter @itin/support dev
pnpm --filter @itin/api dev
```

Other root scripts:

```bash
pnpm build           # turbo build across all workspaces
pnpm lint            # turbo lint
pnpm typecheck       # turbo typecheck
```

## Project structure (target)

```
itin-keithel/
├── apps/
│   ├── web/            # Customer marketplace
│   ├── vendor/         # Vendor dashboard
│   ├── admin/          # Admin control tower
│   ├── support/        # Customer support workspace
│   ├── api/            # Next.js backend (Route Handlers) — stubbed this phase
│   └── delivery/       # Future — placeholder only
│
├── packages/
│   ├── ui/             # Design-system primitives + patterns
│   ├── types/          # Domain TypeScript interfaces
│   ├── config/         # Shared runtime config (routes, enums, tokens, Tailwind preset)
│   ├── eslint-config/  # Shared ESLint preset
│   ├── tsconfig/       # Shared TS presets (base, nextjs, react-library, node)
│   ├── utils/          # Framework-agnostic helpers
│   ├── hooks/          # Shared React hooks
│   └── services/       # Shared API client / data-access seam (mock today → apps/api later)
│
└── docs/               # Planning documents
```

Full rationale for every app and package: [ARCHITECTURE.md §5](./docs/ARCHITECTURE.md).

## Principles

- **Enterprise from day one** — every folder assumes thousands of vendors and millions of consumers.
- **One backend, many frontends** — every app renders from shared design system, types, and services.
- **Culture over decoration** — motifs, palette, and copy reference NE India authentically.
- **Restraint** — luxury is spacing and hierarchy, not heavy graphics.
- **Service-layer seam** — UI never imports mock data or MongoDB directly. Swap in the real API without touching components.
- **In-memory only** for this phase — no `localStorage`, no BaaS.

## Contributing to the rebuild

The rebuild is checkpoint-driven. Each phase in [ROADMAP.md](./docs/ROADMAP.md) has explicit exit criteria; no phase starts until the previous one is reviewed. Update [STATUS.md](./docs/STATUS.md) as work lands.
