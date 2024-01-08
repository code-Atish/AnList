import { useQuery } from "@apollo/client";
import Skeleton, { InfoCardSkeleton, SkeletonBody } from "./Skeleton";
import { TitleCase, calculateDuration, secondsToDhms, timeUntilAiring } from "../utility/utilityFunctions";
import { getAnime } from "../utility/queries";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifySortText, modifySortValue } from "../store/sort-slice";
import { FetchError, NoResults } from "./Error";

function findSequel(relations) {
  const sequelTo = relations.filter(
    ({ relationType }) => relationType === "PREQUEL"
  );
  return sequelTo.length > 0
    ? `Sequel to ${
        sequelTo[0].node.title.english || sequelTo[0].node.title.romaji
      }`
    : null;
}
function extractHashTitles(inputString) {
  // Regular expression to match hashtags
  // const regex = /#(\w+)/g;

  // // Extracting hash titles using match
  // const hashTitles = (inputString.match(regex) || []).map((title) =>
  //   title.slice(1)
  // );
  const hashTitles = inputString.split(" ").map((ele) => ele.replace("#", ""));

  // Returning the array of hash titles without '#'
  return hashTitles;
}

export function CardStructure({ animeList, hasMore,TopAnime }) {
  // console.log(animeList[0].nextAiringEpisode.episode)
  const sequeltTo = animeList;
  console.log(animeList);
  return (
    <>
      <div className="info-card-list">
        {animeList.map((data, index) => (
          <div
            key={index}
            // className="info-card"
            data-rank={`#${index+1}`}
            className={(TopAnime && index<100) ? "info-card anime-rank" : "info-card"}
            style={{ "--bg-hover-color": data.coverImage.color }}
          >
            <Link to={`/details/${data.id}`}>
              <div className="info-PV-wrapper"
                onMouseOver={()=>{
                  const ele=document.getElementsByClassName('banner-image')[0]
                  if(ele) {
                      ele.setAttribute('src',data.bannerImage || '')
                      ele.style.opacity=0.2;
                  }
                }}
                onMouseOut={()=>{
                  const ele=document.getElementsByClassName('banner-image')[0]
                  if(ele ) {
                      // ele.setAttribute('src',daa)
                      ele.style.opacity=0;
                  }
                }}
              >
                <img
                  src={data.coverImage.extraLarge}
                  alt=""
                  className="info-PV"
                  onLoad={(e) => (e.target.style.opacity = 1)}
                />
                <div className="title-studio">
                  <div className="anime-title">
                    {data.title.english || data.title.romaji}
                  </div>
                  <div className="studio-title">
                    {data.studios.nodes.map((studio) => studio.name).join(", ")}
                  </div>
                </div>
              </div>
            </Link>
            <div className="info-cont-wrapper">
              <div className="top-links">
                <div
                  className={
                    data.hashtag || data.externalLinks.length > 0
                      ? "top-links-left movable"
                      : "top-links-left"
                  }
                >
                  <div className="airing-status-det">
                    {data?.nextAiringEpisode?.episode &&
                      `Ep ${data?.nextAiringEpisode?.episode} airing in,`}
                  </div>
                  <div className="airing-at">
                    {(data.nextAiringEpisode &&
                      `${timeUntilAiring(data.nextAiringEpisode)}`) ||
                      (data.season && `${data.season} ${data.seasonYear}`) ||
                      data.startDate.year ||
                      "TBA"}
                  </div>
                  <div className="airing-status-det line_clamp">
                    {findSequel(data?.relations.edges) ||
                      (data.source && `Source - ${TitleCase(data.source)}`)}
                  </div>
                </div>
                <div
                  className="top-links-right"
                  style={{
                    display:
                      data.hashtag || data.externalLinks.length > 0
                        ? "initial"
                        : "none",
                  }}
                >
                  <div className="hash-tags">
                    {data.hashtag &&
                      extractHashTitles(data.hashtag).map((item, index) => (
                        <a
                          key={index}
                          href={`https://twitter.com/search?q=%23${item}`}
                        >
                          #{item}{" "}
                        </a>
                      ))}
                  </div>
                  <div className="external-links">
                    {data.externalLinks.map(
                      ({ icon, url, color, site, language, notes }, index) => (
                        <a href={url} key={index}>
                          <div
                            style={{ "--hover-color": color, padding: "2px" }}
                            className={
                              icon
                                ? "link_det_wrapper"
                                : "link_det_wrapper nolink"
                            }
                          >
                            {icon && (
                              <>
                                <div className="icon_wrapper">
                                  <img
                                    onLoad={(e) => (e.target.style.opacity = 1)}
                                    src={icon}
                                    alt="Site Icon"
                                    className="icon_image"
                                  />
                                </div>
                              </>
                            )}
                            {!icon && (
                              <div className="nolink_icon_wrapper">
                                <i className="fa-solid fa-link"></i>
                              </div>
                            )}
                            <div
                              className="link_name link_popover"
                              style={
                                data.hashtag
                                  ? { bottom: "120%" }
                                  : { left: "120%" }
                              }
                            >
                              {site}
                              {notes && (
                                <span className="notes">({notes})</span>
                              )}
                              {language && (
                                <span className="notes">
                                  {language.substr(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div
                className="middle-synopsis line_clamp"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
              <div className="bottom-genre">
                {data.genres.slice(0, 3).map((genre, index) => (
                  <span className="genre" key={index}>
                    {genre}{" "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <InfoCardSkeleton length={2} offset={animeList.length} />}
    </>
  );
}

function ListStructure({
  handleView,
  animeList,
  title,
  searchComponent,
  hasMore,
  TopAnime
}) {
  return (
    <>
      {title && (
        <div className="list-header">
          <h1>{title}</h1>
          <span onClick={handleView}>View All</span>
        </div>
      )}
      <div className="trending-list">
        {animeList.map((data, index) => (
          <div
            className={searchComponent ? "search-card-wrapper" : "card-wrapper"}
            style={{
              "--hover-color": data.coverImage.color,
            }}
            key={index}
            onMouseOver={()=>{
              const ele=document.getElementsByClassName('banner-image')[0]
              if(ele && searchComponent) {
                  ele.setAttribute('src',data.bannerImage || '')
                  ele.style.opacity=0.2;
              }
            }}
            onMouseOut={()=>{
              const ele=document.getElementsByClassName('banner-image')[0]
              if(ele && searchComponent) {
                  // ele.setAttribute('src',daa)
                  ele.style.opacity=0;
              }
            }}
          >
            <Link to={`/details/${data.id}`} style={{ textDecoration: "none" }}>
              <div
                data-rank={`#${index+1}`}
                className={(TopAnime && index<100) ? "card anime-rank" : "card"}
                style={{ backgroundColor: data.coverImage.color }}
              >
                <img
                  onLoad={(e) => (e.target.style.opacity = 1)}
                  src={data.coverImage["extraLarge"]}
                  alt="Anime PV"
                />
              </div>
              <div className="caption">
                <div className="info">
                  {data.title.english || data.title.romaji}
                </div>
                {/* <div className="studio"> </div> */}
              </div>
              <div className="tooltip clear-button">
                <div className="top-row">
                  <div className="next-ep">
                    {(data.nextAiringEpisode && secondsToDhms(data)) ||
                      (data.season && `${data.season} ${data.seasonYear}`) ||
                      data.startDate.year ||
                      "TBA"}{" "}
                  </div>
                  {data.meanScore && (
                    <div className="rating"><i className="fa-regular fa-face-smile"></i>&nbsp;{data.meanScore}%</div>
                  )}
                </div>
                <div className="middle-row">
                  <div
                    className="studio-name"
                    style={{ color: data.coverImage.color }}
                  >
                    {data.studios.nodes.map((studio) => studio.name).join(", ")}
                  </div>
                  <div className="season-info">
                    <span>{data.format} </span>
                    {data.episodes && (
                      <>
                        <span style={{ padding: "0 2px" }}>|</span>
                        <span>{(data.format=='MOVIE' && data.duration) ? calculateDuration(Number(data.duration)) : `${data.episodes} Episodes`}</span>
                      </>
                    )}
                  </div>
                  <div className="bottom-row">
                    {data.genres.slice(0, 3).map((genre, index) => (
                      <span className="genre" key={index}>
                        {genre}{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {hasMore &&
          searchComponent &&
          // <SkeletonBody length={5} />
          Array(5)
            .fill(1)
            .map((data, index) => (
              <div
                className="search-card-wrapper loading-wrapper"
                key={animeList.length + index}
              >
                <div className="card"></div>
                <div className="caption">
                  <div className="info"></div>
                  <div className="studio"></div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

function MakeRequest(variables, query) {
  const DefaultVariables = {
    search: undefined,
    page: undefined,
    perPage: undefined,
    sort: undefined,
    format_in: undefined,
    season: undefined,
    seasonYear: undefined,
    genre_in: undefined,
    status: undefined,
    source: undefined,
  };
  return useQuery(query, {
    variables: { ...DefaultVariables, ...variables },
  });
}
export default function DisplayTrending({ sortCriteria, title }) {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const pageNumber = useSelector((state) => state.page.page);
  const [sortValue, sortText] = sortCriteria;
  const redirectTo= (sortValue == 'TRENDING_DESC') ?  0  : 1
  const handleView = () => {
    // dispatch(modifySortValue(sortValue));
    // dispatch(modifySortText(sortText));
    navigate(`/trending/${redirectTo}`)
  };
  const variables = { 
    type: "ANIME",
    page: pageNumber,
    perPage: 6,
    sort: sortValue,
  };
  const { loading, data, error } = MakeRequest(variables, getAnime);

  if (loading) return <Skeleton title={title} length={6} />;
  if (error) return <FetchError msg={error.message} />;
  const animeList = Array.from(data.Page.media);
  if (animeList.length == 0) return <NoResults />;
  return (
    <ListStructure
      animeList={animeList}
      handleView={handleView}
      title={title}
    />
  );
}

export { ListStructure, MakeRequest };
