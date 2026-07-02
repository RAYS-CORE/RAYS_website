import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/publishing")({
  head: () => ({ meta: [{ title: "Publishing — RAYS Docs" }] }),
  component: () => (
    <DocsLayout>
      <DocPage eyebrow="Reference" title="Publishing">
        <p>Maintainer checklist for a new release.</p>

        <h2>Pre-release</h2>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Bump <code>version</code> in <code>pyproject.toml</code> and <code>setup.py</code>.</li>
          <li>Move <code>[Unreleased]</code> entries under a dated section in <code>CHANGELOG.md</code>.</li>
          <li>Run tests, build, and <code>twine check</code>.</li>
        </ol>

        <CodeBlock>{`python -m pip install -e ".[dev]"
python -m pytest tests/ -q
python -m build
twine check dist/*`}</CodeBlock>

        <h2>Publish to PyPI</h2>
        <CodeBlock>{`python -m pip install --upgrade build twine
rm -rf dist/ build/ *.egg-info
python -m build
twine check dist/*
twine upload dist/*`}</CodeBlock>

        <h2>TestPyPI (dry run)</h2>
        <CodeBlock>{`twine upload --repository testpypi dist/*
pip install -i https://test.pypi.org/simple/ rays-core==1.6.0`}</CodeBlock>
      </DocPage>
    </DocsLayout>
  ),
});
