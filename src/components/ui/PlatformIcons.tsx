import { Gamepad2, Monitor, Smartphone, Tv, Globe } from "lucide-react";
import type { Platform } from "@/data/types";

const map: Record<Platform, { icon: typeof Monitor; label: string }> = {
  PC:     { icon: Monitor, label: "PC" },
  PS5:    { icon: Gamepad2, label: "PS5" },
  Xbox:   { icon: Gamepad2, label: "Xbox" },
  Switch: { icon: Tv, label: "Switch" },
  Mobile: { icon: Smartphone, label: "Mobile" },
  Web:    { icon: Globe, label: "Web" },
};

export function PlatformIcons({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {platforms.map(p => {
        const Icon = map[p].icon;
        return <Icon key={p} className="h-3.5 w-3.5" aria-label={map[p].label} />;
      })}
    </div>
  );
}
