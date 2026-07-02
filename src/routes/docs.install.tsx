import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/install")({
  head: () => ({
    meta: [{ title: "Installation — RAYS Docs" }],
  }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Getting started" title="Installation">
        <h2>Option A — pipx (recommended)</h2>
        <CodeBlock>{`pipx install rays-core
pipx upgrade rays-core`}</CodeBlock>

        <h2>Option B — pip</h2>
        <CodeBlock>{`pip install rays-core
pip install --upgrade rays-core`}</CodeBlock>

        <h2>Development install</h2>
        <CodeBlock>{`git clone https://github.com/RAYS-CORE/RAYS-CORE.git
cd RAYS-CORE
python -m pip install -e .`}</CodeBlock>

        <h2>Environment variables</h2>
        <p>RAYS reads API keys from the environment before prompting:</p>
        <ul>
          <li><code>GEMINI_API_KEY</code> — preferred Gemini key</li>
          <li><code>GOOGLE_API_KEY</code> — Gemini fallback</li>
        </ul>

        <h3>macOS / Linux</h3>
        <CodeBlock>{`export GEMINI_API_KEY="your_gemini_key"
echo 'export GEMINI_API_KEY="your_gemini_key"' >> ~/.zshrc
source ~/.zshrc`}</CodeBlock>

        <h3>Windows (PowerShell)</h3>
        <CodeBlock>{`setx GEMINI_API_KEY "your_gemini_key"`}</CodeBlock>

        <h2>Ollama (local provider)</h2>
        <p>
          Default endpoint is <code>http://localhost:11434</code>. Start the
          Ollama daemon before selecting the local provider in the launcher.
        </p>
      </DocPage>
    </DocsLayout>
  ),
});
