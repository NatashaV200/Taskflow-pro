import { Button } from "@/components/ui/button";
import { Plus, Mail } from "lucide-react";

const members = [
  { name: "Sarah Chen", email: "sarah@company.com", role: "Admin", avatar: "SC", status: "online" },
  { name: "James Miller", email: "james@company.com", role: "Manager", avatar: "JM", status: "online" },
  { name: "Emily Rodriguez", email: "emily@company.com", role: "Member", avatar: "ER", status: "offline" },
  { name: "Alex Thompson", email: "alex@company.com", role: "Member", avatar: "AT", status: "online" },
  { name: "Maria Garcia", email: "maria@company.com", role: "Member", avatar: "MG", status: "offline" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-primary/20 text-primary",
  Manager: "bg-accent/20 text-accent",
  Member: "bg-muted text-muted-foreground",
};

const TeamPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Team</h1>
        <p className="text-sm text-muted-foreground">Manage your team members</p>
      </div>
      <Button className="gap-2 bg-primary hover:bg-primary/90"><Plus className="h-4 w-4" /> Invite Member</Button>
    </div>

    <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
      {members.map((m, i) => (
        <div key={m.email} className={`flex items-center justify-between p-4 ${i < members.length - 1 ? "border-b border-border" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">{m.avatar}</div>
              <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${m.status === "online" ? "bg-secondary" : "bg-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-sm font-medium">{m.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{m.email}</p>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${roleColors[m.role]}`}>{m.role}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TeamPage;
