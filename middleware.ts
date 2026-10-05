import { NextRequest, NextResponse } from "next/server";

const markdown = `# Microck Projects

A public portfolio of software, tools, and experiments by Microck.

- Portfolio: https://projects.micr.dev/
- English: https://projects.micr.dev/en/
- Spanish: https://projects.micr.dev/es/
- GitHub: https://github.com/Microck
`;

export function middleware(request: NextRequest) {
  const response = request.headers.get("accept")?.includes("text/markdown") && request.nextUrl.pathname === "/"
    ? new NextResponse(markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
    : NextResponse.next();

  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
