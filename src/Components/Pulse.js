import React from 'react';
import PulseChart from "./PulseChart"
import "../App.css"

const Pulse = (props) => {
    return (
        <>
            <h1 style={{color: '#ED4C67'}}>Puls</h1>
            <div className="container">
                <PulseChart userInfo={props.userInfo}  />
             </div>
        </>
    )
}

export default Pulse;