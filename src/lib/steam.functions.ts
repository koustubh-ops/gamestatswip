import { createServerFn } from "@tanstack/react-start";

// Steam exposes a public no-key endpoint that returns concurrent player count
// for a given appid. We batch a list of appids and return a map. If a request
// fails (network, rate-limit, etc.) we omit that appid so the client falls
// back to its simulated drift number.
export const getSteamPlayers = createServerFn({ method: "GET" })
  .inputValidator((data: { appIds: number[] }) => ({
    appIds: Array.isArray(data?.appIds) ? data.appIds.filter((n) => Number.isFinite(n)) : [],
  }))
  .handler(async ({ data }) => {
    const out: Record<number, number> = {};
    if (!data.appIds.length) return { players: out, fetchedAt: Date.now() };

    const results = await Promise.allSettled(
      data.appIds.map(async (appId) => {
        const res = await fetch(
          `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`,
          { headers: { "user-agent": "Gamestats/1.0" } },
        );
        if (!res.ok) throw new Error(`steam ${appId} -> ${res.status}`);
        const json = (await res.json()) as { response?: { player_count?: number; result?: number } };
        const count = json?.response?.player_count;
        if (typeof count === "number" && count > 0) out[appId] = count;
      }),
    );

    // Surface failures to logs but keep the response useful.
    results.forEach((r, i) => {
      if (r.status === "rejected") console.warn("[steam] fail", data.appIds[i], r.reason);
    });

    return { players: out, fetchedAt: Date.now() };
  });
