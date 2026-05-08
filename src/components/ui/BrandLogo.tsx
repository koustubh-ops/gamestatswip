import { useState } from "react";
import { GAME_LOGO_SLUGS, STUDIO_LOGO_SLUGS, logoUrl } from "@/data/logos";
import { GameIcon } from "./GameIcon";
import { StudioIcon } from "./StudioIcon";
import type { Genre } from "@/data/types";

// Renders a simpleicons.org brand logo with a graceful lucide-icon fallback.
// Used for both games and studios — pass `kind` to switch the fallback.
type Props = {
  id: string;
  kind: "game" | "studio";
  genre?: Genre;          // required when kind="game" (drives fallback)
  className?: string;     // sizing of the logo wrapper
  color?: string;         // simpleicons color (hex without # or "white")
};

export function BrandLogo({ id, kind, genre, className = "h-6 w-6", color = "white" }: Props) {
  const slug = kind === "game" ? GAME_LOGO_SLUGS[id] : STUDIO_LOGO_SLUGS[id];
  const [failed, setFailed] = useState(false);

  if (slug && !failed) {
    return (
      <img
        src={logoUrl(slug, color)}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${className} object-contain select-none`}
        draggable={false}
      />
    );
  }

  // Fallback to lucide icon
  if (kind === "studio") return <StudioIcon studioId={id} className={className} />;
  return <GameIcon genre={genre ?? "RPG"} className={className} />;
}
