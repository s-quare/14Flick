import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | 14flick",
  description: "Information about how 14flick uses cookies to improve your browsing experience.",
  robots: "noindex, follow",
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10 text-yellow-400">Cookie Policy</h1>
      
      <div className="space-y-8 text-neutral-400 leading-relaxed text-sm">
        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">1. How We Use Cookies</h2>
          <p>14flick uses minimal cookies to remember your preferences and ensure the site loads efficiently. We do not use cookies for targeted advertising.</p>
        </section>

        <section>
          <h2 className="text-white font-bold uppercase tracking-widest mb-3">2. Third-Party Cookies</h2>
          <p>Some content, such as embedded YouTube trailers, may set their own cookies when played. You can manage these via your browser settings.</p>
        </section>

        <footer className="pt-10 border-t border-white/10">
          <Link href="/" className="text-yellow-400 font-light uppercase text-xs tracking-widest">← Back to Home</Link>
        </footer>
      </div>
    </main>
  );
}