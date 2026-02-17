import GenreMap from "@/lib/GenreMap.js";
import SmartImage from "./SmartImage";
import MediaLink from "./MediaLink";

const Hero = ({ movie }) => {
  return (
    <section aria-labelledby="featured-movie" className="relative">
      <article className="relative">
        <div className="absolute top-0 left-0 right-0 z-0 w-full h-full">
          <SmartImage
            path={movie.backdrop_path}
            type="backdrop"
            priority={true}
            alt={movie?.name || movie.title}
          />
        </div>

        <div className="relative py-20 md:py-25 px-6 md:px-15">
          <h2 id="featured-movie" className="sr-only">
            Featured Movie- {movie?.name || movie.title}
          </h2>
          <p className="text-yellow-500 font-black text-[6px]">#1 FEATURED</p>
          <h3 className="text-3xl mb-3 font-black">
            {movie?.name || movie.title}
          </h3>
          {(movie.original_title || movie.original_name) !==
            (movie.title || movie.name) && (
            <p className="font-bold mb-3">
              {movie.original_title || movie.original_name}
            </p>
          )}
          <div className="flex items-center gap-2 py-5 text-[10px] font-bold text-gray-300">
            <span className="capitalize">{movie.media_type}</span>
            <span className="p-1 font-bold border-yellow-500 border text-yellow-300 bg-yellow-500/20">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>
              {movie?.first_air_date?.split("-")[0] ||
                movie?.release_date?.split("-")[0] ||
                "--"}
            </span>
            <span className="capitalize">
              {movie.genre_ids
                .slice(0, 3)
                .map((id) => GenreMap[id])
                .filter(Boolean)
                .join(" | ")}
            </span>
          </div>
          <p className="font-semi-bold text-xs max-w-150">{movie.overview}</p>
          <MediaLink item={movie}>
            <button className="mt-8 bg-yellow-400 text-black font-bold text-xs px-5 py-1">
              View{" "}
              <i className="bi bi-arrow-right [-webkit-text-stroke-width:1px]"></i>
            </button>
          </MediaLink>
        </div>
      </article>
    </section>
  );
};

export default Hero;
