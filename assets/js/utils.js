/* =========================================================
   utils.js
   Project: saimaqaiser.com
   Purpose:
   - Shared helper utilities
   - Safe DOM accessors
   - Performance & UX helpers
   - Reusable across all pages
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   SAFE DOM SELECTORS
--------------------------------------------------------- */
const $ = (selector, scope = document) => {
  try {
    return scope.querySelector(selector);
  } catch (e) {
    return null;
  }
};

const $$ = (selector, scope = document) => {
  try {
    return Array.from(scope.querySelectorAll(selector));
  } catch (e) {
    return [];
  }
};

/* ---------------------------------------------------------
   EVENT HELPER
--------------------------------------------------------- */
const on = (element, event, handler, options = false) => {
  if (!element) return;
  element.addEventListener(event, handler, options);
};

/* ---------------------------------------------------------
   DEBOUNCE (PERFORMANCE)
--------------------------------------------------------- */
const debounce = (fn, delay = 250) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

/* ---------------------------------------------------------
   THROTTLE (PERFORMANCE)
--------------------------------------------------------- */
const throttle = (fn, limit = 250) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/* ---------------------------------------------------------
   SCROLL HELPERS
--------------------------------------------------------- */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const isInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

/* ---------------------------------------------------------
   CLASS HELPERS
--------------------------------------------------------- */
const addClass = (el, className) => {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
  }
};

const removeClass = (el, className) => {
  if (el && el.classList.contains(className)) {
    el.classList.remove(className);
  }
};

const toggleClass = (el, className) => {
  if (el) {
    el.classList.toggle(className);
  }
};

/* ---------------------------------------------------------
   DATE & TIME HELPERS
--------------------------------------------------------- */
const getCurrentYear = () => new Date().getFullYear();

/* ---------------------------------------------------------
   SAFE TEXT INSERTION (XSS DEFENSIVE)
--------------------------------------------------------- */
const setText = (el, text) => {
  if (!el) return;
  el.textContent = String(text);
};

/* ---------------------------------------------------------
   NETWORK STATUS (UX)
--------------------------------------------------------- */
const isOnline = () => navigator.onLine === true;

/* ---------------------------------------------------------
   EXPORT TO GLOBAL (INTENTIONAL)
--------------------------------------------------------- */
window.Utils = {
  $,
  $$,
  on,
  debounce,
  throttle,
  scrollToTop,
  isInViewport,
  addClass,
  removeClass,
  toggleClass,
  getCurrentYear,
  setText,
  isOnline,
};
