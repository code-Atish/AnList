import React from "react"
import { useRef, useState } from "react"
import { TitleCase } from "../../../converTime"

function NamedInput({name,handleSearch}){
    return (
          <div className='search_input_wrapper'>
            <input type="text" value={name} id="name" placeholder="Search" onChange={ handleSearch } >
            </input>
            <div className="search_icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
    )
  }
  function GenreInput({genreProps,className,genre,setGenre}) {
    // const [genre,isGenreVisible,handleGenreVisible,genreList,searchGenre,handleGenreClick,setSearchGenre]=genreProps
    const [isGenreVisible,setGenreVisible] =useState(false);
    let genreList=['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];
    const [searchGenre,setSearchGenre]=useState('');
    const domElementRef=useRef();
    const handleGenreVisible = ()=> {
        console.log("Genre visibility changed")
        setGenreVisible(!isGenreVisible);
        setSearchGenre('');
    }
    const handleGenreClick = (e) =>{
        const newGenre=e.target.dataset.value
          if(genre.includes(newGenre)) {
            let newArr =genre.filter((item)=> item!=newGenre);
            setGenre(newArr);
          }else
            setGenre(prev=> [...prev,newGenre]);
          setGenreVisible(prev=>!prev);
          // console.log(newFormat)
      }
      const handleOutsideGenreClick = (event) => {
        if (domElementRef.current && !domElementRef.current.contains(event.target)) {
          setGenreVisible(false);
          
        }
      };
      React.useEffect(() => {
        window.addEventListener('click', handleOutsideGenreClick);
    
        return () => {
          window.removeEventListener('click', handleOutsideGenreClick);
        };
      }, []);
    return (
        <div className={`${className}-input`} onClick={handleGenreVisible} ref={domElementRef}>
          {(!Boolean(genre.length)&&!isGenreVisible) &&<span className='ip-placeholder' >Genre</span>}
          {(Boolean(genre.length) && !isGenreVisible) &&
              <span className='active-filters' >{genre[0]}</span>
          }
          { (genre.length>1 && !isGenreVisible) &&
              <span className='active-filters' >+{genre.length-1}</span>
          }
          <div className="angle-down" onClick={handleGenreVisible}>
                {!isGenreVisible && <i className="fa-solid fa-angle-down" ></i>}
                {isGenreVisible && <i className="fa-solid fa-xmark"></i>}
          </div>
          { isGenreVisible && <>
                <input type="text" name="" id="" autoFocus onChange={(e)=>setSearchGenre(e.target.value)}/>
            </>
          }
          {isGenreVisible && <div className="options tooltip"
                style={{
                  // display: isGenreVisible ? 'block':'none',
                }}>
              {
                genreList.filter( genre =>{
                  return genre.toLowerCase().includes(searchGenre.toLowerCase())
                }).map( (genre,index) =>(
                  <div key={index} className='label-wrapper'>
                    <input type="checkbox" style={{display:'none'}} name="genre" id={genre} value={genre} />
                    <label className="label" htmlFor={genre} data-value={genre} onClick={handleGenreClick}>{genre}</label>
                  </div>
                ) )
              }
          </div>}
      </div>
    )
  }
  
  function FormatInput({formatProps,className,format,setFormat}) {
    const [isFormatVisible,setFormatVisible]=useState(false);
    let formatList=[{value:'TV',name:'TV Show'},{value:'TV_SHORT',name:'TV Short'},{value:'MOVIE',name:'Movie'},{value:'OVA',name:'OVA'},{value:'ONA',name:'ONA'},{value:'SPECIAL',name:'Special'},{value:'MUSIC',name:'Music'}]
    const [searchFormat,setSearchFormat]=useState('');
    const domElementRef = useRef();

    const handleFormatSelect = (e) =>{
      const newFormat=e.target.dataset.value
        if(format.includes(newFormat)) {
          let newArr =format.filter((item)=> item!=newFormat);
          setFormat(newArr);
        }else
          setFormat(prev=> [...prev,newFormat]);
        setFormatVisible(prev => !prev);
        // console.log(newFormat)
    }
    const handleFormatVisible = ()=> {
      setFormatVisible(prev=> !prev);
      setSearchFormat('');
    }
    const handleOutsideClick = (event) => {
      if (domElementRef.current && !domElementRef.current.contains(event.target)) {
        setFormatVisible(false);
        
      }
    };
    React.useEffect(() => {
      window.addEventListener('click', handleOutsideClick);
  
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, []);
    // const [format,isFormatVisible,handleFormatVisible,formatList,searchFormat,handleFormatSelect,setSearchFormat]=formatProps;

    return (
                <div className={`${className}-input`} onClick={handleFormatVisible} ref={domElementRef}>
                    {(!Boolean(format.length) && !isFormatVisible) && <span className='ip-placeholder' >Format</span>}
                      {(Boolean(format.length) && !isFormatVisible) &&
                      <span className='active-filters'>{format[0]}</span>
                      }
                      { (format.length>1 && !isFormatVisible) &&
                        <span className='active-filters'>+{format.length-1}</span>
                      }
                      {<div className="angle-down">
                          <i className="fa-solid fa-angle-down" ></i>
                      </div>
                      }
                      { isFormatVisible &&<> 
                        {/* <div className="angle-down" onClick={handleFormatVisible}>
                          <i className="fa-solid fa-xmark"></i>
                        </div> */}
                          <input type="text" name="" id="" autoFocus 
                            onChange={ (e)=> setSearchFormat(e.target.value) }/>
                        </>
                      }   
                    {<div className="options tooltip"
                            style={{
                              display: isFormatVisible ? 'block' : 'none',
                              // transition:'all 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                              // transition: 'all linear 300ms',
                              // transform:isFormatVisible? 'translateY(0%) scale(0.95)' : 'translateY(-10%) scale(0.95)',
                              opacity: isFormatVisible ? '1' : '0',
                              visibility: isFormatVisible? 'visible' : 'hidden'
                            }}>
                        {
                          formatList.filter(({value,name}) => {
                            return name.toLowerCase().includes(searchFormat.toLowerCase())
                          }).map( (format,index) =>(
                            <div key={index} className='label-wrapper'>
                              <input type="checkbox" style={{display:'none'}} name="format" id={format.value} value={format.value} />
                              <label className="label" htmlFor={format.value} data-value={format.value}  onClick={handleFormatSelect}>{format.name}</label>
                            </div>
                          ) )
                        }
                    </div>}
                        
                </div>
    )
  }
  
  
  function YearInput({year,setYearVisible,isYearVisible,yearList,setYear}) {
    return (
                <div className="SeasonYear-input" onClick={()=> setYearVisible(!isYearVisible)}>
                        { !year  && <span className='ip-placeholder'  >Year</span>}
                        {year && 
                            <span 
                                style={{
                                  color:'rgb(46, 198, 91)',
                                  fontSize:'0.85em'
                                }} 
                                
                            >
                                {year}
                            </span>
                        }
                        { !isYearVisible && <div className="angle-down" >
                          <i className="fa-solid fa-angle-down" ></i>
                        </div>
                        }
                        { isYearVisible && <div className="angle-down" >
                            <i className="fa-solid fa-xmark"></i>
                          </div>
                        }   
                        <div className="options tooltip"
                              style={{
                                display: isYearVisible ? 'block':'none',
                              }}>
                          {
                            yearList.map( (year) =>(
                              <div key={year} className='label-wrapper'>
                                {/* <input type="radio" style={{display:'none'}} name="year" id={year} value={year} onClick={handleYearClick}/>
                                <label htmlFor={year} >{year}</label> */}
                                <label className="label" onClick={()=>{ setYear(year);}}>{year}</label>
                              </div>
                            ) )
                          }
                    </div>
                  </div>
    )
  }
  
  function YearSeasonInput({props,className}) {
    const [Input,setInputVisible,isInputVisible,inputList,setInput,placeholder]=props;
    // console.log(Input,setInputVisible,isInputVisible,inputList,setInput,placeholder)
    const YearSeasonRef=useRef();
    const handleOutsideClick = (event) => {
      if (YearSeasonRef.current && !YearSeasonRef.current.contains(event.target)) {
        setInputVisible(false);
        
      }
    };
    React.useEffect(() => {
      window.addEventListener('click', handleOutsideClick);
  
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, []);

    return (
                <div className={`${className}-input`} onClick={()=> setInputVisible(!isInputVisible)} ref={YearSeasonRef}>
                        { !Input  && <span className='ip-placeholder'  >{placeholder}</span>}
                        {Input && 
                            <span 
                            style={{
                                color:'var(--green-8)',
                                fontSize:'0.9em'
                              }} 
                              
                            >
                                {TitleCase(Input.toString().replace(/_/g, ' '))}
                            </span>
                        }
                        { !isInputVisible && 
                            <div
                                style={{
                                  pointerEvents:'none',
                                }}
                                className="angle-down" >
                              <i className="fa-solid fa-angle-down" ></i>
                            </div>
                        }
                        { isInputVisible && <div className="angle-down" >
                            <i className="fa-solid fa-xmark"></i>
                          </div>
                        }   
                        <div className="options tooltip"
                              style={{
                                display: isInputVisible ? 'block':'none',
                              }}>
                          {
                            inputList.map( (item,index) =>(
                              <div key={index} className='label-wrapper'>
                                {/* <input type="radio" style={{display:'none'}} name="year" id={year} value={year} onClick={handleYearClick}/>
                                <label htmlFor={year} >{year}</label> */}
                                <label className="label" onClick={()=>{ setInput(item);}}>
                                    {TitleCase(item.toString().replace(/_/g, ' '))}
                                </label>
                              </div>
                            ) )
                          }
                    </div>
                  </div>
    )
  }
  
  function SeasonInput({season,seasonList,setSeasonVisible,isSeasonVisible,setSeason}) {
    return (
          <div className="Season-input" onClick={()=> setSeasonVisible(!isSeasonVisible)}>
              { !season  && <span className='ip-placeholder'>Season</span>}
              {season && <>
                  <span 
                      style={{
                        color:'rgb(46, 198, 91)'
                      }}
                      onClick={()=> setSeasonVisible(!isSeasonVisible)}
                      >{season}</span>
                  <div className="angle-down" onClick={()=>{ setSeason(undefined)}}>
                      <i className="fa-solid fa-xmark"></i>
                </div>
                </>
              }
              { !season && <div className="angle-down" onClick={()=> setSeasonVisible(!isSeasonVisible)}>
                <i className="fa-solid fa-angle-down" ></i>
              </div>
              }
              
              {isSeasonVisible && <div className="options tooltip">
                  {
                    seasonList.map( (season) =>(
                      <div key={season} className='label-wrapper'>
                        <label className="label" onClick={()=>{ setSeason(season)}}>{season}</label>
                      </div>
                    ) )
                  }
                </div>
              }
           </div>
    )
  }
  export {NamedInput,FormatInput,GenreInput,SeasonInput,YearInput,YearSeasonInput}
  