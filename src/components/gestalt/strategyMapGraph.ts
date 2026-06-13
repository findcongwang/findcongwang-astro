/**
 * Strategy map graph utilities (ported from fw-vision-dataviz).
 */

import type { PlacedQuadrantNode, StrategyMapBand } from "./strategyMapQuadrantLayout";

export interface StrategyMapEdgeLike {
  id: string;
  source: string;
  target: string;
  action: string;
}

export type LinkDraw = {
  id: string;
  source: PlacedQuadrantNode;
  target: PlacedQuadrantNode;
  action: string;
};

export function isValidHierarchyEdge(
  sourceBand: StrategyMapBand,
  targetBand: StrategyMapBand
): boolean {
  if (sourceBand <= targetBand) return false;
  const d = sourceBand - targetBand;
  if (d === 1) return true;
  return sourceBand === 4 && targetBand === 2 && d === 2;
}

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

function orderedEndpoints(d: LinkDraw): {
  inner: PlacedQuadrantNode;
  outer: PlacedQuadrantNode;
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

export function buildLinkDraws(
  edges: StrategyMapEdgeLike[],
  placed: PlacedQuadrantNode[]
): LinkDraw[] {
  const byId = new Map(placed.map((p) => [p.id, p]));
  const out: LinkDraw[] = [];
  for (const e of edges) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) continue;
    let src = a;
    let tgt = b;
    if (a.band < b.band) {
      src = b;
      tgt = a;
    }
    if (!isValidHierarchyEdge(src.band, tgt.band)) continue;
    out.push({
      id: e.id,
      source: src,
      target: tgt,
      action: e.action,
    });
  }
  return out;
}

export function buildAdjacency(links: LinkDraw[]): Map<string, Set<string>> {
  const m = new Map<string, Set<string>>();
  for (const l of links) {
    const a = l.source.id;
    const b = l.target.id;
    if (!m.has(a)) m.set(a, new Set());
    if (!m.has(b)) m.set(b, new Set());
    m.get(a)!.add(b);
    m.get(b)!.add(a);
  }
  return m;
}
