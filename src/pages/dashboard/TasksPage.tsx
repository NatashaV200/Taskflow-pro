import { CheckSquare } from "lucide-react";

const tasks = [
  { title: "Design system updates", status: "In Progress", priority: "High", assignee: "SC", due: "Mar 15" },
  { title: "API integration", status: "To Do", priority: "Medium", assignee: "JM", due: "Mar 18" },
  { title: "User dashboard", status: "In Progress", priority: "High", assignee: "ER", due: "Mar 12" },
  { title: "Auth flow", status: "Review", priority: "Medium", assignee: "SC", due: "Mar 14" },
  { title: "Email templates", status: "Done", priority: "Low", assignee: "ER", due: "Mar 10" },
  { title: "Landing page", status: "Done", priority: "High", assignee: "SC", due: "Mar 8" },
];

const priorityColors: Record<string, string> = {
  Low: "bg-secondary/20 text-secondary",
  Medium: "bg-accent/20 text-accent",
  High: "bg-destructive/20 text-destructive",
};

const statusColors: Record<string, string> = {
  "To Do": "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/20 text-primary",
  "Review": "bg-accent/20 text-accent",
  "Done": "bg-secondary/20 text-secondary",
};

const TasksPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p className="text-sm text-muted-foreground">All tasks across your projects</p>
    </div>

    <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="grid grid-cols-[1fr_100px_80px_60px_80px] gap-4 border-b border-border px-4 py-3 text-xs font-semibold text-muted-foreground">
        <span>Task</span><span>Status</span><span>Priority</span><span>Owner</span><span>Due</span>
      </div>
      {tasks.map((t, i) => (
        <div key={i} className={`grid grid-cols-[1fr_100px_80px_60px_80px] items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-muted/20 ${i < tasks.length - 1 ? "border-b border-border/50" : ""}`}>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t.title}</span>
          </div>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[t.status]}`}>{t.status}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[t.priority]}`}>{t.priority}</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">{t.assignee}</div>
          <span className="text-xs text-muted-foreground">{t.due}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TasksPage;
