/* =========================================================
   main.js
   Project: saimaqaiser.com
   Purpose:
   - Global initialization
   - Stock ticker bootstrap
   - Footer year injection
   - Animation & UX hooks
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM READY HELPER
  --------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* ---------------------------------------------------------
     FOOTER YEAR (AUTO)
  --------------------------------------------------------- */
  function initFooterYear() {
    const yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ---------------------------------------------------------
     STOCK TICKER (STATIC BOOTSTRAP)
     - Data can later be replaced by API
     - CSS animation handles scrolling
  --------------------------------------------------------- */
  function initStockTicker() {
    const ticker = document.querySelector(".stock-ticker");
    const track = ticker ? ticker.querySelector(".ticker-track") : null;
    if (!ticker || !track) return;

    const stocks = [
      { s: "KEL", p: "7.12", c: "-0.02" },
      { s: "BOP", p: "39.53", c: "-0.65" },
      { s: "PTC", p: "60.43", c: "+1.55" },
      { s: "OGDC", p: "321.81", c: "+2.12" },
      { s: "FFC", p: "597.10", c: "-8.53" },
      { s: "HBL", p: "336.89", c: "+7.01" },
      { s: "LUCK", p: "465.43", c: "+16.70" },
      { s: "PSO", p: "467.69", c: "+3.46" },
    ];

    track.innerHTML = "";

    stocks.forEach(function (item) {
      const span = document.createElement("span");
      span.className =
        "ticker-item " + (item.c.startsWith("-") ? "negative" : "positive");
      span.textContent = `${item.s} ${item.p} (${item.c})`;
      track.appendChild(span);
    });

    /* Duplicate content for seamless loop */
    track.innerHTML += track.innerHTML;
  }

  /* ---------------------------------------------------------
     ANIMATION TRIGGERS (ON LOAD)
  --------------------------------------------------------- */
  function initAnimations() {
    const animated = document.querySelectorAll("[data-animate]");
    animated.forEach(function (el) {
      const cls = el.getAttribute("data-animate");
      if (cls) {
        el.classList.add(cls);
      }
    });
  }

  /* ---------------------------------------------------------
     SAFE EXTERNAL LINK HANDLING
  --------------------------------------------------------- */
  function secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------------------------------------------------------
     INIT ALL
  --------------------------------------------------------- */
  ready(function () {
    initFooterYear();
    initStockTicker();
    initAnimations();
    secureExternalLinks();
  });
})();
