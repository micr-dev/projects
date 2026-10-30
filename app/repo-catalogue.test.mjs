import test from "node:test";
import assert from "node:assert/strict";
import { getAdjacentProjectIndex, partitionCatalogue } from "./repo-catalogue.ts";

const items = [
  { index: 0, heading: "Software", metadata: { archived: true } },
  { index: 1, heading: "Software", metadata: {} },
  { index: 2, heading: "Hardware", metadata: { archived: true } },
  { index: 3, heading: "Skills", metadata: { archived: false } },
];

test("archive partition preserves original item identities and omits empty sections", () => {
  const catalogue = partitionCatalogue(items);
  assert.deepEqual(catalogue.published.map((section) => section.heading), ["Software", "Skills"]);
  assert.deepEqual(catalogue.archived.map((section) => section.heading), ["Software", "Hardware"]);
  assert.equal(catalogue.published[0].items[0], items[1]);
  assert.equal(catalogue.archived[0].items[0], items[0]);
  assert.deepEqual(items.map((item) => item.index), [0, 1, 2, 3]);
});

test("expanding archives retains their route targets without mixing them into current projects", () => {
  const catalogue = partitionCatalogue(items);
  const current = catalogue.published.flatMap((section) => section.items);
  const archived = catalogue.archived.flatMap((section) => section.items);
  assert.deepEqual(current.map((item) => item.index), [1, 3]);
  assert.deepEqual([...current, ...archived].map((item) => item.index), [1, 3, 0, 2]);
  assert.equal(items.find((item) => item.index === 0), archived[0]);
});

test("an entirely archived or empty catalogue remains representable", () => {
  assert.deepEqual(partitionCatalogue([]), { published: [], archived: [] });
  const catalogue = partitionCatalogue([items[0], items[2]]);
  assert.deepEqual(catalogue.published, []);
  assert.equal(catalogue.archived.length, 2);
});

test("keyboard navigation skips hidden archives and clamps at visible boundaries", () => {
  const groups = partitionCatalogue(items);
  const visible = groups.published.flatMap((section) => section.items);
  assert.equal(getAdjacentProjectIndex(visible, 1, 1), 3);
  assert.equal(getAdjacentProjectIndex(visible, 3, -1), 1);
  assert.equal(getAdjacentProjectIndex(visible, 1, -1), 1);
  assert.equal(getAdjacentProjectIndex(visible, 3, 1), 3);
  assert.equal(getAdjacentProjectIndex([], 0, 1), undefined);
  const expanded = [...visible, ...groups.archived.flatMap((section) => section.items)];
  assert.equal(getAdjacentProjectIndex(expanded, 3, 1), 0);
  assert.equal(getAdjacentProjectIndex(expanded, 0, 1), 2);
});
