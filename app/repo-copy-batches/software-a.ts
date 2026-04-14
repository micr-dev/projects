import type { RepoDescription } from "../repo-description-types";

export const softwareBatchA = {
  "anonQ": {
    paragraphs: [
      "anonQ is a self-hostable anonymous Q&A platform built on Next.js and Tailwind that publishes visitor questions and answers in a public feed.",
      "Communities often want anonymous submissions without turning on invasive tracking, so anonQ pairs a public Q&A flow with rate limits, BYOK support, optional AI rewriting, and ntfy alerts for the admin side.",
      "Supabase stores the events, Auth0 guards the dashboard, and ntfy plus the rewriting pipeline keep the timeline anonymous yet responsive."
    ],
    languages: ["TypeScript", "CSS", "JavaScript"]
  },
  "anydesk-legacy-bin": {
    paragraphs: [
      "anydesk-legacy-bin packages Anydesk 6.0.1 for Arch Linux via the AUR so operators can pin the last stable legacy client.",
      "Operators rely on this version because newer releases trigger commercial-use nags, freezes, and Wayland regressions, and a curated archive keeps the older behavior on hand.",
      "The PKGBUILD simply bundles the historical executable and exposes it through `yay -S anydesk-legacy-bin` so the daemon stays installable without rebuilding the host."
    ],
    languages: ["Shell"]
  },
  "archie": {
    paragraphs: [
      "ArchieTok converts GitHub repos into bilingual TikTok and Instagram shorts by combining Gemini scripts, ElevenLabs TTS, PNGtuber renders, and media processing inside a reproducible pipeline.",
      "The pipeline is built to ship repo highlight videos without hand-editing each one, so RSS polling triggers the heavy worker while optional n8n orchestration handles local runs and credential management.",
      "GitHub Actions coordinate the RSS poller with the heavy worker, while the optional n8n runner exposes an HTTP API that spawns pipeline_v2.py, posts to TikTok/Instagram, and pushes ntfy alerts."
    ],
    languages: ["Python", "HTML", "JavaScript", "CSS"]
  },
  "bdss-website": {
    paragraphs: [
      "BDSS Club Archive is a React 19 + TypeScript + Vite showcase that mirrors Replica clothing drops while embedding manifesto, FAQ, and product detail pages that forward to Chinese marketplaces.",
      "This version keeps curated drops plus admin control by storing products and releases in a private GitHub Gist and protecting the management surface with JWT-authenticated admin flows and Imgur uploads.",
      "Serverless Vercel API routes read and write the Gist, the admin UI handles imports/exports plus image compression, and authenticated actions keep the public catalog aligned with the managed inventory."
    ],
    languages: ["TypeScript", "HTML", "JavaScript"]
  },
  "boilify": {
    paragraphs: [
      "Boilify is an OpenFX plugin for DaVinci Resolve 20+ that simulates hand-drawn line boil jitter with configurable strength, size, speed, and complexity controls.",
      "The plugin is aimed at editors who want that hand-drawn boil effect without building a custom Resolve effect, with the setup centered on multi-threaded rendering, parameter tuning, and transparent alpha preservation.",
      "The C++/CMake build links against the OpenFX SDK and exposes a browser-based tuner to preview slider adjustments before copying the JSON defaults into the bundle."
    ],
    languages: ["C++", "JavaScript", "CSS", "HTML"]
  },
  "Celeste-SkinMod": {
    paragraphs: [
      "Quarzite is a Celeste OC skin mod that replaces Madeline with the original character, complete with dash-count hair color swaps and custom idle animations.",
      "The mod is about giving the run its own in-game identity, with Everest, Olympus, and Skin Mod Helper keeping the sprite work and dash-based color logic aligned with CelesteNet features.",
      "Installation flows through Olympus/Everest while Skin Mod Helper (Plus) unlocks the dash-driven hair colors stored in the Graphics and Dialog folders."
    ],
    languages: ["Python"]
  },
  "chalcopyrite": {
    paragraphs: [
      "Chalcopyrite is a price-monitoring suite that bypasses Cloudflare, eBay Shield, and similar defenses with a hybrid scraping and solver stack.",
      "It is built for stores protected by Cloudflare, eBay Shield, and hCaptcha, so the stack combines TLS fingerprinting with curl_cffi, Playwright clusters, solver clients, and FlareSolverr fallbacks before each store check.",
      "The Python orchestrator coordinates the solver clients, headless browsers, retry strategies, and Discord alerts while SQLite WAL stores audit trails for every run."
    ],
    languages: ["Python", "Shell", "Dockerfile"]
  },
  "cinco": {
    paragraphs: [
      "Cinco turns Discord into a CMS for static shop sites by pairing slash commands with GitHub Gists, encrypted tokens, interactive menus, and catbox image uploads.",
      "Shop operators need a secure, button-driven admin surface, so role-based permissions, AI helpers, and real-time gist syncing keep the workflow away from custom dashboards.",
      "Each command decrypts tokens, updates the gist JSON, and the dockerized Discord bot keeps the buttons, permissions, and sync handlers coupled with the deployed site."
    ],
    languages: ["TypeScript", "Dockerfile"]
  },
  "dialogue-textbox": {
    paragraphs: [
      "Dialogue Textbox Generator builds Undertale/Deltarune-style dialogue videos with typing animation, and the newer React-based web version adds live previews, custom fonts, and GIF/MP4 exports.",
      "The newer interface replaced the legacy Python GUI/TUI/CLI because those tools could not deliver modern previews, so the web UI takes over the experience while preserving offline scripts for edge cases.",
      "The repository keeps the Python scripts for offline rendering while the hosted web client orchestrates the typing animation renderer and export pipeline."
    ],
    languages: ["Python", "TypeScript", "HTML", "CSS"]
  },
  "DXFtoIRL": {
    paragraphs: [
      "DXF to A4 PDF Converter is a Python utility that tiles DXF drawings across multi-page A4 Landscape PDFs so printed output remains true to the original scale.",
      "Hardware verification demands full-size printouts, so the tool avoids fit-to-page scaling and bounds itself to the common 2D DXF entities used in CAD plates and keyboard designs.",
      "ezdxf parses the geometry while reportlab renders the tiles, ensuring the exported PDF prints at 100% scale without manual adjustments."
    ],
    languages: ["Python"]
  },
  "elevenlabs-webui": {
    paragraphs: [
      "elevenlabs-webui-client is a lean Python package that reuses the ElevenLabs WebUI auth flow to expose refresh-token based TTS operations outside the browser.",
      "The package is built for setups that rely on WebUI-style credentials instead of the public API, with support for Firebase refresh tokens, optional browser profile extraction, and CLI helpers.",
      "The CLI wraps the auth dance, streams MP3 output with timestamp alignment, and rotates credentials while keeping the optional xi-api-key fallback dormant."
    ],
    languages: ["Python"]
  },
  "glob": {
    paragraphs: [
      "Glob is a self-hosted glb/gltf optimizer built on React/Vite with Express/Node that shrinks 3D assets and shares them with interactive previews.",
      "The app keeps 3D compression local and deliberate, with mesh decimation, Draco compression, texture resizing, and bulk queues instead of the usual spammy web compressors.",
      "Uploads flow through weld, decimation, quantization, and Draco stages inside the Node pipeline while the frontend refreshes stats and share links."
    ],
    languages: ["TypeScript", "CSS", "HTML", "JavaScript"]
  }
} as const satisfies Record<string, RepoDescription>;
