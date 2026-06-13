import { useEffect, useMemo, useRef, useState } from "react";
import { canvasVariantLabel, canvasZonesForVariant } from "./businessCanvasLayouts";
import type {
  BusinessCanvasData,
  BusinessCanvasFlow,
  BusinessCanvasNode,
  BusinessCanvasZone,
  CanvasVariant,
} from "./types/businessCanvas";
import "./BusinessCanvasMap.css";

const cn = {
  root: "fw-business-canvas-map",
  svg: "fw-business-canvas-map__svg",
} as const;

const HEADER_H = 52;
const ZONE_ICON_SIZE = 14;

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PositionedNode extends BusinessCanvasNode {
  rect: Rect;
}

interface PositionedFlow extends BusinessCanvasFlow {
  pathId: string;
  pathD: string;
}

export interface BusinessCanvasMapProps {
  data: BusinessCanvasData;
  /** Layout preset when `data.zones` is empty. Falls back to `data.variant`. */
  variant?: CanvasVariant;
  className?: string;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function splitTitle(title: string, maxLen = 22): string[] {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxLen || current.length === 0) {
      current = next;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) {
    lines.push(current);
  }
  return lines.slice(0, 2);
}

/** Approximate rendered width for 9px semibold labels. */
function estimateTextWidth(text: string, charWidth = 5.4): number {
  return text.length * charWidth;
}

function centerOf(rect: Rect): { x: number; y: number } {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

function zoneToRect(
  zone: BusinessCanvasZone,
  width: number,
  contentHeight: number,
  headerOffset: number
): Rect {
  return {
    x: clamp01(zone.x) * width,
    y: headerOffset + clamp01(zone.y) * contentHeight,
    width: clamp01(zone.width) * width,
    height: clamp01(zone.height) * contentHeight,
  };
}

function buildFlowPath(sourceRect: Rect, targetRect: Rect): string {
  const source = centerOf(sourceRect);
  const target = centerOf(targetRect);
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const c1x = source.x + dx * 0.35;
  const c1y = source.y + dy * 0.12;
  const c2x = source.x + dx * 0.65;
  const c2y = target.y - dy * 0.12;
  return `M ${source.x} ${source.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${target.x} ${target.y}`;
}

function zoneIconPath(zoneId: string, cx: number, cy: number, r: number): string {
  switch (zoneId) {
    case "key-partners":
      return `M ${cx - r} ${cy} L ${cx + r} ${cy} M ${cx - r * 0.5} ${cy - r * 0.4} L ${cx - r * 0.5} ${cy + r * 0.4} M ${cx + r * 0.5} ${cy - r * 0.4} L ${cx + r * 0.5} ${cy + r * 0.4}`;
    case "value-propositions":
      return `M ${cx} ${cy - r} L ${cx + r} ${cy} L ${cx} ${cy + r} L ${cx - r} ${cy} Z`;
    case "customer-segments":
      return `M ${cx - r * 0.6} ${cy - r * 0.3} a ${r * 0.35} ${r * 0.35} 0 1 0 0.01 0 M ${cx} ${cy - r * 0.35} a ${r * 0.35} ${r * 0.35} 0 1 0 0.01 0 M ${cx + r * 0.6} ${cy - r * 0.3} a ${r * 0.35} ${r * 0.35} 0 1 0 0.01 0 M ${cx - r} ${cy + r * 0.5} Q ${cx} ${cy + r * 0.2} ${cx + r} ${cy + r * 0.5}`;
    case "eco-social-benefits":
    case "ecosystem-value":
      return `M ${cx} ${cy - r * 0.8} A ${r} ${r} 0 1 0 ${cx} ${cy + r * 0.8} A ${r * 0.6} ${r * 0.6} 0 1 1 ${cx} ${cy - r * 0.8}`;
    default:
      return `M ${cx - r * 0.5} ${cy - r * 0.5} L ${cx + r * 0.5} ${cy - r * 0.5} L ${cx + r * 0.5} ${cy + r * 0.5} L ${cx - r * 0.5} ${cy + r * 0.5} Z`;
  }
}

function resolveVariant(data: BusinessCanvasData, variant?: CanvasVariant): CanvasVariant {
  return variant ?? data.variant ?? "traditional";
}

function resolveZones(data: BusinessCanvasData, variant: CanvasVariant): BusinessCanvasZone[] {
  if (data.zones.length > 0) {
    return data.zones;
  }
  return canvasZonesForVariant(variant);
}

export function BusinessCanvasMap({ data, variant: variantProp, className }: BusinessCanvasMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1180, height: 740 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const variant = resolveVariant(data, variantProp);
  const zones = useMemo(() => resolveZones(data, variant), [data, variant]);
  const canvasTitle = data.metadata?.title ?? canvasVariantLabel(variant);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setSize({
        width: Math.max(940, rect.width),
        height: Math.max(620, rect.height),
      });
    });
    ro.observe(el);
    const initialRect = el.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      setSize({
        width: Math.max(940, initialRect.width),
        height: Math.max(620, initialRect.height),
      });
    }
    return () => ro.disconnect();
  }, []);

  const layout = useMemo(() => {
    const contentHeight = size.height - HEADER_H;
    const zoneRects = new Map<string, Rect>();
    for (const zone of zones) {
      zoneRects.set(zone.id, zoneToRect(zone, size.width, contentHeight, HEADER_H));
    }

    const nodesByZone = new Map<string, BusinessCanvasNode[]>();
    for (const node of data.nodes) {
      if (!nodesByZone.has(node.zoneId)) {
        nodesByZone.set(node.zoneId, []);
      }
      nodesByZone.get(node.zoneId)!.push(node);
    }

    const positionedNodes: PositionedNode[] = [];
    const nodeRectById = new Map<string, Rect>();

    for (const zone of zones) {
      const zoneRect = zoneRects.get(zone.id);
      if (!zoneRect) continue;
      const zoneNodes = nodesByZone.get(zone.id) ?? [];
      const promptLines = zone.prompts?.length ?? 0;
      const paddingY = 26 + Math.min(promptLines, 2) * 10;
      const rowGap = 4;
      const usableWidth = Math.max(80, zoneRect.width - 16);
      const usableHeight = Math.max(40, zoneRect.height - paddingY - 6);
      const lineHeight = 10;
      const nodePadY = 5;
      const nodePadX = 8;

      let yCursor = zoneRect.y + paddingY;

      zoneNodes.forEach((node) => {
        const lines = splitTitle(node.title);
        const longestLine = lines.reduce((a, b) => (a.length >= b.length ? a : b), "");
        const textWidth = estimateTextWidth(longestLine);
        const nodeWidth = Math.min(usableWidth, Math.max(44, textWidth + nodePadX * 2));
        const nodeHeight = nodePadY * 2 + lines.length * lineHeight;
        const x = zoneRect.x + (zoneRect.width - nodeWidth) / 2;
        const rect: Rect = {
          x,
          y: yCursor,
          width: nodeWidth,
          height: nodeHeight,
        };
        yCursor += nodeHeight + rowGap;
        positionedNodes.push({ ...node, rect });
        nodeRectById.set(node.id, rect);
      });
    }

    const positionedFlows: PositionedFlow[] = [];
    data.flows.forEach((flow, index) => {
      const sourceRect = nodeRectById.get(flow.source);
      const targetRect = nodeRectById.get(flow.target);
      if (!sourceRect || !targetRect) return;
      positionedFlows.push({
        ...flow,
        pathId: `fw-bcm-flow-${index}`,
        pathD: buildFlowPath(sourceRect, targetRect),
      });
    });

    return { zoneRects, positionedNodes, positionedFlows, contentHeight };
  }, [data.flows, data.nodes, size.height, size.width, zones]);

  const relatedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const ids = new Set<string>([hoveredNodeId]);
    for (const flow of layout.positionedFlows) {
      if (flow.source === hoveredNodeId) ids.add(flow.target);
      if (flow.target === hoveredNodeId) ids.add(flow.source);
    }
    return ids;
  }, [hoveredNodeId, layout.positionedFlows]);

  const wrapperClass = className ? `${cn.root} ${className}` : cn.root;
  const meta = data.metadata;

  return (
    <div ref={containerRef} className={wrapperClass}>
      <svg
        className={cn.svg}
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={canvasTitle}
      >
        <rect className="fw-business-canvas-map__bg" width={size.width} height={size.height} />

        <g className="fw-business-canvas-map__header">
          <text className="fw-business-canvas-map__header-title" x={16} y={22}>
            {canvasTitle}
          </text>
          {meta?.designedFor !== undefined && (
            <text className="fw-business-canvas-map__header-meta" x={16} y={40}>
              Designed for: {meta.designedFor}
            </text>
          )}
          {meta?.designedBy !== undefined && (
            <text className="fw-business-canvas-map__header-meta" x={220} y={40}>
              Designed by: {meta.designedBy}
            </text>
          )}
          {meta?.date !== undefined && (
            <text className="fw-business-canvas-map__header-meta" x={420} y={40}>
              On: {meta.date}
            </text>
          )}
          {meta?.version !== undefined && (
            <text className="fw-business-canvas-map__header-meta" x={560} y={40}>
              Version: {meta.version}
            </text>
          )}
        </g>

        <g aria-hidden="true">
          {zones.map((zone) => {
            const rect = layout.zoneRects.get(zone.id);
            if (!rect) return null;
            const iconCx = rect.x + rect.width - 18;
            const iconCy = rect.y + 16;
            return (
              <g key={zone.id}>
                <rect className="fw-business-canvas-map__zone" {...rect} />
                <text className="fw-business-canvas-map__zone-title" x={rect.x + 10} y={rect.y + 16}>
                  {zone.title}
                </text>
                <path
                  className="fw-business-canvas-map__zone-icon"
                  d={zoneIconPath(zone.id, iconCx, iconCy, ZONE_ICON_SIZE / 2)}
                />
                {(zone.prompts ?? []).slice(0, 2).map((prompt, pi) => (
                  <text
                    key={`${zone.id}-prompt-${pi}`}
                    className="fw-business-canvas-map__zone-prompt"
                    x={rect.x + 10}
                    y={rect.y + 30 + pi * 11}
                  >
                    {prompt}
                  </text>
                ))}
              </g>
            );
          })}
        </g>

        <g>
          <defs>
            {layout.positionedFlows.map((flow) => (
              <path key={flow.pathId} id={flow.pathId} d={flow.pathD} />
            ))}
          </defs>
          {layout.positionedFlows.map((flow) => {
            const active =
              hoveredNodeId !== null &&
              (flow.source === hoveredNodeId || flow.target === hoveredNodeId);
            const muted = hoveredNodeId !== null && !active;
            return (
              <g key={`${flow.source}-${flow.target}-${flow.action}`}>
                <path
                  className={`fw-business-canvas-map__flow${active ? " fw-business-canvas-map__flow--critical" : ""}`}
                  d={flow.pathD}
                  style={{
                    strokeWidth: active ? 3 : 1.6,
                    strokeOpacity: muted ? 0.16 : active ? 0.95 : 0.65,
                  }}
                />
                <text className="fw-business-canvas-map__flow-label" style={{ opacity: active ? 1 : 0 }}>
                  <textPath href={`#${flow.pathId}`} startOffset="50%" textAnchor="middle">
                    {flow.action}
                  </textPath>
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {layout.positionedNodes.map((node) => {
            const active = hoveredNodeId !== null && relatedNodeIds.has(node.id);
            const muted = hoveredNodeId !== null && !relatedNodeIds.has(node.id);
            const lines = splitTitle(node.title);
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  className="fw-business-canvas-map__node"
                  {...node.rect}
                  style={{
                    fill: active ? "#e0f2fe" : "#ffffff",
                    stroke: active ? "#0d9488" : "#64748b",
                    opacity: muted ? 0.24 : 1,
                  }}
                />
                {lines.map((line, index) => (
                  <text
                    key={`${node.id}-line-${line}`}
                    className="fw-business-canvas-map__node-label"
                    x={node.rect.x + node.rect.width / 2}
                    y={node.rect.y + 11 + index * 10}
                    textAnchor="middle"
                    style={{ opacity: muted ? 0.24 : 1 }}
                  >
                    {line}
                  </text>
                ))}
                <title>{node.detailedDescription ?? node.briefDescription ?? node.title}</title>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
