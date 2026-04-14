import PortfolioShell from "./portfolio-shell";
import { getRepoSections } from "./repo-sections";

export default async function HomePage() {
  const sections = await getRepoSections();

  return (
    <PortfolioShell
      sections={sections}
      preloaderText="Turning concepts into working systems."
      initialSlug={null}
    />
  );
}
