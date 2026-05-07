import { GAMES } from "./games";
import type { Game } from "./types";

// Derived ranking selectors. Re-computed on import — cheap for ~30 games.
const by = <K extends keyof Game>(key: K, dir: "asc" | "desc" = "desc") =>
  [...GAMES].sort((a, b) => (dir === "desc" ? (b[key] as number) - (a[key] as number) : (a[key] as number) - (b[key] as number)));

export const topActive    = () => by("activePlayers").slice(0, 10);
export const topDownloads = () => by("downloads").slice(0, 10);
export const fastestGrowing = () => by("growthPct").filter(g => g.growthPct > 0).slice(0, 10);
export const deadGames    = () => [...GAMES].filter(g => g.trending === "dead" || g.activePlayers < 5000).sort((a,b) => a.activePlayers - b.activePlayers).slice(0, 10);
export const sweatyLobbies = () => [...GAMES].filter(g => g.tags.includes("sweaty")).sort((a,b) => b.activePlayers - a.activePlayers).slice(0, 10);
export const mostAddictive = () => [...GAMES].filter(g => g.tags.includes("addictive")).sort((a,b) => b.activePlayers - a.activePlayers).slice(0, 10);
export const trendingNow  = () => [...GAMES].filter(g => g.trending === "hot" || g.trending === "up").sort((a,b) => b.growthPct - a.growthPct).slice(0, 8);
export const featured     = () => by("activePlayers").slice(0, 6);
