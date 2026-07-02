import { Link, useLocation } from "@tanstack/react-router";
import { TopNav } from "./TopNav";
import type { ReactNode } from "react";

const sections = [
  {
    title: "Getting Started",
    items: [
      { to: "/docs", label: "Overview" },
      { to: "/docs/install", label: "Installation" },
      { to: "/docs/quickstart", label: "Quickstart" },
    ],
  },
  {
    title: "Core concepts",
    items: [
      { to: "/docs/architecture", label: "Architecture" },
      { to: "/docs/skills", label: "Skills" },
      { to: "/docs/mcp", label: "MCP servers" },
    ],
  },
  {
    title: "Reference",
    items: [
      { to: "/docs/commands", label: "Slash commands" },
      { to: "/docs/troubleshooting", label: "Troubleshooting" },
      { to: "/docs/publishing", label: "Publishing" },
    ],
  },
];

export function DocsLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background relative">
      {/* dimmer background on docs for legibility */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, oklch(0.15 0.06 320) 0%, oklch(0.06 0.02 300) 60%)",
        }}
      />
      <TopNav />
      <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
        <aside className="lg:sticky lg:top-24 lg:self-start glass rounded-2xl p-5 h-fit">
          <nav className="space-y-6 text-sm">
            {sections.map((s) => (
              <div key={s.title}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {s.title}
                </p>
                <ul className="space-y-1">
                  {s.items.map((it) => {
                    const active = pathname === it.to;
                    return (
                      <li key={it.to}>
                        <Link
                          to={it.to}
                          className={`block px-3 py-1.5 rounded-md transition ${
                            active
                              ? "bg-white/10 text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                          }`}
                          style={
                            active
                              ? {
                                  borderLeft: "2px solid var(--rays-pink)",
                                  paddingLeft: "calc(0.75rem - 2px)",
                                }
                              : undefined
                          }
                        >
                          {it.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <article className="prose-rays glass rounded-2xl p-6 sm:p-10 min-w-0 pb-24">
          {children}
        </article>
      </div>
    </div>
  );
}

export function DocPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>
      <div className="space-y-5 text-base leading-relaxed text-foreground/85 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:text-foreground [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:text-muted-foreground [&_code]:font-mono [&_code]:text-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-white/10 [&_a]:underline [&_a]:text-foreground hover:[&_a]:text-pink">
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="font-mono text-sm rounded-xl p-4 overflow-x-auto border border-white/10"
      style={{ background: "oklch(0.05 0.02 300)" }}
    >
      <code>{children}</code>
    </pre>
  );
}
