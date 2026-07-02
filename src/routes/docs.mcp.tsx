import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/mcp")({
  head: () => ({ meta: [{ title: "MCP servers — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Core concepts" title="MCP servers">
        <p>
          RAYS connects to Model Context Protocol (MCP) servers so the default
          agent orchestrator can use external tools — browsers, GitHub,
          databases, 3D apps, anything that exposes an MCP server over stdio.
        </p>

        <h2>How it works</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>RAYS spawns selected servers as child processes (<code>command</code> + <code>args</code>).</li>
          <li>RAYS speaks MCP over the process's stdin/stdout.</li>
          <li>At connect time, <code>list_tools</code> registers tools under <code>server_name/tool_name</code>.</li>
          <li>For each MCP step, a dynamic sub-agent loops until its objective is met.</li>
        </ol>

        <h2>Where to configure</h2>
        <ul>
          <li><code>config.yaml → mcp_servers:</code> — install defaults.</li>
          <li><code>~/.rays/mcp.json</code> — global, all projects (recommended).</li>
          <li><code>&lt;project&gt;/.rays/mcp.json</code> — project only (highest priority).</li>
        </ul>

        <h2>Example — Blender MCP</h2>
        <CodeBlock>{`{
  "mcp_servers": [
    {
      "name": "blender",
      "description": "Blender 3D scene tools",
      "command": "uvx",
      "args": ["blender-mcp"],
      "env": {
        "BLENDER_HOST": "localhost",
        "BLENDER_PORT": "9876"
      }
    }
  ]
}`}</CodeBlock>

        <p>Run <code>/mcp</code> in RAYS to see configured servers and connection status.</p>

        <h2>RAYS vs Claude / Cursor</h2>
        <p>
          RAYS uses an <code>mcp_servers</code> <em>array</em>, not Claude's
          <code>mcpServers</code> object. The inner fields (<code>command</code>,
          <code>args</code>, <code>env</code>) are the same — just copy the
          server entry into the RAYS array.
        </p>
      </DocPage>
    </DocsLayout>
  ),
});
