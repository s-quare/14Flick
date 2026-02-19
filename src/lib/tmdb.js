import "server-only";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Cache times in seconds
const SIX_HOURS = 21600;

async function fetcher(endpoint, params = "") {
  if (!API_KEY) throw new Error("TMDB_API_KEY is missing");

  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}${params}&language=en-US`;

  const res = await fetch(url, {
    next: { revalidate: SIX_HOURS },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.statusText}`);
  }
  return res.json();
}

export async function getTrendingAll() {
  const data = await fetcher("trending/all/day");
  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );
}

export async function getTopRatedMovies() {
  const data = await fetcher("movie/top_rated");
  return data.results;
}

export async function searchMulti(query) {
  if (!query || query.length > 100) return []; // Security: ignore empty or massive queries

  const data = await fetcher(
    "search/multi",
    `&query=${encodeURIComponent(query)}`,
  );

  return data.results.filter(
    (item) =>
      item.media_type === "movie" ||
      item.media_type === "tv" ||
      item.media_type === "person",
  );
}
