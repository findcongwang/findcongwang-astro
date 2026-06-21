# Annotation System Extraction Guide

> **Design reference:** [`decisions/annotation-system.md`](../decisions/annotation-system.md) (v2.1)  
> **Print formats:** [`dynamic-print-format-system.md`](dynamic-print-format-system.md)  
> **Status:** Planned package split (not yet published)

Package name (proposed): `@fcwang/annotations`

## Shared across sites

| Asset | Purpose |
|-------|---------|
| `RoughAnnotation.astro` | Visual annotation wrapper |
| `AnnotationInit.astro` | Web roughNotation initialisation |
| `CriticToggle.astro` | Layer toggle UI |
| `MarginNote`, `FootNote`, `InlineNote`, `PageBreak`, `TwoColumn`, `PrintSection`, `PagedViewer` | Structural MDX components |
| `paged-viewer-boot.ts` | Print/slides capture, format resolution, `document.write` shell |
| `print-formats.ts` | Page preset registry, `@page` builder, spread + annotation config |
| `annotation-engine.ts` | Registry, init, colour resolution |
| `annotation-colours.ts` | Colour resolver utilities |
| `annotation-colours.css` | Semantic palette (author + critic) |
| `annotation-print-init.js` | Post-paged.js print init |
| `paged-post-process.js` | Margin/footnote transforms, endnote fallback, format-aware margin placement |
| `paged-book.css` | Print layout, spread preview (no static `@page`) |
| `print-formats.css` | Per-preset tokens, typography, columns |

## Per-site customisation

| Asset | Purpose |
|-------|---------|
| `annotation-brand.css` | Brand colours (domains, publish types, accent) |
| Burgundy OKLCH value | FW.VISION vs findcongwang accent |
| `paged-book.css` typography overrides | Font stacks, point sizes |
| `data-print-stylesheets` pages | Site-specific print CSS (e.g. `curriculum-vitae-print.css`) |
| `#print-config` defaults | Default `print_format`, body class per layout |
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

Print format presets can be extended in a fork of `print-formats.ts` or by adding site-specific CSS via `data-print-stylesheets`.

## Migration order

1. findcongwang-astro (primary, v2.1 complete)
2. fw-vision-astro
3. novaroma-astro
