import type { RepoDescription } from "../repo-description-types";

export const hardwareBatch = {
  ancla: {
    paragraphs: [
      "Ancla is a sideload-first iPhone blocker that couples each session to one paired NFC anchor and a locked surface so the user has to physically return to that anchor before any unblock can run.",
      "The project exists because ordinary productivity dashboards let you flip focus without an intentional release path, so Ancla layers locked screens, unlock presets, and an optional paragraph challenge on top of the blocker.",
      "It orchestrates Apple Screen Time, Shortcuts automation, and the shield extension so the block state stays on-device and only the paired tag (or failsafe challenge) can open the surface."
    ],
    languages: ["Swift", "TypeScript", "CSS", "JavaScript"]
  },
  "RPi4toNAS-Guide": {
    paragraphs: [
      "RPi4toNAS-Guide is a DIY Raspberry Pi 4 NAS walkthrough with scripts that automate Windows backups, remote server downloads, backup rotation, and the browser-accessible Linux desktop.",
      "It exists because someone wanted a personal NAS that keeps PC disks, remote VPS data, and the admin desktop synchronized without manually wiring together rsync, WOL, and random cloud services.",
      "The repo leans on OpenMediaVault, LVM, wake-on-LAN, and helper scripts so every phase (assembly, OMV install, backups, rotation, remote desktop) can be replayed from the same documented commands."
    ],
    languages: ["Batchfile", "Shell"]
  },
  "topre-ec-archive": {
    paragraphs: [
      "DeskthorityWiki-TopreECArchive preserves the Topre/Electrostatic Capacitive sections of the Deskthority wiki as static HTML served via GitHub Pages.",
      "It exists because the sale of Deskthority shut off editing and download access, leaving those community-driven pages at risk of disappearing.",
      "The repo keeps the scraped HTML snapshots and the landing page so visitors can browse the archived Topre/EC material even though the original wiki is offline."
    ],
    languages: ["HTML"]
  },
  YAWN60: {
    paragraphs: [
      "YAWN60 is a Bakeneko-inspired 60% keyboard design that pairs a Unikorn-style weight, modified side profile, cherry lip, and engravings with CAD-ready STEP and DXF files plus build media.",
      "It exists because the builder wanted a tangible hardware project that balances specific mounting and material constraints instead of another render-only concept.",
      "The project ships the case, backplate, and plate sources alongside the BOM, prototype notes, and sound tests so anyone can fabricate or tweak the build with the same practical trade-offs in mind."
    ],
    languages: ["CAD", "STEP", "DXF"]
  }
} as const satisfies Record<string, RepoDescription>;
