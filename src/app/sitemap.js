export default async function sitemap() {
  const baseUrl = "https://www.14flick.live";

  // Static pages - these should always be crawlable
  const staticPages = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/flickmind", priority: 0.8, changeFrequency: "monthly" },
    { route: "/movies", priority: 0.9, changeFrequency: "daily" },
    { route: "/series", priority: 0.9, changeFrequency: "daily" },
    { route: "/discover", priority: 0.8, changeFrequency: "weekly" },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Hardcoded popular movies - no API calls, zero cost
  const popularMovieIds = [
    550, 278, 238, 240, 155, 680, 496243, 338953, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 27205, 328,
  ];

  const moviePages = popularMovieIds.map((id) => ({
    url: `${baseUrl}/movie/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Hardcoded popular TV series
  const popularSeriesIds = [
    1399, 1396, 1402, 1403, 1404, 1405, 1416, 1418, 1439, 1440,
    1457, 1668, 2993, 33647, 46952,
  ];

  const seriesPages = popularSeriesIds.map((id) => ({
    url: `${baseUrl}/series/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...moviePages, ...seriesPages];
}