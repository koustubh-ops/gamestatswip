import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

// Smoothly tweens a number from 0 → value with framer-motion springs.
export function AnimatedCounter({ value, duration = 1.5, format, className }: Props) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 80, duration });
  const [display, setDisplay] = useState("0");

  useEffect(() => { mv.set(value); }, [mv, value]);
  useEffect(() => spring.on("change", v => {
    setDisplay(format ? format(v) : Math.round(v).toLocaleString());
  }), [spring, format]);

  return <motion.span className={className}>{display}</motion.span>;
}

export function formatCompact(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.round(n).toString();
}
