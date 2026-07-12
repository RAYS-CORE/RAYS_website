import { createFileRoute, Link } from "@tanstack/react-router";
import { Background3D } from "@/components/Background3D";
import { TopNav } from "@/components/TopNav";
import {
  Eye,
  Satellite,
  ScanFace,
  Plane,
  Camera,
  Globe2,
  ArrowRight,
  Radar,
} from "lucide-react";
import spyImg from "@/assets/rays-spy.jpg";
import spyFace from "@/assets/spy-face.jpg";
import spySat from "@/assets/spy-satellite.jpg";

export const Route = createFileRoute("/spy")({
  head: () => ({
    meta: [
      { title: "RAYS Spy — Agentic OSINT reconnaissance" },
      {
        name: "description",
        content:
          "One platform for every OSINT tool: Sherlock, Spiderfoot, face search, satellites, flights, CCTV. Driven by the RAYS Agent over MCP.",
      },
      { property: "og:title", content: "RAYS Spy" },
      {
        property: "og:description",
        content:
          "Agentic reconnaissance on anyone, anywhere — local models, hundreds of tools, one loop.",
      },
    ],
  }),
  component: SpyPage,
});

function SpyPage() {
  return (
    <>
      <Background3D />
      <TopNav />
      <main className="snap-y-page">
        <SpyHero />
        <SpyDemo />
        <SpyTools />
        <SpyPipeline />
        <SpyFinal />
      </main>
    </>
  );
}

function SpyHero() {
  return (
    <section className="snap-section flex items-center justify-center px-6 pt-28 pb-12">
      <div className="max-w-6xl w-full grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Eye className="h-3.5 w-3.5" /> RAYS Spy · OSINT
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Reconnaissance,
            <br />
            <span className="text-gradient">at agent speed.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Every OSINT tool on the planet — Sherlock, Spiderfoot, face search
            across social networks, satellites, live flight and military
            tracking, CCTV, reverse image, entity graphs — behind a single
            MCP-driven loop the RAYS Agent can operate autonomously.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#tools"
              className="px-5 py-3 rounded-xl inline-flex items-center gap-2 font-semibold hover:opacity-90 transition"
              style={{
                background:
                  "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
                color: "oklch(0.1 0.02 300)",
              }}
            >
              See the toolkit <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/agent"
              className="px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
            >
              Meet the agent
            </Link>
          </div>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong ring-glow">
          <img
            src={spyImg}
            alt="RAYS Spy global reconnaissance mesh"
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

function SpyDemo() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full space-y-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Live pipeline
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Watch it <span className="text-gradient">hunt</span>.
          </h2>
        </div>
        <div
          className="relative rounded-3xl overflow-hidden ring-glow border border-white/15"
          style={{ background: "oklch(0.06 0.02 300)", aspectRatio: "16 / 9" }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/WCxaYUR5q20?rel=0&modestbranding=1"
            title="RAYS Spy demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

const tools = [
  {
    icon: ScanFace,
    title: "Face & identity",
    items: [
      "InsightFace ArcFace embeddings",
      "DBSCAN cosine clustering",
      "Sherlock — 400+ username sites",
      "Reverse image (Google · Bing · Yandex)",
    ],
  },
  {
    icon: Satellite,
    title: "Sky & orbit",
    items: [
      "Every commercial satellite feed",
      "Real-time orbital paths & elements",
      "Military & civil flight tracking",
      "Route + tail-number resolution",
    ],
  },
  {
    icon: Camera,
    title: "Ground & signal",
    items: [
      "Global public CCTV directory",
      "Real-time traffic & DEM data",
      "Spiderfoot passive surface",
      "SerpAPI batched search",
    ],
  },
  {
    icon: Radar,
    title: "Harvest & graph",
    items: [
      "PII extractors (email · phone · site)",
      "Platform validators (GH · LI · X)",
      "pHash duplicate detection",
      "Knowledge graph & entity linking",
    ],
  },
];

function SpyTools() {
  return (
    <section
      id="tools"
      className="snap-section flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The arsenal
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Hundreds of tools. <span className="text-gradient">One loop.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="glass rounded-3xl p-7 space-y-4 hover:ring-glow transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-14 w-14 rounded-2xl grid place-items-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--rays-pink), var(--rays-lavender))",
                    }}
                  >
                    <Icon className="h-7 w-7 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.title}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: "var(--rays-pink)" }}
                      />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SpyPipeline() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The loop
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Agentic pipeline, <span className="text-gradient">self-tuning</span>.
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Every reconnaissance step the agent takes becomes a training signal
            on the Grid — so the model gets sharper at OSINT every time it runs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src={spyFace}
                alt="Face and identity search"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest glass">
                Identity
              </span>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5" style={{ color: "var(--rays-pink)" }} />
                <h4 className="text-xl font-bold">Face across 100+ networks</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                ArcFace embeddings + DBSCAN clustering surface the same person
                across social platforms, forums, and archived pages.
              </p>
            </div>
          </div>
          <div className="glass rounded-3xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src={spySat}
                alt="Satellite and flight tracking"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest glass">
                Sky
              </span>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Plane className="h-5 w-5" style={{ color: "var(--rays-pink)" }} />
                <h4 className="text-xl font-bold">Flights & orbits</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Query any tail number, origin, destination or callsign. Pull
                military tracks and live orbital elements in the same graph.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpyFinal() {
  return (
    <section className="snap-section-hero relative flex items-start justify-center px-6 pt-20">
      <div className="text-center space-y-6">
        <h2
          className="text-[18vw] sm:text-[15vw] font-bold leading-none tracking-tighter text-gradient"
          style={{ textShadow: "0 8px 80px oklch(0.78 0.20 350 / 0.4)" }}
        >
          SPY
        </h2>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Anyone · Anywhere · Local models
        </p>
      </div>
    </section>
  );
}
