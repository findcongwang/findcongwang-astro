export type ThreadId = "meta" | "hybrid-intelligence" | "ecosystems" | "perceptiosphere";

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  thread: ThreadId;
  conceptsAdded?: string[];
  conceptsFading?: string[];
}

export interface GestaltTerm {
  term: string;
  weight: number;
  appearedAt: string;
  fadedAt?: string;
  /** Timeline events to remain visible after fadedAt before removal (default 2) */
  fadeGraceEvents?: number;
  thread: ThreadId;
}

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

export interface SlideContent {
  id: string;
  title: string;
  html: string;
  type?: "title" | "content" | "demo" | "quote" | "section-break";
  layout?: SlideLayout;
}

export interface StorylineStep {
  id: string;
  title: string;
  slideId: string;
  timelineAnchor: string;
  section?: string;
}

export interface PresentationData {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  duration: number;
  timeline: TimelineEvent[];
  gestaltTerms: GestaltTerm[];
  storyline: StorylineStep[];
  slides: SlideContent[];
  threadColors: Record<ThreadId, string>;
}
