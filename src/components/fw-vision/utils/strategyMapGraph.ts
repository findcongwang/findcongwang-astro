import type { StrategyMapBand, StrategyMapEdge, StrategyMapNode } from "../types/strategyMap";
import type { PlacedQuadrantNode } from "../strategyMapQuadrantLayout";

type PlacedStrategyNode = PlacedQuadrantNode;

export type LinkDraw = {
  id: string;
  source: PlacedStrategyNode;
  target: PlacedStrategyNode;
  action: string;
};

/** Full graph link with raw nodes (for quadrant / cross-sector routing). */
export type HierarchyLink = {
  id: string;
  source: StrategyMapNode;
  target: StrategyMapNode;
  action: string;
};

/** Child (outer / higher band) → parent (inner / lower band). */
export function isValidHierarchyEdge(
  sourceBand: StrategyMapBand,
  targetBand: StrategyMapBand
): boolean {
  if (sourceBand <= targetBand) {
    return false;
  }
  const d = sourceBand - targetBand;
  if (d === 1) {
    return true;
  }
  return sourceBand === 4 && targetBand === 2 && d === 2;
}

/** Curved edge bowed toward a focal point (e.g. quadrant hub corner). */
export function quadChordBulge(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  bulge: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const vx = cx - mx;
  const vy = cy - my;
  const len = Math.hypot(vx, vy) || 1;
  const qx = mx + (vx / len) * bulge;
  const qy = my + (vy / len) * bulge;
  return `M ${x1} ${y1} Q ${qx} ${qy} ${x2} ${y2}`;
}

function curvedChord(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bulge: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(mx, my) || 1;
  const cx = mx + (mx / len) * bulge;
  const cy = my + (my / len) * bulge;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function curvedChordReversed(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bulge: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(mx, my) || 1;
  const cx = mx + (mx / len) * bulge;
  const cy = my + (my / len) * bulge;
  const rcx = x1 + x2 - cx;
  const rcy = y1 + y2 - cy;
  return `M ${x2} ${y2} Q ${rcx} ${rcy} ${x1} ${y1}`;
}

function orderedEndpoints(d: LinkDraw): {
  inner: PlacedStrategyNode;
  outer: PlacedStrategyNode;
} {
  return d.source.band < d.target.band
    ? { inner: d.source, outer: d.target }
    : { inner: d.target, outer: d.source };
}

export function linkPathD(d: LinkDraw, bulgeScale: number): string {
  const { inner, outer } = orderedEndpoints(d);
  const base = 36 * bulgeScale;
  const bulge =
    Math.abs(d.source.band - d.target.band) === 1 ? base : base * 1.2;
  return curvedChord(inner.x, inner.y, outer.x, outer.y, bulge);
}

export function linkPathDReversed(d: LinkDraw, bulgeScale: number): string {
  const { inner, outer } = orderedEndpoints(d);
  const base = 36 * bulgeScale;
  const bulge =
    Math.abs(d.source.band - d.target.band) === 1 ? base : base * 1.2;
  return curvedChordReversed(inner.x, inner.y, outer.x, outer.y, bulge);
}

export function linkTextPathReversed(d: LinkDraw, bulgeScale: number): boolean {
  const { inner, outer } = orderedEndpoints(d);
  const vx = outer.x - inner.x;
  const vy = outer.y - inner.y;
  const deg = (Math.atan2(vy, vx) * 180) / Math.PI;
  return deg > 90 || deg < -90;
}

export function buildLinkDraws(
  edges: StrategyMapEdge[],
  placed: PlacedStrategyNode[]
): LinkDraw[] {
  const byId = new Map(placed.map((p) => [p.id, p]));
  const out: LinkDraw[] = [];
  for (const e of edges) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) {
      continue;
    }
    let src = a;
    let tgt = b;
    if (a.band < b.band) {
      src = b;
      tgt = a;
    }
    if (!isValidHierarchyEdge(src.band, tgt.band)) {
      continue;
    }
    out.push({
      id: e.id,
      source: src,
      target: tgt,
      action: e.action,
    });
  }
  return out;
}

export function buildAllHierarchyLinks(
  edges: StrategyMapEdge[],
  nodes: StrategyMapNode[]
): HierarchyLink[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out: HierarchyLink[] = [];
  for (const e of edges) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) {
      continue;
    }
    let src = a;
    let tgt = b;
    if (a.band < b.band) {
      src = b;
      tgt = a;
    }
    if (!isValidHierarchyEdge(src.band, tgt.band)) {
      continue;
    }
    out.push({
      id: e.id,
      source: src,
      target: tgt,
      action: e.action,
    });
  }
  return out;
}

export function buildAdjacencyFromHierarchy(
  links: HierarchyLink[]
): Map<string, Set<string>> {
  const m = new Map<string, Set<string>>();
  for (const l of links) {
    const a = l.source.id;
    const b = l.target.id;
    if (!m.has(a)) {
      m.set(a, new Set());
    }
    if (!m.has(b)) {
      m.set(b, new Set());
    }
    m.get(a)!.add(b);
    m.get(b)!.add(a);
  }
  return m;
}

export function buildAdjacency(links: LinkDraw[]): Map<string, Set<string>> {
  const m = new Map<string, Set<string>>();
  for (const l of links) {
    const a = l.source.id;
    const b = l.target.id;
    if (!m.has(a)) {
      m.set(a, new Set());
    }
    if (!m.has(b)) {
      m.set(b, new Set());
    }
    m.get(a)!.add(b);
    m.get(b)!.add(a);
  }
  return m;
}
