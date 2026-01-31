document.querySelectorAll(".dropdown").forEach(menu => {
  menu.addEventListener("mouseenter", () => {
    menu.querySelector(".dropdown-menu").style.display = "block";
  });

  menu.addEventListener("mouseleave", () => {
    menu.querySelector(".dropdown-menu").style.display = "none";
  });
});
