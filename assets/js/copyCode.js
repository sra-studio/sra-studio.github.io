document.addEventListener("DOMContentLoaded", () => {
  const codeElements = document.querySelectorAll(".copyCode");
  const popup = document.querySelector(".popup");

  codeElements.forEach(el => {
    el.addEventListener("click", () => {
      const text = el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 1500);
      });
    });
  });
});
