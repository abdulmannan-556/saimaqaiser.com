/**
 * =========================================================
 * slider.js
 * Project: saimaqaiser.com
 * Purpose:
 * - Homepage hero slider
 * - Auto-rotate slides
 * - Pause on hover
 * - Accessible & lightweight
 * =========================================================
 */

(function () {
  "use strict";

  const SLIDE_INTERVAL = 6000;

  function initSlider() {
    const slider = document.querySelector(".hero-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Init
    showSlide(currentIndex);
    startAuto();

    // Pause on hover
    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        nextSlide();
        startAuto();
      }
      if (e.key === "ArrowLeft") {
        currentIndex =
          (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        startAuto();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initSlider);
})();
