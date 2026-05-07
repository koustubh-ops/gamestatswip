import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Share2, Trophy, Users, Download, Calendar } from "lucide-react";
import { GAMES, getGameBySlug } from "@/data/games";
import { getStudioById } from "@/data/studios";
import { PlayerTrendChart } from "@/components/charts/PlayerTrendChart";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { RatingStars } from "@/components/ui/RatingStars";
import { PlatformIcons } from "@/components/ui/PlatformIcons";
import { StatTile } from "@/components/stats/StatTile";
import { AnimatedCounter, formatCompact } from "@/components/stats/AnimatedCounter";
import { GameCard } from "@/components/game/GameCard";
import { useFavorites, toggleFavorite } from "@/data/favorites";
import { toast } from "sonner";

export const Route = createFileRoute("/games/$gameId")({
  loader: ({ params }) => {
    const game = getGameBySlug(params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.game;
    if (!g) return { meta: [{ title: "Game — PlayerPulse" }] };
    return {
      meta: [
        { title: `${g.title} — PlayerPulse` },
        { name: "description", content: `${g.title}: ${formatCompact(g.activePlayers)} active players, peak ${formatCompact(g.peakPlayers)}. ${g.description}` },
        { property: "og:title", content: `${g.title} on PlayerPulse` },
        { property: "og:description", content: g.description },
      ],
    };
  },
  component: GameDetail,
});

function GameDetail() {
  const { game } = Route.useLoaderData();
  const studio = getStudioById(game.studioId);
  const favs = useFavorites();
  const isFav = favs.includes(game.id);
  const similar = GAMES.filter(g => g.id !== game.id && (g.genre === game.genre || g.studioId === game.studioId)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${game.cover} h-56 md:h-72`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingBadge trending={game.trending} />
                <span className="text-xs text-white/80 uppercase tracking-widest">{game.genre}</span>
              </div>
              <h1 className="font-display font-bold text-3xl md:text-5xl text-white drop-shadow-lg">{game.title}</h1>
              {studio && (
                <Link to="/studios/$studioSlug" params={{ studioSlug: studio.slug }} className="text-sm text-white/80 hover:text-white">
                  by {studio.name}
                </Link>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const next = toggleFavorite(game.id);
                  toast.success(next ? "Added to favorites" : "Removed from favorites");
                }}
                className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:glow-primary transition"
              >
                <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                {isFav ? "Favorited" : "Favorite"}
              </button>
              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied"); }}
                className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatTile label="Active Players" icon={<Users className="h-5 w-5" />} accent="primary">
          <AnimatedCounter value={game.activePlayers} format={formatCompact} />
        </StatTile>
        <StatTile label="Peak Players" icon={<Trophy className="h-5 w-5" />} accent="accent">
          <AnimatedCounter value={game.peakPlayers} format={formatCompact} />
        </StatTile>
        <StatTile label="Downloads" icon={<Download className="h-5 w-5" />} accent="success">
          <AnimatedCounter value={game.downloads} format={formatCompact} />
        </StatTile>
        <StatTile label="Released" icon={<Calendar className="h-5 w-5" />} accent="warning">
          {game.releaseYear}
        </StatTile>
      </div>

      {/* Trend chart + meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-bold text-lg">Player trend (12 months)</h2>
            <span className={`text-sm font-semibold ${game.growthPct >= 0 ? "text-success" : "text-destructive"}`}>
              {game.growthPct >= 0 ? "+" : ""}{game.growthPct.toFixed(1)}% week-over-week
            </span>
          </div>
          <PlayerTrendChart data={game.playerHistory} />
        </div>
        <aside className="glass rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">About</h3>
            <p className="text-sm leading-relaxed">{game.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Meta label="Rating"><RatingStars rating={game.rating} /></Meta>
            <Meta label="Platforms"><PlatformIcons platforms={game.platforms} /></Meta>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {game.tags.map(t => (
                <span key={t} className="text-xs rounded-full bg-secondary/60 px-2.5 py-1 capitalize">{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      <section className="mt-12">
        <h2 className="font-display font-bold text-2xl mb-5">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {similar.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>
      </section>
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}
