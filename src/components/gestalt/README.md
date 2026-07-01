# Gestalt Presentation System — Developer Reference

> Dual-track interactive presentation framework for the findcongwang-astro site.
> Last updated: 2026-07-01

---

## Architecture

The system renders presentations with two independent navigation tracks:

| Track | Panel | Navigation | Content |
|-------|-------|-----------|---------|
| **Presentation** | Right (70% width) | Left/Right arrows | Slides (HTML content) |
| **Story** | Left (30% width) + Bottom bar | Up/Down arrows | Word cloud concept evolution |

### Key Files

```
src/components/gestalt/
├── types-v2.ts              # DualTrackPresentation interface (canonical)
├── types.ts                 # Legacy PresentationData interface (preserved)
├── adapt-legacy.ts          # Auto-converts legacy → DualTrack format
├── GestaltPresentation.tsx  # Main orchestrator (dual state, keyboard nav, anchors)
├── SlideViewport.tsx        # Renders current slide HTML + intent tooltip
├── WordCloudGestalt.tsx     # D3 word cloud with frame-cache animation
├── SimpleTimeline.tsx       # Bottom progress bar (timeline or step dots)
├── PresentationIndex.tsx    # Top nav bar showing slide sections
├── gestalt.css              # Grid layout + typography (CSS variables)
├── wordCloudCache.ts        # Frame-per-event pre-computation for smooth animation
├── wordCloudLayout.ts       # Force-directed word placement algorithm
└── data/                    # Presentation data files (one per deck)
    ├── ddes-s26.ts          # Legacy format (auto-adapted)
    ├── libraries-of-the-future.ts  # Canonical DualTrack example
    └── ...

src/pages/presentations/
├── index.astro              # Unlisted index page (card listing)
├── ddes-s26.astro           # Public presentation page
└── libraries-of-the-future.astro  # Passcode-gated page

public/images/presentations/{name}/  # Images per presentation
```

---

## Data Format (DualTrackPresentation)

```typescript
interface DualTrackPresentation {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  duration?: number;

  // PRESENTATION TRACK
  slides: DualTrackSlide[];

  // STORY TRACK
  story: {
    type: "timeline" | "steps" | "progression";
    visualisation: "wordcloud" | "force-graph" | "custom";
    steps: StoryStep[];
    threadColors?: Record<string, string>;
  };

  // LINKAGE: slide → story step (one-way)
  anchors: SlideStoryAnchor[];
}

interface DualTrackSlide {
  id: string;
  title: string;
  type: "title" | "content" | "section" | "appendix";
  html: string;
  layout?: string;
  section?: string;       // Groups slides in the top nav bar
  intent?: string;        // Purpose annotation (lightbulb hover popup)
}

interface StoryStep {
  id: string;
  label: string;          // Shown on the bottom progress bar
  date?: string;          // Only if story.type === "timeline"
  thread?: string;        // Colour coding via threadColors map
  conceptsAdded?: string[];
  conceptsFaded?: string[];
}

interface SlideStoryAnchor {
  slideId: string;
  storyStepId: string;    // When landing on this slide, set story to this step
}
```

---

## Navigation Behaviours

| Input | Action |
|-------|--------|
| Left / Right | Advance/retreat slide. If new slide has an anchor → also sets story position. |
| Up / Down | Advance/retreat story step. Slide stays the same. Word cloud animates. |
| Home / End | Jump to first/last slide |
| F | Toggle fullscreen |
| Click on timeline dot | Jump story to that step + find anchored slide |
| Click on top nav item | Jump to that slide |

**Key rule:** Up/Down navigation is free (not clamped to current slide's anchor range). The anchor only sets the *starting position* when you arrive on a slide.

---

## Creating a New Presentation

### 1. Create the data file

`src/components/gestalt/data/{name}.ts`

```typescript
import type { DualTrackPresentation } from "../types-v2";

export const myPresentationData: DualTrackPresentation = {
  title: "...",
  subtitle: "...",
  author: "Francis Wang",
  date: "2026-07",

  slides: [ /* ... */ ],

  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [ /* ... */ ],
    threadColors: { /* ... */ },
  },

  anchors: [ /* ... */ ],
};
```

### 2. Create the page

`src/pages/presentations/{name}.astro`

```astro
---
import "@/components/gestalt/gestalt.css";
import { GestaltPresentation } from "@/components/gestalt/GestaltPresentation";
import { myPresentationData } from "@/components/gestalt/data/{name}";

function parseSlideIndex(search: string, maxSteps: number): number {
  const params = new URLSearchParams(search);
  const raw = params.get("slide") ?? params.get("step");
  if (raw === null) return 0;
  const n = parseInt(raw, 10);
  if (isNaN(n)) return 0;
  return Math.max(0, Math.min(n, Math.max(0, maxSteps - 1)));
}

const initialSlideIndex = parseSlideIndex(Astro.url.search, myPresentationData.slides.length);
---
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{myPresentationData.title} — Presentation</title>
  <!-- fonts -->
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; overflow: hidden; width: 100vw; height: 100vh; }
    body { background: var(--gestalt-bg, #f8f8fa); font-family: 'Geist', sans-serif; }
  </style>
</head>
<body>
  <GestaltPresentation client:load data={myPresentationData} initialSlideIndex={initialSlideIndex} />
</body>
</html>
```

### 3. Add to index (optional)

Add a card entry to `src/pages/presentations/index.astro`.

### 4. Passcode gating (optional)

See `libraries-of-the-future.astro` for the pattern:
- Server-side check: `Astro.url.searchParams.get("key")`
- Lock screen div (hidden if key matches)
- Client-side form fallback with JS

---

## Word Cloud Behaviour

The word cloud derives its state from `StoryStep[]`:

- **conceptsAdded** on a step: terms appear when story reaches that step
- **conceptsFaded** on a step: terms begin fading when story reaches that step
- **Weight** is auto-assigned: first concept in each step gets 0.95 (hero), subsequent terms descend (0.85, 0.73, 0.61...)
- **Thread** determines colour (via `story.threadColors` map)
- **Fade grace:** terms persist 2 steps after fading before removal (configurable in wordCloudCache.ts)

The cloud pre-computes a frame per story step and animates between frames using D3 transitions.

---

## Intent Annotations

Every slide can have an `intent` field. This renders as:

- A lightbulb icon (bottom-right of the slide panel)
- On hover: popup shows slide title (bold) + intent text (body)
- Icon is 20px, rests at 40% opacity, brightens to 80% on hover
- Popup appears above-left of the icon

**Use intent for:**
- What this slide communicates
- Why it is organized this way
- What the audience should take away
- Guidance for the editorial designer on layout improvements

---

## CSS Layout (gestalt.css)

The presentation uses CSS Grid:

```css
.gestalt-presentation {
  display: grid;
  grid-template-rows: 40px 1fr 56px;
  grid-template-columns: 30% 1fr;
}
```

- `__top`: spans full width (presentation index nav)
- `__left`: word cloud panel (30% width)
- `__right`: slide viewport (70% width, overflow: hidden)
- `__bottom`: spans full width (timeline/progress bar)

Slides are vertically centred within `__right` via flexbox in SlideViewport.

---

## Build and Verify

```powershell
& ".\node_modules\.bin\astro.cmd" build
```

Check output includes `presentations/{name}/index.html`.
