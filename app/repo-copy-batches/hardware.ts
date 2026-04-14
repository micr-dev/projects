import type { RepoDescription } from "../repo-description-types";

export const hardwareBatch = {
  ancla: {
    paragraphs: [
      "Ancla is a sideload-first iPhone blocker that couples each session to one paired NFC anchor and a locked surface so the user has to physically return to that anchor before any unblock can run.",
      "Ordinary productivity blockers are too easy to dismiss, so Ancla ties focus sessions to a physical anchor and adds stricter release paths when a plain toggle is not enough.",
      "It orchestrates Apple Screen Time, Shortcuts automation, and the shield extension so the block state stays on-device and only the paired tag (or failsafe challenge) can open the surface."
    ],
    languages: ["Swift", "TypeScript", "CSS", "JavaScript"]
  },
  "RPi4toNAS-Guide": {
    paragraphs: [
      "RPi4toNAS-Guide is a DIY Raspberry Pi 4 NAS walkthrough with scripts that automate Windows backups, remote server downloads, backup rotation, and the browser-accessible Linux desktop.",
      "The guide is built for a Raspberry Pi setup that handles PC backups, remote VPS pulls, and admin access in one repeatable home NAS workflow instead of a pile of disconnected scripts.",
      "The repo leans on OpenMediaVault, LVM, wake-on-LAN, and helper scripts so every phase (assembly, OMV install, backups, rotation, remote desktop) can be replayed from the same documented commands."
    ],
    languages: ["Batchfile", "Shell"]
  },
  "topre-ec-archive": {
    paragraphs: [
      "DeskthorityWiki-TopreECArchive preserves the Topre/Electrostatic Capacitive sections of the Deskthority wiki as static HTML served via GitHub Pages.",
      "The archive preserves those pages because the sale of Deskthority shut off editing and download access, putting years of community documentation at risk of vanishing.",
      "The repo keeps the scraped HTML snapshots and the landing page so visitors can browse the archived Topre/EC material even though the original wiki is offline."
    ],
    languages: ["HTML"]
  },
  YAWN60: {
    paragraphs: [
      "YAWN60 is a Bakeneko-inspired 60% keyboard design that pairs a Unikorn-style weight, modified side profile, cherry lip, and engravings with CAD-ready STEP and DXF files plus build media.",
      "The project is grounded in an actual fabrication target, balancing mounting choices, materials, and machining constraints instead of stopping at a render.",
      "The project ships the case, backplate, and plate sources alongside the BOM, prototype notes, and sound tests so anyone can fabricate or tweak the build with the same practical trade-offs in mind."
    ],
    languages: ["CAD", "STEP", "DXF"]
  }
} as const satisfies Record<string, RepoDescription>;
