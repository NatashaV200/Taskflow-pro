import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TaskFlow Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">AI-powered workflow automation for modern teams.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Docs"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security"] },
          ].map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-sm font-semibold">{g.title}</h4>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaskFlow Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
