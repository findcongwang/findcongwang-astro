/**
 * ForesightScope — Type Definitions
 *
 * Data model for the sideways hourglass / futures cone visualization.
 * Time flows left (past) → center (present) → right (futures).
 * Shape is dynamic: width adapts to number of branches at each time point.
 */

export interface ForesightEvent {
  id: string;
  date: string; // ISO date
  label: string;
  type: "milestone" | "decision" | "inflection" | "crisis";
}

export interface ForesightBranch {
  id: string;
  label: string;
  description: string;
  /** Date when this branch diverges (futures) or begins converging (histories) */
  branchDate: string;
  /** Optional: when branch resolves, merges, or becomes irrelevant */
  endDate?: string;
  /** Parent branch ID — this branch depends on / splits from another */
  dependsOn?: string;
  /** Confidence/probability (0-1) — affects line thickness and opacity */
  confidence: number;
  /** Optional color override (otherwise auto-assigned from palette) */
  color?: string;
  /** Valence: is this a desirable or undesirable scenario? */
  valence?: "positive" | "negative" | "neutral";
  /** Key events along this branch */
  events: ForesightEvent[];
}

export interface ForesightScopeData {
  title: string;
  description: string;
  /** The convergence/pinch point — "now" */
  presentDate: string;
  /** Full time range of the visualization */
  timeRange: { start: string; end: string };
  /** The main timeline thread (center horizontal line through the hourglass) */
  mainThread: ForesightEvent[];
  /** Historical branches — left side, converging toward present */
  histories: ForesightBranch[];
  /** Future scenario branches — right side, diverging from present */
  futures: ForesightBranch[];
  /** Color palette for auto-assigning branch colors */
  palette?: string[];
}
