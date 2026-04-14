import fs from "node:fs/promises";
import path from "node:path";
import { getRepoSlugPath } from "./repo-paths";
import { repoDescriptions } from "./repo-descriptions";
import type { RepoDescription } from "./repo-description-types";
import { repoMetadata, type RepoMetadata } from "./repo-metadata";

export interface RepoItem {
  description: RepoDescription;
  metadata: RepoMetadata;
  title: string;
}

export interface RepoSection {
  heading: string;
  items: RepoItem[];
}

export async function getRepoSections(): Promise<RepoSection[]> {
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

    if (!currentSection) {
      continue;
    }

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

  return sections;
}

export function hasRepoSlug(sections: RepoSection[], slugPath: string): boolean {
  return sections.some((section) =>
    section.items.some((item) => getRepoSlugPath(item.title) === slugPath),
  );
}
