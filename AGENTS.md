# findcongwang-astro — Agent Context

> Read by AI coding agents on every session. Keep concise and current.

## What this project is

Personal website and blog for Francis Wang (findcongwang.com). Astro-based static site with React islands, content collections, and the Emergence presentation system.

## Verification

- **Build:** `npx astro build` (terminates, exit code 0 = success)
- **Type check:** `npx astro check` (terminates)
- **NEVER run:** `astro dev`, `npm start`, `npm run dev`, or any long-running server process
- A successful build is sufficient proof that code compiles. Visual verification is manual.

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | Astro 5.x |
| Interactive islands | React 18 (via `@astrojs/react`) |
| Visualization | D3.js |
| Styling | Tailwind CSS 4 |
| Typography | Geist (sans), Newsreader (serif), Geist Mono |
| Content | Astro Content Collections (MDX) |
| Deployment | Static output |

## Key directories

| Path | Purpose |
|------|---------|
| `src/components/gestalt/` | Emergence presentation system (React + D3) |
| `src/components/gestalt/data/` | Presentation data (timeline, terms, slides, storylines) |
| `src/components/paged/` | Paged.js print/slide components |
| `src/content/posts/` | Blog posts and essays (MDX) |
| `src/pages/presentations/` | Presentation pages |
| `src/pages/emergence/` | Standalone explorer pages |
| `src/styles/global.css` | Tailwind config + design tokens |
| `public/images/presentations/` | Presentation static assets |
| `docs/` | Design documents and implementation plans |
| `tempfiles/` | Visual references and raw source files (not deployed) |

## Working agreements

### Code
- React components use `.tsx` extension
- Astro components use `.astro` extension
- CSS uses BEM naming with component prefix (e.g., `.gestalt-*`)
- D3 rendering: use `useRef` for SVG + `useEffect` for D3 logic; proper enter/update/exit pattern
- Never use em-dashes in any text content (see writing style guide)

### Content collections
- Defined in `src/content/config.ts`
- Collections: posts, domains, lexicon, influences, projects, questions, challenges
- All use `baseSchema` with status/publish_type/tags/dates

### Presentation system
- Data in `src/components/gestalt/data/ddes-s26.ts`
- Types in `src/components/gestalt/types.ts` and `types-foresight.ts`
- URL updates via `?step=N` query parameter (history.replaceState)
- Keyboard: ArrowRight/Space = next, ArrowLeft = prev, Home/End, F = fullscreen
