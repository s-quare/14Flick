export const QUICK_MODES = [
  { id: "all", name: "Trending", params: {} },
  { id: "ng", name: "Nollywood", params: { country: "NG" } },
  { id: "kr", name: "Korean", params: { country: "KR" } },
  { id: "action", name: "Action", params: { genre: "28" } },
  { id: "anime", name: "Anime", params: { genre: "16" } },
];

export const MODAL_OPTIONS = {
  genres: [
    { id: "28", name: "Action" }, { id: "12", name: "Adventure" }, { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" }, { id: "80", name: "Crime" }, { id: "99", name: "Documentary" },
    { id: "18", name: "Drama" }, { id: "10751", name: "Family" }, { id: "14", name: "Fantasy" },
    { id: "36", name: "History" }, { id: "27", name: "Horror" }, { id: "10402", name: "Music" },
    { id: "9648", name: "Mystery" }, { id: "10749", name: "Romance" }, { id: "878", name: "Sci-Fi" },
    { id: "53", name: "Thriller" }, { id: "10752", name: "War" }, { id: "37", name: "Western" }
  ],
  regions: [
    { id: "NG", name: "Nigeria" }, { id: "KR", name: "South Korea" }, { id: "IN", name: "India" },
    { id: "JP", name: "Japan" }, { id: "FR", name: "France" }, { id: "ES", name: "Spain" },
    { id: "MX", name: "Mexico" }, { id: "BR", name: "Brazil" }, { id: "DE", name: "Germany" },
    { id: "IT", name: "Italy" }, { id: "CN", name: "China" }, { id: "GB", name: "UK" }
  ],
  eras: [
    { id: "2020", name: "Modern (2020s)", params: { gte: "2020-01-01" } },
    { id: "2010", name: "2010s", params: { gte: "2010-01-01", lte: "2019-12-31" } },
    { id: "2000", name: "2000s", params: { gte: "2000-01-01", lte: "2009-12-31" } },
    { id: "1990", name: "90s", params: { gte: "1990-01-01", lte: "1999-12-31" } },
    { id: "1980", name: "80s", params: { gte: "1980-01-01", lte: "1989-12-31" } },
    { id: "classic", name: "Golden Era", params: { lte: "1979-12-31" } }
  ]
};