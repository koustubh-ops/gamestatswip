import { Flame, TrendingUp, TrendingDown, Skull } from "lucide-react";
import type { Game } from "@/data/types";

export function TrendingBadge({ trending }: { trending: Game["trending"] }) {
  if (!trending) return null;
  const cfg = {
    hot:  { icon: Flame,        cls: "bg-destructive/15 text-destructive border-destructive/30",       label: "Hot" },
    up:   { icon: TrendingUp,   cls: "bg-success/15 text-success border-success/30",                   label: "Rising" },
    down: { icon: TrendingDown, cls: "bg-warning/15 text-warning border-warning/30",                   label: "Cooling" },
    dead: { icon: Skull,        cls: "bg-muted text-muted-foreground border-border",                   label: "Dead" },
  }[trending];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${cfg.cls}`}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </span>
  );
}
