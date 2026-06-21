# Annotation System Extraction Guide

> **Design reference:** [`decisions/annotation-system.md`](../decisions/annotation-system.md)  
> **Status:** Planned package split (not yet published)

Package name (proposed): `@fcwang/annotations`

## Shared across sites

| Asset | Purpose |
|-------|---------|
| `RoughAnnotation.astro` | Visual annotation wrapper |
| `AnnotationInit.astro` | Web roughNotation initialisation |
| `CriticToggle.astro` | Layer toggle UI |
| `MarginNote`, `FootNote`, `InlineNote`, `PageBreak`, `TwoColumn`, `PagedViewer` | Structural MDX components |
| `annotation-engine.ts` | Registry, init, colour resolution |
| `annotation-colours.ts` | Colour resolver utilities |
| `annotation-colours.css` | Semantic palette (author + critic) |
| `annotation-print-init.js` | Post-paged.js print init |
| `paged-post-process.js` | Margin/footnote positioning + print roughNotation |
| Base `paged-book.css` | Print layout (minus site typography) |

## Per-site customisation

| Asset | Purpose |
|-------|---------|
| `annotation-brand.css` | Brand colours (domains, publish types, accent) |
| Burgundy OKLCH value | FW.VISION vs findcongwang accent |
| `paged-book.css` typography | Font stacks, point sizes |
| CriticToggle enablement | Optional per site |
| Homepage brand keys | Domain slug mappings in brand CSS |

## Colour model

Three ways to specify colour on `RoughAnnotation`:

1. **Semantic** (default): `color="blue"` with author/critic saturation
2. **Brand**: `palette="brand" color="domain-bet"` for site-native highlights
3. **Custom**: `customColor="#660005"` explicit override

Listing page tag badges remain site Tailwind/CSS; they are not annotation marks.

## Consumer setup

```bash
npm install @fcwang/annotations
```

```astro
// BaseLayout.astro
import AnnotationInit from '@fcwang/annotations/AnnotationInit.astro';
import '@fcwang/annotations/colours.css';
import '@/styles/annotation-brand.css'; // site-specific
```

Override semantic or brand tokens in site CSS:

```css
:root {
  --annotation-author-burgundy: oklch(...); /* FW.VISION brand */
  --annotation-brand-primary: #...;
}
```

## Migration order

1. findcongwang-astro (primary)
2. fw-vision-astro
3. novaroma-astro
