"use client";

import Skiper10 from "../components/skiper/skiper10";
import Skiper80 from "../components/skiper/skiper80";
import type { RepoDescription } from "./repo-description-types";
import type { RepoMetadata } from "./repo-metadata";

interface RepoItem {
  description: RepoDescription;
  metadata: RepoMetadata;
  title: string;
}

interface RepoSection {
  heading: string;
  items: RepoItem[];
}

interface PortfolioShellProps {
  preloaderText?: string;
  sections: RepoSection[];
}

const PortfolioShell = ({
  preloaderText = "Turning concepts into working systems.",
  sections,
}: PortfolioShellProps) => {
  return (
    <Skiper10 text={preloaderText}>
      <Skiper80 sections={sections} />
    </Skiper10>
  );
};

export default PortfolioShell;
