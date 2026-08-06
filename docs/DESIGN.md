# Itin Keithel — Design System

> Visual & interaction language. **Every token defined here maps to a CSS variable in `packages/config/src/tokens.css`** and a Tailwind theme entry in `packages/config/src/tailwind.preset.ts`. **Every component defined here is implemented in `packages/ui`** and consumed identically by every frontend app (`apps/web`, `apps/vendor`, `apps/admin`, `apps/support`).
>
> This makes visual consistency a **structural property** of the platform — a design change lands once and every app updates.

---

## 1. Brand Positioning

Luxury without loudness. The site should feel like walking into a **quiet, well-lit gallery** in Guwahati or Imphal — heirloom textiles under warm light, restrained typography, generous negative space, and small, deliberate motion that rewards attention.

**Mood board references:** Aesop (restraint), Hermès (heritage), Apple (craft in typography & product photography), Tata CliQ Luxury (editorial commerce), Good on Paper Magazine (whitespace).

**Anti-patterns:** stock-photo drift, "handmade" clip-art, drop-shadow abuse, saturated gradients, floating CTAs, autoplay carousels with dots, chatbot bubbles.

## 2. Color Palette

Named by material metaphor, not by function — so palette additions never break existing components.

### Base
| Token | Hex | Use |
|---|---|---|
| `--color-canvas` | `#FAF9F6` | Page background (warm off-white, like undyed silk) |
| `--color-ivory` | `#F3EEE5` | Card surface, secondary background |
| `--color-linen` | `#E7DFD1` | Divider, subtle fill |
| `--color-ink-900` | `#1A1A1A` | Primary text |
| `--color-ink-700` | `#3A3A3A` | Body text on lighter surfaces |
| `--color-ink-500` | `#6B6660` | Muted text, captions |
| `--color-ink-300` | `#A8A29A` | Placeholder, disabled |

### Accents (NE-rooted)
| Token | Hex | Origin |
|---|---|---|
| `--color-muga` | `#B08A4F` | Muga silk gold — primary accent |
| `--color-lac` | `#8B2C2C` | Lac dye red — highlight, alerts of importance |
| `--color-bamboo` | `#7A8B5C` | Green bamboo — success, freshness |
| `--color-indigo` | `#2E3A59` | Naga indigo — informational |
| `--color-terracotta` | `#C46B3F` | Assamese terracotta — warm CTA option |
| `--color-charcoal` | `#2B2724` | Rosewood-black — heavy heading, footer |

### System
| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#4F7A3A` | Confirmed order, in stock |
| `--color-warn` | `#B78418` | Low stock, pending |
| `--color-danger` | `#9B2C2C` | Error, remove |
| `--color-focus` | `#2E3A59` | Focus ring |

Contrast: `ink-900 / canvas` ≈ 15:1; `muga / canvas` used only for chrome, never for body text.

## 3. Typography

Three families, three roles. No fourth family without a design review.

| Role | Family | Weights | Case |
|---|---|---|---|
| Display / Editorial | **Playfair Display** (serif, italic optional) | 400, 600, 700 | Sentence case |
| UI / Headings | **Outfit** (geometric sans) | 300, 400, 500, 600, 700 | Sentence case |
| Body / Long-form | **Inter** (humanist sans) | 300, 400, 500, 600, 700 | Sentence case |

### Type Scale (rem, desktop)
| Token | Size / Line | Family | Use |
|---|---|---|---|
| `text-display-xl` | 4.5 / 1.05 | Playfair | Hero headline |
| `text-display-lg` | 3.5 / 1.1  | Playfair | Section opener |
| `text-display-md` | 2.5 / 1.15 | Playfair | Editorial subheads |
| `text-h1` | 2.25 / 1.2 | Outfit 600 | Page title |
| `text-h2` | 1.75 / 1.25 | Outfit 600 | Card group title |
| `text-h3` | 1.375 / 1.3 | Outfit 500 | Card title |
| `text-h4` | 1.125 / 1.35 | Outfit 500 | Label group |
| `text-body-lg` | 1.125 / 1.6 | Inter 400 | Intro paragraph |
| `text-body` | 1 / 1.6 | Inter 400 | Body |
| `text-body-sm` | 0.875 / 1.5 | Inter 400 | Meta, captions |
| `text-caption` | 0.75 / 1.4 | Inter 500 (tracked +0.06em) | Eyebrow, tag |

Mobile: display scale steps down ~15%. Use `clamp()` in tokens.

Numerics use **tabular-nums** (prices, counts, dates).

## 4. Spacing

8-point base with 4-point half-steps. Tokens: `space-0 / 0.5 / 1 / 2 / 3 / 4 / 5 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32`. Layout gutters at `space-6` (24 px) on mobile, `space-12` (48 px) on tablet, `space-16` (64 px) on desktop.

Content max-widths:
- **prose** — 65ch
- **editorial** — 780 px
- **content** — 1180 px
- **wide** — 1440 px (rare, hero-only)

## 5. Radii, Borders, Shadows

- Radii: `radius-none / sm 4 / md 8 / lg 16 / xl 24 / full`. Cards use `md`; images use `lg`; pills use `full`.
- Border: hairline `1px solid --color-linen` for dividers; `1px solid --color-ink-300` for inputs at rest.
- Shadows: use **sparingly**. Two levels only:
  - `shadow-soft`: `0 1px 2px rgba(26,26,26,.04), 0 8px 24px rgba(26,26,26,.06)` — hover state on cards.
  - `shadow-lifted`: `0 12px 40px rgba(26,26,26,.10)` — modals, drawers.

## 6. Motion

**Principle:** motion is diegetic — it explains state change, not decoration.

### Durations
| Token | ms | Use |
|---|---|---|
| `motion-instant` | 90 | Toggles |
| `motion-quick` | 160 | Hovers, small reveals |
| `motion-base` | 240 | Cards, buttons, drawers |
| `motion-slow` | 420 | Page transitions, hero reveals |
| `motion-editorial` | 800 | Scroll storytelling |

### Easings
- `ease-standard` — `cubic-bezier(.2, .8, .2, 1)` (default)
- `ease-entrance` — `cubic-bezier(.16, 1, .3, 1)` (things arriving)
- `ease-exit` — `cubic-bezier(.4, 0, 1, 1)` (things leaving)

### Global rules
1. Respect `prefers-reduced-motion` — collapse to opacity-only fades ≤ 120 ms.
2. Never animate `top/left/width/height` — use `transform` / `opacity`.
3. Stagger children max 60 ms per child; cap at 8 children (batch beyond that).
4. Never autoplay video-length carousels; require intent (hover / focus / drag).
5. GSAP is for scroll-linked timelines only; component states use Framer.

## 7. Iconography

- **lucide-react** exclusively. `stroke-width={1.5}` default (matches editorial tone).
- Sizes: 14, 16, 20, 24, 28 px only. No arbitrary.
- Icons in text: match text color, `align-middle`, `mr-2` to label.

## 8. Imagery

- **Aspect ratios (locked):** 4:5 (product portrait), 3:4 (guild portrait), 16:9 (editorial banner), 1:1 (thumbnail). Never crop mid-motif on textiles.
- **Loading:** always `next/image` with defined width/height; blurhash or dominant-color placeholder.
- **Treatment:** natural warm tones; avoid heavy filters. Zoom on PDP is 2× max.

## 9. Component Library (Spec)

Every primitive lives in `packages/ui/src/primitives/`, every composed pattern (ProductCard, CategoryCard, ReviewCard, …) in `packages/ui/src/patterns/`, and every layout primitive in `packages/ui/src/layout/`. Spec below is the **contract** — props may extend, must not contradict.

### Button
`variant`: `primary | secondary | ghost | link | destructive`
`size`: `sm | md | lg`
`loading`, `iconLeft`, `iconRight`, `fullWidth`, `asChild` (for `<Link>` compo)
- Primary: `bg-ink-900 text-canvas`, hover shifts to `bg-charcoal`.
- Secondary: `bg-transparent border ink-900`.
- Ghost: text-only with hover underline.
- Destructive: `bg-danger text-canvas`.

### Input / Textarea / Select
- Label always present (visually or `sr-only`).
- Error state uses `danger` border + helper text; success uses `success`.
- Autocomplete attributes always specified.

### Card
`Card`, `CardMedia`, `CardBody`, `CardFooter`. Ivory surface, `radius-md`, `shadow-soft` on hover.

### ProductCard
Specialization of Card. Shows: image (4:5), price, title, guild micro-tag, wishlist toggle, quick-view button on hover.

### CategoryCard
Editorial: full-bleed image, name overlaid bottom-left, subtle darken gradient on hover.

### ReviewCard
Avatar, name, star rating, date, verified badge, body, product-variant tag.

### Modal & Drawer
Both use `shadow-lifted`, backdrop `bg-ink-900/40 backdrop-blur-sm`. Drawer sides: `right` (cart), `left` (filters on mobile).

### Toast
Bottom-right (desktop), top (mobile). Types: `info | success | warning | error`. Auto-dismiss 4 s; max stack 3.

### Tabs
Underline style, ink-900 active bar, `motion-quick` slide.

### Accordion
Chevron rotates 180° on open (`motion-base`). Content height animated.

### Breadcrumb
Slash separator, last item non-link, muted `ink-500`.

### Skeleton
`shimmer` variant only. Never use spinner — always skeleton.

### Badge
`neutral | muga | lac | bamboo | indigo`. Small caps typography.

### Avatar
Square with `radius-md` for artisans (per guild style), circle for customers.

### Tooltip
Delay 200 ms. Dark on light only (never inverted colours mid-page).

## 10. Layout Primitives

(All in `packages/ui/src/layout/`.)

- `<Container>` — centered, applies content max-widths (`prose | editorial | content | wide`).
- `<Section>` — vertical rhythm; `space` prop (`sm | md | lg | xl`).
- `<Grid>` — thin wrapper on CSS grid; column props respect responsive tokens.
- `<Stack>` — vertical spacing helper.
- `<Cluster>` — horizontal flex with gap.

## 11. Responsive Breakpoints

Desktop-first, but tokens defined for both directions.

| Name | min-width |
|---|---|
| `xs` | 360 px |
| `sm` | 640 px |
| `md` | 768 px |
| `lg` | 1024 px |
| `xl` | 1280 px |
| `2xl` | 1536 px |

Navbar collapses at `< md`; PLP filters move to drawer at `< lg`; dashboards require `≥ md` (below, show summary card + link to full app).

## 12. Cultural Motif Guidelines

- Use **subtle motif** in dividers, tag chips, empty states: stylised **eri silk weft**, **Naga zig-zag**, **bamboo joint**, **loom thread**. Never as full backgrounds behind text.
- Language: prefer **guild** over "seller"; **artisan** over "vendor" in consumer-facing copy; **casket** for gift boxes (Assamese textile heritage).
- Never use imported/exotic-Asia visuals (pagodas, generic henna). If in doubt, drop the motif.

## 13. Copy Voice

- Confident, quiet, specific. "Woven by Rimjhim Kalita in Sualkuchi, spring 2026." not "Beautiful silk from Assam!"
- Avoid superlatives; let materials and provenance do the work.
- Sentence case everywhere; ALL-CAPS only for `caption` eyebrows.

## 14. Do & Don't (Quick Reference)

**Do**
- Use hairline dividers, generous whitespace, warm off-white grounds.
- Show artisan photography at editorial scale.
- Animate on entrance and interaction — not on idle.

**Don't**
- Don't drop-shadow everything.
- Don't stack more than 2 heading levels within 400 px.
- Don't use gradients on text or CTAs.
- Don't autoplay motion above the fold.

---

_Next: [DATA_MODELS.md](./DATA_MODELS.md)._
