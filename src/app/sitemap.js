import { getDiscoverMedia } from "@/app/actions";

export default async function sitemap() {
  const baseUrl = "https://www.14flick.live";

  // 1. Static Pages
  const staticPages = ["", "/flickmind", "/movies", "/series", "/discover"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly", // Changed from weekly/daily to stop bot hammering
      priority: route === "" ? 1.0 : 0.7,
    }),
  );

  // 2. Dynamic Pages (Limited to prevent bot-overload)
  let dynamicEntries = [];
  try {
    // We only fetch the first page (top 20) to keep the sitemap small
    const movies = await getDiscoverMedia("movie");
    const movieEntries = movies.results.slice(0, 20).map((m) => ({
      url: `${baseUrl}/movie/${m.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    const series = await getDiscoverMedia("tv");
    const seriesEntries = series.results.slice(0, 20).map((s) => ({
      url: `${baseUrl}/series/${s.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    dynamicEntries = [...movieEntries, ...seriesEntries];
  } catch (error) {
    console.error("Sitemap dynamic fetch failed", error);
  }

  return [...staticPages, ...dynamicEntries];
}
