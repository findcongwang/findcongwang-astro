/**
 * Print format presets — single source of truth for Paged.js layouts.
 */

export const PRINT_FORMAT_KEYS = [
  "square-7x7",
  "square-8x8",
  "square-8.5x9",
  "square-8.5x9-clean",
  "portrait-6x9",
  "portrait-a5",
  "portrait-letter",
  "portrait-a4",
  "landscape-10x7",
  "landscape-11x8.5",
  "wide-12x9",
] as const;

export type PrintFormatKey = (typeof PRINT_FORMAT_KEYS)[number];
export type PrintMode = "physical" | "digital";
export type PrintFormatCategory = "square" | "portrait" | "landscape" | "wide";
export type PrintSpreadStart = "odd" | "even";

export interface PrintFormatPreset {
  key: PrintFormatKey;
  width: string;
  height: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  marginTopFirst: string;
  hasMarginNotes: boolean;
  marginNoteWidth: string;
  marginNoteInset: string;
  bodySize: string;
  category: PrintFormatCategory;
}

export interface ResolvedPrintConfig {
  formatKey: PrintFormatKey;
  mode: PrintMode;
  hasMarginNotes: boolean;
  preset: PrintFormatPreset;
  sectionFormats: PrintFormatKey[];
  spreadStart: PrintSpreadStart;
  spreadEnabled: boolean;
}

export interface PrintRuntimeConfig {
  hasMarginNotes: boolean;
  marginNoteWidth: string;
  marginNoteInset: string;
  marginTop: string;
  marginBottom: string;
  minGap: number;
  lineHeight: number;
  pageBottomClearance: number;
}

export const DEFAULT_PRINT_FORMAT: PrintFormatKey = "square-8.5x9";
export const DEFAULT_PRINT_SPREAD_START: PrintSpreadStart = "odd";

export function isPrintSpreadStart(value: string): value is PrintSpreadStart {
  return value === "odd" || value === "even";
}

/** Portrait/square physical formats support two-up spread preview; not landscape, wide, or digital. */
export function supportsSpreadPreview(preset: PrintFormatPreset, mode: PrintMode): boolean {
  if (mode === "digital") return false;
  return preset.category === "square" || preset.category === "portrait";
}

export const PRINT_FORMAT_PRESETS: Record<PrintFormatKey, PrintFormatPreset> = {
  "square-7x7": {
    key: "square-7x7",
    width: "7in",
    height: "7in",
    marginTop: "0.75in",
    marginRight: "0.75in",
    marginBottom: "0.75in",
    marginLeft: "0.75in",
    marginTopFirst: "1.5in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "square",
  },
  "square-8x8": {
    key: "square-8x8",
    width: "8in",
    height: "8in",
    marginTop: "0.75in",
    marginRight: "0.75in",
    marginBottom: "0.75in",
    marginLeft: "0.75in",
    marginTopFirst: "1.75in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "square",
  },
  "square-8.5x9": {
    key: "square-8.5x9",
    width: "8.5in",
    height: "9in",
    marginTop: "0.6in",
    marginRight: "2in",
    marginBottom: "0.6in",
    marginLeft: "0.8in",
    marginTopFirst: "2in",
    hasMarginNotes: true,
    marginNoteWidth: "1.5in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "square",
  },
  "square-8.5x9-clean": {
    key: "square-8.5x9-clean",
    width: "8.5in",
    height: "9in",
    marginTop: "0.75in",
    marginRight: "0.75in",
    marginBottom: "0.75in",
    marginLeft: "0.75in",
    marginTopFirst: "2in",
    hasMarginNotes: false,
    marginNoteWidth: "1.5in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "square",
  },
  "portrait-6x9": {
    key: "portrait-6x9",
    width: "6in",
    height: "9in",
    marginTop: "0.75in",
    marginRight: "0.625in",
    marginBottom: "0.75in",
    marginLeft: "0.625in",
    marginTopFirst: "1.75in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.2in",
    bodySize: "10pt",
    category: "portrait",
  },
  "portrait-a5": {
    key: "portrait-a5",
    width: "5.83in",
    height: "8.27in",
    marginTop: "0.6in",
    marginRight: "0.6in",
    marginBottom: "0.6in",
    marginLeft: "0.6in",
    marginTopFirst: "1.5in",
    hasMarginNotes: false,
    marginNoteWidth: "1.1in",
    marginNoteInset: "0.2in",
    bodySize: "10pt",
    category: "portrait",
  },
  "portrait-letter": {
    key: "portrait-letter",
    width: "8.5in",
    height: "11in",
    marginTop: "0.75in",
    marginRight: "0.8in",
    marginBottom: "0.75in",
    marginLeft: "0.8in",
    marginTopFirst: "2in",
    hasMarginNotes: false,
    marginNoteWidth: "1.5in",
    marginNoteInset: "0.25in",
    bodySize: "11pt",
    category: "portrait",
  },
  "portrait-a4": {
    key: "portrait-a4",
    width: "8.27in",
    height: "11.7in",
    marginTop: "0.6in",
    marginRight: "0.6in",
    marginBottom: "0.6in",
    marginLeft: "0.6in",
    marginTopFirst: "2in",
    hasMarginNotes: false,
    marginNoteWidth: "1.5in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "portrait",
  },
  "landscape-10x7": {
    key: "landscape-10x7",
    width: "10in",
    height: "7in",
    marginTop: "0.6in",
    marginRight: "0.7in",
    marginBottom: "0.6in",
    marginLeft: "0.7in",
    marginTopFirst: "1.25in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "landscape",
  },
  "landscape-11x8.5": {
    key: "landscape-11x8.5",
    width: "11in",
    height: "8.5in",
    marginTop: "0.75in",
    marginRight: "0.75in",
    marginBottom: "0.75in",
    marginLeft: "0.75in",
    marginTopFirst: "1.5in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "landscape",
  },
  "wide-12x9": {
    key: "wide-12x9",
    width: "12in",
    height: "9in",
    marginTop: "0.75in",
    marginRight: "0.75in",
    marginBottom: "0.75in",
    marginLeft: "0.75in",
    marginTopFirst: "1.75in",
    hasMarginNotes: false,
    marginNoteWidth: "1.25in",
    marginNoteInset: "0.25in",
    bodySize: "10pt",
    category: "wide",
  },
};

export function isPrintFormatKey(value: string): value is PrintFormatKey {
  return (PRINT_FORMAT_KEYS as readonly string[]).includes(value);
}

export function getPrintFormat(key?: string | null): PrintFormatPreset {
  if (key && isPrintFormatKey(key)) {
    return PRINT_FORMAT_PRESETS[key];
  }
  return PRINT_FORMAT_PRESETS[DEFAULT_PRINT_FORMAT];
}

function pageRuleBlock(preset: PrintFormatPreset, name?: string): string {
  const selector = name ? `@page print-${name}` : "@page";
  const leftRight = name
    ? ""
    : `
@page :left {
  margin: ${preset.marginTop} ${preset.marginRight} ${preset.marginBottom} ${preset.marginLeft};
}
@page :right {
  margin: ${preset.marginTop} ${preset.marginRight} ${preset.marginBottom} ${preset.marginLeft};
}
@page :first {
  margin-top: ${preset.marginTopFirst};
  @bottom-center { content: none; }
}`;
  return `${selector} {
  size: ${preset.width} ${preset.height};
  margin: ${preset.marginTop} ${preset.marginRight} ${preset.marginBottom} ${preset.marginLeft};
  @footnote {
    float: bottom;
    border-top: 0.5pt solid #ccc;
    padding-top: 0.3em;
  }
  @bottom-center {
    content: counter(page);
    font-family: 'Geist', sans-serif;
    font-size: 7.5pt;
    color: #aaa;
  }
}${leftRight}`;
}

export function buildPageRulesCSS(
  defaultPreset: PrintFormatPreset,
  sectionFormatKeys: PrintFormatKey[] = [],
  mode: PrintMode = "physical",
): string {
  const keys = new Set<PrintFormatKey>([defaultPreset.key]);
  if (mode === "digital") {
    for (const key of sectionFormatKeys) {
      if (isPrintFormatKey(key)) keys.add(key);
    }
  }

  const blocks: string[] = [];
  let defaultWritten = false;

  for (const key of keys) {
    const preset = getPrintFormat(key);
    if (key === defaultPreset.key && !defaultWritten) {
      blocks.push(pageRuleBlock(preset));
      defaultWritten = true;
    } else if (mode === "digital") {
      blocks.push(pageRuleBlock(preset, key));
    }
  }

  if (!defaultWritten) {
    blocks.unshift(pageRuleBlock(defaultPreset));
  }

  blocks.push(`@page section-continuation {
  margin-top: ${defaultPreset.marginTop};
}`);

  return blocks.join("\n\n");
}

export function buildRuntimeConfig(preset: PrintFormatPreset): PrintRuntimeConfig {
  return {
    hasMarginNotes: preset.hasMarginNotes,
    marginNoteWidth: preset.marginNoteWidth,
    marginNoteInset: preset.marginNoteInset,
    marginTop: preset.marginTop,
    marginBottom: preset.marginBottom,
    minGap: 24,
    lineHeight: 12,
    pageBottomClearance: 80,
  };
}

export interface ResolvePrintConfigInput {
  formatKey?: string | null;
  mode?: string | null;
  printAnnotations?: boolean | null;
  spreadStart?: string | null;
  urlSize?: string | null;
  urlMode?: string | null;
  urlSpread?: string | null;
  contentHasMarginNotes?: boolean;
  sectionFormatKeys?: PrintFormatKey[];
}

export function resolvePrintConfig(input: ResolvePrintConfigInput): ResolvedPrintConfig {
  const formatKey = isPrintFormatKey(input.urlSize ?? "")
    ? input.urlSize!
    : isPrintFormatKey(input.formatKey ?? "")
      ? input.formatKey!
      : DEFAULT_PRINT_FORMAT;

  const mode: PrintMode = input.urlMode === "digital" || input.mode === "digital" ? "digital" : "physical";

  const preset = getPrintFormat(formatKey);

  const contentHasNotes = input.contentHasMarginNotes ?? false;
  const annotationsEnabled =
    input.printAnnotations === false
      ? false
      : input.printAnnotations === true
        ? true
        : contentHasNotes;

  const hasMarginNotes = preset.hasMarginNotes && annotationsEnabled;

  const sectionFormats =
    mode === "digital" ? (input.sectionFormatKeys ?? []).filter(isPrintFormatKey) : [];

  const spreadStart: PrintSpreadStart = isPrintSpreadStart(input.urlSpread ?? "")
    ? input.urlSpread!
    : isPrintSpreadStart(input.spreadStart ?? "")
      ? input.spreadStart!
      : DEFAULT_PRINT_SPREAD_START;

  const spreadEnabled = supportsSpreadPreview(preset, mode);

  return {
    formatKey,
    mode,
    hasMarginNotes,
    preset,
    sectionFormats,
    spreadStart,
    spreadEnabled,
  };
}

export function serializePresetsForClient(): string {
  return JSON.stringify(PRINT_FORMAT_PRESETS);
}

export function scanSectionFormatKeysFromHtml(html: string): PrintFormatKey[] {
  const keys = new Set<PrintFormatKey>();
  const re = /data-print-section-format="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    if (isPrintFormatKey(match[1])) keys.add(match[1]);
  }
  return [...keys];
}
