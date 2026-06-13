import { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";
import type { TimelineEvent } from "./types";
import type {
  TemporalStrategyMapData,
  TemporalStrategyMapNode,
} from "./data/strategy-map-ddes";
import {
  layoutQuadrantSector,
  quarterArcPath,
  quarterRingPath,
  type PlacedQuadrantNode,
} from "./strategyMapQuadrantLayout";
import { buildLinkDraws, linkPathD } from "./strategyMapGraph";

interface StrategyMapSectorProps {
  data: TemporalStrategyMapData;
  currentEventId: string | null;
  timeline: TimelineEvent[];
}

type NodeTemporalState = "hidden" | "emerging" | "established" | "fading";

interface PlacedTemporalNode extends PlacedQuadrantNode {
  temporalState: NodeTemporalState;
  valence?: TemporalStrategyMapNode["valence"];
  label: string;
}

function resolveNodeState(
  node: TemporalStrategyMapNode,
  currentIdx: number,
  eventOrder: Map<string, number>
): NodeTemporalState {
  const appearedIdx = node.appearedAt
    ? (eventOrder.get(node.appearedAt) ?? Infinity)
    : Infinity;
  const fadingIdx = node.fadingAt
    ? (eventOrder.get(node.fadingAt) ?? Infinity)
    : Infinity;
  const removedIdx = node.removedAt
    ? (eventOrder.get(node.removedAt) ?? Infinity)
    : Infinity;

  if (currentIdx >= removedIdx) return "hidden";
  if (currentIdx < appearedIdx) return "hidden";
  if (currentIdx >= fadingIdx) return "fading";
  if (currentIdx === appearedIdx) return "emerging";
  return "established";
}

function valenceStroke(valence?: TemporalStrategyMapNode["valence"]): string {
  switch (valence) {
    case "positive":
      return "#10b981";
    case "negative":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
}

function nodeOpacity(state: NodeTemporalState): number {
  switch (state) {
    case "emerging":
      return 0.6;
    case "fading":
      return 0.35;
    default:
      return 1;
  }
}

function nodeStrokeDash(state: NodeTemporalState): string | null {
  return state === "emerging" || state === "fading" ? "4 3" : null;
}

function nodeStrokeWidth(state: NodeTemporalState, strong: boolean): number {
  if (state === "emerging") return 1;
  if (state === "fading") return 1;
  return strong ? 2.4 : 1.9;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function StrategyMapSector({
  data,
  currentEventId,
  timeline,
}: StrategyMapSectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const eventOrder = useMemo(() => {
    const map = new Map<string, number>();
    timeline.forEach((e, i) => map.set(e.id, i));
    return map;
  }, [timeline]);

  const currentIdx = currentEventId
    ? (eventOrder.get(currentEventId) ?? -1)
    : -1;

  const visibleNodes = useMemo(() => {
    return data.nodes.filter((n) => {
      const state = resolveNodeState(n, currentIdx, eventOrder);
      return state !== "hidden";
    });
  }, [data.nodes, currentIdx, eventOrder]);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const render = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 10 || height < 10) return;

      const size = Math.min(width, height);
      const pad = 18;

      const { placed, geometry } = layoutQuadrantSector(
        visibleNodes,
        1,
        0,
        size,
        pad
      );

      const placedWithState: PlacedTemporalNode[] = placed.map((p) => {
        const raw = data.nodes.find((n) => n.id === p.id)!;
        return {
          ...p,
          temporalState: resolveNodeState(raw, currentIdx, eventOrder),
          valence: raw.valence,
          label: raw.label,
          progress: raw.progress,
        };
      });

      const linksDraw = buildLinkDraws(data.edges, placedWithState);
      const { outerR, ringRadii, centerX, centerY } = geometry;
      const bulgeScale = outerR / 260;

      const svg = d3.select(svgEl);
      svg.attr("width", width).attr("height", height);
      svg.selectAll("*").remove();

      const root = svg.append("g").attr("class", "strategy-map-root");

      const geoG = root.append("g").attr("class", "strategy-map-geometry");
      geoG
        .append("path")
        .attr("d", quarterArcPath(centerX, centerY, ringRadii[0]!, outerR))
        .attr("fill", "rgba(99, 102, 241, 0.06)")
        .attr("stroke", "none");

      for (let i = 1; i <= 4; i++) {
        geoG
          .append("path")
          .attr("d", quarterRingPath(centerX, centerY, ringRadii[i - 1]!, ringRadii[i]!))
          .attr("fill", "none")
          .attr("stroke", i === 4 ? "#4b5563" : "#374151")
          .attr("stroke-opacity", i === 4 ? 0.5 : 0.55)
          .attr("stroke-width", i === 4 ? 1.1 : 1);
      }

      geoG
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX)
        .attr("y2", centerY - outerR)
        .attr("stroke", "#374151")
        .attr("stroke-width", 1.25);

      geoG
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX + outerR)
        .attr("y2", centerY)
        .attr("stroke", "#374151")
        .attr("stroke-width", 1.25);

      const bandG = root.append("g").attr("class", "strategy-map-bands");
      data.bandLabels.forEach((label, i) => {
        const band = (i + 1) as 1 | 2 | 3 | 4;
        const x = centerX + (ringRadii[band - 1]! + ringRadii[band]!) / 2 * 0.707;
        const y = centerY + (ringRadii[band - 1]! + ringRadii[band]!) / 2 * -0.707;
        bandG
          .append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-family", "'Geist', sans-serif")
          .attr("font-size", 10)
          .attr("font-weight", 600)
          .attr("fill", "#6b7280")
          .text(label);
      });

      const linkG = root.append("g").attr("class", "strategy-map-links");
      linkG
        .selectAll<SVGPathElement, (typeof linksDraw)[number]>("path")
        .data(linksDraw, (d) => d.id)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#4b5563")
        .attr("stroke-opacity", 0.45)
        .attr("stroke-width", 1.3)
        .attr("d", (d) => linkPathD(d, bulgeScale));

      const nodeG = root.append("g").attr("class", "strategy-map-nodes");
      const nodeSel = nodeG
        .selectAll<SVGGElement, PlacedTemporalNode>("g.node")
        .data(placedWithState, (d) => d.id)
        .join(
          (enter) =>
            enter
              .append("g")
              .attr("class", "node")
              .attr("transform", (d) => `translate(${d.x},${d.y})`)
              .style("opacity", 0),
          (update) => update,
          (exit) =>
            exit
              .transition()
              .duration(600)
              .ease(d3.easeCubicInOut)
              .style("opacity", 0)
              .remove()
        );

      nodeSel
        .transition()
        .duration((d) => (d.temporalState === "emerging" ? 400 : 600))
        .ease(d3.easeCubicOut)
        .style("opacity", (d) => nodeOpacity(d.temporalState));

      nodeSel.each(function (d) {
        const g = d3.select(this);
        g.selectAll("*").remove();

        const nodeR = 13.2;
        const progressR = nodeR + 3.4;
        const progress = clamp01(d.progress ?? 0);
        const strong = d.band <= 2;
        const stroke = valenceStroke(d.valence);
        const isFading = d.temporalState === "fading";
        const coreStroke = isFading ? "#6b7280" : stroke;

        g.append("circle")
          .attr("r", progressR)
          .attr("fill", "none")
          .attr("stroke", strong ? "rgba(16,185,129,0.22)" : "rgba(148,163,184,0.25)")
          .attr("stroke-width", 2.2);

        g.append("circle")
          .attr("r", progressR)
          .attr("fill", "none")
          .attr("stroke", isFading ? "#6b7280" : strong ? "#10b981" : "#94a3b8")
          .attr("stroke-width", 2.2)
          .attr("stroke-linecap", "round")
          .attr("pathLength", 1)
          .attr("stroke-dasharray", `${progress} 1`)
          .attr("transform", "rotate(-90)");

        g.append("circle")
          .attr("r", nodeR)
          .attr("fill", "#1a1a24")
          .attr("stroke", coreStroke)
          .attr("stroke-width", nodeStrokeWidth(d.temporalState, strong))
          .attr("stroke-dasharray", nodeStrokeDash(d.temporalState));

        g.append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-family", "'Geist', sans-serif")
          .attr("font-size", 12.4)
          .attr("font-weight", 700)
          .attr("fill", isFading ? "#6b7280" : "#e8e8ea")
          .text(d.number);
      });

      root
        .append("text")
        .attr("x", width / 2)
        .attr("y", 16)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Geist', sans-serif")
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("fill", "#9ca3af")
        .text(data.sectorLabel);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(container);
    return () => ro.disconnect();
  }, [data, visibleNodes, currentIdx, eventOrder]);

  return (
    <div
      ref={containerRef}
      className="gestalt-strategy-map"
      role="img"
      aria-label={data.title}
    >
      <svg ref={svgRef} />
    </div>
  );
}

export default StrategyMapSector;
