import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { GAMES } from "@/data/games";
import { STUDIOS } from "@/data/studios";
import { BrandLogo } from "./BrandLogo";

// Score: exact > startsWith > word-boundary includes > substring includes
function score(name: string, term: string) {
  const n = name.toLowerCase();
  if (n === term) return 0;
  if (n.startsWith(term)) return 1;
  if (n.split(/\s+/).some(w => w.startsWith(term))) return 2;
  if (n.includes(term)) return 3;
  return 99;
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return null;

    const games = GAMES
      .map(g => ({ g, s: score(g.title, term) }))
      .filter(x => x.s < 99)
      .sort((a, b) => a.s - b.s)
      .map(x => x.g);

    const studios = STUDIOS
      .map(s => ({ s, sc: score(s.name, term) }))
      .filter(x => x.sc < 99)
      .sort((a, b) => a.sc - b.sc)
      .map(x => x.s);

    // Strict mode: show only the single best match across games + studios.
    const topGame = games[0] ? score(games[0].title, term) : 99;
    const topStudio = studios[0] ? score(studios[0].name, term) : 99;

    if (topGame === 99 && topStudio === 99) return { games: [], studios: [] };
    if (topGame <= topStudio) return { games: games.slice(0, 1), studios: [] };
    return { games: [], studios: studios.slice(0, 1) };
  }, [q]);

  return (
    <div className={`relative ${compact ? "w-full max-w-sm" : "w-full max-w-xl"}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search games or studios"
          className="w-full bg-card/60 border border-border rounded-md pl-10 pr-10 py-2 text-sm outline-none focus:border-foreground/40 focus:bg-card transition"
        />
        {q && (
          <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {results && (
        <div className="absolute z-50 mt-2 w-full bg-popover border border-border rounded-md p-1 shadow-lg max-h-96 overflow-auto">
          {results.games.length === 0 && results.studios.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No matches.</div>
          )}
          {results.games.map(g => (
            <Link key={g.id} to="/games/$gameId" params={{ gameId: g.slug }} onClick={() => setQ("")} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/60">
              <div className="h-8 w-8 rounded bg-secondary grid place-items-center shrink-0">
                <BrandLogo id={g.id} kind="game" genre={g.genre} className="h-5 w-5" />
              </div>
              <span className="text-sm flex-1 truncate">{g.title}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{g.genre}</span>
            </Link>
          ))}
          {results.studios.map(s => (
            <Link key={s.id} to="/studios/$studioSlug" params={{ studioSlug: s.slug }} onClick={() => setQ("")} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/60">
              <div className="h-8 w-8 rounded bg-secondary grid place-items-center shrink-0">
                <BrandLogo id={s.id} kind="studio" className="h-5 w-5" />
              </div>
              <span className="text-sm flex-1 truncate">{s.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Studio</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
