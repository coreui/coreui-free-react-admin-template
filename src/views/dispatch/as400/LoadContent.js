import React from 'react'
import './LoadContent.css'

function LoadContainer(props) {
    return (
        <div className="load-container">
            <div className="load-header">
                <div className="load-header-content"><h3>Whse</h3></div>
                <div className="load-header-content"><h3>Time</h3></div>
                <div className="load-header-content"><h3>Date</h3></div>
                <div className="load-header-content"><h3>Status</h3></div>
                <div className="load-header-content"><h3>Load</h3></div>
                <div className="load-header-content"><h3>Trailer</h3></div>
                <div className="load-header-content"><h3>Seal</h3></div>
            </div>
            { <div className="load-content"> {props.children}</div> }
        </div>
    )
}

export default LoadContainer



