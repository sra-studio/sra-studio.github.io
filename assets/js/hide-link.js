document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hide-link").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const link = btn.dataset.link;
      window.location.href = link;
    });
  });
});
