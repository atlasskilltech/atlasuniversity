
/*
 * GENERATED from reference/brand/assets/js/pdf-tools.js by a port script — the reference's own 25
 * PDF tool implementations and registry, unchanged in behaviour. Differences from the source:
 *   - pdf-lib 1.17.1, pdf.js 3.11.174 (+worker) and JSZip 3.10.1 load from /assets/brand/vendor/
 *     (byte-identical, SRI-verified copies of the pinned cdnjs files) instead of the CDN;
 *   - colour classes use the project's brand.* tokens and the breakpoints its n640 / n1024;
 *   - the page toast is replaced by the /brand toast (setToast);
 *   - the dashboard / routing half of the file lives in components/Brand/tools/PdfTools.js.
 * Everything runs in the browser; nothing is uploaded.
 */
let __toast = () => {};
export function setToast(fn) {
  __toast = (msg, isError) => fn(msg, { error: !!isError });
}

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Limits (guard against runaway memory) ---------- */
  var MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB per PDF
  var MAX_IMG_BYTES = 30 * 1024 * 1024;   // 30 MB per image
  var MAX_FILES = 30;                     // files per batch
  var THUMB_PAGE_CAP = 300;               // don't auto-render thumbnails past this

  /* ---------- Pinned CDN sources ---------- */
  var CDN = {
    pdflib: "/assets/brand/vendor/pdf-lib-1.17.1-pdf-lib.min.js",
    pdfjs: "/assets/brand/vendor/pdf.js-3.11.174-pdf.min.js",
    pdfjsWorker: "/assets/brand/vendor/pdf.js-3.11.174-pdf.worker.min.js",
    jszip: "/assets/brand/vendor/jszip-3.10.1-jszip.min.js"
  };

  /* ================================================================
     Small shared helpers
     ================================================================ */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtSize(bytes) {
    if (bytes == null) return "—";
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
    return bytes + " B";
  }
  function baseName(name) {
    var i = name.lastIndexOf(".");
    return i > 0 ? name.slice(0, i) : name;
  }
  function raf() { return new Promise(function (r) { requestAnimationFrame(function () { r(); }); }); }

  // Read a File/Blob into an ArrayBuffer.
  function readArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(new Error("The file could not be read.")); };
      fr.readAsArrayBuffer(file);
    });
  }
  // A detached-safe copy of an ArrayBuffer (pdf.js transfers buffers to its
  // worker and detaches them, so each consumer gets its own copy).
  function copyBuf(ab) { return ab.slice(0); }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }
  function downloadBytes(bytes, filename, mime) {
    downloadBlob(new Blob([bytes], { type: mime || "application/octet-stream" }), filename);
  }

  /* ================================================================
     Lazy library loaders (cached promises)
     ================================================================ */
  var scriptCache = {};
  function loadScript(src) {
    if (scriptCache[src]) return scriptCache[src];
    scriptCache[src] = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        delete scriptCache[src];
        reject(new Error("Couldn't load a required library. Reload the page and try again."));
      };
      document.head.appendChild(s);
    });
    return scriptCache[src];
  }
  function ensurePdfLib() {
    return loadScript(CDN.pdflib).then(function () {
      if (!window.PDFLib) throw new Error("The PDF engine failed to initialise.");
      return window.PDFLib;
    });
  }
  var pdfjsReady;
  function ensurePdfjs() {
    if (pdfjsReady) return pdfjsReady;
    pdfjsReady = loadScript(CDN.pdfjs).then(function () {
      if (!window.pdfjsLib) throw new Error("The PDF viewer failed to initialise.");
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN.pdfjsWorker;
      return window.pdfjsLib;
    });
    return pdfjsReady;
  }
  function ensureJSZip() {
    return loadScript(CDN.jszip).then(function () {
      if (!window.JSZip) throw new Error("The archive library failed to initialise.");
      return window.JSZip;
    });
  }

  /* ---------- PDF helpers built on the libraries ---------- */

  // Load an ArrayBuffer into a pdf-lib PDFDocument. `ignoreEncryption` lets
  // some owner-restricted files through; genuinely encrypted content still fails.
  function loadPdfLibDoc(PDFLib, ab, opts) {
    opts = opts || {};
    return PDFLib.PDFDocument.load(copyBuf(ab), {
      ignoreEncryption: opts.ignoreEncryption !== false,
      throwOnInvalidObject: false,
      updateMetadata: false
    });
  }
  // Open an ArrayBuffer with pdf.js. Resolves with the PDFDocumentProxy.
  function openPdfjs(pdfjsLib, ab, password) {
    var params = { data: new Uint8Array(copyBuf(ab)) };
    if (password != null) params.password = password;
    return pdfjsLib.getDocument(params).promise;
  }

  // Render one pdf.js page to a fresh canvas sized to `cssWidth` (device-pixel aware).
  function renderPageToCanvas(page, cssWidth, maxScale) {
    var base = page.getViewport({ scale: 1 });
    var scale = cssWidth / base.width;
    if (maxScale && scale > maxScale) scale = maxScale;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var vp = page.getViewport({ scale: scale * dpr });
    var canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    canvas.style.width = Math.round(vp.width / dpr) + "px";
    canvas.style.height = Math.round(vp.height / dpr) + "px";
    var ctx = canvas.getContext("2d");
    return page.render({ canvasContext: ctx, viewport: vp }).promise.then(function () { return canvas; });
  }

  function canvasToBlob(canvas, mime, quality) {
    return new Promise(function (resolve, reject) {
      if (canvas.toBlob) {
        canvas.toBlob(function (b) { b ? resolve(b) : reject(new Error("Image export failed.")); }, mime, quality);
      } else {
        try {
          var d = canvas.toDataURL(mime, quality), parts = d.split(","), bin = atob(parts[1]);
          var arr = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          resolve(new Blob([arr], { type: mime }));
        } catch (e) { reject(new Error("Image export failed.")); }
      }
    });
  }

  // Parse "1-3,5,8-10" into 0-based indices. Preserves typed order, de-duplicated.
  function parsePageRanges(str, total) {
    var out = [], seen = {};
    String(str).split(",").forEach(function (part) {
      part = part.trim();
      if (!part) return;
      var m = part.match(/^(\d+)\s*(?:-|–|to)\s*(\d+)$/i);
      if (m) {
        var a = parseInt(m[1], 10), b = parseInt(m[2], 10);
        if (!a || !b || a > total || b > total) throw new Error("Page numbers must be between 1 and " + total + ".");
        var step = a <= b ? 1 : -1;
        for (var n = a; step > 0 ? n <= b : n >= b; n += step) {
          if (!seen[n]) { seen[n] = 1; out.push(n - 1); }
        }
      } else if (/^\d+$/.test(part)) {
        var p = parseInt(part, 10);
        if (!p || p > total) throw new Error("Page numbers must be between 1 and " + total + ".");
        if (!seen[p]) { seen[p] = 1; out.push(p - 1); }
      } else {
        throw new Error('Could not read "' + part + '". Use formats like 1-3, 5, 8-10.');
      }
    });
    return out;
  }

  /* ================================================================
     Workspace scaffold

     Most tools share the same chrome: a dropzone, a list of selected
     files, an options card with Process / Download / Reset buttons and
     a status line, plus an output/preview column. `scaffold()` builds
     that and returns references so each tool only writes its specifics.
     ================================================================ */

  var DROP_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24" class="mx-auto h-8 w-8 text-brand-indigo" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>';

  function wireDrop(el, onFiles) {
    ["dragenter", "dragover"].forEach(function (ev) {
      el.addEventListener(ev, function (e) { e.preventDefault(); el.classList.add("border-brand-teal", "bg-brand-teal/5"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      el.addEventListener(ev, function (e) {
        e.preventDefault();
        if (ev === "dragleave" && el.contains(e.relatedTarget)) return;
        el.classList.remove("border-brand-teal", "bg-brand-teal/5");
      });
    });
    el.addEventListener("drop", function (e) {
      var files = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null;
      if (files && files.length) onFiles(files);
    });
  }

  // kind: pdf | image | any ; multiple: boolean
  function scaffold(ctx, opts) {
    opts = opts || {};
    var multiple = !!opts.multiple;
    var accept = opts.accept || ".pdf,application/pdf";
    var hint = opts.hint || (multiple ? "Select one or more PDF files" : "Select a PDF file");

    ctx.body.innerHTML =
      '<div class="grid grid-cols-1 gap-8 n1024:grid-cols-[22rem_1fr]">' +
        '<div class="flex flex-col gap-5">' +
          // Dropzone
          '<label class="group block cursor-pointer rounded-2xl border-2 border-dashed border-brand-line bg-white p-6 text-center transition hover:border-brand-teal focus-within:border-brand-teal" data-drop>' +
            '<input type="file" accept="' + esc(accept) + '"' + (multiple ? " multiple" : "") + ' class="sr-only" data-input>' +
            DROP_SVG +
            '<p class="mt-2 text-sm font-bold text-brand-indigo">Drop ' + (multiple ? "files" : "a file") + ' here</p>' +
            '<p class="mt-0.5 text-xs text-brand-ink">or <span class="font-semibold text-brand-teal underline">browse</span> &middot; ' + esc(hint) + '</p>' +
          '</label>' +
          // Selected files
          '<div data-files class="hidden flex-col gap-2"></div>' +
          // Options card
          '<div data-optcard class="hidden rounded-2xl bg-white p-5 ring-1 ring-brand-line">' +
            '<div data-controls class="space-y-4"></div>' +
            '<div class="mt-5 flex flex-wrap gap-2">' +
              '<button type="button" data-run class="inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal focus-visible:ring-4 focus-visible:ring-brand-teal/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-indigo">' + esc(opts.runLabel || "Process") + '</button>' +
              '<button type="button" data-dl hidden class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-indigo/30 transition hover:bg-brand-indigo hover:text-white focus-visible:ring-4 focus-visible:ring-brand-teal/40">Download</button>' +
              '<button type="button" data-reset class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white focus-visible:ring-4 focus-visible:ring-brand-teal/40">Reset</button>' +
            '</div>' +
            '<p data-status class="mt-3 text-xs font-semibold text-brand-ink" aria-live="polite" role="status"></p>' +
          '</div>' +
        '</div>' +
        // Output / preview column
        '<div>' +
          '<div data-empty class="rounded-2xl border-2 border-dashed border-brand-line p-10 text-center text-sm text-brand-ink/70">' + esc(opts.emptyText || "Add a PDF to get started.") + '</div>' +
          '<div data-out class="hidden"></div>' +
        '</div>' +
      '</div>';

    var E = {
      drop: $("[data-drop]", ctx.body),
      input: $("[data-input]", ctx.body),
      files: $("[data-files]", ctx.body),
      optcard: $("[data-optcard]", ctx.body),
      controls: $("[data-controls]", ctx.body),
      run: $("[data-run]", ctx.body),
      dl: $("[data-dl]", ctx.body),
      reset: $("[data-reset]", ctx.body),
      status: $("[data-status]", ctx.body),
      empty: $("[data-empty]", ctx.body),
      out: $("[data-out]", ctx.body)
    };
    ctx.E = E;

    E.setStatus = function (msg, kind) {
      E.status.textContent = msg || "";
      E.status.className = "mt-3 text-xs font-semibold " +
        (kind === "err" ? "text-brand-ugdx" : kind === "ok" ? "text-brand-teal" : "text-brand-ink");
    };
    E.showOut = function (html) {
      E.empty.classList.add("hidden");
      E.out.classList.remove("hidden");
      if (html != null) E.out.innerHTML = html;
    };
    E.busy = function (on) {
      E.run.disabled = on;
      E.run.textContent = on ? "Working…" : (opts.runLabel || "Process");
    };
    return E;
  }

  /* ---------- File-pill rendering + validation ---------- */

  function filePill(file, idx, removable) {
    return '<div class="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-brand-line" data-pill="' + idx + '">' +
      '<svg aria-hidden="true" viewBox="0 0 24 24" class="h-7 w-7 shrink-0 text-brand-indigo" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/></svg>' +
      '<div class="min-w-0 flex-1">' +
        '<p class="truncate text-sm font-bold text-brand-indigo">' + esc(file.name) + '</p>' +
        '<p class="text-xs text-brand-ink">' + fmtSize(file.size) + '</p>' +
      '</div>' +
      (removable ? '<button type="button" data-remove="' + idx + '" aria-label="Remove ' + esc(file.name) + '" class="shrink-0 rounded-md p-1.5 text-brand-ink ring-1 ring-inset ring-brand-line transition hover:bg-brand-ugdx hover:text-white"><svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' : "") +
      '</div>';
  }

  function validatePdf(file) {
    var okType = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!okType) return "“" + file.name + "” is not a PDF file.";
    if (file.size > MAX_FILE_BYTES) return "“" + file.name + "” is larger than " + fmtSize(MAX_FILE_BYTES) + ".";
    if (file.size === 0) return "“" + file.name + "” is empty.";
    return null;
  }
  function validateImage(file) {
    var okType = /^image\/(jpeg|png)$/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
    if (!okType) return "“" + file.name + "” is not a JPG or PNG image.";
    if (file.size > MAX_IMG_BYTES) return "“" + file.name + "” is larger than " + fmtSize(MAX_IMG_BYTES) + ".";
    if (file.size === 0) return "“" + file.name + "” is empty.";
    return null;
  }

  /* ================================================================
     Tool implementations
     Each `build(ctx)` owns #ws-body. `ctx` provides:
       ctx.body         -> the container element
       ctx.onCleanup(fn)-> register a teardown (revoke URLs, destroy docs)
     ================================================================ */

  var TOOLS = [];

  // Shared "load a single PDF, then enable controls" harness used by most tools.
  // cfg: { runLabel, emptyText, controlsHTML, onReady(ctx,E,state), run(ctx,E,state) }
  function singlePdfTool(cfg) {
    return function (ctx) {
      var E = scaffold(ctx, { multiple: false, runLabel: cfg.runLabel, emptyText: cfg.emptyText || "Add a PDF to preview its pages." });
      var state = { file: null, ab: null, outBytes: null, outName: null, pdfjsDoc: null, thumbs: null };

      ctx.onCleanup(function () {
        if (state.pdfjsDoc) { try { state.pdfjsDoc.destroy(); } catch (e) {} }
      });

      function reset() {
        if (state.pdfjsDoc) { try { state.pdfjsDoc.destroy(); } catch (e) {} }
        state.file = state.ab = state.outBytes = state.outName = state.pdfjsDoc = null;
        E.files.classList.add("hidden"); E.files.innerHTML = "";
        E.optcard.classList.add("hidden");
        E.empty.classList.remove("hidden");
        E.out.classList.add("hidden"); E.out.innerHTML = "";
        E.dl.hidden = true;
        E.input.value = "";
        E.setStatus("");
      }

      function onFile(file) {
        var err = validatePdf(file);
        if (err) { __toast(err, true); return; }
        reset();
        state.file = file;
        E.files.classList.remove("hidden");
        E.files.innerHTML = filePill(file, 0, false);
        E.optcard.classList.remove("hidden");
        E.setStatus("Reading…");
        readArrayBuffer(file).then(function (ab) {
          state.ab = ab;
          E.setStatus("");
          if (cfg.onReady) cfg.onReady(ctx, E, state);
        }).catch(function (e) { E.setStatus(e.message || "Could not read the file.", "err"); });
      }

      E.input.addEventListener("change", function () { if (E.input.files[0]) onFile(E.input.files[0]); });
      wireDrop(E.drop, function (files) { onFile(files[0]); });
      E.reset.addEventListener("click", function () { reset(); __toast("Cleared"); });
      E.dl.addEventListener("click", function () {
        if (state.outBytes) downloadBytes(state.outBytes, state.outName, "application/pdf");
      });
      E.run.addEventListener("click", function () {
        if (!state.ab) { __toast("Add a PDF first.", true); return; }
        E.busy(true); E.setStatus("Working…");
        Promise.resolve().then(function () { return cfg.run(ctx, E, state); })
          .then(function () { E.busy(false); })
          .catch(function (e) { E.busy(false); E.setStatus(e.message || "Something went wrong.", "err"); __toast(e.message || "Something went wrong.", true); });
      });

      if (cfg.controlsHTML) E.controls.innerHTML = cfg.controlsHTML;
    };
  }

  // Helper: finish a single-PDF tool by storing output bytes and showing a result panel.
  function finishPdf(E, state, bytes, outName, note) {
    state.outBytes = bytes;
    state.outName = outName;
    E.dl.hidden = false;
    E.setStatus("Ready. " + fmtSize(bytes.length) + (note ? " · " + note : ""), "ok");
    E.showOut(
      '<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line">' +
        '<svg aria-hidden="true" viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg>' +
        '<p class="mt-3 text-sm font-bold text-brand-indigo">Your PDF is ready</p>' +
        '<p class="mt-1 text-xs text-brand-ink">' + esc(outName) + ' &middot; ' + fmtSize(bytes.length) + '</p>' +
        (note ? '<p class="mt-2 text-xs text-brand-ink/80">' + esc(note) + '</p>' : "") +
        '<button type="button" data-outdl class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">' +
          '<svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>Download PDF</button>' +
      '</div>'
    );
    var b = $("[data-outdl]", E.out);
    if (b) b.addEventListener("click", function () { downloadBytes(bytes, outName, "application/pdf"); });
    __toast("Done");
  }

  /* ---------- Thumbnail grid (used by page-selection tools) ---------- */
  // Renders a selectable grid of page thumbnails into `container`.
  // Returns { indices() } giving selected 0-based page indices in display order.
  function buildThumbGrid(container, pdfjsDoc, ab, mode, onChange) {
    // mode: 'multi' (checkbox select), 'reorder' (drag to reorder)
    var total = pdfjsDoc.numPages;
    var selected = {};           // index -> bool (multi)
    var order = [];              // array of 0-based indices (reorder)
    for (var i = 0; i < total; i++) { selected[i] = true; order.push(i); }

    container.innerHTML =
      (mode === "multi"
        ? '<div class="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">' +
            '<button type="button" data-all class="rounded-lg px-3 py-1.5 text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white">Select all</button>' +
            '<button type="button" data-none class="rounded-lg px-3 py-1.5 text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white">Select none</button>' +
            '<span data-count class="text-brand-ink"></span>' +
          '</div>'
        : '<p class="mb-3 text-xs font-semibold text-brand-ink">Drag a page, or use the arrows, to change its order.</p>') +
      '<div data-grid class="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 n1024:grid-cols-4"></div>';

    var grid = $("[data-grid]", container);
    var countEl = $("[data-count]", container);

    function card(idx, pos) {
      var sel = selected[idx];
      return '<div data-card="' + idx + '" ' + (mode === "reorder" ? 'draggable="true" ' : "") +
        'class="group relative overflow-hidden rounded-xl bg-white [background-image:repeating-conic-gradient(#ECECEC_0_25%,transparent_0_50%)] [background-size:16px_16px] ring-1 ring-brand-line ' +
        (mode === "multi" ? "cursor-pointer " : "cursor-move ") +
        (mode === "multi" && !sel ? "opacity-40 " : "") +
        'aria-selected:ring-2">' +
        '<div data-slot class="grid min-h-[120px] place-items-center p-2"><span class="text-[11px] text-brand-ink/50">page ' + (idx + 1) + '</span></div>' +
        '<div class="flex items-center justify-between gap-1 border-t border-brand-line bg-white/90 px-2 py-1 text-[11px] font-bold text-brand-indigo">' +
          '<span>' + (mode === "reorder" ? '#' + (pos + 1) + ' · p' + (idx + 1) : 'Page ' + (idx + 1)) + '</span>' +
          (mode === "multi"
            ? '<span data-check>' + (sel
                ? '<svg viewBox="0 0 24 24" class="h-4 w-4 text-brand-teal" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>'
                : '<span class="inline-block h-4 w-4 rounded border border-brand-line"></span>') + '</span>'
            : '<span class="flex gap-1">' +
                '<button type="button" data-mv="-1" aria-label="Move earlier" class="rounded p-0.5 ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white"><svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 18l-6-6 6-6"/></svg></button>' +
                '<button type="button" data-mv="1" aria-label="Move later" class="rounded p-0.5 ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white"><svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 18l6-6-6-6"/></svg></button>' +
              '</span>') +
        '</div>' +
      '</div>';
    }

    function paint() {
      if (mode === "multi") {
        grid.innerHTML = order.map(function (idx) { return card(idx, 0); }).join("");
      } else {
        grid.innerHTML = order.map(function (idx, pos) { return card(idx, pos); }).join("");
      }
      updateCount();
      renderVisibleThumbs();
      if (onChange) onChange();
    }
    function updateCount() {
      if (!countEl) return;
      var n = Object.keys(selected).filter(function (k) { return selected[k]; }).length;
      countEl.textContent = n + " of " + total + " selected";
    }

    // Render thumbnails progressively (don't block the UI on big documents).
    var rendered = {};
    function renderVisibleThumbs() {
      if (total > THUMB_PAGE_CAP) return; // too many pages: labels only
      order.forEach(function (idx) {
        if (rendered[idx]) {
          // Re-attach the already-rendered canvas to its (possibly new) card.
          var slot = $('[data-card="' + idx + '"] [data-slot]', grid);
          if (slot && rendered[idx].parentNode !== slot) { slot.innerHTML = ""; slot.appendChild(rendered[idx]); }
        }
      });
      var queue = order.filter(function (idx) { return !rendered[idx]; });
      (function next() {
        if (!queue.length) return;
        var idx = queue.shift();
        pdfjsDoc.getPage(idx + 1).then(function (page) {
          return renderPageToCanvas(page, 150, 1.5);
        }).then(function (canvas) {
          canvas.className = "max-h-[160px] w-auto";
          rendered[idx] = canvas;
          var slot = $('[data-card="' + idx + '"] [data-slot]', grid);
          if (slot) { slot.innerHTML = ""; slot.appendChild(canvas); }
          return raf();
        }).then(next).catch(function () { next(); });
      })();
    }

    // Events
    if (mode === "multi") {
      grid.addEventListener("click", function (e) {
        var c = e.target.closest("[data-card]");
        if (!c) return;
        var idx = +c.getAttribute("data-card");
        selected[idx] = !selected[idx];
        paint();
      });
      $("[data-all]", container).addEventListener("click", function () { order.forEach(function (i) { selected[i] = true; }); paint(); });
      $("[data-none]", container).addEventListener("click", function () { order.forEach(function (i) { selected[i] = false; }); paint(); });
    } else {
      // Arrow buttons
      grid.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-mv]");
        if (!btn) return;
        var c = e.target.closest("[data-card]");
        var idx = +c.getAttribute("data-card");
        var pos = order.indexOf(idx);
        var np = pos + (+btn.getAttribute("data-mv"));
        if (np < 0 || np >= order.length) return;
        order.splice(pos, 1); order.splice(np, 0, idx);
        paint();
      });
      // Drag and drop
      var dragIdx = null;
      grid.addEventListener("dragstart", function (e) {
        var c = e.target.closest("[data-card]"); if (!c) return;
        dragIdx = +c.getAttribute("data-card"); c.classList.add("pg-drag");
        try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(dragIdx)); } catch (x) {}
      });
      grid.addEventListener("dragend", function () { dragIdx = null; $$(".pg-drag,.pg-over", grid).forEach(function (el) { el.classList.remove("pg-drag", "pg-over"); }); });
      grid.addEventListener("dragover", function (e) {
        e.preventDefault();
        var c = e.target.closest("[data-card]");
        $$(".pg-over", grid).forEach(function (el) { el.classList.remove("pg-over"); });
        if (c) c.classList.add("pg-over");
      });
      grid.addEventListener("drop", function (e) {
        e.preventDefault();
        var c = e.target.closest("[data-card]"); if (c == null || dragIdx == null) return;
        var target = +c.getAttribute("data-card");
        var from = order.indexOf(dragIdx), to = order.indexOf(target);
        if (from < 0 || to < 0) return;
        order.splice(from, 1); order.splice(to, 0, dragIdx);
        paint();
      });
    }

    paint();

    return {
      total: total,
      indices: function () {
        return mode === "multi" ? order.filter(function (i) { return selected[i]; }) : order.slice();
      }
    };
  }

  /* ================================================================
     A. ORGANIZE PDF
     ================================================================ */

  // 1. MERGE
  function buildMerge(ctx) {
    var E = scaffold(ctx, { multiple: true, runLabel: "Merge PDFs", emptyText: "Add two or more PDFs, then drag to set their order." });
    var files = []; // {file}
    var outBytes = null, outName = "merged.pdf";

    function renderList() {
      if (!files.length) {
        E.files.classList.add("hidden"); E.optcard.classList.add("hidden");
        E.empty.classList.remove("hidden"); E.out.classList.add("hidden");
        return;
      }
      E.files.classList.remove("hidden"); E.optcard.classList.remove("hidden");
      E.files.innerHTML = '<p class="px-1 text-xs font-semibold text-brand-ink">' + files.length + ' file' + (files.length > 1 ? "s" : "") + ' · drag to reorder</p>' +
        files.map(function (f, i) {
          return '<div draggable="true" data-row="' + i + '" class="flex cursor-move items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-brand-line">' +
            '<svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-brand-ink/50" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01"/></svg>' +
            '<div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-brand-indigo">' + (i + 1) + '. ' + esc(f.name) + '</p><p class="text-xs text-brand-ink">' + fmtSize(f.size) + '</p></div>' +
            '<button type="button" data-remove="' + i + '" aria-label="Remove" class="shrink-0 rounded-md p-1.5 text-brand-ink ring-1 ring-inset ring-brand-line transition hover:bg-brand-ugdx hover:text-white"><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
            '</div>';
        }).join("");
    }
    function addFiles(list) {
      var added = 0, rejected = 0;
      Array.prototype.forEach.call(list, function (f) {
        if (files.length >= MAX_FILES) { rejected++; return; }
        if (validatePdf(f)) { rejected++; return; }
        files.push(f); added++;
      });
      renderList();
      if (rejected) __toast(rejected + " file(s) skipped (not a PDF or too large).", true);
      else if (added) E.setStatus(files.length + " file(s) ready.", "");
    }

    E.input.addEventListener("change", function () { if (E.input.files.length) addFiles(E.input.files); E.input.value = ""; });
    wireDrop(E.drop, addFiles);

    var dragFrom = null;
    E.files.addEventListener("dragstart", function (e) { var r = e.target.closest("[data-row]"); if (r) { dragFrom = +r.getAttribute("data-row"); r.classList.add("pg-drag"); } });
    E.files.addEventListener("dragend", function () { dragFrom = null; $$(".pg-drag,.pg-over", E.files).forEach(function (el) { el.classList.remove("pg-drag", "pg-over"); }); });
    E.files.addEventListener("dragover", function (e) { e.preventDefault(); var r = e.target.closest("[data-row]"); $$(".pg-over", E.files).forEach(function (el) { el.classList.remove("pg-over"); }); if (r) r.classList.add("pg-over"); });
    E.files.addEventListener("drop", function (e) {
      e.preventDefault(); var r = e.target.closest("[data-row]"); if (!r || dragFrom == null) return;
      var to = +r.getAttribute("data-row"); var m = files.splice(dragFrom, 1)[0]; files.splice(to, 0, m); renderList();
    });
    E.files.addEventListener("click", function (e) {
      var b = e.target.closest("[data-remove]"); if (!b) return;
      files.splice(+b.getAttribute("data-remove"), 1); renderList();
    });

    E.reset.addEventListener("click", function () { files = []; outBytes = null; E.input.value = ""; renderList(); E.dl.hidden = true; E.setStatus(""); __toast("Cleared"); });
    E.dl.addEventListener("click", function () { if (outBytes) downloadBytes(outBytes, outName, "application/pdf"); });

    E.run.addEventListener("click", function () {
      if (files.length < 2) { __toast("Add at least two PDFs to merge.", true); return; }
      E.busy(true); E.setStatus("Merging…");
      ensurePdfLib().then(function (PDFLib) {
        var merged;
        return PDFLib.PDFDocument.create().then(function (m) {
          merged = m;
          return files.reduce(function (p, f) {
            return p.then(function () {
              return readArrayBuffer(f).then(function (ab) { return loadPdfLibDoc(PDFLib, ab); })
                .then(function (src) { return merged.copyPages(src, src.getPageIndices()); })
                .then(function (pages) { pages.forEach(function (pg) { merged.addPage(pg); }); });
            });
          }, Promise.resolve());
        }).then(function () { return merged.save(); }).then(function (bytes) {
          outBytes = bytes;
          E.busy(false); E.dl.hidden = false;
          E.setStatus("Merged " + files.length + " files into " + merged.getPageCount() + " pages · " + fmtSize(bytes.length), "ok");
          E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><svg viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><p class="mt-3 text-sm font-bold text-brand-indigo">Merged PDF ready · ' + merged.getPageCount() + ' pages</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(bytes.length) + '</p><button type="button" data-outdl class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download PDF</button></div>');
          $("[data-outdl]", E.out).addEventListener("click", function () { downloadBytes(outBytes, outName, "application/pdf"); });
          __toast("Merged");
        });
      }).catch(function (e) { E.busy(false); E.setStatus(e.message || "Merge failed.", "err"); __toast(e.message || "Merge failed.", true); });
    });
  }

  // Shared loader for tools that show a thumbnail grid of one PDF.
  function withThumbGrid(ctx, E, state, mode, onReady) {
    E.setStatus("Rendering pages…");
    ensurePdfjs().then(function (pdfjsLib) {
      return openPdfjs(pdfjsLib, state.ab);
    }).then(function (doc) {
      state.pdfjsDoc = doc;
      E.showOut("");
      var holder = document.createElement("div");
      E.out.appendChild(holder);
      state.grid = buildThumbGrid(holder, doc, state.ab, mode, function () {
        if (onReady) onReady();
      });
      E.setStatus(doc.numPages + " page(s)." + (doc.numPages > THUMB_PAGE_CAP ? " Too many pages to preview — use the page range box." : ""), "");
    }).catch(function (e) {
      E.setStatus(e.message || "Could not render pages.", "err");
    });
  }

  /* 2-5 share the thumbnail selection grid. */

  // 2. SPLIT — extract each selected page to its own PDF (zipped), or all selected pages into one new PDF.
  var buildSplit = singlePdfTool({
      runLabel: "Split selected pages",
      emptyText: "Add a PDF to choose where to split.",
      controlsHTML:
        '<div><label for="sp-mode" class="block text-xs font-semibold text-brand-ink">Split mode</label>' +
        '<select id="sp-mode" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal">' +
          '<option value="each">Each selected page → its own PDF (zipped)</option>' +
          '<option value="one">Selected pages → one new PDF</option>' +
        '</select></div>' +
        '<p class="text-[11px] text-brand-ink/70">Tick pages in the grid, or type a range below (the range wins if filled).</p>' +
        '<div><label for="sp-range" class="block text-xs font-semibold text-brand-ink">Page range (optional)</label>' +
        '<input id="sp-range" type="text" inputmode="numeric" placeholder="e.g. 1-3, 5" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>',
      onReady: function (ctx, E, state) {
        withThumbGrid(ctx, E, state, "multi");
      },
      run: function (ctx, E, state) {
        if (!state.grid) throw new Error("Pages are still loading — try again in a moment.");
        var mode = $("#sp-mode").value;
        var rangeStr = ($("#sp-range") || {}).value;
        var idx;
        if (rangeStr && rangeStr.trim()) idx = parsePageRanges(rangeStr, state.grid.total);
        else idx = state.grid ? state.grid.indices() : [];
        if (!idx.length) throw new Error("Select at least one page, or type a range.");
        return ensurePdfLib().then(function (PDFLib) {
          return loadPdfLibDoc(PDFLib, state.ab).then(function (src) {
            if (mode === "one") {
              return PDFLib.PDFDocument.create().then(function (out) {
                return out.copyPages(src, idx).then(function (pages) {
                  pages.forEach(function (p) { out.addPage(p); });
                  return out.save();
                });
              }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-pages.pdf", idx.length + " pages extracted"); });
            }
            // each → zip
            return ensureJSZip().then(function (JSZip) {
              var zip = new JSZip();
              return idx.reduce(function (p, pageIdx) {
                return p.then(function () {
                  return PDFLib.PDFDocument.create().then(function (out) {
                    return out.copyPages(src, [pageIdx]).then(function (pages) {
                      out.addPage(pages[0]); return out.save();
                    }).then(function (bytes) { zip.file(baseName(state.file.name) + "-page-" + (pageIdx + 1) + ".pdf", bytes); });
                  });
                });
              }, Promise.resolve()).then(function () {
                return zip.generateAsync({ type: "blob" });
              }).then(function (blob) {
                state.outBytes = null; E.dl.hidden = true;
                E.setStatus("Created " + idx.length + " PDFs · " + fmtSize(blob.size) + " zip", "ok");
                E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><svg viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><p class="mt-3 text-sm font-bold text-brand-indigo">' + idx.length + ' PDFs ready (zipped)</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(blob.size) + '</p><button type="button" data-zip class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download .zip</button></div>');
                $("[data-zip]", E.out).addEventListener("click", function () { downloadBlob(blob, baseName(state.file.name) + "-split.zip"); });
                __toast("Split complete");
              });
            });
          });
        });
      }
    });

  // 3. EXTRACT PAGES
  var buildExtract = singlePdfTool({
    runLabel: "Extract pages",
    emptyText: "Add a PDF, then tick the pages to keep.",
    controlsHTML:
      '<p class="text-[11px] text-brand-ink/70">Tick the pages you want in the new PDF, or type a range.</p>' +
      '<div><label for="ex-range" class="block text-xs font-semibold text-brand-ink">Page range</label>' +
      '<input id="ex-range" type="text" inputmode="numeric" placeholder="e.g. 1-3, 5, 8" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>',
    onReady: function (ctx, E, state) { withThumbGrid(ctx, E, state, "multi"); },
    run: function (ctx, E, state) {
      if (!state.grid) throw new Error("Pages are still loading — try again in a moment.");
      var rangeStr = ($("#ex-range") || {}).value;
      var idx;
      if (rangeStr && rangeStr.trim()) idx = parsePageRanges(rangeStr, state.grid.total);
      else idx = state.grid.indices();
      if (!idx.length) throw new Error("Select at least one page, or type a range.");
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (src) {
          return PDFLib.PDFDocument.create().then(function (out) {
            return out.copyPages(src, idx).then(function (pages) {
              pages.forEach(function (p) { out.addPage(p); });
              return out.save();
            });
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-extracted.pdf", idx.length + " of " + state.grid.total + " pages kept"); });
    }
  });

  // 4. REMOVE PAGES
  var buildRemove = singlePdfTool({
    runLabel: "Remove pages",
    emptyText: "Add a PDF, then tick the pages to remove.",
    controlsHTML:
      '<p class="text-[11px] text-brand-ink/70">Tick the pages to <strong>remove</strong>, or type a range. The rest are kept.</p>' +
      '<div><label for="rm-range" class="block text-xs font-semibold text-brand-ink">Pages to remove</label>' +
      '<input id="rm-range" type="text" inputmode="numeric" placeholder="e.g. 2, 4-6" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>',
    onReady: function (ctx, E, state) { withThumbGrid(ctx, E, state, "multi"); },
    run: function (ctx, E, state) {
      if (!state.grid) throw new Error("Pages are still loading — try again in a moment.");
      var rangeStr = ($("#rm-range") || {}).value;
      var remove;
      if (rangeStr && rangeStr.trim()) remove = parsePageRanges(rangeStr, state.grid.total);
      else remove = state.grid.indices();
      if (!remove.length) throw new Error("Select at least one page to remove.");
      var removeSet = {}; remove.forEach(function (i) { removeSet[i] = 1; });
      var keep = [];
      for (var i = 0; i < state.grid.total; i++) if (!removeSet[i]) keep.push(i);
      if (!keep.length) throw new Error("That would remove every page. Keep at least one.");
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (src) {
          return PDFLib.PDFDocument.create().then(function (out) {
            return out.copyPages(src, keep).then(function (pages) {
              pages.forEach(function (p) { out.addPage(p); });
              return out.save();
            });
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-trimmed.pdf", remove.length + " pages removed, " + keep.length + " kept"); });
    }
  });

  // 5. REORDER PAGES
  var buildReorder = singlePdfTool({
    runLabel: "Save new order",
    emptyText: "Add a PDF, then drag pages into the order you want.",
    controlsHTML: '<p class="text-[11px] text-brand-ink/70">Drag the thumbnails (or use the arrows) to set a new page order, then save.</p>',
    onReady: function (ctx, E, state) { withThumbGrid(ctx, E, state, "reorder"); },
    run: function (ctx, E, state) {
      if (!state.grid) throw new Error("Pages are still loading — try again in a moment.");
      var order = state.grid.indices();
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (src) {
          return PDFLib.PDFDocument.create().then(function (out) {
            return out.copyPages(src, order).then(function (pages) {
              pages.forEach(function (p) { out.addPage(p); });
              return out.save();
            });
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-reordered.pdf", "Pages reordered"); });
    }
  });

  // 6. ROTATE
  var buildRotate = singlePdfTool({
    runLabel: "Rotate",
    emptyText: "Add a PDF, then choose pages and a rotation.",
    controlsHTML:
      '<div><label class="block text-xs font-semibold text-brand-ink">Rotation</label>' +
      '<div class="mt-1.5 grid grid-cols-3 gap-2 text-xs font-bold">' +
        '<label class="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-brand-paper px-2 py-2 text-brand-indigo ring-1 ring-inset ring-brand-line has-[:checked]:bg-brand-indigo has-[:checked]:text-white"><input type="radio" name="rot-deg" value="90" class="sr-only" checked>90° ↻</label>' +
        '<label class="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-brand-paper px-2 py-2 text-brand-indigo ring-1 ring-inset ring-brand-line has-[:checked]:bg-brand-indigo has-[:checked]:text-white"><input type="radio" name="rot-deg" value="180" class="sr-only">180°</label>' +
        '<label class="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-brand-paper px-2 py-2 text-brand-indigo ring-1 ring-inset ring-brand-line has-[:checked]:bg-brand-indigo has-[:checked]:text-white"><input type="radio" name="rot-deg" value="270" class="sr-only">90° ↺</label>' +
      '</div></div>' +
      '<p class="text-[11px] text-brand-ink/70">Leave the range blank to rotate every page.</p>' +
      '<div><label for="rot-range" class="block text-xs font-semibold text-brand-ink">Pages (optional)</label>' +
      '<input id="rot-range" type="text" inputmode="numeric" placeholder="all pages" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>',
    onReady: function (ctx, E, state) { withThumbGrid(ctx, E, state, "multi"); },
    run: function (ctx, E, state) {
      if (!state.grid) throw new Error("Pages are still loading — try again in a moment.");
      var deg = +(document.querySelector('input[name="rot-deg"]:checked') || { value: 90 }).value;
      var rangeStr = ($("#rot-range") || {}).value;
      var idx;
      if (rangeStr && rangeStr.trim()) idx = parsePageRanges(rangeStr, state.grid.total);
      else idx = state.grid.indices(); // ticked pages, or all by default
      if (!idx.length) throw new Error("No pages selected to rotate.");
      var idxSet = {}; idx.forEach(function (i) { idxSet[i] = 1; });
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) {
          var pages = doc.getPages();
          pages.forEach(function (pg, i) {
            if (idxSet[i]) {
              var cur = pg.getRotation().angle || 0;
              pg.setRotation(PDFLib.degrees((cur + deg) % 360));
            }
          });
          return doc.save();
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-rotated.pdf", idx.length + " pages rotated " + deg + "°"); });
    }
  });

  // 7. ADD PAGE NUMBERS
  var buildPageNumbers = singlePdfTool({
    runLabel: "Add page numbers",
    emptyText: "Add a PDF to stamp page numbers onto it.",
    controlsHTML:
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="pn-pos" class="block text-xs font-semibold text-brand-ink">Position</label>' +
        '<select id="pn-pos" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal">' +
          '<option value="bc">Bottom center</option><option value="br">Bottom right</option><option value="bl">Bottom left</option>' +
          '<option value="tc">Top center</option><option value="tr">Top right</option><option value="tl">Top left</option>' +
        '</select></div>' +
        '<div><label for="pn-start" class="block text-xs font-semibold text-brand-ink">Start at</label>' +
        '<input id="pn-start" type="number" value="1" min="0" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="pn-size" class="block text-xs font-semibold text-brand-ink">Font size</label>' +
        '<input id="pn-size" type="number" value="11" min="6" max="48" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="pn-fmt" class="block text-xs font-semibold text-brand-ink">Format</label>' +
        '<select id="pn-fmt" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal">' +
          '<option value="n">1</option><option value="np">Page 1</option><option value="nt">1 / N</option><option value="npt">Page 1 of N</option>' +
        '</select></div>' +
      '</div>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Page numbers will be stamped using Helvetica in brand indigo. Choose options on the left, then run.</div>'); },
    run: function (ctx, E, state) {
      var pos = $("#pn-pos").value, start = parseInt($("#pn-start").value, 10) || 0, size = Math.max(6, Math.min(48, +$("#pn-size").value || 11)), fmt = $("#pn-fmt").value;
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) {
          return doc.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) {
            var pages = doc.getPages(), N = pages.length, color = PDFLib.rgb(0.204, 0.169, 0.486);
            pages.forEach(function (pg, i) {
              var num = start + i;
              var label = fmt === "np" ? "Page " + num : fmt === "nt" ? num + " / " + N : fmt === "npt" ? "Page " + num + " of " + N : String(num);
              var sz = pg.getSize(), tw = font.widthOfTextAtSize(label, size), m = 24;
              var x = pos[1] === "c" ? (sz.width - tw) / 2 : pos[1] === "r" ? sz.width - tw - m : m;
              var y = pos[0] === "t" ? sz.height - size - m + 4 : m;
              pg.drawText(label, { x: x, y: y, size: size, font: font, color: color });
            });
            return doc.save();
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-numbered.pdf", "Numbers added"); });
    }
  });

  /* ================================================================
     B. OPTIMIZE PDF
     ================================================================ */

  // 8. COMPRESS
  var buildCompress = singlePdfTool({
    runLabel: "Compress",
    emptyText: "Add a PDF to reduce its size.",
    controlsHTML:
      '<div><label for="cp-level" class="block text-xs font-semibold text-brand-ink">Compression level</label>' +
      '<select id="cp-level" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal">' +
        '<option value="light">Light — re-save only (keeps text selectable)</option>' +
        '<option value="medium" selected>Recommended — rasterise pages (good shrink)</option>' +
        '<option value="strong">Strong — rasterise harder (smallest)</option>' +
      '</select></div>' +
      '<p class="rounded-lg bg-brand-paper p-3 text-[11px] leading-relaxed text-brand-ink/80 ring-1 ring-brand-line"><strong class="text-brand-indigo">How it works:</strong> “Light” just rewrites the file and <em>may not</em> shrink it. “Recommended” and “Strong” redraw each page as an image — this shrinks most PDFs a lot, but the text is no longer selectable. The real result (and whether it actually got smaller) is always shown.</p>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Original size: <strong class="text-brand-indigo">' + fmtSize(state.file.size) + '</strong>. Pick a level and press Compress.</div>'); },
    run: function (ctx, E, state) {
      var level = $("#cp-level").value;
      if (level === "light") {
        return ensurePdfLib().then(function (PDFLib) {
          return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) { return doc.save({ useObjectStreams: true }); });
        }).then(function (bytes) {
          var smaller = bytes.length < state.file.size;
          finishPdf(E, state, bytes, baseName(state.file.name) + "-resaved.pdf",
            smaller ? "Saved " + fmtSize(state.file.size - bytes.length) + " (" + Math.round((1 - bytes.length / state.file.size) * 100) + "% smaller)" : "No size reduction — this PDF was already compact. Original kept selectable text.");
        });
      }
      // Rasterise with pdf.js, rebuild with pdf-lib (JPEG pages).
      var scale = level === "strong" ? 1.0 : 1.5, quality = level === "strong" ? 0.5 : 0.72;
      var PDFLibRef;
      return ensurePdfLib().then(function (PDFLib) {
        PDFLibRef = PDFLib;
        return ensurePdfjs();
      }).then(function (pdfjsLib) {
        return openPdfjs(pdfjsLib, state.ab).then(function (doc) {
          return PDFLibRef.PDFDocument.create().then(function (out) {
            var n = doc.numPages;
            return (function page(i) {
              if (i > n) return Promise.resolve();
              E.setStatus("Compressing page " + i + " of " + n + "…");
              return doc.getPage(i).then(function (pg) {
                var vp = pg.getViewport({ scale: scale });
                var canvas = document.createElement("canvas");
                canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
                var c = canvas.getContext("2d");
                c.fillStyle = "#fff"; c.fillRect(0, 0, canvas.width, canvas.height);
                return pg.render({ canvasContext: c, viewport: vp }).promise.then(function () {
                  return canvasToBlob(canvas, "image/jpeg", quality);
                }).then(function (blob) { return blob.arrayBuffer(); }).then(function (buf) {
                  return out.embedJpg(buf).then(function (img) {
                    var p = out.addPage([vp.width, vp.height]);
                    p.drawImage(img, { x: 0, y: 0, width: vp.width, height: vp.height });
                  });
                }).then(function () { doc.getPage && null; return raf(); }).then(function () { return page(i + 1); });
              });
            })(1).then(function () { try { doc.destroy(); } catch (e) {} return out.save(); });
          });
        });
      }).then(function (bytes) {
        var smaller = bytes.length < state.file.size;
        finishPdf(E, state, bytes, baseName(state.file.name) + "-compressed.pdf",
          (smaller ? "Saved " + fmtSize(state.file.size - bytes.length) + " (" + Math.round((1 - bytes.length / state.file.size) * 100) + "% smaller)" : "Result is not smaller than the original — try Light, or keep the original.") + " · pages are now images");
      });
    }
  });

  // 9. REPAIR
  var buildRepair = singlePdfTool({
    runLabel: "Repair & re-save",
    emptyText: "Add a PDF that won't open or behaves oddly.",
    controlsHTML: '<p class="rounded-lg bg-brand-paper p-3 text-[11px] leading-relaxed text-brand-ink/80 ring-1 ring-brand-line"><strong class="text-brand-indigo">What this does:</strong> it tries to parse the file leniently and write a fresh, well-formed copy. This fixes many minor structural problems. <strong class="text-brand-indigo">It cannot</strong> recover severely corrupted or truncated files, or rebuild missing content — if parsing fails, you\'ll get a clear error rather than a broken file.</p>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Press “Repair & re-save” to attempt recovery of <strong class="text-brand-indigo">' + esc(state.file.name) + '</strong>.</div>'); },
    run: function (ctx, E, state) {
      return ensurePdfLib().then(function (PDFLib) {
        return PDFLib.PDFDocument.load(copyBuf(state.ab), { ignoreEncryption: true, throwOnInvalidObject: false, updateMetadata: false })
          .then(function (doc) {
            if (!doc.getPageCount()) throw new Error("The file parsed but contains no pages — it can't be repaired.");
            return doc.save({ useObjectStreams: false });
          }).catch(function (e) {
            throw new Error("This PDF is too damaged to recover in the browser. " + (e && e.message ? "(" + e.message + ")" : ""));
          });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-repaired.pdf", "Re-saved as a clean copy"); });
    }
  });

  /* ================================================================
     C. CONVERT FROM PDF
     ================================================================ */

  // Shared: render all pages to images (jpg/png) and zip them.
  function pdfToImages(ctx, mime, ext) {
    return singlePdfTool({
      runLabel: "Convert to " + ext.toUpperCase(),
      emptyText: "Add a PDF to export its pages as " + ext.toUpperCase() + " images.",
      controlsHTML:
        '<div><label for="im-scale" class="flex items-center justify-between text-xs font-semibold text-brand-ink">Resolution <span id="im-scaleval" class="text-brand-indigo">1.5×</span></label>' +
        '<input id="im-scale" type="range" min="1" max="3" step="0.5" value="1.5" class="mt-1.5 w-full accent-brand-teal"></div>' +
        (mime === "image/jpeg"
          ? '<div><label for="im-q" class="flex items-center justify-between text-xs font-semibold text-brand-ink">JPG quality <span id="im-qval" class="text-brand-indigo">85%</span></label><input id="im-q" type="range" min="40" max="100" value="85" class="mt-1.5 w-full accent-brand-teal"></div>'
          : "") +
        '<p class="text-[11px] text-brand-ink/70">One image per page. Multiple pages are delivered as a .zip.</p>',
      onReady: function (ctx, E, state) {
        var sc = $("#im-scale"), sv = $("#im-scaleval");
        if (sc) sc.addEventListener("input", function () { sv.textContent = (+sc.value).toFixed(1) + "×"; });
        var q = $("#im-q"), qv = $("#im-qval");
        if (q) q.addEventListener("input", function () { qv.textContent = q.value + "%"; });
        E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Ready to export each page as a ' + ext.toUpperCase() + ' image.</div>');
      },
      run: function (ctx, E, state) {
        var scale = +$("#im-scale").value || 1.5;
        var quality = mime === "image/jpeg" ? (+$("#im-q").value || 85) / 100 : undefined;
        return ensurePdfjs().then(function (pdfjsLib) {
          return openPdfjs(pdfjsLib, state.ab).then(function (doc) {
            var n = doc.numPages, blobs = [];
            return (function page(i) {
              if (i > n) return Promise.resolve();
              E.setStatus("Rendering page " + i + " of " + n + "…");
              return doc.getPage(i).then(function (pg) {
                var vp = pg.getViewport({ scale: scale });
                var canvas = document.createElement("canvas");
                canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
                var c = canvas.getContext("2d");
                if (mime === "image/jpeg") { c.fillStyle = "#fff"; c.fillRect(0, 0, canvas.width, canvas.height); }
                return pg.render({ canvasContext: c, viewport: vp }).promise
                  .then(function () { return canvasToBlob(canvas, mime, quality); })
                  .then(function (b) { blobs.push({ name: baseName(state.file.name) + "-page-" + i + "." + ext, blob: b }); return raf(); })
                  .then(function () { return page(i + 1); });
              });
            })(1).then(function () { try { doc.destroy(); } catch (e) {} return blobs; });
          });
        }).then(function (blobs) {
          E.dl.hidden = true; state.outBytes = null;
          if (blobs.length === 1) {
            E.setStatus("1 image ready · " + fmtSize(blobs[0].blob.size), "ok");
            E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><p class="text-sm font-bold text-brand-indigo">1 ' + ext.toUpperCase() + ' image ready</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(blobs[0].blob.size) + '</p><button type="button" data-one class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download ' + ext.toUpperCase() + '</button></div>');
            $("[data-one]", E.out).addEventListener("click", function () { downloadBlob(blobs[0].blob, blobs[0].name); });
            __toast("Done");
            return;
          }
          return ensureJSZip().then(function (JSZip) {
            var zip = new JSZip();
            blobs.forEach(function (b) { zip.file(b.name, b.blob); });
            return zip.generateAsync({ type: "blob" }).then(function (zblob) {
              E.setStatus(blobs.length + " images ready · " + fmtSize(zblob.size) + " zip", "ok");
              E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><p class="text-sm font-bold text-brand-indigo">' + blobs.length + ' ' + ext.toUpperCase() + ' images ready (zipped)</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(zblob.size) + '</p><button type="button" data-zip class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download .zip</button></div>');
              $("[data-zip]", E.out).addEventListener("click", function () { downloadBlob(zblob, baseName(state.file.name) + "-" + ext + ".zip"); });
              __toast("Done");
            });
          });
        });
      }
    });
  }
  var buildPdfToJpg = function (ctx) { pdfToImages(ctx, "image/jpeg", "jpg")(ctx); };
  var buildPdfToPng = function (ctx) { pdfToImages(ctx, "image/png", "png")(ctx); };

  // 12. PDF TO TEXT
  var buildPdfToText = singlePdfTool({
    runLabel: "Extract text",
    emptyText: "Add a PDF to pull out its selectable text.",
    controlsHTML: '<p class="rounded-lg bg-brand-paper p-3 text-[11px] leading-relaxed text-brand-ink/80 ring-1 ring-brand-line"><strong class="text-brand-indigo">Note:</strong> this extracts the text layer that already exists in the PDF. Scanned/image-only PDFs have no text layer, so nothing will be found — this tool does <strong>not</strong> run OCR.</p>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Press “Extract text” to read the text layer.</div>'); },
    run: function (ctx, E, state) {
      return ensurePdfjs().then(function (pdfjsLib) {
        return openPdfjs(pdfjsLib, state.ab).then(function (doc) {
          var n = doc.numPages, parts = [];
          return (function page(i) {
            if (i > n) return Promise.resolve();
            E.setStatus("Reading page " + i + " of " + n + "…");
            return doc.getPage(i).then(function (pg) {
              return pg.getTextContent().then(function (tc) {
                var last = null, line = "";
                tc.items.forEach(function (it) {
                  if (last !== null && Math.abs(it.transform[5] - last) > 2) { line += "\n"; }
                  line += it.str + (it.hasEOL ? "\n" : " ");
                  last = it.transform[5];
                });
                parts.push("----- Page " + i + " -----\n" + line.replace(/[ \t]+\n/g, "\n").trim());
                return raf();
              });
            }).then(function () { return page(i + 1); });
          })(1).then(function () { try { doc.destroy(); } catch (e) {} return parts.join("\n\n"); });
        });
      }).then(function (text) {
        var hasText = text.replace(/----- Page \d+ -----/g, "").trim().length > 0;
        var blob = new Blob([text], { type: "text/plain" });
        state.outBytes = null; E.dl.hidden = true;
        E.setStatus(hasText ? "Text extracted · " + fmtSize(blob.size) : "No selectable text found (this looks like a scanned PDF).", hasText ? "ok" : "err");
        E.showOut(
          '<div class="rounded-2xl bg-white p-5 ring-1 ring-brand-line">' +
            '<div class="flex items-center justify-between gap-3"><p class="text-sm font-bold text-brand-indigo">Extracted text</p>' +
            '<div class="flex gap-2"><button type="button" data-copy class="rounded-lg px-3 py-1.5 text-xs font-bold text-brand-indigo ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white">Copy</button>' +
            '<button type="button" data-txt class="rounded-lg bg-brand-indigo px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-teal">Download .txt</button></div></div>' +
            '<textarea readonly rows="16" class="mt-3 block w-full resize-y rounded-xl border-0 bg-brand-paper p-4 font-mono text-xs leading-relaxed text-brand-ink ring-1 ring-inset ring-brand-line">' + esc(hasText ? text : "No selectable text was found in this PDF.\nIt is most likely a scanned document (images of text).\nThis tool does not perform OCR.") + '</textarea>' +
          '</div>');
        $("[data-txt]", E.out).addEventListener("click", function () { downloadBlob(blob, baseName(state.file.name) + ".txt"); });
        $("[data-copy]", E.out).addEventListener("click", function () {
          var ta = $("textarea", E.out); ta.select();
          if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(function () { __toast("Copied"); }, function () { __toast("Copy failed", true); });
          else { try { document.execCommand("copy"); __toast("Copied"); } catch (e) { __toast("Copy failed", true); } }
        });
        __toast(hasText ? "Text ready" : "No text found", !hasText);
      });
    }
  });

  // 13. PDF TO WORD — honestly unavailable in-browser.
  function buildPdfToWord(ctx) {
    unavailablePanel(ctx,
      "Reliable PDF→Word isn't available in the browser",
      "Converting a PDF into an editable Word (.docx) file with its layout, tables and fonts intact needs a dedicated server-side conversion engine. Doing it client-side would either drop the formatting or fake the result, so this tool is intentionally left out rather than shipped as a pretend converter.",
      [
        ["Need the words?", "Use <strong>PDF to Text</strong> to extract the text, then paste it into Word."],
        ["Need the layout?", "Use <strong>PDF to JPG/PNG</strong> to place page images into a document."]
      ]);
  }

  /* ================================================================
     D. CONVERT TO PDF
     ================================================================ */

  // Images → PDF (JPG/PNG). multiple images, drag to order, one page each.
  function imagesToPdf(ctx, label) {
    var E = scaffold(ctx, { multiple: true, accept: ".jpg,.jpeg,.png,image/jpeg,image/png", hint: "JPG or PNG images", runLabel: "Create PDF", emptyText: "Add images — each becomes one PDF page." });
    var items = []; var outBytes = null;
    var pageSizeSel =
      '<div><label for="i2p-size" class="block text-xs font-semibold text-brand-ink">Page size</label>' +
      '<select id="i2p-size" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal">' +
        '<option value="fit">Fit page to each image</option><option value="a4p">A4 portrait</option><option value="a4l">A4 landscape</option><option value="letter">US Letter</option>' +
      '</select></div>' +
      '<div><label for="i2p-margin" class="block text-xs font-semibold text-brand-ink">Margin (pt)</label>' +
      '<input id="i2p-margin" type="number" value="0" min="0" max="150" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '<p class="text-[11px] text-brand-ink/70">Drag images in the list to set page order.</p>';
    E.controls.innerHTML = pageSizeSel;

    function renderList() {
      if (!items.length) { E.files.classList.add("hidden"); E.optcard.classList.add("hidden"); E.empty.classList.remove("hidden"); E.out.classList.add("hidden"); return; }
      E.files.classList.remove("hidden"); E.optcard.classList.remove("hidden");
      E.files.innerHTML = '<p class="px-1 text-xs font-semibold text-brand-ink">' + items.length + ' image(s) · drag to reorder</p>' +
        items.map(function (it, i) {
          return '<div draggable="true" data-row="' + i + '" class="flex cursor-move items-center gap-3 rounded-xl bg-white p-2.5 ring-1 ring-brand-line">' +
            '<img src="' + it.url + '" alt="" class="h-10 w-10 shrink-0 rounded object-cover ring-1 ring-brand-line">' +
            '<div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-brand-indigo">' + (i + 1) + '. ' + esc(it.file.name) + '</p><p class="text-xs text-brand-ink">' + fmtSize(it.file.size) + '</p></div>' +
            '<button type="button" data-remove="' + i + '" aria-label="Remove" class="shrink-0 rounded-md p-1.5 text-brand-ink ring-1 ring-inset ring-brand-line transition hover:bg-brand-ugdx hover:text-white"><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
            '</div>';
        }).join("");
    }
    function add(list) {
      var rej = 0;
      Array.prototype.forEach.call(list, function (f) {
        if (items.length >= MAX_FILES) { rej++; return; }
        if (validateImage(f)) { rej++; return; }
        items.push({ file: f, url: URL.createObjectURL(f) });
      });
      renderList();
      if (rej) __toast(rej + " file(s) skipped (only JPG/PNG).", true);
    }
    ctx.onCleanup(function () { items.forEach(function (it) { URL.revokeObjectURL(it.url); }); });

    E.input.addEventListener("change", function () { if (E.input.files.length) add(E.input.files); E.input.value = ""; });
    wireDrop(E.drop, add);
    var from = null;
    E.files.addEventListener("dragstart", function (e) { var r = e.target.closest("[data-row]"); if (r) { from = +r.getAttribute("data-row"); r.classList.add("pg-drag"); } });
    E.files.addEventListener("dragend", function () { from = null; $$(".pg-drag,.pg-over", E.files).forEach(function (el) { el.classList.remove("pg-drag", "pg-over"); }); });
    E.files.addEventListener("dragover", function (e) { e.preventDefault(); var r = e.target.closest("[data-row]"); $$(".pg-over", E.files).forEach(function (el) { el.classList.remove("pg-over"); }); if (r) r.classList.add("pg-over"); });
    E.files.addEventListener("drop", function (e) { e.preventDefault(); var r = e.target.closest("[data-row]"); if (!r || from == null) return; var to = +r.getAttribute("data-row"); var m = items.splice(from, 1)[0]; items.splice(to, 0, m); renderList(); });
    E.files.addEventListener("click", function (e) { var b = e.target.closest("[data-remove]"); if (!b) return; var i = +b.getAttribute("data-remove"); URL.revokeObjectURL(items[i].url); items.splice(i, 1); renderList(); });

    E.reset.addEventListener("click", function () { items.forEach(function (it) { URL.revokeObjectURL(it.url); }); items = []; outBytes = null; E.input.value = ""; E.dl.hidden = true; renderList(); E.setStatus(""); __toast("Cleared"); });
    E.dl.addEventListener("click", function () { if (outBytes) downloadBytes(outBytes, "images.pdf", "application/pdf"); });

    E.run.addEventListener("click", function () {
      if (!items.length) { __toast("Add at least one image.", true); return; }
      E.busy(true); E.setStatus("Building PDF…");
      var sizeOpt = $("#i2p-size").value, margin = Math.max(0, +$("#i2p-margin").value || 0);
      ensurePdfLib().then(function (PDFLib) {
        var SIZES = { a4p: [595.28, 841.89], a4l: [841.89, 595.28], letter: [612, 792] };
        return PDFLib.PDFDocument.create().then(function (out) {
          return items.reduce(function (p, it) {
            return p.then(function () {
              return readArrayBuffer(it.file).then(function (ab) {
                var isPng = /png$/i.test(it.file.type) || /\.png$/i.test(it.file.name);
                return (isPng ? out.embedPng(ab) : out.embedJpg(ab)).catch(function () {
                  // Fallback: a PNG that's really a JPG or vice-versa.
                  return (isPng ? out.embedJpg(ab) : out.embedPng(ab));
                });
              }).then(function (img) {
                var pw, ph, iw = img.width, ih = img.height;
                if (sizeOpt === "fit") { pw = iw + margin * 2; ph = ih + margin * 2; }
                else { var s = SIZES[sizeOpt] || SIZES.a4p; pw = s[0]; ph = s[1]; }
                var page = out.addPage([pw, ph]);
                var availW = pw - margin * 2, availH = ph - margin * 2;
                var scale = Math.min(availW / iw, availH / ih);
                if (sizeOpt === "fit") scale = 1;
                var w = iw * scale, h = ih * scale;
                page.drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
              });
            });
          }, Promise.resolve()).then(function () { return out.save(); });
        });
      }).then(function (bytes) {
        outBytes = bytes; E.busy(false); E.dl.hidden = false;
        E.setStatus(items.length + " images → PDF · " + fmtSize(bytes.length), "ok");
        E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><svg viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><p class="mt-3 text-sm font-bold text-brand-indigo">PDF ready · ' + items.length + ' page(s)</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(bytes.length) + '</p><button type="button" data-outdl class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download PDF</button></div>');
        $("[data-outdl]", E.out).addEventListener("click", function () { downloadBytes(outBytes, "images.pdf", "application/pdf"); });
        __toast("PDF created");
      }).catch(function (e) { E.busy(false); E.setStatus(e.message || "Could not build the PDF.", "err"); __toast(e.message || "Failed", true); });
    });
  }
  var buildJpgToPdf = function (ctx) { imagesToPdf(ctx, "JPG"); };
  var buildPngToPdf = function (ctx) { imagesToPdf(ctx, "PNG"); };

  // 16. TEXT TO PDF
  function buildTextToPdf(ctx) {
    ctx.body.innerHTML =
      '<div class="grid grid-cols-1 gap-8 n1024:grid-cols-[1fr_22rem]">' +
        '<div class="rounded-2xl bg-white p-5 ring-1 ring-brand-line">' +
          '<label for="t2p-text" class="text-sm font-bold text-brand-indigo">Your text</label>' +
          '<textarea id="t2p-text" rows="16" class="mt-3 block w-full resize-y rounded-xl border-0 bg-brand-paper p-4 text-sm leading-relaxed text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal" placeholder="Type or paste text here. Line breaks and blank lines are preserved."></textarea>' +
        '</div>' +
        '<div class="flex flex-col gap-5">' +
          '<div class="rounded-2xl bg-white p-5 ring-1 ring-brand-line space-y-4">' +
            '<div class="grid grid-cols-2 gap-3">' +
              '<div><label for="t2p-size" class="block text-xs font-semibold text-brand-ink">Page size</label><select id="t2p-size" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"><option value="a4">A4</option><option value="letter">US Letter</option></select></div>' +
              '<div><label for="t2p-font" class="block text-xs font-semibold text-brand-ink">Font size</label><input id="t2p-font" type="number" value="12" min="6" max="40" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
            '</div>' +
            '<div><label for="t2p-family" class="block text-xs font-semibold text-brand-ink">Font</label><select id="t2p-family" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"><option value="Helvetica">Helvetica (sans)</option><option value="TimesRoman">Times (serif)</option><option value="Courier">Courier (mono)</option></select></div>' +
            '<div class="flex flex-wrap gap-2">' +
              '<button type="button" id="t2p-run" class="inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal focus-visible:ring-4 focus-visible:ring-brand-teal/40 disabled:opacity-40">Create PDF</button>' +
              '<button type="button" id="t2p-reset" class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white">Clear</button>' +
            '</div>' +
            '<p id="t2p-status" class="text-xs font-semibold text-brand-ink" aria-live="polite" role="status"></p>' +
          '</div>' +
          '<div id="t2p-out"></div>' +
        '</div>' +
      '</div>';

    var ta = $("#t2p-text", ctx.body), status = $("#t2p-status", ctx.body), out = $("#t2p-out", ctx.body);
    function setStatus(m, k) { status.textContent = m || ""; status.className = "text-xs font-semibold " + (k === "err" ? "text-brand-ugdx" : k === "ok" ? "text-brand-teal" : "text-brand-ink"); }

    $("#t2p-reset", ctx.body).addEventListener("click", function () { ta.value = ""; out.innerHTML = ""; setStatus(""); ta.focus(); });

    $("#t2p-run", ctx.body).addEventListener("click", function () {
      var text = ta.value;
      if (!text.trim()) { __toast("Type some text first.", true); return; }
      var sizeKey = $("#t2p-size").value, fontSize = Math.max(6, Math.min(40, +$("#t2p-font").value || 12)), fam = $("#t2p-family").value;
      var btn = $("#t2p-run", ctx.body); btn.disabled = true; setStatus("Building…");
      ensurePdfLib().then(function (PDFLib) {
        var PAGE = sizeKey === "letter" ? [612, 792] : [595.28, 841.89];
        return PDFLib.PDFDocument.create().then(function (doc) {
          return doc.embedFont(PDFLib.StandardFonts[fam]).then(function (font) {
            var margin = 56, maxW = PAGE[0] - margin * 2, lineH = fontSize * 1.42;
            var color = PDFLib.rgb(0.12, 0.12, 0.12);
            // Word-wrap each input line to the page width.
            var lines = [];
            text.replace(/\r\n/g, "\n").split("\n").forEach(function (raw) {
              if (raw === "") { lines.push(""); return; }
              var words = raw.split(/(\s+)/), cur = "";
              words.forEach(function (w) {
                var trial = cur + w;
                if (font.widthOfTextAtSize(trial, fontSize) > maxW && cur) {
                  lines.push(cur.replace(/\s+$/, "")); cur = w.replace(/^\s+/, "");
                } else { cur = trial; }
              });
              // Hard-break any single token longer than the line.
              lines.push(cur.replace(/\s+$/, ""));
            });
            var page = doc.addPage(PAGE), y = PAGE[1] - margin;
            lines.forEach(function (ln) {
              if (y < margin) { page = doc.addPage(PAGE); y = PAGE[1] - margin; }
              if (ln) {
                // Final guard: truncate-safe draw (split overly long tokens by char).
                if (font.widthOfTextAtSize(ln, fontSize) > maxW) {
                  var buf = "";
                  for (var i = 0; i < ln.length; i++) {
                    if (font.widthOfTextAtSize(buf + ln[i], fontSize) > maxW) { page.drawText(buf, { x: margin, y: y, size: fontSize, font: font, color: color }); y -= lineH; if (y < margin) { page = doc.addPage(PAGE); y = PAGE[1] - margin; } buf = ln[i]; }
                    else buf += ln[i];
                  }
                  if (buf) { page.drawText(buf, { x: margin, y: y, size: fontSize, font: font, color: color }); }
                } else {
                  page.drawText(ln, { x: margin, y: y, size: fontSize, font: font, color: color });
                }
              }
              y -= lineH;
            });
            return doc.save();
          });
        });
      }).then(function (bytes) {
        btn.disabled = false; setStatus("PDF ready · " + fmtSize(bytes.length), "ok");
        out.innerHTML = '<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><svg viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><p class="mt-3 text-sm font-bold text-brand-indigo">PDF ready</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(bytes.length) + '</p><button type="button" data-dl class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download PDF</button></div>';
        $("[data-dl]", out).addEventListener("click", function () { downloadBytes(bytes, "text.pdf", "application/pdf"); });
        __toast("PDF created");
      }).catch(function (e) { btn.disabled = false; setStatus(e.message || "Failed.", "err"); __toast(e.message || "Failed", true); });
    });
  }

  // 17. HTML TO PDF — sanitised preview + browser print-to-PDF.
  function buildHtmlToPdf(ctx) {
    ctx.body.innerHTML =
      '<div class="mb-5 rounded-xl bg-brand-law/10 p-4 text-xs leading-relaxed text-brand-ink ring-1 ring-brand-law/30"><strong class="text-brand-law">How this works &amp; its limits:</strong> your HTML is sanitised (scripts, iframes and event handlers are stripped for safety) and shown below. To get a PDF, use <strong>“Open print view”</strong> and choose <em>“Save as PDF”</em> in your browser’s print dialog. This is the safe, reliable browser route — external images/CSS may not load, and the exact output depends on your browser’s print engine.</div>' +
      '<div class="grid grid-cols-1 gap-6 n1024:grid-cols-2">' +
        '<div class="rounded-2xl bg-white p-5 ring-1 ring-brand-line">' +
          '<div class="flex items-center justify-between"><label for="h2p-src" class="text-sm font-bold text-brand-indigo">HTML source</label>' +
          '<button type="button" id="h2p-sample" class="rounded-lg px-3 py-1.5 text-xs font-bold text-brand-indigo ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white">Insert sample</button></div>' +
          '<textarea id="h2p-src" rows="16" spellcheck="false" class="mt-3 block w-full resize-y rounded-xl border-0 bg-brand-paper p-4 font-mono text-xs leading-relaxed text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal" placeholder="<h1>Hello</h1>&#10;<p>Paste HTML here…</p>"></textarea>' +
          '<div class="mt-4 flex flex-wrap gap-2">' +
            '<button type="button" id="h2p-prev" class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-indigo/30 transition hover:bg-brand-indigo hover:text-white">Update preview</button>' +
            '<button type="button" id="h2p-print" class="inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Open print view (Save as PDF)</button>' +
          '</div>' +
        '</div>' +
        '<div class="rounded-2xl bg-white p-3 ring-1 ring-brand-line">' +
          '<p class="px-2 pt-1 pb-2 text-xs font-semibold text-brand-ink">Sanitised preview</p>' +
          '<iframe id="h2p-frame" title="HTML preview" sandbox="allow-same-origin" class="h-[26rem] w-full rounded-xl bg-white ring-1 ring-brand-line"></iframe>' +
        '</div>' +
      '</div>';

    var src = $("#h2p-src", ctx.body), frame = $("#h2p-frame", ctx.body);

    // Minimal sanitiser: strip dangerous elements/attributes before rendering.
    function sanitize(html) {
      var doc = document.implementation.createHTMLDocument("preview");
      doc.body.innerHTML = html;
      var kill = doc.querySelectorAll("script,iframe,object,embed,link,meta,base,form,input,button,textarea,style");
      Array.prototype.forEach.call(kill, function (n) { n.parentNode && n.parentNode.removeChild(n); });
      var all = doc.body.querySelectorAll("*");
      Array.prototype.forEach.call(all, function (el) {
        Array.prototype.slice.call(el.attributes).forEach(function (at) {
          var name = at.name.toLowerCase(), val = at.value || "";
          if (name.indexOf("on") === 0) el.removeAttribute(at.name);
          else if ((name === "href" || name === "src" || name === "xlink:href") && /^\s*javascript:/i.test(val)) el.removeAttribute(at.name);
          else if (name === "srcdoc") el.removeAttribute(at.name);
        });
      });
      return doc.body.innerHTML;
    }
    function buildDoc() {
      var clean = sanitize(src.value || "");
      return '<!doctype html><html><head><meta charset="utf-8"><style>' +
        'html{font-family:Montserrat,Arial,sans-serif;color:#222;padding:24px;line-height:1.5}img{max-width:100%}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px 8px}' +
        '@media print{@page{margin:16mm}}</style></head><body>' + clean + '</body></html>';
    }
    function updatePreview() { frame.srcdoc = buildDoc(); }

    $("#h2p-prev", ctx.body).addEventListener("click", updatePreview);
    $("#h2p-sample", ctx.body).addEventListener("click", function () {
      src.value = '<h1 style="color:#342B7C">ATLAS SkillTech University</h1>\n<p>This is a <strong>sample</strong> document rendered from HTML.</p>\n<ul>\n  <li>Merge, split and organise PDFs</li>\n  <li>Convert images to PDF</li>\n  <li>Everything runs in your browser</li>\n</ul>\n<table>\n  <tr><th>Tool</th><th>Status</th></tr>\n  <tr><td>Merge</td><td>Working</td></tr>\n  <tr><td>Watermark</td><td>Working</td></tr>\n</table>';
      updatePreview();
    });
    $("#h2p-print", ctx.body).addEventListener("click", function () {
      if (!src.value.trim()) { __toast("Add some HTML first.", true); return; }
      var w = window.open("", "_blank");
      if (!w) { __toast("Your browser blocked the print window. Allow pop-ups for this page.", true); return; }
      w.document.open(); w.document.write(buildDoc()); w.document.close();
      w.focus();
      setTimeout(function () { try { w.print(); } catch (e) {} }, 400);
      __toast("Choose “Save as PDF” in the print dialog");
    });

    updatePreview();
  }

  /* ================================================================
     E. EDIT PDF
     ================================================================ */

  // 18. WATERMARK
  var buildWatermark = singlePdfTool({
    runLabel: "Add watermark",
    emptyText: "Add a PDF to stamp a text watermark across its pages.",
    controlsHTML:
      '<div><label for="wm-text" class="block text-xs font-semibold text-brand-ink">Watermark text</label>' +
      '<input id="wm-text" type="text" value="CONFIDENTIAL" maxlength="60" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="wm-size" class="block text-xs font-semibold text-brand-ink">Size</label><input id="wm-size" type="number" value="60" min="8" max="200" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="wm-rot" class="block text-xs font-semibold text-brand-ink">Rotation °</label><input id="wm-rot" type="number" value="45" min="-90" max="90" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '</div>' +
      '<div><label for="wm-op" class="flex items-center justify-between text-xs font-semibold text-brand-ink">Opacity <span id="wm-opval" class="text-brand-indigo">20%</span></label><input id="wm-op" type="range" min="5" max="100" value="20" class="mt-1.5 w-full accent-brand-teal"></div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="wm-color" class="block text-xs font-semibold text-brand-ink">Color</label><input id="wm-color" type="color" value="#342B7C" class="mt-1.5 h-9 w-full cursor-pointer rounded-lg border-0 bg-brand-paper p-1 ring-1 ring-inset ring-brand-line"></div>' +
        '<div><label for="wm-pos" class="block text-xs font-semibold text-brand-ink">Placement</label><select id="wm-pos" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"><option value="center">Center</option><option value="tile">Tiled</option></select></div>' +
      '</div>',
    onReady: function (ctx, E, state) {
      var op = $("#wm-op"), ov = $("#wm-opval");
      if (op) op.addEventListener("input", function () { ov.textContent = op.value + "%"; });
      E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Configure the watermark, then press “Add watermark”.</div>');
    },
    run: function (ctx, E, state) {
      var text = $("#wm-text").value || "WATERMARK", size = Math.max(8, Math.min(200, +$("#wm-size").value || 60));
      var rot = Math.max(-90, Math.min(90, +$("#wm-rot").value || 0)), op = (+$("#wm-op").value || 20) / 100, placement = $("#wm-pos").value;
      var hex = $("#wm-color").value || "#342B7C";
      var r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) {
          return doc.embedFont(PDFLib.StandardFonts.HelveticaBold).then(function (font) {
            var color = PDFLib.rgb(r, g, b);
            doc.getPages().forEach(function (pg) {
              var sz = pg.getSize();
              var tw = font.widthOfTextAtSize(text, size);
              if (placement === "tile") {
                var stepX = tw + size * 2, stepY = size * 4;
                for (var y = 0; y < sz.height + stepY; y += stepY) {
                  for (var x = -tw; x < sz.width; x += stepX) {
                    pg.drawText(text, { x: x, y: y, size: size * 0.5, font: font, color: color, opacity: op, rotate: PDFLib.degrees(rot) });
                  }
                }
              } else {
                pg.drawText(text, { x: (sz.width - tw) / 2, y: sz.height / 2 - size / 2, size: size, font: font, color: color, opacity: op, rotate: PDFLib.degrees(rot) });
              }
            });
            return doc.save();
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-watermarked.pdf", "Watermark applied to all pages"); });
    }
  });

  // 19. CROP
  var buildCrop = singlePdfTool({
    runLabel: "Crop pages",
    emptyText: "Add a PDF to trim its page margins.",
    controlsHTML:
      '<p class="text-[11px] text-brand-ink/70">Set how much to trim from each edge. Values are a percentage of each page\'s size and apply to every page.</p>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="cr-top" class="block text-xs font-semibold text-brand-ink">Top %</label><input id="cr-top" type="number" value="0" min="0" max="45" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="cr-bottom" class="block text-xs font-semibold text-brand-ink">Bottom %</label><input id="cr-bottom" type="number" value="0" min="0" max="45" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="cr-left" class="block text-xs font-semibold text-brand-ink">Left %</label><input id="cr-left" type="number" value="0" min="0" max="45" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="cr-right" class="block text-xs font-semibold text-brand-ink">Right %</label><input id="cr-right" type="number" value="0" min="0" max="45" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '</div>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Cropping sets each page\'s visible CropBox. The underlying content is preserved, so a viewer may let the reader restore it.</div>'); },
    run: function (ctx, E, state) {
      var t = clampPct($("#cr-top").value), bt = clampPct($("#cr-bottom").value), l = clampPct($("#cr-left").value), rt = clampPct($("#cr-right").value);
      if (t + bt >= 100 || l + rt >= 100) throw new Error("Those crop values would remove the whole page.");
      if (!(t || bt || l || rt)) throw new Error("Set at least one edge to crop.");
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) {
          doc.getPages().forEach(function (pg) {
            var sz = pg.getSize();
            // Account for any existing cropbox origin via mediabox (pdf-lib default origin 0,0).
            var nx = sz.width * (l / 100), ny = sz.height * (bt / 100);
            var nw = sz.width * (1 - (l + rt) / 100), nh = sz.height * (1 - (t + bt) / 100);
            pg.setCropBox(nx, ny, nw, nh);
          });
          return doc.save();
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-cropped.pdf", "CropBox set on all pages"); });
    }
  });
  function clampPct(v) { return Math.max(0, Math.min(45, +v || 0)); }

  // 20. ADD TEXT
  var buildAddText = singlePdfTool({
    runLabel: "Add text",
    emptyText: "Add a PDF to place a text overlay on it.",
    controlsHTML:
      '<div><label for="at-text" class="block text-xs font-semibold text-brand-ink">Text</label><input id="at-text" type="text" value="ATLAS" maxlength="120" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="at-size" class="block text-xs font-semibold text-brand-ink">Font size</label><input id="at-size" type="number" value="18" min="6" max="120" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="at-color" class="block text-xs font-semibold text-brand-ink">Color</label><input id="at-color" type="color" value="#ED1A3B" class="mt-1.5 h-9 w-full cursor-pointer rounded-lg border-0 bg-brand-paper p-1 ring-1 ring-inset ring-brand-line"></div>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="at-x" class="block text-xs font-semibold text-brand-ink">X % from left</label><input id="at-x" type="number" value="10" min="0" max="100" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="at-y" class="block text-xs font-semibold text-brand-ink">Y % from top</label><input id="at-y" type="number" value="10" min="0" max="100" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '</div>' +
      '<div><label for="at-range" class="block text-xs font-semibold text-brand-ink">Pages (blank = all)</label><input id="at-range" type="text" inputmode="numeric" placeholder="e.g. 1, 3-4" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>',
    onReady: function (ctx, E, state) { E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Overlay text is drawn with Helvetica. Position is a percentage of the page (0,0 = top-left).</div>'); },
    run: function (ctx, E, state) {
      var text = $("#at-text").value; if (!text) throw new Error("Enter some text.");
      var size = Math.max(6, Math.min(120, +$("#at-size").value || 18));
      var hex = $("#at-color").value || "#ED1A3B";
      var r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
      var px = Math.max(0, Math.min(100, +$("#at-x").value)) / 100, py = Math.max(0, Math.min(100, +$("#at-y").value)) / 100;
      var rangeStr = $("#at-range").value;
      return ensurePdfLib().then(function (PDFLib) {
        return loadPdfLibDoc(PDFLib, state.ab).then(function (doc) {
          var total = doc.getPageCount();
          var idx = rangeStr && rangeStr.trim() ? parsePageRanges(rangeStr, total) : null;
          var idxSet = null; if (idx) { idxSet = {}; idx.forEach(function (i) { idxSet[i] = 1; }); }
          return doc.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) {
            doc.getPages().forEach(function (pg, i) {
              if (idxSet && !idxSet[i]) return;
              var sz = pg.getSize();
              pg.drawText(text, { x: sz.width * px, y: sz.height * (1 - py) - size, size: size, font: font, color: PDFLib.rgb(r, g, b) });
            });
            return doc.save();
          });
        });
      }).then(function (bytes) { finishPdf(E, state, bytes, baseName(state.file.name) + "-text.pdf", "Text overlay added"); });
    }
  });

  // 21. ADD IMAGE / SIGNATURE
  function buildAddImage(ctx) {
    var E = scaffold(ctx, { multiple: false, runLabel: "Place image", emptyText: "Add a PDF, then upload the image/signature to place." });
    var state = { file: null, ab: null, img: null, imgUrl: null, imgIsPng: false };
    ctx.onCleanup(function () { if (state.imgUrl) URL.revokeObjectURL(state.imgUrl); });

    E.controls.innerHTML =
      '<div><label class="block text-xs font-semibold text-brand-ink">Image / signature (PNG or JPG)</label>' +
      '<label class="mt-1.5 flex cursor-pointer items-center gap-2 rounded-lg bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line hover:ring-brand-teal"><input id="ai-img" type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" class="sr-only"><span>Choose image…</span></label>' +
      '<div id="ai-prev" class="mt-2 hidden"><img alt="chosen image" class="max-h-20 rounded bg-white [background-image:repeating-conic-gradient(#ECECEC_0_25%,transparent_0_50%)] [background-size:16px_16px] ring-1 ring-brand-line"></div></div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="ai-w" class="block text-xs font-semibold text-brand-ink">Width %</label><input id="ai-w" type="number" value="30" min="2" max="100" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="ai-op" class="flex items-center justify-between text-xs font-semibold text-brand-ink">Opacity <span id="ai-opv" class="text-brand-indigo">100%</span></label><input id="ai-op" type="range" min="10" max="100" value="100" class="mt-2 w-full accent-brand-teal"></div>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-3">' +
        '<div><label for="ai-x" class="block text-xs font-semibold text-brand-ink">X % from left</label><input id="ai-x" type="number" value="60" min="0" max="100" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
        '<div><label for="ai-y" class="block text-xs font-semibold text-brand-ink">Y % from top</label><input id="ai-y" type="number" value="80" min="0" max="100" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '</div>' +
      '<div><label for="ai-range" class="block text-xs font-semibold text-brand-ink">Pages (blank = all)</label><input id="ai-range" type="text" inputmode="numeric" placeholder="e.g. 1" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>';

    function reset() {
      state.file = state.ab = null;
      if (state.imgUrl) { URL.revokeObjectURL(state.imgUrl); state.imgUrl = null; }
      state.img = null;
      E.files.classList.add("hidden"); E.files.innerHTML = ""; E.optcard.classList.add("hidden");
      E.empty.classList.remove("hidden"); E.out.classList.add("hidden"); E.out.innerHTML = ""; E.dl.hidden = true; E.input.value = "";
      var p = $("#ai-prev"); if (p) p.classList.add("hidden");
      E.setStatus("");
    }
    function onFile(file) {
      var err = validatePdf(file); if (err) { __toast(err, true); return; }
      reset(); state.file = file;
      E.files.classList.remove("hidden"); E.files.innerHTML = filePill(file, 0, false); E.optcard.classList.remove("hidden");
      readArrayBuffer(file).then(function (ab) { state.ab = ab; E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Now choose an image/signature and set its size and position.</div>'); });
    }
    E.input.addEventListener("change", function () { if (E.input.files[0]) onFile(E.input.files[0]); });
    wireDrop(E.drop, function (files) { onFile(files[0]); });

    E.controls.addEventListener("input", function (e) { if (e.target.id === "ai-op") $("#ai-opv").textContent = e.target.value + "%"; });
    $("#ai-img", E.controls).addEventListener("change", function () {
      var f = this.files[0]; if (!f) return;
      var err = validateImage(f); if (err) { __toast(err, true); return; }
      if (state.imgUrl) URL.revokeObjectURL(state.imgUrl);
      state.imgFile = f; state.imgIsPng = /png$/i.test(f.type) || /\.png$/i.test(f.name);
      state.imgUrl = URL.createObjectURL(f);
      var p = $("#ai-prev"); p.classList.remove("hidden"); $("img", p).src = state.imgUrl;
    });

    E.reset.addEventListener("click", function () { reset(); __toast("Cleared"); });
    E.dl.addEventListener("click", function () { if (state.outBytes) downloadBytes(state.outBytes, baseName(state.file.name) + "-signed.pdf", "application/pdf"); });

    E.run.addEventListener("click", function () {
      if (!state.ab) { __toast("Add a PDF first.", true); return; }
      if (!state.imgFile) { __toast("Choose an image or signature.", true); return; }
      E.busy(true); E.setStatus("Placing image…");
      var wPct = Math.max(2, Math.min(100, +$("#ai-w").value || 30)) / 100;
      var op = (+$("#ai-op").value || 100) / 100;
      var px = Math.max(0, Math.min(100, +$("#ai-x").value)) / 100, py = Math.max(0, Math.min(100, +$("#ai-y").value)) / 100;
      var rangeStr = $("#ai-range").value;
      ensurePdfLib().then(function (PDFLib) {
        return Promise.all([loadPdfLibDoc(PDFLib, state.ab), readArrayBuffer(state.imgFile)]).then(function (res) {
          var doc = res[0], imgAb = res[1];
          return (state.imgIsPng ? doc.embedPng(imgAb) : doc.embedJpg(imgAb)).catch(function () {
            return state.imgIsPng ? doc.embedJpg(imgAb) : doc.embedPng(imgAb);
          }).then(function (img) {
            var total = doc.getPageCount();
            var idx = rangeStr && rangeStr.trim() ? parsePageRanges(rangeStr, total) : null;
            var idxSet = null; if (idx) { idxSet = {}; idx.forEach(function (i) { idxSet[i] = 1; }); }
            doc.getPages().forEach(function (pg, i) {
              if (idxSet && !idxSet[i]) return;
              var sz = pg.getSize();
              var w = sz.width * wPct, h = w * (img.height / img.width);
              pg.drawImage(img, { x: sz.width * px, y: sz.height * (1 - py) - h, width: w, height: h, opacity: op });
            });
            return doc.save();
          });
        });
      }).then(function (bytes) {
        state.outBytes = bytes; E.busy(false); E.dl.hidden = false;
        E.setStatus("Image placed · " + fmtSize(bytes.length), "ok");
        E.showOut('<div class="rounded-2xl bg-white p-6 text-center ring-1 ring-brand-line"><svg viewBox="0 0 24 24" class="mx-auto h-10 w-10 text-brand-teal" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg><p class="mt-3 text-sm font-bold text-brand-indigo">PDF ready</p><p class="mt-1 text-xs text-brand-ink">' + fmtSize(bytes.length) + '</p><button type="button" data-outdl class="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal">Download PDF</button></div>');
        $("[data-outdl]", E.out).addEventListener("click", function () { downloadBytes(bytes, baseName(state.file.name) + "-signed.pdf", "application/pdf"); });
        __toast("Image placed");
      }).catch(function (e) { E.busy(false); E.setStatus(e.message || "Failed.", "err"); __toast(e.message || "Failed", true); });
    });
  }

  // 22. COMPARE
  function buildCompare(ctx) {
    ctx.body.innerHTML =
      '<div class="grid grid-cols-1 gap-4 n640:grid-cols-2">' +
        compareDrop("A", "First PDF") + compareDrop("B", "Second PDF") +
      '</div>' +
      '<div id="cmp-bar" class="mt-5 hidden flex-wrap items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-brand-line">' +
        '<button type="button" id="cmp-prev" class="rounded-lg px-3 py-2 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white">‹ Prev</button>' +
        '<span id="cmp-pageinfo" class="text-sm font-semibold text-brand-indigo">Page 1</span>' +
        '<button type="button" id="cmp-next" class="rounded-lg px-3 py-2 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line hover:bg-brand-indigo hover:text-white">Next ›</button>' +
        '<label class="ml-auto flex items-center gap-2 text-sm font-semibold text-brand-ink"><input type="checkbox" id="cmp-diff" class="h-4 w-4 accent-brand-teal">Highlight differences</label>' +
      '</div>' +
      '<p id="cmp-status" class="mt-3 text-xs font-semibold text-brand-ink" aria-live="polite" role="status"></p>' +
      '<div id="cmp-view" class="mt-4 hidden grid grid-cols-1 gap-4 n1024:grid-cols-3">' +
        '<figure class="rounded-2xl bg-white p-3 ring-1 ring-brand-line"><figcaption class="mb-2 text-xs font-bold text-brand-indigo">A</figcaption><div id="cmp-a" class="grid place-items-center overflow-auto bg-white [background-image:repeating-conic-gradient(#ECECEC_0_25%,transparent_0_50%)] [background-size:16px_16px]"></div></figure>' +
        '<figure class="rounded-2xl bg-white p-3 ring-1 ring-brand-line"><figcaption class="mb-2 text-xs font-bold text-brand-indigo">B</figcaption><div id="cmp-b" class="grid place-items-center overflow-auto bg-white [background-image:repeating-conic-gradient(#ECECEC_0_25%,transparent_0_50%)] [background-size:16px_16px]"></div></figure>' +
        '<figure class="rounded-2xl bg-white p-3 ring-1 ring-brand-line"><figcaption class="mb-2 text-xs font-bold text-brand-indigo">Difference</figcaption><div id="cmp-d" class="grid place-items-center overflow-auto bg-white [background-image:repeating-conic-gradient(#ECECEC_0_25%,transparent_0_50%)] [background-size:16px_16px]"></div></figure>' +
      '</div>';

    var S = { a: null, b: null, docA: null, docB: null, page: 1, max: 1 };
    ctx.onCleanup(function () { if (S.docA) try { S.docA.destroy(); } catch (e) {} if (S.docB) try { S.docB.destroy(); } catch (e) {} });

    function compareDrop(key, label) {
      return '<label class="group block cursor-pointer rounded-2xl border-2 border-dashed border-brand-line bg-white p-6 text-center transition hover:border-brand-teal focus-within:border-brand-teal" data-cdrop="' + key + '">' +
        '<input type="file" accept=".pdf,application/pdf" class="sr-only" data-cinput="' + key + '">' + DROP_SVG +
        '<p class="mt-2 text-sm font-bold text-brand-indigo">' + esc(label) + '</p><p data-cname="' + key + '" class="mt-0.5 text-xs text-brand-ink">or browse · PDF</p></label>';
    }
    function setStatus(m, k) { var s = $("#cmp-status", ctx.body); s.textContent = m || ""; s.className = "mt-3 text-xs font-semibold " + (k === "err" ? "text-brand-ugdx" : k === "ok" ? "text-brand-teal" : "text-brand-ink"); }

    function loadSide(key, file) {
      var err = validatePdf(file); if (err) { __toast(err, true); return; }
      $('[data-cname="' + key + '"]', ctx.body).textContent = file.name + " · " + fmtSize(file.size);
      setStatus("Loading " + key + "…");
      ensurePdfjs().then(function (pdfjsLib) {
        return readArrayBuffer(file).then(function (ab) { return openPdfjs(pdfjsLib, ab); });
      }).then(function (doc) {
        if (key === "A") { if (S.docA) S.docA.destroy(); S.docA = doc; } else { if (S.docB) S.docB.destroy(); S.docB = doc; }
        if (S.docA && S.docB) { S.max = Math.max(S.docA.numPages, S.docB.numPages); S.page = 1; $("#cmp-bar", ctx.body).classList.remove("hidden"); $("#cmp-bar", ctx.body).classList.add("flex"); $("#cmp-view", ctx.body).classList.remove("hidden"); render(); }
        else setStatus("Add the second PDF to compare.");
      }).catch(function (e) { setStatus(e.message || "Could not open the PDF.", "err"); });
    }

    function renderInto(doc, el, n) {
      el.innerHTML = "";
      if (n > doc.numPages) { el.innerHTML = '<p class="p-6 text-xs text-brand-ink/60">(no page ' + n + ')</p>'; return Promise.resolve(null); }
      return doc.getPage(n).then(function (pg) { return renderPageToCanvas(pg, 360, 2); }).then(function (canvas) {
        canvas.className = "h-auto w-full"; el.appendChild(canvas); return canvas;
      });
    }
    function render() {
      $("#cmp-pageinfo", ctx.body).textContent = "Page " + S.page + " / " + S.max;
      setStatus("Rendering page " + S.page + "…");
      Promise.all([
        renderInto(S.docA, $("#cmp-a", ctx.body), S.page),
        renderInto(S.docB, $("#cmp-b", ctx.body), S.page)
      ]).then(function (cs) {
        var dEl = $("#cmp-d", ctx.body);
        if ($("#cmp-diff", ctx.body).checked && cs[0] && cs[1]) drawDiff(cs[0], cs[1], dEl);
        else dEl.innerHTML = '<p class="p-6 text-xs text-brand-ink/60">Tick “Highlight differences”.</p>';
        setStatus("Showing page " + S.page + " of " + S.max + ".", "ok");
      });
    }
    function drawDiff(ca, cb, el) {
      var w = Math.min(ca.width, cb.width), h = Math.min(ca.height, cb.height);
      var out = document.createElement("canvas"); out.width = w; out.height = h; out.className = "h-auto w-full";
      var octx = out.getContext("2d");
      var actx = ca.getContext("2d"), bctx = cb.getContext("2d");
      var A = actx.getImageData(0, 0, w, h), B = bctx.getImageData(0, 0, w, h), O = octx.createImageData(w, h);
      for (var i = 0; i < A.data.length; i += 4) {
        var dr = Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]);
        if (dr > 40) { O.data[i] = 237; O.data[i + 1] = 26; O.data[i + 2] = 59; O.data[i + 3] = 255; }
        else { var gray = 245; O.data[i] = O.data[i + 1] = O.data[i + 2] = gray; O.data[i + 3] = 255; }
      }
      octx.putImageData(O, 0, 0); el.innerHTML = ""; el.appendChild(out);
    }

    $$("[data-cinput]", ctx.body).forEach(function (inp) {
      inp.addEventListener("change", function () { if (inp.files[0]) loadSide(inp.getAttribute("data-cinput"), inp.files[0]); });
    });
    $$("[data-cdrop]", ctx.body).forEach(function (el) {
      wireDrop(el, function (files) { loadSide(el.getAttribute("data-cdrop"), files[0]); });
    });
    $("#cmp-prev", ctx.body).addEventListener("click", function () { if (S.page > 1) { S.page--; render(); } });
    $("#cmp-next", ctx.body).addEventListener("click", function () { if (S.page < S.max) { S.page++; render(); } });
    $("#cmp-diff", ctx.body).addEventListener("change", render);
  }

  /* ================================================================
     F. SECURITY & UTILITIES
     ================================================================ */

  // 23. PROTECT — honestly unavailable (pdf-lib cannot encrypt).
  function buildProtect(ctx) {
    unavailablePanel(ctx,
      "Password protection isn't available in-browser",
      "The client-side library used here (pdf-lib) can read and build PDFs but cannot encrypt them, and there is no maintained, trustworthy in-browser engine for standards-compliant PDF password encryption. Rather than ship a fake “lock” that doesn't actually protect the file, this tool is intentionally left out.",
      [
        ["Need real encryption?", "Use a desktop app (Adobe Acrobat, LibreOffice “Export as PDF → Security”) or your operating system’s print-to-PDF with a password."],
        ["On a server?", "A server-side engine (e.g. qpdf) can add encryption — see the setup notes in the project README."]
      ]);
  }

  // 24. UNLOCK — detect protection; explain honestly what can/can't be done.
  function buildUnlock(ctx) {
    var E = scaffold(ctx, { multiple: false, runLabel: "Check protection", emptyText: "Add a PDF to check its protection status." });
    var state = { file: null, ab: null };
    E.controls.innerHTML =
      '<div><label for="ul-pass" class="block text-xs font-semibold text-brand-ink">Password (if you know it)</label>' +
      '<input id="ul-pass" type="password" autocomplete="off" placeholder="optional" class="mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:ring-2 focus:ring-inset focus:ring-brand-teal"></div>' +
      '<p class="rounded-lg bg-brand-law/10 p-3 text-[11px] leading-relaxed text-brand-ink ring-1 ring-brand-law/30"><strong class="text-brand-law">Honest limits:</strong> this reports whether a PDF is encrypted or needs a password, for files you are authorised to modify. The in-browser libraries <strong>cannot</strong> decrypt protected content, so no “unlocked” file is produced — that would either fail or create a broken PDF. For genuine removal, use a desktop tool (Acrobat, <code>qpdf --decrypt</code>).</p>';

    function reset() { state.file = state.ab = state.outBytes = null; E.files.classList.add("hidden"); E.files.innerHTML = ""; E.optcard.classList.add("hidden"); E.empty.classList.remove("hidden"); E.out.classList.add("hidden"); E.out.innerHTML = ""; E.dl.hidden = true; E.input.value = ""; E.setStatus(""); }
    function onFile(file) {
      var err = validatePdf(file); if (err) { __toast(err, true); return; }
      reset(); state.file = file; E.files.classList.remove("hidden"); E.files.innerHTML = filePill(file, 0, false); E.optcard.classList.remove("hidden");
      readArrayBuffer(file).then(function (ab) { state.ab = ab; E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line">Press “Check protection” to see whether this PDF is encrypted and what can be done.</div>'); });
    }
    E.input.addEventListener("change", function () { if (E.input.files[0]) onFile(E.input.files[0]); });
    wireDrop(E.drop, function (files) { onFile(files[0]); });
    E.reset.addEventListener("click", function () { reset(); __toast("Cleared"); });
    E.dl.addEventListener("click", function () { if (state.outBytes) downloadBytes(state.outBytes, baseName(state.file.name) + "-unlocked.pdf", "application/pdf"); });

    E.run.addEventListener("click", function () {
      if (!state.ab) { __toast("Add a PDF first.", true); return; }
      E.busy(true); E.setStatus("Checking…");
      var pass = $("#ul-pass").value;
      var needsPassword = false;
      // 1) Use pdf.js to detect whether the file needs a password to open.
      ensurePdfjs().then(function (pdfjsLib) {
        return openPdfjs(pdfjsLib, state.ab, pass || undefined).then(function (doc) {
          try { doc.destroy(); } catch (e) {}
          return true;
        }).catch(function (e) {
          if (e && e.name === "PasswordException") { needsPassword = true; }
          throw e;
        });
      // 2) It opened: read the real encryption flag from pdf-lib and report honestly.
      }).then(function () {
        return ensurePdfLib().then(function (PDFLib) {
          return PDFLib.PDFDocument.load(copyBuf(state.ab), { ignoreEncryption: true, throwOnInvalidObject: false, updateMetadata: false })
            .then(function (doc) {
              E.busy(false);
              if (!doc.isEncrypted) {
                E.setStatus("This PDF is not password-protected — nothing to unlock.", "ok");
                E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line"><p class="font-bold text-brand-indigo">No protection found</p><p class="mt-1">This file opens without a password and has no encryption or usage restrictions to remove.</p></div>');
                __toast("Not protected");
              } else {
                // The file is encrypted. pdf-lib cannot decrypt content streams, so
                // re-saving would risk a broken PDF. We do NOT produce a file here.
                E.setStatus("This PDF is encrypted. In-browser removal isn't supported.", "err");
                E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line"><p class="font-bold text-brand-ugdx">This PDF is encrypted</p><p class="mt-1 leading-relaxed">The in-browser library can detect the encryption but cannot safely decrypt and rewrite the content, so <strong>no file is produced</strong> (you won\'t get a broken PDF). To remove protection from a file you\'re authorised to modify, use a desktop tool such as Adobe Acrobat or the command-line <code>qpdf --decrypt</code>.</p></div>');
                __toast("Encrypted — can't unlock in browser", true);
              }
            });
        });
      }).catch(function (e) {
        E.busy(false);
        if (needsPassword) {
          E.setStatus("This PDF needs a password to open.", "err");
          E.showOut('<div class="rounded-2xl bg-white p-6 text-sm text-brand-ink ring-1 ring-brand-line"><p class="font-bold text-brand-ugdx">Password required</p><p class="mt-1">Enter the correct password on the left and check again. Note: even with the password, fully-encrypted PDFs can\'t have their encryption removed in the browser — this only reports the status.</p></div>');
        } else {
          E.setStatus(e.message || "Could not read the PDF.", "err");
        }
      });
    });
  }

  // 25. PDF INFORMATION
  var buildInfo = singlePdfTool({
    runLabel: "Read details",
    emptyText: "Add a PDF to see its details and metadata.",
    controlsHTML: '<p class="text-[11px] text-brand-ink/70">Reads the page count, size, page dimensions and any embedded metadata. Nothing leaves your device.</p>',
    onReady: function (ctx, E, state) { E.run.click(); },
    run: function (ctx, E, state) {
      var pdfjsInfo = null;
      return ensurePdfjs().then(function (pdfjsLib) {
        return openPdfjs(pdfjsLib, state.ab).then(function (doc) {
          return doc.getMetadata().then(function (md) {
            var first = doc.getPage(1).then(function (pg) {
              var vp = pg.getViewport({ scale: 1 });
              return { w: vp.width, h: vp.height };
            });
            return first.then(function (dim) {
              pdfjsInfo = { num: doc.numPages, info: md.info || {}, dim: dim, encrypted: false };
              try { doc.destroy(); } catch (e) {}
            });
          });
        });
      }).then(function () {
        // Read the reliable encryption flag from pdf-lib.
        return ensurePdfLib().then(function (PDFLib) {
          return PDFLib.PDFDocument.load(copyBuf(state.ab), { ignoreEncryption: true, throwOnInvalidObject: false, updateMetadata: false })
            .then(function (d) { pdfjsInfo.encrypted = !!d.isEncrypted; })
            .catch(function () { /* leave as false if pdf-lib can't read it */ });
        });
      }).then(function () {
        var i = pdfjsInfo.info, dim = pdfjsInfo.dim;
        function pt2mm(p) { return (p * 25.4 / 72).toFixed(0); }
        function pt2in(p) { return (p / 72).toFixed(2); }
        var rows = [
          ["File name", state.file.name],
          ["File size", fmtSize(state.file.size)],
          ["Pages", String(pdfjsInfo.num)],
          ["Page 1 size", Math.round(dim.w) + " × " + Math.round(dim.h) + " pt  (" + pt2mm(dim.w) + " × " + pt2mm(dim.h) + " mm, " + pt2in(dim.w) + " × " + pt2in(dim.h) + " in)"],
          ["Encrypted", pdfjsInfo.encrypted ? "Yes" : "No"],
          ["Title", i.Title || "—"],
          ["Author", i.Author || "—"],
          ["Subject", i.Subject || "—"],
          ["Keywords", i.Keywords || "—"],
          ["Creator", i.Creator || "—"],
          ["Producer", i.Producer || "—"],
          ["PDF version", i.PDFFormatVersion || "—"],
          ["Created", i.CreationDate ? fmtPdfDate(i.CreationDate) : "—"],
          ["Modified", i.ModDate ? fmtPdfDate(i.ModDate) : "—"]
        ];
        state.outBytes = null; E.dl.hidden = true;
        E.setStatus("Details read.", "ok");
        E.showOut('<div class="overflow-hidden rounded-2xl bg-white ring-1 ring-brand-line"><table class="w-full text-sm"><tbody>' +
          rows.map(function (r, idx) {
            return '<tr class="' + (idx % 2 ? "bg-brand-paper" : "bg-white") + '"><th scope="row" class="w-40 px-4 py-2.5 text-left align-top font-semibold text-brand-indigo">' + esc(r[0]) + '</th><td class="break-words px-4 py-2.5 text-brand-ink">' + esc(r[1]) + '</td></tr>';
          }).join("") + '</tbody></table></div>');
        __toast("Details ready");
      });
    }
  });
  function fmtPdfDate(d) {
    // PDF date like D:20230115093000+00'00'
    var m = /D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?/.exec(d);
    if (!m) return d;
    return m[1] + (m[2] ? "-" + m[2] : "") + (m[3] ? "-" + m[3] : "") + (m[4] ? " " + m[4] + ":" + (m[5] || "00") : "");
  }

  /* ---------- Shared "unavailable" panel ---------- */
  function unavailablePanel(ctx, title, body, alts) {
    ctx.body.innerHTML =
      '<div class="mx-auto max-w-2xl rounded-2xl bg-white p-7 ring-1 ring-brand-line">' +
        '<div class="flex items-start gap-4">' +
          '<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-ugdx/10 text-brand-ugdx ring-1 ring-inset ring-brand-ugdx/20"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg></span>' +
          '<div><h3 class="text-base font-extrabold text-brand-indigo">' + esc(title) + '</h3>' +
          '<p class="mt-2 text-sm leading-relaxed text-brand-ink">' + esc(body) + '</p></div>' +
        '</div>' +
        (alts && alts.length ? '<div class="mt-5 space-y-3 border-t border-brand-line pt-5">' + alts.map(function (a) {
          return '<div><p class="text-sm font-bold text-brand-indigo">' + esc(a[0]) + '</p><p class="mt-0.5 text-sm text-brand-ink">' + a[1] + '</p></div>';
        }).join("") + '</div>' : "") +
      '</div>';
  }

  /* ================================================================
     Tool registry + icons
     status: 'local' (runs in browser) | 'limited' | 'unavailable'
     ================================================================ */

  var IC = {
    merge: '<path d="M8 4H5a1 1 0 0 0-1 1v5M16 4h3a1 1 0 0 1 1 1v5M12 8v8m0 0l3-3m-3 3l-3-3M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    split: '<path d="M12 3v7M8 7l4 3 4-3M5 14h4l-2 6M19 14h-4l2 6"/>',
    extract: '<path d="M9 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3M14 3l5 5M14 3v5h5M19 11v6m0 0l-2-2m2 2l2-2"/>',
    remove: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9 13h6"/>',
    reorder: '<path d="M4 7h10M4 12h7M4 17h10M18 8v9m0 0l-2-2m2 2l2-2M18 8l-2 2m2-2l2 2" />',
    rotate: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 4v4h-4"/>',
    number: '<path d="M6 4v16M6 4L3 7M15 8h4M15 8a2 2 0 1 1 4 0c0 1.5-4 3.5-4 5h4"/>',
    compress: '<path d="M12 3v6m0 0l3-3m-3 3L9 6M12 21v-6m0 0l3 3m-3-3l-3 3M4 12h16"/>',
    repair: '<path d="M14 7l3-3 3 3-3 3M3 21l9-9M14 7l-9 9-2 5 5-2 9-9M11 10l3 3"/>',
    tojpg: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8 16l2-2 2 2 2-3 2 3"/><circle cx="9.5" cy="12" r="1"/>',
    topng: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8 17v-5l4 5v-5"/>',
    totext: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    toword: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8 12l1.5 5L11 13l1.5 4L14 12"/>',
    jpgtopdf: '<path d="M4 5a1 1 0 0 1 1-1h9l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M8 14l2-2 2 2 2-3 2 3"/><circle cx="9" cy="10" r="1"/>',
    texttopdf: '<path d="M4 5a1 1 0 0 1 1-1h9l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M8 11h7M8 14h7M8 17h4"/>',
    htmltopdf: '<path d="M4 5a1 1 0 0 1 1-1h9l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M9 11l-2 2 2 2M15 11l2 2-2 2"/>',
    watermark: '<path d="M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z"/><path d="M8 15h8"/>',
    crop: '<path d="M6 2v16a1 1 0 0 0 1 1h15M2 6h16a1 1 0 0 1 1 1v15"/>',
    addtext: '<path d="M4 7V5h16v2M9 5v14M7 19h4"/><path d="M14 14h6M17 11v6"/>',
    signature: '<path d="M3 17c3 0 3-6 6-6s3 8 6 8 3-4 6-4"/><path d="M3 21h18"/>',
    compare: '<path d="M12 3v18M7 7l-4 4 4 4M17 7l4 4-4 4"/>',
    protect: '<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  function icon(key) { return '<svg viewBox="0 0 24 24" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (IC[key] || IC.info) + '</svg>'; }

  var CATS = [
    { id: "all", label: "All Tools" },
    { id: "organize", label: "Organize PDF" },
    { id: "optimize", label: "Compress & Repair" },
    { id: "toPdf", label: "Convert to PDF" },
    { id: "fromPdf", label: "Convert from PDF" },
    { id: "edit", label: "Edit PDF" },
    { id: "security", label: "Security" },
    { id: "utility", label: "Utilities" }
  ];

  TOOLS = [
    { id: "merge", name: "Merge PDF", cat: "organize", status: "local", icon: "merge", desc: "Combine several PDFs into one, in any order.", build: buildMerge, kw: "combine join" },
    { id: "split", name: "Split PDF", cat: "organize", status: "local", icon: "split", desc: "Split out selected pages into separate PDFs.", build: buildSplit, kw: "divide separate" },
    { id: "extract", name: "Extract Pages", cat: "organize", status: "local", icon: "extract", desc: "Keep only the pages you choose as a new PDF.", build: buildExtract, kw: "pick keep" },
    { id: "remove", name: "Remove Pages", cat: "organize", status: "local", icon: "remove", desc: "Delete selected pages and keep the rest.", build: buildRemove, kw: "delete drop" },
    { id: "reorder", name: "Reorder Pages", cat: "organize", status: "local", icon: "reorder", desc: "Drag page thumbnails into a new order.", build: buildReorder, kw: "rearrange sort organize" },
    { id: "rotate", name: "Rotate PDF", cat: "organize", status: "local", icon: "rotate", desc: "Rotate some or all pages 90°, 180° or 270°.", build: buildRotate, kw: "turn landscape" },
    { id: "numbers", name: "Add Page Numbers", cat: "organize", status: "local", icon: "number", desc: "Stamp page numbers with position & format.", build: buildPageNumbers, kw: "pagination folio" },

    { id: "compress", name: "Compress PDF", cat: "optimize", status: "limited", icon: "compress", desc: "Reduce file size (lossless re-save or rasterise).", build: buildCompress, kw: "shrink smaller optimize reduce" },
    { id: "repair", name: "Repair PDF", cat: "optimize", status: "limited", icon: "repair", desc: "Re-save a recoverable PDF to fix minor damage.", build: buildRepair, kw: "fix recover broken" },

    { id: "pdf2jpg", name: "PDF to JPG", cat: "fromPdf", status: "local", icon: "tojpg", desc: "Export each page as a JPG image.", build: buildPdfToJpg, kw: "image export jpeg" },
    { id: "pdf2png", name: "PDF to PNG", cat: "fromPdf", status: "local", icon: "topng", desc: "Export each page as a PNG image.", build: buildPdfToPng, kw: "image export" },
    { id: "pdf2txt", name: "PDF to Text", cat: "fromPdf", status: "local", icon: "totext", desc: "Extract the selectable text layer as .txt.", build: buildPdfToText, kw: "extract words ocr" },
    { id: "pdf2word", name: "PDF to Word", cat: "fromPdf", status: "unavailable", icon: "toword", desc: "Editable .docx conversion (not available in-browser).", build: buildPdfToWord, kw: "docx office" },

    { id: "jpg2pdf", name: "JPG to PDF", cat: "toPdf", status: "local", icon: "jpgtopdf", desc: "Turn one or more JPG images into a PDF.", build: buildJpgToPdf, kw: "image jpeg photo" },
    { id: "png2pdf", name: "PNG to PDF", cat: "toPdf", status: "local", icon: "jpgtopdf", desc: "Turn one or more PNG images into a PDF.", build: buildPngToPdf, kw: "image photo" },
    { id: "txt2pdf", name: "Text to PDF", cat: "toPdf", status: "local", icon: "texttopdf", desc: "Create a clean PDF from typed or pasted text.", build: buildTextToPdf, kw: "write document" },
    { id: "html2pdf", name: "HTML to PDF", cat: "toPdf", status: "limited", icon: "htmltopdf", desc: "Preview sanitised HTML and save it via print.", build: buildHtmlToPdf, kw: "web markup print" },

    { id: "watermark", name: "Watermark PDF", cat: "edit", status: "local", icon: "watermark", desc: "Add a text watermark: size, opacity, rotation.", build: buildWatermark, kw: "stamp confidential" },
    { id: "crop", name: "Crop PDF", cat: "edit", status: "local", icon: "crop", desc: "Trim page margins by setting the crop box.", build: buildCrop, kw: "trim margin cut" },
    { id: "addtext", name: "Add Text to PDF", cat: "edit", status: "local", icon: "addtext", desc: "Place a text overlay on selected pages.", build: buildAddText, kw: "annotate label" },
    { id: "signature", name: "Add Image or Signature", cat: "edit", status: "local", icon: "signature", desc: "Place an image or signature onto pages.", build: buildAddImage, kw: "sign logo stamp" },
    { id: "compare", name: "Compare PDF", cat: "edit", status: "local", icon: "compare", desc: "View two PDFs page-by-page with a diff overlay.", build: buildCompare, kw: "diff difference versions" },

    { id: "protect", name: "Protect PDF", cat: "security", status: "unavailable", icon: "protect", desc: "Password-encrypt a PDF (not available in-browser).", build: buildProtect, kw: "password encrypt lock" },
    { id: "unlock", name: "Unlock PDF", cat: "security", status: "limited", icon: "unlock", desc: "Check if a PDF is encrypted or password-protected.", build: buildUnlock, kw: "password decrypt remove protection" },

    { id: "info", name: "PDF Information", cat: "utility", status: "local", icon: "info", desc: "Page count, size, dimensions and metadata.", build: buildInfo, kw: "details metadata properties" }
  ];

  
export { TOOLS, IC };
