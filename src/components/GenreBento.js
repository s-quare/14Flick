import Link from "next/link";
import { genresSelect } from "@/lib/GenreMap";
import SmartImage from "./SmartImage";

const GenreBento = () => {
  return (
    <section
      aria-labelledby="genre-title"
      className="py-8 px-6 mx-auto max-w-200"
    >
      <h2
        id="genre-title"
        className="text-lg font-bold text-white mb-6 tracking-tight uppercase"
      >
        Discover
      </h2>
      <div role="list" className="grid grid-cols-3 gap-4">
        {genresSelect.map((genre) => (
          <Link 
            href={`/discover?genre=${genre.id}`} 
            key={genre.id}
            className={`${genre.class} block group`}
          >
            <article
              role="listitem"
              className={`relative rounded-lg overflow-hidden cursor-pointer border border-neutral-800 h-35 xs:h-48 sm:h-70`}
            >
              <SmartImage
                selfImage={`/images/covers/${genre.path}.avif`}
                type="poster"
                overlay="bg-black/30"
                alt={genre.name}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 bg-linear-to-t from-black/80 via-transparent to-transparent group-hover:from-black/90 transition-all">
                <h3 className="text-white text-xs sm:text-xl font-black italic uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform">
                  {genre.name}
                </h3>
                <div className="w-0 group-hover:w-12 h-1 bg-yellow-400 transition-all duration-300" />
              </div>
            </article>
          </Link>
        ))}

        {/* The "See All" Discover Button */}
        <div className="grid place-items-center h-35 xs:h-48 sm:h-70 ">
          <Link href="/discover">
            <button className="text-xs font-black uppercase tracking-widest bg-yellow-400 py-2 px-4 text-black hover:scale-105 transition-transform">
              Discover <i className="bi bi-arrow-right icon-stroke"></i>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenreBento;