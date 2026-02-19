"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import GenreMap from "@/lib/GenreMap";
import { Monoton } from "next/font/google";
import MediaLink from "./MediaLink";
import { useDataStore } from "@/store/useDataStore";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monoton",
});

const TopRated = () => {
  const topMovies = useDataStore((state) => state.topRated);
  const [currIndex, setCurrIndex] = useState(5);

  const collExp = () => {
    if (currIndex === 5) {
      setCurrIndex(topMovies.length);
    } else {
      setCurrIndex(5);
    }
    setTimeout(() => {
      let target =
        currIndex === 5
          ? document.querySelectorAll(`.TopMoviesMap > *`)[5]
          : document.querySelector(`.ExpColBtn`);

      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  if (!topMovies || topMovies.length === 0) return null;

  return (
    <section
      aria-labelledby="top-rated"
      className="py-8 px-6 relative w-full max-w-200 mx-auto"
    >
      <h2 id="top-rated" className="font-bold font-sans mb-4">
        Top Rated
      </h2>
      <div role="list" className="TopMoviesMap relative space-y-6 ">
        {topMovies.slice(0, currIndex).map((movie, index) => (
          <MediaLink key={movie.id} item={movie}>
            <article
              role="listitem"
              className="relative px-3 py-3 cursor-pointer border-2 border-gray-400/50 overflow-hidden rounded-xl bg-white/10 hover:bg-white/5 transition-all duration-300 flex gap-4"
            >
              <div className="grid items-center">
                <p className={`${monoton.className} text-xl`}>{index + 1}</p>
              </div>
              <div className="h-15 sm:h-20 relative aspect-3/4">
                <SmartImage
                  path={movie.poster_path}
                  type="poster"
                  overlay="bg-transparent"
                  alt={movie.title || movie.name || "Movie Poster"}
                />
              </div>
              <div className="grid items-center">
                <div>
                  <h3 className="font-bold text-sm text-gray-300 mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs font-light text-gray-400">
                    <span className="capitalize font-bold">
                      {GenreMap[movie.genre_ids[0]] || "--"}
                    </span>{" "}
                    <span className="font-black">{" • "} </span>
                    <time dateTime={movie.release_date || movie.first_air_date}>
                      {
                        (movie.release_date || movie.first_air_date)?.split(
                          "-",
                        )[0]
                      }
                    </time>
                  </p>
                </div>
              </div>
            </article>
          </MediaLink>
        ))}
      </div>
      <button
        onClick={collExp}
        className={`ExpColBtn  block w-full bg-linear-to-b from-black/10 via-black to-black text-xs font-bold text-gray-300 p-0 relative ${currIndex === 5 ? "-top-10 h-20" : "top-0 h-10"} transition-all`}
      >
        {currIndex === 5 ? "See All +" : "Collapse"}
      </button>
    </section>
  );
};

export default TopRated;
