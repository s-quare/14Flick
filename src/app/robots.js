export default function robots() {
  return {
    rules: [
      // Block aggressive AI scrapers completely
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "CCBot",
          "ImagesiftBot",
          "Omgilibot",
        ],
        disallow: "/",
      },
      // Block other known aggressive bots
      {
        userAgent: ["AdsBot-Google", "Amazonbot", "Yandex", "Baidu", "MJ12bot"],
        disallow: "/",
      },
      // Rules for all other crawlers (including Googlebot, Bingbot)
      {
        userAgent: "*",
        allow: [
          "/", // Homepage
          "/movie/", // Movie detail pages
          "/series/", // Series detail pages
          "/person/", // Actor/person pages
          "/flickmind", // AI recommendation page
          "/movies", // Movies listing
          "/series", // Series listing
        ],
        disallow: [
          "/api/", // API routes - never crawl
          "/search", // Search results - expensive API calls
          "/discover", // Filter/discover - expensive API calls
          "/admin/", // Admin routes
          "/private/", // Private routes
          "/_next/", // Next.js internals
          "/auth/", // Auth routes if you have them
        ],
        crawlDelay: "2", // 2 second delay between requests
      },
    ],
    sitemap: "https://www.14flick.live/sitemap.xml",
  };
}
