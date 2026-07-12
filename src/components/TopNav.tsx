import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

export function TopNav({ onInstallClick }: { onInstallClick?: () => void } = {}) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-4">
      <nav className="mx-auto max-w-7xl glass rounded-2xl px-5 py-3 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div
            className="h-8 w-8 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, var(--rays-pink), var(--rays-lavender), var(--rays-lilac), var(--rays-pink))",
              boxShadow: "0 0 20px var(--rays-accent, var(--rays-pink))",
            }}
          />
          <span className="text-xl font-bold tracking-tight">
            RAYS<span className="text-gradient"> Foundation</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 text-sm">
          <Link
            to="/agent"
            className="hidden md:inline-flex px-3 py-2 rounded-lg hover:bg-white/5 transition"
          >
            Agent
          </Link>
          <Link
            to="/grid"
            className="hidden md:inline-flex px-3 py-2 rounded-lg hover:bg-white/5 transition"
          >
            Grid
          </Link>
          <Link
            to="/spy"
            className="hidden md:inline-flex px-3 py-2 rounded-lg hover:bg-white/5 transition"
          >
            Spy
          </Link>
          <Link
            to="/docs"
            className="hidden sm:inline-flex px-3 py-2 rounded-lg hover:bg-white/5 transition"
          >
            Docs
          </Link>
          {onInstallClick ? (
            <button
              onClick={onInstallClick}
              className="px-4 py-2 rounded-lg font-medium text-foreground/95 hover:opacity-90 transition"
              style={{
                background:
                  "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
              }}
            >
              Install
            </button>
          ) : (
            <Link
              to="/agent"
              hash="install"
              className="px-4 py-2 rounded-lg font-medium text-foreground/95 hover:opacity-90 transition"
              style={{
                background:
                  "linear-gradient(110deg, var(--rays-pink), var(--rays-lavender))",
              }}
            >
              Install
            </Link>
          )}
          <a
            href="https://github.com/RAYS-CORE/RAYS-CORE"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
