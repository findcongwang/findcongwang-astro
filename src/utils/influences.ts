/**
 * Influence types
 */
export const INFLUENCE_TYPES = ["precedent", "concept", "people", "book", "course"] as const;

export type InfluenceType = typeof INFLUENCE_TYPES[number];

