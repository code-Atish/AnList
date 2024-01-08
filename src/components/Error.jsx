import React from "react";
import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
const NoResults = () => {
  return (
    <div className="no-results">
      <h1>No results Found</h1>
    </div>
  );
};

const FetchError = ({ msg }) => {
  return (
    <div className="fetch-error">
     
        <img
          src="public\error.png"
          alt="Lost connection"
          className="no-internet-img"
        />
        <h1>{msg}</h1>
     
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div className="max-width">
      <div className="margin">
        <div className="error-page-wrapper">
          <div className="border-box">
            <div className="error-page-cont">
              <div className="error-message flex">
                <h1 className="status-code">
                  404
                </h1>
                <div className="error-msg-cont">
                  Sorry, We cannot find the page you requested.
                  <p>You are lost!!</p>
                </div>
                <button className="go__home-btn">
                  <Link to="/">Go to Home</Link>
                </button>
              </div>
              <div className="zoro-img-wrapper">
                  <img src="../../public/zoroImage.png" alt="Not found image" className="zoro-img"
                    onLoad={(e)=>e.target.style.opacity=1}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { NoResults, FetchError, ErrorPage };
