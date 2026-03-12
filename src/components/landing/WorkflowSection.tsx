import { ArrowRight, Zap, CheckCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Zap, label: "Trigger", title: "Task moved to Done", color: "bg-primary/10 text-primary" },
  { icon: CheckCircle, label: "Condition", title: "Assignee is manager", color: "bg-secondary/10 text-secondary" },
  { icon: Bell, label: "Action", title: "Notify project manager", color: "bg-accent/10 text-accent" },
];

export function WorkflowSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Automation</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Automate your workflows</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Create powerful automation rules with a simple trigger → condition → action flow.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:flex-row md:gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center"
            >
              <div className="rounded-xl border border-border bg-card p-6 text-center min-w-[200px]" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-sm font-medium">{s.title}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="mx-4 hidden h-5 w-5 text-muted-foreground md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
