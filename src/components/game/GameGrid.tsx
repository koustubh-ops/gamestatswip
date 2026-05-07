import type { Game } from "@/data/types";
import { GameCard } from "./GameCard";

export function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
        No games match your filters.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {games.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
    </div>
  );
}
