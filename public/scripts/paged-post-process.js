// paged-post-process.js
// Runs inside the clean document.write() page after content is loaded.
// Transforms annotation components, then runs Paged.js, then positions margin notes + footnotes.

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

  // ============================================
  // 1. TRANSFORM MARGIN NOTES
  // ============================================
  var noteMap = {};

  document.querySelectorAll('.margin-note-anchor').forEach(function(anchor) {
    var noteId = anchor.dataset.note;
    var color = anchor.dataset.color;
    var semanticColor = anchor.dataset.semanticColor || '';
    var label = anchor.dataset.label || '';
    var marginContent = anchor.dataset.marginContent || '';

    if (noteId) noteMap[noteId] = { content: marginContent, label: label, color: color, semanticColor: semanticColor };

    var webSpan = anchor.querySelector('.margin-note-web');
    if (!webSpan) return;

    // Extract body text nodes (slot content before the [n] badge span and tooltip)
    var bodyNodes = [];
    for (var i = 0; i < webSpan.childNodes.length; i++) {
      var child = webSpan.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        // Stop at the [n] badge (has font-sans class) or tooltip (has invisible/opacity-0)
        var cl = child.className || '';
        if (cl.indexOf('font-sans') !== -1 || cl.indexOf('invisible') !== -1 || cl.indexOf('opacity-0') !== -1) break;
      }
      bodyNodes.push(child.cloneNode(true));
    }

    // Create ref span with dotted underline wrapping the body text
    var refSpan = document.createElement('span');
    refSpan.className = 'margin-note-ref';
    refSpan.dataset.note = noteId;
    refSpan.style.textDecoration = 'underline dotted ' + color;
    refSpan.style.textDecorationThickness = '1.5px';
    refSpan.style.textUnderlineOffset = '2px';
    for (var j = 0; j < bodyNodes.length; j++) refSpan.appendChild(bodyNodes[j]);

    // Add [n] number at the end — same font as body text
    var numSpan = document.createElement('span');
    numSpan.style.color = color;
    numSpan.textContent = '\u2009[' + noteId + ']';
    refSpan.appendChild(numSpan);

    // Replace the anchor with the ref span
    anchor.parentNode.replaceChild(refSpan, anchor);
  });

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

    // Sibling after anchor so the call sits on the term, body floats to page bottom
    anchor.parentNode.insertBefore(floatEl, anchor.nextSibling);
  });

  // ============================================
  // 3. RUN PAGED.JS
  // ============================================
  var paged = new Paged.Previewer();
  paged.preview().then(function(flow) {
    console.log('Paged.js rendered', flow.total, 'pages');
    distributeMarginNotes();
    if (typeof window.initPrintRoughAnnotations === 'function') {
      window.initPrintRoughAnnotations().catch(function(err) {
        console.error('Print rough annotation error:', err);
      });
    }
  }).catch(function(err) {
    console.error('Paged.js error:', err);
  });

  // ============================================
  // 4. DISTRIBUTE MARGIN NOTES (after Paged.js)
  // ============================================
  function distributeMarginNotes() {
    var pages = document.querySelectorAll('.pagedjs_page');
    var pagesArray = Array.from(pages);
    var MIN_GAP = 24;
    var LINE_HEIGHT = 12; // approx px per line at 6.5pt with 1.35 line-height
    var PAGE_TOP_MARGIN = 58; // 0.6in ≈ 58px — content starts here
    var PAGE_BOTTOM_CLEARANCE = 80; // reserve for page number

    // Overflow queue: notes that need continuation on subsequent pages
    // Each entry: { noteId, content, label, shownHeight }
    var overflowQueue = [];

    pagesArray.forEach(function(page, pageIndex) {
      var pageRect = page.getBoundingClientRect();
      var pageHeight = pageRect.height;
      var maxBottom = pageHeight - PAGE_BOTTOM_CLEARANCE;
      var lastBottom = 0;

      // First: place overflow continuations from previous pages
      var remainingOverflow = [];
      for (var k = 0; k < overflowQueue.length; k++) {
        var ov = overflowQueue[k];
        var ovTop = lastBottom > 0 ? lastBottom + MIN_GAP : PAGE_TOP_MARGIN;

        if (ovTop > maxBottom - MIN_GAP) {
          remainingOverflow.push(ov);
          continue;
        }

        // Create a container that clips and offsets to show only the unseen portion
        var ovContainer = document.createElement('div');
        ovContainer.className = 'margin-note-item margin-note-continued';
        ovContainer.dataset.note = ov.noteId;
        ovContainer.style.position = 'absolute';
        ovContainer.style.top = ovTop + 'px';
        ovContainer.style.right = '0.25in';
        ovContainer.style.width = '1.5in';
        ovContainer.style.overflow = 'hidden';

        // Inner content shifted up by the amount already shown
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

        // Measure how much is visible
        var availHeight = maxBottom - ovTop;
        var innerFullHeight = ovInner.getBoundingClientRect().height;
        var remainingHeight = innerFullHeight - ov.shownHeight;

        if (remainingHeight <= availHeight) {
          // Fits entirely — no more overflow
          lastBottom = ovTop + remainingHeight;
        } else {
          // Check if only one line would overflow — let it bleed
          var clippedHeight = Math.floor(availHeight / LINE_HEIGHT) * LINE_HEIGHT;
          var stillRemaining = remainingHeight - clippedHeight;

          if (stillRemaining <= LINE_HEIGHT * 1.5) {
            // Allow full remaining — minor bleed
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

      // Now place notes that have references on this page
      var refs = page.querySelectorAll('.margin-note-ref');
      if (refs.length === 0) return;

      var placed = {};

      refs.forEach(function(ref) {
        var noteId = ref.dataset.note;
        if (!noteId || placed[noteId]) return;
        placed[noteId] = true;

        var noteData = noteMap[noteId];
        if (!noteData) return;

        // Get vertical position of ref relative to page
        var refRect = ref.getBoundingClientRect();
        var targetTop = refRect.top - pageRect.top;

        // Overlap resolution
        if (targetTop < lastBottom + MIN_GAP) {
          targetTop = lastBottom + MIN_GAP;
        }

        // Ensure we're within the page's content area
        if (targetTop < PAGE_TOP_MARGIN) {
          targetTop = PAGE_TOP_MARGIN;
        }

        // If can't even start one line, overflow entirely
        if (targetTop > maxBottom - LINE_HEIGHT) {
          overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: 0 });
          return;
        }

        // Create note element
        var noteEl = document.createElement('div');
        noteEl.className = 'margin-note-item';
        noteEl.dataset.note = noteId;
        if (noteData.semanticColor) noteEl.dataset.semanticColor = noteData.semanticColor;
        noteEl.style.position = 'absolute';
        noteEl.style.top = targetTop + 'px';
        noteEl.style.right = '0.25in';
        noteEl.style.width = '1.5in';
        noteEl.style.overflow = 'hidden';

        var innerHTML = '';
        if (noteData.label) {
          innerHTML += '<strong class="margin-note-label">' + noteData.label + '</strong>';
        }
        innerHTML += '<span class="margin-note-num">[' + noteId + ']</span> ' + noteData.content;
        noteEl.innerHTML = innerHTML;

        page.appendChild(noteEl);

        // Measure actual height
        var noteRect = noteEl.getBoundingClientRect();
        var noteBottom = targetTop + noteRect.height;

        if (noteBottom > maxBottom) {
          // Clip at clean line boundary
          var availHeight = maxBottom - targetTop;
          var clippedHeight = Math.floor(availHeight / LINE_HEIGHT) * LINE_HEIGHT;
          var totalHeight = noteRect.height;
          var remainingAfterClip = totalHeight - clippedHeight;

          // If only one line would overflow, let it bleed slightly rather than splitting
          if (remainingAfterClip <= LINE_HEIGHT * 1.5) {
            // Allow the full note — minor bleed into bottom margin
            lastBottom = noteBottom;
          } else if (clippedHeight < LINE_HEIGHT) {
            // Can't fit even one line here — overflow entirely
            noteEl.remove();
            overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: 0 });
            return;
          } else {
            noteEl.style.maxHeight = clippedHeight + 'px';
            lastBottom = targetTop + clippedHeight;
            // Queue continuation with the amount already shown
            overflowQueue.push({ noteId: noteId, content: noteData.content, label: noteData.label, shownHeight: clippedHeight });
          }
        } else {
          lastBottom = noteBottom;
        }
      });
    });
  }
})();
