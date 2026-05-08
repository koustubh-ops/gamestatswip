import { createFileRoute, notFound } from "@tanstack/react-router";
import { Trophy, Users, Gamepad2, MapPin } from "lucide-react";
import { getStudioBySlug } from "@/data/studios";
import { getGamesByStudio } from "@/data/games";
import { StatTile } from "@/components/stats/StatTile";
import { AnimatedCounter, formatCompact } from "@/components/stats/AnimatedCounter";
import { PlayerTrendChart } from "@/components/charts/PlayerTrendChart";
import { GenreBreakdown } from "@/components/charts/GenreBreakdown";
import { GameCard } from "@/components/game/GameCard";

export const Route = createFileRoute("/studios/$studioSlug")({
  loader: ({ params }) => {
    const studio = getStudioBySlug(params.studioSlug);
    if (!studio) throw notFound();
    return { studio };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.studio;
    if (!s) return { meta: [{ title: "Studio — Gamestats" }] };
    return {
      meta: [
        { title: `${s.name} — Gamestats` },
        { name: "description", content: `${s.name} games, active players and trends. ${s.description}` },
        { property: "og:title", content: `${s.name} on Gamestats` },
        { property: "og:description", content: s.description },
      ],
    };
  },
  component: StudioDetail,
});

function StudioDetail() {
  const { studio } = Route.useLoaderData();
  const games = getGamesByStudio(studio.id);
  const totalActive = games.reduce((s, g) => s + g.activePlayers, 0);
  const totalDownloads = games.reduce((s, g) => s + g.downloads, 0);
  const topDl = [...games].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  // Aggregate monthly history across studio games
  const months = games[0]?.playerHistory.map(p => p.month) ?? [];
  const aggHistory = months.map((m, i) => ({
    month: m,
    players: games.reduce((sum, g) => sum + (g.playerHistory[i]?.players ?? 0), 0),
  }));

  // Genre breakdown
  const genreMap = new Map<string, number>();
  games.forEach(g => genreMap.set(g.genre, (genreMap.get(g.genre) ?? 0) + g.activePlayers));
  const genreData = [...genreMap.entries()].map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className={`relative rounded-3xl overflow-hidden h-44 md:h-56 bg-gradient-to-br ${studio.banner}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end gap-5">
          <div className="h-20 w-20 rounded-2xl glass grid place-items-center font-display font-extrabold text-3xl glow-primary" style={{ color: studio.logoColor }}>
            {studio.name.split(" ").map((w: string) => w[0]).slice(0,2).join("")}
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white drop-shadow">{studio.name}</h1>
            <div className="flex items-center gap-3 text-sm text-white/80 mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {studio.country}</span>
              <span>· Founded {studio.founded}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-6 max-w-2xl">{studio.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatTile label="Games Published" icon={<Gamepad2 className="h-5 w-5" />} accent="primary">
          <AnimatedCounter value={games.length} />
        </StatTile>
        <StatTile label="Active Players" icon={<Users className="h-5 w-5" />} accent="accent">
          <AnimatedCounter value={totalActive} format={formatCompact} />
        </StatTile>
        <StatTile label="Lifetime Downloads" icon={<Trophy className="h-5 w-5" />} accent="success">
          <AnimatedCounter value={totalDownloads} format={formatCompact} />
        </StatTile>
        <StatTile label="Top Genre" accent="warning">
          <span className="text-xl">{genreData[0]?.name ?? "—"}</span>
        </StatTile>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <h2 className="font-display font-bold text-lg mb-2">Monthly player trend</h2>
          <PlayerTrendChart data={aggHistory} color="var(--accent)" />
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="font-display font-bold text-lg mb-2">Genre breakdown</h2>
          <GenreBreakdown data={genreData} />
        </div>
      </div>

      {/* Top performers */}
      <section className="mt-12">
        <h2 className="font-display font-bold text-2xl mb-5">Top performing games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topDl.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display font-bold text-2xl mb-5">All titles ({games.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {games.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>
      </section>
    </div>
  );
}
