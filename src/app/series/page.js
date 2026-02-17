import { getDiscoverMedia } from "@/app/actions";
import MediaGrid from "@/components/catalog/MediaGrid";

export const metadata = {
  title: "TV Series | Stream the Best Binge-Worthy Shows on 14flick",
  description: "From gripping dramas to hilarious sitcoms, browse all TV series and seasons available for discovery.",
  alternates: { canonical: "/series" },
};

export default async function SeriesPage() {
  const initialData = await getDiscoverMedia("tv", { page: 1 });

  return (
    <main className="min-h-screen bg-black pt-15 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-l-4 border-yellow-400 pl-6">
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
            TV Series
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-2 max-w-xl">
            Your hub for binge-worthy television. Browse seasons, episodes, and the highest-rated shows worldwide.
          </p>
        </header>

        <MediaGrid initialResults={initialData.results} type="tv" />
      </div>
    </main>
  );
}