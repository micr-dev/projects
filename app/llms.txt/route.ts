import { getRepoDisplayTitle, getRepoSlugPath } from "../repo-paths";
import { getRepoSections, type RepoItem } from "../repo-sections";

export const dynamic = "force-dynamic";

function getSite(request: Request): { baseUrl: string; title: string } {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? "projects.micr.dev";
  const normalizedHost = host.toLowerCase();
  const isLocalhost =
    normalizedHost.startsWith("localhost") ||
    normalizedHost.startsWith("127.0.0.1") ||
    normalizedHost.startsWith("[::1]");
  const protocol = isLocalhost ? "http" : "https";

  return {
    baseUrl: `${protocol}://${host}`,
    title: normalizedHost.includes("proyectos.micr.dev") ? "Proyectos" : "Projects",
  };
}

function getProjectLink(item: RepoItem): string | null {
  if (item.metadata.livePreviewUrl) {
    return item.metadata.livePreviewUrl;
  }

  if (!item.metadata.isPrivate) {
    return item.metadata.sourceUrl;
  }

  return null;
}

function formatProjectEntry(item: RepoItem, baseUrl: string): string {
  const projectName = getRepoDisplayTitle(item.title);
  const projectUrl = `${baseUrl}/${getRepoSlugPath(item.title)}`;
  const projectLink = getProjectLink(item);
  const lines = [
    `## ${projectName}`,
    `Portfolio URL: ${projectUrl}`,
    projectLink ? `Project link: ${projectLink}` : "Project link: None listed",
    `Languages: ${item.description.languages.join(", ")}`,
    "",
    "Description:",
    ...item.description.paragraphs,
  ];

  return lines.join("\n");
}

export async function GET(request: Request) {
  const { baseUrl, title } = getSite(request);
  const sections = await getRepoSections();
  const entries = sections.flatMap((section) => section.items);
  const projectEntries = entries.map((item) => formatProjectEntry(item, baseUrl));
  const body = [
    `# ${title}`,
    "",
    `URL: ${baseUrl}`,
    "",
    "This file is generated from the same project data used by the regular portfolio page.",
    "",
    projectEntries.join("\n\n"),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
