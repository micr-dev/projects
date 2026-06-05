#!/usr/bin/env python3
"""Generate 20px-wide LQIP PNGs from repo thumbnail images.

Usage:
  python3 scripts/generate-lqip.py [--check]

Options:
  --check   Exit 1 if any thumbnails are missing an LQIP (for CI).

Scans public/images/repo-thumbnails/ for image files, resizes each to
20px wide using NEAREST (pixelated) interpolation, and writes the result
to public/images/repo-thumbnails/lqip/{basename}-lqip.png.

Also processes any placeholder images referenced in app/repo-images.ts
that live outside the repo-thumbnails directory.
"""

import re
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

REPO_ROOT = Path(__file__).resolve().parent.parent
THUMBS_DIR = REPO_ROOT / "public" / "images" / "repo-thumbnails"
LQIP_DIR = THUMBS_DIR / "lqip"
LQIP_WIDTH = 20
IMAGE_EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg", ".avif"}


def generate_lqip(src: Path, dst: Path) -> None:
    """Generate a tiny pixelated placeholder from src image."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(src)
    ratio = LQIP_WIDTH / img.width
    new_h = max(1, round(img.height * ratio))
    img.resize((LQIP_WIDTH, new_h), Image.NEAREST).save(dst, "PNG")


def extract_placeholder_paths(ts_path: Path) -> list[Path]:
    """Extract placeholder image paths from repo-images.ts that may need LQIPs."""
    content = ts_path.read_text()
    paths = re.findall(r'"([^"]+\.(?:png|jpg|jpeg|webp))"', content)
    result = []
    for p in paths:
        full = REPO_ROOT / p.lstrip("/")
        if full.is_file() and full.suffix.lower() in IMAGE_EXTENSIONS:
            result.append(full)
    return result


def main() -> int:
    check_only = "--check" in sys.argv
    missing: list[Path] = []
    generated = 0

    # --- repo-thumbnails ---
    for img_file in sorted(THUMBS_DIR.iterdir()):
        if not img_file.is_file() or img_file.suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        stem = img_file.stem  # e.g. "about"
        lqip = LQIP_DIR / f"{stem}-lqip.png"

        if lqip.is_file():
            # Regenerate only if source is newer
            if img_file.stat().st_mtime <= lqip.stat().st_mtime:
                continue

        if check_only:
            missing.append(img_file)
        else:
            generate_lqip(img_file, lqip)
            generated += 1
            print(f"  {img_file.name} -> lqip/{lqip.name}")

    # --- placeholder images outside repo-thumbnails ---
    ts_path = REPO_ROOT / "app" / "repo-images.ts"
    if ts_path.is_file():
        for placeholder in extract_placeholder_paths(ts_path):
            # Skip if it's already in repo-thumbnails (handled above)
            try:
                placeholder.relative_to(THUMBS_DIR)
                continue
            except ValueError:
                pass

            stem = placeholder.stem
            lqip = placeholder.parent / f"{stem}-lqip.png"

            if lqip.is_file() and placeholder.stat().st_mtime <= lqip.stat().st_mtime:
                continue

            if check_only:
                missing.append(placeholder)
            else:
                generate_lqip(placeholder, lqip)
                generated += 1
                print(f"  {placeholder} -> {lqip.name}")

    if check_only:
        if missing:
            for m in missing:
                print(f"  MISSING: {m}", file=sys.stderr)
            return 1
        print("All LQIPs up to date.")
        return 0

    print(f"\n{generated} LQIP(s) generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
