/** Integer band index from center outward (1 = innermost). */
export type StrategyMapBand = 1 | 2 | 3 | 4;

export interface StrategyMapNode {
  id: string;
  /** Display index on the map and in the legend (unique per dataset). */
  number: number;
  /** Normalized completion value in range [0, 1]. */
  progress?: number;
  band: StrategyMapBand;
  /** Original sector from data; layout may derive a stable index from `number` when sector count changes. */
  sectorIndex: number;
  label: string;
  description: string;
  details?: string;
}

export interface StrategyMapBandDefinition {
  band: StrategyMapBand;
  name: string;
  description: string;
}

/** Directed support link between nodes (see StrategyMap layout rules). */
export interface StrategyMapEdge {
  id: string;
  source: string;
  target: string;
  /** Short verb shown on the edge, like ConceptMap link actions. */
  action: string;
}

/** Relative radial thickness of the four bands (normalized internally). Default emphasizes tactics & artifacts. */
export type StrategyMapBandWeights = readonly [number, number, number, number];
