import { useQuery } from "@apollo/client";
import Skeleton from "../Skeleton";
import { secondsToDhms } from "../converTime";
import { getTrending } from "../queries/queries";
import { Link } from "react-router-dom";




export default function DisplayTrending({ pageNumber,sortCriteria,title,functions }) {

    const [setSortValue,setSortText]=functions;
    const [sortValue,sortText]=sortCriteria
    const handleView =() =>{
      setSortValue(sortValue);
      setSortText(sortText);
    }
    const { loading, error, data } = useQuery(getTrending,{
      variables : {
        type:"ANIME",
        page: pageNumber,
        perPage: 6,
        sort:sortValue,
        seasonYear:undefined,
        season:undefined,
        format:undefined,
        genre:undefined
      }
    });
    
    if (loading) return <Skeleton title={title} length={6} />;
    if (error) return <p>Error : {error.message}</p>;
    const animeList = Array.from(data.Page.media)
    return <>
            <div className="list-header">
              <h1>{ title }</h1>
              <span  onClick={handleView}><a>View All</a></span>  
            </div>
            <div className="trending-list">
             {  animeList.map(data => (
               <div 
                    className="card-wrapper" 
                    style={{ 
                        '--hover-color':data.coverImage.color,
                    }}
                    key={data.id}
                >
                  <Link to={`/details/${data.id}`} style={{ textDecoration: 'none',}}>
                    <div className="card" style={{backgroundColor:data.coverImage.color}}>
                        <img 
                              onLoad={(e)=>e.target.style.opacity=1} 
                              src={data.coverImage['extraLarge']} alt="" 
                        />
                    </div>
                    <div className="caption">
                            <div className="info">
                              { data.title.english || data.title.romaji}
                            </div>
                            {/* <div className="studio"> </div> */}
                    </div>
                    <div className="tooltip clear-button">
                          <div className="top-row">
                                <div className="next-ep">{ (data.nextAiringEpisode && secondsToDhms(data)) || (data.season && `${data.season} ${data.seasonYear}`) || data.startDate.year || 'TBA' }  </div>  
                                {data.meanScore && <div className="rating">😊&nbsp;{ data.meanScore }%</div>}
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
                                <div className='bottom-row'>{data.genres.slice(0, 3).map((genre,index)=>
                                  <span className="genre" key={index}>{ genre } </span>
                                  )}
                                </div>
                          </div>
                    </div>
                  </Link>
                </div>
               ))}
            </div>
        </>
  }

