# Portfolio QA

Verified locally on 2026-10-30 in Chrome, using both English and Spanish sites.

- Direct /altman navigation: no native modal is mounted while the signature is present. A sampled load observed zero frames with both the intro and an open dialog.
- Signature: sequential reveal of the blog outlines, brightening/focusing, then blur/fade. Timing follows Dessa's 1780 ms sequence. Saved focused-frame evidence under the workspace qa/ directory.
- Close cross: sampled a real click. Opacity passed through an intermediate 0.264687 value before reaching zero, and the dialog was subsequently removed.
- Project close: title/image return completes and restores focus. An offscreen return link is brought into view before the return animation.
- Archive fixture: temporarily marked Altman archived in both local repositories. Confirmed its removal from the default list, bottom-only disclosure placement, expanded/collapsed accessibility state, archive label beside Languages, and direct URL access.
- Keyboard: ArrowRight from akron-website opened amigazo while Altman was hidden.
- Spanish: translated archive label and controls, native close via Escape, 390px layout with no horizontal overflow.
- Reduced motion: direct /altman shows the dialog without retaining the intro.
- Temporary Altman selection removed before the final build. No projects are archived in the delivered metadata.

The new catalogue unit suite owns partitioning and visible-neighbor invariants. Browser checks cover the separate native top-layer, motion, and focus failure modes. No mocks or permanent QA flags were added.

Lint has zero errors and retains the three existing image warnings per site. Type checks and 33 tests pass. Both production builds pass with existing Cal Sans fallback warnings; English also retains its middleware deprecation warning.

The simplification review ran inline under the no-delegation constraint. Shared catalogue grouping/navigation helpers keep stable indices; fixed SVG dash arrays are initialized once rather than each animation frame. No unrelated project descriptions, assets, or dependencies were changed.

## Checkbox page and animation performance update

The intro now uses precomputed Web Animation keyframes, normalized SVG masks, and one small HTML blur/opacity surface. No JavaScript animation-frame loop or per-glyph blur filters remain. Image warming starts after the intro.

/archive-review is a real checkbox page with browser-local draft storage and selection export. /archive-review/preview renders those draft choices in the real catalogue. /archive-review/example renders an explicit Altman archive example without changing the draft. Chrome QA verified selection persistence, the draft reaching the catalogue, and archive expansion on the example route. Existing draft selections were preserved when the owner began editing.

Both production builds, type checks, lint (existing image warnings only), and all 33 tests pass. The frame-by-frame CSS work is materially smaller; smoothness still depends on the browser and machine, so the local preview is the feel check.

## Applied archive selection and visitor message

Applied the 68 repository IDs from archive-selection (1).json to both metadata maps, with an exact-set comparison against the upload. Updated the printable checkboxes to reflect the applied choices.

Chrome QA: the archive stays collapsed while the native message dialog is open; background scrolling is locked. Cancel, Escape, and backdrop dismissal leave it collapsed and restore focus to the trigger. Confirmation reveals all 68 links. Collapse closes the archive without prompting. Spanish copy and actions fit a 390px viewport (358px dialog width). The expanded list retains the same project typography and layout as the main catalogue.

Both production builds and all 33 tests pass, and lint retains only existing image warnings. The simplification review ran inline, reusing native dialog focus/dismissal behavior and the existing scroll-lock selector rather than introducing a second modal system or a dependency.
