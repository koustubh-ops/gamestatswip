import { Link, useLocation } from "@tanstack/react-router";
import { Gamepad2, Heart } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/studios", label: "Studios" },
  { to: "/rankings", label: "Rankings" },
] as const;

export function Navbar() {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div>
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-7 w-7 rounded-md bg-foreground grid place-items-center">
              <Gamepad2 className="h-4 w-4 text-background" />
            </div>
            <span className="font-display font-semibold text-base tracking-tight">
              Gamestats
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 ml-4">
            {links.map(l => {
              const active = loc.pathname === l.to || (l.to !== "/" && loc.pathname.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex-1 hidden md:block">
            <SearchBar compact />
          </div>

          <Link to="/favorites" aria-label="Favorites" className="glass rounded-full p-2 hover:glow-accent transition">
            <Heart className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </nav>
        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
