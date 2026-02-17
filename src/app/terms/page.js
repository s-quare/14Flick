import Link from "next/link";

export const metadata = {
  title: "Terms of Use | 14flick",
  description:
    "The rules and guidelines for using 14flick, including our data attribution to TMDB.",
  robots: "noindex, follow",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10 text-yellow-400">
        Terms of Use
      </h1>

      <div className="space-y-8 text-neutral-400 leading-relaxed text-sm">
        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            1. Service Description
          </h2>
          <p>
            14flick is a movie and TV series discovery platform.{" "}
            <strong>
              14flick does not host, stream, or store any video content directly
              on its servers.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            2. Data Attribution
          </h2>
          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB. All movie data, images, and descriptions are provided by{" "}
            <a
              href="https://www.themoviedb.org"
              className="text-yellow-400 underline"
            >
              The Movie Database (TMDB)
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            3. Intellectual Property
          </h2>
          <p>
            All movie posters, trailers, and backdrops belong to their
            respective copyright owners. 14flick uses this media for
            informational purposes under {`"Fair Use"`} guidelines.
          </p>
        </section>

        <footer className="pt-10 border-t border-white/10">
          <Link
            href="/"
            className="text-yellow-400 font-light text-xs tracking-widest"
          >
            ← Go to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
