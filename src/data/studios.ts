import type { Studio } from "./types";

// Curated mock studio data. Banner/logoColor drive the gradient look in the UI.
export const STUDIOS: Studio[] = [
  { id: "riot",    slug: "riot-games",    name: "Riot Games",       country: "USA",     founded: 2006, banner: "from-rose-500 to-amber-400",   logoColor: "#ff4655", description: "Creators of League of Legends, VALORANT and Teamfight Tactics.", popularGenres: ["MOBA", "Shooter", "Card"] },
  { id: "valve",   slug: "valve",         name: "Valve",            country: "USA",     founded: 1996, banner: "from-orange-500 to-red-600",   logoColor: "#f7951d", description: "Steam, Counter-Strike, Dota 2 and Half-Life. The original PC titans.", popularGenres: ["Shooter", "MOBA", "RPG"] },
  { id: "supercell", slug: "supercell",   name: "Supercell",        country: "Finland", founded: 2010, banner: "from-yellow-400 to-orange-500", logoColor: "#facc15", description: "Mobile-first studio behind Clash of Clans, Brawl Stars and Clash Royale.", popularGenres: ["Strategy", "Card", "Battle Royale"] },
  { id: "ubisoft", slug: "ubisoft",       name: "Ubisoft",          country: "France",  founded: 1986, banner: "from-sky-400 to-indigo-500",   logoColor: "#0099ff", description: "Assassin's Creed, Far Cry, Rainbow Six and The Division.", popularGenres: ["Shooter", "RPG", "Sandbox"] },
  { id: "epic",    slug: "epic-games",    name: "Epic Games",       country: "USA",     founded: 1991, banner: "from-fuchsia-500 to-violet-600", logoColor: "#d946ef", description: "Fortnite, Unreal Engine and the Epic Games Store.", popularGenres: ["Battle Royale", "Shooter", "Sandbox"] },
  { id: "activision", slug: "activision", name: "Activision",       country: "USA",     founded: 1979, banner: "from-emerald-500 to-cyan-500", logoColor: "#10b981", description: "Call of Duty, Crash Bandicoot and Tony Hawk.", popularGenres: ["Shooter", "Battle Royale", "Sports"] },
  { id: "mojang",  slug: "mojang",        name: "Mojang",           country: "Sweden",  founded: 2009, banner: "from-lime-500 to-emerald-500", logoColor: "#84cc16", description: "Minecraft and a galaxy of community-built worlds.", popularGenres: ["Sandbox", "Sim"] },
  { id: "rockstar", slug: "rockstar",     name: "Rockstar Games",   country: "USA",     founded: 1998, banner: "from-amber-500 to-rose-600",   logoColor: "#f59e0b", description: "Grand Theft Auto, Red Dead Redemption and the Houser legacy.", popularGenres: ["Sandbox", "RPG"] },
  { id: "ea",      slug: "ea",            name: "Electronic Arts",  country: "USA",     founded: 1982, banner: "from-slate-400 to-slate-700",  logoColor: "#94a3b8", description: "FIFA/EA FC, Apex Legends, Battlefield and The Sims.", popularGenres: ["Sports", "Battle Royale", "Sim"] },
  { id: "nintendo",slug: "nintendo",      name: "Nintendo",         country: "Japan",   founded: 1889, banner: "from-red-500 to-rose-700",     logoColor: "#ef4444", description: "Mario, Zelda, Pokémon and the Switch ecosystem.", popularGenres: ["RPG", "Sports", "Puzzle"] },
  { id: "miHoYo",  slug: "mihoyo",        name: "HoYoverse",        country: "China",   founded: 2011, banner: "from-cyan-400 to-blue-600",    logoColor: "#22d3ee", description: "Genshin Impact, Honkai: Star Rail and Zenless Zone Zero.", popularGenres: ["RPG", "MMO"] },
  { id: "krafton", slug: "krafton",       name: "Krafton",          country: "S. Korea",founded: 2007, banner: "from-yellow-500 to-red-500",   logoColor: "#eab308", description: "PUBG: Battlegrounds and a roster of indie publishing.", popularGenres: ["Battle Royale", "Shooter"] },
];

export const getStudioById = (id: string) => STUDIOS.find(s => s.id === id);
export const getStudioBySlug = (slug: string) => STUDIOS.find(s => s.slug === slug);
