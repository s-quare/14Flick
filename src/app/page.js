import GenreBento from "@/components/GenreBento";
import Hero from "@/components/Hero";
import JoinInner from "@/components/JoinInner";
import TopRated from "@/components/TopRated";
import TrendingNow from "@/components/TrendingNow";
import { getTopRatedMovies, getTrendingAll } from "@/lib/tmdb";

const Home = async () => {
  const trending = await getTrendingAll();
  const heroMovie = trending[0];
  const restOfTrending = trending.slice(1);
  //console.log(trending);
  const top20 = await getTopRatedMovies();


  return (
    <div>
      <Hero movie={heroMovie} />
      <TrendingNow movies={restOfTrending} />
      <GenreBento />
      <TopRated topMovies={top20} />
      <JoinInner />
    </div>
  );
};

export default Home;
