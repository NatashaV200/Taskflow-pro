import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Now in public beta
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Manage Work Smarter With{" "}
            <span className="gradient-text">AI-Powered Workflow Automation</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            TaskFlow Pro helps teams organize projects, automate workflows, and collaborate in real time.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow gap-2 px-8">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 border-border text-foreground hover:bg-card">
              <Play className="h-4 w-4" /> View Demo
            </Button>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-xl border border-border bg-card p-2 shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="rounded-lg bg-background/50 p-6">
              {/* Fake dashboard UI */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
                <div className="h-3 w-3 rounded-full bg-secondary/60" />
                <div className="ml-4 h-6 w-64 rounded-md bg-muted/50" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {["To Do", "In Progress", "Review", "Done"].map((col) => (
                  <div key={col} className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">{col}</div>
                    {[...Array(col === "In Progress" ? 3 : 2)].map((_, i) => (
                      <div key={i} className="rounded-lg border border-border/50 bg-card p-3 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-muted/40" />
                        <div className="h-2 w-1/2 rounded bg-muted/20" />
                        <div className="flex gap-1">
                          <div className="h-5 w-5 rounded-full bg-primary/30" />
                          <div className="h-5 w-12 rounded-full bg-secondary/20 text-[8px] flex items-center justify-center text-secondary">Low</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
