/* =========================================================
   menu.js
   Purpose:
   - Dropdown menu behavior for desktop & mobile
   - Keyboard accessibility
   - Multi-level menus
   - Security-safe
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    // Desktop hover is handled by CSS; focus/keyboard:
    trigger.addEventListener("focus", () => {
      menu.style.visibility = "visible";
      menu.style.opacity = "1";
      menu.style.transform = "translateY(0)";
    });

    trigger.addEventListener("blur", () => {
      menu.style.visibility = "hidden";
      menu.style.opacity = "0";
      menu.style.transform = "translateY(10px)";
    });

    // Keyboard control
    trigger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const isVisible = menu.style.visibility === "visible";
        menu.style.visibility = isVisible ? "hidden" : "visible";
        menu.style.opacity = isVisible ? "0" : "1";
        menu.style.transform = isVisible ? "translateY(10px)" : "translateY(0)";
      } else if (e.key === "Escape") {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
        menu.style.transform = "translateY(10px)";
        trigger.blur();
      }
    });
  });

  // Close dropdowns if clicked outside
  document.addEventListener("click", (e) => {
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector(".dropdown-menu");
      if (!dropdown.contains(e.target)) {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
        menu.style.transform = "translateY(10px)";
      }
    });
  });
});
