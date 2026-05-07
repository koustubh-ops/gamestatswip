import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  accent?: "primary" | "accent" | "success" | "warning" | "destructive";
}

const accentRing: Record<NonNullable<Props["accent"]>, string> = {
  primary: "ring-primary/40",
  accent: "ring-accent/40",
  success: "ring-success/40",
  warning: "ring-warning/40",
  destructive: "ring-destructive/40",
};

export function StatTile({ label, icon, children, accent = "primary" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-2xl p-5 ring-1 ${accentRing[accent]} relative overflow-hidden group`}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition" />
      <div className="relative flex items-start gap-3">
        {icon && <div className="text-primary text-2xl">{icon}</div>}
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl md:text-3xl font-display font-bold gradient-text">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
