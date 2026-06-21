# FW.VISION Widgets — Migration Plan

Snapshot date: **2026-06-12**

## Why vendored

The findcongwang-astro site deploys to GitHub Pages **without** the sibling `fw-vision-dataviz` repository. `@fw-vision/widgets` is not published to npm yet, so presentation slides 14–15 vendor a local copy under `src/components/fw-vision/`.

## What was copied

From `fw-vision-dataviz/packages/widgets/src`:

| Vendored path | Purpose |
|---------------|---------|
| `StrategyMapQuadrant/` | Temporal strategy quadrant (slide 14) |
| `BusinessCanvasMap.tsx` + `.css` | Business model canvas (slide 15) |
| `strategyMapQuadrantLayout.ts` | Quadrant node placement |
| `utils/strategyMapGraph.ts` | Dependency edges + highlight |
| `utils/evolvingStrategyTemporal.ts` | Time-based node state (optional) |
| `businessCanvasLayouts.ts` | Zone presets per canvas variant |
| `types/evolvingStrategyMap.ts` | Strategy map data contract |
| `types/businessCanvas.ts` | Canvas data contract |
| `types/strategyMap.ts` | Band + edge types |

Presentation data (gestalt):

| File | Source |
|------|--------|
| `gestalt/data/evolving-strategy-ddes.ts` | `fw-vision-dataviz/apps/workshop/src/data/evolving-strategy-ddes.ts` |
| `gestalt/data/bmc-era-ai.ts` | `temporal-canvas/snapshots/era-ai.ts` (MapleAI 2023) |

Legacy gestalt files **not removed** (Foresight slide still uses local components):

- `gestalt/StrategyMapSector.tsx`
- `gestalt/strategyMapQuadrantLayout.ts`
- `gestalt/strategyMapGraph.ts`
- `gestalt/data/strategy-map-ddes.ts`

## Migration steps (when fw-vision-dataviz is deployable)

1. **Add dependency** — `npm install @fw-vision/widgets` via npm publish, GitHub package, or `"file:../../FW.VISION/fw-vision-dataviz/packages/widgets"` after building `dist/`.

2. **Replace imports** — Change `@/components/fw-vision` to `@fw-vision/widgets` in:
   - `GestaltStrategyMapSlide.tsx`
   - `GestaltBusinessCanvasSlide.tsx`
   - `gestalt/data/evolving-strategy-ddes.ts`

3. **Replace styles** — In `src/pages/presentations/ddes-s26.astro`, swap:
   ```astro
   import "@/components/fw-vision/fw-vision.css";
   ```
   for:
   ```astro
   import "@fw-vision/widgets/style.css";
   ```

4. **Delete vendored tree** — Remove `src/components/fw-vision/` after imports compile.

5. **Sync data** — Either import workshop data from a shared package or re-copy `evolving-strategy-ddes.ts` and temporal canvas snapshots when demos change.

6. **Remove legacy gestalt duplicates** — If `StrategyMapSector` is unused, delete it and point any remaining references to the package widgets.

## Sync checklist (on each widget release)

- [ ] Diff `StrategyMapQuadrant.tsx` against package
- [ ] Diff `BusinessCanvasMap.tsx` against package
- [ ] Diff layout + graph utilities
- [ ] Re-copy `evolving-strategy-ddes.ts` if workshop data changed
- [ ] Run `npm run build` in findcongwang-astro
- [ ] Spot-check `/presentations/ddes-s26?slide=14` and `?slide=15`

## Presentation usage

| URL slide | Widget | Data |
|-----------|--------|------|
| `?slide=14` | `StrategyMapQuadrant` | `evolvingStrategyDdes` @ `v3-jun-2026` |
| `?slide=15` | `BusinessCanvasMap` | `bmcEraAi` (era-ai / MapleAI 2023) |
