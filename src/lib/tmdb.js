import "server-only";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetcher(endpoint, params = "") {
  if (!API_KEY) throw new Error("TMDB_API_KEY is missing");
  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}${params}&language=en-US`;
  const res = await fetch(url, {
    next: { revalidate: 21600 }, // 6-hour cache
  });
  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.statusText}`);
  }
  return res.json();
}

//trending
export async function getTrendingAll() {
  const data = await fetcher("trending/all/day");
  const cleanData = data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );

  return cleanData;
}

//top rated
export async function getTopRatedMovies() {
  const data = await fetcher("movie/top_rated");
  return data.results;
}

//search 
export async function searchMulti(query) {
  if (!query) return [];
  const data = await fetcher("search/multi", `&query=${encodeURIComponent(query)}`);
  
  // Filter for clean SEO: Movies, TV, and People only
  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv" || item.media_type === "person"
  );
}