import React, { useEffect } from 'react'
import "../assets/styles/App.css"
import {  Outlet } from 'react-router-dom';
import DialogDemo from '../ui/DialogDemo';
import { FormatInput, GenreInput, NamedInput, SeasonInput, YearInput } from '../components/InputComponent/InputComponent';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../components/Home';
import { modifySortText, modifySortValue } from '../store/sort-slice';
import TagsBar from '../components/TagsBar';






function App() {
  const dispatch= useDispatch();
  const year=useSelector(state => state.singleInput.year);
  const season=useSelector(state => state.singleInput.season);
  const source=useSelector(state => state.singleInput.source);
  const status=useSelector(state => state.singleInput.status);
  const genre=useSelector(state=> state.manyInput.genre);
  const name=useSelector(state=> state.manyInput.name);
  
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
  useEffect(()=>{
    if(!filterOptions.some((ele)=>ele!=undefined)){
      setSortValue(undefined)
      setSortText('Popularity')
    }
  },[name,format,year,season,genre,status,source])

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
                  <TagsBar filterOptions={filterOptions}/>
      }
        
        
      </div>
    </div>
  )
}





export default App;
