import { notFound } from "next/navigation";
import PortfolioShell from "../portfolio-shell";
import { getRepoSlugPath, normalizeRepoSlugPath } from "../repo-paths";
import { getRepoSections, hasRepoSlug } from "../repo-sections";

interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// The catalogue changes only with a deployment. Serve canonical detail links
// from the build output instead of reading and rendering the catalogue per visit.
export async function generateStaticParams() {
  const sections = await getRepoSections();
  return sections.flatMap((section) =>
    section.items.map((item) => ({ slug: getRepoSlugPath(item.title).split("/") })),
  );
}

export default async function RepoSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const slugPath = normalizeRepoSlugPath(slug.join("/"));

  if (!slugPath) {
    notFound();
  }

  const sections = await getRepoSections();

  if (!hasRepoSlug(sections, slugPath)) {
    notFound();
  }

  return (
    <PortfolioShell
      sections={sections}
      preloaderText="Turning concepts into working systems."
      initialSlug={slugPath}
    />
  );
}
