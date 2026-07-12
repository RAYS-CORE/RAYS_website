import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/fogr")({
  head: () => ({
    meta: [
      { title: "FOGR — Federated Orthogonal Graph Routing" },
      {
        name: "description",
        content:
          "The mathematics behind RAYS' federated fine-tuning: execution-state graph loss, SVD subspace allocation, SB-ZGA adapters, and non-destructive summation.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage
        eyebrow="The Grid"
        title="FOGR — Federated Orthogonal Graph Routing"
      >
        <p>
          FOGR is a novel architecture for decentralised execution-state
          fine-tuning. It solves catastrophic interference, behavioural
          forgetting, and consumer VRAM limits in one coherent design.
        </p>

        <h2>1. Execution-state topologies (graph loss)</h2>
        <p>
          Instead of cross-entropy on next-token prediction, FOGR captures
          the agent's real behaviour:
        </p>
        <ul>
          <li>
            When a user asks a complex question, the agent plans and executes
            a chain of tools (e.g. <code>search_web → view_file → run_command</code>).
          </li>
          <li>
            Each session is captured as a <strong>Directed Acyclic Graph</strong>{" "}
            where nodes are context states and edges are tool executions.
          </li>
          <li>
            The custom loss is the <strong>Wasserstein distance</strong>{" "}
            between the LLM's internal attention embeddings and the successful
            DAG path.
          </li>
          <li>
            <strong>Result:</strong> the reasoning engine physically rewires
            toward high-probability investigative flows without touching
            grammar.
          </li>
        </ul>

        <h2>2. SB-ZGA — Spectrally-Bounded Zero-Gated Adapters</h2>
        <p>
          <strong>Zero-gating.</strong> Each adapter is inserted with a scalar
          gate:
        </p>
        <CodeBlock>{`x_{l+1} = BaseLayer_l(x_l) + tanh(α) · Adapter_l(x_l)`}</CodeBlock>
        <p>
          At initialisation <code>α = 0</code>, so <code>tanh(0) = 0</code>{" "}
          and the adapter is a perfect identity on day one. The model is
          untouched until it learns to open the gate.
        </p>
        <p>
          <strong>Orthogonal Cayley weights.</strong> The adapter matrix is
          parameterised as
        </p>
        <CodeBlock>{`W = (I - S)(I + S)^-1     with S^T = -S`}</CodeBlock>
        <p>
          which forces <code>W</code> to be strictly orthogonal, preserving
          activation magnitude (<code>‖Wx‖ = ‖x‖</code>) and preventing
          gradient explosion.
        </p>

        <h2>3. Server-side SVD allocation</h2>
        <ul>
          <li>
            When a client boots (<code>rays --core &lt;hash_key&gt;</code>) it
            reports its hardware profile.
          </li>
          <li>
            The server runs SVD on the base projection matrices:{" "}
            <code>W = U Σ Vᵀ</code>.
          </li>
          <li>
            The server allocates a mathematically independent{" "}
            <strong>orthogonal subspace</strong> and returns it as a
            cryptographic basis-vector set.
          </li>
          <li>
            The client is restricted to learning strictly inside its subspace.
          </li>
        </ul>

        <h2>4. Non-destructive summation</h2>
        <p>
          Because subspaces are orthogonal by construction,
        </p>
        <CodeBlock>{`⟨ΔW_A, ΔW_B⟩ = 0`}</CodeBlock>
        <p>and the server can safely sum instead of averaging:</p>
        <CodeBlock>{`W_new = W_base + ΔW_A + ΔW_B + …`}</CodeBlock>
        <p>
          No intelligence is lost. Millions of decentralised nodes can
          contribute micro-updates simultaneously.
        </p>

        <h2>5. TIES-merge fallback</h2>
        <p>
          If two clients ever share parameter space (e.g. rank overflow), the
          server falls back to TIES-merging: trim noise, elect consensus
          signs, and average only sign-aligned updates so gradient
          cancellation cannot happen.
        </p>

        <h2>6. Format split</h2>
        <ul>
          <li>
            <strong>Inference:</strong> GGUF via <code>llama.cpp</code>{" "}
            (4-bit / 8-bit, memory-mapped).
          </li>
          <li>
            <strong>Training:</strong> Safetensors (FP16 / BF16) loaded in
            4-bit with <code>bitsandbytes</code> QLoRA. Adapters computed in
            PyTorch, saved as a small delta.
          </li>
        </ul>

        <h2>7. End-to-end flow</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Agent runs → JSONL execution graphs written to <code>~/.rays/&lt;session&gt;/</code>.</li>
          <li>Background daemon converts logs to tensors and trains SB-ZGA within its allocated subspace.</li>
          <li>Encrypted <code>ΔW</code> is streamed to the host node.</li>
          <li>Server sums deltas into the master GGUF and hot-swaps <code>llama.cpp</code>.</li>
        </ol>
      </DocPage>
    </DocsLayout>
  ),
});
