document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-bg]").forEach(el => {
    const url = el.dataset.bg;
    el.style.backgroundImage = `url(${url})`;
  });
});
