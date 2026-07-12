import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/amd")({
  head: () => ({
    meta: [
      { title: "AMD pipeline — Wavefront-aligned fine-tuning" },
      {
        name: "description",
        content:
          "The RAYS Studio AMD pipeline uses Hardware-Cooperative Layer Selection and wavefront-aligned r=64 adapters to saturate ROCm matrix cores.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="The Grid" title="AMD pipeline">
        <p>
          RAYS Studio ships a physically isolated, mathematically optimised
          fine-tuning pipeline for AMD hardware — RDNA and CDNA architectures
          on ROCm/HIP.
        </p>

        <h2>Why a separate path</h2>
        <p>
          AMD GPUs have raw compute in abundance but different roofline
          characteristics from NVIDIA parts: wavefront execution, distinct
          cache hierarchies (WMMA on RDNA3, MFMA on CDNA), and stricter
          memory bandwidth walls on consumer cards. A generic LoRA pipeline
          run on ROCm thrashes cache and launches too many kernels; targeted
          layer selection unlocks the silicon.
        </p>

        <h2>Hardware-Cooperative Layer Selection (HCLS)</h2>
        <ul>
          <li>
            <strong>Frozen:</strong> every normalisation layer (RMSNorm,
            LayerNorm) and every memory-bound activation.
          </li>
          <li>
            <strong>Tuned:</strong> only dense GEMMs —{" "}
            <code>q_proj</code>, <code>v_proj</code>, <code>gate_proj</code>.
          </li>
        </ul>

        <h2>Wavefront-aligned matrices</h2>
        <p>
          AMD executes threads in wavefronts of 64. The pipeline pins the
          LoRA rank to exactly <code>r = 64</code>, so the SVD factors{" "}
          <code>A</code> and <code>B</code> align 1-to-1 with the execution
          paradigm — no register spills, no unused lanes.
        </p>

        <h2>Using it</h2>
        <p>Terminal:</p>
        <CodeBlock>{`rays --studio --amd-sync "your-model-name"`}</CodeBlock>
        <p>GUI:</p>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Open <strong>Settings → AI Providers</strong>.</li>
          <li>Select <strong>RAYS Studio</strong>.</li>
          <li>Toggle <strong>AMD Hardware Fine-Tuning Pipeline</strong>.</li>
          <li>Save.</li>
        </ol>

        <h2>Zero-copy gradient flow</h2>
        <p>
          Base weights stay frozen in system RAM. Only the active batch
          tensors, the SVD basis-restriction mask, and the tiny adapter
          gradient enter VRAM. Consumer 8&nbsp;GB cards handle 7B models
          without OOMing.
        </p>

        <h2>Security</h2>
        <p>
          The AMD extension rides on top of FOGR — the low-rank deltas are
          routed through the aggregation daemon without ever transmitting
          local OSINT data.
        </p>
      </DocPage>
    </DocsLayout>
  ),
});
