import { CheckSquare, FolderOpen, AlertTriangle, Activity, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Tasks Completed", value: "24", change: "+12%", icon: CheckSquare, color: "text-secondary" },
  { label: "Active Projects", value: "8", change: "+2", icon: FolderOpen, color: "text-primary" },
  { label: "Overdue Tasks", value: "3", change: "-5%", icon: AlertTriangle, color: "text-accent" },
  { label: "Team Activity", value: "92%", change: "+8%", icon: Activity, color: "text-secondary" },
];

const chartData = [
  { name: "Mon", tasks: 12 }, { name: "Tue", tasks: 19 }, { name: "Wed", tasks: 15 },
  { name: "Thu", tasks: 22 }, { name: "Fri", tasks: 28 }, { name: "Sat", tasks: 8 }, { name: "Sun", tasks: 5 },
];

const productivityData = [
  { name: "Week 1", value: 65 }, { name: "Week 2", value: 72 }, { name: "Week 3", value: 80 },
  { name: "Week 4", value: 78 }, { name: "Week 5", value: 90 }, { name: "Week 6", value: 95 },
];

const DashboardOverview = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Welcome back, here's your overview.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <s.icon className={`h-4 w-4 ${s.color}`} />
          </div>
          <p className="mt-2 text-3xl font-bold">{s.value}</p>
          <p className="mt-1 text-xs text-secondary">{s.change} from last week</p>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Task Completion Trends</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 27%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(217 33% 17%)", border: "1px solid hsl(217 19% 27%)", borderRadius: 8, color: "hsl(210 40% 98%)" }} />
            <Bar dataKey="tasks" fill="hsl(239 84% 67%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Team Productivity</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 27%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(217 33% 17%)", border: "1px solid hsl(217 19% 27%)", borderRadius: 8, color: "hsl(210 40% 98%)" }} />
            <Line type="monotone" dataKey="value" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={{ fill: "hsl(160 84% 39%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default DashboardOverview;
