import { Users, LayoutGrid, Workflow, BarChart3, Bell, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Users, title: "Real-time Collaboration", desc: "Work together with your team in real time. See changes instantly and stay in sync." },
  { icon: LayoutGrid, title: "Kanban Workflow Boards", desc: "Organize tasks visually with flexible drag-and-drop kanban boards." },
  { icon: Workflow, title: "Automation Rules", desc: "Automate repetitive tasks with powerful triggers, conditions, and actions." },
  { icon: BarChart3, title: "Productivity Analytics", desc: "Track team performance with detailed charts and actionable insights." },
  { icon: Bell, title: "Smart Notifications", desc: "Get notified about what matters. Reduce noise with intelligent alerts." },
  { icon: Shield, title: "Team Management", desc: "Manage roles, permissions, and team structure with ease." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to ship faster</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Powerful tools designed to help modern teams stay organized and productive.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
