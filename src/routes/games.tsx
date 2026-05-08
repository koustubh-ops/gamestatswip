import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GAMES } from "@/data/games";
import { STUDIOS } from "@/data/studios";
import { GameGrid } from "@/components/game/GameGrid";
import type { Genre, Platform } from "@/data/types";

const PLATFORMS: Platform[] = ["PC","PS5","Xbox","Switch","Mobile"];
const GENRES: Genre[] = ["Shooter","MOBA","Battle Royale","RPG","Strategy","Sandbox","Sports","Sim","Card","MMO"];
type Sort = "active" | "peak" | "rating" | "downloads";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Browse Games — Gamestats" },
      { name: "description", content: "Explore every tracked game with filters by platform, genre and studio. Sort by active players, downloads and rating." },
      { property: "og:title", content: "Browse Games — Gamestats" },
      { property: "og:description", content: "Explore every tracked game. Filter by platform, genre, studio. Sort by players or rating." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [studio, setStudio] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("active");

  const games = useMemo(() => {
    let g = [...GAMES];
    if (platform !== "all") g = g.filter(x => x.platforms.includes(platform));
    if (genre !== "all") g = g.filter(x => x.genre === genre);
    if (studio !== "all") g = g.filter(x => x.studioId === studio);
    g.sort((a, b) => {
      if (sort === "active") return b.activePlayers - a.activePlayers;
      if (sort === "peak") return b.peakPlayers - a.peakPlayers;
      if (sort === "rating") return b.rating - a.rating;
      return b.downloads - a.downloads;
    });
    return g;
  }, [platform, genre, studio, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl">All Games</h1>
        <p className="text-muted-foreground mt-2">{games.length} titles tracked across the gaming universe.</p>
      </header>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select label="Platform" value={platform} onChange={v => setPlatform(v as Platform | "all")} options={[["all", "All platforms"], ...PLATFORMS.map(p => [p, p] as [string, string])]} />
        <Select label="Genre" value={genre} onChange={v => setGenre(v as Genre | "all")} options={[["all", "All genres"], ...GENRES.map(g => [g, g] as [string, string])]} />
        <Select label="Studio" value={studio} onChange={setStudio} options={[["all", "All studios"], ...STUDIOS.map(s => [s.id, s.name] as [string, string])]} />
        <Select label="Sort by" value={sort} onChange={v => setSort(v as Sort)} options={[["active", "Active players"], ["peak", "Peak players"], ["rating", "Rating"], ["downloads", "Downloads"]]} />
      </div>

      <GameGrid games={games} />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="text-xs">
      <span className="block text-muted-foreground uppercase tracking-widest mb-1">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
