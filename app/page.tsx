import PortfolioShell from "./portfolio-shell";
import { getRepoSections } from "./repo-sections";

export default async function HomePage() {
  const sections = await getRepoSections();

  return (
    <>
      <section aria-labelledby="portfolio-heading" className="mx-auto max-w-3xl px-6 py-8">
        <h1 id="portfolio-heading">Microck projects</h1>
        <p>A public portfolio of software, tools, and experiments by Microck. Browse project summaries, documentation, source repositories, and live demos.</p>
      </section>
      <PortfolioShell
        sections={sections}
        preloaderText="Turning concepts into working systems."
        initialSlug={null}
      />
    </>
  );
}
