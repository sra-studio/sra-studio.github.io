document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spoiler.toggle-mode .spoiler-toggle")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;

        // 用 computedStyle 判斷
        if (window.getComputedStyle(content).display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
});
