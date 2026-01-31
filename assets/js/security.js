/* =========================================================
   security.js
   Purpose:
   - Security enhancements for static website
   - Sanitize user input to prevent XSS
   - Safe DOM handling
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", e => {
      // Sanitize all text inputs and textareas
      form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], textarea")
        .forEach(field => {
          field.value = sanitizeInput(field.value);
        });
    });
  });

  /**
   * Sanitize input to escape HTML special characters
   * @param {string} str
   * @returns {string}
   */
  function sanitizeInput(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /* Prevent inline script injection via URL hash or search */
  window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      urlParams.set(key, sanitizeInput(value));
    });
  });
});
