import React from "react";

export default function FillInTimer(props) {
    
    return (
        <>
            <p>Thời gian: <span className="highlight">
                {props.time >= 0 ? props.time : "..."}
                </span> giây
            </p>
            <div 
                className="progress-bar" 
                style={{width: `${(props.time / props.maxTime) * 98}%`}}>
                
            </div>
        </>
    )
}