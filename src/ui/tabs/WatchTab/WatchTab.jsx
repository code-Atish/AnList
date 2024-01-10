import PropTypes from "prop-types";

const WatchTab = ({ data }) => {
  return (
    <div className="watch_list">
      {data.streamingEpisodes.map(({ title, thumbnail, url }, index) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
          key={index}
        >
          <div className="watch_content">
            <img
              onLoad={(e) => (e.target.style.opacity = 1)}
              src={thumbnail}
              alt="Episode thumbnail"
              className="watch_image"
            />
            <div className="watch_title">
              <div className="line_clamp">{title}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

WatchTab.propTypes = {
  data: PropTypes.object,
};

export default WatchTab;
