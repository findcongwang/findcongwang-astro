import { useState, useCallback } from "react";
import { SimpleTimeline } from "./SimpleTimeline";
import { WordCloudGestalt } from "./WordCloudGestalt";
import type { PresentationData } from "./types";

interface GestaltExplorerProps {
  data: PresentationData;
  currentEventId?: string;
  onEventChange?: (eventId: string) => void;
}

export function GestaltExplorer({ data, currentEventId: propCurrentEventId, onEventChange }: GestaltExplorerProps) {
  const defaultEventId =
    propCurrentEventId ??
    (data.timeline.length > 0 ? data.timeline[data.timeline.length - 1]!.id : null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(defaultEventId);
  const [changeEvents, setChangeEvents] = useState<Set<string>>(new Set());

  const handleEventChange = useCallback(
    (eventId: string) => {
      setCurrentEventId(eventId);
      onEventChange?.(eventId);
    },
    [onEventChange]
  );

  const handleEventClick = useCallback(
    (eventId: string) => {
      handleEventChange(eventId);
    },
    [handleEventChange]
  );

  const handleCacheReady = useCallback((events: Set<string>) => {
    setChangeEvents(events);
  }, []);

  return (
    <div className="gestalt-explorer" style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <div className="gestalt-explorer__cloud" style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <WordCloudGestalt
          terms={data.gestaltTerms}
          timeline={data.timeline}
          currentEventId={currentEventId}
          threadColors={data.threadColors}
          onCacheReady={handleCacheReady}
          transitionDuration={300}
        />
      </div>
      <div className="gestalt-explorer__timeline" style={{ height: "56px", width: "100%", position: "relative" }}>
        <SimpleTimeline
          events={data.timeline}
          currentEventId={currentEventId}
          threadColors={data.threadColors}
          onEventClick={handleEventClick}
          changeEvents={changeEvents}
          theme="light"
        />
      </div>
    </div>
  );
}

export default GestaltExplorer;
