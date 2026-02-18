"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { performSearch, getSearchInitialData } from "@/app/actions";
import TrendingNow from "@/components/TrendingNow";
import TopRated from "@/components/TopRated";
import LoadingShimmer from "@/components/search/LoadingShimmer";
import SearchBar from "@/components/SearchBar";
import SmartImage from "@/components/SmartImage";
import GenreMap from "@/lib/GenreMap";
import MediaLink from "@/components/MediaLink";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [initialData, setInitialData] = useState({
    trending: [],
    topRated: [],
  });
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // get trending and top rated
  useEffect(() => {
    getSearchInitialData().then(setInitialData);
  }, []);

  // 2. Fetch results when query changes
  useEffect(() => {
    if (!query || query.trim() === "") {
      //setResults([]);
      return;
    }

    const triggerSearch = async () => {
      setLoading(true);
      const data = await performSearch(query);
      setResults(data);
      setLoading(false);
      setActiveFilter("all");
    };

    triggerSearch();
  }, [query]);

  const filteredResults = results.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "movies") return item.media_type === "movie";
    if (activeFilter === "series") return item.media_type === "tv";
    if (activeFilter === "people") return item.media_type === "person";
    return true;
  });

  const filters = [
    { id: "all", label: "All", count: results.length },
    {
      id: "movies",
      label: "Movies",
      count: results.filter((i) => i.media_type === "movie").length,
    },
    {
      id: "series",
      label: "Series",
      count: results.filter((i) => i.media_type === "tv").length,
    },
    {
      id: "people",
      label: "People",
      count: results.filter((i) => i.media_type === "person").length,
    },
  ];

  return (
    <main className="">
      <section className="px-6">
        <div className="w-[95%] py-5 max-w-100 mx-auto">
          <SearchBar preParam={query} />
        </div>
        {query && (
          <h1 className="text-lg font-bold mt-5 mb-8">
            {`Search results for: "${query}"`}
          </h1>
        )}

        {/* my filter tab */}
        {query && (
          <div
            className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
            role="tablist"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                aria-current={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === f.id
                    ? "bg-yellow-400 text-black"
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                }`}
              >
                {f.label}{" "}
                {f.id !== "all" && (
                  <span className="opacity-50 ml-1">{f.count}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <LoadingShimmer />
        ) : query && filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 place-items-center gap-10 md:gap-15 mb-10">
            {filteredResults.map((item) => (
              <MediaLink key={item.id} item={item} className="w-full">
                <article
                  title={item.name || item.title}
                  className="w-full flex flex-col gap-4 relative max-w-55 group cursor-pointer"
                >
                  <div className="relative aspect-2/3 rounded-xl overflow-hidden border-2 border-neutral-800 active:scale-95 hover:scale-105 transition-all duration-600">
                    <SmartImage
                      path={item.profile_path || item.poster_path}
                      type={item.media_type === "person" ? "profile" : "poster"}
                      alt={item.name || item.title}
                      overlay="bg-transparent"
                    />
                  </div>
                  {/*  text part */}
                  <div>
                    <div>
                      <h3 className="text-sm font-bold truncate">
                        {item.title || item.name}
                      </h3>
                    </div>

                    <div className="text-gray-400 font-bold text-[10px]">
                      <span className="flex items-center gap-1">
                        <span className="capitalize">
                          {item.media_type === "person"
                            ? "Figure"
                            : item.media_type}
                        </span>
                        {" • "}
                        <span>
                          {item.media_type === "person"
                            ? item.known_for_department
                            : (item.release_date || item.first_air_date)?.split(
                                "-",
                              )[0]}
                        </span>
                      </span>

                      <span>
                        {item.media_type === "person"
                          ? `Popular for ${item.known_for?.[0]?.title || item.known_for?.[0]?.name || '-'}`
                          : item.genre_ids
                              .slice(0, 2)
                              .map((id) => GenreMap[id])
                              .filter(Boolean)
                              .join(" | ")}
                      </span>
                    </div>
                  </div>
                </article>
              </MediaLink>
            ))}
          </div>
        ) : query && filteredResults.length === 0 && !loading ? (
          <div className="mb-5">
            <p className="text-gray-300 text-sm">
              {results.length > 0
                ? `No ${activeFilter === "people" ? "figure" : activeFilter} found for "${query}".`
                : `No matches found. Check your spelling or try searching with
              a different query.`}
            </p>
          </div>
        ) : null}
        {query && <hr className="border-gray-800 border" />}
      </section>
      {/* Recommendations */}
      <div className="space-y-12">
        <TrendingNow
          movies={initialData.trending}
          title="People are watching"
        />
        <TopRated topMovies={initialData.topRated} title="All time classics" />
      </div>
    </main>
  );
};

export default SearchClient;
