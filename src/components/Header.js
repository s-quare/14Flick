"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/lib/handleFrontSearch";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);
  const search = useSearch();

  const [searchWith, setSearchWith] = useState("");

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleBlur = (e) => {
    const newFocusTarget = e.relatedTarget;
    if (newFocusTarget && searchButtonRef.current?.contains(newFocusTarget)) {
      search(searchWith);
      return;
    }
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const bySubmit = (e) => {
    e.preventDefault();
    search(searchWith);
  };

  return (
    <div className="sticky top-0 z-100 bg-black px-3 sm:px-8 lg:px-13 h-20 flex justify-between items-center gap-3">
      <div className="flex items-center gap-2">
        <Image
          src="/images/favicon.jpg"
          alt="14Flick Logo"
          width={32}
          height={32}
          className="h-6 object-contain w-6 rounded-full"
        />
        <h1 className="text-yellow-300 font-black font-mono text-sm xs:text-lg">
          14Flick
        </h1>
      </div>

      {pathname !== "/search" && (
        <div className="hidden md:block">
          <SearchBar />
        </div>
      )}

      <div
        className={`grid max-w-200 ${isFocused ? "grid-cols-[0px_1fr]" : "grid-cols-[auto_auto]"} font-bold items-center text-gray-200 text-xs transition-all duration-400`}
      >
        <div className="flex gap-1.5 sm:gap-2 overflow-hidden">
          {[
            { name: "Home", href: "/" },
            { name: "Movies", href: "/movies" },
            { name: "Series", href: "/series" },
            { name: "Discover", href: "/discover" },
          ].map(
            (item) =>
              item.href !== pathname && (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ),
          )}
        </div>

        {pathname !== "/search" && (
          <div
            className={`max-w-45 xs:max-w-65 border-white/50 py-1 grid ${isFocused ? "grid-cols-[1fr_auto] border-2 px-2.5" : "grid-cols-[0px_auto]"} gap-2 items-center rounded-full overflow-hidden md:hidden transition-all duration-400`}
          >
            <form onSubmit={bySubmit}>
              <input
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                type="text"
                className="w-full font-light text-base"
                value={searchWith}
                onChange={(e) => setSearchWith(e.target.value)}
              />
            </form>

            <button
              ref={searchButtonRef}
              onClick={focusInput}
              disabled={isFocused && searchWith.trim() === ""}
              className={`block text-base md:hidden ${isFocused ? "-rotate-15 text-yellow-500" : "rotate-0 text-gray-200"} transition-all`}
            >
              <i className="bi bi-search [-webkit-text-stroke-width:1px]"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

//home-, /movie[id]- /search- || movies-, series-, discover-,  || /person[id]-, collection[id] legal(about and privacy)
