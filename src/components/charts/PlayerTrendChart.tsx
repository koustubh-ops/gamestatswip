import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Point { month: string; players: number }

export function PlayerTrendChart({ data, color = "var(--primary)" }: { data: Point[]; color?: string }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => v >= 1_000_000 ? `${(v/1_000_000).toFixed(1)}M` : `${(v/1_000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
            labelStyle={{ color: "var(--muted-foreground)" }}
            formatter={(v: number) => [v.toLocaleString(), "players"]}
          />
          <Area type="monotone" dataKey="players" stroke={color} strokeWidth={2} fill="url(#trend)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
