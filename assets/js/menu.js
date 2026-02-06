/* =========================================================
   menu.js
   Project: saimaqaiser.com
   Purpose:
   - Responsive navigation menu
   - Mobile toggle support
   - Accessibility (ARIA + keyboard)
   - Click-outside & ESC close
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM READY
  --------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* ---------------------------------------------------------
     MENU LOGIC
  --------------------------------------------------------- */
  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) return;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");

    function openMenu() {
      nav.classList.add("open");
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    }

    function closeMenu() {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }

    function toggleMenu(e) {
      e.stopPropagation();
      nav.classList.contains("open") ? closeMenu() : openMenu();
    }

    /* Toggle click */
    toggle.addEventListener("click", toggleMenu);

    /* Close on outside click */
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    /* Close on ESC */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    /* Close after clicking a link (mobile UX) */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  ready(initMenu);
})();
