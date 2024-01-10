import React from "react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { TitleCase } from "../../utility/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  modifySeason,
  modifySource,
  modifySourceVisibility,
  modifyStatus,
  modifyStatusVisibility,
  modifyYear,
} from "../../store/singleInput-slice";
import {
  modifyFormat,
  modifyGenre,
  modifyName,
  modifySearchFormat,
  modifySearchGenre,
} from "../../store/manyInput-slice";



const genreList = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const formatList = [
  { value: "TV", name: "TV Show" },
  { value: "TV_SHORT", name: "TV Short" },
  { value: "MOVIE", name: "Movie" },
  { value: "OVA", name: "OVA" },
  { value: "ONA", name: "ONA" },
  { value: "SPECIAL", name: "Special" },
  { value: "MUSIC", name: "Music" },
];

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

function NamedInput() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.manyInput.name);
  const handleSearch = (e) => {
    dispatch(modifyName(e.target.value));
  };
  return (
    <div className="search_input_wrapper">
      <input
        type="text"
        value={name}
        id="name"
        placeholder="Search"
        onChange={handleSearch}
      ></input>
      <div className="search_icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

function ManyInputComp({ props }) {
  const [Input, isInputVisible, setSearchInput, className] = props;
  return (
    <>
      {!Input.length && !isInputVisible && (
        <span className="ip-placeholder">{className}</span>
      )}
      {Input.length > 0 && !isInputVisible && (
        <span className="active-filters">{TitleCase(Input[0])}</span>
      )}
      {Input.length > 1 && !isInputVisible && (
        <span className="active-filters">+{Input.length - 1}</span>
      )}
      {!isInputVisible && (
        <div
          style={{
            pointerEvents: "none",
          }}
          className="angle-down"
        >
          <i className="fa-solid fa-angle-down"></i>
        </div>
      )}
      {isInputVisible && (
        <>
          <div className="angle-down">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <input
            type="text"
            name=""
            id=""
            autoFocus
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </>
      )}{" "}
    </>
  );
}

// Prop Types
ManyInputComp.propTypes = {
  props: PropTypes.array,
};

function GenreInput() {
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.manyInput.genre);
  const setGenre = (value) => {
    dispatch(modifyGenre(value));
  };
  const [isGenreVisible, setGenreVisible] = useState(false);
  const searchGenre = useSelector((state) => state.manyInput.searchGenre);
  const setSearchGenre = (value) => {
    dispatch(modifySearchGenre(value));
  };
  const domElementRef = useRef();
  const handleGenreVisible = () => {
    setGenreVisible((prev) => !prev);
    setSearchGenre("");
  };
  const handleGenreClick = (e) => {
    const newGenre = e.target.dataset.value;
    if (genre.includes(newGenre)) {
      let newArr = genre.filter((item) => item != newGenre);
      setGenre(newArr);
    } else setGenre([...genre, newGenre]);
    setGenreVisible((prev) => !prev);
  };
  const handleOutsideGenreClick = (event) => {
    if (
      domElementRef.current &&
      !domElementRef.current.contains(event.target)
    ) {
      setGenreVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleOutsideGenreClick);

    return () => {
      window.removeEventListener("click", handleOutsideGenreClick);
    };
  }, []);
  return (
    <div
      className={`Genre-input`}
      onClick={handleGenreVisible}
      ref={domElementRef}
    >
      <ManyInputComp props={[genre, isGenreVisible, setSearchGenre, "Genre"]} />
      {
        <div
          className="options tooltip"
          style={{
            display: isGenreVisible ? "block" : "none",
          }}
        >
          {genreList
            .filter((genre) => {
              return genre.toLowerCase().includes(searchGenre.toLowerCase());
            })
            .map((item, index) => (
              <div key={index} className="label-wrapper">
                <input
                  type="checkbox"
                  style={{ appearance: "none" }}
                  name="item"
                  id={item}
                  value={item}
                  checked={genre.includes(item) ? true : false}
                  readOnly
                />
                <label
                  className="label"
                  htmlFor={item}
                  data-value={item}
                  onClick={handleGenreClick}
                >
                  {item}
                </label>
              </div>
            ))}
        </div>
      }
    </div>
  );
}

function FormatInput() {
  const dispatch = useDispatch();
  const format = useSelector((state) => state.manyInput.format);
  const setFormat = (value) => {
    dispatch(modifyFormat(value));
  };
  const [isFormatVisible, setFormatVisible] = useState(false);
  const searchFormat = useSelector((state) => state.manyInput.searchFormat);
  const setSearchFormat = (value) => {
    dispatch(modifySearchFormat(value));
  };
  const domElementRef = useRef();

  const handleFormatSelect = (e) => {
    const newFormat = e.target.dataset.value;
    if (format.includes(newFormat)) {
      let newArr = format.filter((item) => item != newFormat);
      setFormat(newArr);
    } else setFormat([...format, newFormat]);
    setFormatVisible((prev) => !prev);
  };
  const handleFormatVisible = () => {
    setFormatVisible((prev) => !prev);
    setSearchFormat("");
  };
  const handleOutsideClick = (event) => {
    if (
      domElementRef.current &&
      !domElementRef.current.contains(event.target)
    ) {
      setFormatVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`Format-input`}
      onClick={handleFormatVisible}
      ref={domElementRef}
    >
      <ManyInputComp
        props={[format, isFormatVisible, setSearchFormat, "Format"]}
      />
      {
        <div
          className="options tooltip"
          style={{
            display: isFormatVisible ? "block" : "none",
          }}
        >
          {formatList
            .filter(({ name }) => {
              return name.toLowerCase().includes(searchFormat.toLowerCase());
            })
            .map(({ value, name }, index) => (
              <div key={index} className="label-wrapper">
                <input
                  type="checkbox"
                  name="format"
                  id={value}
                  value={value}
                  checked={format.includes(value) ? true : false}
                  readOnly
                />
                <label
                  className="label"
                  htmlFor={value}
                  data-value={value}
                  onClick={handleFormatSelect}
                >
                  {name}
                </label>
              </div>
            ))}
        </div>
      }
    </div>
  );
}

function SingleInputComp({ props, className }) {
  const [Input, setInputVisible, isInputVisible, inputList, setInput] = props;
  const YearSeasonRef = useRef();
  const handleOutsideClick = (event) => {
    if (
      YearSeasonRef.current &&
      !YearSeasonRef.current.contains(event.target)
    ) {
      setInputVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <div
      className={`${className}-input`}
      onClick={() => setInputVisible(!isInputVisible)}
      ref={YearSeasonRef}
    >
      {!Input && <span className="ip-placeholder">{className}</span>}
      {Input && (
        <span className="active-filters">
          {TitleCase(Input.toString().replace(/_/g, " "))}
        </span>
      )}
      {!isInputVisible && (
        <div
          style={{
            pointerEvents: "none",
          }}
          className="angle-down"
        >
          <i className="fa-solid fa-angle-down"></i>
        </div>
      )}
      {isInputVisible && (
        <div className="angle-down">
          <i className="fa-solid fa-xmark"></i>
        </div>
      )}
      <div
        className="options tooltip"
        style={{
          display: isInputVisible ? "block" : "none",
        }}
      >
        {inputList.map((item, index) => (
          <div key={index} className="label-wrapper">
            <label
              className={Input === item ? "label active-option" : "label"}
              onClick={() => {
                setInput(item);
              }}
            >
              {TitleCase(item.toString().replace(/_/g, " "))}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

//Prop Types
SingleInputComp.propTypes = {
  props: PropTypes.array,
  className: PropTypes.string,
};

function YearInput() {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.singleInput.year);
  const setYear = (year) => {
    dispatch(modifyYear(year));
  };
  const [isYearVisible, setYearVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    { length: currentYear - 1940 + 1 },
    (_, index) => currentYear - index
  );
  const props = [year, setYearVisible, isYearVisible, yearList, setYear];
  return <SingleInputComp props={props} className={"Year"} />;
}

function SeasonInput() {
  const dispatch = useDispatch();
  const season = useSelector((state) => state.singleInput.season);
  const setSeason = (season) => {
    dispatch(modifySeason(season));
  };
  const [isSeasonVisible, setSeasonVisible] = useState(false);
  const props = [
    season,
    setSeasonVisible,
    isSeasonVisible,
    seasonList,
    setSeason,
  ];

  return <SingleInputComp className={"Season"} props={props} />;
}

function SourceInput() {
  const dispatch = useDispatch();
  const source = useSelector((state) => state.singleInput.source);
  const setSource = (source) => {
    dispatch(modifySource(source));
  };
  const isSourceVisible = useSelector(
    (state) => state.singleInput.isSourceVisible
  );
  const setSourceVisible = (value) => {
    dispatch(modifySourceVisibility(value));
  };
  const props = [
    source,
    setSourceVisible,
    isSourceVisible,
    sourceList,
    setSource,
  ];

  return <SingleInputComp className={"Source"} props={props} />;
}

function StatusInput() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.singleInput.status);
  const setStatus = (status) => {
    dispatch(modifyStatus(status));
  };
  const isStatusVisible = useSelector(
    (state) => state.singleInput.isStatusVisible
  );
  const setStatusVisible = (value) => {
    dispatch(modifyStatusVisibility(value));
  };
  const props = [
    status,
    setStatusVisible,
    isStatusVisible,
    statusList,
    setStatus,
  ];
  return <SingleInputComp className={"Status"} props={props} />;
}

export {
  NamedInput,
  FormatInput,
  GenreInput,
  YearInput,
  SeasonInput,
  SourceInput,
  StatusInput,
};
