/**
 * Annotation colour resolution: semantic, brand, custom, and positional palettes.
 * Canadian spelling in comments (colour, behaviour).
 */

export type SemanticColour =
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "amber"
  | "teal"
  | "burgundy";

export type AnnotationPalette = "semantic" | "brand" | "custom" | "positional";

export type CriticLens = "chief-editor" | "academic-critic";

/** Positional margin-note palette (backwards compatible when color prop absent). */
export const POSITIONAL_PALETTE: Record<string, string> = {
  "1": "#7c9eb2",
  "2": "#b07c9e",
  "3": "#9eb07c",
  "4": "#b0a07c",
  "5": "#7c8fb0",
  "6": "#b07c7c",
  "7": "#7cb0a0",
};

export interface ResolveColourOptions {
  palette?: AnnotationPalette;
  color?: string;
  customColor?: string;
  critic?: boolean;
  n?: number | string;
}

/** CSS variable name for a semantic or brand colour key. */
export function colourVarName(
  palette: "semantic" | "brand",
  color: string,
  critic = false,
): string {
  if (palette === "brand") {
    return `--annotation-brand-${color}`;
  }
  const mode = critic ? "critic" : "author";
  return `--annotation-${mode}-${color}`;
}

/** Highlight wash CSS variable (semantic/brand highlight backgrounds). */
export function highlightVarName(
  palette: "semantic" | "brand",
  color: string,
  critic = false,
): string {
  if (palette === "brand") {
    return `--annotation-brand-${color}-highlight`;
  }
  const mode = critic ? "critic" : "author";
  return `--annotation-${mode}-${color}-highlight`;
}

/** Resolve a colour value for inline styles at build time (fallback hex when CSS vars unavailable). */
export function resolveColourHex(options: ResolveColourOptions): string {
  const { palette = "semantic", color = "green", customColor, critic = false, n } = options;

  if (customColor) return customColor;

  if (palette === "positional" && n != null) {
    return POSITIONAL_PALETTE[String(n)] ?? "#999";
  }

  if (palette === "custom" && color) return color;

  // Build-time hex fallbacks matching annotation-colours.css / annotation-brand.css
  const semanticAuthor: Record<SemanticColour, string> = {
    blue: "#7c9eb2",
    green: "#9eb07c",
    red: "#b07c7c",
    purple: "#9c7cb0",
    amber: "#b0a07c",
    teal: "#7cb0a0",
    burgundy: "oklch(32.09% 0.131 27.20)",
  };

  const semanticCritic: Record<string, string> = {
    blue: "#2563eb",
    green: "#16a34a",
    red: "#dc2626",
    purple: "#9333ea",
    amber: "#d97706",
    teal: "#0d9488",
  };

  const brand: Record<string, string> = {
    primary: "#660005",
    yellow: "rgb(200, 180, 0)",
    bet: "#660005",
    atom: "rgb(125, 132, 145)",
    blog: "rgb(125, 132, 145)",
    essay: "rgb(125, 132, 145)",
    paper: "rgb(125, 132, 145)",
    domain: "rgb(109, 104, 117)",
    domains: "rgb(109, 104, 117)",
    lexicon: "rgb(138, 154, 91)",
    influence: "rgb(212, 163, 115)",
    influences: "rgb(212, 163, 115)",
    book: "rgb(74, 111, 165)",
    project: "rgb(194, 139, 46)",
    posts: "rgb(125, 132, 145)",
    research: "rgb(125, 132, 145)",
    questions: "rgb(12, 137, 158)",
    question: "#0c899e",
    challenge: "#8B4513",
    "domain-dfs": "#523A78",
    "domain-bet": "#660005",
    "domain-lkm": "#A35C2E",
    "domain-hfl": "#21557A",
    "domain-sdev": "#104747",
  };

  if (palette === "brand") {
    return brand[color ?? "primary"] ?? brand.primary;
  }

  if (critic) {
    return semanticCritic[color ?? "green"] ?? semanticCritic.green;
  }

  return semanticAuthor[(color as SemanticColour) ?? "green"] ?? semanticAuthor.green;
}

/** Inline style string referencing CSS custom properties. */
export function resolveColourStyle(options: ResolveColourOptions): string {
  const { palette = "semantic", color = "green", customColor, critic = false, n } = options;

  if (customColor) return customColor;

  if (palette === "positional" && n != null) {
    return POSITIONAL_PALETTE[String(n)] ?? "#999";
  }

  if (palette === "custom" && color) return color;

  const varName = colourVarName(palette as "semantic" | "brand", color ?? "green", critic);
  return `var(${varName})`;
}

/** Global semantic colour legend: what each colour means in author vs. critic context. */
export const COLOUR_LEGEND: Record<SemanticColour, { author: string; critic: string }> = {
  green:    { author: "Key insight",       critic: "Approved" },
  amber:    { author: "Needs research",    critic: "Needs revision" },
  blue:     { author: "Citation / source", critic: "Reference" },
  red:      { author: "(unused)",          critic: "Deletion / issue" },
  purple:   { author: "Connection",        critic: "Suggestion" },
  teal:     { author: "Definition / term", critic: "Definition" },
  burgundy: { author: "Brand accent",      critic: "(unused)" },
};
