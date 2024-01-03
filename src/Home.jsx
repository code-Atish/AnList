import DisplayTrending from "./ui/Trending";
import PopularAnime from "./PopularAnime";

const Home = () => {
  return (
    <>
      <DisplayTrending
        sortCriteria={["TRENDING_DESC", "Trending"]}
        title="Trending"
        // functions={[setSortValue,setSortText]}
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
    </>
  );
};

export default Home;
