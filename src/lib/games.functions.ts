import { createServerFn } from "@tanstack/react-start";
import { fetchRawgTrending } from "./rawg.server";
import { trendingNow } from "../data/rankings";

// Returns trending games, preferring live RAWG data when an API key is set.
// Falls back gracefully to curated mock data so the UI always renders.
export const getLiveTrending = createServerFn({ method: "GET" }).handler(async () => {
  const live = await fetchRawgTrending();
  if (live) {
    return {
      source: "rawg" as const,
      games: live.map(g => ({
        id: String(g.id),
        title: g.name,
        cover: g.background_image,
        rating: g.rating,
        genre: g.genres[0]?.name ?? "Unknown",
      })),
    };
  }
  return {
    source: "mock" as const,
    games: trendingNow().map(g => ({
      id: g.id, title: g.title, cover: null, rating: g.rating, genre: g.genre,
    })),
  };
});
