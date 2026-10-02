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

## Audit on 2026-10-02

Changes from this audit:

- Close is a 14px cross with a 44px keyboard-focusable tap target, localized accessible name, and safe-area spacing. Escape explicitly invokes the same close lifecycle; native dialog cancellation remains handled.
- Up/Down retain native detail scrolling. Left/Right navigate projects, reset the detail scroll position, and update the focus return target.
- Long desktop headings and their animation copies wrap within the detail content. Production measurement of `github-open-counts-script` found 834px of text inside a 576px heading before this change.
- Detail srcSet sizes now match the 576px content cap. Failed preview decodes release the hover queue and use the placeholder. Failed detail images fall back rather than being marked successfully loaded.
- Secondary small text uses a higher contrast color. The motion provider honors reduced-motion preferences, and Lenis is skipped when reduced motion is requested.
- The English language prompt tolerates blocked localStorage.
- Added WebP container/manifest regression checks. A Pillow verification pass covered all committed raster assets in both repositories; the Spanish empty `upstash-keepalive-2000w.webp` was repaired using the valid English counterpart.

Validation: tests, lint (zero errors, three existing raw-image warnings), TypeScript, and production builds passed for both locales. This workspace requires a temporary external runtime shim for unavailable OS memory/network inspection; the build also requires Next's system TLS certificate option for Google Fonts. Neither workaround changes repository configuration.

Live desktop Chromium inspection verified the pre-change long-title overflow and Escape route dismissal. The browser cannot access this workspace's localhost, and its exposed API does not offer viewport resizing. Consequently the changed UI and the full mobile/desktop viewport matrix have not been browser-verified in this audit. Safari and physical touch devices remain untested. The earlier September browser verification above describes the earlier code, not these changes.

Local follow-up review corrected responsive-image failure handling to retry the original source before the placeholder, and guarded the placeholder decode fallback against repeated reloads. CodeRabbit and GitHub Codex reviews have not run: publishing the branches is blocked by the active GitHub integration returning 403 for repository writes. The connection currently lists only the Microck account installation, not micr-dev.
