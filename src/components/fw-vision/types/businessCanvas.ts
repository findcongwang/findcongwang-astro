export type CanvasVariant = "traditional" | "sustainable" | "regenerative";

export type BusinessCanvasZoneId =
  | "key-partners"
  | "key-activities"
  | "key-resources"
  | "value-propositions"
  | "customer-relationships"
  | "channels"
  | "customer-segments"
  | "cost-structure"
  | "revenue-streams"
  | "eco-social-costs"
  | "eco-social-benefits"
  | "stakeholders"
  | "ecosystem-value"
  | "regenerative-outcomes";

export interface BusinessCanvasMetadata {
  title?: string;
  designedFor?: string;
  designedBy?: string;
  date?: string;
  version?: string;
}

export interface BusinessCanvasZone {
  id: BusinessCanvasZoneId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Muted helper prompts shown in zone (reference canvas style). */
  prompts?: string[];
}

export interface BusinessCanvasNode {
  id: string;
  title: string;
  zoneId: BusinessCanvasZoneId;
  briefDescription?: string;
  detailedDescription?: string;
}

export interface BusinessCanvasFlow {
  source: string;
  target: string;
  action: string;
}

export interface BusinessCanvasData {
  variant?: CanvasVariant;
  metadata?: BusinessCanvasMetadata;
  zones: BusinessCanvasZone[];
  nodes: BusinessCanvasNode[];
  flows: BusinessCanvasFlow[];
}
