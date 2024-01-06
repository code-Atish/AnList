import { getAnime } from '../utility/queries';
import { ListStructure, MakeRequest } from './Trending';
import Skeleton from './Skeleton';
import '../assets/styles/select.css'
import { TitleCase, secondsToDhms } from '../utility/utilityFunctions';
import { Link, useNavigate } from 'react-router-dom';

function RowStructure({animeList,handleView}){
    return (
        <>
        <div className="list-header">
            <h1>Top 100 Anime</h1>
            <span onClick={handleView}>View All</span>
            </div>
            <div className="top-anime-list">
                {
                    animeList.map((data,index)=>
                    <Link to={`/details/${data.id}`} key={index}
                        className='anime-cont-wrapper'> 
                    <div className="col-0">
                                #{index+1}
                    </div>
                        <div className="anime-cont"
                            style={{'--hover-color':data.coverImage.color}}
                        >   
                            
                            <div className="col-1">
                                <div className="info-PV-wrapper">
                                    <img
                                        src={data.coverImage.extraLarge} 
                                        alt="Anime PV" 
                                        onLoad={(e) => (e.target.style.opacity = 1)}
                                        className="info-PV" 
                                    />
                                </div>
                                <div className='anime-title-genre flex'>
                                    <div className="anime-title line_clamp">
                                        {data.title.english || data.title.romaji}
                                    </div>
                                    <div className="anime-genre">
                                    {data.genres.slice(0, 3).map((genre, index) => (
                                        <span className="genre" key={index}
                                            style={{background:data.coverImage.color,
                                            color:'white'}}
                                        >
                                            {genre}{" "}
                                        </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="anime-det-box flex">
                                    <div className="top-dets">😊&nbsp;{data.meanScore}%</div>
                                    <div className="bottom-dets">{data.popularity} users</div>
                                </div>
                                <div className="anime-det-box flex">
                                    <div className="top-dets">{data.format.replace('_',' ')}</div>
                                    <div className="bottom-dets">10 Episodes</div>
                                </div>
                                <div className="anime-det-box flex">
                                    <div className="top-dets">{data.season && `${TitleCase(data.season)} ${data.seasonYear}` || data.startDate.year}</div>
                                    <div className="bottom-dets">{(data.nextAiringEpisode && secondsToDhms(data)) || data.status}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    )
                }
            </div>
        </>
    )
}
const TopAnime = () => {
    const navigate=useNavigate()
    const variables={
        type: "ANIME",
        page: 1,
        perPage: 10,
        sort: "SCORE_DESC",        
    }
    const handleView=()=>{
        navigate(`/trending/2`)
    }
    const { loading, data, error } = MakeRequest(variables, getAnime);
    if (loading) return <Skeleton title={"Top 100 Anime"} length={6} />;
    if (error) return <p>Error : {error.message}</p>;
    const animeList = Array.from(data.Page.media).slice(0,15);
    return (
        <div className='top-anime-wrapper'>
            <RowStructure 
                animeList={animeList}
                handleView={handleView}
            />
            <ListStructure 
                animeList={animeList}
                TopAnime={true}
                hasmore={false}
                searchComponent={true}
                handleView={handleView}
            />
        </div>
    )
}
function FindAiringDate(data){

}
export default TopAnime
