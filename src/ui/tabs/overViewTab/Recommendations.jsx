import React, { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { MyContext } from "../../../pages/Details";
import { Loader } from "../CharactersTab/CharactersTab";

function Recommendations() {
  const { data, fetchMore } = useContext(MyContext);
  const recommendations = data.recommendations;
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(false);

  const handleViewAll = (e) => {
    setHasMore(true);
    e.target.style.display = "none";
    // if (window.targetComponentRef) {
    //   // Use scrollIntoView to scroll to the target component
    //   window.targetComponentRef.scrollIntoView({ behavior: 'smooth' });
    // }
  };
  const fetchMoreData = () => {
    setPageNumber(pageNumber + 1);
    fetchMore({
      variables: {
        page: pageNumber,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.Page ||
          !fetchMoreResult.Page.media[0]
        ) {
          // Handle the case when fetchMoreResult is null or doesn't have the expected structure
          setHasMore(false);
          return prev;
        }

        const { media } = fetchMoreResult.Page;
        if (
          !media[0].recommendations ||
          media[0].recommendations.nodes.length === 0
        ) {
          // Handle the case when recommendations array is empty
          setHasMore(false);
          return prev;
        }
        // Update the recommendations array
        return {
          Page: {
            ...prev.Page,
            media: [
              {
                ...prev.Page.media[0],
                recommendations: {
                  ...prev.Page.media[0].recommendations,
                  pageInfo: media[0].recommendations.pageInfo,
                  nodes: [
                    ...new Set([
                      ...prev.Page.media[0].recommendations.nodes,
                      ...media[0].recommendations.nodes,
                    ]),
                  ],
                },
              },
            ],
          },
        };
      },
    });
  };

  return (
    !!recommendations.nodes.length && (
      <div className="overview_elements">
        <div className="recomend_header">
          <div className="pb-5 mb-1em sidebar_det_title">Recommendations</div>
        </div>
        <InfiniteScroll
          dataLength={recommendations.nodes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <></>
            // <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
          }
        >
          <div className="Recommendations_wrapper">
            {recommendations.nodes.map(
              ({ mediaRecommendation: item }, index) => (
                <Link
                  style={{ display: item?.id ? "flex" : "none" }}
                  to={`/details/${item?.id}`}
                  key={index}
                >
                  <div className="recomend_cont_wrapper">
                    <div
                      className="recomend_image_wrapper"
                      style={{ backgroundColor: item?.coverImage.color }}
                    >
                      <img
                        className="recomend_image"
                        onLoad={(e) => (e.target.style.opacity = 1)}
                        src={item?.coverImage.extraLarge}
                        alt="Anime PV"
                      />
                    </div>
                    <div className="recomend_title line_clamp">
                      {item?.title.english || item?.title.romaji}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

          {recommendations.nodes.length > 9 && (
            <div className="view_more" onClick={handleViewAll}>
              <i className="fa-solid fa-angle-down"></i>
            </div>
          )}
        </InfiniteScroll>
      </div>
    )
  );
}

export default Recommendations;
