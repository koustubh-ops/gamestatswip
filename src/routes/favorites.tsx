import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "@/data/favorites";
import { GAMES } from "@/data/games";
import { GameGrid } from "@/components/game/GameGrid";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — Gamestats" },
      { name: "description", content: "Your favorited games, saved locally for quick access." },
      { property: "og:title", content: "Your Favorite Games" },
      { property: "og:description", content: "Quickly jump back into the games you've pinned on Gamestats." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favs = useFavorites();
  const games = GAMES.filter(g => favs.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl flex items-center gap-3">
          <Heart className="h-7 w-7 text-destructive fill-current" /> Your Favorites
        </h1>
        <p className="text-muted-foreground mt-2">{games.length} game{games.length === 1 ? "" : "s"} pinned.</p>
      </header>

      {games.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-muted-foreground mb-4">No favorites yet — tap the heart on any game to save it.</p>
          <Link to="/games" className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground glow-primary">Browse games</Link>
        </div>
      ) : (
        <GameGrid games={games} />
      )}
    </div>
  );
}
