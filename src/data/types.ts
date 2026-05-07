// Shared types for PlayerPulse mock + API data
export type Platform = "PC" | "PS5" | "Xbox" | "Switch" | "Mobile" | "Web";
export type Genre =
  | "Shooter" | "MOBA" | "Battle Royale" | "RPG" | "MMO" | "Strategy"
  | "Sandbox" | "Sports" | "Racing" | "Sim" | "Puzzle" | "Card";

export interface Studio {
  id: string;
  name: string;
  slug: string;
  country: string;
  founded: number;
  banner: string; // gradient class or hex pair
  logoColor: string; // accent color
  description: string;
  popularGenres: Genre[];
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  studioId: string;
  genre: Genre;
  platforms: Platform[];
  cover: string; // gradient pair
  releaseYear: number;
  activePlayers: number;     // current 24h
  peakPlayers: number;
  downloads: number;         // estimated lifetime installs
  rating: number;            // 0-5
  trending: "up" | "down" | "hot" | "dead" | null;
  growthPct: number;         // week-over-week %
  tags: ("sweaty" | "addictive" | "casual" | "competitive" | "esports")[];
  playerHistory: { month: string; players: number }[];
  description: string;
}
