// paged-post-process.js
// Runs inside the clean document.write() page after content is loaded.
// Transforms annotation components, then runs Paged.js, then positions margin notes.

(function() {
  // ============================================
  // 0. STRIP CRITIC LAYER (unless ?critic=1)
  // ============================================
  var urlParams = new URLSearchParams(window.location.search);
  var includeCritic = urlParams.get('critic') === '1';

  if (!includeCritic) {
    document.querySelectorAll('[data-critic="true"]').forEach(function(el) {
      el.remove();
    });
  }

  var formatConfig = window.__printFormatConfig || {};
  var hasMarginNotes = document.body.dataset.hasMarginNotes === '1' && formatConfig.hasMarginNotes !== false;

  // ============================================
  // 1. TRANSFORM MARGIN NOTES
  // ============================================
  var noteMap = {};
  var noteOrder = [];

  document.querySelectorAll('.margin-note-anchor').forEach(function(anchor) {
    var noteId = anchor.dataset.note;
    var color = anchor.dataset.color;
    var semanticColor = anchor.dataset.semanticColor || '';
    var label = anchor.dataset.label || '';
    var marginContent = anchor.dataset.marginContent || '';

    if (noteId) {
      if (!noteMap[noteId]) noteOrder.push(noteId);
      noteMap[noteId] = { content: marginContent, label: label, color: color, semanticColor: semanticColor };
    }

    var webSpan = anchor.querySelector('.margin-note-web');
    if (!webSpan) return;

    var bodyNodes = [];
    for (var i = 0; i < webSpan.childNodes.length; i++) {
      var child = webSpan.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        var cl = child.className || '';
        if (cl.indexOf('font-sans') !== -1 || cl.indexOf('invisible') !== -1 || cl.indexOf('opacity-0') !== -1) break;
      }
      bodyNodes.push(child.cloneNode(true));
    }

    var refSpan = document.createElement('span');
    refSpan.className = 'margin-note-ref';
    refSpan.dataset.note = noteId;
    refSpan.style.textDecoration = 'underline dotted ' + color;
    refSpan.style.textDecorationThickness = '1.5px';
    refSpan.style.textUnderlineOffset = '2px';
    for (var j = 0; j < bodyNodes.length; j++) refSpan.appendChild(bodyNodes[j]);

    var numSpan = document.createElement('span');
    numSpan.style.color = color;
    numSpan.textContent = '\u2009[' + noteId + ']';
    refSpan.appendChild(numSpan);

    anchor.parentNode.replaceChild(refSpan, anchor);
  });

  // ============================================
  // 1b. ENDNOTE FALLBACK (non-annotated formats)
  // ============================================
  if (!hasMarginNotes && noteOrder.length > 0) {
    var endnotesSection = document.createElement('section');
    endnotesSection.className = 'print-endnotes';
    endnotesSection.innerHTML = '<h2>Notes</h2>';

    noteOrder.forEach(function(noteId) {
      var noteData = noteMap[noteId];
      if (!noteData) return;

      var item = document.createElement('div');
      item.className = 'print-endnote-item';
      if (noteData.semanticColor) item.dataset.semanticColor = noteData.semanticColor;

      var innerHTML = '<span class="print-endnote-num">[' + noteId + ']</span> ';
      if (noteData.label) {
        innerHTML += '<strong class="print-endnote-label">' + noteData.label + '</strong> ';
      }
      innerHTML += noteData.content;
      item.innerHTML = innerHTML;
      endnotesSection.appendChild(item);
    });

    document.body.appendChild(endnotesSection);
  }

  // ============================================
  // 2. TRANSFORM FOOTNOTES (Paged.js float: footnote)
  // ============================================

  document.querySelectorAll('.footnote-web').forEach(function(el) {
    el.style.display = 'none';
  });

  document.querySelectorAll('.footnote-anchor').forEach(function(anchor) {
    var id = anchor.dataset.footnote;
    var content = anchor.dataset.footnoteContent;
    if (!content) return;

    if (anchor.dataset.semanticColor) {
      anchor.style.setProperty(
        '--footnote-call-color',
        'var(--annotation-author-' + anchor.dataset.semanticColor + ')'
      );
    } else if (anchor.dataset.color) {
      anchor.style.setProperty('--footnote-call-color', anchor.dataset.color);
    }

    var sup = anchor.querySelector('.footnote-ref');
    if (sup) sup.remove();

    var floatEl = document.createElement('span');
    floatEl.className = 'footnote-float';
    floatEl.dataset.footnote = id;
    floatEl.textContent = content;
    var callColor = anchor.style.getPropertyValue('--footnote-call-color');
    if (callColor) {
      floatEl.style.setProperty('--footnote-call-color', callColor);
    }

    anchor.parentNode.insertBefore(floatEl, anchor.nextSibling);
  });

  // ============================================
  // 3. RUN PAGED.JS
  // ============================================
  var paged = new Paged.Previewer();
  paged.preview().then(function(flow) {
    console.log('Paged.js rendered', flow.total, 'pages');
    if (hasMarginNotes) {
      distributeMarginNotes();
    }
    if (typeof window.initPrintRoughAnnotations === 'function') {
      window.initPrintRoughAnnotations().catch(function(err) {
        console.error('Print rough annotation error:', err);
      });
    }

    // Inject print-clean styles AFTER Paged.js finishes rendering.
    // These are injected via JS (not in the CSS file) because Paged.js
    // interprets @media print rules during its polyfill pass and would
    // apply them to the web preview. By injecting after rendering,
    // they only take effect when the browser enters print mode.
    var printCleanStyle = document.createElement('style');
    printCleanStyle.id = 'print-clean-styles';
    printCleanStyle.textContent = '@media print { body.paged-mode { background: white !important; } .pagedjs_pages { padding: 0 !important; gap: 0 !important; row-gap: 0 !important; column-gap: 0 !important; } .pagedjs_page { box-shadow: none !important; border: none !important; margin: 0 !important; page-break-after: always; break-after: page; overflow: visible !important; } .pagedjs_page:last-child { page-break-after: auto; break-after: auto; } }';
    document.head.appendChild(printCleanStyle);

  }).catch(function(err) {
    console.error('Paged.js error:', err);
  });

  // ============================================
  // 4. DISTRIBUTE MARGIN NOTES (after Paged.js)
  // ============================================
  function distributeMarginNotes() {
    var pages = document.querySelectorAll('.pagedjs_page');
    var pagesArray = Array.from(pages);
    if (pagesArray.length === 0) return;

    var cfg = window.__printFormatConfig || {};
    var MIN_GAP = cfg.minGap || 24;
    var LINE_HEIGHT = cfg.lineHeight || 12;
    var PAGE_BOTTOM_CLEARANCE = cfg.pageBottomClearance || 80;
    var marginNoteRight = cfg.marginNoteInset || '0.25in';
    var marginNoteWidth = cfg.marginNoteWidth || '1.5in';

    var firstPage = pagesArray[0];
    var firstPageRect = firstPage.getBoundingClientRect();
    var contentArea = firstPage.querySelector('.pagedjs_page_content');
    var PAGE_TOP_MARGIN = 58;
    if (contentArea) {
      var contentRect = contentArea.getBoundingClientRect();
      PAGE_TOP_MARGIN = contentRect.top - firstPageRect.top;
    } else if (cfg.marginTop) {
      PAGE_TOP_MARGIN = parseLengthToPx(cfg.marginTop, firstPageRect.height);
    }

    var overflowQueue = [];

    pagesArray.forEach(function(page) {
      var pageRect = page.getBoundingClientRect();
      var pageHeight = pageRect.height;
      var maxBottom = pageHeight - PAGE_BOTTOM_CLEARANCE;
      var lastBottom = 0;

      var remainingOverflow = [];
      for (var k = 0; k < overflowQueue.length; k++) {
        var ov = overflowQueue[k];
        var ovTop = lastBottom > 0 ? lastBottom + MIN_GAP : PAGE_TOP_MARGIN;

        if (ovTop > maxBottom - MIN_GAP) {
          remainingOverflow.push(ov);
          continue;
        }

        var ovContainer = document.createElement('div');
        ovContainer.className = 'margin-note-item margin-note-continued';
        ovContainer.dataset.note = ov.noteId;
        ovContainer.style.position = 'absolute';
        ovContainer.style.top = ovTop + 'px';
        ovContainer.style.right = marginNoteRight;
        ovContainer.style.width = marginNoteWidth;
        ovContainer.style.overflow = 'hidden';

        var ovInner = document.createElement('div');
        ovInner.style.marginTop = '-' + ov.shownHeight + 'px';
        var innerHTML = '';
        if (ov.label) {
          innerHTML += '<strong class="margin-note-label">' + ov.label + '</strong>';
        }
        innerHTML += '<span class="margin-note-num">[' + ov.noteId + ']</span> ' + ov.content;
        ovInner.innerHTML = innerHTML;
        ovContainer.appendChild(ovInner);

        page.appendChild(ovContainer);

        var availHeight = maxBottom - ovTop;
        var innerFullHeight = ovInner.getBoundingClientRect().height;
        var remainingHeight = innerFullHeight - ov.shownHeight;

        if (remainingHeight <= availHeight) {
          lastBottom = ovTop + remainingHeight;
        } else {
          var clippedHeight = Math.floor(availHeight / LINE_HEIGHT) * LINE_HEIGHT;
          var stillRemaining = remainingHeight - clippedHeight;

          if (stillRemaining <= LINE_HEIGHT * 1.5) {
            lastBottom = ovTop + remainingHeight;
          } else {
            ovContainer.style.maxHeight = clippedHeight + 'px';
            lastBottom = ovTop + clippedHeight;
            remainingOverflow.push({
              noteId: ov.noteId,
              content: ov.content,
              label: ov.label,
              shownHeight: ov.shownHeight + clippedHeight
            });
          }
        }
      }
      overflowQueue = remainingOverflow;

      var refs = page.querySelectorAll('.margin-note-ref');
      if (refs.length === 0) return;

      var placed = {};

      refs.forEach(function(ref) {
        var noteId = ref.dataset.note;
        if (!noteId || placed[noteId]) return;
        placed[noteId] = true;

        var noteData = noteMap[noteId];
        if (!noteData) return;

        var refRect = ref.getBoundingClientRect();
        var targetTop = refRect.top - pageRect.top;

        if (targetTop < lastBottom + MIN_GAP) {
          targetTop = lastBottom + MIN_GAP;
        }

        if (targetTop < PAGE_TOP_MARGIN) {
          targetTop = PAGE_TOP_MARGIN;
        }

        if (targetTop > maxBottom - LINE_HEIGHT) {
          overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: 0 });
          return;
        }

        var noteEl = document.createElement('div');
        noteEl.className = 'margin-note-item';
        noteEl.dataset.note = noteId;
        if (noteData.semanticColor) noteEl.dataset.semanticColor = noteData.semanticColor;
        noteEl.style.position = 'absolute';
        noteEl.style.top = targetTop + 'px';
        noteEl.style.right = marginNoteRight;
        noteEl.style.width = marginNoteWidth;
        noteEl.style.overflow = 'hidden';

        var noteInnerHTML = '';
        if (noteData.label) {
          noteInnerHTML += '<strong class="margin-note-label">' + noteData.label + '</strong>';
        }
        noteInnerHTML += '<span class="margin-note-num">[' + noteId + ']</span> ' + noteData.content;
        noteEl.innerHTML = noteInnerHTML;

        page.appendChild(noteEl);

        var noteRect = noteEl.getBoundingClientRect();
        var noteBottom = targetTop + noteRect.height;

        if (noteBottom > maxBottom) {
          var availHeight = maxBottom - targetTop;
          var clippedHeight = Math.floor(availHeight / LINE_HEIGHT) * LINE_HEIGHT;
          var totalHeight = noteRect.height;
          var remainingAfterClip = totalHeight - clippedHeight;

          if (remainingAfterClip <= LINE_HEIGHT * 1.5) {
            lastBottom = noteBottom;
          } else if (clippedHeight < LINE_HEIGHT) {
            noteEl.remove();
            overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: 0 });
            return;
          } else {
            noteEl.style.maxHeight = clippedHeight + 'px';
            lastBottom = targetTop + clippedHeight;
            overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: clippedHeight });
          }
        } else {
          lastBottom = noteBottom;
        }
      });
    });
  }

  function parseLengthToPx(value, referencePx) {
    if (!value) return 0;
    var match = String(value).trim().match(/^([\d.]+)(in|px|pt|rem|em)?$/);
    if (!match) return 0;
    var num = parseFloat(match[1]);
    var unit = match[2] || 'px';
    if (unit === 'in') return num * 96;
    if (unit === 'pt') return num * (96 / 72);
    if (unit === 'rem' || unit === 'em') return num * 16;
    if (unit === 'px') return num;
    return num * (referencePx || 96);
  }
})();
