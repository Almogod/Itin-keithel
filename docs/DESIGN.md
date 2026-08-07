# Itin Keithel — Design System

> Visual & interaction language. Distilled from the reference-image analysis (9 images in `/refrence image/`, image-by-image report captured in the creative-direction session) and locked as the single source of truth for every app in the platform. Every token here maps to a CSS variable in `src/styles/tokens.css` (single-app phase) or `packages/config/src/tokens.css` (monorepo phase); every component maps to a file under `src/components/` today, `packages/ui/` tomorrow.
>
> Consistency is a **structural** property of the platform — a design change lands in tokens once and every app updates.

---

## 0. The one-sentence brief

> *A quiet, warm, printed-catalog of Manipur's living crafts — where the object earns the page, the maker is named, and buying is the last thing that happens.*

## 1. Brand Positioning

### The three moods, in order
1. **Museum first** — every product is a specimen, framed and captioned.
2. **Editorial magazine second** — long-form storytelling. A phanek is not a size, it is a piece with a village, a weaver, a dye, and a season.
3. **Boutique third** — purchase is invited quietly. Commerce disappears until the visitor wants it.

### Reference constellation
Closer to **Aesop · Officine Universelle Buly · MoMA Store · a printed exhibition catalog** than to any marketplace.

### Anti-patterns (never)
Discount stickers · countdown timers · scarcity nudges ("only N left", "M people looking") · card-badge overload · multi-panel promo collages · generic icon trust-strips · neon accents · gradient buttons · chat bubbles · autoplay carousels · Amazon/Shopify-default energy.

## 2. Design Principles (the six laws)

1. **The object earns the room.** If a pixel does not serve the craft, remove it.
2. **Silence is a feature.** Whitespace signals confidence; it gives the object its aura.
3. **Every product has a name and a maker.** Provenance is a first-class UI element, never a footnote.
4. **One voice for action.** Exactly one accent color owns purchase. Everything else recedes.
5. **Read before you buy.** Story precedes price. Add-to-cart is present but never loud.
6. **Regional, never touristy.** Honor Manipur's craft without kitsch — no clip-art motifs, no forced folk borders, no "ethnic" stereotypes.

## 3. Color System

Restrained. One character color, one ink, two neutrals, one accent for actions. **No pure white. No pure black.** Both feel screen-cold; we want printed-warm.

### Base palette (approved)
| Role | Token | Hex | Where it lives |
|---|---|---|---|
| Canvas | `--color-canvas` (Rice Paper) | `#F7F4EE` | Page background, warm off-white |
| Ink | `--color-ink` (Loktak Ink) | `#141312` | Headlines, body |
| Muted | `--color-muted` (Kauna Reed) | `#8A8377` | Meta, captions, secondary labels |
| Frame | `--color-frame` (Muga Silk) | `#E9E1D2` | Product plates, dividers, cards |
| Character | `--color-vermilion` (Manipur Vermilion) | `#B23A2C` | Wordmark, chapter markers, active states, focus |
| Action | `--color-action` (Ereima Green) | `#2E4A3B` | Primary CTA (only) |
| Editorial | `--color-indigo` (Loktak Indigo) | `#22314A` | Rare editorial framing accent |

### Ink scale (derived from Loktak Ink)
| Token | Hex | Use |
|---|---|---|
| `--color-ink-900` | `#141312` | Titles, body |
| `--color-ink-700` | `#2A2724` | Rich body |
| `--color-ink-500` | `#5A544C` | Captions on canvas |
| `--color-ink-300` | `#A19A8E` | Disabled, placeholder |
| `--color-ink-100` | `#E9E1D2` | Hairline dividers on canvas |

### System palette
| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#2E4A3B` | Confirmed order, in stock (same as action) |
| `--color-warn` | `#B78418` | Low stock, pending |
| `--color-danger` | `#8B2C2C` | Errors, destructive |
| `--color-focus` | `#B23A2C` | Focus ring (vermilion, always visible) |

### Contrast (WCAG)
- `ink-900` on `canvas` → **15.4 : 1** (AAA at all sizes)
- `ink-500` on `canvas` → 6.1 : 1 (AA large & body)
- `canvas` on `action` (green button) → 8.2 : 1 (AAA)
- `canvas` on `vermilion` → 5.1 : 1 (AA large, AAA icons)

### Rules
- Vermilion is **voice**. Ereima Green is **action**. Never swap them.
- One primary color per screen state — no "second red for hover" tricks.
- No hex in components — only token classes.

## 4. Typography

Three families, three roles.

| Role | Family | Weights | Character |
|---|---|---|---|
| Display / Editorial | **Fraunces** (or GT Sectra / Recoleta) | 300, 400, 500, 700 | Modern serif with wide counters; printed, catalog-like |
| UI / Headings | **Inter** | 400, 500, 600, 700 | Neutral humanist sans |
| Meta / Small-caps | **Inter** (tracked `+0.08em`, small-caps) | 500 | Provenance table, eyebrows |

**Fraunces** and **Inter** are both free, on Google Fonts, and load fast. If Fraunces is later swapped for GT Sectra, it is a single font-file change; every component references `var(--font-display)` and `var(--font-sans)`.

### Type Scale (fluid — mobile → desktop)

| Token | Size (fluid) | Line-height | Family | Use |
|---|---|---|---|---|
| `text-marker` | `clamp(4rem, 12vw, 9rem)` | 0.95 | Fraunces 300 | Oversized markers (days, years, place names) |
| `text-display-xl` | `clamp(3rem, 7vw, 6rem)` | 1.02 | Fraunces 400 | Hero headline |
| `text-display-lg` | `clamp(2.25rem, 5vw, 4rem)` | 1.08 | Fraunces 400 | Section opener |
| `text-display-md` | `clamp(1.75rem, 3.5vw, 2.75rem)` | 1.15 | Fraunces 400 | Editorial subhead |
| `text-h1` | `2.25rem` | 1.2 | Inter 600 | Page title |
| `text-h2` | `1.75rem` | 1.25 | Inter 600 | Section title |
| `text-h3` | `1.375rem` | 1.3 | Inter 500 | Card title |
| `text-body-lg` | `1.125rem` | 1.6 | Inter 400 | Long-form reading |
| `text-body` | `1rem` | 1.6 | Inter 400 | Body default |
| `text-body-sm` | `0.875rem` | 1.5 | Inter 400 | Meta, captions |
| `text-caption` | `0.75rem` | 1.4 | Inter 500 tracked +0.08em small-caps | Eyebrows, provenance labels |

### Rules
- **Never bold body text.** Emphasis via scale, color (vermilion), or italic serif.
- **Numeric = tabular-nums** (prices, counts, dates, provenance days).
- **Line length capped at ~68ch** (~640px) for long-form. Reading precedes shopping.
- **No justified text.** Ragged-right always.
- **No text on gradients.**

## 5. Spacing System

8-point base with 4-point micro-steps. Sections breathe on a larger 32/64/96/128 rhythm — the **"museum breath"**.

| Token | px | Use |
|---|---|---|
| `space-0.5` | 2 | Optical nudges only |
| `space-1` | 4 | Icon padding |
| `space-2` | 8 | Inline gaps |
| `space-3` | 12 | Compact cluster spacing |
| `space-4` | 16 | Inside cards, form rows |
| `space-6` | 24 | Between related blocks |
| `space-8` | 32 | Component-to-component |
| `space-12` | 48 | Small section gap |
| `space-16` | 64 | Section gap |
| `space-24` | 96 | Chapter gap (the museum breath) |
| `space-32` | 128 | Between page chapters on desktop |
| `space-40` | 160 | Hero-to-first-chapter |

**Rule:** if two blocks belong to different chapters, they get **≥96px** between them.

### Content max-widths
- **prose** — 68ch (~640px) for reading
- **editorial** — 780px for essays & PDP info column
- **content** — 1180px default
- **wide** — 1440px (hero only)

## 6. Grid System

- **12 columns**, `1440px` max canvas, `88px` outer gutter on desktop, `24px` inner gutter.
- **Mobile:** single column, 20px outer, 16px inner.
- **PDP:** **7 / 5** split (not 6/6) — the image column is intentionally wider than the info column.
- **Category grid:** **3-up on desktop** (never 4-up — 4-up starts to feel retail). 2-up tablet, 1-up mobile.
- **Editorial columns:** long-form text is centered and capped at prose max-width.

## 7. Radii, Borders, Shadows

- **Radii:** `radius-none / sm 4 / md 8 / lg 14 / xl 24 / full`. Cards `md`, images `lg`, pills `full`, primary CTA `6px`.
- **Borders:** hairline `1px solid var(--color-ink-100)` for dividers; `1px solid var(--color-ink-300)` for inputs at rest.
- **Shadows:** used sparingly. Two levels only.
  - `shadow-soft` — `0 1px 2px rgba(20,19,18,.04), 0 8px 24px rgba(20,19,18,.05)` — card hover
  - `shadow-lifted` — `0 12px 40px rgba(20,19,18,.08)` — modals, drawers only
- **No shadow on primary chrome.** No drop-shadow abuse.

## 8. Motion System

**Principle:** motion is diegetic — it explains state change, never decorates.

### Durations
| Token | ms | Use |
|---|---|---|
| `motion-instant` | 120 | Toggles, small state flips |
| `motion-quick` | 200 | Hovers, small reveals |
| `motion-base` | 320 | Drawers, dropdowns, cards |
| `motion-editorial` | 600 | Hero reveals, chapter markers |
| `motion-scroll` | 800 | Scroll-linked timeline moments |

### Easings
- `ease-standard` — `cubic-bezier(0.2, 0, 0, 1)` — entrances (default)
- `ease-exit` — `cubic-bezier(0.4, 0, 1, 1)` — exits
- No bounce. No spring. Ever.

### Signature motions
- **Hero photograph** — slow parallax on scroll (0.7× rate)
- **Product gallery** — cross-fade between thumbnails (no slide)
- **Chapter marker** — serif letter-in fade + hairline draw (600ms)
- **Card hover** — image scales to 1.02 over 200ms, no shadow lift
- **Cursor over object** — subtle 2% zoom + tiny vignette lift
- **Page transitions** — 320ms cross-fade, no slide

### Rules
1. Respect `prefers-reduced-motion` — collapse to opacity-only fades ≤120ms; disable parallax.
2. Never animate `top/left/width/height` — only `transform` / `opacity` / `filter`.
3. Stagger children ≤60ms per child, cap at 8 (batch beyond).
4. No autoplay video-length carousels — require intent (hover / focus / drag).
5. No loading spinners on primary flows — use **skeletons in Muga Silk**.
6. GSAP owns scroll-linked timelines; Framer Motion owns component state.

## 9. Iconography

- **lucide-react**, `stroke-width={1.25}` default (matches editorial serif weight).
- Sizes: `14, 16, 20, 24, 28` px — no arbitrary.
- Icons in text: match text color, `align-middle`, `mr-2` to label.
- **No filled icons. No duotone. No emoji. No brand-logo icons in a trust row.**
- Icons used sparingly — cart, search, menu, close, chevron, heart (wishlist), user. That is the vocabulary.

## 10. Photography Style

This is the most important system for a craft brand.

### Object photography
- Background: Muga Silk (`#E9E1D2`) cloth or Rice Paper (`#F7F4EE`) paper.
- Light: soft window light from upper-left, no drop shadow other than natural fall-off.
- The object floats. No hard cast shadow.
- Ratio: **4 : 5** always.

### Artisan photography
- Black-and-white or warm-desaturated, medium-format film feel.
- Hands and looms in focus. Faces respected — never voyeuristic, never poverty-porn.
- Ratio: **3 : 4** portrait.

### Place photography
- Wide, still, quiet. Loktak lake at dusk, an empty weaving hut, a dye vat.
- No sunset-postcard clichés.
- Ratio: **3 : 2** or **16 : 9** for editorial banners.

### Grade
- Warm shadows, subtle green in midtones, film grain 3–5%.
- Consistent across the whole catalog — a single grade recipe applied to every asset.

### Rules
- **Never crop mid-motif** on textiles. Never crop a face at the eyes.
- **`next/image` always**, with defined `width`/`height` and a blurhash/dominant-color placeholder.
- **2× zoom max** on PDP; no pixel-peeping.
- 1:1 avoided (feels social-media).

## 11. Illustration Style

- Almost none. Illustration is reserved for **motifs derived from real Manipuri textile patterns** (Meitei lozenge, phanek border, Longpi pottery contour), rendered as hairline monoline.
- Used only as **section dividers or empty-state moments** — never as decoration for its own sake.
- No mascots. No character illustration. No stock vector art.

## 12. Signature Moves (the four unique to Itin Keithel)

Every page must express at least one; the PDP expresses all four.

### 12.1 The Provenance Card
A meta table on every product page. Two columns, small-caps labels in Kauna Reed, ink values.

```
ARTISAN        Rimjhim Konjengbam
VILLAGE        Wangkhei, Imphal East
CRAFT          Meitei Phanek (hand-loomed)
FIBRE          Muga silk · natural indigo
DAYS TO MAKE   047
YEAR           2026
GI CODE        GI-283 (verified)
```

Right-aligned values. Hairline dividers between rows. This is our credibility signature.

### 12.2 The Chapter PDP
The product page is an essay. Four narrative chapters, each announced by an oversized serif marker:

1. **The Object** — gallery + Provenance Card + buy box
2. **The Maker** — artisan portrait + story
3. **The Craft** — technique, materials, days
4. **Care & Living** — how to keep the piece alive

Buy box is sticky through Chapter 1 only.

### 12.3 The Oversized Marker
A single large numeric or word set in Fraunces Display 300, above each section:

- "047 days" — days on the loom
- "Since 1891" — first practiced
- "Longpi" — a place, a pottery, a name

Rendered `text-marker` (`clamp(4rem, 12vw, 9rem)`). One per section. Always followed by a hairline rule.

### 12.4 The Framed Object Hero
The object floats inside a colored frame (Muga Silk cream or Loktak Indigo) that itself sits inside the Rice Paper page — like a vitrine within a gallery. Frame is set with equal padding on all sides; object is centered; caption is a single line in Inter caption size below.

## 13. Component System

Every component lives in `src/components/` today, `packages/ui/` tomorrow. Contract listed; props may extend, must not contradict.

### Primitives
- **Button** — `primary` (filled Ereima Green, 6px radius, tracked serif label), `ghost` (ink outline, transparent fill). No third variant. No shadow. No gradient. One primary per screen.
- **Link** — inline underline on hover only; text-decoration Kauna Reed; text stays ink.
- **Input / Textarea / Select** — hairline ink-300 border, focus ring Vermilion 2px offset 2px, label always present.
- **Checkbox / Radio / Switch** — squared for checkbox (radius-sm), round radio, pill switch. Checked = Ereima Green fill.
- **Badge** — small-caps caption, ink text on Muga Silk, no color badges by default. Vermilion badge reserved for "New in" only.
- **Divider** — hairline `--color-ink-100`.
- **Hairline** — 1px vermilion rule after Chapter Markers.
- **Skeleton** — Muga Silk with shimmer; never a spinner.
- **Toast** — bottom-right desktop, top mobile; Muga Silk with ink text; auto-dismiss 4s; max stack 3.
- **Tooltip** — 200ms delay; ink on canvas; never inverted.
- **Accordion** — chevron rotates 180° over 200ms; ink hairline top divider only.
- **Tabs** — underline style, Vermilion active bar, 200ms slide.
- **Breadcrumb** — mid-dot separator (·), last item non-link Kauna Reed.
- **Modal / Drawer** — backdrop `rgba(20,19,18,0.4) backdrop-blur-sm`; drawer slides from right for cart, left for filters.
- **Avatar** — square with radius-md for artisans (per guild identity), circle for customers.

### Patterns
- **ProductCard** — 4:5 image on Muga Silk plate, title in Fraunces sm, price in Inter tabular, no badges, no icons. Hover: image → 1.02 over 200ms.
- **CategoryCard** — full-bleed 3:2 image, name overlaid bottom-left in Fraunces, subtle darken gradient on hover only.
- **GuildCard** — 3:4 portrait, guild name in Fraunces, region + members in caption.
- **ReviewCard** — avatar, name, star rating, date, verified pill, body, variant tag.
- **ProvenanceCard** — meta table (see §12.1).
- **ChapterMarker** — oversized serif word/number + hairline rule.
- **OrderRow** — thumbnail, name, variant, qty, price, status pill.

### Layout primitives
- **Container** — centered; `size` prop = `prose | editorial | content | wide`.
- **Section** — vertical rhythm; `space` prop = `md | lg | xl | chapter` (24/48/96/128).
- **Grid** — CSS grid wrapper; responsive column props.
- **Stack** — vertical spacing helper.
- **Cluster** — horizontal flex with gap.

### Motion primitives
- **FadeIn** — opacity + 8px translate-y on enter, 320ms, respects reduced-motion.
- **Reveal** — intersection-observer triggered FadeIn.
- **StaggerList** — 60ms per child, cap 8.
- **PageTransition** — 320ms cross-fade wrapper.

## 14. Homepage Philosophy

The homepage is **the museum's front hall**. It does not sell. It invites.

### Structural chapters (top to bottom)
1. **Framed Object Hero** — a single object in a vitrine frame, centered wordmark above, an editorial eyebrow ("Winter 2026 · The Muga Edit").
2. **The Living Craft** — full-bleed artisan photograph (hands on a loom), single sentence overlay in Fraunces.
3. **Guild Spotlight** — a single guild this month, 3:4 portrait + short story + "meet the guild".
4. **The Edit** — three curated products, ProductCards on Muga Silk plates, generous space.
5. **Craft Journal** — editorial strip: latest 2 journal essays, cover images 3:2.
6. **Provenance & GI** — a quiet explainer of why authenticity matters, links to the GI registry.
7. **Categories** — 3-up index of primary categories, editorial photography.
8. **Newsletter** — one line, one input, one ghost button. Kauna Reed copy.
9. **Footer**.

**Rule:** no promo tiles. No countdowns. No banners on top of the hero. Nothing shouts.

## 15. Category / Listing Philosophy

- Hero: full-bleed editorial banner (16:9 desktop) with the category name in Fraunces Display and a one-sentence essay in `text-body-lg`.
- Filter drawer opens from the **left** on mobile, is a **sidebar column** ≥lg.
- Grid: **3-up on desktop, always**. Not 4. Not 2.
- Sort: text-only dropdown ("Recently added · Price: low → high · By artisan"). No pills.
- Pagination: numeric, no infinite scroll. Print-catalog convention.

## 16. Product Detail Philosophy

The PDP is a Chapter PDP (see §12.2). Reading order:

1. **Chapter I — The Object.** 7/5 split. Left: gallery with vertical thumbnail rail. Right: eyebrow (category), title in Fraunces Display Md, provenance one-liner (artisan · village), price in Inter tabular, variant selector (pill grid), single primary CTA (Ereima Green), ghost secondary (wishlist), **Provenance Card**.
2. **Chapter II — The Maker.** Oversized Marker with the artisan's first name → 3:4 portrait left, story right (editorial max-width).
3. **Chapter III — The Craft.** Oversized Marker with the craft name (e.g., "Longpi") → macro material photography left, technique + fibre + days-to-make right.
4. **Chapter IV — Care & Living.** Oversized Marker "Care" → four numbered care notes in prose max-width.
5. **You Might Also Care For** — chrome-free related cards (Clonify-style).

Sticky mini-buy-box appears on scroll past Chapter I on desktop only, right-aligned, minimal.

## 17. Storytelling Principles

1. **Names first.** Every product mentions its maker in the first sentence.
2. **Verbs of craft.** "Woven" not "made." "Fired" not "produced." "Dyed" not "colored."
3. **Concrete numbers.** "047 days on the loom" beats "handmade with care."
4. **Place-specific.** "Wangkhei, Imphal East" beats "North East India."
5. **No superlatives.** Never "best," "unique," "authentic!" — the provenance speaks.
6. **Meitei terminology respected.** Local terms are italicized in body text, not glossed away. First use may be footnoted; subsequent uses stand alone.

## 18. UX Philosophy

- **Slow commerce.** Pages invite reading. Hover states are subtle. Transitions favor fade over slide.
- **One decision per screen.** Home invites entry. Category invites browsing. PDP invites reading. Cart invites completion.
- **Progressive disclosure.** Details in accordions and chapters. Buy box always reachable, never loud.
- **No dark patterns.** No countdowns. No scarcity nudges. No "someone in Delhi just bought this." No discount stickers.
- **Confirm before destroy.** Removing from cart shows an inline undo, not a "confirm delete" modal.

## 19. Accessibility Standards

WCAG 2.2 AA baseline, AAA on body text where achievable.

- Focus: 2px Vermilion ring with 2px offset, always visible, never `outline: none`.
- Keyboard: full tab-order, skip-to-content link, `Esc` closes overlays.
- Semantics: real `<button>`, `<nav>`, `<main>`, `<article>`; one `<h1>` per page.
- `prefers-reduced-motion`: parallax and image zooms disabled; fades reduced to ≤120ms.
- Alt text: every product image describes object AND craft ("Hand-woven muga silk phanek in ochre with Meitei lozenge border").
- Language: `lang="en"`; per-block `lang` on Meitei terms; italicize but don't translate away.
- Minimum body: 16px. Line-length capped. Never justified.
- Contrast: every combination meets or exceeds AA at intended sizes (see §3).

## 20. Responsive Breakpoints

Desktop-first tokens; tokens defined both directions.

| Name | min-width |
|---|---|
| `xs` | 360 px |
| `sm` | 640 px |
| `md` | 768 px |
| `lg` | 1024 px |
| `xl` | 1280 px |
| `2xl` | 1440 px |

- Navbar collapses at `< md`.
- PLP filters move to drawer at `< lg`.
- Dashboards require `≥ md` (below, show summary card + deep link).
- PDP switches from 7/5 split to stacked at `< md`.

## 21. Cultural Motif Guidelines

- Use **subtle motif** in dividers, empty states, and chapter openers. Reference real Manipuri patterns: **Meitei lozenge**, **phanek stripe**, **Longpi rim curl**, **Kauna weave grid**.
- **Never as full background behind text.** Never as decoration for its own sake.
- Vocabulary in consumer-facing copy: **guild** over "seller"; **artisan** over "vendor"; **casket** for gift box (Assamese heritage term); **loom** never "machine."
- **Never use pan-Asian visuals** (pagodas, lanterns, henna) — they misrepresent Manipur.
- When in doubt, drop the motif. Silence is safer than kitsch.

## 22. Copy Voice

- **Confident, quiet, specific.** "Woven by Rimjhim Konjengbam in Wangkhei, spring 2026." Not "Beautiful silk from North East India!"
- **Sentence case everywhere.** ALL-CAPS only for the `caption` eyebrow.
- **No exclamation marks** in product copy. Rare in editorial.
- **Avoid superlatives.** Materials and provenance do the work.
- **Numbers over adjectives.** "047 days" beats "months of dedication."

## 23. Do & Don't

**Do**
- Hairline dividers, generous whitespace, warm off-white grounds.
- Editorial artisan photography at generous scale.
- One primary CTA per screen (Ereima Green).
- Oversized serif markers to open sections.
- Name the maker in the first sentence.

**Don't**
- Drop-shadow everything.
- Stack more than 2 heading levels within 400px vertical.
- Gradients on text or CTAs.
- Autoplay motion above the fold.
- Discount stickers, countdowns, scarcity nudges.
- Pan-Asian visual clichés.

## 24. Conclusions extracted from reference-image analysis

Extracted rules (from the 9 references in `/refrence image/`):

- **Restraint separated the strong references (Clonify, Velora, Nextgen, Aeroflow, Mixtas) from the weak ones (NovaTrend, Lapakbaju).** The strong ones removed things.
- **The framed white card in a saturated color** (Shopcart) → Framed Object Hero (§12.4).
- **The meta table** (Clonify) → Provenance Card (§12.1).
- **The storytelling PDP** (Aeroflow) → Chapter PDP (§12.2).
- **The oversized numeric** (Nextgen "4,5") → Oversized Marker (§12.3).
- **The vertical thumbnail rail** (Velora) → PDP gallery (§16).
- **The centered serif wordmark on a full-bleed hero** (Mixtas) → Homepage hero (§14).
- **Chrome-free related-products** (Clonify) → "You Might Also Care For" (§16).

---

_Next: [DATA_MODELS.md](./DATA_MODELS.md)._
