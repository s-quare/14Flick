"use client";
import { useState, useEffect, Fragment, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { getDiscoverMedia } from "@/app/actions";
import { QUICK_MODES, MODAL_OPTIONS } from "@/lib/discover-data";
import { showToast } from "@/lib/toast";
import MediaLink from "@/components/MediaLink";
import SmartImage from "@/components/SmartImage";

export default function DiscoverClient({ initialResults }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. State Management
  const [results, setResults] = useState(initialResults || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 2. Identify active IDs for highlighting
  const activeGenre = searchParams.get("genre");
  const activeCountry = searchParams.get("country");
  const activeGte = searchParams.get("gte");
  const currentId = activeGenre || activeCountry || activeGte || "all";

  // 3. Dynamic Title logic
  const activeLabel = useMemo(() => {
    if (activeGenre)
      return (
        MODAL_OPTIONS.genres.find((g) => g.id === activeGenre)?.name || "Genre"
      );
    if (activeCountry)
      return (
        MODAL_OPTIONS.regions.find((r) => r.id === activeCountry)?.name ||
        "Region"
      );
    if (activeGte)
      return (
        MODAL_OPTIONS.eras.find((e) => e.params.gte === activeGte)?.name ||
        "Era"
      );
    return "Trending";
  }, [activeGenre, activeCountry, activeGte]);

  // 4. Sync Fetching with URL changes
  useEffect(() => {
    const fetchNewSelection = async () => {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      try {
        const filters = {
          genre: searchParams.get("genre"),
          country: searchParams.get("country"),
          gte: searchParams.get("gte"),
          lte: searchParams.get("lte"),
          page: 1,
        };
        const data = await getDiscoverMedia("movie", filters);
        setResults(data.results || []);
        if (data.results?.length === 0)
          showToast("No results found for this selection.");
      } catch (err) {
        showToast("Error fetching results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if there are actually params (otherwise keep initial server results)
    if (searchParams.toString()) {
      fetchNewSelection();
    } else {
      setResults(initialResults);
    }
  }, [searchParams, initialResults]);

  // 5. Load More Logic
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;

    try {
      const filters = {
        genre: searchParams.get("genre"),
        country: searchParams.get("country"),
        gte: searchParams.get("gte"),
        lte: searchParams.get("lte"),
        page: nextPage,
      };
      const data = await getDiscoverMedia("movie", filters);

      if (data.results?.length > 0) {
        setResults((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        showToast("You've reached the end.");
      }
    } catch (err) {
      showToast("Could not load more content.");
    } finally {
      setLoading(false);
    }
  };

  const setUrl = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    router.push(`/discover?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="space-y-12">
      {/* QUICK BUTTONS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide sticky top-0 bg-black/90 backdrop-blur-md z-40 py-4">
        {QUICK_MODES.map((mode) => {
          const isSelected =
            (mode.id === "all" && currentId === "all") ||
            (mode.params.genre === activeGenre && activeGenre) ||
            (mode.params.country === activeCountry && activeCountry);
          return (
            <button
              key={mode.id}
              onClick={() => setUrl(mode.params)}
              className={`shrink-0 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                isSelected
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-neutral-900 text-white border-white/5"
              }`}
            >
              {mode.name}
            </button>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="shrink-0 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400 hover:text-black transition-all"
        >
          More Filters +
        </button>
      </div>

      {/* SHOWING RESULTS FOR LABEL */}
      <div className="border-l-4 border-yellow-400 pl-4">
        <h2 className="text-lg md:text-4xl font-black uppercase flex gap-2">
          <span>Showing:</span> <span className="text-yellow-400">{activeLabel}</span>
        </h2>
      </div>

      {/* GRID */}
      <section
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 xs:gap-10 transition-opacity ${loading && page === 1 ? "opacity-20" : "opacity-100"}`}
      >
        {results.map((item, idx) => (
          <MediaLink
            key={`${item.id}-${idx}`}
            item={{ ...item, media_type: "movie" }}
          >
            <article className="group">
              <div className="aspect-2/3 rounded-2xl overflow-hidden mb-3 border-2 border-white/5 group-hover:border-gray-600 transition-all">
                <SmartImage
                  path={item.poster_path}
                  alt={item.title}
                  overlay="bg-transparent"
                />
              </div>
              <h3 className="text-xs font-bold truncate group-hover:text-yellow-400 transition-colors">
                {item.title}
              </h3>
            </article>
          </MediaLink>
        ))}
      </section>

      {/* LOAD MORE */}
      {hasMore && results.length > 0 && (
        <div className="flex justify-center pt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-white text-black px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {loading ? "Discovering..." : "Load More"}
          </button>
        </div>
      )}

      {/* MODAL */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-100"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/98 backdrop-blur-2xl" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Dialog.Panel className="w-full max-w-5xl">
                <div className="flex justify-between items-center mb-16">
                  <Dialog.Title className="text-xl font-black uppercase tracking-tighter">
                    Categories
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-semibold"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                      Genres
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {MODAL_OPTIONS.genres.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setUrl({ genre: g.id })}
                          className={`text-left p-3 rounded-xl text-[10px] font-bold uppercase transition-all ${activeGenre === g.id ? "bg-yellow-400 text-black" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                      Global Regions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {MODAL_OPTIONS.regions.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setUrl({ country: r.id })}
                          className={`px-4 py-2 border rounded-lg text-[10px] font-bold uppercase ${activeCountry === r.id ? "bg-yellow-400 text-black border-yellow-400" : "bg-transparent border-white/10 hover:border-white/40"}`}
                        >
                          {r.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                      Eras
                    </h4>
                    {MODAL_OPTIONS.eras.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setUrl(e.params)}
                        className={`w-full flex justify-between p-4 rounded-xl text-xs font-black uppercase transition-all ${activeGte === e.params.gte ? "bg-yellow-400 text-black" : "bg-neutral-900 hover:bg-neutral-800"}`}
                      >
                        <span>{e.name}</span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
