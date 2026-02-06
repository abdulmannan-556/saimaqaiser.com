/* =========================================================
   security.js
   Project: saimaqaiser.com
   Purpose:
   - Client-side hardening for static website
   - Prevent basic abuse, tampering & injections
   - Defensive coding only (non-breaking)
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     BLOCK IFRAME EMBEDDING (CLICKJACKING)
  --------------------------------------------------------- */
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    document.body.innerHTML = "";
  }

  /* ---------------------------------------------------------
     DISABLE RIGHT CLICK (OPTIONAL HARDENING)
     (Comment out if you don't want this)
  --------------------------------------------------------- */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  /* ---------------------------------------------------------
     DISABLE COMMON DEVTOOLS SHORTCUTS
     (Does NOT stop professionals – only casual users)
  --------------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }

    // Ctrl+Shift+I / J / C
    if (
      e.ctrlKey &&
      e.shiftKey &&
      ["I", "J", "C"].includes(e.key.toUpperCase())
    ) {
      e.preventDefault();
    }

    // Ctrl+U (view source)
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
    }
  });

  /* ---------------------------------------------------------
     BASIC INPUT SANITIZATION (DEFENSIVE)
  --------------------------------------------------------- */
  function sanitizeInput(value) {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/"/g, "")
      .replace(/'/g, "")
      .replace(/`/g, "");
  }

  document.addEventListener("input", function (e) {
    const target = e.target;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA"
    ) {
      target.value = sanitizeInput(target.value);
    }
  });

  /* ---------------------------------------------------------
     BLOCK PASTE OF SCRIPT TAGS
  --------------------------------------------------------- */
  document.addEventListener("paste", function (e) {
    const paste = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    if (/<script\b/i.test(paste)) {
      e.preventDefault();
    }
  });

  /* ---------------------------------------------------------
     DETECT SUSPICIOUS DOM MODIFICATIONS
  --------------------------------------------------------- */
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(
          (node) =>
            node.nodeType === 1 &&
            node.tagName === "SCRIPT"
        )
      ) {
        console.warn("Blocked dynamic script injection");
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  /* ---------------------------------------------------------
     DISABLE DRAGGING OF IMAGES (BASIC ASSET PROTECTION)
  --------------------------------------------------------- */
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

})();
