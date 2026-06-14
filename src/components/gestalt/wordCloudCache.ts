import type { GestaltTerm, TimelineEvent, ThreadId } from "./types";
import {
  clearMeasureCache,
  layoutWordCloud,
  layoutWordCloudIncremental,
  type CloudWordInput,
  type PlacedCloudWord,
} from "./wordCloudLayout";

export interface RenderWord extends PlacedCloudWord {
  color: string;
  targetOpacity: number;
  weight: number;
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

function toRenderWords(
  placed: PlacedCloudWord[],
  metas: Map<string, TermMeta>
): RenderWord[] {
  return placed.map((p) => {
    const meta = metas.get(p.id)!;
    return {
      ...p,
      color: meta.state === "fading" ? "#9ca3af" : meta.color,
      targetOpacity: meta.targetOpacity,
      weight: meta.weight,
    };
  });
}

export function buildCloudFrameCache(
  terms: GestaltTerm[],
  timeline: TimelineEvent[],
  threadColors: Record<ThreadId, string>,
  width: number,
  height: number,
  compact: boolean
): CloudFrameCache {
  clearMeasureCache();

  const eventOrder = buildEventOrder(timeline);
  const framesByEvent = new Map<string, CloudWordFrame>();
  const changeEvents = new Set<string>();

  let prevSignature: string | null = null;
  let prevFrame: CloudWordFrame | null = null;
  let prevPlaced: PlacedCloudWord[] = [];
  let prevInputById: Map<string, CloudWordInput> = new Map();

  for (const event of timeline) {
    const currentIdx = eventOrder.get(event.id) ?? -1;
    const { inputs, metas } = resolveVisibleInputs(
      terms,
      eventOrder,
      currentIdx,
      threadColors
    );
    const signature = visibilitySignature(inputs);

    if (signature === prevSignature && prevFrame) {
      framesByEvent.set(event.id, prevFrame);
      prevInputById = new Map(inputs.map((w) => [w.id, w]));
      continue;
    }

    const placed =
      prevPlaced.length === 0
        ? layoutWordCloud(inputs, width, height, compact)
        : layoutWordCloudIncremental(
            prevPlaced,
            inputs,
            width,
            height,
            compact,
            prevInputById
          );

    const frame: CloudWordFrame = {
      eventId: event.id,
      words: toRenderWords(placed, metas),
    };

    framesByEvent.set(event.id, frame);
    changeEvents.add(event.id);

    prevSignature = signature;
    prevFrame = frame;
    prevPlaced = placed;
    prevInputById = new Map(inputs.map((w) => [w.id, w]));
  }

  return { framesByEvent, changeEvents, width, height, compact };
}

export function resolveEventId(
  timeline: TimelineEvent[],
  eventId: string | null
): string | null {
  if (eventId) return eventId;
  return timeline.length > 0 ? timeline[timeline.length - 1]!.id : null;
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
    prev.layoutMode !== next.layoutMode ||
    prev.lines.join("|") !== next.lines.join("|")
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
