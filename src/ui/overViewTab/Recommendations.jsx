import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import { truncateSentence } from '../../converTime'

function Recommendations({ recommendations,fetchMoreData,hasMore,setHasMore }) {
    const handleViewAll=(e)=>{
        setHasMore(true);
        e.target.style.display='none';
        // if (window.targetComponentRef) {
        //   // Use scrollIntoView to scroll to the target component
        //   window.targetComponentRef.scrollIntoView({ behavior: 'smooth' });
        // }
    }
    return (
        !!recommendations.nodes.length &&
            <div className="overview_elements">
                <div className="recomend_header">
                    <div className='pb-5 mb-1em sidebar_det_title'>Recommendations</div>
                </div>
                <InfiniteScroll
                        dataLength={recommendations.nodes.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
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
                    <div className='Recommendations_wrapper'>
                        {
                        recommendations.nodes.map(({mediaRecommendation:item},index)=>
                            <Link
                                style={{ display: item?.id ? 'flex':'none',}}
                                to={`/details/${item?.id}`} 
                                key={index} 
                            >
                            <div className='recomend_cont_wrapper'>
                                <div
                                    className='recomend_image_wrapper' 
                                    style={{backgroundColor:item?.coverImage.color}}
                                >
                                    <img className="recomend_image"
                                    onLoad={(e)=>e.target.style.opacity=1} 
                                    src={item?.coverImage.extraLarge} alt="Anime PV" 
                                    />
                                </div>
                                    <div className='recomend_title line_clamp'>
                                        {item.title.english || item?.title.romaji}
                                    </div>
                            </div>
                            </Link>
                        )
                        }
                    </div>

                    { recommendations.nodes.length>9 &&
                        <div className="view_more" onClick={handleViewAll}>
                        <i className="fa-solid fa-angle-down" ></i>
                        </div>
                    }
                </InfiniteScroll>
            </div>
    )

}

export default Recommendations
