const GenreMap = {
  // Movie Genres
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",

  // TV Specific Genres
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics"
};

export const genresSelect = [
    { id: 28, name: "Action", path: "action", class: "col-span-2" },
    { id: 27, name: "Horror", path: "horror", class: "" },
    { id: 35, name: "Comedy", path: "comedy", class: "" },
    { id: 878, name: "Sci-Fi", path: "sci-fi", class: "col-span-2" },
    { id: 16, name: "Animation", path: "animation", class: "col-span-2" },
  ];

export default GenreMap;