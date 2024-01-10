import "./landing.css";
const Landing = () => {
  const routeList = [
    "Trending",
    "Popular This sesason",
    "Popular Next Season",
    "All Time Popular",
  ];
  return (
    <div className="max-width">
      <div className="margin">
        <div className="landing__hero">
          <h2>Welcome to</h2>
          <h1>ANILIST</h1>{" "}
          <div className="routes_wrapper">
            {routeList.map((route,index) => (
              <div className="route_cont" key={index}>{route}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
