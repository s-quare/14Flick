import GenreBento from "@/components/GenreBento";
import SearchBar from "@/components/SearchBar";
import { Monoton } from "next/font/google";
import Link from "next/link";

export const metadata = {
  title: 'Page Not Found | 14flick',
  description: 'Sorry, we couldn’t find the movie or page you were looking for.',
};

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monoton",
});

const NotFound = () => {
  return (
    <div className=" py-20 text-center grid items-center min-h-[calc(100vh-80px)]">
      <div>
        <div className="px-8">
          <h1 className={`text-yellow-400 text-7xl ${monoton.className}`}>
            404
          </h1>
          <p className="pt-8 pb-4 text-xl font-black text-white/70">
            You{"'"}ve Wandered Off
          </p>
          <p className="text-gray-500 font-bold text-xs max-w-100 mx-auto">
            The page you are looking for has been moved, removed, or never
            existed. Looks like you{"'"}ve gone off script.
          </p>
          <div className="w-[95%] py-10 max-w-100 mx-auto">
            <SearchBar />
          </div>
          <div className="py-5 flex items-center justify-center gap-3">
            <Link href="/">
              <button className="bg-yellow-400 border-2 border-yellow-500 text-black text-xs px-5 py-2 font-bold rounded-full">
                Home
              </button>
            </Link>

            <Link href="/movies">
              <button className="bg-black border-2 border-gray-500 text-white text-xs px-5 py-2 font-bold rounded-full">
                Movies
              </button>
            </Link>

            <Link href="/series">
              <button className="bg-black border-2 border-gray-500 text-white text-xs px-5 py-2 font-bold rounded-full">
                Series
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-20">
          <GenreBento />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
