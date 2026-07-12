import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/studio")({
  head: () => ({
    meta: [
      { title: "RAYS Studio — Local daemon & desktop app" },
      {
        name: "description",
        content:
          "RAYS Studio hosts the local half of the Grid: inference on port 8001, federated sync on 8000, hot-swappable GGUF models.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="The Grid" title="RAYS Studio">
        <p>
          <strong>RAYS Studio</strong> is the desktop daemon that runs the
          local half of the Grid. It hosts inference through{" "}
          <code>llama.cpp</code>, runs the SB-ZGA fine-tuning loop in the
          background, and syncs orthogonal deltas with the federation.
        </p>

        <h2>Pipeline</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>
            <strong>Inference &amp; logging.</strong> The agent hits the local
            OpenAI-compatible endpoint; every session is written to{" "}
            <code>~/.rays/logs/success/</code>.
          </li>
          <li>
            <strong>Local fine-tuning.</strong> The daemon ingests logs,
            builds PyTorch tensors, and trains an SB-ZGA adapter on MPS or
            CUDA.
          </li>
          <li>
            <strong>SVD constraint &amp; compile.</strong> The adapter is
            spectrally bounded, merged with the base GGUF, and recompiled by{" "}
            <code>llama.cpp</code>.
          </li>
          <li>
            <strong>Federated sync.</strong> The orthogonal delta is hashed
            and pushed to the global hub.
          </li>
          <li>
            <strong>Hot-swap.</strong> The new GGUF is swapped into the
            server with zero downtime.
          </li>
        </ol>

        <h2>Core commands</h2>
        <CodeBlock>{`rays --studio                # open the interactive TUI
rays --studio --start        # launch the daemon (FastAPI :8000, llama.cpp :8001)
rays --studio --force-sync   # manually trigger local fine-tune + push`}</CodeBlock>

        <h2>Connecting the agent</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Run <code>rays</code>.</li>
          <li>Choose <strong>Select AI Provider → RAYS Studio</strong>.</li>
          <li>
            Enter the base URL:
            <CodeBlock>{`# Local
http://localhost:8001/v1

# Remote node
http://<NODE_IP>:8001/v1`}</CodeBlock>
          </li>
        </ol>

        <h2>Storage layout</h2>
        <ul>
          <li><code>~/.rays/models/</code> — base and hot-swapped GGUFs</li>
          <li><code>~/.rays/logs/success/</code> — training data</li>
          <li>
            Older GGUFs are targeted for garbage collection during hot-swap
            to keep disk usage bounded.
          </li>
        </ul>

        <h2>Multi-client federation</h2>
        <p>
          Because Studio exposes a clean OpenAI-compatible API, topologies
          scale trivially:
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Deploy one server node with <code>rays --studio --start</code>.</li>
          <li>Point every client's base URL at that node's <code>:8001/v1</code>.</li>
          <li>
            Each client runs its own <code>--force-sync</code> locally,
            producing deltas that stream back to the server.
          </li>
        </ol>
        <p>
          The central server never bottlenecks on training compute — the
          heavy PyTorch math stays on the edge.
        </p>
      </DocPage>
    </DocsLayout>
  ),
});
