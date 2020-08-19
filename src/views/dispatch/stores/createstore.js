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

    onDragStart_handler = (ev) => {
ev.preventDefault();
console.log("drag Start")
let data = ev.dataTransfer.setData("text/plain","Store:230") 
console.log(data)
    }

  divEl = document.getElementById('#draggable'); 
render(){
    let store = this.state
   return <div className="store-div" id="draggable">
       
       {stores.map(store => <div className="store-div__content" draggable="true" onDragStart={this.onDragStart_handler}><span className="storeSpan">{store.storeID}</span>
       <div className="span-div"><span class="material-icons">create</span></div>
       <div className="span-div"><span class="material-icons">more_vert</span></div>
       </div>)}
  
   </div>
}
}

export default CreateStore