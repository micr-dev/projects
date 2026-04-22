import type { RepoDescription } from "../repo-description-types";

export const softwareBatchB = {
  gitquarry: {
    paragraphs: [
      "Gitquarry is a terminal CLI for advanced GitHub repository search that preserves native GitHub search behavior by default and only enables broader discovery, reranking, and README-aware enrichment on explicit request.",
      "Most search CLIs silently rewrite queries or force ranking heuristics, so gitquarry keeps native semantics intact and makes enhanced modes opt-in for both interactive and scripted workflows.",
      "Built in Rust with cross-platform binaries, npm wrapper, Homebrew, Scoop, and Nix support, it uses host-scoped token storage, structured output modes, and README enrichment to bridge interactive use with shell pipelines.",
    ],
    languages: ["Rust", "JavaScript", "Ruby", "Nix", "Shell"],
  },
  "goofish-watcher": {
    paragraphs: [
      "Goofish-watcher is a Discord-side helper that automates the Goofish QR login, exports the Playwright storage_state, and forwards ai-goofish-monitor events as Discord DMs.",
      "QR login, state export, and webhook alerts are brittle to coordinate on a headless box, so the repo keeps those flows under one small orchestrator.",
      "Slash commands like `/login qr`, `/login export_state`, and `/login status` run Playwright headless, save `storage_state.json`, and relay ai-goofish-monitor hooks into Discord.",
    ],
    languages: ["Python", "Dockerfile"],
  },
  "hermes-nightshift": {
    paragraphs: [
      "Hermes-nightshift is a cron-driven GLM 5.1 assistant that picks your public repos, clones them, and either opens PRs or writes structured issues while the burn window is open.",
      "The burn window is the whole point: leftover GLM budget gets spent on disciplined repo work instead of expiring unused.",
      "Every run checks the brake-gate quota, spins the plan -> implement -> review loop, pushes a PR or issue, and tears down the clone while logging the state.",
    ],
    languages: ["Python"],
  },
  "kagi-cli": {
    paragraphs: [
      "Kagi-cli is the terminal gateway that surfaces every Kagi feature, from search and quick answers to assistant, translation, summarization, feeds, and paid API commands, inside a single binary.",
      "The CLI keeps Kagi scriptable from the shell without splitting credentials across separate tools, so search, session-backed features, and paid API commands all share one interface.",
      "The `kagi auth` flow sets up credentials once, JSON stays the default output for tooling, and commands like `kagi search`, `kagi assistant`, and `kagi fastgpt` all live behind the same binary.",
    ],
    languages: ["Rust", "Shell", "JavaScript", "MDX"],
  },
  "kefine-website": {
    paragraphs: [
      "Kefine-website is the Vite and React storefront for curated replica drops, upcoming pipeline statuses, and a GitHub Gist-powered CMS with a Three.js logo and sound cues.",
      "The storefront needs a curated presentation for drops, production previews, and admin-managed data rather than scattering media handling and CMS edits across disconnected tools.",
      "Tailwind, shadcn/ui, Framer Motion, GSAP, and the Gist-backed admin keep products and pipeline metadata editable without touching raw JSON.",
    ],
    languages: ["TypeScript", "CSS", "HTML", "JavaScript"],
  },
  mullgate: {
    paragraphs: [
      "Mullgate is a CLI that turns one Mullvad subscription into a managed set of authenticated SOCKS5, HTTP, and HTTPS listeners tied to explicit route aliases.",
      "Tunneling the entire host through Mullvad wastes devices and hides operator visibility, so Mullgate exposes per-route listeners, relay selection, and diagnostics for the traffic you choose.",
      "The guided `mullgate setup` flow writes canonical config plus runtime artifacts, and the same surface powers `proxy start`, `proxy status`, `proxy doctor`, and relay tooling.",
    ],
    languages: ["TypeScript", "Shell", "PowerShell", "JavaScript"],
  },
  nagrom: {
    paragraphs: [
      "Nagrom is a self-hostable Discord bot that routes claims through a tiered fact-checking pipeline, forces JSON outputs, and keeps every verdict stored in SQLite.",
      "Servers need BYOK support, multi-provider retrieval, and explicit cost tracking instead of ad hoc quick checks, so Nagrom locks down retrieval and tiered scoring before replying.",
      "The Python async core, GUI setup wizard, and SQLite history keep the verification pipeline guided while synthesis, severity scoring, and structured responses happen automatically.",
    ],
    languages: ["Python", "HTML", "TeX", "Mermaid"],
  },
  onairo: {
    paragraphs: [
      "Onairo is a Chromium extension that captures selections, clipboard text and images, and right-click content, sends it to hosted providers or the Codex native bridge, and returns answers for copy, paste, typing, or tooltip overlays.",
      "One-shot workflows need minimal friction: grab something, route it to Kimi, OpenRouter, Z.ai, or a custom OpenAI-compatible endpoint, and surface the result without leaving the page.",
      "The React and TypeScript popup, live settings previews, and optional Codex native host keep the loop fast while still supporting provider choice and styled overlays.",
    ],
    languages: ["TypeScript", "JavaScript", "CSS", "HTML"],
  },
  "opencode-studio": {
    paragraphs: [
      "Opencode-studio is the Next.js and Express GUI that lets you toggle MCP servers, edit skills and plugins, manage auth, and watch usage without hand-editing OpenCode JSON.",
      "OpenCode configs grow complex quickly, so the tool uses profiles, backups, dashboards, and import helpers instead of forcing everyone to edit raw files.",
      "The browser frontend talks to the Express backend, reads `~/.config/opencode`, writes edits back to disk, and exposes deep-link protocols plus GitHub sync from the same surface.",
    ],
    languages: ["TypeScript", "JavaScript", "CSS", "Shell"],
  },
  openslate: {
    paragraphs: [
      "Openslate reroutes Slate traffic through a local CLIProxyAPI instance so your Slate sessions stay on your own credits instead of forcing Random Labs charges.",
      "Slate users still need the workflow, but not the forced Random Labs billing, so the project rewrites the route to a local CLIProxyAPI proxy instead.",
      "A simple `node install.mjs` drop-in rewrites `/v3/stream` traffic and logs the rewrites for verification.",
    ],
    languages: ["JavaScript", "Shell"],
  },
  protoncode: {
    paragraphs: [
      "Protoncode is a tray-first desktop app for Windows and Linux that watches a live Proton Mail session and surfaces masked OTP notifications near the system tray.",
      "Opening Proton Mail every time leaks codes and interrupts workflows, so Protoncode keeps a hidden window with masked overlays that only reveal codes when the user asks.",
      "The Rust binary hosts embedded webviews, hooks autostart keys, and lets you reveal or copy codes without opening the inbox.",
    ],
    languages: ["Rust"],
  },
  scudo: {
    paragraphs: [
      "Scudo is a Windows 11 hardening menu that groups each control with visible rationale, presets, and rollback snapshots instead of a pile of scripts.",
      "Blunt hardening scripts hide what they change, so Scudo keeps CLI and GUI menus with presets, snapshots, and optional helper installs so you can decide what to apply.",
      "The menu exposes CLI commands, GUI toggles, rollback snapshots, and optional helper installs so each step can be audited, applied, or undone.",
    ],
    languages: ["PowerShell", "Batchfile"],
  },
  sincronizado: {
    paragraphs: [
      "Sincronizado's `sinc` CLI keeps your local files in sync with a remote VPS so heavy AI agents run there while you edit with your local editor.",
      "Laptops have good editors but weak compute, so the project bridges that gap with Mutagen, SSH, and tmux instead of forcing you to edit directly on the server.",
      "The tool orchestrates Mutagen sync sessions, tmux persistence, and resume helpers so the remote workspace mirrors your local tree.",
    ],
    languages: ["TypeScript", "Shell", "PowerShell", "MDX"],
  },
  SpainGPT: {
    paragraphs: [
      "SpainGPT is a Discord bot that automates sales, subscription provisioning, ticket handling, referrals, and CLIProxyAPI-based Codex auth for the SpainGPT community.",
      "Manual role gating and credential delivery leak secrets, so the bot enforces verification, guided ticket flows, admin commands, and direct DM delivery.",
      "Commands like `/assign`, `/codex-url`, and `/code` map the Discord flows to CLIProxyAPI, deliver masked credentials, and keep the documented runbooks in sync.",
    ],
    languages: ["TypeScript", "Dockerfile", "Shell"],
  },
} as const satisfies Record<string, RepoDescription>;
