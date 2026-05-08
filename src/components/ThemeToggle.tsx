import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setLight(isLight);
  }, []);
  function toggle() {
    const next = !light;
    document.documentElement.classList.toggle("light", next);
    setLight(next);
    try { localStorage.setItem("gamestats:theme", next ? "light" : "dark"); } catch {}
  }
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass rounded-full p-2 hover:glow-primary transition"
    >
      {light ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
