/**
 * Shared roughNotation initialisation for web and print contexts.
 */

import { annotate, type RoughAnnotation } from "rough-notation";

export type RoughAnnotationType =
  | "highlight"
  | "box"
  | "circle"
  | "underline"
  | "bracket"
  | "strikethrough"
  | "crossed-off";

export interface AnnotationRegistryEntry {
  element: HTMLElement;
  annotation: RoughAnnotation;
  critic: boolean;
  lens?: string;
}

declare global {
  interface Window {
    __annotationRegistry?: AnnotationRegistryEntry[];
    __annotationPreferences?: {
      master: boolean;
      critic: boolean;
      chiefEditor: boolean;
      academicCritic: boolean;
    };
  }
}

const LIBRARY_TYPE_MAP: Record<RoughAnnotationType, Parameters<typeof annotate>[1]["type"]> = {
  highlight: "highlight",
  box: "box",
  circle: "circle",
  underline: "underline",
  bracket: "bracket",
  strikethrough: "strike-through",
  "crossed-off": "crossed-off",
};

function getPreferences() {
  if (typeof window === "undefined") {
    return { master: true, critic: false, chiefEditor: true, academicCritic: true };
  }
  if (window.__annotationPreferences) return window.__annotationPreferences;

  const readBool = (key: string, fallback: boolean) => {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "true";
  };

  window.__annotationPreferences = {
    master: readBool("annotation-master", true),
    critic: readBool("annotation-critic", false),
    chiefEditor: readBool("annotation-lens-chief-editor", true),
    academicCritic: readBool("annotation-lens-academic-critic", true),
  };
  return window.__annotationPreferences;
}

function isBrandMark(el: HTMLElement): boolean {
  return el.dataset.palette === "brand" || el.dataset.brandMark === "true";
}

function isCriticVisible(el: HTMLElement, prefs: ReturnType<typeof getPreferences>): boolean {
  if (!el.dataset.critic) return true;
  if (!prefs.critic) return false;
  const lens = el.dataset.lens;
  if (lens === "chief-editor") return prefs.chiefEditor;
  if (lens === "academic-critic") return prefs.academicCritic;
  return true;
}

function shouldShowOverlay(el: HTMLElement, prefs: ReturnType<typeof getPreferences>): boolean {
  if (isBrandMark(el)) return true;

  const isCritic = el.dataset.critic === "true";
  if (isCritic) {
    if (!prefs.critic || !isCriticVisible(el, prefs)) return false;
    return isGranularVisible(el, "critic");
  }

  if (!prefs.master) return false;
  return isGranularVisible(el, "author");
}

function isGranularVisible(el: HTMLElement, mode: "author" | "critic"): boolean {
  const color = el.dataset.color ?? "green";
  const type = el.dataset.type ?? "highlight";
  const key = `annotation-${mode}-${color}-${type}`;
  const v = localStorage.getItem(key);
  return v === null ? true : v === "true";
}

function isVisible(el: HTMLElement): boolean {
  if (el.offsetParent === null && el.getClientRects().length === 0) return false;
  const style = getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;
  return true;
}

function readColourFromElement(el: HTMLElement, type: RoughAnnotationType): string {
  const custom = el.dataset.customColor;
  if (custom) return custom;

  const inlineHighlight = el.style.getPropertyValue("--annotation-highlight").trim();
  const inlineStroke = el.style.getPropertyValue("--annotation-stroke").trim();
  if (type === "highlight" && inlineHighlight) return inlineHighlight;
  if (type !== "highlight" && inlineStroke) return inlineStroke;

  const palette = el.dataset.palette ?? "semantic";
  const color = el.dataset.color ?? "green";
  const critic = el.dataset.critic === "true";

  const mode = critic ? "critic" : "author";
  const prefix = palette === "brand" ? `--annotation-brand-${color}` : `--annotation-${mode}-${color}`;

  if (type === "highlight") {
    const highlightKey = `${prefix}-highlight`;
    const hl = getComputedStyle(document.documentElement).getPropertyValue(highlightKey).trim();
    if (hl) return hl;
  }

  const stroke = getComputedStyle(document.documentElement).getPropertyValue(prefix).trim();
  if (stroke) return stroke;

  return "#666";
}

function getBrackets(el: HTMLElement): ("left" | "right" | "top" | "bottom")[] {
  const raw = el.dataset.brackets ?? "left";
  const parts = raw.split(",").map((s) => s.trim().toLowerCase());
  const out: ("left" | "right" | "top" | "bottom")[] = [];
  for (const side of ["left", "right", "top", "bottom"] as const) {
    if (parts.includes(side)) out.push(side);
  }
  return out.length ? out : ["left"];
}

function warnScopeIfNeeded(el: HTMLElement, type: RoughAnnotationType) {
  if (import.meta.env.PROD) return;
  if (type !== "box" && type !== "circle") return;
  const rects = el.getClientRects();
  if (rects.length > 1) {
    console.warn(
      `[RoughAnnotation] ${type} wraps multi-line content; use highlight or underline instead.`,
      el,
    );
  }
}

function syncMarginRefColour(el: HTMLElement) {
  const ref = el.dataset.marginRef;
  if (!ref || el.dataset.color) return;
  const anchor = document.querySelector(`.margin-note-anchor[data-note="${ref}"]`);
  if (!(anchor instanceof HTMLElement)) return;
  const color = anchor.dataset.semanticColor ?? anchor.dataset.color;
  if (color) {
    el.dataset.color = anchor.dataset.semanticColor ? anchor.dataset.semanticColor : "green";
    el.dataset.palette = anchor.dataset.semanticColor ? "semantic" : el.dataset.palette ?? "semantic";
    if (anchor.dataset.color && !anchor.dataset.semanticColor) {
      el.style.setProperty("--annotation-resolved-color", anchor.dataset.color);
    }
  }
}

export function getAnnotationRegistry(): AnnotationRegistryEntry[] {
  if (!window.__annotationRegistry) window.__annotationRegistry = [];
  return window.__annotationRegistry;
}

export function clearAnnotation(el: HTMLElement) {
  const parent = el.parentElement;
  if (parent) {
    parent.querySelectorAll(":scope > svg.rough-annotation").forEach((svg) => svg.remove());
  }
  delete el.dataset.roughAnnotated;
}

export function initRoughAnnotations(options: {
  root?: Element;
  animate?: boolean;
  respectCriticToggle?: boolean;
} = {}) {
  const { root = document, animate = true, respectCriticToggle = true } = options;
  const prefs = getPreferences();
  const registry = getAnnotationRegistry();

  root.querySelectorAll("[data-rough-annotation]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.dataset.roughAnnotated === "true") return;
    if (!isVisible(node)) return;

    syncMarginRefColour(node);

    const isCritic = node.dataset.critic === "true";
    const rawType = (node.dataset.type ?? "highlight") as RoughAnnotationType;
    const libType = LIBRARY_TYPE_MAP[rawType] ?? "highlight";
    warnScopeIfNeeded(node, rawType);

    const isHighlight = rawType === "highlight";
    const resolvedCustom = node.style.getPropertyValue("--annotation-resolved-color").trim();
    const color = resolvedCustom || readColourFromElement(node, rawType);

    const showOverlay = !respectCriticToggle || shouldShowOverlay(node, prefs);

    const annotationOptions: Parameters<typeof annotate>[1] = {
      type: libType,
      color,
      strokeWidth: 1.0,
      animate: animate && showOverlay,
      animationDuration: animate && showOverlay ? 400 : 0,
      padding: 8,
      ...(isHighlight && { multiline: true }),
    };

    if (rawType === "bracket") {
      annotationOptions.brackets = getBrackets(node);
    }

    try {
      const rects = node.getClientRects();
      if (rects.length === 0 || (rects[0].width === 0 && rects[0].height === 0)) {
        node.classList.add("rough-annotation--css-fallback");
        node.classList.toggle("rough-annotation--overlay-hidden", !showOverlay);
        return;
      }

      const annotation = annotate(node, annotationOptions);
      registry.push({ element: node, annotation, critic: isCritic, lens: node.dataset.lens });
      if (showOverlay) {
        annotation.show();
      } else {
        annotation.hide();
      }
      node.dataset.roughAnnotated = "true";
    } catch {
      node.classList.add("rough-annotation--css-fallback");
      node.classList.toggle("rough-annotation--overlay-hidden", !showOverlay);
    }
  });

  if (respectCriticToggle) {
    applyAnnotationVisibility();
  }
}

export function refreshRoughAnnotations() {
  document.querySelectorAll("[data-rough-annotated]").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (!isVisible(el)) clearAnnotation(el);
  });

  const registry = getAnnotationRegistry();
  registry.forEach(({ element }) => clearAnnotation(element));
  window.__annotationRegistry = [];

  initRoughAnnotations();
}

export function applyAnnotationVisibility() {
  const prefs = getPreferences();
  const registry = getAnnotationRegistry();

  document.querySelectorAll("[data-rough-annotation]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;

    const showOverlay = shouldShowOverlay(node, prefs);
    node.classList.toggle("rough-annotation--overlay-hidden", !showOverlay);

    const entry = registry.find((r) => r.element === node);
    if (!entry) return;

    if (showOverlay) {
      entry.annotation.show();
    } else {
      entry.annotation.hide();
    }
  });

  document.querySelectorAll(".margin-note-anchor[data-critic]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const visible = prefs.critic && isCriticVisible(node, prefs);
    node.classList.toggle("margin-note-critic-hidden", !visible);
  });
}

export function saveAnnotationPreference(
  key: "master" | "critic" | "chiefEditor" | "academicCritic" | string,
  value: boolean,
) {
  const storageKey =
    key === "chiefEditor"
      ? "annotation-lens-chief-editor"
      : key === "academicCritic"
        ? "annotation-lens-academic-critic"
        : key === "master"
          ? "annotation-master"
          : key === "critic"
            ? "annotation-critic"
            : key;

  localStorage.setItem(storageKey, String(value));

  if (key === "master" || key === "critic" || key === "chiefEditor" || key === "academicCritic") {
    const prefs = getPreferences();
    (prefs as Record<string, boolean>)[key] = value;
  }

  applyAnnotationVisibility();
  applyComponentVisibility();
}

/** Apply visibility for non-roughmark components (margin notes, footnotes, inline notes). */
export function applyComponentVisibility() {
  const masterVisible = readBoolPref("annotation-master", true);
  const marginVisible = masterVisible && readBoolPref("annotation-margin-notes", true);
  const footnotesVisible = masterVisible && readBoolPref("annotation-footnotes", true);
  const inlineVisible = masterVisible && readBoolPref("annotation-inline-notes", true);

  document.querySelectorAll(".margin-note-anchor:not([data-critic])").forEach((el) => {
    el.classList.toggle("annotation-hidden", !marginVisible);
  });

  document.querySelectorAll(".footnote-web").forEach((el) => {
    el.classList.toggle("annotation-hidden", !footnotesVisible);
  });

  document.querySelectorAll("ruby.inline-note").forEach((el) => {
    el.classList.toggle("annotation-hidden", !inlineVisible);
  });
}

function readBoolPref(key: string, fallback: boolean): boolean {
  const v = localStorage.getItem(key);
  return v === null ? fallback : v === "true";
}

/** Annotation type inventory for the panel to render from. */
export interface AnnotationInventoryItem {
  color: string;
  type: string;
  count: number;
}

export interface AnnotationInventory {
  author: {
    roughMarks: AnnotationInventoryItem[];
    marginNotes: number;
    footnotes: number;
    inlineNotes: number;
  };
  critic: {
    lenses: Array<{
      lens: string;
      roughMarks: AnnotationInventoryItem[];
      marginNotes: number;
    }>;
  };
}

/** Scan the current page DOM and return a structured inventory of annotations present. */
export function getPageAnnotationInventory(): AnnotationInventory {
  const authorMarks = new Map<string, number>();
  const criticLensMap = new Map<string, Map<string, number>>();
  const criticMarginMap = new Map<string, number>();

  document.querySelectorAll("[data-rough-annotation]").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    // Skip brand-palette marks (site-native decoration, not content annotations)
    if (el.dataset.brandMark === "true" || el.dataset.palette === "brand") return;
    const isCritic = el.dataset.critic === "true";
    const color = el.dataset.color ?? "green";
    const type = el.dataset.type ?? "highlight";
    const key = `${color}-${type}`;

    if (isCritic) {
      const lens = el.dataset.lens ?? "general";
      if (!criticLensMap.has(lens)) criticLensMap.set(lens, new Map());
      const lensMarks = criticLensMap.get(lens)!;
      lensMarks.set(key, (lensMarks.get(key) ?? 0) + 1);
    } else {
      authorMarks.set(key, (authorMarks.get(key) ?? 0) + 1);
    }
  });

  document.querySelectorAll(".margin-note-anchor[data-critic]").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const lens = el.dataset.lens ?? "general";
    criticMarginMap.set(lens, (criticMarginMap.get(lens) ?? 0) + 1);
  });

  const authorRoughMarks: AnnotationInventoryItem[] = [];
  for (const [key, count] of authorMarks) {
    const [color, type] = key.split("-");
    authorRoughMarks.push({ color, type, count });
  }

  const marginNotes = document.querySelectorAll(".margin-note-anchor:not([data-critic])").length;
  const footnotes = document.querySelectorAll(".footnote-web").length;
  const inlineNotes = document.querySelectorAll("ruby.inline-note").length;

  const lenses: AnnotationInventory["critic"]["lenses"] = [];
  const allLensKeys = new Set([...criticLensMap.keys(), ...criticMarginMap.keys()]);
  for (const lens of allLensKeys) {
    const marks: AnnotationInventoryItem[] = [];
    const lensMarks = criticLensMap.get(lens);
    if (lensMarks) {
      for (const [key, count] of lensMarks) {
        const [color, type] = key.split("-");
        marks.push({ color, type, count });
      }
    }
    lenses.push({
      lens,
      roughMarks: marks,
      marginNotes: criticMarginMap.get(lens) ?? 0,
    });
  }

  return {
    author: { roughMarks: authorRoughMarks, marginNotes, footnotes, inlineNotes },
    critic: { lenses },
  };
}
