import { useReducer, useCallback, useEffect, useMemo, useState } from "react";
import { SimpleTimeline } from "./SimpleTimeline";
import { WordCloudGestalt } from "./WordCloudGestalt";
import { PresentationIndex } from "./PresentationIndex";
import { SlideViewport } from "./SlideViewport";
import type { PresentationData, StorylineStep } from "./types";

interface PresentationState {
  currentStepIndex: number;
  maxSteps: number;
}

type PresentationAction =
  | { type: "GOTO_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "FIRST_STEP" }
  | { type: "LAST_STEP" };

function createReducer(maxSteps: number) {
  return function reducer(state: PresentationState, action: PresentationAction): PresentationState {
    switch (action.type) {
      case "GOTO_STEP":
        return { ...state, currentStepIndex: Math.max(0, Math.min(action.payload, maxSteps - 1)) };
      case "NEXT_STEP":
        return { ...state, currentStepIndex: Math.min(state.currentStepIndex + 1, maxSteps - 1) };
      case "PREV_STEP":
        return { ...state, currentStepIndex: Math.max(state.currentStepIndex - 1, 0) };
      case "FIRST_STEP":
        return { ...state, currentStepIndex: 0 };
      case "LAST_STEP":
        return { ...state, currentStepIndex: maxSteps - 1 };
      default:
        return state;
    }
  };
}

interface GestaltPresentationProps {
  data: PresentationData;
  /** Zero-based storyline index from URL ?slide=N (parsed server-side for hydration). */
  initialSlideIndex?: number;
}

function clampSlideIndex(index: number, maxSteps: number): number {
  if (maxSteps <= 0) return 0;
  return Math.max(0, Math.min(index, maxSteps - 1));
}

function parseSlideIndexFromSearch(search: string, maxSteps: number): number {
  const params = new URLSearchParams(search);
  const raw = params.get("slide") ?? params.get("step");
  if (raw === null) return 0;
  const n = parseInt(raw, 10);
  if (isNaN(n)) return 0;
  return clampSlideIndex(n, maxSteps);
}

export function GestaltPresentation({ data, initialSlideIndex = 0 }: GestaltPresentationProps) {
  const maxSteps = data.storyline.length;
  const reducer = useMemo(() => createReducer(maxSteps), [maxSteps]);
  const initialIndex = clampSlideIndex(initialSlideIndex, maxSteps);

  const [state, dispatch] = useReducer(reducer, {
    currentStepIndex: initialIndex,
    maxSteps,
  });
  const { currentStepIndex } = state;
  const [changeEvents, setChangeEvents] = useState<Set<string>>(new Set());
  const [urlReady, setUrlReady] = useState(false);

  // Client fallback: honor ?slide= after hydration if prop was not passed correctly.
  useEffect(() => {
    const fromUrl = parseSlideIndexFromSearch(window.location.search, maxSteps);
    if (fromUrl !== initialIndex) {
      dispatch({ type: "GOTO_STEP", payload: fromUrl });
    }
    setUrlReady(true);
  }, [maxSteps, initialIndex]);

  // Sync current slide to URL parameter (without page reload)
  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(currentStepIndex));
    url.searchParams.delete("step");
    window.history.replaceState({}, "", url.toString());
  }, [currentStepIndex, urlReady]);

  // Derived state
  const currentEventId = useMemo(() => {
    if (currentStepIndex < 0 || currentStepIndex >= data.storyline.length) return null;
    return data.storyline[currentStepIndex].timelineAnchor;
  }, [currentStepIndex, data.storyline]);

  const currentSlide = useMemo(() => {
    if (currentStepIndex < 0 || currentStepIndex >= data.storyline.length) return null;
    const slideId = data.storyline[currentStepIndex].slideId;
    return data.slides.find((s) => s.id === slideId) || null;
  }, [currentStepIndex, data.storyline, data.slides]);

  const handleStepClick = useCallback(
    (index: number) => {
      dispatch({ type: "GOTO_STEP", payload: index });
    },
    []
  );

  const handleEventChange = useCallback(
    (eventId: string) => {
      // Find step index that matches this timelineAnchor
      const stepIndex = data.storyline.findIndex((s) => s.timelineAnchor === eventId);
      if (stepIndex >= 0) {
        dispatch({ type: "GOTO_STEP", payload: stepIndex });
      }
    },
    [data.storyline]
  );

  const handleCacheReady = useCallback((events: Set<string>) => {
    setChangeEvents(events);
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          dispatch({ type: "NEXT_STEP" });
          break;
        case "ArrowLeft":
          e.preventDefault();
          dispatch({ type: "PREV_STEP" });
          break;
        case "Home":
          e.preventDefault();
          dispatch({ type: "FIRST_STEP" });
          break;
        case "End":
          e.preventDefault();
          dispatch({ type: "LAST_STEP" });
          break;
        case "f":
        case "F":
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="gestalt-presentation">
      {/* Top: Presentation Index */}
      <div className="gestalt-presentation__top">
        <PresentationIndex
          storyline={data.storyline}
          currentStepIndex={currentStepIndex}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Left: Word Cloud */}
      <div className="gestalt-presentation__left">
        <WordCloudGestalt
          terms={data.gestaltTerms}
          timeline={data.timeline}
          currentEventId={currentEventId}
          threadColors={data.threadColors}
          compact
          onCacheReady={handleCacheReady}
          transitionDuration={600}
        />
      </div>

      {/* Right: Slide Viewport */}
      <div className="gestalt-presentation__right">
        <SlideViewport
          slide={currentSlide}
          currentEventId={currentEventId}
          timeline={data.timeline}
        />
      </div>

      {/* Bottom: Timeline */}
      <div className="gestalt-presentation__bottom">
        <SimpleTimeline
          events={data.timeline}
          currentEventId={currentEventId}
          threadColors={data.threadColors}
          onEventClick={handleEventChange}
          changeEvents={changeEvents}
          theme="light"
        />
      </div>
    </div>
  );
}

export default GestaltPresentation;
