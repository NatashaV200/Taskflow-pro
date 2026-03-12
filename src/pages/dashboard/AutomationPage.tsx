import { Zap, Bell, CheckCircle, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const rules = [
  { trigger: "Task moved to Done", action: "Notify project manager", active: true },
  { trigger: "Task overdue by 2 days", action: "Send reminder email", active: true },
  { trigger: "New task created", action: "Assign to team lead", active: false },
  { trigger: "All subtasks completed", action: "Move parent to Review", active: true },
];

const AutomationPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Automation</h1>
        <p className="text-sm text-muted-foreground">Create rules to automate your workflow</p>
      </div>
      <Button className="gap-2 bg-primary hover:bg-primary/90"><Plus className="h-4 w-4" /> Create Rule</Button>
    </div>

    {/* Visual workflow example */}
    <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
      <p className="mb-4 text-sm font-semibold">Example Workflow</p>
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-0 md:justify-center">
        {[
          { icon: Zap, label: "Trigger", desc: "Task → Done", color: "bg-primary/10 text-primary border-primary/20" },
          { icon: CheckCircle, label: "Condition", desc: "Has assignee", color: "bg-secondary/10 text-secondary border-secondary/20" },
          { icon: Bell, label: "Action", desc: "Send notification", color: "bg-accent/10 text-accent border-accent/20" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className={`rounded-xl border p-4 text-center min-w-[160px] ${s.color}`}>
              <s.icon className="mx-auto mb-2 h-6 w-6" />
              <p className="text-xs font-semibold uppercase">{s.label}</p>
              <p className="mt-1 text-sm">{s.desc}</p>
            </div>
            {i < 2 && <ArrowRight className="mx-3 hidden h-4 w-4 text-muted-foreground md:block" />}
          </div>
        ))}
      </div>
    </div>

    {/* Rules list */}
    <div className="space-y-3">
      {rules.map((r, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className={`h-2 w-2 rounded-full ${r.active ? "bg-secondary" : "bg-muted-foreground"}`} />
            <div>
              <p className="text-sm font-medium">When: {r.trigger}</p>
              <p className="text-xs text-muted-foreground">Then: {r.action}</p>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${r.active ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`}>
            {r.active ? "Active" : "Inactive"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default AutomationPage;
