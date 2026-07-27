#!/usr/bin/env python3
"""Generate responsive-width WebP variants from repo thumbnail images.

Usage:
  python3 scripts/generate-responsive-thumbnails.py [--check]

Options:
  --check   Exit 1 if any thumbnails are missing responsive variants (for CI).

Scans public/images/repo-thumbnails/ for image files, generates WebP variants
at 300w, 1000w, 2000w widths (never upscaling), and writes them to
public/images/repo-thumbnails/responsive/{basename}-{width}.webp.

Also processes any placeholder images referenced in app/repo-images.ts that live
outside the repo-thumbnails directory.
"""

import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

REPO_ROOT = Path(__file__).resolve().parent.parent
THUMBS_DIR = REPO_ROOT / "public" / "images" / "repo-thumbnails"
RESPONSIVE_DIR = THUMBS_DIR / "responsive"
IMAGE_EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg", ".avif"}
WIDTHS = [300, 1000, 2000]
QUALITY = 85


def generate_responsive(src: Path, dst_dir: Path) -> list[Path]:
    """Generate responsive WebP variants from src image."""
    dst_dir.mkdir(parents=True, exist_ok=True)
    img = Image.open(src)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    generated: list[Path] = []
    src_w, src_h = img.size

    for width in WIDTHS:
        dst = dst_dir / f"{src.stem}-{width}w.webp"
        if width > src_w:
            # For small sources, only generate the largest width as a fallback.
            if width != WIDTHS[-1]:
                continue
            resized = img
        else:
            ratio = width / src_w
            new_h = max(1, round(src_h * ratio))
            resample = Image.Resampling.LANCZOS if hasattr(Image, "Resampling") else Image.LANCZOS
            resized = img.resize((width, new_h), resample)

        resized.save(dst, "WEBP", quality=QUALITY, method=6)
        generated.append(dst)

    return generated


def extract_placeholder_paths(ts_path: Path) -> list[Path]:
    """Extract placeholder image paths from repo-images.ts that may need variants."""
    content = ts_path.read_text()
    paths = re.findall(r'"([^"]+\.(?:png|jpg|jpeg|webp))"', content)
    result = []
    for p in paths:
        full = REPO_ROOT / p.lstrip("/")
        if full.is_file() and full.suffix.lower() in IMAGE_EXTENSIONS:
            result.append(full)
    return result


def variants_up_to_date(src: Path, dst_dir: Path) -> bool:
    """Check if all expected variants exist and are newer than the source."""
    if not src.is_file():
        return False
    src_mtime = src.stat().st_mtime
    src_w = Image.open(src).width
    for width in WIDTHS:
        dst = dst_dir / f"{src.stem}-{width}w.webp"
        if width > src_w:
            # For sources narrower than this width, only the largest width is required.
            if width != WIDTHS[-1]:
                continue
        if not dst.is_file() or dst.stat().st_mtime < src_mtime:
            return False
    return True


def main() -> int:
    check_only = "--check" in sys.argv
    missing: list[Path] = []
    generated_count = 0

    # --- repo-thumbnails ---
    for img_file in sorted(THUMBS_DIR.iterdir()):
        if not img_file.is_file() or img_file.suffix.lower() not in IMAGE_EXTENSIONS:
            continue

        if check_only:
            if not variants_up_to_date(img_file, RESPONSIVE_DIR):
                missing.append(img_file)
        else:
            if variants_up_to_date(img_file, RESPONSIVE_DIR):
                continue
            for dst in generate_responsive(img_file, RESPONSIVE_DIR):
                print(f"  {img_file.name} -> responsive/{dst.name}")
            generated_count += 1

    # --- placeholder images outside repo-thumbnails ---
    ts_path = REPO_ROOT / "app" / "repo-images.ts"
    if ts_path.is_file():
        for placeholder in extract_placeholder_paths(ts_path):
            try:
                placeholder.relative_to(THUMBS_DIR)
                continue
            except ValueError:
                pass

            dst_dir = placeholder.parent / "responsive"
            if check_only:
                if not variants_up_to_date(placeholder, dst_dir):
                    missing.append(placeholder)
            else:
                if variants_up_to_date(placeholder, dst_dir):
                    continue
                for dst in generate_responsive(placeholder, dst_dir):
                    print(f"  {placeholder} -> responsive/{dst.name}")
                generated_count += 1

    if check_only:
        if missing:
            for m in missing:
                print(f"  MISSING: {m}", file=sys.stderr)
            return 1
        print("All responsive thumbnails up to date.")
        return 0

    print(f"\n{generated_count} source image(s) processed for responsive variants.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
