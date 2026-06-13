/**
 * ForesightScope — Type Definitions
 *
 * History tube (constant cross-section) converges at Now; future cone expands right.
 * Horizons are elliptical cross-sections with nested probability bands.
 */

export interface ForesightEvent {
  id: string;
  date: string;
  label: string;
  type: "milestone" | "decision" | "inflection" | "crisis";
}

export type DriverCategory = "technological" | "political" | "economic" | "social";
export type TechnologyMaturity = "current" | "emerging" | "hypothetical";

export interface ForesightDriver {
  id: string;
  label: string;
  category: DriverCategory;
  /** Position on cross-section perimeter or angle in degrees */
  position: "top" | "right" | "bottom" | "left" | number;
}

export interface ForesightEra {
  id: string;
  date: string;
  label: string;
  crossSection?: { drivers: ForesightDriver[] };
}

export interface ForesightScenario {
  id: string;
  label: string;
  description: string;
  horizonId: string;
  /** 0 = innermost (most probable) */
  bandIndex: number;
  /** Angular offset on cross-section in degrees */
  angle?: number;
  color?: string;
}

export interface ForesightHorizon {
  id: string;
  date: string;
  label: string;
  bands: number;
  bandLabels?: string[];
}

export interface ForesightBranch {
  id: string;
  label: string;
  description: string;
  branchDate: string;
  endDate?: string;
  dependsOn?: string;
  confidence: number;
  color?: string;
  valence?: "positive" | "negative" | "neutral";
  events: ForesightEvent[];
}

export interface ForesightScopeData {
  title: string;
  description: string;
  presentDate: string;
  timeRange: { start: string; end: string };
  mainThread: ForesightEvent[];
  /** Future cross-sections (required for bowtie render) */
  horizons: ForesightHorizon[];
  /** Scenarios placed on horizon rings */
  scenarios: ForesightScenario[];
  /** Past era markers and optional PEST cross-sections */
  eras?: ForesightEra[];
  /** PEST driver ring at the Now cross-section */
  presentCrossSection?: { drivers: ForesightDriver[] };
  coneLabels?: { growth: string; crisis: string };
  palette?: string[];
  /** @deprecated Not rendered as curves in bowtie mode */
  histories?: ForesightBranch[];
  /** @deprecated Not rendered as curves in bowtie mode */
  futures?: ForesightBranch[];
  /** Render legacy branch paths (default false) */
  showBranchPaths?: boolean;
}

export const DRIVER_COLORS: Record<DriverCategory, string> = {
  technological: "#2563eb",
  political: "#16a34a",
  economic: "#ca8a04",
  social: "#db2777",
};

export const TECHNOLOGY_COLORS: Record<TechnologyMaturity, string> = {
  current: "#1e3a8a",
  emerging: "#3b82f6",
  hypothetical: "#8b5cf6",
};

export const SCENARIO_DEFAULT_COLOR = "#7f1d1d";
