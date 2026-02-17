"use client";
import { useSearch } from "@/lib/handleFrontSearch";
import { useState } from "react";

const SearchBar = ({ preParam }) => {
  const [searchTerm, setSearchTerm] = useState(preParam ||"");
  const search = useSearch();

  return (
    <div>
      <div
        className={`w-full grid grid-cols-[1fr_auto] gap-2 border-2 px-2.5 bg-white/10 border-white/50 rounded-full overflow-hidden`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-base w-full outline-0 py-1 placeholder:text-xs"
          placeholder="Search movies, TV shows, people..."
        />
        <button
          onClick={() => search(searchTerm)}
          className={`text-base text-gray-200`}
          disabled={searchTerm.trim() === ""}
        >
          <i className="bi bi-search [-webkit-text-stroke-width:1px] text-"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
