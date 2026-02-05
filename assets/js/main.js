/* =========================================================
   main.js
   Project: saimaqaiser.com
   Purpose:
   - Core site initialization
   - Stock ticker logic
   - Global UI helpers
   - Safe DOM handling
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM READY HELPER
  --------------------------------------------------------- */
  function onReady(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* ---------------------------------------------------------
     STOCK TICKER (INFINITE SMOOTH LOOP)
     Matches reference video behavior
  --------------------------------------------------------- */
  function initStockTicker() {
    const ticker = document.querySelector(".stock-ticker");
    if (!ticker) return;

    const track = ticker.querySelector(".ticker-track");
    if (!track) return;

    // Duplicate content for seamless scrolling
    const originalContent = track.innerHTML;
    track.innerHTML += originalContent;

    // Pause on hover handled in CSS
  }

  /* ---------------------------------------------------------
     SCROLL SHADOW FOR HEADER (PROFESSIONAL TOUCH)
  --------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 20) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------
     SMOOTH SCROLL FOR INTERNAL LINKS
  --------------------------------------------------------- */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length <= 1) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  /* ---------------------------------------------------------
     IMAGE SAFETY (PREVENT DRAGGING)
  --------------------------------------------------------- */
  function lockImages() {
    const images = document.querySelectorAll("img");
    images.forEach(function (img) {
      img.setAttribute("draggable", "false");
    });
  }

  /* ---------------------------------------------------------
     INITIALIZE EVERYTHING
  --------------------------------------------------------- */
  onReady(function () {
    initStockTicker();
    initHeaderScroll();
    initSmoothScroll();
    lockImages();
  });
})();
