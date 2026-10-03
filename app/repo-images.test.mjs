import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
async function assertWebp(path) {
  const bytes = await readFile(path);
  assert.ok(bytes.length >= 20, `Empty or truncated thumbnail: ${path}`);
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF", path);
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP", path);
  assert.equal(bytes.readUInt32LE(4) + 8, bytes.length, path);
}

test("every responsive asset advertised by the manifest is a valid WebP container", async () => {
  const root = new URL("../public/images/repo-thumbnails/", import.meta.url);
  const manifest = JSON.parse(await readFile(new URL("responsive-manifest.json", root), "utf8"));
  for (const [name, widths] of Object.entries(manifest)) {
    for (const width of widths) {
      const directory = name.startsWith("shoreel-")
        ? new URL("../public/images/oct25Coll/skiperpro/responsive/", import.meta.url)
        : new URL("responsive/", root);
      const path = fileURLToPath(new URL(`${name}-${width}w.webp`, directory));
      await assertWebp(path);
    }
  }
});

test("all committed responsive assets are valid WebP containers, including unused variants", async () => {
  const directory = new URL("../public/images/repo-thumbnails/responsive/", import.meta.url);
  for (const name of await readdir(directory)) {
    if (!name.endsWith(".webp")) continue;
    await assertWebp(fileURLToPath(new URL(name, directory)));
  }
});
