/* =========================================================
   slider.js
   Purpose:
   - Hero slider functionality
   - Auto-rotation with fade effect
   - Safe fallback if only one slide exists
   - No external libraries
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".hero-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".hero-slide");
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const intervalTime = 6000; // 6 seconds

    slides.forEach((slide, index) => {
      slide.style.opacity = index === 0 ? "1" : "0";
      slide.style.zIndex = index === 0 ? "2" : "1";
    });

    function showNextSlide() {
      const currentSlide = slides[currentIndex];
      currentSlide.style.opacity = "0";
      currentSlide.style.zIndex = "1";

      currentIndex = (currentIndex + 1) % slides.length;

      const nextSlide = slides[currentIndex];
      nextSlide.style.opacity = "1";
      nextSlide.style.zIndex = "2";
    }

    setInterval(showNextSlide, intervalTime);
  });
})();
