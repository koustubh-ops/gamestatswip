import {
  Crosshair, Swords, Skull, Sword, Globe2, Castle, Boxes,
  Trophy, Car, Cpu, Puzzle, Spade, Gamepad2,
} from "lucide-react";
import type { Genre } from "@/data/types";

// Map a game genre to a representative icon. Keeps cards readable at a glance.
const MAP: Record<Genre, React.ComponentType<{ className?: string }>> = {
  Shooter: Crosshair,
  MOBA: Swords,
  "Battle Royale": Skull,
  RPG: Sword,
  MMO: Globe2,
  Strategy: Castle,
  Sandbox: Boxes,
  Sports: Trophy,
  Racing: Car,
  Sim: Cpu,
  Puzzle: Puzzle,
  Card: Spade,
};

export function GameIcon({ genre, className = "h-5 w-5" }: { genre: Genre; className?: string }) {
  const Icon = MAP[genre] ?? Gamepad2;
  return <Icon className={className} />;
}
