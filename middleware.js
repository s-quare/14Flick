import { NextResponse } from "next/server";

// Comprehensive Regex for known bots, scrapers, and crawlers
const BOT_REGEX =
  /bot|spider|crawl|scraper|preview|whatsapp|facebook|ai|index|python|curl|wget/i;

export function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";

  // 1. Identify and Block Bots
  if (BOT_REGEX.test(userAgent)) {
    // Specifically allow standard Google/Bing for SEO, block the rest of the noise
    const isSearchEngine = /googlebot|bingbot/i.test(userAgent);

    if (!isSearchEngine) {
      return new NextResponse(null, { status: 403 });
    }
  }

  // 2. Security Headers (Small bonus for SEO/Safety)
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

// 3. Matcher: Don't run middleware on static files (images, css, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (internal API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
