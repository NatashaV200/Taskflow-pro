import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const groups = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Sign in", href: "/login" },
        { label: "Get started", href: "/register" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "GitHub", href: "#", icon: Github },
    { label: "LinkedIn", href: "#", icon: Linkedin },
  ];

  return (
    <footer className="border-t border-border/80 bg-muted/20 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-10 rounded-2xl border border-border bg-card/70 p-6 sm:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Ready to improve your workflow?</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">Start organizing your team in minutes.</h3>
            </div>
            <Link to="/register" className="sm:shrink-0">
              <Button className="w-full bg-primary hover:bg-primary/90 sm:w-auto">
                Create free account
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/90">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TaskFlow Pro</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              TaskFlow Pro helps teams plan, automate, and ship work faster with a calm, focused workspace.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{g.title}</h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link to={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TaskFlow Pro. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
