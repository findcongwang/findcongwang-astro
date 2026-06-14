/**
 * Dense orthogonal word-cloud layout with shape masks.
 * Grid collision (2px step), stacked multi-line or 0/90° single-line, shrink-to-fit.
 */

export type CloudShape = "verticalT" | "horizontalEllipse";
export type WordLayoutMode = "stacked" | "single";

export interface CloudWordInput {
  id: string;
  text: string;
  weight: number;
  state: "active" | "fading";
}

export interface PlacedCloudWord {
  id: string;
  text: string;
  lines: string[];
  layoutMode: WordLayoutMode;
  x: number;
  y: number;
  fontSize: number;
  rotation: 0 | 90;
  state: "active" | "fading";
}

export interface LayoutGrid {
  cols: number;
  rows: number;
  step: number;
  mask: Uint8Array;
  occupied: Uint8Array;
}

interface LayoutVariant {
  layoutMode: WordLayoutMode;
  lines: string[];
  rotation: 0 | 90;
}

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const CHAR_WIDTH_RATIO = 0.58;
const LINE_HEIGHT_RATIO = 1.05;
const STACKED_LINE_GAP = 1.1;
const WORD_PAD = 1;
const GRID_STEP = 2;
const SEARCH_STEP = 3;
const MIN_FONT = 7;
const MAX_ANCHORS = 720;
const HIGH_WEIGHT_ENTER_THRESHOLD = 0.8;
const PROMINENT_RANK_LIMIT = 1;
const STACKED_TAIL_COUNT = 5;

function isProminentRank(rank: number): boolean {
  return rank <= PROMINENT_RANK_LIMIT;
}

function isStackEligible(rank: number, totalCount: number): boolean {
  return rank >= totalCount - STACKED_TAIL_COUNT;
}

let measureCanvas: HTMLCanvasElement | null = null;
let measureCtx: CanvasRenderingContext2D | null = null;
const measureCache = new Map<string, { w: number; h: number }>();

function getMeasureCtx(): CanvasRenderingContext2D {
  if (!measureCanvas) {
    measureCanvas = document.createElement("canvas");
    measureCtx = measureCanvas.getContext("2d");
  }
  if (!measureCtx) throw new Error("Canvas 2D unavailable");
  return measureCtx;
}

export function clearMeasureCache(): void {
  measureCache.clear();
}

export function splitTermLines(text: string): string[] {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (tokens.length <= 1) return tokens;
  if (tokens.length === 2) return tokens;

  let bestSplit = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < tokens.length; i++) {
    const leftLen = tokens.slice(0, i).join(" ").length;
    const rightLen = tokens.slice(i).join(" ").length;
    const diff = Math.abs(leftLen - rightLen);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSplit = i;
    }
  }
  return [tokens.slice(0, bestSplit).join(" "), tokens.slice(bestSplit).join(" ")];
}

function isMultiWord(text: string): boolean {
  return text.trim().includes(" ");
}

function longestLineLength(lines: string[]): number {
  return Math.max(1, ...lines.map((l) => l.length));
}

export function measureWordBox(
  text: string,
  fontSize: number,
  rotation: 0 | 90
): { w: number; h: number } {
  const key = `${text}|${fontSize}|${rotation}|single`;
  const cached = measureCache.get(key);
  if (cached) return cached;

  const upper = text.toUpperCase();
  const ctx = getMeasureCtx();
  ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
  const metrics = ctx.measureText(upper);
  const w = Math.max(metrics.width, upper.length * fontSize * CHAR_WIDTH_RATIO);
  const h = fontSize * LINE_HEIGHT_RATIO;
  const result = rotation === 90 ? { w: h, h: w } : { w, h };
  measureCache.set(key, result);
  return result;
}

export function measureWordBoxForLines(
  lines: string[],
  fontSize: number,
  rotation: 0 | 90,
  layoutMode: WordLayoutMode
): { w: number; h: number } {
  if (layoutMode === "single" || lines.length <= 1) {
    return measureWordBox(lines.join(" "), fontSize, rotation);
  }

  const key = `${lines.join("|")}|${fontSize}|${rotation}|stacked`;
  const cached = measureCache.get(key);
  if (cached) return cached;

  const ctx = getMeasureCtx();
  ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
  let maxW = 0;
  for (const line of lines) {
    const upper = line.toUpperCase();
    const metrics = ctx.measureText(upper);
    maxW = Math.max(maxW, metrics.width, upper.length * fontSize * CHAR_WIDTH_RATIO);
  }
  const h = fontSize * LINE_HEIGHT_RATIO * lines.length * (STACKED_LINE_GAP / LINE_HEIGHT_RATIO);
  const result = rotation === 90 ? { w: h, h: maxW } : { w: maxW, h };
  measureCache.set(key, result);
  return result;
}

function hash01(str: string, salt: number): number {
  let hash = salt;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

export function pickCloudShape(
  width: number,
  height: number,
  compact: boolean
): CloudShape {
  if (compact && height > width * 1.05) return "verticalT";
  if (width > height * 1.25) return "horizontalEllipse";
  if (height > width * 1.25) return "verticalT";
  return compact ? "verticalT" : "horizontalEllipse";
}

function insideVerticalT(x: number, y: number, w: number, h: number): boolean {
  const cx = w * 0.5;
  const colHalf = w * 0.2;
  const inColumn =
    x >= cx - colHalf &&
    x <= cx + colHalf &&
    y >= h * 0.03 &&
    y <= h * 0.7;
  const inBase =
    x >= w * 0.03 &&
    x <= w * 0.97 &&
    y >= h * 0.64 &&
    y <= h * 0.97;
  return inColumn || inBase;
}

function insideHorizontalEllipse(x: number, y: number, w: number, h: number): boolean {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rx = w * 0.47;
  const ry = h * 0.44;
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function insideShape(
  x: number,
  y: number,
  w: number,
  h: number,
  shape: CloudShape
): boolean {
  return shape === "verticalT"
    ? insideVerticalT(x, y, w, h)
    : insideHorizontalEllipse(x, y, w, h);
}

export function buildLayoutGrid(
  width: number,
  height: number,
  shape: CloudShape
): LayoutGrid {
  const cols = Math.max(1, Math.ceil(width / GRID_STEP));
  const rows = Math.max(1, Math.ceil(height / GRID_STEP));
  const mask = new Uint8Array(cols * rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * GRID_STEP + GRID_STEP * 0.5;
      const y = r * GRID_STEP + GRID_STEP * 0.5;
      mask[r * cols + c] = insideShape(x, y, width, height, shape) ? 1 : 0;
    }
  }

  return {
    cols,
    rows,
    step: GRID_STEP,
    mask,
    occupied: new Uint8Array(cols * rows),
  };
}

function cellRange(
  cx: number,
  cy: number,
  boxW: number,
  boxH: number,
  step: number,
  cols: number,
  rows: number
): { c0: number; c1: number; r0: number; r1: number } {
  const left = cx - boxW / 2 - WORD_PAD;
  const right = cx + boxW / 2 + WORD_PAD;
  const top = cy - boxH / 2 - WORD_PAD;
  const bottom = cy + boxH / 2 + WORD_PAD;
  return {
    c0: Math.max(0, Math.floor(left / step)),
    c1: Math.min(cols - 1, Math.ceil(right / step)),
    r0: Math.max(0, Math.floor(top / step)),
    r1: Math.min(rows - 1, Math.ceil(bottom / step)),
  };
}

function canPlace(
  grid: LayoutGrid,
  cx: number,
  cy: number,
  boxW: number,
  boxH: number
): boolean {
  const { c0, c1, r0, r1 } = cellRange(cx, cy, boxW, boxH, grid.step, grid.cols, grid.rows);
  const { cols, mask, occupied } = grid;

  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const i = r * cols + c;
      if (!mask[i] || occupied[i]) return false;
    }
  }
  return true;
}

function markPlaced(
  grid: LayoutGrid,
  cx: number,
  cy: number,
  boxW: number,
  boxH: number
): void {
  const { c0, c1, r0, r1 } = cellRange(cx, cy, boxW, boxH, grid.step, grid.cols, grid.rows);
  const { cols, occupied } = grid;

  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      occupied[r * cols + c] = 1;
    }
  }
}

interface ScoredAnchor {
  x: number;
  y: number;
  score: number;
}

function scanShapeAnchors(
  width: number,
  height: number,
  shape: CloudShape
): { x: number; y: number }[] {
  const raw: { x: number; y: number }[] = [];
  for (let y = SEARCH_STEP; y < height - SEARCH_STEP; y += SEARCH_STEP) {
    for (let x = SEARCH_STEP; x < width - SEARCH_STEP; x += SEARCH_STEP) {
      if (insideShape(x, y, width, height, shape)) {
        raw.push({ x, y });
      }
    }
  }
  return raw;
}

function scoreAnchors(
  raw: { x: number; y: number }[],
  width: number,
  height: number,
  shape: CloudShape,
  rank: number
): ScoredAnchor[] {
  const cx = width * 0.5;
  const cy = shape === "verticalT" ? height * 0.55 : height * 0.5;
  const scored: ScoredAnchor[] = [];

  for (const { x, y } of raw) {
    if (shape === "verticalT" && rank === 0 && y > height * 0.68) continue;
    if (shape === "verticalT" && rank === 1 && y < height * 0.64) continue;

    let score = (x - cx) ** 2 + (y - cy) ** 2;
    if (shape === "verticalT" && rank === 0) {
      score += y * 2;
    } else if (shape === "verticalT" && rank === 1) {
      score += (height - y) * 2;
    }

    scored.push({ x, y, score });
  }

  scored.sort((a, b) => a.score - b.score);
  return scored;
}

function downsampleAnchors(candidates: ScoredAnchor[]): { x: number; y: number }[] {
  if (candidates.length <= MAX_ANCHORS) {
    return candidates.map(({ x, y }) => ({ x, y }));
  }

  const stride = candidates.length / MAX_ANCHORS;
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < MAX_ANCHORS; i++) {
    const c = candidates[Math.floor(i * stride)]!;
    out.push({ x: c.x, y: c.y });
  }
  return out;
}

interface AnchorSets {
  default: { x: number; y: number }[];
  column: { x: number; y: number }[];
  base: { x: number; y: number }[];
}

function buildAnchorSets(
  width: number,
  height: number,
  shape: CloudShape
): AnchorSets {
  const raw = scanShapeAnchors(width, height, shape);
  return {
    default: downsampleAnchors(scoreAnchors(raw, width, height, shape, -1)),
    column: downsampleAnchors(scoreAnchors(raw, width, height, shape, 0)),
    base: downsampleAnchors(scoreAnchors(raw, width, height, shape, 1)),
  };
}

function pickAnchors(
  sets: AnchorSets,
  shape: CloudShape,
  rank: number
): { x: number; y: number }[] {
  if (shape === "verticalT" && rank === 0) return sets.column;
  if (shape === "verticalT" && rank === 1) return sets.base;
  return sets.default;
}

function layoutVariants(
  word: CloudWordInput,
  rank: number,
  shape: CloudShape,
  totalCount: number
): LayoutVariant[] {
  const multi = isMultiWord(word.text);
  const variants: LayoutVariant[] = [];

  if (multi) {
    const singleLine = [word.text] as string[];

    if (isProminentRank(rank)) {
      if (shape === "verticalT" && rank === 0) {
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 90 });
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 0 });
      } else if (shape === "verticalT" && rank === 1) {
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 0 });
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 90 });
      } else {
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 0 });
        variants.push({ layoutMode: "single", lines: singleLine, rotation: 90 });
      }
      return variants;
    }

    if (isStackEligible(rank, totalCount)) {
      const lines = splitTermLines(word.text);
      if (lines.length >= 2) {
        variants.push({ layoutMode: "stacked", lines, rotation: 0 });
      }
    }

    variants.push({ layoutMode: "single", lines: singleLine, rotation: 0 });
    variants.push({ layoutMode: "single", lines: singleLine, rotation: 90 });
    return variants;
  }

  if (shape === "verticalT" && rank === 0) {
    variants.push({ layoutMode: "single", lines: [word.text], rotation: 90 });
    variants.push({ layoutMode: "single", lines: [word.text], rotation: 0 });
    return variants;
  }

  variants.push({ layoutMode: "single", lines: [word.text], rotation: 0 });
  if (shape === "horizontalEllipse" && rank <= 1) {
    variants.push({ layoutMode: "single", lines: [word.text], rotation: 90 });
  } else if (hash01(word.text, 11) < 0.15) {
    variants.push({ layoutMode: "single", lines: [word.text], rotation: 90 });
  }
  return variants;
}

function maxFontForWord(
  word: CloudWordInput,
  rank: number,
  width: number,
  height: number,
  shape: CloudShape,
  state: "active" | "fading",
  variant: LayoutVariant
): number {
  const canvasMin = Math.min(width, height);
  const len = longestLineLength(variant.lines);
  const scale = state === "fading" ? 0.55 : 1;
  const stackedScale = variant.layoutMode === "stacked" ? 1.08 : 1;

  if (rank === 0) {
    if (shape === "verticalT" && variant.rotation === 90) {
      const colHeight = height * 0.62;
      const byHeight = colHeight / (len * CHAR_WIDTH_RATIO);
      const byWidth = (width * 0.36) / LINE_HEIGHT_RATIO;
      return Math.min(byHeight, byWidth) * scale;
    }
    if (variant.layoutMode === "stacked") {
      const byWidth = (width * 0.38) / (len * CHAR_WIDTH_RATIO);
      const byHeight = (height * 0.2) / variant.lines.length;
      return Math.min(byWidth, byHeight) * scale * stackedScale;
    }
    const byWidth = (width * 0.52) / (len * CHAR_WIDTH_RATIO);
    const byHeight = height * 0.38;
    return Math.min(byWidth, byHeight) * scale;
  }

  if (rank === 1) {
    if (shape === "verticalT") {
      const byWidth = (width * 0.92) / (len * CHAR_WIDTH_RATIO);
      const lineCount = variant.layoutMode === "stacked" ? variant.lines.length : 1;
      const byHeight = (height * 0.14) / lineCount;
      return Math.min(byWidth, byHeight) * scale * stackedScale;
    }
    const byWidth = (width * 0.42) / (len * CHAR_WIDTH_RATIO);
    const byHeight = height * 0.28;
    return Math.min(byWidth, byHeight) * scale;
  }

  const logNorm = Math.log(1 + word.weight * 24) / Math.log(25);
  const ceiling = canvasMin * 0.16 * scale * stackedScale;
  return Math.max(MIN_FONT + 1, MIN_FONT + logNorm * (ceiling - MIN_FONT));
}

function makePlacedWord(
  word: CloudWordInput,
  variant: LayoutVariant,
  x: number,
  y: number,
  fontSize: number
): PlacedCloudWord {
  const displayLines =
    variant.layoutMode === "stacked"
      ? variant.lines.map((l) => l.toUpperCase())
      : [word.text.toUpperCase()];
  return {
    id: word.id,
    text: displayLines.join(variant.layoutMode === "stacked" ? " " : " "),
    lines: displayLines,
    layoutMode: variant.layoutMode,
    x,
    y,
    fontSize,
    rotation: variant.rotation,
    state: word.state,
  };
}

function tryPlaceWord(
  grid: LayoutGrid,
  word: CloudWordInput,
  maxFont: number,
  minFont: number,
  anchors: { x: number; y: number }[],
  rank: number,
  shape: CloudShape,
  width: number,
  height: number,
  totalCount: number
): PlacedCloudWord | null {
  const variants = layoutVariants(word, rank, shape, totalCount);
  const hi = Math.max(minFont, Math.floor(maxFont));

  for (const variant of variants) {
    const variantMax = maxFontForWord(word, rank, width, height, shape, word.state, variant);
    const effectiveHi = Math.max(minFont, Math.min(hi, Math.floor(variantMax)));

    for (let fs = effectiveHi; fs >= minFont; fs -= fs > 24 ? 2 : 1) {
      const box = measureWordBoxForLines(
        variant.lines,
        fs,
        variant.rotation,
        variant.layoutMode
      );

      for (const anchor of anchors) {
        if (!canPlace(grid, anchor.x, anchor.y, box.w, box.h)) continue;

        markPlaced(grid, anchor.x, anchor.y, box.w, box.h);
        return makePlacedWord(word, variant, anchor.x, anchor.y, fs);
      }
    }
  }

  return null;
}

function sortInputsByWeight(inputs: CloudWordInput[]): CloudWordInput[] {
  return [...inputs].sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return a.text.localeCompare(b.text);
  });
}

function heroIds(inputs: CloudWordInput[]): string[] {
  const active = sortInputsByWeight(inputs.filter((w) => w.state === "active"));
  return active.slice(0, 2).map((w) => w.id);
}

function markPlacedWordOnGrid(grid: LayoutGrid, word: PlacedCloudWord): void {
  const box = measureWordBoxForLines(
    word.lines,
    word.fontSize,
    word.rotation,
    word.layoutMode
  );
  markPlaced(grid, word.x, word.y, box.w, box.h);
}

function placeWordList(
  grid: LayoutGrid,
  words: CloudWordInput[],
  rankById: Map<string, number>,
  anchorSets: AnchorSets,
  shape: CloudShape,
  width: number,
  height: number,
  totalCount: number
): PlacedCloudWord[] {
  const placed: PlacedCloudWord[] = [];

  for (const word of words) {
    const rank = rankById.get(word.id) ?? placed.length;
    const anchors = pickAnchors(anchorSets, shape, rank);
    const probeVariant = layoutVariants(word, rank, shape, totalCount)[0]!;
    const maxFont = maxFontForWord(
      word,
      rank,
      width,
      height,
      shape,
      word.state,
      probeVariant
    );
    const minFont =
      word.state === "fading"
        ? MIN_FONT
        : rank <= 1
          ? Math.max(MIN_FONT, Math.floor(maxFont * 0.55))
          : MIN_FONT;

    const result = tryPlaceWord(
      grid,
      word,
      maxFont,
      minFont,
      anchors,
      rank,
      shape,
      width,
      height,
      totalCount
    );
    if (result) placed.push(result);
  }

  return placed;
}

function buildGlobalRanks(inputs: CloudWordInput[]): Map<string, number> {
  const sorted = sortInputsByWeight(inputs);
  const ranks = new Map<string, number>();
  sorted.forEach((w, i) => ranks.set(w.id, i));
  return ranks;
}

export function layoutWordCloud(
  words: CloudWordInput[],
  width: number,
  height: number,
  compact: boolean
): PlacedCloudWord[] {
  if (width < 20 || height < 20 || words.length === 0) return [];

  const shape = pickCloudShape(width, height, compact);
  const grid = buildLayoutGrid(width, height, shape);
  const anchorSets = buildAnchorSets(width, height, shape);
  const rankById = buildGlobalRanks(words);
  const heroes = heroIds(words);
  const heroWords = heroes
    .map((id) => words.find((w) => w.id === id))
    .filter((w): w is CloudWordInput => w !== undefined);
  const rest = sortInputsByWeight(words.filter((w) => !heroes.includes(w.id)));
  const totalCount = words.length;

  const placed: PlacedCloudWord[] = [];
  placed.push(
    ...placeWordList(grid, heroWords, rankById, anchorSets, shape, width, height, totalCount)
  );
  placed.push(
    ...placeWordList(grid, rest, rankById, anchorSets, shape, width, height, totalCount)
  );

  return placed;
}

export function shouldFullRelayout(
  prevInputById: Map<string, CloudWordInput> | undefined,
  inputs: CloudWordInput[]
): boolean {
  if (!prevInputById) return false;
  for (const input of inputs) {
    if (!prevInputById.has(input.id) && input.weight >= HIGH_WEIGHT_ENTER_THRESHOLD && input.state === "active") {
      return true;
    }
  }
  return false;
}

/**
 * Carry forward stable word positions; re-place heroes and changed terms.
 */
export function layoutWordCloudIncremental(
  prevPlaced: PlacedCloudWord[],
  inputs: CloudWordInput[],
  width: number,
  height: number,
  compact: boolean,
  prevInputById?: Map<string, CloudWordInput>
): PlacedCloudWord[] {
  if (width < 20 || height < 20 || inputs.length === 0) return [];

  if (shouldFullRelayout(prevInputById, inputs)) {
    return layoutWordCloud(inputs, width, height, compact);
  }

  const shape = pickCloudShape(width, height, compact);
  const grid = buildLayoutGrid(width, height, shape);
  const anchorSets = buildAnchorSets(width, height, shape);
  const rankById = buildGlobalRanks(inputs);
  const heroes = new Set(heroIds(inputs));
  const prevById = new Map(prevPlaced.map((w) => [w.id, w]));

  const carried: PlacedCloudWord[] = [];
  const toPlace: CloudWordInput[] = [];

  for (const input of inputs) {
    const prev = prevById.get(input.id);
    const prevInput = prevInputById?.get(input.id);
    const weightChanged = prevInput !== undefined && prevInput.weight !== input.weight;
    const isHero = heroes.has(input.id);

    if (prev && prev.state === input.state && !weightChanged && !isHero) {
      markPlacedWordOnGrid(grid, prev);
      carried.push({ ...prev, state: input.state });
    } else {
      toPlace.push(input);
    }
  }

  const heroesToPlace = toPlace.filter((w) => heroes.has(w.id));
  const restToPlace = sortInputsByWeight(toPlace.filter((w) => !heroes.has(w.id)));
  const totalCount = inputs.length;

  const placed = [
    ...carried,
    ...placeWordList(
      grid,
      heroesToPlace,
      rankById,
      anchorSets,
      shape,
      width,
      height,
      totalCount
    ),
    ...placeWordList(
      grid,
      restToPlace,
      rankById,
      anchorSets,
      shape,
      width,
      height,
      totalCount
    ),
  ];

  if (placed.length < inputs.length * 0.75) {
    return layoutWordCloud(inputs, width, height, compact);
  }

  return placed;
}
