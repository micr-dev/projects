import type { RepoDescription } from "../repo-description-types";

export const softwareBatchC = {
  squircle: {
    paragraphs: [
      "Squircle is a Next.js app that lets you drop images or GIFs, tune corner radius, shadows, outlines, and export transparent-corner files without sending anything to a server.",
      "Online corner tools either break quality or force you back into another editor, so this version keeps every preview and mask inside the browser while letting you dial the final presentation details before export.",
      "The app stays local with Tailwind, Three.js pixel snow, and JSZip batch packaging so exports happen instantly and you never upload source files.",
    ],
    languages: ["TypeScript", "CSS", "JavaScript"],
  },
  "supabase-keepalive": {
    paragraphs: [
      "Supabase-keepalive is a Python script that repeatedly calls a lightweight RPC on your Supabase database to keep the free tier from pausing.",
      "Supabase pauses free projects after a week of inactivity and regular ping commands do not count as real work, so this script fires a real function instead of relying on idle traffic.",
      "It hits the `ping` function over REST via `requests` so each run performs database work that resets the inactivity timer.",
    ],
    languages: ["Python"],
  },
  "t3-chat-zipper": {
    paragraphs: [
      "t3-chat-zipper is a userscript that drops three ZIP-export buttons into t3.chat and automatically gathers code fences into downloadable archives.",
      "Saving snippets from T3 conversations normally requires copying messages one at a time because the chat API has no batch export flow.",
      "The script watches clipboard copies, the last message, or a span of recent messages, infers filenames from fences, and pipes everything through a ZIP writer that matches T3's styling.",
    ],
    languages: ["JavaScript"],
  },
  traccia: {
    paragraphs: [
      "Traccia turns personal archives into a skill graph that explains where a skill came from, how deep it goes, how current it is, and how central it is to the broader archive.",
      "Most archive tools are good at storing material but bad at telling the skill story, while profile tools flatten everything into a pitch and throw away the evidence trail.",
      "The CLI ingests notes, code, docs, AI chats, and exported platform data without touching source files, then renders a timestamped graph with explain, review, and export commands. It ships a Python CLI and an npm wrapper for Node-first environments.",
    ],
    languages: ["Python", "JavaScript"],
  },
  tailstick: {
    paragraphs: [
      "Tailstick ships as a USB-launched Tailscale enrollment CLI and GUI that lets operators enroll field machines, issue bounded leases, and control cleanup without building a backend.",
      "Field onboarding should not require ad hoc scripts that scatter secrets and state, and this tool keeps the operator flow simple while tying leases to the same command surface.",
      "The binaries read a JSON config, support session, timed, and permanent lease modes, and drop a scheduled agent that cleans leases when the USB or timer says so.",
    ],
    languages: ["Go", "HTML", "PowerShell", "Shell"],
  },
  tuneport: {
    paragraphs: [
      "Tuneport is a browser extension that detects the YouTube or SoundCloud track you are watching, matches it against Spotify, adds it to a playlist, and downloads high-quality copies in parallel.",
      "Spotify forbids adding local files programmatically, so syncing discovery streams required bridging matching metadata with local downloads and playlist adds.",
      "The extension fuzzily matches titles, downloads lossless sources via Lucida and yt-dlp, and optionally hands files to a Spicetify bridge so local files can land in playlists without manual juggling.",
    ],
    languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  tupac: {
    paragraphs: [
      "Tupac is a Discord bot that spins up full project structures, including channels, roles, templates, and task threads, for every new production team.",
      "Managing dozens of categories, acronymed roles, and approval workflows in a busy guild slows down creative teams if everything is manual.",
      "The bot runs wizard commands, syncs templates, auto-assigns project roles, and wires in question threads so projects stay organized without repetitive copy and paste.",
    ],
    languages: ["Python", "Dockerfile"],
  },
  tuireel: {
    paragraphs: [
      "Tuireel executes scripted terminal sessions, captures frames, and renders polished MP4, WebM, or GIF demos with optional cursors and sound effects based on declarative configs.",
      "Shooting a terminal demo by hand means juggling screen recorders, overlays, and inconsistent timing instead of describing the flow up front.",
      "The CLI scaffolds JSONC configs, replays step sequences, and composes overlays via delivery profiles and presets so the final video is reproducible.",
    ],
    languages: ["TypeScript", "JavaScript"],
  },
  UndyingTerminal: {
    paragraphs: [
      "UndyingTerminal is a reconnectable secure remote shell for Windows that keeps sessions alive across disconnects and tunnels.",
      "SSH sessions, VPN changes, or lid closures immediately kill the shell state, so recovering that context wastes time whenever the network hiccups.",
      "The server stays alive locally, the client reconnects with replayed output, and jump-host and tunnel helpers keep the session state intact without losing buffers.",
    ],
    languages: ["C++", "TypeScript", "CSS", "CMake"],
  },
  "upstash-keepalive": {
    paragraphs: [
      "Upstash-keepalive is a Python script that performs SET plus EXPIRE operations so your Upstash Redis database sees real activity instead of idle PINGs.",
      "Upstash archives free-tier Redis instances after 14 days without writes, and a PING alone does not count as activity.",
      "The script writes a `upstash-keepalive` key with a 30-day TTL on a schedule or via GitHub Actions so the service never thinks the database is dormant.",
    ],
    languages: ["Python"],
  },
  vapora: {
    paragraphs: [
      "Vapora is an interactive OSINT tool that maps a Steam account's friend graph, enriches nodes with metrics, and exports Gephi-ready CSVs plus a probable-friends report.",
      "Researching communities by hand means repeatedly crawling lists and manually computing centrality, which makes the workflow slow and error-prone.",
      "The wizard collects a Steam API key and target, executes a depth-limited BFS, and annotates each node with degree, betweenness, and community labels before writing the exports.",
    ],
    languages: ["Python"],
  },
  veyoff: {
    paragraphs: [
      "Veyoff is an RFB man-in-the-middle proxy that sits between Veyon's proxy and UltraVNC, delivering transparent forwarding in normal mode and framing or hiding when needed.",
      "There are times you need to freeze the view, hide sensitive windows, or show presence outlines without letting the teacher notice anything unusual.",
      "The proxy rewrites framebuffer updates, forces Raw encodings, enforces colored outlines, and restores registry-backed ports so the teacher only sees valid RFB traffic.",
    ],
    languages: ["C++", "Python", "CMake"],
  },
  waterWAV: {
    paragraphs: [
      "WaterWAV is a Python script that embeds an image into an audio file's spectrogram via STFT so the watermark appears when you load it into a spectrogram viewer.",
      "WaterWAV makes the Aphex Twin-style spectrogram trick usable without forcing you to build the signal-processing workflow from scratch.",
      "The tool flips the mask, attenuates frequencies between 200 Hz and 10,700 Hz, and outputs a new WAV plus comparison plots so you can inspect the hidden image.",
    ],
    languages: ["Python"],
  },
} as const satisfies Record<string, RepoDescription>;
