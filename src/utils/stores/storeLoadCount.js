import React, { Component } from 'react'
import Stores from '../../utils/stores/storelist.js'
import './storeLoadCount.css'
let storeCount= [...Stores]

 class storeLoadCount extends Component {
    render() {
        return (
            <div>
               <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">It's a broader card with text below as a natural lead-in to extra content. This content is a little longer.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div> 
            </div>
        )
    }
}


export default storeLoadCount