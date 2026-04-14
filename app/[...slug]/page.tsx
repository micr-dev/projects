import { notFound } from "next/navigation";
import PortfolioShell from "../portfolio-shell";
import { normalizeRepoSlugPath } from "../repo-paths";
import { getRepoSections, hasRepoSlug } from "../repo-sections";

interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
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
