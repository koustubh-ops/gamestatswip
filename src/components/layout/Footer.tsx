import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-display font-bold tracking-wider text-foreground">PLAYERPULSE</span> — gaming analytics, live.
        </div>
        <div className="flex items-center gap-4">
          <Link to="/games" className="hover:text-foreground">Games</Link>
          <Link to="/studios" className="hover:text-foreground">Studios</Link>
          <Link to="/rankings" className="hover:text-foreground">Rankings</Link>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} PlayerPulse</div>
      </div>
    </footer>
  );
}
