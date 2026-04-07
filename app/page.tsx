import fs from "node:fs/promises";
import path from "node:path";
import Skiper80 from "../components/skiper/skiper80";

interface RepoSection {
  heading: string;
  titles: string[];
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
        titles: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.titles.push(line);
    }
  }

  return sections;
}

export default async function HomePage() {
  const sections = await getRepoSections();

  return (
    <main className="min-h-screen bg-[#121212]">
      <Skiper80 sections={sections} />
    </main>
  );
}
