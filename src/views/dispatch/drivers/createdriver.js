import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
import './createdriver.css'

let drivers = [...Drivers]

class CreateDriver extends Component {
    constructor(){
        super();
        this.state = {drivers};
    }

    drag_handler= (ev) => {
        ev.preventDefault();
        console.log('Dropped')
        ev.currentTarget.style.background = "yellow";
    }
    onDragEnter_handler = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log("I'm Being Dragged Over")
    }
    onDrop_handler = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log("Dropped!")
    }
    onDragOver_handler = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.currentTarget.style.background = "green"
    }
render() {

        return <div className="driver-div" onDragEnter={e => this.onDragEnter_handler(e)}>
                {drivers.map(driver => 
                    <div className="driver-div__content" key={driver.id} draggable="true" onDragStart={this.drag_handler} onDragOver={e => this.onDragOver_handler(e)} onDrop={this.onDrop_handler}><span className="driver-span">{driver.name}</span>
                   
                </div>)}
        </div>
       
    }
}
export default CreateDriver