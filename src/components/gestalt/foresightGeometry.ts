/**
 * Pure geometry for the ForesightScope widget.
 * Past: constant-width history tube. Future: expanding cone from a point at Now.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface ConeLayout {
  presentX: number;
  cy: number;
  pad: number;
  maxHalfHeight: number;
  leftX: number;
  rightX: number;
}

/** Linear half-height of cone at x, expanding away from present (legacy past cone). */
export function coneHalfHeightAt(
  x: number,
  presentX: number,
  extentX: number
): number {
  const span = Math.abs(extentX - presentX);
  if (span < 1) return 0;
  const t = Math.abs(x - presentX) / span;
  return t;
}

export function coneHalfHeightPx(
  x: number,
  presentX: number,
  extentX: number,
  maxHalfHeight: number
): number {
  return coneHalfHeightAt(x, presentX, extentX) * maxHalfHeight;
}

/** Future cone half-height: zero at Now, expanding to maxHalfHeight at right edge. */
export function futureConeHalfHeightPx(
  x: number,
  presentX: number,
  rightX: number,
  maxHalfHeight: number
): number {
  return coneHalfHeightPx(x, presentX, rightX, maxHalfHeight);
}

/** Ellipse radii for a horizon cross-section at given cone half-height. */
export function horizonRadii(coneHalfH: number): { rx: number; ry: number } {
  return {
    rx: Math.max(coneHalfH * 0.35, 4),
    ry: Math.max(coneHalfH, 8),
  };
}

/** Outer-ring half-height for a horizon (largest nested ellipse). */
export function horizonOuterHalfHeight(
  x: number,
  presentX: number,
  rightX: number,
  maxHalfHeight: number
): number {
  return futureConeHalfHeightPx(x, presentX, rightX, maxHalfHeight);
}

/** Top/bottom lines for the constant-width history tube (open at the left edge). */
export function historyTubeBoundaryPath(
  leftX: number,
  presentX: number,
  cy: number,
  tubeHalfH: number,
  side: "top" | "bottom"
): string {
  const y = side === "top" ? cy - tubeHalfH : cy + tubeHalfH;
  return `M ${leftX} ${y} L ${presentX} ${y}`;
}

/** Upper boundary on the future side only, expanding from a point at Now. */
export function futureUpperBoundaryPath(
  presentX: number,
  cy: number,
  rightX: number,
  maxHalfHeight: number,
  steps = 24
): string {
  const pts: Point2D[] = [{ x: presentX, y: cy }];
  for (let i = 1; i <= steps; i++) {
    const x = presentX + ((rightX - presentX) * i) / steps;
    const h = futureConeHalfHeightPx(x, presentX, rightX, maxHalfHeight);
    pts.push({ x, y: cy - h });
  }
  return polylinePath(pts);
}

/** Lower boundary on the future side only, expanding from a point at Now. */
export function futureLowerBoundaryPath(
  presentX: number,
  cy: number,
  rightX: number,
  maxHalfHeight: number,
  steps = 24
): string {
  const pts: Point2D[] = [{ x: presentX, y: cy }];
  for (let i = 1; i <= steps; i++) {
    const x = presentX + ((rightX - presentX) * i) / steps;
    const h = futureConeHalfHeightPx(x, presentX, rightX, maxHalfHeight);
    pts.push({ x, y: cy + h });
  }
  return polylinePath(pts);
}

/** Mid-radius for a probability band (0 = innermost). */
export function bandMidRadius(
  bandIndex: number,
  bandCount: number,
  rx: number,
  ry: number
): { rx: number; ry: number } {
  const innerT = bandIndex / bandCount;
  const outerT = (bandIndex + 1) / bandCount;
  const midT = (innerT + outerT) / 2;
  return { rx: rx * midT, ry: ry * midT };
}

export function pointOnEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  angleRad: number
): Point2D {
  return {
    x: cx + rx * Math.cos(angleRad),
    y: cy + ry * Math.sin(angleRad),
  };
}

const POSITION_ANGLES: Record<string, number> = {
  top: -Math.PI / 2,
  right: 0,
  bottom: Math.PI / 2,
  left: Math.PI,
};

export function driverAngle(position: "top" | "right" | "bottom" | "left" | number): number {
  if (typeof position === "number") return (position * Math.PI) / 180;
  return POSITION_ANGLES[position] ?? 0;
}

/** SVG path for an axis-aligned ellipse. */
export function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  if (rx < 0.5 || ry < 0.5) return "";
  return (
    `M ${cx - rx} ${cy} ` +
    `A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} ` +
    `A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`
  );
}

export function nestedRingPaths(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  bandCount: number
): string[] {
  const paths: string[] = [];
  for (let b = 1; b <= bandCount; b++) {
    const t = b / bandCount;
    paths.push(ellipsePath(cx, cy, rx * t, ry * t));
  }
  return paths;
}

/** Closed bowtie fill path: past + future cone halves. */
export function bowtieFillPath(
  presentX: number,
  cy: number,
  leftX: number,
  rightX: number,
  maxHalfHeight: number
): string {
  const pastTop = `${leftX} ${cy - maxHalfHeight}`;
  const pastBot = `${leftX} ${cy + maxHalfHeight}`;
  const futTop = `${rightX} ${cy - maxHalfHeight}`;
  const futBot = `${rightX} ${cy + maxHalfHeight}`;
  return (
    `M ${presentX} ${cy} L ${pastTop} L ${pastBot} Z ` +
    `M ${presentX} ${cy} L ${futTop} L ${futBot} Z`
  );
}

/** Upper boundary polyline: past half + future half. */
export function upperBoundaryPath(
  presentX: number,
  cy: number,
  leftX: number,
  rightX: number,
  maxHalfHeight: number,
  steps = 24
): string {
  const pts: Point2D[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = leftX + (presentX - leftX) * (i / steps);
    const h = coneHalfHeightPx(x, presentX, leftX, maxHalfHeight);
    pts.push({ x, y: cy - h });
  }
  for (let i = 1; i <= steps; i++) {
    const x = presentX + (rightX - presentX) * (i / steps);
    const h = coneHalfHeightPx(x, presentX, rightX, maxHalfHeight);
    pts.push({ x, y: cy - h });
  }
  return polylinePath(pts);
}

export function lowerBoundaryPath(
  presentX: number,
  cy: number,
  leftX: number,
  rightX: number,
  maxHalfHeight: number,
  steps = 24
): string {
  const pts: Point2D[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = leftX + (presentX - leftX) * (i / steps);
    const h = coneHalfHeightPx(x, presentX, leftX, maxHalfHeight);
    pts.push({ x, y: cy + h });
  }
  for (let i = 1; i <= steps; i++) {
    const x = presentX + (rightX - presentX) * (i / steps);
    const h = coneHalfHeightPx(x, presentX, rightX, maxHalfHeight);
    pts.push({ x, y: cy + h });
  }
  return polylinePath(pts);
}

function polylinePath(pts: Point2D[]): string {
  if (pts.length === 0) return "";
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i]!.x} ${pts[i]!.y}`;
  }
  return d;
}

/** Dashed trajectory from scenario to Now (slight curve toward axis). */
export function trajectoryToNow(from: Point2D, now: Point2D): string {
  const cpx = (from.x + now.x) / 2;
  const cpy = now.y;
  return `M ${from.x} ${from.y} Q ${cpx} ${cpy} ${now.x} ${now.y}`;
}

export function defaultBandLabels(bandCount: number): string[] {
  if (bandCount >= 5) {
    return ["Probable", "Plausible", "Preferred", "Possible", "Preposterous"];
  }
  if (bandCount === 4) {
    return ["Probable", "Plausible", "Possible", "Preposterous"];
  }
  if (bandCount === 3) {
    return ["Probable", "Possible", "Speculative"];
  }
  if (bandCount === 2) {
    return ["Probable", "Speculative"];
  }
  return ["Probable"];
}

export function confidenceToBandIndex(confidence: number, bandCount: number): number {
  if (bandCount <= 1) return 0;
  if (confidence > 0.7) return 0;
  if (confidence > 0.4) return Math.min(1, bandCount - 1);
  return Math.min(bandCount - 1, bandCount - 1);
}
