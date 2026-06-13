import type { ForesightScopeData } from "../types-foresight";

/**
 * Sovereign AI & Distributed Energy — 50-Year Foresight Scenario
 * Bowtie model: past eras + PEST drivers, future horizons with scenario placement.
 */
export const sovereignAiData: ForesightScopeData = {
  title: "Sovereign AI & Distributed Energy — Canada 50-Year Outlook",
  description:
    "Multi-scenario exploration of Canadian AI sovereignty, energy infrastructure, and compute independence trajectories from present conditions to 2075.",
  presentDate: "2026-06-01",
  timeRange: { start: "1970-01-01", end: "2075-12-31" },

  coneLabels: {
    growth: "Growth / Transform",
    crisis: "Crisis / Discipline",
  },

  mainThread: [
    { id: "mt-01", date: "2020-03-01", label: "COVID accelerates remote/digital", type: "inflection" },
    { id: "mt-02", date: "2022-11-01", label: "ChatGPT — AI mainstream", type: "inflection" },
    { id: "mt-03", date: "2023-06-01", label: "Canada AI funding drops 30%", type: "crisis" },
    { id: "mt-04", date: "2024-01-01", label: "53% AI talent relocated to US", type: "crisis" },
    { id: "mt-05", date: "2025-03-01", label: "0.6% global AI compute share", type: "milestone" },
    { id: "mt-06", date: "2026-01-01", label: "AIAC sovereign compute report", type: "decision" },
    { id: "mt-07", date: "2026-06-01", label: "Present — decision window", type: "milestone" },
  ],

  eras: [
    {
      id: "era-info",
      date: "1970-01-01",
      label: "Information Age (1970-)",
      crossSection: {
        drivers: [
          {
            id: "era-info-tech",
            label: "Mainframe to personal computing shift",
            category: "technological",
            position: "top",
          },
          {
            id: "era-info-pol",
            label: "National telecom monopolies",
            category: "political",
            position: "left",
          },
          {
            id: "era-info-eco",
            label: "Oil-driven economic growth",
            category: "economic",
            position: "bottom",
          },
          {
            id: "era-info-soc",
            label: "Rise of networked society",
            category: "social",
            position: "right",
          },
        ],
      },
    },
    {
      id: "era-ai",
      date: "2022-11-01",
      label: "AI Inflection (2022-)",
      crossSection: {
        drivers: [
          {
            id: "era-ai-tech",
            label: "Generative AI reaches mainstream",
            category: "technological",
            position: "top",
          },
          {
            id: "era-ai-eco",
            label: "Venture funding pivots to AI",
            category: "economic",
            position: "right",
          },
        ],
      },
    },
    {
      id: "era-sovereignty",
      date: "2024-01-01",
      label: "Sovereignty Crisis (2024-)",
      crossSection: {
        drivers: [
          {
            id: "era-sov-pol",
            label: "Data residency legislation debates",
            category: "political",
            position: "left",
          },
          {
            id: "era-sov-soc",
            label: "Accelerating AI talent emigration",
            category: "social",
            position: "bottom",
          },
          {
            id: "era-sov-tech",
            label: "Compute concentrated in US hyperscale",
            category: "technological",
            position: "right",
          },
        ],
      },
    },
  ],

  presentCrossSection: {
    drivers: [
      {
        id: "drv-tech",
        label: "Cloud dependency on US hyperscalers",
        category: "technological",
        position: -135,
      },
      {
        id: "drv-pol",
        label: "Data sovereignty debates in Parliament",
        category: "political",
        position: -45,
      },
      {
        id: "drv-eco",
        label: "AI startup funding fell 30%",
        category: "economic",
        position: 45,
      },
      {
        id: "drv-soc",
        label: "53% AI professionals relocated to US",
        category: "social",
        position: 135,
      },
      {
        id: "drv-hydro",
        label: "Hydro surplus unrealized for compute",
        category: "technological",
        position: 180,
      },
      {
        id: "drv-policy",
        label: "No federal AI-energy integration policy",
        category: "political",
        position: -90,
      },
    ],
  },

  horizons: [
    {
      id: "hz-h1",
      date: "2030-01-01",
      label: "Horizon 1 (3–10 yrs · near future)",
      bands: 3,
      bandLabels: ["Probable", "Possible", "Speculative"],
    },
    {
      id: "hz-h2",
      date: "2040-01-01",
      label: "Horizon 2 (10–30 yrs)",
      bands: 3,
      bandLabels: ["Probable", "Possible", "Speculative"],
    },
    {
      id: "hz-h3",
      date: "2050-01-01",
      label: "Horizon 3 (30–50 yrs)",
      bands: 3,
      bandLabels: ["Probable", "Possible", "Speculative"],
    },
    {
      id: "hz-h4",
      date: "2075-01-01",
      label: "Horizon 4 (100 yrs+)",
      bands: 5,
      bandLabels: ["Probable", "Plausible", "Preferred", "Possible", "Preposterous"],
    },
  ],

  scenarios: [
    {
      id: "sc-provincial",
      label: "Provincial Fragmentation",
      description:
        "Provinces compete rather than collaborate; Quebec, Ontario, BC each build incompatible systems.",
      horizonId: "hz-h1",
      bandIndex: 0,
      angle: -25,
    },
    {
      id: "sc-dependency",
      label: "Deep Dependency",
      description:
        "No significant policy intervention. Brain drain continues, dependency deepens.",
      horizonId: "hz-h1",
      bandIndex: 0,
      angle: 20,
    },
    {
      id: "sc-sovereign",
      label: "Sovereign Compute Corridor",
      description:
        "Coast-to-coast sovereign AI compute network powered by provincial hydro surplus.",
      horizonId: "hz-h2",
      bandIndex: 1,
      angle: -15,
    },
    {
      id: "sc-energy-ai",
      label: "Distributed Energy-AI Symbiosis",
      description:
        "Distributed compute at energy generation sites creates a unique competitive advantage.",
      horizonId: "hz-h3",
      bandIndex: 2,
      angle: 10,
    },
    {
      id: "sc-arctic",
      label: "Arctic Data Sovereignty",
      description:
        "Northern geography used for natural cooling; Arctic sovereignty extended to data sovereignty.",
      horizonId: "hz-h4",
      bandIndex: 4,
      angle: -5,
    },
  ],

  histories: [
    {
      id: "hist-01",
      label: "Brain Drain Acceleration",
      description: "Systemic loss of AI talent to US firms.",
      branchDate: "2021-01-01",
      endDate: "2026-06-01",
      confidence: 0.95,
      valence: "negative",
      events: [],
    },
  ],

  futures: [
    {
      id: "fut-01",
      label: "Sovereign Compute Corridor",
      description: "Canada builds sovereign AI compute network.",
      branchDate: "2027-01-01",
      confidence: 0.45,
      valence: "positive",
      events: [],
    },
  ],
};
