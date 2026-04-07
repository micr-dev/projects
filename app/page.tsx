import fs from "node:fs/promises";
import path from "node:path";
import Skiper80 from "../components/skiper/skiper80";

async function getRepoTitles() {
  const repoFile = path.join(process.cwd(), "REPO.md");
  const content = await fs.readFile(repoFile, "utf8");

  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function HomePage() {
  const titles = await getRepoTitles();

  return (
    <main className="min-h-screen bg-[#121212]">
      <Skiper80 titles={titles} />
    </main>
  );
}
