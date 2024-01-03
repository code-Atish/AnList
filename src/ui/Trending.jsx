import { useQuery } from "@apollo/client";
import Skeleton from "../Skeleton";
import { secondsToDhms } from "../converTime";
import { getAnime } from "../queries/queries";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifySortText, modifySortValue } from "../store/sort-slice";


function ListStructure({handleView,animeList,title,searchComponent,hasMore}){
  return(
          <>
            {title && <div className="list-header">
              <h1>{ title }</h1>
              <span  onClick={handleView}><Link to = '/trending' >View All</Link></span>  
            </div>}
            <div className="trending-list">
             {  animeList.map((data,index) => (
               <div 
                    className={searchComponent ? 'search-card-wrapper' : 'card-wrapper'}
                    style={{ 
                        '--hover-color':data.coverImage.color,
                    }}
                    key={index}
                >
                  <Link to={`/details/${data.id}`} style={{ textDecoration: 'none',}}>
                    <div className="card" style={{backgroundColor:data.coverImage.color}}>
                        <img 
                              onLoad={(e)=>e.target.style.opacity=1} 
                              src={data.coverImage['extraLarge']} alt="Anime PV" 
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
               { (hasMore && searchComponent ) &&  Array(5).fill(1).map((data,index) => (
                              <div className="search-card-wrapper loading-wrapper" key={animeList.length+index}>
                                    <div className="card" ></div>
                                    <div className="caption">
                                          <div className="info"></div>
                                          <div className="studio"></div>
                                    </div>
                              </div>
                        ))}
            </div>
        </>
  )
}
function MakeRequest(variables,query){
  const DefaultVariables = {
    search: undefined,
    page:  undefined,
    perPage:  undefined,
    sort: undefined,
    format_in: undefined,
    season: undefined,
    seasonYear: undefined,
    genre_in: undefined,
    status: undefined,
    source: undefined
  }
  return useQuery(query,{
    variables : {...DefaultVariables,...variables}
  });

}
export default function DisplayTrending({sortCriteria,title}) {
    const dispatch=useDispatch();
    const pageNumber=useSelector(state => state.page.page)
    const [sortValue,sortText]=sortCriteria
    const handleView =() =>{
      dispatch(modifySortValue(sortValue))
      dispatch(modifySortText(sortText))
    }
    const variables = {
      type:"ANIME",
      page: pageNumber,
      perPage: 6,
      sort:sortValue,
    }
    const {loading,data,error}=MakeRequest(variables,getAnime)
    
    if (loading) return <Skeleton title={title} length={6} />;
    if (error) return <p>Error : {error.message}</p>;
    const animeList = Array.from(data.Page.media)
    return( <ListStructure 
              animeList={animeList}
              handleView={handleView}
              title={title}
            />
          )
  }

  export { ListStructure , MakeRequest }