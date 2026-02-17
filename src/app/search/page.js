import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export const metadata = {
  title: "Search Results",
  description: "Search for your favorite movies, TV shows, and actors on 14flick.",
  robots: "noindex, follow",
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <div>

        <Suspense fallback={<div className="text-center py-20 text-white font-black uppercase tracking-widest animate-pulse">Searching Database...</div>}>
          <SearchClient />
        </Suspense>
      </div>
    </main>
  );
}