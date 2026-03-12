import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah Chen", company: "TechCorp", quote: "TaskFlow Pro transformed how our team collaborates. We shipped 40% faster after switching.", avatar: "SC" },
  { name: "James Miller", company: "DesignStudio", quote: "The automation features alone saved us 10 hours per week. Incredible product.", avatar: "JM" },
  { name: "Emily Rodriguez", company: "StartupLab", quote: "Clean, intuitive, and powerful. It's like Linear and Notion had a baby.", avatar: "ER" },
];

export function TestimonialsSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Loved by teams everywhere</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
