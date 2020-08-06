import React, { Component } from 'react'
import Stores from '../../utils/stores/storelist.js'


let stores= [...Stores]

class CreateStore extends Component{

constructor(props) {
    super(props)

    let store =[];
    for(let i=0;i<stores.length;i++){
        store.push({
            store:stores.store
        })
    }
    this.state = { store }
}


render() {
    return (
        <div>
      {this.state.store.map((store, index) => (
            <span>{stores.id}</span>
      ))}
        </div>
    )
}
}
export default CreateStore