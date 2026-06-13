/**
 * Strategy map layout utilities (ported from fw-vision-dataviz).
 */

export type StrategyMapBand = 1 | 2 | 3 | 4;

export interface StrategyMapNodeLike {
  id: string;
  number: number;
  band: StrategyMapBand;
  sectorIndex: number;
  progress?: number;
}

export const DEFAULT_STRATEGY_MAP_BAND_WEIGHTS: readonly [number, number, number, number] =
  [0.16, 0.24, 0.3, 0.3];

export const DEFAULT_STRATEGY_MAP_HUB_FRACTION = 0 as const;

export interface BuildRingRadiiOptions {
  bandWeights?: readonly [number, number, number, number];
  hubFraction?: number;
}

export function effectiveSectorIndex(
  node: StrategyMapNodeLike,
  sectorCount: number
): number {
  if (sectorCount <= 1) return 0;
  const k = ((node.number - 1) % sectorCount) + sectorCount;
  return k % sectorCount;
}

export function buildRingRadii(
  outerR: number,
  opts?: BuildRingRadiiOptions
): [number, number, number, number, number] {
  const hubFraction = opts?.hubFraction ?? DEFAULT_STRATEGY_MAP_HUB_FRACTION;
  const raw = opts?.bandWeights ?? DEFAULT_STRATEGY_MAP_BAND_WEIGHTS;
  const sum = raw[0]! + raw[1]! + raw[2]! + raw[3]! || 1;
  const w: [number, number, number, number] = [
    raw[0]! / sum,
    raw[1]! / sum,
    raw[2]! / sum,
    raw[3]! / sum,
  ];
  const hub = outerR * hubFraction;
  const usable = Math.max(outerR - hub, 0.01);
  let acc = hub;
  const radii: number[] = [hub];
  for (const frac of w) {
    acc += usable * frac;
    radii.push(acc);
  }
  return radii as [number, number, number, number, number];
}

export type QuadrantGeometry = {
  outerR: number;
  ringRadii: [number, number, number, number, number];
  centerX: number;
  centerY: number;
  size: number;
  pad: number;
};

export type PlacedQuadrantNode = StrategyMapNodeLike & {
  x: number;
  y: number;
  effectiveSector: number;
};

function hash32(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function det01(id: string, salt: number): number {
  const x = Math.sin(hash32(`${id}\0${salt}`)) * 10000;
  return x - Math.floor(x);
}

export function layoutQuadrantSector(
  allNodes: StrategyMapNodeLike[],
  sectorCount: number,
  activeSector: number,
  size: number,
  pad: number,
  ringOpts?: BuildRingRadiiOptions
): { placed: PlacedQuadrantNode[]; geometry: QuadrantGeometry } {
  const sectorNodes = allNodes.filter(
    (n) => effectiveSectorIndex(n, sectorCount) === activeSector
  );
  const avail = Math.min(size - 2 * pad, size - 2 * pad);
  const outerR = avail * 0.97;
  const ringRadii = buildRingRadii(outerR, ringOpts);
  const centerX = pad;
  const centerY = size - pad;

  const byBand = new Map<StrategyMapBand, StrategyMapNodeLike[]>();
  for (const n of sectorNodes) {
    if (!byBand.has(n.band)) {
      byBand.set(n.band, []);
    }
    byBand.get(n.band)!.push(n);
  }
  for (const arr of byBand.values()) {
    arr.sort((a, b) => a.number - b.number);
  }

  const placed: PlacedQuadrantNode[] = [];
  const phiMin = -Math.PI / 2;
  const phiMax = 0;
  const phiSpan = phiMax - phiMin;

  for (const band of [1, 2, 3, 4] as const) {
    const group = byBand.get(band) ?? [];
    const r0 = ringRadii[band - 1]!;
    const r1 = ringRadii[band]!;
    const radialMid = (r0 + r1) / 2;
    const radialJ = (r1 - r0) * 0.1;

    group.forEach((n, idx) => {
      const t =
        group.length <= 1
          ? 0.5
          : (idx + 0.5 + (det01(n.id, 1) - 0.5) * 0.22) / group.length;
      const phi = phiMin + t * phiSpan * (1 - 0.08) + phiSpan * 0.04;
      const r = radialMid + (det01(n.id, 2) - 0.5) * radialJ;
      const cl = Math.max(r0 + 8, Math.min(r1 - 8, r));
      const x = centerX + cl * Math.cos(phi);
      const y = centerY + cl * Math.sin(phi);
      placed.push({
        ...n,
        x,
        y,
        effectiveSector: activeSector,
      });
    });
  }

  return {
    placed,
    geometry: {
      outerR,
      ringRadii,
      centerX,
      centerY,
      size,
      pad,
    },
  };
}

export function quarterRingPath(
  cx: number,
  cy: number,
  r0: number,
  r1: number
): string {
  const a0 = -Math.PI / 2;
  const a1 = 0;
  const x0o = cx + r1 * Math.cos(a0);
  const y0o = cy + r1 * Math.sin(a0);
  const x1o = cx + r1 * Math.cos(a1);
  const y1o = cy + r1 * Math.sin(a1);
  const x1i = cx + r0 * Math.cos(a1);
  const y1i = cy + r0 * Math.sin(a1);
  const x0i = cx + r0 * Math.cos(a0);
  const y0i = cy + r0 * Math.sin(a0);
  return [
    `M ${x0o} ${y0o}`,
    `A ${r1} ${r1} 0 0 1 ${x1o} ${y1o}`,
    `L ${x1i} ${y1i}`,
    `A ${r0} ${r0} 0 0 0 ${x0i} ${y0i}`,
  ].join(" ");
}

export function quarterArcPath(
  cx: number,
  cy: number,
  r0: number,
  r1: number
): string {
  return `${quarterRingPath(cx, cy, r0, r1)} Z`;
}
