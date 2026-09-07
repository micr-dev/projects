import test from "node:test";
import assert from "node:assert/strict";
import { repoMetadata } from "./repo-metadata.ts";

test("project previews never duplicate their source repository", () => {
  for (const [project, metadata] of Object.entries(repoMetadata)) {
    if (metadata.livePreviewUrl) {
      assert.notEqual(
        metadata.livePreviewUrl.replace(/\/$/, "").toLowerCase(),
        metadata.sourceUrl.replace(/\/$/, "").toLowerCase(),
        `${project} offers its source repository as a live preview`,
      );
    }
  }
});

test("package, mod, docs, and download actions describe their destination", () => {
  const expectedLabels = {
    "akron": "Read docs",
    "moji": "Read docs",
    "anydesk-legacy-bin": "View package",
    "codexport": "View package",
    "revisor": "View package",
    "camofox-mcp": "View package",
    "discord-self-mcp": "View package",
    "t3-chat-zipper": "Download userscript",
    "Celeste-SkinMod": "View mod"
  };
  for (const [project, label] of Object.entries(expectedLabels)) {
    assert.equal(repoMetadata[project].livePreviewLabel, label, project);
  }
});

test("actual live sites keep their preview actions", () => {
  assert.equal(repoMetadata["akron-website"].livePreviewUrl, "https://akron.micr.dev");
  assert.equal(repoMetadata.nagrom.livePreviewUrl, "https://microck.github.io/nagrom/");
});
