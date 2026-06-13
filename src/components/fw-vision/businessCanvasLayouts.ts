import type { BusinessCanvasZone, CanvasVariant } from "./types/businessCanvas";

const TRADITIONAL_PROMPTS: Partial<Record<string, string[]>> = {
  "key-partners": ["Who are our key partners?", "Key supplier and alliance motivations"],
  "key-activities": ["Production", "Problem solving", "Platform / network"],
  "key-resources": ["Physical", "Intellectual", "Human", "Financial"],
  "value-propositions": ["Newness", "Performance", "Customization", "Price"],
  "customer-relationships": ["Personal assistance", "Self-service", "Co-creation"],
  channels: ["Awareness", "Evaluation", "Purchase", "Delivery", "After sales"],
  "customer-segments": ["Mass market", "Niche market", "Segmented"],
  "cost-structure": ["Fixed costs", "Variable costs", "Economies of scale"],
  "revenue-streams": ["Asset sale", "Subscription", "Usage fee", "Licensing"],
};

const SUSTAINABLE_EXTRA: Partial<Record<string, string[]>> = {
  "eco-social-costs": ["Life-cycle assessment", "Externalized impacts", "Hidden costs"],
  "eco-social-benefits": ["Social reporting", "Restorative outcomes", "Shared value"],
};

const REGENERATIVE_EXTRA: Partial<Record<string, string[]>> = {
  stakeholders: ["Communities", "Future generations", "Living systems"],
  "ecosystem-value": ["Biodiversity", "Water cycles", "Soil health"],
  "regenerative-outcomes": ["Net positive", "Thrivability", "System renewal"],
};

function withPrompts(
  zones: Omit<BusinessCanvasZone, "prompts">[],
  promptsMap: Partial<Record<string, string[]>>
): BusinessCanvasZone[] {
  return zones.map((z) => ({
    ...z,
    prompts: promptsMap[z.id],
  }));
}

/** Standard 9-block Osterwalder grid (content area y: 0.08–0.78). */
export function traditionalCanvasZones(): BusinessCanvasZone[] {
  return withPrompts(
    [
      { id: "key-partners", title: "Key Partners", x: 0, y: 0.08, width: 0.18, height: 0.7 },
      { id: "key-activities", title: "Key Activities", x: 0.18, y: 0.08, width: 0.2, height: 0.35 },
      { id: "key-resources", title: "Key Resources", x: 0.18, y: 0.43, width: 0.2, height: 0.35 },
      { id: "value-propositions", title: "Value Proposition", x: 0.38, y: 0.08, width: 0.2, height: 0.7 },
      { id: "customer-relationships", title: "Customer Relationships", x: 0.58, y: 0.08, width: 0.2, height: 0.35 },
      { id: "channels", title: "Channels", x: 0.58, y: 0.43, width: 0.2, height: 0.35 },
      { id: "customer-segments", title: "Customer Segments", x: 0.78, y: 0.08, width: 0.22, height: 0.7 },
      { id: "cost-structure", title: "Cost Structure", x: 0, y: 0.78, width: 0.58, height: 0.2 },
      { id: "revenue-streams", title: "Revenue Streams", x: 0.58, y: 0.78, width: 0.42, height: 0.2 },
    ],
    TRADITIONAL_PROMPTS
  );
}

/** Sustainable BMC: 9 blocks + eco-social band (reference JPG). */
export function sustainableCanvasZones(): BusinessCanvasZone[] {
  const core = traditionalCanvasZones().map((z) => {
    if (z.y >= 0.78) return z;
    return { ...z, height: z.height * 0.88, y: z.y };
  });
  const adjusted = core.map((z) =>
    z.y < 0.78 ? { ...z, height: Math.min(z.height, 0.62) } : z
  );
  const top = adjusted.filter((z) => z.y < 0.72);
  const financial = adjusted.filter((z) => z.y >= 0.72 && z.id !== "cost-structure" && z.id !== "revenue-streams");

  return withPrompts(
    [
      ...top,
      { id: "cost-structure", title: "Cost Structure", x: 0, y: 0.72, width: 0.58, height: 0.12 },
      { id: "revenue-streams", title: "Revenue Streams", x: 0.58, y: 0.72, width: 0.42, height: 0.12 },
      {
        id: "eco-social-costs",
        title: "Eco-Social Costs",
        x: 0,
        y: 0.86,
        width: 0.5,
        height: 0.12,
      },
      {
        id: "eco-social-benefits",
        title: "Eco-Social Benefits",
        x: 0.5,
        y: 0.86,
        width: 0.5,
        height: 0.12,
      },
    ],
    { ...TRADITIONAL_PROMPTS, ...SUSTAINABLE_EXTRA }
  );
}

/** Regenerative BMC (Playback B10-inspired): stakeholder + ecosystem layers. */
export function regenerativeCanvasZones(): BusinessCanvasZone[] {
  return withPrompts(
    [
      { id: "stakeholders", title: "Stakeholders", x: 0, y: 0.08, width: 0.16, height: 0.58 },
      { id: "key-partners", title: "Key Partners", x: 0.16, y: 0.08, width: 0.14, height: 0.58 },
      { id: "key-activities", title: "Key Activities", x: 0.3, y: 0.08, width: 0.14, height: 0.28 },
      { id: "key-resources", title: "Key Resources", x: 0.3, y: 0.38, width: 0.14, height: 0.28 },
      { id: "value-propositions", title: "Value Proposition", x: 0.44, y: 0.08, width: 0.14, height: 0.58 },
      { id: "customer-relationships", title: "Customer Relationships", x: 0.58, y: 0.08, width: 0.14, height: 0.28 },
      { id: "channels", title: "Channels", x: 0.58, y: 0.38, width: 0.14, height: 0.28 },
      { id: "customer-segments", title: "Customer Segments", x: 0.72, y: 0.08, width: 0.14, height: 0.58 },
      { id: "ecosystem-value", title: "Ecosystem Value", x: 0.86, y: 0.08, width: 0.14, height: 0.58 },
      { id: "cost-structure", title: "Cost Structure", x: 0, y: 0.68, width: 0.4, height: 0.1 },
      { id: "revenue-streams", title: "Revenue Streams", x: 0.4, y: 0.68, width: 0.3, height: 0.1 },
      { id: "eco-social-costs", title: "Eco-Social Costs", x: 0.7, y: 0.68, width: 0.15, height: 0.1 },
      { id: "eco-social-benefits", title: "Eco-Social Benefits", x: 0.85, y: 0.68, width: 0.15, height: 0.1 },
      {
        id: "regenerative-outcomes",
        title: "Regenerative Outcomes",
        x: 0,
        y: 0.8,
        width: 1,
        height: 0.18,
      },
    ],
    { ...TRADITIONAL_PROMPTS, ...SUSTAINABLE_EXTRA, ...REGENERATIVE_EXTRA }
  );
}

export function canvasZonesForVariant(variant: CanvasVariant): BusinessCanvasZone[] {
  switch (variant) {
    case "sustainable":
      return sustainableCanvasZones();
    case "regenerative":
      return regenerativeCanvasZones();
    default:
      return traditionalCanvasZones();
  }
}

export function canvasVariantLabel(variant: CanvasVariant): string {
  switch (variant) {
    case "sustainable":
      return "Sustainable Business Model Canvas";
    case "regenerative":
      return "Regenerative Business Model Canvas";
    default:
      return "Business Model Canvas";
  }
}
