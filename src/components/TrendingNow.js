"use client";

import { useRef } from "react";
import MediaLink from "./MediaLink";
import SmartImage from "./SmartImage";
import { useInView } from "react-intersection-observer";
import { useDataStore } from "@/store/useDataStore";

const TrendingNow = () => {
  const movies = useDataStore((state) => state.trending);
  const scrollRef = useRef(null);

  const { ref: lastCardRef, inView: isAtEnd } = useInView({
    threshold: 0.1,
    rootMargin: "0px -50px 0px 0px",
  });

  const scrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: (window.innerWidth * 0.6), behavior: "smooth" });
  }
};

if(!movies || movies.length === 0) return;

  return (
    <section aria-labelledby="trending-title" className="py-8 pl-5 px-3">
      <h2 id="trending-title" className="text-lg font-bold font-mono">
        Trending Now
      </h2>
      <p className="text-white/80 text-xs my-3">
        Most streamed movies this week globally
      </p>
      <div
        ref={scrollRef}
        role="list"
        className="TrendingGrid grid grid-rows-2 relative grid-flow-col gap-x-6 gap-y-10 xs:gap-x-10 overflow-x-auto pb-4 pl-3 no-scrollbar"
      >
        {movies.map((movie) => (
          <MediaLink key={movie.id} item={movie} className="w-full">
            <article
              role="listitem"
              className="cursor-pointer relative flex flex-col gap-2 w-35 md:w-45"
            >
              {/* 1. Image Container (Fixed Aspect Ratio) */}
              <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden border-2 border-neutral-800 active:scale-95 hover:scale-105 transition-all duration-600">
                <SmartImage
                  path={movie.poster_path}
                  type="poster"
                  overlay="bg-transparent"
                  alt={movie.title || movie.name}
                />
              </div>

              {/* 2. Text Content */}
              <div className="px-1">
                <h3 className="text-white text-sm md:text-base font-medium truncate">
                  {movie.title || movie.name}
                </h3>
                <p className="text-neutral-400 py-1 text-xs flex items-center justify-between">
                  <span className="capitalize font-bold">
                    {movie.media_type}
                  </span>
                  <span className="text-[10px]">
                    {
                      (movie.release_date || movie.first_air_date)?.split(
                        "-",
                      )[0]
                    }
                  </span>
                </p>
              </div>
            </article>
          </MediaLink>
        ))}
        <div ref={lastCardRef} className="opacity-0 w-1"></div>
        <div
          className={`row-span-2 h-fit sticky right-0 grid self-center place-items-center bg-linear-to-r from-transparent to-black transition-all duration-500 ease-in-out ${isAtEnd ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}
        >
          <button
            onClick={scrollRight}
            aria-label="Scroll right for more"
            className="h-10 w-10 relative -top-1.5 rounded-full bi bi-chevron-right icon-stroke bg-white/10 hover:bg-white/20"
          ></button>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
