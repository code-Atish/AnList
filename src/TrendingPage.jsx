import { GridIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import DisplaySearch from "./searchAnime";
import { useParams } from "react-router-dom";

const TrendingPage = () => {
    const [version,setVersion]=useState(false)
    const { page }= useParams()
    const sortCriteria = !Number(page) ? 'POPULARITY_DESC' : 'TRENDING_DESC';
    const title = !Number(page) ? 'ALL TIME POPULAR' : 'TRENDING';
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <>
        <div className="trending-page banner">
        <img
          className="banner-image"
        //   onLoad={(e) => (e.target.style.opacity = 0)}
          src={''}
          alt="BannerImage"
        />
        <div className="shadow"></div>
      </div>
        <div className="trending-page-wrapper">
            <div className="max-width">
                <div className="margin">
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
                    <DisplaySearch
                        sortCriteria={sortCriteria}
                        version={version}
                    />
                </div>
            </div>
        </div>
        
    </>
  );
};

export default TrendingPage;
