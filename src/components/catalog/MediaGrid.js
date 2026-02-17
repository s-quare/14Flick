"use client";
import { useState } from "react";
import { getDiscoverMedia } from "@/app/actions";
import MediaLink from "@/components/MediaLink";
import SmartImage from "@/components/SmartImage";
import { showToast } from "@/lib/toast";

export default function MediaGrid({ initialResults, type }) {
  const [items, setItems] = useState(initialResults || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const data = await getDiscoverMedia(type, { page: nextPage });

      if (data?.results?.length > 0) {
        // Use a Set or check IDs to ensure no duplicates if TMDB updates during browsing
        setItems((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        showToast("You've reached the end of the catalog.");
      }
    } catch (err) {
      showToast("Failed to fetch more content. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
        {items.map((item, index) => (
          <MediaLink
            key={`${item.id}-${index}`}
            item={{ ...item, media_type: type }}
          >
            <article className="group cursor-pointer">
              <div className="aspect-2/3 rounded-2xl overflow-hidden mb-4 border-2 border-white/5 group-hover:border-gray-600 transition-all duration-400 shadow-lg group-active:scale-95">
                <SmartImage
                  path={item.poster_path}
                  alt={item.title || item.name}
                  type="poster"
                  overlay="bg-transparent"
                />
              </div>
              <h3 className="text-xs md:text-sm font-bold truncate group-hover:text-yellow-400 transition-colors">
                {item.title || item.name}
              </h3>
              <p className="text-[10px] text-neutral-500 font-black mt-1 flex gap-2">
                <span>
                  {(item.release_date || item.first_air_date)?.split("-")[0] ||
                    "N/A"}
                </span>
                <span className="text-yellow-500 flex gap-0.5 items-center">
                  <span>{item?.vote_average.toFixed(1) || ''}</span>
                  <i className="bi bi-star-fill"></i>
                </span>
              </p>
            </article>
          </MediaLink>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-20">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`relative px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 border-2
              ${
                loading
                  ? "bg-white/70 border-neutral-800 text-neutral-600"
                  : "bg-white text-black border-white hover:bg-yellow-400 hover:border-yellow-400 active:scale-90"
              }
            `}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
