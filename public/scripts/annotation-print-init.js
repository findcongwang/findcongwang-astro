/**
 * Post-pagination roughNotation init for Paged.js print documents.
 * Loaded in print view; no animations.
 */
(function() {
  var LIBRARY_TYPE_MAP = {
    highlight: 'highlight',
    box: 'box',
    circle: 'circle',
    underline: 'underline',
    bracket: 'bracket',
    strikethrough: 'strike-through',
    'crossed-off': 'crossed-off'
  };

  function readColour(el, type) {
    var custom = el.dataset.customColor;
    if (custom) return custom;

    var inlineHighlight = el.style.getPropertyValue('--annotation-highlight').trim();
    var inlineStroke = el.style.getPropertyValue('--annotation-stroke').trim();
    if (type === 'highlight' && inlineHighlight) return inlineHighlight;
    if (type !== 'highlight' && inlineStroke) return inlineStroke;

    var palette = el.dataset.palette || 'semantic';
    var color = el.dataset.color || 'green';
    var critic = el.dataset.critic === 'true';
    var mode = critic ? 'critic' : 'author';
    var prefix = palette === 'brand'
      ? '--annotation-brand-' + color
      : '--annotation-' + mode + '-' + color;

    var root = document.documentElement;
    var style = getComputedStyle(root);

    if (type === 'highlight') {
      var hl = style.getPropertyValue(prefix + '-highlight').trim();
      if (hl) return hl;
    }

    var stroke = style.getPropertyValue(prefix).trim();
    if (stroke) return stroke;

    return '#666';
  }

  function getBrackets(el) {
    var raw = el.dataset.brackets || 'left';
    var parts = raw.split(',').map(function(s) { return s.trim().toLowerCase(); });
    var out = [];
    ['left', 'right', 'top', 'bottom'].forEach(function(side) {
      if (parts.indexOf(side) !== -1) out.push(side);
    });
    return out.length ? out : ['left'];
  }

  function isVisible(el) {
    var rect = el.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0;
  }

  function syncMarginRefColour(el) {
    var ref = el.dataset.marginRef;
    if (!ref) return;
    var anchor = document.querySelector('.margin-note-anchor[data-note="' + ref + '"]');
    if (!anchor) {
      var refSpan = document.querySelector('.margin-note-ref[data-note="' + ref + '"]');
      if (refSpan && refSpan.style.color) {
        el.style.setProperty('--annotation-resolved-color', refSpan.style.color);
      }
      return;
    }
    if (anchor.dataset.semanticColor) {
      el.dataset.color = anchor.dataset.semanticColor;
      el.dataset.palette = 'semantic';
    } else if (anchor.dataset.color) {
      el.style.setProperty('--annotation-resolved-color', anchor.dataset.color);
    }
  }

  function stripCriticAnnotations() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('critic') === '1') return;

    document.querySelectorAll('[data-critic="true"]').forEach(function(el) {
      el.remove();
    });
  }

  window.initPrintRoughAnnotations = function() {
    stripCriticAnnotations();

    return import('/scripts/rough-notation.esm.js').then(function(mod) {
      var annotate = mod.annotate;
      var pages = document.querySelectorAll('.pagedjs_page');

      pages.forEach(function(page) {
        page.querySelectorAll('[data-rough-annotation]').forEach(function(node) {
          if (!(node instanceof HTMLElement)) return;

          var parent = node.parentElement;
          if (parent) {
            parent.querySelectorAll(':scope > svg.rough-annotation').forEach(function(s) { s.remove(); });
          }
          delete node.dataset.roughAnnotated;

          if (!isVisible(node)) {
            node.classList.add('rough-annotation--css-fallback');
            return;
          }

          syncMarginRefColour(node);

          var rawType = node.dataset.type || 'highlight';
          var libType = LIBRARY_TYPE_MAP[rawType] || 'highlight';
          var isHighlight = rawType === 'highlight';
          var resolvedCustom = node.style.getPropertyValue('--annotation-resolved-color').trim();
          var color = resolvedCustom || readColour(node, rawType);

          var options = {
            type: libType,
            color: color,
            strokeWidth: 1.0,
            animate: false,
            animationDuration: 0,
            padding: 8
          };

          if (isHighlight) options.multiline = true;
          if (rawType === 'bracket') options.brackets = getBrackets(node);

          try {
            var annotation = annotate(node, options);
            annotation.show();
            node.dataset.roughAnnotated = 'true';
          } catch (err) {
            console.warn('Rough annotation fallback for', node, err);
            node.classList.add('rough-annotation--css-fallback');
          }
        });
      });
    }).catch(function(err) {
      console.error('Failed to load rough-notation for print:', err);
      document.querySelectorAll('[data-rough-annotation]').forEach(function(el) {
        el.classList.add('rough-annotation--css-fallback');
      });
    });
  };
})();
