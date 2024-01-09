import { GridIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import DisplaySearch from "../components/searchAnime";
import { useParams } from "react-router-dom";

const TrendingPage = () => {
  const [version, setVersion] = useState(false);
  let { page } = useParams();
  page = Number(page);
  const sortCriteria = 
      page == 1 ? "POPULARITY_DESC" : 
      page == 0 ? "TRENDING_DESC"
      : "SCORE_DESC";
  const title = 
      page == 1? "ALL TIME POPULAR" : 
      page == 0 ? "TRENDING" 
      : 'TOP 100 ANIME';
  const TopAnime =( page == 2) ? true : false
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="trending-page banner">
        <img
          className="banner-image"
          //   onLoad={(e) => (e.target.style.opacity = 0)}
          src={""}
          alt="BannerImage"
        />
        <div className="shadow"></div>
      </div>
      <div className="trending-page-wrapper">
        <div className="max-width">
          <div className="margin card-margin">
            <div className="search-header">
              <h1>{title}</h1>
              <div className="sort-by-wrapper">
                <GridIcon
                  width={19}
                  height={19}
                  className={version ? "active" : ""}
                  onClick={() => setVersion((prev) => !prev)}
                />
              </div>
            </div>
            <DisplaySearch sortCriteria={sortCriteria} version={version} TopAnime={TopAnime} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingPage;
