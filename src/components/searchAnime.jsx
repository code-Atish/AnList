import PropTypes from 'prop-types';
import { useQuery } from "@apollo/client";
import { getAnime } from "../utility/queries";
import Skeleton, { InfoCardSkeleton } from "./Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { CardStructure, ListStructure } from "./Trending";
import { FetchError, NoResults } from "./Error";
import "../assets/styles/App.css";

function DisplaySearch({ sortCriteria, filterOptions, version, TopAnime }) {
  const controller = new AbortController();
  const { signal } = controller;
  sortCriteria = sortCriteria || "POPULARITY_DESC";
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [name, format, year, season, genre, status, source] =
    filterOptions || Array(7).fill(undefined);
  const { loading, error, data, fetchMore } = useQuery(getAnime, {
    variables: {
      search: name,
      page: 1,
      perPage: 10,
      sort: sortCriteria,
      format_in: format,
      season: season,
      seasonYear: year,
      genre_in: genre,
      status: status,
      source: source,
    },
  });
  const fetchMoreData = () => {
    setPageNumber((prev) => prev + 1);
    fetchMore({
      variables: {
        page: pageNumber,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.Page.media.length === 0) {
          setHasMore(false);
          return prev;
        }
        return {
          Page: {
            ...prev.Page,
            media: [...prev.Page.media, ...fetchMoreResult.Page.media],
          },
        };
      },
      context: {
        // Attach the signal to the context
        fetchOptions: {
          signal,
        },
      },
    });
  };

  if (loading)
    return version ? <InfoCardSkeleton length={4} offset={0}/> : <Skeleton length={6} />;
  if (error) return <FetchError msg={error.message} />;

  const animeList = data?.Page.media || [];
  if (animeList.length == 0) return <NoResults />;
  return (
    animeList.length > 0 && (
      <InfiniteScroll
        dataLength={animeList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<></>}
        endMessage={
          <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
        }
      >
        {" "}
        {version && (
          <CardStructure
            hasMore={hasMore}
            animeList={animeList}
            TopAnime={TopAnime}
          />
        )}
        {!version && (
          <ListStructure
            animeList={animeList}
            hasMore={hasMore}
            searchComponent={true}
            TopAnime={TopAnime}
          />
        )}
      </InfiniteScroll>
    )
  );
}


DisplaySearch.propTypes = {
  filterOptions: PropTypes.array,
  sortCriteria: PropTypes.string,
  TopAnime: PropTypes.bool,
  version: PropTypes.bool
};

export default DisplaySearch;
