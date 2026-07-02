import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/skills")({
  head: () => ({ meta: [{ title: "Skills — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Core concepts" title="Skills">
        <p>
          <strong>Skills</strong> teach the default agent orchestrator how to
          work in your local workspace: list files, run shell commands,
          read/write/patch files, and use bundled scripts or templates shipped
          with the skill.
        </p>

        <h2>How it works</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>RAYS scans skill directories and loads every folder that contains <code>SKILL.md</code>.</li>
          <li>The orchestrator selects required skill names for each prompt.</li>
          <li>The planner emits spawn steps with a <code>spawn_reason</code> per skill.</li>
          <li>Each skill runs as a dynamic sub-agent until <code>status: completed</code>.</li>
        </ol>

        <h2>Where skills live</h2>
        <ul>
          <li><code>&lt;project&gt;/skills/&lt;name&gt;/</code> — this repo only.</li>
          <li><code>~/.rays/skills/&lt;name&gt;/</code> — all projects on this machine.</li>
        </ul>

        <h2>Layout</h2>
        <CodeBlock>{`skills/
└── my-skill/
    ├── SKILL.md         # required — instructions + frontmatter
    ├── scripts/         # optional — shell helpers
    ├── templates/       # optional — doc templates
    └── LICENSE.txt      # optional`}</CodeBlock>

        <h2>SKILL.md frontmatter</h2>
        <CodeBlock>{`---
name: my-skill
description: One line explaining what this skill does.
---

# My Skill

Instructions, constraints, examples.`}</CodeBlock>
      </DocPage>
    </DocsLayout>
  ),
});
