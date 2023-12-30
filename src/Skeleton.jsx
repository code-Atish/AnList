import React from 'react';
import './skeleton.css'
import './App.css'

function SkeletonBody({length}){
return (
        Array(length||5).fill(1).map((data,index) => (
            <div className="card-wrapper loading-wrapper" key={index}>
                <div className="card" ></div>
                <div className="caption">
                        <div className="info"></div>
                        <div className="studio"></div>
                </div>
            </div>
        ))
    )
}

 function Skeleton({title,length}) {

    return <>
        {title && <h1>{ title }</h1>}
        <div className="trending-list">
            <SkeletonBody length={length}/>
        </div>
    </>    
}

export default Skeleton


