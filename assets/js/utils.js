/**
 * =========================================================
 * utils.js
 * Project: saimaqaiser.com
 * Purpose:
 * - Shared utility functions
 * - DOM helpers
 * - Small reusable logic
 * =========================================================
 */

(function (window) {
  "use strict";

  const Utils = {};

  /* ---------------------------------------------------------
     DOM READY
  --------------------------------------------------------- */
  Utils.ready = function (fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };

  /* ---------------------------------------------------------
     QUERY HELPERS
  --------------------------------------------------------- */
  Utils.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  Utils.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  /* ---------------------------------------------------------
     CLASS HELPERS
  --------------------------------------------------------- */
  Utils.addClass = function (el, className) {
    if (el && !el.classList.contains(className)) {
      el.classList.add(className);
    }
  };

  Utils.removeClass = function (el, className) {
    if (el && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  };

  Utils.toggleClass = function (el, className) {
    if (el) {
      el.classList.toggle(className);
    }
  };

  /* ---------------------------------------------------------
     EVENT DELEGATION
  --------------------------------------------------------- */
  Utils.on = function (parent, event, selector, handler) {
    parent.addEventListener(event, function (e) {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

  /* ---------------------------------------------------------
     SMOOTH SCROLL
  --------------------------------------------------------- */
  Utils.scrollTo = function (target) {
    const el =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------------------------------------------------
     CURRENT YEAR (FOOTER)
  --------------------------------------------------------- */
  Utils.setCurrentYear = function () {
    const yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  /* ---------------------------------------------------------
     SIMPLE DEBOUNCE
  --------------------------------------------------------- */
  Utils.debounce = function (fn, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  };

  /* ---------------------------------------------------------
     EXPORT
  --------------------------------------------------------- */
  window.SiteUtils = Utils;

  /* ---------------------------------------------------------
     AUTO INIT
  --------------------------------------------------------- */
  Utils.ready(function () {
    Utils.setCurrentYear();
  });
})(window);
