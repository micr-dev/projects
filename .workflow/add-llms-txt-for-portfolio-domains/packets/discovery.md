Packet ID: discovery
Objective: Confirm the source of project names, descriptions, languages, and links.
Context: The portfolio page renders from `getRepoSections()`.
Files / sources: `REPO.md`, `app/repo-sections.ts`, `app/repo-descriptions.ts`, `app/repo-metadata.ts`, `components/skiper/skiper80.tsx`.
Ownership: Read-only discovery.
Do: Identify canonical data and UI link behavior.
Do not: Create a second project registry.
Expected output: Notes that implementation can reuse `getRepoSections()`.
Verification: Cross-check page fields against data structures.
