import { getMovieDetails } from "@/app/actions";
import { getSearchInitialData } from "@/app/actions";
import { notFound } from "next/navigation";
import MovieHero from "@/components/movie/MovieHero";
import SmartImage from "@/components/SmartImage";
import MediaLink from "@/components/MediaLink";
import WatchProviders from "@/components/movie/WatchProvider";
import TrendingNow from "@/components/TrendingNow";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id); 
  if (!movie) return { title: "Movie Not Found" };

  const year = movie.release_date?.split("-")[0];

  return {
    title: `${movie.title} (${year}) - Trailer, Cast & Info`,
    description: `Watch the official trailer and explore the cast of ${movie.title}. ${movie.overview?.slice(0, 150)}...`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`],
    },
  };
}

export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const trendingTopRated = await getSearchInitialData();
  console.log(movie);

  if (!movie) notFound();

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const cast = movie.credits?.cast?.slice(0, 10);
  const recommendations = movie.recommendations?.results?.slice(0, 8);

  // ------------------
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.overview,
    image: `https://image.tmdb.org/t/p/w780${movie.poster_path || movie.backdrop_path}`,
    datePublished: movie.release_date,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: movie.vote_average,
      bestRating: "10",
      ratingCount: movie.vote_count,
    },
    director: movie.credits.crew
      .filter((c) => c.job === "Director")
      .map((d) => ({ "@type": "Person", name: d.name })),
    actor: movie.credits.cast.slice(0, 10).map((a) => ({
      "@type": "Person",
      name: a.name,
    })),
    ...(trailer && {
      video: {
        "@type": "VideoObject",
        name: `${movie.title} Official Trailer`,
        description: `Watch the official trailer for ${movie.title}`,
        thumbnailUrl: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
        uploadDate: movie.release_date,
        contentUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
        embedUrl: `https://www.youtube.com/embed/${trailer.key}`,
      },
    }),
  };
  // ------------------

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black pb-20">
        <div className="sticky -top-[25vh]">
          <MovieHero movie={movie} trailer={trailer} />
        </div>

        <section className="px-6 md:px-12 pt-10 space-y-10 relative bg-black/70 backdrop-blur-3xl rounded-t-3xl">
          {/* description and cast section */}
          <div>
            <p className="font-bold">
              {movie.title}{" "}
              {movie.tagline && (
                <span className="text-[10px] text-gray-400 font-bold">
                  ({movie.tagline})
                </span>
              )}
            </p>

            <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-2xl">
              {movie.overview}
            </p>

            <div className="my-8">
              <WatchProviders data={movie["watch/providers"].results} />
            </div>

            <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
              Top Cast
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
              {cast?.map((person) => (
                <MediaLink
                  key={person.id}
                  item={{ ...person, media_type: "person" }}
                  className="shrink-0 w-32 md:w-40"
                >
                  <div className="aspect-square rounded-full overflow-hidden mb-4 border-2 border-neutral-800 hover:scale-105 transition-transform duration-400">
                    <SmartImage
                      path={person.profile_path}
                      type="profile"
                      alt={person.name}
                      overlay="bg-transparent"
                    />
                  </div>
                  <p className="text-sm font-bold text-center truncate">
                    {person.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 text-center truncate">
                    As {person.character}
                  </p>
                </MediaLink>
              ))}
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 border-y border-neutral-900">
            <div>
              <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g) => g.name).join(" | ")}
              </div>
            </div>
            <div>
              <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
                Director
              </h3>
              <p className="text-sm font-medium">
                {movie.credits?.crew?.find((c) => c.job === "Director")?.name ||
                  "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
                Budget / Revenue
              </h3>
              <p className="text-sm font-medium">
                ${(movie.budget / 1000000).toFixed(1)}M / $
                {(movie.revenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-400 text-xs uppercase mb-1">
                Production Companies
              </h3>
              <div className="text-sm font-light">
                {movie.production_companies
                  ?.map((comp) => comp.name)
                  .join(" | ")}
                .
              </div>
            </div>
          </div>

          {/* COLLECTION BANNER */}
          {movie.belongs_to_collection && (
            <div className="relative w-full h-52 xs:h-70 overflow-hidden group">
              {/* Background Image */}
              <div className="absolute z-0 inset-0">
                <SmartImage
                  path={
                    movie.belongs_to_collection.poster_path ||
                    movie.backdrop_path
                  }
                  type="backdrop"
                  alt={movie.belongs_to_collection.name}
                  overlay="bg-black/70"
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-base md:text-lg font-bold text-yellow-300 uppercase tracking-[0.2em] mb-3">
                  {movie.belongs_to_collection.name}
                </h2>
                <MediaLink
                  item={{
                    id: movie.belongs_to_collection.id,
                    media_type: "collection",
                  }}
                >
                  <p className="mt-4 text-xs md:text-sm font-bold bg-white text-black px-5 py-2 rounded-full">
                    View Full Collection
                  </p>
                </MediaLink>
              </div>
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {recommendations && recommendations.length > 0 ? (
            <div>
              <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
                More Like This
              </h2>
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-6">
                {recommendations?.map((item) => (
                  <MediaLink
                    key={item.id}
                    item={{ ...item, media_type: "movie" }}
                    className=""
                  >
                    <div className="aspect-2/3 rounded-xl overflow-hidden mb-3">
                      <SmartImage
                        path={item.poster_path}
                        alt={item.title}
                        overlay="bg-transparent"
                      />
                    </div>
                    <h4 className="text-sm font-bold truncate">{item.title}</h4>
                    <p className="text-xs text-neutral-500">
                      {item.release_date?.split("-")[0]}
                    </p>
                  </MediaLink>
                ))}
              </div>
            </div>
          ) : (
            <TrendingNow movies={trendingTopRated.trending} />
          )}
        </section>
      </main>
    </>
  );
}
