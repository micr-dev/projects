Accepted:
- Project order is canonical in `REPO.md`.
- Descriptions and languages are canonical in `repoDescriptions`.
- Link metadata is canonical in `repoMetadata`.
- The regular page shows live preview links when present and source links only for public projects.

Rejected:
- A static `public/llms.txt`, because it cannot vary title/base URL by host.

Conflicts:
- None.

Decisions:
- Use live preview URL first, public source URL second, and no private source-only link.
