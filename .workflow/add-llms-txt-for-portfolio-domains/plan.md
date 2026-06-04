# Add llms txt for portfolio domains

## Goal
Add `/llms.txt` for both `projects.micr.dev` and `proyectos.micr.dev` from the canonical project data.

## Success Criteria
- `/llms.txt` includes each project name explicitly.
- Each entry includes an external project link when the page has one.
- Each entry includes the existing language list.
- Each entry includes the full description paragraphs already shown on the regular page.
- Future additions through `REPO.md`, `repoDescriptions`, and `repoMetadata` appear without editing the route.

## Current Context
- Next.js App Router project.
- Project order comes from `REPO.md`.
- Descriptions and languages come from `app/repo-descriptions.ts` and batch files.
- Link metadata comes from `app/repo-metadata.ts`.

## Constraints
- Keep one canonical data path. Do not duplicate project entries.
- Do not touch unrelated existing `.gitignore` changes.
- Use pnpm for verification.

## Risks
- Host-specific text cannot be served by a plain static `public/llms.txt`.
- Private projects may have a GitHub source URL that should not be presented as a usable public project link.

## Approval Required
None. This is a local code change with no destructive, external, or credential-touching steps.

## Work Packets
- Discovery: inspect project data, visible page fields, and route structure.
- Implementation: add a dynamic `/llms.txt` route.
- Verification: run lint/build and inspect generated route output.

## Integration Policy
Accept only data sourced from the same structures used by the regular page. Do not introduce a second project registry.

## Verification
- `pnpm lint`
- `pnpm build`
- Local route smoke check if needed

## Reusable Artifacts
This workflow artifact records the pattern for future host-aware generated text routes.
