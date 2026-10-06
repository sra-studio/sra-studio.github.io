// 把 src/images/projects 和 src/images/maps 裡的 PNG 截圖轉成 WebP，轉好後刪除原本的 PNG。
//
// 用法：
//   1. 把遊戲截圖（PNG）放進 src/images/projects/<專案資料夾>/ 或 src/images/maps/<地圖資料夾>/
//   2. 執行 npm run optimize-images
//   3. 在頁面裡 import 時副檔名寫 .webp
//
// 只處理下面 FOLDERS 列出的資料夾；src/images 最外層的圖（圖示、角色圖）不會被動到。
// 這裡用的 sharp 是 Astro 內建的圖片處理套件，不需要另外安裝。
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('../src/images/', import.meta.url));
const FOLDERS = ['projects', 'maps']; // 要處理的資料夾；還沒建立的會自動略過
const MAX_WIDTH = 2560; // 比這個寬的圖會等比例縮小；燈箱最大只會用到 1920
const QUALITY = 90;

async function findPngs(dir) {
	const found = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) found.push(...(await findPngs(full)));
		else if (entry.isFile() && /\.png$/i.test(entry.name)) found.push(full);
	}
	return found;
}

async function convert(file) {
	const target = file.replace(/\.png$/i, '.webp');
	// 先整個讀進記憶體再處理，Windows 才不會因為檔案被佔用而刪不掉原圖
	const input = await readFile(file);
	const { data, info } = await sharp(input)
		.resize({ width: MAX_WIDTH, withoutEnlargement: true })
		.webp({ quality: QUALITY })
		.toBuffer({ resolveWithObject: true });
	if (info.format !== 'webp' || data.length === 0) throw new Error('轉檔結果不正確');
	await writeFile(target, data);
	await unlink(file); // 確定 WebP 寫好之後才刪除原圖
	return { target, before: input.length, after: data.length, width: info.width, height: info.height };
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const files = [];
for (const folder of FOLDERS) {
	const dir = path.join(ROOT, folder);
	if (existsSync(dir)) files.push(...(await findPngs(dir)));
}
files.sort();

if (files.length === 0) {
	console.log(`沒有需要轉檔的 PNG（檢查了 src/images 底下的 ${FOLDERS.join('、')}）。`);
} else {
	let before = 0;
	let after = 0;
	let failed = 0;
	for (const file of files) {
		const name = path.relative(ROOT, file);
		try {
			const result = await convert(file);
			before += result.before;
			after += result.after;
			console.log(`✓ ${name} → ${path.basename(result.target)}  ${result.width}×${result.height}  ${mb(result.before)} → ${mb(result.after)}`);
		} catch (error) {
			failed += 1;
			console.error(`✗ ${name}：${error.message}（原圖保留未刪除）`);
		}
	}
	console.log(`\n完成：轉換 ${files.length - failed} 張，${mb(before)} → ${mb(after)}${failed ? `；失敗 ${failed} 張` : ''}`);
	console.log('記得在頁面的 import 裡把副檔名寫成 .webp。');
	if (failed) process.exitCode = 1;
}
