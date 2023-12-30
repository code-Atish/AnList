import React from 'react';
import { ImageComponent } from '../CharactersTab/CharactersTab';
import { TitleCase } from '../../converTime';
import { PropagateLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';

//Reused CharacterTabs Component Hence some CSS classes might be reused Here.:)
const StaffTab = ( { staff,fetchMoreStaffData }) => {
  return (
            <InfiniteScroll
                    dataLength={staff.edges.length}
                    next={fetchMoreStaffData}
                    hasMore={staff.pageInfo.hasNextPage}
                    loader={<PropagateLoader
                        color={'var(--black-a4)'}
                        loading={true}
                        cssOverride={{
                            display: "flex",
                            justifyContent:'center',
                            width:'100%',
                            height:20,
                            alignItems:'center',
                        }}
                        size={13}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        />}
                    endMessage={<></>
                        // <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
                    }
                >
                    <div className="staff_list">
                        {
                            staff.edges.map(({role,node},index)=>
                            <div className='staff_content_wrapper' key={index}>
                                    < ImageComponent
                                        src={node.image.large} alt={"Staff Image"} 
                                    />
                                    <div className='character_det_wrapper flex'>
                                        <div className="char_act_name">
                                            {node.name.full}
                                        </div>
                                        <div className="role_language line_clamp">
                                            {TitleCase(role)}
                                        </div>
                                    </div>
                            </div>
                            )
                        }
                    </div>
            </InfiniteScroll>
  )
}

export default StaffTab
