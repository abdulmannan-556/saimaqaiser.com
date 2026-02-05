/**
 * =========================================================
 * menu.js
 * Project: saimaqaiser.com
 * Purpose:
 * - Mobile navigation toggle
 * - Dropdown menu interaction (mobile)
 * - Desktop uses CSS hover
 * =========================================================
 */

(function () {
  "use strict";

  // Elements
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  /**
   * Toggle mobile menu
   */
  function toggleMenu() {
    if (!mainNav) return;
    mainNav.classList.toggle("active");
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    if (!mainNav) return;
    mainNav.classList.remove("active");
  }

  /**
   * Handle dropdown click (mobile only)
   */
  function handleDropdownClick(event) {
    const screenWidth = window.innerWidth;

    // Desktop: do nothing (CSS hover)
    if (screenWidth > 992) return;

    event.preventDefault();

    const dropdown = event.currentTarget;
    const isActive = dropdown.classList.contains("active");

    // Close all dropdowns first
    dropdowns.forEach((d) => d.classList.remove("active"));

    // Toggle current
    if (!isActive) {
      dropdown.classList.add("active");
    }
  }

  /**
   * Close menu on resize to desktop
   */
  function handleResize() {
    if (window.innerWidth > 992) {
      closeMenu();
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  }

  /**
   * Event bindings
   */
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    if (link) {
      link.addEventListener("click", handleDropdownClick);
    }
  });

  window.addEventListener("resize", handleResize);

  /**
   * Close menu when clicking outside (mobile)
   */
  document.addEventListener("click", function (event) {
    if (!mainNav || !menuToggle) return;

    if (
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  });
})();
