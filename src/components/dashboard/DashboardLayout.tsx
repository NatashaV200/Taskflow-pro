import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, LayoutGrid, CheckSquare, Workflow, BarChart3,
  Users, Settings, Zap, Search, Bell, ChevronLeft, Menu, LogOut, User, AtSign, ClipboardCheck
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SEO } from "@/components/SEO";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { toast } from "@/components/ui/sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: LayoutGrid, label: "Boards", path: "/dashboard/boards" },
  { icon: CheckSquare, label: "Tasks", path: "/dashboard/tasks" },
  { icon: Workflow, label: "Automation", path: "/dashboard/automation" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface NotificationItem {
  id: string;
  type: "mention" | "assignment";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const liveNotificationTemplates: Omit<NotificationItem, "id" | "time" | "read">[] = [
  {
    type: "mention",
    title: "@mention in Design system updates",
    description: "Sarah Chen mentioned you: \"Can you review the new card spacing?\"",
  },
  {
    type: "assignment",
    title: "New assignment: API integration",
    description: "Jordan Miles assigned you to implement the webhook retry logic.",
  },
  {
    type: "mention",
    title: "@mention in User dashboard",
    description: "Elena Rivera mentioned you in a comment about KPI widgets.",
  },
  {
    type: "assignment",
    title: "New assignment: Auth flow",
    description: "You were assigned to finalize edge-case handling for SSO login.",
  },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "seed-1",
      type: "mention",
      title: "@mention in Onboarding wizard",
      description: "Elena Rivera mentioned you about first-run checklist copy.",
      time: "just now",
      read: false,
    },
    {
      id: "seed-2",
      type: "assignment",
      title: "New assignment: Landing page",
      description: "Sarah Chen assigned you to refine testimonial card spacing.",
      time: "2m ago",
      read: false,
    },
  ]);
  const location = useLocation();

  useEffect(() => {
    let templateIndex = 0;

    const interval = setInterval(() => {
      const template = liveNotificationTemplates[templateIndex % liveNotificationTemplates.length];
      templateIndex += 1;

      const nextNotification: NotificationItem = {
        ...template,
        id: `${Date.now()}-${templateIndex}`,
        time: "just now",
        read: false,
      };

      setNotifications((prev) => [nextNotification, ...prev].slice(0, 12));

      toast(template.type === "mention" ? "New @mention" : "New assignment", {
        description: template.title,
      });
    }, 22000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const seoByPath: Record<string, { title: string; description: string }> = {
    "/dashboard": {
      title: "Dashboard Overview",
      description: "View key project metrics, activity trends, and team performance at a glance.",
    },
    "/dashboard/boards": {
      title: "Boards",
      description: "Organize project work using Kanban-style boards and track progress by stage.",
    },
    "/dashboard/tasks": {
      title: "Tasks",
      description: "Manage, prioritize, and monitor all tasks across your active projects.",
    },
    "/dashboard/automation": {
      title: "Automation",
      description: "Configure automations to streamline repetitive work and team workflows.",
    },
    "/dashboard/analytics": {
      title: "Analytics",
      description: "Analyze team productivity, task completion trends, and project performance metrics.",
    },
    "/dashboard/team": {
      title: "Team",
      description: "Manage team members, roles, and collaboration settings for your workspace.",
    },
    "/dashboard/settings": {
      title: "Settings",
      description: "Update workspace configuration, preferences, and account settings.",
    },
  };

  const seoConfig = seoByPath[location.pathname] ?? {
    title: "Dashboard",
    description: "Manage projects, tasks, and workflows in your TaskFlow Pro dashboard.",
  };

  const isActive = (path: string) =>
    path === "/dashboard" ? location.pathname === path : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-sm font-bold text-foreground">TaskFlow Pro</span>}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive(item.path)
                ? "bg-sidebar-accent text-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <SEO title={seoConfig.title} description={seoConfig.description} path={location.pathname} noindex />
      {/* Desktop sidebar */}
      <aside
        className={`hidden border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 h-full w-60 bg-sidebar border-r border-sidebar-border">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden text-muted-foreground hover:text-foreground lg:block">
              <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="h-9 w-48 rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring md:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 border-border bg-card p-0">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">Live @mentions and assignments</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={markAllNotificationsAsRead}>
                    Mark all read
                  </Button>
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.length === 0 ? (
                    <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                      No notifications yet.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-md border px-3 py-2 text-xs ${
                            item.read ? "border-border/50 bg-background/50" : "border-primary/20 bg-primary/5"
                          }`}
                        >
                          <div className="mb-1 flex items-center gap-2">
                            {item.type === "mention" ? (
                              <AtSign className="h-3.5 w-3.5 text-primary" />
                            ) : (
                              <ClipboardCheck className="h-3.5 w-3.5 text-primary" />
                            )}
                            <span className="font-medium text-foreground">{item.title}</span>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground/80">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  JD
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem className="gap-2 text-foreground"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-foreground"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <Link to="/">
                  <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
