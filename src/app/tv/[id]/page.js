import { getTVDetails } from "@/app/actions";
import { notFound } from "next/navigation";
import MovieHero from "@/components/movie/MovieHero"; 
import SmartImage from "@/components/SmartImage";
import MediaLink from "@/components/MediaLink";
import WatchProviders from "@/components/movie/WatchProvider";
import TrendingNow from "@/components/TrendingNow";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tv = await getTVDetails(id);
  if (!tv) return { title: "Series Not Found" };

  return {
    title: `${tv.name} TV Series - Seasons, Cast & Details`,
    description: `Discover all seasons and cast members of ${tv.name}. ${tv.overview?.slice(0, 150)}...`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w780${tv.backdrop_path}`],
    },
  };
}

export default async function TVShowPage({ params }) {
  const { id } = await params;
  const series = await getTVDetails(id);

  if (!series) notFound();

  const trailer = series.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const cast = series.credits?.cast?.slice(0, 10);
  const recommendations = series.recommendations?.results?.slice(0, 8);

  return (
    <main className="min-h-screen bg-black pb-20">
      <div className="sticky -top-[25vh]">
        {/* We pass series as "movie" prop because the Hero component expects that structure */}
        <MovieHero
          movie={{ ...series, title: series.name }}
          trailer={trailer}
        />
      </div>

      <section className="px-6 md:px-12 pt-10 space-y-10 relative bg-black/70 backdrop-blur-3xl rounded-t-3xl">
        {/* Description and Cast */}
        <div>
          <p className="font-bold">
            {series.name}{" "}
            {series.tagline && (
              <span className="text-[10px] text-gray-400 font-bold ml-2">
                ({series.tagline})
              </span>
            )}
          </p>

          <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-2xl leading-relaxed">
            {series.overview}
          </p>

          <div className="my-8">
            <WatchProviders data={series["watch/providers"]?.results} />
          </div>

          <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
            Series Cast
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
            {cast?.map((person) => (
              <MediaLink
                key={person.id}
                item={{ ...person, media_type: "person" }}
                className="shrink-0 w-32 md:w-40"
              >
                <div className="aspect-square rounded-full overflow-hidden mb-4 border-2 border-neutral-800 hover:scale-105 transition-transform duration-300">
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
                  {person.roles?.[0]?.character || person.character}
                </p>
              </MediaLink>
            ))}
          </div>
        </div>

        {/* TV SPECIFIC DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 border-y border-neutral-900">
          <div>
            <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
              Status / Type
            </h3>
            <p className="text-sm font-medium">
              {series.status} ({series.type})
            </p>
          </div>
          <div>
            <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
              Seasons / Episodes
            </h3>
            <p className="text-sm font-medium">
              {series.number_of_seasons} Seasons | {series.number_of_episodes}{" "}
              Episodes
            </p>
          </div>
          <div>
            <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">
              Network
            </h3>
            <div className="flex flex-wrap gap-2">
              {series.networks?.map((n) => n.name).join(" | ")}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-400 text-xs uppercase mb-1">
              Genres
            </h3>
            <div className="text-sm">
              {series.genres?.map((g) => g.name).join(" | ")}
            </div>
          </div>
        </div>

        {/* SEASONS SECTION */}
        <div>
          <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
            Seasons
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {series.seasons?.map((season) => (
              <div
                key={season.id}
                className="shrink-0 w-40 group cursor-default"
              >
                <div className="aspect-2/3 rounded-lg overflow-hidden mb-3 border border-white/5">
                  <SmartImage
                    path={season.poster_path}
                    alt={season.name}
                    overlay="bg-transparent"
                  />
                </div>
                <p className="text-sm font-bold truncate">{season.name}</p>
                <p className="text-[10px] text-neutral-500">
                  {season.episode_count} Episodes •{" "}
                  {season.air_date?.split("-")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        {recommendations && recommendations.length > 0 ? (
          <div>
            <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
              Similar Shows
            </h2>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-6">
              {recommendations.map((item) => (
                <MediaLink key={item.id} item={{ ...item, media_type: "tv" }}>
                  <div className="aspect-2/3 rounded-xl overflow-hidden mb-3">
                    <SmartImage
                      path={item.poster_path}
                      alt={item.name}
                      overlay="bg-transparent"
                    />
                  </div>
                  <h4 className="text-sm font-bold truncate">{item.name}</h4>
                  <p className="text-xs text-neutral-500">
                    {item.first_air_date?.split("-")[0]}
                  </p>
                </MediaLink>
              ))}
            </div>
          </div>
        ) : (
          <TrendingNow />
        )}
      </section>
    </main>
  );
}
