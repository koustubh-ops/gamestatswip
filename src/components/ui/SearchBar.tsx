import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { GAMES } from "@/data/games";
import { STUDIOS } from "@/data/studios";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return null;
    const term = q.toLowerCase();
    const games = GAMES.filter(g => g.title.toLowerCase().includes(term)).slice(0, 6);
    const studios = STUDIOS.filter(s => s.name.toLowerCase().includes(term)).slice(0, 4);
    return { games, studios };
  }, [q]);

  return (
    <div className={`relative ${compact ? "w-full max-w-sm" : "w-full max-w-xl"}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search games, studios..."
          className="w-full glass rounded-full pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition"
        />
        {q && (
          <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {results && (
        <div className="absolute z-50 mt-2 w-full glass rounded-2xl p-2 shadow-2xl max-h-96 overflow-auto">
          {results.games.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pt-1">Games</div>
              {results.games.map(g => (
                <Link key={g.id} to="/games/$gameId" params={{ gameId: g.slug }} onClick={() => setQ("")} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                  <div className={`h-7 w-7 rounded-md bg-gradient-to-br ${g.cover}`} />
                  <span className="text-sm flex-1 truncate">{g.title}</span>
                  <span className="text-[10px] text-muted-foreground">{g.genre}</span>
                </Link>
              ))}
            </div>
          )}
          {results.studios.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pt-2">Studios</div>
              {results.studios.map(s => (
                <Link key={s.id} to="/studios/$studioSlug" params={{ studioSlug: s.slug }} onClick={() => setQ("")} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                  <div className={`h-7 w-7 rounded-md bg-gradient-to-br ${s.banner}`} />
                  <span className="text-sm flex-1 truncate">{s.name}</span>
                </Link>
              ))}
            </div>
          )}
          {results.games.length === 0 && results.studios.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No matches.</div>
          )}
        </div>
      )}
    </div>
  );
}
