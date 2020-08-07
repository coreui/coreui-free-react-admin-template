import React, { Component } from 'react'
import Drivers from '../../utils/drivers/driverlist'
import './createdriver.css'

let drivers = [...Drivers]

class CreateDriver extends Component {
    constructor(){
        super();
        this.state = drivers;
    }
render() {
    let driver = this.state.driver
        return <div class="driver-div">
                {drivers.map(driver => <div class="driver-div__content" draggable="true"><span>{driver.name}</span></div>)}
        </div>
    }
}
export default CreateDriver