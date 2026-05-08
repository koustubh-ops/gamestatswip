import { createFileRoute } from "@tanstack/react-router";
import { STUDIOS } from "@/data/studios";
import { StudioCard } from "@/components/studio/StudioCard";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Game Studios — Gamestats" },
      { name: "description", content: "Explore the studios shaping modern gaming. Riot, Valve, Supercell, Ubisoft and more." },
      { property: "og:title", content: "Game Studios on Gamestats" },
      { property: "og:description", content: "The biggest names in gaming, ranked by active footprint." },
    ],
  }),
  component: StudiosPage,
});

function StudiosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl">Game Studios</h1>
        <p className="text-muted-foreground mt-2">{STUDIOS.length} studios tracked.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {STUDIOS.map((s, i) => <StudioCard key={s.id} studio={s} index={i} />)}
      </div>
    </div>
  );
}
