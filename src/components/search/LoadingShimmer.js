"use client";

export default function LoadingShimmer() {
  return (
    <div className="w-full grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 place-items-center gap-6 md:gap-10 mb-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-55 aspect-2/3 h-35 xs:h-48 sm:h-70 rounded-lg overflow-hidden bg-gray-800 animate-shimmer-left-to-right
          "
        />
      ))}
    </div>
  );
}
