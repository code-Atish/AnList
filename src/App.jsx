import { useQuery } from '@apollo/client';
import { useState,useRef,useEffect } from 'react'
import React from 'react';
import { getTrending } from './queries/queries';
import Skeleton from './Skeleton';
import PopularAnime from './PopularAnime';
import DisplaySearch from './searchAnime';
import DisplayTrending from './ui/Trending';
import { TitleCase, secondsToDhms,truncateSentence } from './converTime';
import './App.css'
import { Link, Outlet } from 'react-router-dom';
import DialogDemo from './ui/DialogDemo';
import { FormatInput, GenreInput, NamedInput, SeasonInput, StatusInput, YearInput, YearSeasonInput } from './ui/overViewTab/InputComponent/InputComponent';
import { useNavigate }  from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {pageActions} from './store/counter-slice';





function App() {
  const pageNumber=useSelector(state => state.page.page);
  const dispatch= useDispatch();
  const currentYear=new Date().getFullYear();
  const yearList=Array.from({ length: currentYear - 1940 + 1 }, (_, index) => currentYear - index);
  const [year,setYear]=useState(undefined);
  const seasonList=['WINTER','SPRING','SUMMER','FALL']
  const [season,setSeason]=useState(undefined);
  const [status,setStatus]=useState(undefined);
  const [source,setSource]=useState(undefined);
  let sourceList=["ORIGINAL", "MANGA", "LIGHT_NOVEL", "VISUAL_NOVEL", "VIDEO_GAME", "NOVEL", "DOUJINSHI", "ANIME", "WEB_NOVEL", "LIVE_ACTION", "GAME", "COMIC", "MULTIMEDIA_PROJECT", "PICTURE_BOOK","OTHER"];
  let statusList=[ 'FINISHED','RELEASING', 'NOT_YET_RELEASED',  'CANCELLED']
  let genreList=['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];
  const [searchGenre,setSearchGenre]=useState('');
  const [genre,setGenre]=useState([])
  const [count, setCount] = useState(0)
  
  // const childNum=getComputedStyle(document.querySelector('.trending-list')).getPropertyValue('--childNum');
  const [name,setName] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  // const [isFormatVisible,setFormatVisible] =useState(false);
  const [isYearVisible,setYearVisible] =useState(false);
  const [isSeasonVisible,setSeasonVisible] =useState(false);
  const [isGenreVisible,setGenreVisible] =useState(false);
  const [isStatusVisible,setStatusVisible] =useState(false);
  const [isSourceVisible,setSourceVisible] =useState(false);
  const domElementRef = useRef();
  console.log(domElementRef)
  const [sortValue,setSortValue]= useState(undefined);
  const [sortText,setSortText]= useState('Popular');
  const [format,setFormat]=useState([]);
  const filterOptions=[name,format,year,season,genre,status,source].map((ele)=>{
                if(ele==''||ele==[]) return undefined;
                else return ele;
  });
  const trimOptions=filterOptions.filter((ele)=> ele!==undefined && !Array.isArray(ele));
  const clearVisibility=trimOptions.length+format.length+genre.length >=2
  // console.log(filterOptions)
  useEffect(()=>{
    if(!filterOptions.some((ele)=>ele!=undefined)){
      setSortValue(undefined)
      setSortText('Popularity')
    }
  },[name,format,year,season,genre,status,source])

  // console.log(year)
  // console.log(season)
  let formatList=[{value:'TV',name:'TV Show'},{value:'TV_SHORT',name:'TV Short'},{value:'MOVIE',name:'Movie'},{value:'OVA',name:'OVA'},{value:'ONA',name:'ONA'},{value:'SPECIAL',name:'Special'},{value:'MUSIC',name:'Music'}]
  const [searchFormat,setSearchFormat]=useState('');
  // console.log(searchFormat)
  // console.log(searchGenre)
  
  
  const handleFormatSelect = (e) =>{
    const newFormat=e.target.dataset.value
      if(format.includes(newFormat)) {
        let newArr =format.filter((item)=> item!=newFormat);
        setFormat(newArr);
      }else
        setFormat(prev=> [...prev,newFormat]);
      setFormatVisible(!isFormatVisible);
      // console.log(newFormat)
  }
  const handleFormatVisible = ()=> {
      setFormatVisible(!isFormatVisible);
      setSearchFormat('');
  }
  const handleGenreVisible = ()=> {
    setGenreVisible(!isGenreVisible);
    setSearchGenre('');
}
  const handleYearClick= (e)=> {
    setYear(e.target.value);
    setYearVisible(!isYearVisible)
}
  const handleGenreClick = (e) =>{
    const newGenre=e.target.value
      if(genre.includes(newGenre)) {
        let newArr =genre.filter((item)=> item!=newGenre);
        setGenre(newArr);
      }else
        setGenre(prev=> [...prev,newGenre]);
      setGenreVisible(!isGenreVisible);
      // console.log(newFormat)
  }
  // console.log(genre)
  // console.log(format)
  const removeFilter = (e,toFilter,method)=>{
      method(prevArray => prevArray.filter((item)=> item!==e.target.dataset.value))
  }
  const handleSearch= (e) => {
        setName(e.target.value)
  }
  const handleSelect= (e) => {
        setSortValue(e.target.value);
        setSortText(e.target.innerText);
        // console.log(e.target.classList.add('active'));
        setIsVisible(!isVisible);
  }
  const handleOutsideClick = (event) => {
    if (domElementRef.current && !domElementRef.current.contains(event.target)) {
      setIsVisible(false);
      
    }
  };
  const navigate=useNavigate();
  const yearProps=[year,setYearVisible,isYearVisible,yearList,setYear,"Year"]
  const seasonProps=[season,setSeasonVisible,isSeasonVisible,seasonList,setSeason,"Season"];
  const statusProps=[status,setStatusVisible,isStatusVisible,statusList,setStatus,"Status"];
  const sourceProps=[source,setSourceVisible,isSourceVisible,sourceList,setSource,"Source"];
  const formatProps=[format,formatList,searchFormat,handleFormatSelect,setSearchFormat]
  const genreProps=[genre,isGenreVisible,handleGenreVisible,genreList,searchGenre,handleGenreClick,setSearchGenre]
  // useEffect(()=>{
  //   fetch("https://api.consumet.org/anime/crunchyroll/info/GRVN8MNQY")
  // .then((response) => response.json())
  // .then((animelist) => console.log(animelist));
  // },[])
  React.useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div className="max-width">
      <div className="trending">
      <div className="input-section">
              <section className="visible_input_section">
                <NamedInput
                    name={name}
                    handleSearch={handleSearch}
                />

                <FormatInput
                    // format={format}
                    // isFormatVisible={isFormatVisible}
                    // handleFormatVisible={handleFormatVisible}
                    // handleFormatSelect={handleFormatSelect}
                    // formatList={formatList}
                    // searchFormat={searchFormat}
                    // setSearchFormat={setSearchFormat}
                    // formatProps={formatProps}
                    format={format}
                    setFormat={setFormat}
                    className={'Format'}
                />
                  {/* <input type="submit" value="Submit" /> */}
                
                <YearInput
                  // year={year}
                  // setYearVisible={setYearVisible}
                  // isYearVisible={isYearVisible}
                  // yearList={yearList}
                  year={year}
                  setYear={setYear}
                />
                {/* <YearSeasonInput
                    // Input={year}
                    // setInputVisible={setYearVisible}
                    // isInputVisible={isYearVisible}
                    // inputList={yearList}
                    // setInput={setYear}
                    // placeholder={"Year"}     PREVIOUS ONES
                    props={yearProps}
                    inDialog={false}
                    className={'Year'}

                /> */}
                {/* <YearSeasonInput
                    // Input={season}
                    // setInputVisible={setSeasonVisible}
                    // isInputVisible={isSeasonVisible}
                    // inputList={seasonList}
                    // setInput={setSeason}
                    // placeholder={"Season"}   PREVIOUS ONES
                    props={seasonProps}
                    className={'Season'}
                /> */}

                <SeasonInput
                  // seasonList={seasonList}
                  // setSeasonVisible={setSeasonVisible}
                  // isSeasonVisible={isSeasonVisible}
                  season={season}
                  setSeason={setSeason}
                />

                <GenreInput
                    // handleGenreVisible={handleGenreVisible}
                    // handleGenreClick={handleGenreClick}
                    // genre={genre}
                    // genreList={genreList}
                    // isGenreVisible={isGenreVisible}
                    // searchGenre={searchGenre}
                    // setSearchGenre={setSearchGenre}
                    // genreProps={genreProps}
                    genre={genre}
                    setGenre={setGenre}
                    className={'Genre'}
                    
                />

                <DialogDemo 
                    yearProps={yearProps} 
                    seasonProps={seasonProps}
                    statusProps={statusProps}
                    formatProps={formatProps}
                    genreProps={genreProps}
                    sourceProps={sourceProps}
                    navigate={navigate}
                />
              </section>
      </div>
      <center> 
        <Outlet />
      </center>
      {!(filterOptions.some( ele => ele!==undefined)|| sortValue) && (<>
                    <DisplayTrending 
                        pageNumber={ pageNumber } 
                        sortCriteria={["TRENDING_DESC",'Trending']} 
                        title="Trending" 
                        functions={[setSortValue,setSortText]}
                    />

                    <PopularAnime
                        pageNumber={pageNumber}
                        nextSeason={false}
                        sortCriteria="POPULARITY_DESC"
                        title="Popular this season"
                        functions={[setYear, setSeason]}
                    />

                    <PopularAnime
                        pageNumber={pageNumber}
                        nextSeason={true}
                        sortCriteria="POPULARITY_DESC"
                        title="Upcoming next season"
                        functions={[setYear, setSeason]}
                    />

                    <DisplayTrending
                        pageNumber={pageNumber}
                        sortCriteria={["POPULARITY_DESC", "Popularity"]}
                        title="All Time Popular"
                        functions={[setSortValue, setSortText]}
                    />
                    
              </>)
        }
      {(filterOptions.some( ele => ele!==undefined)||sortValue) && (<>
              <div className='search-header'>
                <div className='applied-filters-wrapper' 
                  style={{
                    display:'flex',
                    gap:'15px'
                  }}>
                  {/* result for : <h1>{ name }</h1> */}
                  <div style={{display:'grid',alignItems:'center',color:'#8ba2b5',fontSize:'1.2rem'}}>
                      <i className="fa-solid fa-tags"></i>
                  </div>
                  <div >
                    { trimOptions.map((ele,index)=>{
                            if(Number.isInteger(ele)){
                            return <AppliedFilters 
                                      ele={ele}
                                      key={index}
                                      removeFunc={()=>setYear(undefined)}
                                  />
                            }else if(seasonList.includes(ele)){
                            return <AppliedFilters 
                                        ele={ele}
                                        key={index}
                                        removeFunc={()=>setSeason(undefined)}
                                    />
                            }
                            else if(statusList.includes(ele)){
                              return <AppliedFilters 
                                        ele={ele}
                                        key={index}
                                        removeFunc={()=>setStatus(undefined)}
                                    />
                              }
                              else if(sourceList.includes(ele)){
                                return <AppliedFilters 
                                        ele={ele}
                                        key={index}
                                        removeFunc={()=>setSource(undefined)}
                                    />
                                }
                            else{
                            return  <AppliedFilters 
                                        ele={ele}
                                        key={index}
                                        removeFunc={()=>setName('')}
                                    />
                            }
                        })
                    }
                    {
                      (Boolean(format.length)) && format.map((ele,index) =>(
                            <div className='applied-filters' key={index} >
                              <label htmlFor={ele} data-value={ele} onClick={(e)=>removeFilter(e,format,setFormat)}>{TitleCase(ele)}</label>
                              <div className="remove-filters" >
                                <i className="fa-solid fa-xmark" ></i>
                              </div>
                            </div>
                            ))
                    }
                    {
                      (Boolean(genre.length)) && genre.map((ele,index) =>(
                            <div className='applied-filters'
                                  key={index}
                              >
                                    <label htmlFor={ele} data-value={ele}
                                  onClick={(e)=>removeFilter(e,genre,setGenre)}  >{ele}</label>
                                    <div className="remove-filters" >
                                      <i className="fa-solid fa-xmark" ></i>
                                    </div>
                            </div>
                            ))

                    }
                    
                      <div className='applied-filters clearall-btn'
                        style={{
                          backgroundColor:'#a1b9bf',
                          display:clearVisibility ? 'inline-block' : 'none',
                          transition:"linear 250ms all"
                          }} 
                          onClick={()=>{
                              setName('');setFormat([]),setGenre([]),setSeason(undefined);setYear(undefined);
                              setStatus(undefined);setSource(undefined)
                            }}
                        >
                            
                          <span>Clear all</span>
                          <div className="remove-filters" >
                            <i className="fa-solid fa-xmark" ></i>
                          </div>
                      </div>
                    
                  </div>
                </div>

                <div className='sort-by-wrapper'>
                  <div className="sort-by-trend">
                      <i className="fa-solid fa-sort"></i>
                      <div name="" className="sort-by" onClick={()=>setIsVisible(!isVisible)} ref={domElementRef}>
                        { sortText }
                      </div>
                      {isVisible && <div className="options tooltip">
                        <option value="POPULARITY_DESC" onClick={handleSelect}>Popularity</option>
                        <option value="TRENDING_DESC" onClick={handleSelect}>Trending</option>
                        <option value="SCORE_DESC" onClick={handleSelect}>Average Score</option>
                        <option value="FAVOURITES_DESC" onClick={handleSelect}>Favorites</option>
                        <option value="EPISODES_DESC" onClick={handleSelect}>Episode</option>
                        <option value="SEARCH_MATCH" onClick={handleSelect}>Search Match</option>
                        <option value="START_DATE_DESC" onClick={handleSelect}>Release Date</option>
                      </div>}
                  </div>
                </div>
              </div>
              
                {/* <div className="trending-list"> */}
                    <DisplaySearch filterOptions={filterOptions}  sortCriteria={ sortValue } />
                {/* </div> */}
              </>)
        }
        
        <div className="btns">
            <button onClick={() => dispatch(pageActions.decrement())}>Prev</button>
            <button onClick={() => dispatch(pageActions.increment())}>Next</button>
          </div>
        <p className="read-the-docs" style={{display:"block",textAlign:"center"}}>
          {/* Click on the Vite and React logos to learn more */}
          Current Page : { pageNumber }
        </p>
      </div>
    </div>
  )
}

function AppliedFilters({ele,removeFunc}){
  return (<div className='applied-filters' 
              // key={key} 
              onClick={removeFunc}
            >
                <span >{TitleCase(ele.toString())}</span>
                <div className="remove-filters" >
                  <i className="fa-solid fa-xmark" ></i>
                </div>
            </div>)
}



export default App;
