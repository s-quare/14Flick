import Link from "next/link";

export default function MediaLink({ item, children, className = "" }) {

    const getUrl = () => {
    if (!item) return "#";
    
    const type = item.media_type || (item.title ? "movie" : "tv");
    const id = item.id;

    switch (type) {
      case "movie":
        return `/movie/${id}`;
      case "tv":
        return `/tv/${id}`;
      case "person":
        return `/person/${id}`;
      case "collection":
        return `/collection/${id}`;
      default:
        // Fallback
        return `/search?q=${encodeURIComponent(item.title || item.name || "")}`;
    }
  };

  return (
    <Link 
      href={getUrl()} 
      prefetch={false}
      className={`block text-inherit no-underline ${className}`}
    >
      {children}
    </Link>
  );
}