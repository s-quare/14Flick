import { getPersonDetails } from "@/app/actions";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import MediaLink from "@/components/MediaLink";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const person = await getPersonDetails(id);
  if (!person) return { title: 'Person Not Found' };

  return {
    title: `${person.name} - Movies, Bio & Filmography`,
    description: `Explore the career of ${person.name}. See biography and all movies starring ${person.name} on 14flick.`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w780${person.profile_path}`],
    },
  };
}

export default async function PersonPage({ params }) {
  const { id } = await params;
  const person = await getPersonDetails(id);

  if (!person) notFound();

  // Sort filmography by popularity so their famous stuff is first
  const filmography = person.combined_credits?.cast
    ?.sort((a, b) => b.popularity - a.popularity)
    ?.slice(0, 20);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    description: person.biography,
    image: `https://image.tmdb.org/t/p/w780${person.profile_path}`,
    birthDate: person.birthday,
    birthPlace: person.place_of_birth,
    jobTitle: person.known_for_department,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://14flick.live/person/${person.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="min-h-screen bg-black text-white px-6 md:px-12 py-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: PORTRAIT & BIO DATA */}
          <div className="lg:col-span-4 h-fit lg:sticky lg:top-22 space-y-8">
            <div className="aspect-2/3 w-full max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden border-2 border-neutral-900 shadow-2xl">
              <SmartImage
                path={person.profile_path}
                type="profile"
                alt={person.name}
                overlay="bg-transparent"
              />
            </div>

            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                {person.name}
              </h1>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">
                    Known For
                  </p>
                  <p>{person.known_for_department}</p>
                </div>
                <div>
                  <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">
                    Born
                  </p>
                  <p>
                    {person.birthday}{" "}
                    {person.place_of_birth && `in ${person.place_of_birth}`}
                  </p>
                </div>
                {person.deathday && (
                  <div>
                    <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">
                      Died
                    </p>
                    <p>{person.deathday}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: BIOGRAPHY & FILMOGRAPHY */}
          <div className="lg:col-span-8 space-y-12">
            {/* BIOGRAPHY */}
            <section>
              <h2 className="text-base font-black uppercase tracking-widest mb-6 border-l-4 border-yellow-400 pl-4">
                Biography
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {person.biography ||
                  `We don't have a biography for ${person.name} yet.`}
              </p>
            </section>

            {/* FILMOGRAPHY / KNOWN FOR */}
            <section>
              <h2 className="text-base font-black uppercase tracking-widest mb-8 border-l-4 border-yellow-400 pl-4">
                Most Known For
              </h2>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-6">
                {filmography?.map((work) => (
                  <MediaLink
                    key={work.credit_id}
                    item={{ ...work, media_type: work.media_type }}
                  >
                    <div className="group">
                      <div className="aspect-2/3 rounded-xl overflow-hidden mb-3 border-2 border-white/5 group-hover:border-gray-600/50 transition-colors">
                        <SmartImage
                          path={work.poster_path}
                          alt={work.title || work.name}
                          overlay="bg-transparent"
                        />
                      </div>
                      <h4 className="text-xs font-bold truncate">
                        {work.title || work.name}
                      </h4>
                      <p className="text-[10px] font-bold text-neutral-500 truncate">
                        {work.character ? `as ${work.character}` : work.job}
                      </p>
                    </div>
                  </MediaLink>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
