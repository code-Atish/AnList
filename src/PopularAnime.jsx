import { useQuery } from '@apollo/client';
import { getPopular } from './queries/queries';
import {secondsToDhms, truncateSentence} from './converTime';
import Skeleton from './Skeleton';
import './App.css'
import { Link } from 'react-router-dom';


function getCurrentSeasonAndYear(nextSeason) {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; // Months are 0-based, so we add 1.
  month=month%12;
  (month==0) ? year=year+1:year=year;
//   console.log(month,year)
  // Define the starting and ending months for each season.
  const seasons = [
    { name: 'WINTER', startMonth: 0, endMonth: 2 },
    { name: 'SPRING', startMonth: 3, endMonth: 5 },
    { name: 'SUMMER', startMonth: 6, endMonth: 8 },
    { name: 'FALL', startMonth: 9, endMonth: 11 },
  ];

  // Find the current season based on the month.
  for (let i = 0; i < seasons.length; i++) {
    let season = seasons[i];
    if ((month >= season.startMonth && month <= season.endMonth)) {
    //   (nextSeason)? season=seasons[(i+1)%4].name:season=seasons[i].name
    if(nextSeason) {
        if(season.name=="FALL"){
            return [seasons[(i+1)%4].name,year+1]
        }
        return [seasons[(i+1)%4].name,year]
 
    }
      // if(season==='WINTER') {
      //   year=year+1
      // }
      return [season.name,year]
    }
  }

  // // If the current season is Winter, return the next season (Spring of the next year).
  // return `Spring ${year + 1}`;
}

// const currentSeasonAndYear = getCurrentSeasonAndYear();
// console.log(currentSeasonAndYear);

function PopularAnime({ pageNumber,sortCriteria,title,nextSeason,functions}) {
  const [season,seasonYear] = getCurrentSeasonAndYear(nextSeason);
  const [setYear,setSeason] =functions;
  const handleView=()=>{
      setYear(seasonYear);
      setSeason(season);
  }
  const { loading, error, data } = useQuery(getPopular,{
    variables : {
        type:"ANIME",
        page: pageNumber,
        perPage: 6,
        sort:sortCriteria,
        season:season,
        seasonYear:seasonYear
    }
  });
  if (loading) return <Skeleton title={ title } length={6}/>;
  if (error) return <p>Error : {error.message}</p>;
  const animeList = Array.from(data.Page.media)

  return <>
          <div className="list-header">
            <h1>{ title }</h1>
            <span style={{marginRight:'0.5em'}} onClick={handleView}><a>View All</a></span>  
          </div>
          <div className="trending-list">
           {  animeList.map(data => (
              <div className="card-wrapper" key={data.id} style={{'--hover-color':data.coverImage.color}}>
                <Link to={`/details/${data.id}`} style={{ textDecoration: 'none',}}>
                  <div className="card" style={{backgroundColor:'var(--hover-color)'}}>
                      <img 
                          onLoad={(e)=>e.target.style.opacity=1} 
                          src={data.coverImage['extraLarge']} alt="" 
                      />
                  </div>
                  <div className="caption">
                          <div className="info">{ truncateSentence(data.title.english || data.title.romaji)}</div>
                          <div className="studio"></div>
                  </div>
                  <div className="tooltip clear-button">
                        <div className="top-row">
                              <div className="next-ep">{ (data.nextAiringEpisode && secondsToDhms(data)) ||  `${data.season} ${data.seasonYear}`}  </div>  
                              {data.meanScore && <div className="rating">😊&nbsp;{ data.meanScore }%</div> }
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






export default PopularAnime