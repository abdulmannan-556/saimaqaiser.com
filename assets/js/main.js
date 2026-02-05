/**
 * =========================================================
 * main.js
 * Project: saimaqaiser.com
 * Purpose:
 * - Global JS bootstrap
 * - Stock ticker engine (static data)
 * - Animation helpers
 * - Safe for GitHub Pages
 * =========================================================
 */

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
     STOCK TICKER DATA (STATIC – AS PROVIDED)
  --------------------------------------------------------- */
  const STOCKS = [
    { symbol: "KEL", price: "7.12", change: "-0.02" },
    { symbol: "BOP", price: "39.53", change: "-0.65" },
    { symbol: "PTC", price: "60.43", change: "+1.55" },
    { symbol: "FCCL", price: "56.16", change: "+0.89" },
    { symbol: "OGDC", price: "321.81", change: "+2.12" },
    { symbol: "HBL", price: "336.89", change: "+7.01" },
    { symbol: "LUCK", price: "465.43", change: "+16.70" },
    { symbol: "MEBL", price: "477.16", change: "+11.51" }
  ];

  /* ---------------------------------------------------------
     CREATE TICKER HTML
  --------------------------------------------------------- */
  function buildTicker(container) {
    const track = document.createElement("div");
    track.className = "ticker-track";

    // Duplicate data to create seamless loop
    const data = STOCKS.concat(STOCKS);

    data.forEach((stock) => {
      const item = document.createElement("div");
      item.className = "ticker-item";

      const changeClass =
        stock.change.startsWith("-") ? "negative" : "positive";

      item.innerHTML = `
        <span class="symbol">${stock.symbol}</span>
        <span class="price">${stock.price}</span>
        <span class="change ${changeClass}">
          ${stock.change}
        </span>
      `;

      track.appendChild(item);
    });

    container.appendChild(track);
  }

  /* ---------------------------------------------------------
     INIT TICKER
  --------------------------------------------------------- */
  function initTicker() {
    const ticker = document.querySelector(".stock-ticker");
    if (!ticker) return;

    buildTicker(ticker);
  }

  /* ---------------------------------------------------------
     SCROLL TO TOP BUTTON (OPTIONAL FUTURE USE)
  --------------------------------------------------------- */
  function initScrollHelpers() {
    const scrollBtn = document.querySelector(".scroll-to-top");
    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 300);
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     ANIMATION TRIGGER (ON LOAD)
  --------------------------------------------------------- */
  function initAnimations() {
    const animated = document.querySelectorAll("[data-animate]");
    animated.forEach((el, index) => {
      const delay = el.dataset.delay || index * 100;
      setTimeout(() => {
        el.classList.add(el.dataset.animate);
      }, delay);
    });
  }

  /* ---------------------------------------------------------
     BOOTSTRAP
  --------------------------------------------------------- */
  onReady(function () {
    initTicker();
    initScrollHelpers();
    initAnimations();
  });
})();
