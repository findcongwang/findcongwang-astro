# DDes S26 Emergence Presentation — Design & Handoff Document

> **Location:** `findcongwang-astro/docs/plans/`  
> **Status:** In Progress  
> **Created:** 2026-06-12  
> **Repos:** `findcongwang-astro` (presentation), `fw-vision-dataviz` (widget source)  
> **Symposium Date:** June 13, 2026  
> **Canonical plan copy:** `~/work/FCWANG-Perceptiosphere/docs/plans/2026-06-12-ddes-s26-emergence-presentation.md`

---

## What Cursor Needs to Know

When both repos are open in Cursor, use this document as the primary handoff reference.

| Item | Location / Action |
|------|-----------------|
| **Plan document** | `~/work/FCWANG-Perceptiosphere/docs/plans/2026-06-12-ddes-s26-emergence-presentation.md` |
| **Visual references** | Postimg URLs in [Section 3](#3-visual-design-word-cloud) and [Section 6](#6-visual-design-foresightscope) below |
| **Presentation data** | Ready — `ddes-s26.ts`, `foresight-sovereign-ai.ts`, `strategy-map-ddes.ts` |
| **Widget source to port** | `fw-vision-dataviz/packages/widgets/src/components/StrategyMapSectorDetails.tsx` |
| **Dev server** | `npx astro dev` → `/presentations/ddes-s26`, `/emergence/ddes-s26` |
| **Build verification** | `npx astro build` in `findcongwang-astro` (passes cleanly) |

**Next implementation work:** Components consume the data files already written. Demo slides (`slide-demo-foresight`, `slide-demo-temporal`) still render HTML placeholders in `SlideViewport` — wire in `ForesightScope` and temporal `StrategyMapSector` widgets.

---

## 1. System Overview

### Concept: Emergence Explorer + Storylines

The "Emergence" system is a presentation-as-artifact framework with two layers:

1. **Emergence Explorer** (`/emergence/ddes-s26`) — A standalone, freely navigable visualization showing how research evolved over time. Concepts accumulate, connect, and fade. Anyone can explore at their own pace.

2. **Storyline Presentations** (`/presentations/ddes-s26`) — A guided narrative layer that wraps the Explorer with slide commentary. The DDes S26 symposium talk is the first storyline.

### 16:9 Layout (Presentation Mode)

```
┌─────────────────────────────────────────────────────────────────┐
│  PresentationIndex (top 40px) — topic sequence, current step   │
├──────────────────┬──────────────────────────────────────────────┤
│  WordCloudGestalt│  SlideViewport (right, ≈70% width)          │
│  (left 30%)      │  — renders current slide content             │
│  Animated D3     │  — can embed widgets (ForesightScope, etc.) │
│  word cloud      │                                              │
│  synced with     │  Synced with PresentationIndex (top)        │
│  bottom timeline │                                              │
├──────────────────┴──────────────────────────────────────────────┤
│  SimpleTimeline (bottom 56px) — chronological research events  │
└─────────────────────────────────────────────────────────────────┘
```

### Emergence Explorer (Standalone Mode)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              WordCloudGestalt (fullscreen - 56px)               │
│              Animated D3 word cloud                             │
│              100vw × (100vh - 56px)                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  SimpleTimeline (bottom 56px) — clickable, thread-colored      │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
ddes-s26.ts ──────────────────► GestaltPresentation / GestaltExplorer
  ├── timeline, gestaltTerms, storyline, slides
  │
foresight-sovereign-ai.ts ─────► ForesightScope widget (pending)
  └── sovereignAiData

strategy-map-ddes.ts ──────────► TemporalStrategyMap widget (pending)
  └── ddesStrategyMapData + timelineMapping → sync with ev-* events
```

---

## 2. Current Implementation State

### Files in `findcongwang-astro`

```
src/components/gestalt/
├── types.ts                         ← PresentationData, TimelineEvent, GestaltTerm, SlideContent
├── types-foresight.ts               ← ForesightScopeData, ForesightBranch, ForesightEvent
├── data/
│   ├── ddes-s26.ts                  ← 25 events, 40 terms, 21 slides, 21 steps
│   ├── foresight-sovereign-ai.ts    ← Canada AI sovereignty 50-year scenario (2020–2075)
│   └── strategy-map-ddes.ts         ← 21 nodes, 15 edges, temporal states, timelineMapping
├── SimpleTimeline.tsx               ← D3 horizontal timeline (done, needs visual polish)
├── WordCloudGestalt.tsx             ← D3 animated word cloud (done, needs visual polish)
├── PresentationIndex.tsx            ← Top bar step navigator (done)
├── SlideViewport.tsx                ← Slide renderer via dangerouslySetInnerHTML (done)
├── GestaltExplorer.tsx              ← Standalone explorer (done)
├── GestaltPresentation.tsx          ← Full 4-zone orchestrator (done)
└── gestalt.css                      ← All styles, BEM .gestalt-* prefix

src/pages/
├── presentations/ddes-s26.astro     ← Full presentation page (client:load)
└── emergence/ddes-s26.astro         ← Standalone explorer page (client:visible)
```

### Implementation Status Matrix

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Presentation orchestrator | `GestaltPresentation.tsx` | Done | 4-zone grid, keyboard nav, step reducer |
| Explorer | `GestaltExplorer.tsx` | Done | Word cloud + timeline only |
| Word cloud | `WordCloudGestalt.tsx` | Done | Needs rotation + visual polish |
| Timeline | `SimpleTimeline.tsx` | Done | Needs visual polish |
| Slide index | `PresentationIndex.tsx` | Done | Clickable step jumps |
| Slide viewport | `SlideViewport.tsx` | Done | HTML slides; no widget embedding yet |
| **ForesightScope** | — | **Not started** | Data + types ready; demo slide is placeholder |
| **Temporal Strategy Map** | — | **Not started** | Data ready; port from `StrategyMapSectorDetails` |
| Presentation data | `ddes-s26.ts` | Done | Full storyline through symposium |
| Foresight data | `foresight-sovereign-ai.ts` | Done | 3 histories, 5 futures, branch deps |
| Strategy map data | `strategy-map-ddes.ts` | Done | 21 nodes, 15 edges, timeline sync |

### How to Run

```bash
cd ~/work/FCWANG/findcongwang-astro
npx astro dev
# http://localhost:4321/presentations/ddes-s26  — arrow keys navigate
# http://localhost:4321/emergence/ddes-s26      — click timeline to explore

npx astro build   # static build — passes cleanly
```

### Dependencies Added

- `@astrojs/react`, `react`, `react-dom` — React integration
- `d3`, `@types/d3` — D3.js for visualizations
- Astro config updated with `react()` integration

---

## 3. ForesightScope Data + Types

### Type Definitions

**File:** `src/components/gestalt/types-foresight.ts`

Models the sideways hourglass: histories converge toward present (left), futures diverge from present (right).

```typescript
interface ForesightEvent {
  id: string;
  date: string;       // ISO date
  label: string;
  type: "milestone" | "decision" | "inflection" | "crisis";
}

interface ForesightBranch {
  id: string;
  label: string;
  description: string;
  branchDate: string;           // when branch diverges/converges
  endDate?: string;
  dependsOn?: string;           // parent branch ID
  confidence: number;           // 0–1 → line thickness/opacity
  color?: string;
  valence?: "positive" | "negative" | "neutral";
  events: ForesightEvent[];
}

interface ForesightScopeData {
  title: string;
  description: string;
  presentDate: string;          // pinch point ("now")
  timeRange: { start: string; end: string };
  mainThread: ForesightEvent[]; // center horizontal line
  histories: ForesightBranch[];
  futures: ForesightBranch[];
  palette?: string[];
}
```

### Sample Data

**File:** `src/components/gestalt/data/foresight-sovereign-ai.ts`  
**Export:** `sovereignAiData`

Canada's AI sovereignty 50-year scenario (2020–2075), grounded in DDes research:

| Metric | Value |
|--------|-------|
| Global AI compute share | 0.6% |
| AI professionals relocated to US | 53% |
| AI startup funding change | −30% |
| Present date | 2026-06-01 |
| Time range | 2020-01-01 → 2075-12-31 |

**Main thread (10 events):** COVID digital acceleration → ChatGPT → funding drop → talent drain → 0.6% compute share → AIAC report → present decision window → sovereign data centers → grid modernization → net-zero deadline.

**Historical branches (3, converging):**

| ID | Label | Valence | Confidence |
|----|-------|---------|------------|
| `hist-01` | Brain Drain Acceleration | negative | 0.95 |
| `hist-02` | Cloud Dependency Lock-in | negative | 0.90 |
| `hist-03` | Clean Energy Advantage (Unrealized) | neutral | 0.85 |

**Future scenario branches (5, diverging):**

| ID | Label | Valence | Confidence | Depends On |
|----|-------|---------|------------|------------|
| `fut-01` | Sovereign Compute Corridor | positive | 0.45 | — |
| `fut-02` | Provincial Fragmentation | negative | 0.60 | — |
| `fut-03` | Deep Dependency (Status Quo) | negative | 0.70 | — |
| `fut-04` | Distributed Energy-AI Symbiosis | positive | 0.30 | `fut-01` |
| `fut-05` | Arctic Data Sovereignty | positive | 0.20 | `fut-01` |

**Palette:** emerald `#10b981`, sky `#0ea5e9`, amber `#f59e0b`, red `#ef4444`, violet `#8b5cf6`, indigo `#6366f1`

### Presentation Integration

- Storyline step: `step-17` → `slide-demo-foresight` → timeline anchor `ev-17`
- Slide currently shows `.demo-placeholder` — replace with live `ForesightScope` consuming `sovereignAiData`
- Future standalone route: `/emergence/foresight-sovereign-ai`

---

## 4. Temporal Strategy Map Data

### Type Definitions

**File:** `src/components/gestalt/data/strategy-map-ddes.ts` (types defined inline, extends fw-vision patterns)

```typescript
interface TemporalStrategyMapNode {
  id: string;
  number: number;
  band: 1 | 2 | 3 | 4;          // Context → Indicators → Tactics → Artifacts
  sectorIndex: number;
  label: string;
  description: string;
  details?: string;
  progress: number;              // 0–1
  appearedAt?: string;           // timeline event ID (ev-*)
  fadingAt?: string;
  removedAt?: string;
  valence?: "positive" | "negative" | "neutral";
}

interface TemporalStrategyMapData {
  title: string;
  sectorLabel: string;
  bandLabels: [string, string, string, string];
  nodes: TemporalStrategyMapNode[];
  edges: TemporalStrategyMapEdge[];
  timelineMapping: { nodeId: string; eventId: string }[];
}
```

### Sample Data

**Export:** `ddesStrategyMapData`

| Band | Count | Nodes |
|------|-------|-------|
| 1 Context | 4 | Knowledge Wastage, Short-Termism, AI Talent Gap, Innovation Fragmentation |
| 2 Indicators | 4 | Cooperathon, Thread Convergence, Perceptiosphere Operational, Constellation Demo |
| 3 Tactics | 6 | CORE Cycle, Perpetuating Inquiry, Sovereign Collective, Scoping Exercise, Temporal Injection, Hub Blueprint |
| 4 Artifacts | 7 | Perceptiosphere System, Constellation Tool, Strategy Map, Foresight Scope, Emergence Presentation, DDes Essay, Cat's Cradle |

**Totals:** 21 nodes, 15 support edges across bands

**Temporal examples:**
- `tac-hub-blueprint` — appeared `ev-02`, fading `ev-24`
- `art-cats-cradle` — appeared `ev-02`, fading `ev-13`
- `ctx-ai-talent-drain` — appeared `ev-16`, negative valence

**Valence distribution:** negative context problems, positive tactics/artifacts, neutral fading artifacts

**timelineMapping (21 entries):** Links each node to a `ddes-s26.ts` timeline event (`ev-02` through `ev-25`) for per-step animation sync with `GestaltPresentation.currentEventId`.

### Presentation Integration

- Storyline step: `step-18` → `slide-demo-temporal` → timeline anchor `ev-15`
- Slide currently shows `.demo-placeholder` — replace with temporal `StrategyMapSector` widget
- Animation mode TBD: per-step (sync to `currentEventId`) vs continuous timeline scrub

---

## 5. Visual Design: Word Cloud

### Visual References

**Local files (in this repo):**
- **Horizontal word cloud:** `tempfiles/horz_wordcloud.jpg`
- **Vertical word cloud:** `tempfiles/vert_wordcloud.png`

**Remote (same images):**
- https://i.postimg.cc/90Tfq2bb/horz-wordcloud.jpg
- https://i.postimg.cc/4yt3hGPB/vert-wordcloud.png

### Current Implementation

**File:** `src/components/gestalt/WordCloudGestalt.tsx`

Uses D3 force simulation with:
- `forceCenter` — pulls active terms toward center
- `forceCollide` — prevents overlap (radius based on text dimensions)
- `forceX/forceY` — pushes fading terms to periphery

### Desired Behavior

- **Active terms:** Full opacity, colored by thread, sized by weight, positioned toward center
- **Fading terms:** Reduced opacity (0.22), smaller font, gray color, drift to periphery (never fully disappear)
- **Emerging terms:** Animate in from opacity 0, grow from 50% size
- **Transitions:** 600ms d3.easeCubicInOut

### Viewport Orientation Adaptation

The word cloud should detect its container's aspect ratio and adapt:

- **Landscape** (width > height × 1.3): Spread terms more horizontally, reduce vertical collision padding. Suitable for the left panel of the presentation mode.
- **Portrait** (height > width × 1.3): Stack terms more vertically, words can be rotated 90° selectively for denser packing.
- **Square** (within 1.3 ratio): Balanced radial spread from center.

### Design Direction

- Words should mix **0° (horizontal) and 90° (vertical)** rotation based on the references
- Tight packing — words should fill the available space densely
- Font: `Geist, sans-serif` (already configured)
- Multi-color by thread (4 thread colors defined in data)
- Background: TBD (awaiting final decision, currently `#0a0a0f`)

### Thread Colors

```typescript
threadColors: {
  "meta": "#6366f1",                  // indigo — Designing Innovation
  "hybrid-intelligence": "#0ea5e9",   // sky blue
  "ecosystems": "#10b981",            // emerald
  "perceptiosphere": "#f59e0b",       // amber
}
```

### Key Variables to Tune (in WordCloudGestalt.tsx)

- `fontSize`: currently `weight * 24 + 11` — adjust for density/readability
- `forceCollide radius`: currently `term.length * fontSize * 0.28 + 6` — adjust for packing tightness
- `forceX/Y strength`: currently 0.04 active, 0.03 fading — adjust for drift speed
- `alpha`: currently 0.6 on restart — controls simulation energy
- `alphaDecay`: currently 0.02 — controls how quickly simulation settles
- Word rotation: currently all 0° — add 90° for some terms based on reference style

---

## 6. Visual Design: ForesightScope

### Visual Reference

**Local file (in this repo):**
- **Foresight scope:** `tempfiles/forescope_scope.png`

**Remote (same image):**
- https://i.postimg.cc/gJ1JJjVK/forescope-scope.png

### Concept

A **sideways hourglass** or **futures cone** visualization. Time flows left-to-right:

```
    PAST                  PRESENT               FUTURES
    
  ╲  history 1  ╲          │           ╱  scenario A  ╱
   ╲  history 2  ╲         │          ╱  scenario B  ╱
    ═══════════════════════ ● ═══════════════════════
   ╱  history 3  ╱         │          ╲  scenario C  ╲
  ╱  history 4  ╱          │           ╲  scenario D  ╲
```

Key properties:
- **Dynamic shape:** The hourglass width adapts to how many scenarios/histories exist
- **One-directional version:** When we don't have alternative history data, only the right cone (futures) is shown — just a diverging fan from the present
- **Branches have dependencies:** Scenario B might depend on Scenario A happening first (`dependsOn`)
- **The simple timeline is one thread through the center** — the horizontal axis of the hourglass

### Rendering Behavior

- **Lines:** Smooth bezier curves from branch point, fanning outward
- **Angle:** Spread angle proportional to number of branches (more branches = wider fan)
- **Line thickness:** Varies by confidence (0.5–3px range)
- **Line opacity:** Varies by confidence (0.3–1.0 range)
- **Valence:** positive branches lean green palette, negative lean red/amber
- **Nodes:** Small circles at events, larger circles at branch/decision points
- **Labels:** Positioned along curves or at endpoints
- **Present marker:** Vertical line or emphasized node at pinch point
- **Dynamic width:** The SVG viewBox and visual spread adapt to data volume

### How It Fits in the Presentation

- Rendered as a slide widget inside `SlideViewport` for `slide-demo-foresight`
- Can also be standalone at `/emergence/foresight-sovereign-ai` (future)
- Demonstrates "Demo 2: Foresight Scenario Exploration"

---

## 7. Visual Design: Strategy Map Sector

### Source Code (fw-vision-dataviz)

The single-sector quadrant view already exists in fw-vision-dataviz:

| File | Purpose |
|------|---------|
| `packages/widgets/src/types/strategyMap.ts` | Type definitions (StrategyMapNode, Edge, Band, etc.) |
| `packages/widgets/src/components/StrategyMapSectorDetails.tsx` | **Primary port target** — quadrant rendering component |
| `packages/widgets/src/components/strategyMapQuadrantLayout.ts` | Layout algorithm (quarter-circle placement) |
| `packages/widgets/src/components/strategyMapQuadrantRender.ts` | SVG arc/band rendering helpers |
| `packages/widgets/src/components/strategyMapGraph.ts` | Edge routing, adjacency, path generation |
| `packages/widgets/src/components/strategyMapLayout.ts` | Ring radii calculation, sector angle math |
| `packages/widgets/src/components/StrategyMap.css` | Styles (BEM: `.fw-strategy-map__*`) |
| `packages/widgets/src/components/StrategyMap.tsx` | Full 4-sector map with navigation |
| `apps/workshop/src/data/strategyMap.sample.ts` | Sample data with 4 sectors (STEP analysis) |
| `apps/workshop/src/components/StrategyMapDemoSelector.tsx` | Workshop demo selector |
| `apps/workshop/src/pages/test-strategy-map.astro` | Workshop test page |

### What to Port

For the presentation, build a **simplified, self-contained** version that:
1. Renders a single quadrant (quarter-arc) in a square viewport
2. Shows 4 concentric band arcs (Context → Indicators → Tactics → Artifacts)
3. Places numbered nodes with progress rings
4. Draws support edges between nodes
5. **NEW:** Adds temporal node states (emerging/established/fading) driven by `currentEventId`

### Visual Language for Temporal States

| State | Border Style | Opacity | Color | Description |
|-------|-------------|---------|-------|-------------|
| Emerging | Dashed, thin (1px) | 0.6 → 1.0 | Thread color | Just appeared, solidifying |
| Established | Solid, standard (2px) | 1.0 | Thread color | Core active concern |
| Goal (positive) | Solid, standard | 1.0 | Green accent | Striving toward |
| Avoid (negative) | Solid, standard | 1.0 | Red/amber accent | Avoiding/pitfall |
| Fading | Dashed, thinning | 1.0 → 0.3 | Gray | Leaving scope of concern |
| Removed | Not rendered | 0 | — | No longer relevant |

### Temporal State Logic

Given `currentEventId` from `GestaltPresentation`:

```
if removedAt && currentEvent >= removedAt → hide node
else if fadingAt && currentEvent >= fadingAt → fading state
else if appearedAt && currentEvent >= appearedAt → established (or emerging if just appeared)
else → hidden (not yet in scope)
```

Use `timelineMapping` and `ddes-s26.ts` event ordering to resolve event sequence comparisons.

---

## 8. Visual Design: Overall Presentation

### Typography

- **Font family:** `Geist, sans-serif` (all text)
- **Headings:** Geist, weights 600–700, negative letter-spacing (−0.01em to −0.02em)
- **Body:** Geist, weight 400, line-height 1.7
- **Mono:** `Geist Mono, monospace`
- **Serif (optional for quotes):** `Newsreader, serif`
- **Google Fonts loaded in page head** (link already in both `.astro` pages)

### Color System

Currently using CSS variables in `gestalt.css`:

```css
:root {
  --gestalt-bg: #0a0a0f;          /* Near-black — TBD from visual reference */
  --gestalt-surface: #111118;      /* Slightly lighter surface */
  --gestalt-text: #e8e8ea;         /* Primary text */
  --gestalt-border: #1f1f2e;       /* Subtle borders */
  --gestalt-muted: #6b7280;        /* Muted text */
  --gestalt-dim: #9ca3af;          /* Dimmed text */
  --gestalt-primary: #6366f1;      /* Primary accent (indigo) */
  --gestalt-accent: #a5b4fc;       /* Light accent */
}
```

### Blog Design System Reference (from `src/styles/global.css`)

```css
--font-sans: Geist, sans-serif;
--font-mono: Geist Mono, monospace;
--font-serif: Newsreader, serif;
--color-primary: oklch(1 0 0);        /* white (dark mode text) */
--color-secondary: oklch(0.1684 0 0); /* near-black (dark mode bg) */
--color-accent: oklch(66.09% 0.195 37.35); /* warm orange-red accent */
```

### Domain Colors (from blog, potential use for threads)

```css
--domain-business-technology-entrepreneurship: #e06666;
--domain-design-and-futures-studies: #b794f6;
--domain-health-fitness-longevity: #7dd3fc;
--domain-sustainable-development: #5eead4;
--domain-learning-science: #fdba74;
```

---

## 9. Cross-Repo References for Cursor

### fw-vision-dataviz Workspace

When working in Cursor with both repos loaded:

| What | Path in fw-vision-dataviz |
|------|---------------------------|
| Package exports | `packages/widgets/src/index.ts` |
| Strategy map types | `packages/widgets/src/types/strategyMap.ts` |
| Sector detail component | `packages/widgets/src/components/StrategyMapSectorDetails.tsx` |
| Quadrant layout algorithm | `packages/widgets/src/components/strategyMapQuadrantLayout.ts` |
| Quadrant render helpers | `packages/widgets/src/components/strategyMapQuadrantRender.ts` |
| Graph/edge routing | `packages/widgets/src/components/strategyMapGraph.ts` |
| Layout utilities | `packages/widgets/src/components/strategyMapLayout.ts` |
| Strategy map styles | `packages/widgets/src/components/StrategyMap.css` |
| Full strategy map | `packages/widgets/src/components/StrategyMap.tsx` |
| Sample data (STEP analysis) | `apps/workshop/src/data/strategyMap.sample.ts` |
| Concept map component | `packages/widgets/src/components/ConceptMap.tsx` |
| Concept map types | `packages/widgets/src/types/schema.ts` |
| KW Ecosystem data (storylines) | `apps/workshop/src/data/knowledgemesh/kw-ecosystem/` |
| Knowledge mesh constellation | `packages/knowledgeMesh/src/components/views/ConstellationView.tsx` |
| Workshop pages | `apps/workshop/src/pages/test-strategy-map.astro`, `test-concept-map.astro` |
| Workshop dev command | `npm run dev:workshop` |

### Key Patterns to Reuse

1. **Ring radii calculation** — `buildRingRadii()` in `strategyMapLayout.ts`
2. **Quarter-arc placement** — `layoutQuadrantSector()` in `strategyMapQuadrantLayout.ts`
3. **Edge path generation** — `linkPathD()`, `quadChordBulge()` in `strategyMapGraph.ts`
4. **Collision detection** — `buildAdjacency()` for hover highlighting
5. **Deterministic jitter** — `det01()` hash function for stable node placement
6. **Progress rings** — node `progress` field (0–1) rendered as arc stroke in `StrategyMapSectorDetails`

### Exported Widgets (from `packages/widgets/src/index.ts`)

```typescript
export { ConceptMap } from "./components/ConceptMap";
export { StrategyMap, STRATEGY_MAP_BANDS } from "./components/StrategyMap";
export { StrategyMapSectorDetails } from "./components/StrategyMapSectorDetails";
export { BusinessCanvasMap } from "./components/BusinessCanvasMap";
```

Note: `ForesightScope` does not exist yet in fw-vision-dataviz — build in gestalt first, then extract to widgets post-symposium.

---

## 10. Behavioral Specifications

### Animation Timing

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Word cloud term enter | 600ms | cubicOut | New term becomes active |
| Word cloud term fade | 600ms | cubicInOut | Term moves to fading state |
| Word cloud position | Continuous (force sim) | N/A | Force simulation running |
| Timeline marker move | 300ms | cubicInOut | Step change |
| Slide content fade | 300ms | ease-in-out | Step change |
| Foresight branch draw | 800ms | cubicOut | On mount or data change |
| Strategy map node appear | 400ms | cubicOut | `appearedAt` event reached |
| Strategy map node fade | 600ms | cubicInOut | `fadingAt` event reached |

### Keyboard Navigation (Presentation Mode)

| Key | Action | Implemented |
|-----|--------|-------------|
| → / Space | Next step | Yes |
| ← | Previous step | Yes |
| Backspace | Previous step | Spec only (not wired) |
| Home | First step | Yes |
| End | Last step | Yes |
| F | Toggle fullscreen | Yes |

### Interaction Model

- **Presentation mode:** Keyboard-driven (arrows advance), timeline clickable to jump, index clickable to jump
- **Explorer mode:** Timeline clickable, free exploration (no keyboard step navigation)
- **Future:** Auto-play mode with configurable speed

### Sync Points

All zones share `currentEventId` derived from `storyline[currentStepIndex].timelineAnchor`:

```
PresentationIndex.onStepClick → dispatch GOTO_STEP
SimpleTimeline.onEventClick   → find step by timelineAnchor → GOTO_STEP
WordCloudGestalt              → filter terms by appearedAt/fadedAt vs currentEventId
SlideViewport                 → render slide for current step (widget embed TBD)
StrategyMap (future)          → temporal states from strategy-map-ddes.ts + currentEventId
```

---

## 11. Outstanding Decisions

| Decision | Options | Current Default |
|----------|---------|-----------------|
| Background color | From visual reference (via Cursor) | `#0a0a0f` |
| Word rotation angles | 0° only vs. 0° + 90° mix | 0° only |
| Foresight line style | Straight vs. bezier curves | TBD |
| Foresight color scheme | Thread colors vs. confidence-based | Confidence + valence palette |
| Strategy map temporal animation | Per-step vs. continuous timeline | Per-step |
| Widget embedding in slides | React island in SlideViewport vs. slide type registry | TBD |

---

## 12. Post-Symposium Roadmap

1. Extract gestalt components to `@fw-vision/widgets` in fw-vision-dataviz
2. Publish via GitHub Packages for cross-repo consumption
3. Create `presentations` content collection in findcongwang-astro with dedicated schema
4. Generalize storyline system (reusable for FW.VISION presentations)
5. Build full Foresight Scope as a first-class widget
6. Implement strategy map temporal animation as standard widget feature
