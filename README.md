# SRA Studio 網站

SRA Studio 的作品網站，介紹我們在 Minecraft 製作的專案與地圖。

- 網址：<https://sra-studio.github.io>
- 使用 [Astro](https://astro.build) 製作，版型改自 [HTML5 UP](https://html5up.net) 的 Spectral
- 推送到 `main` 分支後，GitHub Actions 會自動建置並部署到 GitHub Pages

## 🧞 指令

以下指令都在專案根目錄執行：

| 指令                      | 作用                                         |
| :------------------------ | :------------------------------------------- |
| `npm install`             | 安裝套件（第一次或更新套件後執行）           |
| `npm run dev`             | 啟動本機預覽，網址是 `localhost:4321`        |
| `npm run build`           | 建置正式版網站到 `./dist/`                   |
| `npm run preview`         | 在本機預覽建置好的結果                       |
| `npm run optimize-images` | 把新加入的 PNG 截圖轉成 WebP（見下方說明）   |

## 📁 專案結構

```text
/
├── scripts/              optimize-images 指令的程式
└── src/
    ├── components/       共用元件（頁首、頁尾、畫廊、伺服器資訊…）
    ├── data/             專案與地圖的基本資料（名稱、封面圖、日期…）
    ├── images/           圖片；專案截圖在 projects/，地圖截圖在 maps/
    ├── layouts/          版型
    ├── pages/            每個檔案就是一個頁面
    └── styles/           CSS、圖示字型和頁面用的 JavaScript
```

版型有三個檔案：

- `BaseLayout.astro`：全站共用的骨架（`<head>`、選單、頁尾、共用腳本），改這裡全站生效
- `GenericLayout.astro`：一般頁面，上方有標題區塊
- `HomePageLayout.astro`：首頁

`src/pages/` 裡檔名以底線開頭的檔案（例如 `_elements.astro`）不會變成頁面，只是留著參考用的範本。

## ➕ 新增一個專案或地圖

1. 把截圖放進 `src/images/projects/<專案資料夾>/`，執行 `npm run optimize-images`
2. 在 `src/data/projects.ts` 的清單最後加一筆資料（名稱、簡介、封面圖、日期、標籤）
3. 複製 `src/pages/projects/` 裡現有的一頁，檔名改成和資料裡的 `slug` 相同，再修改內文和圖片

首頁的 Works、Projects 頁的卡片、專案頁最上方的背景圖和分享預覽圖，都會自動從 `src/data/projects.ts` 讀取，不用另外修改。

地圖的做法相同，資料在 `src/data/maps.ts`，頁面在 `src/pages/maps/`。

## 🖼️ 新增專案截圖

遊戲截圖的 PNG 檔案很大，放進 repo 之前請先轉檔：

1. 把截圖（PNG）放進 `src/images/projects/<專案資料夾>/` 或 `src/images/maps/<地圖資料夾>/`
2. 執行 `npm run optimize-images`，PNG 會被轉成 WebP（最寬 2560px）並刪除原本的 PNG
3. 在頁面裡 `import` 時副檔名寫 `.webp`
