# Itin Keithel — Architecture

> Frontend architecture reference. Read alongside [PRD.md](./PRD.md), [DESIGN.md](./DESIGN.md), and [DATA_MODELS.md](./DATA_MODELS.md).

---

## 1. Tech Stack (Current Phase)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server Components by default, Client only when needed |
| Language | **TypeScript** (strict) | No `any`. `unknown` at boundaries. |
| Runtime | **React 19** | Actions, `use()`, transitions |
| Styling | **Tailwind CSS v4** | Design tokens exposed via CSS variables |
| Motion | **Framer Motion** + **GSAP** | FM for component-level, GSAP for scroll/timeline choreography |
| Icons | **lucide-react** | Single icon library — no mixing |
| Package Mgr | **pnpm** | Locked via `pnpm-lock.yaml` |
| Lint | **ESLint 9** + `eslint-config-next` | Plus type-aware rules |
| Bundler | Next.js default (Webpack in dev per current `package.json`) | Turbopack ready |

## 2. Not in this phase

MongoDB, Zoho, Razorpay, real auth, `localStorage` persistence, any BaaS. Everything simulated by a **service layer** that returns typed mock data.

## 3. Folder Structure

```
src/
  app/                     # Next.js App Router (routes only, thin)
    (marketing)/           # route group: home, collections, categories
    (shop)/                # route group: PLP, PDP, search, wishlist, cart, checkout, order-success
    (account)/             # order history, profile, settings
    (auth)/                # login, signup, forgot-password
    vendor/                # /vendor/* dashboard + subroutes
    delivery/              # /delivery/* dashboard + subroutes
    admin/                 # /admin/* dashboard + subroutes
    layout.tsx             # root layout (fonts, providers)
    page.tsx               # home
    not-found.tsx          # 404
    error.tsx              # 500 / runtime error boundary
    coming-soon/page.tsx
    globals.css

  components/
    ui/                    # design-system primitives (Button, Input, Card, Modal, Drawer, Toast, Tabs, Accordion, Skeleton, Badge, Breadcrumb, Tooltip, Avatar, Select, Checkbox, Radio, Switch)
    layout/                # Navbar, Footer, Sidebar, PageHeader, Container, Section
    motion/                # <FadeIn>, <StaggerList>, <Reveal>, transition primitives
    common/                # shared cross-feature UI (EmptyState, ErrorState, Price, RatingStars, GITag)

  features/                # feature-oriented modules (see §5)
    home/
    shop/                  # PLP + filters + sort
    product/               # PDP + gallery + reviews
    collections/
    categories/
    search/
    wishlist/
    cart/
    checkout/
    orders/
    profile/
    auth/
    vendor/
    delivery/
    admin/
    hamper/                # signature feature: hamper builder
    stylist/               # signature feature: virtual stylist booking

  hooks/                   # generic reusable hooks (useMediaQuery, useDebounce, useLockBody, useIntersection)
  lib/                     # framework-agnostic helpers (http, formatters, currency, date, seo, motion presets, cn)
  services/                # data access layer — see §6
  mock/                    # mock database (JSON-like TS objects)
  types/                   # domain types (Product, Vendor, Order, User, …) — see DATA_MODELS.md
  constants/               # route paths, feature flags, enums, config
  styles/                  # tailwind layer, design tokens (colors, typography, spacing, motion), theme
  utils/                   # tiny pure helpers (guards, math, arrays)

public/
  images/                  # brand + editorial assets
  fonts/                   # self-hosted webfonts (if needed)

docs/                      # this folder
```

## 4. Route Groups & Layouts

Route groups (parentheses) let us share layouts without adding URL segments:

- `(marketing)` — full-bleed hero navbar, editorial spacing
- `(shop)` — sticky category chip bar, compact navbar
- `(account)` — split layout with left rail
- `(auth)` — centered card, minimal chrome

Vendor / delivery / admin have their **own root-level segment** because their layout is completely different (app-shell with sidebar, not marketing navbar).

## 5. Feature Module Convention

Each folder in `features/` follows the **same shape** so a new engineer can navigate any feature identically:

```
features/<feature>/
  components/       # feature-scoped presentational components
  containers/       # data-connected components (call services)
  hooks/            # feature-scoped hooks
  types.ts          # feature-specific types (composes from src/types)
  index.ts          # public exports
```

Rules:
- Features **never import from other features directly**. Cross-feature communication goes through `services/` or lifted state in a route.
- Feature `components/` are presentational (props in, JSX out) and safe to unit-test.
- Feature `containers/` are the only place that calls `services/`.

## 6. Service Layer (Mock → Real API)

The service layer is the **seam** between UI and data. UI never touches `mock/` directly.

```
services/
  http.ts              # thin fetch wrapper; today returns from mock, later hits REST
  products.service.ts  # getProducts, getProductBySlug, searchProducts
  vendors.service.ts
  orders.service.ts
  cart.service.ts
  auth.service.ts
  ...
```

Each service:
- Exposes **async** functions that return typed data (`Promise<Product[]>`)
- Includes an artificial delay (e.g. 120–300 ms) to simulate network
- Reads from `mock/` today; will read from `lib/http.ts` tomorrow
- Public signature never changes when the backend lands

Example contract:
```ts
export async function getProductBySlug(slug: string): Promise<Product | null>
```

## 7. State Management

- **Server Components** own most read state (pass data via props).
- **Client Components** hold interactive/local state (React `useState`, `useReducer`).
- **Cross-cutting client state** (cart, wishlist, auth session, toast queue, theme) lives in **React Context providers** under `app/providers/` — one provider per concern, composed in `RootLayout`.
- No Redux, no Zustand (yet). Add only if a concrete need forces it.
- Persistence rule (this phase): **in-memory only**, per the user directive — no `localStorage`.

## 8. Server vs Client Components

Default = Server. A component becomes Client only when it needs one of:
- Browser APIs (window, IntersectionObserver, GSAP)
- Event handlers / state / effects
- Framer Motion (needs client)
- Third-party libs that touch the DOM

Every `'use client'` file must have a comment above it stating **why** it needs to be client (one line). This forces intentionality.

## 9. Data Flow (Example: PDP)

```
app/(shop)/products/[slug]/page.tsx   ── server component
  └── services/products.service.ts    ── async, returns Product
      └── mock/products.ts            ── mock DB
  └── passes Product as props to:
      features/product/containers/ProductDetail.tsx   ── client (interactivity)
        ├── features/product/components/ProductGallery.tsx
        ├── features/product/components/VariantSelector.tsx
        ├── features/product/components/GITagBadge.tsx
        └── features/product/components/RelatedProducts.tsx
```

## 10. Styling System

- Tailwind v4 with `@theme` block in `styles/tokens.css` — colors, typography, spacing, radii, shadows, motion durations/easings all as CSS variables.
- **No arbitrary color hex** in components. Only token classes (`bg-clay-500`, `text-ink-900`).
- **No inline `style={...}`** except for dynamic values a token cannot express (e.g. computed transforms).
- Utility `cn()` in `lib/cn.ts` for conditional class merging.

## 11. Motion System

- FM presets live in `lib/motion.ts` (durations, easings, variant factories).
- Page transitions handled in root layout with `AnimatePresence` at route level.
- GSAP timelines are scoped to `useGsap` hook in `hooks/useGsap.ts` (guarantees SSR safety + cleanup).
- Global rule: never animate when `prefers-reduced-motion` is set (respected via `lib/motion.ts` presets).

## 12. Accessibility

- Semantic HTML first. Landmark roles (`main`, `nav`, `aside`) on every page.
- All interactive primitives in `components/ui/` are keyboard-navigable and screen-reader labelled.
- Color tokens meet WCAG AA on their intended background.
- Focus rings are visible (never `outline: none` without replacement).

## 13. Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| Files (components) | PascalCase.tsx | `ProductCard.tsx` |
| Files (utilities) | kebab-case.ts | `format-currency.ts` |
| Hooks | `use<Name>` | `useDebounce` |
| Types | PascalCase | `Product`, `OrderStatus` |
| Enums (as unions) | UPPER_SNAKE values | `type OrderStatus = 'PENDING' \| 'PACKED' \| …` |
| Routes constants | UPPER_SNAKE | `ROUTES.PRODUCT_DETAIL(slug)` |

## 14. Path Aliases

`tsconfig.json` will define:
```json
{ "paths": { "@/*": ["./src/*"] } }
```
Always use `@/…` imports; no `../../..`.

## 15. Testing (Deferred)

Not in scope this phase, but structure allows dropping in Vitest + React Testing Library later. Feature `components/` are pure and unit-testable by design.

## 16. Error & Loading UX

- Every route has `loading.tsx` (skeletons via `components/ui/Skeleton`).
- Every route has `error.tsx` (uses `common/ErrorState`).
- Empty states use `common/EmptyState` — never "No data" strings.

## 17. Environment Config

`constants/env.ts` centralises env access with type-safe defaults. Today it exposes `IS_MOCK = true`. The day a real API arrives, flipping this and pointing `lib/http.ts` at the backend is a **one-file change**.

---

_Next: [DESIGN.md](./DESIGN.md) for the visual system._
