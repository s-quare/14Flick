export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/movie/", // Blocks crawling of individual movie pages
          "/series/", // Blocks crawling of individual series pages
          "/person/", // Blocks crawling of actor pages
          "/api/",
          "/search",
          "/discover",
        ],
        crawlDelay: 10, // Forces bots to wait 10 seconds between clicks
      },
      {
        userAgent: "Googlebot",
        allow: "/", // Allows Google to see your landing pages only
        disallow: ["/api/", "/search"],
      },
    ],
    sitemap: "https://www.14flick.live/sitemap.xml",
  };
}
