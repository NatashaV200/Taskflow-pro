import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mail, ShieldCheck, Users, Eye, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

type Role = "Admin" | "Member" | "Viewer" | "Commenter";

interface TeamMember {
  name: string;
  email: string;
  role: Role;
  avatar: string;
  status: "online" | "offline";
}

const ROLE_INFO: Record<
  Role,
  {
    color: string;
    icon: typeof ShieldCheck;
    description: string;
    canManageTeam: boolean;
    canEdit: boolean;
    canComment: boolean;
    canView: boolean;
  }
> = {
  Admin: {
    color: "bg-primary/20 text-primary",
    icon: ShieldCheck,
    description: "Full workspace control, users, roles, and settings.",
    canManageTeam: true,
    canEdit: true,
    canComment: true,
    canView: true,
  },
  Member: {
    color: "bg-secondary/20 text-secondary",
    icon: Users,
    description: "Can create and edit tasks, boards, and automation rules.",
    canManageTeam: false,
    canEdit: true,
    canComment: true,
    canView: true,
  },
  Commenter: {
    color: "bg-accent/20 text-accent",
    icon: MessageSquare,
    description: "Can review work and comment, but cannot edit tasks.",
    canManageTeam: false,
    canEdit: false,
    canComment: true,
    canView: true,
  },
  Viewer: {
    color: "bg-muted text-muted-foreground",
    icon: Eye,
    description: "Read-only access to boards, tasks, and analytics.",
    canManageTeam: false,
    canEdit: false,
    canComment: false,
    canView: true,
  },
};

const INITIAL_MEMBERS: TeamMember[] = [
  { name: "Sarah Chen", email: "sarah@company.com", role: "Admin", avatar: "SC", status: "online" },
  { name: "James Miller", email: "james@company.com", role: "Member", avatar: "JM", status: "online" },
  { name: "Emily Rodriguez", email: "emily@company.com", role: "Commenter", avatar: "ER", status: "offline" },
  { name: "Alex Thompson", email: "alex@company.com", role: "Viewer", avatar: "AT", status: "online" },
  { name: "Maria Garcia", email: "maria@company.com", role: "Member", avatar: "MG", status: "offline" },
];

const TeamPage = () => {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Member");

  const roleCounts = useMemo(() => {
    return members.reduce(
      (acc, m) => {
        acc[m.role] += 1;
        return acc;
      },
      { Admin: 0, Member: 0, Viewer: 0, Commenter: 0 } as Record<Role, number>,
    );
  }, [members]);

  const updateMemberRole = (email: string, nextRole: Role) => {
    setMembers((prev) =>
      prev.map((member) => (member.email === email ? { ...member, role: nextRole } : member)),
    );
    toast("Role updated", {
      description: `Updated ${email} to ${nextRole}`,
    });
  };

  const handleInvite = () => {
    const email = inviteEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      toast("Invalid email", { description: "Enter a valid email address." });
      return;
    }

    if (members.some((m) => m.email === email)) {
      toast("Member already exists", { description: `${email} is already in this workspace.` });
      return;
    }

    const nameSeed = email.split("@")[0] || "new member";
    const normalized = nameSeed.replace(/[._-]/g, " ");
    const name = normalized
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const avatar =
      name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "NM";

    setMembers((prev) => [
      ...prev,
      { name, email, role: inviteRole, avatar, status: "offline" },
    ]);

    toast("Invitation sent", {
      description: `${email} invited as ${inviteRole}`,
    });

    setInviteEmail("");
    setInviteRole("Member");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">Role-based access management for your workspace</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle>Invite team member</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="border-border bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as Role)}>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Admin", "Member", "Commenter", "Viewer"] as Role[]).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleInvite}>
                Send Invite
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(["Admin", "Member", "Commenter", "Viewer"] as Role[]).map((role) => {
          const info = ROLE_INFO[role];
          const Icon = info.icon;
          return (
            <div
              key={role}
              className="rounded-xl border border-border bg-card p-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${info.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {role}
                </div>
                <span className="text-sm font-semibold">{roleCounts[role]}</span>
              </div>
              <p className="text-xs text-muted-foreground">{info.description}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="mb-3 text-sm font-semibold">Permissions Matrix</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[180px_repeat(4,1fr)] gap-2 rounded-md bg-muted/30 px-3 py-2 text-xs font-semibold text-muted-foreground">
              <span>Permission</span>
              <span>Admin</span>
              <span>Member</span>
              <span>Commenter</span>
              <span>Viewer</span>
            </div>

            {[
              { label: "Manage team + roles", key: "canManageTeam" },
              { label: "Create / edit tasks", key: "canEdit" },
              { label: "Comment on tasks", key: "canComment" },
              { label: "View boards & reports", key: "canView" },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[180px_repeat(4,1fr)] gap-2 border-b border-border/60 px-3 py-2 text-xs last:border-b-0"
              >
                <span className="text-foreground">{row.label}</span>
                {(["Admin", "Member", "Commenter", "Viewer"] as Role[]).map((role) => (
                  <span key={`${row.label}-${role}`} className="text-muted-foreground">
                    {ROLE_INFO[role][row.key as keyof (typeof ROLE_INFO)[Role]] ? "✓" : "—"}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        {members.map((member, index) => (
          <div
            key={member.email}
            className={`flex flex-wrap items-center justify-between gap-3 p-4 ${index < members.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                    member.status === "online" ? "bg-secondary" : "bg-muted-foreground"
                  }`}
                />
              </div>

              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </p>
              </div>
            </div>

            <div className="w-[180px]">
              <Select value={member.role} onValueChange={(value) => updateMemberRole(member.email, value as Role)}>
                <SelectTrigger className="h-8 border-border bg-background text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Admin", "Member", "Commenter", "Viewer"] as Role[]).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
