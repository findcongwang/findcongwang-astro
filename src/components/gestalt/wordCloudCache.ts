import type { GestaltTerm, TimelineEvent, ThreadId } from "./types";
import {
  clearMeasureCache,
  hintsFromPlaced,
  layoutWordCloud,
  type CloudWordInput,
  type LayoutHint,
  type PlacedCloudWord,
} from "./wordCloudLayout";

export interface RenderWord extends PlacedCloudWord {
  color: string;
  targetOpacity: number;
  weight: number;
  weightRank: number;
}

export interface CloudWordFrame {
  eventId: string;
  words: RenderWord[];
}

export interface CloudFrameCache {
  framesByEvent: Map<string, CloudWordFrame>;
  changeEvents: Set<string>;
  width: number;
  height: number;
  compact: boolean;
}

export interface BuildCacheOptions {
  priorityEventId?: string | null;
  onPartialCacheReady?: (cache: CloudFrameCache) => void;
  isCancelled?: () => boolean;
}

interface TermMeta {
  color: string;
  targetOpacity: number;
  weight: number;
  state: "active" | "fading";
}

/** Timeline events a faded term stays visible before removal from layout */
export const DEFAULT_FADE_GRACE_EVENTS = 2;

function buildEventOrder(timeline: TimelineEvent[]): Map<string, number> {
  const map = new Map<string, number>();
  timeline.forEach((e, i) => map.set(e.id, i));
  return map;
}

function visibilitySignature(inputs: CloudWordInput[]): string {
  return inputs
    .map((w) => `${w.id}:${w.state}`)
    .sort()
    .join("|");
}

function resolveVisibleInputs(
  terms: GestaltTerm[],
  eventOrder: Map<string, number>,
  currentIdx: number,
  threadColors: Record<ThreadId, string>
): { inputs: CloudWordInput[]; metas: Map<string, TermMeta> } {
  const inputs: CloudWordInput[] = [];
  const metas = new Map<string, TermMeta>();

  terms.forEach((t, i) => {
    const appearedIdx = eventOrder.get(t.appearedAt) ?? Infinity;
    if (currentIdx < appearedIdx) return;

    const fadedIdx = t.fadedAt ? (eventOrder.get(t.fadedAt) ?? Infinity) : Infinity;
    const grace = t.fadeGraceEvents ?? DEFAULT_FADE_GRACE_EVENTS;
    const exitIdx = fadedIdx === Infinity ? Infinity : fadedIdx + grace;

    if (currentIdx >= exitIdx) return;

    const state = currentIdx >= fadedIdx ? ("fading" as const) : ("active" as const);
    const id = `term-${i}`;

    inputs.push({
      id,
      text: t.term,
      weight: t.weight,
      state,
    });

    metas.set(id, {
      color: threadColors[t.thread],
      targetOpacity: state === "fading" ? 0.22 : 1,
      weight: t.weight,
      state,
    });
  });

  return { inputs, metas };
}

function buildWeightRanks(
  placed: PlacedCloudWord[],
  metas: Map<string, TermMeta>
): Map<string, number> {
  const sorted = [...placed].sort((a, b) => {
    const wa = metas.get(a.id)?.weight ?? 0;
    const wb = metas.get(b.id)?.weight ?? 0;
    if (wb !== wa) return wb - wa;
    return a.text.localeCompare(b.text);
  });
  return new Map(sorted.map((p, i) => [p.id, i]));
}

function toRenderWords(
  placed: PlacedCloudWord[],
  metas: Map<string, TermMeta>
): RenderWord[] {
  const rankById = buildWeightRanks(placed, metas);
  return placed.map((p) => {
    const meta = metas.get(p.id)!;
    return {
      ...p,
      color: meta.state === "fading" ? "#9ca3af" : meta.color,
      targetOpacity: meta.targetOpacity,
      weight: meta.weight,
      weightRank: rankById.get(p.id) ?? 0,
    };
  });
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

interface FrameBuildState {
  prevSignature: string | null;
  prevFrame: CloudWordFrame | null;
  layoutHints: Map<string, LayoutHint>;
}

function makeCacheShell(
  framesByEvent: Map<string, CloudWordFrame>,
  changeEvents: Set<string>,
  width: number,
  height: number,
  compact: boolean
): CloudFrameCache {
  return { framesByEvent, changeEvents, width, height, compact };
}

function buildFrameForEvent(
  event: TimelineEvent,
  terms: GestaltTerm[],
  timeline: TimelineEvent[],
  threadColors: Record<ThreadId, string>,
  width: number,
  height: number,
  compact: boolean,
  state: FrameBuildState,
  framesByEvent: Map<string, CloudWordFrame>,
  changeEvents: Set<string>
): void {
  const eventOrder = buildEventOrder(timeline);
  const currentIdx = eventOrder.get(event.id) ?? -1;
  const { inputs, metas } = resolveVisibleInputs(
    terms,
    eventOrder,
    currentIdx,
    threadColors
  );
  const signature = visibilitySignature(inputs);

  if (signature === state.prevSignature && state.prevFrame) {
    framesByEvent.set(event.id, state.prevFrame);
    state.layoutHints = hintsFromPlaced(
      state.prevFrame.words.map((w) => ({
        id: w.id,
        text: w.text,
        lines: w.lines,
        layoutMode: w.layoutMode,
        x: w.x,
        y: w.y,
        fontSize: w.fontSize,
        rotation: w.rotation,
        state: w.state,
      }))
    );
    return;
  }

  const placed = layoutWordCloud(inputs, width, height, compact, state.layoutHints);

  const frame: CloudWordFrame = {
    eventId: event.id,
    words: toRenderWords(placed, metas),
  };

  framesByEvent.set(event.id, frame);
  changeEvents.add(event.id);

  state.prevSignature = signature;
  state.prevFrame = frame;
  state.layoutHints = hintsFromPlaced(placed);
}

export function buildCloudFrameCacheSync(
  terms: GestaltTerm[],
  timeline: TimelineEvent[],
  threadColors: Record<ThreadId, string>,
  width: number,
  height: number,
  compact: boolean
): CloudFrameCache {
  clearMeasureCache();

  const framesByEvent = new Map<string, CloudWordFrame>();
  const changeEvents = new Set<string>();
  const state: FrameBuildState = {
    prevSignature: null,
    prevFrame: null,
    layoutHints: new Map(),
  };

  for (const event of timeline) {
    buildFrameForEvent(
      event,
      terms,
      timeline,
      threadColors,
      width,
      height,
      compact,
      state,
      framesByEvent,
      changeEvents
    );
  }

  return makeCacheShell(framesByEvent, changeEvents, width, height, compact);
}

/** Alias for sync builder */
export const buildCloudFrameCache = buildCloudFrameCacheSync;

export async function buildCloudFrameCacheAsync(
  terms: GestaltTerm[],
  timeline: TimelineEvent[],
  threadColors: Record<ThreadId, string>,
  width: number,
  height: number,
  compact: boolean,
  options?: BuildCacheOptions
): Promise<CloudFrameCache> {
  clearMeasureCache();

  const framesByEvent = new Map<string, CloudWordFrame>();
  const changeEvents = new Set<string>();
  const state: FrameBuildState = {
    prevSignature: null,
    prevFrame: null,
    layoutHints: new Map(),
  };

  const priorityId = options?.priorityEventId ?? null;

  if (priorityId) {
    const priorityEvent = timeline.find((e) => e.id === priorityId);
    if (priorityEvent) {
      if (options?.isCancelled?.()) {
        throw new DOMException("Cache build cancelled", "AbortError");
      }
      const partialFrames = new Map<string, CloudWordFrame>();
      const partialChanges = new Set<string>();
      const priorityState: FrameBuildState = {
        prevSignature: null,
        prevFrame: null,
        layoutHints: new Map(),
      };
      buildFrameForEvent(
        priorityEvent,
        terms,
        timeline,
        threadColors,
        width,
        height,
        compact,
        priorityState,
        partialFrames,
        partialChanges
      );
      options?.onPartialCacheReady?.(
        makeCacheShell(partialFrames, partialChanges, width, height, compact)
      );
      await yieldToMain();
    }
  }

  for (const event of timeline) {
    if (options?.isCancelled?.()) {
      throw new DOMException("Cache build cancelled", "AbortError");
    }

    buildFrameForEvent(
      event,
      terms,
      timeline,
      threadColors,
      width,
      height,
      compact,
      state,
      framesByEvent,
      changeEvents
    );
    await yieldToMain();
  }

  return makeCacheShell(framesByEvent, changeEvents, width, height, compact);
}

export function resolveEventId(
  timeline: TimelineEvent[],
  eventId: string | null
): string | null {
  if (eventId) return eventId;
  return timeline.length > 0 ? timeline[timeline.length - 1]!.id : null;
}

export function textShapeChanged(
  prev: RenderWord | undefined,
  next: RenderWord
): boolean {
  if (!prev) return true;
  return (
    prev.layoutMode !== next.layoutMode || prev.lines.join("|") !== next.lines.join("|")
  );
}

export function wordGeometryChanged(
  prev: RenderWord | undefined,
  next: RenderWord
): boolean {
  if (!prev) return true;
  return (
    prev.x !== next.x ||
    prev.y !== next.y ||
    prev.fontSize !== next.fontSize ||
    prev.rotation !== next.rotation ||
    textShapeChanged(prev, next)
  );
}

export function wordStyleChanged(
  prev: RenderWord | undefined,
  next: RenderWord
): boolean {
  if (!prev) return true;
  return (
    prev.targetOpacity !== next.targetOpacity ||
    prev.color !== next.color ||
    prev.state !== next.state
  );
}

export function countFrameChanges(
  prev: Map<string, RenderWord>,
  next: RenderWord[]
): number {
  const nextIds = new Set(next.map((w) => w.id));
  let changes = 0;

  for (const id of prev.keys()) {
    if (!nextIds.has(id)) changes += 1;
  }

  for (const word of next) {
    const prior = prev.get(word.id);
    if (!prior || wordGeometryChanged(prior, word) || wordStyleChanged(prior, word)) {
      changes += 1;
    }
  }

  return changes;
}
