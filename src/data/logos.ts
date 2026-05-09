// Brand logo slugs from simpleicons.org (https://cdn.simpleicons.org/{slug}/{color}).
// Components fall back to a lucide icon when a slug is missing or fails to load.

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
  warzone: "callofduty",
  modernwarfare: "callofduty",
  minecraft: "minecraft",
  apex: "apexlegends",
  fc25: "easports",
  thesims4: "thesims",
  smashbros: "supersmashbros",
  totk: "nintendoswitch",
  genshin: "genshinimpact",
  starrail: "honkaistarrail",
  pubg: "pubg",
  bf6: "battledotnet",
  // No reliable simpleicons for: tft, deadlock, r6s, thedivision2, skullbones,
  // gtav, rdr2, zzz, anthem, lawbreakers — these gracefully fall back.
};

export const logoUrl = (slug: string, color = "white") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;
