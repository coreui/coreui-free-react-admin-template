import React, { Component } from 'react'
import Drivers from '../../../utils/drivers/driverlist'
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
                {drivers.map(driver => <div class="driver-div__content" draggable="true"><span>{driver.name}</span>
                    <div className="driver-load-div driver-load-div-1">Load1</div>
                    <div className="driver-load-div driver-load-div-2">Load2</div>
                    <div className="driver-load-div driver-load-div-3">Load3</div>
                    <div className="driver-load-div driver-load-div-4">Load4</div>
                    <div className="driver-load-div driver-load-div-5">Load5</div>
                </div>)}
        </div>
       
    }
}
export default CreateDriver