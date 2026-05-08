import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Studio } from "@/data/types";
import { GAMES } from "@/data/games";
import { StudioIcon } from "@/components/ui/StudioIcon";

export function StudioCard({ studio, index = 0 }: { studio: Studio; index?: number }) {
  const games = GAMES.filter(g => g.studioId === studio.id);
  const totalPlayers = games.reduce((s, g) => s + g.activePlayers, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4 }}
    >
      <Link
        to="/studios/$studioSlug"
        params={{ studioSlug: studio.slug }}
        className="block glass rounded-2xl overflow-hidden group hover:glow-accent transition-shadow"
      >
        <div className={`relative h-24 bg-gradient-to-br ${studio.banner}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.22),transparent_60%)]" />
          <div className="absolute right-3 top-3 text-white/40">
            <StudioIcon studioId={studio.id} className="h-10 w-10" />
          </div>
          <div className="absolute -bottom-6 left-4 h-12 w-12 rounded-xl glass flex items-center justify-center" style={{ color: studio.logoColor }}>
            <StudioIcon studioId={studio.id} className="h-6 w-6" />
          </div>
        </div>
        <div className="pt-8 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">{studio.name}</h3>
            <span className="text-xs text-muted-foreground">{studio.country}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{studio.description}</p>
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-muted-foreground">{games.length} titles</span>
            <span className="text-primary font-semibold">{(totalPlayers/1_000_000).toFixed(1)}M active</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
