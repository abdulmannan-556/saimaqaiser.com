/* =========================================================
   menu.js
   Project: saimaqaiser.com
   Purpose:
   - Responsive navigation menu
   - Mobile toggle behavior
   - Accessibility (ARIA + keyboard)
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
     MOBILE MENU INITIALIZATION
  --------------------------------------------------------- */
  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) return;

    // ARIA defaults
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");

    function openMenu() {
      nav.classList.add("open");
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
      if (nav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Click toggle
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Click outside closes menu
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // ESC key closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close menu on link click (mobile UX)
    const links = nav.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
  }

  /* ---------------------------------------------------------
     INITIALIZE
  --------------------------------------------------------- */
  onReady(function () {
    initMenu();
  });
})();
