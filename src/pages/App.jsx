import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DialogComponent from "../ui/Dialog";
import Home from "../components/Home";
import TagsBar from "../components/TagsBar";
import { useDispatch, useSelector } from "react-redux";
import { modifySortText, modifySortValue } from "../store/sort-slice";
import {
  FormatInput,
  GenreInput,
  NamedInput,
  SeasonInput,
  YearInput,
} from "../components/InputComponent/InputComponent";
import "../assets/styles/App.css";

function App() {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.singleInput.year);
  const season = useSelector((state) => state.singleInput.season);
  const source = useSelector((state) => state.singleInput.source);
  const status = useSelector((state) => state.singleInput.status);
  const genre = useSelector((state) => state.manyInput.genre);
  const name = useSelector((state) => state.manyInput.name);

  const sortValue = useSelector((state) => state.sortCriteria.sortValue);
  const setSortValue = (value) => {
    dispatch(modifySortValue(value));
  };
  const setSortText = (value) => {
    dispatch(modifySortText(value));
  };
  const format = useSelector((state) => state.manyInput.format);

  const filterOptions = [name, format, year, season, genre, status, source].map(
    (ele) => {
      if (ele == "" || ele == []) return undefined;
      else return ele;
    }
  );
  useEffect(() => {
    if (!filterOptions.some((ele) => ele != undefined)) {
      setSortValue(undefined);
      setSortText("Popularity");
    }
  }, [name, format, year, season, genre, status, source]);

  return (
    <div className="max-width">
      <div className="trending">
        <div className="input-section">
          <section className="visible_input_section">
            <NamedInput />
            <FormatInput />
            <YearInput />
            <SeasonInput />
            <GenreInput />
            <DialogComponent />
          </section>
        </div>
        <div>
          <Outlet />
        </div>
        {!(filterOptions.some((ele) => ele !== undefined) || sortValue) && (
          <>
            <Home />
          </>
        )}
        {(filterOptions.some((ele) => ele !== undefined) || sortValue) && (
          <TagsBar filterOptions={filterOptions} />
        )}
      </div>
    </div>
  );
}

export default App;
