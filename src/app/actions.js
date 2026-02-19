"use server";

import { getTrendingAll, getTopRatedMovies, searchMulti } from "@/lib/tmdb";

const DAY = 86400; // 24 hours in seconds

export async function getSearchInitialData() {
  const [trending, topRated] = await Promise.all([
    getTrendingAll(),
    getTopRatedMovies(),
  ]);

  return {
    trending: trending.slice(0, 10),
    topRated: topRated.slice(0, 10),
  };
}

export async function performSearch(query) {
  return await searchMulti(query);
}

// All detail fetches now use 24-hour revalidation to save CPU
export async function getMovieDetails(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits,recommendations,watch/providers`,
      { next: { revalidate: DAY } },
    );
    return res.ok ? await res.json() : null;
  } catch (error) {
    console.error("Movie fetch error:", error);
    return null;
  }
}

export async function getTVDetails(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits,recommendations,watch/providers`,
      { next: { revalidate: DAY } },
    );
    return res.ok ? await res.json() : null;
  } catch (error) {
    return null;
  }
}

export async function getPersonDetails(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=combined_credits,external_ids`,
      { next: { revalidate: DAY } },
    );
    return res.ok ? await res.json() : null;
  } catch (error) {
    return null;
  }
}

export async function getCollectionDetails(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.TMDB_API_KEY}`,
      { next: { revalidate: DAY } },
    );
    return res.ok ? await res.json() : null;
  } catch (error) {
    return null;
  }
}

export async function getDiscoverMedia(type = "movie", filters = {}) {
  const { genre, country, gte, lte, page = 1 } = filters;
  const API_KEY = process.env.TMDB_API_KEY;

  let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;

  if (genre) url += `&with_genres=${genre}`;
  if (country) url += `&with_origin_country=${country}`;
  if (gte) url += `&primary_release_date.gte=${gte}`;
  if (lte) url += `&primary_release_date.lte=${lte}`;

  try {
    // Discovery lists are updated to 12 hours (43200) to balance freshness and CPU usage
    const res = await fetch(url, { next: { revalidate: 43200 } });
    if (!res.ok) throw new Error("Failed fetch");
    return await res.json();
  } catch (error) {
    throw error;
  }
}
