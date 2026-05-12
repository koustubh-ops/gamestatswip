import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Studio } from "@/data/types";
import { GAMES } from "@/data/games";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function StudioCard({ studio, index = 0 }: { studio: Studio; index?: number }) {
  const games = GAMES.filter(g => g.studioId === studio.id);
  const totalPlayers = games.reduce((s, g) => s + g.activePlayers, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        to="/studios/$studioSlug"
        params={{ studioSlug: studio.slug }}
        className="flex h-full flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="h-12 w-12 rounded-md bg-secondary border border-border flex items-center justify-center shrink-0">
            <BrandLogo id={studio.id} kind="studio" className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-base truncate">{studio.name}</h3>
            <span className="text-xs text-muted-foreground">{studio.country} · est. {studio.founded}</span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground line-clamp-2">{studio.description}</p>
          <div className="flex items-center justify-between pt-3 mt-auto text-xs border-t border-border/60 -mx-4 px-4">
            <span className="text-muted-foreground">{games.length} titles</span>
            <span className="text-foreground font-semibold">{(totalPlayers/1_000_000).toFixed(1)}M active</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
