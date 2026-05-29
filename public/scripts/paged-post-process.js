// paged-post-process.js
// Runs inside the clean document.write() page after content is loaded.
// Transforms annotation components, then runs Paged.js, then positions margin notes + footnotes.

(function() {
  // ============================================
  // 1. TRANSFORM MARGIN NOTES
  // ============================================
  var noteMap = {};

  document.querySelectorAll('.margin-note-anchor').forEach(function(anchor) {
    var noteId = anchor.dataset.note;
    var color = anchor.dataset.color;
    var label = anchor.dataset.label || '';
    var marginContent = anchor.dataset.marginContent || '';

    if (noteId) noteMap[noteId] = { content: marginContent, label: label, color: color };

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
  // 2. TRANSFORM FOOTNOTES
  // ============================================
  var footnoteMap = {};

  document.querySelectorAll('.footnote-anchor').forEach(function(el) {
    var id = el.dataset.footnote;
    var content = el.dataset.footnoteContent;
    if (id) footnoteMap[id] = content;
  });

  // Hide web footnote tooltips, show anchor refs
  document.querySelectorAll('.footnote-web').forEach(function(el) {
    el.style.display = 'none';
  });

  // ============================================
  // 3. RUN PAGED.JS
  // ============================================
  var paged = new Paged.Previewer();
  paged.preview().then(function(flow) {
    console.log('Paged.js rendered', flow.total, 'pages');
    distributeMarginNotes();
    distributeFootnotes();
  }).catch(function(err) {
    console.error('Paged.js error:', err);
  });

  // ============================================
  // 4. DISTRIBUTE MARGIN NOTES (after Paged.js)
  // ============================================
  function distributeMarginNotes() {
    var pages = document.querySelectorAll('.pagedjs_page');
    var MIN_GAP = 32;

    pages.forEach(function(page) {
      var refs = page.querySelectorAll('.margin-note-ref');
      if (refs.length === 0) return;

      var pageRect = page.getBoundingClientRect();
      var placed = {};
      var lastBottom = 0;

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

        // Create note element
        var noteEl = document.createElement('div');
        noteEl.className = 'margin-note-item';
        noteEl.dataset.note = noteId;
      noteEl.style.position = 'absolute';
      noteEl.style.top = targetTop + 'px';
      noteEl.style.right = '0.25in';
      noteEl.style.width = '1.5in';

        var innerHTML = '';
        if (noteData.label) {
          innerHTML += '<strong class="margin-note-label">' + noteData.label + '</strong>';
        }
        innerHTML += '<span class="margin-note-num">[' + noteId + ']</span> ' + noteData.content;
        noteEl.innerHTML = innerHTML;

        page.appendChild(noteEl);

        // Measure actual height for next overlap check
        var noteRect = noteEl.getBoundingClientRect();
        lastBottom = targetTop + noteRect.height;
      });
    });
  }

  // ============================================
  // 5. DISTRIBUTE FOOTNOTES (after Paged.js)
  // ============================================
  function distributeFootnotes() {
    var pages = document.querySelectorAll('.pagedjs_page');

    pages.forEach(function(page) {
      var anchors = page.querySelectorAll('.footnote-anchor');
      if (anchors.length === 0) return;

      var footnotesContainer = document.createElement('div');
      footnotesContainer.className = 'page-footnotes';

      var placed = {};
      anchors.forEach(function(anchor) {
        var id = anchor.dataset.footnote;
        if (!id || placed[id]) return;
        placed[id] = true;

        var content = footnoteMap[id];
        if (content) {
          var noteEl = document.createElement('div');
          noteEl.className = 'footnote-item';
          noteEl.innerHTML = '<span class="footnote-num">' + id + '.</span> ' + content;
          footnotesContainer.appendChild(noteEl);
        }
      });

      if (footnotesContainer.children.length > 0) {
        page.appendChild(footnotesContainer);
      }
    });
  }
})();
