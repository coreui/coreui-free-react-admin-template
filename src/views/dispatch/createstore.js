import React, { Component } from 'react'
import Stores from '../../utils/stores/storelist.js'
import './createstore.css'
let stores= [...Stores]

class CreateStore extends Component{
    constructor(){
        super();
        this.state = stores
    }
render(){
    let store = this.state.store
   return <div class="store-div">
       {stores.map(store => <div class="store-div__content" draggable="true"><span>{store.id}</span></div>)}
   </div>
}
}
export default CreateStore