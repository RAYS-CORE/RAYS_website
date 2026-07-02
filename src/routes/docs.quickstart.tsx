import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/quickstart")({
  head: () => ({
    meta: [{ title: "Quickstart — RAYS Docs" }],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Getting started" title="Quickstart">
        <p>Point RAYS at any local repository:</p>
        <CodeBlock>{`rays /path/to/your/codebase`}</CodeBlock>
        <p>Or from inside a repo:</p>
        <CodeBlock>{`cd /path/to/your/codebase
rays`}</CodeBlock>

        <h2>Operating modes</h2>
        <h3>Agent orchestrator (default prompt)</h3>
        <p>
          Type a normal prompt. RAYS discovers skills and MCP servers, plans
          spawn steps and runs dynamic sub-agents. Use this for Blender, docs,
          GitHub MCP and local file/shell tasks.
        </p>

        <h3>Editing mode — <code>/code</code></h3>
        <p>
          Analyzes the task, identifies symbols and files, negotiates
          permissions, plans edits and applies changes.
        </p>

        <h3>Chat mode — <code>/chat</code></h3>
        <p>Read-only, contextual Q&A over your repo. No edits.</p>

        <h2>Example prompts</h2>
        <CodeBlock>{`# agent orchestrator
> List this project's top-level files and summarize the README.

# editing
> /code Refactor auth middleware to support JWT refresh tokens.

# chat
> /chat how does the permission negotiation pipeline work in this repo?`}</CodeBlock>
      </DocPage>
    </DocsLayout>
  ),
});
