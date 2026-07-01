import { useReducer, useCallback, useEffect, useMemo, useState } from "react";
import { SimpleTimeline } from "./SimpleTimeline";
import { WordCloudGestalt } from "./WordCloudGestalt";
import { PresentationIndex } from "./PresentationIndex";
import { SlideViewport } from "./SlideViewport";
import type { PresentationData, TimelineEvent } from "./types";
import type { DualTrackPresentation, DualTrackSlide, StoryStep, SlideStoryAnchor } from "./types-v2";
import { fromLegacyPresentationData } from "./adapt-legacy";

interface DualTrackState {
  slideIndex: number;
  storyIndex: number;
}

type DualTrackAction =
  | { type: "GOTO_SLIDE"; payload: number }
  | { type: "GOTO_STORY"; payload: number }
  | { type: "NEXT_SLIDE" }
  | { type: "PREV_SLIDE" }
  | { type: "NEXT_STORY" }
  | { type: "PREV_STORY" }
  | { type: "FIRST_SLIDE" }
  | { type: "LAST_SLIDE" }
  | { type: "SYNC_FROM_URL"; payload: { slideIndex: number; storyIndex: number } };

function createReducer(maxSlides: number, maxStories: number) {
  return function reducer(state: DualTrackState, action: DualTrackAction): DualTrackState {
    switch (action.type) {
      case "GOTO_SLIDE":
        return { ...state, slideIndex: Math.max(0, Math.min(action.payload, maxSlides - 1)) };
      case "GOTO_STORY":
        return { ...state, storyIndex: Math.max(0, Math.min(action.payload, maxStories - 1)) };
      case "NEXT_SLIDE": {
        const nextSlide = Math.min(state.slideIndex + 1, maxSlides - 1);
        return { ...state, slideIndex: nextSlide };
      }
      case "PREV_SLIDE": {
        const prevSlide = Math.max(state.slideIndex - 1, 0);
        return { ...state, slideIndex: prevSlide };
      }
      case "NEXT_STORY": {
        const nextStory = Math.min(state.storyIndex + 1, maxStories - 1);
        return { ...state, storyIndex: nextStory };
      }
      case "PREV_STORY": {
        const prevStory = Math.max(state.storyIndex - 1, 0);
        return { ...state, storyIndex: prevStory };
      }
      case "FIRST_SLIDE":
        return { ...state, slideIndex: 0 };
      case "LAST_SLIDE":
        return { ...state, slideIndex: maxSlides - 1 };
      case "SYNC_FROM_URL":
        return {
          slideIndex: Math.max(0, Math.min(action.payload.slideIndex, maxSlides - 1)),
          storyIndex: Math.max(0, Math.min(action.payload.storyIndex, maxStories - 1)),
        };
      default:
        return state;
    }
  };
}

interface GestaltPresentationProps {
  data: PresentationData | DualTrackPresentation;
  initialSlideIndex?: number;
  initialStoryIndex?: number;
}

function parseSlideIndexFromSearch(search: string): { slideIndex: number | null; storyIndex: number | null } {
  const params = new URLSearchParams(search);
  const slideRaw = params.get("slide");
  const storyRaw = params.get("story");
  
  let slideIndex: number | null = null;
  let storyIndex: number | null = null;
  
  if (slideRaw !== null) {
    const n = parseInt(slideRaw, 10);
    if (!isNaN(n)) slideIndex = n;
  }
  
  if (storyRaw !== null) {
    const n = parseInt(storyRaw, 10);
    if (!isNaN(n)) storyIndex = n;
  }
  
  return { slideIndex, storyIndex };
}

function syncUrl(slideIndex: number, storyIndex: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("slide", String(slideIndex));
  url.searchParams.set("story", String(storyIndex));
  window.history.replaceState({}, "", url.toString());
}

// Backwards compatible wrapper that detects legacy data and converts it
function GestaltPresentation({ data, initialSlideIndex = 0, initialStoryIndex = 0 }: GestaltPresentationProps) {
  // Detect and convert legacy data
  const presentation = useMemo(() => {
    if ("slides" in data && "story" in data && "anchors" in data) {
      return data as DualTrackPresentation;
    }
    return fromLegacyPresentationData(data as PresentationData);
  }, [data]);

  const maxSlides = presentation.slides.length;
  const maxStories = presentation.story.steps.length;
  
  const reducer = useMemo(() => createReducer(maxSlides, maxStories), [maxSlides, maxStories]);
  
  const initialSlide = Math.max(0, Math.min(initialSlideIndex ?? 0, maxSlides - 1));
  const initialStory = Math.max(0, Math.min(initialStoryIndex ?? 0, maxStories - 1));
  
  const [state, dispatch] = useReducer(reducer, {
    slideIndex: initialSlide,
    storyIndex: initialStory,
  } as DualTrackState);
  
  const { slideIndex, storyIndex } = state;
  const [changeEvents, setChangeEvents] = useState<Set<string>>(new Set());
  const [urlReady, setUrlReady] = useState(false);
  
  // Derived state
  const currentSlide = useMemo(() => {
    if (slideIndex < 0 || slideIndex >= presentation.slides.length) return null;
    return presentation.slides[slideIndex];
  }, [slideIndex, presentation.slides]);

  const currentStoryStep = useMemo(() => {
    if (storyIndex < 0 || storyIndex >= presentation.story.steps.length) return null;
    return presentation.story.steps[storyIndex];
  }, [storyIndex, presentation.story.steps]);

  // Check if current slide has an anchor to story
  const currentAnchor = useMemo(() => {
    return presentation.anchors.find(a => a.slideId === currentSlide?.id);
  }, [currentSlide, presentation.anchors]);

  // When slide changes via navigation, check if there's an anchor to also update story
  useEffect(() => {
    if (currentAnchor && currentAnchor.storyStepId) {
      const storyStepIndex = presentation.story.steps.findIndex(s => s.id === currentAnchor.storyStepId);
      if (storyStepIndex >= 0 && storyStepIndex !== storyIndex) {
        dispatch({ type: "GOTO_STORY", payload: storyStepIndex });
      }
    }
  }, [slideIndex, currentAnchor, presentation.story.steps, storyIndex]);

  // Initial URL sync after hydration
  useEffect(() => {
    const { slideIndex: urlSlide, storyIndex: urlStory } = parseSlideIndexFromSearch(window.location.search);
    
    if (urlSlide !== null || urlStory !== null) {
      dispatch({
        type: "SYNC_FROM_URL",
        payload: {
          slideIndex: urlSlide ?? initialSlide,
          storyIndex: urlStory ?? initialStory,
        },
      });
    }
    
    setUrlReady(true);
  }, []);

  // Sync to URL (without page reload)
  useEffect(() => {
    if (!urlReady) return;
    syncUrl(slideIndex, storyIndex);
  }, [slideIndex, storyIndex, urlReady]);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          dispatch({ type: "NEXT_SLIDE" });
          break;
        case "ArrowLeft":
          e.preventDefault();
          dispatch({ type: "PREV_SLIDE" });
          break;
        case "ArrowUp":
          e.preventDefault();
          dispatch({ type: "NEXT_STORY" });
          break;
        case "ArrowDown":
          e.preventDefault();
          dispatch({ type: "PREV_STORY" });
          break;
        case "Home":
          e.preventDefault();
          dispatch({ type: "FIRST_SLIDE" });
          break;
        case "End":
          e.preventDefault();
          dispatch({ type: "LAST_SLIDE" });
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

  // UI interaction tracking for fade-out
  const [navActive, setNavActive] = useState(true);
  
  useEffect(() => {
    if (!navActive) {
      setNavActive(true);
    }
    const timeout = setTimeout(() => {
      setNavActive(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [slideIndex, storyIndex]);

  // Handle timeline event change
  const handleEventChange = useCallback((eventId: string) => {
    const storyStepIndex = presentation.story.steps.findIndex(s => s.id === eventId);
    if (storyStepIndex >= 0) {
      dispatch({ type: "GOTO_STORY", payload: storyStepIndex });
      
      // Also find slide for this story step (first matching anchor)
      const anchor = presentation.anchors.find(a => a.storyStepId === eventId);
      if (anchor) {
        const slideIndex = presentation.slides.findIndex(s => s.id === anchor.slideId);
        if (slideIndex >= 0) {
          dispatch({ type: "GOTO_SLIDE", payload: slideIndex });
        }
      }
    }
  }, [presentation]);

  // Handle step click in index
  const handleStepClick = useCallback((index: number) => {
    dispatch({ type: "GOTO_SLIDE", payload: index });
  }, []);

  // Word cloud needs legacy-compatible data
  const wordCloudProps = useMemo(() => {
    // Map story steps back to TimelineEvent shape for WordCloudGestalt
    const timelineEvents = presentation.story.steps.map((step) => ({
      id: step.id,
      date: step.date || `step-${step.id}`,
      label: step.label,
      thread: (step.thread as any) || "default",
      conceptsAdded: step.conceptsAdded,
      conceptsFading: step.conceptsFaded,
    }));

    // Build GestaltTerm array from all accumulated concepts
    const termMap = new Map<string, { term: string; weight: number; appearedAt: string; thread: string; fadedAt?: string }>();
    
    presentation.story.steps.forEach((step, idx) => {
      step.conceptsAdded?.forEach((term) => {
        termMap.set(term, {
          term,
          weight: 1.0,
          appearedAt: step.id,
          thread: step.thread || "default",
          fadedAt: undefined,
        });
      });
      
      step.conceptsFaded?.forEach((term) => {
        if (termMap.has(term)) {
          termMap.get(term)!.fadedAt = step.id;
        }
      });
    });

    const terms = Array.from(termMap.values());

    const currentEventId = currentStoryStep?.id || null;

    return { terms, timelineEvents, currentEventId };
  }, [presentation, currentStoryStep]);

  const theme = "light" as const;

  // Intent popup state
  const [intentVisible, setIntentVisible] = useState(false);
  const currentIntent = currentSlide && "intent" in currentSlide ? currentSlide.intent : undefined;
  const currentSlideTitle = currentSlide?.title || "";

  return (
    <div className="gestalt-presentation">
      {/* Top: Presentation Index */}
      <div className="gestalt-presentation__top">
        <PresentationIndex
          slides={presentation.slides}
          currentSlideIndex={slideIndex}
          onSlideClick={handleStepClick}
        />
      </div>

      {/* Left: Word Cloud */}
      <div className="gestalt-presentation__left">
        <WordCloudGestalt
          terms={wordCloudProps.terms}
          timeline={wordCloudProps.timelineEvents}
          currentEventId={wordCloudProps.currentEventId}
          threadColors={presentation.story.threadColors || {}}
          compact
          onCacheReady={setChangeEvents}
          transitionDuration={300}
        />
      </div>

      {/* Right: Slide Viewport */}
      <div className="gestalt-presentation__right" style={{ position: "relative", overflow: "hidden" }}>
        <SlideViewport
          slide={currentSlide}
          currentEventId={currentStoryStep?.id || null}
          timeline={presentation.story.steps}
        />

        {/* Slide panel overlays: position indicator + intent icon */}
        <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", pointerEvents: "none" }}>
          {/* Position indicator */}
          <div
            style={{
              fontFamily: "var(--gestalt-font-mono, monospace)",
              fontSize: "0.6rem",
              opacity: navActive ? 0.35 : 0,
              transition: "opacity 0.3s",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "3px",
            }}
          >
            {slideIndex + 1}/{maxSlides}
          </div>

          {/* Intent lightbulb with hover popup */}
          {currentIntent && (
            <div
              style={{ position: "relative", pointerEvents: "auto" }}
              onMouseEnter={() => setIntentVisible(true)}
              onMouseLeave={() => setIntentVisible(false)}
            >
              {/* Popup (appears above-left of icon) */}
              {intentVisible && (
                <div style={{
                  position: "absolute",
                  bottom: "2.75rem",
                  right: 0,
                  width: "18rem",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  zIndex: 30,
                }}>
                  <p style={{ fontWeight: 700, fontSize: "0.72rem", marginBottom: "0.35rem", color: "#18181b" }}>{currentSlideTitle}</p>
                  <p style={{ fontSize: "0.68rem", lineHeight: 1.5, color: "#52525b" }}>{currentIntent}</p>
                </div>
              )}
              {/* Icon */}
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "help",
                  opacity: intentVisible ? 0.8 : 0.4,
                  transition: "opacity 0.2s",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.04)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Timeline */}
      <div className="gestalt-presentation__bottom">
        <SimpleTimeline
          events={presentation.story.steps}
          currentEventId={currentStoryStep?.id || null}
          threadColors={presentation.story.threadColors || {}}
          onEventClick={handleEventChange}
          changeEvents={changeEvents}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default GestaltPresentation;
export { GestaltPresentation };
