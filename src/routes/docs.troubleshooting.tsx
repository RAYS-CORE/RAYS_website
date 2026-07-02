import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/troubleshooting")({
  head: () => ({ meta: [{ title: "Troubleshooting — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Reference" title="Troubleshooting">
        <h2><code>config.yaml not found</code></h2>
        <p>Pass an explicit config path:</p>
        <CodeBlock>{`rays --config /absolute/path/to/config.yaml`}</CodeBlock>

        <h2>Ollama not reachable</h2>
        <p>
          Default Ollama URL is <code>http://localhost:11434</code>. Start the
          daemon before selecting the local provider in the launcher.
        </p>

        <h2>Gemini / API keys</h2>
        <p>
          Prefer environment variables: <code>GEMINI_API_KEY</code> or{" "}
          <code>GOOGLE_API_KEY</code>. Keys are intentionally not persisted in
          YAML.
        </p>

        <h2><code>rays</code> command not found</h2>
        <ul>
          <li><strong>pipx</strong> — run <code>pipx ensurepath</code>, open a new shell.</li>
          <li><strong>pip</strong> — ensure your Python Scripts / <code>bin</code> directory is on PATH.</li>
        </ul>

        <h2>MCP servers not connecting</h2>
        <ul>
          <li>Backend not running — many MCP servers are bridges; the underlying app must also be up.</li>
          <li><code>command</code> not on PATH when launched from a GUI — use the absolute path from <code>which &lt;command&gt;</code>.</li>
          <li>Two clients at once — don't run the same MCP server in RAYS and another client simultaneously.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  ),
});
