import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black py-16 px-6 text-white/70 text-xs border-t border-white/5">
      <hr className="mb-10 border-white/20" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-3 md:flex md:justify-between gap-x-4 gap-y-12">
        {/* Brand Section */}
        <div className="text-center xs:col-span-3 md:max-w-xs pb-5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Image
              src="/images/favicon.jpg"
              alt="14Flick Logo"
              width={32}
              height={32}
              unoptimized
              className="object-contain h-8 aspect-square rounded-full border-white"
            />
            <h1 className="text-yellow-400 font-black text-2xl tracking-tighter">
              14FLICK
            </h1>
          </div>

          <p className="font-medium leading-relaxed max-w-sm mx-auto">
            The ultimate comprehensive database for cinephiles. Discover your
            next favorite movie, series, or hidden gem today.
          </p>
        </div>

        {/* Catalog Links */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">
            Catalog
          </p>
          {[
            { name: "Movies Catalog", href: "/movies" },
            { name: "TV Series", href: "/series" },
            { name: "Discovery Hub", href: "/discover" },
            { name: "Search", href: "/search" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-yellow-400 w-full transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Resources (Pointing to TMDB Sources) */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">
            Resources
          </p>
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition-colors w-full"
          >
            API Documentation
          </a>
          <a
            href="https://www.themoviedb.org/discuss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition-colors w-full"
          >
            TMDB Community
          </a>
          <a
            href="https://www.themoviedb.org/talk"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition-colors w-full"
          >
            Help Center
          </a>
          <div className="flex items-center gap-2 text-neutral-500 mt-1 cursor-default self-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-tighter">
              System Online
            </span>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">
            Legal
          </p>
          {[
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Use", href: "/terms" },
            { name: "Cookies Policy", href: "/cookies" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-yellow-400 transition-colors w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <hr className="mt-15 border-white/20" />

      {/* TMDB Attribution & Copyright */}
      <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-5 w-5 opacity-40 grayscale hover:opacity-100 transition-opacity">
            <Image
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt="TMDB Logo"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <p className="text-[9px] text-center text-white/30 max-w-md uppercase tracking-widest leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>

        <p className="text-[10px] text-center text-white/20 tracking-[0.3em] font-black uppercase">
          © {new Date().getFullYear()} 14FLICK. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
