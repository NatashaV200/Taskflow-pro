import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const weeklyData = [
  { name: "Week 1", completed: 32 }, { name: "Week 2", completed: 45 },
  { name: "Week 3", completed: 38 }, { name: "Week 4", completed: 52 },
];

const memberData = [
  { name: "Sarah", tasks: 28 }, { name: "James", tasks: 22 },
  { name: "Emily", tasks: 35 }, { name: "Alex", tasks: 18 },
];

const statusData = [
  { name: "Completed", value: 45, color: "hsl(160 84% 39%)" },
  { name: "In Progress", value: 30, color: "hsl(239 84% 67%)" },
  { name: "Overdue", value: 8, color: "hsl(0 84% 60%)" },
  { name: "To Do", value: 17, color: "hsl(215 20% 65%)" },
];

const completionRate = [
  { name: "Jan", rate: 72 }, { name: "Feb", rate: 78 }, { name: "Mar", rate: 85 },
  { name: "Apr", rate: 82 }, { name: "May", rate: 90 }, { name: "Jun", rate: 94 },
];

const tooltipStyle = { background: "hsl(217 33% 17%)", border: "1px solid hsl(217 19% 27%)", borderRadius: 8, color: "hsl(210 40% 98%)" };
const tickStyle = { fill: "hsl(215 20% 65%)", fontSize: 12 };

const AnalyticsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-sm text-muted-foreground">Track your team's performance</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Tasks Completed Per Week</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 27%)" />
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} />
            <YAxis tick={tickStyle} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="completed" fill="hsl(239 84% 67%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Task Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
              {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          {statusData.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Tasks by Member</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={memberData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 27%)" />
            <XAxis type="number" tick={tickStyle} axisLine={false} />
            <YAxis dataKey="name" type="category" tick={tickStyle} axisLine={false} width={60} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="tasks" fill="hsl(160 84% 39%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold">Project Completion Rate</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={completionRate}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 27%)" />
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} />
            <YAxis tick={tickStyle} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="rate" stroke="hsl(43 96% 56%)" strokeWidth={2} dot={{ fill: "hsl(43 96% 56%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AnalyticsPage;
