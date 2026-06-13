import { useState, useEffect, type ReactNode } from "react";
import type { SlideContent, TimelineEvent } from "./types";
import { ForesightScope } from "./ForesightScope";
import { StrategyMapSector } from "./StrategyMapSector";
import { ConvergenceRope } from "./ConvergenceRope";
import { sovereignAiData } from "./data/foresight-sovereign-ai";
import { ddesStrategyMapData } from "./data/strategy-map-ddes";

interface SlideViewportProps {
  slide: SlideContent | null;
  currentEventId?: string | null;
  timeline?: TimelineEvent[];
}

function renderSlideWidget(
  slideId: string,
  currentEventId: string | null,
  timeline: TimelineEvent[]
): ReactNode | null {
  switch (slideId) {
    case "slide-demo-foresight":
      return <ForesightScope data={sovereignAiData} />;
    case "slide-demo-temporal":
    case "slide-demo-strategy-map":
      return (
        <StrategyMapSector
          data={ddesStrategyMapData}
          currentEventId={currentEventId}
          timeline={timeline}
        />
      );
    case "slide-convergence":
      return <ConvergenceRope />;
    default:
      return null;
  }
}

export function SlideViewport({
  slide,
  currentEventId = null,
  timeline = [],
}: SlideViewportProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (slide) {
      setKey((prev) => prev + 1);
    }
  }, [slide?.id]);

  if (!slide) return null;

  const getSlideClass = () => {
    if (slide.layout === "title-anchored") return "";
    switch (slide.type) {
      case "title":
        return "gestalt-slide--title";
      case "quote":
        return "gestalt-slide--quote";
      case "section-break":
        return "gestalt-slide--section-break";
      case "demo":
        return "gestalt-slide--demo";
      default:
        return "";
    }
  };

  const widget = renderSlideWidget(slide.id, currentEventId, timeline);
  const layoutClass = slide.layout ? `gestalt-slide--layout-${slide.layout}` : "";

  return (
    <div
      key={key}
      className={`gestalt-slide viewport-slide ${getSlideClass()} ${layoutClass}`.trim()}
      style={{
        transition: "opacity 300ms ease-in-out",
        opacity: slide ? 1 : 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="gestalt-slide__content"
        dangerouslySetInnerHTML={{ __html: slide.html }}
        style={{ margin: "0 auto", height: widget ? "auto" : "100%" }}
      />
      {widget && <div className="gestalt-slide__widget">{widget}</div>}
    </div>
  );
}

export default SlideViewport;
