export function getRepoDisplayTitle(title: string): string {
  return title.replace(/^m-d\//, "micr/");
}

export function normalizeRepoSlugPath(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "/") {
    return null;
  }

  const withoutEdges = trimmed.replace(/^\/+|\/+$/g, "");

  if (!withoutEdges) {
    return null;
  }

  return withoutEdges.toLowerCase();
}

export function getRepoSlugPath(title: string): string {
  return getRepoDisplayTitle(title).toLowerCase();
}
