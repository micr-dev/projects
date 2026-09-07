# Portfolio interaction contract

Regression coverage for the production QA report in micr-dev/projects issue #5.

- Every catalogue project is a real, focusable link to its existing canonical route. Ordinary clicks open its detail; modified clicks retain browser link behavior.
- Details use a named modal dialog with a visible Close button, Escape dismissal, contained keyboard focus, and focus restored to the invoking link.
- Wheel/touch input scrolls the detail panel, never the catalogue behind it. Text and action links remain reachable at 320x568, 390x844, and 1366x768.
- Below 1024px the floating preview is hidden and the catalogue starts near the top. At desktop widths the existing preview remains.
- Clicking detail content does not dismiss it. Clicking the empty backdrop or Close does.
- A preview URL must not duplicate the source URL. Package, mod, documentation, and userscript destinations have descriptive action labels.
- The Spanish project displays "boilify" while retaining its existing /bolify route. Its metadata and image keys remain the existing project identifier.
- Spanish unknown routes display a Spanish title/message and a link back to the catalogue.

Run `pnpm test`, `pnpm lint`, and `pnpm build`. Browser verification must exercise Tab/Enter, modified clicks, Escape, focus restoration, backdrop dismissal, direct loads, Back/Forward, and scrolling after the animation settles. Check both locales at 320, 375, 390, 430, 768, 1024, 1366, 1920, and 2560px plus 844x390 landscape.

## Verification on 2026-09-07

Computer Use checked catalogue and detail layouts at 320x568, 375x812,
390x844, 430x932, 768x1024, 844x390, 1024x768, 1366x768, 1920x1080,
and 2560x1440. No horizontal overflow was observed. The floating catalogue
preview is hidden below 1024px and visible at desktop widths.

Keyboard entry, modal focus containment, Escape, Close, focus restoration,
backdrop/content clicks, direct routes, browser Back/Forward, and native
modified-click navigation were exercised across the two locale builds.
Wheel input moved the detail scroller while the document stayed at its
original position. Production smoke checks repeated scrolling and focus
restoration after the animation lifecycle fix.

Both builds passed tests, lint, and production compilation. Each locale has
three existing next/no-img-element warnings. Browser testing used desktop
Chromium with viewport emulation; physical touch devices and Safari were
not tested.
