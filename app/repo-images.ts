import manifest from "../public/images/repo-thumbnails/responsive-manifest.json";

const placeholderImages = [
  "/images/oct25Coll/skiperpro/shoreel-9.png",
  "/images/oct25Coll/skiperpro/shoreel-8.png",
  "/images/oct25Coll/skiperpro/shoreel-4.png",
  "/images/oct25Coll/skiperpro/shoreel-5.png",
];

const repoImages: Record<string, string> = {
  "m-d/about": "about.webp",
  "m-d/ai": "ai.webp",
  akron: "akron.webp",
  "akron-website": "akron-website.png",
  altman: "altman.webp",
  ancla: "ancla.webp",
  "akron-discord": "akron-discord.webp",
  anonQ: "anonQ.webp",
  amigazo: "amigazo.webp",
  "anydesk-legacy-bin": "anydesk-legacy-bin.webp",
  archie: "archie.webp",
  "ms26/bansho": "bansho.webp",
  "bdss-website": "bdss-club-website.webp",
  "m-d/blog": "blog.webp",
  bettersaves: "bettersaves.webp",
  boilify: "bolify.webp",
  "camofox-mcp": "camofox-mcp.webp",
  "catbox-mcp": "catbox-mcp.webp",
  "Celeste-SkinMod": "Celeste-QuartzSkin.webp",
  "cat-monitor": "cat-monitor.webp",
  chalcopyrite: "chalcopyrite.webp",
  "chatgpt-webui-mcp": "chatgpt-webui-mcp.webp",
  cinco: "cinco.webp",
  codexport: "codexport.webp",
  "crabbox-template-boxes": "crabbox-template-boxes.webp",
  "claude-skills": "claude-skills.webp",
  "grill-with-facts": "grill-with-facts.webp",
  "ms26/delvn": "delvn.webp",
  "dialogue-textbox": "dialogue-textbox.webp",
  "discord-self-mcp": "discord-self-mcp.webp",
  gitbanana: "gitbanana.webp",
  "gitquarry-mcp": "gitquarry-mcp.webp",
  DXFtoIRL: "DXFtoIRL.webp",
  "elevenlabs-webui": "elevenlabs-webui.webp",
  glob: "glob.webp",
  gitquarry: "gitquarry.webp",
  "glm-quota-widget": "glm-quota-widget.webp",
  "goofish-watcher": "goofish-watcher.webp",
  "gsap-skills": "gsap-skills.webp",
  "hermes-nightshift": "hermes-nightshift.webp",
  "handy-codex": "handy-codex.webp",
  "hermes-dayshift": "hermes-dayshift.webp",
  "ms26/indagine": "indagine.webp",
  "ms26/jarspect": "jarspect.webp",
  "kagi-cli": "kagi-cli.webp",
  "kagi-mcp": "kagi-cli.webp",
  "kefine-website": "kefine-website.webp",
  "keyflare-qmk-tool": "keyflare-qmk-tool.webp",
  "m-d/micr.dev": "micr.dev.webp",
  "m-d/microkeebs": "microkeebs.webp",
  mullgate: "mullgate.webp",
  "md2pkt": "md2pkt.webp",
  "minecraft-server-skill": "minecraft-server-skill.webp",
  micromail: "micromail.webp",
  "mic-hotkey-remapper": "mic-hotkey-remapper.webp",
  moji: "moji.webp",
  nagrom: "nagrom.webp",
  "namecheap-mcp": "namecheap-mcp.webp",
  "ollama-quota-bench": "ollama-quota-bench.webp",
  onairo: "onairo.webp",
  "old-f3": "old-f3.png",
  "opencode-studio": "opencode-studio.webp",
  "perplexity-mcp": "perplexity-mcp.webp",
  protoncode: "protoncode.webp",
  "m-d/quarzite": "quarzite.webp",
  "ms26/repatrol": "repatrol.webp",
  "rental-search": "rental-search.webp",
  revisor: "revisor.webp",
  "RPi4toNAS-Guide": "RPi4toNAS-Guide.webp",
  scudo: "scudo.webp",
  "simple-pool": "simple-pool.webp",
  "seedance-skills": "seedance-skills.webp",
  "tailor-coderabbit-config": "tailor-coderabbit-config.webp",
  "ui-unslop": "ui-unslop.webp",
  sincronizado: "sincronizado.webp",
  solecist: "solecist.webp",
  SpainGPT: "SpainGPT.webp",
  "ms26/spikehound": "spikehound.webp",
  squircle: "squircle.webp",
  syntaxis: "syntaxis.webp",
  "supabase-keepalive": "supabase-keepalive.webp",
  "t3-chat-zipper": "t3-chat-zipper.webp",
  traccia: "traccia.webp",
  tailstick: "tailstick.webp",
  "telnyx-voice-agent": "telnyx-voice-agent.webp",
  "m-d/thinko": "thinko.webp",
  "m-d/tokens": "tokens.webp",
  "topre-ec-archive": "topre-ec-archive.webp",
  tuneport: "tuneport.webp",
  tupac: "tupac.webp",
  tuireel: "tuireel.webp",
  UndyingTerminal: "UndyingTerminal.webp",
  "upstash-keepalive": "upstash-keepalive.webp",
  vapora: "vapora.webp",
  veskforge: "veskforge.webp",
  veyoff: "veyoff.webp",
  vss: "vss.webp",
  "waa-desktop-24": "waa-desktop-24.webp",
  waterWAV: "waterWAV.webp",
  YAWN60: "YAWN60.webp",
  "tgr03-prototype-plate": "tgr03-prototype-plate.webp",
};

const WIDTHS = [300, 1000, 2000] as const;

// manifest maps "akron" -> [300, 1000, 2000]; images narrower than 1000px omit 1000.
type Manifest = Record<string, number[]>;
const responsiveManifest: Manifest = manifest;

function getImagePath(filename: string) {
  return encodeURI(`/images/repo-thumbnails/${filename}`);
}

function getResponsivePath(filename: string, width: number) {
  const base = filename.replace(/\.\w+$/, "");
  return encodeURI(`/images/repo-thumbnails/responsive/${base}-${width}w.webp`);
}

function widthsForFilename(filename: string): readonly number[] {
  const base = filename.replace(/\.\w+$/, "");
  return responsiveManifest[base] ?? WIDTHS;
}

function getSrcSet(pathOrFilename: string) {
  const filename = pathOrFilename.split("/").pop() ?? pathOrFilename;
  return widthsForFilename(filename)
    .map((width) => `${getResponsivePath(filename, width)} ${width}w`)
    .join(", ");
}

/** Returns all responsive URLs for a repo thumbnail, used for preloading / load tracking. */
export function getRepoImageResponsiveUrls(title: string, index: number) {
  const filename = repoImages[title];
  const pathOrFilename = filename
    ? filename
    : placeholderImages[index % placeholderImages.length];
  const realFilename = pathOrFilename.split("/").pop() ?? pathOrFilename;
  return widthsForFilename(realFilename).map((width) =>
    getResponsivePath(realFilename, width),
  );
}

/** Returns unique responsive thumbnail URLs grouped from smallest to largest. */
export function getRepoImagePreloadTiers(titles: readonly string[]) {
  const urlsByWidth = new Map<number, Set<string>>(
    WIDTHS.map((width) => [width, new Set<string>()]),
  );

  titles.forEach((title, index) => {
    for (const url of getRepoImageResponsiveUrls(title, index)) {
      const width = WIDTHS.find((candidate) =>
        url.endsWith(`-${candidate}w.webp`),
      );

      if (width != null) {
        urlsByWidth.get(width)?.add(url);
      }
    }
  });

  return WIDTHS.map((width) => [...(urlsByWidth.get(width) ?? [])]);
}

export function getRepoImage(title: string, index: number) {
  const filename = repoImages[title];

  return filename
    ? getImagePath(filename)
    : placeholderImages[index % placeholderImages.length];
}

export function getRepoImageSrcSet(title: string, index: number) {
  const filename = repoImages[title];

  return filename
    ? getSrcSet(filename)
    : getSrcSet(placeholderImages[index % placeholderImages.length]);
}

/**
 * Returns the LQIP (20px-wide pixelated PNG) for a repo thumbnail.
 * Used as a background-image placeholder that renders with image-rendering: pixelated.
 */
export function getRepoLqip(title: string, index: number) {
  const filename = repoImages[title];

  if (!filename) {
    const placeholder = placeholderImages[index % placeholderImages.length];
    const base = placeholder.split("/").pop()!.replace(/\.\w+$/, "");
    return encodeURI(`/images/oct25Coll/skiperpro/${base}-lqip.png`);
  }

  const base = filename.replace(/\.\w+$/, "");
  return encodeURI(`/images/repo-thumbnails/lqip/${base}-lqip.png`);
}

/** Responsive image sizes for the preview + detail thumbnails. */
export function getRepoImageSizes() {
  return "(max-width: 1024px) 90vw, 30vw";
}
