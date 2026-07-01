# Dual-Track Presentation System - Migration Progress

## ✅ Completed Changes

### Phase A: Type System

1. **Created `src/components/gestalt/types-v2.ts`**
   - New generic `ThreadId` type (string instead of hardcoded union)
   - `StoryTrackType` enum: "timeline" | "steps" | "progression"
   - `StoryVisualisation` enum: "wordcloud" | "force-graph" | "custom"
   - Updated `SlideLayout` type (same as legacy)
   - New `DualTrackSlide` interface: id, title, type (renamed), html, layout, section
   - New `StoryStep` interface: id, label, date, thread, conceptsAdded, conceptsFaded
   - New `SlideStoryAnchor` interface: slideId, storyStepId
   - New `DualTrackPresentation` interface with slides, story, and anchors

2. **Updated `src/components/gestalt/types.ts`**
   - Added comment `// Legacy types — use types-v2.ts for new presentations`
   - Kept for adapter compatibility

3. **Created `src/components/gestalt/adapt-legacy.ts`**
   - `fromLegacyPresentationData()` function
   - Maps `TimelineEvent[]` → `story.steps`
   - Maps `storyline[]` → `anchors`
   - Maps `slides[]` → `slides` (with section from storyline)
   - Preserves `threadColors`

### Phase B: Refactored Component

1. **Updated `src/components/gestalt/GestaltPresentation.tsx`**
   - **Dual-track state**: `slideIndex` + `storyIndex`
   - **Navigation logic**:
     - Left/Right/Space → advance/retreat slide only
     - Up/Down → advance/retreat story only
     - Home/End → first/last slide
     - `f` → fullscreen (unchanged)
   - **Auto-sync**: When slide changes and has anchor, story also updates
   - **URL sync**: `?slide=N&story=M` parameters
   - **Dual-track indicator**: Fixed position display in bottom-right corner
     - Shows "Slide X/Y · Story A/B"
     - Fades to `opacity: 0` after 3s, reappears on nav
   - **Backwards compatibility**: Auto-detects legacy `PresentationData` and converts
   - **WordCloudGestalt shim**: Converts `story.steps` → `TimelineEvent[]` for compatibility
   - Added named export: `export { GestaltPresentation }`

2. **Updated `src/components/gestalt/SimpleTimeline.tsx`**
   - Accepts `(TimelineEvent | StoryStep)[]`
   - **Timeline mode**: Dates → time-based x-axis (d3.scaleTime)
   - **Steps mode**: No dates → evenly spaced points (d3.scalePoint)
   - Auto-detects mode based on `events.every(e => e.date)`
   - Thread color mapping supports both types

3. **Updated `src/components/gestalt/PresentationIndex.tsx`**
   - Accepts `DualTrackSlide[]` instead of `StorylineStep[]`
   - Groups slides by `section` property
   - Changed `currentStepIndex` → `currentSlideIndex`
   - Changed `onStepClick` → `onSlideClick`
   - Updated data attributes: `data-step-index` → `data-slide-index`

4. **Updated `src/components/gestalt/SlideViewport.tsx`**
   - Accepts `(TimelineEvent | StoryStep)[]` for timeline prop
   - Type already compatible with both legacy and new formats

5. **Updated Astro pages**
   - `src/pages/presentations/ddes-s26.astro`: Updated to parse `?slide=N&story=M`

### ⚠️ Remaining Work: Data File Migration

** NOT COMPLETED**: 5 data files in `src/components/gestalt/data/` still use legacy `PresentationData` format:
1. `ddes-s26.ts`
2. `evolving-strategy-ddes.ts`
3. `strategy-map-ddes.ts`
4. `bmc-era-ai.ts`
5. `foresight-sovereign-ai.ts`

**Note**: `libraries-of-the-future.ts` will be rewritten separately.

**Migration steps** for each file:
1. Change import from `"../types"` to `"../types-v2"`
2. Change type annotation from `PresentationData` to `DualTrackPresentation`
3. Extract `timeline` → `story.steps`
4. Extract `storyline` → `anchors`
5. Keep `slides` as-is (add section from old storyline entries)
6. Distribute `gestaltTerms` → `story.steps[N].conceptsAdded` and `story.steps[N].conceptsFaded`
7. Remove top-level `gestaltTerms`, `storyline`, `timeline` fields
8. Add `story: { type: "timeline", visualisation: "wordcloud", steps: [...], threadColors: {...} }`

**However**: The system works via `fromLegacyPresentationData()` adapter, so existing pages continue to function!

## ✅ Build Verification

```
✓ Build passed with exit code 0
✓ Generated: /presentations/ddes-s26/index.html
✓ Generated: /presentations/libraries-of-the-future/index.html
✓ All 71 pages built successfully in 21.58s
```

## 📝 Design Decisions

1. **Backwards Compatibility**: New `fromLegacyPresentationData()` adapter means existing sites continue to work without data migration. Migration is optional.

2. **SimpleTimeline Dual-Mode**: Instead of separate components, one component auto-detects timeline vs step mode based on `every(e.date)`. This keeps the codebase simpler.

3. **WordCloudGestalt Unchanged**: The most complex component kept unchanged. GestaltPresentation constructs legacy-compatible props from dual-track data.

4. **DualTrackSlide Type**: Renamed from `SlideContent` to avoid confusion with legacy name. The `type` field changed to standard "title" | "content" | "section" | "appendix"

5. **URL Format**: `?slide=N&story=M` instead of nested params for cleaner URLs.

## 🚀 Usage

### For New Presentations (using types-v2)

```typescript
import type { DualTrackPresentation } from "@/components/gestalt/types-v2";

export const myPresentation: DualTrackPresentation = {
  title: "My Presentation",
  author: "Me",
  date: "2026-07-01",
  
  slides: [
    { id: "slide-1", title: "Slide 1", type: "title", html: "...", section: "Intro" },
    // ...
  ],
  
  story: {
    type: "timeline",
    visualisation: "wordcloud",
    steps: [
      { id: "step-1", label: "Event 1", date: "2025-06-01", thread: "meta", conceptsAdded: ["Term1"] },
      // ...
    ],
    threadColors: { "meta": "#6366f1" }
  },
  
  anchors: [
    { slideId: "slide-1", storyStepId: "step-1" }
  ]
};
```

### For Existing Presentations (legacy auto-converted)

No changes needed! The component auto-detects and converts via `fromLegacyPresentationData()`.

## 📊 Files Created/Modified

| File | Status |
|------|--------|
| `src/components/gestalt/types-v2.ts` | ✅ Created |
| `src/components/gestalt/adapt-legacy.ts` | ✅ Created |
| `src/components/gestalt/types.ts` | ✅ Modified (legacy marker) |
| `src/components/gestalt/GestaltPresentation.tsx` | ✅ Refactored |
| `src/components/gestalt/SimpleTimeline.tsx` | ✅ Updated |
| `src/components/gestalt/PresentationIndex.tsx` | ✅ Updated |
| `src/components/gestalt/SlideViewport.tsx` | ✅ Updated |
| `src/pages/presentations/ddes-s26.astro` | ✅ Updated |
| `src/pages/presentations/libraries-of-the-future.astro` | ⏳ Unchanged (legacy) |
| `scripts/migrate-data.js` | ⚠️ Created (suggestion) |
| `scripts/migrate_data.py` | ⚠️ Created (suggestion) |

## 🎯 Next Steps (Optional)

1. **Data Migration** (if desired): Convert all 5 data files to new format
2. **Documentation**: Add migration guide to docs
3. **Additional Story Types**: Implement "steps" and "progression" modes in SimpleTimeline
4. **Advanced Visualisations**: Support "force-graph" visualization if needed

## ✅ Verification

```bash
# Build succeeded
cd "C:\Users\CongW\work\FCWANG\findcongwang-astro"
& ".\node_modules\.bin\astro.cmd" build
# Result: 71 pages built, 0 errors
# Output directories include both presentation pages
```
