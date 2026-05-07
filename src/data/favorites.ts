// Local-storage favorites. Tiny event-bus so any component subscribes to changes.
const KEY = "playerpulse:favorites";
const listeners = new Set<() => void>();

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function isFavorite(id: string) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): boolean {
  const cur = getFavorites();
  const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach(l => l());
  return next.includes(id);
}

export function subscribeFavorites(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

import { useEffect, useState } from "react";
export function useFavorites() {
  const [favs, setFavs] = useState<string[]>(() => getFavorites());
  useEffect(() => subscribeFavorites(() => setFavs(getFavorites())), []);
  return favs;
}
