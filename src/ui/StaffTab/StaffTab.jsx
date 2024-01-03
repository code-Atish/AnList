import React, { useContext } from "react";
import { ImageComponent, Loader } from "../CharactersTab/CharactersTab";
import { TitleCase } from "../../converTime";
import { PropagateLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import { MyContext } from "../../Details";

//Reused CharacterTabs Component Hence some CSS classes might be reused Here.:)
const StaffTab = () => {
  const { data, fetchMore } = useContext(MyContext);
  const staff = data.staff;
  const fetchMoreStaffData = () => {
    // setCharPageNumber(charPageNumber+1);
    fetchMore({
      variables: {
        staffPage: staff.pageInfo.currentPage + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const { media } = fetchMoreResult.Page;
        return {
          Page: {
            ...prev.Page,
            media: [
              {
                ...prev.Page.media[0],
                staff: {
                  ...prev.Page.media[0].staff,
                  pageInfo: media[0].staff.pageInfo,
                  edges: [
                    ...prev.Page.media[0].staff.edges,
                    ...media[0].staff.edges,
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
    <InfiniteScroll
      dataLength={staff.edges.length}
      next={fetchMoreStaffData}
      hasMore={staff.pageInfo.hasNextPage}
      loader={<Loader />}
      endMessage={null}
    >
      <div className="staff_list">
        {staff.edges.map(({ role, node }, index) => (
          <div className="staff_content_wrapper" key={index}>
            <ImageComponent src={node.image.large} alt={"Staff Image"} />
            <div className="character_det_wrapper flex">
              <div className="char_act_name">{node.name.full}</div>
              <div className="role_language line_clamp">{TitleCase(role)}</div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default StaffTab;
