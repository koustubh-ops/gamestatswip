import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Users } from "lucide-react";
import type { Game } from "@/data/types";
import { getStudioById } from "@/data/studios";
import { PlatformIcons } from "@/components/ui/PlatformIcons";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { RatingStars } from "@/components/ui/RatingStars";
import { GameIcon } from "@/components/ui/GameIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { formatCompact } from "@/components/stats/AnimatedCounter";
import { LivePlayers } from "@/components/stats/LivePlayers";
import { useFavorites, toggleFavorite } from "@/data/favorites";
import { toast } from "sonner";

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const studio = getStudioById(game.studioId);
  const favs = useFavorites();
  const isFav = favs.includes(game.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative"
    >
      <Link
        to="/games/$gameId"
        params={{ gameId: game.slug }}
        className="block bg-card border border-border rounded-lg overflow-hidden hover:border-foreground/20 transition-colors"
      >
        <div className="relative h-32 bg-secondary/40 border-b border-border overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <BrandLogo id={game.id} kind="game" genre={game.genre} className="h-12 w-12 opacity-80" />
          </div>
          <div className="absolute top-2 left-2"><TrendingBadge trending={game.trending} /></div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const next = toggleFavorite(game.id);
              toast.success(next ? `Added ${game.title} to favorites` : `Removed ${game.title}`);
            }}
            aria-label="Toggle favorite"
            className="absolute top-2 right-2 rounded-full bg-background/60 backdrop-blur p-1.5 hover:bg-background/90 transition"
          >
            <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
          </button>
          <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-background/90 to-transparent">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <GameIcon genre={game.genre} className="h-3 w-3" />
              {game.genre}
            </div>
            <div className="font-display font-semibold truncate">{game.title}</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
              {studio && <BrandLogo id={studio.id} kind="studio" className="h-3.5 w-3.5" />}
              {studio?.name}
            </span>
            <RatingStars rating={game.rating} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md bg-secondary/40 border border-border/60 p-2">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Live now</div>
              <div className="font-display text-foreground text-base"><LivePlayers base={game.activePlayers} seed={index + 1} steamAppId={game.steamAppId} showUpdated /></div>
            </div>
            <div className="rounded-md bg-secondary/40 border border-border/60 p-2">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Peak</div>
              <div className="font-display text-accent text-base">{formatCompact(game.peakPlayers)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <PlatformIcons platforms={game.platforms} />
            <span className={`text-xs font-semibold ${game.growthPct >= 0 ? "text-success" : "text-destructive"}`}>
              {game.growthPct >= 0 ? "+" : ""}{game.growthPct.toFixed(1)}%
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
