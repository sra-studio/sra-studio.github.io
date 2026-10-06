// 所有地圖的基本資料都集中在這裡。
// 首頁的 Works、Maps 頁的卡片、各地圖頁的標題，全部從這個檔案讀取。
//
// 新增地圖的步驟：
//   1. 在下面的 maps 陣列加一筆資料（最新的放最前面）
//   2. 建立 src/pages/maps/<slug>.astro（可以複製現有的地圖頁來改）
import type { ImageMetadata } from 'astro';

// 地圖尚未釋出，先用佔位圖；有實際截圖後把這兩行換成 ../images/maps/<地圖資料夾>/ 裡的圖
import coverLostDreamlandParadise from '../images/pic01.jpg';
import coverHauntedHouse from '../images/pic02.jpg';

export interface GameMap {
	/** 代號：網址是 /maps/<slug>/，也要和 src/pages/maps/ 裡的檔名相同 */
	slug: string;
	/** 英文名稱 */
	title: string;
	/** 中文名稱 */
	subtitle: string;
	/** 搜尋結果和分享連結時顯示的簡介 */
	description: string;
	/** 封面圖：首頁與 Maps 頁的卡片 */
	cover: ImageMetadata;
	/** 首頁卡片左上角的 Font Awesome 圖示 */
	icon: string;
	/** 發布日期 */
	release: string;
	/** 標籤 */
	tags: string;
}

export const maps: GameMap[] = [
	{
		slug: '202608_LostDreamlandParadise',
		title: 'Lost Dreamland Paradise',
		subtitle: '失落的夢境樂園',
		description: 'Minecraft 解謎地圖「失落的夢境樂園」：歡迎來到飴光樂園，一座專為旅人打造的沉浸式世界。適合 1～4 人遊玩。',
		cover: coverLostDreamlandParadise,
		icon: 'fa-solid fa-dharmachakra',
		release: 'Coming Soon',
		tags: '地圖、指令方塊、資料包、材質包',
	},
	{
		slug: '202510_HauntedHouse',
		title: 'Haunted House',
		subtitle: '鬼屋',
		description: '原位於六九伺服器的萬聖節鬼屋，預計推出可單獨遊玩的 Minecraft 地圖版本。',
		cover: coverHauntedHouse,
		icon: 'fa-solid fa-ghost',
		release: 'Coming Soon',
		tags: '地圖、資料包',
	},
];

/** 地圖頁的網址 */
export function mapUrl(gameMap: GameMap): string {
	return `/maps/${gameMap.slug}/`;
}

/** 用代號取得一筆地圖資料；代號打錯時建置會直接失敗並指出是哪一個 */
export function getMap(slug: string): GameMap {
	const gameMap = maps.find((item) => item.slug === slug);
	if (!gameMap) throw new Error(`src/data/maps.ts 裡找不到代號為「${slug}」的地圖`);
	return gameMap;
}
