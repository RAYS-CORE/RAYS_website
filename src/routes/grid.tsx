import { createFileRoute, Link } from "@tanstack/react-router";
import { Background3D } from "@/components/Background3D";
import { TopNav } from "@/components/TopNav";
import {
  Sparkles,
  Network,
  Layers,
  Zap,
  Shield,
  Cpu,
  ArrowRight,
} from "lucide-react";
import gridImg from "@/assets/rays-grid.jpg";
import adapterImg from "@/assets/grid-adapter.jpg";
import amdImg from "@/assets/amd-arch.jpg";

export const Route = createFileRoute("/grid")({
  head: () => ({
    meta: [
      { title: "RAYS Grid — Federated fine-tuning without collapse" },
      {
        name: "description",
        content:
          "RAYS Grid trains a single global model across thousands of consumer GPUs using orthogonal SVD subspaces and zero-gated adapters. No FedAvg collapse. No catastrophic forgetting.",
      },
      { property: "og:title", content: "RAYS Grid" },
      {
        property: "og:description",
        content:
          "Orthogonal federated fine-tuning for decentralized AI. Every node trains a different mathematical subspace.",
      },
    ],
  }),
  component: GridPage,
});

function GridPage() {
  return (
    <>
      <Background3D />
      <TopNav />
      <main className="snap-y-page">
        <GridHero />
        <GridDemo />
        <GridPillars />
        <GridAMD />
        <GridFinal />
      </main>
    </>
  );
}

function GridHero() {
  return (
    <section className="snap-section flex items-center justify-center px-6 pt-28 pb-12">
      <div className="max-w-6xl w-full grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Network className="h-3.5 w-3.5" /> RAYS Grid · FOGR
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            One model.
            <br />
            <span className="text-gradient">Thousands of GPUs.</span>
            <br />
            Zero collapse.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            The Grid is our federated fine-tuning fabric. Every client trains a
            mathematically orthogonal subspace of the same base model — so
            updates <span className="text-foreground">sum</span> instead of
            averaging away.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/docs/grid"
              className="px-5 py-3 rounded-xl inline-flex items-center gap-2 font-semibold hover:opacity-90 transition"
              style={{
                background:
                  "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
                color: "oklch(0.1 0.02 300)",
              }}
            >
              Read the deep dive <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/docs/fogr"
              className="px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
            >
              FOGR math
            </Link>
          </div>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong ring-glow">
          <img
            src={gridImg}
            alt="Federated orthogonal grid"
            width={1600}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-background/20" />
        </div>
      </div>
    </section>
  );
}

function GridDemo() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full space-y-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            See it running
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            The Grid, <span className="text-gradient">live</span>.
          </h2>
        </div>
        <div
          className="relative rounded-3xl overflow-hidden ring-glow border border-white/15"
          style={{ background: "oklch(0.06 0.02 300)", aspectRatio: "16 / 9" }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/C7YIgxs8ZeY?rel=0&modestbranding=1"
            title="RAYS Grid demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: Layers,
    title: "Orthogonal SVD subspaces",
    body: "The server decomposes W = UΣVᵀ and hands each client a strictly orthogonal slice. ⟨ΔW_A, ΔW_B⟩ = 0 by construction.",
  },
  {
    icon: Shield,
    title: "Zero-gated adapters (SB-ZGA)",
    body: "Adapters start as a perfect identity (tanh(0) = 0). Cayley-parametrised weights stay orthogonal, so gradients never explode.",
  },
  {
    icon: Sparkles,
    title: "Execution-state graph loss",
    body: "We don't tune on tokens. We tune on the DAG of tool calls the agent actually ran — Wasserstein-aligned to successful paths.",
  },
  {
    icon: Zap,
    title: "Non-destructive summation",
    body: "The server sums updates instead of averaging. W_new = W_base + ΔW_A + ΔW_B + … Millions of nodes contribute without clashing.",
  },
];

function GridPillars() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Four ideas. <span className="text-gradient">One fabric.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass rounded-3xl p-7 space-y-4 hover:ring-glow transition"
              >
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--rays-pink), var(--rays-lavender))",
                  }}
                >
                  <Icon className="h-7 w-7 text-background" />
                </div>
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 gap-6 pt-6">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src={adapterImg}
                alt="Zero-gated adapter matrix"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-1">SB-ZGA adapters</h4>
              <p className="text-sm text-muted-foreground">
                Spectrally-bounded, zero-gated, Cayley-orthogonal. 4-bit
                QLoRA-friendly. Fits on an 8&nbsp;GB consumer card.
              </p>
            </div>
          </div>
          <div className="glass rounded-3xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src={gridImg}
                alt="Orthogonal grid"
                loading="lazy"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-1">TIES-merge fallback</h4>
              <p className="text-sm text-muted-foreground">
                When subspaces overlap, the server trims noise, elects
                consensus signs and averages only sign-aligned updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GridAMD() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong ring-glow">
          <img
            src={amdImg}
            alt="AMD wavefront matrix cores"
            loading="lazy"
            width={1600}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-background/20" />
        </div>
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Cpu className="h-3.5 w-3.5" /> AMD · ROCm
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Wavefront-aligned <span className="text-gradient">by design</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The AMD pipeline targets only <code>q_proj</code>, <code>v_proj</code>{" "}
            and <code>gate_proj</code>, freezes every norm layer, and pins the
            LoRA rank to exactly <span className="text-foreground">r = 64</span>{" "}
            — the size of a native RDNA/CDNA wavefront.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The result: matrix cores stay saturated, register spills disappear,
            and consumer Radeons train real 7B models without OOMing.
          </p>
          <Link
            to="/docs/amd"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
          >
            AMD architecture docs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GridFinal() {
  return (
    <section className="snap-section-hero relative flex items-start justify-center px-6 pt-20">
      <div className="text-center space-y-6">
        <h2
          className="text-[18vw] sm:text-[15vw] font-bold leading-none tracking-tighter text-gradient"
          style={{ textShadow: "0 8px 80px oklch(0.78 0.20 350 / 0.4)" }}
        >
          GRID
        </h2>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Orthogonal · Federated · Non-destructive
        </p>
      </div>
    </section>
  );
}
