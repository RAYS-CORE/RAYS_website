import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Overview — RAYS Docs" },
      {
        name: "description",
        content:
          "RAYS-CORE is an open-source AI coding assistant for real repositories. Index, analyze, plan, edit, ship.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Getting started" title="Overview">
        <p>
          <strong>RAYS-CORE</strong> is an open-source AI coding assistant for
          local repositories. It indexes your codebase, retrieves relevant
          symbols and files, plans changes, applies edits with permission
          controls, and maintains persistent project memory.
        </p>

        <h2>Why RAYS</h2>
        <ul>
          <li>Works on real codebases with structural, symbol-level indexing.</li>
          <li>
            Supports read-only chat, targeted editing, and new-project
            generation in one CLI.
          </li>
          <li>Provider-flexible: local-first with Ollama, plus Gemini API.</li>
          <li>Tracks context over time via <code>.rays</code> memory.</li>
        </ul>

        <h2>Install</h2>
        <p>The recommended way to install is via <code>pipx</code>:</p>
        <CodeBlock>{`pipx install rays-core`}</CodeBlock>

        <p>Or with pip:</p>
        <CodeBlock>{`pip install rays-core`}</CodeBlock>

        <h2>Quick start</h2>
        <CodeBlock>{`rays /path/to/your/codebase`}</CodeBlock>

        <p>
          See <Link to="/docs/quickstart">Quickstart</Link> for a full first-run
          walkthrough, or jump to{" "}
          <Link to="/docs/architecture">Architecture</Link> to understand the
          pipeline.
        </p>
      </DocPage>
    </DocsLayout>
  ),
});
