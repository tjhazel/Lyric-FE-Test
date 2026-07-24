# Lyric Music — Claude Context

## Mantine UI Reference

Mantine provides AI-friendly documentation at:
- **Compact:** `https://mantine.dev/llms.txt`
- **Full (~1.8 MB):** `https://mantine.dev/llms-full.txt`

When working on Mantine components or theming, fetch the compact URL for accurate, version-current API details rather than relying on training data.

---

## Tech Stack

Mirrors the `jjs` project stack exactly:

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Language | TypeScript (strict, bundler mode) |
| UI library | Mantine v9 (`@mantine/core`, `@mantine/hooks`) |
| Icons | `@tabler/icons-react` |
| Styling | CSS Modules + direct hex values (no Mantine dark tokens) |
| PostCSS | `postcss-preset-mantine` + `postcss-simple-vars` |

```
npm run dev    # start dev server
npm run build  # production build
npx tsc --noEmit  # type-check only
```

---

## Design System

Source: Sketch file (inspected via AI). All values are exact Sketch measurements — do not substitute Mantine color tokens or guesses.

**Colors**
| Token | Hex | Usage |
|---|---|---|
| Lyric Green | `#007264` / `rgba(0,114,100,1)` | Band names, active pill, Coming Soon title, icon teal |
| Lyric Green light | `#33E1A5` | Previously used for SVG icon stroke (check before reusing) |
| Page background | `#181818` | `body`, inactive pills, search background |
| Header background | `#0F0F0F` | Top header bar, right sidebar |
| Coming Soon block | `#181818` (`rgba(24,24,24,1)`) | Slightly lighter than header |
| Card background | `#000000` | Band cards |
| Body text | `#9C9C9C` | Description, caption text |
| Secondary text | `#CBCBCB` | Album text, icon color, inactive pill labels |
| Placeholder / search icon | `#484848` | Search icon, placeholder color |

**Mantine theme override** (`src/App.tsx`): `primaryColor: 'teal'`, `primaryShade: 6`, custom `lyricGreen` color tuple replacing Mantine's default teal. `defaultColorScheme="dark"`.

**Typography**: Inter throughout. Never use SF Compact / SF Symbols — those are Apple-only. Use Tabler Icons as substitutes.

**Key dimensions (Sketch exact)**
- Page max-width: 1680px, padding: `28px 64px 40px 28px`
- Column gap: 28px (matches card grid spacing)
- Header bar: `1267×89px`, `border-radius: 10px`, `background: #0F0F0F`, `padding: 0 24px 0 33px`
- Logo: `163×105px` (PNG has transparent space; overflows header height intentionally)
- Right column: `374px` wide, `border-radius: 10px`, `background: rgba(15,15,15,1)`
- Band cards: `background: #000000`, `border-radius: 10px`, image height `196px`
- Band name: Inter Bold 20px `#007264`
- Album: Inter Regular 13px `#CBCBCB`
- Description: Inter Regular 13px `#9C9C9C`, `-webkit-line-clamp: 4`
- Genre pills: `38px` tall, `19px` radius, Inter Regular 18px, `#CBCBCB` label
- Active pill: `width: 89px`, `background: rgba(0,114,100,1)`, centered label
- Search: `200×36px`, `radius: 18px`, `background: #181818`
- Icon container: `270×42px`, icons `29px` via CSS (not size prop), gap `11px`
- Coming Soon block: `306px` wide, `border-radius: 10px`, `background: rgba(24,24,24,1)`, `padding: 12px 16px`
- Coming Soon title: Inter Bold 19px `#007264`, `line-height: 35px`
- Coming Soon caption: Inter Regular 13px `#9C9C9C`

---

## Directory Structure

```
src/
  App.tsx                         # MantineProvider + theme
  main.tsx
  index.css                       # body background #181818, box-sizing reset

  data/
    band/
      band-model.ts               # Band, BandDetail interfaces
      api/
        band-fetcher.ts           # fetchBands, fetchBandDetail, getBandImageSrc, IMAGE_MAP
      hooks/
        useBands.ts               # { data: Band[], loading, error }
        useBandDetail.ts          # { data: BandDetail | null, loading, error }
        useBandImage.ts           # { data: string | null, loading, error, onError }

  components/
    layout/
      AppLayout.tsx               # Two-column shell, Drawer + Burger for mobile
      AppLayout.module.css
    band/
      BandCard.tsx                # Uses useBandDetail + useBandImage hooks
      BandCard.module.css
      BandFilter.tsx              # Genre pills + search; drawerMode prop for mobile drawer
      BandFilter.module.css
      BandGrid.tsx                # SimpleGrid cols={1/2/3}
    panel/
      RightPanel.tsx              # Welcome copy + Coming Soon block
      RightPanel.module.css

  pages/
    Home.tsx                      # Composes everything; owns search/genre/panelOpen state

public/
  mock_data/
    bands.json                    # 12 bands (id, band_name, album, genre)
    001.json                      # BandDetail for The Velvet Echo
    005.json                      # BandDetail for Neon Reverie
  sources/
    lyric_lg_rgb_mnt_wht.png      # Logo (white on transparent)
    im001.png … im012.png         # Band images (not all IDs have images)
    default.png                   # Fallback image
```

---

## Path Aliases

Defined in `vite.config.ts` and mirrored in `tsconfig.app.json`:

```
@          → src/
@components → src/components/
@data       → src/data/
@pages      → src/pages/
```

Data layer imports use the full sub-path: `@data/band/band-model`, `@data/band/hooks/useBands`, etc.

---

## Data Layer Pattern

Three-tier separation modelled on SWR conventions:

1. **Model** (`band-model.ts`) — plain TypeScript interfaces, no logic
2. **Fetcher** (`api/band-fetcher.ts`) — raw `fetch()` calls; Vite dev server returns `index.html` (200 OK) for missing public files, so `fetchBandDetail` checks `content-type` header before parsing JSON
3. **Hook** (`hooks/`) — wraps fetchers in `useState` + `useEffect`, returns `{ data, loading, error }`

`useBandImage` manages a three-state fallback machine (`primary → fallback → failed`) so the `<img>` error handler never loops infinitely. Returns `data: null` when both primary and fallback fail; component renders a letter placeholder instead.

---

## Layout

**Two-column, natural scroll** — nothing is sticky or fixed. The whole page scrolls as one unit.

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]  [All][Country][Rock][Pop]  [Search]  [🔔⚙💬]    │ ← header bar
├──────────────────────────────────────────────┬───────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐               │ Welcome   │
│  │ img  │  │ img  │  │ img  │               │ to Lyric  │
│  Band    Band    Band                        │ Music  [X]│
│  Name    Name    Name (teal)                 │           │
│  Album   Album   Album (#CBCBCB)             │  body...  │
│  Desc    Desc    Desc  (#9C9C9C, 4-line)     │           │
│                                              │ [COMING   │
│  ← 3-col SimpleGrid, spacing=28 →           │  SOON]    │
└──────────────────────────────────────────────┴───────────┘
```

Right column uses `align-self: flex-start` (sizes to content, not page height). Close button (`IconX`) on right panel triggers a width/opacity transition to collapse it.

---

## Mobile / Responsive

Uses **Mantine `visibleFrom` / `hiddenFrom`** props — same pattern as `jjs` `HeaderMenu`.

| Breakpoint | Behaviour |
|---|---|
| `≥ sm` (768px) | Full desktop layout: pills + search in header, icon row visible |
| `< sm` (mobile) | Pills and search move into a `Drawer`; header shows Logo + `Burger` only |

The `Burger` opens a Mantine `Drawer` (`position="left"`, dark theme styles) containing `<BandFilter drawerMode />`. In `drawerMode`, `BandFilter` renders pills vertically (full-width, touch-friendly) followed by the search input.

Right sidebar (`rightCol`) is hidden below `991px` via `display: none` in CSS.

Card grid: `cols={{ base: 1, sm: 2, lg: 3 }}`.

---

## Mock Data Notes

- Only `001.json` and `005.json` exist — all other bands show the default description
- Image filenames use inconsistent zero-padding: IDs 001–009 → `im001.png` (3-digit); IDs 010, 012 → `im0010.png`, `im0012.png` (4-digit with extra zero). `IMAGE_MAP` in `band-fetcher.ts` handles this statically
- IDs without images (004, 006, 007, 009, 011): `getBandImageSrc` returns `default.png`; if that also fails, `useBandImage` returns `data: null` and the card shows a letter placeholder

---

## ⚠️ Do Not Destroy Assets

Early in this project, running `npx create-vite --overwrite` inside the repo root permanently deleted `public/mock_data/` and `public/sources/` — all band images and JSON fixtures were lost and had to be reconstructed.

**Never run any of the following inside this repo:**
- `npx create-vite --overwrite` or any scaffolding CLI with `--overwrite` / `--force`
- `rm -rf public/` or any broad deletion of the `public/` directory
- `git clean -fd` without first checking what is untracked

`public/sources/` contains the original PNG assets provided with the take-home (logo, band images, default fallback). They are not in version control. If they are deleted, the only recovery path is the original take-home zip/email.

---

## Notable Decisions

- **Plain `<button>` and `<input>`** for filter pills and search (not Mantine components) — reduces bundle and gives exact CSS control
- **Icon size via CSS** (`.icons svg { width: 29px; height: 29px }`) rather than `size` prop on each icon — container height is the single source of truth
- **`await res.json()`** (not `return res.json()`) in `fetchBandDetail` so parse errors are caught inside the `try/catch`
- **No sticky positioning** — earlier attempts at sticky header caused content-bleed through rounded corners. The Sketch does not specify sticky behaviour so the whole page scrolls naturally
- **`drawerMode` prop on BandFilter** — avoids duplicating pill JSX; the same component renders vertically in the drawer and horizontally in the header
- **`useDisclosure`** from `@mantine/hooks` for Drawer open/close state (same as jjs pattern)
