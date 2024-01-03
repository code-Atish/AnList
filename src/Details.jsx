import { createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getDetails } from "./queries/queries";
import { TitleCase, nextEpCounter } from "./converTime";
import TabsDemo from "./ui/TabsDemo";
import { Loader } from "./ui/CharactersTab/CharactersTab";
import "./details.css";
import { errorCodes } from "@apollo/client/invariantErrorCodes";
import { MakeRequest } from "./ui/Trending";

const MyContext = createContext();
const shortMonthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function Details() {
  const { id } = useParams();
  // Function to update language without causing re-render
  const { loading, error, data, fetchMore } = useQuery(getDetails, {
    variables: {
      id: id,
      page: 1,
      perPage: 10,
      language: "JAPANESE",
      staffPage: 1,
      staffPerPage: 15,
    },
  });
  if (loading)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Loader />
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;
  const Data = data.Page.media[0];
  const filteredRakings = Array.from(Data.rankings).slice(0, 2);
  const contextValue = { data: Data, fetchMore: fetchMore };

  const sidebarDetails = {
    Format: Data.format,
    Episodes: Data.episode,
    "Episode Duration": Data.duration,
    Status: TitleCase(Data.status),
    "Start Date": `${shortMonthNames[Data.startDate.month]} ${
      Data.startDate.day
    }, ${Data.startDate.year}`,
    Season: `${TitleCase(Data.season)} ${Data.seasonYear}`,
    "Average Score": Data.averageScore ? `${Data.averageScore}%` : null,
    "Mean Score": Data.meanScore ? `${Data.meanScore}%` : null,
    Popularity: Data.popularity,
    Favorites: Data.favourites,
    Studios: Data.studios.edges
      .filter(({ isMain }) => isMain)
      .map(({ node }) => node.name)
      .join("\n"),
    Producers: Data.studios.edges
      .filter(({ isMain }) => !isMain)
      .map(({ node }) => node.name)
      .join("\n"),
    Source: Data.source,
    // Hashtag: "#呪術廻戦 #呪術2期".join('\n'),
    Genres: Data.genres.join("\n"),
    Romaji: Data.title.romaji,
    English: Data.title.english,
    Native: Data.title.native,
  };

  return (
    <div>
      <div className="banner" style={{ background: Data.coverImage.color }}>
        <img
          style={{
            display: Data.bannerImage ? "block" : "none",
          }}
          className="banner-image"
          onLoad={(e) => (e.target.style.opacity = 1)}
          src={Data.bannerImage}
          alt="BannerImage"
        />
        <div className="shadow"></div>
      </div>
      <div className="bg-white">
        <div className="max_width">
          <div className="margin">
            <div className="hero__section">
              <div
                className="hero__image__container"
                // style={{
                //     '--offsetY':Data.bannerImage?'-45%':'0%',
                // }}
              >
                <div className="hero_image_content flex">
                  <div
                    className="PV_wrapper"
                    style={{
                      marginTop: Data.bannerImage
                        ? "var(--offset-image)"
                        : "0%",
                      backgroundColor: Data.coverImage.color,
                    }}
                    // style={{backgroundColor:Data.coverImage.color}}
                  >
                    <img
                      className="PV"
                      onLoad={(e) => (e.target.style.opacity = 1)}
                      src={Data.coverImage.extraLarge}
                      alt="Poster Visual"
                    />
                  </div>
                  <div
                    className="rankings_wrapper flex"
                    style={{
                      marginTop: Data.bannerImage
                        ? "var(--offset-rankings)"
                        : "0%",
                    }}
                  >
                    {filteredRakings.map((item) => (
                      <div className="rankings" key={item.id}>
                        {item.type == "RATED" && (
                          <i
                            className="fa-solid fa-star"
                            style={{ color: "gold", marginRight: "7px" }}
                          ></i>
                        )}
                        {item.type == "POPULAR" && (
                          <i
                            className="fa-solid fa-heart"
                            style={{ color: "red", marginRight: "7px" }}
                          ></i>
                        )}
                        <span className="context">
                          #{item.rank} {item.context}{" "}
                          {item.year && <>{item.year}</>}
                        </span>
                      </div>
                    ))}
                    {/* <div className='rankings'>
                                                  <i class="fa-solid fa-star" style={{color:'gold',marginRight:'7px'}}></i>
                                                  #{filteredRakings[0].rank} {filteredRakings[0].context}
                                              </div>
                                              <div className='rankings'>
                                                  <i class="fa-solid fa-heart" style={{color:'red',marginRight:'7px'}}></i>
                                                  #{filteredRakings[1].rank} {filteredRakings[1].context}
                                              </div> */}
                  </div>
                </div>
              </div>
              <div className="hero__details">
                <h1 className="title">
                  {Data.title.english || Data.title.romaji}
                </h1>
                <div
                  className="synopsis"
                  dangerouslySetInnerHTML={{ __html: Data.description }}
                ></div>
              </div>
              {/* <div className="tabs"></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="max_width">
        <div className="margin">
          <div className="details_section">
            <div className="sidebar_details">
              {Data.nextAiringEpisode && (
                <div className="Airing_det">
                  <div className="pb-5">Airing</div>
                  <div>{nextEpCounter(Data.nextAiringEpisode)}</div>
                </div>
              )}
              {Object.entries(sidebarDetails).map(([key, value], index) => {
                if (value)
                  return (
                    <div
                      key={index}
                      style={{
                        marginBottom: "1.2em",
                      }}
                    >
                      <div className="pb-5 sidebar_det_title">{key}</div>
                      <div className="sidebar_det_info">{value}</div>
                    </div>
                  );
              })}
            </div>
            <div className="main_details_wrapper">
              <MyContext.Provider value={contextValue}>
                <TabsDemo />
              </MyContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { MyContext };
export default Details;
