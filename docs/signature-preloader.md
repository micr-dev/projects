# Portfolio intro and archive behavior

## Intro

Use the blog's Microck signature outlines with Dessa's opening sequence: sequential path drawing, grey-to-white brightening, blur settling into focus, then a brief blur and fade out. Wait 400 ms before drawing. Draw at an even pen speed over 1800 ms, hold the completed signature for 200 ms, then fade it over 400 ms. The full signature sequence ends at 2800 ms. Use browser-owned Web Animations for path drawing and one bounded HTML blur/opacity layer. Do not run a JavaScript frame loop or per-glyph blur filters. This is a single intro, not a loop. Reduced motion skips the intro.

Keep the black intro separate from the existing #121212 page background. Start the original two banks of ten black panels withdrawing toward the top and bottom edges as the signature starts fading, at 2400 ms. Preserve the original 420 ms duration, 140 ms initial delay, 40 ms column stagger, and easing. Keep the signature visible above the panels through its fade. Animate scaleY instead of height. Mount the catalogue and start image warming when the signature starts fading, underneath the withdrawing panels. Keep interaction and native project dialogs disabled until the last panel finishes, 920 ms after the reveal starts. Native dialogs belong to the browser top layer and would otherwise cover the reveal. Reduced motion skips both stages.

## Project close

Fade the close cross over 150 ms when closing begins. Retain the existing title/image return animation and modal focus restoration.

## Archive

`archived: true` in app/repo-metadata.ts is the single source of archive status. Omitted means current. The owner selected 68 repositories in archive-selection (1).json. Both catalogues mark these same repository IDs archived.

Keep current projects in their existing sections. A plain divider and disclosure button appear after the last current project, only when archived projects exist. Show a lock icon, archive count, and Show/Hide label. The disclosure lives in document flow, not as a fixed control. Opening it first presents a styled native modal explaining what archived means, with Explore archived projects and Cancel actions. Only confirmation expands the list. Escape, Cancel, the close cross, or a backdrop click dismisses it without expanding. Native modal focus restoration returns to the disclosure. Closing an expanded archive does not show the message. Direct archived URLs remain accessible without this prompt. Expanded archived projects follow in their original category groups. Collapsing returns focus to the disclosure and resets the preview to a current project. Hide empty category headings.

Archived details show a lock icon and Archived label beside Languages. Direct URLs and static route generation retain every project. Loading an archived URL expands the archive so its return target exists. Keyboard project navigation and hover traversal skip hidden projects. English and Spanish controls use their own language.

The /archive-review page provides real checkboxes, browser-local draft storage, JSON export, and a preview using the actual catalogue. Preview with Altman creates an explicit example draft only. Drafts never update published metadata. The Markdown list remains a printable inventory.
