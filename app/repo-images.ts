const placeholderImages = [
  "/images/oct25Coll/skiperpro/shoreel-9.png",
  "/images/oct25Coll/skiperpro/shoreel-8.png",
  "/images/oct25Coll/skiperpro/shoreel-4.png",
  "/images/oct25Coll/skiperpro/shoreel-5.png",
];

const repoImages: Record<string, string> = {
  "m-d/about": "about.webp",
  ancla: "ancla.webp",
  anonQ: "anonQ.webp",
  "anydesk-legacy-bin": "anydesk-legacy-bin.webp",
  archie: "archie.webp",
  "ms26/bansho": "bansho.webp",
  "bdss-club-website": "bdss-club-website.webp",
  "m-d/blog": "blog.webp",
  bolify: "bolify.webp",
  "camofox-mcp": "camofox-mcp.webp",
  "catbox-mcp": "catbox-mcp.webp",
  "Celeste-QuartzSkin": "Celeste-QuartzSkin.webp",
  chalcopyrite: "chalcopyrite.webp",
  "chatgpt-webui-mcp": "chatgpt-webui-mcp.webp",
  cinco: "cinco.webp",
  "claude-skills": "claude-skills.webp",
  "ms26/delvn": "delvn.webp",
  "dialogue-textbox": "dialogue-textbox.webp",
  "discord-self-mcp": "discord-self-mcp.webp",
  DXFtoIRL: "DXFtoIRL.webp",
  "elevenlabs-webui": "elevenlabs-webui.webp",
  glob: "glob.webp",
  "goofish-watcher": "goofish-watcher.webp",
  "gsap-skills": "gsap-skills.webp",
  "hermes-nightshift": "hermes-nightshift.webp",
  "ms26/indagine": "indagine.webp",
  "ms26/jarspect": "jarspect.webp",
  "kagi-cli": "kagi-cli.webp",
  "kagi-mcp": "kagi-cli.webp",
  "kefine-website": "kefine-website.webp",
  "m-d/micr.dev": "micr.dev.webp",
  "m-d/microkeebs": "microkeebs.webp",
  mullgate: "mullgate.webp",
  nagrom: "nagrom.webp",
  "namecheap-mcp": "namecheap-mcp.webp",
  onairo: "onairo.webp",
  "opencode-studio": "opencode-studio.webp",
  openslate: "openslate.webp",
  "perplexity-mcp": "perplexity-mcp.webp",
  protoncode: "protoncode.webp",
  "m-d/quarzite": "quarzite.webp",
  "ms26/repatrol": "repatrol.webp",
  "RPi4toNAS-Guide": "RPi4toNAS-Guide.webp",
  scudo: "scudo.webp",
  "seedance-skills": "seedance-skills.webp",
  sincronizado: "sincronizado.webp",
  SpainGPT: "SpainGPT.webp",
  "ms26/spikehound": "spikehound.webp",
  squircle: "squircle.webp",
  "supabase-keepalive": "supabase-keepalive.webp",
  "t3-chat-zipper": "t3-chat-zipper.webp",
  tailstick: "tailstick.webp",
  "m-d/thinko": "thinko.webp",
  "m-d/tokens": "tokens.webp",
  "topre-ec-archive": "topre-ec-archive.webp",
  tuneport: "tuneport.webp",
  tupac: "tupac.webp",
  tuireel: "tuireel.webp",
  UndyingTerminal: "UndyingTerminal.webp",
  "upstash-keepalive": "upstash-keepalive.webp",
  vapora: "vapora.webp",
  veyoff: "veyoff.webp",
  waterWAV: "waterWAV.webp",
  YAWN60: "YAWN60.webp",
};

function getImagePath(filename: string) {
  return encodeURI(`/images/repo-thumbnails/${filename}`);
}

export function getRepoImage(title: string, index: number) {
  const filename = repoImages[title];

  return filename
    ? getImagePath(filename)
    : placeholderImages[index % placeholderImages.length];
}
