import type { ForesightScopeData } from "../types-foresight";

/**
 * Sovereign AI & Distributed Energy — 50-Year Foresight Scenario
 *
 * This data represents Canada's potential trajectories for AI sovereignty,
 * energy infrastructure, and compute independence from 2020 to 2075.
 *
 * Based on DDes research: Canada holds 0.6% of global AI supercomputing,
 * 53% of AI professionals relocated to US firms, AI startup funding fell 30%.
 * Without sovereign compute, every AI workload routes through foreign cloud.
 */
export const sovereignAiData: ForesightScopeData = {
  title: "Sovereign AI & Distributed Energy — Canada 50-Year Outlook",
  description: "Multi-scenario exploration of Canadian AI sovereignty, energy infrastructure, and compute independence trajectories from present conditions to 2075.",
  presentDate: "2026-06-01",
  timeRange: { start: "2020-01-01", end: "2075-12-31" },

  palette: [
    "#10b981", // emerald — positive scenarios
    "#0ea5e9", // sky — technological
    "#f59e0b", // amber — cautionary
    "#ef4444", // red — negative
    "#8b5cf6", // violet — transformative
    "#6366f1", // indigo — policy
  ],

  // Main timeline: key real events and near-term certainties
  mainThread: [
    { id: "mt-01", date: "2020-03-01", label: "COVID accelerates remote/digital", type: "inflection" },
    { id: "mt-02", date: "2022-11-01", label: "ChatGPT launches — AI mainstream", type: "inflection" },
    { id: "mt-03", date: "2023-06-01", label: "Canada AI funding drops 30%", type: "crisis" },
    { id: "mt-04", date: "2024-01-01", label: "53% AI talent relocated to US", type: "crisis" },
    { id: "mt-05", date: "2025-03-01", label: "0.6% global AI compute share", type: "milestone" },
    { id: "mt-06", date: "2026-01-01", label: "AIAC sovereign compute report", type: "decision" },
    { id: "mt-07", date: "2026-06-01", label: "Present — decision window open", type: "milestone" },
    { id: "mt-08", date: "2028-01-01", label: "First sovereign data centers (if funded)", type: "decision" },
    { id: "mt-09", date: "2035-01-01", label: "Energy grid modernization complete (baseline)", type: "milestone" },
    { id: "mt-10", date: "2050-01-01", label: "Net-zero commitment deadline", type: "milestone" },
  ],

  // Historical branches — what led to the current pinch point
  histories: [
    {
      id: "hist-01",
      label: "Brain Drain Acceleration",
      description: "Systemic loss of AI talent to US firms due to compensation gaps and compute access.",
      branchDate: "2021-01-01",
      endDate: "2026-06-01",
      confidence: 0.95,
      valence: "negative",
      events: [
        { id: "h1-01", date: "2021-06-01", label: "FAANG remote hiring opens Canadian pipeline", type: "inflection" },
        { id: "h1-02", date: "2023-01-01", label: "Vector Institute alumni: 60% leave Canada", type: "milestone" },
        { id: "h1-03", date: "2024-09-01", label: "UWaterloo CS: half of grads take US offers", type: "milestone" },
      ],
    },
    {
      id: "hist-02",
      label: "Cloud Dependency Lock-in",
      description: "Canadian institutions defaulted to US hyperscalers for AI workloads, creating structural dependency.",
      branchDate: "2020-06-01",
      endDate: "2026-06-01",
      confidence: 0.9,
      valence: "negative",
      events: [
        { id: "h2-01", date: "2020-09-01", label: "Government cloud-first mandates (AWS/Azure)", type: "decision" },
        { id: "h2-02", date: "2022-03-01", label: "Healthcare AI on US infrastructure", type: "crisis" },
        { id: "h2-03", date: "2025-01-01", label: "Data sovereignty concerns raised in Parliament", type: "decision" },
      ],
    },
    {
      id: "hist-03",
      label: "Clean Energy Advantage (Unrealized)",
      description: "Canada's hydroelectric surplus positioned it uniquely for energy-intensive AI compute, but no policy connected them.",
      branchDate: "2020-01-01",
      endDate: "2026-06-01",
      confidence: 0.85,
      valence: "neutral",
      events: [
        { id: "h3-01", date: "2021-01-01", label: "Quebec hydro surplus grows to 40TWh", type: "milestone" },
        { id: "h3-02", date: "2023-06-01", label: "BC/Manitoba/Quebec: cheapest clean power globally", type: "milestone" },
        { id: "h3-03", date: "2025-09-01", label: "No federal AI-energy integration policy", type: "crisis" },
      ],
    },
  ],

  // Future scenario branches — diverging from present
  futures: [
    {
      id: "fut-01",
      label: "Sovereign Compute Corridor",
      description: "Canada builds a coast-to-coast sovereign AI compute network powered by provincial hydro surplus, attracting talent back and establishing data sovereignty.",
      branchDate: "2027-01-01",
      endDate: "2055-01-01",
      confidence: 0.45,
      valence: "positive",
      color: "#10b981",
      events: [
        { id: "f1-01", date: "2027-06-01", label: "Federal AI Sovereignty Act passed", type: "decision" },
        { id: "f1-02", date: "2029-01-01", label: "First sovereign GPU cluster (Montreal)", type: "milestone" },
        { id: "f1-03", date: "2032-01-01", label: "Talent repatriation begins (15% return)", type: "inflection" },
        { id: "f1-04", date: "2040-01-01", label: "5% global AI compute (10x current)", type: "milestone" },
        { id: "f1-05", date: "2050-01-01", label: "Canadian AI models competitive globally", type: "milestone" },
      ],
    },
    {
      id: "fut-02",
      label: "Provincial Fragmentation",
      description: "Provinces compete rather than collaborate; Quebec, Ontario, BC each build incompatible systems. No national coherence.",
      branchDate: "2027-06-01",
      endDate: "2045-01-01",
      confidence: 0.6,
      valence: "negative",
      color: "#f59e0b",
      events: [
        { id: "f2-01", date: "2027-09-01", label: "Quebec announces solo AI strategy", type: "decision" },
        { id: "f2-02", date: "2030-01-01", label: "3 incompatible provincial clouds", type: "crisis" },
        { id: "f2-03", date: "2035-01-01", label: "Cross-border data flows still unresolved", type: "crisis" },
        { id: "f2-04", date: "2040-01-01", label: "Compute share stagnates at 1.5%", type: "milestone" },
      ],
    },
    {
      id: "fut-03",
      label: "Deep Dependency (Status Quo)",
      description: "No significant policy intervention. Brain drain continues, dependency deepens, sovereignty becomes impossible to recover.",
      branchDate: "2026-06-01",
      confidence: 0.7,
      valence: "negative",
      color: "#ef4444",
      events: [
        { id: "f3-01", date: "2028-01-01", label: "AI talent loss accelerates to 70%", type: "crisis" },
        { id: "f3-02", date: "2033-01-01", label: "All major Canadian AI startups acquired by US", type: "crisis" },
        { id: "f3-03", date: "2040-01-01", label: "Canada classified as 'AI consumer' nation", type: "milestone" },
        { id: "f3-04", date: "2050-01-01", label: "Critical infrastructure dependent on foreign AI", type: "crisis" },
      ],
    },
    {
      id: "fut-04",
      label: "Distributed Energy-AI Symbiosis",
      description: "Novel model: distributed small-scale compute at energy generation sites (dams, wind farms), creating a unique competitive advantage.",
      branchDate: "2029-01-01",
      dependsOn: "fut-01",
      endDate: "2065-01-01",
      confidence: 0.3,
      valence: "positive",
      color: "#8b5cf6",
      events: [
        { id: "f4-01", date: "2029-06-01", label: "First dam-side compute facility (Churchill Falls)", type: "milestone" },
        { id: "f4-02", date: "2035-01-01", label: "Edge AI at 50 generation sites", type: "milestone" },
        { id: "f4-03", date: "2045-01-01", label: "Energy-compute coupling creates new export model", type: "inflection" },
        { id: "f4-04", date: "2060-01-01", label: "Global model: distributed sovereign compute", type: "milestone" },
      ],
    },
    {
      id: "fut-05",
      label: "Arctic Data Sovereignty",
      description: "Northern geography used for natural cooling of compute centers; Arctic sovereignty claims extended to data sovereignty.",
      branchDate: "2032-01-01",
      dependsOn: "fut-01",
      confidence: 0.2,
      valence: "positive",
      color: "#0ea5e9",
      events: [
        { id: "f5-01", date: "2032-06-01", label: "Arctic compute cooling concept proven", type: "milestone" },
        { id: "f5-02", date: "2040-01-01", label: "Northern data centers serve Arctic nations", type: "milestone" },
        { id: "f5-03", date: "2055-01-01", label: "Arctic data sovereignty treaty", type: "decision" },
      ],
    },
  ],
};
