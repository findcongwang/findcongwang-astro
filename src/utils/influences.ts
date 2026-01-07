/**
 * Influence types
 */
export const INFLUENCE_TYPES = [
    "people", "program", "channel", 
    "book", "video", "course", "paper", "precedent", "concept"
] as const;

export type InfluenceType = typeof INFLUENCE_TYPES[number];

