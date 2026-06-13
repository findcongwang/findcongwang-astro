import type { StrategyMapBand } from "./strategyMap";

export type ContextFacet = "what" | "why" | "who";

export type NodeTemporalState = "hidden" | "emerging" | "established" | "fading";

export interface EvolvingStrategyNode {
  id: string;
  number: number;
  band: StrategyMapBand;
  sectorIndex: number;
  label: string;
  description: string;
  details?: string;
  progress?: number;
  contextFacet?: ContextFacet;
  appearedAt: string;
  /** ISO date override for continuous scrub granularity. */
  appearedAtDate?: string;
  fadingAt?: string;
  /** ISO date override for fade threshold. */
  fadingAtDate?: string;
  removedAt?: string;
  valence?: "positive" | "negative" | "neutral";
  href?: string;
}

export interface EvolvingStrategyEdge {
  id: string;
  source: string;
  target: string;
  action: string;
}

export interface EvolvingStrategyVersion {
  id: string;
  date: string;
  label: string;
  compellingQuestion: string;
  ambition?: string;
  constraints?: string;
}

export interface EvolvingStrategyMapData {
  title: string;
  sectorLabel: string;
  bandLabels: [string, string, string, string];
  versions: EvolvingStrategyVersion[];
  nodes: EvolvingStrategyNode[];
  edges: EvolvingStrategyEdge[];
}
