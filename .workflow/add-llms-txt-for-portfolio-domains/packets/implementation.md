Packet ID: implementation
Objective: Add `/llms.txt` from canonical project data.
Context: Both domains serve the same Next.js app and need host-aware text.
Files / sources: `app/llms.txt/route.ts`.
Ownership: New route only.
Do: Generate plain text entries with name, portfolio URL, external project link when available, languages, and full description paragraphs.
Do not: Duplicate project entries or edit unrelated files.
Expected output: A dynamic App Router route.
Verification: `pnpm lint`, `pnpm build`, local route smoke check.
