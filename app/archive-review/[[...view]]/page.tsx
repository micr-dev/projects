import { notFound } from "next/navigation";
import ArchiveReview from "../review";
import { getRepoSections } from "../../repo-sections";

export const metadata = { title: "Archive checklist", robots: { index: false, follow: false } };
export function generateStaticParams() {
  return [{ view: [] }, { view: ["preview"] }, { view: ["example"] }];
}
export default async function ArchiveReviewPage({ params }: { params: Promise<{ view?: string[] }> }) {
  const { view = [] } = await params;
  const mode = view[0] ?? "checklist";
  if (view.length > 1 || (mode !== "checklist" && mode !== "preview" && mode !== "example")) notFound();
  const sections = await getRepoSections();
  return <ArchiveReview sections={sections} view={mode} spanish={false} />;
}
