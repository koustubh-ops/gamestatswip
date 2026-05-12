import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, CornerDownLeft } from "lucide-react";
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
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return null;

    const MAX = 2;

    const bestGame = GAMES
      .map(g => ({ g, s: score(g.title, term) }))
      .filter(x => x.s <= MAX)
      .sort((a, b) => a.s - b.s)[0];

    const bestStudio = STUDIOS
      .map(s => ({ s, sc: score(s.name, term) }))
      .filter(x => x.sc <= MAX)
      .sort((a, b) => a.sc - b.sc)[0];

    if (!bestGame && !bestStudio) return { games: [], studios: [] };
    if (bestGame && (!bestStudio || bestGame.s <= bestStudio.sc)) {
      return { games: [bestGame.g], studios: [] };
    }
    return { games: [], studios: [bestStudio!.s] };
  }, [q]);

  function go() {
    if (!results) return;
    const game = results.games[0];
    const studio = results.studios[0];
    if (game) {
      setQ("");
      navigate({ to: "/games/$gameId", params: { gameId: game.slug } });
    } else if (studio) {
      setQ("");
      navigate({ to: "/studios/$studioSlug", params: { studioSlug: studio.slug } });
    }
  }

  return (
    <div className={`relative ${compact ? "w-full max-w-sm" : "w-full max-w-xl"}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              go();
            } else if (e.key === "Escape") {
              setQ("");
            }
          }}
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
              <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/70" />
            </Link>
          ))}
          {results.studios.map(s => (
            <Link key={s.id} to="/studios/$studioSlug" params={{ studioSlug: s.slug }} onClick={() => setQ("")} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/60">
              <div className="h-8 w-8 rounded bg-secondary grid place-items-center shrink-0">
                <BrandLogo id={s.id} kind="studio" className="h-5 w-5" />
              </div>
              <span className="text-sm flex-1 truncate">{s.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Studio</span>
              <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/70" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
