import type { PresentationData } from "./types";
import type { DualTrackPresentation, StoryStep, SlideStoryAnchor } from "./types-v2";

export function fromLegacyPresentationData(data: PresentationData): DualTrackPresentation {
  // Map timeline events to story steps
  const storySteps: StoryStep[] = data.timeline.map((event) => ({
    id: event.id,
    label: event.label,
    date: event.date,
    thread: event.thread,
    conceptsAdded: event.conceptsAdded,
    conceptsFaded: event.conceptsFading,
  }));

  // Create a map from timeline event id to story step index
  const timelineToStoryIndex = new Map<string, number>();
  storySteps.forEach((step, index) => {
    timelineToStoryIndex.set(step.id, index);
  });

  // Map storyline entries to anchors
  const anchors: SlideStoryAnchor[] = data.storyline.map((step) => {
    const storyStepIndex = timelineToStoryIndex.get(step.timelineAnchor);
    if (storyStepIndex === undefined) {
      console.warn(`Timeline anchor "${step.timelineAnchor}" not found in timeline for storyline step "${step.id}"`);
      return { slideId: step.slideId, storyStepId: storySteps[0]?.id || "" };
    }
    return { slideId: step.slideId, storyStepId: storySteps[storyStepIndex].id };
  });

  // Map slides directly, adding section from storyline
  const slideSectionMap = new Map<string, string | undefined>();
  data.storyline.forEach((step) => {
    slideSectionMap.set(step.slideId, step.section);
  });

  const slides: DualTrackSlide[] = data.slides.map((slide) => ({
    ...slide,
    type: slide.type as "title" | "content" | "section" | "appendix",
    section: slideSectionMap.get(slide.id),
  }));

  return {
    title: data.title,
    subtitle: data.subtitle,
    author: data.author,
    date: data.date,
    duration: data.duration,

    slides,

    story: {
      type: "timeline",
      visualisation: "wordcloud",
      steps: storySteps,
      threadColors: data.threadColors,
    },

    anchors,
  };
}
