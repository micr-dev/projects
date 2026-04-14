import test from "node:test";
import assert from "node:assert/strict";
import {
  getRepoDisplayTitle,
  getRepoSlugPath,
  normalizeRepoSlugPath,
} from "./repo-paths.ts";

test("normalizes root paths to null", () => {
  assert.equal(normalizeRepoSlugPath("/"), null);
  assert.equal(normalizeRepoSlugPath(""), null);
});

test("lowercases and trims slug paths", () => {
  assert.equal(normalizeRepoSlugPath("/AnonQ/"), "anonq");
  assert.equal(normalizeRepoSlugPath("micr/About"), "micr/about");
});

test("builds display titles and slug paths from repo titles", () => {
  assert.equal(getRepoDisplayTitle("m-d/about"), "micr/about");
  assert.equal(getRepoSlugPath("anonQ"), "anonq");
  assert.equal(getRepoSlugPath("m-d/about"), "micr/about");
});
