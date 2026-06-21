# Dynamic Print Format System — Implementation Spec

> **Status:** Ready for implementation
> **Target:** `findcongwang-astro`
> **Implementer:** Cursor (with visual debugging)
> **Created:** 2026-06-20
> **Related:** `docs/decisions/annotation-system.md`, `00_Protocol/Playbooks/print-annotation-system.md`

---

## Overview

Extend the existing Paged.js print system from a single hardcoded format (8.5" x 9") to a dynamic format selection system. The format is chosen per-document via frontmatter and applied at render time through the PagedViewer pipeline.

**Two paradigms** must be supported:

| Paradigm | Behaviour | Page Size Rule |
|----------|-----------|----------------|
| **Physical Print** | Traditional bound output | All pages same format (chosen per-document) |
| **Digital PDF** | Screen-optimised, shareable | Pages can vary within a document (section-level format switching) |

---

## Architecture Changes

### Current Flow

```
frontmatter: formats: ["print"]
    → ?format=print URL
    → PagedViewer.astro captures content
    → paged-post-process.js transforms
    → Paged.js renders with paged-book.css (@page: 8.5in x 9in)
```

### Target Flow

```
frontmatter: formats: ["print"], print_format: "portrait-6x9", print_mode: "physical"
    → ?format=print URL (optional &size=portrait-6x9 override)
    → PagedViewer.astro reads format config
    → Injects format-specific CSS variables + @page override
    → paged-post-process.js transforms (format-aware margin note placement)
    → Paged.js renders with dynamic @page dimensions
```

---

## Frontmatter Schema Additions

```yaml
# Existing (unchanged)
formats: ["print"]              # Enables the print format link

# New fields
print_format: "square-8.5x9"   # Format preset key (default if omitted)
print_mode: "physical"          # "physical" | "digital" (default: "physical")
print_annotations: true         # Whether this article uses margin annotations (auto-detected if omitted)
```

### Format Preset Keys

| Key | Dimensions | Category |
|-----|-----------|----------|
| `square-7x7` | 7.0 x 7.0 in | Square |
| `square-8x8` | 8.0 x 8.0 in | Square |
| `square-8.5x9` | 8.5 x 9.0 in | Square (current default) |
| `portrait-6x9` | 6.0 x 9.0 in | Portrait |
| `portrait-a5` | 5.83 x 8.27 in | Portrait |
| `portrait-letter` | 8.5 x 11.0 in | Portrait |
| `portrait-a4` | 8.27 x 11.7 in | Portrait |
| `landscape-10x7` | 10.0 x 7.0 in | Landscape |
| `landscape-11x8.5` | 11.0 x 8.5 in | Landscape |
| `wide-12x9` | 12.0 x 9.0 in | Wide |

---

## File Changes

### 1. New File: `public/styles/print-formats.css`

Contains all format preset definitions as CSS custom properties and `@page` rule variants. This file is loaded dynamically by PagedViewer based on the selected format.

```css
/* ============================================
   FORMAT PRESETS — CSS Custom Properties
   ============================================ */

:root {
  /* Default: square-8.5x9 (current behaviour) */
  --page-width: 8.5in;
  --page-height: 9in;
  --margin-top: 0.6in;
  --margin-right: 2in;
  --margin-bottom: 0.6in;
  --margin-left: 0.8in;
  --text-area-width: 5.7in;
  --text-area-height: 7.8in;
  --has-margin-notes: 1;
}

/* Square 7x7 */
[data-print-format="square-7x7"] {
  --page-width: 7in;
  --page-height: 7in;
  --margin-top: 0.75in;
  --margin-right: 0.75in;
  --margin-bottom: 0.75in;
  --margin-left: 0.75in;
  --text-area-width: 5.5in;
  --text-area-height: 5.5in;
  --has-margin-notes: 0;
}

/* Square 8x8 */
[data-print-format="square-8x8"] {
  --page-width: 8in;
  --page-height: 8in;
  --margin-top: 0.75in;
  --margin-right: 0.75in;
  --margin-bottom: 0.75in;
  --margin-left: 0.75in;
  --text-area-width: 6.5in;
  --text-area-height: 6.5in;
  --has-margin-notes: 0;
}

/* Square 8.5x9 (with annotations) — current default */
[data-print-format="square-8.5x9"] {
  --page-width: 8.5in;
  --page-height: 9in;
  --margin-top: 0.6in;
  --margin-right: 2in;
  --margin-bottom: 0.6in;
  --margin-left: 0.8in;
  --text-area-width: 5.7in;
  --text-area-height: 7.8in;
  --has-margin-notes: 1;
}

/* Square 8.5x9 (without annotations) */
[data-print-format="square-8.5x9-clean"] {
  --page-width: 8.5in;
  --page-height: 9in;
  --margin-top: 0.75in;
  --margin-right: 0.75in;
  --margin-bottom: 0.75in;
  --margin-left: 0.75in;
  --text-area-width: 7in;
  --text-area-height: 7.5in;
  --has-margin-notes: 0;
}

/* Portrait 6x9 */
[data-print-format="portrait-6x9"] {
  --page-width: 6in;
  --page-height: 9in;
  --margin-top: 0.75in;
  --margin-right: 0.625in;
  --margin-bottom: 0.75in;
  --margin-left: 0.625in;
  --text-area-width: 4.75in;
  --text-area-height: 7.5in;
  --has-margin-notes: 0;
}

/* Portrait A5 */
[data-print-format="portrait-a5"] {
  --page-width: 5.83in;
  --page-height: 8.27in;
  --margin-top: 0.6in;
  --margin-right: 0.6in;
  --margin-bottom: 0.6in;
  --margin-left: 0.6in;
  --text-area-width: 4.63in;
  --text-area-height: 7.07in;
  --has-margin-notes: 0;
}

/* Portrait Letter */
[data-print-format="portrait-letter"] {
  --page-width: 8.5in;
  --page-height: 11in;
  --margin-top: 0.75in;
  --margin-right: 0.8in;
  --margin-bottom: 0.75in;
  --margin-left: 0.8in;
  --text-area-width: 6.9in;
  --text-area-height: 9.5in;
  --has-margin-notes: 0;
}

/* Portrait A4 */
[data-print-format="portrait-a4"] {
  --page-width: 8.27in;
  --page-height: 11.7in;
  --margin-top: 0.6in;
  --margin-right: 0.6in;
  --margin-bottom: 0.6in;
  --margin-left: 0.6in;
  --text-area-width: 7.07in;
  --text-area-height: 10.5in;
  --has-margin-notes: 0;
}

/* Landscape 10x7 */
[data-print-format="landscape-10x7"] {
  --page-width: 10in;
  --page-height: 7in;
  --margin-top: 0.6in;
  --margin-right: 0.7in;
  --margin-bottom: 0.6in;
  --margin-left: 0.7in;
  --text-area-width: 8.6in;
  --text-area-height: 5.8in;
  --has-margin-notes: 0;
}

/* Landscape 11x8.5 */
[data-print-format="landscape-11x8.5"] {
  --page-width: 11in;
  --page-height: 8.5in;
  --margin-top: 0.75in;
  --margin-right: 0.75in;
  --margin-bottom: 0.75in;
  --margin-left: 0.75in;
  --text-area-width: 9.5in;
  --text-area-height: 7in;
  --has-margin-notes: 0;
}

/* Wide 12x9 (digital only) */
[data-print-format="wide-12x9"] {
  --page-width: 12in;
  --page-height: 9in;
  --margin-top: 0.75in;
  --margin-right: 0.75in;
  --margin-bottom: 0.75in;
  --margin-left: 0.75in;
  --text-area-width: 10.5in;
  --text-area-height: 7.5in;
  --has-margin-notes: 0;
}
```

### 2. Modified File: `public/styles/paged-book.css`

Replace the hardcoded `@page` rule with a variable-driven one:

```css
/* BEFORE (current — hardcoded) */
@page {
  size: 8.5in 9in;
  margin: 0.6in 2in 0.6in 0.8in;
  /* ... */
}

/* AFTER (dynamic — reads variables) */
@page {
  size: var(--page-width, 8.5in) var(--page-height, 9in);
  margin: var(--margin-top, 0.6in) var(--margin-right, 2in) var(--margin-bottom, 0.6in) var(--margin-left, 0.8in);

  @footnote {
    float: bottom;
    border-top: 0.5pt solid #ccc;
    padding-top: 0.3em;
  }

  @bottom-center {
    content: counter(page);
    font-family: 'Geist', sans-serif;
    font-size: 7.5pt;
    color: #aaa;
  }
}

@page :first {
  margin-top: var(--margin-top-first, 2in);
  @bottom-center { content: none; }
}
```

**Important caveat:** Paged.js may not support CSS custom properties inside `@page` rules (it polyfills @page at build time). If variables do not work inside `@page`, the alternative is to generate a `<style>` block dynamically in PagedViewer with the literal values substituted.

### 3. Modified File: `src/components/paged/PagedViewer.astro`

Add format detection and dynamic CSS injection:

```typescript
// In the PagedViewer script section:

// 1. Read format from frontmatter (passed as prop or data attribute)
const printFormat = frontmatter.print_format || 'square-8.5x9';
const printMode = frontmatter.print_mode || 'physical';
const hasAnnotations = frontmatter.print_annotations ?? detectAnnotations(content);

// 2. Resolve format config
const FORMAT_PRESETS = {
  'square-7x7':       { width: '7in',    height: '7in',    mt: '0.75in', mr: '0.75in', mb: '0.75in', ml: '0.75in', annotations: false },
  'square-8x8':       { width: '8in',    height: '8in',    mt: '0.75in', mr: '0.75in', mb: '0.75in', ml: '0.75in', annotations: false },
  'square-8.5x9':     { width: '8.5in',  height: '9in',    mt: '0.6in',  mr: '2in',    mb: '0.6in',  ml: '0.8in',  annotations: true },
  'portrait-6x9':     { width: '6in',    height: '9in',    mt: '0.75in', mr: '0.625in', mb: '0.75in', ml: '0.625in', annotations: false },
  'portrait-a5':      { width: '5.83in', height: '8.27in', mt: '0.6in',  mr: '0.6in',  mb: '0.6in',  ml: '0.6in',  annotations: false },
  'portrait-letter':  { width: '8.5in',  height: '11in',   mt: '0.75in', mr: '0.8in',  mb: '0.75in', ml: '0.8in',  annotations: false },
  'portrait-a4':      { width: '8.27in', height: '11.7in', mt: '0.6in',  mr: '0.6in',  mb: '0.6in',  ml: '0.6in',  annotations: false },
  'landscape-10x7':   { width: '10in',   height: '7in',    mt: '0.6in',  mr: '0.7in',  mb: '0.6in',  ml: '0.7in',  annotations: false },
  'landscape-11x8.5': { width: '11in',   height: '8.5in',  mt: '0.75in', mr: '0.75in', mb: '0.75in', ml: '0.75in', annotations: false },
  'wide-12x9':        { width: '12in',   height: '9in',    mt: '0.75in', mr: '0.75in', mb: '0.75in', ml: '0.75in', annotations: false },
};

const format = FORMAT_PRESETS[printFormat] || FORMAT_PRESETS['square-8.5x9'];

// 3. If content has annotations but format doesn't support them, force annotation-compatible margins
// OR convert margin notes to footnotes/endnotes (future enhancement)
if (hasAnnotations && !format.annotations) {
  console.warn(`Format "${printFormat}" does not support margin annotations. Annotations will be rendered as endnotes.`);
  // TODO: Transform MarginNote references into endnotes for non-annotated formats
}

// 4. Generate dynamic @page style block
const pageCSS = `
@page {
  size: ${format.width} ${format.height};
  margin: ${format.mt} ${format.mr} ${format.mb} ${format.ml};
  @footnote { float: bottom; border-top: 0.5pt solid #ccc; padding-top: 0.3em; }
  @bottom-center { content: counter(page); font-family: 'Geist', sans-serif; font-size: 7.5pt; color: #aaa; }
}
@page :first {
  margin-top: 2in;
  @bottom-center { content: none; }
}
`;

// 5. Inject into the document.write() output (before paged-book.css loads)
```

### 4. URL Parameter Override

Allow format to be overridden via URL for testing:

```
?format=print&size=portrait-6x9
?format=print&size=landscape-10x7&mode=digital
```

PagedViewer reads these params and they take precedence over frontmatter values.

### 5. Modified File: `public/scripts/paged-post-process.js`

The `distributeMarginNotes` function needs format awareness:

```javascript
// If format does not support margin annotations (--has-margin-notes: 0),
// skip margin note distribution entirely.
// Margin notes should already be transformed to endnotes before reaching this point.

function distributeMarginNotes() {
  const format = document.documentElement.dataset.printFormat;
  const marginNoteFormats = ['square-8.5x9']; // Formats with wide right margin

  if (!marginNoteFormats.includes(format)) {
    // Hide margin note containers, notes already converted to endnotes
    document.querySelectorAll('.margin-note-item').forEach(el => el.remove());
    return;
  }

  // ... existing distribution logic for annotated formats ...
}
```

### 6. On-Screen Preview Adjustments

The spread preview CSS (`.pagedjs_pages` layout) needs to respond to format dimensions for the visual preview:

```css
/* Landscape formats get different preview layout */
[data-print-format^="landscape"] .pagedjs_pages,
[data-print-format^="wide"] .pagedjs_pages {
  /* Wider pages need single-column preview at earlier breakpoint */
}

/* Small formats (7x7, A5) can show spreads at narrower screens */
[data-print-format="square-7x7"] .pagedjs_pages {
  /* Could show side-by-side at 1400px instead of 1751px */
}
```

---

## Typography Scaling

Different page formats need different base font sizes to maintain 45-75 characters per line:

| Format | Text Area Width | Recommended Body Size | Characters/Line (approx) |
|--------|----------------|----------------------|--------------------------|
| square-8.5x9 | 5.7in (annotated) | 10pt | 60-65 |
| portrait-6x9 | 4.75in | 10pt | 52-58 |
| portrait-letter | 6.9in | 11pt | 58-64 |
| landscape-10x7 | 8.6in (full width) | 10pt (2-col: 4.15in each) | 45-50 per col |
| wide-12x9 | 10.5in (full width) | 10pt (3-col: 3.3in each) | 36-40 per col |

**Rule:** If text area width > 5in for single column, increase body font or use multi-column layout to stay within 45-75 char/line.

```css
/* Auto-column for wide formats */
[data-print-format="landscape-10x7"] .article-body:not(.two-column) {
  column-count: 2;
  column-gap: 0.3in;
}

[data-print-format="wide-12x9"] .article-body:not(.two-column) {
  column-count: 3;
  column-gap: 0.25in;
}
```

---

## Annotation Fallback Strategy

When content uses `<MarginNote>` but the selected format has no wide right margin:

### Option A: Convert to Endnotes (Recommended for v1)

1. Detect margin notes in content
2. Strip margin-note-ref spans (keep the underline as visual cue)
3. Collect all margin note bodies into an "Notes" section at end of article
4. Number them as endnotes: [1], [2], etc.

### Option B: Convert to Sidenotes in Narrower Column

For formats with moderate width (6x9, letter), reduce text area width by 1.5in and place sidenotes in the freed margin. This requires recalculating margins dynamically.

### Option C: Warn and Block

If format truly cannot accommodate annotations, warn the author and suggest an alternative format.

**Implementation priority:** Option A for v1 (simplest, always works). Options B/C as future enhancements.

---

## Migration Path

### Phase 1: Variable @page (Non-Breaking)

1. Add `print-formats.css` with preset definitions
2. Modify `PagedViewer.astro` to read `print_format` from frontmatter
3. Generate dynamic `@page` style block (string interpolation, not CSS vars in @page)
4. Default to `square-8.5x9` when no format specified (backwards-compatible)
5. Add URL parameter override for testing

**Test:** Existing articles with `formats: ["print"]` should render identically (no regression).

### Phase 2: Typography Scaling + Auto-Column

1. Add format-aware font size adjustments
2. Add auto-column rules for wide formats
3. Adjust on-screen preview breakpoints per format

### Phase 3: Annotation Fallback

1. Implement endnote conversion for non-annotated formats
2. Add `print_annotations: false` override to disable margin notes even on annotated formats
3. Warning system for format-annotation incompatibility

### Phase 4: Digital PDF Mode (Variable Pages)

1. Support `print_mode: "digital"` which allows section-level format switching
2. Use named pages (`@page opener`, `@page body`, `@page gallery`) with different sizes
3. Section-level frontmatter or MDX component to switch format mid-document
4. Preview adapts to show mixed page sizes

---

## Testing Checklist

- [ ] Existing articles render identically with no frontmatter changes (regression)
- [ ] `?format=print&size=portrait-6x9` renders at 6x9 dimensions
- [ ] `?format=print&size=landscape-10x7` renders landscape with 2-column body
- [ ] Margin notes still work correctly on `square-8.5x9`
- [ ] Margin notes are hidden/converted on non-annotated formats
- [ ] Footnotes (`float: footnote`) work across all format sizes
- [ ] On-screen preview displays pages at correct proportions
- [ ] Spread view (wide screens) works for portrait formats
- [ ] Title page spacing adapts to format (first page margin-top)
- [ ] Page numbers appear correctly at bottom-center for all formats

---

## Open Questions for Implementation

1. **Paged.js + CSS variables in @page:** Does the polyfill support `var()` inside `@page`? If not, string interpolation in a `<style>` tag is the fallback.
2. **On-screen preview scaling:** Should all formats be displayed at the same pixel scale (larger formats = larger on screen) or normalised to fit the viewport?
3. **Spread view for landscape:** Does spread view (two pages side by side) make sense for landscape formats, or should it always be single-page?
4. **Font loading:** Do all formats share the same font stack (Newsreader + Geist), or should some formats have different typeface options?
5. **Print dialog:** When the user hits Ctrl+P from the preview, does the browser's print dialog respect the dynamic page size? (Likely needs a separate media query approach for actual paper printing vs. PDF export.)
