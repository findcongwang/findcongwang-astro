/**
 * Temporal Strategy Map — DDes Research (Single Sector)
 *
 * This data represents the doctoral research strategy as a single-sector
 * quadrant view with temporal node states. Nodes enter and exit scope
 * as the research evolves from Dec 2025 to June 2026.
 *
 * Four bands: Context → Indicators → Tactics → Artifacts
 * Temporal states: emerging → established → fading
 */

// Reuse types from fw-vision-dataviz with temporal extension
export interface TemporalStrategyMapNode {
  id: string;
  number: number;
  band: 1 | 2 | 3 | 4;
  sectorIndex: number;
  label: string;
  description: string;
  details?: string;
  progress: number; // 0-1
  /** When this node entered scope */
  appearedAt?: string; // timeline event ID
  /** When this node began fading from active concern */
  fadingAt?: string;
  /** When fully removed */
  removedAt?: string;
  /** Goal direction */
  valence?: "positive" | "negative" | "neutral";
}

export interface TemporalStrategyMapEdge {
  id: string;
  source: string;
  target: string;
  action: string;
}

export interface TemporalStrategyMapData {
  title: string;
  sectorLabel: string;
  bandLabels: [string, string, string, string];
  nodes: TemporalStrategyMapNode[];
  edges: TemporalStrategyMapEdge[];
  /** Maps to the main presentation timeline for synchronization */
  timelineMapping: { nodeId: string; eventId: string }[];
}

/**
 * DDes Research Strategy — "Cultivating Long-Term Innovation"
 *
 * Single sector representing the doctoral research program.
 * Band 1 (Context): The problems and environment
 * Band 2 (Indicators): Evidence of progress
 * Band 3 (Tactics): Active strategies and methods
 * Band 4 (Artifacts): Deliverables and outputs
 */
export const ddesStrategyMapData: TemporalStrategyMapData = {
  title: "DDes Research Strategy — Long-Term Innovation",
  sectorLabel: "Doctoral Research Program",
  bandLabels: ["Context", "Indicators", "Tactics", "Artifacts"],

  nodes: [
    // ═══════════════════════════════════════════
    // BAND 1 — CONTEXT (Problems & Environment)
    // ═══════════════════════════════════════════
    {
      id: "ctx-knowledge-waste",
      number: 1,
      band: 1,
      sectorIndex: 0,
      label: "Knowledge Wastage",
      description: "Communities suffer systematic knowledge loss. Efforts rediscovered repeatedly. People make same mistakes without encountering previous contexts.",
      details: "Wayne's 1000+ students, 700+ ventures — invisible when he departed.",
      progress: 0.85,
      appearedAt: "ev-03",
      valence: "negative",
    },
    {
      id: "ctx-short-termism",
      number: 2,
      band: 1,
      sectorIndex: 0,
      label: "Short-Termism in Tools",
      description: "Popular business tools (BMC, SWOT, Lean) are static snapshots. Cannot hold temporal complexity or scenario portfolios.",
      details: "Decisions accumulate consequences only visible over decades.",
      progress: 0.8,
      appearedAt: "ev-02",
      valence: "negative",
    },
    {
      id: "ctx-ai-talent-drain",
      number: 3,
      band: 1,
      sectorIndex: 0,
      label: "AI Talent & Compute Gap",
      description: "Canada holds 0.6% of global AI compute. 53% of professionals relocated. Without sovereign infrastructure, dependency deepens.",
      progress: 0.7,
      appearedAt: "ev-16",
      valence: "negative",
    },
    {
      id: "ctx-innovation-fragmentation",
      number: 4,
      band: 1,
      sectorIndex: 0,
      label: "Innovation Fragmentation",
      description: "Individual innovators work in isolation. No composable collective context exists for long-term collaboration.",
      progress: 0.75,
      appearedAt: "ev-06",
      valence: "negative",
    },

    // ═══════════════════════════════════════════
    // BAND 2 — INDICATORS (Evidence of Progress)
    // ═══════════════════════════════════════════
    {
      id: "ind-cooperathon",
      number: 5,
      band: 2,
      sectorIndex: 0,
      label: "Cooperathon Phase 2 (3/5)",
      description: "Three of five research projects advanced to Cooperathon 2026 Phase 2, selected from 200+ submissions.",
      progress: 0.9,
      appearedAt: "ev-24",
      valence: "positive",
    },
    {
      id: "ind-perceptiosphere-operational",
      number: 6,
      band: 2,
      sectorIndex: 0,
      label: "Perceptiosphere Operational",
      description: "Knowledge system managing doctoral research with AI agent fleet (COS, Librarian, Researcher, Reflector).",
      progress: 0.75,
      appearedAt: "ev-19",
      valence: "positive",
    },
    {
      id: "ind-constellation-demo",
      number: 7,
      band: 2,
      sectorIndex: 0,
      label: "Constellation Demo Ready",
      description: "Knowledge succession tool demonstrated to UWaterloo stakeholders. Wayne's ECOOP course mapping in progress.",
      progress: 0.6,
      appearedAt: "ev-21",
      valence: "positive",
    },
    {
      id: "ind-thread-convergence",
      number: 8,
      band: 2,
      sectorIndex: 0,
      label: "Four Threads Converging",
      description: "HI + Ecosystems + Perceptiosphere + Meta all converging into unified Gestalt framework.",
      progress: 0.7,
      appearedAt: "ev-22",
      valence: "positive",
    },

    // ═══════════════════════════════════════════
    // BAND 3 — TACTICS (Active Strategies)
    // ═══════════════════════════════════════════
    {
      id: "tac-core-cycle",
      number: 9,
      band: 3,
      sectorIndex: 0,
      label: "CORE Cycle",
      description: "Collect → Organize → Reflect → Execute. The metabolic process for transforming raw information into curated knowledge.",
      progress: 0.8,
      appearedAt: "ev-19",
      valence: "positive",
    },
    {
      id: "tac-sovereign-collective",
      number: 10,
      band: 3,
      sectorIndex: 0,
      label: "Sovereign → Collective Composition",
      description: "Individuals maintain sovereign knowledge contexts and choose what to compose into collective layers. No mandated contribution.",
      progress: 0.65,
      appearedAt: "ev-19",
      valence: "positive",
    },
    {
      id: "tac-perpetuating-inquiry",
      number: 11,
      band: 3,
      sectorIndex: 0,
      label: "Perpetuating Inquiry",
      description: "Long-term innovation is the act of continually identifying and articulating challenges, not just solving them.",
      details: "Barry Wylant's framing, March 2026.",
      progress: 0.55,
      appearedAt: "ev-13",
      valence: "positive",
    },
    {
      id: "tac-scoping-exercise",
      number: 12,
      band: 3,
      sectorIndex: 0,
      label: "Scoping Exercise as Method",
      description: "Six months of parallel exploration framed as deliberate methodical exploration, not indecision.",
      details: "Barry's advice: breadth demonstrates disciplined method.",
      progress: 0.9,
      appearedAt: "ev-23",
      valence: "positive",
    },
    {
      id: "tac-temporal-injection",
      number: 13,
      band: 3,
      sectorIndex: 0,
      label: "Temporal Injection into Tools",
      description: "Making existing business tools dynamic by adding the dimension of time. BMC across scenarios. SWOT over decades.",
      progress: 0.4,
      appearedAt: "ev-17",
      valence: "positive",
    },
    {
      id: "tac-hub-blueprint",
      number: 14,
      band: 3,
      sectorIndex: 0,
      label: "Hub Blueprint (People/Playbook/Mindset/Fuel/Place)",
      description: "Five-component innovation hub model from December 2025 Winter Symposium.",
      progress: 0.5,
      appearedAt: "ev-02",
      fadingAt: "ev-24",
      valence: "neutral",
    },

    // ═══════════════════════════════════════════
    // BAND 4 — ARTIFACTS (Outputs & Deliverables)
    // ═══════════════════════════════════════════
    {
      id: "art-perceptiosphere-system",
      number: 15,
      band: 4,
      sectorIndex: 0,
      label: "Perceptiosphere System",
      description: "Operational composable knowledge with AI agent fleet, ACCESS schema, CORE cycle.",
      progress: 0.7,
      appearedAt: "ev-07",
      valence: "positive",
    },
    {
      id: "art-constellation-tool",
      number: 16,
      band: 4,
      sectorIndex: 0,
      label: "Constellation Display Tool",
      description: "Knowledge succession visualization — navigable star maps of intellectual ecosystems.",
      progress: 0.55,
      appearedAt: "ev-13",
      valence: "positive",
    },
    {
      id: "art-strategy-map",
      number: 17,
      band: 4,
      sectorIndex: 0,
      label: "Strategy Map Widget",
      description: "Four-band radial strategy visualization with sector navigation and temporal states.",
      progress: 0.65,
      appearedAt: "ev-17",
      valence: "positive",
    },
    {
      id: "art-foresight-scope",
      number: 18,
      band: 4,
      sectorIndex: 0,
      label: "Foresight Scope Tool",
      description: "Sideways hourglass / futures cone for multi-scenario exploration over long time horizons.",
      progress: 0.3,
      appearedAt: "ev-15",
      valence: "positive",
    },
    {
      id: "art-emergence-presentation",
      number: 19,
      band: 4,
      sectorIndex: 0,
      label: "Emergence Presentation System",
      description: "Temporal presentation framework with word cloud gestalt, timeline, and storylines.",
      progress: 0.6,
      appearedAt: "ev-25",
      valence: "positive",
    },
    {
      id: "art-ddes-essay",
      number: 20,
      band: 4,
      sectorIndex: 0,
      label: "DDes S26 Reflective Essay",
      description: "Published essay tracing six months of doctoral research convergence.",
      progress: 0.85,
      appearedAt: "ev-23",
      valence: "positive",
    },
    {
      id: "art-cats-cradle",
      number: 21,
      band: 4,
      sectorIndex: 0,
      label: "Cat's Cradle Framework",
      description: "Tensions between future pull, present push, and weight of past. December 2025 artifact.",
      progress: 0.8,
      appearedAt: "ev-02",
      fadingAt: "ev-13",
      valence: "neutral",
    },
  ],

  edges: [
    // Context → Indicators (problems validate through evidence)
    { id: "e-01", source: "ctx-knowledge-waste", target: "ind-constellation-demo", action: "validates" },
    { id: "e-02", source: "ctx-short-termism", target: "ind-cooperathon", action: "motivates" },
    { id: "e-03", source: "ctx-innovation-fragmentation", target: "ind-thread-convergence", action: "drives" },

    // Indicators → Tactics (evidence informs strategy)
    { id: "e-04", source: "ind-perceptiosphere-operational", target: "tac-core-cycle", action: "implements" },
    { id: "e-05", source: "ind-thread-convergence", target: "tac-sovereign-collective", action: "enables" },
    { id: "e-06", source: "ind-cooperathon", target: "tac-scoping-exercise", action: "validates" },

    // Tactics → Artifacts (strategies produce outputs)
    { id: "e-07", source: "tac-core-cycle", target: "art-perceptiosphere-system", action: "produces" },
    { id: "e-08", source: "tac-perpetuating-inquiry", target: "art-constellation-tool", action: "guides" },
    { id: "e-09", source: "tac-temporal-injection", target: "art-strategy-map", action: "produces" },
    { id: "e-10", source: "tac-temporal-injection", target: "art-foresight-scope", action: "produces" },
    { id: "e-11", source: "tac-scoping-exercise", target: "art-ddes-essay", action: "produces" },
    { id: "e-12", source: "tac-scoping-exercise", target: "art-emergence-presentation", action: "produces" },

    // Cross-band support links
    { id: "e-13", source: "art-perceptiosphere-system", target: "ind-perceptiosphere-operational", action: "demonstrates" },
    { id: "e-14", source: "art-foresight-scope", target: "tac-temporal-injection", action: "implements" },
    { id: "e-15", source: "ctx-ai-talent-drain", target: "art-foresight-scope", action: "scenario for" },
  ],

  // Link nodes to the main presentation timeline events
  timelineMapping: [
    { nodeId: "ctx-short-termism", eventId: "ev-02" },
    { nodeId: "ctx-knowledge-waste", eventId: "ev-03" },
    { nodeId: "ctx-innovation-fragmentation", eventId: "ev-06" },
    { nodeId: "ctx-ai-talent-drain", eventId: "ev-16" },
    { nodeId: "tac-hub-blueprint", eventId: "ev-02" },
    { nodeId: "tac-perpetuating-inquiry", eventId: "ev-13" },
    { nodeId: "tac-temporal-injection", eventId: "ev-17" },
    { nodeId: "tac-core-cycle", eventId: "ev-19" },
    { nodeId: "tac-sovereign-collective", eventId: "ev-19" },
    { nodeId: "tac-scoping-exercise", eventId: "ev-23" },
    { nodeId: "art-perceptiosphere-system", eventId: "ev-07" },
    { nodeId: "art-constellation-tool", eventId: "ev-13" },
    { nodeId: "art-strategy-map", eventId: "ev-17" },
    { nodeId: "art-foresight-scope", eventId: "ev-15" },
    { nodeId: "art-ddes-essay", eventId: "ev-23" },
    { nodeId: "art-emergence-presentation", eventId: "ev-25" },
    { nodeId: "art-cats-cradle", eventId: "ev-02" },
    { nodeId: "ind-perceptiosphere-operational", eventId: "ev-19" },
    { nodeId: "ind-constellation-demo", eventId: "ev-21" },
    { nodeId: "ind-cooperathon", eventId: "ev-24" },
    { nodeId: "ind-thread-convergence", eventId: "ev-22" },
  ],
};
