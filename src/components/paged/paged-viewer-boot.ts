import {
  buildPageRulesCSS,
  buildRuntimeConfig,
  DEFAULT_PRINT_FORMAT,
  getPrintFormat,
  isPrintFormatKey,
  isPrintSpreadStart,
  PRINT_FORMAT_PRESETS,
  resolvePrintConfig,
  scanSectionFormatKeysFromHtml,
  type PrintFormatKey,
  type PrintFormatPreset,
  type PrintSpreadStart,
} from "@/data/print-formats";

declare global {
  interface Window {
    __pagedPrintRendered?: boolean;
    __printFormatConfig?: ReturnType<typeof buildRuntimeConfig>;
  }
}

function sanitizeCaptureHTML(html: string): string {
  const temp = document.createElement("div");
  temp.innerHTML = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  temp.querySelectorAll("svg.rough-annotation").forEach((s) => s.remove());
  temp.querySelectorAll("[data-rough-annotation]").forEach((el) => {
    if (el instanceof HTMLElement) delete el.dataset.roughAnnotated;
  });
  return temp.innerHTML;
}

function waitForMermaid(): Promise<void> {
  const mermaidBlocks = document.querySelectorAll('pre[data-language="mermaid"]');
  if (mermaidBlocks.length === 0) return Promise.resolve();
  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, 3000);
    const check = () => {
      const remaining = document.querySelectorAll('pre[data-language="mermaid"]');
      if (remaining.length === 0) {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    setTimeout(check, 100);
  });
}

function readPrintConfigFromDom(contentHtml: string) {
  const configEl = document.getElementById("print-config");
  const params = new URLSearchParams(window.location.search);

  const formatKey = configEl?.dataset.printFormat ?? DEFAULT_PRINT_FORMAT;
  const mode = configEl?.dataset.printMode ?? "physical";
  const printAnnotationsRaw = configEl?.dataset.printAnnotations;
  const printAnnotations =
    printAnnotationsRaw === "true" ? true : printAnnotationsRaw === "false" ? false : null;
  const spreadStart = configEl?.dataset.printSpreadStart ?? "odd";
  const extraStylesheets = (configEl?.dataset.printStylesheets ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const bodyClass = configEl?.dataset.printBodyClass ?? "paged-mode";

  const contentHasMarginNotes = document.querySelector(".margin-note-anchor") !== null;
  const sectionFormatKeys = scanSectionFormatKeysFromHtml(contentHtml);

  return {
    resolved: resolvePrintConfig({
      formatKey,
      mode,
      printAnnotations,
      spreadStart,
      urlSize: params.get("size"),
      urlMode: params.get("mode"),
      urlSpread: params.get("spread"),
      contentHasMarginNotes,
      sectionFormatKeys,
    }),
    extraStylesheets,
    bodyClass,
  };
}

function buildPrintHTML(container: HTMLElement, header: HTMLElement | null): string {
  let html =
    '<div class="print-header">' +
    '<p class="print-type">' +
    (header?.dataset.type || "Article") +
    "</p>" +
    "<h1>" +
    (header?.dataset.title || "") +
    "</h1>" +
    (header?.dataset.subtitle ? '<p class="print-subtitle">' + header.dataset.subtitle + "</p>" : "") +
    '<p class="print-meta">' +
    (header?.dataset.author || "Francis Wang") +
    (header?.dataset.date ? " \u00B7 " + header.dataset.date : "") +
    "</p>" +
    "</div>";
  html += '<div id="paged-content" class="' + escapeHtml(container.className) + '">';
  html += sanitizeCaptureHTML(container.innerHTML);
  html += "</div>";
  return html;
}

function buildSlidesHTML(container: HTMLElement, header: HTMLElement | null): string {
  const titleText = header?.dataset.title || "";
  const subtitleText = header?.dataset.subtitle || "";
  const authorText = header?.dataset.author || "Francis Wang";

  let html =
    '<div class="slide slide-title">' +
    "<h1>" +
    titleText +
    "</h1>" +
    (subtitleText ? "<p>" + subtitleText + "</p>" : "") +
    '<p class="slide-author">' +
    authorText +
    "</p>" +
    "</div>";

  const temp = document.createElement("div");
  temp.innerHTML = sanitizeCaptureHTML(container.innerHTML);
  const children = Array.from(temp.children);
  let currentSlideHTML = "";
  let hasContent = false;

  for (const el of children) {
    if (el.id === "print-header") continue;
    if (el.classList.contains("slide-break")) {
      if (hasContent) {
        html += '<div class="slide">' + currentSlideHTML + "</div>";
        currentSlideHTML = "";
        hasContent = false;
      }
      continue;
    }
    if (el.tagName === "H2") {
      if (hasContent) html += '<div class="slide">' + currentSlideHTML + "</div>";
      currentSlideHTML = el.outerHTML;
      hasContent = true;
    } else {
      currentSlideHTML += el.outerHTML;
      hasContent = true;
    }
  }
  if (hasContent) html += '<div class="slide">' + currentSlideHTML + "</div>";
  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function scheduleWhenDomReady(run: () => void): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
}

function renderPrintDocument(pageHTML: string): void {
  document.open("text/html", "replace");
  document.write(pageHTML);
  document.close();
}

function captureAndRenderPrintDocument(format: "print" | "slides"): void {
  const proseContainer =
    document.getElementById("paged-content") ||
    document.querySelector(".paged-prose") ||
    document.querySelector(".prose");

  if (!proseContainer || !(proseContainer instanceof HTMLElement)) {
    console.error("PagedViewer: no #paged-content container found");
    return;
  }

  window.__pagedPrintRendered = true;

  const params = new URLSearchParams(window.location.search);
  const header = document.getElementById("print-header");
  let contentHTML = "";
  let pageRulesCSS = "";
  let resolvedFormatKey = DEFAULT_PRINT_FORMAT;
  let resolvedMode = "physical";
  let hasMarginNotes = false;
  let spreadStart: PrintSpreadStart = "odd";
  let spreadEnabled = true;
  let runtimeConfigJson = "{}";
  let extraStylesheets: string[] = [];
  let bodyClass = "paged-mode";

  if (format === "print") {
    const rawHtml = sanitizeCaptureHTML(proseContainer.innerHTML);
    const printConfig = readPrintConfigFromDom(rawHtml);
    const resolved = printConfig.resolved;
    extraStylesheets = printConfig.extraStylesheets;
    bodyClass = printConfig.bodyClass;
    resolvedFormatKey = resolved.formatKey;
    resolvedMode = resolved.mode;
    hasMarginNotes = resolved.hasMarginNotes;
    spreadStart = resolved.spreadStart;
    spreadEnabled = resolved.spreadEnabled;

    pageRulesCSS = buildPageRulesCSS(resolved.preset, resolved.sectionFormats, resolved.mode);
    const runtimeConfig = buildRuntimeConfig({
      ...resolved.preset,
      hasMarginNotes: resolved.hasMarginNotes,
    });
    runtimeConfigJson = JSON.stringify(runtimeConfig);
    window.__printFormatConfig = runtimeConfig;

    contentHTML = buildPrintHTML(proseContainer, header);
  } else {
    contentHTML = buildSlidesHTML(proseContainer, header);
  }

  const cssPath = format === "print" ? "/styles/paged-book.css" : "/styles/paged-slides.css";
  const criticParam = params.get("critic") === "1" ? "&critic=1" : "";
  const sizeParam =
    format === "print" && resolvedFormatKey !== DEFAULT_PRINT_FORMAT
      ? "&size=" + encodeURIComponent(resolvedFormatKey)
      : "";
  const modeParam =
    format === "print" && resolvedMode === "digital" ? "&mode=digital" : "";
  const spreadParam =
    format === "print" && spreadStart !== "odd" ? "&spread=" + encodeURIComponent(spreadStart) : "";
  const printSearch = "?format=print" + criticParam + sizeParam + modeParam + spreadParam;

  const fontLinks = [
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap" rel="stylesheet">',
  ];

  const extraStylesheetLinks = extraStylesheets.map(
    (href) => '  <link rel="stylesheet" href="' + escapeHtml(href) + '">',
  );

  const pageHTML = [
    "<!DOCTYPE html>",
    '<html lang="en" data-print-format="' +
      escapeHtml(resolvedFormatKey) +
      '" data-print-mode="' +
      escapeHtml(resolvedMode) +
      '" data-print-spread="' +
      (spreadEnabled ? "enabled" : "disabled") +
      '" data-print-spread-start="' +
      escapeHtml(spreadStart) +
      '">',
    "<head>",
    '  <meta charset="utf-8">',
    "  <title>" + escapeHtml(header?.dataset.title || "Print View") + "</title>",
    ...fontLinks,
    '  <link rel="stylesheet" href="/styles/print-formats.css">',
    format === "print" ? '  <style id="print-page-rules">' + pageRulesCSS + "</style>" : "",
    '  <link rel="stylesheet" href="' + cssPath + '">',
    ...extraStylesheetLinks,
    '  <link rel="stylesheet" href="/styles/annotation-colours.css">',
    '  <link rel="stylesheet" href="/styles/annotation-brand.css">',
    '  <script src="/scripts/paged.js"><\/script>',
    '  <script src="/scripts/annotation-print-init.js"><\/script>',
    "  <style>* { box-sizing: border-box; } body { margin: 0; padding: 0; }</style>",
    "</head>",
    '<body class="' + escapeHtml(bodyClass) + '" data-print-search="' +
      escapeHtml(printSearch) +
      '" data-has-margin-notes="' +
      (hasMarginNotes ? "1" : "0") +
      '">',
    '<script>window.__printFormatConfig = ' + runtimeConfigJson + ";<\/script>",
    contentHTML,
    '  <script src="/scripts/paged-post-process.js"><\/script>',
    "</body>",
    "</html>",
  ]
    .filter(Boolean)
    .join("\n");

  renderPrintDocument(pageHTML);
}

function startPrintCapture(format: "print" | "slides"): void {
  if (window.__pagedPrintRendered) return;

  const hasMermaid = document.querySelectorAll('pre[data-language="mermaid"]').length > 0;
  if (hasMermaid) {
    waitForMermaid().then(() => captureAndRenderPrintDocument(format));
    return;
  }

  // Must run synchronously — deferring via Promise microtask can push document.write
  // past the load event, which leaves a blank page in some browsers.
  captureAndRenderPrintDocument(format);
}

export function bootPagedViewer(): void {
  const params = new URLSearchParams(window.location.search);
  const format = params.get("format");
  if (!format || (format !== "print" && format !== "slides")) return;

  scheduleWhenDomReady(() => startPrintCapture(format));
}
export { PRINT_FORMAT_PRESETS, getPrintFormat, isPrintFormatKey, isPrintSpreadStart };
export type { PrintFormatKey, PrintFormatPreset, PrintSpreadStart };
