import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Datum { name: string; value: number }
const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function GenreBreakdown({ data }: { data: Datum[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={90} />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
