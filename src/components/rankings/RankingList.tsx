import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Game } from "@/data/types";
import { formatCompact } from "@/components/stats/AnimatedCounter";
import { GameIcon } from "@/components/ui/GameIcon";

interface Props {
  title: string;
  emoji?: string;
  games: Game[];
  metric: (g: Game) => string;
  metricLabel: string;
  accent?: string;
}

export function RankingList({ title, emoji, games, metric, metricLabel, accent = "var(--primary)" }: Props) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          {emoji && <span>{emoji}</span>} {title}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{metricLabel}</span>
      </div>
      <ol className="space-y-2">
        {games.slice(0, 8).map((g, i) => (
          <motion.li
            key={g.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to="/games/$gameId"
              params={{ gameId: g.slug }}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/40 transition-colors"
            >
              <span className="font-display font-bold text-sm w-6 text-center" style={{ color: accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`h-8 w-8 rounded-md bg-gradient-to-br ${g.cover} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{g.title}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{g.genre}</div>
              </div>
              <div className="text-sm font-display" style={{ color: accent }}>{metric(g)}</div>
            </Link>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export const metricActive = (g: Game) => formatCompact(g.activePlayers);
export const metricGrowth = (g: Game) => `${g.growthPct >= 0 ? "+" : ""}${g.growthPct.toFixed(1)}%`;
export const metricDownloads = (g: Game) => formatCompact(g.downloads);
