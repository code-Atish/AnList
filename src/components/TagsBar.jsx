import React, { useRef, useState } from "react";
import {
  modifySeason,
  modifySource,
  modifyStatus,
  modifyYear,
} from "../store/singleInput-slice";
import { useDispatch, useSelector } from "react-redux";
import { TitleCase } from "../utility/utilityFunctions";
import { modifyFormat, modifyGenre, modifyName } from "../store/manyInput-slice";
import {
  modifySortText,
  modifySortValue,
  modifySortVisibility,
} from "../store/sort-slice";
import DisplaySearch from "./searchAnime";
import { GridIcon } from "@radix-ui/react-icons";




const optionsObject = {
  POPULARITY_DESC: "Popularity",
  TRENDING_DESC: "Trending",
  SCORE_DESC: "Average Score",
  FAVOURITES_DESC: "Favorites",
  EPISODES_DESC: "Episode",
  SEARCH_MATCH: "Search Match",
  START_DATE_DESC: "Latest Release",
};
const seasonList = ["WINTER", "SPRING", "SUMMER", "FALL"];
const sourceList = [
  "ORIGINAL",
  "MANGA",
  "LIGHT_NOVEL",
  "VISUAL_NOVEL",
  "VIDEO_GAME",
  "NOVEL",
  "DOUJINSHI",
  "ANIME",
  "WEB_NOVEL",
  "LIVE_ACTION",
  "GAME",
  "COMIC",
  "MULTIMEDIA_PROJECT",
  "PICTURE_BOOK",
  "OTHER",
];
const statusList = ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED"];

const TagsBar = ({filterOptions}) => {
  const dispatch = useDispatch();
  const domElementRef = useRef();
  const sortText = useSelector((state) => state.sortCriteria.sortText);
  const sortValue = useSelector((state) => state.sortCriteria.sortValue);
  const format = useSelector((state) => state.manyInput.format);
  const genre = useSelector((state) => state.manyInput.genre);
  const isVisible = useSelector((state) => state.sortCriteria.isVisible);

  const [version, setVersion] = useState(false);
  const trimOptions = filterOptions.filter(
    (ele) => ele !== undefined && !Array.isArray(ele)
  );
  const clearVisibility =
    trimOptions.length + format.length + genre.length >= 2;


  const setGenre = (value) => {
    dispatch(modifyGenre(value));
  };
  const setName = (value) => {
    dispatch(modifyName(value));
  };
  const setFormat = (value) => {
    dispatch(modifyFormat(value));
  };
  const setSortValue = (value) => {
    dispatch(modifySortValue(value));
  };
  const setSortText = (value) => {
    dispatch(modifySortText(value));
  };
  const setIsVisible = (value) => {
    dispatch(modifySortVisibility(value));
  };
  const handleSelect = (e) => {
    setSortValue(e.target.value);
    setSortText(e.target.innerText);
    setIsVisible(!isVisible);
  };
  const handleOutsideClick = (event) => {
    if (
      domElementRef.current &&
      !domElementRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <div className="search-header">
        <div
          className="applied-filters-wrapper"
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              color: "#8ba2b5",
              fontSize: "1.2rem",
            }}
          >
            <i className="fa-solid fa-tags"></i>
          </div>
          <div>
            {trimOptions.map((ele, index) => {
              if (Number.isInteger(ele)) {
                return (
                  <AppliedFilters
                    ele={ele}
                    key={index}
                    removeFunc={() => dispatch(modifyYear(undefined))}
                  />
                );
              } else if (seasonList.includes(ele)) {
                return (
                  <AppliedFilters
                    ele={ele}
                    key={index}
                    removeFunc={() => dispatch(modifySeason(undefined))}
                  />
                );
              } else if (statusList.includes(ele)) {
                return (
                  <AppliedFilters
                    ele={ele}
                    key={index}
                    removeFunc={() => dispatch(modifyStatus(undefined))}
                  />
                );
              } else if (sourceList.includes(ele)) {
                return (
                  <AppliedFilters
                    ele={ele}
                    key={index}
                    removeFunc={() => dispatch(modifySource(undefined))}
                  />
                );
              } else {
                return (
                  <AppliedFilters
                    ele={ele}
                    key={index}
                    removeFunc={() => setName("")}
                  />
                );
              }
            })}
            <AppliedArrayFilters inputArray={format} setInput={setFormat} />
            <AppliedArrayFilters inputArray={genre} setInput={setGenre} />

            <div
              className="applied-filters clearall-btn"
              style={{
                backgroundColor: "#a1b9bf",
                display: clearVisibility ? "inline-block" : "none",
                transition: "linear 250ms all",
              }}
              onClick={() => {
                setName("");
                setFormat([]),
                  setGenre([]),
                  dispatch(modifySource(undefined)),
                  dispatch(modifyYear(undefined)),
                  dispatch(modifyStatus(undefined)),
                  dispatch(modifySeason(undefined));
              }}
            >
              <span>Clear all</span>
              <div className="remove-filters">
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="sort-by-wrapper">
          <div className="svg-wrapper">
            <GridIcon
              className={version ? "active" : ""}
              onClick={() => setVersion((prev) => !prev)}
            />
          </div>
          <div className="sort-by-trend">
            <div
              name=""
              className="sort-by"
              onClick={() => setIsVisible(!isVisible)}
              ref={domElementRef}
            >            
            <i className="fa-solid fa-sort"></i>
              {sortText}
            </div>
            {isVisible && (
              <div className="options tooltip"
                style={{display : isVisible ? 'block' : 'none'  }}
              >
                {Object.entries(optionsObject).map(([value, label]) => (
                  <option key={value} value={value} onClick={handleSelect}>
                    {label}
                  </option>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DisplaySearch
        filterOptions={filterOptions}
        sortCriteria={sortValue}
        version={version}
      />
    </>
  );
};

function AppliedFilters({ ele, removeFunc }) {
  return (
    <div
      className="applied-filters"
      // key={key}
      onClick={removeFunc}
    >
      <span>{TitleCase(ele.toString())}</span>
      <div className="remove-filters">
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
}

function AppliedArrayFilters({ inputArray, setInput }) {
  const removeFilter = (e, toFilter, method) => {
    method(toFilter.filter((item) => item !== e.target.dataset.value));
  };
  return (
    Boolean(inputArray.length) &&
    inputArray.map((ele, index) => (
      <div
        className="applied-filters"
        key={index}
        data-value={ele}
        onClick={(e) => removeFilter(e, inputArray, setInput)}
      >
        <span>{TitleCase(ele)}</span>
        <div className="remove-filters">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    ))
  );
}
export default TagsBar;
