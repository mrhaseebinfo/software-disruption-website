/* ============================================================
   SoftwareDisruption — main.js (pure JS, no libraries)
   Nav, search, preloader, first-visit animations, forms
   ============================================================ */
(function () {
  "use strict";

  var pre = (function () {
    // explicit base injected per page: "" at root, "../", "../../", etc.
    var el = document.getElementById("sdBase");
    if (el && el.hasAttribute("content")) return el.getAttribute("content");
    // fallback: derive depth from path (…/folder/index.html → one "../" per level)
    var parts = location.pathname.replace(/\/index\.html$/, "").split("/").filter(Boolean);
    return parts.map(function () { return "../"; }).join("");
  })();

  /* ---------- Preloader (first visit in session) ---------- */
  var preloader = document.getElementById("preloader");
  var firstVisit = !sessionStorage.getItem("sd_visited");

  if (preloader) {
    document.body.classList.add("is-loading");
    var reveal = function () {
      if (revealed) return;
      revealed = true;
      preloader.classList.add("done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("loaded");
      window.setTimeout(function () { if (preloader.parentNode) preloader.remove(); }, 700);
    };
    var revealed = false;
    if (firstVisit) {
      sessionStorage.setItem("sd_visited", "1");
      window.setTimeout(reveal, 900);
    } else {
      preloader.classList.add("done");
      document.body.classList.add("loaded");
      window.setTimeout(reveal, 250);
    }
    window.addEventListener("load", function () { setTimeout(reveal, firstVisit ? 500 : 100); });
    setTimeout(reveal, 2500); // absolute fail-safe
  }

  /* ---------- Sticky header ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", y > 600);
  }

  /* ---------- Scroll to top ---------- */
  var scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  var navClose = document.getElementById("navClose");

  function closeNav() {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });
    if (navClose) navClose.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024 && a.getAttribute("href") && a.getAttribute("href").charAt(0) !== "#") closeNav();
      });
    });
    /* mobile dropdown accordions */
    nav.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          var li = link.parentElement;
          nav.querySelectorAll(".nav-item.has-dropdown.open").forEach(function (o) {
            if (o !== li) o.classList.remove("open");
          });
          li.classList.toggle("open");
        }
      });
    });
  }

  /* ---------- Search ---------- */
  var searchOverlay = document.getElementById("searchOverlay");
  var searchBtn = document.getElementById("searchBtn");
  var searchClose = document.getElementById("searchClose");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var searchHint = document.getElementById("searchHint");

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add("show");
    searchOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-open");
    document.body.classList.remove("nav-open");
    if (nav) { nav.classList.remove("open"); if (navToggle) { navToggle.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); } }
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 120);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove("show");
    searchOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-open");
  }
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  if (searchClose) searchClose.addEventListener("click", closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener("click", function (e) { if (e.target === searchOverlay) closeSearch(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeSearch(); if (nav) closeNav(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
  });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function runSearch(q) {
    if (!searchResults) return;
    q = q.trim().toLowerCase();
    if (!window.SEARCH_INDEX) { if (searchResults) searchResults.innerHTML = '<div class="search-empty">Search index unavailable.</div>'; return; }
    if (q.length < 2) {
      searchResults.innerHTML = "";
      if (searchHint) searchHint.style.display = "";
      return;
    }
    if (searchHint) searchHint.style.display = "none";
    var terms = q.split(/\s+/);
    var hits = window.SEARCH_INDEX
      .map(function (item) {
        var hay = (item.t + " " + item.k + " " + item.d).toLowerCase();
        var score = 0;
        terms.forEach(function (t) {
          if (item.t.toLowerCase().indexOf(t) !== -1) score += 5;
          else if (item.k.indexOf(t) !== -1) score += 2;
          else if (hay.indexOf(t) !== -1) score += 1;
        });
        return { item: item, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 8);

    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-empty">No results for "' + q.replace(/[<>"]/g, "") + '". Try a different term or <a href="' + pre + 'contact/index.html">contact us</a>.</div>';
      return;
    }
    searchResults.innerHTML = hits.map(function (r) {
      var href = r.item.u.charAt(0) === "/" ? r.item.u : (pre + r.item.u);
      return '<a class="search-hit" href="' + href + '">' +
        '<span class="sh-cat">' + r.item.c + '</span>' +
        '<span class="sh-title">' + r.item.t + '</span>' +
        '<span class="sh-desc">' + r.item.d + '</span></a>';
    }).join("");
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
  }

  /* ---------- Reveal on scroll (+ first-visit hero stagger) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Testimonials carousel (3 visible, prev/next + dots) ---------- */
  document.querySelectorAll(".testi-carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".testi-track");
    var viewport = carousel.querySelector(".testi-viewport");
    var prevBtn = carousel.querySelector(".testi-prev");
    var nextBtn = carousel.querySelector(".testi-next");
    var dotsWrap = carousel.nextElementSibling && carousel.nextElementSibling.classList.contains("testi-dots")
      ? carousel.nextElementSibling : null;
    if (!track || !viewport) return;
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;

    function perView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    function pages() {
      return Math.max(1, Math.ceil(cards.length / perView()));
    }
    var index = 0, autoTimer = null;

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i < pages(); i++) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Go to testimonials page " + (i + 1));
        (function (n) {
          b.addEventListener("click", function () { goTo(n); });
        })(i);
        dotsWrap.appendChild(b);
      }
    }

    function clampIndex() {
      var max = pages() - 1;
      if (index > max) index = max;
      if (index < 0) index = 0;
    }

    function update() {
      clampIndex();
      var pv = perView();
      var cardW = cards[0].getBoundingClientRect().width + 26;
      var offset = index * pv * cardW;
      var maxOffset = track.scrollWidth - viewport.clientWidth;
      if (offset > maxOffset) offset = maxOffset;
      track.style.transform = "translateX(-" + offset + "px)";
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
          d.classList.toggle("active", i === index);
        });
      }
    }

    function goTo(n) {
      index = n;
      update();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { index--; update(); restartAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { index++; update(); restartAuto(); });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        update();
      }, 150);
    });

    var swipeStartX = null, autoPaused = false;
    viewport.addEventListener("touchstart", function (e) {
      swipeStartX = e.touches[0].clientX;
      pauseAuto();
    }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (swipeStartX === null) return;
      var dx = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) index++; else index--;
        update();
      }
      swipeStartX = null;
      restartAuto();
    });
    viewport.addEventListener("touchcancel", function () {
      swipeStartX = null;
      restartAuto();
    });

    /* auto-play: slides automatically every 4s, loops to start */
    function startAuto() {
      if (autoPaused || pages() < 2) return;
      stopAuto();
      autoTimer = setInterval(function () { index++; update(); }, 4000);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function pauseAuto() { autoPaused = true; stopAuto(); }
    function restartAuto() { autoPaused = false; startAuto(); }
    carousel.addEventListener("mouseenter", pauseAuto);
    carousel.addEventListener("mouseleave", restartAuto);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopAuto(); else startAuto();
    });

    buildDots();
    update();
    startAuto();
  });

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1800, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute("data-count"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      function check(input, ok) {
        var g = input.closest(".form-group");
        if (!g) return;
        g.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      }
      var name = document.getElementById("name"),
          email = document.getElementById("email"),
          message = document.getElementById("message");
      check(name, name.value.trim().length >= 2);
      check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      check(message, message.value.trim().length >= 5);
      if (valid && formSuccess) {
        form.reset();
        formSuccess.classList.add("show");
        setTimeout(function () { formSuccess.classList.remove("show"); }, 6000);
      }
    });
    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var g = input.closest(".form-group");
        if (g) g.classList.remove("invalid");
      });
    });
  }

  /* ---------- Flip cards: tap-to-flip on touch devices ---------- */
  if (window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll(".flip-card").forEach(function (card) {
      card.addEventListener("click", function () {
        // close others
        document.querySelectorAll(".flip-card.flipped").forEach(function (o) {
          if (o !== card) o.classList.remove("flipped");
        });
        card.classList.toggle("flipped");
      });
    });
  }

  /* ---------- Liquid overlay (home hero only) ---------- */
  var hero = document.getElementById("home");
  var liquidOverlay = document.getElementById("liquidOverlay");
  var wave1 = document.querySelector(".liquid-wave-1");
  var wave2 = document.querySelector(".liquid-wave-2");
  var blobs = document.querySelectorAll(".liquid-blob");
  var liquidTicking = false;

  /* --- scroll-driven wave morph + glow --- */
  if (hero && wave1 && wave2) {
    function liquidScroll() {
      liquidTicking = false;
      var rect = hero.getBoundingClientRect();
      var progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      hero.style.setProperty("--liquid", progress.toFixed(4));

      var lift = progress * 130;
      var amp1 = 60 + progress * 90;
      var amp2 = 70 + progress * 110;
      var y1 = 540 - lift, y2 = 610 - lift * 1.25;

      wave1.setAttribute("d",
        "M0," + (y1 + 40) +
        " C240," + (y1 - amp1) + " 480," + (y1 + amp1 * 0.9) + " 720," + (y1 - 10) +
        " C960," + (y1 - amp1 * 1.1) + " 1200," + (y1 + amp1 * 0.8) + " 1440," + (y1 + 30) +
        " L1440,800 L0,800 Z");
      wave2.setAttribute("d",
        "M0," + (y2 + 60) +
        " C260," + (y2 - amp2) + " 520," + (y2 + amp2) + " 780," + (y2 - 20) +
        " C1040," + (y2 - amp2 * 1.1) + " 1240," + (y2 + amp2 * 0.7) + " 1440," + (y2 + 20) +
        " L1440,800 L0,800 Z");
    }
    window.addEventListener("scroll", function () {
      if (!liquidTicking) { liquidTicking = true; requestAnimationFrame(liquidScroll); }
    }, { passive: true });
    liquidScroll();
  }

  /* --- cursor-following liquid blobs (hover devices only) --- */
  if (hero && liquidOverlay && blobs.length && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var mouse = { x: 0, y: 0 }, pos1 = { x: 0, y: 0 }, pos2 = { x: 0, y: 0 };
    var blobActive = false, rafId = null;

    function blobLoop() {
      pos1.x += (mouse.x - pos1.x) * 0.08;
      pos1.y += (mouse.y - pos1.y) * 0.08;
      pos2.x += (mouse.x - pos2.x) * 0.045;
      pos2.y += (mouse.y - pos2.y) * 0.045;
      blobs[0].style.transform = "translate(" + pos1.x + "px," + pos1.y + "px) translate(-50%,-50%)";
      if (blobs[1]) blobs[1].style.transform = "translate(" + pos2.x + "px," + pos2.y + "px) translate(-50%,-50%)";
      if (blobActive || Math.abs(mouse.x - pos1.x) > 0.5) {
        rafId = requestAnimationFrame(blobLoop);
      } else { rafId = null; }
    }
    function startLoop() { if (!rafId) rafId = requestAnimationFrame(blobLoop); }

    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (!blobActive) { blobActive = true; liquidOverlay.classList.add("is-hover"); pos1.x = mouse.x; pos1.y = mouse.y; pos2.x = mouse.x; pos2.y = mouse.y; }
      startLoop();
    });
    hero.addEventListener("mouseleave", function () {
      blobActive = false;
      liquidOverlay.classList.remove("is-hover");
    });
  }

  onScroll();
})();

