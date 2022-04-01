import React from "react";

export default function(props) {
    let styles={
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    return(
        <div className="box" 
        style={styles} 
        onClick={props.handleBoxClick}
        >
            <h1>{props.value}</h1>
        </div>
    )
}