import type { RepoDescription } from "../repo-description-types";

export const micrMs26Batch = {
  "m-d/about": {
    paragraphs: [
      "About holds the bio, timeline, and supporting copy that the micr.dev Spline scene renders for the about surface of the 3D portfolio.",
      "Keeping the about narrative separate lets the portfolio treat biography, timeline, and scene-specific copy as their own layer instead of stuffing them into the landing repo.",
      "The repo keeps the same Spline embed, text fragments, and static assets in sync with the rest of micr.dev so the about slide loads instantly with the correct styling."
    ],
    languages: ["JavaScript", "CSS", "HTML"]
  },
  "m-d/blog": {
    paragraphs: [
      "Blog is the static Next.js writeup site that mirrors the provided reference layout while hosting local MDX content.",
      "The site gives the writing stack a dedicated place for editable posts, per-post theming, and draft workflows without dragging in a heavier CMS.",
      "The repo ties together MDX in `content/posts`, a dev-only `/mdx-editor` route, and the surrounding Next.js tooling so every post can be previewed, themed, and published from the same source."
    ],
    languages: ["TypeScript", "MDX", "CSS", "JavaScript"]
  },
  "m-d/micr.dev": {
    paragraphs: [
      "micr.dev is the small 3D portfolio site built with Spline that the landing URL serves with its optical effects and spline-powered camera work.",
      "The site is the portfolio's front door, so the 3D scene, assets, and landing copy live together and can be tuned as one experience.",
      "The repo ships the Spline scene, chrome-safe copy, and the acceleration-friendly build so the site runs smooth whenever hardware acceleration is available."
    ],
    languages: ["JavaScript", "HTML"]
  },
  "m-d/microkeebs": {
    paragraphs: [
      "Microkeebs is a Next.js catalog for the Microkeebs line that houses the showcase pages for each board release, keeb story, and related assets.",
      "The keyboard catalog needed its own layout and data model, with room to tune typography, spacing, and release content without forcing it into the main portfolio.",
      "The project boots from create-next-app, wires up `next/font` with Geist, and keeps the styling logic alongside the TypeScript data so every Microkeebs surface renders the same polished typography."
    ],
    languages: ["TypeScript", "CSS", "JavaScript", "HTML"]
  },
  "m-d/projects": {
    paragraphs: [
      "Projects is the data repo that drives the portfolio listing, serving as the canonical source for the repo metadata, descriptions, and categorization that the UI reads.",
      "The repo keeps the portfolio data editable and reorderable without touching the visual shell, so the collection can be curated as content instead of hard-coded layout.",
      "The TypeScript definitions, metadata map, and supporting tooling keep every entry aligned with the live site while remaining easy to import elsewhere."
    ],
    languages: ["TypeScript", "CSS", "JavaScript"]
  },
  "m-d/quarzite": {
    paragraphs: [
      "Quarzite stores the gallery assets and contextual copy that micr.dev surfaces in its specialized showcase.",
      "Quarzite has its own visual language and context, so the gallery, exports, and supporting narrative live in a dedicated repo instead of being flattened into the main site.",
      "The repo reuses the same Spline exports, static assets, and scripting hooks so the Quarzite scene renders with the intended camera, lighting, and typography."
    ],
    languages: ["JavaScript", "HTML", "CSS", "TypeScript"]
  },
  "m-d/thinko": {
    paragraphs: [
      "Thinko recreates a browser-based Windows XP desktop, complete with taskbar, Start menu, and purpose-built apps such as Paint, Winamp, and My Pictures.",
      "thinko.micr.dev depends on the desktop metaphor, so the XP shell, playful apps, and moderation flows are all built around that one interface.",
      "The repo pairs the custom CRA front-end with Vercel Functions APIs so the desktop, moderation workflows, and embedded games stay in lockstep."
    ],
    languages: ["HTML", "JavaScript", "CSS"]
  },
  "m-d/tokens": {
    paragraphs: [
      "Tokens, also known as slopmeter, is the CLI and companion web surface that turns a calendar of Claude Code, Codex, Cursor, and other usage logs into rolling heatmaps.",
      "The tool gives one reproducible view of multi-provider token usage, replacing spreadsheets and scattered provider dashboards with a single data path.",
      "The project uses Bun for the CLI and Next.js for the hosted page, ties both to the same data path, and exposes knobs so the heatmap, JSON export, and SVG artefacts can all be regenerated from one command."
    ],
    languages: ["TypeScript", "CSS", "JavaScript"]
  },
  "ms26/bansho": {
    paragraphs: [
      "Bansho is the MCP gateway that injects API-key auth, role-based tool allow-lists, rate limiting, and a PostgreSQL audit log in front of any upstream server.",
      "MCP deployments need auth, tool policy, and audit controls in one place, and Bansho puts that checkpoint in front of any upstream server.",
      "The Go service layers Postgres, Redis, and its YAML policies so every call goes through auth → authz → rate → audit before forwarding, and it always fails closed when a store or policy is missing."
    ],
    languages: ["Go", "HTML", "Bicep", "Dockerfile"]
  },
  "ms26/delvn": {
    paragraphs: [
      "Delvn is a multi-agent CTI pipeline that ingests CVE feeds, AlienVault OTX pulses, and security RSS advisories to output a prioritized executive brief.",
      "Delvn filters threat feeds down to the signals that actually touch a declared stack instead of dumping another firehose of raw alerts into the inbox.",
      "The repo launches collector agents, runs Azure-vector correlation, scores findings against the stack profile, and renders a markdown brief ready for leadership review."
    ],
    languages: ["Python"]
  },
  "ms26/indagine": {
    paragraphs: [
      "Indagine is a forensic meta-agent that wraps failing subject agents, captures OpenTelemetry traces, and classifies the root cause before anyone has to guess what broke.",
      "Indagine turns agent crashes into trace-backed evidence instead of leaving the debugging process to memory and guesswork.",
      "The Python pipeline persists traces, runs analyzers, maps each failure to one of six taxonomy categories, and emits diff-ready fix proposals complete with rationale."
    ],
    languages: ["Python"]
  },
  "ms26/jarspect": {
    paragraphs: [
      "Jarspect is an AI-first scanner for Minecraft mods that combines MalwareBazaar hash lookups, deep bytecode capability extraction, and an Azure OpenAI verdict.",
      "The scanner targets obfuscated jar malware that slips past text heuristics and simple signatures, where the interesting behavior only shows up after deeper inspection.",
      "The pipeline uploads the jar, extracts constant pools, runs YARA per entry, builds a capability profile, asks the AI for a verdict, and lets a static-override layer lock in MALICIOUS when high-confidence signals fire."
    ],
    languages: ["Rust", "TypeScript", "Shell", "YARA"]
  },
  "ms26/repatrol": {
    paragraphs: [
      "Repatrol is a Playwright QA swarm that serves a target game, explores every state, and watches for the deterministic crash path until it happens.",
      "The point is continuous pressure-testing with screenshot and video evidence, so crashes can turn into draft GitHub issues instead of disappearing between manual playtests.",
      "The repo links the built-in HTTP server to the explorer, chaos, detector, and reporter phases so every run writes structured artifacts, uploads a screenshot, and drafts the issue body automatically."
    ],
    languages: ["TypeScript"]
  },
  "ms26/spikehound": {
    paragraphs: [
      "Spikehound hunts Azure cost spikes by running five investigator agents in parallel, synthesizing their findings, and recommending next steps before a human checks the dashboard.",
      "Spikehound closes the gap between a firing Azure Monitor alert and a usable remediation plan without poking the cloud account with blind follow-up actions.",
      "The C# Azure Functions pipeline fans out to Cost, Resource, and History agents, coordinates a Foundry diagnosis, and gates every remediation behind Slack/Discord approvals and safety toggles."
    ],
    languages: ["C#"]
  }
} as const satisfies Record<string, RepoDescription>;
