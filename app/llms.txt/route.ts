import { getRepoDisplayTitle, getRepoSlugPath } from "../repo-paths";
import { getRepoSections } from "../repo-sections";

export const dynamic = "force-static";

export async function GET() {
  const sections = await getRepoSections();
  const entries = sections.flatMap((section) =>
    section.items.filter((item) => !item.metadata.archived).map((item) => {
      const name = getRepoDisplayTitle(item.title);
      const url = `https://projects.micr.dev/${getRepoSlugPath(item.title)}`;
      return `- ${name}: ${item.description.paragraphs[0]} (${url})`;
    }),
  );
  const body = [
    "# Microck Projects",
    "",
    "Current projects in portfolio order. Generated from the portfolio catalogue at build time.",
    "Use the linked project pages and public repositories for further details.",
    "",
    ...entries,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
