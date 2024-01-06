import { useState,useEffect } from 'react'
import React from 'react';
import "../assets/styles/App.css"
import {  Outlet } from 'react-router-dom';
import DialogDemo from '../ui/DialogDemo';
import { FormatInput, GenreInput, NamedInput, SeasonInput, SourceInput, StatusInput, YearInput, YearSeasonInput } from '../components/InputComponent/InputComponent';
import { useNavigate }  from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {pageActions} from '../store/page-slice';
import Home from '../components/Home';
import { modifySortText, modifySortValue } from '../store/sort-slice';
import TagsBar from '../components/TagsBar';






function App() {
  const dispatch= useDispatch();
  const pageNumber=useSelector(state => state.page.page);
  const year=useSelector(state => state.singleInput.year);
  const season=useSelector(state => state.singleInput.season);
  const source=useSelector(state => state.singleInput.source);
  const status=useSelector(state => state.singleInput.status);
  // const genre=useSelector(state => state.manyInput.genre)
  // const [genre,setGenre]=useState([])
  const genre=useSelector(state=> state.manyInput.genre);
  
  const [count, setCount] = useState(0)
  
  let genreList=['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];
  const currentYear=new Date().getFullYear();
  const yearList=Array.from({ length: currentYear - 1940 + 1 }, (_, index) => currentYear - index);
  // const childNum=getComputedStyle(document.querySelector('.trending-list')).getPropertyValue('--childNum');
  const name=useSelector(state=> state.manyInput.name);
  // const [sortValue,setSortValue]= useState(undefined);
  // const [sortText,setSortText]= useState('Popular');
  const sortValue=useSelector(state => state.sortCriteria.sortValue)
  const sortText=useSelector(state => state.sortCriteria.sortText)
  const setSortValue = (value) =>{
    dispatch(modifySortValue(value))
  }
  const setSortText = (value) =>{
    dispatch(modifySortText(value))
  }
  const format=useSelector(state=> state.manyInput.format);
  
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

  // console.log(searchFormat)
  // console.log(searchGenre)
  
  
  // console.log(genre)
  // console.log(format)
  const removeFilter = (e,toFilter,method)=>{
      method(toFilter.filter((item)=> item!==e.target.dataset.value))
  }
  const handleSearch= (e) => {
        setName(e.target.value)
  }
  return (
    <div className="max-width">
      <div className="trending">
      <div className="input-section">
              <section className="visible_input_section">
                <NamedInput
                />

                <FormatInput
                />
                <YearInput/>
               <SeasonInput />

                <GenreInput/>

                <DialogDemo  
                />
              </section>
      </div>
      <div> 
        <Outlet />
      </div>
      {!(filterOptions.some( ele => ele!==undefined)|| sortValue) && (<>
                  <Home />    
              </>)
        }
      {(filterOptions.some( ele => ele!==undefined)||sortValue) && 
                  <TagsBar/>
      }
        
        
      </div>
    </div>
  )
}





export default App;
