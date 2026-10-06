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

// 防雷黑條：點一下顯示、再點一下隱藏（電腦和手機相同）
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spoiler-color-black").forEach(bar => {
    bar.addEventListener("click", () => {
      // 正在框選文字（例如要複製密碼）時不切換，避免選到一半又被蓋回去
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) return;

      bar.classList.toggle("is-revealed");
    });
  });
});
