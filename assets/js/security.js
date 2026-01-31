/* =========================================================
   security.js
   Purpose:
   - Frontend hardening for static websites
   - Clickjacking protection
   - Console abuse reduction
   - Referrer & framing safety
   - GitHub Pages compatible
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     PREVENT IFRAME EMBEDDING (CLICKJACKING)
     ========================================================= */
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    document.body.innerHTML = "";
  }

  /* =========================================================
     DISABLE RIGHT-CLICK (OPTIONAL LIGHT PROTECTION)
     ========================================================= */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  /* =========================================================
     BLOCK COMMON DEVTOOLS SHORTCUTS (NON-DESTRUCTIVE)
     ========================================================= */
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });

  /* =========================================================
     CONSOLE WARNING (LEGAL + DETERRENCE)
     ========================================================= */
  if (window.console && console.log) {
    console.log(
      "%cSTOP!",
      "color:red;font-size:48px;font-weight:bold;"
    );
    console.log(
      "%cThis is a browser feature intended for developers.\nUnauthorized access or tampering is prohibited.",
      "font-size:14px;"
    );
  }

  /* =========================================================
     REFERRER POLICY ENFORCEMENT (CLIENT-SIDE FALLBACK)
     ========================================================= */
  const metaReferrer = document.createElement("meta");
  metaReferrer.name = "referrer";
  metaReferrer.content = "strict-origin-when-cross-origin";
  document.head.appendChild(metaReferrer);

})();
