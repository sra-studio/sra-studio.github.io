document.addEventListener("DOMContentLoaded", () => {
  // 抓取所有擁有 copyText class 的元素
  const copyElements = document.querySelectorAll(".copyText");
  const popup = document.getElementById("copyPopup");

  copyElements.forEach(el => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const text = el.getAttribute("title"); // 複製 title 屬性值

      navigator.clipboard.writeText(text).then(() => {
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 2000);
      });
    });
  });
});
