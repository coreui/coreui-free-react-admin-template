import React, { Component } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import shortid from 'shortid'
import './createstore.css'
let stores= [...Stores]

class CreateStore extends Component{
    constructor(){
        super();
        this.state = stores;
    }

  divEl = document.getElementById('#draggable'); 
render(){
    let store = this.state
   return <div className="store-div" id="draggable">
       
       {stores.map(store => <div className="store-div__content" draggable="true"><span className="storeSpan">{store.storeID}</span>
           <button className="btn"><span class="material-icons">more_vert</span></button></div>)}
  
   </div>
}
}

export default CreateStore