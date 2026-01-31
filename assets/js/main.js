/* =========================================================
   main.js
   Purpose:
   - Shared JS for entire website
   - Dropdowns, slider hooks, smooth scroll
   - Security-conscious, modern ES6
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main-nav");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("open");
    });
  }

  /* ---------- Smooth Scroll for Internal Links ---------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetID);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------- Slider Hook (used by slider.js) ---------- */
  const sliders = document.querySelectorAll(".slider-container");
  sliders.forEach(slider => {
    let currentIndex = 0;
    const slides = slider.querySelectorAll(".slider-slide");
    const controls = slider.querySelectorAll(".slider-controls button");

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      controls.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    };

    if (controls.length > 0) {
      controls.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          currentIndex = i;
          showSlide(currentIndex);
        });
      });
    }

    // Auto-rotate (optional)
    if (slides.length > 1) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }, 6000);
    }

    // Initialize
    showSlide(currentIndex);
  });

  /* ---------- Profile Hover Animation ---------- */
  const profiles = document.querySelectorAll(".profile-image");
  profiles.forEach(profile => {
    profile.addEventListener("mouseenter", () => {
      profile.style.transform = "scale(1.05)";
    });
    profile.addEventListener("mouseleave", () => {
      profile.style.transform = "scale(1)";
    });
  });
});
