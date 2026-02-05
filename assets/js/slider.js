/* =========================================================
   slider.js
   Project: saimaqaiser.com
   Purpose:
   - Lightweight slider / carousel
   - Auto play with pause on hover
   - Touch swipe support
   - Accessibility friendly
   ========================================================= */

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
     SLIDER INITIALIZER
     HTML structure expected:
     .slider
       .slider-track
         .slide
         .slide
  --------------------------------------------------------- */
  function initSlider(sliderEl, options) {
    const track = sliderEl.querySelector(".slider-track");
    const slides = sliderEl.querySelectorAll(".slide");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;
    const slideCount = slides.length;

    const settings = Object.assign(
      {
        autoplay: true,
        delay: 4000,
        pauseOnHover: true,
      },
      options || {}
    );

    /* -----------------------------------------------------
       SET INITIAL STATE
    ----------------------------------------------------- */
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    }

    function startAutoplay() {
      if (!settings.autoplay) return;
      stopAutoplay();
      intervalId = setInterval(nextSlide, settings.delay);
    }

    function stopAutoplay() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    /* -----------------------------------------------------
       HOVER CONTROL
    ----------------------------------------------------- */
    if (settings.pauseOnHover) {
      sliderEl.addEventListener("mouseenter", stopAutoplay);
      sliderEl.addEventListener("mouseleave", startAutoplay);
    }

    /* -----------------------------------------------------
       TOUCH SUPPORT (MOBILE)
    ----------------------------------------------------- */
    let startX = 0;
    let endX = 0;

    sliderEl.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      stopAutoplay();
    });

    sliderEl.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
      startAutoplay();
    });

    function handleSwipe() {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          currentIndex =
            (currentIndex - 1 + slideCount) % slideCount;
          updateSlider();
        }
      }
    }

    /* -----------------------------------------------------
       REDUCED MOTION SUPPORT
    ----------------------------------------------------- */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      settings.autoplay = false;
    }

    /* -----------------------------------------------------
       INIT
    ----------------------------------------------------- */
    updateSlider();
    startAutoplay();
  }

  /* ---------------------------------------------------------
     INITIALIZE ALL SLIDERS
  --------------------------------------------------------- */
  onReady(function () {
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach(function (slider) {
      initSlider(slider, {
        autoplay: true,
        delay: 4500,
      });
    });
  });
})();
