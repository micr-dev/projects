// Stable item indices belong to the full catalogue, including hidden archived work.
interface CatalogueEntry {
  heading: string;
  index: number;
  metadata: { archived?: boolean };
}

export function partitionCatalogue<T extends CatalogueEntry>(items: readonly T[]) {
  const published = new Map<string, T[]>();
  const archived = new Map<string, T[]>();
  for (const item of items) {
    const groups = item.metadata.archived ? archived : published;
    const group = groups.get(item.heading);
    if (group) group.push(item);
    else groups.set(item.heading, [item]);
  }
  const sections = (groups: Map<string, T[]>) =>
    Array.from(groups, ([heading, items]) => ({ heading, items }));
  return { published: sections(published), archived: sections(archived) };
}

export function getAdjacentProjectIndex(
  visibleItems: readonly { index: number }[],
  activeIndex: number,
  direction: -1 | 1,
): number | undefined {
  const position = visibleItems.findIndex((item) => item.index === activeIndex);
  const nextPosition = Math.min(Math.max(position + direction, 0), visibleItems.length - 1);
  return visibleItems[nextPosition]?.index;
}
