import { createFileRoute, notFound } from "@tanstack/react-router";
import { Trophy, Users, Gamepad2, MapPin } from "lucide-react";
import { getStudioBySlug } from "@/data/studios";
import { getGamesByStudio } from "@/data/games";
import { StatTile } from "@/components/stats/StatTile";
import { AnimatedCounter, formatCompact } from "@/components/stats/AnimatedCounter";
import { PlayerTrendChart } from "@/components/charts/PlayerTrendChart";
import { GenreBreakdown } from "@/components/charts/GenreBreakdown";
import { GameCard } from "@/components/game/GameCard";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LivePlayers } from "@/components/stats/LivePlayers";
import { Download } from "lucide-react";

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

      {/* Live breakdown table: per-game live players + lifetime downloads */}
      <section className="mt-12">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display font-bold text-2xl">Live breakdown</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-ping opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            updating live
          </span>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40">
            <div className="col-span-6 sm:col-span-5">Game</div>
            <div className="col-span-2 hidden sm:block">Genre</div>
            <div className="col-span-3 sm:col-span-2 text-right">Live now</div>
            <div className="col-span-3 sm:col-span-3 text-right flex items-center justify-end gap-1"><Download className="h-3 w-3" /> Downloads</div>
          </div>
          {[...games].sort((a,b) => b.activePlayers - a.activePlayers).map((g, i) => (
            <Link
              key={g.id}
              to="/games/$gameId"
              params={{ gameId: g.slug }}
              className="grid grid-cols-12 items-center px-4 py-3 hover:bg-secondary/40 transition-colors border-b border-border/30 last:border-0"
            >
              <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${g.cover} grid place-items-center`}>
                  <BrandLogo id={g.id} kind="game" genre={g.genre} className="h-5 w-5" />
                </div>
                <span className="font-medium truncate">{g.title}</span>
              </div>
              <div className="col-span-2 hidden sm:block text-xs text-muted-foreground">{g.genre}</div>
              <div className="col-span-3 sm:col-span-2 text-right font-display text-primary">
                <LivePlayers base={g.activePlayers} seed={i + 1} steamAppId={g.steamAppId} />
              </div>
              <div className="col-span-3 sm:col-span-3 text-right font-display text-accent">
                {formatCompact(g.downloads)}
              </div>
            </Link>
          ))}
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
