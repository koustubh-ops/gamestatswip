import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { formatCompact } from "@/components/stats/AnimatedCounter";
import { getSteamPlayers } from "@/lib/steam.functions";

// Refresh interval for the real Steam concurrent player count.
const STEAM_POLL_MS = 60_000;

// "Live" player count.
//   - If the game has a Steam appId we fetch the real concurrent player count
//     from Steam's public API (no key required) and refresh every minute.
//   - Otherwise we wiggle around the curated `base` value with a deterministic
//     drift so the number still feels alive.
export function LivePlayers({
  base,
  seed = 0,
  steamAppId,
  className = "",
  showUpdated = false,
}: {
  base: number;
  seed?: number;
  steamAppId?: number;
  className?: string;
  showUpdated?: boolean;
}) {
  const fetchSteam = useServerFn(getSteamPlayers);

  // Real Steam fetch (only when we have an appId)
  const { data: steamData } = useQuery({
    queryKey: ["steam-players", steamAppId],
    queryFn: () => fetchSteam({ data: { appIds: [steamAppId!] } }),
    enabled: !!steamAppId,
    refetchInterval: STEAM_POLL_MS,
    staleTime: STEAM_POLL_MS / 2,
  });

  const steamCount = steamAppId ? steamData?.players?.[steamAppId] : undefined;
  const isLive = typeof steamCount === "number";

  // Drift simulation (used as fallback OR layered on top of the real number
  // between Steam refreshes so it still feels alive)
  const [value, setValue] = useState(base);
  useEffect(() => {
    setValue(isLive ? steamCount! : base);
  }, [base, isLive, steamCount]);

  useEffect(() => {
    let i = seed;
    const id = setInterval(() => {
      i++;
      setValue((v) => {
        const anchor = isLive ? steamCount! : base;
        const drift = Math.sin(i * 1.3 + seed) * 0.0015 + (Math.random() - 0.45) * 0.002;
        return Math.max(1, Math.round(anchor + anchor * drift + (v - anchor) * 0.5));
      });
    }, 2200 + (seed % 7) * 120);
    return () => clearInterval(id);
  }, [base, seed, isLive, steamCount]);

  // "Updated Xs ago" timer
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!showUpdated) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [showUpdated]);
  const updatedAt = steamData?.fetchedAt;
  const ago = updatedAt ? Math.max(0, Math.floor((now - updatedAt) / 1000)) : null;

  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <span className="relative inline-flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-success"
            animate={{ opacity: [0.6, 0.15, 0.6], scale: [1, 1.9, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <motion.span
          key={value}
          initial={{ opacity: 0.4, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="tabular-nums"
        >
          {formatCompact(value)}
        </motion.span>
      </span>
      {showUpdated && (
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/80 mt-0.5">
          {isLive
            ? `Steam · ${ago ?? 0}s ago`
            : "Estimated"}
        </span>
      )}
    </span>
  );
}
