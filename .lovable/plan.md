
# PlayerPulse — Gaming Analytics Web App

A futuristic, dark-themed gaming analytics dashboard tracking studios, games, and trends. Built with TanStack Start + Tailwind + Framer Motion, powered by rich mock data with optional RAWG API integration.

## Scope (v1)

Full UI built against curated mock data so every page works immediately. Lovable Cloud enabled so we can later add favorites/auth and cache live API responses. RAWG integration scaffolded as a server function that falls back to mock data when no API key is set.

## Routes

```
src/routes/
  __root.tsx            shell, theme provider, toaster, nav
  index.tsx             Homepage: hero, search, trending, top studios, most-played
  games.tsx             All games + filters (platform, genre, studio) + sort
  games.$gameId.tsx     Game detail: stats, charts, similar games
  studios.tsx           All studios grid
  studios.$studioId.tsx Studio detail: banner, stats, top games, trends chart
  rankings.tsx          Top Active, Fastest Growing, Most Downloaded, Dead, Sweaty, Addictive
  favorites.tsx         Local-storage favorite games (auth-free in v1)
```

## Design system

- Dark-first theme in `src/styles.css` using oklch tokens
- Neon accents: electric blue `--primary`, violet `--accent`, magenta `--chart-*`
- Glass cards: `--glass-bg`, `--glass-border`, backdrop-blur utility
- Glow shadows: `--shadow-glow-primary`, `--shadow-glow-accent`
- Display font: Orbitron / Space Grotesk (via Google Fonts link in __root)
- Body: Inter
- Animations: framer-motion for hero counters, card hover lift, list staggers; CSS keyframes for ambient glow pulse

## Reusable components (`src/components/`)

- `layout/Navbar.tsx` — sticky glass nav, search, theme toggle
- `layout/Footer.tsx`
- `game/GameCard.tsx` — cover, title, genre, platforms, players, peak, rating, trending badge
- `game/GameGrid.tsx`
- `studio/StudioCard.tsx`
- `stats/AnimatedCounter.tsx` — framer-motion number tween
- `stats/StatTile.tsx` — glass tile with icon
- `charts/PlayerTrendChart.tsx` — recharts area chart
- `charts/GenreBreakdown.tsx` — recharts radial/bar
- `rankings/RankingList.tsx` — numbered list with delta arrows
- `ui/SearchBar.tsx` — global search using fuzzy match over mock data
- `ui/SkeletonCard.tsx` — loading skeletons
- `ui/TrendingBadge.tsx`, `PlatformIcons.tsx`, `RatingStars.tsx`
- `ThemeToggle.tsx` — toggles `dark` class on html

## Mock data (`src/data/`)

- `studios.ts` — Riot, Valve, Supercell, Ubisoft, Epic, Activision, Mojang, Rockstar, EA, Nintendo (~12)
- `games.ts` — ~40 games linked to studios, with playerHistory[] (12 months), platforms, genres, ratings, peak/current players, downloads, trending status
- `rankings.ts` — derived selectors (top active, fastest growing via week-over-week delta, dead = active < threshold, sweaty/addictive curated tags)
- `favorites.ts` — localStorage helpers + small Zustand-free React context

## Server layer

- `src/lib/games.functions.ts` — `searchGames`, `getTrending`, `getStudio`, `getGame` server functions. Each tries RAWG when `RAWG_API_KEY` is present, otherwise returns mock. Exposed via TanStack Query (`ensureQueryData` in loaders, `useSuspenseQuery` in components).
- `src/lib/rawg.server.ts` — thin RAWG fetch helper (server-only).
- Lovable Cloud enabled now so future features (favorites sync, leaderboards, AI summaries) require no migration.

## Extras

- Toast notifications via existing `sonner`
- Skeleton loading states on every grid
- Dark/light toggle (dark default, light tuned for readability)
- Favorites stored in localStorage with toast confirmation
- All grids responsive: 1/2/3/4 columns at sm/md/lg/xl
- SEO: per-route `head()` with title, description, og tags

## Out of scope for v1 (easy follow-ups)

- Auth + cloud-synced favorites
- Real Steam/IGDB integration (RAWG only)
- Server-side caching of API responses in Postgres
- Admin dashboard for editing data

## Technical notes

- Stack stays TanStack Start (not Express/Mongo as originally requested) — Express won't run in this template. Server functions + Lovable Cloud Postgres replace that role cleanly.
- RAWG key stored as runtime secret `RAWG_API_KEY`; we'll prompt for it after the build if you want live data.
- Recharts for charts (already lightweight, themeable via CSS vars).
- Framer Motion added via `bun add framer-motion`.

