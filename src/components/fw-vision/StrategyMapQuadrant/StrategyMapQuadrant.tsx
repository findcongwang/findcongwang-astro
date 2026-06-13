import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import {
  buildAdjacency,
  buildLinkDraws,
  linkPathD,
} from "../utils/strategyMapGraph";
import {
  layoutQuadrantSector,
  quarterArcPath,
  quarterRingPath,
  type PlacedQuadrantNode,
} from "../strategyMapQuadrantLayout";
import type {
  EvolvingStrategyMapData,
  EvolvingStrategyNode,
  NodeTemporalState,
} from "../types/evolvingStrategyMap";
import { resolveNodeStateByTime } from "../utils/evolvingStrategyTemporal";
import "./StrategyMapQuadrant.css";

export interface StrategyMapQuadrantProps {
  data: EvolvingStrategyMapData;
  /** Discrete version id (fallback when activeTimeMs is not set). */
  activeVersionId?: string;
  /** Continuous scrub time; takes precedence over activeVersionId. */
  activeTimeMs?: number;
  /** Precomputed stagger appear dates keyed by node id. */
  nodeAppearMs?: Record<string, number>;
  /** Radial share per band (context → artifacts). Defaults to equal-ish outer bands. */
  bandRadialWeights?: readonly [number, number, number, number];
  className?: string;
}

interface PlacedTemporalNode extends PlacedQuadrantNode {
  temporalState: NodeTemporalState;
  valence?: EvolvingStrategyNode["valence"];
  label: string;
  description: string;
  contextFacet?: EvolvingStrategyNode["contextFacet"];
  href?: string;
}

function resolveNodeState(
  node: EvolvingStrategyNode,
  currentIdx: number,
  versionOrder: Map<string, number>
): NodeTemporalState {
  const appearedIdx = versionOrder.get(node.appearedAt) ?? Infinity;
  const fadingIdx = node.fadingAt
    ? (versionOrder.get(node.fadingAt) ?? Infinity)
    : Infinity;
  const removedIdx = node.removedAt
    ? (versionOrder.get(node.removedAt) ?? Infinity)
    : Infinity;

  if (currentIdx >= removedIdx) return "hidden";
  if (currentIdx < appearedIdx) return "hidden";
  if (currentIdx >= fadingIdx) return "fading";
  if (currentIdx === appearedIdx) return "emerging";
  return "established";
}

function valenceStroke(valence?: EvolvingStrategyNode["valence"]): string {
  switch (valence) {
    case "positive":
      return "#10b981";
    case "negative":
      return "#ef4444";
    default:
      return "#64748b";
  }
}

function nodeOpacity(state: NodeTemporalState): number {
  switch (state) {
    case "emerging":
      return 0.65;
    case "fading":
      return 0.35;
    default:
      return 1;
  }
}

function nodeStrokeDash(state: NodeTemporalState): string | null {
  return state === "emerging" || state === "fading" ? "4 3" : null;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function facetColor(facet?: EvolvingStrategyNode["contextFacet"]): string {
  switch (facet) {
    case "what":
      return "#0d9488";
    case "why":
      return "#ca8a04";
    case "who":
      return "#2563eb";
    default:
      return "#64748b";
  }
}

export function StrategyMapQuadrant({
  data,
  activeVersionId,
  activeTimeMs,
  nodeAppearMs,
  bandRadialWeights,
  className,
}: StrategyMapQuadrantProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const versionOrder = useMemo(() => {
    const map = new Map<string, number>();
    data.versions.forEach((v, i) => map.set(v.id, i));
    return map;
  }, [data.versions]);

  const resolvedVersionId =
    activeVersionId ?? data.versions[data.versions.length - 1]?.id ?? data.versions[0]!.id;
  const currentIdx = versionOrder.get(resolvedVersionId) ?? 0;

  const resolveState = (node: EvolvingStrategyNode): NodeTemporalState => {
    if (activeTimeMs !== undefined) {
      return resolveNodeStateByTime(node, activeTimeMs, data.versions, nodeAppearMs);
    }
    return resolveNodeState(node, currentIdx, versionOrder);
  };

  const visibleNodes = useMemo(() => {
    return data.nodes.filter((n) => {
      if (activeTimeMs !== undefined) {
        return resolveNodeStateByTime(n, activeTimeMs, data.versions, nodeAppearMs) !== "hidden";
      }
      return resolveNodeState(n, currentIdx, versionOrder) !== "hidden";
    });
  }, [data.nodes, data.versions, currentIdx, versionOrder, activeTimeMs, nodeAppearMs]);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    let hoveredId: string | null = null;

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
        pad,
        bandRadialWeights ? { bandWeights: bandRadialWeights } : undefined
      );

      const placedWithState: PlacedTemporalNode[] = placed.map((p) => {
        const raw = data.nodes.find((n) => n.id === p.id)!;
        return {
          ...p,
          temporalState: resolveState(raw),
          valence: raw.valence,
          label: raw.label,
          description: raw.description,
          contextFacet: raw.contextFacet,
          href: raw.href,
          progress: raw.progress,
        };
      });

      const linksDraw = buildLinkDraws(data.edges, placedWithState);
      const adjacency = buildAdjacency(linksDraw);
      const { outerR, ringRadii, centerX, centerY } = geometry;
      const bulgeScale = outerR / 260;

      const svg = d3.select(svgEl);
      svg.attr("width", width).attr("height", height).attr("overflow", "visible");
      svg.selectAll("*").remove();

      const root = svg.append("g").attr("class", "fw-sm-quadrant-root");

      const geoG = root.append("g").attr("class", "fw-sm-quadrant-geometry");
      geoG
        .append("path")
        .attr("d", quarterArcPath(centerX, centerY, ringRadii[0]!, outerR))
        .attr("fill", "rgba(99, 102, 241, 0.05)")
        .attr("stroke", "none");

      for (let i = 1; i <= 4; i++) {
        geoG
          .append("path")
          .attr("d", quarterRingPath(centerX, centerY, ringRadii[i - 1]!, ringRadii[i]!))
          .attr("fill", "none")
          .attr("stroke", "#d4d4d8")
          .attr("stroke-width", i === 4 ? 1.1 : 0.9);
      }

      geoG
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX)
        .attr("y2", centerY - outerR)
        .attr("stroke", "#a1a1aa")
        .attr("stroke-width", 1);

      geoG
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX + outerR)
        .attr("y2", centerY)
        .attr("stroke", "#a1a1aa")
        .attr("stroke-width", 1);

      const bandG = root.append("g").attr("class", "fw-sm-quadrant-bands");
      data.bandLabels.forEach((label, i) => {
        const band = (i + 1) as 1 | 2 | 3 | 4;
        const midR = (ringRadii[band - 1]! + ringRadii[band]!) / 2;
        bandG
          .append("text")
          .attr("x", centerX + midR)
          .attr("y", centerY + 14)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "hanging")
          .attr("font-size", 9)
          .attr("font-weight", 600)
          .attr("fill", "#71717a")
          .text(label);
      });

      const linkG = root.append("g").attr("class", "fw-sm-quadrant-links");
      const linkSel = linkG
        .selectAll<SVGPathElement, (typeof linksDraw)[number]>("path")
        .data(linksDraw, (d) => d.id)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-opacity", 0.55)
        .attr("stroke-width", 1.3)
        .attr("d", (d) => linkPathD(d, bulgeScale));

      const nodeG = root.append("g").attr("class", "fw-sm-quadrant-nodes");
      const nodeSel = nodeG
        .selectAll<SVGGElement, PlacedTemporalNode>("g.fw-sm-quadrant-node")
        .data(placedWithState, (d) => d.id)
        .join(
          (enter) =>
            enter
              .append("g")
              .attr("class", "fw-sm-quadrant-node")
              .attr("transform", (d) => `translate(${d.x},${d.y})`)
              .style("opacity", 0),
          (update) => update,
          (exit) =>
            exit.transition().duration(400).style("opacity", 0).remove()
        );

      nodeSel
        .transition()
        .duration((d) => (d.temporalState === "emerging" ? 400 : 500))
        .ease(d3.easeCubicOut)
        .style("opacity", (d) => nodeOpacity(d.temporalState));

      function relatedIds(id: string): Set<string> {
        const rel = new Set<string>([id]);
        if (!hoveredId) return rel;
        rel.add(hoveredId);
        for (const x of adjacency.get(hoveredId) ?? []) rel.add(x);
        return rel;
      }

      function applyHighlight(): void {
        const rel = hoveredId ? relatedIds(hoveredId) : null;
        nodeSel.style("opacity", (d) => {
          if (!rel) return nodeOpacity(d.temporalState);
          return rel.has(d.id) ? nodeOpacity(d.temporalState) : nodeOpacity(d.temporalState) * 0.25;
        });
        linkSel
          .attr("stroke-opacity", (d) => {
            if (!hoveredId) return 0.55;
            return d.source.id === hoveredId || d.target.id === hoveredId ? 0.95 : 0.12;
          })
          .attr("stroke-width", (d) => {
            if (!hoveredId) return 1.3;
            return d.source.id === hoveredId || d.target.id === hoveredId ? 2 : 1;
          });
      }

      nodeSel.each(function (d) {
        const g = d3.select(this);
        g.selectAll("*").remove();

        const nodeR = 13.2;
        const progressR = nodeR + 3.4;
        const progress = clamp01(d.progress ?? 0);
        const strong = d.band <= 2;
        const stroke = d.band === 1 && d.contextFacet
          ? facetColor(d.contextFacet)
          : valenceStroke(d.valence);
        const isFading = d.temporalState === "fading";

        g.append("circle")
          .attr("r", progressR)
          .attr("fill", "none")
          .attr("stroke", strong ? "rgba(16,185,129,0.2)" : "rgba(148,163,184,0.25)")
          .attr("stroke-width", 2);

        g.append("circle")
          .attr("r", progressR)
          .attr("fill", "none")
          .attr("stroke", isFading ? "#94a3b8" : strong ? "#10b981" : "#94a3b8")
          .attr("stroke-width", 2)
          .attr("stroke-linecap", "round")
          .attr("pathLength", 1)
          .attr("stroke-dasharray", `${progress} 1`)
          .attr("transform", "rotate(-90)");

        g.append("circle")
          .attr("r", nodeR)
          .attr("fill", "#ffffff")
          .attr("stroke", isFading ? "#94a3b8" : stroke)
          .attr("stroke-width", strong ? 2 : 1.6)
          .attr("stroke-dasharray", nodeStrokeDash(d.temporalState));

        g.append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-size", 11)
          .attr("font-weight", 700)
          .attr("fill", isFading ? "#94a3b8" : "#18181b")
          .text(d.number);
      });

      nodeSel
        .style("cursor", (d) => (d.href ? "pointer" : "default"))
        .on("mouseenter", (event: MouseEvent, d: PlacedTemporalNode) => {
          hoveredId = d.id;
          applyHighlight();
          const facet = d.contextFacet ? ` · ${d.contextFacet}` : "";
          const state = d.temporalState !== "established" ? ` · ${d.temporalState}` : "";
          d3.select(container)
            .selectAll(".fw-sm-quadrant-tooltip")
            .data([null])
            .join("div")
            .attr("class", "fw-sm-quadrant-tooltip")
            .html(
              `<strong>${d.label}</strong><span class="fw-sm-quadrant-tooltip-muted">Band ${d.band}${facet}${state}</span><br/>${d.description}`
            )
            .style("opacity", "1")
            .style("left", `${event.clientX - container.getBoundingClientRect().left + 12}px`)
            .style("top", `${event.clientY - container.getBoundingClientRect().top - 48}px`);
        })
        .on("mousemove", (event: MouseEvent) => {
          d3.select(container)
            .selectAll(".fw-sm-quadrant-tooltip")
            .style("left", `${event.clientX - container.getBoundingClientRect().left + 12}px`)
            .style("top", `${event.clientY - container.getBoundingClientRect().top - 48}px`);
        })
        .on("mouseleave", () => {
          hoveredId = null;
          applyHighlight();
          d3.select(container).selectAll(".fw-sm-quadrant-tooltip").style("opacity", "0");
        })
        .on("click", (_event: MouseEvent, d: PlacedTemporalNode) => {
          if (d.href) window.open(d.href, "_blank", "noopener,noreferrer");
        });

      root
        .append("text")
        .attr("x", width / 2)
        .attr("y", 16)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("fill", "#525252")
        .text(data.sectorLabel);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(container);
    return () => ro.disconnect();
  }, [data, visibleNodes, currentIdx, versionOrder, bandRadialWeights, activeTimeMs, nodeAppearMs]);

  return (
    <div
      ref={containerRef}
      className={`fw-strategy-map-quadrant ${className ?? ""}`}
      role="img"
      aria-label={data.title}
    >
      <svg ref={svgRef} />
    </div>
  );
}

export default StrategyMapQuadrant;
