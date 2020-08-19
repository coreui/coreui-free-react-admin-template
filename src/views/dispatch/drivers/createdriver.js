import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
import './createdriver.css'

let drivers = [...Drivers]

class CreateDriver extends Component {
    constructor(){
        super();
        this.state = drivers;
    }

    drag_handler= (ev) => {
        ev.preventDefault();
        console.log('Dropped')
        ev.currentTarget.style.background = "yellow";
    }
render() {
    let driver = this.state.driver
        return <div className="driver-div">
                {drivers.map(driver => 
                    <div className="driver-div__content" draggable="true" onDragStart={this.drag_handler}><span className="driver-span">{driver.name}</span>
                   
                </div>)}
        </div>
       
    }
}
export default CreateDriver