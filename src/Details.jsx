import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getDetails } from './queries/queries';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TitleCase, isEmpty, nextEpCounter, truncateSentence } from './converTime';
import * as Tabs from '@radix-ui/react-tabs';
import './details.css';
import TabsDemo from './ui/TabsDemo';
function Details() {
    const {id}=useParams();
    const [pageNumber,setPageNumber]=useState(2);
    const [charPageNumber,setCharPageNumber]=useState(2);
    const [hasMore,setHasMore]=useState(false);
    

    // Function to update language without causing re-render
    const { loading, error, data, fetchMore} = useQuery(getDetails,{
        variables : {
            id:id,
            page:1,
            perPage:10,
            language:"JAPANESE",
            charPage:1,
            charPerPage:15,
            staffPage:1,
            staffPerPage:15
        }
      });

      const fetchMoreData = () => {
        setPageNumber(prev=> prev + 1);
        setCharPageNumber(charPageNumber+1)
        fetchMore({
          variables: {
            page:pageNumber,
            perPage: 10,
            // charPage:charPageNumber,
            // charPerPage:15
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || !fetchMoreResult.Page || !fetchMoreResult.Page.media[0]) {
              // Handle the case when fetchMoreResult is null or doesn't have the expected structure
              setHasMore(false);
              return prev;
            }
          
            const { media } = fetchMoreResult.Page;
            if (!media[0].recommendations || media[0].recommendations.nodes.length === 0) {
              // Handle the case when recommendations array is empty
              setHasMore(false);
              return prev;
            }
            // Update the recommendations array
            return {
              Page: {
                ...prev.Page,
                media: [
                  {
                    ...prev.Page.media[0],
                    recommendations: {
                      ...prev.Page.media[0].recommendations,
                            pageInfo:media[0].recommendations.pageInfo,
                            nodes: [...new Set([...prev.Page.media[0].recommendations.nodes, ...media[0].recommendations.nodes])],
                    },
                  },
                ],
              },
            };
          },
        });
      };
      const fetchMoreCharacterData = () => {
        // setCharPageNumber(charPageNumber+1);
        fetchMore({
          variables: {
            charPage:Data.characters.pageInfo.currentPage+1,
            charPerPage:15
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            // if (!fetchMoreResult || !fetchMoreResult.Page || !fetchMoreResult.Page.media[0]) {
            //   // Handle the case when fetchMoreResult is null or doesn't have the expected structure
            //   setHasMore(false);
            //   return prev;
            // }
          
            const { media } = fetchMoreResult.Page;
            // if (!media[0].recommendations || media[0].recommendations.nodes.length === 0) {
            //   // Handle the case when recommendations array is empty
            //   setHasMore(false);
            //   return prev;
            // }
            // Update the recommendations array
            return {
              Page: {
                ...prev.Page,
                media: [
                  {
                    ...prev.Page.media[0],
                    characters: {
                      ...prev.Page.media[0].characters,
                            pageInfo:media[0].characters.pageInfo,
                            edges:[...prev.Page.media[0].characters.edges, ...media[0].characters.edges],
                    },
                  },
                ],
              },
            };
          },
        });
      };
      const fetchMoreStaffData = () => {
        // setCharPageNumber(charPageNumber+1);
        fetchMore({
          variables: {
            staffPage:Data.staff.pageInfo.currentPage+1,
            staffPerPage:15
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            // if (!fetchMoreResult || !fetchMoreResult.Page || !fetchMoreResult.Page.media[0]) {
            //   // Handle the case when fetchMoreResult is null or doesn't have the expected structure
            //   setHasMore(false);
            //   return prev;
            // }
          
            const { media } = fetchMoreResult.Page;
            // if (!media[0].recommendations || media[0].recommendations.nodes.length === 0) {
            //   // Handle the case when recommendations array is empty
            //   setHasMore(false);
            //   return prev;
            // }
            // Update the recommendations array
            return {
              Page: {
                ...prev.Page,
                media: [
                  {
                    ...prev.Page.media[0],
                    staff: {
                      ...prev.Page.media[0].staff,
                            pageInfo:media[0].staff.pageInfo,
                            edges:[...prev.Page.media[0].staff.edges, ...media[0].staff.edges],
                    },
                  },
                ],
              },
            };
          },
        });
      };
      
    if (loading) return <>Loading...</>;
    if (error) return <p>Error : {error.message}</p>;
    const Data = data.Page.media[0];
    const Recommendations=Data.recommendations;
    const filteredRakings=Array.from(Data.rankings).slice(0,2);
    console.log(Data)

    const shortMonthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sidebarDetails={
        Format: Data.format,
        Episodes: Data.episode,
        "Episode Duration": Data.duration,
        Status: TitleCase(Data.status),
        "Start Date": `${shortMonthNames[Data.startDate.month]} ${Data.startDate.day}, ${Data.startDate.year}` ,
        Season: `${TitleCase(Data.season)} ${Data.seasonYear}`,
        "Average Score": Data.averageScore ? `${Data.averageScore}%` : null,
        "Mean Score":  Data.meanScore ? `${Data.meanScore}%` : null,
        Popularity:Data.popularity,
        Favorites: Data.favourites,
        Studios: Data.studios.edges.filter(({isMain})=>isMain).map(({node})=>node.name).join('\n'),
        Producers:Data.studios.edges.filter(({isMain})=>!isMain).map(({node})=>node.name).join('\n'),
        Source:Data.source,
        // Hashtag: "#呪術廻戦 #呪術2期".join('\n'),
        Genres: Data.genres.join('\n'),
        Romaji: Data.title.romaji,
        English: Data.title.english,
        Native: Data.title.native,
    }
        
    const props={Data,fetchMoreData,hasMore,setHasMore,fetchMoreCharacterData,fetchMoreStaffData};

    return (
        <div>
            <div className="banner" style={{ background:Data.coverImage.color, }}>
                <img 
                    style={{
                        display:Data.bannerImage ? 'block' :'none',    
                    }}
                    className='banner-image'
                    onLoad={(e)=>e.target.style.opacity=1} 
                    src={Data.bannerImage} alt="BannerImage" 
                />
                <div className='shadow'></div>
            </div>
            <div className='bg-white'>
              <div className="max_width">
                  <div className="margin">
                      <div className="hero__section">
                          <div className="hero__image__container"
                              // style={{
                              //     '--offsetY':Data.bannerImage?'-45%':'0%',  
                              // }} 
                          >
                              <div
                                  className="hero_image_content flex"
                              >
                                  <div 
                                      className='PV_wrapper' 
                                      style={{
                                          marginTop:Data.bannerImage? 'var(--offset-image)':'0%',  
                                      }} 
                                      // style={{backgroundColor:Data.coverImage.color}}
                                  >
                                      <img
                                          className='PV'
                                          onLoad={(e)=>e.target.style.opacity=1} 
                                          src={Data.coverImage.extraLarge} alt="Poster Visual" />
                                  </div>
                                  <div 
                                      className="rankings_wrapper flex"
                                      style={{
                                        marginTop:Data.bannerImage? 'var(--offset-rankings)':'0%',  
                                    }} 
                                  >
                                          {
                                              filteredRakings.map(item=>
                                                  <div className='rankings' key={item.id}>
                                                      { item.type=='RATED' &&   <i className="fa-solid fa-star" style={{color:'gold',marginRight:'7px'}}></i>}
                                                      { item.type=='POPULAR' &&   <i className="fa-solid fa-heart" style={{color:'red',marginRight:'7px'}}></i>}
                                                      <span className='context'>#{item.rank} {item.context} {item.year && <>{item.year}</>}</span>
                                                  </div>
                                              )
                                          }
                                              {/* <div className='rankings'>
                                                  <i class="fa-solid fa-star" style={{color:'gold',marginRight:'7px'}}></i>
                                                  #{filteredRakings[0].rank} {filteredRakings[0].context}
                                              </div>
                                              <div className='rankings'>
                                                  <i class="fa-solid fa-heart" style={{color:'red',marginRight:'7px'}}></i>
                                                  #{filteredRakings[1].rank} {filteredRakings[1].context}
                                              </div> */}
                                        
                                  </div>
                              </div>
                          </div>
                          <div className="hero__details">
                              <h1 className="title">{Data.title.english||Data.title.romaji}</h1>
                              <div className="synopsis" dangerouslySetInnerHTML={{ __html:Data.description}}></div>
                          </div>
                          { /* <div className="tabs"></div> */}
                      </div>
                  </div>
              </div>
            </div>
            <div className="max_width">
                <div className="margin">
                    <div className="details_section">
                        <div className="sidebar_details">
                            {Data.nextAiringEpisode && 
                                 <div className='Airing_det'>
                                    <div className='pb-5'>Airing</div>
                                    <div>{nextEpCounter(Data.nextAiringEpisode)}</div>
                                </div>
                            }
                            {
                                Object.entries(sidebarDetails).map(([key, value],index) => {
                                    if(value)
                                        return <div key={index} style={{
                                                    marginBottom:'1.2em',
                                                }}
                                                >
                                                    <div className='pb-5 sidebar_det_title'>{key}</div>
                                                    <div className='sidebar_det_info'>{value}</div>
                                                </div>
                                  })
                            }
                            
                        </div>
                        <div className="main_details_wrapper">
                            <TabsDemo recommendations={Recommendations} {...props}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
