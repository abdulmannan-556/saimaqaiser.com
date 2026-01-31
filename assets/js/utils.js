/* =========================================================
   utils.js
   Purpose:
   - Utility JS functions for the entire website
   - DOM helpers
   - Throttle / debounce
   - Smooth scroll helper
   - Security-safe
   ========================================================= */

/* ---------- DOM Selector Helpers ---------- */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

/* ---------- Throttle Function ---------- */
function throttle(fn, wait) {
  let isThrottled = false, args, context;
  return function () {
    if (isThrottled) {
      args = arguments;
      context = this;
      return;
    }
    fn.apply(this, arguments);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      if (args) {
        fn.apply(context, args);
        args = context = null;
      }
    }, wait);
  };
}

/* ---------- Debounce Function ---------- */
function debounce(fn, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), delay);
  };
}

/* ---------- Smooth Scroll to Element ---------- */
function smoothScrollTo(el, offset = 0) {
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: top,
    behavior: "smooth"
  });
}

/* ---------- Helper: Add Class ---------- */
function addClass(el, className) {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
  }
}

/* ---------- Helper: Remove Class ---------- */
function removeClass(el, className) {
  if (el && el.classList.contains(className)) {
    el.classList.remove(className);
  }
}

/* ---------- Helper: Toggle Class ---------- */
function toggleClass(el, className) {
  if (el) el.classList.toggle(className);
}
