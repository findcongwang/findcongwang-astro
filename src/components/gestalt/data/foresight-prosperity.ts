import type { ForesightScopeData } from "../types-foresight";

/**
 * Cooperathon 2026 Prosperity Track — pathway to economic sovereignty.
 * Future-only cone: Now through Horizon 3 (2076).
 */
export const prosperityForesightData: ForesightScopeData = {
  title: "Pathway to Economic Sovereignty — Canada 2026–2076",
  description:
    "Scenario trajectories from the compelling question: sovereign distributed energy and AI for Canada.",
  presentDate: "2026-07-01",
  timeRange: { start: "2026-01-01", end: "2076-12-31" },
  futureOnly: true,
  featuredTrajectory: "transform",
  ringFloorHorizonId: "hz-h2",

  coneLabels: {
    growth: "Transform",
    crisis: "Collapse",
  },

  mainThread: [
    {
      id: "mt-present",
      date: "2026-07-01",
      label: "Present — decision window",
      type: "milestone",
    },
  ],

  presentCrossSection: {
    drivers: [
      {
        id: "drv-invest",
        label: "100:1 investment gap vs. U.S.",
        category: "economic",
        position: -135,
      },
      {
        id: "drv-pop",
        label: "38M sparse population, 2nd largest territory",
        category: "social",
        position: -45,
      },
      {
        id: "drv-chip",
        label: "No domestic chip manufacturing",
        category: "technological",
        position: 45,
      },
      {
        id: "drv-citizen",
        label: "No citizen participation mechanism",
        category: "political",
        position: 135,
      },
      {
        id: "drv-cloud",
        label: "Compute dependency on foreign hyperscalers",
        category: "technological",
        position: 180,
      },
      {
        id: "drv-energy",
        label: "Clean energy surplus unrealized for compute",
        category: "economic",
        position: -90,
      },
    ],
  },

  horizons: [
    {
      id: "hz-h1",
      date: "2031-01-01",
      label: "Horizon 1 (0–5 yrs)",
      bands: 3,
    },
    {
      id: "hz-h2",
      date: "2041-01-01",
      label: "Horizon 2 (5–20 yrs)",
      bands: 3,
    },
    {
      id: "hz-h3",
      date: "2076-01-01",
      label: "Horizon 3 (20–50 yrs)",
      bands: 5,
      bandLabels: ["Probable", "Plausible", "Preferred", "Possible", "Preposterous"],
    },
  ],

  scenarios: [
    {
      id: "sc-regulatory-clarity",
      label: "Regulatory clarity + first nodes",
      description:
        "CSA Sandbox granted. 50 pilot nodes deployed. Enterprise pilot secured.",
      horizonId: "hz-h1",
      bandIndex: 0,
      angle: -20,
      color: "#b8860b",
      trajectory: "transform",
    },
    {
      id: "sc-network-smr",
      label: "Network effect + SMR co-location",
      description:
        "1000+ nodes online. Government anchor customer. Northern settlement pilots. Domestic chip packaging begins.",
      horizonId: "hz-h2",
      bandIndex: 0,
      angle: -18,
      color: "#b8860b",
      trajectory: "transform",
    },
    {
      id: "sc-sovereignty",
      label: "Economic sovereignty achieved",
      description:
        "Domestic fabrication capacity. Vertical energy-compute integration. Self-sufficient northern communities.",
      horizonId: "hz-h3",
      bandIndex: 2,
      angle: -12,
      color: "#b8860b",
      trajectory: "transform",
    },
    {
      id: "sc-regulatory-rejection",
      label: "Regulatory rejection",
      description:
        "Securities classification blocks launch. No citizen participation mechanism resolved.",
      horizonId: "hz-h2",
      bandIndex: 2,
      angle: 28,
      color: "#9b2c2c",
      trajectory: "collapse",
    },
    {
      id: "sc-insufficient-adoption",
      label: "Insufficient adoption",
      description:
        "Capital barrier unresolved. Network too small for network effects. Foreign cloud wins demand.",
      horizonId: "hz-h2",
      bandIndex: 1,
      angle: 8,
      color: "#334155",
      trajectory: "order",
    },
    {
      id: "sc-import-dependency",
      label: "Permanent import dependency",
      description:
        "No domestic manufacturing established. Chip sovereignty constraint unresolved. Remains U.S. intellectual plantation.",
      horizonId: "hz-h3",
      bandIndex: 1,
      angle: 15,
      color: "#334155",
      trajectory: "order",
    },
    {
      id: "sc-infrastructure-crisis",
      label: "Infrastructure crisis",
      description:
        "Population influx without preparation. No northern infrastructure. Digital colony persists.",
      horizonId: "hz-h3",
      bandIndex: 4,
      angle: 32,
      color: "#9b2c2c",
      trajectory: "collapse",
    },
  ],
};
