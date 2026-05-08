import { createFileRoute } from "@tanstack/react-router";
import { topActive, topDownloads, fastestGrowing, deadGames, sweatyLobbies, mostAddictive } from "@/data/rankings";
import { RankingList, metricActive, metricDownloads, metricGrowth } from "@/components/rankings/RankingList";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "Rankings — Gamestats" },
      { name: "description", content: "Top active games, fastest growing titles, dead lobbies, sweaty matches and the most addictive games — ranked." },
      { property: "og:title", content: "Game Rankings on Gamestats" },
      { property: "og:description", content: "Top active, fastest growing, most addictive and the saddest dead games — ranked weekly." },
    ],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl">Live Rankings</h1>
        <p className="text-muted-foreground mt-2">The pulse, ranked. Updated continuously from our tracked datasets.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <RankingList title="Top Active Games"      emoji="🎮" games={topActive()}      metric={metricActive}    metricLabel="Active"   accent="var(--primary)" />
        <RankingList title="Fastest Growing"       emoji="🚀" games={fastestGrowing()} metric={metricGrowth}    metricLabel="WoW"      accent="var(--success)" />
        <RankingList title="Most Downloaded"       emoji="📥" games={topDownloads()}   metric={metricDownloads} metricLabel="Lifetime" accent="var(--accent)" />
        <RankingList title="Dead Games"            emoji="💀" games={deadGames()}      metric={metricActive}    metricLabel="Active"   accent="var(--muted-foreground)" />
        <RankingList title="Sweaty Lobbies"        emoji="🔥" games={sweatyLobbies()}  metric={metricActive}    metricLabel="Tryhards" accent="var(--destructive)" />
        <RankingList title="Most Addictive"        emoji="☠️" games={mostAddictive()}  metric={metricActive}    metricLabel="Hooked"   accent="var(--warning)" />
      </div>
    </div>
  );
}
