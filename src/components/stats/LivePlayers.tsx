import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatCompact } from "@/components/stats/AnimatedCounter";

// "Live" player count — wiggles around the base value every couple of seconds
// using a deterministic seed so different cards drift independently. Pure UI;
// no network calls.
export function LivePlayers({ base, seed = 0, className = "" }: { base: number; seed?: number; className?: string }) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    let i = seed;
    setValue(base);
    const id = setInterval(() => {
      i++;
      // ±0.4% drift, bias slightly positive so it feels alive
      const drift = Math.sin(i * 1.3 + seed) * 0.003 + (Math.random() - 0.45) * 0.004;
      setValue(v => Math.max(1, Math.round(base + base * drift + (v - base) * 0.4)));
    }, 1800 + (seed % 7) * 120);
    return () => clearInterval(id);
  }, [base, seed]);

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
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
  );
}
