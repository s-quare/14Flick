"use client";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";

export default function MovieHero({ movie, trailer }) {
  const [isPlaying, setIsPlaying] = useState(false);  

  return (
    <section className="relative h-[70vh] lg:h-[85vh] w-full bg-black overflow-hidden">
      {isPlaying && trailer ? (
        <div className="absolute inset-0 z-20">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&rel=0&iv_load_policy=3&modestbranding=1`}
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute bottom-3 left-3 text-xs font-bold z-50 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            ✕ Close Trailer
          </button>
        </div>
      ) : (
        <>
          <SmartImage
            path={movie.backdrop_path || movie.poster_path}
            type="backdrop"
            alt={movie.title}
            priority={true}
            overlay="bg-gradient-to-t from-black via-black/20 to-transparent"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent z-10" />
        </>
      )}

      {!isPlaying && (
        <div className="absolute bottom-0 left-0 px-6 md:px-12 py-16 w-full max-w-4xl z-30">
          <h1 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-bold mb-6 text-gray-300">
            <span className="text-yellow-400">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>{movie.runtime} min</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-[10px] uppercase">
              {movie.status || ""}
            </span>
          </div>


          <div className="flex items-center gap-4">
            {trailer && (
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all active:scale-95"
              >
                Watch Trailer
              </button>
            )}
            <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold border border-white/10 hover:bg-white/20 transition-all">
              + WatchList
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
