const body = `# Microck Projects

A public portfolio of software, tools, and experiments by Microck.

- Portfolio: https://projects.micr.dev/
- English: https://projects.micr.dev/en/
- Spanish: https://projects.micr.dev/es/
- GitHub: https://github.com/Microck

Use project pages as the source of truth. Prefer linked repositories and official sites for code and release details.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
