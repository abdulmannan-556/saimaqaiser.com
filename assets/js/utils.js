/* =========================================================
   utils.js
   Purpose:
   - Shared helper utilities
   - Performance-safe helpers
   - DOM utilities
   - Used across pages where needed
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     HELPER: DEBOUNCE
     Prevents excessive function calls (scroll/resize)
     ========================================================= */
  window.debounce = function (fn, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };

  /* =========================================================
     HELPER: ADD CLASS SAFELY
     ========================================================= */
  window.addClass = function (el, className) {
    if (el && className && !el.classList.contains(className)) {
      el.classList.add(className);
    }
  };

  /* =========================================================
     HELPER: REMOVE CLASS SAFELY
     ========================================================= */
  window.removeClass = function (el, className) {
    if (el && className && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  };

  /* =========================================================
     SCROLL TO TOP BUTTON (OPTIONAL)
     ========================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    const scrollBtn = document.querySelector(".scroll-to-top");
    if (!scrollBtn) return;

    window.addEventListener(
      "scroll",
      debounce(function () {
        if (window.scrollY > 400) {
          scrollBtn.classList.add("visible");
        } else {
          scrollBtn.classList.remove("visible");
        }
      }, 100)
    );

    scrollBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

})();
