import React, { Component } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import Badge from '../badge/badge.js'
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
    let store = this.state.store
   return <div className="store-div" id="draggable">
       
       {stores.map(store => <div class="store-div__content" draggable="true"><span>{store.storeID}</span><Badge/><Badge /><Badge color="warning"/></div>)}
  
   </div>
}
}

export default CreateStore