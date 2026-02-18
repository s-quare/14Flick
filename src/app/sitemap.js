import { getDiscoverMedia } from "@/app/actions";

export default async function sitemap() {
  const baseUrl = "https://www.14flick.live";

  // 1. Static Pages
  const staticPages = [
    "",
    "/movies",
    "/series",
    "/discover",
    "/terms",
    "/privacy",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // 2. Dynamic Movie Pages (Fetch top trending to index them first)
  let movieEntries = [];
  try {
    const trending = await getDiscoverMedia("movie");
    movieEntries = trending.results.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap movie fetch failed", error);
  }

  return [...staticPages, ...movieEntries];
}
