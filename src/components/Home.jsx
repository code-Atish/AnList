import DisplayTrending from "./Trending";
import PopularAnime from "./PopularAnime";
import TopAnime from "./TopAnime";

const Home = () => {
  return (
    <>
      <DisplayTrending
        sortCriteria={["TRENDING_DESC", "Trending"]}
        title="Trending"
      />

      <PopularAnime
        nextSeason={false}
        sortCriteria="POPULARITY_DESC"
        title="Popular this season"
      />

      <PopularAnime
        nextSeason={true}
        sortCriteria="POPULARITY_DESC"
        title="Upcoming next season"
      />

      <DisplayTrending
        sortCriteria={["POPULARITY_DESC", "Popularity"]}
        title="All Time Popular"
      />

      <TopAnime />  
    </>
  );
};

export default Home;
