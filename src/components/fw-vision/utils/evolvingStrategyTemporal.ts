import type {
  EvolvingStrategyNode,
  EvolvingStrategyVersion,
  NodeTemporalState,
} from "../types/evolvingStrategyMap";

/** Days after appear date during which a node is considered emerging. */
export const EMERGING_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function versionDateMs(versions: EvolvingStrategyVersion[], versionId: string): number {
  const v = versions.find((item) => item.id === versionId);
  return v ? Date.parse(v.date) : NaN;
}

function versionIndex(versions: EvolvingStrategyVersion[], versionId: string): number {
  return versions.findIndex((item) => item.id === versionId);
}

export function resolveNodeAppearMs(
  node: EvolvingStrategyNode,
  versions: EvolvingStrategyVersion[],
  overrides?: Record<string, number>
): number {
  if (overrides?.[node.id] !== undefined) {
    return overrides[node.id]!;
  }
  if (node.appearedAtDate) {
    return Date.parse(node.appearedAtDate);
  }
  return versionDateMs(versions, node.appearedAt);
}

export function resolveNodeFadeMs(
  node: EvolvingStrategyNode,
  versions: EvolvingStrategyVersion[]
): number | null {
  if (node.fadingAtDate) {
    return Date.parse(node.fadingAtDate);
  }
  if (node.fadingAt) {
    const ms = versionDateMs(versions, node.fadingAt);
    return Number.isNaN(ms) ? null : ms;
  }
  return null;
}

export function resolveNodeRemoveMs(
  node: EvolvingStrategyNode,
  versions: EvolvingStrategyVersion[]
): number | null {
  if (node.removedAt) {
    const ms = versionDateMs(versions, node.removedAt);
    return Number.isNaN(ms) ? null : ms;
  }
  return null;
}

export function resolveNodeStateByTime(
  node: EvolvingStrategyNode,
  timeMs: number,
  versions: EvolvingStrategyVersion[],
  nodeAppearMs?: Record<string, number>
): NodeTemporalState {
  const appearMs = resolveNodeAppearMs(node, versions, nodeAppearMs);
  const fadeMs = resolveNodeFadeMs(node, versions);
  const removeMs = resolveNodeRemoveMs(node, versions);

  if (Number.isNaN(appearMs) || timeMs < appearMs) return "hidden";
  if (removeMs !== null && timeMs >= removeMs) return "hidden";
  if (fadeMs !== null && timeMs >= fadeMs) return "fading";
  if (timeMs < appearMs + EMERGING_WINDOW_MS) return "emerging";
  return "established";
}

export function resolveVersionAtTime(
  versions: EvolvingStrategyVersion[],
  timeMs: number
): EvolvingStrategyVersion {
  let active = versions[0]!;
  for (const version of versions) {
    const versionMs = Date.parse(version.date);
    if (timeMs >= versionMs) {
      active = version;
    }
  }
  return active;
}

/**
 * Stagger appear dates for nodes sharing the same version anchor.
 * Band-4 artifacts spread across the interval to the next version (or +90d for last).
 */
export function computeStaggeredAppearDates(
  nodes: EvolvingStrategyNode[],
  versions: EvolvingStrategyVersion[]
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const node of nodes) {
    if (node.appearedAtDate) {
      result[node.id] = Date.parse(node.appearedAtDate);
    }
  }

  const byVersion = new Map<string, EvolvingStrategyNode[]>();
  for (const node of nodes) {
    if (result[node.id] !== undefined) continue;
    const group = byVersion.get(node.appearedAt) ?? [];
    group.push(node);
    byVersion.set(node.appearedAt, group);
  }

  for (const [versionId, group] of byVersion) {
    const versionIdx = versionIndex(versions, versionId);
    if (versionIdx === -1) continue;

    const startMs = versionDateMs(versions, versionId);
    const nextVersion = versions[versionIdx + 1];
    const endMs = nextVersion
      ? Date.parse(nextVersion.date)
      : startMs + 90 * MS_PER_DAY;

    const sorted = [...group].sort((a, b) => {
      if (a.band !== b.band) return a.band - b.band;
      return a.number - b.number;
    });

    const span = Math.max(endMs - startMs, MS_PER_DAY);
    const step = span / (sorted.length + 1);

    sorted.forEach((node, idx) => {
      const offset = (idx + 1) * step;
      const staggered = startMs + offset;
      result[node.id] = Math.min(staggered, endMs - MS_PER_DAY);
    });
  }

  return result;
}

export function getTimeExtent(
  versions: EvolvingStrategyVersion[],
  nodeAppearMs: Record<string, number>
): { minMs: number; maxMs: number } {
  const versionDates = versions.map((v) => Date.parse(v.date));
  const appearDates = Object.values(nodeAppearMs);
  const all = [...versionDates, ...appearDates].filter((ms) => !Number.isNaN(ms));
  const minMs = Math.min(...all);
  const maxMs = Math.max(...all);
  const pad = (maxMs - minMs) * 0.12 || 30 * MS_PER_DAY;
  return { minMs: minMs - pad, maxMs: maxMs + pad };
}
