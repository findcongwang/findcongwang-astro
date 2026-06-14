import { useRef, useEffect, useCallback, useState } from "react";
import * as d3 from "d3";
import type { GestaltTerm, TimelineEvent, ThreadId } from "./types";
import {
  buildCloudFrameCacheAsync,
  resolveEventId,
  textShapeChanged,
  wordGeometryChanged,
  wordStyleChanged,
  type CloudFrameCache,
  type RenderWord,
} from "./wordCloudCache";

interface WordCloudGestaltProps {
  terms: GestaltTerm[];
  timeline: TimelineEvent[];
  currentEventId: string | null;
  threadColors: Record<ThreadId, string>;
  /** Narrow panel: vertical ellipse mask */
  compact?: boolean;
  /** Called when frame cache is rebuilt */
  onCacheReady?: (changeEvents: Set<string>) => void;
  /** Hero geometry transition duration in ms */
  transitionDuration?: number;
}

type AnimTier = "hero" | "prominent" | "filler";

const FONT_STACK = "Arial, Helvetica, sans-serif";
const RESIZE_DEBOUNCE_MS = 150;
const STACKED_LINE_GAP_EM = 1.1;
const FADE_ONLY_WORD_COUNT = 20;
const FILLER_OPACITY_MS = 180;
const PROMINENT_WEIGHT_CUTOFF = 0.65;
const PROMINENT_RANK_CUTOFF = 2;

function baseAnimTier(word: RenderWord): AnimTier {
  if (word.weightRank === 0) return "hero";
  if (word.weightRank <= PROMINENT_RANK_CUTOFF || word.weight >= PROMINENT_WEIGHT_CUTOFF) {
    return "prominent";
  }
  return "filler";
}

function setWordTextContent(
  el: d3.Selection<SVGTextElement, RenderWord, SVGGElement, null>,
  word: RenderWord
): void {
  el.selectAll("tspan").remove();
  el.text(null);
  if (word.layoutMode === "stacked" && word.lines.length > 1) {
    const offsetEm = ((word.lines.length - 1) * STACKED_LINE_GAP_EM) / 2;
    word.lines.forEach((line, i) => {
      el.append("tspan")
        .attr("x", word.x)
        .attr("dy", i === 0 ? `${-offsetEm}em` : `${STACKED_LINE_GAP_EM}em`)
        .text(line);
    });
    return;
  }
  el.text(word.text);
}

function applyWordAttrs(
  sel: d3.Selection<SVGTextElement, RenderWord, SVGGElement, null>,
  word: RenderWord
): void {
  sel
    .attr("font-family", FONT_STACK)
    .attr("font-weight", 700)
    .attr("fill", word.color)
    .attr("opacity", word.targetOpacity)
    .attr("font-size", `${word.fontSize}px`)
    .attr("x", word.x)
    .attr("y", word.y)
    .attr("transform", word.rotation === 90 ? `rotate(90, ${word.x}, ${word.y})` : null);
  setWordTextContent(sel, word);
}

function applyGeometryOnly(
  sel: d3.Selection<SVGTextElement, RenderWord, SVGGElement, null>,
  word: RenderWord
): void {
  sel
    .attr("font-size", `${word.fontSize}px`)
    .attr("x", word.x)
    .attr("y", word.y)
    .attr("transform", word.rotation === 90 ? `rotate(90, ${word.x}, ${word.y})` : null);
}

export function WordCloudGestalt({
  terms,
  timeline,
  currentEventId,
  threadColors,
  compact = false,
  onCacheReady,
  transitionDuration = 300,
}: WordCloudGestaltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cacheRef = useRef<CloudFrameCache | null>(null);
  const prevWordsRef = useRef<Map<string, RenderWord>>(new Map());
  const generationRef = useRef(0);
  const currentEventIdRef = useRef(currentEventId);
  const [isLoading, setIsLoading] = useState(true);

  currentEventIdRef.current = currentEventId;

  const renderFrame = useCallback(
    (eventId: string | null, animate: boolean) => {
      const container = containerRef.current;
      const svg = d3.select(svgRef.current);
      const cache = cacheRef.current;
      if (!container || !svg.node() || !cache) return;

      const resolvedId = resolveEventId(timeline, eventId);
      if (!resolvedId) return;

      const frame = cache.framesByEvent.get(resolvedId);
      if (!frame) return;

      const { width } = cache;
      const prevWords = prevWordsRef.current;
      const fadeOnly = animate && frame.words.length >= FADE_ONLY_WORD_COUNT;
      const heroGeomMs = animate ? transitionDuration : 0;
      const prominentMs = animate ? transitionDuration : 0;
      const fillerMs = animate ? FILLER_OPACITY_MS : 0;

      svg.attr("width", width).attr("height", cache.height);

      const g = svg
        .selectAll<SVGGElement, null>("g.cloud-group")
        .data([null])
        .join("g")
        .attr("class", "cloud-group");

      g.selectAll("text.gestalt-word").interrupt();

      const textSel = g
        .selectAll<SVGTextElement, RenderWord>("text.gestalt-word")
        .data(frame.words, (d) => d.id);

      const exiting = textSel.exit();
      if (animate) {
        exiting
          .interrupt()
          .transition()
          .duration(fadeOnly ? FILLER_OPACITY_MS : fillerMs * 0.5)
          .ease(d3.easeCubicIn)
          .attr("opacity", 0)
          .remove();
      } else {
        exiting.remove();
      }

      const entering = textSel
        .enter()
        .append("text")
        .attr("class", "gestalt-word")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central");

      const merged = entering.merge(textSel);

      merged.each(function (d) {
        const el = d3.select(this);
        const prev = prevWords.get(d.id);
        const isEnter = !prev;
        const shapeChanged = textShapeChanged(prev, d);
        const geomChanged = wordGeometryChanged(prev, d);
        const styleChanged = wordStyleChanged(prev, d);
        const tier = fadeOnly ? "filler" : baseAnimTier(d);

        el.interrupt();
        el.attr("font-family", FONT_STACK).attr("font-weight", 700).attr("fill", d.color);

        if (shapeChanged) {
          applyWordAttrs(el, d);
        }

        if (!animate) {
          applyWordAttrs(el, d);
          return;
        }

        if (fadeOnly) {
          if (isEnter) {
            if (!shapeChanged) applyWordAttrs(el, d);
            el.attr("opacity", 0);
            el.transition()
              .duration(FILLER_OPACITY_MS)
              .ease(d3.easeCubicOut)
              .attr("opacity", d.targetOpacity);
            return;
          }

          if (!shapeChanged) applyWordAttrs(el, d);
          if (styleChanged) {
            el.transition()
              .duration(FILLER_OPACITY_MS)
              .ease(d3.easeCubicInOut)
              .attr("opacity", d.targetOpacity)
              .attr("fill", d.color);
          }
          return;
        }

        if (!isEnter && !geomChanged && !styleChanged) {
          applyWordAttrs(el, d);
          return;
        }

        if (isEnter) {
          if (tier === "hero") {
            el.attr("opacity", 0)
              .attr("font-size", `${Math.max(6, d.fontSize * 0.5)}px`)
              .attr("x", d.x)
              .attr("y", d.y)
              .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null);
            if (!shapeChanged) setWordTextContent(el, d);

            el.transition()
              .duration(heroGeomMs)
              .ease(d3.easeCubicOut)
              .attr("opacity", d.targetOpacity)
              .attr("font-size", `${d.fontSize}px`)
              .on("end", function () {
                applyWordAttrs(d3.select(this), d);
              });
            return;
          }

          applyWordAttrs(el, d);
          el.attr("opacity", 0);
          const enterMs = tier === "prominent" ? prominentMs : fillerMs;
          el.transition()
            .duration(enterMs)
            .ease(d3.easeCubicOut)
            .attr("opacity", d.targetOpacity);
          return;
        }

        if (tier === "hero" && geomChanged) {
          if (styleChanged) {
            el.transition()
              .duration(heroGeomMs)
              .ease(d3.easeCubicInOut)
              .attr("opacity", d.targetOpacity)
              .attr("fill", d.color)
              .attr("font-size", `${d.fontSize}px`)
              .attr("x", d.x)
              .attr("y", d.y)
              .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null)
              .on("end", function () {
                applyWordAttrs(d3.select(this), d);
              });
            return;
          }

          el.transition()
            .duration(heroGeomMs)
            .ease(d3.easeCubicInOut)
            .attr("font-size", `${d.fontSize}px`)
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null)
            .on("end", function () {
              applyWordAttrs(d3.select(this), d);
            });
          return;
        }

        if (tier === "prominent") {
          if (geomChanged && !shapeChanged) applyGeometryOnly(el, d);
          if (geomChanged || styleChanged) {
            el.transition()
              .duration(prominentMs)
              .ease(d3.easeCubicInOut)
              .attr("opacity", d.targetOpacity)
              .attr("fill", d.color)
              .attr("font-size", `${d.fontSize}px`);
          }
          return;
        }

        if (!shapeChanged) applyWordAttrs(el, d);
        if (styleChanged) {
          el.transition()
            .duration(fillerMs)
            .ease(d3.easeCubicInOut)
            .attr("opacity", d.targetOpacity)
            .attr("fill", d.color);
        }
      });

      prevWordsRef.current = new Map(frame.words.map((w) => [w.id, w]));
    },
    [timeline, transitionDuration]
  );

  const buildCache = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width < 20 || height < 20) return;

    const gen = ++generationRef.current;
    setIsLoading(true);

    const priorityEventId = resolveEventId(timeline, currentEventIdRef.current);
    let partialRendered = false;

    try {
      const cache = await buildCloudFrameCacheAsync(
        terms,
        timeline,
        threadColors,
        width,
        height,
        compact,
        {
          priorityEventId,
          isCancelled: () => gen !== generationRef.current,
          onPartialCacheReady: (partialCache) => {
            if (gen !== generationRef.current) return;
            cacheRef.current = partialCache;
            if (priorityEventId && partialCache.framesByEvent.has(priorityEventId)) {
              partialRendered = true;
              setIsLoading(false);
              prevWordsRef.current = new Map();
              renderFrame(currentEventIdRef.current, false);
            }
          },
        }
      );

      if (gen !== generationRef.current) return;

      cacheRef.current = cache;
      if (!partialRendered) {
        prevWordsRef.current = new Map();
        renderFrame(currentEventIdRef.current, false);
      }
      setIsLoading(false);
      onCacheReady?.(cache.changeEvents);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      throw err;
    }
  }, [terms, timeline, threadColors, compact, onCacheReady, renderFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleRebuild = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        void buildCache();
      }, RESIZE_DEBOUNCE_MS);
    };

    void buildCache();

    const ro = new ResizeObserver(scheduleRebuild);
    ro.observe(container);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      ro.disconnect();
      generationRef.current += 1;
    };
  }, [buildCache]);

  useEffect(() => {
    if (!cacheRef.current) return;
    renderFrame(currentEventId, true);
  }, [currentEventId, renderFrame]);

  return (
    <div
      ref={containerRef}
      className={`word-cloud-container${compact ? " word-cloud-container--compact" : ""}`}
    >
      {isLoading && <div className="word-cloud-loading" aria-hidden="true" />}
      <svg ref={svgRef} className="word-cloud-svg" />
    </div>
  );
}

export default WordCloudGestalt;
