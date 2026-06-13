import { useRef, useEffect, useCallback, useState } from "react";
import * as d3 from "d3";
import type { GestaltTerm, TimelineEvent, ThreadId } from "./types";
import {
  buildCloudFrameCache,
  resolveEventId,
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
  /** Narrow panel: inverted-T vertical mask */
  compact?: boolean;
  /** Called when frame cache is rebuilt */
  onCacheReady?: (changeEvents: Set<string>) => void;
  /** Transition duration in ms (300 explorer, 600 presentation) */
  transitionDuration?: number;
}

const FONT_STACK = "Arial, Helvetica, sans-serif";
const RESIZE_DEBOUNCE_MS = 150;

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
    .attr("transform", word.rotation === 90 ? `rotate(90, ${word.x}, ${word.y})` : null)
    .text(word.text);
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

      const { width, height } = cache;
      const duration = animate ? transitionDuration : 0;
      const prevWords = prevWordsRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      svg.attr("width", width).attr("height", height);

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
      if (duration > 0) {
        exiting
          .transition()
          .duration(duration * 0.5)
          .ease(d3.easeCubicIn)
          .attr("opacity", 0)
          .attr("font-size", (d) => `${Math.max(6, d.fontSize * 0.7)}px`)
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
        const geomChanged = wordGeometryChanged(prev, d);
        const styleChanged = wordStyleChanged(prev, d);

        el.attr("font-family", FONT_STACK)
          .attr("font-weight", 700)
          .attr("fill", d.color)
          .text(d.text);

        if (!animate || (!isEnter && !geomChanged && !styleChanged)) {
          applyWordAttrs(el, d);
          return;
        }

        if (isEnter) {
          el.attr("opacity", 0)
            .attr("font-size", `${Math.max(6, d.fontSize * 0.5)}px`)
            .attr("x", centerX)
            .attr("y", centerY)
            .attr("transform", null);

          el.transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .attr("opacity", d.targetOpacity)
            .attr("font-size", `${d.fontSize}px`)
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null);
          return;
        }

        if (geomChanged && styleChanged) {
          el.transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr("opacity", d.targetOpacity)
            .attr("fill", d.color)
            .attr("font-size", `${d.fontSize}px`)
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null);
          return;
        }

        if (geomChanged) {
          el.transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr("font-size", `${d.fontSize}px`)
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("transform", d.rotation === 90 ? `rotate(90, ${d.x}, ${d.y})` : null);
          return;
        }

        el.transition()
          .duration(duration)
          .ease(d3.easeCubicInOut)
          .attr("opacity", d.targetOpacity)
          .attr("fill", d.color);
      });

      prevWordsRef.current = new Map(frame.words.map((w) => [w.id, w]));
    },
    [timeline, transitionDuration]
  );

  const buildCache = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width < 20 || height < 20) return;

    const gen = ++generationRef.current;
    setIsLoading(true);

    requestAnimationFrame(() => {
      if (gen !== generationRef.current) return;

      const cache = buildCloudFrameCache(
        terms,
        timeline,
        threadColors,
        width,
        height,
        compact
      );

      if (gen !== generationRef.current) return;

      cacheRef.current = cache;
      prevWordsRef.current = new Map();
      setIsLoading(false);
      onCacheReady?.(cache.changeEvents);
      renderFrame(currentEventIdRef.current, false);
    });
  }, [terms, timeline, threadColors, compact, onCacheReady, renderFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleRebuild = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(buildCache, RESIZE_DEBOUNCE_MS);
    };

    buildCache();

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
