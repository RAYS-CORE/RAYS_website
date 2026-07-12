import { createFileRoute, Link } from "@tanstack/react-router";
import { Background3D } from "@/components/Background3D";
import { TopNav } from "@/components/TopNav";
import { ArrowRight, Heart, Sparkles, Cpu, Eye, Network } from "lucide-react";
import productModels from "@/assets/product-models.jpg";
import raysGrid from "@/assets/rays-grid.jpg";
import raysSpy from "@/assets/rays-spy.jpg";
import missionCommons from "@/assets/mission-commons.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAYS Foundation — Free AI for everyone" },
      {
        name: "description",
        content:
          "Talent is distributed equally — opportunities aren't. RAYS Foundation builds and crowdfunds free AI models, compute and tools.",
      },
      { property: "og:title", content: "RAYS Foundation" },
      {
        property: "og:description",
        content: "Free AI for everyone. Crowdfunded compute. Open agents.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Background3D />
      <TopNav />
      <main className="snap-y-page">
        <Hero />
        <Mission />
        <Products />
        <Support />
        <Final />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="snap-section flex items-center justify-center px-6 pt-28 pb-12">
      <div className="max-w-5xl w-full text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> RAYS Foundation
        </div>
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          style={{ textShadow: "0 4px 60px oklch(0.78 0.18 340 / 0.25)" }}
        >
          <span className="text-gradient">Talent is distributed equally.</span>
          <br />
          <span className="text-foreground/85">Opportunity isn't.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
          We crowdfund a public compute commons so every model — from the
          smallest to the largest — is free for anyone who needs it.
        </p>
        <div className="flex flex-col items-center gap-5">
          <CommandBlock command="pipx install rays-core" />
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              to="/agent"
              className="px-5 py-3 rounded-xl glass hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              Meet RAYS Agent <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/docs"
              className="px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandBlock({ command }: { command: string }) {
  return (
    <div className="w-full max-w-2xl">
      <CopyableInline command={command} />
    </div>
  );
}

function CopyableInline({ command }: { command: string }) {
  // local inline copy (no separate import to keep this file focused)
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(command)}
      className="group w-full glass-strong rounded-2xl py-4 px-5 inline-flex items-center justify-between gap-4 ring-glow hover:scale-[1.01] transition-all font-mono text-base sm:text-lg"
      title="Copy"
    >
      <span className="flex items-center gap-3 truncate">
        <span className="text-gradient font-bold">$</span>
        <span className="truncate">{command}</span>
      </span>
      <span className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
        copy
      </span>
    </button>
  );
}

function Mission() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Our mission
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            A <span className="text-gradient">public commons</span> for AI.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI shouldn't be a luxury. RAYS Foundation is building an open,
            crowdfunded server system where models — open-source, proprietary,
            tiny or frontier — run for free behind transparent rate limits.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every product we ship — agents, runtimes, tooling — is built on
            this principle: <span className="text-foreground">access first</span>.
          </p>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong ring-glow">
          <img
            src={missionCommons}
            alt="A luminous network of interconnected AI nodes representing the RAYS public commons"
            loading="lazy"
            width={1200}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-background/20" />
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    title: "RAYS Agent",
    tag: "Available now",
    image: productModels,
    icon: Cpu,
    desc: "An open-source coding agent that indexes real repos, plans changes, and ships edits.",
    href: "/agent",
  },
  {
    title: "RAYS Grid",
    tag: "Federated fine-tuning",
    image: raysGrid,
    icon: Network,
    desc: "Thousands of consumer GPUs training one model. Orthogonal SVD subspaces, zero collapse, non-destructive summation.",
    href: "/grid",
  },
  {
    title: "RAYS Spy",
    tag: "Agentic OSINT",
    image: raysSpy,
    icon: Eye,
    desc: "Hundreds of OSINT tools — face, satellite, flight, CCTV, entity graph — behind one MCP-driven agent loop.",
    href: "/spy",
  },
];

function Products() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Products
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Built on the <span className="text-gradient">RAYS</span> commons.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.title}
                to={p.href}
                className="group glass rounded-3xl overflow-hidden hover:ring-glow transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest glass">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-gradient" />
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Support() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full text-center space-y-10 glass-strong rounded-3xl p-10 sm:p-16 ring-glow">
        <Heart className="h-12 w-12 mx-auto" style={{ color: "var(--rays-pink)" }} />
        <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
          Help us keep AI <span className="text-gradient">free</span>.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every dollar funds GPUs, bandwidth, and storage that anyone can use.
          No paywalls. No tiered access. Just rate limits, transparently shared.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.patreon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl text-lg font-semibold inline-flex items-center gap-3 hover:opacity-90 transition"
            style={{
              background:
                "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
              color: "oklch(0.1 0.02 300)",
            }}
          >
            <Heart className="h-5 w-5" /> Support on Patreon
          </a>
          <a
            href="https://github.com/RAYS-CORE/RAYS-CORE"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl text-lg font-semibold glass hover:bg-white/10 transition"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="snap-section-hero relative flex items-start justify-center px-6 pt-20">
      <div className="text-center space-y-6">
        <h2
          className="text-[18vw] sm:text-[15vw] font-bold leading-none tracking-tighter text-gradient"
          style={{
            textShadow: "0 8px 80px oklch(0.78 0.20 350 / 0.4)",
          }}
        >
          RAYS
        </h2>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Free AI · For everyone · Forever
        </p>
      </div>
    </section>
  );
}
