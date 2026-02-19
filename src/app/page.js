import FlickMindCTA from "@/components/FlickMindCTA";
import GenreBento from "@/components/GenreBento";
import Hero from "@/components/Hero";
import JoinInner from "@/components/JoinInner";
import TopRated from "@/components/TopRated";
import TrendingNow from "@/components/TrendingNow";

const Home = async () => {

  return (
    <div>
      <Hero />
      <TrendingNow />
      <FlickMindCTA />
      <GenreBento />
      <TopRated />
      <JoinInner />
    </div>
  );
};

export default Home;
