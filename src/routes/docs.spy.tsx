import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout, DocPage, CodeBlock } from "@/components/DocsLayout";

export const Route = createFileRoute("/docs/spy")({
  head: () => ({
    meta: [
      { title: "RAYS Spy — Agentic OSINT Reconnaissance" },
      {
        name: "description",
        content:
          "Official documentation for RAYS Spy: the agentic OSINT reconnaissance platform combining hundreds of tools under one MCP-driven loop.",
      },
    ],
  }),
  component: () => (
    <DocsLayout>
      <DocPage
        eyebrow="Core Concepts"
        title="RAYS Spy — Agentic OSINT"
      >
        <p>
          RAYS Spy is an advanced Open-Source Intelligence (OSINT) platform that unifies hundreds of disparate reconnaissance tools under a single, cohesive AI-driven pipeline. It enables the RAYS Agent, acting through the Model Context Protocol (MCP), to perform deep, autonomous investigations across a vast array of data sources using local models.
        </p>

        <h2>1. The Agentic OSINT Loop</h2>
        <p>
          RAYS Spy doesn't just provide a list of tools—it orchestrates them. When the RAYS Agent receives an OSINT objective, it sequentially utilizes tools, evaluates their outputs, and determines the next optimal investigative step. 
        </p>
        <p>
          Furthermore, every step taken acts as a training signal. By leveraging the FOGR architecture, the local model is continuously fine-tuned on successful execution paths. The goal is <strong>agentic reconnaissance on anyone, anywhere, entirely locally and fast.</strong>
        </p>

        <h2>2. Identity & Social Footprint</h2>
        <ul>
          <li>
            <strong>Sherlock (<code>sherlock.py</code>)</strong>: A high-performance wrapper around pySherlock for rapid username enumeration across 400+ social media networks, forums, and websites.
          </li>
          <li>
            <strong>Search Collector (<code>search_collector.py</code>)</strong>: Uses SerpAPI for batched Google Search collections to gather wide-net intelligence efficiently.
          </li>
          <li>
            <strong>Spiderfoot</strong>: Deep integration with the Spiderfoot passive surface reconnaissance engine.
          </li>
        </ul>

        <h2>3. Face Recognition & Clustering</h2>
        <p>
          Visual intelligence is processed through a multi-stage computer vision pipeline:
        </p>
        <ul>
          <li>
            <strong>InsightFace Integration (<code>face_match.py</code>, <code>face_engine.py</code>)</strong>: Generates high-dimensional face embeddings using the ArcFace / buffalo_l model.
          </li>
          <li>
            <strong>DBSCAN Clustering</strong>: Groups and clusters faces by cosine distance (Phase B5), enabling cross-platform identity tracking.
          </li>
          <li>
            <strong>Perceptual Hashing (<code>pHash</code>)</strong>: Detects duplicate images across the internet (Phase B3) to trace the origin of visual media.
          </li>
          <li>
            <strong>Reverse Image Search (<code>image_search.py</code>)</strong>: Automates reverse lookups across Google, Bing, and Yandex.
          </li>
        </ul>

        <h2>4. Real-time Surveillance & Tracking</h2>
        <ul>
          <li>
            <strong>Flight & Military Tracking</strong>: Search and track flights, including military aircraft, using flight numbers, origins, and destinations.
          </li>
          <li>
            <strong>Satellite Integration</strong>: Access commercial and public satellite feeds, including real-time orbital paths and elements.
          </li>
          <li>
            <strong>Global CCTV & Live Data</strong>: Tap into global public CCTV directories, real-time traffic data, and DEM (Digital Elevation Model) data.
          </li>
        </ul>

        <h2>5. Advanced Harvesting & Graph Building</h2>
        <ul>
          <li>
            <strong>Playwright</strong>: Automates headless browsers for scraping JS-rendered pages, utilizing <code>urllib.request</code> as a fast HTTP fallback.
          </li>
          <li>
            <strong>Platform-Specific Validators</strong>: Uses YAML rules and HTML pattern matching to validate targets on platforms like GitHub, LinkedIn, and Twitter.
          </li>
          <li>
            <strong>Regex-based PII Extractors</strong>: Harvests emails, phone numbers, and websites during the Evidence Harvesting phase (Phase A5).
          </li>
          <li>
            <strong>Knowledge Graph (<code>knowledge_graph.py</code>)</strong>: Automatically builds relationship graphs and entity linkages from all gathered intelligence.
          </li>
        </ul>

        <div className="mt-12 rounded-3xl overflow-hidden ring-glow border border-white/15" style={{ background: "oklch(0.06 0.02 300)", aspectRatio: "16 / 9" }}>
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/WCxaYUR5q20?rel=0&modestbranding=1"
            title="RAYS Spy Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </DocPage>
    </DocsLayout>
  ),
});
