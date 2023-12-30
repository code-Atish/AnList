import React from 'react';
import { useQuery } from '@apollo/client';
import { getAnime } from './queries/queries';
import Skeleton from './Skeleton';
import {secondsToDhms,truncateSentence} from './converTime';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import './skeleton.css'

function isElementOutsideViewport(index) {
      const el=document.getElementsByClassName('tooltip')[index]
      console.log({el})
      const rect = el?.getBoundingClientRect();
      if(rect) return (
        rect.top < 0 ||
        rect.left < 0 ||
        rect.right > window.innerWidth ||
        rect.bottom > window.innerHeight
      );
      return false;
}


const RenderElements = ({ array }) => {
      const chunkSize = 5;
    
      const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          const AnimeList = array.slice(i, i + chunkSize);
          divs.push(
            <DisplaySearchData animeList={AnimeList}/>
          );
        }
        return divs;
      };
    
      return <>
            {renderDivs().map((divs,index)=><div className='trending-list' key={index}>{divs}</div>)}
            </>
};

const DisplaySearchData = ({animeList,hasMore}) => {
      
  return (
             <>   <div className='trending-list'>
                              {  animeList.map((data,index) => (
                              <div className="search-card-wrapper" key={index}>
                                    <Link to={`/details/${data.id}`} style={{ textDecoration: 'none',}}>
                                          <div className="card" style={{backgroundColor:data.coverImage.color}}>
                                                <img 
                                                      onLoad={(e)=>e.target.style.opacity=1}
                                                      src={data.coverImage['extraLarge']} alt={data.title.english} />
                                          </div>
                                          <div className="caption">
                                                <div className="info">{ truncateSentence(data.title.english || data.title.romaji)}</div>
                                                <div className="studio"></div>
                                          </div>
                                          <div className="tooltip clear-button">
                                                <div className="top-row">
                                                      <div className="next-ep">{ (data.nextAiringEpisode && secondsToDhms(data)) || (data.season && `${data.season} ${data.seasonYear}`) || data.startDate.year || 'TBA' } </div>  
                                                      {data.meanScore &&  <div className="rating">😊&nbsp;{ data.meanScore }%</div> }
                                                </div>
                                                <div className="middle-row">
                                                      <div className='studio-name' style={{color:data.coverImage.color}}>
                                                            { data.studios.nodes.map((studio)=> studio.name).join(', ') } 
                                                      </div>
                                                      <div className='season-info'>
                                                      <span>{data.format} </span>
                                                      {data.episodes && <><span style={{padding:'0 2px'}}>|</span>
                                                      <span>{data.episodes} episodes</span></>  }
                                                      </div>
                                                      <div className='bottom-row'>{data.genres?.slice(0, 3).map((genre,index)=>
                                                      <span className="genre" key={index}>{ genre } </span>
                                                      )}
                                                      </div>
                                                </div>
                                          </div>
                                    </Link>
                              </div>
                        ))} 
                        { hasMore &&  Array(5).fill(1).map((data,index) => (
                              <div className="search-card-wrapper loading-wrapper" key={animeList.length+index}>
                                    <div className="card" ></div>
                                    <div className="caption">
                                          <div className="info"></div>
                                          <div className="studio"></div>
                                    </div>
                              </div>
                        ))}
                </div>  </>
  )
}


function DisplaySearch({sortCriteria,filterOptions }) {
      // console.log("rendered")
      sortCriteria=sortCriteria || 'POPULARITY_DESC';
      const [perPage,setPerPage]=useState(5)
      useEffect(()=>{
            setPerPage(getComputedStyle(document.querySelector('.trending-list')).getPropertyValue('--childNum'))
            console.log(perPage)
      },[])
      const [pageNumber,setPageNumber]=useState(2)
      const [hasMore,setHasMore]=useState(true)
      const [name,format,year,season,genre,status,source]=filterOptions;
      const { loading, error, data,fetchMore} = useQuery(getAnime,{
      variables : {
          search:name,
          page: 1,
          perPage: 10,
          sort:sortCriteria,
          format_in:format,
          season:season,
          seasonYear:year,
          genre_in:genre,
          status:status,
          source:source

      }
    });
    
      if (loading){
            // const [animeList,setAnimeList] = useState([])
            return <Skeleton />;
      } 
      if (error){
            // const [animeList,setAnimeList] = useState([])
            return <p>Error : {error.message}</p>;
      }
      // const animeList=data? Array.from(data.Page.media) : undefined;            
//     const [animeList,setAnimeList]=useState(Array.from(data.Page.media))
      // console.log(data)
      // const [animeList,setAnimeList] = useState(Array.from(data.Page.media))
      
      const fetchMoreData = () => {
            setPageNumber(pageNumber + 1);
            fetchMore({
              variables: {
                search: name,
                page: pageNumber,
                perPage: 10,
                sort: sortCriteria,
                format_in: format,
                season: season,
                seasonYear: year,
                genre_in: genre,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.Page.media.length === 0) {
                  setHasMore(false);
                  return prev;
                }
                return {
                  Page: {
                    ...prev.Page,
                  //   media: Array.isArray(prev.Page.media[0]) ? [...prev.Page.media, fetchMoreResult.Page.media] :[prev.Page.media, fetchMoreResult.Page.media],
                    media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                  },
                };
              },
            });
          };
    //     setAnimeList(Array.from(data.Page.media))
    // return <div className="trending-list">
    //               {animeList.map(data => (
    //                   <div className="card-wrapper" key={data.id}>
    //                       <div className="card" >
    //                           <img src={data.coverImage['extraLarge']} alt="" />
    //                       </div>
    //                       <div className="caption">
    //                               <div className="info">{data.title.english || data.title.romaji}</div>
    //                               <div className="studio"></div>
    //                       </div>
    //                       <div className="tooltip">
    //                               <span></span>
    //                               <div className="next-ep">{ data.timeUntilAiring && secondsToDhms(data) }</div>
    //                       </div>
    //                   </div>)
    //                 )}
    //           </div>
    const animeList = data?.Page.media || [];
//     console.log('animeList : ',animeList)
    return <>
            {/* {loading &&  <Skeleton />}
            {error && <p>Error : {error.message}</p>} */}
            {animeList.length>0 && 
                        <InfiniteScroll
                              dataLength={animeList.length}
                              next={fetchMoreData}
                              hasMore={hasMore}
                              loader={<></>}
                              endMessage={
                              <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
                        }
                        >    
                        {/* {!Array.isArray(animeList[0]) && <><DisplaySearchData animeList={animeList.slice(0,10)}/>
                                    {animeList.length>10 && animeList
                                                                  .slice(10,animeList.length)
                                                                  .map((animeList,index)=>{
                                                                        <DisplaySearchData animeList={animeList}/>
                                                      })
                                    }</>
                        }
                        {Array.isArray(animeList[0]) && animeList.
                                                            map((animeList,index)=>{
                                                                  <DisplaySearchData animeList={animeList}/>
                                                      })
                        } */}
                        <DisplaySearchData animeList={animeList} hasMore={hasMore}/>
                        {/* <RenderElements array={animeList}/> */}
                       
                        
           </InfiniteScroll>}
        </>
  }


export default DisplaySearch;