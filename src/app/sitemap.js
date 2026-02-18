import { getDiscoverMedia } from "@/app/actions";

export default async function sitemap() {
  const baseUrl = "https://www.14flick.live";

  // 1. Static Pages (Your core navigation)
  const staticPages = [
    "",
    "/flickmind", // Added your new AI feature!
    "/movies",
    "/series",
    "/discover",
    "/terms",
    "/privacy",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/flickmind" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Pages (Movies & Series)
  let dynamicEntries = [];
  try {
    // Fetch Trending Movies
    const movies = await getDiscoverMedia("movie");
    const movieEntries = movies.results.map((m) => ({
      url: `${baseUrl}/movie/${m.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    // Fetch Trending Series
    const series = await getDiscoverMedia("tv");
    const seriesEntries = series.results.map((s) => ({
      url: `${baseUrl}/series/${s.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    dynamicEntries = [...movieEntries, ...seriesEntries];
  } catch (error) {
    console.error("Sitemap dynamic fetch failed", error);
  }

  return [...staticPages, ...dynamicEntries];
}