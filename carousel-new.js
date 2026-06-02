/* ============================================================
   PQ CAROUSEL — Combined engine + admin panel
   Upload this single file to Bravesites.
   Reference it in your HTML block as:
   <script src="/files/others/carousel.js"></script>
   ============================================================ */

var CAROUSEL_ADMIN_PASSWORD = 'PQOnline2026';

/* ----------------------------------------------------------
   DEFAULT CARD DATA
   Rows are stored as an array so unlimited rows are supported.
   CAROUSEL_DEFAULTS.rows is an array of arrays.
   ---------------------------------------------------------- */
var CAROUSEL_DEFAULTS = {
  rows: [
    /* Row 1 */
    [
      { title:'Meeting Minutes', desc:'Online Access / Meeting Minute Notifications', youtubeId:'', embedCode:'', videoFile:'', imageFile:'/files/images/a0949e93-a0a4-4f2f-8b45-2c35672d76b6.png', thumbnail:'', tint:false },
      { title:'Bulletin Board', desc:'Online Access / Notice Notifications', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Bulletin Board" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'Strata Fees', desc:'Strata Fee Payments / Manage Payments', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Strata Fees" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false }
    ],
    /* Row 2 */
    [
      { title:'Owner/Strata Emails', desc:'Owner Maintained Email Directory', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Owner/Strata Emails" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'My Info', desc:'Contact / Emergency Contact Info', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="My Info" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'Bylaws', desc:'Bylaws / Amendments / Rules', youtubeId:'', embedCode:'', videoFile:'', imageFile:'/files/documents/f946f030-2d6a-48fc-ae16-6e373bcf697f.pdf', thumbnail:'', tint:false },
      { title:'Maintenance Requests', desc:'Submit and Track Requests', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Maintenance Requests" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'Documents', desc:'Online Document Access', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Documents" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'Council Reports', desc:'View Council Reports Online', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Council Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false },
      { title:'Voting', desc:'Online Proxy / Voting', youtubeId:'we1WpE0lZGI', embedCode:'<iframe src="https://www.youtube.com/embed/we1WpE0lZGI?autoplay=1&rel=0" title="Voting" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', videoFile:'', imageFile:'', thumbnail:'', tint:false }
    ]
  ]
};

/* ============================================================
   ENGINE
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Purge any stale carousel DOM baked in by Bravesites ───
     When the builder saves, it serialises dynamically-created
     elements into the page HTML. On next load those stale nodes
     already exist and conflict with the freshly-generated ones.
     Remove them all before we build anything.                 */
  (function purgeStale() {
    var ids = [
      'vcOverlay','vcOvBox','vcOvMedia','vcOvTitle','vcOvDesc','vcOvClose',
      'vcEditBtn','vcPwModal','vcPwBox','vcPwInput','vcPwError','vcPwSubmit','vcPwCancel',
      'vcAdminModal','vcAdminPanel','vcAdmTabs','vcAdmBody','vcAdmClose',
      'vcAdmReset','vcAdmOk','vcAdmCancel','vcAdmSave'
    ];
    ids.forEach(function(id) {
      var el = document.getElementById(id);
      /* Walk up to remove the topmost stale container */
      if (el) {
        /* vcOverlay, vcEditBtn, vcPwModal, vcAdminModal are direct body children */
        var top = el;
        while (top.parentElement && top.parentElement !== document.body) {
          top = top.parentElement;
        }
        if (top.parentElement === document.body) top.parentElement.removeChild(top);
      }
    });
    /* Also remove any baked-in vc-dynamic-row elements */
    document.querySelectorAll('.vc-dynamic-row').forEach(function(el) { el.remove(); });
    /* Remove any stale inline carousel rows that were baked in */
    ['vcRow1','vcRow2','vcRow3','vcRow4'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });
  })();

  /* ── Tab system ─────────────────────────────────────────── */
  document.querySelectorAll('.video_wrapper').forEach(function (wrapper) {
    var video = wrapper.querySelector('video');
    var icon  = wrapper.querySelector('.icon');
    var last  = Date.now();
    function upd() { icon.classList.toggle('play', video.paused); icon.classList.toggle('pause', !video.paused); }
    function show() { wrapper.classList.remove('hide-ui'); last = Date.now(); }
    function tog()  { video.paused ? video.play() : video.pause(); upd(); show(); }
    icon.addEventListener('click', function (e) { e.stopPropagation(); tog(); });
    video.addEventListener('play',  function () { upd(); show(); });
    video.addEventListener('pause', function () { upd(); wrapper.classList.remove('hide-ui'); });
    setInterval(function () { if (!video.paused && Date.now() - last > 3000) wrapper.classList.add('hide-ui'); }, 400);
    wrapper.addEventListener('mousemove',  show);
    wrapper.addEventListener('touchstart', show);
    wrapper.addEventListener('click',      show);
    upd();
  });

  function initTabSystem(ts) {
    var tabs  = ts.querySelectorAll(':scope > .tab-nav .tab');
    var conts = ts.querySelectorAll(':scope > .tab-content-wrapper > .tabcontents');
    var act   = ts.querySelector(':scope > .tab-nav .tab.current-tab');
    if (!act && tabs.length) { act = tabs[0]; act.classList.add('current-tab'); }
    if (!act) return;
    var tid = act.getAttribute('data-tab');
    tabs.forEach(function (t) { t.classList.remove('current-tab'); });
    conts.forEach(function (c) { c.classList.remove('tab-active'); });
    act.classList.add('current-tab');
    var tc = ts.querySelector('#' + tid);
    if (tc) tc.classList.add('tab-active');
    ts.offsetHeight;
  }
  document.querySelectorAll('.tab-system').forEach(initTabSystem);
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab');
    if (!tab) return;
    e.preventDefault();
    var ts = tab.closest('.tab-system');
    if (!ts) return;
    ts.querySelectorAll(':scope > .tab-nav .tab').forEach(function (t) { t.classList.remove('current-tab'); });
    ts.querySelectorAll(':scope > .tab-content-wrapper > .tabcontents').forEach(function (c) { c.classList.remove('tab-active'); });
    tab.classList.add('current-tab');
    var tc = ts.querySelector('#' + tab.getAttribute('data-tab'));
    if (tc) { tc.classList.add('tab-active'); tc.querySelectorAll('.tab-system').forEach(initTabSystem); }
  });

  if (!document.getElementById('vcCarousel1')) return;

  /* ── Constants / helpers ────────────────────────────────── */
  var GAP = 16;
  var lastSwipeTime = 0, lastFSExitTime = 0, savedPageFS = 0;
  var STORAGE_KEY = 'pq_carousel_cards_v3';
  var SESSION_KEY = 'pq_carousel_authed';
  var THUMB_H = 200;

  /* ── Cloudflare Worker config ───────────────────────────────
     Paste your deployed Worker URL and token below.
     NOTE: the token lives in client-side JS — acceptable here
     since it only protects carousel content, not sensitive data. */
  var WORKER_URL = 'https://pq-carousel.bravenetmarketing.workers.dev/carousel';   /* e.g. https://pq-carousel.yourname.workers.dev/carousel */
  var CAROUSEL_TOKEN = 'wyW4GktPiyBFqAxAh1aD';         /* must match CAROUSEL_TOKEN env var in the Worker        */

  function isMobile()     { return window.innerWidth <= 576; }
  function getVisible()   { return isMobile() ? 1 : 2.5; }
  function isFS()         { return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement); }
  function isPDF(p)       { return p && p.toLowerCase().indexOf('.pdf') !== -1; }
  function isImage(p)     { return p && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(p); }
  function isVideo(p)     { return p && /\.(mp4|mov|webm|mkv|wmv|avi)$/i.test(p); }
  function truncate(s, n) { return s && s.length > n ? s.slice(0, n).trimEnd() + '\u2026' : (s || ''); }
  function clone(o)       { return JSON.parse(JSON.stringify(o)); }
  function esc(s)         { return (s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function ytId(v) {
    if (!v) return '';
    var m = v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(v.trim())) return v.trim();
    return '';
  }
  function ytThumb(id) { return 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'; }

  /* ── Load / Save (multi-row) ────────────────────────────── */
  function loadCardsFromStorage() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        var p = JSON.parse(s);
        if (p && Array.isArray(p.rows) && p.rows.length) return p;
        if (p && p.row1 && p.row2) return { rows: [p.row1, p.row2] };
      }
    } catch (e) {}
    return null;
  }

  /* Fetch from the Worker so ALL browsers see the same published data.
     Falls back to localStorage cache, then hardcoded defaults.       */
  function loadCards() {
    return fetch(WORKER_URL)
      .then(function (resp) {
        if (!resp.ok) throw new Error('fetch failed');
        return resp.json();
      })
      .then(function (p) {
        if (p && Array.isArray(p.rows) && p.rows.length) {
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
          return p;
        }
        throw new Error('bad shape');
      })
      .catch(function () {
        return loadCardsFromStorage() || clone(CAROUSEL_DEFAULTS);
      });
  }

  /* Write to localStorage immediately (Builder preview). Returns a Promise. */
  function saveCards(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function publishCards(data) {
  return fetch(WORKER_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Carousel-Token': CAROUSEL_TOKEN
    },
    body: JSON.stringify(data)
  })
  .then(async function (resp) {
    const text = await resp.text();

    if (!resp.ok) {
      throw new Error('HTTP ' + resp.status + ': ' + text);
    }

    return text;
  });
}

  var cardData = clone(CAROUSEL_DEFAULTS);

  /* ── Overlay (image / PDF) ──────────────────────────────── */
  var ovEl = document.createElement('div');
  ovEl.id  = 'vcOverlay';
  ovEl.style.cssText = 'display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.78);align-items:center;justify-content:center;padding:16px;box-sizing:border-box;-webkit-overflow-scrolling:touch;';
  ovEl.innerHTML =
    '<div id="vcOvBox" style="background:#fff;border-radius:9px;overflow:hidden;max-width:900px;width:100%;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.5);outline:1px solid transparent;transform:translateZ(0);">' +
      '<div id="vcOvMedia" style="width:100%;overflow-y:auto;flex:1 1 auto;background:#f0f0f0;"></div>' +
      '<div style="padding:18px 22px;background:#fff;flex-shrink:0;">' +
        '<p id="vcOvTitle" style="margin:0 0 4px;font-size:17px;font-weight:700;color:#1C3046;font-family:Rubik,sans-serif;letter-spacing:1.6px;"></p>' +
        '<p id="vcOvDesc"  style="margin:0 0 14px;font-size:13px;color:#555;font-family:Poppins,sans-serif;line-height:1.5;"></p>' +
        '<div style="display:flex;justify-content:flex-end;">' +
          '<button id="vcOvClose" style="background:#6b8099;color:#fff;border:none;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:Rubik,sans-serif;letter-spacing:1.6px;cursor:pointer;touch-action:manipulation;">CLOSE TAB</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ovEl);

  var ovMedia = document.getElementById('vcOvMedia');
  var ovTitle = document.getElementById('vcOvTitle');
  var ovDesc  = document.getElementById('vcOvDesc');

  function openOverlay(src, title, desc) {
    ovMedia.innerHTML = '';
    if (isPDF(src)) {
      var fr = document.createElement('iframe');
      fr.src = src;
      fr.style.cssText = 'width:100%;height:70vh;border:none;display:block;';
      ovMedia.appendChild(fr);
    } else {
      var im = document.createElement('img');
      im.src = src; im.alt = title;
      im.style.cssText = 'width:100%;height:auto;display:block;';
      ovMedia.appendChild(im);
    }
    ovTitle.textContent = title;
    ovDesc.textContent  = desc;
    ovEl.style.display  = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay() {
    ovEl.style.display = 'none';
    ovMedia.innerHTML  = '';
    document.body.style.overflow = '';
  }
  document.getElementById('vcOvClose').addEventListener('click', closeOverlay);

  /* ── Card collapse ──────────────────────────────────────── */
  function collapseCard(card) {
    if (!card.classList.contains('vc-expanded')) return;
    card.classList.remove('vc-expanded');
    var ew = card.querySelector('.vc-embed-wrap');
    if (ew) card.addEventListener('transitionend', function h(ev) {
      if (ev.propertyName !== 'max-height' || card.classList.contains('vc-expanded')) return;
      ew.innerHTML = '';
      card.removeEventListener('transitionend', h);
    });
  }
  function collapseAll() { document.querySelectorAll('.vc-card.vc-expanded').forEach(collapseCard); }

  /* ── Equalise .vc-body heights in a row ─────────────────── */
  function equaliseBodyHeights(track) {
    var bodies = Array.from(track.querySelectorAll('.vc-body'));
    bodies.forEach(function (b) { b.style.height = ''; });
    var maxH = 0;
    bodies.forEach(function (b) { if (b.offsetHeight > maxH) maxH = b.offsetHeight; });
    if (maxH) bodies.forEach(function (b) { b.style.height = maxH + 'px'; });
  }

  /* ── Build thumbnail div ────────────────────────────────── */
  function buildThumb(c) {
    var id = ytId(c.youtubeId);
    var tSrc = '', tType = 'navy';
    if (c.thumbnail)                             { tSrc = c.thumbnail;  tType = 'image'; }
    else if (c.imageFile && isImage(c.imageFile)) { tSrc = c.imageFile; tType = 'image'; }
    else if (id)                                 { tSrc = ytThumb(id); tType = 'image'; }
    else if (c.imageFile && isPDF(c.imageFile))  { tType = 'pdf'; }

    var thumbDiv = document.createElement('div');
    thumbDiv.className = 'vc-thumb';
    thumbDiv.style.cssText =
      'position:relative;width:100%;height:' + THUMB_H + 'px;' +
      'background:#1C3046;overflow:hidden;flex-shrink:0;' +
      'border-radius:8px 8px 0 0;';

    if (tType === 'image') {
      var img = document.createElement('img');
      img.src = tSrc; img.alt = '';
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';
      thumbDiv.appendChild(img);

    } else if (tType === 'pdf') {
      /* Use PDF.js to render page 1 onto a <canvas> — no iframe,
         no scrollbar, no border. Falls back to a grey placeholder
         if PDF.js fails to load or the file is inaccessible.      */
      thumbDiv.style.background = '#f5f5f5';

      var canvas = document.createElement('canvas');
      /* Do NOT set width/height via CSS — let the canvas be its
         natural pixel size so there is no CSS scaling distortion.
         Position it at top:0 so we always show the top of page 1. */
      canvas.style.cssText =
        'position:absolute;top:0;left:0;display:block;';
      thumbDiv.appendChild(canvas);

      /* Load PDF.js from cdnjs (lightweight, no install needed) */
      var PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      var PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      function renderPdfThumb(canvasEl, pdfUrl) {
        var script = document.getElementById('vcPdfjsScript');
        function doRender() {
          try {
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            if (!pdfjsLib) return;
            pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
            pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
              pdf.getPage(1).then(function (page) {
                /* Measure the actual rendered thumb width in CSS px,
                   then multiply by devicePixelRatio for sharp rendering
                   on retina/HiDPI screens.                            */
                var container = canvasEl.parentElement;
                var cssW = container ? (container.offsetWidth || 300) : 300;
                var dpr  = window.devicePixelRatio || 1;

                /* Scale the PDF viewport so 1 PDF pt = enough px to
                   fill cssW at 1× — then multiply by dpr for sharpness */
                var baseVP  = page.getViewport({ scale: 1 });
                var scale   = (cssW / baseVP.width) * dpr;
                var scaledVP = page.getViewport({ scale: scale });

                /* Set real canvas pixel dimensions (sharp) */
                canvasEl.width  = scaledVP.width;
                canvasEl.height = scaledVP.height;

                /* Set CSS display size back to CSS px so it fits the card */
                canvasEl.style.width  = '100%';
                /* Height: let it be taller than the thumb — the parent's
                   overflow:hidden will clip it to THUMB_H.              */
                canvasEl.style.height = Math.round(scaledVP.height / dpr) + 'px';

                page.render({
                  canvasContext: canvasEl.getContext('2d'),
                  viewport: scaledVP
                });
              });
            }).catch(function () { /* silent fail — grey bg shows */ });
          } catch (e) { /* silent fail */ }
        }
        if (script && script.dataset.loaded === '1') {
          doRender();
        } else if (!script) {
          script = document.createElement('script');
          script.id = 'vcPdfjsScript';
          script.src = PDFJS_URL;
          script.onload = function () {
            script.dataset.loaded = '1';
            /* Render all queued canvases */
            document.querySelectorAll('[data-vcpdf]').forEach(function (el) {
              el.removeAttribute('data-vcpdf');
              renderPdfThumb(el, el.getAttribute('data-vcpdfurl'));
            });
          };
          document.head.appendChild(script);
          /* Mark canvas as queued so onload can pick it up */
          canvasEl.setAttribute('data-vcpdf', '1');
          canvasEl.setAttribute('data-vcpdfurl', pdfUrl);
        } else {
          /* Script tag exists but not yet loaded — queue */
          canvasEl.setAttribute('data-vcpdf', '1');
          canvasEl.setAttribute('data-vcpdfurl', pdfUrl);
        }
      }

      renderPdfThumb(canvas, c.imageFile);

      /* PDF badge */
      var pdfBadge = document.createElement('div');
      pdfBadge.style.cssText =
        'position:absolute;bottom:8px;right:8px;z-index:2;' +
        'background:#1C3046;color:#e5b33e;' +
        'font-family:Rubik,sans-serif;font-size:10px;font-weight:700;' +
        'letter-spacing:1.6px;padding:2px 7px;border-radius:4px;' +
        'pointer-events:none;';
      pdfBadge.textContent = 'PDF';
      thumbDiv.appendChild(pdfBadge);
    }
    /* else: plain navy — nothing extra needed */

    /* Tint overlay */
    if (c.tint) {
      var tintLayer = document.createElement('div');
      tintLayer.style.cssText =
        'position:absolute;inset:0;z-index:1;' +
        'background:rgba(10,20,50,0.25);pointer-events:none;';
      thumbDiv.appendChild(tintLayer);
    }

    /* Play badge */
    var isStaticMedia = !!(c.imageFile) && !c.embedCode && !c.videoFile;
    var badge  = document.createElement('div'); badge.className = 'vc-play-badge';
    badge.style.cssText = 'position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;';
    var circle = document.createElement('div'); circle.className = 'vc-play-circle';
    if (isStaticMedia) circle.style.display = 'none';
    circle.innerHTML = '<div class="vc-play-icon"></div>';
    badge.appendChild(circle);
    thumbDiv.appendChild(badge);

    return thumbDiv;
  }

  /* ── Build a single card ────────────────────────────────── */
  function buildCard(c) {
    var card = document.createElement('div');
    card.className = 'vc-card';

    var thumbDiv  = buildThumb(c);
    var embedWrap = document.createElement('div');
    embedWrap.className = 'vc-embed-wrap';
    var body = document.createElement('div');
    body.className = 'vc-body';
    body.innerHTML =
      '<p class="vc-title">' + esc(c.title) + '</p>' +
      '<p class="vc-desc">'  + esc(truncate(c.desc, 45)) + '</p>';

    card.appendChild(thumbDiv);
    card.appendChild(embedWrap);
    card.appendChild(body);

    var touchMoved = false;
    card.addEventListener('touchstart', function () { touchMoved = false; }, { passive: true });
    card.addEventListener('touchmove',  function () { touchMoved = true;  }, { passive: true });
    card.addEventListener('click', function () {
      if (touchMoved) return;
      if (c.imageFile) { openOverlay(c.imageFile, c.title, c.desc); return; }
      if (card.classList.contains('vc-expanded')) return;
      collapseAll();
      if (c.embedCode) {
        embedWrap.innerHTML = c.embedCode;
        var ifr = embedWrap.querySelector('iframe');
        if (ifr) {
          ifr.removeAttribute('width'); ifr.removeAttribute('height');
          ifr.setAttribute('allowfullscreen', '');
          ifr.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
          ifr.style.cssText = 'width:100%;height:100%;border:none;display:block;';
        }
      } else if (c.videoFile && isVideo(c.videoFile)) {
        var vidEl = document.createElement('video');
        vidEl.src = c.videoFile; vidEl.controls = true; vidEl.autoplay = true;
        vidEl.setAttribute('playsinline', '');
        vidEl.style.cssText = 'width:100%;height:100%;border:none;display:block;background:#000;';
        embedWrap.appendChild(vidEl);
        vidEl.play().catch(function () {});
      }
      setTimeout(function () {
        card.classList.add('vc-expanded');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }, 50);
    });
    return card;
  }

  /* ── Build one carousel row ─────────────────────────────── */
  function buildRow(cards, wrapEl, visibleCount) {
    var outer = document.createElement('div'); outer.className = 'vc-track-wrap';
    var track = document.createElement('div'); track.className = 'vc-track';
    outer.appendChild(track); wrapEl.appendChild(outer);
    cards.forEach(function (c) { track.appendChild(buildCard(c)); });
    return { outer: outer, track: track, visibleCount: visibleCount };
  }

  /* ── Carousel state ─────────────────────────────────────── */
  var rows = [];
  var currentPage = 0;
  var dotsWrap = document.getElementById('vcDots1');
  var prevBtn  = document.getElementById('vcPrev1');
  var nextBtn  = document.getElementById('vcNext1');

  function getCardWidth(track, vc) {
    return (track.parentElement.offsetWidth - GAP * (vc - 1)) / vc;
  }

  function setCardWidths() {
    rows.forEach(function (r) {
      var cw = getCardWidth(r.track, r.visibleCount);
      if (!cw) return;
      Array.from(r.track.children).forEach(function (card) {
        if (!card.classList.contains('vc-expanded')) {
          card.style.flexBasis = cw + 'px';
          card.style.minWidth  = cw + 'px';
          card.style.maxWidth  = cw + 'px';
        }
      });
    });
  }

  function getTotalPages() {
    var max = 0;
    rows.forEach(function (r) {
      var pages = Math.ceil(r.track.children.length / Math.floor(r.visibleCount));
      if (pages > max) max = pages;
    });
    return max || 1;
  }

  function rebuildDots() {
    dotsWrap.innerHTML = '';
    var total = getTotalPages();
    for (var d = 0; d < total; d++) {
      var dot = document.createElement('div');
      dot.className = 'vc-dot' + (d === currentPage ? ' vc-active' : '');
      (function (pg) { dot.addEventListener('click', function () { goTo(pg); }); })(d);
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(page) {
    var total = getTotalPages();
    currentPage = Math.max(0, Math.min(page, total - 1));
    var hasExp = !!document.querySelector('.vc-card.vc-expanded');
    collapseAll();
    function slide() {
      rows.forEach(function (r) {
        var cw = getCardWidth(r.track, r.visibleCount);
        var offset = currentPage * Math.floor(r.visibleCount) * (cw + GAP);
        r.track.style.transform = 'translateX(-' + offset + 'px)';
      });
      dotsWrap.querySelectorAll('.vc-dot').forEach(function (d, i) {
        d.classList.toggle('vc-active', i === currentPage);
      });
      prevBtn.classList.toggle('vc-disabled', currentPage === 0);
      nextBtn.classList.toggle('vc-disabled', currentPage >= total - 1);
    }
    if (hasExp) { setTimeout(slide, 420); } else { slide(); }
  }

  /* ── Init / rebuild carousel ────────────────────────────── */
  function initCarousel() {
    var carouselEl = document.getElementById('vcCarousel1');
    carouselEl.querySelectorAll('.vc-dynamic-row').forEach(function (el) { el.remove(); });

    var controls = carouselEl.querySelector('.vc-controls');
    rows = [];
    cardData.rows.forEach(function (rowCards, i) {
      var rowId = 'vcRow' + (i + 1);
      var rowEl = document.getElementById(rowId);
      if (!rowEl) {
        rowEl = document.createElement('div');
        rowEl.id = rowId;
        rowEl.className = 'vc-row vc-dynamic-row';
        carouselEl.insertBefore(rowEl, controls);
      } else {
        rowEl.innerHTML = '';
      }
      rows.push(buildRow(rowCards, rowEl, getVisible()));
    });

    rebuildDots();
    setCardWidths();
    goTo(0);
    setTimeout(function () {
      rows.forEach(function (r) { equaliseBodyHeights(r.track); });
    }, 120);
  }

  /* Fullscreen handlers */
  function onFSChange() {
    if (!isFS()) {
      lastFSExitTime = Date.now();
      setTimeout(function () { setCardWidths(); goTo(savedPageFS); }, 300);
    } else { savedPageFS = currentPage; }
  }
  document.addEventListener('fullscreenchange',       onFSChange);
  document.addEventListener('webkitfullscreenchange', onFSChange);
  document.addEventListener('mozfullscreenchange',    onFSChange);
  document.addEventListener('MSFullscreenChange',     onFSChange);

  prevBtn.addEventListener('click', function () { goTo(currentPage - 1); });
  nextBtn.addEventListener('click', function () { goTo(currentPage + 1); });

  window.addEventListener('resize', function () {
    if (isFS() || Date.now() - lastSwipeTime < 500 || Date.now() - lastFSExitTime < 600) return;
    var nv = getVisible();
    rows.forEach(function (r) { r.visibleCount = nv; });
    rebuildDots(); setCardWidths(); goTo(currentPage);
    setTimeout(function () { rows.forEach(function (r) { equaliseBodyHeights(r.track); }); }, 60);
  });

  /* Swipe (mobile) */
  var swX = 0, swY = 0, swActive = false;
  var carousel1 = document.getElementById('vcCarousel1');
  carousel1.addEventListener('touchstart', function (e) {
    swX = e.touches[0].clientX; swY = e.touches[0].clientY; swActive = true;
  }, { passive: true });
  carousel1.addEventListener('touchmove', function (e) {
    if (!swActive) return;
    var dx = Math.abs(e.touches[0].clientX - swX);
    var dy = Math.abs(e.touches[0].clientY - swY);
    if (dx > dy && dx > 8) e.preventDefault();
  }, { passive: false });
  carousel1.addEventListener('touchend', function (e) {
    if (!swActive) return; swActive = false;
    var dx = swX - e.changedTouches[0].clientX;
    var dy = swY - e.changedTouches[0].clientY;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    lastSwipeTime = Date.now();
    goTo(dx > 0 ? currentPage + 1 : currentPage - 1);
  }, { passive: true });

  loadCards().then(function (data) {
    cardData = data;
    if (!cardData.rows) cardData.rows = [cardData.row1 || [], cardData.row2 || []];
    initCarousel();
  });

  /* ============================================================
     ADMIN PANEL
     ============================================================ */
  var adminUnlocked = sessionStorage.getItem(SESSION_KEY) === '1';

  /* ── Admin CSS ──────────────────────────────────────────── */
  var adminStyle = document.createElement('style');
  adminStyle.textContent = [
    '#vcEditBtn{position:fixed;bottom:20px;left:20px;z-index:99990;background:#1C3046;color:#e5b33e;border:2px solid #e5b33e;padding:9px 16px;border-radius:8px;font-family:"Rubik",sans-serif!important;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:1.6px!important;box-shadow:0 4px 16px rgba(0,0,0,.35);touch-action:manipulation;}',
    '#vcEditBtn:hover,#vcEditBtn:active{background:#e5b33e;color:#1C3046;}',
    '#vcPwModal,#vcAdminModal{display:none;position:fixed;inset:0;z-index:999990;background:rgba(0,0,0,.75);align-items:center;justify-content:center;padding:16px;box-sizing:border-box;-webkit-overflow-scrolling:touch;}',
    '#vcPwModal.open,#vcAdminModal.open{display:flex;}',
    '#vcPwBox{background:#fff;border-radius:8px;padding:28px;max-width:340px;width:100%;text-align:center;outline:1px solid transparent;transform:translateZ(0);}',
    '#vcPwBox h3{margin:0 0 8px;color:#1C3046;font-size:16px;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;font-weight:700;}',
    '#vcPwBox p{margin:0 0 16px;color:#666;font-size:13px;font-family:"Poppins",sans-serif!important;}',
    '#vcPwInput{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:8px;padding:10px 12px;font-size:14px;margin-bottom:10px;outline:none;font-family:"Poppins",sans-serif;}',
    '#vcPwInput:focus{border-color:#1C3046;}',
    '#vcPwError{color:#c00;font-size:12px;margin-bottom:10px;display:none;font-family:"Poppins",sans-serif;}',
    '#vcPwSubmit{background:#1C3046;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '#vcPwSubmit:hover,#vcPwSubmit:active{background:#243860;}',
    '#vcPwCancel{background:none;border:none;color:#888;font-size:13px;cursor:pointer;margin-top:10px;display:block;width:100%;font-family:"Poppins",sans-serif;touch-action:manipulation;}',
    '#vcAdminPanel{background:#fff;border-radius:8px;width:100%;max-width:820px;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.45);outline:1px solid transparent;transform:translateZ(0);}',
    '#vcAdminPanel h2{margin:0;padding:16px 20px;background:#1C3046;color:#e5b33e;font-size:14px;letter-spacing:1.6px!important;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;font-family:"Rubik",sans-serif!important;font-weight:700;border-radius:8px 8px 0 0;}',
    '#vcAdminPanel h2 span{font-size:11px;color:#8699A9;font-weight:400;margin-left:8px;font-family:"Poppins",sans-serif!important;letter-spacing:normal;}',
    '#vcAdminPanel h2 button{background:none;border:none;color:#e5b33e;font-size:22px;cursor:pointer;line-height:1;padding:0;touch-action:manipulation;}',
    '.vca-tabs{display:flex;border-bottom:2px solid #e0e0e0;background:#f8f8f8;flex-shrink:0;overflow-x:auto;-webkit-overflow-scrolling:touch;}',
    '.vca-tab{padding:10px 16px;font-size:12px;font-weight:600;color:#888;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;white-space:nowrap;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;flex-shrink:0;touch-action:manipulation;}',
    '.vca-tab.active{color:#1C3046;border-bottom-color:#1C3046;}',
    '.vca-tab-add{padding:10px 12px;font-size:18px;line-height:1;color:#e5b33e;cursor:pointer;border:none;background:none;flex-shrink:0;touch-action:manipulation;align-self:center;}',
    '.vca-scroll{padding:16px 20px;overflow-y:auto;flex:1 1 auto;-webkit-overflow-scrolling:touch;}',
    '.vca-item{border:1px solid #e2e2e2;border-radius:8px;margin-bottom:10px;overflow:hidden;}',
    '.vca-item-head{background:#f4f6f8;padding:8px 12px;display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;touch-action:manipulation;}',
    '.vca-item-head strong{flex:1;font-size:12px;color:#1C3046;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;}',
    '.vca-item-del{background:none;border:1px solid #c33;color:#c33;border-radius:8px;padding:3px 9px;font-size:11px;cursor:pointer;white-space:nowrap;flex-shrink:0;font-family:"Rubik",sans-serif!important;touch-action:manipulation;}',
    '.vca-item-del:hover,.vca-item-del:active{background:#c33;color:#fff;}',
    '.vca-item-chevron{font-size:11px;color:#aaa;flex-shrink:0;}',
    '.vca-item-body{display:none;padding:12px;border-top:1px solid #eee;}',
    '.vca-item-body.open{display:block;}',
    '.vca-field{margin-bottom:10px;}',
    '.vca-field label{display:block;font-size:10px;font-weight:700;color:#555;letter-spacing:1.6px!important;text-transform:uppercase;margin-bottom:3px;font-family:"Rubik",sans-serif!important;}',
    '.vca-field input[type=text],.vca-field input[type=url],.vca-field textarea{width:100%;box-sizing:border-box;border:1px solid #d0d0d0;border-radius:8px;padding:7px 10px;font-size:13px;font-family:"Poppins",sans-serif;color:#222;outline:none;}',
    '.vca-field input[type=text]:focus,.vca-field input[type=url]:focus,.vca-field textarea:focus{border-color:#1C3046;}',
    '.vca-field textarea{min-height:64px;resize:vertical;}',
    '.vca-field .vh{font-size:11px;color:#888;margin-top:3px;line-height:1.4;font-family:"Poppins",sans-serif!important;letter-spacing:normal;}',
    /* tint checkbox row */
    '.vca-tint-row{display:flex;align-items:center;gap:8px;margin-top:6px;}',
    '.vca-tint-row input[type=checkbox]{width:15px;height:15px;accent-color:#1C3046;cursor:pointer;flex-shrink:0;}',
    '.vca-tint-row label{font-size:12px;color:#444;font-family:"Poppins",sans-serif;cursor:pointer;margin:0;letter-spacing:normal;text-transform:none;font-weight:400;}',
    '.vca-add-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;background:none;border:2px dashed #e5b33e;color:#1C3046;border-radius:8px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;margin-top:4px;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '.vca-add-btn:hover,.vca-add-btn:active{background:#fffbf0;}',
    '.vca-del-row-btn{background:none;border:1px solid #c33;color:#c33;border-radius:8px;padding:3px 9px;font-size:10px;cursor:pointer;font-family:"Rubik",sans-serif!important;margin-left:6px;flex-shrink:0;touch-action:manipulation;}',
    '.vca-del-row-btn:hover,.vca-del-row-btn:active{background:#c33;color:#fff;}',
    '.vca-footer{padding:12px 20px;border-top:1px solid #e0e0e0;display:flex;align-items:center;gap:8px;justify-content:flex-end;flex-shrink:0;flex-wrap:wrap;}',
    '.vca-save-btn{background:#1C3046;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '.vca-save-btn:hover,.vca-save-btn:active{background:#243860;}',
    '.vca-cancel-btn{background:#fff;color:#666;border:1px solid #ccc;padding:10px 16px;border-radius:8px;font-size:12px;cursor:pointer;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '.vca-reset-btn{background:#fff;color:#c33;border:1px solid #c33;padding:10px 12px;border-radius:8px;font-size:11px;cursor:pointer;margin-right:auto;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '.vca-reset-btn:hover,.vca-reset-btn:active{background:#c33;color:#fff;}',
    '.vca-publish-btn{background:#e5b33e;color:#1C3046;border:none;padding:10px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:"Rubik",sans-serif!important;letter-spacing:1.6px!important;touch-action:manipulation;}',
    '.vca-publish-btn:hover,.vca-publish-btn:active{background:#d4a235;}',
    '.vca-ok-msg{color:#2a7a2a;font-size:11px;font-weight:600;display:none;font-family:"Poppins",sans-serif!important;}',
    '@media(max-width:480px){#vcAdminPanel{max-height:98vh;}#vcAdminPanel h2{font-size:12px;padding:12px 14px;}.vca-scroll{padding:10px 12px;}.vca-footer{padding:10px 12px;}}'
  ].join('');
  document.head.appendChild(adminStyle);

  /* ── Edit Carousel button — only visible inside Bravesites builder ── */
  var editBtn = document.createElement('button');
  editBtn.id = 'vcEditBtn';
  editBtn.textContent = 'Edit Carousel';
  editBtn.style.display = document.documentElement.classList.contains('asterion-builder') ? '' : 'none';
  document.body.appendChild(editBtn);

  /* ── Password modal ─────────────────────────────────────── */
  var pwModal = document.createElement('div');
  pwModal.id = 'vcPwModal';
  pwModal.innerHTML =
    '<div id="vcPwBox">' +
      '<h3>Edit Carousel</h3>' +
      '<p>Enter the admin password to continue.</p>' +
      '<input id="vcPwInput" type="password" placeholder="Password">' +
      '<div id="vcPwError">Incorrect password. Please try again.</div>' +
      '<button id="vcPwSubmit">Unlock</button>' +
      '<button id="vcPwCancel">Cancel</button>' +
    '</div>';
  document.body.appendChild(pwModal);

  /* ── Admin modal ────────────────────────────────────────── */
  var adminModal = document.createElement('div');
  adminModal.id = 'vcAdminModal';
  adminModal.innerHTML =
    '<div id="vcAdminPanel">' +
      '<h2>Edit Carousel <span>Changes save to this browser. Clear cache to reset.</span><button id="vcAdmClose">&#215;</button></h2>' +
      '<div class="vca-tabs" id="vcAdmTabs"></div>' +
      '<div class="vca-scroll" id="vcAdmBody"></div>' +
      '<div class="vca-footer">' +
        '<button class="vca-reset-btn" id="vcAdmReset">Reset to Defaults</button>' +
        '<span class="vca-ok-msg" id="vcAdmOk">Saved.</span>' +
        '<button class="vca-cancel-btn" id="vcAdmCancel">Cancel</button>' +
        '<button class="vca-save-btn" id="vcAdmSave">Save &amp; Preview</button>' +
        '<button class="vca-publish-btn" id="vcAdmPublish">Publish to Site</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(adminModal);

  /* ── Admin state ────────────────────────────────────────── */
  var activeRow = 0;
  var working   = {};

  function openPwModal()  { pwModal.classList.add('open'); document.getElementById('vcPwInput').focus(); }
  function closePwModal() { pwModal.classList.remove('open'); document.getElementById('vcPwInput').value = ''; document.getElementById('vcPwError').style.display = 'none'; }
  function openAdmin()    { working = clone(cardData); activeRow = 0; rebuildAdminTabs(); renderAdmin(); adminModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeAdmin()   { adminModal.classList.remove('open'); document.body.style.overflow = ''; }

  editBtn.addEventListener('click', function () {
    adminUnlocked ? openAdmin() : openPwModal();
  });

  document.getElementById('vcPwSubmit').addEventListener('click', function () {
    if (document.getElementById('vcPwInput').value === CAROUSEL_ADMIN_PASSWORD) {
      adminUnlocked = true;
      sessionStorage.setItem(SESSION_KEY, '1');
      closePwModal(); openAdmin();
    } else {
      document.getElementById('vcPwError').style.display = 'block';
      document.getElementById('vcPwInput').value = '';
      document.getElementById('vcPwInput').focus();
    }
  });
  document.getElementById('vcPwInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') document.getElementById('vcPwSubmit').click(); });
  document.getElementById('vcPwCancel').addEventListener('click', closePwModal);

  /* ── Build tab bar ──────────────────────────────────────── */
  function rebuildAdminTabs() {
    var tabsEl = document.getElementById('vcAdmTabs');
    tabsEl.innerHTML = '';
    working.rows.forEach(function (_, i) {
      var t = document.createElement('div');
      t.className = 'vca-tab' + (i === activeRow ? ' active' : '');
      t.textContent = 'Row ' + (i + 1) + ' Cards';
      t.setAttribute('data-row', i);
      t.addEventListener('click', function () { activeRow = i; rebuildAdminTabs(); renderAdmin(); });
      tabsEl.appendChild(t);
    });
    var addRowBtn = document.createElement('button');
    addRowBtn.className = 'vca-tab-add';
    addRowBtn.title = 'Add a new row';
    addRowBtn.innerHTML = '&#43;';
    addRowBtn.addEventListener('click', function () {
      working.rows.push([]);
      activeRow = working.rows.length - 1;
      rebuildAdminTabs(); renderAdmin();
    });
    tabsEl.appendChild(addRowBtn);
  }

  /* ── Render card list for activeRow ─────────────────────── */
  function renderAdmin() {
    var body  = document.getElementById('vcAdmBody');
    body.innerHTML = '';
    var cards = working.rows[activeRow] || [];

    if (working.rows.length > 1) {
      var delRowWrap = document.createElement('div');
      delRowWrap.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:8px;';
      var delRowBtn = document.createElement('button');
      delRowBtn.className = 'vca-del-row-btn';
      delRowBtn.textContent = 'Delete Row ' + (activeRow + 1);
      delRowBtn.addEventListener('click', function () {
        if (!confirm('Delete entire Row ' + (activeRow + 1) + ' and all its cards?')) return;
        working.rows.splice(activeRow, 1);
        activeRow = Math.min(activeRow, working.rows.length - 1);
        rebuildAdminTabs(); renderAdmin();
      });
      delRowWrap.appendChild(delRowBtn);
      body.appendChild(delRowWrap);
    }

    cards.forEach(function (c, idx) {
      var item = document.createElement('div');
      item.className = 'vca-item';
      var lbl = c.title || ('Link / File ' + (idx + 1));

      /* Unique id prefix for tint checkbox */
      var tintId = 'vca-tint-' + activeRow + '-' + idx;

      item.innerHTML =
        '<div class="vca-item-head">' +
          '<strong>Link / File ' + (idx + 1) + ': ' + esc(lbl) + '</strong>' +
          '<button class="vca-item-del">Remove</button>' +
          '<span class="vca-item-chevron">&#9660;</span>' +
        '</div>' +
        '<div class="vca-item-body">' +
          fld('title',     'Title', c.title, 'text', 'Displayed on the card and in the popup') +
          fld('desc',      'Description', c.desc, 'text', 'Auto-truncated to 45 chars on card. Full text shown in popup.') +
          fld('youtubeId', 'YouTube Video ID', c.youtubeId, 'text', 'The 11-character ID from the YouTube URL e.g. qdcD99Pd0oo') +
          fta('embedCode', 'YouTube Embed Code', c.embedCode, 'Paste the full &lt;iframe&gt; from YouTube Share &gt; Embed. Add &amp;autoplay=1 to the src URL.') +
          fld('videoFile', 'Video File Link', c.videoFile, 'url', 'Accepted: .mp4 .mov .webm .mkv .wmv .avi — paste the Bravesites file path') +
          fld('imageFile', 'Image or PDF Link', c.imageFile, 'url', 'Image: .jpg .png .gif .webp — PDF: .pdf — thumbnail auto-generated') +
          '<div class="vca-field">' +
            fld('thumbnail', 'Thumbnail Override (Optional)', c.thumbnail, 'url', 'Leave blank to auto-generate thumbnail for PDF, YouTube, or video.') +
            '<div class="vca-tint-row">' +
              '<input type="checkbox" id="' + tintId + '" data-key="tint"' + (c.tint ? ' checked' : '') + '>' +
              '<label for="' + tintId + '">Tint your thumbnail?</label>' +
            '</div>' +
          '</div>' +
        '</div>';

      body.appendChild(item);

      item.querySelector('.vca-item-head').addEventListener('click', function (e) {
        if (e.target.classList.contains('vca-item-del')) return;
        var bd = item.querySelector('.vca-item-body');
        bd.classList.toggle('open');
        item.querySelector('.vca-item-chevron').textContent = bd.classList.contains('open') ? '\u25b2' : '\u25bc';
      });

      item.querySelector('.vca-item-del').addEventListener('click', function () {
        if (!confirm('Remove "' + lbl + '"?')) return;
        working.rows[activeRow].splice(idx, 1);
        renderAdmin();
      });

      var bd = item.querySelector('.vca-item-body');

      /* Text / URL inputs */
      ['title','desc','youtubeId','embedCode','videoFile','imageFile','thumbnail'].forEach(function (key) {
        var el = bd.querySelector('[data-key="' + key + '"]');
        if (!el) return;
        el.addEventListener('input', function () {
          working.rows[activeRow][idx][key] = el.value;
          if (key === 'title') item.querySelector('.vca-item-head strong').textContent = 'Link / File ' + (idx + 1) + ': ' + (el.value || lbl);
        });
      });

      /* Tint checkbox */
      var tintCb = bd.querySelector('[data-key="tint"]');
      if (tintCb) {
        tintCb.addEventListener('change', function () {
          working.rows[activeRow][idx].tint = tintCb.checked;
        });
      }
    });

    var addBtn = document.createElement('button');
    addBtn.className = 'vca-add-btn';
    addBtn.innerHTML = '&#43; Add Link / File';
    addBtn.addEventListener('click', function () {
      working.rows[activeRow].push({ title:'', desc:'', youtubeId:'', embedCode:'', videoFile:'', imageFile:'', thumbnail:'', tint:false });
      renderAdmin();
      var all = body.querySelectorAll('.vca-item-body');
      if (all.length) all[all.length - 1].classList.add('open');
    });
    body.appendChild(addBtn);
  }

  function fld(key, label, value, type, hint) {
    return '<div class="vca-field"><label>' + label + '</label><input type="' + type + '" data-key="' + key + '" value="' + esc(value) + '"><div class="vh">' + (hint || '') + '</div></div>';
  }
  function fta(key, label, value, hint) {
    return '<div class="vca-field"><label>' + label + '</label><textarea data-key="' + key + '">' + esc(value) + '</textarea><div class="vh">' + (hint || '') + '</div></div>';
  }

  /* ── Save / Reset / Close ───────────────────────────────── */
  document.getElementById('vcAdmSave').addEventListener('click', function () {
    cardData = clone(working);
    saveCards(cardData);
    initCarousel();
    var ok = document.getElementById('vcAdmOk');
    ok.style.display = 'inline';
    setTimeout(function () { ok.style.display = 'none'; }, 3000);
  });

  document.getElementById('vcAdmPublish').addEventListener('click', function () {
  var btn = document.getElementById('vcAdmPublish');
  var ok  = document.getElementById('vcAdmOk');

  btn.disabled = true;
  btn.textContent = 'Publishing…';

  publishCards(clone(working))
    .then(function () {
      ok.textContent = 'Published.';
      ok.style.color = '#2a7a2a';
      ok.style.display = 'inline';

      setTimeout(function () {
        ok.style.display = 'none';
        ok.textContent = 'Saved.';
      }, 3000);
    })
    .catch(function (err) {
      console.error('Publish failed:', err);

      ok.textContent = 'Publish failed: ' + (err && err.message ? err.message : 'Unknown error');
      ok.style.color = '#c00';
      ok.style.display = 'inline';

      setTimeout(function () {
        ok.style.display = 'none';
        ok.style.color = '';
        ok.textContent = 'Saved.';
      }, 10000);
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = 'Publish to Site';
    });
});

  document.getElementById('vcAdmReset').addEventListener('click', function () {
    if (!confirm('Reset all carousel content to built-in defaults? This cannot be undone.')) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    cardData = clone(CAROUSEL_DEFAULTS);
    working  = clone(cardData);
    activeRow = 0;
    initCarousel();
    rebuildAdminTabs();
    renderAdmin();
    var ok = document.getElementById('vcAdmOk');
    ok.textContent = 'Reset. Click Publish to Site to make it live.';
    ok.style.display = 'inline';
    setTimeout(function () { ok.style.display = 'none'; ok.textContent = 'Saved.'; }, 5000);
  });

  document.getElementById('vcAdmCancel').addEventListener('click', closeAdmin);
  document.getElementById('vcAdmClose').addEventListener('click', closeAdmin);

});
