"use client";

import Skiper10 from "../components/skiper/skiper10";
import Skiper80 from "../components/skiper/skiper80";
import type { RepoSection } from "./repo-sections";

interface PortfolioShellProps {
  initialSlug?: string | null;
  preloaderText?: string;
  sections: RepoSection[];
}

const PortfolioShell = ({
  initialSlug = null,
  preloaderText = "Turning concepts into working systems.",
  sections,
}: PortfolioShellProps) => {
  return (
    <Skiper10 text={preloaderText}>
      <Skiper80 sections={sections} initialSlug={initialSlug} />
    </Skiper10>
  );
};

export default PortfolioShell;
