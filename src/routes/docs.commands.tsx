import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage } from "@/components/DocsLayout";

const commands: [string, string][] = [
  ["/help", "Show all commands."],
  ["/chat <question>", "Read-only contextual Q&A over the repo."],
  ["/code <prompt>", "Run the full editing pipeline."],
  ["/model <name>", "Switch model."],
  ["/mode auto", "Autonomous command execution."],
  ["/mode ask", "Ask-permission command execution."],
  ["/git", "Summarize current git changes."],
  ["/mcp", "List MCP servers and connection status."],
  ["/clear", "Clear screen."],
  ["/exit", "Exit RAYS."],
];

export const Route = createFileRoute("/docs/commands")({
  head: () => ({ meta: [{ title: "Slash commands — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Reference" title="Slash commands">
        <div className="not-prose overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Command</th>
                <th className="text-left px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {commands.map(([c, d]) => (
                <tr key={c} className="border-t border-white/5">
                  <td className="px-4 py-3 font-mono text-pink">{c}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Execution behavior</h2>
        <ul>
          <li><strong>Ask mode</strong> — requests confirmation for terminal actions.</li>
          <li><strong>Autonomous mode</strong> — executes without per-command confirmation.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  ),
});
