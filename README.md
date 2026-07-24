# Lyric Music — Front-End Take-Home

A band browsing UI built to match a provided Sketch design. Features real-time search and genre filtering across a 12-band catalogue, with a collapsible welcome panel and full responsive support down to mobile.

---

## Prerequisites

- Node.js 20+
- npm 10+

---

## Setup

```bash
npm install
```

The app relies on static assets served from `public/`. These are included in the repo:

| Path | Contents |
|---|---|
| `public/mock_data/bands.json` | Band catalogue (12 entries) |
| `public/mock_data/001.json` | Detail JSON for The Velvet Echo |
| `public/mock_data/005.json` | Detail JSON for Neon Reverie |
| `public/sources/` | Band images + logo PNG files |

---

## Running

```bash
# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type-check only
npx tsc --noEmit
```

---

## Features

- **Band grid** — 12 bands displayed in a responsive 3-column card layout (2-col tablet, 1-col mobile)
- **Genre filter** — pill buttons for All / Country / Rock / Pop; selecting a genre narrows the grid
- **Search** — real-time text filter across band names
- **Band detail** — per-band description loaded from individual JSON fixtures; falls back to default copy when no detail file exists
- **Image fallback** — three-state machine (primary image → default.png → letter placeholder) prevents infinite error loops on missing assets
- **Welcome panel** — collapsible right sidebar with static copy and a Coming Soon block; close button animates the panel out
- **Mobile drawer** — below 768px the filter pills and search move into a slide-out drawer opened by a hamburger button; desktop header remains clean

---

## Project Structure

```
src/
  data/band/
    band-model.ts          # TypeScript interfaces (Band, BandDetail)
    api/band-fetcher.ts    # Raw fetch functions + image src map
    hooks/
      useBands.ts          # { data, loading, error }
      useBandDetail.ts     # { data, loading, error }
      useBandImage.ts      # { data, loading, error, onError }

  components/
    layout/AppLayout       # Two-column shell + mobile Drawer/Burger
    band/BandCard          # Card with image fallback + detail description
    band/BandFilter        # Genre pills + search (header and drawer modes)
    band/BandGrid          # Responsive SimpleGrid wrapper
    panel/RightPanel       # Welcome copy + Coming Soon block

  pages/Home.tsx           # Root page; owns search/genre/panel state
```

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Language | TypeScript |
| UI library | Mantine v9 |
| Icons | Tabler Icons |
| Styling | CSS Modules |

---

## Notes

- All design values (colours, spacing, typography) are taken directly from the provided Sketch file via the Inspect panel
- AI tooling was used throughout development in accordance with the take-home guidelines

### Icon substitutions

The Sketch design references two icons from Apple's SF Symbols library, which is proprietary and not licensed for web use. Equivalent icons from [@tabler/icons-react](https://tabler.io/icons) were used instead:

| Location | Sketch original | Substitute |
|---|---|---|
| Coming Soon block | SF Symbols `flag.2.crossed` (dual crossed pennant flags) | `IconFlag` |
| Header actions | SF Symbols service/bicycle gear | `IconSettings` |

Both substitutes are visually consistent with the design intent and carry no copyright restrictions.  The remaining header icons (`IconBell`, `IconMessageCircle`) are direct Tabler equivalents with no SF Symbols conflict.
