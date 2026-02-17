"use client";
import Image from "next/image";
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
    const size = type === "backdrop" ? "original" : "w500";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const POSTER_SIZES =
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  const BANNER_SIZES = "100vw";
  const PROFILE_SIZES = "(max-width: 640px) 50vw, 20vw";

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      {/* loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-neutral-800" />
      )}

      {/* next */}
      <Image
        src={selfImage || getImageUrl(path, type)}
        alt={alt || (type === "profile" ? "Actor profile" : "Media image")}
        fill
        sizes={
          type === "backdrop"
            ? BANNER_SIZES
            : type === "profile"
              ? PROFILE_SIZES
              : POSTER_SIZES
        }
        priority={priority}
        loading={type === "backdrop" ? "eager" : "lazy"}
        className={`object-cover transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />

      {/* overlay */}
      <div className={`absolute inset-0 z-20 ${overlay}`} />
    </div>
  );
}


