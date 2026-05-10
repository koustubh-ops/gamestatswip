// Brand logo slugs from simpleicons.org (https://cdn.simpleicons.org/{slug}/{color}).
// Components fall back to a lucide genre icon when a slug is missing or fails to load.
// We deliberately omit slugs that don't visually match the game (e.g. generic
// publisher marks) so the genre icon shows instead.

export const STUDIO_LOGO_SLUGS: Record<string, string> = {
  riot: "riotgames",
  valve: "valve",
  supercell: "supercell",
  ubisoft: "ubisoft",
  epic: "epicgames",
  activision: "activision",
  mojang: "mojang",
  rockstar: "rockstargames",
  ea: "ea",
  nintendo: "nintendo",
  miHoYo: "mihoyo",
  krafton: "krafton",
};

export const GAME_LOGO_SLUGS: Record<string, string> = {
  lol: "leagueoflegends",
  valorant: "valorant",
  cs2: "counterstrike",
  dota2: "dota2",
  brawl: "brawlstars",
  coc: "clashofclans",
  clashroyale: "clashroyale",
  fortnite: "fortnite",
  fallguys: "fallguys",
  // minecraft slug renders as a placeholder on simpleicons — fall back to Sandbox genre icon
  apex: "apexlegends",
  pubg: "pubg",
  genshin: "genshinimpact",
  // Intentionally NOT mapped — the available simpleicons brand mark doesn't
  // match the game and looked off in cards (publisher logo, console logo, etc.)
  // Falls back to a clean genre icon instead:
  // tft, deadlock, r6s, thedivision2, skullbones, warzone, modernwarfare,
  // gtav, rdr2, fc25, thesims4, smashbros, totk, starrail, zzz, bf6,
  // anthem, lawbreakers
};

export const logoUrl = (slug: string, color = "white") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;
