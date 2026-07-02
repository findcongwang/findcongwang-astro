import { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  bandMidRadius,
  coneHalfHeightPx,
  defaultBandLabels,
  driverAngle,
  ellipsePath,
  futureConeHalfHeightPx,
  futureLowerBoundaryPath,
  futureUpperBoundaryPath,
  historyTubeBoundaryPath,
  horizonRadii,
  nestedRingPaths,
  pointOnEllipse,
  trajectoryEdge,
  trajectoryEdgeMidpoint,
  trajectoryToNow,
} from "./foresightGeometry";
import type { Point2D } from "./foresightGeometry";
import type {
  ForesightDriver,
  ForesightHorizon,
  ForesightScenario,
  ForesightScopeData,
  ForesightTrajectory,
} from "./types-foresight";
import {
  DRIVER_COLORS,
  SCENARIO_DEFAULT_COLOR,
  TECHNOLOGY_COLORS,
} from "./types-foresight";

interface ForesightScopeProps {
  data: ForesightScopeData;
  className?: string;
}

const STROKE = "#18181b";
const LEGEND_HEIGHT = 102;

const TRAJECTORY_LABELS: Record<ForesightTrajectory, string> = {
  transform: "Transform",
  order: "Order",
  collapse: "Collapse",
};

const TRAJECTORY_COLORS: Record<ForesightTrajectory, string> = {
  transform: "#b8860b",
  order: "#334155",
  collapse: "#9b2c2c",
};

const LEGEND_LAYOUT = {
  originX: 14,
  originY: 10,
  titleHeight: 22,
  rowHeight: 14,
  dotRadius: 3.5,
  dotCx: 3.5,
  labelX: 12,
  colWidth: 138,
} as const;

const FS = {
  legendTitle: 11,
  legendItem: 10,
  boundary: 10,
  eraLabel: 9,
  eraDateLabel: 8,
  horizonLabel: 10,
  horizonDateLabel: 8,
  bandLabel: 8,
  now: 11,
  axis: 9,
  scenarioDot: 4,
  driverDot: 4,
  signalDot: 3,
  eraRingScale: 0.78,
} as const;

interface SplitLabel {
  title: string;
  subtitle: string | null;
}

interface ScenarioPlacement {
  scenario: ForesightScenario;
  x: number;
  y: number;
  horizonIndex: number;
}

interface PathSegment {
  id: string;
  fromId: string;
  toId: string;
  trajectory: ForesightTrajectory;
  from: Point2D;
  to: Point2D;
}

function buildFeaturedPathSegments(
  placements: ScenarioPlacement[],
  featuredTrajectory: ForesightTrajectory | undefined,
  now: Point2D
): PathSegment[] {
  if (!featuredTrajectory) return [];

  const chain = placements
    .filter((p) => p.scenario.trajectory === featuredTrajectory)
    .sort((a, b) => a.horizonIndex - b.horizonIndex);

  return chain.map((node, i) => {
    const prev = i > 0 ? chain[i - 1]! : null;
    const from = prev ? { x: prev.x, y: prev.y } : now;
    const fromId = prev ? prev.scenario.id : "now";
    return {
      id: `${fromId}->${node.scenario.id}`,
      fromId,
      toId: node.scenario.id,
      trajectory: featuredTrajectory,
      from,
      to: { x: node.x, y: node.y },
    };
  });
}

const FEATURED_EDGE_WIDTH = 2.2;
const FEATURED_EDGE_WIDTH_ACTIVE = 3.2;
const PITFALL_EDGE_WIDTH = 0.7;
const PITFALL_EDGE_WIDTH_ACTIVE = 1.4;

function featuredScenarioIds(segments: PathSegment[]): Set<string> {
  return new Set(segments.map((s) => s.toId));
}

function setPathHighlight(
  trajG: d3.Selection<SVGGElement, unknown, null, undefined>,
  scenarioG: d3.Selection<SVGGElement, unknown, null, undefined>,
  scenarioId: string | null
): void {
  trajG
    .selectAll<SVGPathElement, ScenarioPlacement>(".foresight-to-now")
    .attr("stroke-width", (d) =>
      scenarioId === d.scenario.id ? PITFALL_EDGE_WIDTH_ACTIVE : PITFALL_EDGE_WIDTH
    )
    .attr("stroke-opacity", (d) => {
      if (!scenarioId) return 0.45;
      return scenarioId === d.scenario.id ? 0.9 : 0.12;
    });

  trajG
    .selectAll<SVGPathElement, PathSegment>(".foresight-path-segment")
    .attr("stroke-width", (d) => {
      if (!scenarioId) return FEATURED_EDGE_WIDTH;
      return d.toId === scenarioId || d.fromId === scenarioId
        ? FEATURED_EDGE_WIDTH_ACTIVE
        : FEATURED_EDGE_WIDTH;
    })
    .attr("stroke-opacity", (d) => {
      if (!scenarioId) return 0.92;
      return d.toId === scenarioId || d.fromId === scenarioId ? 1 : 0.55;
    });

  trajG.selectAll<SVGTextElement, PathSegment>(".foresight-path-label").style("opacity", 1);

  scenarioG
    .selectAll<SVGCircleElement, ScenarioPlacement>(".foresight-scenario-dot")
    .attr("r", (d) => (scenarioId === d.scenario.id ? FS.scenarioDot + 2.5 : FS.scenarioDot))
    .attr("stroke-width", (d) => (scenarioId === d.scenario.id ? 1.5 : 0.5));
}

function parseParenLabel(label: string): SplitLabel {
  const match = label.match(/^(.+?)\s*\((.+)\)\s*$/);
  if (!match) return { title: label, subtitle: null };
  return { title: match[1]!.trim(), subtitle: match[2]!.trim() };
}

function appendSplitLabel(
  parent: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: number,
  y: number,
  split: SplitLabel,
  options: {
    titleSize?: number;
    subtitleSize?: number;
    titleWeight?: number;
    titleFill?: string;
    subtitleFill?: string;
  } = {}
): void {
  const {
    titleSize = FS.eraLabel,
    subtitleSize = FS.eraDateLabel,
    titleWeight = 500,
    titleFill = "#52525b",
    subtitleFill = "#71717a",
  } = options;

  const text = parent
    .append("text")
    .attr("class", "foresight-split-label")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging");

  text
    .append("tspan")
    .attr("x", x)
    .attr("dy", 0)
    .attr("font-size", titleSize)
    .attr("font-weight", titleWeight)
    .attr("fill", titleFill)
    .text(split.title);

  if (split.subtitle) {
    text
      .append("tspan")
      .attr("x", x)
      .attr("dy", "1.2em")
      .attr("font-size", subtitleSize)
      .attr("font-weight", 400)
      .attr("fill", subtitleFill)
      .text(split.subtitle);
  }
}

function scenarioAngle(scenario: ForesightScenario, index: number): number {
  if (scenario.angle !== undefined) return (scenario.angle * Math.PI) / 180;
  const hash = scenario.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return (((hash + index * 37) % 120) - 60) * (Math.PI / 180);
}

function formatScenarioTooltip(scenario: ForesightScenario): string {
  const color = scenario.color ?? SCENARIO_DEFAULT_COLOR;
  const trajectory = scenario.trajectory
    ? `<span class="foresight-tooltip-trajectory" style="color:${TRAJECTORY_COLORS[scenario.trajectory]}">${TRAJECTORY_LABELS[scenario.trajectory]}</span>`
    : "";
  return `<strong style="color:${color}">${scenario.label}</strong>${trajectory}<span class="foresight-tooltip-muted">${scenario.description}</span>`;
}

function showTooltip(
  container: HTMLElement,
  html: string,
  event: MouseEvent
): void {
  const rect = container.getBoundingClientRect();
  const offsetX = event.clientX - rect.left + 12;
  const offsetY = event.clientY - rect.top - 48;

  const selection = d3
    .select(container)
    .selectAll(".foresight-tooltip")
    .data([null])
    .join("div")
    .attr("class", "foresight-tooltip")
    .html(html)
    .style("opacity", "1");

  const node = selection.node() as HTMLDivElement | null;
  if (!node) return;

  const tw = node.offsetWidth;
  const th = node.offsetHeight;
  const left = Math.max(8, Math.min(offsetX, rect.width - tw - 8));
  const top = Math.max(8, Math.min(offsetY, rect.height - th - 8));

  selection.style("left", `${left}px`).style("top", `${top}px`);
}

function hideTooltip(container: HTMLElement): void {
  d3.select(container).selectAll(".foresight-tooltip").style("opacity", "0").remove();
}

function legendRowY(index: number): number {
  return LEGEND_LAYOUT.titleHeight + index * LEGEND_LAYOUT.rowHeight;
}

function appendLegendTitle(
  parent: d3.Selection<SVGGElement, unknown, null, undefined>,
  label: string
): void {
  parent
    .append("text")
    .attr("class", "foresight-legend-title")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dominant-baseline", "hanging")
    .attr("font-size", FS.legendTitle)
    .attr("font-weight", 600)
    .attr("fill", STROKE)
    .text(label);
}

function appendLegendRow(
  parent: d3.Selection<SVGGElement, unknown, null, undefined>,
  index: number,
  color: string,
  label: string,
  stroke = false
): void {
  const row = parent
    .append("g")
    .attr("class", "foresight-legend-row")
    .attr("transform", `translate(0, ${legendRowY(index)})`);

  row
    .append("circle")
    .attr("class", "foresight-legend-dot")
    .attr("cx", LEGEND_LAYOUT.dotCx)
    .attr("cy", 0)
    .attr("r", LEGEND_LAYOUT.dotRadius)
    .attr("fill", color)
    .attr("stroke", stroke ? STROKE : "none")
    .attr("stroke-width", stroke ? 0.5 : 0);

  row
    .append("text")
    .attr("class", "foresight-legend-label")
    .attr("x", LEGEND_LAYOUT.labelX)
    .attr("y", 0)
    .attr("dominant-baseline", "middle")
    .attr("font-size", FS.legendItem)
    .attr("fill", "#52525b")
    .text(label);
}

function drawLegends(
  parent: d3.Selection<SVGGElement, unknown, null, undefined>
): number {
  const legendG = parent.append("g").attr("class", "foresight-legends");

  const col1 = legendG
    .append("g")
    .attr("class", "foresight-legend-col foresight-legend-col--drivers")
    .attr(
      "transform",
      `translate(${LEGEND_LAYOUT.originX}, ${LEGEND_LAYOUT.originY})`
    );

  appendLegendTitle(col1, "Drivers and Signals");

  const drivers: { label: string; cat: keyof typeof DRIVER_COLORS }[] = [
    { label: "Technological", cat: "technological" },
    { label: "Political", cat: "political" },
    { label: "Economic", cat: "economic" },
    { label: "Social", cat: "social" },
  ];
  drivers.forEach((d, i) => {
    appendLegendRow(col1, i, DRIVER_COLORS[d.cat], d.label);
  });
  appendLegendRow(col1, drivers.length, SCENARIO_DEFAULT_COLOR, "Events and Scenarios", true);

  const col2 = legendG
    .append("g")
    .attr("class", "foresight-legend-col foresight-legend-col--tech")
    .attr(
      "transform",
      `translate(${LEGEND_LAYOUT.originX + LEGEND_LAYOUT.colWidth}, ${LEGEND_LAYOUT.originY})`
    );

  appendLegendTitle(col2, "Technologies");

  const techs: { label: string; mat: keyof typeof TECHNOLOGY_COLORS }[] = [
    { label: "Current", mat: "current" },
    { label: "Emerging", mat: "emerging" },
    { label: "Hypothetical", mat: "hypothetical" },
  ];
  techs.forEach((t, i) => {
    appendLegendRow(col2, i, TECHNOLOGY_COLORS[t.mat], t.label);
  });

  return LEGEND_HEIGHT;
}

function drawDriverDot(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: number,
  y: number,
  driver: ForesightDriver,
  container: HTMLElement,
  radius: number
): void {
  const dg = g
    .append("g")
    .attr("transform", `translate(${x}, ${y})`)
    .style("cursor", "pointer");

  dg.append("circle")
    .attr("r", radius)
    .attr("fill", DRIVER_COLORS[driver.category])
    .attr("stroke", STROKE)
    .attr("stroke-width", 0.5);

  dg.on("mouseenter", (event: MouseEvent) => {
    showTooltip(
      container,
      `<strong>${driver.label}</strong><br/><span class="foresight-tooltip-muted">${driver.category}</span>`,
      event
    );
  });
  dg.on("mouseleave", () => hideTooltip(container));
}

function drawDriverCrossSection(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  cx: number,
  cy: number,
  halfH: number,
  drivers: ForesightDriver[],
  container: HTMLElement,
  className: string
): void {
  const { rx, ry } = horizonRadii(halfH);
  const sliceG = g.append("g").attr("class", className);

  sliceG
    .append("path")
    .attr("d", ellipsePath(cx, cy, rx, ry))
    .attr("fill", "none")
    .attr("stroke", STROKE)
    .attr("stroke-width", 0.8);

  drivers.forEach((driver: ForesightDriver) => {
    const angle = driverAngle(driver.position);
    const pt = pointOnEllipse(cx, cy, rx, ry, angle);
    drawDriverDot(sliceG, pt.x, pt.y, driver, container, FS.driverDot);
  });
}

function drawTimelineNode(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  cx: number,
  cy: number,
  ringHalfH: number,
  drivers: ForesightDriver[] | undefined,
  container: HTMLElement,
  className: string,
  label?: string,
  labelY?: number,
  labelBold = false
): void {
  const nodeG = g.append("g").attr("class", className);

  if (drivers?.length) {
    drawDriverCrossSection(nodeG, cx, cy, ringHalfH, drivers, container, `${className}-ring`);
  }

  nodeG
    .append("line")
    .attr("x1", cx)
    .attr("x2", cx)
    .attr("y1", cy - ringHalfH - 3)
    .attr("y2", cy + ringHalfH + 3)
    .attr("stroke", STROKE)
    .attr("stroke-width", 1);

  nodeG
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 3)
    .attr("fill", "transparent")
    .attr("stroke", STROKE)
    .attr("stroke-width", 1.1);

  if (label !== undefined && labelY !== undefined) {
    if (labelBold) {
      nodeG
        .append("text")
        .attr("x", cx)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .attr("font-size", FS.now)
        .attr("font-weight", 600)
        .attr("fill", STROKE)
        .text(label);
    } else {
      appendSplitLabel(nodeG, cx, labelY, parseParenLabel(label), {
        titleSize: FS.eraLabel,
        subtitleSize: FS.eraDateLabel,
      });
    }
  }
}

function drawHorizon(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  horizon: ForesightHorizon,
  hx: number,
  cy: number,
  halfH: number,
  showBandLabels: boolean
): void {
  const { rx, ry } = horizonRadii(halfH);
  const bandCount = horizon.bands;
  const bandLabels = horizon.bandLabels ?? defaultBandLabels(bandCount);
  const ringG = g.append("g").attr("class", `foresight-horizon-${horizon.id}`);
  const rings = nestedRingPaths(hx, cy, rx, ry, bandCount);

  rings.forEach((pathD, i) => {
    const isOuter = i === rings.length - 1;
    ringG
      .append("path")
      .attr("d", pathD)
      .attr("fill", "none")
      .attr("stroke", STROKE)
      .attr("stroke-width", i === 0 ? 1 : 0.7)
      .attr("stroke-opacity", isOuter ? 0.5 : 0.75)
      .attr("stroke-dasharray", isOuter ? "3 3" : "none");
  });

  if (showBandLabels) {
    bandLabels.forEach((label, bi) => {
      const mid = bandMidRadius(bi, bandCount, rx, ry);
      if (mid.ry < 10) return;
      ringG
        .append("text")
        .attr("x", hx + mid.rx + 6)
        .attr("y", cy - mid.ry + bi * 12)
        .attr("font-size", FS.bandLabel)
        .attr("fill", "#71717a")
        .text(label);
    });
  }

  const split = parseParenLabel(horizon.label);
  appendSplitLabel(ringG, hx, cy + halfH + 16, split, {
    titleSize: FS.horizonLabel,
    subtitleSize: FS.horizonDateLabel,
  });
}

export function ForesightScope({ data, className }: ForesightScopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const render = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 10 || height < 10) return;

      const svg = d3.select(svgEl);
      svg
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible");
      svg.selectAll("*").remove();

      const pad = 28;
      const bottomPad = 30;
      const chartTop = LEGEND_HEIGHT + 2;
      const chartH = height - chartTop - bottomPad;
      const labelReserve = 36;
      const topReserve = 10;
      const maxHalfHeight = Math.max(
        24,
        Math.min((chartH - labelReserve) / 2 - topReserve, chartH * 0.36)
      );
      const cy = topReserve + maxHalfHeight;
      const futureOnly = data.futureOnly === true;
      const leftX = pad;
      const rightX = width - pad;
      const presentX = futureOnly ? leftX + 48 : width * 0.36;

      const presentDate = new Date(data.presentDate);
      const endDate = new Date(data.timeRange.end);

      const futureX = d3.scaleTime().domain([presentDate, endDate]).range([presentX, rightX]);

      const sortedHorizons = [...data.horizons].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      const horizonEndPad = 28;
      const h1Offset = Math.max(56, (rightX - presentX) * 0.14);
      const horizonXScale = d3
        .scalePoint<string>()
        .domain(sortedHorizons.map((h) => h.id))
        .range([presentX + h1Offset, rightX - horizonEndPad])
        .padding(0.1);

      const horizonX = (horizonId: string): number =>
        horizonXScale(horizonId) ?? presentX + h1Offset;

      const h2X = horizonX(data.ringFloorHorizonId ?? "hz-h2");
      const ringFloorHalfH = futureConeHalfHeightPx(h2X, presentX, rightX, maxHalfHeight);
      const floorHorizonIndex = sortedHorizons.findIndex(
        (h) => h.id === (data.ringFloorHorizonId ?? "hz-h2")
      );

      const naturalHalfH = (hx: number): number =>
        futureConeHalfHeightPx(hx, presentX, rightX, maxHalfHeight);

      const effectiveHorizonHalfH = (horizonId: string, hx: number): number => {
        const natural = naturalHalfH(hx);
        if (ringFloorHalfH <= 0) return natural;
        const idx = sortedHorizons.findIndex((h) => h.id === horizonId);
        if (idx >= 0 && idx <= floorHorizonIndex) {
          return Math.max(natural, ringFloorHalfH);
        }
        return natural;
      };

      const referenceX = futureOnly
        ? horizonX(sortedHorizons[0]?.id ?? "hz-h1")
        : h2X;
      const historyRingHalfH = Math.max(
        coneHalfHeightPx(referenceX, presentX, rightX, maxHalfHeight) * FS.eraRingScale,
        ringFloorHalfH
      );
      const tubeHalfH = historyRingHalfH;

      const pastHistoryItems = [
        ...(data.eras ?? []).map((era) => ({
          id: era.id,
          date: new Date(era.date),
        })),
        ...data.mainThread
          .filter((ev) => new Date(ev.date) < presentDate)
          .map((ev) => ({ id: ev.id, date: new Date(ev.date) })),
      ].sort((a, b) => a.date.getTime() - b.date.getTime());

      const pastEvenX = d3
        .scalePoint<string>()
        .domain(pastHistoryItems.map((item) => item.id))
        .range([leftX + 14, presentX - 10])
        .padding(0.14);

      const pastX = (id: string): number => pastEvenX(id) ?? leftX + 14;

      const growthLabel = data.coneLabels?.growth ?? "Growth / Transform";
      const crisisLabel = data.coneLabels?.crisis ?? "Crisis / Discipline";

      const root = svg.append("g").attr("class", "foresight-root");
      drawLegends(root);

      const chartG = root
        .append("g")
        .attr("class", "foresight-chart")
        .attr("transform", `translate(0, ${chartTop})`);

      const tubeG = chartG.append("g").attr("class", "foresight-history-tube");
      if (!futureOnly) {
        tubeG
          .append("path")
          .attr("d", historyTubeBoundaryPath(leftX, presentX, cy, tubeHalfH, "top"))
          .attr("fill", "none")
          .attr("stroke", STROKE)
          .attr("stroke-width", 0.9);
        tubeG
          .append("path")
          .attr("d", historyTubeBoundaryPath(leftX, presentX, cy, tubeHalfH, "bottom"))
          .attr("fill", "none")
          .attr("stroke", STROKE)
          .attr("stroke-width", 0.9);
      }

      const coneG = chartG.append("g").attr("class", "foresight-cone");
      coneG
        .append("path")
        .attr("d", futureUpperBoundaryPath(presentX, cy, rightX, maxHalfHeight))
        .attr("fill", "none")
        .attr("stroke", STROKE)
        .attr("stroke-width", 0.9);
      coneG
        .append("path")
        .attr("d", futureLowerBoundaryPath(presentX, cy, rightX, maxHalfHeight))
        .attr("fill", "none")
        .attr("stroke", STROKE)
        .attr("stroke-width", 0.9);

      const futTopY = cy - maxHalfHeight;
      const futBotY = cy + maxHalfHeight;
      coneG
        .append("text")
        .attr("x", rightX - 4)
        .attr("y", futTopY - 6)
        .attr("text-anchor", "end")
        .attr("font-size", FS.boundary)
        .attr("font-style", "italic")
        .attr("fill", "#52525b")
        .text(growthLabel);
      coneG
        .append("text")
        .attr("x", rightX - 4)
        .attr("y", futBotY + 14)
        .attr("text-anchor", "end")
        .attr("font-size", FS.boundary)
        .attr("font-style", "italic")
        .attr("fill", "#52525b")
        .text(crisisLabel);

      chartG
        .append("line")
        .attr("x1", leftX)
        .attr("y1", cy)
        .attr("x2", rightX)
        .attr("y2", cy)
        .attr("stroke", STROKE)
        .attr("stroke-width", 0.6)
        .attr("stroke-opacity", 0.35);

      const eraG = chartG.append("g").attr("class", "foresight-eras");
      if (!futureOnly) {
        (data.eras ?? []).forEach((era) => {
          const ex = pastX(era.id);
          drawTimelineNode(
            eraG,
            ex,
            cy,
            historyRingHalfH,
            era.crossSection?.drivers,
            container,
            `foresight-era-${era.id}`,
            era.label,
            cy + tubeHalfH + 16
          );
        });
      }

      const horizonG = chartG.append("g").attr("class", "foresight-horizons");
      const trajG = chartG.append("g").attr("class", "foresight-trajectories");
      const scenarioG = chartG.append("g").attr("class", "foresight-scenarios");
      const outerHorizonId = sortedHorizons[sortedHorizons.length - 1]?.id;
      const nowPoint: Point2D = { x: presentX, y: cy };

      const horizonIndexById = new Map(
        sortedHorizons.map((h, i) => [h.id, i] as const)
      );

      const placements: ScenarioPlacement[] = [];

      sortedHorizons.forEach((horizon) => {
        const hx = horizonX(horizon.id);
        const halfH = effectiveHorizonHalfH(horizon.id, hx);
        const { rx, ry } = horizonRadii(halfH);
        const bandCount = horizon.bands;
        const atHorizon = data.scenarios.filter((s) => s.horizonId === horizon.id);

        atHorizon.forEach((scenario, idx) => {
          const mid = bandMidRadius(
            Math.min(scenario.bandIndex, bandCount - 1),
            bandCount,
            rx,
            ry
          );
          const angle = scenarioAngle(scenario, idx);
          const pt = pointOnEllipse(hx, cy, mid.rx, mid.ry, angle);
          placements.push({
            scenario,
            x: pt.x,
            y: pt.y,
            horizonIndex: horizonIndexById.get(horizon.id) ?? 0,
          });
        });
      });

      const pathSegments = buildFeaturedPathSegments(
        placements,
        data.featuredTrajectory,
        nowPoint
      );
      const onFeaturedPath = featuredScenarioIds(pathSegments);

      placements.forEach((placement) => {
        if (onFeaturedPath.has(placement.scenario.id)) return;

        const trajectory = placement.scenario.trajectory;
        const strokeColor = trajectory
          ? TRAJECTORY_COLORS[trajectory]
          : "#a1a1aa";

        trajG
          .append("path")
          .datum(placement)
          .attr("class", "foresight-to-now")
          .attr("d", trajectoryToNow({ x: placement.x, y: placement.y }, nowPoint))
          .attr("fill", "none")
          .attr("stroke", strokeColor)
          .attr("stroke-width", PITFALL_EDGE_WIDTH)
          .attr("stroke-dasharray", "4 3")
          .attr("stroke-opacity", 0.45);
      });

      const pathSegmentSel = trajG
        .selectAll<SVGPathElement, PathSegment>(".foresight-path-segment")
        .data(pathSegments)
        .join("path")
        .attr("class", "foresight-path-segment")
        .attr("d", (d) => trajectoryEdge(d.from, d.to))
        .attr("fill", "none")
        .attr("stroke", (d) => TRAJECTORY_COLORS[d.trajectory])
        .attr("stroke-width", FEATURED_EDGE_WIDTH)
        .attr("stroke-opacity", 0.92);

      trajG
        .selectAll<SVGTextElement, PathSegment>(".foresight-path-label")
        .data(pathSegments)
        .join("text")
        .attr("class", "foresight-path-label")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", 9)
        .attr("font-weight", 600)
        .attr("fill", (d) => TRAJECTORY_COLORS[d.trajectory])
        .style("opacity", 1)
        .style("pointer-events", "none")
        .attr("transform", (d) => {
          const mid = trajectoryEdgeMidpoint(d.from, d.to, 0.5);
          return `translate(${mid.x}, ${mid.y}) rotate(${mid.angleDeg})`;
        })
        .text((d) => TRAJECTORY_LABELS[d.trajectory]);

      sortedHorizons.forEach((horizon) => {
        const hx = horizonX(horizon.id);
        const halfH = effectiveHorizonHalfH(horizon.id, hx);
        drawHorizon(
          horizonG,
          horizon,
          hx,
          cy,
          halfH,
          horizon.id === outerHorizonId
        );
      });

      const scenarioNodes = scenarioG
        .selectAll<SVGGElement, ScenarioPlacement>(".foresight-scenario")
        .data(placements)
        .join("g")
        .attr("class", "foresight-scenario")
        .attr("data-id", (d) => d.scenario.id)
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
        .style("cursor", "pointer");

      scenarioNodes
        .append("circle")
        .attr("class", "foresight-scenario-dot")
        .attr("r", FS.scenarioDot)
        .attr("fill", (d) => d.scenario.color ?? SCENARIO_DEFAULT_COLOR)
        .attr("stroke", STROKE)
        .attr("stroke-width", 0.5);

      scenarioNodes
        .on("mouseenter", function (event: MouseEvent, d) {
          setPathHighlight(trajG, scenarioG, d.scenario.id);
          showTooltip(container, formatScenarioTooltip(d.scenario), event);
        })
        .on("mouseleave", () => {
          setPathHighlight(trajG, scenarioG, null);
          hideTooltip(container);
        });

      pathSegmentSel
        .style("cursor", "pointer")
        .on("mouseenter", function (event: MouseEvent, d) {
          setPathHighlight(trajG, scenarioG, d.toId);
          const placement = placements.find((p) => p.scenario.id === d.toId);
          if (placement) {
            showTooltip(container, formatScenarioTooltip(placement.scenario), event);
          }
        })
        .on("mouseleave", () => {
          setPathHighlight(trajG, scenarioG, null);
          hideTooltip(container);
        });

      const mainG = chartG.append("g").attr("class", "foresight-main-thread");
      data.mainThread.forEach((ev) => {
        const d = new Date(ev.date);
        if (d.getTime() === presentDate.getTime()) return;
        if (futureOnly && d < presentDate) return;

        const mx = d < presentDate ? pastX(ev.id) : futureX(d);
        const mg = mainG
          .append("g")
          .attr("transform", `translate(${mx}, ${cy})`)
          .style("cursor", "pointer");

        mg.append("circle")
          .attr("r", FS.signalDot)
          .attr("fill", STROKE)
          .attr("opacity", 0.55);

        mg.on("mouseenter", (event: MouseEvent) => {
          showTooltip(
            container,
            `<strong>${ev.label}</strong><br/><span class="foresight-tooltip-muted">${ev.type}</span>`,
            event
          );
        });
        mg.on("mouseleave", () => hideTooltip(container));
      });

      const nowG = chartG.append("g").attr("class", "foresight-now");
      drawTimelineNode(
        nowG,
        presentX,
        cy,
        historyRingHalfH,
        data.presentCrossSection?.drivers,
        container,
        "foresight-present",
        "Now",
        cy + historyRingHalfH + 16,
        true
      );

      const axisG = chartG.append("g").attr("class", "foresight-axis-labels");
      if (!futureOnly) {
        axisG
          .append("text")
          .attr("x", leftX)
          .attr("y", chartH - 2)
          .attr("font-size", FS.axis)
          .attr("fill", "#71717a")
          .text("Past");
      }
      axisG
        .append("text")
        .attr("x", rightX)
        .attr("y", chartH - 2)
        .attr("text-anchor", "end")
        .attr("font-size", FS.axis)
        .attr("fill", "#71717a")
        .text("Futures");
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(container);
    return () => ro.disconnect();
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={`gestalt-foresight-scope ${className ?? ""}`}
      role="img"
      aria-label={data.title}
    >
      <svg ref={svgRef} />
    </div>
  );
}

export default ForesightScope;
