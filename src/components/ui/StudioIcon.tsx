import {
  Crown, Flame, Zap, Shield, Rocket, Target, Pickaxe, Skull,
  Gamepad2, Sparkles, Orbit, Swords,
} from "lucide-react";

// Brand-appropriate lucide icon per studio id. Falls back to a controller.
const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  riot: Swords,
  valve: Zap,
  supercell: Crown,
  ubisoft: Orbit,
  epic: Rocket,
  activision: Target,
  mojang: Pickaxe,
  rockstar: Flame,
  ea: Shield,
  nintendo: Sparkles,
  miHoYo: Sparkles,
  krafton: Skull,
};

export function StudioIcon({ studioId, className = "h-5 w-5" }: { studioId: string; className?: string }) {
  const Icon = MAP[studioId] ?? Gamepad2;
  return <Icon className={className} />;
}
