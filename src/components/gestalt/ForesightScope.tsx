import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { ForesightBranch, ForesightScopeData } from "./types-foresight";

interface ForesightScopeProps {
  data: ForesightScopeData;
  className?: string;
}

interface BranchLayout {
  branch: ForesightBranch;
  slotY: number;
  color: string;
  strokeWidth: number;
  strokeOpacity: number;
  pathD: string;
  eventPoints: { x: number; y: number; label: string; type: string }[];
  labelPoint: { x: number; y: number; label: string };
  branchOrigin: { x: number; y: number };
}

const DEFAULT_PALETTE = [
  "#10b981",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#6366f1",
];

function branchColor(
  branch: ForesightBranch,
  index: number,
  palette: string[]
): string {
  if (branch.color) return branch.color;
  return palette[index % palette.length] ?? DEFAULT_PALETTE[0]!;
}

function applyValence(color: string, valence?: ForesightBranch["valence"]): string {
  if (valence === "negative") {
    return d3.color(color)?.copy({ opacity: 0.7 }).formatRgb() ?? color;
  }
  return color;
}

function confidenceStroke(confidence: number): { width: number; opacity: number } {
  return {
    width: 0.5 + confidence * 2.5,
    opacity: 0.3 + confidence * 0.7,
  };
}

function slotYPositions(
  count: number,
  cy: number,
  spread: number
): number[] {
  if (count <= 0) return [cy];
  if (count === 1) return [cy];
  const step = spread / (count - 1);
  return Array.from({ length: count }, (_, i) => cy - spread / 2 + i * step);
}

function historyPathD(
  branch: ForesightBranch,
  pastX: (d: Date) => number,
  presentX: number,
  cy: number,
  startY: number
): string {
  const points: { x: number; y: number }[] = [];
  const branchStart = new Date(branch.branchDate);
  points.push({ x: pastX(branchStart), y: startY });

  for (const ev of branch.events) {
    points.push({ x: pastX(new Date(ev.date)), y: startY + (cy - startY) * 0.4 });
  }

  points.push({ x: presentX, y: cy });

  if (points.length < 2) return "";

  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function futurePathD(
  branch: ForesightBranch,
  futureX: (d: Date) => number,
  presentX: number,
  cy: number,
  endY: number,
  startY?: number
): string {
  const points: { x: number; y: number }[] = [];
  const originY = startY ?? cy;
  points.push({ x: presentX, y: originY });

  const branchStart = new Date(branch.branchDate);
  if (branchStart > new Date(0)) {
    points.push({ x: futureX(branchStart), y: originY + (endY - originY) * 0.3 });
  }

  for (const ev of branch.events) {
    const t = branch.events.indexOf(ev) / Math.max(branch.events.length, 1);
    points.push({
      x: futureX(new Date(ev.date)),
      y: originY + (endY - originY) * (0.3 + t * 0.7),
    });
  }

  const endDate = branch.endDate
    ? new Date(branch.endDate)
    : branch.events.length > 0
      ? new Date(branch.events[branch.events.length - 1]!.date)
      : new Date(branch.branchDate);
  points.push({ x: futureX(endDate), y: endY });

  if (points.length < 2) return "";

  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx = prev.x + (curr.x - prev.x) * 0.55;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function buildLayout(
  data: ForesightScopeData,
  width: number,
  height: number
): {
  presentX: number;
  cy: number;
  histories: BranchLayout[];
  futures: BranchLayout[];
  mainThreadPoints: { x: number; y: number; label: string }[];
  conePaths: string[];
} {
  const pad = 24;
  const presentX = width * 0.45;
  const cy = height / 2;
  const palette = data.palette ?? DEFAULT_PALETTE;

  const presentDate = new Date(data.presentDate);
  const startDate = new Date(data.timeRange.start);
  const endDate = new Date(data.timeRange.end);

  const pastX = d3
    .scaleTime()
    .domain([startDate, presentDate])
    .range([pad, presentX]);

  const futureX = d3
    .scaleTime()
    .domain([presentDate, endDate])
    .range([presentX, width - pad]);

  const histCount = data.histories.length;
  const futCount = data.futures.length;
  const maxBranches = Math.max(histCount, futCount, 1);
  const spread = Math.min(height * 0.38, 24 + maxBranches * 22);
  const histSlots = slotYPositions(histCount, cy, spread);
  const futSlots = slotYPositions(futCount, cy, spread);

  const parentSlotMap = new Map<string, number>();

  const histories: BranchLayout[] = data.histories.map((branch, i) => {
    const slotY = histSlots[i] ?? cy;
    const { width: strokeWidth, opacity: strokeOpacity } = confidenceStroke(
      branch.confidence
    );
    const color = applyValence(branchColor(branch, i, palette), branch.valence);
    const pathD = historyPathD(branch, pastX, presentX, cy, slotY);
    parentSlotMap.set(branch.id, slotY);

    return {
      branch,
      slotY,
      color,
      strokeWidth,
      strokeOpacity,
      pathD,
      eventPoints: branch.events.map((ev) => ({
        x: pastX(new Date(ev.date)),
        y: slotY + (cy - slotY) * 0.4,
        label: ev.label,
        type: ev.type,
      })),
      labelPoint: {
        x: pastX(new Date(branch.branchDate)) - 8,
        y: slotY,
        label: branch.label,
      },
      branchOrigin: {
        x: pastX(new Date(branch.branchDate)),
        y: slotY,
      },
    };
  });

  const futures: BranchLayout[] = data.futures.map((branch, i) => {
    let slotY = futSlots[i] ?? cy;
    let startY: number | undefined;

    if (branch.dependsOn) {
      const parentY = parentSlotMap.get(branch.dependsOn);
      if (parentY !== undefined) {
        startY = parentY;
        slotY = parentY + (slotY - cy) * 0.6;
      }
    }

    const { width: strokeWidth, opacity: strokeOpacity } = confidenceStroke(
      branch.confidence
    );
    const color = applyValence(
      branchColor(branch, i + histCount, palette),
      branch.valence
    );
    const pathD = futurePathD(branch, futureX, presentX, cy, slotY, startY);

    return {
      branch,
      slotY,
      color,
      strokeWidth,
      strokeOpacity,
      pathD,
      eventPoints: branch.events.map((ev, idx) => {
        const t = (idx + 1) / Math.max(branch.events.length, 1);
        const originY = startY ?? cy;
        return {
          x: futureX(new Date(ev.date)),
          y: originY + (slotY - originY) * (0.3 + t * 0.7),
          label: ev.label,
          type: ev.type,
        };
      }),
      labelPoint: {
        x: futureX(
          branch.endDate
            ? new Date(branch.endDate)
            : branch.events.length > 0
              ? new Date(branch.events[branch.events.length - 1]!.date)
              : new Date(branch.branchDate)
        ) + 8,
        y: slotY,
        label: branch.label,
      },
      branchOrigin: {
        x: futureX(new Date(branch.branchDate)),
        y: startY ?? cy,
      },
    };
  });

  const mainThreadPoints = data.mainThread.map((ev) => ({
    x:
      new Date(ev.date) <= presentDate
        ? pastX(new Date(ev.date))
        : futureX(new Date(ev.date)),
    y: cy,
    label: ev.label,
  }));

  const coneSpread = spread * 0.55;
  const conePaths: string[] = [];
  if (futCount > 0) {
    const rightX = width - pad;
    conePaths.push(
      `M ${presentX} ${cy} L ${rightX} ${cy - coneSpread} L ${rightX} ${cy + coneSpread} Z`
    );
  }
  if (histCount > 0) {
    const leftX = pad;
    conePaths.push(
      `M ${presentX} ${cy} L ${leftX} ${cy - coneSpread} L ${leftX} ${cy + coneSpread} Z`
    );
  }

  return {
    presentX,
    cy,
    histories,
    futures,
    mainThreadPoints,
    conePaths,
  };
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
      svg.attr("width", width).attr("height", height);
      svg.selectAll("*").remove();

      const layout = buildLayout(data, width, height);
      const { presentX, cy, histories, futures, mainThreadPoints, conePaths } =
        layout;

      const g = svg.append("g").attr("class", "foresight-root");

      const coneG = g.append("g").attr("class", "foresight-cones");
      coneG
        .selectAll("path")
        .data(conePaths)
        .join("path")
        .attr("d", (d) => d)
        .attr("fill", "rgba(99, 102, 241, 0.04)")
        .attr("stroke", "rgba(99, 102, 241, 0.12)")
        .attr("stroke-width", 1);

      const mainG = g.append("g").attr("class", "foresight-main-thread");
      mainG
        .append("line")
        .attr("x1", 24)
        .attr("y1", cy)
        .attr("x2", width - 24)
        .attr("y2", cy)
        .attr("stroke", "#374151")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4 4");

      mainG
        .selectAll("circle")
        .data(mainThreadPoints)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 3)
        .attr("fill", "#6366f1");

      const drawBranches = (
        branches: BranchLayout[],
        side: "history" | "future"
      ) => {
        const branchG = g.append("g").attr("class", `foresight-${side}`);

        const paths = branchG
          .selectAll<SVGPathElement, BranchLayout>("path.branch")
          .data(branches, (d) => d.branch.id)
          .join("path")
          .attr("class", "branch")
          .attr("fill", "none")
          .attr("stroke", (d) => d.color)
          .attr("stroke-width", (d) => d.strokeWidth)
          .attr("stroke-opacity", (d) => d.strokeOpacity)
          .attr("d", (d) => d.pathD);

        paths.each(function () {
          const path = d3.select(this);
          const totalLength = (this as SVGPathElement).getTotalLength();
          path
            .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(800)
            .ease(d3.easeCubicOut)
            .attr("stroke-dashoffset", 0);
        });

        branchG
          .selectAll("circle.event-node")
          .data(
            branches.flatMap((b) =>
              b.eventPoints.map((p, i) => ({
                ...p,
                branchId: b.branch.id,
                key: `${b.branch.id}-ev-${i}`,
              }))
            ),
            (d) => d.key
          )
          .join("circle")
          .attr("class", "event-node")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", 4)
          .attr("fill", (d) => {
            const branch = branches.find((b) => b.branch.id === d.branchId);
            return branch?.color ?? "#6366f1";
          })
          .attr("opacity", 0)
          .transition()
          .delay(400)
          .duration(400)
          .attr("opacity", 1);

        branchG
          .selectAll("circle.branch-origin")
          .data(branches, (d) => d.branch.id)
          .join("circle")
          .attr("class", "branch-origin")
          .attr("cx", (d) => d.branchOrigin.x)
          .attr("cy", (d) => d.branchOrigin.y)
          .attr("r", 7)
          .attr("fill", "none")
          .attr("stroke", (d) => d.color)
          .attr("stroke-width", 2);

        branchG
          .selectAll("text.branch-label")
          .data(branches, (d) => d.branch.id)
          .join("text")
          .attr("class", "branch-label")
          .attr("x", (d) => d.labelPoint.x)
          .attr("y", (d) => d.labelPoint.y)
          .attr("text-anchor", side === "history" ? "end" : "start")
          .attr("dominant-baseline", "middle")
          .attr("font-family", "'Geist', sans-serif")
          .attr("font-size", 10)
          .attr("fill", (d) => d.color)
          .attr("opacity", 0.85)
          .text((d) => d.labelPoint.label);
      };

      if (histories.length > 0) drawBranches(histories, "history");
      drawBranches(futures, "future");

      const presentG = g.append("g").attr("class", "foresight-present");
      presentG
        .append("line")
        .attr("x1", presentX)
        .attr("y1", cy - spreadForHeight(height) / 2 - 8)
        .attr("x2", presentX)
        .attr("y2", cy + spreadForHeight(height) / 2 + 8)
        .attr("stroke", "#a5b4fc")
        .attr("stroke-width", 2);

      presentG
        .append("circle")
        .attr("cx", presentX)
        .attr("cy", cy)
        .attr("r", 8)
        .attr("fill", "#6366f1")
        .attr("stroke", "#a5b4fc")
        .attr("stroke-width", 2);

      presentG
        .append("text")
        .attr("x", presentX)
        .attr("y", cy + spreadForHeight(height) / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Geist', sans-serif")
        .attr("font-size", 11)
        .attr("font-weight", 600)
        .attr("fill", "#a5b4fc")
        .text("Present");

      const axisG = g.append("g").attr("class", "foresight-axis");
      axisG
        .append("text")
        .attr("x", 24)
        .attr("y", height - 8)
        .attr("font-family", "'Geist', sans-serif")
        .attr("font-size", 10)
        .attr("fill", "#6b7280")
        .text("Past");

      axisG
        .append("text")
        .attr("x", width - 24)
        .attr("y", height - 8)
        .attr("text-anchor", "end")
        .attr("font-family", "'Geist', sans-serif")
        .attr("font-size", 10)
        .attr("fill", "#6b7280")
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

function spreadForHeight(height: number): number {
  return Math.min(height * 0.38, 120);
}

export default ForesightScope;
