import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | 14flick",
  description:
    "Learn how 14flick handles data and respects your privacy. We prioritize an anonymous and secure browsing experience.",
  robots: "noindex, follow", // Legal pages don't need to rank, but should be followable
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10 text-yellow-400">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-neutral-400 leading-relaxed text-sm">
        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            1. Data Collection
          </h2>
          <p>
            14flick is committed to your privacy.{" "}
            <strong>We do not collect personal information</strong>, email
            addresses, or payment details. You can browse our entire catalog
            anonymously.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            2. Third-Party Services
          </h2>
          <p>
            We use the TMDB API to display movie content. When you view
            trailers, you are interacting with <strong>YouTube/Google</strong>{" "}
            services, which have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">
            3. External Links
          </h2>
          <p>
            Our site contains links to external websites. 14flick is not
            responsible for the privacy practices or content of those external
            sites.
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
