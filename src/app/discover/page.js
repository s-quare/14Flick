import { Suspense } from "react"; // 1. Add this import
import { getDiscoverMedia } from "@/app/actions";
import DiscoverClient from "@/components/discover/DiscoverClient";

export const metadata = {
  title: "Discover Movies by Genre, Region & Era",
  description: "Filter through thousands of movies by mood, origin, or time period.",
  alternates: { canonical: "/discover" },
};

export default async function DiscoverPage() {
  const initialData = await getDiscoverMedia("movie", { page: 1 });

  return (
    <main className="min-h-screen bg-black pt-15 pb-20 px-6 md:px-12">
      <h1 className="sr-only">Discover Movies and TV Series on 14flick</h1>
      <div className="max-w-7xl mx-auto">

        <Suspense fallback={<div className="text-white uppercase font-black animate-pulse">Loading Discovery Hub...</div>}>
          <DiscoverClient initialResults={initialData.results} />
        </Suspense>
      </div>
    </main>
  );
}