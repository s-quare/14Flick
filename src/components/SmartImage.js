"use client";
import { useState } from "react";

export default function SmartImage({
  path,
  selfImage = null,
  type = "poster",
  overlay = "bg-black/70",
  alt,
  priority = false,
}) {
  const [isLoading, setLoading] = useState(true);

  const getImageUrl = (path, type) => {
    if (!path)
      return type === "profile"
        ? "/images/person-placeholder.jpeg"
        : "/images/placeholder.avif";

    // Optimized TMDB sizes: sharp but lightweight
    const size =
      type === "backdrop" ? "w780" : type === "profile" ? "h632" : "w342";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      {/* Loading Shimmer - Stays exactly as it was */}
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-neutral-800" />
      )}

      <img
        src={selfImage || getImageUrl(path, type)}
        alt={alt || (type === "profile" ? "Actor profile" : "Media image")}
        // Replacement for 'fill' and 'object-cover'
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        // Native lazy loading for performance
        loading={priority ? "eager" : "lazy"}
        // Triggers your existing loading state
        onLoad={() => setLoading(false)}
        className={`transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Your original overlay */}
      <div className={`absolute inset-0 z-20 ${overlay}`} />
    </div>
  );
}
