/* =========================================================
   main.js
   Purpose:
   - Global JavaScript logic
   - Stock ticker behavior
   - Safe DOM initialization
   - No external dependencies
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     DOM READY HELPER
     ========================================================= */
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {

    /* =========================================================
       STOCK TICKER LOGIC
       ========================================================= */

    const ticker = document.querySelector(".ticker-track");

    if (ticker) {
      /*
        Duplicate ticker items to ensure seamless infinite scroll
        without visual gaps (no cloning from user input)
      */
      const items = Array.from(ticker.children);
      items.forEach(function (item) {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        ticker.appendChild(clone);
      });
    }

    /* =========================================================
       GLOBAL SAFETY: PREVENT EMPTY LINKS
       ========================================================= */
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });

    /* =========================================================
       ACCESSIBILITY: KEYBOARD DROPDOWN SUPPORT
       ========================================================= */
    const dropdownParents = document.querySelectorAll(".has-dropdown");

    dropdownParents.forEach(function (item) {
      const link = item.querySelector("a");

      if (!link) return;

      link.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.classList.toggle("open");
        }
      });
    });

    /* =========================================================
       FAIL-SAFE LOGGING (DEV ONLY)
       ========================================================= */
    if (location.hostname === "localhost") {
      console.info("Main JS loaded successfully.");
    }
  });
})();
