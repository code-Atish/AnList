import  { useContext } from "react";
import { Link } from "react-router-dom";
import { TitleCase } from "../../../utility/utilityFunctions";
import { MyContext } from "../../../pages/Details";

const Relations = () => {
  const { data } = useContext(MyContext);
  const relations = data.relations;
  return (
    <div className="overview_elements">
      <div className="pb-5 mb-1em sidebar_det_title">Relations</div>
      <div className="relations_wrapper">
        {relations.edges.map((item, index) => (
          <Link to={`/details/${item.node.id}`} key={index}>
            <div className="relation_content_wrapper">
              <div style={{ backgroundColor: item.node.coverImage.color }}>
                <img
                  className="relation_image"
                  onLoad={(e) => (e.target.style.opacity = 1)}
                  src={item.node.coverImage.extraLarge}
                  alt="Anime PV"
                />
              </div>
              <div className="relation_det_wrapper">
                <div>
                  <div className="relation_type">
                    {TitleCase(item.relationType)}
                  </div>
                  <div
                    className="relation_name line_clamp"
                    style={{ "--name-hover": item.node.coverImage.color }}
                  >
                    {TitleCase(item.node.title.english) ||
                      TitleCase(item.node.title.romaji)}
                  </div>
                </div>
                <div className="Text">
                  {TitleCase(item.node.format)} | {TitleCase(item.node.status)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Relations;
