// 所有專案的基本資料都集中在這裡。
// 首頁的 Works、Projects 頁的卡片、各專案頁的標題／頁首圖／分享預覽，全部從這個檔案讀取，
// 所以名稱、日期這些資料只需要在這裡改一次。
//
// 新增專案的步驟：
//   1. 在下面的 projects 陣列最後加一筆資料
//   2. 建立 src/pages/projects/<slug>.astro（可以複製現有的專案頁來改）
import type { ImageMetadata } from 'astro';

import cover69Land from '../images/projects/202510_69Land/69land.webp';
import coverHauntedHouse from '../images/projects/202510_HauntedHouse/haunted.webp';
import coverEasterEggHunt from '../images/projects/202604_EasterEggHunt/2026-05-02_22.01.45.webp';
import coverMaze from '../images/projects/202604_Maze/2026-04-25_18.47.58.webp';
import coverTamagotchi from '../images/projects/202607_Tamagotchi/2026-07-10_00.26.01.webp';

export interface Project {
	/** 代號：網址是 /projects/<slug>/，也要和 src/pages/projects/ 裡的檔名相同 */
	slug: string;
	/** 英文名稱 */
	title: string;
	/** 中文名稱 */
	subtitle: string;
	/** 一句話說明這是什麼，顯示在 Projects 頁的卡片上 */
	summary: string;
	/** 搜尋結果和分享連結時顯示的簡介 */
	description: string;
	/** 封面圖：首頁與 Projects 頁的卡片、專案頁最上方的背景、分享預覽圖都用這一張 */
	cover: ImageMetadata;
	/** 封面圖當成頁首背景時要對準的位置（水平 垂直），不寫就是正中央 */
	coverPosition?: string;
	/** 首頁卡片左上角的 Font Awesome 圖示 */
	icon: string;
	/** 活動日期 */
	period: string;
	/** 地點 */
	location: string;
	/** 標籤 */
	tags: string;
}

export const projects: Project[] = [
	{
		slug: '202510_69Land',
		title: '69 Land',
		subtitle: '六九遊樂園',
		summary: '客製化遊樂園地圖',
		description: '位於六九社伺服器的遊樂園服，是遊樂園的主建築，不定時舉辦各種活動並推出新的遊樂設施。',
		cover: cover69Land,
		coverPosition: '50% 48%',
		icon: 'fa-brands fa-fort-awesome',
		period: '2025/10/26-無限期',
		location: '69社伺服器',
		tags: '建築',
	},
	{
		slug: '202510_HauntedHouse',
		title: 'Haunted House',
		subtitle: '陸玖大宅',
		summary: '萬聖節鬼屋',
		description: '六九社伺服器遊樂園服的第一個遊樂設施，與萬聖節活動共同推出的鬼屋「陸玖大宅」。',
		cover: coverHauntedHouse,
		coverPosition: '50% 25%',
		icon: 'fa-solid fa-ghost',
		period: '2025/10/26-2025/11/30',
		location: '69社伺服器',
		tags: '建築、指令方塊',
	},
	{
		slug: '202604_EasterEggHunt',
		title: 'Easter Egg Hunt',
		subtitle: '修蛋幾勒',
		summary: '復活節找蛋活動',
		description: '於六九社伺服器遊樂園服舉辦的復活節找蛋活動，使用資料包記錄玩家的找蛋進度，找齊後自動發放獎勵。',
		cover: coverEasterEggHunt,
		coverPosition: '57% 59%',
		icon: 'fa-solid fa-egg',
		period: '2026/04/05-2026/04/30',
		location: '69社伺服器',
		tags: '資料包',
	},
	{
		slug: '202604_Maze',
		title: 'Maze',
		subtitle: '咪宮',
		summary: '遊樂園迷宮',
		description: '位於六九社伺服器遊樂園服的輕鬆導向迷宮設施，平均遊玩時長約 1 小時。',
		cover: coverMaze,
		coverPosition: '52% 59%',
		icon: 'fa-solid fa-dungeon',
		period: '2026/04/15-無限期',
		location: '69社伺服器',
		tags: '建築、指令方塊',
	},
	{
		slug: '202607_Tamagotchi',
		title: 'Tamagotchi',
		subtitle: '2026夏日活動-我的好雞友',
		summary: '電子雞遊戲',
		description: '六九社伺服器的 2026 夏日限時活動「我的好雞友」：以 Skript 插件撰寫的電子雞系統，結合 Quests 插件自動發放任務獎勵。',
		cover: coverTamagotchi,
		icon: 'fa-solid fa-egg',
		period: '2026/07/11-2026/08/31',
		location: '69社伺服器',
		tags: '建築、Skript插件、Quests插件',
	},
];

/** 專案頁的網址 */
export function projectUrl(project: Project): string {
	return `/projects/${project.slug}/`;
}

/** 用代號取得一筆專案資料；代號打錯時建置會直接失敗並指出是哪一個 */
export function getProject(slug: string): Project {
	const project = projects.find((item) => item.slug === slug);
	if (!project) throw new Error(`src/data/projects.ts 裡找不到代號為「${slug}」的專案`);
	return project;
}
