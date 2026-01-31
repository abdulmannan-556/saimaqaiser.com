/* =========================================================
   slider.js
   Purpose:
   - Homepage slider functionality
   - Auto-slide & manual navigation
   - Responsive & accessible
   - Security-safe ES6
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll(".slider-slide");
    const controls = slider.querySelectorAll(".slider-controls button");
    let currentIndex = 0;
    let intervalId = null;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        slide.setAttribute("aria-hidden", i !== index);
      });
      controls.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
        btn.setAttribute("aria-pressed", i === index);
      });
      currentIndex = index;
    };

    const nextSlide = () => {
      showSlide((currentIndex + 1) % slides.length);
    };

    const startAutoSlide = () => {
      intervalId = setInterval(nextSlide, 6000);
    };

    const stopAutoSlide = () => {
      if (intervalId) clearInterval(intervalId);
    };

    // Manual controls
    controls.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        showSlide(i);
        stopAutoSlide();
        startAutoSlide();
      });
    });

    // Keyboard accessibility
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === "ArrowLeft") {
        showSlide((currentIndex - 1 + slides.length) % slides.length);
        stopAutoSlide();
        startAutoSlide();
      }
    });

    // Initialize
    showSlide(0);
    startAutoSlide();
  });
});
