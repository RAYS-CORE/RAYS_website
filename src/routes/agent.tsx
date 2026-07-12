import { createFileRoute, Link } from "@tanstack/react-router";
import { Background3D } from "@/components/Background3D";
import { TopNav } from "@/components/TopNav";
import { CopyCommand } from "@/components/CopyCommand";
import { useRef } from "react";
import {
  Terminal,
  Sparkles,
  GitBranch,
  Boxes,
  ArrowRight,
  Github,
  Download,
  Apple,
  MonitorDown,
  Cpu,
} from "lucide-react";
import macImg from "@/assets/download-macos.jpg";
import winImg from "@/assets/download-windows.jpg";
import linuxImg from "@/assets/download-linux.jpg";
import { GITHUB_ORG_URL, GITHUB_REPO_URL, YOUTUBE_DEMO_EMBED } from "@/lib/site";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "RAYS Agent — Open-source AI coding assistant" },
      {
        name: "description",
        content:
          "RAYS Agent indexes real repositories, plans changes, and ships edits. Local-first, provider-flexible, open source.",
      },
      { property: "og:title", content: "RAYS Agent" },
      {
        property: "og:description",
        content:
          "Index. Analyze. Plan. Edit. Ship. The open-source AI coding agent from RAYS Foundation.",
      },
    ],
  }),
  component: AgentPage,
});

function AgentPage() {
  const installRef = useRef<HTMLElement>(null);
  const scrollToInstall = () => {
    installRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Background3D />
      <TopNav onInstallClick={scrollToInstall} />
      <main className="snap-y-page">
        <AgentHero onInstall={scrollToInstall} />
        <Demo />
        <Features />
        <Downloads />
        <Install ref={installRef} />
        <FinalAgent />
      </main>
    </>
  );
}

function AgentHero({ onInstall }: { onInstall: () => void }) {
  return (
    <section className="snap-section-hero flex items-center justify-center px-6 pt-28 pb-12">
      <div className="max-w-5xl w-full text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" /> RAYS Agent · v1.6
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tight">
          The <span className="text-gradient">coding agent</span>
          <br /> for real repositories.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Index. Analyze. Plan. Edit. Ship. RAYS works on your codebase —
          locally with Ollama or via Gemini — and keeps memory of what it
          learned.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onInstall}
            className="px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"
            style={{
              background:
                "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
              color: "oklch(0.1 0.02 300)",
            }}
          >
            Install <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            to="/docs"
            className="px-6 py-3 rounded-xl glass hover:bg-white/10 transition"
          >
            Read the docs
          </Link>
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl glass hover:bg-white/10 transition inline-flex items-center gap-2"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full space-y-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            See it in action
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Watch RAYS <span className="text-gradient">think</span>.
          </h2>
        </div>
        <div
          className="relative rounded-3xl overflow-hidden ring-glow border border-white/15"
          style={{
            background: "oklch(0.06 0.02 300)",
            aspectRatio: "16 / 9",
          }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={YOUTUBE_DEMO_EMBED}
            title="RAYS Agent demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Boxes,
    title: "Structural indexing",
    body: "Symbol- and relationship-level indexing of your real repo, backed by msgpack registries.",
  },
  {
    icon: Sparkles,
    title: "Agent orchestrator",
    body: "Default agent loop spawns dynamic sub-agents over your local skills and MCP servers.",
  },
  {
    icon: GitBranch,
    title: "Edit pipeline (/code)",
    body: "Task analysis → symbol detection → planning → permission negotiation → apply.",
  },
  {
    icon: Terminal,
    title: "Provider flexible",
    body: "Local-first with Ollama; Gemini API supported. Keys read from env, never persisted.",
  },
];

function Features() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            What makes <span className="text-gradient">RAYS</span> different.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
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
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type DownloadCard = {
  os: string;
  tag: string;
  image: string;
  icon: typeof Apple;
  filename: string;
  href: string | null;
  disabled?: boolean;
};

const downloads: DownloadCard[] = [
  {
    os: "macOS",
    tag: "Apple Silicon · .dmg",
    image: macImg,
    icon: Apple,
    filename: "RAYS.Studio-1.7.1-arm64.dmg",
    href: `https://github.com/RAYS-CORE/RAYS-CORE/releases/download/v1.7.1/RAYS.Studio-1.7.1-arm64.dmg`,
  },
  {
    os: "Windows",
    tag: "x64 · .exe",
    image: winImg,
    icon: MonitorDown,
    filename: "RAYS_v1.7.1.exe",
    href: `https://github.com/RAYS-CORE/RAYS-CORE/releases/download/v1.7.1/RAYS_v1.7.1.exe`,
  },
  {
    os: "Linux",
    tag: "Coming soon",
    image: linuxImg,
    icon: Cpu,
    filename: ".AppImage · .deb",
    href: null,
    disabled: true,
  },
];

function Downloads() {
  return (
    <section className="snap-section flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Download RAYS Studio
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ship on <span className="text-gradient">your</span> machine.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Native builds of RAYS Studio v1.6.1 — the desktop shell around the
            agent.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {downloads.map((d) => {
            const Icon = d.icon;
            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.os} download`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      d.disabled
                        ? "opacity-40 grayscale"
                        : "opacity-85 group-hover:opacity-100 group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest glass">
                    {d.tag}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" style={{ color: "var(--rays-pink)" }} />
                    <h3 className="text-2xl font-bold">{d.os}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono truncate">
                    {d.filename}
                  </p>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      d.disabled
                        ? "glass text-muted-foreground"
                        : "text-background"
                    }`}
                    style={
                      d.disabled
                        ? undefined
                        : {
                            background:
                              "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
                          }
                    }
                  >
                    <Download className="h-4 w-4" />
                    {d.disabled ? "Coming soon" : `Download for ${d.os}`}
                  </div>
                </div>
              </>
            );

            const cls =
              "group glass rounded-3xl overflow-hidden block transition-all duration-500 " +
              (d.disabled
                ? "opacity-70 cursor-not-allowed"
                : "hover:ring-glow hover:-translate-y-1");

            return d.href ? (
              <a
                key={d.os}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <div key={d.os} className={cls} aria-disabled>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const Install = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => (
  <section
    ref={ref}
    id="install"
    className="snap-section flex items-center justify-center px-6 py-24"
  >
    <div className="max-w-4xl w-full space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Install via CLI
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold">
          One command. <span className="text-gradient">You're in.</span>
        </h2>
      </div>

      <div className="space-y-6">
        <InstallBlock
          label="Recommended · pipx"
          command="pipx install rays-core"
        />
        <InstallBlock label="pip" command="pip install rays-core" />
        <InstallBlock
          label="From source"
          command={`git clone ${GITHUB_REPO_URL}.git && cd RAYS-CORE && pip install -e .`}
        />
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Quick start
        </p>
        <CopyCommand command="rays /path/to/your/codebase" size="md" />
      </div>
    </div>
  </section>
);

function InstallBlock({ label, command }: { label: string; command: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground font-mono">{label}</p>
      <CopyCommand command={command} />
    </div>
  );
}

function FinalAgent() {
  return (
    <section className="snap-section-hero relative flex items-start justify-center px-6 pt-20">
      <div className="text-center space-y-6">
        <h2
          className="text-[18vw] sm:text-[15vw] font-bold leading-none tracking-tighter text-gradient"
          style={{ textShadow: "0 8px 80px oklch(0.78 0.20 350 / 0.4)" }}
        >
          RAYS
        </h2>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Index · Analyze · Plan · Edit · Ship
        </p>
      </div>
    </section>
  );
}
