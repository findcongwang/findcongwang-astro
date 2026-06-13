/**
 * Dense orthogonal word-cloud layout with shape masks.
 * Grid collision (2px step), 0/90° only, logarithmic scaling, shrink-to-fit.
 */

export type CloudShape = "verticalT" | "horizontalEllipse";

export interface CloudWordInput {
  id: string;
  text: string;
  weight: number;
  state: "active" | "fading";
}

export interface PlacedCloudWord {
  id: string;
  text: string;
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

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const CHAR_WIDTH_RATIO = 0.58;
const LINE_HEIGHT_RATIO = 1.05;
const WORD_PAD = 1;
const GRID_STEP = 2;
const SEARCH_STEP = 3;
const VERTICAL_PROB = 0.3;
const MIN_FONT = 7;
const MAX_ANCHORS = 720;

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

export function measureWordBox(
  text: string,
  fontSize: number,
  rotation: 0 | 90
): { w: number; h: number } {
  const key = `${text}|${fontSize}|${rotation}`;
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

interface RawAnchor {
  x: number;
  y: number;
}

interface ScoredAnchor extends RawAnchor {
  score: number;
}

function scanShapeAnchors(
  width: number,
  height: number,
  shape: CloudShape
): RawAnchor[] {
  const raw: RawAnchor[] = [];
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
  raw: RawAnchor[],
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

function maxFontForWord(
  word: CloudWordInput,
  rank: number,
  width: number,
  height: number,
  shape: CloudShape,
  state: "active" | "fading"
): number {
  const canvasMin = Math.min(width, height);
  const len = Math.max(word.text.length, 1);
  const scale = state === "fading" ? 0.55 : 1;

  if (rank === 0) {
    if (shape === "verticalT") {
      const colHeight = height * 0.62;
      const byHeight = colHeight / (len * CHAR_WIDTH_RATIO);
      const byWidth = (width * 0.36) / LINE_HEIGHT_RATIO;
      return Math.min(byHeight, byWidth) * scale;
    }
    const byWidth = (width * 0.52) / (len * CHAR_WIDTH_RATIO);
    const byHeight = height * 0.38;
    return Math.min(byWidth, byHeight) * scale;
  }

  if (rank === 1) {
    if (shape === "verticalT") {
      const byWidth = (width * 0.92) / (len * CHAR_WIDTH_RATIO);
      const byHeight = height * 0.14;
      return Math.min(byWidth, byHeight) * scale;
    }
    const byWidth = (width * 0.42) / (len * CHAR_WIDTH_RATIO);
    const byHeight = height * 0.28;
    return Math.min(byWidth, byHeight) * scale;
  }

  const logNorm = Math.log(1 + word.weight * 24) / Math.log(25);
  const ceiling = canvasMin * 0.16 * scale;
  return Math.max(MIN_FONT + 1, MIN_FONT + logNorm * (ceiling - MIN_FONT));
}

function rotationOrder(
  word: CloudWordInput,
  rank: number,
  shape: CloudShape
): (0 | 90)[] {
  if (shape === "verticalT" && rank === 0) return [90, 0];
  if (shape === "verticalT" && rank === 1) return [0, 90];
  if (shape === "horizontalEllipse" && rank <= 1) return [0, 90];

  const preferVertical = hash01(word.text, 11) < VERTICAL_PROB;
  return preferVertical ? [90, 0] : [0, 90];
}

function tryPlaceWord(
  grid: LayoutGrid,
  word: CloudWordInput,
  maxFont: number,
  minFont: number,
  anchors: { x: number; y: number }[],
  rank: number,
  shape: CloudShape
): PlacedCloudWord | null {
  const rotations = rotationOrder(word, rank, shape);
  const hi = Math.max(minFont, Math.floor(maxFont));

  for (let fs = hi; fs >= minFont; fs -= fs > 24 ? 2 : 1) {
    for (const rotation of rotations) {
      const box = measureWordBox(word.text, fs, rotation);

      for (const anchor of anchors) {
        if (!canPlace(grid, anchor.x, anchor.y, box.w, box.h)) continue;

        markPlaced(grid, anchor.x, anchor.y, box.w, box.h);
        return {
          id: word.id,
          text: word.text.toUpperCase(),
          x: anchor.x,
          y: anchor.y,
          fontSize: fs,
          rotation,
          state: word.state,
        };
      }
    }
  }

  return null;
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

  const sorted = [...words].sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return a.text.localeCompare(b.text);
  });

  const anchorSets = buildAnchorSets(width, height, shape);
  const placed: PlacedCloudWord[] = [];

  sorted.forEach((word, rank) => {
    const anchors = pickAnchors(anchorSets, shape, rank);
    const maxFont = maxFontForWord(word, rank, width, height, shape, word.state);
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
      shape
    );
    if (result) placed.push(result);
  });

  return placed;
}
