/**
 * =========================================================
 * security.js
 * Project: saimaqaiser.com
 * Purpose:
 * - Client-side security hardening
 * - Clickjacking prevention
 * - Referrer control
 * - Defensive UX behaviors
 * =========================================================
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     ANTI-CLICKJACKING
     Prevent site from being embedded in iframes
  --------------------------------------------------------- */
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      document.body.innerHTML = "";
    }
  }

  /* ---------------------------------------------------------
     REFERRER POLICY (CLIENT-SIDE FALLBACK)
  --------------------------------------------------------- */
  const metaReferrer = document.createElement("meta");
  metaReferrer.name = "referrer";
  metaReferrer.content = "strict-origin-when-cross-origin";
  document.head.appendChild(metaReferrer);

  /* ---------------------------------------------------------
     DISABLE DRAGGING OF IMAGES (CONTENT SCRAPING)
  --------------------------------------------------------- */
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  /* ---------------------------------------------------------
     DISABLE RIGHT CLICK ON LOGO & PROFILE IMAGE
     (Deterrence only – not absolute protection)
  --------------------------------------------------------- */
  document.addEventListener("contextmenu", function (e) {
    const protectedElements = ["IMG"];
    if (protectedElements.includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  /* ---------------------------------------------------------
     SOFT DEVTOOLS DETECTION (NON-INTRUSIVE)
  --------------------------------------------------------- */
  let devtoolsOpen = false;

  const threshold = 160;
  setInterval(function () {
    const widthThreshold =
      window.outerWidth - window.innerWidth > threshold;
    const heightThreshold =
      window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.warn(
          "Developer tools detected. Unauthorized modification is prohibited."
        );
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);

  /* ---------------------------------------------------------
     BLOCK COMMON CONSOLE INJECTION
  --------------------------------------------------------- */
  const originalConsole = console.log;
  console.log = function () {
    originalConsole.apply(console, arguments);
  };

  /* ---------------------------------------------------------
     SANITY CHECK: SECURE CONTEXT
  --------------------------------------------------------- */
  if (
    location.protocol !== "https:" &&
    location.hostname !== "localhost" &&
    !location.hostname.endsWith("github.io")
  ) {
    console.warn(
      "This site is not running in a secure HTTPS context."
    );
  }
})();
