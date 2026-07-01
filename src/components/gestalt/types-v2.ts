// Generic thread ID (string, no longer hardcoded)
export type ThreadId = string;

export type StoryTrackType = "timeline" | "steps" | "progression";
export type StoryVisualisation = "wordcloud" | "force-graph" | "custom";

export type SlideLayout =
  | "title-anchored"
  | "image-right"
  | "five-comps"
  | "two-column"
  | "n-plus-one"
  | "one-plus-n"
  | "audacious-goal"
  | "where-started"
  | "content-anchored";

export interface DualTrackSlide {
  id: string;
  title: string;
  type: "title" | "content" | "section" | "appendix";
  html: string;
  layout?: SlideLayout | string;
  section?: string;
  /** Slide purpose/intention annotation. Shown on hover via lightbulb icon in bottom-right. */
  intent?: string;
}

export interface StoryStep {
  id: string;
  label: string;
  date?: string;
  thread?: string;
  conceptsAdded?: string[];
  conceptsFaded?: string[];
}

export interface SlideStoryAnchor {
  slideId: string;
  storyStepId: string;
}

export interface DualTrackPresentation {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  duration?: number;

  slides: DualTrackSlide[];

  story: {
    type: StoryTrackType;
    visualisation: StoryVisualisation;
    steps: StoryStep[];
    threadColors?: Record<string, string>;
  };

  anchors: SlideStoryAnchor[];
}
