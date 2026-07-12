import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout, DocPage } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/grid")({
  head: () => ({
    meta: [
      { title: "The Grid — RAYS Docs" },
      {
        name: "description",
        content:
          "RAYS Grid: federated fine-tuning built on FOGR, SB-ZGA adapters, and orthogonal SVD subspaces.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="The Grid" title="Overview">
        <p>
          <strong>The Grid</strong> is the RAYS Foundation's federated
          fine-tuning fabric. It lets thousands of consumer machines
          contribute training signal to a single global model without the
          collapse modes that break naive federated learning.
        </p>

        <h2>The three problems it solves</h2>
        <ul>
          <li>
            <strong>Catastrophic interference.</strong> Two nodes learning
            unrelated behaviours pull the base weights in opposite
            directions. Naive FedAvg (<code>(W_A + W_B) / 2</code>) destroys
            both updates.
          </li>
          <li>
            <strong>Behavioural forgetting.</strong> Fine-tuning on JSON
            tool-calling text erodes the model's conversational reasoning
            and general knowledge.
          </li>
          <li>
            <strong>Consumer VRAM limits.</strong> Adam optimiser state
            alone blows past 8&nbsp;GB. Local training on a laptop GPU is
            usually impossible for 7B+ models.
          </li>
        </ul>

        <h2>The three ideas that fix them</h2>
        <ul>
          <li>
            <strong>Execution-state graph loss.</strong> We tune on the DAG
            of tool calls the agent actually ran, not on next-token
            cross-entropy. Grammar stays intact.
          </li>
          <li>
            <strong>Server-side SVD allocation.</strong> The server
            decomposes <code>W = U Σ Vᵀ</code> and hands each client a
            strictly orthogonal subspace. Updates can only live inside
            that subspace.
          </li>
          <li>
            <strong>Non-destructive summation.</strong> Because the
            subspaces are orthogonal by construction, the server{" "}
            <em>sums</em> deltas instead of averaging them:{" "}
            <code>W_new = W_base + ΔW_A + ΔW_B + …</code>
          </li>
        </ul>

        <h2>Where to go next</h2>
        <ul>
          <li>
            <Link to="/docs/fogr">FOGR math</Link> — the full derivation of
            the loss, SVD routing, and TIES fallback.
          </li>
          <li>
            <Link to="/docs/studio">RAYS Studio</Link> — the desktop daemon
            that runs the local half of the pipeline.
          </li>
          <li>
            <Link to="/docs/amd">AMD pipeline</Link> — the wavefront-aligned
            path for ROCm hardware.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  ),
});
