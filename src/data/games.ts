import type { Game } from "./types";

// Build a 12-month player history with a smooth curve and seasonal noise.
function makeHistory(seed: number, base: number, trend: number) {
  const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
  let prev = base;
  return months.map((m, i) => {
    const noise = Math.sin((i + seed) * 0.9) * (base * 0.08);
    prev = Math.max(1000, prev + trend + noise);
    return { month: m, players: Math.round(prev) };
  });
}

// Curated games. Cover is a tailwind gradient pair (from-X to-Y).
export const GAMES: Game[] = [
  // Riot
  { id: "lol", slug: "league-of-legends", title: "League of Legends", studioId: "riot", genre: "MOBA", platforms: ["PC"], cover: "from-blue-600 to-cyan-400", releaseYear: 2009, activePlayers: 1320000, peakPlayers: 8000000, downloads: 540000000, rating: 4.4, trending: "hot", growthPct: 4.2, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(1, 1100000, 18000), description: "The MOBA that defined a generation. Five vs five on Summoner's Rift." },
  { id: "valorant", slug: "valorant", title: "VALORANT", studioId: "riot", genre: "Shooter", platforms: ["PC"], cover: "from-rose-500 to-orange-400", releaseYear: 2020, activePlayers: 980000, peakPlayers: 1700000, downloads: 180000000, rating: 4.5, trending: "up", growthPct: 11.4, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(2, 600000, 32000), description: "Tactical 5v5 hero shooter. Aim, agents and economy." },
  { id: "tft", slug: "teamfight-tactics", title: "Teamfight Tactics", studioId: "riot", genre: "Card", platforms: ["PC","Mobile"], cover: "from-violet-500 to-fuchsia-500", releaseYear: 2019, activePlayers: 220000, peakPlayers: 480000, downloads: 60000000, rating: 4.2, trending: "up", growthPct: 6.8, tags: ["addictive","competitive"], playerHistory: makeHistory(3, 180000, 4000), description: "Auto-battler chess on the Rift." },

  // Valve
  { id: "cs2", slug: "counter-strike-2", title: "Counter-Strike 2", studioId: "valve", genre: "Shooter", platforms: ["PC"], cover: "from-orange-500 to-yellow-400", releaseYear: 2023, activePlayers: 1480000, peakPlayers: 1820000, downloads: 90000000, rating: 4.3, trending: "hot", growthPct: 8.1, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(4, 1100000, 35000), description: "The competitive bomb defusal benchmark, rebuilt on Source 2." },
  { id: "dota2", slug: "dota-2", title: "Dota 2", studioId: "valve", genre: "MOBA", platforms: ["PC"], cover: "from-red-700 to-rose-500", releaseYear: 2013, activePlayers: 740000, peakPlayers: 1295000, downloads: 200000000, rating: 4.4, trending: "down", growthPct: -2.4, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(5, 800000, -4000), description: "Deep, brutal MOBA with 120+ heroes." },
  { id: "deadlock", slug: "deadlock", title: "Deadlock", studioId: "valve", genre: "MOBA", platforms: ["PC"], cover: "from-amber-700 to-yellow-500", releaseYear: 2024, activePlayers: 95000, peakPlayers: 170000, downloads: 4000000, rating: 4.6, trending: "up", growthPct: 22.5, tags: ["competitive","sweaty"], playerHistory: makeHistory(6, 30000, 7000), description: "Hero shooter MOBA hybrid in closed alpha." },

  // Supercell
  { id: "brawl", slug: "brawl-stars", title: "Brawl Stars", studioId: "supercell", genre: "Battle Royale", platforms: ["Mobile"], cover: "from-yellow-400 to-amber-500", releaseYear: 2018, activePlayers: 800000, peakPlayers: 1300000, downloads: 410000000, rating: 4.6, trending: "hot", growthPct: 14.0, tags: ["addictive","competitive"], playerHistory: makeHistory(7, 500000, 25000), description: "3v3 brawls and battle royale on mobile." },
  { id: "coc", slug: "clash-of-clans", title: "Clash of Clans", studioId: "supercell", genre: "Strategy", platforms: ["Mobile"], cover: "from-amber-500 to-orange-600", releaseYear: 2012, activePlayers: 420000, peakPlayers: 950000, downloads: 1000000000, rating: 4.5, trending: null, growthPct: 0.6, tags: ["addictive","casual"], playerHistory: makeHistory(8, 430000, -1000), description: "Build, raid and clan war the world over." },
  { id: "clashroyale", slug: "clash-royale", title: "Clash Royale", studioId: "supercell", genre: "Card", platforms: ["Mobile"], cover: "from-pink-500 to-rose-600", releaseYear: 2016, activePlayers: 310000, peakPlayers: 700000, downloads: 600000000, rating: 4.3, trending: "down", growthPct: -3.1, tags: ["sweaty","competitive"], playerHistory: makeHistory(9, 380000, -3500), description: "Real-time tower rush card duels." },

  // Ubisoft
  { id: "r6s", slug: "rainbow-six-siege", title: "Rainbow Six Siege", studioId: "ubisoft", genre: "Shooter", platforms: ["PC","PS5","Xbox"], cover: "from-sky-500 to-blue-700", releaseYear: 2015, activePlayers: 240000, peakPlayers: 410000, downloads: 80000000, rating: 4.1, trending: null, growthPct: 0.2, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(10, 245000, -300), description: "Methodical 5v5 destructible-environment tactical shooter." },
  { id: "thedivision2", slug: "the-division-2", title: "The Division 2", studioId: "ubisoft", genre: "RPG", platforms: ["PC","PS5","Xbox"], cover: "from-orange-600 to-rose-700", releaseYear: 2019, activePlayers: 38000, peakPlayers: 110000, downloads: 25000000, rating: 4.0, trending: "down", growthPct: -5.6, tags: ["casual"], playerHistory: makeHistory(11, 60000, -1800), description: "Shared-world looter shooter set in DC." },
  { id: "skullbones", slug: "skull-and-bones", title: "Skull and Bones", studioId: "ubisoft", genre: "RPG", platforms: ["PC","PS5","Xbox"], cover: "from-stone-500 to-slate-700", releaseYear: 2024, activePlayers: 4200, peakPlayers: 60000, downloads: 3000000, rating: 2.9, trending: "dead", growthPct: -28.0, tags: ["casual"], playerHistory: makeHistory(12, 35000, -2500), description: "Pirate naval combat that struggled to find its crew." },

  // Epic
  { id: "fortnite", slug: "fortnite", title: "Fortnite", studioId: "epic", genre: "Battle Royale", platforms: ["PC","PS5","Xbox","Switch","Mobile"], cover: "from-fuchsia-500 to-purple-600", releaseYear: 2017, activePlayers: 2400000, peakPlayers: 6500000, downloads: 700000000, rating: 4.4, trending: "hot", growthPct: 12.7, tags: ["addictive","competitive","esports","casual"], playerHistory: makeHistory(13, 1900000, 38000), description: "Battle royale, sandbox, concert venue and metaverse playground." },
  { id: "fallguys", slug: "fall-guys", title: "Fall Guys", studioId: "epic", genre: "Battle Royale", platforms: ["PC","PS5","Xbox","Switch"], cover: "from-pink-400 to-violet-500", releaseYear: 2020, activePlayers: 95000, peakPlayers: 180000, downloads: 50000000, rating: 4.0, trending: null, growthPct: 1.4, tags: ["casual"], playerHistory: makeHistory(14, 110000, -800), description: "Chaotic obstacle-course party royale." },

  // Activision
  { id: "warzone", slug: "call-of-duty-warzone", title: "Call of Duty: Warzone", studioId: "activision", genre: "Battle Royale", platforms: ["PC","PS5","Xbox"], cover: "from-emerald-600 to-lime-500", releaseYear: 2020, activePlayers: 880000, peakPlayers: 1500000, downloads: 150000000, rating: 4.0, trending: "up", growthPct: 7.2, tags: ["sweaty","competitive"], playerHistory: makeHistory(15, 700000, 16000), description: "Free-to-play battle royale wing of the COD universe." },
  { id: "modernwarfare", slug: "modern-warfare-iii", title: "Modern Warfare III", studioId: "activision", genre: "Shooter", platforms: ["PC","PS5","Xbox"], cover: "from-teal-500 to-emerald-700", releaseYear: 2023, activePlayers: 410000, peakPlayers: 900000, downloads: 30000000, rating: 3.6, trending: "down", growthPct: -4.8, tags: ["competitive"], playerHistory: makeHistory(16, 520000, -3000), description: "Yearly COD entry with multiplayer, campaign and zombies." },

  // Mojang
  { id: "minecraft", slug: "minecraft", title: "Minecraft", studioId: "mojang", genre: "Sandbox", platforms: ["PC","PS5","Xbox","Switch","Mobile"], cover: "from-emerald-500 to-lime-400", releaseYear: 2011, activePlayers: 1850000, peakPlayers: 4200000, downloads: 300000000, rating: 4.7, trending: "hot", growthPct: 5.5, tags: ["addictive","casual"], playerHistory: makeHistory(17, 1500000, 28000), description: "Place blocks. Build worlds. Best-selling game of all time." },

  // Rockstar
  { id: "gtav", slug: "gta-v", title: "Grand Theft Auto V", studioId: "rockstar", genre: "Sandbox", platforms: ["PC","PS5","Xbox"], cover: "from-amber-400 to-rose-500", releaseYear: 2013, activePlayers: 320000, peakPlayers: 700000, downloads: 200000000, rating: 4.6, trending: null, growthPct: 0.9, tags: ["addictive","casual"], playerHistory: makeHistory(18, 330000, -500), description: "Open-world Los Santos and the never-ending Online economy." },
  { id: "rdr2", slug: "red-dead-redemption-2", title: "Red Dead Redemption 2", studioId: "rockstar", genre: "RPG", platforms: ["PC","PS5","Xbox"], cover: "from-orange-500 to-red-700", releaseYear: 2018, activePlayers: 45000, peakPlayers: 85000, downloads: 60000000, rating: 4.8, trending: null, growthPct: 1.2, tags: ["casual"], playerHistory: makeHistory(19, 47000, -200), description: "Cinematic Western opus from Rockstar." },

  // EA
  { id: "apex", slug: "apex-legends", title: "Apex Legends", studioId: "ea", genre: "Battle Royale", platforms: ["PC","PS5","Xbox","Switch"], cover: "from-slate-400 to-rose-600", releaseYear: 2019, activePlayers: 380000, peakPlayers: 630000, downloads: 130000000, rating: 4.2, trending: "down", growthPct: -6.1, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(20, 460000, -4500), description: "Hero battle royale with a slick movement system." },
  { id: "fc25", slug: "ea-fc-25", title: "EA FC 25", studioId: "ea", genre: "Sports", platforms: ["PC","PS5","Xbox","Switch"], cover: "from-slate-300 to-blue-600", releaseYear: 2024, activePlayers: 520000, peakPlayers: 940000, downloads: 25000000, rating: 3.8, trending: "up", growthPct: 9.6, tags: ["competitive","casual"], playerHistory: makeHistory(21, 350000, 15000), description: "FIFA's heir. Ultimate Team carries on." },
  { id: "thesims4", slug: "the-sims-4", title: "The Sims 4", studioId: "ea", genre: "Sim", platforms: ["PC","PS5","Xbox"], cover: "from-emerald-400 to-cyan-500", releaseYear: 2014, activePlayers: 290000, peakPlayers: 520000, downloads: 70000000, rating: 4.1, trending: null, growthPct: 0.4, tags: ["addictive","casual"], playerHistory: makeHistory(22, 295000, -100), description: "Life simulator with an endless DLC catalogue." },

  // Nintendo
  { id: "smashbros", slug: "super-smash-bros-ultimate", title: "Super Smash Bros. Ultimate", studioId: "nintendo", genre: "Sports", platforms: ["Switch"], cover: "from-yellow-400 to-red-600", releaseYear: 2018, activePlayers: 180000, peakPlayers: 380000, downloads: 36000000, rating: 4.7, trending: null, growthPct: 1.5, tags: ["competitive","esports"], playerHistory: makeHistory(23, 175000, 400), description: "The ultimate platform fighter crossover." },
  { id: "totk", slug: "tears-of-the-kingdom", title: "Zelda: Tears of the Kingdom", studioId: "nintendo", genre: "RPG", platforms: ["Switch"], cover: "from-emerald-400 to-amber-500", releaseYear: 2023, activePlayers: 160000, peakPlayers: 410000, downloads: 22000000, rating: 4.9, trending: null, growthPct: 0.8, tags: ["casual"], playerHistory: makeHistory(24, 165000, -200), description: "Hyrule reimagined with sky islands and fuse mechanics." },

  // HoYoverse
  { id: "genshin", slug: "genshin-impact", title: "Genshin Impact", studioId: "miHoYo", genre: "RPG", platforms: ["PC","PS5","Mobile"], cover: "from-cyan-400 to-violet-500", releaseYear: 2020, activePlayers: 720000, peakPlayers: 1900000, downloads: 200000000, rating: 4.5, trending: "up", growthPct: 4.7, tags: ["addictive","casual"], playerHistory: makeHistory(25, 600000, 12000), description: "Open-world gacha action RPG with a stacked roster." },
  { id: "starrail", slug: "honkai-star-rail", title: "Honkai: Star Rail", studioId: "miHoYo", genre: "RPG", platforms: ["PC","Mobile"], cover: "from-indigo-500 to-purple-600", releaseYear: 2023, activePlayers: 480000, peakPlayers: 1100000, downloads: 90000000, rating: 4.6, trending: "hot", growthPct: 13.8, tags: ["addictive"], playerHistory: makeHistory(26, 320000, 14000), description: "Turn-based gacha JRPG by HoYoverse." },
  { id: "zzz", slug: "zenless-zone-zero", title: "Zenless Zone Zero", studioId: "miHoYo", genre: "RPG", platforms: ["PC","Mobile"], cover: "from-pink-500 to-amber-400", releaseYear: 2024, activePlayers: 230000, peakPlayers: 540000, downloads: 35000000, rating: 4.3, trending: "up", growthPct: 18.2, tags: ["addictive","competitive"], playerHistory: makeHistory(27, 150000, 8000), description: "Stylish urban action gacha." },

  // Krafton
  { id: "pubg", slug: "pubg-battlegrounds", title: "PUBG: Battlegrounds", studioId: "krafton", genre: "Battle Royale", platforms: ["PC","PS5","Xbox","Mobile"], cover: "from-yellow-500 to-rose-600", releaseYear: 2017, activePlayers: 410000, peakPlayers: 3200000, downloads: 1100000000, rating: 4.0, trending: "down", growthPct: -3.4, tags: ["sweaty","competitive","esports"], playerHistory: makeHistory(28, 460000, -2500), description: "The original 100-player battle royale." },

  // Cult / dying
  { id: "anthem", slug: "anthem", title: "Anthem", studioId: "ea", genre: "RPG", platforms: ["PC","PS5","Xbox"], cover: "from-slate-600 to-zinc-700", releaseYear: 2019, activePlayers: 180, peakPlayers: 60000, downloads: 5000000, rating: 2.4, trending: "dead", growthPct: -45.0, tags: ["casual"], playerHistory: makeHistory(29, 1200, -120), description: "Once-promising looter shooter, abandoned mid-rework." },
  { id: "lawbreakers", slug: "lawbreakers", title: "LawBreakers", studioId: "epic", genre: "Shooter", platforms: ["PC"], cover: "from-stone-500 to-zinc-700", releaseYear: 2017, activePlayers: 8, peakPlayers: 7500, downloads: 600000, rating: 3.0, trending: "dead", growthPct: -60.0, tags: ["competitive"], playerHistory: makeHistory(30, 50, -8), description: "Cult-favorite arena FPS that went silent." },
];

export const getGameById = (id: string) => GAMES.find(g => g.id === id);
export const getGameBySlug = (slug: string) => GAMES.find(g => g.slug === slug);
export const getGamesByStudio = (studioId: string) => GAMES.filter(g => g.studioId === studioId);
