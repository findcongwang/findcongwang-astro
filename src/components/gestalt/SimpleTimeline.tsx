import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { TimelineEvent, ThreadId } from "./types";

interface SimpleTimelineProps {
  events: TimelineEvent[];
  currentEventId: string | null;
  threadColors: Record<ThreadId, string>;
  onEventClick: (eventId: string) => void;
  theme?: "light" | "dark";
  /** Events where the word cloud visible set changes */
  changeEvents?: Set<string>;
}

export function SimpleTimeline({
  events,
  currentEventId,
  threadColors,
  onEventClick,
  theme = "dark",
  changeEvents,
}: SimpleTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Single effect: initialize structure on mount, update on data/state change
  useEffect(() => {
    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    if (!container || !svg.node()) return;

    const height = 56;
    const margin = { left: 40, right: 40, top: 8, bottom: 18 };

    const isLight = theme === "light";
    const axisStroke = isLight ? "#d4d4d8" : "#374151";
    const axisText = isLight ? "#71717a" : "#9ca3af";
    const baselineStroke = isLight ? "#a1a1aa" : "#4b5563";
    const markerStroke = isLight ? "#6366f1" : "#ffffff";
    const dotHighlightStroke = isLight ? "#18181b" : "#fff";
    const tooltipMuted = isLight ? "#71717a" : "#9ca3af";

    const updateChart = () => {
      const width = container.clientWidth;
      svg.attr("width", width).attr("height", height);

      const minDate = new Date("2025-12-01");
      const maxDate = new Date("2026-07-01");
      const xScale = d3.scaleTime().domain([minDate, maxDate]).range([margin.left, width - margin.right]);
      const yCenter = (height - margin.bottom) / 2 + margin.top / 2;

      // --- AXIS (rebuild on resize) ---
      svg.selectAll("g.axis").remove();
      const axisG = svg.append("g").attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`);
      const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b") as any)
        .tickSize(-height + margin.top + margin.bottom);
      axisG.call(xAxis as any);
      axisG.selectAll("line").attr("stroke", axisStroke).attr("stroke-opacity", 0.5);
      axisG.selectAll("path").attr("stroke", axisStroke).attr("stroke-opacity", 0.5);
      axisG.selectAll("text").attr("fill", axisText).attr("font-size", "10px");

      // --- BASELINE ---
      svg.selectAll("line.baseline").data([null]).join("line")
        .attr("class", "baseline")
        .attr("x1", margin.left).attr("x2", width - margin.right)
        .attr("y1", yCenter).attr("y2", yCenter)
        .attr("stroke", baselineStroke).attr("stroke-width", 1);

      // --- EVENT DOTS (enter/update/exit) ---
      const dots = svg.selectAll<SVGCircleElement, TimelineEvent>("circle.event-dot")
        .data(events, (d) => d.id);

      dots.exit()
        .transition().duration(300)
        .attr("r", 0).remove();

      const entering = dots.enter()
        .append("circle")
        .attr("class", (d) =>
          changeEvents?.has(d.id) ? "event-dot event-dot--change" : "event-dot"
        )
        .attr("cy", yCenter)
        .attr("cx", (d) => xScale(new Date(d.date)))
        .attr("r", 0)
        .attr("fill", (d) => threadColors[d.thread])
        .attr("stroke", "none")
        .style("cursor", "pointer");

      entering.transition().duration(400).ease(d3.easeCubicOut).attr("r", (d) =>
        changeEvents?.has(d.id) ? 6 : 5
      );

      // Hover + click on all dots
      const allDots = entering.merge(dots);
      allDots
        .attr("class", (d) =>
          changeEvents?.has(d.id) ? "event-dot event-dot--change" : "event-dot"
        )
        .on("mouseenter", (event, d) => {
          d3.select(event.currentTarget).attr("r", 7).attr("stroke", dotHighlightStroke).attr("stroke-width", 1.5);
          tooltip
            .style("opacity", "1")
            .style("left", `${event.clientX + 10}px`)
            .style("top", `${event.clientY - 40}px`)
            .html(`<strong>${d.label}</strong><br/><span style="color:${tooltipMuted}">${formatDate(d.date)}</span>`);
        })
        .on("mouseleave", (event, d) => {
          const isCurrent = d.id === currentEventId;
          const isChange = changeEvents?.has(d.id);
          d3.select(event.currentTarget)
            .attr("r", isCurrent ? 7 : isChange ? 6 : 5)
            .attr("stroke", isCurrent ? dotHighlightStroke : "none")
            .attr("stroke-width", isCurrent ? 2 : 0);
          tooltip.style("opacity", "0");
        })
        .on("click", (event, d) => {
          event.stopPropagation();
          onEventClick(d.id);
        });

      // Update positions on resize
      allDots.transition().duration(300).ease(d3.easeCubicInOut)
        .attr("cx", (d) => xScale(new Date(d.date)))
        .attr("cy", yCenter);

      // --- CURRENT MARKER ---
      const currentEvent = events.find(e => e.id === currentEventId);
      const markerData = currentEvent ? [currentEvent] : [];

      // Vertical line
      const vLine = svg.selectAll<SVGLineElement, TimelineEvent>("line.current-line")
        .data(markerData, (d) => d.id);
      vLine.exit().transition().duration(200).attr("stroke-opacity", 0).remove();
      vLine.enter()
        .append("line").attr("class", "current-line")
        .attr("y1", margin.top).attr("y2", height - margin.bottom)
        .attr("stroke", markerStroke).attr("stroke-width", 1.5).attr("stroke-opacity", 0.6)
        .attr("x1", (d) => xScale(new Date(d.date)))
        .attr("x2", (d) => xScale(new Date(d.date)))
        .merge(vLine)
        .transition().duration(300).ease(d3.easeCubicInOut)
        .attr("x1", (d) => xScale(new Date(d.date)))
        .attr("x2", (d) => xScale(new Date(d.date)))
        .attr("stroke-opacity", 0.6);

      // Highlight ring
      const ring = svg.selectAll<SVGCircleElement, TimelineEvent>("circle.current-ring")
        .data(markerData, (d) => d.id);
      ring.exit().transition().duration(200).attr("r", 0).remove();
      ring.enter()
        .append("circle").attr("class", "current-ring")
        .attr("cy", yCenter)
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", markerStroke).attr("stroke-width", 2)
        .attr("cx", (d) => xScale(new Date(d.date)))
        .merge(ring)
        .transition().duration(300).ease(d3.easeCubicInOut)
        .attr("cx", (d) => xScale(new Date(d.date)))
        .attr("cy", yCenter)
        .attr("r", 9);

      // Update dot highlighting (current dot gets white stroke)
      allDots
        .attr("r", (d) => {
          if (d.id === currentEventId) return 7;
          return changeEvents?.has(d.id) ? 6 : 5;
        })
        .attr("stroke", (d) => d.id === currentEventId ? dotHighlightStroke : "none")
        .attr("stroke-width", (d) => d.id === currentEventId ? 2 : 0);
    };

    updateChart();

    const ro = new ResizeObserver(updateChart);
    ro.observe(container);

    return () => ro.disconnect();
  }, [events, currentEventId, threadColors, onEventClick, theme, changeEvents]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "56px", position: "relative" }}>
      <svg ref={svgRef} style={{ display: "block", width: "100%", height: "56px" }} />
      <div
        ref={tooltipRef}
        className="timeline-tooltip"
        style={{
          position: "fixed",
          background: theme === "light" ? "#ffffff" : "#1f2937",
          color: theme === "light" ? "#18181b" : "#f3f4f6",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "11px",
          lineHeight: "1.4",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.15s",
          zIndex: 9999,
          whiteSpace: "nowrap",
          boxShadow: theme === "light" ? "0 4px 12px rgba(0,0,0,0.12)" : "0 4px 12px rgba(0,0,0,0.4)",
          border: theme === "light" ? "1px solid #e4e4e7" : "none",
        }}
      />
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default SimpleTimeline;
