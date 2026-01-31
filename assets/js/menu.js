document.querySelectorAll(".dropdown").forEach(item => {
  item.addEventListener("mouseenter", () => {
    const menu = item.querySelector(".dropdown-menu");
    if (menu) menu.style.display = "block";
  });

  item.addEventListener("mouseleave", () => {
    const menu = item.querySelector(".dropdown-menu");
    if (menu) menu.style.display = "none";
  });
});
