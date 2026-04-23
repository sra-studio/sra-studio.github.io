document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spoiler.fade-mode .spoiler-toggle")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        const block = btn.parentElement;
        const content = block.nextElementSibling;

        block.classList.add("fadeout");
        setTimeout(() => {
          block.style.display = "none";
          content.style.display = "block";
        }, 500);
      });
    });
});
