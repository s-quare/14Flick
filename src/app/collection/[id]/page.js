import { getCollectionDetails } from "@/app/actions";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import MediaLink from "@/components/MediaLink";


export async function generateMetadata({ params }) {
  const { id } = await params;
  const collection = await getCollectionDetails(id);
  if (!collection) return { title: "Collection Not Found" };
  
  return { 
    title: `${collection.name} | Complete Movie Collection on 14flick`, 
    description: `Explore all movies in the ${collection.name}, including synopses and where to watch.`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w1280${collection.backdrop_path}`],
    },
  };
}

export default async function CollectionPage({ params }) {
  const { id } = await params;
  const collection = await getCollectionDetails(id);

  if (!collection) notFound();

  // SEO/UX: Sort movies by release date so the story order is correct
  const sortedMovies = collection.parts?.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );

  return (
    <main className="min-h-screen bg-black">
      {/* FRANCHISE HERO */}
      <header className="relative h-[60vh] w-full flex items-end pb-12 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SmartImage 
            path={collection.backdrop_path} 
            type="backdrop" 
            alt={`${collection.name} cover`}
            overlay="bg-linear-to-t from-black via-black/40 to-transparent" 
          />
        </div>
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Movie Collection
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {collection.name}
          </h1>
          <p className="text-sm md:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            {collection.overview}
          </p>
        </div>
      </header>

      {/* PARTS GRID - SEO: Semantic list for movies */}
      <section className="px-6 md:px-12 py-16">
        <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-10 border-b border-white/10 pb-4">
          {sortedMovies?.length} Movies in this Saga
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {sortedMovies?.map((movie) => (
            <MediaLink 
              key={movie.id} 
              item={{...movie, media_type: 'movie'}}
              className="group"
            >
              <article>
                <div className="aspect-2/3 rounded-2xl overflow-hidden mb-4 border-2 border-white/5 group-hover:border-gray-600 transition-all duration-300 shadow-2xl">
                  <SmartImage 
                    path={movie.poster_path} 
                    alt={movie.title}
                    type="poster" 
                    overlay='bg-transparent'
                  />
                </div>
                <h3 className="text-sm font-bold group-hover:text-yellow-400 transition-colors truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-neutral-500">
                    {movie.release_date?.split("-")[0]}
                  </span>
                  <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                  <span className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-tighter">
                    {movie.vote_average.toFixed(1)}⭐
                  </span>
                </div>
              </article>
            </MediaLink>
          ))}
        </div>
      </section>
    </main>
  );
}