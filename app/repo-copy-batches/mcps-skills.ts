import type { RepoDescription } from "../repo-description-types";

export const mcpsSkillsBatch = {
  "camofox-mcp": {
    paragraphs: [
      "camofox-mcp exposes the full camofox-browser workflow, including tabs, navigation, interaction, snapshots, cookie import, and macros, as dedicated MCP tools.",
      "Agents need that because manual browser control is fragile and every tab, snapshot, and cookie task would otherwise become a brittle sequence of shell commands.",
      "It maps each browser endpoint to its own MCP handler, keeps camofox credentials and timeouts in explicit env vars, and surfaces health diagnostics for the session.",
    ],
    languages: ["TypeScript", "JavaScript"],
  },
  "catbox-mcp": {
    paragraphs: [
      "catbox-mcp is a JavaScript MCP server for uploading files to Catbox.moe and Litterbox while also handling albums and deletions.",
      "Agents need this because they regularly need reliable storage for large artifacts without leaving the prompt, but Catbox exposes no agent-friendly API.",
      "The server exposes upload and delete helpers, userhash support, and a `CATBOX_USERHASH`-driven account link so uploads stay tagged consistently.",
    ],
    languages: ["JavaScript"],
  },
  "chatgpt-webui-mcp": {
    paragraphs: [
      "chatgpt-webui-mcp automates chatgpt.com through camofox so MCP clients can run GPT-5.2 Pro prompts, image generation, and long-running research without manual browser fiddling.",
      "Deep research and image jobs exceed standard timeouts, so teams needed a reliable automation surface that preserved the existing session token mechanics.",
      "It keeps that automation alive by passing session tokens via env vars, exposing natural-language wrapper tools for unified prompts and runs, and offering long-run tooling plus SSE deployment templates.",
    ],
    languages: ["TypeScript", "JavaScript"],
  },
  "discord-self-mcp": {
    paragraphs: [
      "discord-self-mcp is a Python MCP server around discord.py-self that lets your agent act through your personal Discord account for DMs, server management, and interactions.",
      "Regular bots cannot read your DMs or behave as the user, so automation still needed a self-hosted bridge that respected token control and rate limits.",
      "The package bundles setup wizards, rate limiting, captcha solving, discrawl integration, and an optional CLI skill mode to keep every action runnable as MCP or a daemon.",
    ],
    languages: ["Python", "JavaScript"],
  },
  "kagi-mcp": {
    paragraphs: [
      "kagi-mcp is a tiny Rust server that wraps the existing kagi-cli binary and surfaces search, assistant, translate, summarize, news, and enrichment tools through MCP.",
      "Clients required it because duplicating the CLI logic for MCP would break parity with credentials, but they still needed a local endpoint they could spawn from Claude, Zed, or OpenCode.",
      "It stays minimal by spawning `kagi` for each call, parsing the JSON output the CLI already emits, and honoring configurable session or API tokens plus timeout overrides.",
    ],
    languages: ["Rust"],
  },
  "namecheap-mcp": {
    paragraphs: [
      "namecheap-webui-mcp drives the Namecheap dashboard via Playwright so agents can manage domains without an API key or IP allowlist.",
      "Domain operators still depend on the web UI for DNS, nameserver, and feature toggles, so there had to be a scripted version of the manual workflow.",
      "It reuses `storage-state.json` for auth persistence, exposes tools for dashboards, domains, DNS, and features, and keeps base URLs, headless mode, and navigation timeouts configurable through env vars.",
    ],
    languages: ["TypeScript"],
  },
  "perplexity-mcp": {
    paragraphs: [
      "perplexity-webui-mcp launches the upstream perplexity-webui-scraper MCP server so you can query Perplexity Pro via a WebUI session token.",
      "The WebUI is the only way to reach their models, but long research jobs are fragile without a battle-tested wrapper, so agents needed a reliable automation surface.",
      "This package pins the upstream runner, proxies session and proxy envs, exposes model-specific tools, and documents Tailscale and SSE deployment templates.",
    ],
    languages: ["TypeScript", "JavaScript"],
  },
  "claude-skills": {
    paragraphs: [
      "ordinary-claude-skills aggregates hundreds of Claude prompt packages and scripts into categorized folders with supporting documentation.",
      "Claude workflows benefit from reusable skills, but the useful community material was scattered and inconsistent until it was pulled into one local catalog.",
      "The repo keeps `skills_all` and `skills_categorized`, provides MCP filesystem config snippets, and links every slash-command workflow back to the documentation site.",
    ],
    languages: ["Python", "PowerShell", "Shell", "JavaScript"],
  },
  "gsap-skills": {
    paragraphs: [
      "gsap-skills packs Opencode reference skills for GSAP animation patterns: timelines, ScrollTrigger, text, SVG, FLIP, draggable, observer, easing, React helpers, and performance notes.",
      "Animation engineers kept rewriting the same examples, so there needed to be a centralized, copy-and-paste-friendly catalog of GSAP techniques.",
      "It ships the `skills/` folders plus the `/gsap` command, installation instructions for syncing skills and commands into Opencode, and a reminder about the GSAP standard no-charge license.",
    ],
    languages: ["JavaScript", "Markdown"],
  },
  "seedance-skills": {
    paragraphs: [
      "seedance-skills bundles Opencode prompt packages for Seedance 2.0 video generation, covering repo analysis, script writing, segment prompts, montage selection, and prompt packs.",
      "Ship-ready software promos need a repeatable workflow instead of ad hoc instructions, so the skills encode the repo-first montage method with clear steps.",
      "The repo exposes the `/seedance-prompts` command, the `seedance` and `seedance-prompt-generator` skills, and instructions for syncing those folders into the local skills directory.",
    ],
    languages: ["Markdown", "JavaScript"],
  },
} as const satisfies Record<string, RepoDescription>;
