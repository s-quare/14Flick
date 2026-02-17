import { getDiscoverMedia } from "@/app/actions";
import MediaGrid from "@/components/catalog/MediaGrid";

export const metadata = {
  title: "Movies Catalog | Explore All Films on 14flick",
  description: "Browse our extensive library of films. From latest blockbusters to timeless classics. Discover your next favorite movie.",
  alternates: { canonical: "/movies" },
};

export default async function MoviesPage() {
  // SEO: Fetch the first page on the server
  const initialData = await getDiscoverMedia("movie", { page: 1 });

  return (
    <main className="min-h-screen bg-black pt-15 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-l-4 border-yellow-400 pl-6">
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
            Movie Catalog
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-2 max-w-xl">
            Explore our top selection of global cinema, updated daily with the latest releases and trending hits.
          </p>
        </header>

        {/* The Client-side Grid handles "See More" */}
        <MediaGrid initialResults={initialData.results} type="movie" />
      </div>
    </main>
  );
}