import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/architecture")({
  head: () => ({ meta: [{ title: "Architecture — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Core concepts" title="Architecture">
        <p>
          RAYS-CORE is a terminal-first orchestration layer around static
          indexing, embeddings, LLM-guided analysis, planning, permission
          negotiation, code generation, optional shell execution and session
          memory.
        </p>

        <h2>High-level pipeline (edit mode)</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li><strong>Config</strong> — <code>config.yaml</code> (bundled + user defaults).</li>
          <li><strong>Indexing</strong> — populates <code>.rays/</code> with symbol/relationship registries.</li>
          <li><strong>Vector DB</strong> — Chroma-compatible store for semantic candidate lookup.</li>
          <li><strong>Task analysis</strong> — classifies intent, extracts keywords/tools.</li>
          <li><strong>Symbol workflow</strong> — retrieval, merging, explicit-mention parsing.</li>
          <li><strong>Planning</strong> — structured implementation plans within permission envelopes.</li>
          <li><strong>Permissions</strong> — negotiates scopes before edits.</li>
          <li><strong>Anchoring</strong> — resolves where new symbols/files belong.</li>
          <li><strong>Execution</strong> — emits and applies edits.</li>
          <li><strong>Terminal engine</strong> — optional command intents with safety modes.</li>
          <li><strong>Memory</strong> — summaries and embeddings tied to <code>.rays</code>.</li>
        </ol>

        <h2>Alternate paths</h2>
        <ul>
          <li><strong>Default prompt</strong> — agent orchestrator (skills + MCP).</li>
          <li><strong><code>/code</code></strong> — full coding pipeline (indexing, symbols, planning, execution).</li>
          <li><strong><code>/chat</code></strong> — read-only retrieval and answer synthesis.</li>
          <li><strong><code>/mcp</code></strong> — list configured MCP servers and connection status.</li>
        </ul>

        <h2>Agent orchestrator flow</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Discover skills from <code>skills/</code> and <code>~/.rays/skills/</code>.</li>
          <li>Connect MCP servers from config / <code>~/.rays/mcp.json</code>.</li>
          <li>LLM selects required skills and MCP servers.</li>
          <li>LLM builds a spawn plan with a per-step <code>spawn_reason</code>.</li>
        </ol>
      </DocPage>
    </DocsLayout>
  ),
});
