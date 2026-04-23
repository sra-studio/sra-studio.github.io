document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("scrollBtn").addEventListener("click", () => {
        const target = document.getElementById("scroll-target");
        target.scrollIntoView({
            behavior: "smooth",   // 平滑捲動
            block: "start"        // 對齊到區塊頂端
        });
    });
});
