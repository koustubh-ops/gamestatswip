import { Flame, TrendingUp, TrendingDown, Skull } from "lucide-react";
import { motion } from "framer-motion";
import type { Game } from "@/data/types";

// Animated, high-visibility status pill. The glow pulses for "hot" / "rising"
// and fades for "cooling" / "dead" to telegraph momentum at a glance.
export function TrendingBadge({ trending }: { trending: Game["trending"] }) {
  if (!trending) return null;
  const cfg = {
    hot:  { icon: Flame,        cls: "bg-destructive text-destructive-foreground border-destructive shadow-[0_0_18px_color-mix(in_oklab,var(--destructive)_55%,transparent)]",  ring: "var(--destructive)",       label: "Hot",     pulse: true },
    up:   { icon: TrendingUp,   cls: "bg-success text-background border-success shadow-[0_0_18px_color-mix(in_oklab,var(--success)_55%,transparent)]",                          ring: "var(--success)",           label: "Rising",  pulse: true },
    down: { icon: TrendingDown, cls: "bg-warning text-background border-warning shadow-[0_0_14px_color-mix(in_oklab,var(--warning)_45%,transparent)]",                          ring: "var(--warning)",           label: "Cooling", pulse: false },
    dead: { icon: Skull,        cls: "bg-muted text-foreground border-border opacity-90",                                                                                       ring: "var(--muted-foreground)",  label: "Dead",    pulse: false },
  }[trending];
  const Icon = cfg.icon;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className={`relative inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cfg.cls}`}
    >
      {cfg.pulse && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 0 ${cfg.ring}` }}
          animate={{ boxShadow: [`0 0 0 0 ${cfg.ring}`, `0 0 0 10px transparent`] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.span
        className="relative inline-flex"
        animate={cfg.pulse ? { scale: [1, 1.18, 1], rotate: trending === "hot" ? [0, -8, 8, 0] : 0 } : trending === "dead" ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: trending === "dead" ? 2.4 : 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-3.5 w-3.5" />
      </motion.span>
      <span className="relative">{cfg.label}</span>
    </motion.span>
  );
}
