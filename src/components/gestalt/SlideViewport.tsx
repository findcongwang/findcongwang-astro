import { useState, useEffect, type ReactNode } from "react";
import type { SlideContent, TimelineEvent } from "./types";
import type { DualTrackSlide, StoryStep } from "./types-v2";
import { ForesightScope } from "./ForesightScope";
import { GestaltStrategyMapSlide } from "./GestaltStrategyMapSlide";
import { GestaltBusinessCanvasSlide } from "./GestaltBusinessCanvasSlide";
import { ConvergenceRope } from "./ConvergenceRope";
import { prosperityForesightData } from "./data/foresight-prosperity";
import { sovereignAiData } from "./data/foresight-sovereign-ai";

interface SlideViewportProps {
  slide: (SlideContent & { intent?: string }) | DualTrackSlide | null;
  currentEventId?: string | null;
  timeline?: (TimelineEvent | StoryStep)[];
}

function renderSlideWidget(
  slideId: string,
  _currentEventId: string | null,
  _timeline: (TimelineEvent | StoryStep)[]
): ReactNode | null {
  switch (slideId) {
    case "slide-demo-foresight":
      return <ForesightScope data={sovereignAiData} />;
    case "slide-pathway":
      return <ForesightScope data={prosperityForesightData} />;
    case "slide-demo-strategy-map":
      return <GestaltStrategyMapSlide />;
    case "slide-demo-temporal":
      return <GestaltBusinessCanvasSlide />;
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="gestalt-slide__content"
        dangerouslySetInnerHTML={{ __html: slide.html }}
        style={{ height: widget ? "auto" : undefined }}
      />
      {widget && <div className="gestalt-slide__widget">{widget}</div>}
    </div>
  );
}

export default SlideViewport;
