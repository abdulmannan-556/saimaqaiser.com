/* =========================================================
   menu.js
   Purpose:
   - Primary navigation dropdown handling
   - Hover + click support
   - Keyboard accessibility
   - Mobile-safe behavior
   - No external libraries
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     HELPER: CLOSE ALL DROPDOWNS
     ========================================================= */
  function closeAllDropdowns() {
    document.querySelectorAll(".has-dropdown").forEach(function (item) {
      item.classList.remove("open");
    });
  }

  /* =========================================================
     INITIALIZE MENU
     ========================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    const dropdownItems = document.querySelectorAll(".has-dropdown");

    dropdownItems.forEach(function (item) {
      const trigger = item.querySelector("a");
      const menu = item.querySelector(".dropdown");

      if (!trigger || !menu) return;

      /* ---------- Desktop: hover ---------- */
      item.addEventListener("mouseenter", function () {
        item.classList.add("open");
      });

      item.addEventListener("mouseleave", function () {
        item.classList.remove("open");
      });

      /* ---------- Mobile: click ---------- */
      trigger.addEventListener("click", function (e) {
        const isMobile = window.innerWidth <= 992;

        if (isMobile) {
          e.preventDefault();

          const isOpen = item.classList.contains("open");
          closeAllDropdowns();

          if (!isOpen) {
            item.classList.add("open");
          }
        }
      });

      /* ---------- Keyboard accessibility ---------- */
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.classList.toggle("open");
        }

        if (e.key === "Escape") {
          item.classList.remove("open");
          trigger.blur();
        }
      });
    });

    /* ---------- Close dropdowns on outside click ---------- */
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".has-dropdown")) {
        closeAllDropdowns();
      }
    });

    /* ---------- Close dropdowns on resize ---------- */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) {
        closeAllDropdowns();
      }
    });
  });
})();
