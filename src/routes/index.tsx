import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Flame, Gamepad2, Users } from "lucide-react";
import { GAMES } from "@/data/games";
import { STUDIOS } from "@/data/studios";
import { trendingNow, featured, topActive } from "@/data/rankings";
import { GameCard } from "@/components/game/GameCard";
import { StudioCard } from "@/components/studio/StudioCard";
import { StatTile } from "@/components/stats/StatTile";
import { AnimatedCounter, formatCompact } from "@/components/stats/AnimatedCounter";
import { SearchBar } from "@/components/ui/SearchBar";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gamestats — Live Gaming Analytics Dashboard" },
      { name: "description", content: "The pulse of every game, studio and trend. Trending titles, active players and rankings — updated live." },
      { property: "og:title", content: "Gamestats — Live Gaming Analytics" },
      { property: "og:description", content: "Track trending games, top studios and live player counts in one futuristic dashboard." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const totalActive = GAMES.reduce((s, g) => s + g.activePlayers, 0);
  const totalGames = GAMES.length;
  const totalStudios = STUDIOS.length;
  const totalDownloads = GAMES.reduce((s, g) => s + g.downloads, 0);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-20 border-b border-border">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Live across {totalStudios} studios
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            The pulse of every game,
            <span className="text-muted-foreground"> in one place.</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl">
            Track trending titles, active player counts and the studios shaping the meta.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </motion.div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <StatTile label="Active Players" icon={<Users className="h-5 w-5" />} accent="primary">
            <AnimatedCounter value={totalActive} format={formatCompact} />
          </StatTile>
          <StatTile label="Games Tracked" icon={<Gamepad2 className="h-5 w-5" />} accent="accent">
            <AnimatedCounter value={totalGames} />
          </StatTile>
          <StatTile label="Studios" icon={<Activity className="h-5 w-5" />} accent="success">
            <AnimatedCounter value={totalStudios} />
          </StatTile>
          <StatTile label="Lifetime Installs" icon={<Flame className="h-5 w-5" />} accent="warning">
            <AnimatedCounter value={totalDownloads} format={formatCompact} />
          </StatTile>
        </div>
      </section>

      {/* Most played right now */}
      <Section title="Most Played Right Now" subtitle="Live active player counts across PC, console and mobile" link={{ to: "/games", label: "All games" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured().map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>
      </Section>

      {/* Trending */}
      <Section title="Trending Worldwide 🔥" subtitle="Fastest movers this week" link={{ to: "/rankings", label: "Full rankings" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingNow().slice(0, 4).map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>
      </Section>

      {/* Top studios */}
      <Section title="Top Game Studios" subtitle="The biggest names in the industry, ranked by active footprint" link={{ to: "/studios", label: "All studios" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {STUDIOS.slice(0, 8).map((s, i) => <StudioCard key={s.id} studio={s} index={i} />)}
        </div>
      </Section>

      {/* Quick rank */}
      <Section title="Top Active Games" subtitle="The most populated lobbies right now">
        <div className="glass rounded-2xl p-2 md:p-4">
          <ol className="divide-y divide-border/40">
            {topActive().slice(0, 10).map((g, i) => (
              <li key={g.id}>
                <Link to="/games/$gameId" params={{ gameId: g.slug }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/40 transition">
                  <span className="font-display font-bold w-8 text-center text-primary">{String(i+1).padStart(2,"0")}</span>
                  <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${g.cover} flex items-center justify-center p-1.5`}>
                    <BrandLogo id={g.id} kind="game" genre={g.genre} className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{g.title}</div>
                    <div className="text-xs text-muted-foreground">{g.genre}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-primary">{formatCompact(g.activePlayers)}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">active</div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <div className="h-10" />
    </div>
  );
}

function Section({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {link && (
          <Link to={link.to} className="text-sm text-primary hover:underline shrink-0">{link.label} →</Link>
        )}
      </div>
      {children}
    </section>
  );
}
