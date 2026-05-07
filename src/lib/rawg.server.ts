// Optional RAWG fetch helper. Server-only — never imported in client.
// Returns null if no API key configured so callers fall back to mock.
export interface RawgGame {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  ratings_count: number;
  genres: { name: string }[];
  platforms?: { platform: { name: string } }[];
}

export async function fetchRawgTrending(): Promise<RawgGame[] | null> {
  const key = process.env.RAWG_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-added&page_size=12`);
    if (!res.ok) return null;
    const json = await res.json() as { results: RawgGame[] };
    return json.results;
  } catch (e) {
    console.error("[rawg] fetch failed", e);
    return null;
  }
}
