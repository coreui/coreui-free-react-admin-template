import React from 'react'
import './LoadContent.css'

function LoadContainer(props) {
    return (
        <div className="load-container">
          
            { <div className="load-content"> {props.children}</div> }
        </div>
    )
}

export default LoadContainer



