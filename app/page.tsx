import fs from "node:fs/promises";
import path from "node:path";
import PortfolioShell from "./portfolio-shell";
import { repoDescriptions } from "./repo-descriptions";
import type { RepoDescription } from "./repo-description-types";
import { repoMetadata, type RepoMetadata } from "./repo-metadata";

interface RepoItem {
  description: RepoDescription;
  metadata: RepoMetadata;
  title: string;
}

interface RepoSection {
  heading: string;
  items: RepoItem[];
}

async function getRepoSections(): Promise<RepoSection[]> {
  const repoFile = path.join(process.cwd(), "REPO.md");
  const content = await fs.readFile(repoFile, "utf8");
  const sections: RepoSection[] = [];
  let currentSection: RepoSection | null = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("# Repo List")) {
      continue;
    }

    if (line.startsWith("## ")) {
      currentSection = {
        heading: line.replace(/^##\s+/, ""),
        items: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      const description = repoDescriptions[line];
      const metadata = repoMetadata[line];

      if (!description) {
        throw new Error(`Missing repo description for "${line}"`);
      }

      if (!metadata) {
        throw new Error(`Missing repo metadata for "${line}"`);
      }

      currentSection.items.push({
        description,
        metadata,
        title: line,
      });
    }
  }

  return sections;
}

export default async function HomePage() {
  const sections = await getRepoSections();

  return (
    <PortfolioShell
      sections={sections}
      preloaderText="Turning concepts into working systems."
    />
  );
}
