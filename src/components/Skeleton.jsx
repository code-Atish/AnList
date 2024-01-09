import React from 'react';
import '../assets/styles/skeleton.css'
import '../assets/styles/App.css'

export function SkeletonBody({length}){
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

export function InfoCardSkeletonBody({length,offset}){
    return (<>
    {Array(length||2).fill(1).map((data,index) => (
            <div className="info-card loading-wrapper" key={index+offset}>
                <div className="info-PV-wrapper" >
                    <div className="info-PV"></div>
                </div>
                <div className="info-cont-wrapper">
                    <div className="loading-wrapper upper-block"></div>
                    <div className=".loading-wrapper middle-block"></div>
                    <div className=".loading-wrapper middle-block"></div>

                </div>
            </div>
        ))}</>)
}
export function InfoCardSkeleton({length,offset}){
    return (<>
        <div className="info-card-list loading-wrapper">
            <InfoCardSkeletonBody length={length} offset={offset}/>
        </div> 
    </>)
}
export default Skeleton


